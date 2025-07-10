package com.ts.talentshift.Service;

import com.ts.talentshift.DTO.Job.JobResponseDto;
import com.ts.talentshift.Enums.JobStatus;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.JobCategoryRepository;
import com.ts.talentshift.Repository.JobRepository;
import com.ts.talentshift.Repository.SkillRepository;

import com.ts.talentshift.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final JobCategoryRepository jobCategoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public JobService(JobRepository jobRepository,
            SkillRepository skillRepository,
            JobCategoryRepository jobCategoryRepository,
            UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.skillRepository = skillRepository;
        this.jobCategoryRepository = jobCategoryRepository;
        this.userRepository = userRepository;
    }

    private JobResponseDto mapToResponseDto(Job job) {
        JobResponseDto dto = new JobResponseDto();

        dto.setId(job.getId());
        dto.setJobTitle(job.getTitle());
        dto.setProjectDescription(job.getDescription());
        dto.setLocation(job.getLocation());
        dto.setMinBudget(job.getMinBudget());
        dto.setMaxBudget(job.getMaxBudget());
        dto.setPaymentType(job.getPaidType() == 0 ? "Hourly" : "Fixed");
        dto.setPublishStatus(job.isPublish() ? "PUBLISHED" : "DRAFT");
        dto.setCategory(job.getCategory() != null ? job.getCategory().getName() : null);
        dto.setKeyResponsibilities(job.getResponsibilities());
        dto.setIdealSkills(job.getIdealSkills());

        dto.setSkills(
                job.getSkills() != null
                        ? job.getSkills().stream().map(Skill::getSkillName).toList()
                        : List.of());

        dto.setStatus(job.getStatus() != null ? job.getStatus() : null);
        dto.setIsFeatured(job.isFeatured());

        dto.setExpiredAt(job.getExpiredAt());

        if (job.getUser() != null) {
            dto.setHirerId(job.getUser().getUserId());
        }

        return dto;
    }

    public List<JobResponseDto> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public List<String> findDistinctLocations() {
        return jobRepository.findDistinctLocations();
    }

    public List<JobResponseDto> getAllActiveJobs() {
        return jobRepository.findByIsPublishTrue()
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public Job createJobFromDto(JobResponseDto dto) {
        Job job = new Job();

        // Basic info
        job.setTitle(dto.getJobTitle());
        job.setDescription(dto.getProjectDescription());
        job.setMinBudget(dto.getMinBudget());
        job.setMaxBudget(dto.getMaxBudget());
        job.setPaidType("hourly".equalsIgnoreCase(dto.getPaymentType()) ? (byte) 0 : (byte) 1);
        job.setResponsibilities(dto.getKeyResponsibilities());
        job.setIdealSkills(dto.getIdealSkills());
        job.setLocation(dto.getLocation());
        job.setPublish("PUBLISHED".equalsIgnoreCase(dto.getPublishStatus()));

        // Handle optional new fields
        job.setFeatured(Boolean.TRUE.equals(dto.getIsFeatured())); // default false if null
        job.setStatus(dto.getStatus() != null ? dto.getStatus() : JobStatus.PENDING);
        job.setExpiredAt(dto.getExpiredAt());

        // Category
        JobCategory category = jobCategoryRepository.findByName(dto.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found: " + dto.getCategory()));
        job.setCategory(category);

        // Skills
        List<Skill> skills = dto.getSkills().stream()
                .map(skillName -> skillRepository.findBySkillName(skillName)
                        .orElseThrow(() -> new RuntimeException("Skill not found: " + skillName)))
                .toList();
        job.setSkills(skills);

        if (dto.getHirerId() != null) {
            User hirer = userRepository.findById(dto.getHirerId())
                    .orElseThrow(() -> new RuntimeException("Hirer not found with ID: " + dto.getHirerId()));

            if (hirer.getRole() != Role.HIRER) {
                throw new RuntimeException("User with ID " + dto.getHirerId() + " is not a Hirer.");
            }

            job.setUser(hirer);
        }

        return jobRepository.save(job);
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<JobResponseDto> getPublishedJobsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.HIRER) {
            throw new RuntimeException("User is not authorized to access posted jobs");
        }

        return jobRepository.findByUser_UserIdAndIsPublishTrue(userId)
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public List<JobResponseDto> getUnpublishedJobsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.HIRER) {
            throw new RuntimeException("User is not authorized to access draft jobs");
        }

        return jobRepository.findByUser_UserIdAndIsPublishFalse(userId)
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public JobResponseDto publishJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setPublish(true);
        job.setUpdatedAt(LocalDateTime.now());
        job.setStatus(JobStatus.ACTIVE); // Optional

        Job saved = jobRepository.save(job);
        return mapToResponseDto(saved);
    }

    public JobResponseDto updateJob(Long jobId, JobResponseDto dto) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setTitle(dto.getJobTitle());
        job.setDescription(dto.getProjectDescription());
        job.setLocation(dto.getLocation());
        job.setMinBudget(dto.getMinBudget());
        job.setMaxBudget(dto.getMaxBudget());
        job.setPaidType("hourly".equalsIgnoreCase(dto.getPaymentType()) ? (byte) 0 : (byte) 1);

        job.getResponsibilities().clear();
        if (dto.getKeyResponsibilities() != null) {
            job.getResponsibilities().addAll(dto.getKeyResponsibilities());
        }

        job.getIdealSkills().clear();
        if (dto.getIdealSkills() != null) {
            job.getIdealSkills().addAll(dto.getIdealSkills());
        }

        job.setPublish("PUBLISHED".equalsIgnoreCase(dto.getPublishStatus()));
        job.setFeatured(Boolean.TRUE.equals(dto.getIsFeatured()));
        job.setStatus(dto.getStatus() != null ? dto.getStatus() : JobStatus.PENDING);
        job.setExpiredAt(dto.getExpiredAt());
        job.setUpdatedAt(LocalDateTime.now());

        JobCategory category = jobCategoryRepository.findByName(dto.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        job.setCategory(category);

        List<Skill> skills = dto.getSkills().stream()
                .map(name -> skillRepository.findBySkillName(name)
                        .orElseThrow(() -> new RuntimeException("Skill not found: " + name)))
                .toList();

        job.getSkills().clear();
        job.getSkills().addAll(skills);

        return mapToResponseDto(jobRepository.save(job));
    }

    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }

}