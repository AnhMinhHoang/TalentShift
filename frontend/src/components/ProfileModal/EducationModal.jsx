import React from "react";
import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import { CustomModal } from "../Modal/CustomModal";
import styles from "../../pages/userProfile/style/UserProfile.module.css";

const formatDate = (dateString) => {
    if (!dateString || dateString === "Now") return "Now";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}-${year}`;
};

export const EducationModal = ({ onClose, educations, onSave }) => {
    const [educationList, setEducationList] = useState([...educations]);
    const [showAddEducationForm, setShowAddEducationForm] = useState(false);
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

    // Edit education
    const editEducation = (education) => {
        setFormData({
            id: education.id,
            school: education.school,
            major: education.major,
            startDate: education.startDate,
            endDate: education.endDate === "Now" || education.endDate === null ? "" : education.endDate, // Handle null or "Now"
            isCurrentlyStudying: education.endDate === "Now" || education.endDate === null, // Set true for null or "Now"
            description: education.description,
        });
        setShowAddEducationForm(true);
    };

    // Save education
    const saveEducation = () => {
        const errors = {};
        if (!formData.school) errors.school = "School name is required";
        if (!formData.startDate) errors.startDate = "Start date is required";
        if (!formData.isCurrentlyStudying && !formData.endDate) errors.endDate = "End date is required";

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const updatedEducations = [...educationList];
        const educationData = {
            ...formData,
            endDate: formData.isCurrentlyStudying ? "Now" : formData.endDate, // Use "Now" for UI consistency
        };

        if (formData.id) {
            const index = updatedEducations.findIndex((edu) => edu.id === formData.id);
            if (index !== -1) {
                updatedEducations[index] = educationData;
            }
        } else {
            educationData.id = Date.now();
            updatedEducations.push(educationData);
        }

        setEducationList(updatedEducations);
        setFormData({});
        setShowAddEducationForm(false);
        setValidationErrors({});
    };

    // Delete education
    const deleteEducation = (id) => {
        const updatedEducations = educationList.filter((edu) => edu.id !== id);
        setEducationList(updatedEducations);
    };

    // Handle final save
    const handleSave = () => {
        // Transform "Now" to null for backend compatibility
        const transformedEducations = educationList.map((edu) => ({
            ...edu,
            endDate: edu.endDate === "Now" ? null : edu.endDate,
        }));
        onSave(transformedEducations);
    };

    return (
        <CustomModal title="Education" onClose={onClose}>
            {!showAddEducationForm ? (
                <>
                    {educationList.map((education) => (
                        <div key={education.id} className="mb-3 p-3 bg-light rounded position-relative">
                            <div className="d-flex align-items-start">
                                <div className="me-auto">
                                    <div className="fw-medium">{education.school}</div>
                                    <div className="small">{education.major}</div>
                                    <div className="small text-muted">
                                        {formatDate(education.startDate)} - {formatDate(education.endDate)}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                        onClick={() => editEducation(education)}
                                        aria-label="Edit education"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0"
                                        onClick={() => deleteEducation(education.id)}
                                        aria-label="Delete education"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-center mt-4">
                        <button
                            className={`btn ${styles.primaryBtn}`}
                            onClick={() => {
                                setFormData({});
                                setShowAddEducationForm(true);
                                setValidationErrors({});
                            }}
                        >
                            <Plus size={16} className="me-1" /> Add Education
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
                        <label htmlFor="schoolName" className="form-label">
                            School Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.school ? "is-invalid" : ""} ${styles.formControl}`}
                            id="schoolName"
                            name="school"
                            value={formData.school || ""}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.school && <div className={styles.validationError}>{validationErrors.school}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="major" className="form-label">
                            Major
                        </label>
                        <input
                            type="text"
                            className={`form-control ${styles.formControl}`}
                            id="major"
                            name="major"
                            placeholder="Add if you have"
                            value={formData.major || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="currentlyStudying"
                            checked={formData.isCurrentlyStudying || false}
                            onChange={(e) => {
                                setFormData({ ...formData, isCurrentlyStudying: e.target.checked, endDate: e.target.checked ? "" : formData.endDate });
                            }}
                        />
                        <label className="form-check-label" htmlFor="currentlyStudying">
                            I'm currently studying here
                        </label>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="startDate" className="form-label">
                                Start Date <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="date"
                                    className={`form-control ${validationErrors.startDate ? "is-invalid" : ""} ${styles.formControl}`}
                                    id="startDate"
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
                            <label htmlFor="endDate" className="form-label">
                                End Date <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="date"
                                    className={`form-control ${validationErrors.endDate ? "is-invalid" : ""} ${styles.formControl}`}
                                    id="endDate"
                                    name="endDate"
                                    placeholder="MM-YYYY"
                                    value={formData.endDate || ""}
                                    onChange={handleInputChange}
                                    disabled={formData.isCurrentlyStudying}
                                    required={!formData.isCurrentlyStudying}
                                />
                            </div>
                            {validationErrors.endDate && <div className={styles.validationError}>{validationErrors.endDate}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eduDescription" className="form-label">
                            Description
                        </label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            id="eduDescription"
                            name="description"
                            rows="3"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            placeholder="Description"
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setFormData({});
                                setShowAddEducationForm(false);
                                setValidationErrors({});
                            }}
                        >
                            Cancel
                        </button>
                        <button className={`btn ${styles.primaryBtn}`} onClick={saveEducation}>
                            Save Education
                        </button>
                    </div>
                </div>
            )}
        </CustomModal>
    );
};