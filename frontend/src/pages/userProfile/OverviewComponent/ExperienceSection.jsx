import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const ExperienceSection = ({ workExperiences, onEdit }) => {
    return (
        <CustomSection title="Work Experience" onEdit={onEdit}>
            {workExperiences.map((experience) => (
                <div className="mb-4" key={experience.id}>
                    <div className="row">
                        <div className="col-md-3">
                            <p className="mb-1">
                                {experience.startDate} - {experience.endDate}
                            </p>
                        </div>
                        <div className="col-md-9">
                            <h6 className="mb-1">
                                {experience.position} at {experience.company}
                            </h6>
                            <p className="text-muted small mb-2">{experience.description}</p>
                            {experience.projects && experience.projects.length > 0 && (
                                <div className="mt-2 mb-2">
                                    <h6 className="small">Projects:</h6>
                                    <ul className="list-unstyled ps-3">
                                        {experience.projects.map((project) => (
                                            <li key={project.id} className="small text-muted">
                                                {project.name} ({project.time})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </CustomSection>
    );
};