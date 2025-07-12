package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Job.JobResponseDto;
import com.ts.talentshift.DTO.Job.JobStatusUpdateRequest;
import com.ts.talentshift.DTO.Job.StatusUpdateRequest;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobApplication;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Service.JobService;
import com.ts.talentshift.Service.JobSpecifications;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobResponseDto>> getJobs(@RequestParam Long userId) {
        return ResponseEntity.ok(jobService.getAllJobs(userId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<JobResponseDto>> getAllActiveJobs(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(jobService.getAllActiveJobs(userId));
    }

    @PostMapping
    public ResponseEntity<JobResponseDto> createJob(@RequestBody JobResponseDto jobDto) {
        JobResponseDto created = jobService.createJobFromDto(jobDto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDto> getJobById(@PathVariable Long id, @RequestParam(required = false) Long userId) {
        return jobService.getJobDtoById(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getJobLocations() {
        List<String> locations = jobService.findDistinctLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/user/{userId}/published")
    public ResponseEntity<List<JobResponseDto>> getPublishedJobsByUser(@PathVariable Long userId) {
        try {
            List<JobResponseDto> jobs = jobService.getPublishedJobsByUser(userId);
            return ResponseEntity.ok(jobs);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/user/{userId}/drafts")
    public ResponseEntity<List<JobResponseDto>> getDraftJobsByUser(@PathVariable Long userId) {
        try {
            List<JobResponseDto> jobs = jobService.getUnpublishedJobsByUser(userId);
            return ResponseEntity.ok(jobs);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{jobId}/publish")
    public ResponseEntity<JobResponseDto> publishDraftJob(@PathVariable Long jobId) {
        JobResponseDto updatedJob = jobService.publishJob(jobId);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<JobResponseDto> updateJob(@PathVariable Long jobId, @RequestBody JobResponseDto jobDto) {
        JobResponseDto updated = jobService.updateJob(jobId, jobDto);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<JobApplication> applyToJob(@PathVariable Long jobId, @RequestParam Long userId, @RequestBody String coverLetter) {
        try {
            JobApplication application = jobService.applyToJob(jobId, userId, coverLetter);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{jobId}/bookmark")
    public ResponseEntity<JobApplication> toggleBookmark(@PathVariable Long jobId, @RequestParam Long userId) {
        try {
            JobApplication application = jobService.toggleBookmark(jobId, userId);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}/applied")
    public ResponseEntity<List<JobResponseDto>> getAppliedJobsByUser(@PathVariable Long userId) {
        try {
            List<JobResponseDto> jobs = jobService.getAppliedJobsByUser(userId);
            return ResponseEntity.ok(jobs);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/user/{userId}/bookmarked")
    public ResponseEntity<List<JobResponseDto>> getBookmarkedJobsByUser(@PathVariable Long userId) {
        try {
            List<JobResponseDto> jobs = jobService.getBookmarkedJobsByUser(userId);
            return ResponseEntity.ok(jobs);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{jobId}/application/{applicantId}")
    public ResponseEntity<JobResponseDto> updateApplicationStatus(
            @PathVariable Long jobId,
            @PathVariable Long applicantId,
            @RequestBody StatusUpdateRequest request,
            @RequestParam Long userId) {
        try {
            JobResponseDto updatedJob = jobService.updateApplicationStatus(jobId, applicantId, request.getStatus(), userId);
            return ResponseEntity.ok(updatedJob);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{jobId}/status")
    public ResponseEntity<?> updateJobStatus(
            @PathVariable Long jobId,
            @RequestBody JobStatusUpdateRequest request,
            @RequestParam Long userId) {
        try {
            JobResponseDto updatedJob = jobService.updateJobStatus(jobId, request.getStatus(), userId);
            return ResponseEntity.ok(updatedJob);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}