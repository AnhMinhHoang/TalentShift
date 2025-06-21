package com.ts.talentshift.DTO.Freelancer;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ExperienceDTO {
    private String jobPosition;
    private String companyName;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean currentlyWork;
    private String jobDescription;
    private List<ProjectDTO> projects;
}
