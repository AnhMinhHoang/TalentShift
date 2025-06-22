package com.ts.talentshift.Model.Job;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ts.talentshift.Model.Freelancer.Skill;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ts.talentshift.Model.User;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id" // or "userId" for User, "id"
                                                                                          // for Skill/Job
)
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private byte paidType;
    private String minBudget;
    private String maxBudget;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private boolean isActive = false;

    @ElementCollection
    @CollectionTable(name = "job_key_responsibilities", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "responsibility")
    private List<String> responsibilities;

    @ElementCollection
    @CollectionTable(name = "job_ideal_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "ideal_skill")
    private List<String> idealSkills;

    @ManyToMany
    // @JsonManagedReference("job-skill")
    @JoinTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private List<Skill> skills;

    @ManyToOne
    @JoinColumn(name = "category_id")
    // @JsonBackReference
    private JobCategory category;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
