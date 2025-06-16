import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Freelancer.Freelancer;
import com.ts.talentshift.Model.Job.Job;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    private String skillName;

    @Enumerated(EnumType.STRING)
    private SkillType skillType;

    @ManyToMany(mappedBy = "skills")
    @JsonBackReference("freelancer-skill")
    private List<Freelancer> freelancers = new ArrayList<>();

    @ManyToMany(mappedBy = "skills")
    @JsonBackReference("job-skill")
    private List<Job> jobs;
}
