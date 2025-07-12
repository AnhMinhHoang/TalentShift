package com.ts.talentshift.Repository;

import com.ts.talentshift.Model.Job.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    Optional<JobApplication> findByJobIdAndApplicantUserId(Long jobId, Long userId);
}
