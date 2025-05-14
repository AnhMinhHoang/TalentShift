import React from "react"
import { useState } from "react"
import { Edit, Trash, ChevronLeft, Calendar, Plus } from "lucide-react"
import { CustomModal } from "../Modal/CustomModal"
import styles from "../../pages/userProfile/style/UserProfile.module.css"

export const ExperienceModal = ({ onClose, experiences, onSave }) => {
    const [workExperiences, setWorkExperiences] = useState([...experiences])
    const [showAddExperienceForm, setShowAddExperienceForm] = useState(false)
    const [editingExperience, setEditingExperience] = useState(null)
    const [editingProject, setEditingProject] = useState(null)
    const [formData, setFormData] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Clear validation error for this field
        if (validationErrors[name]) {
            const newErrors = { ...validationErrors }
            delete newErrors[name]
            setValidationErrors(newErrors)
        }
    }

    // Edit experience
    const editExperience = (experience) => {
        setEditingExperience(experience)
        setShowAddExperienceForm(true)
        setFormData({
            id: experience.id,
            position: experience.position,
            company: experience.company,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
            isCurrentPosition: experience.endDate === "Now",
        })
    }

    // Save experience
    const saveExperience = () => {
        // Validate required fields
        const errors = {}
        if (!formData.position) errors.position = "Job position is required"
        if (!formData.company) errors.company = "Company name is required"
        if (!formData.startDate) errors.startDate = "Start date is required"
        if (!formData.isCurrentPosition && !formData.endDate) errors.endDate = "End date is required"

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        const updatedExperiences = [...workExperiences]
        const experienceData = {
            ...formData,
            endDate: formData.isCurrentPosition ? "Now" : formData.endDate,
            projects: editingExperience ? editingExperience.projects : formData.projects || [],
        }

        if (editingExperience) {
            const index = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id)
            if (index !== -1) {
                updatedExperiences[index] = experienceData
            }
        } else {
            experienceData.id = Date.now()
            experienceData.projects = formData.projects || []
            updatedExperiences.push(experienceData)
        }

        setWorkExperiences(updatedExperiences)
        setShowAddExperienceForm(false)
        setEditingExperience(null)
        setFormData({})
        setValidationErrors({})
    }

    // Delete experience
    const deleteExperience = (id) => {
        const updatedExperiences = workExperiences.filter((exp) => exp.id !== id)
        setWorkExperiences(updatedExperiences)
    }

    // Edit project
    const editProject = (experience, project) => {
        setEditingExperience(experience)
        setEditingProject(project)
        setFormData({
            ...formData,
            projectForm: true,
            id: project.id,
            name: project.name,
            projectPosition: project.position,
            time: project.time,
            projectDescription: project.description,
        })
    }

    // Save project
    const saveProject = () => {
        // Validate required fields
        const errors = {}
        if (!formData.name) errors.name = "Project name is required"
        if (!formData.time) errors.time = "Project time is required"

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        const newProject = {
            id: editingProject ? editingProject.id : Date.now(),
            name: formData.name,
            position: formData.projectPosition || "",
            time: formData.time,
            description: formData.projectDescription || "",
        }

        const updatedExperiences = [...workExperiences]
        const expIndex = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id)

        if (expIndex !== -1) {
            if (editingProject) {
                const projIndex = updatedExperiences[expIndex].projects.findIndex((p) => p.id === editingProject.id)
                if (projIndex !== -1) {
                    updatedExperiences[expIndex].projects[projIndex] = newProject
                }
            } else {
                updatedExperiences[expIndex].projects.push(newProject)
            }
            setWorkExperiences(updatedExperiences)
        }

        setEditingProject(null)
        setFormData({ ...formData, projectForm: false })
        setValidationErrors({})
    }

    // Delete project
    const deleteProject = (experienceId, projectId) => {
        const updatedExperiences = [...workExperiences]
        const expIndex = updatedExperiences.findIndex((exp) => exp.id === experienceId)

        if (expIndex !== -1) {
            updatedExperiences[expIndex].projects = updatedExperiences[expIndex].projects.filter((p) => p.id !== projectId)
            setWorkExperiences(updatedExperiences)
        }
    }

    // Handle final save
    const handleSave = () => {
        setShowSuccess(true)

        // Show success message briefly before closing
        setTimeout(() => {
            onSave(workExperiences)
        }, 1000)
    }

    return (
        <CustomModal
            title={
                showAddExperienceForm ? (
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-sm btn-link text-white p-0 me-2"
                            onClick={() => {
                                setShowAddExperienceForm(false)
                                setEditingExperience(null)
                                setFormData({})
                                setValidationErrors({})
                            }}
                            aria-label="Back"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {editingExperience
                            ? `Edit: ${editingExperience.position} at ${editingExperience.company}`
                            : "Add Experience"}
                    </div>
                ) : (
                    "Work Experience"
                )
            }
            onClose={onClose}
        >
            {!showAddExperienceForm ? (
                <>
                    {workExperiences.map((experience) => (
                        <div key={experience.id} className="mb-3 p-3 bg-light rounded position-relative">
                            <div className="d-flex align-items-start">
                                <div className="me-auto">
                                    <div className="text-primary small">
                                        {experience.position} at {experience.company}
                                    </div>
                                    <div className="small">
                                        {experience.startDate} - {experience.endDate}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                        onClick={() => editExperience(experience)}
                                        aria-label="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0"
                                        onClick={() => deleteExperience(experience.id)}
                                        aria-label="Delete"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>

                            {experience.projects && experience.projects.length > 0 && (
                                <div className="mt-2">
                                    {experience.projects.map((project) => (
                                        <div key={project.id} className="d-flex align-items-center mt-2 ps-3 border-start">
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <div className="small">{project.name}</div>
                                                <div className="small text-muted ms-auto">{project.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="text-center mt-3">
                        <button
                            className={`btn ${styles.primaryBtn}`}
                            onClick={() => {
                                setShowAddExperienceForm(true)
                                setFormData({})
                                setValidationErrors({})
                            }}
                        >
                            Add new position
                        </button>
                    </div>

                    {showSuccess && (
                        <div className={`alert alert-success ${styles.alert} mt-3`} role="alert">
                            Work experience updated successfully!
                        </div>
                    )}

                    <div className="text-end mt-3">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" className={`btn ${styles.primaryBtn}`} onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <div className="mb-3">
                        <label htmlFor="jobPosition" className="form-label">
                            Job Position <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.position ? "is-invalid" : ""} ${styles.formControl}`}
                            id="jobPosition"
                            name="position"
                            value={formData.position || ""}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.position && <div className={styles.validationError}>{validationErrors.position}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">
                            Company <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.company ? "is-invalid" : ""} ${styles.formControl}`}
                            id="company"
                            name="company"
                            value={formData.company || ""}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.company && <div className={styles.validationError}>{validationErrors.company}</div>}
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="currentPosition"
                            checked={formData.isCurrentPosition || false}
                            onChange={(e) => {
                                setFormData({ ...formData, isCurrentPosition: e.target.checked })
                            }}
                        />
                        <label className="form-check-label" htmlFor="currentPosition">
                            I am working in this position
                        </label>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="fromDate" className="form-label">
                                From <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.startDate ? "is-invalid" : ""} ${styles.formControl}`}
                                    id="fromDate"
                                    name="startDate"
                                    placeholder="MM-YYYY"
                                    value={formData.startDate || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="input-group-text">
                                    <Calendar size={16} />
                                </span>
                            </div>
                            {validationErrors.startDate && <div className={styles.validationError}>{validationErrors.startDate}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="toDate" className="form-label">
                                To <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className={`form-control ${validationErrors.endDate ? "is-invalid" : ""} ${styles.formControl}`}
                                    id="toDate"
                                    name="endDate"
                                    placeholder="MM-YYYY"
                                    value={formData.endDate || ""}
                                    onChange={handleInputChange}
                                    disabled={formData.isCurrentPosition}
                                    required={!formData.isCurrentPosition}
                                />
                                <span className="input-group-text">
                                    <Calendar size={16} />
                                </span>
                            </div>
                            {validationErrors.endDate && <div className={styles.validationError}>{validationErrors.endDate}</div>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="form-text text-end">65 words max</div>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="form-label mb-0">Project(s) in this position</label>
                            <small className="text-muted">
                                Keep private. If left blank, this section will not appear on your profile
                            </small>
                        </div>

                        {/* List of projects */}
                        {editingExperience && editingExperience.projects && editingExperience.projects.length > 0 && (
                            <div className="mb-3">
                                {editingExperience.projects.map((project) => (
                                    <div key={project.id} className="d-flex align-items-center mb-2 p-2 bg-light rounded">
                                        <div className="me-auto">
                                            <div className="small">{project.name}</div>
                                            <div className="small text-muted">{project.time}</div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-sm btn-link text-muted p-0 me-2"
                                                onClick={() => editProject(editingExperience, project)}
                                                aria-label="Edit project"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-link text-muted p-0"
                                                onClick={() => deleteProject(editingExperience.id, project.id)}
                                                aria-label="Delete project"
                                            >
                                                <Trash size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Project Form */}
                        {formData.projectForm && (
                            <div className="border p-3 rounded mt-3 mb-3 bg-white">
                                <div className="mb-3">
                                    <label htmlFor="projectName" className="form-label">
                                        Project Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.name ? "is-invalid" : ""} ${styles.formControl}`}
                                        id="projectName"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.name && <div className={styles.validationError}>{validationErrors.name}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="projectTime" className="form-label">
                                        Project Time <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.time ? "is-invalid" : ""} ${styles.formControl}`}
                                        id="projectTime"
                                        name="time"
                                        placeholder="MM-DD - MM-DD"
                                        value={formData.time || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.time && <div className={styles.validationError}>{validationErrors.time}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="projectDescription" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className={`form-control ${styles.formControl}`}
                                        id="projectDescription"
                                        name="projectDescription"
                                        rows="3"
                                        value={formData.projectDescription || ""}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setFormData({ ...formData, projectForm: false })
                                            setValidationErrors({})
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button className={`btn ${styles.primaryBtn}`} onClick={saveProject}>
                                        Save Project
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Add Project button */}
                        {!formData.projectForm && (
                            <button
                                className="btn btn-outline-secondary btn-sm d-flex align-items-center mx-auto"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        projectForm: true,
                                        name: "",
                                        projectPosition: "",
                                        time: "",
                                        projectDescription: "",
                                    })
                                    setEditingProject(null)
                                    setValidationErrors({})
                                }}
                            >
                                <Plus size={16} className="me-1" /> Add Project
                            </button>
                        )}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setShowAddExperienceForm(false)
                                setEditingExperience(null)
                                setFormData({})
                                setValidationErrors({})
                            }}
                        >
                            Cancel
                        </button>
                        <button className={`btn ${styles.primaryBtn}`} onClick={saveExperience}>
                            Save Position
                        </button>
                    </div>
                </div>
            )}
        </CustomModal>
    )
}
