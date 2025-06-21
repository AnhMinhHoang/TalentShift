package com.ts.talentshift.Service;

import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
}
