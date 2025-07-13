package com.ts.talentshift.Service;

import com.ts.talentshift.DTO.Job.JobResponseDto;
import com.ts.talentshift.DTO.Job.JobApplicationResponseDto;
import com.ts.talentshift.Enums.ApplicationStatus;
import com.ts.talentshift.Enums.JobStatus;
import com.ts.talentshift.Enums.Role;
import com.ts.talentshift.Model.Freelancer.Skill;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobApplication;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.JobCategoryRepository;
import com.ts.talentshift.Repository.JobRepository;
import com.ts.talentshift.Repository.SkillRepository;
import com.ts.talentshift.Repository.UserRepository;
import com.ts.talentshift.Repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final JobCategoryRepository jobCategoryRepository;
    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserService userService;

    @Autowired
    public JobService(JobRepository jobRepository,
                      SkillRepository skillRepository,
                      JobCategoryRepository jobCategoryRepository,
                      UserRepository userRepository,
                      JobApplicationRepository jobApplicationRepository,
                      UserService userService) {
        this.jobRepository = jobRepository;
        this.skillRepository = skillRepository;
        this.jobCategoryRepository = jobCategoryRepository;
        this.userRepository = userRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.userService = userService;
    }

    private JobResponseDto mapToResponseDto(Job job, Long currentUserId) {
        JobResponseDto dto = new JobResponseDto();

        dto.setId(job.getId());
        dto.setJobTitle(job.getTitle());
        dto.setDescription(job.getDescription());
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
        dto.setCreatedAt(job.getCreatedAt());

        if (job.getUser() != null) {
            dto.setHirerId(job.getUser().getUserId());
            dto.setCompanyName(job.getUser().getCompanyName());
            dto.setCompanyLogoPath(job.getUser().getLogoPath());
        }

        // Map applications to JobApplicationResponseDto
        dto.setApplicant(
                job.getApplications() != null
                        ? job.getApplications().stream()
                        .map(app -> {
                            JobApplicationResponseDto appDto = new JobApplicationResponseDto();
                            appDto.setId(app.getId());
                            appDto.setApplicantId(app.getApplicant().getUserId());
                            appDto.setApplicantName(app.getApplicant().getFullName());
                            appDto.setAvatar(app.getApplicant().getAvatar());
                            appDto.setAppliedAt(app.getAppliedAt());
                            appDto.setStatus(app.getStatus());
                            appDto.setCoverLetter(app.getCoverLetter());
                            appDto.setBookmarked(app.isBookmarked());
                            return appDto;
                        })
                        .toList()
                        : List.of());

        // Set isBookmarked for the current user
        if (currentUserId != null) {
            boolean isBookmarked = job.getApplications() != null
                    && job.getApplications().stream()
                    .anyMatch(app -> app.getApplicant().getUserId().equals(currentUserId)
                            && app.isBookmarked());
            dto.setBookmarked(isBookmarked);
        } else {
            dto.setBookmarked(false); // Default to false for unauthenticated users
        }

        return dto;
    }

    public List<JobResponseDto> getAllJobs(Long currentUserId) {
        return jobRepository.findAll()
                .stream()
                .map(job -> mapToResponseDto(job, currentUserId))
                .toList();
    }

    public List<String> findDistinctLocations() {
        return jobRepository.findDistinctLocations();
    }

    public List<JobResponseDto> getAllActiveJobs(Long currentUserId) {
        return jobRepository.findByStatus(JobStatus.ACTIVE)
                .stream()
                .map(job -> mapToResponseDto(job, currentUserId))
                .toList();
    }

    public JobResponseDto createJobFromDto(JobResponseDto dto) {
        Job job = new Job();

        // Basic info
        job.setTitle(dto.getJobTitle());
        job.setDescription(dto.getDescription());
        job.setMinBudget(dto.getMinBudget());
        job.setMaxBudget(dto.getMaxBudget());
        job.setPaidType("hourly".equalsIgnoreCase(dto.getPaymentType()) ? (byte) 0 : (byte) 1);
        job.setResponsibilities(dto.getKeyResponsibilities());
        job.setIdealSkills(dto.getIdealSkills());
        job.setLocation(dto.getLocation());
        job.setPublish("PUBLISHED".equalsIgnoreCase(dto.getPublishStatus()));

        // Handle optional new fields
        job.setFeatured(Boolean.TRUE.equals(dto.getIsFeatured()));
        job.setStatus(dto.getStatus() != null ? dto.getStatus() : JobStatus.ACTIVE);
        job.setExpiredAt(dto.getExpiredAt());
        job.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDateTime.now());

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

        Job savedJob = jobRepository.save(job);
        return mapToResponseDto(savedJob, null); // No userId needed for creation response
    }

    public Optional<JobResponseDto> getJobDtoById(Long id, Long currentUserId) {
        return jobRepository.findById(id)
                .map(job -> mapToResponseDto(job, currentUserId));
    }

    public List<JobResponseDto> getPublishedJobsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.HIRER) {
            throw new RuntimeException("User is not authorized to access posted jobs");
        }

        return jobRepository.findByUser_UserIdAndIsPublishTrue(userId)
                .stream()
                .map(job -> mapToResponseDto(job, userId))
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
                .map(job -> mapToResponseDto(job, userId))
                .toList();
    }

    public JobResponseDto publishJob(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setPublish(true);
        job.setUpdatedAt(LocalDateTime.now());
        job.setStatus(JobStatus.ACTIVE);

        Job saved = jobRepository.save(job);
        return mapToResponseDto(saved, null);
    }

    @Transactional
    public JobResponseDto updateJob(Long jobId, JobResponseDto dto) {
        // Fetch the job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Update basic job fields
        if (dto.getJobTitle() != null) {
            job.setTitle(dto.getJobTitle());
        }
        if (dto.getDescription() != null) {
            job.setDescription(dto.getDescription());
        }
        if (dto.getLocation() != null) {
            job.setLocation(dto.getLocation());
        }
        if (dto.getPaymentType() != null) {
            job.setPaidType("hourly".equalsIgnoreCase(dto.getPaymentType()) ? (byte) 0 : (byte) 1);
        }
        job.setPublish("PUBLISHED".equalsIgnoreCase(dto.getPublishStatus()));
        job.setFeatured(Boolean.TRUE.equals(dto.getIsFeatured()));
        if (dto.getExpiredAt() != null) {
            job.setExpiredAt(dto.getExpiredAt());
        }
        job.setUpdatedAt(LocalDateTime.now());

        // Update responsibilities
        if (dto.getKeyResponsibilities() != null) {
            job.getResponsibilities().clear();
            job.getResponsibilities().addAll(dto.getKeyResponsibilities());
        }

        // Update ideal skills
        if (dto.getIdealSkills() != null) {
            job.getIdealSkills().clear();
            job.getIdealSkills().addAll(dto.getIdealSkills());
        }

        // Update category
        if (dto.getCategory() != null) {
            JobCategory category = jobCategoryRepository.findByName(dto.getCategory())
                    .orElseThrow(() -> new RuntimeException("Category not found: " + dto.getCategory()));
            job.setCategory(category);
        }

        // Update skills
        if (dto.getSkills() != null) {
            List<Skill> skills = dto.getSkills().stream()
                    .map(name -> skillRepository.findBySkillName(name)
                            .orElseThrow(() -> new RuntimeException("Skill not found: " + name)))
                    .toList();
            job.getSkills().clear();
            job.getSkills().addAll(skills);
        }

        // Handle applicant updates and balance deduction
        if (dto.getApplicant() != null && !dto.getApplicant().isEmpty() && dto.getMaxBudget() != null) {

            // Calculate required balance with 7% fee
            BigDecimal maxBudget = new BigDecimal(dto.getMaxBudget());

            // Update job status to PENDING when applicants are updated
            job.setStatus(JobStatus.PENDING);

            // Update applications
            List<JobApplication> updatedApplications = dto.getApplicant().stream()
                    .map(appDto -> {
                        JobApplication application;
                        if (appDto.getId() != null) {
                            // Fetch existing application if ID exists
                            application = jobApplicationRepository.findById(appDto.getId())
                                    .orElseThrow(() -> new RuntimeException("Application not found: " + appDto.getId()));
                        } else {
                            // Create new application if no ID (unlikely for this use case)
                            application = new JobApplication();
                            application.setAppliedAt(appDto.getAppliedAt() != null ? appDto.getAppliedAt() : LocalDateTime.now());
                        }

                        application.setApplicant(userRepository.findById(appDto.getApplicantId())
                                .orElseThrow(() -> new RuntimeException("Applicant not found: " + appDto.getApplicantId())));
                        application.setJob(job);
                        application.setStatus(appDto.getStatus() != null ? appDto.getStatus() : ApplicationStatus.WAITING);
                        application.setCoverLetter(appDto.getCoverLetter());
                        application.setBookmarked(appDto.isBookmarked());
                        return application;
                    })
                    .toList();

            // Clear existing applications and add updated ones
            job.getApplications().clear();
            updatedApplications.forEach(job::addApplication);

            // Deduct balance
            userService.subtractUserBalance(dto.getHirerId(), maxBudget);
        }

        // Save the updated job
        Job savedJob = jobRepository.save(job);
        return mapToResponseDto(savedJob, null);
    }

    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }

    public JobResponseDto applyToJob(Long jobId, Long userId, String coverLetter) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only freelancers can apply to jobs");
        }

        Optional<JobApplication> existingApplication = jobApplicationRepository
                .findByJobIdAndApplicantUserId(jobId, userId);

        JobApplication application;
        if (existingApplication.isPresent()) {
            application = existingApplication.get();
            application.setCoverLetter(coverLetter);
            application.setStatus(ApplicationStatus.WAITING);
            application.setAppliedAt(LocalDateTime.now());
            application.setBookmarked(false);
        } else {
            application = new JobApplication();
            application.setJob(job);
            application.setApplicant(user);
            application.setCoverLetter(coverLetter);
            application.setStatus(ApplicationStatus.WAITING);
            application.setBookmarked(false);
        }

        jobApplicationRepository.save(application);
        return mapToResponseDto(job, userId);
    }

    public JobResponseDto toggleBookmark(Long jobId, Long userId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only freelancers can bookmark jobs");
        }

        Optional<JobApplication> existingApplication = jobApplicationRepository
                .findByJobIdAndApplicantUserId(jobId, userId);

        if (existingApplication.isPresent()) {
            JobApplication application = existingApplication.get();
            if (application.isBookmarked()) {
                // If bookmark is true, delete the application row
                jobApplicationRepository.delete(application);
            } else {
                // If bookmark is false, set it to true
                application.setBookmarked(true);
                jobApplicationRepository.save(application);
            }
        } else {
            // No existing application, create a new one with bookmark true
            JobApplication application = new JobApplication();
            application.setJob(job);
            application.setApplicant(user);
            application.setBookmarked(true);
            application.setStatus(ApplicationStatus.WAITING);
            jobApplicationRepository.save(application);
        }

        return mapToResponseDto(job, userId);
    }

    public List<JobResponseDto> getAppliedJobsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only freelancers can view applied jobs");
        }

        return user.getApplications().stream()
                .filter(app -> !app.isBookmarked()) // Only include actual applications
                .map(JobApplication::getJob)
                .map(job -> mapToResponseDto(job, userId))
                .toList();
    }

    public List<JobResponseDto> getBookmarkedJobsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only freelancers can view bookmarked jobs");
        }

        return user.getApplications().stream()
                .filter(JobApplication::isBookmarked)
                .map(JobApplication::getJob)
                .map(job -> mapToResponseDto(job, userId))
                .toList();
    }

    @Transactional
    public JobResponseDto updateApplicationStatus(Long jobId, Long applicantId, ApplicationStatus status, Long currentUserId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Verify that the current user is the applicant (freelancer)
        if (!applicantId.equals(currentUserId)) {
            throw new RuntimeException("Only the applicant can update their own application status");
        }

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() != Role.FREELANCER) {
            throw new RuntimeException("Only freelancers can update application status");
        }

        // Verify job status is PENDING
        if (job.getStatus() != JobStatus.PENDING) {
            throw new RuntimeException("Application status can only be updated when job status is PENDING");
        }

        // Find the application
        JobApplication application = jobApplicationRepository.findByJobIdAndApplicantUserId(jobId, applicantId)
                .orElseThrow(() -> new RuntimeException("Application not found for job ID: " + jobId + " and applicant ID: " + applicantId));

        // Validate status (only allow IN_PROGRESS or COMPLETED)
        if (status != ApplicationStatus.IN_PROGRESS && status != ApplicationStatus.COMPLETED) {
            throw new RuntimeException("Status can only be updated to IN_PROGRESS or COMPLETED");
        }

        // Update application status
        application.setStatus(status);
        jobApplicationRepository.save(application);

        // Save the job (to ensure any cascading effects)
        Job savedJob = jobRepository.save(job);
        return mapToResponseDto(savedJob, currentUserId);
    }

    @Transactional
    public JobResponseDto updateJobStatus(Long jobId, JobStatus status, Long currentUserId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Verify that the current user is the hirer
        if (!job.getUser().getUserId().equals(currentUserId)) {
            throw new RuntimeException("Only the hirer can update job status");
        }

        // Update job status
        job.setStatus(status);
        job.setUpdatedAt(LocalDateTime.now());

        // If status is COMPLETED, add maxBudget to the applicant's balance
        if (status == JobStatus.COMPLETED) {
            JobApplication inProgressApplication = job.getApplications().stream()
                    .filter(app -> app.getStatus() == ApplicationStatus.COMPLETED)
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("No in-progress application found for job completion"));

            Long applicantId = inProgressApplication.getApplicant().getUserId();
            User applicant = userRepository.findById(applicantId)
                    .orElseThrow(() -> new RuntimeException("Applicant not found"));

            BigDecimal maxBudget = new BigDecimal(job.getMaxBudget());
            userService.addUserBalance(applicant, maxBudget);
            userRepository.save(applicant); // Persist the updated balance
        }

        Job savedJob = jobRepository.save(job);
        return mapToResponseDto(savedJob, currentUserId);
    }
}