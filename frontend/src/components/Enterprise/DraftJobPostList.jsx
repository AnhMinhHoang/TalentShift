import React from "react"
import { useState } from "react"
import { Card, Button, notification, Popconfirm, Tag, Tooltip, Modal, Form, Input, Select, Upload } from "antd"
import {
    FaEdit,
    FaTrash,
    FaPaperPlane,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaDollarSign,
    FaBuilding,
    FaPlus,
    FaEye,
    FaClock,
    FaFileAlt,
    FaUpload,
} from "react-icons/fa"

const { TextArea } = Input
const { Option } = Select

const DraftJobPostList = () => {
    const [draftPosts, setDraftPosts] = useState([
        {
            id: 1,
            title: "Full Stack Developer",
            lastEdited: "2025-05-10",
            description: "We are looking for a Full Stack Developer with experience in React and Node.js.",
            requirements:
                "- 3+ years of experience with React\n- Experience with Node.js and Express\n- Knowledge of MongoDB or SQL databases",
            location: "Remote",
            salary: "$90,000 - $120,000",
            department: "Engineering",
            employmentType: "Full-time",
            skills: ["React", "Node.js", "MongoDB", "JavaScript", "TypeScript"],
        },
        {
            id: 2,
            title: "Data Scientist",
            lastEdited: "2025-05-08",
            description:
                "We are seeking a Data Scientist to join our analytics team. The ideal candidate will have experience with machine learning and data visualization.",
            requirements:
                "- Masters or PhD in a quantitative field\n- Experience with Python and R\n- Knowledge of machine learning algorithms\n- Experience with data visualization tools",
            location: "Boston, MA",
            salary: "$110,000 - $140,000",
            department: "Data Science",
            employmentType: "Full-time",
            skills: ["Python", "R", "Machine Learning", "SQL", "Data Visualization"],
        },
        {
            id: 3,
            title: "Marketing Manager",
            lastEdited: "2025-05-05",
            description:
                "We are looking for a Marketing Manager to lead our marketing efforts. The ideal candidate will have experience with digital marketing and campaign management.",
            requirements:
                "- 5+ years of experience in marketing\n- Experience with digital marketing platforms\n- Strong analytical skills\n- Excellent communication skills",
            location: "Seattle, WA",
            salary: "$100,000 - $130,000",
            department: "Marketing",
            employmentType: "Full-time",
            skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Social Media"],
        },
    ])

    const [editModalVisible, setEditModalVisible] = useState(false)
    const [previewModalVisible, setPreviewModalVisible] = useState(false)
    const [currentDraft, setCurrentDraft] = useState(null)
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState(null)

    const handleDelete = (id) => {
        setDraftPosts(draftPosts.filter((post) => post.id !== id))
        notification.success({
            message: "Draft Deleted",
            description: "The draft job post has been successfully deleted.",
            placement: "topRight",
        })
    }

    const handlePost = (id) => {
        // In a real application, this would send the post to the server
        // and move it from drafts to active posts
        setDraftPosts(draftPosts.filter((post) => post.id !== id))
        notification.success({
            message: "Job Posted",
            description: "Your job post has been successfully published.",
            placement: "topRight",
        })
    }

    const handleEdit = (id) => {
        const draft = draftPosts.find((post) => post.id === id)
        setCurrentDraft(draft)

        form.setFieldsValue({
            title: draft.title,
            department: draft.department,
            employmentType: draft.employmentType,
            location: draft.location,
            salary: draft.salary,
            description: draft.description,
            requirements: draft.requirements,
            skills: draft.skills,
        })

        setEditModalVisible(true)
    }

    const handlePreview = (id) => {
        const draft = draftPosts.find((post) => post.id === id)
        setCurrentDraft(draft)
        setPreviewModalVisible(true)
    }

    const handleSaveDraft = (values) => {
        const updatedDrafts = draftPosts.map((post) => {
            if (post.id === currentDraft.id) {
                return {
                    ...post,
                    ...values,
                    lastEdited: new Date().toISOString().split("T")[0],
                }
            }
            return post
        })

        setDraftPosts(updatedDrafts)
        setEditModalVisible(false)

        notification.success({
            message: "Draft Updated",
            description: "Your draft job post has been successfully updated.",
            placement: "topRight",
        })
    }

    const handleCreateNew = () => {
        setCurrentDraft(null)
        form.resetFields()
        setEditModalVisible(true)
        setImageUrl(null)
    }

    const handleSaveNew = (values) => {
        const newDraft = {
            id: Date.now(),
            ...values,
            lastEdited: new Date().toISOString().split("T")[0],
        }

        setDraftPosts([...draftPosts, newDraft])
        setEditModalVisible(false)

        notification.success({
            message: "Draft Created",
            description: "Your new draft job post has been created.",
            placement: "topRight",
        })
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const handleImageChange = (info) => {
        if (info.file.status !== "uploading") {
            // In a real app, this would handle the uploaded file
            // For now, we'll just use a placeholder
            setImageUrl("/placeholder.svg?height=150&width=150")
        }
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header d-flex justify-content-between align-items-center bg-white py-3">
                <h5 className="mb-0 fw-bold">Draft Job Posts</h5>
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={handleCreateNew}
                    style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                >
                    Create New Draft
                </Button>
            </div>
            <div className="card-body">
                {draftPosts.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-3" style={{ fontSize: "3rem", color: "#ddd" }}>
                            <FaFileAlt />
                        </div>
                        <h5>No Draft Job Posts</h5>
                        <p className="text-muted">Create a new draft to get started</p>
                        <Button
                            type="primary"
                            icon={<FaPlus />}
                            onClick={handleCreateNew}
                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                        >
                            Create New Draft
                        </Button>
                    </div>
                ) : (
                    <div className="row">
                        {draftPosts.map((post) => (
                            <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                                <Card
                                    className="h-100 shadow-sm hover-shadow"
                                    style={{ transition: "all 0.3s ease", border: "1px solid #eee" }}
                                    hoverable
                                >
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="mb-0 text-truncate" style={{ maxWidth: "80%" }}>
                                            {post.title}
                                        </h5>
                                        <Tooltip title="Last edited">
                                            <div className="d-flex align-items-center text-muted small">
                                                <FaClock className="me-1" />
                                                <span>{formatDate(post.lastEdited)}</span>
                                            </div>
                                        </Tooltip>
                                    </div>

                                    <div className="mb-3">
                                        <div className="d-flex align-items-center text-muted mb-2 small">
                                            <FaBuilding className="me-2" style={{ color: "#428A9B" }} />
                                            <span>
                                                {post.department} • {post.employmentType}
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center text-muted mb-2 small">
                                            <FaMapMarkerAlt className="me-2" style={{ color: "#428A9B" }} />
                                            <span>{post.location}</span>
                                        </div>
                                        <div className="d-flex align-items-center text-muted mb-2 small">
                                            <FaDollarSign className="me-2" style={{ color: "#428A9B" }} />
                                            <span>{post.salary}</span>
                                        </div>
                                    </div>

                                    <p
                                        className="mb-3 text-truncate-3"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            height: "4.5em",
                                        }}
                                    >
                                        {post.description}
                                    </p>

                                    <div className="mb-3">
                                        <div className="d-flex flex-wrap gap-1">
                                            {post.skills.slice(0, 3).map((skill, index) => (
                                                <Tag key={index} color="#428A9B">
                                                    {skill}
                                                </Tag>
                                            ))}
                                            {post.skills.length > 3 && <Tag>+{post.skills.length - 3} more</Tag>}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between mt-auto pt-3 border-top">
                                        <Button icon={<FaEye />} onClick={() => handlePreview(post.id)}>
                                            Preview
                                        </Button>
                                        <div className="d-flex gap-2">
                                            <Tooltip title="Edit Draft">
                                                <Button icon={<FaEdit />} onClick={() => handleEdit(post.id)} />
                                            </Tooltip>
                                            <Tooltip title="Delete Draft">
                                                <Popconfirm
                                                    title="Delete this draft?"
                                                    description="Are you sure you want to delete this draft job post?"
                                                    onConfirm={() => handleDelete(post.id)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                    okButtonProps={{ style: { backgroundColor: "#dc3545", borderColor: "#dc3545" } }}
                                                >
                                                    <Button danger icon={<FaTrash />} />
                                                </Popconfirm>
                                            </Tooltip>
                                            <Tooltip title="Publish Job Post">
                                                <Button
                                                    type="primary"
                                                    icon={<FaPaperPlane />}
                                                    onClick={() => handlePost(post.id)}
                                                    style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit/Create Modal */}
                <Modal
                    title={currentDraft ? "Edit Draft Job Post" : "Create New Draft Job Post"}
                    open={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                    width={800}
                >
                    <Form form={form} layout="vertical" onFinish={currentDraft ? handleSaveDraft : handleSaveNew}>
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Item label="Company Logo">
                                    <Upload
                                        name="avatar"
                                        listType="picture-circle"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="/api/upload" // This would be your upload endpoint
                                        onChange={handleImageChange}
                                        beforeUpload={() => {
                                            // Return false to prevent actual upload since we're just handling preview
                                            return false
                                        }}
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl || "/placeholder.svg"}
                                                alt="avatar"
                                                style={{ width: "100%", borderRadius: "50%" }}
                                            />
                                        ) : (
                                            <div>
                                                <FaUpload />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        )}
                                    </Upload>
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item
                                    label="Job Title"
                                    name="title"
                                    rules={[{ required: true, message: "Please enter job title" }]}
                                >
                                    <Input placeholder="e.g. Senior Frontend Developer" />
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item
                                    label="Department"
                                    name="department"
                                    rules={[{ required: true, message: "Please select department" }]}
                                >
                                    <Select placeholder="Select department">
                                        <Option value="Engineering">Engineering</Option>
                                        <Option value="Design">Design</Option>
                                        <Option value="Marketing">Marketing</Option>
                                        <Option value="Sales">Sales</Option>
                                        <Option value="Product">Product</Option>
                                        <Option value="Operations">Operations</Option>
                                        <Option value="Finance">Finance</Option>
                                        <Option value="HR">HR</Option>
                                        <Option value="Data Science">Data Science</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item
                                    label="Employment Type"
                                    name="employmentType"
                                    rules={[{ required: true, message: "Please select employment type" }]}
                                >
                                    <Select placeholder="Select employment type">
                                        <Option value="Full-time">Full-time</Option>
                                        <Option value="Part-time">Part-time</Option>
                                        <Option value="Contract">Contract</Option>
                                        <Option value="Temporary">Temporary</Option>
                                        <Option value="Internship">Internship</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item
                                    label="Location"
                                    name="location"
                                    rules={[{ required: true, message: "Please enter job location" }]}
                                >
                                    <Input placeholder="e.g. San Francisco, CA or Remote" />
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item
                                    label="Salary Range"
                                    name="salary"
                                    rules={[{ required: true, message: "Please enter salary range" }]}
                                >
                                    <Input placeholder="e.g. $100,000 - $130,000" />
                                </Form.Item>
                            </div>

                            <div className="col-md-6">
                                <Form.Item
                                    label="Skills"
                                    name="skills"
                                    rules={[{ required: true, message: "Please enter required skills" }]}
                                >
                                    <Select mode="tags" placeholder="Add skills">
                                        <Option value="React">React</Option>
                                        <Option value="Node.js">Node.js</Option>
                                        <Option value="JavaScript">JavaScript</Option>
                                        <Option value="TypeScript">TypeScript</Option>
                                        <Option value="Python">Python</Option>
                                        <Option value="Java">Java</Option>
                                        <Option value="AWS">AWS</Option>
                                        <Option value="Docker">Docker</Option>
                                        <Option value="Kubernetes">Kubernetes</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="col-12">
                                <Form.Item
                                    label="Job Description"
                                    name="description"
                                    rules={[{ required: true, message: "Please enter job description" }]}
                                >
                                    <TextArea rows={4} placeholder="Describe the job role and responsibilities..." />
                                </Form.Item>
                            </div>

                            <div className="col-12">
                                <Form.Item
                                    label="Requirements"
                                    name="requirements"
                                    rules={[{ required: true, message: "Please enter job requirements" }]}
                                >
                                    <TextArea rows={4} placeholder="List the requirements for this position..." />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
                                {currentDraft ? "Save Changes" : "Create Draft"}
                            </Button>
                        </div>
                    </Form>
                </Modal>

                {/* Preview Modal */}
                <Modal
                    title="Job Post Preview"
                    open={previewModalVisible}
                    onCancel={() => setPreviewModalVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setPreviewModalVisible(false)}>
                            Close
                        </Button>,
                        <Button
                            key="edit"
                            onClick={() => {
                                setPreviewModalVisible(false)
                                handleEdit(currentDraft.id)
                            }}
                            icon={<FaEdit />}
                        >
                            Edit
                        </Button>,
                        <Button
                            key="publish"
                            type="primary"
                            onClick={() => {
                                setPreviewModalVisible(false)
                                handlePost(currentDraft.id)
                            }}
                            icon={<FaPaperPlane />}
                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                        >
                            Publish
                        </Button>,
                    ]}
                    width={700}
                >
                    {currentDraft && (
                        <div>
                            <div className="mb-4">
                                <h4>{currentDraft.title}</h4>
                                <div className="d-flex align-items-center text-muted">
                                    <span>{currentDraft.department}</span>
                                    <span className="mx-2">•</span>
                                    <span>{currentDraft.employmentType}</span>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <FaCalendarAlt className="me-2 text-muted" />
                                        <div>
                                            <div className="text-muted small">Last Edited</div>
                                            <div>{formatDate(currentDraft.lastEdited)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <FaMapMarkerAlt className="me-2 text-muted" />
                                        <div>
                                            <div className="text-muted small">Location</div>
                                            <div>{currentDraft.location}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <div className="d-flex align-items-center">
                                        <FaDollarSign className="me-2 text-muted" />
                                        <div>
                                            <div className="text-muted small">Salary Range</div>
                                            <div>{currentDraft.salary}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold">Required Skills</h6>
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {currentDraft.skills.map((skill, index) => (
                                        <Tag key={index} color="#428A9B">
                                            {skill}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold">Description</h6>
                                <p>{currentDraft.description}</p>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold">Requirements</h6>
                                <pre
                                    style={{
                                        fontFamily: "inherit",
                                        whiteSpace: "pre-line",
                                        margin: 0,
                                    }}
                                >
                                    {currentDraft.requirements}
                                </pre>
                            </div>

                            <div className="alert alert-warning">
                                <div className="d-flex align-items-center">
                                    <FaEdit className="me-2" />
                                    <div>
                                        <strong>Draft Status</strong>
                                        <p className="mb-0 small">
                                            This job post is currently in draft mode and not visible to job seekers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default DraftJobPostList
