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
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final JobCategoryRepository jobCategoryRepository;
    private final SkillRepository skillRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

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
        List<JobCategory> categories = Arrays.asList(
                new JobCategory(null, "Web Development", null),
                new JobCategory(null, "Mobile Development", null),
                new JobCategory(null, "Data Science", null),
                new JobCategory(null, "UI/UX Design", null),
                new JobCategory(null, "DevOps", null),
                new JobCategory(null, "Content Writing", null),
                new JobCategory(null, "Mobile App Development", null)
        );
        jobCategoryRepository.saveAll(categories);
    }

    private void seedSkills() {
        List<Skill> skills = Arrays.asList(
                new Skill(null, "Java", SkillType.MAIN, null, null),
                new Skill(null, "Spring Boot", SkillType.MAIN, null, null),
                new Skill(null, "React", SkillType.MAIN, null, null),
                new Skill(null, "Android", SkillType.MAIN, null, null),
                new Skill(null, "Python", SkillType.MAIN, null, null),
                new Skill(null, "Machine Learning", SkillType.MAIN, null, null),
                new Skill(null, "Figma", SkillType.MAIN, null, null),
                new Skill(null, "Communication", SkillType.ADDITIONAL, null, null),
                new Skill(null, "Time Management", SkillType.ADDITIONAL, null, null),
                new Skill(null, "Writing", SkillType.MAIN, null, null)
        );
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

        Job job1 = new Job();
        job1.setTitle("Spring Boot Backend Developer");
        job1.setDescription("Build REST APIs and handle business logic.");
        job1.setLocation("Remote");
        job1.setPaidType((byte) 1);
        job1.setMinBudget("1000");
        job1.setMaxBudget("2000");
        job1.setResponsibilities(List.of("Develop microservices", "Handle authentication and security"));
        job1.setIdealSkills(List.of("Java", "Spring Security"));
        job1.setSkills(findSkillsByName(allSkills, "Java", "Spring Boot"));
        job1.setCategory(findCategory(categories, "Web Development"));
        job1.setUser(defaultUser);
        job1.setPublish(true);
        job1.setFeatured(true);
        job1.setStatus(JobStatus.ACTIVE);
        job1.setCreatedAt(now);
        job1.setUpdatedAt(now);
        job1.setExpiredAt(now.plusDays(30));

        Job job2 = new Job();
        job2.setTitle("React Native Mobile App Developer");
        job2.setDescription("Create cross-platform mobile apps.");
        job2.setLocation("Hybrid");
        job2.setPaidType((byte) 1);
        job2.setMinBudget("1200");
        job2.setMaxBudget("2500");
        job2.setResponsibilities(List.of("Build mobile UI", "Integrate with backend"));
        job2.setIdealSkills(List.of("React Native", "API integration"));
        job2.setSkills(findSkillsByName(allSkills, "React", "Communication"));
        job2.setCategory(findCategory(categories, "Mobile Development"));
        job2.setUser(defaultUser);
        job2.setPublish(true);
        job2.setFeatured(false);
        job2.setStatus(JobStatus.PENDING);
        job2.setCreatedAt(now);
        job2.setUpdatedAt(now);
        job2.setExpiredAt(now.plusDays(20));

        Job job3 = new Job();
        job3.setTitle("Content Writer for Tech Blog");
        job3.setDescription("Write articles on software development topics.");
        job3.setLocation("Remote");
        job3.setPaidType((byte) 1);
        job3.setMinBudget("400");
        job3.setMaxBudget("900");
        job3.setResponsibilities(List.of("Research topics", "Write engaging content"));
        job3.setIdealSkills(List.of("Writing", "SEO", "Tech Knowledge"));
        job3.setSkills(findSkillsByName(allSkills, "Writing", "Time Management"));
        job3.setCategory(findCategory(categories, "Content Writing"));
        job3.setUser(defaultUser);
        job3.setPublish(true);
        job3.setFeatured(false);
        job3.setStatus(JobStatus.EXPIRED);
        job3.setCreatedAt(now.minusDays(30));
        job3.setUpdatedAt(now);
        job3.setExpiredAt(now.minusDays(1));

        Job job4 = new Job();
        job4.setTitle("DevOps Engineer");
        job4.setDescription("Manage CI/CD pipelines and infrastructure.");
        job4.setLocation("On-site");
        job4.setPaidType((byte) 1);
        job4.setMinBudget("1500");
        job4.setMaxBudget("3000");
        job4.setResponsibilities(List.of("Setup Jenkins pipelines", "Manage Docker/Kubernetes"));
        job4.setIdealSkills(List.of("CI/CD", "AWS", "Kubernetes"));
        job4.setSkills(findSkillsByName(allSkills, "Java", "Spring Boot"));
        job4.setCategory(findCategory(categories, "DevOps"));
        job4.setUser(defaultUser);
        job4.setPublish(true);
        job4.setFeatured(true);
        job4.setStatus(JobStatus.ACTIVE);
        job4.setCreatedAt(now);
        job4.setUpdatedAt(now);
        job4.setExpiredAt(now.plusDays(15));

        Job job5 = new Job();
        job5.setTitle("UI/UX Designer (Figma)");
        job5.setDescription("Design modern, responsive user interfaces.");
        job5.setLocation("Remote");
        job5.setPaidType((byte) 1);
        job5.setMinBudget("800");
        job5.setMaxBudget("1500");
        job5.setResponsibilities(List.of("Create wireframes", "Work with developers"));
        job5.setIdealSkills(List.of("Figma", "Prototyping", "User Research"));
        job5.setSkills(findSkillsByName(allSkills, "Figma", "Communication"));
        job5.setCategory(findCategory(categories, "UI/UX Design"));
        job5.setUser(defaultUser);
        job5.setPublish(true);
        job5.setFeatured(false);
        job5.setStatus(JobStatus.PENDING);
        job5.setCreatedAt(now);
        job5.setUpdatedAt(now);
        job5.setExpiredAt(now.plusDays(25));

        Job job6 = new Job();
        job6.setTitle("Machine Learning Engineer");
        job6.setDescription("Develop predictive models for customer behavior.");
        job6.setLocation("Remote");
        job6.setPaidType((byte) 1);
        job6.setMinBudget("2500");
        job6.setMaxBudget("4500");
        job6.setResponsibilities(List.of("Train ML models", "Deploy models to production"));
        job6.setIdealSkills(List.of("Python", "Scikit-learn", "Pandas"));
        job6.setSkills(findSkillsByName(allSkills, "Python", "Machine Learning"));
        job6.setCategory(findCategory(categories, "Data Science"));
        job6.setUser(defaultUser);
        job6.setPublish(true);
        job6.setFeatured(true);
        job6.setStatus(JobStatus.ACTIVE);
        job6.setCreatedAt(now);
        job6.setUpdatedAt(now);
        job6.setExpiredAt(now.plusDays(45));

        Job job7 = new Job();
        job7.setTitle("Technical Content Writer");
        job7.setDescription("Write educational blog posts on cloud computing.");
        job7.setLocation("Remote");
        job7.setPaidType((byte) 1);
        job7.setMinBudget("500");
        job7.setMaxBudget("1000");
        job7.setResponsibilities(List.of("Research topics", "Write SEO-optimized articles"));
        job7.setIdealSkills(List.of("AWS", "Content Writing", "SEO"));
        job7.setSkills(findSkillsByName(allSkills, "Writing", "Time Management"));
        job7.setCategory(findCategory(categories, "Content Writing"));
        job7.setUser(defaultUser);
        job7.setPublish(true);
        job7.setFeatured(false);
        job7.setStatus(JobStatus.ACTIVE);
        job7.setCreatedAt(now.minusDays(5));
        job7.setUpdatedAt(now);
        job7.setExpiredAt(now.plusDays(10));

        Job job8 = new Job();
        job8.setTitle("Mobile Developer (Android)");
        job8.setDescription("Develop native Android applications.");
        job8.setLocation("On-site");
        job8.setPaidType((byte) 1);
        job8.setMinBudget("1000");
        job8.setMaxBudget("1800");
        job8.setResponsibilities(List.of("Develop UI", "Integrate REST APIs"));
        job8.setIdealSkills(List.of("Java", "Android SDK", "UI Design"));
        job8.setSkills(findSkillsByName(allSkills, "Java", "Android"));
        job8.setCategory(findCategory(categories, "Mobile Development"));
        job8.setUser(defaultUser);
        job8.setPublish(true);
        job8.setFeatured(true);
        job8.setStatus(JobStatus.REJECTED);
        job8.setCreatedAt(now);
        job8.setUpdatedAt(now);
        job8.setExpiredAt(now.plusDays(7));

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

        // ✅ Save all jobs
        jobRepository.saveAll(List.of(
                job1, job2, job3, job4, job5, job6, job7, job8, job9
        ));
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
