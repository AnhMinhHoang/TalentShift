package com.ts.talentshift.Model.Hirer;

import com.ts.talentshift.Model.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@DiscriminatorValue("Hirer")
public class Hirer extends User {

    public String getCompanySummary() {
        return this.getCompanyName() + " - " + this.getDescription();
    }
}
