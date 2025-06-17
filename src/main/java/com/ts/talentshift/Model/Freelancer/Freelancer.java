package com.ts.talentshift.Model.Freelancer;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ts.talentshift.Model.Skill;
import com.ts.talentshift.Model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "freelancers")
@PrimaryKeyJoinColumn(name = "userId")

public class Freelancer extends User {
    @Column(length = 500)
    private String bio;
    private String location;
    private LocalDate birthDate;

    @OneToMany(mappedBy = "freelancer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "freelancer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educations = new ArrayList<>();

    @OneToMany(mappedBy = "freelancer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certificate> certificates = new ArrayList<>();

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "freelancer_skills", joinColumns = @JoinColumn(name = "freelancer_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @JsonManagedReference("freelancer-skill")
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "freelancer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Link> links = new ArrayList<>();

}
