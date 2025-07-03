import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const SkillsSection = ({ mainSkills, otherSkills, onEdit, styles }) => {
    const hasMainSkills = mainSkills && mainSkills.length > 0;
    const hasOtherSkills = otherSkills && otherSkills.length > 0;

    return (
        <CustomSection title="Skills" onEdit={onEdit}>
            <div className="mb-3">
                <h6 className="mb-2">Main Skills</h6>
                {hasMainSkills ? (
                    <div className="d-flex flex-wrap gap-2">
                        {mainSkills.map((skill, index) => (
                            <span key={index} className={`badge ${styles.skillBadge}`}>
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted fs-5 fst-italic">No main skills added yet.</p>
                )}
            </div>

            <div>
                <h6 className="mb-2">Other Skills</h6>
                {hasOtherSkills ? (
                    <div className="d-flex flex-wrap gap-2">
                        {otherSkills.map((skill, index) => (
                            <span key={index} className={`badge ${styles.skillBadge}`}>
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted fs-5 fst-italic">No other skills added yet.</p>
                )}
            </div>
        </CustomSection>
    );
};