package com.ts.talentshift.Model.Freelancer;

import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;

    @Enumerated(EnumType.STRING)
    private SkillType skillType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
