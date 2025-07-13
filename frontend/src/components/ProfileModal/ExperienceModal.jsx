import React from "react";
import { useState } from "react";
import { Edit, Trash, ChevronLeft, Plus } from "lucide-react";
import { CustomModal } from "../Modal/CustomModal";
import styles from "../../pages/userProfile/style/UserProfile.module.css";

const formatDate = (dateString) => {
    if (!dateString || dateString === "Now") return "Now";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}-${year}`;
};

export const ExperienceModal = ({ onClose, experiences, onSave }) => {
    const [workExperiences, setWorkExperiences] = useState([...experiences]);
    const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (validationErrors[name]) {
            const newErrors = { ...validationErrors };
            delete newErrors[name];
            setValidationErrors(newErrors);
        }
    };

    // Edit experience
    const editExperience = (experience) => {
        setEditingExperience(experience);
        setShowAddExperienceForm(true);
        setFormData({
            id: experience.id,
            jobPosition: experience.jobPosition,
            companyName: experience.companyName,
            startDate: experience.startDate,
            endDate: experience.endDate === "Now" ? "" : experience.endDate,
            jobDescription: experience.jobDescription,
            isCurrentPosition: experience.endDate === "Now",
            projects: experience.projects || [],
        });
    };

    // Save experience
    const saveExperience = () => {
        const errors = {};
        if (!formData.jobPosition) errors.jobPosition = "Job position is required";
        if (!formData.companyName) errors.companyName = "Company name is required";
        if (!formData.startDate) errors.startDate = "Start date is required";
        if (!formData.isCurrentPosition && !formData.endDate) errors.endDate = "End date is required";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const updatedExperiences = [...workExperiences];
        const experienceData = {
            ...formData,
            endDate: formData.isCurrentPosition ? "Now" : formData.endDate,
            projects: editingExperience ? editingExperience.projects : formData.projects || [],
        };

        if (editingExperience) {
            const index = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id);
            if (index !== -1) {
                updatedExperiences[index] = experienceData;
            }
        } else {
            experienceData.id = Date.now();
            experienceData.projects = formData.projects || [];
            updatedExperiences.push(experienceData);
        }

        setWorkExperiences(updatedExperiences);
        setShowAddExperienceForm(false);
        setEditingExperience(null);
        setFormData({});
        setValidationErrors({});
    };

    // Edit project
    const editProject = (project) => {
        setEditingProject(project);
        setFormData({
            ...formData,
            projectForm: true,
            projectName: project.projectName,
            projectTime: project.projectTime,
            projectDescription: project.projectDescription,
        });
    };

    // Save project
    const saveProject = () => {
        const errors = {};
        if (!formData.projectName) errors.projectName = "Project name is required";
        if (!formData.projectTime) errors.projectTime = "Project time is required";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const newProject = {
            id: editingProject ? editingProject.id : Date.now(),
            projectName: formData.projectName,
            projectTime: formData.projectTime,
            projectDescription: formData.projectDescription || "",
        };

        if (editingExperience) {
            const updatedExperiences = [...workExperiences];
            const expIndex = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id);
            if (expIndex !== -1) {
                const currentProjects = updatedExperiences[expIndex].projects || [];
                let newProjects;
                if (editingProject) {
                    newProjects = currentProjects.map((p) => (p.id === editingProject.id ? newProject : p));
                } else {
                    newProjects = [...currentProjects, newProject];
                }
                updatedExperiences[expIndex] = {
                    ...updatedExperiences[expIndex],
                    projects: newProjects,
                };
                setWorkExperiences(updatedExperiences);
                setEditingExperience(updatedExperiences[expIndex]);
            }
        } else {
            let updatedProjects;
            if (editingProject) {
                updatedProjects = (formData.projects || []).map((p) => (p.id === editingProject.id ? newProject : p));
            } else {
                updatedProjects = [...(formData.projects || []), newProject];
            }
            setFormData((prev) => ({
                ...prev,
                projects: updatedProjects,
            }));
        }

        setEditingProject(null);
        setFormData((prev) => ({ ...prev, projectForm: false }));
        setValidationErrors({});
    };

    // Delete project
    const deleteProject = (projectId) => {
        if (editingExperience) {
            const updatedExperiences = [...workExperiences];
            const expIndex = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id);
            if (expIndex !== -1) {
                updatedExperiences[expIndex].projects = updatedExperiences[expIndex].projects.filter((p) => p.id !== projectId);
                setWorkExperiences(updatedExperiences);
                setEditingExperience(updatedExperiences[expIndex]);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                projects: (prev.projects || []).filter((p) => p.id !== projectId),
            }));
        }
    };

    // Handle final save
    const handleSave = () => {
        const transformedExperiences = workExperiences.map((exp) => ({
            ...exp,
            endDate: exp.endDate === "Now" ? null : exp.endDate,
            projects: (exp.projects || []).map(({ id, ...rest }) => rest),
        }));

        onSave(transformedExperiences);
    };

    return (
        <CustomModal
            title={
                showAddExperienceForm ? (
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-sm btn-link text-white p-0 me-2"
                            onClick={() => {
                                setShowAddExperienceForm(false);
                                setEditingExperience(null);
                                setFormData({});
                                setValidationErrors({});
                            }}
                            aria-label="Back"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {editingExperience
                            ? `Edit: ${editingExperience.jobPosition} at ${editingExperience.companyName}`
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
                                        {experience.jobPosition} at {experience.companyName}
                                    </div>
                                    <div className="small">
                                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
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
                                                <div className="small">{project.projectName}</div>
                                                <div className="small text-muted ms-auto">{project.projectTime}</div>
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
                                setShowAddExperienceForm(true);
                                setFormData({ projects: [] });
                                setValidationErrors({});
                            }}
                        >
                            Add new position
                        </button>
                    </div>
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
                            className={`form-control ${validationErrors.jobPosition ? "is-invalid" : ""} ${styles.formControl}`}
                            id="jobPosition"
                            name="jobPosition"
                            value={formData.jobPosition || ""}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.jobPosition && <div className={styles.validationError}>{validationErrors.jobPosition}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">
                            Company <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.company ? "is-invalid" : ""} ${styles.formControl}`}
                            id="companyName"
                            name="companyName"
                            value={formData.companyName || ""}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.companyName && <div className={styles.validationError}>{validationErrors.companyName}</div>}
                    </div>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="currentPosition"
                            checked={formData.isCurrentPosition || false}
                            onChange={(e) => {
                                setFormData({ ...formData, isCurrentPosition: e.target.checked, endDate: e.target.checked ? "" : formData.endDate });
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
                                    type="date"
                                    className={`form-control ${validationErrors.startDate ? "is-invalid" : ""} ${styles.formControl}`}
                                    id="fromDate"
                                    name="startDate"
                                    placeholder="MM-YYYY"
                                    value={formData.startDate || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {validationErrors.startDate && <div className={styles.validationError}>{validationErrors.startDate}</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="toDate" className="form-label">
                                To <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="date"
                                    className={`form-control ${validationErrors.endDate ? "is-invalid" : ""} ${styles.formControl}`}
                                    id="toDate"
                                    name="endDate"
                                    placeholder="MM-YYYY"
                                    value={formData.endDate || ""}
                                    onChange={handleInputChange}
                                    disabled={formData.isCurrentPosition}
                                    required={!formData.isCurrentPosition}
                                />
                            </div>
                            {validationErrors.endDate && <div className={styles.validationError}>{validationErrors.endDate}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="jobDescription" className="form-label">
                            Description
                        </label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            id="jobDescription"
                            name="jobDescription"
                            rows="3"
                            value={formData.jobDescription || ""}
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
                        {(editingExperience ? editingExperience.projects : formData.projects) &&
                            (editingExperience ? editingExperience.projects : formData.projects).length > 0 && (
                                <div className="mb-3">
                                    {(editingExperience ? editingExperience.projects : formData.projects).map((project) => (
                                        <div key={project.id} className="d-flex align-items-center mb-2 p-2 bg-light rounded">
                                            <div className="me-auto">
                                                <div className="small">{project.projectName}</div>
                                                <div className="small text-muted">{project.projectTime}</div>
                                            </div>
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-link text-muted p-0 me-2"
                                                    onClick={() => editProject(project)}
                                                    aria-label="Edit project"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-link text-muted p-0"
                                                    onClick={() => deleteProject(project.id)}
                                                    aria-label="Delete project"
                                                >
                                                    <Trash size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        {formData.projectForm && (
                            <div className="border p-3 rounded mt-3 mb-3 bg-white">
                                <div className="mb-3">
                                    <label htmlFor="projectName" className="form-label">
                                        Project Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.projectName ? "is-invalid" : ""} ${styles.formControl}`}
                                        id="projectName"
                                        name="projectName"
                                        value={formData.projectName || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.projectName && <div className={styles.validationError}>{validationErrors.projectName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="projectTime" className="form-label">
                                        Project Time <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${validationErrors.projectTime ? "is-invalid" : ""} ${styles.formControl}`}
                                        id="projectTime"
                                        name="projectTime"
                                        placeholder="MM-DD - MM-DD"
                                        value={formData.projectTime || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {validationErrors.projectTime && <div className={styles.validationError}>{validationErrors.projectTime}</div>}
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
                                            setFormData({ ...formData, projectForm: false });
                                            setValidationErrors({});
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
                        {!formData.projectForm && (
                            <button
                                className="btn btn-outline-secondary btn-sm d-flex align-items-center mx-auto"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        projectForm: true,
                                        projectName: "",
                                        projectTime: "",
                                        projectDescription: "",
                                    });
                                    setEditingProject(null);
                                    setValidationErrors({});
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
                                setShowAddExperienceForm(false);
                                setEditingExperience(null);
                                setFormData({});
                                setValidationErrors({});
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
    );
};