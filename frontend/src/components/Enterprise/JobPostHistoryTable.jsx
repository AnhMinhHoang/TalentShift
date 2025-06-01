import React from "react"
import { useState } from "react"
import { Table, Badge, Button, Modal, Tabs, Tag, Dropdown } from "antd"
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
} from "react-icons/fa"
import { Link } from "react-router-dom"

const { TabPane } = Tabs

const JobPostHistoryTable = () => {
    const [viewModalVisible, setViewModalVisible] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [activeTab, setActiveTab] = useState("details")
    const [searchText, setSearchText] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    // Sample data for job post history
    const jobPosts = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            postDate: "2025-04-15",
            expiryDate: "2025-05-15",
            status: "Active",
            description:
                "We are looking for a Senior Frontend Developer with 5+ years of experience in React.js, Redux, and TypeScript. The ideal candidate will have a strong understanding of modern web development practices and be able to lead a team of developers.",
            requirements:
                "- 5+ years of experience with React.js\n- Strong knowledge of TypeScript\n- Experience with state management libraries\n- Excellent communication skills",
            location: "San Francisco, CA",
            salary: "$120,000 - $150,000",
            applicants: 24,
            views: 342,
            featured: true,
            department: "Engineering",
            employmentType: "Full-time",
            skills: ["React", "TypeScript", "Redux", "HTML5", "CSS3"],
        },
        {
            id: 2,
            title: "Backend Engineer",
            postDate: "2025-03-22",
            expiryDate: "2025-04-22",
            status: "Expired",
            description:
                "We are seeking a Backend Engineer to join our growing team. The ideal candidate will have experience with Node.js, Express, and MongoDB.",
            requirements:
                "- 3+ years of experience with Node.js\n- Experience with MongoDB\n- Knowledge of RESTful API design\n- Familiarity with cloud services",
            location: "Remote",
            salary: "$100,000 - $130,000",
            applicants: 18,
            views: 256,
            featured: false,
            department: "Engineering",
            employmentType: "Full-time",
            skills: ["Node.js", "MongoDB", "Express", "REST API", "AWS"],
        },
        {
            id: 3,
            title: "UX/UI Designer",
            postDate: "2025-05-01",
            expiryDate: "2025-06-01",
            status: "Active",
            description:
                "We are looking for a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a portfolio of professional design projects.",
            requirements:
                "- 3+ years of experience in UX/UI design\n- Proficiency in Figma and Adobe Creative Suite\n- Experience with user research\n- Strong portfolio of work",
            location: "New York, NY",
            salary: "$90,000 - $120,000",
            applicants: 32,
            views: 410,
            featured: true,
            department: "Design",
            employmentType: "Full-time",
            skills: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping"],
        },
        {
            id: 4,
            title: "DevOps Engineer",
            postDate: "2025-02-10",
            expiryDate: "2025-03-10",
            status: "Rejected",
            description:
                "We are seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. The ideal candidate will have experience with AWS, Docker, and Kubernetes.",
            requirements:
                "- 4+ years of experience with AWS\n- Experience with Docker and Kubernetes\n- Knowledge of CI/CD pipelines\n- Scripting skills in Python or Bash",
            location: "Chicago, IL",
            salary: "$110,000 - $140,000",
            applicants: 15,
            views: 198,
            featured: false,
            department: "Operations",
            employmentType: "Full-time",
            skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python"],
        },
        {
            id: 5,
            title: "Product Manager",
            postDate: "2025-04-28",
            expiryDate: "2025-05-28",
            status: "Pending",
            description:
                "We are looking for a Product Manager to help us define and launch new products. The ideal candidate will have experience with agile methodologies and a track record of successful product launches.",
            requirements:
                "- 5+ years of experience in product management\n- Experience with agile methodologies\n- Strong analytical skills\n- Excellent communication skills",
            location: "Austin, TX",
            salary: "$130,000 - $160,000",
            applicants: 8,
            views: 175,
            featured: false,
            department: "Product",
            employmentType: "Full-time",
            skills: ["Product Management", "Agile", "Roadmapping", "User Stories", "Market Research"],
        },
    ]

    const handleView = (job) => {
        setSelectedJob(job)
        setViewModalVisible(true)
        setActiveTab("details")
    }

    const handleTabChange = (key) => {
        setActiveTab(key)
    }

    const filteredJobs = jobPosts.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.location.toLowerCase().includes(searchText.toLowerCase()) ||
            job.department.toLowerCase().includes(searchText.toLowerCase())

        if (filterStatus === "all") return matchesSearch
        return matchesSearch && job.status.toLowerCase() === filterStatus.toLowerCase()
    })

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
                })
                return <span>{formattedDate}</span>
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = ""
                switch (status) {
                    case "Active":
                        color = "success"
                        break
                    case "Expired":
                        color = "warning"
                        break
                    case "Rejected":
                        color = "error"
                        break
                    case "Pending":
                        color = "processing"
                        break
                    default:
                        color = "default"
                }
                return <Badge status={color} text={status} />
            },
        },
        {
            title: "Applicants",
            dataIndex: "applicants",
            key: "applicants",
            render: (count) => (
                <div className="d-flex align-items-center">
                    <FaUserCheck className="me-2 text-success" />
                    <span>{count}</span>
                </div>
            ),
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
                                },
                                {
                                    key: "2",
                                    label: "Duplicate",
                                    icon: <FaCopy />,
                                },
                                {
                                    key: "3",
                                    label: "View Analytics",
                                    icon: <FaChartBar />,
                                },
                                {
                                    key: "4",
                                    label: "Delete",
                                    icon: <FaTrash />,
                                    danger: true,
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
    ]

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
                            <FaSearch className="position-absolute" style={{ right: 10, top: 10, color: "#aaa" }} />
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
                            <Button icon={<FaFilter />}>{filterStatus === "all" ? "All Statuses" : filterStatus}</Button>
                        </Dropdown>

                        <Button type="primary" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
                            <Link to="/job-post">Post New Job</Link>
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
                    responsive
                    rowClassName={(record) => (record.featured ? "bg-light" : "")}
                />

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
                                        {selectedJob.featured && <Tag color="#ffc107">Featured</Tag>}
                                    </div>
                                </div>
                                <Badge
                                    status={
                                        selectedJob.status === "Active"
                                            ? "success"
                                            : selectedJob.status === "Expired"
                                                ? "warning"
                                                : selectedJob.status === "Rejected"
                                                    ? "error"
                                                    : selectedJob.status === "Pending"
                                                        ? "processing"
                                                        : "default"
                                    }
                                    text={selectedJob.status}
                                />
                            </div>

                            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                                <TabPane tab="Job Details" key="details">
                                    <div className="row mb-4">
                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <FaCalendarAlt className="me-2 text-primary" style={{ color: "#428A9B" }} />
                                                <div>
                                                    <div className="text-muted small">Posted On</div>
                                                    <div>
                                                        {new Date(selectedJob.postDate).toLocaleDateString("en-US", {
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
                                                <FaCalendarAlt className="me-2 text-danger" />
                                                <div>
                                                    <div className="text-muted small">Expires On</div>
                                                    <div>
                                                        {new Date(selectedJob.expiryDate).toLocaleDateString("en-US", {
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
                                                <FaMapMarkerAlt className="me-2" style={{ color: "#428A9B" }} />
                                                <div>
                                                    <div className="text-muted small">Location</div>
                                                    <div>{selectedJob.location}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <FaDollarSign className="me-2" style={{ color: "#428A9B" }} />
                                                <div>
                                                    <div className="text-muted small">Salary Range</div>
                                                    <div>{selectedJob.salary}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3">Required Skills</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {selectedJob.skills.map((skill) => (
                                                <Tag key={skill} color="#428A9B">
                                                    {skill}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3">Description</h6>
                                        <p>{selectedJob.description}</p>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3">Requirements</h6>
                                        <pre
                                            style={{
                                                fontFamily: "inherit",
                                                whiteSpace: "pre-line",
                                                margin: 0,
                                            }}
                                        >
                                            {selectedJob.requirements}
                                        </pre>
                                    </div>
                                </TabPane>

                                <TabPane tab="Applicants" key="applicants">
                                    <div className="text-center py-4">
                                        <div className="display-4 fw-bold text-primary" style={{ color: "#428A9B" }}>
                                            {selectedJob.applicants}
                                        </div>
                                        <p className="text-muted">Total Applicants</p>

                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="card border-0 bg-light p-3">
                                                    <div className="h4 mb-0 text-success">12</div>
                                                    <div className="text-muted small">Shortlisted</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card border-0 bg-light p-3">
                                                    <div className="h4 mb-0 text-warning">8</div>
                                                    <div className="text-muted small">In Review</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card border-0 bg-light p-3">
                                                    <div className="h4 mb-0 text-danger">4</div>
                                                    <div className="text-muted small">Rejected</div>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="primary"
                                            className="mt-4"
                                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                                        >
                                            View All Applicants
                                        </Button>
                                    </div>
                                </TabPane>

                                <TabPane tab="Analytics" key="analytics">
                                    <div className="text-center py-4">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <div className="card border-0 bg-light p-3">
                                                    <div className="display-6 fw-bold text-primary" style={{ color: "#428A9B" }}>
                                                        {selectedJob.views}
                                                    </div>
                                                    <div className="text-muted">Total Views</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <div className="card border-0 bg-light p-3">
                                                    <div className="display-6 fw-bold text-success">{selectedJob.applicants}</div>
                                                    <div className="text-muted">Applications</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <div className="card border-0 bg-light p-3">
                                                    <div className="display-6 fw-bold text-warning">
                                                        {Math.round((selectedJob.applicants / selectedJob.views) * 100)}%
                                                    </div>
                                                    <div className="text-muted">Conversion Rate</div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-muted mt-3">View detailed analytics to optimize your job posting performance</p>

                                        <Button
                                            type="primary"
                                            className="mt-3"
                                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                                        >
                                            View Full Analytics
                                        </Button>
                                    </div>
                                </TabPane>
                            </Tabs>

                            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                                <Button onClick={() => setViewModalVisible(false)}>Close</Button>

                                <div className="d-flex gap-2">
                                    <Button icon={<FaEdit />}>Edit Job</Button>
                                    <Button type="primary" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
                                        View Applicants
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default JobPostHistoryTable
