package com.ts.talentshift.Model.Job;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ts.talentshift.Model.Hirer;
import com.ts.talentshift.Model.Skill;

@Entity
@Table(name = "jobs")
@Getter
@Setter
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
    @JsonManagedReference("job-skill")
    @JoinTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private List<Skill> skills;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private JobCategory category;

    @ManyToOne
    @JoinColumn(name = "hirer_id")
    private Hirer hirer;
}
