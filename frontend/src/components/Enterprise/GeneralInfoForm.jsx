import React from "react"
import { useState } from "react"
import { Form, Input, Button, notification, Modal } from "antd"
import { FaEdit, FaSave, FaTimes } from "react-icons/fa"
import api, { userAPI } from "../../services/api"

const { TextArea } = Input

const GeneralInfoForm = ({ companyData, onUpdate, fetchProfile }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [form] = Form.useForm()

    // Validation regex patterns
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const companyNameRegex = /^[a-zA-Z0-9\s]{3,50}$/

    const handleEdit = () => {
        form.setFieldsValue({
            name: companyData?.name,
            email: companyData?.email,
            phone: companyData?.phone,
            description: companyData?.description,
            newPassword: "",
            confirmPassword: "",
            location: companyData?.location,
            website: companyData?.website,

        })
        setIsEditing(true)
    }

    const handleCancel = () => {
        form.resetFields()
        setIsEditing(false)
    }

    const handleSubmit = async (values) => {
        if (values.newPassword && values.newPassword !== values.confirmPassword) {
            notification.error({
                message: "Validation Error",
                description: "New password and confirm password do not match.",
            });
            return;
        }

        try {
            const userId = localStorage.getItem("userId");
            const payload = {
                companyName: values.companyName,
                description: values.description,
                contactLink: values.website || "",
                phone: values.phone,
                location: values.location,
            };

            await userAPI.updateHirerProfileFromForm(userId, payload);
            console.log("Profile updated successfully:", payload);
            fetchProfile();
            notification.success({
                message: "Profile Updated",
                description: "Company information updated successfully.",
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Update error:", error);
            notification.error({
                message: "Update Failed",
                description: error.message || "Something went wrong.",
            });
        }
    };

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
                        companyName: companyData?.name,
                        email: companyData.email,
                        phone: companyData.phone,
                        description: companyData.description,
                        location: companyData.location,
                        website: companyData.website,
                    }}
                >
                    {/* Company Name Field */}
                    <Form.Item
                        label="Company Name"
                        name="companyName"
                        rules={[
                            { required: true, message: "Please enter your company name" },
                            {
                                pattern: companyNameRegex,
                                message: "Company name must be 3-50 characters long and can include letters, numbers, and spaces",
                            },
                        ]}
                    >
                        <Input placeholder="TechCorp Solutions" />
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
                    {/* Location Field */}
                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: "Please enter your company location" }]}
                    >
                        <Input placeholder="e.g. San Francisco, CA" />
                    </Form.Item>

                    {/* Website / Contact Link Field */}
                    <Form.Item
                        label="Company Website"
                        name="website"
                        rules={[
                            { required: true, message: "Please enter your company website" },
                            {
                                type: "url",
                                message: "Please enter a valid URL (e.g. https://example.com)",
                            },
                        ]}
                    >
                        <Input placeholder="https://yourcompany.com" />
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