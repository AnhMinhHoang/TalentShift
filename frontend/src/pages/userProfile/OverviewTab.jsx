import { useState } from "react"
import { X, Calendar, Plus, Edit, Trash, ChevronLeft } from "lucide-react"

const OverviewTab = ({ user, onBasicProfileUpdate, onFreelancerProfileUpdate, onHirerProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        // Basic profile
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        gender: user.gender || "",
        avatar: user.avatar || "",
        
        // Freelancer profile
        bio: user.bio || "",
        location: user.location || "",
        birthDate: user.birthDate || "",
        skills: user.skills || [],
        experiences: user.experiences || [],
        educations: user.educations || [],
        certificates: user.certificates || [],
        links: user.links || [],
        
        // Hirer profile
        companyName: user.companyName || "",
        description: user.description || "",
        contactLink: user.contactLink || "",
        logoPath: user.logoPath || "",
        registrationFilePath: user.registrationFilePath || "",
        verified: user.verified || false
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Update basic profile
        await onBasicProfileUpdate({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            gender: formData.gender,
            avatar: formData.avatar
        })

        // Update role-specific profile
        if (user.role === "FREELANCER") {
            await onFreelancerProfileUpdate({
                bio: formData.bio,
                location: formData.location,
                birthDate: formData.birthDate,
                skills: formData.skills,
                experiences: formData.experiences,
                educations: formData.educations,
                certificates: formData.certificates,
                links: formData.links
            })
        } else if (user.role === "HIRER") {
            await onHirerProfileUpdate({
                companyName: formData.companyName,
                description: formData.description,
                contactLink: formData.contactLink,
                logoPath: formData.logoPath,
                registrationFilePath: formData.registrationFilePath,
                verified: formData.verified
            })
        }

        setIsEditing(false)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Profile Overview</h4>
                        <button
                            className="btn"
                            style={{ backgroundColor: "#428A9B", color: "white" }}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                    </div>

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    {/* Basic Profile Fields */}
                    <div className="mb-4">
                        <h5>Basic Information</h5>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                                    name="firstName"
                                    value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Role-specific Fields */}
                    {user.role === "FREELANCER" && (
                        <div className="mb-4">
                            <h5>Freelancer Information</h5>
                    <div className="mb-3">
                                <label className="form-label">Bio</label>
                        <textarea
                            className="form-control"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                            rows="3"
                                />
                    </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Birth Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {user.role === "HIRER" && (
                        <div className="mb-4">
                            <h5>Company Information</h5>
                        <div className="mb-3">
                                <label className="form-label">Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                    name="companyName"
                                    value={formData.companyName}
                                onChange={handleInputChange}
                            />
                        </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                        className="form-control"
                                    name="description"
                                    value={formData.description}
                                        onChange={handleInputChange}
                                    rows="3"
                                    />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contact Link</label>
                                    <input
                                    type="url"
                                        className="form-control"
                                    name="contactLink"
                                    value={formData.contactLink}
                                        onChange={handleInputChange}
                                    />
                            </div>
                        </div>
                    )}

                    <div className="text-end">
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: "#428A9B", color: "white" }}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                                <div>
                    {/* Display current profile information */}
                    <div className="mb-4">
                        <h5>Basic Information</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Name:</strong> {`${user.firstName} ${user.lastName}`}</p>
                                <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Gender:</strong> {user.gender || "Not provided"}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                            </div>
                        </div>

                    {user.role === "FREELANCER" && (
                        <div className="mb-4">
                            <h5>Freelancer Information</h5>
                            <p><strong>Bio:</strong> {user.bio || "Not provided"}</p>
                            <p><strong>Location:</strong> {user.location || "Not provided"}</p>
                            <p><strong>Birth Date:</strong> {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "Not provided"}</p>
                        </div>
                    )}

                    {user.role === "HIRER" && (
                        <div className="mb-4">
                            <h5>Company Information</h5>
                            <p><strong>Company Name:</strong> {user.companyName || "Not provided"}</p>
                            <p><strong>Description:</strong> {user.description || "Not provided"}</p>
                            <p><strong>Contact Link:</strong> {user.contactLink || "Not provided"}</p>
                        </div>
                    )}
                    </div>
            )}
        </div>
    )
}

export default OverviewTab

