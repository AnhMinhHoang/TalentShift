package com.ts.talentshift;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TalentShiftApplication {

	public static void main(String[] args) {
		SpringApplication.run(TalentShiftApplication.class, args);
	}

}
