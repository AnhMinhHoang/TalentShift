package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Job.JobResponseDto;
import com.ts.talentshift.Model.Job.Job;
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
@RequestMapping("/jobs")
public class JobController {
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobResponseDto>> getJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/active")
    public ResponseEntity<List<JobResponseDto>> getAllActiveJobs() {
        return ResponseEntity.ok(jobService.getAllActiveJobs());
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody JobResponseDto jobDto) {
        Job created = jobService.createJobFromDto(jobDto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
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

}
