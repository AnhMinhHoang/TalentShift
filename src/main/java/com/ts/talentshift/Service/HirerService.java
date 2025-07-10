package com.ts.talentshift.Service;

import com.ts.talentshift.DTO.Hirer.HirerUpdateDTO;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



@Service
public class HirerService {
    private final UserRepository userRepository;

    public HirerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User updateHirerProfile(Long userId, HirerUpdateDTO dto) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    if (existingUser.getRole() != Role.HIRER) {
                        return null;
                    }

                    // Update basic information
                    existingUser.setCompanyName(dto.getCompanyName());
                    existingUser.setDescription(dto.getDescription());
                    existingUser.setContactLink(dto.getContactLink());
                    existingUser.setLogoPath(dto.getLogo());
                    existingUser.setRegistrationFilePath(dto.getRegistrationFile());
                    existingUser.setFillingForm(true);

                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }
}
