package com.ts.talentshift.DTO.Job;

import com.ts.talentshift.Enums.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusUpdateRequest {
    private ApplicationStatus status;
}
