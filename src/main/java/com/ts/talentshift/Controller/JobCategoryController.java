package com.ts.talentshift.Controller;

import com.ts.talentshift.DTO.Job.JobCategoryDto;
import com.ts.talentshift.Model.Job.JobCategory;
import com.ts.talentshift.Service.JobCategoryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class JobCategoryController {
    private final JobCategoryService categoryService;

    public JobCategoryController(JobCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<JobCategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

}
