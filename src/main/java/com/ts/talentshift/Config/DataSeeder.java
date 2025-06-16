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
            String[] skills = { "Project Management", "Time Management", "Java", "React", "Communication" };
            for (String skillName : skills) {
                if (!skillRepo.existsBySkillName(skillName)) {
                    skillRepo.save(new Skill(null, skillName, SkillType.MAIN, null, null));
                }
            }

            // Seed Categories
            String[] categories = { "Software Development", "Design", "Marketing", "Finance", "HR" };
            for (String categoryName : categories) {
                if (!categoryRepo.existsByName(categoryName)) {
                    categoryRepo.save(new JobCategory(null, categoryName));
                }
            }

            System.out.println("✅ Mock skills and categories seeded.");
        };
    }
}