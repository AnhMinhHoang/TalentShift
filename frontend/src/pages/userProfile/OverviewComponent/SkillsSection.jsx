import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const SkillsSection = ({ mainSkills, otherSkills, onEdit, styles }) => {
    return (
        <CustomSection title="Skills" onEdit={onEdit}>
            <div className="mb-3">
                <h6 className="mb-2">Main Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                    {mainSkills.map((skill, index) => (
                        <span key={index} className={`badge ${styles.skillBadge}`}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <h6 className="mb-2">Other Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                    {otherSkills.map((skill, index) => (
                        <span key={index} className={`badge ${styles.skillBadge}`}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </CustomSection>
    );
};