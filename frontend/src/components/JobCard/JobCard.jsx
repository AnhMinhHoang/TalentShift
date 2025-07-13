import React, { useState } from "react";
import { Link } from "react-router-dom";
import { applyToJob, toggleBookmark } from "../../services/jobService";
import { Button, Form, Modal } from "react-bootstrap";
import { FaCheck, FaDollarSign } from "react-icons/fa";
import { notification } from "antd";
import styles from "./JobCard.module.css";
import { getImageUrl } from "../../utils/imageUtils";

const JobCard = ({ job, userData, onJobUpdate }) => {
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [formData, setFormData] = useState({ coverLetter: "" });
    const [isApplied, setIsApplied] = useState(
        job.applicant?.some((app) => app.applicantId === userData?.userId && !app.bookmarked) ?? false
    );
    const [isBookmarked, setIsBookmarked] = useState(job.bookmarked || false);
    const [api, contextHolder] = notification.useNotification();

    const truncateDescription = (description, maxLength = 150) => {
        if (!description) return "No description available";
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength).trim() + "...";
    };

    const formatSalary = () => {
        const formatter = new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

        if (!job.minBudget && !job.maxBudget) return "Salary not specified";
        if (!job.minBudget) {
            const maxBudget = Number.parseFloat(job.maxBudget);
            return isNaN(maxBudget) ? "Salary not specified" : formatter.format(maxBudget);
        }
        if (!job.maxBudget) {
            const minBudget = Number.parseFloat(job.minBudget);
            return isNaN(minBudget) ? "Salary not specified" : formatter.format(minBudget);
        }

        const minBudget = Number.parseFloat(job.minBudget);
        const maxBudget = Number.parseFloat(job.maxBudget);
        if (isNaN(minBudget) || isNaN(maxBudget)) return "Salary not specified";

        return `${formatter.format(minBudget)} - ${formatter.format(maxBudget)}`;
    };

    const getTimeSincePosted = () => {
        if (!job.createdAt) return "Posted recently";

        let postedDate;
        if (Array.isArray(job.createdAt) && job.createdAt.length === 7) {
            const [year, month, day, hours, minutes, seconds, nanoseconds] = job.createdAt;
            postedDate = new Date(year, month - 1, day, hours, minutes, seconds, nanoseconds / 1_000_000);
        } else if (typeof job.createdAt === "string" && job.createdAt.includes(",")) {
            const [year, month, day, hours, minutes, seconds, nanoseconds] = job.createdAt
                .split(",")
                .map(Number);
            postedDate = new Date(year, month - 1, day, hours, minutes, seconds, nanoseconds / 1_000_000);
        } else {
            postedDate = new Date(job.createdAt);
        }

        if (isNaN(postedDate)) return "Invalid date";

        const now = new Date();
        const diffInMs = now - postedDate;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) return "Just now";
        if (diffInMinutes < 60) return `Posted ${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
        if (diffInHours < 24) return `Posted ${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
        if (diffInDays === 1) return "Posted 1 day ago";
        return `Posted ${diffInDays} days ago`;
    };

    const getCategoryColor = (categoryName) => {
        const colors = {
            "Software Development": "primary",
            Design: "info",
            Marketing: "success",
            Finance: "warning",
            HR: "danger",
            "Web Development": "primary",
            "Mobile App Development": "info",
            "UI/UX Design": "success",
        };
        return colors[categoryName] || "secondary";
    };

    const handleApply = async () => {
        if (!userData?.userId) {
            api.error({
                message: "Login Required",
                description: "Please log in to apply for this job",
            });
            return;
        }
        setShowApplyModal(true);
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        if (!userData?.userId) {
            api.error({
                message: "Login Required",
                description: "Please log in to apply for this job",
            });
            return;
        }
        try {
            const updatedJob = await applyToJob(job.id, userData.userId, formData.coverLetter);
            setShowApplyModal(false);
            setFormData({ coverLetter: "" });
            setIsApplied(true);
            setIsBookmarked(updatedJob.bookmarked || false) // Update to false after apply

            // Call the callback to refresh the job list
            if (onJobUpdate) {
                onJobUpdate();
            }

            api.success({
                message: "Application Submitted",
                description: "Your application has been successfully submitted!",
            });
        } catch (error) {
            api.error({
                message: "Application Failed",
                description: error.message || "Failed to submit application",
            });
        }
    };

    const handleBookmark = async () => {
        if (!userData?.userId) {
            api.error({
                message: "Login Required",
                description: "Please log in to bookmark this job",
            });
            return;
        }
        try {
            const updatedJob = await toggleBookmark(job.id, userData.userId);
            setIsBookmarked(updatedJob.bookmarked);

            // Call the callback to refresh the job list
            if (onJobUpdate) {
                onJobUpdate();
            }

            api.success({
                message: isBookmarked ? "Bookmark Removed" : "Bookmark Added",
                description: isBookmarked ? "Job removed from bookmarks" : "Job added to bookmarks",
            });
        } catch (error) {
            api.error({
                message: "Bookmark Failed",
                description: error.message || "Failed to toggle bookmark",
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.slice(0, 500),
        });
    };

    const hasCustomLogo = job.companyLogoPath && job.companyLogoPath !== "/asset/images/default-company-logo.png";
    const getAvatarLetter = () => (job.companyName ? job.companyName.charAt(0).toUpperCase() : "C");

    return (
        <div className={`card ${styles.jobCard}`}>
            {contextHolder}
            <div className="card-body p-4">
                <div className={styles.cardHeader}>
                    <div className={styles.leftSection}>
                        {hasCustomLogo ? (
                            <img
                                src={getImageUrl(job.companyLogoPath)}
                                alt="company logo"
                                className={styles.companyLogo}
                            />
                        ) : (
                            <div className={styles.defaultAvatar}>{getAvatarLetter()}</div>
                        )}
                        <div className={styles.jobDetails}>
                            <h5 className={styles.jobTitle}>{job.jobTitle}</h5>
                            <p className={styles.companyName}>{job.companyName || "Company not specified"}</p>
                        </div>
                    </div>
                    {!isApplied && userData && userData?.role !== "HIRER" && userData.fillingForm && (
                        <div className="text-end mt-2">
                            <button className={styles.bookmarkBtn} title="Save Job" onClick={handleBookmark}>
                                <i className={`bi bi-bookmark${isBookmarked ? "-fill" : ""}`}></i>
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.jobMeta}>
                    <span className={styles.metaItem}>
                        <i className="bi bi-clock"></i>
                        {getTimeSincePosted()}
                    </span>
                    <span className={styles.metaItem}>
                        <i className="bi bi-people"></i>
                        {job.applicant?.length || 0} applicants
                    </span>
                </div>

                <div className={styles.salaryRow}>
                    <span className={styles.salary}>
                        <i className="bi bi-cash"></i>
                        {formatSalary()}
                    </span>
                    <span
                        className={`badge ${styles.categoryBadge} bg-${getCategoryColor(job.category)} bg-opacity-10 text-${getCategoryColor(job.category)}`}
                    >
                        {job.category.toUpperCase()}
                    </span>
                </div>

                <p className={styles.description}>{truncateDescription(job.description)}</p>

                <div className={styles.skillsContainer}>
                    {job.skills.slice(0, 4).map((skill, index) => (
                        <span key={index} className={styles.skillBadge}>
                            {skill}
                        </span>
                    ))}
                    {job.skills.length > 4 && <span className={styles.skillBadge}>+{job.skills.length - 4} more</span>}
                </div>

                <div className={styles.applySection}>
                    <Link to={`/job-detail/${job.id}`} className={styles.viewDetailButton}>
                        <span>View Details</span>
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                    {userData && userData?.role !== "HIRER" && userData.fillingForm && (
                        <button
                            className={`${styles.applyButton} ${isApplied ? styles.appliedButton : ""}`}
                            onClick={handleApply}
                            disabled={isApplied}
                        >
                            {isApplied ? (
                                <>
                                    <i className="bi bi-check2 me-1"></i> Applied
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send me-1"></i> Apply Now
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered size="lg">
                <Modal.Header closeButton className={styles.applyModalHeader}>
                    <Modal.Title>Please tell us why you're a good fit for this position</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2rem" }}>
                    <h4 className={styles.jobTitleModal}>{job.jobTitle}</h4>
                    <p>
                        <FaDollarSign /> {formatSalary()}
                    </p>
                    <Form onSubmit={handleApplySubmit}>
                        <div className={styles.formSection}>
                            <h5>Cover Letter</h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Cover Letter (Required)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="text-black font-weight-bold"
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    placeholder="Tell us why you're a good fit for this position"
                                    rows={4}
                                    required
                                    maxLength={500}
                                />
                                <Form.Text className="text-muted">{500 - formData.coverLetter.length} characters remaining</Form.Text>
                            </Form.Group>
                        </div>
                        <div className={styles.formActions}>
                            <Button variant="outline-secondary" onClick={() => setShowApplyModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className={styles.submitButton}
                                disabled={!formData.coverLetter.trim()}
                            >
                                <FaCheck className="me-1" /> Submit Application
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default JobCard;