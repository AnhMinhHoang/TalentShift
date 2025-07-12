package com.ts.talentshift.Service;

import com.ts.talentshift.DTO.Job.RatingResponseDto;
import com.ts.talentshift.DTO.RatingRequestDto;
import com.ts.talentshift.Enums.ApplicationStatus;
import com.ts.talentshift.Enums.JobStatus;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobApplication;
import com.ts.talentshift.Model.Rating;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.JobRepository;
import com.ts.talentshift.Repository.RatingRepository;
import com.ts.talentshift.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public RatingResponseDto createRating(Long jobId, Long freelancerId, RatingRequestDto ratingDto, Long currentUserId) {
        // Fetch job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Verify hirer
        if (!job.getUser().getUserId().equals(currentUserId)) {
            throw new RuntimeException("Only the hirer can rate the freelancer for this job");
        }
        if (job.getUser().getRole() != Role.HIRER) {
            throw new RuntimeException("Only users with HIRER role can create ratings");
        }

        // Fetch freelancer
        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        if (freelancer.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only users with FREELANCER role can be rated");
        }

        // Verify application status
        JobApplication application = job.getApplications().stream()
                .filter(app -> app.getApplicant().getUserId().equals(freelancerId) && app.getStatus() == ApplicationStatus.COMPLETED)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No completed application found for this freelancer"));

        // Check for existing rating
        if (ratingRepository.findByJobIdAndFreelancerUserId(jobId, freelancerId).isPresent()) {
            throw new RuntimeException("A rating for this job and freelancer already exists");
        }

        // Create rating
        Rating rating = new Rating();
        rating.setJob(job);
        rating.setHirer(job.getUser());
        rating.setFreelancer(freelancer);
        rating.setStars(ratingDto.getStars());
        rating.setComment(ratingDto.getComment());

        Rating savedRating = ratingRepository.save(rating);

        // Map to response DTO
        return mapToResponseDto(savedRating);
    }

    public List<RatingResponseDto> getAllRatingsByFreelancer(Long freelancerId) {
        User freelancer = userRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
        if (freelancer.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only users with FREELANCER role can have ratings retrieved");
        }

        return ratingRepository.findByFreelancerUserId(freelancerId)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private RatingResponseDto mapToResponseDto(Rating rating) {
        RatingResponseDto dto = new RatingResponseDto();
        dto.setId(rating.getId());
        dto.setJobId(rating.getJob().getId());
        dto.setJobTitle(rating.getJob().getTitle());
        dto.setHirerId(rating.getHirer().getUserId());
        dto.setHirerName(rating.getHirer().getCompanyName() != null ? rating.getHirer().getCompanyName() : rating.getHirer().getFullName());
        dto.setFreelancerId(rating.getFreelancer().getUserId());
        dto.setFreelancerName(rating.getFreelancer().getFullName());
        dto.setStars(rating.getStars());
        dto.setComment(rating.getComment());
        return dto;
    }
}
