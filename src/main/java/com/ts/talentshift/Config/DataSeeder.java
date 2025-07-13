package com.ts.talentshift.Config;

import com.ts.talentshift.Enums.JobStatus;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.JobCategoryRepository;
import com.ts.talentshift.Repository.JobRepository;
import com.ts.talentshift.Repository.SkillRepository;
import com.ts.talentshift.Repository.UserRepository;
import com.ts.talentshift.Resource.SkillData;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final JobCategoryRepository jobCategoryRepository;
    private final SkillRepository skillRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    private static final Map<String, List<String>> SKILL_DATA = SkillData.SKILL_DATA;

    @PostConstruct
    public void seedData() {
        if (jobCategoryRepository.count() == 0) {
            seedJobCategories();
        }

        if (skillRepository.count() == 0) {
            seedSkills();
        }

        if (userRepository.count() == 0) {
            seedAdminUser();
        }
    }

    private void seedJobCategories() {
        List<JobCategory> categories = SKILL_DATA.keySet().stream()
                .map(name -> new JobCategory(null, name, null))
                .collect(Collectors.toList());
        jobCategoryRepository.saveAll(categories);
    }

    private void seedSkills() {
        // Collect all unique skills from the JSON data
        Set<String> allSkills = SKILL_DATA.values().stream()
                .flatMap(List::stream)
                .collect(Collectors.toSet());

        List<Skill> skills = allSkills.stream()
                .map(skillName -> new Skill(null, skillName, SkillType.MAIN, null, null))
                .collect(Collectors.toList());
        skillRepository.saveAll(skills);
    }

    private void seedAdminUser() {
        User admin = new User();
        admin.setFullName("Admin");
        admin.setEmail("adminTS@gmail.com");
        admin.setPassword("@adminTS5624@");
        admin.setRole(Role.ADMIN);
        admin.setVerified(true);
        admin.setFillingForm(true);
        userRepository.save(admin);
    }
}