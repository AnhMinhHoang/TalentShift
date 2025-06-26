package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.User;
import com.ts.talentshift.Security.JwtUtil;
import com.ts.talentshift.Service.IUserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")

public class AuthController {
    private final IUserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(IUserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        String fullName = request.get("fullName");
        String email = request.get("email");
        String password = request.get("password");
        String role = request.get("role");

        // Set default fullName if empty
        if (fullName == null || fullName.trim().isEmpty()) {
            fullName = "User"; // Default name that can be updated later
        }

        User user = userService.registerUser(email, password, fullName, role);

        Map<String, Object> response = new HashMap<>();

        if (user != null) { // If user is successfully created
            String token = jwtUtil.generateJwtToken(user);
            response.put("message", "User registered successfully!");
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("fullName", user.getFullName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else { // If registration fails (e.g., email already exists)
            response.put("error", "Email already exists.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        return userService.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateJwtToken(user);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "login successful");
                    response.put("token", token);
                    response.put("email", user.getEmail());
                    response.put("fullName", user.getFullName());
                    response.put("role", user.getRole());
                    response.put("id", user.getUserId());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("error", "Wrong email or password");
                    return ResponseEntity.status((HttpStatus.UNAUTHORIZED)).body(response);
                });
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @GetMapping("/checkUser")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.findByEmail(authentication.getName())
                .orElse(null);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/google-check")
    public ResponseEntity<Map<String, Object>> googleCheck(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, Object> response = new HashMap<>();
        if (email == null) {
            response.put("exists", false);
            response.put("error", "Email required");
            return ResponseEntity.badRequest().body(response);
        }
        boolean exists = userService.findByEmail(email).isPresent();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google-login")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, Object> response = new HashMap<>();
        if (email == null) {
            response.put("error", "Email required");
            return ResponseEntity.badRequest().body(response);
        }
        return userService.findByEmail(email)
                .map(user -> {
                    String token = jwtUtil.generateJwtToken(user);
                    response.put("token", token);
                    response.put("email", user.getEmail());
                    response.put("fullName", user.getFullName());
                    response.put("role", user.getRole());
                    response.put("id", user.getUserId());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("error", "User not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }
}