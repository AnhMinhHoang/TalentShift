package com.ts.talentshift.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.Freelancer.*;
import com.ts.talentshift.Model.Job.JobApplication;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NaturalId
    @Column(unique = true)
    private String email;

    private String fullName = "User";
    private String gender;
    private String avatar;
    private String password;
    private String phone;
    private boolean premium = false;
    private BigDecimal balance = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Freelancer fields
    @Column(length = 1000)
    private String bio;
    private String location;
    private LocalDate birthDate;

    @ManyToMany(mappedBy = "users", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
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
    private String companyName = "Company A";

    @Column(length = 1000)
    private String description;

    private String contactLink;
    @Column(length = 1024)
    private String logoPath;
    private String registrationFilePath;

    @Column(nullable = false)
    private boolean verified = false;

    @Column(nullable = false)
    private boolean isFillingForm = false;

    // Job applications (for freelancers to see applied/bookmarked jobs)
    @OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobApplication> applications = new ArrayList<>();

    // Helper methods for skills
    public void addSkill(Skill skill) {
        skills.add(skill);
        if (!skill.getUsers().contains(this)) {
            skill.getUsers().add(this);
        }
    }

    public void removeSkill(Skill skill) {
        skills.remove(skill);
        if (skill.getUsers().contains(this)) {
            skill.getUsers().remove(this);
        }
    }

    // Helper methods for experiences
    public void addExperience(Experience experience) {
        experiences.add(experience);
        experience.setUser(this);
    }

    public void removeExperience(Experience experience) {
        experiences.remove(experience);
        experience.setUser(null);
    }

    // Helper methods for educations
    public void addEducation(Education education) {
        educations.add(education);
        education.setUser(this);
    }

    public void removeEducation(Education education) {
        educations.remove(education);
        education.setUser(null);
    }

    // Helper methods for certificates
    public void addCertificate(Certificate certificate) {
        certificates.add(certificate);
        certificate.setUser(this);
    }

    public void removeCertificate(Certificate certificate) {
        certificates.remove(certificate);
        certificate.setUser(null);
    }

    // Helper methods for links
    public void addLink(Link link) {
        links.add(link);
        link.setUser(this);
    }

    public void removeLink(Link link) {
        links.remove(link);
        link.setUser(null);
    }

    // Helper methods for job applications
    public void addApplication(JobApplication application) {
        applications.add(application);
        application.setApplicant(this);
    }

    public void removeApplication(JobApplication application) {
        applications.remove(application);
        application.setApplicant(null);
    }
}