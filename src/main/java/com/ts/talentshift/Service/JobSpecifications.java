package com.ts.talentshift.Service;

import org.springframework.data.jpa.domain.Specification;

import com.ts.talentshift.Model.Job.Job;

public class JobSpecifications {
    public static Specification<Job> withTitle(String title) {
        return (root, query, builder) -> title == null ? null
                : builder.like(builder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Job> withLocation(String location) {
        return (root, query, builder) -> location == null ? null : builder.equal(root.get("location"), location);
    }

    public static Specification<Job> withSalaryRange(int minSalary) {
        return (root, query, builder) -> minSalary == 0 ? null
                : builder.greaterThanOrEqualTo(
                        builder.function("CAST", Integer.class,
                                builder.substring(root.get("salary"), 2,
                                        builder.locate(root.get("salary"), "-") - 2)),
                        minSalary);
    }
}
