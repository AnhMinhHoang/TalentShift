import React from "react"
import { useState } from "react"
import { Card, Button, notification, Popconfirm, Form, Input, Modal } from "antd"
import { FaEdit, FaTrash, FaPaperPlane } from "react-icons/fa"

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
        },
    ])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [selectedDraft, setSelectedDraft] = useState(null)
    const [form] = Form.useForm()

    const handleDelete = (id) => {
        setDraftPosts(draftPosts.filter((post) => post.id !== id))
        notification.success({
            message: "Draft Deleted",
            description: "The draft job post has been successfully deleted.",
        })
    }

    const handlePost = (id) => {
        // In a real application, this would send the post to the server
        // and move it from drafts to active posts
        setDraftPosts(draftPosts.filter((post) => post.id !== id))
        notification.success({
            message: "Job Posted",
            description: "Your job post has been successfully published.",
        })
    }

    const handleEdit = (post) => {
        setSelectedDraft(post)
        form.setFieldsValue({
            ...post,
            requirements: post.requirements.split('\n').map(line => line.replace('- ', '')).join('\n')
        })
        setEditModalVisible(true)
    }

    const handleSave = async () => {
        try {
            const values = await form.validateFields()
            const updatedDraft = {
                ...selectedDraft,
                ...values,
                requirements: values.requirements.split('\n').map(line => `- ${line}`).join('\n'),
                lastEdited: new Date().toISOString().split('T')[0]
            }

            setDraftPosts(draftPosts.map(post =>
                post.id === updatedDraft.id ? updatedDraft : post
            ))

            notification.success({
                message: "Draft Updated",
                description: "Your changes have been saved successfully.",
            })
            setEditModalVisible(false)
        } catch (error) {
            console.error("Validation failed:", error)
        }
    }

    // Add the Edit Modal component
    const EditModal = () => (
        <Modal
            title={<span style={{ fontSize: "1.25rem", fontWeight: 600 }}>Edit Draft Post</span>}
            open={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            footer={[
                <Button key="cancel" onClick={() => setEditModalVisible(false)}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    onClick={handleSave}
                    style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                >
                    Save Changes
                </Button>,
            ]}
            width={800}
            centered
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="title"
                    label="Job Title"
                    rules={[{ required: true, message: 'Please enter a job title' }]}
                >
                    <Input placeholder="Enter job title" />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter a location' }]}
                >
                    <Input placeholder="Enter job location" />
                </Form.Item>

                <Form.Item
                    name="salary"
                    label="Salary Range"
                    rules={[{ required: true, message: 'Please enter a salary range' }]}
                >
                    <Input placeholder="Enter salary range" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Job Description"
                    rules={[{ required: true, message: 'Please enter a job description' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter detailed job description" />
                </Form.Item>

                <Form.Item
                    name="requirements"
                    label="Requirements (one per line)"
                    rules={[{ required: true, message: 'Please enter at least one requirement' }]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder={`Enter requirements (one per line):\nExample:\n3+ years experience\nProficient in JavaScript`}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h5 className="mb-0">Draft Job Posts</h5>
                <Button type="primary" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
                    Create New Draft
                </Button>
                {EditModal()}
            </div>
            <div className="card-body">
                {draftPosts.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted">No draft job posts available.</p>
                    </div>
                ) : (
                    <div className="row">
                        {draftPosts.map((post) => (
                            <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                                <Card
                                    title={post.title}
                                    extra={<span className="text-muted small">Last edited: {formatDate(post.lastEdited)}</span>}
                                    className="h-100"
                                >
                                    <p className="mb-3">{post.description.substring(0, 100)}...</p>
                                    <div className="d-flex justify-content-between mt-4">
                                        <Button icon={<FaEdit />} onClick={() => handleEdit(post)}>
                                            Edit
                                        </Button>
                                        <Popconfirm
                                            title="Delete this draft?"
                                            description="Are you sure you want to delete this draft job post?"
                                            onConfirm={() => handleDelete(post.id)}
                                            okText="Yes"
                                            cancelText="No"
                                            okButtonProps={{ style: { backgroundColor: "#dc3545", borderColor: "#dc3545" } }}
                                        >
                                            <Button danger icon={<FaTrash />}>
                                                Delete
                                            </Button>
                                        </Popconfirm>
                                        <Button
                                            type="primary"
                                            icon={<FaPaperPlane />}
                                            onClick={() => handlePost(post.id)}
                                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                                        >
                                            Post
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )


}

export default DraftJobPostList
