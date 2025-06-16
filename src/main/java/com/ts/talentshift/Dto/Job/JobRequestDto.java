package com.ts.talentshift.Dto.Job;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JobRequestDto {
    private String jobTitle;
    private String projectName;
    private String projectDescription;
    private String category;
    private List<String> skills;
    private List<String> keyResponsibilities;
    private List<String> idealSkills;
    private String minBudget;
    private String maxBudget;
    private String paymentType;
}
