import { CustomSection } from "../../../components/Section/CustomSection"
import { FileText, Plus } from "lucide-react"

export const SummarySection = ({ summary, onEdit }) => {
    return (
        <CustomSection title="Summary" onEdit={onEdit}>
            {summary && summary.trim() ? (
                <p className="text-muted fs-5">{summary}</p>
            ) : (
                <div className="text-center py-4">
                    <div className="mb-3">
                        <FileText size={48} className="text-muted opacity-50" />
                    </div>
                    <h6 className="text-muted mb-2">No Summary Added</h6>
                    <p className="text-muted small mb-3">Write a compelling professional summary to introduce yourself</p>
                    <button onClick={onEdit} className="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2">
                        <Plus size={16} />
                        Add Summary
                    </button>
                </div>
            )}
        </CustomSection>
    )
}