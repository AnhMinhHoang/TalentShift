import React from "react"
import { useState } from "react"
import { Form, Input, Button, notification, Modal } from "antd"
import { FaEdit, FaSave, FaTimes } from "react-icons/fa"

const { TextArea } = Input

const GeneralInfoForm = ({ companyData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [form] = Form.useForm()

    // Validation regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const handleEdit = () => {
        form.setFieldsValue({
            email: companyData.email,
            phone: companyData.phone,
            description: companyData.description,
            newPassword: "",
            confirmPassword: "",
        })
        setIsEditing(true)
    }

    const handleCancel = () => {
        form.resetFields()
        setIsEditing(false)
    }

    const handleSubmit = (values) => {
        if (values.newPassword && values.newPassword !== values.confirmPassword) {
            notification.error({
                message: "Validation Error",
                description: "New password and confirm password do not match.",
            })
            return
        }

        onUpdate(values)
        setIsEditing(false)
        form.resetFields()
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <h5 className="mb-0">Company Information</h5>
                <Button
                    type="primary"
                    icon={<FaEdit />}
                    onClick={handleEdit}
                    style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                >
                    Edit
                </Button>
            </div>

            <div className="card-body">
                {/* Display Mode */}
                <div>
                    <div className="mb-4">
                        <h6 className="text-muted mb-2">Email Address</h6>
                        <p>{companyData.email}</p>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-muted mb-2">Contact Number</h6>
                        <p>{companyData.phone}</p>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-muted mb-2">Password</h6>
                        <p>••••••••</p>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-muted mb-2">Company Description</h6>
                        <p style={{ whiteSpace: "pre-line" }}>{companyData.description}</p>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                title="Edit Company Information"
                open={isEditing}
                onCancel={handleCancel}
                footer={null}
                centered
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        email: companyData.email,
                        phone: companyData.phone,
                        description: companyData.description,
                        newPassword: "",
                        confirmPassword: "",
                    }}
                >
                    {/* Email Field */}
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            {
                                pattern: emailRegex,
                                message: "Please enter a valid email address",
                            },
                        ]}
                    >
                        <Input placeholder="company@example.com" />
                    </Form.Item>

                    {/* Phone Field */}
                    <Form.Item
                        label="Contact Number"
                        name="phone"
                        rules={[
                            { required: true, message: "Please enter your contact number" },
                            {
                                pattern: phoneRegex,
                                message: "Please enter a valid phone number",
                            },
                        ]}
                    >
                        <Input placeholder="+1 234-567-890" />
                    </Form.Item>

                    {/* New Password Field */}
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                min: 8,
                                message: "Password must be at least 8 characters",
                            },
                            {
                                pattern: passwordRegex,
                                message: "Must contain uppercase, lowercase, number, and special character",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter new password (min 8 characters)" />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'))
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm new password" />
                    </Form.Item>

                    {/* Description Field */}
                    <Form.Item
                        label="Company Description"
                        name="description"
                        rules={[{ required: true, message: "Please enter company description" }]}
                    >
                        <TextArea rows={4} placeholder="Describe your company..." />
                    </Form.Item>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button onClick={handleCancel} icon={<FaTimes />}>
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<FaSave />}
                            style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default GeneralInfoForm