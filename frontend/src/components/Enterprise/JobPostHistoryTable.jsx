import React from "react";
import { useState, useEffect } from "react";
import { Table, Badge, Button, Modal, Tabs, Tag, Dropdown, DatePicker, Select, Form, Input, notification } from "antd";
import {
    FaEye,
    FaEdit,
    FaTrash,
    FaCopy,
    FaChartBar,
    FaEllipsisV,
    FaUserCheck,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaDollarSign,
    FaFilter,
    FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteJob, fetchJobCategories, fetchPublishedJobsByUser, fetchSkills, updateJob } from "../../services/jobService";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
const { confirm } = Modal;


const { TabPane } = Tabs;
const { Option } = Select;

// Skill and category options

const JobPostHistoryTable = () => {
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [editingJob, setEditingJob] = useState(null);
    const [activeTab, setActiveTab] = useState("details");
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);

    // Assume you store userId in localStorage under 'userId'
    const loadCategories = async () => {
        try {
            const data = await fetchJobCategories();
            console.log(data);
            setCategoryOptions(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    const loadSkills = async () => {
        try {
            const data = await fetchSkills();
            console.log(data);
            setSkillOptions(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    const loadJobs = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const data = await fetchPublishedJobsByUser(userId);
            console.log("Fetched job posts:", data);

            // Map API data to expected frontend structure
            const mappedData = data.map(job => ({
                ...job,
                title: job.jobTitle,
                department: job.category || "Development",
                employmentType: job.paymentType,
                status: job.status || "ACTIVE",
                applicants: Math.floor(Math.random() * 20),
                salary: `${job.minBudget} - ${job.maxBudget}`,
                postDate: job.createdAt || new Date().toISOString(),
                expiryDate: job.expiredAt || new Date(Date.now() + 90 * 86400000).toISOString(),
                featured: job.featured || Math.random() > 0.7,
                skills: job.skills || [],
                description: job.projectDescription || "No description available",
                keyResponsibilities: job.keyResponsibilities || ""
            }));

            setJobPosts(mappedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadJobs();
        loadSkills();
        loadCategories();
    }, []);

    const handleView = (job) => {
        setSelectedJob(job);
        setViewModalVisible(true);
        setActiveTab("details");
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        form.setFieldsValue({
            jobTitle: job.jobTitle,
            location: job.location,
            minBudget: job.minBudget,
            maxBudget: job.maxBudget,
            paymentType: job.paymentType,
            category: job.category,
            skills: job.skills || [],
            idealSkills: job.idealSkills || [],
            keyResponsibilities: job.keyResponsibilities,
            projectDescription: job.projectDescription,
            expiredAt: job.expiredAt ? moment(job.expiredAt) : null
        });
        setEditModalVisible(true);
    };

    const handleSaveJob = (values) => {
        Modal.confirm({
            title: "Confirm Job Update",
            content: "Updating this job will set it back to draft. Do you want to continue?",
            okText: "Yes, Update",
            cancelText: "Cancel",
            onOk: async () => {
                try {
                    const jobId = editingJob.id;

                    const jobData = {
                        ...values,
                        id: jobId,
                        publishStatus: "DRAFT", // 🔁 Explicitly set back to draft
                        expiredAt: values.expiredAt ? values.expiredAt.toISOString() : null,
                    };

                    const updated = await updateJob(jobId, jobData);

                    setEditModalVisible(false);
                    await loadJobs(); // refresh list

                    notification.success({
                        message: "Job Updated",
                        description: "Job post has been successfully updated and moved to draft.",
                        placement: "topRight",
                    });
                } catch (error) {
                    console.error("Error updating job:", error);
                    notification.error({
                        message: "Update Failed",
                        description: error.message || "Failed to update job post.",
                        placement: "topRight",
                    });
                }
            }
        });
    };

    const handleDeleteJob = (id) => {
        confirm({
            title: 'Are you sure you want to delete this job post?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await deleteJob(id); // call API to delete
                    // update frontend state after successful delete
                    const updatedJobs = jobPosts.filter(job => job.id !== id);
                    setJobPosts(updatedJobs);

                    notification.success({
                        message: "Job Deleted",
                        description: "Job post has been successfully deleted.",
                        placement: "topRight",
                    });
                } catch (error) {
                    notification.error({
                        message: "Delete Failed",
                        description: error.message || 'Failed to delete job',
                        placement: "topRight",
                    });
                }
            }
        });
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const filteredJobs = jobPosts.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.location.toLowerCase().includes(searchText.toLowerCase()) ||
            (job.department && job.department.toLowerCase().includes(searchText.toLowerCase()));

        if (filterStatus === "all") return matchesSearch;
        return matchesSearch && job.status.toLowerCase() === filterStatus.toLowerCase();
    });

    const columns = [
        {
            title: "Job Title",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <div>
                    <span style={{ fontWeight: 500, color: "#266987", display: "block" }}>{text}</span>
                    <span className="text-muted small">
                        {record.department} • {record.employmentType}
                    </span>
                    {record.featured && (
                        <Tag color="#ffc107" className="mt-1">
                            Featured
                        </Tag>
                    )}
                </div>
            ),
        },
        {
            title: "Post Date",
            dataIndex: "postDate",
            key: "postDate",
            render: (date) => {
                const formattedDate = new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "";
                let displayStatus = status;

                switch (status) {
                    case "ACTIVE":
                        color = "success";
                        displayStatus = "Active";
                        break;
                    case "EXPIRED":
                        color = "warning";
                        displayStatus = "Expired";
                        break;
                    case "REJECTED":
                        color = "error";
                        displayStatus = "Rejected";
                        break;
                    case "PENDING":
                        color = "processing";
                        displayStatus = "Pending";
                        break;
                    default:
                        color = "default";
                }
                return <Badge status={color} text={displayStatus} />;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="d-flex gap-2">
                    <Button
                        type="primary"
                        size="small"
                        icon={<FaEye />}
                        onClick={() => handleView(record)}
                        style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                    >
                        View
                    </Button>

                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "1",
                                    label: "Edit Job Post",
                                    icon: <FaEdit />,
                                    onClick: () => handleEdit(record)
                                },
                                {
                                    key: "4",
                                    label: "Delete",
                                    icon: <FaTrash />,
                                    danger: true,
                                    onClick: () => handleDeleteJob(record.id)
                                },
                            ],
                        }}
                        placement="bottomRight"
                        trigger={["click"]}
                    >
                        <Button
                            type="text"
                            size="small"
                            icon={<FaEllipsisV />}
                            className="d-flex align-items-center justify-content-center"
                        />
                    </Dropdown>
                </div>
            ),
        },
    ];

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h5 className="mb-0 fw-bold">Job Post History</h5>

                    <div className="d-flex gap-2 mt-2 mt-md-0">
                        <div className="position-relative" style={{ width: 250 }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search job posts..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <FaSearch
                                className="position-absolute"
                                style={{ right: 10, top: 10, color: "#aaa" }}
                            />
                        </div>

                        <Dropdown
                            menu={{
                                selectedKeys: [filterStatus],
                                onClick: (e) => setFilterStatus(e.key),
                                items: [
                                    {
                                        key: "all",
                                        label: "All Statuses",
                                    },
                                    {
                                        key: "active",
                                        label: "Active",
                                    },
                                    {
                                        key: "expired",
                                        label: "Expired",
                                    },
                                    {
                                        key: "pending",
                                        label: "Pending",
                                    },
                                    {
                                        key: "rejected",
                                        label: "Rejected",
                                    },
                                ],
                            }}
                            placement="bottomRight"
                            trigger={["click"]}
                        >
                            <Button icon={<FaFilter />}>
                                {filterStatus === "all" ? "All Statuses" : filterStatus}
                            </Button>
                        </Dropdown>

                        <Button
                            type="primary"
                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                        >
                            <Link to="/job-posting">Post New Job</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <Table
                    columns={columns}
                    dataSource={filteredJobs}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                    loading={loading}
                    responsive
                    rowClassName={(record) => (record.featured ? "bg-light" : "")}
                />

                {/* View Job Modal */}
                <Modal
                    title={null}
                    open={viewModalVisible}
                    onCancel={() => setViewModalVisible(false)}
                    footer={null}
                    width={800}
                    className="job-view-modal"
                >
                    {selectedJob && (
                        <div>
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h4 className="mb-1">{selectedJob.title}</h4>
                                    <div className="d-flex align-items-center gap-3 text-muted">
                                        <span>{selectedJob.department}</span>
                                        <span>•</span>
                                        <span>{selectedJob.employmentType}</span>
                                        {selectedJob.featured && (
                                            <Tag color="#ffc107">Featured</Tag>
                                        )}
                                    </div>
                                </div>
                                <Badge
                                    status={
                                        selectedJob.status === "ACTIVE"
                                            ? "success"
                                            : selectedJob.status === "EXPIRED"
                                                ? "warning"
                                                : selectedJob.status === "REJECTED"
                                                    ? "error"
                                                    : selectedJob.status === "PENDING"
                                                        ? "processing"
                                                        : "default"
                                    }
                                    text={
                                        selectedJob.status === "ACTIVE"
                                            ? "Active"
                                            : selectedJob.status === "EXPIRED"
                                                ? "Expired"
                                                : selectedJob.status === "REJECTED"
                                                    ? "Rejected"
                                                    : selectedJob.status === "PENDING"
                                                        ? "Pending"
                                                        : selectedJob.status
                                    }
                                />
                            </div>

                            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                                <TabPane tab="Job Details" key="details">
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <FaCalendarAlt
                                                    className="me-2 text-primary"
                                                    style={{ color: "#428A9B" }}
                                                />
                                                <div>
                                                    <div className="text-muted small">Posted On</div>
                                                    <div>
                                                        {new Date(selectedJob.postDate).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <FaCalendarAlt className="me-2 text-danger" />
                                                <div>
                                                    <div className="text-muted small">Expires On</div>
                                                    <div>
                                                        {new Date(
                                                            selectedJob.expiryDate
                                                        ).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <FaMapMarkerAlt
                                                    className="me-2"
                                                    style={{ color: "#428A9B" }}
                                                />
                                                <div>
                                                    <div className="text-muted small">Location</div>
                                                    <div>{selectedJob.location}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <FaDollarSign
                                                    className="me-2"
                                                    style={{ color: "#428A9B" }}
                                                />
                                                <div>
                                                    <div className="text-muted small">Budget Range</div>
                                                    <div>${selectedJob.minBudget} - ${selectedJob.maxBudget}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="text-muted small">Payment Type</div>
                                                    <div>{selectedJob.employmentType}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="text-muted small">Category</div>
                                                    <div>{selectedJob.department}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3">Required Skills</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {selectedJob.skills.map((skill, index) => (
                                                <Tag key={index} color="#428A9B">
                                                    {skill}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3">Description</h6>
                                        <p>{selectedJob.description}</p>
                                    </div>

                                    {selectedJob.keyResponsibilities && (
                                        <div className="mb-4">
                                            <h6 className="fw-bold mb-3">Key Responsibilities</h6>
                                            <pre
                                                style={{
                                                    fontFamily: "inherit",
                                                    whiteSpace: "pre-line",
                                                    margin: 0,
                                                }}
                                            >
                                                {selectedJob.keyResponsibilities}
                                            </pre>
                                        </div>
                                    )}
                                </TabPane>
                            </Tabs>

                            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                                <Button onClick={() => setViewModalVisible(false)}>
                                    Close
                                </Button>

                                <div className="d-flex gap-2">
                                    <Button
                                        icon={<FaEdit />}
                                        onClick={() => {
                                            setViewModalVisible(false);
                                            handleEdit(selectedJob);
                                        }}
                                    >
                                        Edit Job
                                    </Button>
                                    <Button
                                        type="primary"
                                        style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                                    >
                                        View Applicants
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Edit Job Modal */}
                <Modal
                    title="Edit Job Post"
                    open={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                    width={800}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSaveJob}
                        initialValues={{
                            skills: [],
                            idealSkills: []
                        }}
                    >
                        <div className="row">
                            {/* Job Title */}
                            <div className="col-md-6">
                                <Form.Item
                                    label="Job Title"
                                    name="jobTitle"
                                    rules={[{ required: true, message: "Please enter job title" }]}
                                >
                                    <Input placeholder="e.g. Senior Frontend Developer" />
                                </Form.Item>
                            </div>

                            {/* Location */}
                            <div className="col-md-6">
                                <Form.Item
                                    label="Location"
                                    name="location"
                                    rules={[{ required: true, message: "Please enter job location" }]}
                                >
                                    <Input placeholder="e.g. Remote / New York" />
                                </Form.Item>
                            </div>

                            {/* Budget */}
                            <div className="col-md-3">
                                <Form.Item
                                    label="Min Budget ($)"
                                    name="minBudget"
                                    rules={[{ required: true, message: "Enter min budget" }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>
                            <div className="col-md-3">
                                <Form.Item
                                    label="Max Budget ($)"
                                    name="maxBudget"
                                    rules={[{ required: true, message: "Enter max budget" }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>

                            {/* Payment Type */}
                            <div className="col-md-3">
                                <Form.Item
                                    label="Payment Type"
                                    name="paymentType"
                                    rules={[{ required: true, message: "Select payment type" }]}
                                >
                                    <Select>
                                        <Option value="Hourly">Hourly</Option>
                                        <Option value="Fixed">Fixed</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            {/* Category */}
                            <div className="col-md-3">
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: "Select a category" }]}
                                >
                                    <Select placeholder="Select job category">
                                        {categoryOptions.map((cat) => (
                                            <Option key={cat} value={cat}>
                                                {cat}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            {/* Skills */}
                            <div className="col-md-6">
                                <Form.Item
                                    label="Required Skills"
                                    name="skills"
                                    rules={[{ required: true, message: "Enter required skills" }]}
                                >
                                    <Select mode="tags" placeholder="Add skills">
                                        {skillOptions.map((skill) => (
                                            <Option key={skill} value={skill}>
                                                {skill}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            {/* Ideal Skills */}
                            <div className="col-md-6">
                                <Form.Item label="Ideal Skills" name="idealSkills">
                                    <Select mode="tags" placeholder="Add ideal skills (optional)" />
                                </Form.Item>
                            </div>

                            {/* Responsibilities */}
                            <div className="col-12">
                                <Form.Item
                                    label="Key Responsibilities"
                                    name="keyResponsibilities"
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="List key responsibilities (one per line)"
                                    />
                                </Form.Item>
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <Form.Item
                                    label="Project Description"
                                    name="projectDescription"
                                    rules={[{ required: true, message: "Please enter description" }]}
                                >
                                    <TextArea
                                        rows={4}
                                        placeholder="Describe the job/project in detail..."
                                    />
                                </Form.Item>
                            </div>

                            {/* Expired At */}
                            <div className="col-md-6">
                                <Form.Item label="Expires At" name="expiredAt">
                                    <DatePicker showTime style={{ width: "100%" }} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default JobPostHistoryTable;