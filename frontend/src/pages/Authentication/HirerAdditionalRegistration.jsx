import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Stepper, Step, StepLabel, LinearProgress } from "@mui/material";
import { notification } from "antd";
import Cropper from "react-easy-crop";
import {
  CloudUpload as CloudUploadIcon,
  Business as BusinessIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
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

  // State for image cropping
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Notification handler
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

  // Logo handler with validation
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        openNotification(
          "warning",
          "Invalid file type",
          "Please select an image file (JPG, PNG, GIF)"
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        openNotification(
          "warning",
          "File too large",
          "Please select an image smaller than 5MB"
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate cropped image
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;
    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(
          pixelCrop.width / 2,
          pixelCrop.height / 2,
          pixelCrop.width / 2,
          0,
          2 * Math.PI
        );
        ctx.clip();
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  // Set cropped image
  const handleSetCroppedImage = async () => {
    if (selectedImage && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
      setLogoPreview(croppedImage);
      // Convert Base64 to File object for FormData
      const byteString = atob(croppedImage.split(",")[1]);
      const mimeString = croppedImage.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "logo.jpg", { type: mimeString });
      setLogoFile(file);
      setShowCropModal(false);
      setSelectedImage(null);
    }
  };

  // Registration file handler
  const handleRegistrationFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.includes("pdf")) {
        openNotification(
          "warning",
          "Invalid file type",
          "Please select a PDF file"
        );
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        openNotification(
          "warning",
          "File too large",
          "Please select a file smaller than 10MB"
        );
        return;
      }
      setRegistrationFile(file);
    }
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

      // Validate logo file
      if (logoFile) {
        if (!logoFile.type.startsWith("image/")) {
          openNotification(
            "error",
            "Invalid Logo Type",
            "Please upload an image file (JPG, PNG, GIF)"
          );
          return;
        }
        if (logoFile.size > 5 * 1024 * 1024) {
          openNotification(
            "error",
            "Logo Too Large",
            "Please upload an image smaller than 5MB"
          );
          return;
        }
      }

      try {
        const formData = new FormData();
        formData.append("companyName", companyName);
        formData.append("description", description);
        formData.append("contactLink", contactLink);
        if (logoFile) {
          formData.append("companyLogo", logoFile, "logo.jpg");
        }
        formData.append("companyRegistrationFile", registrationFile);

        console.log("FormData contents:");
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
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
          `http://localhost:8080/api/hirers/${userId}/hirer`,
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
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>
                  <span className={styles.stepNumber}>01</span> Company Information
                </h4>
                <p className={styles.stepDescription}>
                  Provide your company details to verify your business and connect with talent.
                </p>

                <div className={styles.profileContainer}>
                  <div className={styles.avatarUploadContainer}>
                    <div
                      className={styles.avatarPreview}
                      style={{
                        backgroundImage: logoPreview ? `url(${logoPreview})` : "none",
                      }}
                    >
                      {!logoPreview && (companyName ? companyName.charAt(0).toUpperCase() : "C")}
                    </div>
                    <Button
                      variant="outline-primary"
                      className={`${styles.uploadAvatarButton} d-flex align-items-center gap-2 mt-3`}
                      as="label"
                    >
                      <CloudUploadIcon fontSize="small" /> Upload Company Logo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </Button>
                    <p className={styles.avatarHelpText}>
                      A professional logo helps establish your brand identity.
                    </p>
                  </div>

                  <div className={styles.profileFormContainer}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label className={styles.formLabel}>
                          <BusinessIcon fontSize="small" className="me-2" />
                          Company Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className={styles.formControl}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className={styles.formLabel}>
                          <DescriptionIcon fontSize="small" className="me-2" />
                          Description <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe your company..."
                          className={styles.formControl}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className={styles.formLabel}>
                          <LinkIcon fontSize="small" className="me-2" />
                          Contact Link <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={contactLink}
                          onChange={(e) => setContactLink(e.target.value)}
                          placeholder="e.g. https://yourcompany.com"
                          className={styles.formControl}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className={styles.formLabel}>
                          <DescriptionIcon fontSize="small" className="me-2" />
                          Registration Document <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="file"
                          accept="application/pdf"
                          onChange={handleRegistrationFileChange}
                          className={styles.formControl}
                          required
                        />
                        <p className={styles.avatarHelpText}>
                          Upload a PDF of your business registration document (max 10MB).
                        </p>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>

              <div className={styles.navigationButtons}>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`${styles.nextButton} d-flex align-items-end gap-2 ms-auto`}
                >
                  <CheckIcon fontSize="small" /> Complete Registration
                </Button>
              </div>
            </div>

            {showCropModal && (
              <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1051 }}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Crop Logo</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setShowCropModal(false);
                          setSelectedImage(null);
                        }}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div style={{ position: "relative", width: "100%", height: 400 }}>
                        <Cropper
                          image={selectedImage}
                          crop={crop}
                          zoom={zoom}
                          aspect={1}
                          cropShape="round"
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={(croppedArea, croppedAreaPixels) =>
                            setCroppedAreaPixels(croppedAreaPixels)
                          }
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowCropModal(false);
                          setSelectedImage(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSetCroppedImage}
                      >
                        Set Cropped Logo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HirerAdditionalRegistration;