package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Freelancer.SkillDTO;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public List<SkillDTO> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/by-category")
    public List<SkillDTO> getSkillsByCategory(@RequestParam String category) {
        return skillService.getSkillsByCategory(category);
    }
}
