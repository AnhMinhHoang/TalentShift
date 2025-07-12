import { CustomSection } from "../../../components/Section/CustomSection"
import { GraduationCap, Plus } from "lucide-react"

export const EducationSection = ({ educations, onEdit }) => {
    const hasEducations = educations && educations.length > 0

    const formatDate = (dateString) => {
        if (!dateString || dateString === "Now") return "Now"
        const date = new Date(dateString)
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = String(date.getFullYear()).slice(2)
        return `${month}-${year}`
    }

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
                <div className="text-center py-4">
                    <div className="mb-3">
                        <GraduationCap size={48} className="text-muted opacity-50" />
                    </div>
                    <h6 className="text-muted mb-2">No Education Added</h6>
                    <p className="text-muted small mb-3">Share your educational background and academic achievements</p>
                    <button onClick={onEdit} className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2">
                        <Plus size={16} />
                        Add Education
                    </button>
                </div>
            )}
        </CustomSection>
    )
}