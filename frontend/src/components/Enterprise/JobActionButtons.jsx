import React from "react"
import { useState } from "react"
import styles from "./JobActionButtons.module.css"

const JobActionButtons = ({ job, onClose, onDelete, onEdit, onViewApplicants }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true)
    }

    const handleConfirmDelete = () => {
        onDelete()
        setShowDeleteConfirm(false)
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false)
    }

    if (showDeleteConfirm) {
        return (
            <div className={styles.deleteConfirm}>
                <div className={styles.confirmText}>Delete this job?</div>
                <div className={styles.confirmActions}>
                    <button className={`btn btn-sm ${styles.confirmBtn}`} onClick={handleConfirmDelete}>
                        Yes
                    </button>
                    <button className={`btn btn-sm ${styles.cancelBtn}`} onClick={handleCancelDelete}>
                        No
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.actionButtons}>
            <button className={`btn btn-sm ${styles.actionBtn} ${styles.editBtn}`} onClick={onEdit} title="Edit Job">
                ✏️
            </button>

            <button
                className={`btn btn-sm ${styles.actionBtn} ${styles.viewBtn}`}
                onClick={onViewApplicants}
                title="View Applicants"
            >
                👥
            </button>

            {job.status === "Open" && (
                <button className={`btn btn-sm ${styles.actionBtn} ${styles.closeBtn}`} onClick={onClose} title="Close Job">
                    🔒
                </button>
            )}

            <button
                className={`btn btn-sm ${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={handleDeleteClick}
                title="Delete Job"
            >
                🗑️
            </button>
        </div>
    )
}

export default JobActionButtons
