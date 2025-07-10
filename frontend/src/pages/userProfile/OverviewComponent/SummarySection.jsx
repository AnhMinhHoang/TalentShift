import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const SummarySection = ({ summary, onEdit }) => {
    return (
        <CustomSection title="Summary" onEdit={onEdit}>
            {summary && summary.trim() ? (
                <p className="text-muted fs-5">{summary}</p>
            ) : (
                <p className="text-muted fs-5 fst-italic">No summary added yet. Click edit to add your professional summary.</p>
            )}
        </CustomSection>
    );
};