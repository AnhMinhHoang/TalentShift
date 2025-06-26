import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Stepper, Step, StepLabel, LinearProgress } from "@mui/material";
import { notification } from "antd";
import {
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import HirerCompanyStep from "./components/HirerCompanyStep";
import styles from "./styles/RegisterAdditional.module.css";
import axios from "axios";
import { useAuth } from "../AuthContext.jsx";

const HirerAdditionalRegistration = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { getUserById } = useAuth();

  // State for company information
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [contactLink, setContactLink] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [registrationFile, setRegistrationFile] = useState(null);

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

  const isStepValid = () => {
    return (
      companyName.trim() !== "" &&
      description.trim() !== "" &&
      contactLink.trim() !== "" &&
      registrationFile !== null
    );
  };

  const handleNext = async () => {
    console.log("handleNext");
    if (activeStep === 0) {
      if (!isStepValid()) {
        openNotification(
          "error",
          "Validation Error",
          "Please fill in all required fields"
        );
        return;
      }

      try {
        const formData = new FormData();
        formData.append("companyName", companyName);
        formData.append("description", description);
        formData.append("contactLink", contactLink);
        if (logoFile) {
          formData.append("logo", logoFile);
        }
        formData.append("registrationFile", registrationFile);

        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;
        const userId = user?.id;
        if (!email) {
          openNotification("error", "Registration Failed", "User email not found.");
          navigate("/login");
          return;
        }
        if (!userId) {
          openNotification("error", "Registration Failed", "User ID not found.");
          navigate("/login");
          return;
        }

        const response = await axios.put(
          `http://localhost:8080/api/users/${userId}/hirer`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            maxContentLength: 10 * 1024 * 1024, // 10MB
            maxBodyLength: 10 * 1024 * 1024, // 10MB
            timeout: 30000, // 30 seconds timeout
          }
        );

        if (response.status === 200) {
          openNotification(
            "success",
            "Registration Complete",
            "Your company profile has been updated successfully!"
          );
          await getUserById(userId);
          navigate("/");
        }
      } catch (error) {
        openNotification(
          "error",
          "Registration Failed",
          error.response?.data?.message || "Something went wrong"
        );
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSaveDraft = () => {
    // Save draft logic would go here
    openNotification(
      "info",
      "Draft Saved",
      "Your progress has been saved as a draft."
    );
  };

  return (
    <Container className={`${styles.container} mt-5 ${styles.registerAdditional}`}>
      <Row className="justify-content-center">
        <Col>
          <div className={styles.registerForm}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Complete Your Company Profile</h2>
              <p className={styles.formSubtitle}>
                Provide your company details to help us verify your business and connect you with the right talent.
              </p>
            </div>

            <div className={styles.stepperContainer}>
              <Stepper activeStep={activeStep} className={styles.stepper}>
                <Step>
                  <StepLabel>Company Information</StepLabel>
                </Step>
              </Stepper>
              <LinearProgress
                variant="determinate"
                value={progress}
                className={styles.progressBar}
              />
            </div>

            <div className={styles.formContent}>
              <HirerCompanyStep
                companyName={companyName}
                setCompanyName={setCompanyName}
                description={description}
                setDescription={setDescription}
                contactLink={contactLink}
                setContactLink={setContactLink}
                logoFile={logoFile}
                setLogoFile={setLogoFile}
                logoPreview={logoPreview}
                setLogoPreview={setLogoPreview}
                registrationFile={registrationFile}
                setRegistrationFile={setRegistrationFile}
              />

              <div className={styles.navigationButtons}>
                <Button
                  variant="outline-primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={`${styles.backButton} d-flex align-items-center gap-2`}
                >
                  <ArrowBackIcon fontSize="small" /> Previous
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`${styles.nextButton} d-flex align-items-center gap-2`}
                >
                  <CheckIcon fontSize="small" /> Complete Registration
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HirerAdditionalRegistration; 