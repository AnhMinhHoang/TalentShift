package com.ts.talentshift.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.ts.talentshift.Model.Job.Job;

public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    List<Job> findByIsActiveTrue();

    @Query("SELECT DISTINCT j.location FROM Job j WHERE j.location IS NOT NULL")
    List<String> findDistinctLocations();
}