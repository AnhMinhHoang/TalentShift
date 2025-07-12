package com.ts.talentshift.DTO.Job;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingResponseDto {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long hirerId;
    private String hirerName;
    private Long freelancerId;
    private String freelancerName;
    private Integer stars;
    private String comment;
}
