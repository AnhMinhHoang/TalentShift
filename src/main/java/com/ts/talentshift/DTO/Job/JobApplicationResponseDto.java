package com.ts.talentshift.DTO.Job;

import com.ts.talentshift.Enums.ApplicationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobApplicationResponseDto {
    private Long id;
    private Long applicantId;
    private String applicantName;
    private String avatar;
    private LocalDateTime appliedAt;
    private ApplicationStatus status;
    private String coverLetter;
    private boolean isBookmarked;
}