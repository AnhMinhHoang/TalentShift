package com.ts.talentshift.Service;

import com.ts.talentshift.Model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User registerUser(String email, String password, String firstName, String lastName, String role);

    List<User> getAllUser();

    Optional<User> findByEmail(String email);

    User updateUserProfile(Long userId, User updatedUser);

    // Profile update methods
    User updateBasicProfile(Long userId, User updatedUser);
    User updateFreelancerProfile(Long userId, User updatedUser);
    User updateHirerProfile(Long userId, User updatedUser, MultipartFile logo, MultipartFile registrationFile);
}
