package com.ts.talentshift.Service;

import com.ts.talentshift.DTO.Freelancer.SkillDTO;
import com.ts.talentshift.Enums.SkillType;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Repository.SkillRepository;
import com.ts.talentshift.Resource.SkillData;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillDTO> getAllSkills() {
        return skillRepository.findAll()
                .stream()
                .map(skill -> {
                    SkillDTO dto = new SkillDTO();
                    dto.setSkillName(skill.getSkillName());
                    dto.setSkillType(skill.getSkillType());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<SkillDTO> getSkillsByCategory(String categoryName) {
        return SkillData.SKILL_DATA.getOrDefault(categoryName, List.of())
                .stream()
                .map(skillName -> {
                    SkillDTO dto = new SkillDTO();
                    dto.setSkillName(skillName);
                    dto.setSkillType(SkillType.MAIN); // hardcoded to MAIN
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
