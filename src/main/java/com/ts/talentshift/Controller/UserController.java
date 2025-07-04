package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Hirer.HirerProfileUpdateRequest;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return userService.findById(userId)
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

    @PutMapping(value = "/{userId}/hirer/profile")
    public ResponseEntity<User> updateHirerFromProfilePage(
            @PathVariable Long userId,
            @RequestBody HirerProfileUpdateRequest request
    ) {
        System.out.println("Received update request for userId: " + userId);
        System.out.println("phone: " + request.getPhone());
        System.out.println("companyName: " + request.getCompanyName());
        System.out.println("description: " + request.getDescription());
        System.out.println("contactLink: " + request.getContactLink());
        System.out.println("location: " + request.getLocation());

        User updated = userService.updateHirerFromProfilePage(
                userId,
                request.getPhone(),
                request.getCompanyName(),
                request.getDescription(),
                request.getContactLink(),
                request.getLocation()
        );
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping(value = "/{userId}/hirer/logo", consumes = "multipart/form-data")
    public ResponseEntity<User> uploadCompanyLogo(
            @PathVariable Long userId,
            @RequestParam("logo") MultipartFile logoFile
    ) {
        try {
            User updated = userService.updateCompanyLogo(userId, logoFile);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUser());
    }
}