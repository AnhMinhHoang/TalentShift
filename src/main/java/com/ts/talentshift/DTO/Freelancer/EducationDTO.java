package com.ts.talentshift.DTO.Freelancer;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EducationDTO {
    private String schoolName;
    private String majorName;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean currentlyStudy;
    private String description;
}
