import { Button, Card, Accordion, Form } from "react-bootstrap";
import { Modal, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Add as AddIcon,
  Work as WorkIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import styles from "../styles/RegisterAdditional.module.css";

const ExperienceStep = ({
  experiences,
  setExperiences,
  experienceModalOpen,
  setExperienceModalOpen,
  projectModalOpen,
  setProjectModalOpen,
  currentExperience,
  setCurrentExperience,
  currentProject,
  setCurrentProject,
  currentExperienceIndex,
  setCurrentExperienceIndex,
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

  // Experience handlers
  const handleOpenExperienceModal = (index = null) => {
    if (index !== null) {
      setCurrentExperience(experiences[index]);
      setCurrentExperienceIndex(index);
    } else {
      setCurrentExperience({
        jobTitle: "",
        companyName: "",
        startDate: null,
        endDate: null,
        isPresent: false,
        description: "",
        projects: [],
      });
      setCurrentExperienceIndex(null);
    }
    setExperienceModalOpen(true);
  };

  const handleCloseExperienceModal = () => {
    setExperienceModalOpen(false);
  };

  const handleSaveExperience = () => {
    if (currentExperience.jobTitle && currentExperience.companyName) {
      if (currentExperienceIndex !== null) {
        // Update existing experience
        const updatedExperiences = [...experiences];
        updatedExperiences[currentExperienceIndex] = currentExperience;
        setExperiences(updatedExperiences);
      } else {
        // Add new experience
        setExperiences([...experiences, currentExperience]);
      }

      handleCloseExperienceModal();
      setProgress(calculateProgress());
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Project handlers
  const handleOpenProjectModal = () => {
    setCurrentProject({
      name: "",
      description: "",
      link: "",
    });
    setProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setProjectModalOpen(false);
  };

  const handleSaveProject = () => {
    if (currentProject.name && currentProject.description) {
      setCurrentExperience({
        ...currentExperience,
        projects: [...currentExperience.projects, currentProject],
      });

      handleCloseProjectModal();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.stepContent}>
      <h4 className={styles.stepTitle}>
        <span className={styles.stepNumber}>02</span> Professional Experience
      </h4>
      <p className={styles.stepDescription}>
        Share your work history to showcase your professional journey and
        expertise.
      </p>

      <div className={styles.experienceActions}>
        <Button
          variant="primary"
          className={`${styles.addButton} d-flex align-items-center gap-2`}
          onClick={() => handleOpenExperienceModal()}
        >
          <AddIcon fontSize="small" /> Add Experience
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleSkip}
          className={styles.skipButton}
        >
          Skip this step
        </Button>
      </div>

      {experiences.length === 0 && (
        <div className={styles.emptyState}>
          <WorkIcon className={styles.emptyStateIcon} />
          <h5>No experience added yet</h5>
          <p>
            Share your work history to help clients understand your professional
            background.
          </p>
        </div>
      )}

      {experiences.length > 0 && (
        <div className={styles.experienceTimeline}>
          {experiences.map((exp, index) => (
            <Card key={index} className={styles.experienceCard}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex gap-3">
                    <div className={styles.companyLogo}>
                      {exp.companyName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className={styles.jobTitle}>{exp.jobTitle}</h5>
                      <h6 className={styles.companyName}>{exp.companyName}</h6>
                      <div className={styles.dateRange}>
                        <CalendarIcon fontSize="small" className="me-1" />
                        {exp.startDate
                          ? new Date(exp.startDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                              }
                            )
                          : ""}{" "}
                        -
                        {exp.isPresent
                          ? " Present"
                          : exp.endDate
                          ? ` ${new Date(exp.endDate).toLocaleDateString(
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
                    onClick={() => handleOpenExperienceModal(index)}
                    className={styles.editButton}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </div>

                {exp.description && (
                  <div className={styles.description}>
                    <DescriptionIcon
                      fontSize="small"
                      className="me-2 text-muted"
                    />
                    {exp.description}
                  </div>
                )}

                {exp.projects.length > 0 && (
                  <div className="mt-3">
                    <Accordion className={styles.projectsAccordion}>
                      <Accordion.Header className={styles.projectsHeader}>
                        Projects ({exp.projects.length})
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className={styles.projectsList}>
                          {exp.projects.map((project, pIndex) => (
                            <div key={pIndex} className={styles.projectItem}>
                              <h6>{project.name}</h6>
                              <p>{project.description}</p>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.projectLink}
                                >
                                  <LinkIcon fontSize="small" className="me-1" />
                                  View Project
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Experience Modal */}
      <Modal
        open={experienceModalOpen}
        onClose={handleCloseExperienceModal}
        aria-labelledby="experience-modal-title"
      >
        <Box sx={modalStyle}>
          <div className={styles.modalHeader}>
            <h4 id="experience-modal-title" className={styles.modalTitle}>
              {currentExperienceIndex !== null
                ? "Edit Experience"
                : "Add Experience"}
            </h4>
            <p className={styles.modalSubtitle}>
              Share details about your work experience
            </p>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <WorkIcon fontSize="small" className="me-2" />
                Job Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={currentExperience.jobTitle}
                onChange={(e) =>
                  setCurrentExperience({
                    ...currentExperience,
                    jobTitle: e.target.value,
                  })
                }
                placeholder="e.g. Senior Web Developer"
                className={styles.formControl}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <BusinessIcon fontSize="small" className="me-2" />
                Company Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={currentExperience.companyName}
                onChange={(e) =>
                  setCurrentExperience({
                    ...currentExperience,
                    companyName: e.target.value,
                  })
                }
                placeholder="e.g. Acme Corporation"
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
                    value={currentExperience.startDate}
                    onChange={(date) =>
                      setCurrentExperience({
                        ...currentExperience,
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

              {!currentExperience.isPresent && (
                <div className="col-md-6">
                  <Form.Label className={styles.formLabel}>
                    <CalendarIcon fontSize="small" className="me-2" />
                    End Date
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={currentExperience.endDate}
                      onChange={(date) =>
                        setCurrentExperience({
                          ...currentExperience,
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
                label="I currently work here"
                checked={currentExperience.isPresent}
                onChange={(e) =>
                  setCurrentExperience({
                    ...currentExperience,
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
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={currentExperience.description}
                onChange={(e) =>
                  setCurrentExperience({
                    ...currentExperience,
                    description: e.target.value,
                  })
                }
                placeholder="Describe your responsibilities and achievements..."
                className={styles.formControl}
              />
              <Form.Text className="text-muted">
                Highlight your key responsibilities, achievements, and skills
                gained.
              </Form.Text>
            </Form.Group>

            <div className={`${styles.projectsSection} mt-4 mb-3`}>
              <h5 className={styles.sectionTitle}>Projects</h5>
              <p className={styles.sectionDescription}>
                Add notable projects you worked on during this role
              </p>

              {currentExperience.projects.length > 0 && (
                <div className={styles.projectsList}>
                  {currentExperience.projects.map((project, index) => (
                    <div key={index} className={styles.projectItemInModal}>
                      <h6>{project.name}</h6>
                      <p className="mb-0">{project.description}</p>
                      {project.link && (
                        <small className="text-primary">
                          <LinkIcon fontSize="small" className="me-1" />
                          {project.link}
                        </small>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="outline-primary"
                className={`d-flex align-items-center gap-1 mt-3 ${styles.skipButton}`}
                onClick={handleOpenProjectModal}
              >
                <AddIcon fontSize="small" /> Add Project
              </Button>
            </div>
          </Form>

          <div className={styles.modalActions}>
            <Button
              variant="outline-secondary"
              onClick={handleCloseExperienceModal}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveExperience}
              className={styles.nextButton}
            >
              Save Experience
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Project Modal */}
      <Modal
        open={projectModalOpen}
        onClose={handleCloseProjectModal}
        aria-labelledby="project-modal-title"
      >
        <Box sx={modalStyle}>
          <div className={styles.modalHeader}>
            <h4 id="project-modal-title" className={styles.modalTitle}>
              Add Project
            </h4>
            <p className={styles.modalSubtitle}>
              Showcase a notable project from this work experience
            </p>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                Project Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={currentProject.name}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    name: e.target.value,
                  })
                }
                placeholder="e.g. Company Website Redesign"
                className={styles.formControl}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentProject.description}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the project, your role, and the outcome..."
                className={styles.formControl}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>
                <LinkIcon fontSize="small" className="me-2" />
                Project Link (Optional)
              </Form.Label>
              <Form.Control
                type="url"
                value={currentProject.link}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    link: e.target.value,
                  })
                }
                placeholder="https://example.com"
                className={styles.formControl}
              />
              <Form.Text className="text-muted">
                Add a link to the live project, GitHub repository, or portfolio
                page.
              </Form.Text>
            </Form.Group>
          </Form>

          <div className={styles.modalActions}>
            <Button
              variant="outline-secondary"
              onClick={handleCloseProjectModal}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveProject}
              className={styles.nextButton}
            >
              Add Project
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ExperienceStep;
