package com.ts.talentshift.Service;

import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Enums.TransactionStatus;
import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import com.ts.talentshift.DTO.UserListDTO;
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
import java.util.stream.Collectors;

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
        return userRepository.findAll()
                .stream()
                .filter(user -> !"ADMIN".equalsIgnoreCase(user.getRole().name()))
                .collect(Collectors.toList());
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

    public List<UserListDTO> getAllUserListDTO() {
        return userRepository.findAll().stream()
                .filter(user -> !"ADMIN".equalsIgnoreCase(user.getRole().name()))
                .map(user -> {
                    UserListDTO dto = new UserListDTO();
                    dto.setUserId(user.getUserId());
                    dto.setRole(user.getRole() != null ? user.getRole().name() : null);
                    dto.setFullName(user.getFullName());
                    dto.setCompanyName(user.getCompanyName());
                    dto.setAvatar(user.getAvatar());
                    dto.setLogoPath(user.getLogoPath());
                    dto.setPremium(user.isPremium());
                    dto.setVerified(user.isVerified());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
