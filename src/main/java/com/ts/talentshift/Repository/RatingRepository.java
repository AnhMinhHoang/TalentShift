package com.ts.talentshift.Repository;

import com.ts.talentshift.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByFreelancerUserId(Long freelancerId);
    Optional<Rating> findByJobIdAndFreelancerUserId(Long jobId, Long freelancerId);
}
