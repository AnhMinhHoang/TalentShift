import { CustomSection } from "../../../components/Section/CustomSection"
import { Zap, Plus } from "lucide-react"

export const SkillsSection = ({ mainSkills, otherSkills, onEdit, styles }) => {
    const hasMainSkills = mainSkills && mainSkills.length > 0
    const hasOtherSkills = otherSkills && otherSkills.length > 0
    const hasAnySkills = hasMainSkills || hasOtherSkills

    return (
        <CustomSection title="Skills" onEdit={onEdit}>
            {hasAnySkills ? (
                <>
                    <div className="mb-4">
                        <h5 className="mb-3 fw-semibold">Main Skills</h5>
                        {hasMainSkills ? (
                            <div className="d-flex flex-wrap gap-2">
                                {mainSkills.map((skill, index) => (
                                    <span key={index} className={`badge fs-6 ${styles.skillBadge}`}>
                    {skill}
                  </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted fs-6 fst-italic">No main skills added yet.</p>
                        )}
                    </div>

                    <div>
                        <h5 className="mb-3 fw-semibold">Other Skills</h5>
                        {hasOtherSkills ? (
                            <div className="d-flex flex-wrap gap-2">
                                {otherSkills.map((skill, index) => (
                                    <span key={index} className={`badge fs-6 ${styles.skillBadge}`}>
                    {skill}
                  </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted fs-6 fst-italic">No other skills added yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center py-4">
                    <div className="mb-3">
                        <Zap size={48} className="text-muted opacity-50" />
                    </div>
                    <h6 className="text-muted mb-2">No Skills Listed</h6>
                    <p className="text-muted small mb-3">Add your technical and professional skills to showcase your expertise</p>
                    <button onClick={onEdit} className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2">
                        <Plus size={16} />
                        Add Skills
                    </button>
                </div>
            )}
        </CustomSection>
    )
}