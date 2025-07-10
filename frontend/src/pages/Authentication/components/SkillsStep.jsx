import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Autocomplete, TextField, Chip } from "@mui/material";
import styles from "../styles/RegisterAdditional.module.css"; // Adjust path as needed
import skillsData from "../../../components/JSON/skillsData.json"; // Adjust path as needed
import { notification } from "antd";

// Flatten the skills data for Autocomplete options
const allMainSkills = Object.values(skillsData).flat();

const SkillsStep = ({
                        mainSkills,
                        setMainSkills,
                        additionalSkills,
                        setAdditionalSkills,
                    }) => {
    const [newAdditionalSkill, setNewAdditionalSkill] = useState("");

    // Add a new additional skill, preventing duplicates
    const handleAddAdditionalSkill = () => {
        const trimmedSkill = newAdditionalSkill.trim();
        if (!trimmedSkill) return;

        if (additionalSkills.includes(trimmedSkill)) {
            notification.warning({
                message: "Duplicate Skill",
                description: `${trimmedSkill} is already added.`,
                placement: "topRight",
                duration: 3,
            });
            return;
        }

        setAdditionalSkills([...additionalSkills, trimmedSkill]);
        setNewAdditionalSkill("");
    };

    // Remove an additional skill by index
    const handleRemoveAdditionalSkill = (index) => {
        const updatedSkills = additionalSkills.filter((_, i) => i !== index);
        setAdditionalSkills(updatedSkills);
    };

    // Handle main skills change, ensuring uniqueness
    const handleMainSkillsChange = (event, newValue) => {
        // Remove duplicates by converting to Set
        const uniqueSkills = [...new Set(newValue)];
        if (uniqueSkills.length < newValue.length) {
            notification.warning({
                message: "Duplicate Skill",
                description: "Duplicate main skills were removed.",
                placement: "topRight",
                duration: 3,
            });
        }
        setMainSkills(uniqueSkills);
    };

    return (
        <div className={styles.stepContent}>
            <h4 className={styles.stepTitle}>
                <span className={styles.stepNumber}>01</span> Select Your Skills
            </h4>
            <p className={styles.stepDescription}>
                Choose your main skills and any additional skills you have to showcase
                your expertise.
            </p>

            <Form.Group className="mb-4">
                <Form.Label className={styles.formLabel}>
                    Main Skills <span className="text-danger">*</span>
                </Form.Label>
                <Autocomplete
                    multiple
                    options={allMainSkills}
                    value={mainSkills}
                    onChange={handleMainSkillsChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Select your main skills"
                        />
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={`main-${option}-${index}`} // Robust unique key
                                label={option}
                                {...getTagProps({ index })}
                                className={styles.skillChip}
                            />
                        ))
                    }
                />
                <small className="text-muted mt-2">
                    Select the skills you are most proficient in. At least one is required.
                </small>
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label className={styles.formLabel}>Additional Skills</Form.Label>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        value={newAdditionalSkill}
                        onChange={(e) => setNewAdditionalSkill(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddAdditionalSkill();
                            }
                        }}
                        placeholder="Type a skill and press Enter or click Add"
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleAddAdditionalSkill}
                    >
                        Add
                    </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                    {additionalSkills.map((skill, index) => (
                        <Chip
                            key={`additional-${skill}-${index}`} // Robust unique key
                            label={skill}
                            onDelete={() => handleRemoveAdditionalSkill(index)}
                            className={styles.skillChip}
                        />
                    ))}
                </div>
                <small className="text-muted mt-2">
                    Add any other skills you possess (optional).
                </small>
            </Form.Group>
        </div>
    );
};

export default SkillsStep;