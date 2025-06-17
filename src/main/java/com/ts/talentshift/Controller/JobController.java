package com.ts.talentshift.Controller;

import com.ts.talentshift.Dto.Job.JobRequestDto;
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

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody JobRequestDto jobDto) {
        Job created = jobService.createJobFromDto(jobDto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
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

    @GetMapping
    public ResponseEntity<Page<Job>> searchJobs(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int salaryRange,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Specification<Job> spec = Specification.where(JobSpecifications.withTitle(searchTerm))
                .and(JobSpecifications.withLocation(location))
                .and(JobSpecifications.withSalaryRange(salaryRange));

        Sort sortOption = sort.equals("salary-high") ? Sort.by(Sort.Direction.DESC, "salary")
                : sort.equals("salary-low") ? Sort.by(Sort.Direction.ASC, "salary")
                        : Sort.by(Sort.Direction.DESC, "createdAt");

        Pageable pageable = PageRequest.of(page, size, sortOption);

        Page<Job> jobs = jobService.searchJobs(spec, pageable);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getJobLocations() {
        List<String> locations = jobService.getJobLocations();
        return ResponseEntity.ok(locations);
    }


}