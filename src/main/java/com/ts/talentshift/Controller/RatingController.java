package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Job.RatingResponseDto;
import com.ts.talentshift.DTO.RatingRequestDto;
import com.ts.talentshift.Service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/job/{jobId}/freelancer/{freelancerId}")
    public ResponseEntity<?> createRating(
            @PathVariable Long jobId,
            @PathVariable Long freelancerId,
            @RequestBody  RatingRequestDto ratingDto,
            @RequestParam Long userId) {
        try {
            RatingResponseDto createdRating = ratingService.createRating(jobId, freelancerId, ratingDto, userId);
            return ResponseEntity.ok(createdRating);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<RatingResponseDto>> getAllRatingsByFreelancer(@PathVariable Long freelancerId) {
        try {
            List<RatingResponseDto> ratings = ratingService.getAllRatingsByFreelancer(freelancerId);
            return ResponseEntity.ok(ratings);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
