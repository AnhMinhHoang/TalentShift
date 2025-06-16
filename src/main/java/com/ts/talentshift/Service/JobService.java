package com.ts.talentshift.Service;

import com.ts.talentshift.Dto.Job.JobRequestDto;
import com.ts.talentshift.Model.Hirer;
import com.ts.talentshift.Model.Skill;
import com.ts.talentshift.Model.Job.Job;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Repository.HirerRepository;
import com.ts.talentshift.Repository.JobCategoryRepository;
import com.ts.talentshift.Repository.JobRepository;
import com.ts.talentshift.Repository.SkillRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final SkillRepository skillRepository;
    private final JobCategoryRepository jobCategoryRepository;
    private final HirerRepository hirerRepository;

    @Autowired
    public JobService(JobRepository jobRepository,
            SkillRepository skillRepository,
            JobCategoryRepository jobCategoryRepository,
            HirerRepository hirerRepository) {
        this.jobRepository = jobRepository;
        this.skillRepository = skillRepository;
        this.jobCategoryRepository = jobCategoryRepository;
        this.hirerRepository = hirerRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<String> findDistinctLocations() {
        return jobRepository.findDistinctLocations();
    }

    public List<Job> getAllActiveJobs() {
        return jobRepository.findByIsActiveTrue();
    }

    public Job createJobFromDto(JobRequestDto dto) {
        Job job = new Job();

        job.setTitle(dto.getJobTitle());
        job.setDescription(dto.getProjectDescription());
        job.setMinBudget(dto.getMinBudget());
        job.setMaxBudget(dto.getMaxBudget());
        job.setPaidType(dto.getPaymentType().equalsIgnoreCase("hourly") ? (byte) 0 : (byte) 1);
        job.setResponsibilities(dto.getKeyResponsibilities());
        job.setIdealSkills(dto.getIdealSkills());
        job.setActive(true);

        // 🔍 Lookup category
        JobCategory category = jobCategoryRepository.findByName(dto.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        job.setCategory(category);

        // 🔍 Lookup skills by name
        List<Skill> skills = new ArrayList<>();
        for (String skillName : dto.getSkills()) {
            Skill skill = skillRepository.findBySkillName(skillName)
                    .orElseThrow(() -> new RuntimeException("Skill not found: " + skillName));
            skills.add(skill);
        }
        job.setSkills(skills);

        // Hirer hirer = hirerRepository.findById(1L)
        // .orElseThrow(() -> new RuntimeException("Hirer not found"));
        // job.setHirer(hirer);

        return jobRepository.save(job);
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

}