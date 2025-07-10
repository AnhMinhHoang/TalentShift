package com.ts.talentshift.DTO.Freelancer;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class FreelancerSideBarUpdateDTO {
    private String fullName;
    private String avatar;
    private String location;
    private String phone;
    private LocalDate birthDate;
    private List<LinkDTO> links;

}
