import { useState } from "react";
import { Stepper, Step, StepLabel, LinearProgress } from "@mui/material";
import { notification } from "antd";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import SkillsStep from "./components/SkillsStep";
import ExperienceStep from "./components/ExperienceStep";
import EducationStep from "./components/EducationStep";
import OverviewStep from "./components/OverviewStep";
import ProfileStep from "./components/ProfileStep";
import styles from "./styles/RegisterAdditional.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import api from "../../services/api";
import Loading from '../../components/Loading/Loading.jsx';

const steps = ["Skills", "Experience", "Education", "Overview", "Profile"];

const socialPlatforms = [
  "GitHub",
  "LinkedIn",
  "Twitter",
  "Dribbble",
  "Behance",
  "Portfolio",
  "Medium",
  "Stack Overflow",
  "Other",
];



const RegisterAdditional = () => {
  // State for active step
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { getUserById, userData } = useAuth();

  // State for Skills step
  const [mainSkills, setMainSkills] = useState([]);
  const [additionalSkills, setAdditionalSkills] = useState([]);

  // State for Experience step
  const [experiences, setExperiences] = useState([]);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    companyName: "",
    startDate: null,
    endDate: null,
    isPresent: false,
    description: "",
    projects: [],
  });
  const [currentProject, setCurrentProject] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(null);

  // State for Education step
  const [educations, setEducations] = useState([]);
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    institution: "",
    startDate: null,
    endDate: null,
    isPresent: false,
    description: "",
  });
  const [currentEducationIndex, setCurrentEducationIndex] = useState(null);

  // State for Overview step
  const [overview, setOverview] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // State for Profile step
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fullName, setFullName] = useState(userData?.fullName || "");
  const [city, setCity] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [phone, setPhone] = useState("");
  const [links, setLinks] = useState(["", "", "", ""]);

  // Validation functions
  const isStep1Valid = () => mainSkills.length > 0;
  const isStep2Valid = () => true; // Optional step
  const isStep3Valid = () => true; // Optional step
  const isStep4Valid = () => wordCount >= 100;
  const isStep5Valid = () => fullName !== "" && city !== "";

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return isStep1Valid();
      case 1:
        return isStep2Valid();
      case 2:
        return isStep3Valid();
      case 3:
        return isStep4Valid();
      case 4:
        return isStep5Valid();
      default:
        return false;
    }
  };

  // Calculate progress
  const calculateProgress = () => {
    let completedSteps = 0;
    if (isStep1Valid()) completedSteps++;
    if (experiences.length > 0) completedSteps++;
    if (educations.length > 0) completedSteps++;
    if (isStep4Valid()) completedSteps++;
    if (isStep5Valid()) completedSteps++;

    return (completedSteps / 5) * 100;
  };

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

  const navigate = useNavigate();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setIsLoading(true);
      try {
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

        // Safely map skills, defaulting to empty array if not an array
        const skillsData = [
          ...(Array.isArray(mainSkills) ? mainSkills.map((skill) => ({ skillName: skill, skillType: "MAIN" })) : []),
          ...(Array.isArray(additionalSkills) ? additionalSkills.map((skill) => ({ skillName: skill, skillType: "ADDITIONAL" })) : []),
        ];

        const experiencesData = experiences.map(exp => ({
          jobPosition: exp.jobTitle || '',
          companyName: exp.companyName || '',
          startDate: exp.startDate || null,
          endDate: exp.endDate || null,
          currentlyWork: exp.isPresent || false,
          jobDescription: exp.description || '',
          projects: (Array.isArray(exp.projects) ? exp.projects : []).map(proj => ({
            projectName: proj.name || '',
            projectDescription: proj.description || '',
            projectTime: proj.time || ''
          }))
        }));

        const educationData = educations.map(edu => ({
          schoolName: edu.institution || '',
          majorName: edu.degree || '',
          startDate: edu.startDate || null,
          endDate: edu.endDate || null,
          currentlyStudy: edu.isPresent || false,
          description: edu.description || ''
        }));

        const linksData = links
          .map((url) => {
            if (!url || url.trim() === "") return null;
            let formattedUrl = url.trim();
            if (!formattedUrl.match(/^https?:\/\//)) {
              formattedUrl = "https://" + formattedUrl;
            }
            return { url: formattedUrl };
          })
          .filter((link) => link !== null);

        // Create FormData for payload
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("bio", overview);
        formData.append("location", city);
        formData.append("birthDate", birthday ? birthday.format('YYYY-MM-DD') : '');
        formData.append("phone", phone);
        if (avatar) {
          formData.append("avatarFile", avatar, "avatar.jpg");
        }
        skillsData.forEach((skill, index) => {
          formData.append(`skills[${index}].skillName`, skill.skillName);
          formData.append(`skills[${index}].skillType`, skill.skillType);
        });
        experiencesData.forEach((exp, index) => {
          formData.append(`experiences[${index}].jobPosition`, exp.jobPosition);
          formData.append(`experiences[${index}].companyName`, exp.companyName);
          formData.append(`experiences[${index}].startDate`, exp.startDate || '');
          formData.append(`experiences[${index}].endDate`, exp.endDate || '');
          formData.append(`experiences[${index}].currentlyWork`, exp.currentlyWork);
          formData.append(`experiences[${index}].jobDescription`, exp.jobDescription);
          exp.projects.forEach((proj, projIndex) => {
            formData.append(`experiences[${index}].projects[${projIndex}].projectName`, proj.projectName);
            formData.append(`experiences[${index}].projects[${projIndex}].projectDescription`, proj.projectDescription);
            formData.append(`experiences[${index}].projects[${projIndex}].projectTime`, proj.projectTime);
          });
        });
        educationData.forEach((edu, index) => {
          formData.append(`educations[${index}].schoolName`, edu.schoolName);
          formData.append(`educations[${index}].majorName`, edu.majorName);
          formData.append(`educations[${index}].startDate`, edu.startDate || '');
          formData.append(`educations[${index}].endDate`, edu.endDate || '');
          formData.append(`educations[${index}].currentlyStudy`, edu.currentlyStudy);
          formData.append(`educations[${index}].description`, edu.description);
        });
        linksData.forEach((link, index) => {
          formData.append(`links[${index}].url`, link.url);
        });

        const response = await api.put(
          `/freelancers/${userId}/freelancer`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          openNotification("success", "Profile Completed", "Your profile has been successfully completed!");
          await getUserById(userId);
          navigate("/");
        }
      } catch (error) {
        console.error('Registration error:', error.response?.data);
        openNotification("error", "Registration Failed", error.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
      setProgress(calculateProgress());
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSkip = () => {
    if (activeStep === 1 || activeStep === 2) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SkillsStep
            mainSkills={mainSkills}
            setMainSkills={setMainSkills}
            additionalSkills={additionalSkills}
            setAdditionalSkills={setAdditionalSkills}
          />
        );
      case 1:
        return (
          <ExperienceStep
            experiences={experiences}
            setExperiences={setExperiences}
            experienceModalOpen={experienceModalOpen}
            setExperienceModalOpen={setExperienceModalOpen}
            projectModalOpen={projectModalOpen}
            setProjectModalOpen={setProjectModalOpen}
            currentExperience={currentExperience}
            setCurrentExperience={setCurrentExperience}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            currentExperienceIndex={currentExperienceIndex}
            setCurrentExperienceIndex={setCurrentExperienceIndex}
            handleSkip={handleSkip}
            calculateProgress={calculateProgress}
            setProgress={setProgress}
            showSkipButton={experiences.length === 0}
          />
        );
      case 2:
        return (
          <EducationStep
            educations={educations}
            setEducations={setEducations}
            educationModalOpen={educationModalOpen}
            setEducationModalOpen={setEducationModalOpen}
            currentEducation={currentEducation}
            setCurrentEducation={setCurrentEducation}
            currentEducationIndex={currentEducationIndex}
            setCurrentEducationIndex={setCurrentEducationIndex}
            handleSkip={handleSkip}
            calculateProgress={calculateProgress}
            setProgress={setProgress}
            showSkipButton={educations.length === 0}
          />
        );
      case 3:
        return (
          <OverviewStep
            overview={overview}
            setOverview={setOverview}
            wordCount={wordCount}
            setWordCount={setWordCount}
          />
        );
      case 4:
        return (
          <ProfileStep
            avatar={avatar}
            setAvatar={setAvatar}
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
            fullName={fullName}
            setFullName={setFullName}
            city={city}
            setCity={setCity}
            birthday={birthday}
            setBirthday={setBirthday}
            phone={phone}
            setPhone={setPhone}
            links={links}
            setLinks={setLinks}
            socialPlatforms={socialPlatforms}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Container
        className={`${styles.container} mt-5 ${styles.registerAdditional}`}
      >
        <Row className="justify-content-center">
          <Col>
            <div className={styles.registerForm}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Complete Your Profile</h2>
                <p className={styles.formSubtitle}>
                  Enhance your profile to stand out to potential clients and
                  increase your chances of getting hired.
                </p>
              </div>

              <div className={styles.stepperContainer}>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  className={styles.stepper}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        icon={
                          <span
                            className={`${styles.stepIcon} ${index < activeStep
                              ? styles.completedStep
                              : index === activeStep
                                ? styles.activeStep
                                : ""
                              }`}
                          >
                            {index < activeStep ? "✔" : index + 1}
                          </span>
                        }
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>
                  Profile Completion: {Math.round(progress)}%
                </div>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  className={styles.progressBar}
                />
              </div>

              <div className={styles.stepContainer}>
                {getStepContent(activeStep)}
              </div>

              <div className={styles.navigationContainer}>
                <div className={styles.navigationButtons} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Button
                      variant="outline-primary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={`${styles.backButton} d-flex align-items-center gap-2`}
                    >
                      <ArrowBackIcon fontSize="small" /> Previous
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={!isStepValid(activeStep)}
                      className={`${styles.nextButton} d-flex align-items-center gap-2`}
                    >
                      {activeStep === steps.length - 1 ? (
                        <>
                          <CheckIcon fontSize="small" /> Finish
                        </>
                      ) : (
                        <>
                          Next <ArrowForwardIcon fontSize="small" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterAdditional;
