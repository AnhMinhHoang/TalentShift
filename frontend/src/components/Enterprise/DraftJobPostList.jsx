import React from "react"
import { useState, useEffect } from "react"
import { Card, Button, notification, Popconfirm, Tag, Tooltip, Modal, Form, Input, Select, Upload, Alert, Spin, DatePicker } from "antd"
import {
    FaEdit,
    FaTrash,
    FaPaperPlane,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaDollarSign,
    FaPlus,
    FaEye,
    FaClock,
    FaFileAlt,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { deleteJob, fetchDraftJobsByUser, fetchJobCategories, fetchSkills, publishDraftJob, updateJob } from "../../services/jobService"
import moment from "moment"
import { useAuth } from "../../pages/AuthContext.jsx";

const { TextArea } = Input
const { Option } = Select

const DraftJobPostList = () => {
    const [draftPosts, setDraftPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);
    const { userData } = useAuth();

    const userId = userData.userId;
    const loadCategories = async () => {
        try {
            const data = await fetchJobCategories();
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
            setSkillOptions(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const loadDrafts = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!userId) throw new Error('User ID not found');
            const drafts = await fetchDraftJobsByUser(userId);
            // Map API data to frontend structure with mock values for missing fields
            const mappedDrafts = drafts.map(draft => ({
                ...draft,
                title: draft.jobTitle || draft.title || "Untitled Job",
                salary: `${draft.minBudget} - ${draft.maxBudget}`,
                lastEdited: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
                skills: draft.skills || [],
                description: draft.projectDescription || "No description available",
            }));

            setDraftPosts(mappedDrafts);
        } catch (err) {
            setError(err.message || 'Failed to load draft jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
        loadDrafts();
        loadSkills();
    }, [userId]);


    const [editModalVisible, setEditModalVisible] = useState(false)
    const [previewModalVisible, setPreviewModalVisible] = useState(false)
    const [currentDraft, setCurrentDraft] = useState(null)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    if (loading) return <Spin tip="Loading draft jobs..." />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    const handleDelete = async (id) => {
        try {
            setDraftPosts(draftPosts.filter((post) => post.id !== id))
            await deleteJob(id); // call backend delete
            notification.success({
                message: "Draft Deleted",
                description: "The draft job post has been successfully deleted.",
                placement: "topRight",
            })
        } catch (error) {
            notification.error({
                message: "Delete Failed",
                description: error.message || "Failed to delete job post.",
                placement: "topRight",
            });
        }
    }

    const handlePost = (id) => {
        Modal.confirm({
            title: "Confirm Publish",
            content: "Are you sure you want to publish this job post? It will become visible to freelancers.",
            okText: "Yes, Publish",
            cancelText: "Cancel",
            onOk: async () => {
                try {
                    await publishDraftJob(id);

                    setDraftPosts(prevDrafts => prevDrafts.filter(post => post.id !== id));

                    notification.success({
                        message: "Job Posted",
                        description: "Your job post has been successfully published.",
                        placement: "topRight",
                    });
                } catch (error) {
                    notification.error({
                        message: "Publish Failed",
                        description: error.message || "Failed to publish job post.",
                        placement: "topRight",
                    });
                }
            },
        });
    };

    const handleEdit = (id) => {
        const draft = draftPosts.find((post) => post.id === id);
        setCurrentDraft(draft);

        // Use same structure as JobPostHistoryTable
        form.setFieldsValue({
            jobTitle: draft.jobTitle || draft.title,
            location: draft.location,
            minBudget: draft.minBudget,
            maxBudget: draft.maxBudget,
            paymentType: draft.paymentType,
            category: draft.category || draft.department,
            skills: draft.skills || [],
            idealSkills: draft.idealSkills || [],
            keyResponsibilities: draft.keyResponsibilities,
            projectDescription: draft.projectDescription || draft.description,
            expiredAt: draft.expiredAt ? moment(draft.expiredAt) : null
        });

        setEditModalVisible(true);
    };
    const handlePreview = (id) => {
        const draft = draftPosts.find((post) => post.id === id)
        setCurrentDraft(draft)
        setPreviewModalVisible(true)
    }

    const handleSaveDraft = async (values) => {
        try {
            const draftId = currentDraft.id;
            const keyResponsibilities = typeof values.keyResponsibilities === 'string'
                ? values.keyResponsibilities.split('\n').map(s => s.trim()).filter(Boolean)
                : values.keyResponsibilities || [];

            const jobData = {
                ...values,
                id: draftId,
                keyResponsibilities,
                expiredAt: values.expiredAt ? values.expiredAt.toISOString() : null,
            };

            const updated = await updateJob(draftId, jobData); // ✅ API call

            await loadDrafts();

            setEditModalVisible(false);
            notification.success({
                message: "Draft Updated",
                description: "Your draft job post has been successfully updated.",
                placement: "topRight",
            });
        } catch (error) {
            console.error("Error updating draft job:", error);
            notification.error({
                message: "Update Failed",
                description: error.message || "Failed to update draft job post.",
                placement: "topRight",
            });
        }
    };

    const handleCreateNew = () => {
        navigate("/job-posting")
    }


    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
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
                                        {post.location && (
                                            <div className="d-flex align-items-center text-muted mb-2 small">
                                                <FaMapMarkerAlt className="me-2" style={{ color: "#428A9B" }} />
                                                <span>{post.location}</span>
                                            </div>
                                        )}
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
                    title={"Edit Draft Job Post"}
                    open={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    footer={null}
                    width={800}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSaveDraft}
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
                                    label="Min Budget"
                                    name="minBudget"
                                    rules={[{ required: true, message: "Enter min budget" }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>
                            <div className="col-md-3">
                                <Form.Item
                                    label="Max Budget"
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
                                {currentDraft.location && (
                                    <div className="col-md-6 mb-2">
                                        <div className="d-flex align-items-center">
                                            <FaMapMarkerAlt className="me-2 text-muted" />
                                            <div>
                                                <div className="text-muted small">Location</div>
                                                <div>{currentDraft.location}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
        </div >
    )
}

export default DraftJobPostList