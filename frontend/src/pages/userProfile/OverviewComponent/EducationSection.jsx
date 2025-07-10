import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const EducationSection = ({ educations, onEdit }) => {
    const hasEducations = educations && educations.length > 0;

    const formatDate = (dateString) => {
        if (!dateString || dateString === "Now") return "Now";
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);
        return `${month}-${year}`;
    };

    return (
        <CustomSection title="Education" onEdit={onEdit}>
            {hasEducations ? (
                educations.map((education) => (
                    <div className="mb-4" key={education.id}>
                        <div className="row">
                            <div className="col-md-3">
                                <p className="mb-1">
                                    {formatDate(education.startDate)} - {formatDate(education.endDate)}
                                </p>
                            </div>
                            <div className="col-md-9">
                                <h6 className="mb-1">{education.school}</h6>
                                {education.major && <p className="text-muted mb-1">{education.major}</p>}
                                <p className="text-muted small">{education.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted fs-5 fst-italic">No education information added yet. Click edit to add your educational background.</p>
            )}
        </CustomSection>
    );
};