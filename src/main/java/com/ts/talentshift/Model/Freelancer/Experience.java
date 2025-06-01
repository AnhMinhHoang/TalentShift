package com.ts.talentshift.Model.Freelancer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experiences")

public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expId;

    private String jobPosition;
    private String companyName;

    private LocalDate startDate;
    private LocalDate endDate;

    private boolean currentlyWork;

    @Column(length = 1000)
    private String jobDescription;

    @ManyToOne
    @JoinColumn(name = "freelancerId")
    private Freelancer freelancer;

    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();
}
