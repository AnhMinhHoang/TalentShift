import React from "react"
import styles from "../../pages/userProfile/style/UserProfile.module.css"

export const CustomModal = ({ title, children, onClose }) => {
    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className={`modal-header ${styles.modalHeader}`}>
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    )
}
