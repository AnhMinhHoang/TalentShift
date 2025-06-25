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

const steps = ["Skills", "Experience", "Education", "Overview", "Profile"];

const skillsList = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Data Analysis",
  "Mobile Development",
  "UI/UX Design",
  "Digital Marketing",
  "Video Editing",
  "Project Management",
  "Software Testing",
];

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

  const { getUserById } = useAuth();

  // State for Skills step
  const [mainSkill, setMainSkill] = useState("");
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
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [phone, setPhone] = useState("");
  const [links, setLinks] = useState([{ url: "" }]);

  // Validation functions
  const isStep1Valid = () => mainSkill !== "";
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

        const skillsData = [
          { skillName: mainSkill, skillType: "MAIN" },
          ...additionalSkills.map(skill => ({ skillName: skill, skillType: "ADDITIONAL" }))
        ];
        const experiencesData = experiences.map(exp => ({
          jobPosition: exp.jobTitle,
          companyName: exp.companyName,
          startDate: exp.startDate ? exp.startDate.format('YYYY-MM-DD') : null,
          endDate: exp.endDate ? exp.endDate.format('YYYY-MM-DD') : null,
          currentlyWork: exp.isPresent,
          jobDescription: exp.description,
          projects: exp.projects.map(proj => ({
            projectName: proj.name,
            projectDescription: proj.description,
            projectTime: proj.time
          }))
        }));
        const educationData = educations.map(edu => ({
          schoolName: edu.institution,
          majorName: edu.degree,
          startDate: edu.startDate ? edu.startDate.format('YYYY-MM-DD') : null,
          endDate: edu.endDate ? edu.endDate.format('YYYY-MM-DD') : null,
          currentlyStudy: edu.isPresent,
          description: edu.description
        }));
        const linksData = links.filter(link => link.url.trim() !== "").map(link => ({ url: link.url }));

        // Convert avatar to Base64 if present
        let avatarBase64 = null;
        if (avatar) {
          avatarBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(avatar);
          });
        }

        const payload = {
          email,
          bio: overview,
          location: city,
          birthDate: birthday ? birthday.format('YYYY-MM-DD') : null,
          phone,
          avatar: avatarBase64,
          skills: skillsData,
          experiences: experiencesData,
          educations: educationData,
          certificates: [],
          links: linksData
        };

        const response = await axios.put(
            `http://localhost:8080/api/users/${userId}/freelancer`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
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

  const handleSaveDraft = () => {
    // Save draft logic would go here
    openNotification(
      "info",
      "Draft Saved",
      "Your progress has been saved as a draft."
    );
  };

  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setAvatar(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addLink = () => {
    setLinks([...links, { url: "" }]);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index, value) => {
    const newLinks = [...links];
    newLinks[index].url = value;
    setLinks(newLinks);
  };

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SkillsStep
            mainSkill={mainSkill}
            setMainSkill={setMainSkill}
            additionalSkills={additionalSkills}
            setAdditionalSkills={setAdditionalSkills}
            skillsList={skillsList}
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
                          className={`${styles.stepIcon} ${
                            index < activeStep
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
              <Button
                variant="outline-secondary"
                className={`${styles.saveDraftButton} d-flex align-items-center gap-2`}
                onClick={handleSaveDraft}
              >
                <SaveIcon fontSize="small" /> Save Draft
              </Button>

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
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterAdditional;
