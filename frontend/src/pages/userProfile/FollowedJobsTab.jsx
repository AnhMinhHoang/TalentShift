import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../AuthContext"
import { toggleBookmark, applyToJob } from "../../services/jobService"
import { Modal, Button, Form, Pagination } from "react-bootstrap"
import { FaCheck, FaDollarSign } from "react-icons/fa"
import { notification } from "antd"
import styles from "./style/UserProfile.module.css"

const FollowedJobsTab = ({ bookmarkedJobs, setBookmarkedJobs, loading }) => {
    const { userData } = useAuth()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [jobToUnbookmark, setJobToUnbookmark] = useState(null)
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [jobToApply, setJobToApply] = useState(null)
    const [formData, setFormData] = useState({ coverLetter: "" })
    const [currentPage, setCurrentPage] = useState(1)
    const [jobsPerPage] = useState(6)
    const [api, contextHolder] = notification.useNotification()

    const handleUnbookmark = async () => {
        try {
            await toggleBookmark(jobToUnbookmark.id, userData.userId)
            setBookmarkedJobs(bookmarkedJobs.filter((job) => job.id !== jobToUnbookmark.id))
            api.success({
                message: "Job Unbookmarked",
                description: "The job has been removed from your followed jobs.",
            })
        } catch (error) {
            api.error({
                message: "Error",
                description: "Failed to unbookmark the job.",
            })
        } finally {
            setShowConfirmModal(false)
            setJobToUnbookmark(null)
        }
    }

    const handleApply = (job) => {
        if (!userData?.userId) {
            api.error({
                message: "Login Required",
                description: "Please log in to apply for this job",
            })
            return
        }
        setJobToApply(job)
        setShowApplyModal(true)
    }

    const handleApplySubmit = async (e) => {
        e.preventDefault()
        if (!userData?.userId) {
            api.error({
                message: "Login Required",
                description: "Please log in to apply for this job",
            })
            return
        }
        try {
            await applyToJob(jobToApply.id, userData.userId, formData.coverLetter)
            setShowApplyModal(false)
            setFormData({ coverLetter: "" })
            api.success({
                message: "Application Submitted",
                description: "Your application has been successfully submitted!",
            })
        } catch (error) {
            api.error({
                message: "Application Failed",
                description: error.message || "Failed to submit application",
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value.slice(0, 500),
        })
    }

    const truncateText = (text, maxLength = 50) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength - 3) + "..."
    }

    const getAvatarLetter = (companyName) => {
        return companyName ? companyName.charAt(0).toUpperCase() : "C"
    }

    const formatSalary = (job) => {
        const formatter = new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })

        if (!job.minBudget && !job.maxBudget) return "Salary not specified"
        if (!job.minBudget) {
            const maxBudget = Number.parseFloat(job.maxBudget)
            return isNaN(maxBudget) ? "Salary not specified" : formatter.format(maxBudget)
        }
        if (!job.maxBudget) {
            const minBudget = Number.parseFloat(job.minBudget)
            return isNaN(minBudget) ? "Salary not specified" : formatter.format(minBudget)
        }

        const minBudget = Number.parseFloat(job.minBudget)
        const maxBudget = Number.parseFloat(job.maxBudget)
        if (isNaN(minBudget) || isNaN(maxBudget)) return "Salary not specified"

        return `${formatter.format(minBudget)} - ${formatter.format(maxBudget)}`
    }

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = bookmarkedJobs.slice(indexOfFirstJob, indexOfLastJob)
    const totalPages = Math.ceil(bookmarkedJobs.length / jobsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const EmptyState = () => (
        <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateIcon}>
                <i className="bi bi-bookmark-heart"></i>
            </div>
            <h3 className={styles.emptyStateTitle}>No Followed Jobs</h3>
            <p className={styles.emptyStateDescription}>
                You haven't bookmarked any jobs yet. Save interesting opportunities to easily find them later and never miss out
                on great positions.
            </p>
            <Link to="/jobs" className={styles.emptyStateAction}>
                <i className="bi bi-search"></i>
                Discover Jobs
            </Link>
        </div>
    )

    const LoadingState = () => (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading your followed jobs...</p>
        </div>
    )

    return (
        <div>
            {contextHolder}
            <h4 className="mb-4">Followed Jobs</h4>

            {loading ? (
                <LoadingState />
            ) : bookmarkedJobs.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {currentJobs.map((job) => (
                            <div key={job.id} className="col">
                                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "1rem" }}>
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                        background: "linear-gradient(135deg, #428a9b, #266987)",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        fontSize: "1.2rem",
                                                    }}
                                                >
                                                    {getAvatarLetter(job.companyName)}
                                                </div>
                                                <div>
                                                    <h6 className="mb-1">
                                                        <Link
                                                            to={`/job-detail/${job.id}`}
                                                            className="text-decoration-none"
                                                            style={{ color: "#428a9b" }}
                                                        >
                                                            {truncateText(job.jobTitle)}
                                                        </Link>
                                                    </h6>
                                                    <small className="text-muted">{job.companyName}</small>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-link p-0 text-danger"
                                                title="Remove Bookmark"
                                                onClick={() => {
                                                    setJobToUnbookmark(job)
                                                    setShowConfirmModal(true)
                                                }}
                                            >
                                                <i className="bi bi-bookmark-fill"></i>
                                            </button>
                                        </div>

                                        <div className="mb-3">
                                            <div className="d-flex align-items-center text-success">
                                                <i className="bi bi-currency-dollar me-1"></i>
                                                <small>{formatSalary(job)}</small>
                                            </div>
                                        </div>

                                        <button
                                            className="btn w-100"
                                            style={{
                                                background: "linear-gradient(135deg, #428a9b, #266987)",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "0.5rem",
                                            }}
                                            onClick={() => handleApply(job)}
                                        >
                                            <i className="bi bi-send me-2"></i>
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination className="justify-content-center mt-4">
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    )}
                </>
            )}

            {/* Modals remain the same */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Unbookmark</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this job from your followed jobs?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUnbookmark}>
                        Yes, Remove
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered size="lg">
                <Modal.Header closeButton style={{ background: "linear-gradient(135deg, #428a9b, #266987)", color: "white" }}>
                    <Modal.Title>Please tell us why you're a good fit for this position</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2rem" }}>
                    <h4 style={{ color: "#428a9b" }}>{jobToApply?.jobTitle}</h4>
                    <p className="text-success">
                        <FaDollarSign /> {jobToApply && formatSalary(jobToApply)}
                    </p>
                    <Form onSubmit={handleApplySubmit}>
                        <div>
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
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={() => setShowApplyModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                style={{
                                    background: "linear-gradient(135deg, #428a9b, #266987)",
                                    border: "none",
                                }}
                                disabled={!formData.coverLetter.trim()}
                            >
                                <FaCheck className="me-1" /> Submit Application
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default FollowedJobsTab