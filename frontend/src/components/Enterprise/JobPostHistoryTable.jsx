import React from "react"
import { useState } from "react"
import { Table, Badge, Button, Modal } from "antd"
import { FaEye } from "react-icons/fa"
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaDollarSign,
    FaClock,
    FaCheckCircle
} from "react-icons/fa"

const JobPostHistoryTable = () => {
    const [viewModalVisible, setViewModalVisible] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)

    // Sample data for job post history
    const jobPosts = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            postDate: "2025-04-15",
            status: "Active",
            description:
                "We are looking for a Senior Frontend Developer with 5+ years of experience in React.js, Redux, and TypeScript. The ideal candidate will have a strong understanding of modern web development practices and be able to lead a team of developers.",
            requirements:
                "- 5+ years of experience with React.js\n- Strong knowledge of TypeScript\n- Experience with state management libraries\n- Excellent communication skills",
            location: "San Francisco, CA",
            salary: "$120,000 - $150,000",
        },
        {
            id: 2,
            title: "Backend Engineer",
            postDate: "2025-03-22",
            status: "Expired",
            description:
                "We are seeking a Backend Engineer to join our growing team. The ideal candidate will have experience with Node.js, Express, and MongoDB.",
            requirements:
                "- 3+ years of experience with Node.js\n- Experience with MongoDB\n- Knowledge of RESTful API design\n- Familiarity with cloud services",
            location: "Remote",
            salary: "$100,000 - $130,000",
        },
        {
            id: 3,
            title: "UX/UI Designer",
            postDate: "2025-05-01",
            status: "Active",
            description:
                "We are looking for a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a portfolio of professional design projects.",
            requirements:
                "- 3+ years of experience in UX/UI design\n- Proficiency in Figma and Adobe Creative Suite\n- Experience with user research\n- Strong portfolio of work",
            location: "New York, NY",
            salary: "$90,000 - $120,000",
        },
        {
            id: 4,
            title: "DevOps Engineer",
            postDate: "2025-02-10",
            status: "Rejected",
            description:
                "We are seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. The ideal candidate will have experience with AWS, Docker, and Kubernetes.",
            requirements:
                "- 4+ years of experience with AWS\n- Experience with Docker and Kubernetes\n- Knowledge of CI/CD pipelines\n- Scripting skills in Python or Bash",
            location: "Chicago, IL",
            salary: "$110,000 - $140,000",
        },
        {
            id: 5,
            title: "Product Manager",
            postDate: "2025-04-28",
            status: "Pending",
            description:
                "We are looking for a Product Manager to help us define and launch new products. The ideal candidate will have experience with agile methodologies and a track record of successful product launches.",
            requirements:
                "- 5+ years of experience in product management\n- Experience with agile methodologies\n- Strong analytical skills\n- Excellent communication skills",
            location: "Austin, TX",
            salary: "$130,000 - $160,000",
        },
    ]

    const handleView = (job) => {
        setSelectedJob(job)
        setViewModalVisible(true)
    }

    const columns = [
        {
            title: "Job Title",
            dataIndex: "title",
            key: "title",
            render: (text) => <span style={{ fontWeight: 500, color: "#266987" }}>{text}</span>,
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
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button
                    type="primary"
                    size="small"
                    icon={<FaEye />}
                    onClick={() => handleView(record)}
                    style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                >
                    View
                </Button>
            ),
        },
    ]
    const SectionDivider = ({ title }) => (
        <div className="d-flex align-items-center mb-3">
            <div style={{
                width: "4px",
                height: "24px",
                backgroundColor: "#428A9B",
                borderRadius: "2px",
                marginRight: "12px"
            }} />
            <h5 className="m-0" style={{ fontWeight: 600 }}>{title}</h5>
        </div>
    )

    const DetailItem = ({ icon, label, value }) => (
        <div className="d-flex align-items-center mb-3 p-3 bg-light rounded">
            <span className="text-muted me-3" style={{ fontSize: "18px" }}>
                {icon}
            </span>
            <div>
                <div className="text-sm text-muted">{label}</div>
                <div className="text-md" style={{ fontWeight: 500 }}>
                    {value}
                </div>
            </div>
        </div>
    )
    return (
        <div className="card">
            <div className="card-header bg-white">
                <h5 className="mb-0">Job Post History</h5>
            </div>
            <div className="card-body">
                <Table columns={columns} dataSource={jobPosts} rowKey="id" pagination={{ pageSize: 5 }} responsive />

                <Modal
                    title={
                        <div className="d-flex align-items-center">
                            <span style={{ fontSize: "20px", fontWeight: 600 }}>{selectedJob?.title}</span>
                            <Badge
                                className="ms-3"
                                color={
                                    selectedJob?.status === "Active" ? "#52c41a" :
                                        selectedJob?.status === "Expired" ? "#faad14" :
                                            selectedJob?.status === "Rejected" ? "#ff4d4f" :
                                                "#1890ff"
                                }
                                text={selectedJob?.status}
                            />
                        </div>
                    }
                    open={viewModalVisible}
                    onCancel={() => setViewModalVisible(false)}
                    footer={null}
                    width={800}
                    centered
                    closable={false}
                    className="job-detail-modal"
                >
                    {selectedJob && (
                        <div className="p-4">
                            <div className="d-flex justify-content-end mb-3">
                                <Button
                                    onClick={() => setViewModalVisible(false)}
                                    shape="round"
                                    style={{
                                        backgroundColor: "#ff4d4f20",
                                        borderColor: "#ff4d4f",
                                        color: "#ff4d4f"
                                    }}
                                >
                                    Close
                                </Button>
                            </div>

                            <div className="grid-2-col mb-4">
                                <DetailItem
                                    icon={<FaCalendarAlt className="me-2" />}
                                    label="Post Date"
                                    value={new Date(selectedJob.postDate).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                />
                                <DetailItem
                                    icon={<FaMapMarkerAlt className="me-2" />}
                                    label="Location"
                                    value={selectedJob.location}
                                />
                                <DetailItem
                                    icon={<FaDollarSign className="me-2" />}
                                    label="Salary Range"
                                    value={selectedJob.salary}
                                />
                                <DetailItem
                                    icon={<FaClock className="me-2" />}
                                    label="Status"
                                    value={
                                        <Badge
                                            color={
                                                selectedJob.status === "Active" ? "#52c41a" :
                                                    selectedJob.status === "Expired" ? "#faad14" :
                                                        selectedJob.status === "Rejected" ? "#ff4d4f" :
                                                            "#1890ff"
                                            }
                                            text={selectedJob.status}
                                        />
                                    }
                                />
                            </div>

                            <SectionDivider title="Job Description" />
                            <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                                {selectedJob.description}
                            </p>

                            <SectionDivider title="Requirements" />
                            <div className="requirements-list">
                                {selectedJob.requirements.split('\n').map((req, index) => (
                                    <div key={index} className="d-flex align-items-start mb-2">
                                        <FaCheckCircle className="me-2 mt-1" style={{ color: "#52c41a" }} />
                                        <span className="text-muted">{req.replace('- ', '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default JobPostHistoryTable
