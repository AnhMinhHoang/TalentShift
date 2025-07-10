package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.User;
import com.ts.talentshift.Service.FreelancerService;
import com.ts.talentshift.Service.HirerService;
import com.ts.talentshift.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<User> updateBasicProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
        User updated = userService.updateBasicProfile(userId, updatedUser);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    @PostMapping("/pro-purchase")
    public ResponseEntity<?> proPurchase(@RequestParam("userId") Long userId) {
        User updatedUser = userService.proPurchase(userId);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
}