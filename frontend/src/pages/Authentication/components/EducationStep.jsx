import { Button, Card, Form } from "react-bootstrap";
import { Modal, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Add as AddIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  MenuBook as MenuBookIcon,
} from "@mui/icons-material";
import styles from "../styles/RegisterAdditional.module.css";
import { isFutureDate, isValidDateRange } from "../../../utils/dateUtils";
import { useState } from "react";

const EducationStep = ({
  educations,
  setEducations,
  educationModalOpen,
  setEducationModalOpen,
  currentEducation,
  setCurrentEducation,
  currentEducationIndex,
  setCurrentEducationIndex,
  handleSkip,
  calculateProgress,
  setProgress,
  showSkipButton,
}) => {
  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxWidth: "90%",
    bgcolor: "background.paper",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    p: 4,
    borderRadius: "12px",
    maxHeight: "90vh",
    overflow: "auto",
  };

  const [dateErrors, setDateErrors] = useState({});

  // Add a function to check if all educations are valid
  const isEducationValid = (edu) => {
    if (!edu.degree || !edu.institution || !edu.startDate) return false;
    if (!edu.isPresent && !edu.endDate) return false;
    if (edu.startDate && isFutureDate(edu.startDate)) return false;
    if (edu.endDate && isFutureDate(edu.endDate)) return false;
    if (edu.startDate && edu.endDate && !isValidDateRange(edu.startDate, edu.endDate)) return false;
    return true;
  };
  const allEducationsValid = educations.length === 0 || educations.every(isEducationValid);

  // Education handlers
  const handleOpenEducationModal = (index = null) => {
    if (index !== null) {
      setCurrentEducation(educations[index]);
      setCurrentEducationIndex(index);
    } else {
      setCurrentEducation({
        degree: "",
        institution: "",
        startDate: null,
        endDate: null,
        isPresent: false,
        description: "",
      });
      setCurrentEducationIndex(null);
    }
    setEducationModalOpen(true);
  };

  const handleCloseEducationModal = () => {
    setEducationModalOpen(false);
  };

  const handleSaveEducation = () => {
    const errors = {};
    if (!currentEducation.degree) errors.degree = "Degree is required";
    if (!currentEducation.institution) errors.institution = "Institution is required";
    if (!currentEducation.startDate) errors.startDate = "Start date is required";
    if (!currentEducation.isPresent && !currentEducation.endDate) errors.endDate = "End date is required";
    if (currentEducation.startDate && isFutureDate(currentEducation.startDate)) errors.startDate = "Start date cannot be in the future";
    if (currentEducation.endDate && isFutureDate(currentEducation.endDate)) errors.endDate = "End date cannot be in the future";
    if (currentEducation.startDate && currentEducation.endDate && !isValidDateRange(currentEducation.startDate, currentEducation.endDate)) errors.endDate = "End date cannot be before start date";
    setDateErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (currentEducationIndex !== null) {
      // Update existing education
      const updatedEducations = [...educations];
      updatedEducations[currentEducationIndex] = currentEducation;
      setEducations(updatedEducations);
    } else {
      // Add new education
      setEducations([...educations, currentEducation]);
    }

    handleCloseEducationModal();
    setProgress(calculateProgress());
  };

  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>03</span> Educational Background
      </h4>
      <p className={styles.stepDescription}>
        Share your academic qualifications and educational journey.
      </p>

      <div className={styles.educationActions}>
        <Button
          variant="primary"
          className={`${styles.addButton} d-flex align-items-center gap-2`}
          onClick={() => handleOpenEducationModal()}
          disabled={!allEducationsValid}
        >
          <AddIcon fontSize="small" /> Add Education
        </Button>
        {showSkipButton && (
          <Button
            variant="outline-secondary"
            onClick={handleSkip}
            className={styles.skipButton}
          >
            Skip this step
          </Button>
        )}
      </div>

      {educations.length === 0 && (
        <div className={styles.emptyState}>
          <SchoolIcon className={styles.emptyStateIcon} />
          <h5>No education added yet</h5>
          <p>
            Share your educational background to highlight your qualifications.
          </p>
        </div>
      )}

      {educations.length > 0 && (
        <div className={styles.educationTimeline}>
          {educations.map((edu, index) => (
            <Card key={index} className={styles.educationCard}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex gap-3">
                    <div className={styles.institutionLogo}>
                      <SchoolIcon />
                    </div>
                    <div>
                      <h5 className={styles.degree}>{edu.degree}</h5>
                      <h6 className={styles.institution}>{edu.institution}</h6>
                      <div className={styles.dateRange}>
                        <CalendarIcon fontSize="small" className="me-1" />
                        {edu.startDate
                          ? new Date(edu.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                            }
                          )
                          : ""}{" "}
                        -
                        {edu.isPresent
                          ? " Present"
                          : edu.endDate
                            ? ` ${new Date(edu.endDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                              }
                            )}`
                            : ""}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => handleOpenEducationModal(index)}
                    className={styles.editButton}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </div>

                {edu.description && (
                  <div className={styles.description}>
                    <DescriptionIcon
                      fontSize="small"
                      className="me-2 text-muted"
                    />
                    {edu.description}
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Education Modal */}
      <Modal
        open={educationModalOpen}
        onClose={handleCloseEducationModal}
        aria-labelledby="education-modal-title"
      >
        <Box sx={modalStyle}>
          <div className={styles.modalHeader}>
            <h4 id="education-modal-title" className={styles.modalTitle}>
              {currentEducationIndex !== null
                ? "Edit Education"
                : "Add Education"}
            </h4>
            <p className={styles.modalSubtitle}>
              Share details about your educational background
            </p>
          </div>

          <Form>
            <div className="mb-3">
              <label htmlFor="degree" className="form-label">
                <MenuBookIcon fontSize="small" className="me-2" />
                Degree / Certificate <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control userProfile_formControl"
                id="degree"
                name="degree"
                value={currentEducation.degree}
                onChange={e => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                placeholder="e.g. Bachelor of Science in Computer Science"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="institution" className="form-label">
                <SchoolIcon fontSize="small" className="me-2" />
                Institution <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control userProfile_formControl"
                id="institution"
                name="institution"
                value={currentEducation.institution}
                onChange={e => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                placeholder="e.g. Harvard University"
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="currentlyStudying"
                checked={currentEducation.isPresent}
                onChange={e => setCurrentEducation({ ...currentEducation, isPresent: e.target.checked, endDate: e.target.checked ? null : currentEducation.endDate })}
              />
              <label className="form-check-label" htmlFor="currentlyStudying">
                I am currently studying here
              </label>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  <CalendarIcon fontSize="small" className="me-2" />
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control userProfile_formControl${dateErrors.startDate ? ' is-invalid' : ''}`}
                  id="startDate"
                  name="startDate"
                  value={currentEducation.startDate || ''}
                  onChange={e => setCurrentEducation({ ...currentEducation, startDate: e.target.value })}
                  required
                  max={currentEducation.endDate || new Date().toISOString().split("T")[0]}
                />
                {dateErrors.startDate && <div className="invalid-feedback">{dateErrors.startDate}</div>}
              </div>
              {!currentEducation.isPresent && (
                <div className="col-md-6">
                  <label htmlFor="endDate" className="form-label">
                    <CalendarIcon fontSize="small" className="me-2" />
                    End Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control userProfile_formControl${dateErrors.endDate ? ' is-invalid' : ''}`}
                    id="endDate"
                    name="endDate"
                    value={currentEducation.endDate || ''}
                    onChange={e => setCurrentEducation({ ...currentEducation, endDate: e.target.value })}
                    required
                    min={currentEducation.startDate || undefined}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {dateErrors.endDate && <div className="invalid-feedback">{dateErrors.endDate}</div>}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <DescriptionIcon fontSize="small" className="me-2" />
                Description
              </label>
              <textarea
                className="form-control userProfile_formControl"
                id="description"
                name="description"
                rows={4}
                value={currentEducation.description}
                onChange={e => setCurrentEducation({ ...currentEducation, description: e.target.value })}
                placeholder="Share details about your studies, achievements, or relevant coursework..."
              />
            </div>
          </Form>

          <div className={styles.modalActions}>
            <Button
              variant="outline-secondary"
              onClick={handleCloseEducationModal}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveEducation}
              className={styles.nextButton}
              disabled={!isEducationValid}
            >
              Save Education
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EducationStep;
