package com.ts.talentshift.Config;

import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Model.Skill;
import com.ts.talentshift.Repository.JobCategoryRepository;
import com.ts.talentshift.Repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(SkillRepository skillRepo, JobCategoryRepository categoryRepo) {
        return args -> {
            // Seed Skills
            String[] skills = { "Project Management", "Time Management", "Java", "React", "Communication",
                    "Leadership" };
            for (String skillName : skills) {
                if (!skillRepo.existsBySkillName(skillName)) {
                    skillRepo.save(new Skill(null, skillName, SkillType.MAIN, null, null));
                }
            }

            // Seed Categories
            String[] categories = { "Software Development", "Design", "Marketing", "Finance", "HR", "Web Development",
                    "Mobile App Development", "UI/UX Design", "Graphic Design", "Sales", "Customer Service", "IT" };
            for (String categoryName : categories) {
                if (!categoryRepo.existsByName(categoryName)) {
                    JobCategory category = new JobCategory();
                    category.setName(categoryName);
                    categoryRepo.save(category);
                }
            }

            System.out.println("Mock skills and categories seeded.");
        };
    }
}
