import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const SummarySection = ({ summary, onEdit }) => {
    return (
        <CustomSection title="Summary" onEdit={onEdit}>
            <p className="text-muted fs-5">{summary}</p>
        </CustomSection>
    );
};