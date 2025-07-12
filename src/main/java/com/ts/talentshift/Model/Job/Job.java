package com.ts.talentshift.Model.Job;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ts.talentshift.Enums.JobStatus;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String location;
    private byte paidType;
    private String minBudget;
    private String maxBudget;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    private boolean isPublish = false;
    private boolean isFeatured = false;

    @Enumerated(EnumType.STRING)
    private JobStatus status = JobStatus.PENDING;

    private LocalDateTime expiredAt;

    @ElementCollection
    @CollectionTable(name = "job_key_responsibilities", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "responsibility")
    private List<String> responsibilities = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "job_ideal_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "ideal_skill")
    private List<String> idealSkills = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private List<Skill> skills;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private JobCategory category;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobApplication> applications = new ArrayList<>();

    // Helper methods for applications
    public void addApplication(JobApplication application) {
        applications.add(application);
        application.setJob(this);
    }

    public void removeApplication(JobApplication application) {
        applications.remove(application);
        application.setJob(null);
    }
}