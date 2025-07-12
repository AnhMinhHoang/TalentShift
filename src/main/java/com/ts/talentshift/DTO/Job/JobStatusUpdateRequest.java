package com.ts.talentshift.DTO.Job;

import com.ts.talentshift.Enums.JobStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobStatusUpdateRequest {
    private JobStatus status;
}
