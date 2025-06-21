import React from "react"
import { useState } from "react"
import { CustomModal } from "../Modal/CustomModal"
import styles from "../../pages/userProfile/style/UserProfile.module.css"

export const SummaryModal = ({ onClose, summary, onSave }) => {
    const [formData, setFormData] = useState({ summary: summary || "" })
    const [isValid, setIsValid] = useState(true)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setIsValid(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.summary.trim()) {
            setIsValid(false)
            return
        }

        setShowSuccess(true)

        // Show success message briefly before closing
        setTimeout(() => {
            onSave(formData.summary)
        }, 1000)
    }

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
                    {!isValid && <div className={styles.validationError}>Please provide a summary.</div>}
                </div>

                {showSuccess && (
                    <div className={`alert alert-success ${styles.alert}`} role="alert">
                        Summary updated successfully!
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
