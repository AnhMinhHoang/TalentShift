package com.ts.talentshift.DTO.Hirer;

import lombok.Data;

@Data
public class HirerProfileUpdateRequest {
    private String phone;
    private String companyName;
    private String description;
    private String contactLink;
    private String location;
}