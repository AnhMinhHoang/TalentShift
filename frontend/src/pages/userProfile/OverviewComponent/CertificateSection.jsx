import { CustomSection } from "../../../components/Section/CustomSection"
import { Award, Plus } from "lucide-react"

export const CertificateSection = ({ certificates, onEdit }) => {
    const hasCertificates = certificates && certificates.length > 0

    const formatDate = (dateString) => {
        if (!dateString) return "Now"
        const date = new Date(dateString)
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = String(date.getFullYear()).slice(2)
        return `${month}-${year}`
    }

    return (
        <CustomSection title="Certificate" onEdit={onEdit}>
            {hasCertificates ? (
                certificates.map((certificate) => (
                    <div className="mb-3" key={certificate.id}>
                        <div className="row">
                            <div className="col-md-3">
                                <p className="mb-1">{formatDate(certificate.issueDate)}</p>
                            </div>
                            <div className="col-md-9">
                                <h6 className="mb-1">{certificate.name}</h6>
                                <p>{certificate.score}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4">
                    <div className="mb-3">
                        <Award size={48} className="text-muted opacity-50" />
                    </div>
                    <h6 className="text-muted mb-2">No Certificates Added</h6>
                    <p className="text-muted small mb-3">Display your professional certifications and achievements</p>
                    <button onClick={onEdit} className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2">
                        <Plus size={16} />
                        Add Certificate
                    </button>
                </div>
            )}
        </CustomSection>
    )
}