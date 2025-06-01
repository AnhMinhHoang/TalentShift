package com.ts.talentshift.Service;

import com.ts.talentshift.Model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User registerUser(String email, String password, String firstName, String lastName, short role);

    List<User> getAllUser();

    Optional<User> findByEmail(String email);
}
