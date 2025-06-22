import React from "react"
import { useState } from "react";
import styles from "./style/UserProfile.module.css";
import { SummaryModal } from "../../components/ProfileModal/SummaryModal";
import { SkillsModal } from "../../components/ProfileModal/SkillsModal";
import { ExperienceModal } from "../../components/ProfileModal/ExperienceModal";
import { EducationModal } from "../../components/ProfileModal/EducationModal";
import { CertificateModal } from "../../components/ProfileModal/CertificateModal";
import { CustomSection } from "../../components/Section/CustomSection";

const UserProfile = () => {
    // State to track which modal is open
    const [activeModal, setActiveModal] = useState(null);

    // Sample data states
    const [summary, setSummary] = useState(
        "Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here..."
    );

    const [mainSkills, setMainSkills] = useState([
        "Full Stack Developer",
        "Game Developer",
        "React Developer",
        "Node.js Developer",
        "UI/UX Designer",
        "Database Administrator",
        "DevOps Engineer",
    ]);

    const [otherSkills, setOtherSkills] = useState([
        "Project Management",
        "Agile Methodology",
        "Technical Writing"
    ]);

    const [workExperiences, setWorkExperiences] = useState([
        {
            id: 1,
            position: "Designer",
            company: "Limbus Company",
            startDate: "07-25",
            endDate: "04-26",
            description:
                "Led the design and user experience strategy for Limbus Company's flagship product, ensuring a seamless and visually compelling interface.",
            projects: [
                {
                    id: 101,
                    name: "Community Management App",
                    position: "Designer",
                    time: "12-25 - 3-26",
                    description:
                        "Led the design and user experience strategy for Limbus Company's flagship product, ensuring a seamless and visually compelling interface.",
                },
                {
                    id: 102,
                    name: "Community Management App",
                    position: "Designer",
                    time: "12-25 - 3-26",
                    description:
                        "Led the design and user experience strategy for Limbus Company's flagship product, ensuring a seamless and visually compelling interface.",
                },
            ],
        },
        {
            id: 2,
            position: "Designer",
            company: "Limbus Company",
            startDate: "07-25",
            endDate: "Now",
            description:
                "Led the design and user experience strategy for Limbus Company's flagship product, ensuring a seamless and visually compelling interface.",
            projects: [],
        },
    ]);

    const [educations, setEducations] = useState([
        {
            id: 1,
            school: "FPT University",
            major: "Information technology",
            startDate: "09-2022",
            endDate: "Now",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        },
        {
            id: 2,
            school: "ABC High School",
            major: "",
            startDate: "09-2019",
            endDate: "06-2022",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        },
    ]);

    const [certificates, setCertificates] = useState([
        {
            id: 1,
            name: "IELTS",
            issuer: "British Council",
            issueDate: "12-2024",
            score: "8.5",
            verifiedBy: "IDP",
            description: "8.5 IDP",
        },
        {
            id: 2,
            name: "Lorem Ipsum",
            issuer: "Certificate",
            issueDate: "12-2024",
            score: "4.5",
            verifiedBy: "IDP",
            description: "",
        },
    ]);

    // Open modal with data
    const openModal = (modalName) => {
        setActiveModal(modalName);
    };

    // Close modal
    const closeModal = () => {
        setActiveModal(null);
    };

    // Update summary
    const updateSummary = (newSummary) => {
        setSummary(newSummary);
        closeModal();
    };

    // Update skills
    const updateSkills = (newMainSkills, newOtherSkills) => {
        setMainSkills(newMainSkills);
        setOtherSkills(newOtherSkills);
        closeModal();
    };

    // Update experiences
    const updateExperiences = (newExperiences) => {
        setWorkExperiences(newExperiences);
        closeModal();
    };

    // Update educations
    const updateEducations = (newEducations) => {
        setEducations(newEducations);
        closeModal();
    };

    // Update certificates
    const updateCertificates = (newCertificates) => {
        setCertificates(newCertificates);
        closeModal();
    };

    return (
        <div className={`container ${styles.profileContainer}`}>
            <div className="row">
                <div className="col-12">
                    {/* Summary Section */}
                    <CustomSection title="Summary" onEdit={() => openModal("summary")}>
                        <p className="text-muted small">{summary}</p>
                    </CustomSection>

                    {/* Skills Section */}
                    <CustomSection title="Skills" onEdit={() => openModal("skills")}>
                        <div className="mb-3">
                            <h6 className="mb-2">Main Skills</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {mainSkills.map((skill, index) => (
                                    <span key={index} className={`badge ${styles.skillBadge}`}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h6 className="mb-2">Other Skills</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {otherSkills.map((skill, index) => (
                                    <span key={index} className={`badge ${styles.skillBadge}`}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CustomSection>

                    {/* Work Experience Section */}
                    <CustomSection title="Work Experience" onEdit={() => openModal("experience")}>
                        {workExperiences.map((experience) => (
                            <div className="mb-4" key={experience.id}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mb-1">
                                            {experience.startDate} - {experience.endDate}
                                        </p>
                                    </div>
                                    <div className="col-md-9">
                                        <h6 className="mb-1">
                                            {experience.position} at {experience.company}
                                        </h6>
                                        <p className="text-muted small mb-2">{experience.description}</p>
                                        {experience.projects && experience.projects.length > 0 && (
                                            <div className="mt-2 mb-2">
                                                <h6 className="small">Projects:</h6>
                                                <ul className="list-unstyled ps-3">
                                                    {experience.projects.map((project) => (
                                                        <li key={project.id} className="small text-muted">
                                                            {project.name} ({project.time})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CustomSection>

                    {/* Education Section */}
                    <CustomSection title="Education" onEdit={() => openModal("education")}>
                        {educations.map((education) => (
                            <div className="mb-4" key={education.id}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mb-1">
                                            {education.startDate} - {education.endDate}
                                        </p>
                                    </div>
                                    <div className="col-md-9">
                                        <h6 className="mb-1">{education.school}</h6>
                                        {education.major && <p className="text-muted mb-1">{education.major}</p>}
                                        <p className="text-muted small">{education.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CustomSection>

                    {/* Certificate Section */}
                    <CustomSection title="Certificate" onEdit={() => openModal("certificate")}>
                        {certificates.map((certificate) => (
                            <div className="mb-3" key={certificate.id}>
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="mb-1">{certificate.issueDate}</p>
                                    </div>
                                    <div className="col-md-9">
                                        <h6 className="mb-1">{certificate.name}</h6>
                                        <p>{certificate.score}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CustomSection>
                </div>
            </div>

            {/* Modals */}
            {activeModal === "summary" && (
                <SummaryModal
                    onClose={closeModal}
                    summary={summary}
                    onSave={updateSummary}
                />
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
                <EducationModal
                    onClose={closeModal}
                    educations={educations}
                    onSave={updateEducations}
                />
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

export default UserProfile;
