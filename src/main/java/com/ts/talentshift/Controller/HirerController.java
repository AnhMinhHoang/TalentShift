package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Hirer.HirerUpdateDTO;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import com.ts.talentshift.Service.HirerService;
import com.ts.talentshift.Service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/hirers")
public class HirerController {
    private final HirerService hirerService;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public HirerController(HirerService hirerService, UserRepository userRepository) {
        this.hirerService = hirerService;
        this.userRepository = userRepository;
    }

    @PutMapping(value = "/{userId}/hirer")
    public ResponseEntity<User> updateHirerProfile(
            @PathVariable Long userId,
            @ModelAttribute HirerUpdateDTO dto,
            @RequestParam(value = "companyLogo", required = false) MultipartFile logoFile,
            @RequestParam(value = "companyRegistrationFile") MultipartFile registrationFile) {

        System.out.println("Registration file: " + registrationFile.getOriginalFilename());

        // Handle logo file
        if (logoFile != null && !logoFile.isEmpty()) {
            try {
                String logoPath = saveLogoFile(logoFile);
                dto.setLogo(logoPath); // Set the new logo path
            } catch (IOException e) {
                return ResponseEntity.status(500).build(); // Internal server error if file save fails
            }
        } else {
            // If no new logo is uploaded, retain the existing one
            Optional<User> existingUser = userRepository.findById(userId);
            if (existingUser.isPresent()) {
                dto.setLogo(existingUser.get().getLogoPath());
            } else {
                dto.setLogo(null); // Or handle as needed
            }
        }

        // Handle registration file
        if (!registrationFile.isEmpty()) {
            try {
                String registrationPath = saveRegistrationFile(registrationFile);
                dto.setRegistrationFile(registrationPath); // Set the registration file path
            } catch (IOException e) {
                return ResponseEntity.status(500).build(); // Internal server error if file save fails
            }
        } else {
            // If no new registration file is uploaded, retain the existing one
            Optional<User> existingUser = userRepository.findById(userId);
            if (existingUser.isPresent()) {
                dto.setRegistrationFile(existingUser.get().getRegistrationFilePath());
            } else {
                dto.setRegistrationFile(null); // Or handle as needed
            }
        }

        User updated = hirerService.updateHirerProfile(userId, dto);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    private String saveLogoFile(MultipartFile file) throws IOException {
        String subDir = "/hirer/logo";
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir, subDir);

        // Ensure the directory exists
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create upload directory", e);
        }

        // Save the file
        Path filePath = uploadPath.resolve(fileName);
        file.transferTo(filePath);

        // Return the relative path for frontend access
        return "/uploads" + subDir + "/" + fileName; // e.g., /uploads/freelancer/avatar/avatar_123.jpg
    }

    private String saveRegistrationFile(MultipartFile file) throws IOException {
        String subDir = "/hirer/registration";
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir, subDir);

        // Ensure the directory exists
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create upload directory", e);
        }

        // Save the file
        Path filePath = uploadPath.resolve(fileName);
        file.transferTo(filePath);

        // Return the relative path for frontend access
        return "/uploads" + subDir + "/" + fileName; // e.g., /uploads/hirer/registration/reg_123.pdf
    }
}
