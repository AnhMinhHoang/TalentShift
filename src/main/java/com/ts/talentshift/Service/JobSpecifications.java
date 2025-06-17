import org.springframework.data.jpa.domain.Specification;
import com.ts.talentshift.Model.Job.Job;
import jakarta.persistence.criteria.Predicate;

public class JobSpecifications {
    public static Specification<Job> withTitle(String title) {
        return (root, query, builder) -> {
            if (title == null || title.isEmpty()) {
                return builder.conjunction();
            }
            return builder.like(builder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
        };
    }

    public static Specification<Job> withLocation(String location) {
        return (root, query, builder) -> {
            if (location == null || location.isEmpty()) {
                return builder.conjunction();
            }
            return builder.equal(root.get("location"), location);
        };
    }

    public static Specification<Job> withSalaryRange(int minSalary) {
        return (root, query, builder) -> {
            if (minSalary == 0) {
                return builder.conjunction();
            }
            return builder.greaterThanOrEqualTo(
                    builder.function("CAST", Integer.class,
                            builder.substring(root.get("salary"), 2,
                                    builder.locate(root.get("salary"), "-") - 2)),
                    minSalary);
        };
    }
}
