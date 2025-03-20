package com.ts.talentshift.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        return httpSecurity
//
//                .authorizeHttpRequests(authorizeRequests ->{
//                    authorizeRequests.requestMatchers("/").permitAll();
//                    authorizeRequests.anyRequest().authenticated();
//                })
//
//                .build();

        httpSecurity
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // Allow all requests
                .csrf(AbstractHttpConfigurer::disable); // Disable CSRF (for API calls)
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
}
