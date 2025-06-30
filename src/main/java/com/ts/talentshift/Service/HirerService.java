package com.ts.talentshift.Service;

import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Service
public class HirerService {
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public HirerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User updateHirerProfile(Long userId, User updatedUser, MultipartFile logo, MultipartFile registrationFile) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.HIRER) {
                        return null;
                    }

                    // Update basic information
                    existingUser.setCompanyName(updatedUser.getCompanyName());
                    existingUser.setDescription(updatedUser.getDescription());
                    existingUser.setContactLink(updatedUser.getContactLink());

                    try {
                        // Create upload directory if it doesn't exist
                        Path uploadPath = Paths.get(uploadDir);
                        if (!Files.exists(uploadPath)) {
                            Files.createDirectories(uploadPath);
                        }

                        // Handle logo upload
                        if (logo != null && !logo.isEmpty()) {
                            String logoFileName = UUID.randomUUID().toString() + "_" + logo.getOriginalFilename();
                            Path logoPath = uploadPath.resolve(logoFileName);
                            Files.copy(logo.getInputStream(), logoPath);
                            existingUser.setLogoPath(logoFileName);
                        }

                        // Handle registration file upload
                        if (registrationFile != null && !registrationFile.isEmpty()) {
                            String regFileName = UUID.randomUUID().toString() + "_"
                                    + registrationFile.getOriginalFilename();
                            Path regFilePath = uploadPath.resolve(regFileName);
                            Files.copy(registrationFile.getInputStream(), regFilePath);
                            existingUser.setRegistrationFilePath(regFileName);
                        }

                        return userRepository.save(existingUser);
                    } catch (IOException e) {
                        throw new RuntimeException("Failed to store file", e);
                    }
                })
                .orElse(null);
    }
}
