import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select, Pagination, notification, Modal, Rate, Input as AntdInput } from "antd";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchPublishedJobsByUser, updateJobStatus, createRating } from "../../services/jobService";
import { useAuth } from "../../pages/AuthContext.jsx";
import styles from "../../components/JobCard/JobCard.module.css";

const { TextArea } = AntdInput;
const { confirm } = Modal;

const JobPostHistoryTable = () => {
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userData } = useAuth();
    const jobsPerPage = 5;
    const [api, contextHolder] = notification.useNotification();
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [selectedFreelancerId, setSelectedFreelancerId] = useState(null);
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");

    const loadJobs = async () => {
        try {
            const userId = userData?.userId;
            if (!userId) {
                throw new Error("User ID not found");
            }
            const data = await fetchPublishedJobsByUser(userId);
            const mappedData = data.map((job) => ({
                ...job,
                title: job.jobTitle,
                department: job.category || "Development",
                employmentType: job.paymentType,
                status: job.status || "PENDING",
                applicants: job.applicant?.length || 0,
                salary: `${job.minBudget} - ${job.maxBudget}`,
                postDate: job.createdAt || new Date().toISOString(),
                expiryDate: job.expiredAt || new Date(Date.now() + 90 * 86400000).toISOString(),
                featured: job.isFeatured || false,
                skills: job.skills || [],
                description: job.description || "No description available",
                keyResponsibilities: job.keyResponsibilities || "",
                applicant: job.applicant || [],
            }));
            setJobPosts(mappedData);
        } catch (err) {
            setError(err.message);
            notification.error({
                message: "Fetch Failed",
                description: err.message || "Failed to fetch job posts",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const formatDate = (date) => {
        if (!date) return "N/A";
        const parsedDate = Array.isArray(date)
            ? new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5], date[6] / 1_000_000)
            : new Date(date);
        return parsedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "PENDING":
                return { backgroundColor: "#cce5ff", color: "#004085" };
            case "ACTIVE":
                return { backgroundColor: "#d4edda", color: "#155724" };
            case "EXPIRED":
                return { backgroundColor: "#fff3cd", color: "#856404" };
            case "REJECTED":
                return { backgroundColor: "#f8d7da", color: "#721c24" };
            case "COMPLETED":
                return { backgroundColor: "#d4edda", color: "#155724" };
            default:
                return { backgroundColor: "#e2e3e5", color: "#383d41" };
        }
    };

    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            placement: "topRight",
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const handleMarkComplete = (jobId, freelancerId) => {
        if (!userData?.userId) {
            openNotification("error", "Unauthorized", "Please log in to update job status");
            return;
        }
        confirm({
            title: "Confirm Job Completion",
            content: "Are you sure you want to mark this job as completed? You will be prompted to rate the freelancer.",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                setSelectedJobId(jobId);
                setSelectedFreelancerId(freelancerId);
                setRatingModalVisible(true);
            },
        });
    };

    const handleSendRating = async () => {
        try {
            // Call createRating API
            await createRating(selectedJobId, selectedFreelancerId, { stars, comment }, userData.userId);
            // Call updateJobStatus API
            const updatedJob = await updateJobStatus(selectedJobId, "COMPLETED", userData.userId);
            // Update job status in state
            setJobPosts((prevJobs) =>
                prevJobs.map((job) =>
                    job.id === selectedJobId ? { ...job, status: "COMPLETED" } : job
                )
            );
            openNotification("success", "Job Completed and Rated", "Job marked as COMPLETED and rating submitted successfully");
            setRatingModalVisible(false);
            setStars(0);
            setComment("");
        } catch (error) {
            openNotification("error", "Operation Failed", error.message || "Failed to submit rating or update job status");
        }
    };

    const handleCancelRating = () => {
        setRatingModalVisible(false);
        setStars(0);
        setComment("");
    };

    const filteredJobs = jobPosts.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.companyName?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = filterStatus === "All" || job.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const columns = [
        {
            title: "Job Title",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <Link to={`/job-detail/${record.id}`} className="text-decoration-none text-reset">
                    {text}
                </Link>
            ),
        },
        {
            title: "Company",
            dataIndex: "companyName",
            key: "companyName",
            render: (text) => text || "Unknown Company",
        },
        {
            title: "Posted Date",
            dataIndex: "postDate",
            key: "postDate",
            render: (date) => formatDate(date),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => {
                const completedApplication = record.applicant?.find(
                    (app) => app.status === "COMPLETED"
                );
                const canMarkComplete = record.status === "PENDING" && completedApplication;
                return (
                    <div>
                        <span className="badge" style={getStatusBadgeStyle(status)}>
                            {status}
                        </span>
                        {canMarkComplete && (
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="ms-2"
                                onClick={() => handleMarkComplete(record.id, completedApplication.applicantId)}
                            >
                                Mark Complete
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <div className="card shadow-sm border-0">
            {contextHolder}
            <div className="card-header bg-white py-3">
                <div className="row mb-4">
                    <div className="col-md-8 mb-2 mb-md-0">
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <FaSearch />
                            </span>
                            <Input
                                placeholder="Search by job title or company..."
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Select
                            value={filterStatus}
                            onChange={(value) => {
                                setFilterStatus(value);
                                setCurrentPage(1);
                            }}
                            style={{ width: "100%" }}
                        >
                            <Option value="All">Status - All</Option>
                            <Option value="PENDING">Pending</Option>
                            <Option value="ACTIVE">Active</Option>
                            <Option value="EXPIRED">Expired</Option>
                            <Option value="REJECTED">Rejected</Option>
                            <Option value="COMPLETED">Completed</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {loading ? (
                    <div className="text-center mt-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <p>No job posts found.</p>
                ) : (
                    <>
                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={currentJobs}
                                rowKey="id"
                                pagination={false}
                                loading={loading}
                            />
                        </div>
                        {totalPages > 1 && (
                            <Pagination
                                current={currentPage}
                                total={filteredJobs.length}
                                pageSize={jobsPerPage}
                                onChange={handlePageChange}
                                className="justify-content-center mt-4"
                                showSizeChanger={false}
                            />
                        )}
                    </>
                )}
                <Modal
                    title="Rate Freelancer"
                    open={ratingModalVisible}
                    onCancel={handleCancelRating}
                    footer={[
                        <Button key="cancel" onClick={handleCancelRating}>
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            disabled={stars === 0 || comment.trim() === ""}
                            onClick={handleSendRating}
                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                        >
                            Send Rating
                        </Button>,
                    ]}
                >
                    <div style={{ marginBottom: 16 }}>
                        <label>Rating</label>
                        <Rate value={stars} onChange={setStars} />
                    </div>
                    <div>
                        <label>Comment</label>
                        <TextArea
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your feedback about the freelancer's work..."
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default JobPostHistoryTable;