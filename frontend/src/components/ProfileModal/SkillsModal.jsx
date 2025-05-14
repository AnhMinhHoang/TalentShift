import React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { CustomModal } from "../Modal/CustomModal"
import styles from "../../pages/userProfile/style/UserProfile.module.css"

export const SkillsModal = ({ onClose, mainSkills, otherSkills, onSave }) => {
    const [formData, setFormData] = useState({
        mainSkills: [...mainSkills],
        otherSkills: [...otherSkills],
        newMainSkill: "",
        newOtherSkill: "",
    })
    const [showSuccess, setShowSuccess] = useState(false)

    const addSkill = (type) => {
        const skillField = type === "main" ? "newMainSkill" : "newOtherSkill"
        const skillsArray = type === "main" ? "mainSkills" : "otherSkills"

        if (!formData[skillField].trim()) return

        setFormData({
            ...formData,
            [skillsArray]: [...formData[skillsArray], formData[skillField]],
            [skillField]: "",
        })
    }

    const removeSkill = (type, index) => {
        const skillsArray = type === "main" ? "mainSkills" : "otherSkills"
        const updatedSkills = [...formData[skillsArray]]
        updatedSkills.splice(index, 1)

        setFormData({
            ...formData,
            [skillsArray]: updatedSkills,
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowSuccess(true)

        // Show success message briefly before closing
        setTimeout(() => {
            onSave(formData.mainSkills, formData.otherSkills)
        }, 1000)
    }

    return (
        <CustomModal title="Skills" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label">Provide skills information</label>

                    <div className="mb-3">
                        <h6 className="mb-2">Main Skills</h6>
                        <div className="d-flex flex-wrap gap-2 p-2 border rounded mb-2">
                            {formData.mainSkills.map((skill, index) => (
                                <div key={index} className="badge bg-light text-dark d-flex align-items-center">
                                    {skill}
                                    <button
                                        type="button"
                                        className="btn btn-sm p-0 ms-1"
                                        onClick={() => removeSkill("main", index)}
                                        aria-label={`Remove ${skill}`}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${styles.formControl}`}
                                placeholder="Add skill..."
                                name="newMainSkill"
                                value={formData.newMainSkill}
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={() => addSkill("main")}>
                                Add
                            </button>
                        </div>
                    </div>

                    <div>
                        <h6 className="mb-2">Other Skills</h6>
                        <div className="d-flex flex-wrap gap-2 p-2 border rounded mb-2">
                            {formData.otherSkills.map((skill, index) => (
                                <div key={index} className="badge bg-light text-dark d-flex align-items-center">
                                    {skill}
                                    <button
                                        type="button"
                                        className="btn btn-sm p-0 ms-1"
                                        onClick={() => removeSkill("other", index)}
                                        aria-label={`Remove ${skill}`}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${styles.formControl}`}
                                placeholder="Add skill..."
                                name="newOtherSkill"
                                value={formData.newOtherSkill}
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-outline-secondary" type="button" onClick={() => addSkill("other")}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {showSuccess && (
                    <div className={`alert alert-success ${styles.alert}`} role="alert">
                        Skills updated successfully!
                    </div>
                )}

                <div className="text-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={`btn ${styles.primaryBtn}`}>
                        Save
                    </button>
                </div>
            </form>
        </CustomModal>
    )
}
