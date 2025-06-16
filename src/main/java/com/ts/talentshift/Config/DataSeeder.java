package com.ts.talentshift.Config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Skill;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Repository.JobCategoryRepository;
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
                        "Customer Service", "Operations", "IT", "Legal" };
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
}
