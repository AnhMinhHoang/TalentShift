import React from "react";
import { CustomSection } from "../../../components/Section/CustomSection";

export const CertificateSection = ({ certificates, onEdit }) => {
    return (
        <CustomSection title="Certificate" onEdit={onEdit}>
            {certificates.map((certificate) => (
                <div className="mb-3" key={certificate.id}>
                    <div className="row">
                        <div className="col-md-3">
                            <p className="mb-1">{certificate.issueDate}</p>
                        </div>
                        <div className="col-md-9">
                            <h6 className="mb-1">{certificate.name}</h6>
                            <p>{certificate.score}</p>
                        </div>
                    </div>
                </div>
            ))}
        </CustomSection>
    );
};