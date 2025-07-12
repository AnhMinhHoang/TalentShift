package com.ts.talentshift.Config;

import com.ts.talentshift.Enums.JobStatus;
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

        if (jobRepository.count() == 0) {
            seedJobs();
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

    private void seedJobs() {
        List<JobCategory> categories = jobCategoryRepository.findAll();
        List<Skill> allSkills = skillRepository.findAll();
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            System.out.println("No users found. Skipping job seeding.");
            return;
        }

        User defaultUser = users.get(0);
        LocalDateTime now = LocalDateTime.now();

        Job job5 = new Job();
        job5.setTitle("UI/UX Designer (Figma)");
        job5.setDescription("Design modern, responsive user interfaces.");
        job5.setLocation("Remote");
        job5.setPaidType((byte) 1);
        job5.setMinBudget("800");
        job5.setMaxBudget("1500");
        job5.setResponsibilities(List.of("Create wireframes", "Work with developers"));
        job5.setIdealSkills(List.of("Figma", "Prototyping", "User Research"));
        job5.setSkills(findSkillsByName(allSkills, "Figma"));
        job5.setCategory(findCategory(categories, "UI/UX Design"));
        job5.setUser(defaultUser);
        job5.setPublish(true);
        job5.setFeatured(false);
        job5.setStatus(JobStatus.PENDING);
        job5.setCreatedAt(now);
        job5.setUpdatedAt(now);
        job5.setExpiredAt(now.plusDays(25));

        Job job9 = new Job();
        job9.setTitle("Junior Web Developer");
        job9.setDescription("Assist in building React-based web apps.");
        job9.setLocation("Remote");
        job9.setPaidType((byte) 1);
        job9.setMinBudget("600");
        job9.setMaxBudget("1200");
        job9.setResponsibilities(List.of("Fix bugs", "Build reusable components"));
        job9.setIdealSkills(List.of("HTML", "CSS", "React"));
        job9.setSkills(findSkillsByName(allSkills, "React", "Java"));
        job9.setCategory(findCategory(categories, "Web Development"));
        job9.setUser(defaultUser);
        job9.setPublish(true);
        job9.setFeatured(false);
        job9.setStatus(JobStatus.EXPIRED);
        job9.setCreatedAt(now.minusDays(40));
        job9.setUpdatedAt(now.minusDays(10));
        job9.setExpiredAt(now.minusDays(5));

        jobRepository.saveAll(List.of(job5, job9));
    }

    // Utility methods
    private List<Skill> findSkillsByName(List<Skill> all, String... names) {
        return all.stream()
                .filter(s -> Arrays.asList(names).contains(s.getSkillName()))
                .toList();
    }

    private JobCategory findCategory(List<JobCategory> all, String name) {
        return all.stream()
                .filter(c -> c.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }
}