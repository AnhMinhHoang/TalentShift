import { CustomSection } from "../../../components/Section/CustomSection"
import { Briefcase, Plus } from "lucide-react"

export const ExperienceSection = ({ workExperiences, onEdit }) => {
    const hasExperiences = workExperiences && workExperiences.length > 0

    const formatDate = (dateString) => {
        if (!dateString || dateString === "Now") return "Now"
        const date = new Date(dateString)
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = String(date.getFullYear()).slice(2)
        return `${month}-${year}`
    }

    return (
        <CustomSection title="Work Experience" onEdit={onEdit}>
            {hasExperiences ? (
                workExperiences.map((experience) => (
                    <div className="mb-4" key={experience.id}>
                        <div className="row">
                            <div className="col-md-3">
                                <p className="mb-1">
                                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                </p>
                            </div>
                            <div className="col-md-9">
                                <h6 className="mb-1">
                                    {experience.jobPosition} at {experience.companyName}
                                </h6>
                                <p className="text-muted small mb-2">{experience.description}</p>
                                {experience.projects && experience.projects.length > 0 && (
                                    <div className="mt-2 mb-2">
                                        <h6 className="small">Projects:</h6>
                                        <ul className="list-unstyled ps-3">
                                            {experience.projects.map((project) => (
                                                <li key={project.id} className="small text-muted">
                                                    {project.projectName} ({project.projectTime})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4">
                    <div className="mb-3">
                        <Briefcase size={48} className="text-muted opacity-50" />
                    </div>
                    <h6 className="text-muted mb-2">No Work Experience Yet</h6>
                    <p className="text-muted small mb-3">
                        Showcase your professional journey and highlight your career achievements
                    </p>
                    <button onClick={onEdit} className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2">
                        <Plus size={16} />
                        Add Experience
                    </button>
                </div>
            )}
        </CustomSection>
    )
}