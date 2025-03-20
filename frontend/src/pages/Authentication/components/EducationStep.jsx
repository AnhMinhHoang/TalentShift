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
    if (currentEducation.degree && currentEducation.institution) {
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
    } else {
      alert("Please fill in all required fields.");
    }
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
        >
          <AddIcon fontSize="small" /> Add Education
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleSkip}
          className={styles.skipButton}
        >
          Skip this step
        </Button>
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
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <MenuBookIcon fontSize="small" className="me-2" />
                Degree / Certificate <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={currentEducation.degree}
                onChange={(e) =>
                  setCurrentEducation({
                    ...currentEducation,
                    degree: e.target.value,
                  })
                }
                placeholder="e.g. Bachelor of Science in Computer Science"
                className={styles.formControl}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <SchoolIcon fontSize="small" className="me-2" />
                Institution <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={currentEducation.institution}
                onChange={(e) =>
                  setCurrentEducation({
                    ...currentEducation,
                    institution: e.target.value,
                  })
                }
                placeholder="e.g. Harvard University"
                className={styles.formControl}
                required
              />
            </Form.Group>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Label className={styles.formLabel}>
                  <CalendarIcon fontSize="small" className="me-2" />
                  Start Date
                </Form.Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={currentEducation.startDate}
                    onChange={(date) =>
                      setCurrentEducation({
                        ...currentEducation,
                        startDate: date,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        className={styles.dateInput}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>

              {!currentEducation.isPresent && (
                <div className="col-md-6">
                  <Form.Label className={styles.formLabel}>
                    <CalendarIcon fontSize="small" className="me-2" />
                    End Date
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={currentEducation.endDate}
                      onChange={(date) =>
                        setCurrentEducation({
                          ...currentEducation,
                          endDate: date,
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          className={styles.dateInput}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              )}
            </div>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="I am currently studying here"
                checked={currentEducation.isPresent}
                onChange={(e) =>
                  setCurrentEducation({
                    ...currentEducation,
                    isPresent: e.target.checked,
                    endDate: null,
                  })
                }
                className={styles.checkbox}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <DescriptionIcon fontSize="small" className="me-2" />
                Description (Optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={currentEducation.description}
                onChange={(e) =>
                  setCurrentEducation({
                    ...currentEducation,
                    description: e.target.value,
                  })
                }
                placeholder="Share details about your studies, achievements, or relevant coursework..."
                className={styles.formControl}
              />
              <Form.Text className="text-muted">
                Include relevant coursework, achievements, or extracurricular
                activities.
              </Form.Text>
            </Form.Group>
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
