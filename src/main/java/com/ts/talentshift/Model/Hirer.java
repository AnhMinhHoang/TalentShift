package com.ts.talentshift.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hirers")
@PrimaryKeyJoinColumn(name = "userId")
public class Hirer extends User {
    private String companyName;

    @Column(length = 1000)
    private String description;

    private String contactLink;
    private String logoPath;
    private String registrationFilePath;
}
