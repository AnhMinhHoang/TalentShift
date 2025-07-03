import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { CustomModal } from "../Modal/CustomModal";
import styles from "../../pages/userProfile/style/UserProfile.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

// Import the hardcoded skills
import skillsData from "../JSON/skillsData.json";

// Flatten the skills for the Autocomplete options
const allMainSkills = Object.values(skillsData).flat();

export const SkillsModal = ({ onClose, mainSkills, otherSkills, onSave }) => {
    const [formData, setFormData] = useState({
        mainSkills: [...mainSkills],
        otherSkills: [...otherSkills],
        newOtherSkill: "",
    });

    const addOtherSkill = () => {
        if (!formData.newOtherSkill.trim()) return;

        setFormData({
            ...formData,
            otherSkills: [...formData.otherSkills, formData.newOtherSkill],
            newOtherSkill: "",
        });
    };

    const removeOtherSkill = (index) => {
        const updatedOtherSkills = [...formData.otherSkills];
        updatedOtherSkills.splice(index, 1);

        setFormData({
            ...formData,
            otherSkills: updatedOtherSkills,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMainSkillsChange = (event, newValue) => {
        setFormData({
            ...formData,
            mainSkills: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData.mainSkills, formData.otherSkills);
    };

    return (
        <CustomModal title="Skills" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label">Provide skills information</label>

                    <div className="mb-3">
                        <h6 className="mb-2">Main Skills</h6>
                        <Autocomplete
                            multiple
                            id="main-skills"
                            options={allMainSkills}
                            value={formData.mainSkills}
                            onChange={handleMainSkillsChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Select main skills..."
                                />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                        onDelete={() => {
                                            const newSkills = [...formData.mainSkills];
                                            newSkills.splice(index, 1);
                                            setFormData({ ...formData, mainSkills: newSkills });
                                        }}
                                    />
                                ))
                            }
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div>
                        <h6 className="mb-2">Other Skills</h6>
                        <div className="d-flex flex-wrap gap-2 p-2 border rounded mb-2">
                            {formData.otherSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="badge bg-light text-dark d-flex align-items-center"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        className="btn btn-sm p-0 ms-1"
                                        onClick={() => removeOtherSkill(index)}
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
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={addOtherSkill}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-end">
                    <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button type="submit" className={`btn ${styles.primaryBtn}`}>
                        Save
                    </button>
                </div>
            </form>
        </CustomModal>
    );
};