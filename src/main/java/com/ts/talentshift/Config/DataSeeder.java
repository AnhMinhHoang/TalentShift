package com.ts.talentshift.Config;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Hirer;
import com.ts.talentshift.Model.Skill;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Repository.HirerRepository;
import com.ts.talentshift.Repository.JobCategoryRepository;
import com.ts.talentshift.Repository.JobRepository;
import com.ts.talentshift.Repository.SkillRepository;

@Configuration
public class DataSeeder {
    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    CommandLineRunner seedData(SkillRepository skillRepo, JobCategoryRepository categoryRepo) {
        return args -> {
            try {
                // Seed Skills
                String[] skills = { "Project Management", "Time Management", "Java", "React", "Communication",
                        "Leadership", "Problem Solving", "Teamwork", "Adaptability", "Critical Thinking" };
                for (String skillName : skills) {
                    log.info("Checking skill: {}", skillName);
                    if (!skillRepo.existsBySkillName(skillName)) {
                        log.info("Seeding skill: {}", skillName);
                        skillRepo.save(new Skill(null, skillName, SkillType.MAIN, null, null));
                    }
                }

                // Seed Categories
                String[] categories = { "Software Development", "Design", "Marketing", "Finance", "HR", "Sales",
                        "Customer Service", "Operations", "IT", "Legal", "Web Development", "Mobile App Development",
                        "UI/UX Design" };
                for (String categoryName : categories) {
                    log.info("Checking category: {}", categoryName);
                    if (!categoryRepo.existsByName(categoryName)) {
                        JobCategory category = new JobCategory();
                        category.setName(categoryName);
                        log.info("Seeding category: {}", categoryName);
                        categoryRepo.save(category);
                    }
                }

                log.info("Mock skills and categories seeded.");
            } catch (Exception e) {
                log.error("Error while seeding data: ", e);
                throw e;
            }
        };
    }

    @Bean
    CommandLineRunner seedJobs(
            JobRepository jobRepo,
            SkillRepository skillRepo,
            JobCategoryRepository categoryRepo,
            HirerRepository hirerRepo) {

        return args -> {
            if (jobRepo.count() > 0) {
                log.info("Jobs already exist. Skipping job seeding.");
                return;
            }

            List<Skill> allSkills = skillRepo.findAll();
            List<JobCategory> allCategories = categoryRepo.findAll();
            // List<Hirer> allHirers = hirerRepo.findAll();

            if (allSkills.isEmpty() || allCategories.isEmpty()
            // || allHirers.isEmpty()
            ) {
                log.warn("Skills, Categories, or Hirers not found. Please seed them first.");
                return;
            }

            Random random = new Random();

            String[] jobTitles = {
                    "Java Backend Developer", "Frontend React Developer", "UX Designer",
                    "Digital Marketer", "Financial Analyst", "HR Specialist"
            };

            String[] locations = { "Hanoi", "Ho Chi Minh City", "Da Nang", "Remote" };

            for (int i = 0; i < jobTitles.length; i++) {
                Job job = new Job();
                job.setTitle(jobTitles[i]);
                job.setDescription("Description for " + jobTitles[i]);
                job.setLocation(locations[random.nextInt(locations.length)]);
                job.setPaidType((byte) (i % 2)); // 0 or 1
                job.setMinBudget("1000");
                job.setMaxBudget("3000");
                job.setCreatedAt(LocalDateTime.now());
                job.setUpdatedAt(LocalDateTime.now());
                job.setActive(true);

                job.setResponsibilities(List.of("Work in a team", "Deliver features", "Attend daily standups"));
                job.setIdealSkills(List.of("Good communication", "Problem solving"));

                job.setSkills(allSkills.subList(0, Math.min(3, allSkills.size())));
                job.setCategory(allCategories.get(i % allCategories.size()));
                // job.setHirer(allHirers.get(i % allHirers.size()));

                jobRepo.save(job);
                log.info("Seeded job: {}", job.getTitle());
            }

            log.info("All mock jobs seeded.");
        };
    }

}
