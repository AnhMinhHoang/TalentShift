package com.ts.talentshift.Model.Freelancer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "projects")

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String projectName;
    private String projectTime;

    @Column(length = 1000)
    private String projectDescription;

    @ManyToOne
    @JoinColumn(name = "experienceId")
    @JsonBackReference
    private Experience experience;
}
