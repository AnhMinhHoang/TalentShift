import React from "react";
import { useState } from "react";
import { CustomModal } from "../Modal/CustomModal";
import styles from "../../pages/userProfile/style/UserProfile.module.css";
import { Check as CheckIcon, Warning as WarningIcon } from "@mui/icons-material";

export const SummaryModal = ({ onClose, summary, onSave }) => {
    // Initialize char count excluding newlines
    const initialCharCount = summary ? summary.replace(/\n/g, "").length : 0;
    const [formData, setFormData] = useState({ summary: summary || "" });
    const [isValid, setIsValid] = useState(initialCharCount >= 100);
    const [charCount, setCharCount] = useState(initialCharCount);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Count characters excluding newlines
        const count = value.replace(/\n/g, "").length;
        setCharCount(count);
        setIsValid(count >= 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (charCount < 100) {
            setIsValid(false);
            return;
        }
        onSave(formData.summary);
    };

    return (
        <CustomModal title="Summary" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="summary" className="form-label">
                        Provide detail information
                    </label>
                    <textarea
                        className={`form-control ${!isValid ? "is-invalid" : ""} ${styles.formControl}`}
                        id="summary"
                        name="summary"
                        rows="5"
                        value={formData.summary}
                        onChange={handleInputChange}
                        placeholder="Fill the blank..."
                    ></textarea>

                    <div>
                        {charCount < 100 ? (
                            <WarningIcon fontSize="small" className="me-1" />
                        ) : (
                            <CheckIcon fontSize="small" className="me-1" />
                        )}
                        {charCount}/100 characters{" "}
                        {charCount < 100
                            ? `(${100 - charCount} more needed)`
                            : "(minimum reached)"}
                    </div>

                    {!isValid && charCount > 0 && (
                        <div className={styles.validationError}>
                            <WarningIcon fontSize="small" className="me-2" />
                            Please write at least 100 characters (excluding newlines) to provide sufficient information.
                        </div>
                    )}
                </div>

                <div className="text-end">
                    <button type="button"
                            className="btn btn-secondary me-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit"
                            disabled={!isValid}
                            className={`btn ${styles.primaryBtn}`}>
                        Save
                    </button>
                </div>
            </form>
        </CustomModal>
    );
};