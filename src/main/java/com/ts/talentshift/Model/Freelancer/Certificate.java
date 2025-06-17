package com.ts.talentshift.Model.Freelancer;

import com.ts.talentshift.Model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "certificates")
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long certificateId;

    private String certificateName;
    private String achievement;
    private LocalDate certificateDate;

    @Column(length = 1000)
    private String certificateDescription;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
