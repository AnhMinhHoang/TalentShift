package com.ts.talentshift.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RatingRequestDto {
    private Integer stars;
    private String comment;
}
