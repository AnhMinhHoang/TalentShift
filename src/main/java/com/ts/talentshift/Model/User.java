package com.ts.talentshift.Model;

import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.Freelancer.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
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

    // Freelancer fields
    @Column(length = 500)
    private String bio;
    private String location;
    private LocalDate birthDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educations = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certificate> certificates = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Link> links = new ArrayList<>();

    // Hirer fields
    private String companyName;

    @Column(length = 1000)
    private String description;

    private String contactLink;
    private String logoPath;
    private String registrationFilePath;
    
    @Column(nullable = false)
    private boolean verified = false;

    // Helper methods to manage bidirectional relationships
    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.setUser(this);
    }

    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.setUser(null);
    }

    public void addExperience(Experience experience) {
        experiences.add(experience);
        experience.setUser(this);
    }

    public void removeExperience(Experience experience) {
        experiences.remove(experience);
        experience.setUser(null);
    }

    public void addEducation(Education education) {
        educations.add(education);
        education.setUser(this);
    }

    public void removeEducation(Education education) {
        educations.remove(education);
        education.setUser(null);
    }

    public void addCertificate(Certificate certificate) {
        certificates.add(certificate);
        certificate.setUser(this);
    }

    public void removeCertificate(Certificate certificate) {
        certificates.remove(certificate);
        certificate.setUser(null);
    }

    public void addLink(Link link) {
        links.add(link);
        link.setUser(this);
    }

    public void removeLink(Link link) {
        links.remove(link);
        link.setUser(null);
    }
}
