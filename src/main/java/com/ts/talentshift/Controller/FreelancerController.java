package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Freelancer.FreelancerSideBarUpdateDTO;
import com.ts.talentshift.Model.Freelancer.Certificate;
import com.ts.talentshift.Model.Freelancer.Education;
import com.ts.talentshift.Model.Freelancer.Experience;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import com.ts.talentshift.Service.FreelancerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/freelancers")
public class FreelancerController {
    private final FreelancerService freelancerService;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public FreelancerController(FreelancerService freelancerService, UserRepository userRepository) {
        this.freelancerService = freelancerService;
        this.userRepository = userRepository;
    }

    @PutMapping("/{userId}/freelancer")
    public ResponseEntity<User> updateFreelancerProfile(
            @PathVariable Long userId,
            @ModelAttribute User updatedUser,
            @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile) {

        //log updatedUser model attribute for debugging
        log.info("Updating freelancer profile for userId: {}", updatedUser.toString());

        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
                String avatarPath = saveAvatarFile(avatarFile);
                updatedUser.setAvatar(avatarPath); // Set the new avatar path
            } catch (IOException e) {
                return ResponseEntity.status(500).build(); // Internal server error if file save fails
            }
        } else {
            // If no new avatar is uploaded, retain the existing one
            Optional<User> existingUser = userRepository.findById(userId);
            if (existingUser.isPresent()) {
                updatedUser.setAvatar(existingUser.get().getAvatar());
            } else {
                updatedUser.setAvatar(null); // Or handle as needed
            }
        }

        User updated = freelancerService.updateFreelancerProfile(userId, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/sidebar/{userId}")
    public ResponseEntity<User> updateFreelancerSideBar(
            @PathVariable Long userId,
            @ModelAttribute FreelancerSideBarUpdateDTO dto,
            @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile) {

        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
//                deleteOldAvatar(userId); // Clean up old avatar if exists
                String avatarPath = saveAvatarFile(avatarFile);
                dto.setAvatar(avatarPath); // Set the new avatar path
            } catch (IOException e) {
                return ResponseEntity.status(500).build(); // Internal server error if file save fails
            }
        } else {
            // If no new avatar is uploaded, retain the existing one
            Optional<User> existingUser = userRepository.findById(userId);
            if (existingUser.isPresent()) {
                dto.setAvatar(existingUser.get().getAvatar());
            } else {
                dto.setAvatar(null); // Or handle as needed
            }
        }

        User updated = freelancerService.updateFreelancerSideBar(userId, dto);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/bio/{userId}")
    public ResponseEntity<User> updateFreelancerBio(
            @PathVariable Long userId,
            @RequestBody String bio) {

        User updated = freelancerService.updateFreelancerBio(userId, bio);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/skills/{userId}")
    public ResponseEntity<User> updateFreelancerSkills(
            @PathVariable Long userId,
            @RequestBody List<Skill> skills) {
        User updated = freelancerService.updateFreelancerSkills(userId, skills);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/experience/{userId}")
    public ResponseEntity<User> updateFreelancerExperiences(
            @PathVariable Long userId,
            @RequestBody List<Experience> experiences) {
        User updated = freelancerService.updateFreelancerExperiences(userId, experiences);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("education/{userId}")
    public ResponseEntity<User> updateFreelancerEducation(
            @PathVariable Long userId,
            @RequestBody List<Education> education) {
        User updated = freelancerService.updateFreelancerEducations(userId, education);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("certification/{userId}")
    public ResponseEntity<User> updateFreelancerCertification(
            @PathVariable Long userId,
            @RequestBody List<Certificate> certifications) {
        User updated = freelancerService.updateFreelancerCertificates(userId, certifications);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    private String saveAvatarFile(MultipartFile file) throws IOException {
        String subDir = "/freelancer/avatar";
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

    private void deleteOldAvatar(Long userId) {
        try {
            // Find existing user to get old avatar path
            userRepository.findById(userId).ifPresent(user -> {
                if (user.getAvatar() != null && !user.getAvatar().isEmpty()) {
                    try {
                        Path oldAvatarPath = Paths.get(user.getAvatar());
                        if (Files.exists(oldAvatarPath)) {
                            Files.delete(oldAvatarPath);
                        }
                    } catch (IOException e) {
                        // Log warning but don't throw - old file cleanup is not critical
                        System.err.println("Warning: Could not delete old avatar file: " + e.getMessage());
                    }
                }
            });
        } catch (Exception e) {
            // Log warning but don't throw - old file cleanup is not critical
            System.err.println("Warning: Error during old avatar cleanup: " + e.getMessage());
        }
    }
}
