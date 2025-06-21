package com.ts.talentshift.Service;

import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Repository.JobCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobCategoryService {
    private final JobCategoryRepository categoryRepository;

    public JobCategoryService(JobCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<JobCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
}
