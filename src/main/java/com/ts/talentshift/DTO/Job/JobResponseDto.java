package com.ts.talentshift.DTO.Job;

import com.ts.talentshift.Enums.JobStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class JobResponseDto {
    private Long id;
    private String location;
    private String minBudget;
    private String maxBudget;
    private String paymentType;
    private String publishStatus;
    private String category;
    private List<String> skills;
    private List<String> idealSkills;
    private String jobTitle;
    private String projectName;
    private String description;
    private List<String> keyResponsibilities;

    private Boolean isFeatured;
    private JobStatus status;
    private LocalDateTime expiredAt;
    private LocalDateTime createdAt;

    private Long hirerId;
    private String companyName;
    private String companyLogoPath;

    private List<JobApplicationResponseDto> applicant = new ArrayList<>();
    private boolean isBookmarked;
}