import { useState } from "react";
import { Stepper, Step, StepLabel, Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import Step4 from "./Components/Step4";
import Step5 from "./Components/Step5";
import styles from "./styles/JobPost.module.css";
import { createJobPost } from "../../../services/jobService";
const steps = [
  "Overview",
  "Skills",
  "Additional information",
  "Budget",
  "Final",
];

export default function JobPost() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: "",
    category: "",
    skills: [],
    projectName: "",
    projectDescription: "",
    keyResponsibilities: "",
    idealSkills: "",
    paymentType: "",
    minBudget: "",
    maxBudget: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // In JobPost component
  const handleSubmit = async (isDraft = false) => {
    try {
      const userId = localStorage.getItem("userId"); // ⬅️ Get hirer ID

      const response = await createJobPost({
        ...formData,
        hirerId: userId, // ⬅️ Add it here
        keyResponsibilities: formData.keyResponsibilities
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean),
        idealSkills: formData.idealSkills
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean),
        publishStatus: isDraft ? 'DRAFT' : 'PUBLISHED',
      });

      setAlert({
        open: true,
        message: isDraft
          ? "Job saved as draft successfully!"
          : "Job posted successfully!",
        severity: "success",
      });

      if (!isDraft) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

    } catch (error) {
      console.error('Job creation error:', error);
      setAlert({
        open: true,
        message: error.message || "Failed to create job. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  // Custom step icon component with checkmark for completed steps
  const StepIcon = (props) => {
    const { active, completed, icon } = props;

    return (
      <div
        className={`${styles.stepIconContainer} ${active ? styles.activeStep : ""
          } ${completed ? styles.completedStep : ""}`}
      >
        {completed ? <CheckIcon className={styles.checkIcon} /> : icon}
      </div>
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1
            formData={formData}
            onChange={handleFormChange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <Step2
            formData={formData}
            onChange={handleFormChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <Step3
            formData={formData}
            onChange={handleFormChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step4
            formData={formData}
            onChange={handleFormChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step5
            formData={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div className={`${styles.jobPostContainer}`}>
      <Stepper activeStep={activeStep} className={styles.stepper}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>
                <span className={styles.stepLabel}>{label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div className={styles.stepContent}>{getStepContent(activeStep)}</div>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
