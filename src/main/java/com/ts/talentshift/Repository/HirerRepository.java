package com.ts.talentshift.Repository;

import com.ts.talentshift.Model.Hirer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HirerRepository extends JpaRepository<Hirer, Long> {
    // Add custom methods later if needed
}
