import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const EducationSection = ({ educations, onEdit }) => {
    return (
        <CustomSection title="Education" onEdit={onEdit}>
            {educations.map((education) => (
                <div className="mb-4" key={education.id}>
                    <div className="row">
                        <div className="col-md-3">
                            <p className="mb-1">
                                {education.startDate} - {education.endDate}
                            </p>
                        </div>
                        <div className="col-md-9">
                            <h6 className="mb-1">{education.school}</h6>
                            {education.major && <p className="text-muted mb-1">{education.major}</p>}
                            <p className="text-muted small">{education.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </CustomSection>
    );
};