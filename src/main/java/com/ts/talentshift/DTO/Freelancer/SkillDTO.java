package com.ts.talentshift.DTO.Freelancer;

import com.ts.talentshift.Enums.SkillType;
import lombok.Data;

@Data
public class SkillDTO {
    private String skillName;
    private SkillType skillType;
}
