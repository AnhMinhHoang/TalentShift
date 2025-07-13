import { useState, useEffect } from "react"
import { Table, Input, Select, Pagination, notification } from "antd"
import { FaSearch, FaEye, FaCalendarAlt, FaUsers, FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { fetchPublishedJobsByUser, updateJobStatus, createRating } from "../../services/jobService"
import { useAuth } from "../../pages/AuthContext.jsx"
import RatingModal from "./RatingModal.jsx"
import styles from "./JobPostHistoryTable.module.css"

const { Option } = Select

const JobPostHistoryTable = () => {
    const [searchText, setSearchText] = useState("")
    const [filterStatus, setFilterStatus] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [jobPosts, setJobPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { userData } = useAuth()
    const jobsPerPage = 8
    const [api, contextHolder] = notification.useNotification()
    const formatToVND = (value) => {
        return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    }

    // Rating Modal State
    const [ratingModalVisible, setRatingModalVisible] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState(null)
    const [selectedFreelancerId, setSelectedFreelancerId] = useState(null)

    const loadJobs = async () => {
        try {
            const userId = userData?.userId
            if (!userId) {
                throw new Error("User ID not found")
            }
            const data = await fetchPublishedJobsByUser(userId)
            const mappedData = data.map((job) => ({
                ...job,
                title: job.jobTitle,
                department: job.category || "Development",
                employmentType: job.paymentType,
                status: job.status || "PENDING",
                applicants: job.applicant?.length || 0,
                salary: `${formatToVND(job.maxBudget)}`,
                postDate: job.createdAt || new Date().toISOString(),
                expiryDate: job.expiredAt || new Date(Date.now() + 90 * 86400000).toISOString(),
                featured: job.isFeatured || false,
                skills: job.skills || [],
                description: job.description || "No description available",
                keyResponsibilities: job.keyResponsibilities || "",
                applicant: job.applicant || [],
            }))
            setJobPosts(mappedData)
        } catch (err) {
            setError(err.message)
            openNotification("error", "Fetch Failed", err.message || "Failed to fetch job posts")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadJobs()
    }, [])

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

    const getStatusConfig = (status) => {
        const configs = {
            PENDING: {
                className: styles.statusPending,
                text: "Pending",
                icon: "⏳",
            },
            ACTIVE: {
                className: styles.statusActive,
                text: "Active",
                icon: "✅",
            },
            EXPIRED: {
                className: styles.statusExpired,
                text: "Expired",
                icon: "⏰",
            },
            REJECTED: {
                className: styles.statusRejected,
                text: "Rejected",
                icon: "❌",
            },
            COMPLETED: {
                className: styles.statusCompleted,
                text: "Completed",
                icon: "🎉",
            },
        }
        return (
            configs[status] || {
                className: styles.statusDefault,
                text: status,
                icon: "📋",
            }
        )
    }

    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            placement: "topRight",
            duration: 4,
            showProgress: true,
            pauseOnHover: true,
        })
    }

    const handleMarkComplete = (jobId, freelancerId) => {
        if (!userData?.userId) {
            openNotification("error", "Unauthorized", "Please log in to update job status")
            return
        }
        setSelectedJobId(jobId)
        setSelectedFreelancerId(freelancerId)
        setRatingModalVisible(true)
    }

    const handleRatingSubmit = async (ratingData) => {
        try {
            await createRating(selectedJobId, selectedFreelancerId, ratingData, userData.userId)
            const updatedJob = await updateJobStatus(selectedJobId, "COMPLETED", userData.userId)

            setJobPosts((prevJobs) =>
                prevJobs.map((job) => (job.id === selectedJobId ? { ...job, status: "COMPLETED" } : job)),
            )

            openNotification("success", "Success!", "Job completed and rating submitted successfully")
            setRatingModalVisible(false)
        } catch (error) {
            openNotification("error", "Operation Failed", error.message || "Failed to submit rating")
        }
    }

    const filteredJobs = jobPosts.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.companyName?.toLowerCase().includes(searchText.toLowerCase())
        const matchesStatus = filterStatus === "All" || job.status === filterStatus
        return matchesSearch && matchesStatus
    })

    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const columns = [
        {
            title: "Job Details",
            dataIndex: "title",
            key: "title",
            width: "35%",
            render: (text, record) => (
                <div className={styles.jobDetails}>
                    <Link to={`/job-detail/${record.id}`} className={styles.jobTitle}>
                        {text}
                    </Link>
                    <div className={styles.jobMeta}>
                        <span className={styles.jobDepartment}>{record.department}</span>
                        <span className={styles.jobSalary}>{record.salary}₫</span>
                    </div>
                    <div className={styles.jobSkills}>
                        {record.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className={styles.skillTag}>
                {skill}
              </span>
                        ))}
                        {record.skills.length > 3 && <span className={styles.skillMore}>+{record.skills.length - 3}</span>}
                    </div>
                </div>
            ),
        },
        {
            title: "Posted",
            dataIndex: "postDate",
            key: "postDate",
            width: "15%",
            render: (date) => (
                <div className={styles.dateInfo}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <span>{formatDate(date)}</span>
                </div>
            ),
        },
        {
            title: "Applicants",
            dataIndex: "applicants",
            key: "applicants",
            width: "15%",
            render: (count) => (
                <div className={styles.applicantInfo}>
                    <FaUsers className={styles.applicantIcon} />
                    <span className={styles.applicantCount}>{count}</span>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "20%",
            render: (status, record) => {
                const statusConfig = getStatusConfig(status)
                const completedApplication = record.applicant?.find((app) => app.status === "COMPLETED")
                const canMarkComplete = record.status === "PENDING" && completedApplication

                return (
                    <div className={styles.statusColumn}>
            <span className={`${styles.statusBadge} ${statusConfig.className}`}>
              <span className={styles.statusIcon}>{statusConfig.icon}</span>
                {statusConfig.text}
            </span>
                        {canMarkComplete && (
                            <button
                                className={styles.completeBtn}
                                onClick={() => handleMarkComplete(record.id, completedApplication.applicantId)}
                            >
                                <FaStar className="me-1" />
                                Complete & Rate
                            </button>
                        )}
                    </div>
                )
            },
        },
        {
            title: "Actions",
            key: "actions",
            width: "15%",
            render: (_, record) => (
                <div className={styles.actionButtons}>
                    <Link to={`/job-detail/${record.id}`} className={styles.viewBtn}>
                        <FaEye />
                    </Link>
                </div>
            ),
        },
    ]

    return (
        <div className={styles.tableContainer}>
            {contextHolder}

            {/* Header Section */}
            <div className={styles.tableHeader}>
                <div className={styles.headerStats}>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{jobPosts.length}</div>
                        <div className={styles.statLabel}>Total Jobs</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{jobPosts.filter((job) => job.status === "ACTIVE").length}</div>
                        <div className={styles.statLabel}>Active Jobs</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>{jobPosts.reduce((sum, job) => sum + job.applicants, 0)}</div>
                        <div className={styles.statLabel}>Total Applicants</div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className={styles.filtersSection}>
                <div className={styles.searchWrapper}>
                    <FaSearch className={styles.searchIcon} />
                    <Input
                        placeholder="Search jobs by title or company..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value)
                            setCurrentPage(1)
                        }}
                        className={styles.searchInput}
                    />
                </div>
                <Select
                    value={filterStatus}
                    onChange={(value) => {
                        setFilterStatus(value)
                        setCurrentPage(1)
                    }}
                    className={styles.statusFilter}
                >
                    <Option value="All">All Status</Option>
                    <Option value="PENDING">Pending</Option>
                    <Option value="ACTIVE">Active</Option>
                    <Option value="EXPIRED">Expired</Option>
                    <Option value="REJECTED">Rejected</Option>
                    <Option value="COMPLETED">Completed</Option>
                </Select>
            </div>

            {/* Table Section */}
            <div className={styles.tableWrapper}>
                {loading ? (
                    <div className={styles.loadingState}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading your job posts...</p>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📋</div>
                        <h4>No job posts found</h4>
                        <p>Try adjusting your search criteria or create a new job post.</p>
                    </div>
                ) : (
                    <>
                        <Table
                            columns={columns}
                            dataSource={currentJobs}
                            rowKey="id"
                            pagination={false}
                            loading={loading}
                            className={styles.customTable}
                            rowClassName={styles.tableRow}
                        />

                        {filteredJobs.length > jobsPerPage && (
                            <div className={styles.paginationWrapper}>
                                <Pagination
                                    current={currentPage}
                                    total={filteredJobs.length}
                                    pageSize={jobsPerPage}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    showQuickJumper
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} jobs`}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Rating Modal */}
            <RatingModal
                visible={ratingModalVisible}
                onClose={() => setRatingModalVisible(false)}
                onSubmit={handleRatingSubmit}
            />
        </div>
    )
}

export default JobPostHistoryTable