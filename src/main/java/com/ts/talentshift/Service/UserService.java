package com.ts.talentshift.Service;

import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(String email, String password, String firstName, String lastName, short role)
    {
        if (userRepository.findByEmail(email).isPresent())
        {
            throw new RuntimeException("User with this email already exists");
        }
        User user = new User();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUser()
    {
        return userRepository.findAll();
    }
}
