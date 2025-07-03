package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Job.JobRequestDto;
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
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<Job>> getJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody JobRequestDto jobDto) {
        Job created = jobService.createJobFromDto(jobDto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Job>> getAllActiveJobs() {
        return ResponseEntity.ok(jobService.getAllActiveJobs());
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

}
