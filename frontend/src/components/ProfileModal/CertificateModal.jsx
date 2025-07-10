import React from "react"
import { useState } from "react"
import { Edit, Trash, Plus } from "lucide-react"
import { CustomModal } from "../Modal/CustomModal"
import styles from "../../pages/userProfile/style/UserProfile.module.css"

const formatDate = (dateString) => {
    if (!dateString) return "Now";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}-${year}`;
};

export const CertificateModal = ({ onClose, certificates, onSave }) => {
    const [certificateList, setCertificateList] = useState([...certificates])
    const [showAddCertificateForm, setShowAddCertificateForm] = useState(false)
    const [formData, setFormData] = useState({})
    const [validationErrors, setValidationErrors] = useState({})

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Clear validation error for this field
        if (validationErrors[name]) {
            const newErrors = { ...validationErrors }
            delete newErrors[name]
            setValidationErrors(newErrors)
        }
    }

    // Edit certificate
    const editCertificate = (certificate) => {
        setFormData({
            id: certificate.id,
            name: certificate.name,
            issueDate: certificate.issueDate,
            score: certificate.score,
            description: certificate.description,
        })
        setShowAddCertificateForm(true)
    }

    // Save certificate
    const saveCertificate = () => {
        // Validate required fields
        const errors = {}
        if (!formData.name) errors.name = "Certificate name is required"

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        const updatedCertificates = [...certificateList]

        if (formData.id) {
            const index = updatedCertificates.findIndex((cert) => cert.id === formData.id)
            if (index !== -1) {
                updatedCertificates[index] = formData
            }
        } else {
            updatedCertificates.push({ ...formData, id: Date.now() })
        }

        setCertificateList(updatedCertificates)
        setFormData({})
        setShowAddCertificateForm(false)
        setValidationErrors({})
    }

    // Delete certificate
    const deleteCertificate = (id) => {
        const updatedCertificates = certificateList.filter((cert) => cert.id !== id)
        setCertificateList(updatedCertificates)
    }

    // Handle final save
    const handleSave = () => {
        onSave(certificateList)
    }

    return (
        <CustomModal title="Certificate" onClose={onClose}>
            {!showAddCertificateForm ? (
                <>
                    {certificateList.map((certificate) => (
                        <div key={certificate.id} className="mb-3 p-3 bg-light rounded position-relative">
                            <div className="d-flex align-items-start">
                                <div className="me-auto">
                                    <div className="fw-medium">{certificate.name}</div>
                                    <div className="small text-muted">{formatDate(certificate.issueDate)}</div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                        onClick={() => editCertificate(certificate)}
                                        aria-label="Edit certificate"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0"
                                        onClick={() => deleteCertificate(certificate.id)}
                                        aria-label="Delete certificate"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center mt-4">
                        <button
                            className={`btn ${styles.primaryBtn}`}
                            onClick={() => {
                                setFormData({})
                                setShowAddCertificateForm(true)
                                setValidationErrors({})
                            }}
                        >
                            <Plus size={16} className="me-1" /> Add Certification
                        </button>
                    </div>

                    <div className="text-end mt-3">
                        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" className={`btn ${styles.primaryBtn}`} onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <div className="mb-3">
                        <label htmlFor="program" className="form-label">
                            Program/Course <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${validationErrors.name ? "is-invalid" : ""} ${styles.formControl}`}
                            id="program"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            required
                        />
                        {validationErrors.name && <div className={styles.validationError}>{validationErrors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="achievement" className="form-label">
                            Achievement
                        </label>
                        <input
                            type="text"
                            className={`form-control ${styles.formControl}`}
                            id="achievement"
                            name="score"
                            value={formData.score || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="issuedDate" className="form-label">
                                Issued Date
                            </label>
                            <div className="input-group">
                                <input
                                    type="date"
                                    className={`form-control ${styles.formControl}`}
                                    id="issuedDate"
                                    name="issueDate"
                                    placeholder="MM-YYYY"
                                    value={formData.issueDate || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="certDescription" className="form-label">
                            Description
                        </label>
                        <textarea
                            className={`form-control ${styles.formControl}`}
                            id="certDescription"
                            name="description"
                            rows="3"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="form-text text-end">65 words max</div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setFormData({})
                                setShowAddCertificateForm(false)
                                setValidationErrors({})
                            }}
                        >
                            Cancel
                        </button>
                        <button className={`btn ${styles.primaryBtn}`} onClick={saveCertificate}>
                            Save Certificate
                        </button>
                    </div>
                </div>
            )}
        </CustomModal>
    )
}
