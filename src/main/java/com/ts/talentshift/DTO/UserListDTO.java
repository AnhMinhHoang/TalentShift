package com.ts.talentshift.DTO;

import lombok.Data;

@Data
public class UserListDTO {
    private Long userId;
    private String role;
    private String fullName;
    private String companyName;
    private String avatar;
    private String logoPath;
    private boolean premium;
    private boolean verified;
} 