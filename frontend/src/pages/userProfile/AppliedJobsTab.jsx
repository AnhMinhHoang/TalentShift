import { useState } from "react"
import { Link } from "react-router-dom"
import { Pagination, Button } from "react-bootstrap"
import { useAuth } from "../AuthContext"
import { updateApplicationStatus } from "../../services/jobService"
import { notification } from "antd"
import styles from "./style/UserProfile.module.css"

const AppliedJobsTab = ({ appliedJobs, setAppliedJobs, loading }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const { userData } = useAuth()
    const jobsPerPage = 5
    const [api, contextHolder] = notification.useNotification()

    const formatDate = (date) => {
        if (!date) return "N/A"
        const parsedDate = Array.isArray(date)
            ? new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5], date[6] / 1_000_000)
            : new Date(date)
        return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "WAITING":
                return { backgroundColor: "#fff3cd", color: "#856404" }
            case "REJECTED":
                return { backgroundColor: "#f8d7da", color: "#721c24" }
            case "COMPLETED":
                return { backgroundColor: "#d4edda", color: "#155724" }
            case "IN_PROGRESS":
                return { backgroundColor: "#cce5ff", color: "#004085" }
            default:
                return { backgroundColor: "#e2e3e5", color: "#383d41" }
        }
    }

    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            placement: "topRight",
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        })
    }

    const handleToggleStatus = async (jobId, applicantId, currentStatus) => {
        if (!userData?.userId) {
            openNotification("error", "Unauthorized", "Please log in to update application status")
            return
        }

        const newStatus = currentStatus === "IN_PROGRESS" ? "COMPLETED" : "IN_PROGRESS"
        try {
            const updatedJob = await updateApplicationStatus(jobId, applicantId, newStatus)
            setAppliedJobs((prevJobs) =>
                prevJobs.map((job) =>
                    job.id === jobId
                        ? {
                            ...job,
                            applicant: job.applicant.map((app) =>
                                app.applicantId === applicantId ? { ...app, status: newStatus } : app,
                            ),
                        }
                        : job,
                ),
            )
            openNotification("success", "Status Updated", `Application status changed to ${newStatus}`)
        } catch (error) {
            openNotification("error", "Status Update Failed", error.message || "Failed to update application status")
        }
    }

    // Filter and search logic
    const filteredJobs = appliedJobs.filter((job) => {
        const matchesSearch =
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "All" || job.applicant.some((app) => app.status === statusFilter)
        return matchesSearch && matchesStatus
    })

    // Pagination logic
    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const EmptyState = () => (
        <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateIcon}>
                <i className="bi bi-briefcase"></i>
            </div>
            <h3 className={styles.emptyStateTitle}>No Applications Yet</h3>
            <p className={styles.emptyStateDescription}>
                You haven't applied to any jobs yet. Start exploring opportunities and apply to jobs that match your skills and
                interests.
            </p>
            <Link to="/jobs" className={styles.emptyStateAction}>
                <i className="bi bi-search"></i>
                Browse Jobs
            </Link>
        </div>
    )

    const LoadingState = () => (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading your applications...</p>
        </div>
    )

    return (
        <div>
            {contextHolder}
            <h4 className="mb-4">Applied Jobs</h4>

            {loading ? (
                <LoadingState />
            ) : appliedJobs.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    {/* Search and Filter */}
                    <div className="row mb-4">
                        <div className="col-md-8 mb-2 mb-md-0">
                            <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by job title or company..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value)
                                    setCurrentPage(1)
                                }}
                            >
                                <option value="All">Status - All</option>
                                <option value="WAITING">Waiting</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="IN_PROGRESS">In Progress</option>
                            </select>
                        </div>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className={styles.emptyStateContainer}>
                            <div className={styles.emptyStateIcon}>
                                <i className="bi bi-funnel"></i>
                            </div>
                            <h3 className={styles.emptyStateTitle}>No Results Found</h3>
                            <p className={styles.emptyStateDescription}>
                                No applications match your current search criteria. Try adjusting your filters or search terms.
                            </p>
                            <button
                                className={styles.emptyStateAction}
                                onClick={() => {
                                    setSearchTerm("")
                                    setStatusFilter("All")
                                    setCurrentPage(1)
                                }}
                            >
                                <i className="bi bi-arrow-clockwise"></i>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Job Title</th>
                                        <th>Company</th>
                                        <th>Applied Time</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentJobs.map((job) => {
                                        const application =
                                            job.applicant.find((app) => app.applicantId === userData?.userId) || job.applicant[0]
                                        const isFreelancer = userData?.role === "FREELANCER"
                                        const canToggleStatus =
                                            isFreelancer &&
                                            application?.applicantId === userData?.userId &&
                                            job.status === "PENDING" &&
                                            (application?.status === "IN_PROGRESS" || application?.status === "COMPLETED")
                                        return (
                                            <tr key={job.id}>
                                                <td>
                                                    <Link to={`/job-detail/${job.id}`} className="text-decoration-none text-reset">
                                                        {job.jobTitle}
                                                    </Link>
                                                </td>
                                                <td>{job.companyName || "Unknown Company"}</td>
                                                <td>{formatDate(application?.appliedAt)}</td>
                                                <td>
                            <span className="badge" style={getStatusBadgeStyle(application?.status)}>
                              {application?.status || "Unknown"}
                            </span>
                                                    {canToggleStatus && (
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => handleToggleStatus(job.id, application.applicantId, application.status)}
                                                        >
                                                            {application.status === "IN_PROGRESS" ? "Mark Completed" : "Mark In Progress"}
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
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
                </>
            )}
        </div>
    )
}

export default AppliedJobsTab