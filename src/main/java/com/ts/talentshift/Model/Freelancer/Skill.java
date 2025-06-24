package com.ts.talentshift.Model.Freelancer;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "skills")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" // or "userId" for User, "id"
                                                                                          // for Skill/Job
)
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;

    @Enumerated(EnumType.STRING)
    private SkillType skillType;

    @Setter
    @Getter
    @ManyToMany
    @JoinTable(name = "user_skill", // Name of the join table
            joinColumns = @JoinColumn(name = "skill_id"), // Foreign key for Skill
            inverseJoinColumns = @JoinColumn(name = "userId") // Foreign key for User
    )
    private List<User> users = new ArrayList<>();

    @ManyToMany(mappedBy = "skills")
    private List<Job> jobs;
}
