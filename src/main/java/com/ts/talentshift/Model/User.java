package com.ts.talentshift.Model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

@Entity
@NoArgsConstructor
@Data

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NaturalId
    @Column(unique = true)
    private String email;
    private String firstName;
    private String lastName;
    private short role;
    private String avatar;
    private String password;
}
