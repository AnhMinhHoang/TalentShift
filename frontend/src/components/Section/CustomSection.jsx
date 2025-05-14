import React from "react"
import { Edit } from 'lucide-react';
import styles from "../../pages/userProfile/style/UserProfile.module.css";

export const CustomSection = ({ title, children, onEdit }) => {
    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>{title}</h5>
                <button
                    className={`btn btn-link p-0 ${styles.editButton}`}
                    onClick={onEdit}
                    aria-label={`Edit ${title}`}
                >
                    <Edit size={16} />
                </button>
            </div>
            <hr className="mt-0 mb-3" />
            <div>{children}</div>
        </div>
    );
};
