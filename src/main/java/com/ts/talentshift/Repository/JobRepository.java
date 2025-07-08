package com.ts.talentshift.Repository;

import com.ts.talentshift.Model.Job.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByIsPublishTrue();

    @Query("SELECT DISTINCT j.location FROM Job j WHERE j.location IS NOT NULL")
    List<String> findDistinctLocations();

    List<Job> findByUser_UserIdAndIsPublishTrue(Long userId);
    List<Job> findByUser_UserIdAndIsPublishFalse(Long userId);

}