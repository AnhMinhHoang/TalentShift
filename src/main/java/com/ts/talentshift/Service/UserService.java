package com.ts.talentshift.Service;

import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(String email, String password, String firstName, String lastName, String role) {
        if (userRepository.existsByEmail(email)) {
            return null;
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(Role.valueOf(role.toUpperCase()));

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User updateBasicProfile(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    existingUser.setFirstName(updatedUser.getFirstName());
                    existingUser.setLastName(updatedUser.getLastName());
                    existingUser.setPhone(updatedUser.getPhone());
                    existingUser.setGender(updatedUser.getGender());
                    existingUser.setAvatar(updatedUser.getAvatar());
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    @Override
    public User updateFreelancerProfile(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.FREELANCER) {
                        return null;
                    }
                    
                    // Update basic freelancer fields
                    existingUser.setBio(updatedUser.getBio());
                    existingUser.setLocation(updatedUser.getLocation());
                    existingUser.setBirthDate(updatedUser.getBirthDate());
                    
                    // Clear existing collections
                    existingUser.getSkills().clear();
                    existingUser.getExperiences().clear();
                    existingUser.getEducations().clear();
                    existingUser.getCertificates().clear();
                    existingUser.getLinks().clear();
                    
                    // Add new items using helper methods to maintain bidirectional relationships
                    if (updatedUser.getSkills() != null) {
                        updatedUser.getSkills().forEach(skill -> {
                            skill.setUser(existingUser);
                            existingUser.getSkills().add(skill);
                        });
                    }
                    
                    if (updatedUser.getExperiences() != null) {
                        updatedUser.getExperiences().forEach(experience -> {
                            // Clear and update projects for each experience
                            if (experience.getProjects() != null) {
                                experience.getProjects().forEach(project -> {
                                    project.setExperience(experience);
                                });
                            }
                            experience.setUser(existingUser);
                            existingUser.getExperiences().add(experience);
                        });
                    }
                    
                    if (updatedUser.getEducations() != null) {
                        updatedUser.getEducations().forEach(education -> {
                            education.setUser(existingUser);
                            existingUser.getEducations().add(education);
                        });
                    }
                    
                    if (updatedUser.getCertificates() != null) {
                        updatedUser.getCertificates().forEach(certificate -> {
                            certificate.setUser(existingUser);
                            existingUser.getCertificates().add(certificate);
                        });
                    }
                    
                    if (updatedUser.getLinks() != null) {
                        updatedUser.getLinks().forEach(link -> {
                            link.setUser(existingUser);
                            existingUser.getLinks().add(link);
                        });
                    }
                    
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    @Override
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
                            String regFileName = UUID.randomUUID().toString() + "_" + registrationFile.getOriginalFilename();
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

    @Override
    public User updateUserProfile(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    existingUser.setFirstName(updatedUser.getFirstName());
                    existingUser.setLastName(updatedUser.getLastName());
                    existingUser.setPhone(updatedUser.getPhone());
                    existingUser.setGender(updatedUser.getGender());
                    existingUser.setAvatar(updatedUser.getAvatar());
                    existingUser.setBio(updatedUser.getBio());
                    existingUser.setLocation(updatedUser.getLocation());
                    existingUser.setBirthDate(updatedUser.getBirthDate());
                    existingUser.setSkills(updatedUser.getSkills());
                    existingUser.setExperiences(updatedUser.getExperiences());
                    existingUser.setEducations(updatedUser.getEducations());
                    existingUser.setCertificates(updatedUser.getCertificates());
                    existingUser.setLinks(updatedUser.getLinks());
                    existingUser.setCompanyName(updatedUser.getCompanyName());
                    existingUser.setDescription(updatedUser.getDescription());
                    existingUser.setContactLink(updatedUser.getContactLink());
                    existingUser.setLogoPath(updatedUser.getLogoPath());
                    existingUser.setRegistrationFilePath(updatedUser.getRegistrationFilePath());
                    existingUser.setVerified(updatedUser.isVerified());
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }
}
