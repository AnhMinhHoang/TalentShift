package com.ts.talentshift.Model;


import com.ts.talentshift.Enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @NaturalId
    @Column(unique = true)
    private String email;

    private String firstName;
    private String lastName;
    private String gender;
    private String avatar;
    private String password;
    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;
}
