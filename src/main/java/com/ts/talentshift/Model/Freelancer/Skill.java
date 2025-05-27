package com.ts.talentshift.Model.Freelancer;

import com.ts.talentshift.Enums.SkillType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name = "freelancerId")
    private Freelancer freelancer;
}
