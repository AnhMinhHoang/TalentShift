package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.User;
import com.ts.talentshift.Security.JwtUtil;
import com.ts.talentshift.Service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {
    private final IUserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(IUserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil)
    {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request)
    {
        String firstName = request.get("firstName");
        String lastName = request.get("lastName");
        String email = request.get("email");
        String password = request.get("password");
        short role = Short.parseShort(request.get("role"));

        User user = userService.registerUser(email, password, firstName, lastName, role);

        Map<String, Object> response = new HashMap<>();


        if (user != null) { // If user is successfully created
            String token = jwtUtil.generateJwtToken(user);
            response.put("message", "User registered successfully!");
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else { // If registration fails (e.g., email already exists)
            response.put("error", "Email already exists.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request)
    {
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
                  response.put("firstName", user.getFirstName());
                  response.put("lastName", user.getLastName());
                  response.put("role", user.getRole());
                  response.put("id", user.getUserId());
                  return ResponseEntity.ok(response);
                })
                .orElseGet(() ->{
                    Map<String, Object> response = new HashMap<>();
                    response.put("error", "Wrong email or password");
                    return ResponseEntity.status((HttpStatus.UNAUTHORIZED)).body(response);
                });
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUser()
    {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }
}
