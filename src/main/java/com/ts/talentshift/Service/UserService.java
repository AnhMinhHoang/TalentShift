package com.ts.talentshift.Service;

import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Enums.TransactionStatus;
import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionService transactionService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TransactionService transactionService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.transactionService = transactionService;
    }

    
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    
    public User registerUser(String email, String password, String fullName, String role) {
        if (userRepository.existsByEmail(email)) {
            return null;
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setRole(Role.valueOf(role.toUpperCase()));

        return userRepository.save(user);
    }

    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    
    public User updateBasicProfile(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    existingUser.setFullName(updatedUser.getFullName());
                    existingUser.setPhone(updatedUser.getPhone());
                    existingUser.setGender(updatedUser.getGender());
                    existingUser.setAvatar(updatedUser.getAvatar());
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    
    public User updateUserProfile(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    existingUser.setFullName(updatedUser.getFullName());
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

    
    public void addUserBalance(User user, BigDecimal amount) {
        user.setBalance(user.getBalance().add(amount));
    }

    
    public User proPurchase(Long userId) {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(UUID.randomUUID().toString());
        transaction.setOrderId("ORDER_" + System.currentTimeMillis());
        transaction.setAmount(BigDecimal.valueOf(-200000)); // Assuming 200,000 is the pro purchase amount
        transaction.setUser(userRepository.findById(userId).orElse(null));
        transaction.setStatus(TransactionStatus.SUCCESS);
        transaction.setMessage("Pro purchase");

        transactionService.createTransaction(transaction);

        return userRepository.findById(userId)
                .map(existingUser -> {
                    existingUser.setPremium(true);
                    existingUser.setBalance(existingUser.getBalance().subtract(BigDecimal.valueOf(200000)));
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public void subtractUserBalance(Long userId, BigDecimal amount) {
        userRepository.findById(userId)
                .ifPresent(user -> {
                    user.setBalance(user.getBalance().subtract(amount));
                    userRepository.save(user);
                });
    }
}
