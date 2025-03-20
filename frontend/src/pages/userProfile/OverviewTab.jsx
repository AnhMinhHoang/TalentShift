
import { useState } from "react"
import { X, Calendar, Plus, Edit, Trash, ChevronLeft } from "lucide-react"

const OverviewTab = () => {
    // State to track which modal is open
    const [activeModal, setActiveModal] = useState(null)
    // State to track if we're in add experience form
    const [showAddExperienceForm, setShowAddExperienceForm] = useState(false)
    // State to track which experience is being edited
    const [editingExperience, setEditingExperience] = useState(null)
    // State to track which project is being edited
    const [editingProject, setEditingProject] = useState(null)

    // Sample data
    const [summary, setSummary] = useState(
        "Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...Just a normal guy here...",
    )

    const [mainSkills, setMainSkills] = useState([
        "Full Stack Developer",
        "Game Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
        "Full Stack Developer",
    ])

    const [otherSkills, setOtherSkills] = useState(["Full Stack Developer", "Game Developer", "Full Stack Developer"])

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
    ])

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
    ])

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
    ])

    // Form data for editing
    const [formData, setFormData] = useState({ projectForm: false })

    // Open modal with data
    const openModal = (modalName) => {
        setActiveModal(modalName)
        setShowAddExperienceForm(false)
        setEditingExperience(null)
        setEditingProject(null)
    }

    // Close modal
    const closeModal = () => {
        setActiveModal(null)
        setShowAddExperienceForm(false)
        setEditingExperience(null)
        setEditingProject(null)
        setFormData({})
    }

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // Save summary
    const saveSummary = () => {
        setSummary(formData.summary)
        closeModal()
    }

    // Add new skill
    const addSkill = (type, skill) => {
        if (!skill.trim()) return

        if (type === "main") {
            setMainSkills([...mainSkills, skill])
        } else {
            setOtherSkills([...otherSkills, skill])
        }
    }

    // Remove skill
    const removeSkill = (type, index) => {
        if (type === "main") {
            const updatedSkills = [...mainSkills]
            updatedSkills.splice(index, 1)
            setMainSkills(updatedSkills)
        } else {
            const updatedSkills = [...otherSkills]
            updatedSkills.splice(index, 1)
            setOtherSkills(updatedSkills)
        }
    }

    // Edit experience
    const editExperience = (experience) => {
        setEditingExperience(experience)
        setShowAddExperienceForm(true)
        setFormData({
            id: experience.id,
            position: experience.position,
            company: experience.company,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
            isCurrentPosition: experience.endDate === "Now",
        })
    }

    // Save experience
    const saveExperience = () => {
        const updatedExperiences = [...workExperiences]
        const experienceData = {
            ...formData,
            endDate: formData.isCurrentPosition ? "Now" : formData.endDate,
            projects: editingExperience ? editingExperience.projects : formData.projects || [],
        }

        if (editingExperience) {
            const index = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id)
            if (index !== -1) {
                updatedExperiences[index] = experienceData
            }
        } else {
            experienceData.id = Date.now()
            experienceData.projects = formData.projects || []
            updatedExperiences.push(experienceData)
        }

        setWorkExperiences(updatedExperiences)
        setShowAddExperienceForm(false)
        setEditingExperience(null)
        setFormData({})
    }

    // Delete experience
    const deleteExperience = (id) => {
        const updatedExperiences = workExperiences.filter((exp) => exp.id !== id)
        setWorkExperiences(updatedExperiences)
    }

    // Edit project
    const editProject = (experience, project) => {
        setEditingExperience(experience)
        setEditingProject(project)
        setFormData({
            ...formData,
            projectForm: true,
            id: project.id,
            name: project.name,
            projectPosition: project.position,
            time: project.time,
            projectDescription: project.description,
        })
    }

    // Add project
    const addProject = () => {
        if (!formData.name || !formData.time) return

        const newProject = {
            id: editingProject ? editingProject.id : Date.now(),
            name: formData.name,
            position: formData.position || "",
            time: formData.time,
            description: formData.description || "",
        }

        const updatedExperiences = [...workExperiences]
        const expIndex = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id)

        if (expIndex !== -1) {
            if (editingProject) {
                const projIndex = updatedExperiences[expIndex].projects.findIndex((p) => p.id === editingProject.id)
                if (projIndex !== -1) {
                    updatedExperiences[expIndex].projects[projIndex] = newProject
                }
            } else {
                updatedExperiences[expIndex].projects.push(newProject)
            }
            setWorkExperiences(updatedExperiences)
        }

        setEditingProject(null)
        setFormData({})
    }

    // Delete project
    const deleteProject = (experienceId, projectId) => {
        const updatedExperiences = [...workExperiences]
        const expIndex = updatedExperiences.findIndex((exp) => exp.id === experienceId)

        if (expIndex !== -1) {
            updatedExperiences[expIndex].projects = updatedExperiences[expIndex].projects.filter((p) => p.id !== projectId)
            setWorkExperiences(updatedExperiences)
        }
    }

    // Add education
    const addEducation = () => {
        if (!formData.school || !formData.startDate || !formData.endDate) return

        const newEducation = {
            id: Date.now(),
            school: formData.school,
            major: formData.major || "",
            startDate: formData.startDate,
            endDate: formData.isCurrentlyStudying ? "Now" : formData.endDate,
            description: formData.description || "",
        }

        setEducations([...educations, newEducation])
        setFormData({})
    }

    // Edit education
    const editEducation = (education) => {
        setFormData({
            id: education.id,
            school: education.school,
            major: education.major,
            startDate: education.startDate,
            endDate: education.endDate,
            isCurrentlyStudying: education.endDate === "Now",
            description: education.description,
        })
    }

    // Save education
    const saveEducation = () => {
        if (!formData.school || !formData.startDate || (!formData.endDate && !formData.isCurrentlyStudying)) return

        const updatedEducations = [...educations]
        const educationData = {
            ...formData,
            endDate: formData.isCurrentlyStudying ? "Now" : formData.endDate,
        }

        if (formData.id) {
            const index = updatedEducations.findIndex((edu) => edu.id === formData.id)
            if (index !== -1) {
                updatedEducations[index] = educationData
            }
        } else {
            educationData.id = Date.now()
            updatedEducations.push(educationData)
        }

        setEducations(updatedEducations)
        setFormData({})
    }

    // Delete education
    const deleteEducation = (id) => {
        const updatedEducations = educations.filter((edu) => edu.id !== id)
        setEducations(updatedEducations)
    }

    // Add certificate
    const addCertificate = () => {
        if (!formData.name) return

        const newCertificate = {
            id: Date.now(),
            name: formData.name,
            issuer: formData.issuer || "",
            issueDate: formData.issueDate || "",
            score: formData.score || "",
            verifiedBy: formData.verifiedBy || "",
            description: formData.description || "",
        }

        setCertificates([...certificates, newCertificate])
        setFormData({})
    }

    // Edit certificate
    const editCertificate = (certificate) => {
        setFormData({
            id: certificate.id,
            name: certificate.name,
            issuer: certificate.issuer,
            issueDate: certificate.issueDate,
            score: certificate.score,
            verifiedBy: certificate.verifiedBy,
            description: certificate.description,
        })
    }

    // Save certificate
    const saveCertificate = () => {
        if (!formData.name) return

        const updatedCertificates = [...certificates]

        if (formData.id) {
            const index = updatedCertificates.findIndex((cert) => cert.id === formData.id)
            if (index !== -1) {
                updatedCertificates[index] = formData
            }
        } else {
            formData.id = Date.now()
            updatedCertificates.push(formData)
        }

        setCertificates(updatedCertificates)
        setFormData({})
    }

    // Delete certificate
    const deleteCertificate = (id) => {
        const updatedCertificates = certificates.filter((cert) => cert.id !== id)
        setCertificates(updatedCertificates)
    }

    return (
        <div>
            {/* Summary Section */}
            <Section title="Summary" onEdit={() => openModal("summary")}>
                <p className="text-muted small">{summary}</p>
            </Section>

            {/* Skills Section */}
            <Section title="Skill" onEdit={() => openModal("skills")}>
                <div className="mb-3">
                    <h6 className="mb-2">Main Skills</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {mainSkills.map((skill, index) => (
                            <span key={index} className="badge bg-light text-dark">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h6 className="mb-2">Other Skills</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {otherSkills.map((skill, index) => (
                            <span key={index} className="badge bg-light text-dark">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Work Experience Section */}
            <Section title="Work Experience" onEdit={() => openModal("experience")}>
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
                                {/* {experience.projects && experience.projects.length > 0 && (
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
                                )} */}
                            </div>
                        </div>
                    </div>
                ))}
            </Section>

            {/* Education Section */}
            <Section title="Education" onEdit={() => openModal("education")}>
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
            </Section>

            {/* Certificate Section */}
            <Section title="Certificate" onEdit={() => openModal("certificate")}>
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
            </Section>

            {/* Modals */}
            {/* Summary Modal */}
            {activeModal === "summary" && (
                <Modal title="Summary" onClose={closeModal}>
                    <div className="mb-3">
                        <label className="form-label">Provide detail information</label>
                        <textarea
                            className="form-control"
                            name="summary"
                            rows="5"
                            value={formData.summary || summary}
                            onChange={handleInputChange}
                            placeholder="Fill the blank..."
                        ></textarea>
                    </div>
                    <div className="text-end">
                        <button className="btn" style={{ backgroundColor: "#428A9B", color: "white" }} onClick={saveSummary}>
                            Save
                        </button>
                    </div>
                </Modal>
            )}

            {/* Skills Modal */}
            {activeModal === "skills" && (
                <Modal title="Skills" onClose={closeModal}>
                    <div className="mb-4">
                        <label className="form-label">Provide skills information</label>

                        <div className="mb-3">
                            <h6 className="mb-2">Main Skills</h6>
                            <div className="d-flex flex-wrap gap-2 p-2 border rounded mb-2">
                                {mainSkills.map((skill, index) => (
                                    <div key={index} className="badge bg-light text-dark d-flex align-items-center">
                                        {skill}
                                        <button className="btn btn-sm p-0 ms-1" onClick={() => removeSkill("main", index)}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" id="mainSkill" placeholder="Add skill..." />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => {
                                        const input = document.getElementById("mainSkill")
                                        addSkill("main", input.value)
                                        input.value = ""
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <h6 className="mb-2">Other Skills</h6>
                            <div className="d-flex flex-wrap gap-2 p-2 border rounded mb-2">
                                {otherSkills.map((skill, index) => (
                                    <div key={index} className="badge bg-light text-dark d-flex align-items-center">
                                        {skill}
                                        <button className="btn btn-sm p-0 ms-1" onClick={() => removeSkill("other", index)}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" id="otherSkill" placeholder="Add skill..." />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => {
                                        const input = document.getElementById("otherSkill")
                                        addSkill("other", input.value)
                                        input.value = ""
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <button className="btn" style={{ backgroundColor: "#428A9B", color: "white" }} onClick={closeModal}>
                            Save
                        </button>
                    </div>
                </Modal>
            )}

            {/* Experience Modal */}
            {activeModal === "experience" && !showAddExperienceForm && (
                <Modal title="Experience" onClose={closeModal}>
                    {workExperiences.map((experience) => (
                        <div key={experience.id} className="mb-3 p-3 bg-light rounded position-relative">
                            <div className="d-flex align-items-start">
                                <div className="me-1">
                                    <span className="d-flex align-items-center">
                                        <i className="bi bi-list"></i>
                                    </span>
                                </div>
                                <div className="me-auto">
                                    <div className="text-primary small">
                                        {experience.position} at {experience.company}
                                    </div>
                                    <div className="small">
                                        {experience.startDate} - {experience.endDate}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                        onClick={() => editExperience(experience)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0"
                                        onClick={() => deleteExperience(experience.id)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>

                            {experience.projects && experience.projects.length > 0 && (
                                <div className="mt-2">
                                    {experience.projects.map((project) => (
                                        <div key={project.id} className="d-flex align-items-center mt-2 ps-3 border-start">
                                            <div className="me-1">
                                                <i className="bi bi-list"></i>
                                            </div>
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <i className="bi bi-file-text me-2 small"></i>
                                                <div className="small">{project.name}</div>
                                                <div className="small text-muted ms-auto">{project.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="text-center mt-3">
                        <button
                            className="btn"
                            style={{ backgroundColor: "#428A9B", color: "white" }}
                            onClick={() => {
                                setShowAddExperienceForm(true)
                                setFormData({})
                            }}
                        >
                            Add new position
                        </button>
                    </div>
                </Modal>
            )}

            {/* Add Experience Form */}
            {activeModal === "experience" && showAddExperienceForm && (
                <Modal
                    title={
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-sm btn-link text-dark p-0 me-2"
                                onClick={() => {
                                    setShowAddExperienceForm(false)
                                    setEditingExperience(null)
                                    setFormData({})
                                }}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            {editingExperience ? `${editingExperience.position} at ${editingExperience.company}` : "Add Experience"}
                        </div>
                    }
                    onClose={closeModal}
                >
                    <div className="mb-3">
                        <label htmlFor="jobPosition" className="form-label">
                            Job Position <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="jobPosition"
                            name="position"
                            value={formData.position || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">
                            Company <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="company"
                            name="company"
                            value={formData.company || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="currentPosition"
                            checked={formData.isCurrentPosition || false}
                            onChange={(e) => {
                                setFormData({ ...formData, isCurrentPosition: e.target.checked })
                            }}
                        />
                        <label className="form-check-label" htmlFor="currentPosition">
                            I am working in this position
                        </label>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="fromDate" className="form-label">
                                From <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fromDate"
                                    name="startDate"
                                    placeholder="MM-YYYY"
                                    value={formData.startDate || ""}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="input-group-text">
                                    <Calendar size={16} />
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="toDate" className="form-label">
                                To <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="toDate"
                                    name="endDate"
                                    placeholder="MM-YYYY"
                                    value={formData.endDate || ""}
                                    onChange={handleInputChange}
                                    disabled={formData.isCurrentPosition}
                                    required
                                />
                                <span className="input-group-text">
                                    <Calendar size={16} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="form-text text-end">65 words</div>
                    </div>

                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="form-label mb-0">Project(s) in this position</label>
                            <small className="text-muted">
                                Keep private. If left blank, this section will not appear on your profile
                            </small>
                        </div>

                        {/* List of projects - show for both new and existing experiences */}
                        {((editingExperience && editingExperience.projects && editingExperience.projects.length > 0) ||
                            (!editingExperience && formData.projects && formData.projects.length > 0)) && (
                                <div className="mb-3">
                                    {editingExperience
                                        ? editingExperience.projects.map((project) => (
                                            <div key={project.id} className="d-flex align-items-center mb-2 p-2 bg-light rounded">
                                                <div className="me-1">
                                                    <i className="bi bi-list"></i>
                                                </div>
                                                <div className="me-auto">
                                                    <div className="small">{project.name}</div>
                                                    <div className="small text-muted">{project.time}</div>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                                        onClick={() => {
                                                            editProject(editingExperience, project)
                                                        }}
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-link text-muted p-0"
                                                        onClick={() => deleteProject(editingExperience.id, project.id)}
                                                    >
                                                        <Trash size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                        : formData.projects &&
                                        formData.projects.map((project) => (
                                            <div key={project.id} className="d-flex align-items-center mb-2 p-2 bg-light rounded">
                                                <div className="me-1">
                                                    <i className="bi bi-list"></i>
                                                </div>
                                                <div className="me-auto">
                                                    <div className="small">{project.name}</div>
                                                    <div className="small text-muted">{project.time}</div>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                                        onClick={() => {
                                                            setEditingProject(project)
                                                            setFormData({
                                                                ...formData,
                                                                projectForm: true,
                                                                name: project.name,
                                                                projectPosition: project.position,
                                                                time: project.time,
                                                                projectDescription: project.description,
                                                            })
                                                        }}
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-link text-muted p-0"
                                                        onClick={() => {
                                                            const updatedProjects = formData.projects.filter((p) => p.id !== project.id)
                                                            setFormData({ ...formData, projects: updatedProjects })
                                                        }}
                                                    >
                                                        <Trash size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                        {/* Add Project button */}
                        <button
                            className="btn btn-outline-secondary btn-sm d-flex align-items-center mx-auto"
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    projectForm: true,
                                    name: "",
                                    projectPosition: "",
                                    time: "",
                                    projectDescription: "",
                                })
                                setEditingProject(null)
                            }}
                        >
                            <Plus size={16} className="me-1" /> Add Project
                        </button>

                        {/* Project Form - appears below the Add Project button when clicked */}
                        {formData.projectForm && (
                            <div className="border p-3 rounded mt-3 mb-3 bg-white">
                                <div className="mb-3">
                                    <label htmlFor="projectName" className="form-label">
                                        Project Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="projectName"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="projectTime" className="form-label">
                                        Project Time <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="projectTime"
                                        name="time"
                                        placeholder="MM-DD - MM-DD"
                                        value={formData.time || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="projectDescription" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="projectDescription"
                                        name="projectDescription"
                                        rows="3"
                                        value={formData.projectDescription || ""}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setFormData({ ...formData, projectForm: false })
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: "#428A9B", color: "white" }}
                                        onClick={() => {
                                            if (!formData.name || !formData.time) return

                                            const newProject = {
                                                id: editingProject ? editingProject.id : Date.now(),
                                                name: formData.name,
                                                position: formData.projectPosition || "",
                                                time: formData.time,
                                                description: formData.projectDescription || "",
                                            }

                                            if (editingExperience) {
                                                const updatedExperiences = [...workExperiences]
                                                const expIndex = updatedExperiences.findIndex((exp) => exp.id === editingExperience.id)

                                                if (expIndex !== -1) {
                                                    if (editingProject) {
                                                        const projIndex = updatedExperiences[expIndex].projects.findIndex(
                                                            (p) => p.id === editingProject.id,
                                                        )
                                                        if (projIndex !== -1) {
                                                            updatedExperiences[expIndex].projects[projIndex] = newProject
                                                        }
                                                    } else {
                                                        updatedExperiences[expIndex].projects.push(newProject)
                                                    }
                                                    setWorkExperiences(updatedExperiences)
                                                }
                                            } else {
                                                // If we're adding a new experience, store the project in formData
                                                if (!formData.projects) {
                                                    formData.projects = []
                                                }

                                                if (editingProject) {
                                                    // If editing an existing project in a new experience
                                                    const projIndex = formData.projects.findIndex((p) => p.id === editingProject.id)
                                                    if (projIndex !== -1) {
                                                        const updatedProjects = [...formData.projects]
                                                        updatedProjects[projIndex] = newProject
                                                        setFormData({
                                                            ...formData,
                                                            projects: updatedProjects,
                                                            projectForm: false,
                                                            name: "",
                                                            projectPosition: "",
                                                            time: "",
                                                            projectDescription: "",
                                                        })
                                                    }
                                                } else {
                                                    // If adding a new project to a new experience
                                                    setFormData({
                                                        ...formData,
                                                        projects: [...(formData.projects || []), newProject],
                                                        projectForm: false,
                                                        name: "",
                                                        projectPosition: "",
                                                        time: "",
                                                        projectDescription: "",
                                                    })
                                                }
                                            }

                                            setEditingProject(null)
                                        }}
                                    >
                                        Save Project
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setShowAddExperienceForm(false)
                                setEditingExperience(null)
                                setFormData({})
                            }}
                        >
                            Cancel
                        </button>
                        <button className="btn" style={{ backgroundColor: "#428A9B", color: "white" }} onClick={saveExperience}>
                            Save Position
                        </button>
                    </div>
                </Modal>
            )}

            {/* Education Modal */}
            {activeModal === "education" && (
                <Modal title="Education" onClose={closeModal}>
                    {educations.map((education) => (
                        <div key={education.id} className="mb-3 p-3 bg-light rounded position-relative">
                            <div className="d-flex align-items-start">
                                <div className="me-auto">
                                    <div className="fw-medium">{education.school}</div>
                                    <div className="small">{education.major}</div>
                                    <div className="small text-muted">
                                        {education.startDate} - {education.endDate}
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-link text-muted p-0 me-2" onClick={() => editEducation(education)}>
                                        <Edit size={16} />
                                    </button>
                                    <button className="btn btn-sm btn-link text-muted p-0" onClick={() => deleteEducation(education.id)}>
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="schoolName" className="form-label">
                                School Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="schoolName"
                                name="school"
                                value={formData.school || ""}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="major" className="form-label">
                                Major
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="major"
                                name="major"
                                placeholder="Add if you have"
                                value={formData.major || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="currentlyStudying"
                                checked={formData.isCurrentlyStudying || false}
                                onChange={(e) => {
                                    setFormData({ ...formData, isCurrentlyStudying: e.target.checked })
                                }}
                            />
                            <label className="form-check-label" htmlFor="currentlyStudying">
                                I'm currently study here
                            </label>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="startDate" className="form-label">
                                    Start Date <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="startDate"
                                        name="startDate"
                                        placeholder="MM-YYYY"
                                        value={formData.startDate || ""}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span className="input-group-text">
                                        <Calendar size={16} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="endDate" className="form-label">
                                    End Date <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endDate"
                                        name="endDate"
                                        placeholder="MM-YYYY"
                                        value={formData.endDate || ""}
                                        onChange={handleInputChange}
                                        disabled={formData.isCurrentlyStudying}
                                        required
                                    />
                                    <span className="input-group-text">
                                        <Calendar size={16} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="eduDescription" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="eduDescription"
                                name="description"
                                rows="3"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                placeholder="Description"
                            ></textarea>

                        </div>

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-secondary" onClick={() => setFormData({})}>
                                Cancel
                            </button>
                            <button className="btn" style={{ backgroundColor: "#428A9B", color: "white" }} onClick={saveEducation}>
                                Save Education
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button className="btn btn-outline-secondary" onClick={() => setFormData({})}>
                            <Plus size={16} className="me-1" /> Add Education
                        </button>
                    </div>
                </Modal>
            )}

            {/* Certificate Modal */}
            {activeModal === "certificate" && (
                <Modal title="Certificate" onClose={closeModal}>
                    {certificates.map((certificate) => (
                        <div key={certificate.id} className="mb-3 p-3 bg-light rounded position-relative">
                            <div className="d-flex align-items-start">
                                <div className="me-auto">
                                    <div className="fw-medium">{certificate.name}</div>
                                    <div className="small text-muted">{certificate.issuer}</div>
                                    <div className="small text-muted">{certificate.issueDate}</div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0 me-2"
                                        onClick={() => editCertificate(certificate)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-link text-muted p-0"
                                        onClick={() => deleteCertificate(certificate.id)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="program" className="form-label">
                                Program/ Course
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="program"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="achievement" className="form-label">
                                Achievement
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="achievement"
                                name="score"
                                value={formData.score || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="issuedDate" className="form-label">
                                    Issued Date
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="issuedDate"
                                        name="issueDate"
                                        placeholder="MM-YYYY"
                                        value={formData.issueDate || ""}
                                        onChange={handleInputChange}
                                    />
                                    <span className="input-group-text">
                                        <Calendar size={16} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="verifiedBy" className="form-label">
                                    Verified by
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="verifiedBy"
                                    name="verifiedBy"
                                    value={formData.verifiedBy || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="certDescription" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="certDescription"
                                name="description"
                                rows="3"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                            ></textarea>
                            <div className="form-text text-end">65 words</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-secondary" onClick={() => setFormData({})}>
                                Cancel
                            </button>
                            <button className="btn" style={{ backgroundColor: "#428A9B", color: "white" }} onClick={saveCertificate}>
                                Save Certificate
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button className="btn btn-outline-secondary" onClick={() => setFormData({})}>
                            <Plus size={16} className="me-1" /> Add Certification
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

// Section component
const Section = ({ title, children, onEdit }) => {
    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>{title}</h5>
                <button className="btn btn-link text-muted p-0" onClick={onEdit}>
                    <Edit size={16} />
                </button>
            </div>
            <hr className="mt-0 mb-3" />
            <div>{children}</div>
        </div>
    )
}

// Modal component
const Modal = ({ title, children, onClose }) => {
    return (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab

