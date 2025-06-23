package com.ts.talentshift.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoMoResponse {
    private String payUrl;
    private int resultCode;
    private String message;
    private String responseTime;
}
