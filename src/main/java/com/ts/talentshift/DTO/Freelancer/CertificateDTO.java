package com.ts.talentshift.DTO.Freelancer;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CertificateDTO {
    private String certificateName;
    private String achievement;
    private LocalDate certificateDate;
    private String certificateDescription;
}
