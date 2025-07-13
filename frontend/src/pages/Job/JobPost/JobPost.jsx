import { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useAuth } from "../../AuthContext"; // Adjust path as necessary
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
    description: "",
    keyResponsibilities: "",
    idealSkills: "",
    paymentType: "fixed",
    minBudget: "",
    maxBudget: "",
  });
  const { userData } = useAuth(); // Get userData from context
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
      showProgress: true,
      pauseOnHover: true,
    });
  };

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

  const handleSubmit = async (isDraft = false) => {
    try {
      const response = await createJobPost({
        ...formData,
        hirerId: userData.userId,
        keyResponsibilities: formData.keyResponsibilities
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        idealSkills: formData.idealSkills
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        publishStatus: isDraft ? "DRAFT" : "PUBLISHED",
      });

      openNotification(
        "success",
        isDraft ? "Job saved as draft" : "Job posted successfully",
        ""
      );

      navigate("/jobs");
    } catch (error) {
      console.error("Job creation error:", error);
      openNotification(
        "error",
        "Failed to create job",
        error.message || "Please try again."
      );
    }
  };

  const StepIcon = (props) => {
    const { active, completed, icon } = props;

    return (
      <div
        className={`${styles.stepIconContainer} ${active ? styles.activeStep : ""} ${completed ? styles.completedStep : ""
          }`}
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
    </div>
  );
}