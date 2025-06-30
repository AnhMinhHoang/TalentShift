import React, { useEffect, useState } from "react";
import styles from "./style/UserProfile.module.css";
import { SummaryModal } from "../../components/ProfileModal/SummaryModal";
import { SkillsModal } from "../../components/ProfileModal/SkillsModal";
import { ExperienceModal } from "../../components/ProfileModal/ExperienceModal";
import { EducationModal } from "../../components/ProfileModal/EducationModal";
import { CertificateModal } from "../../components/ProfileModal/CertificateModal";
import { SummarySection } from "./OverviewComponent/SummarySection";
import { SkillsSection } from "./OverviewComponent/SkillsSection";
import { ExperienceSection } from "./OverviewComponent/ExperienceSection";
import { EducationSection } from "./OverviewComponent/EducationSection";
import { CertificateSection } from "./OverviewComponent/CertificateSection";

const OverviewTab = ({ userData, setUserData }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [summary, setSummary] = useState("");
    const [mainSkills, setMainSkills] = useState([]);
    const [otherSkills, setOtherSkills] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [certificates, setCertificates] = useState([]);

    // Function to format dates from "YYYY-MM-DD" to "MM-YY"
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);
        return `${month}-${year}`;
    };

    // Sync state with userData when it changes
    useEffect(() => {
        if (userData) {
            // Summary
            setSummary(userData.bio || "");

            // Skills: Separate into main and other skills based on skillType
            const mainSkills = userData.skills
                .filter((skill) => skill.skillType === "MAIN")
                .map((skill) => skill.skillName);
            const otherSkills = userData.skills
                .filter((skill) => skill.skillType === "ADDITIONAL")
                .map((skill) => skill.skillName);
            setMainSkills(mainSkills);
            setOtherSkills(otherSkills);

            // Experiences
            const experiences = userData.experiences.map((exp) => ({
                id: exp.expId,
                position: exp.jobPosition,
                company: exp.companyName,
                startDate: formatDate(exp.startDate),
                endDate: exp.currentlyWork ? "Now" : formatDate(exp.endDate),
                description: exp.jobDescription,
                projects: exp.projects.map((proj) => ({
                    id: proj.projectId,
                    name: proj.projectName,
                    time: proj.projectTime,
                    description: proj.projectDescription,
                })),
            }));
            setWorkExperiences(experiences);

            // Educations
            const educations = userData.educations.map((edu) => ({
                id: edu.educationId,
                school: edu.schoolName,
                major: edu.majorName,
                startDate: formatDate(edu.startDate),
                endDate: edu.currentlyStudy ? "Now" : formatDate(edu.endDate),
                description: edu.description,
            }));
            setEducations(educations);

            // Certificates
            const certificates = userData.certificates.map((cert) => ({
                id: cert.certificateId,
                name: cert.certificateName,
                issueDate: formatDate(cert.certificateDate),
                score: cert.achievement,
                description: cert.certificateDescription,
            }));
            setCertificates(certificates);
        }
    }, [userData]);

    // Modal handlers
    const openModal = (modalName) => setActiveModal(modalName);
    const closeModal = () => setActiveModal(null);

    const updateSummary = (newSummary) => {
        setSummary(newSummary);
        closeModal();
    };

    const updateSkills = (newMainSkills, newOtherSkills) => {
        setMainSkills(newMainSkills);
        setOtherSkills(newOtherSkills);
        closeModal();
    };

    const updateExperiences = (newExperiences) => {
        setWorkExperiences(newExperiences);
        closeModal();
    };

    const updateEducations = (newEducations) => {
        setEducations(newEducations);
        closeModal();
    };

    const updateCertificates = (newCertificates) => {
        setCertificates(newCertificates);
        closeModal();
    };

    return (
        <div className={`container ${styles.profileContainer}`}>
            <div className="row">
                <div className="col-12">
                    <SummarySection summary={summary} onEdit={() => openModal("summary")} />
                    <SkillsSection
                        mainSkills={mainSkills}
                        otherSkills={otherSkills}
                        onEdit={() => openModal("skills")}
                        styles={styles}
                    />
                    <ExperienceSection
                        workExperiences={workExperiences}
                        onEdit={() => openModal("experience")}
                    />
                    <EducationSection educations={educations} onEdit={() => openModal("education")} />
                    <CertificateSection
                        certificates={certificates}
                        onEdit={() => openModal("certificate")}
                    />
                </div>
            </div>

            {activeModal === "summary" && (
                <SummaryModal onClose={closeModal} summary={summary} onSave={updateSummary} />
            )}
            {activeModal === "skills" && (
                <SkillsModal
                    onClose={closeModal}
                    mainSkills={mainSkills}
                    otherSkills={otherSkills}
                    onSave={updateSkills}
                />
            )}
            {activeModal === "experience" && (
                <ExperienceModal
                    onClose={closeModal}
                    experiences={workExperiences}
                    onSave={updateExperiences}
                />
            )}
            {activeModal === "education" && (
                <EducationModal onClose={closeModal} educations={educations} onSave={updateEducations} />
            )}
            {activeModal === "certificate" && (
                <CertificateModal
                    onClose={closeModal}
                    certificates={certificates}
                    onSave={updateCertificates}
                />
            )}
        </div>
    );
};

export default OverviewTab;