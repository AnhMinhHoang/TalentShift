package com.ts.talentshift.DTO.Hirer;

import lombok.Data;

@Data
public class HirerListDTO {
    private Long userId;
    private String companyName;
    private String logoPath;
    private boolean premium;
    private boolean verified;
} 