// src/components/JobCard.js
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    // Helper function to format salary
    const formatSalary = () => {
        if (!job.minBudget || !job.maxBudget) return "Salary not specified";
        return `$${job.minBudget} - $${job.maxBudget}/month`;
    };

    // Helper function to get badge color based on category
    const getCategoryColor = (category) => {
        const colors = {
            "Software Development": "primary",
            "Design": "info",
            "Marketing": "success",
            "Finance": "warning",
            "HR": "danger"
        };
        return colors[category] || "secondary";
    };

    console.log(job)

    return (
        <div className="card mb-3 bg-primary bg-opacity-10 border-primary border-opacity-25">
            <Link to={`/job-detail/${job.id}`} className="text-decoration-none">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                        <div className="d-flex gap-3">
                            <div
                                className="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center"
                                style={{ width: "48px", height: "48px" }}
                            >
                                <span className="fw-bold">
                                    {job.company?.name?.substring(0, 2).toUpperCase() || "CO"}
                                </span>
                            </div>
                            <div>
                                <h5 className="card-title mb-0">{job.title}</h5>
                                <p className="card-text text-muted small">
                                    {job.company?.name || "Company not specified"}
                                </p>
                            </div>
                        </div>
                        <button className="btn btn-link text-muted p-0">
                            <i className="bi bi-star"></i>
                        </button>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-primary bg-opacity-10 text-primary rounded p-1 me-1">
                                <i className="bi bi-geo-alt small"></i>
                            </span>
                            {job.location || "Remote"}
                        </span>
                        <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-success bg-opacity-10 text-success rounded p-1 me-1">
                                <i className="bi bi-cash small"></i>
                            </span>
                            {formatSalary()}
                        </span>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className={`badge bg-${getCategoryColor(job.category?.name)} bg-opacity-10 text-${getCategoryColor(job.category?.name)}`}>
                            {job.employmentType || "Full-time"} | {job.category?.name || "Uncategorized"} | Remote
                        </span>
                    </div>

                    <div className="text-end">
                        <button className={`btn btn-${getCategoryColor(job.category?.name)} btn-sm text-white`}>
                            Apply
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default JobCard;