package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.User;
import com.ts.talentshift.Service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return userService.findByEmail(userId.toString())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<User> updateBasicProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
        User updated = userService.updateBasicProfile(userId, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}/freelancer")
    public ResponseEntity<User> updateFreelancerProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
        User updated = userService.updateFreelancerProfile(userId, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/{userId}/hirer", consumes = "multipart/form-data")
    public ResponseEntity<User> updateHirerProfile(
            @PathVariable Long userId,
            @RequestParam("companyName") String companyName,
            @RequestParam("description") String description,
            @RequestParam("contactLink") String contactLink,
            @RequestParam(value = "logo", required = false) MultipartFile logo,
            @RequestParam("registrationFile") MultipartFile registrationFile) {
        
        User updatedUser = new User();
        updatedUser.setCompanyName(companyName);
        updatedUser.setDescription(description);
        updatedUser.setContactLink(contactLink);
        
        User updated = userService.updateHirerProfile(userId, updatedUser, logo, registrationFile);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUser());
    }
} 