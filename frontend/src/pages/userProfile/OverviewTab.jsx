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
import { notification } from "antd";
import api from "../../services/api";

const OverviewTab = ({ userData, setUserData }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [summary, setSummary] = useState("");
    const [mainSkills, setMainSkills] = useState([]);
    const [otherSkills, setOtherSkills] = useState([]);
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const openNotification = (type, message, placement, description) => {
        notification[type]({
            message,
            description,
            placement,
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
        });
    };

    const formatDateArray = ([year, month, day]) => {
        const formattedMonth = String(month).padStart(2, "0");
        const formattedDay = String(day).padStart(2, "0");
        return `${year}-${formattedMonth}-${formattedDay}`;
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
                jobPosition: exp.jobPosition,
                companyName: exp.companyName,
                startDate: Array.isArray(exp.startDate) ? formatDateArray(exp.startDate) : exp.startDate, // Keep original format
                endDate: exp.currentlyWork ? "Now" : Array.isArray(exp.endDate) ? formatDateArray(exp.endDate) : exp.endDate, // Keep "Now" or original format
                jobDescription: exp.jobDescription,
                projects: exp.projects.map((proj) => ({
                    id: proj.projectId,
                    name: proj.projectName,
                    time: proj.projectTime,
                    projectDescription: proj.projectDescription,
                })),
            }));
            setWorkExperiences(experiences);

            // Educations
            const educations = userData.educations.map((edu) => ({
                id: edu.educationId,
                school: edu.schoolName,
                major: edu.majorName,
                startDate: Array.isArray(edu.startDate) ? formatDateArray(edu.startDate) : edu.startDate, // Keep original format
                endDate: edu.currentlyWork ? "Now" : Array.isArray(edu.endDate) ? formatDateArray(edu.endDate) : edu.endDate, // Keep "Now" or original format
                description: edu.description,
            }));
            setEducations(educations);

            // Certificates
            const certificates = userData.certificates.map((cert) => ({
                id: cert.certificateId,
                name: cert.certificateName,
                issueDate: Array.isArray(cert.certificateDate) ? formatDateArray(cert.certificateDate) : cert.certificateDate, // Keep original format
                score: cert.achievement,
                description: cert.certificateDescription,
            }));
            setCertificates(certificates);
        }
    }, [userData]);

    // Modal handlers
    const openModal = (modalName) => setActiveModal(modalName);
    const closeModal = () => setActiveModal(null);

    const updateBio = async (newSummary) => {
        try {
            const response = await api.put(`/freelancers/bio/${userData.userId}`, newSummary, {
                headers: { 'Content-Type': 'text/plain' }
            });
            setUserData(response.data);
            openNotification("success", "Bio Updated", "topRight", "Your bio has been updated successfully.");
            closeModal();
            return response.data;
        } catch (error) {
            console.error("Error updating bio:", error);
            openNotification("error", "Update Failed", "topRight", "There was an error updating your bio.");
        }
    };

    const updateSkills = async (newSkills) => {
        try {
            const payload = newSkills.map((skill) => ({
                skillName: skill,
            }));

            const response = await api.put(`/freelancers/skills/${userData.userId}`, payload);
            setUserData(response.data);
            openNotification("success", "Skills Updated", "topRight", "Your skills have been updated successfully.");
            closeModal();
            return response.data;
        } catch (error) {
            console.error("Error updating skills:", error);
            openNotification("error", "Update Failed", "topRight", "There was an error updating your skills.");
        }
    };

    const updateExperiences = async (newExperiences) => {
        try {
            const payload = newExperiences.map((exp) => ({
                jobPosition: exp.jobPosition,
                companyName: exp.companyName,
                startDate: exp.startDate,
                endDate: exp.endDate === "Now" ? null : exp.endDate,
                currentlyWork: exp.endDate === "Now",
                jobDescription: exp.jobDescription,
                projects: exp.projects || [],
            }));

            const response = await api.put(`/freelancers/experience/${userData.userId}`, payload);
            setUserData(response.data);
            openNotification("success", "Experience Updated", "topRight", "Your experience has been updated successfully.");
            closeModal();
            return response.data;
        } catch (error) {
            console.error("Error updating experiences:", error);
            openNotification("error", "Update Failed", "topRight", "There was an error updating your experiences.");
        }
    };

    const updateEducations = async (newEducations) => {
        try {
            const payload = newEducations.map((edu) => ({
                schoolName: edu.school,
                majorName: edu.major,
                startDate: edu.startDate, // Use original format
                endDate: edu.endDate === "Now" ? null : edu.endDate,
                currentlyStudy: edu.endDate === "Now",
                description: edu.description,
            }));

            const response = await api.put(`/freelancers/education/${userData.userId}`, payload);
            setUserData(response.data);
            openNotification("success", "Education Updated", "topRight", "Your education has been updated successfully.");
            closeModal();
        } catch (error) {
            console.error("Failed to update educations:", error);
            openNotification("error", "Update Failed", "topRight", "There was an error updating your educations.");
        }
    };

    const updateCertificates = (newCertificates) => {
        const payload = newCertificates.map((cert) => ({
            certificateName: cert.name,
            certificateDate: cert.issueDate, // Use original format
            achievement: cert.score,
            certificateDescription: cert.description,
        }));

        api.put(`/freelancers/certification/${userData.userId}`, payload)
            .then((response) => {
                setUserData(response.data);
                openNotification("success", "Certificates Updated", "topRight", "Your certificates have been updated successfully.");
                closeModal();
            })
            .catch((error) => {
                console.error("Failed to update certificates:", error);
                openNotification("error", "Update Failed", "topRight", "There was an error updating your certificates.");
            });
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
                    <ExperienceSection workExperiences={workExperiences} onEdit={() => openModal("experience")} />
                    <EducationSection educations={educations} onEdit={() => openModal("education")} />
                    <CertificateSection certificates={certificates} onEdit={() => openModal("certificate")} />
                </div>
            </div>

            {activeModal === "summary" && (
                <SummaryModal onClose={closeModal} summary={summary} onSave={updateBio} />
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