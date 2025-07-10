import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const CertificateSection = ({ certificates, onEdit }) => {
    const hasCertificates = certificates && certificates.length > 0;

    const formatDate = (dateString) => {
        if (!dateString) return "Now";
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);
        return `${month}-${year}`;
    };

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
                <p className="text-muted fs-5 fst-italic">No certificates added yet. Click edit to add your certifications.</p>
            )}
        </CustomSection>
    );
};