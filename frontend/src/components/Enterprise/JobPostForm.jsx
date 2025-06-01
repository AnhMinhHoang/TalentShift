import React from "react"
import { useState, useEffect } from "react"
import styles from "./JobPostForm.module.css"

const JobPostForm = ({ initialData = {}, onSaveDraft, onPublish, isEditing = false }) => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        requirements: "",
        location: "Remote",
        salaryMin: "",
        salaryMax: "",
        employmentType: "Full-time",
        category: "",
        applicationDeadline: "",
        skills: [],
        benefits: [],
        companySize: "",
        experienceLevel: "",
        ...initialData,
    })

    const [errors, setErrors] = useState({})
    const [currentStep, setCurrentStep] = useState(1)
    const [skillInput, setSkillInput] = useState("")
    const [benefitInput, setBenefitInput] = useState("")

    const steps = [
        { number: 1, title: "Basic Info", icon: "📝" },
        { number: 2, title: "Details", icon: "📋" },
        { number: 3, title: "Requirements", icon: "🎯" },
        { number: 4, title: "Compensation", icon: "💰" },
    ]

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({ ...formData, ...initialData })
        }
    }, [initialData])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }))
            setSkillInput("")
        }
    }

    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }))
    }

    const addBenefit = () => {
        if (benefitInput.trim() && !formData.benefits.includes(benefitInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                benefits: [...prev.benefits, benefitInput.trim()],
            }))
            setBenefitInput("")
        }
    }

    const removeBenefit = (benefitToRemove) => {
        setFormData((prev) => ({
            ...prev,
            benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
        }))
    }

    const validateStep = (step) => {
        const newErrors = {}

        switch (step) {
            case 1:
                if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
                if (!formData.category.trim()) newErrors.category = "Category is required"
                break
            case 2:
                if (!formData.jobDescription.trim()) newErrors.jobDescription = "Job description is required"
                break
            case 3:
                if (!formData.requirements.trim()) newErrors.requirements = "Requirements are required"
                break
            case 4:
                if (!formData.applicationDeadline) newErrors.applicationDeadline = "Application deadline is required"
                if (formData.salaryMin && formData.salaryMax) {
                    if (Number.parseInt(formData.salaryMin) >= Number.parseInt(formData.salaryMax)) {
                        newErrors.salaryMax = "Maximum salary must be greater than minimum"
                    }
                }
                break
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 4))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handleSaveDraft = (e) => {
        e.preventDefault()
        onSaveDraft(formData)
    }

    const handlePublish = (e) => {
        e.preventDefault()
        if (validateStep(4)) {
            onPublish(formData)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>📝 Basic Information</h3>

                        <div className="mb-4">
                            <label htmlFor="jobTitle" className={styles.formLabel}>
                                Job Title <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${styles.formControl} ${errors.jobTitle ? styles.error : ""}`}
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                placeholder="e.g. Senior Software Engineer"
                            />
                            {errors.jobTitle && <div className={styles.errorMessage}>{errors.jobTitle}</div>}
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label htmlFor="category" className={styles.formLabel}>
                                    Category/Department <span className={styles.required}>*</span>
                                </label>
                                <select
                                    className={`form-select ${styles.formControl} ${errors.category ? styles.error : ""}`}
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Engineering">🔧 Engineering</option>
                                    <option value="Design">🎨 Design</option>
                                    <option value="Marketing">📈 Marketing</option>
                                    <option value="Sales">💼 Sales</option>
                                    <option value="HR">👥 Human Resources</option>
                                    <option value="Finance">💰 Finance</option>
                                    <option value="Operations">⚙️ Operations</option>
                                    <option value="Customer Support">🎧 Customer Support</option>
                                </select>
                                {errors.category && <div className={styles.errorMessage}>{errors.category}</div>}
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="experienceLevel" className={styles.formLabel}>
                                    Experience Level
                                </label>
                                <select
                                    className={`form-select ${styles.formControl}`}
                                    id="experienceLevel"
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Entry-level">🌱 Entry-level</option>
                                    <option value="Mid-level">🚀 Mid-level</option>
                                    <option value="Senior">⭐ Senior</option>
                                    <option value="Lead">👑 Lead</option>
                                    <option value="Executive">💎 Executive</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label htmlFor="location" className={styles.formLabel}>
                                    Location
                                </label>
                                <select
                                    className={`form-select ${styles.formControl}`}
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                >
                                    <option value="Remote">🌍 Remote</option>
                                    <option value="On-site">🏢 On-site</option>
                                    <option value="Hybrid">🔄 Hybrid</option>
                                </select>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="employmentType" className={styles.formLabel}>
                                    Employment Type
                                </label>
                                <select
                                    className={`form-select ${styles.formControl}`}
                                    id="employmentType"
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleInputChange}
                                >
                                    <option value="Full-time">⏰ Full-time</option>
                                    <option value="Part-time">🕐 Part-time</option>
                                    <option value="Contract">📝 Contract</option>
                                    <option value="Internship">🎓 Internship</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>📋 Job Details</h3>

                        <div className="mb-4">
                            <label htmlFor="jobDescription" className={styles.formLabel}>
                                Job Description <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                className={`form-control ${styles.formControl} ${styles.textarea} ${errors.jobDescription ? styles.error : ""}`}
                                id="jobDescription"
                                name="jobDescription"
                                rows="8"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                            ></textarea>
                            {errors.jobDescription && <div className={styles.errorMessage}>{errors.jobDescription}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="companySize" className={styles.formLabel}>
                                Company Size
                            </label>
                            <select
                                className={`form-select ${styles.formControl}`}
                                id="companySize"
                                name="companySize"
                                value={formData.companySize}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Company Size</option>
                                <option value="1-10">🏠 Startup (1-10 employees)</option>
                                <option value="11-50">🏢 Small (11-50 employees)</option>
                                <option value="51-200">🏬 Medium (51-200 employees)</option>
                                <option value="201-1000">🏭 Large (201-1000 employees)</option>
                                <option value="1000+">🌆 Enterprise (1000+ employees)</option>
                            </select>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>🎯 Requirements & Skills</h3>

                        <div className="mb-4">
                            <label htmlFor="requirements" className={styles.formLabel}>
                                Requirements <span className={styles.required}>*</span>
                            </label>
                            <textarea
                                className={`form-control ${styles.formControl} ${styles.textarea} ${errors.requirements ? styles.error : ""}`}
                                id="requirements"
                                name="requirements"
                                rows="6"
                                value={formData.requirements}
                                onChange={handleInputChange}
                                placeholder="List required skills, experience, education, etc. (one per line)"
                            ></textarea>
                            {errors.requirements && <div className={styles.errorMessage}>{errors.requirements}</div>}
                        </div>

                        <div className="mb-4">
                            <label className={styles.formLabel}>Skills</label>
                            <div className={styles.tagInput}>
                                <input
                                    type="text"
                                    className={`form-control ${styles.formControl}`}
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                    placeholder="Add a skill and press Enter"
                                />
                                <button type="button" className={styles.addBtn} onClick={addSkill}>
                                    Add
                                </button>
                            </div>
                            <div className={styles.tagList}>
                                {formData.skills.map((skill, index) => (
                                    <span key={index} className={styles.tag}>
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(skill)}>
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className={styles.formLabel}>Benefits</label>
                            <div className={styles.tagInput}>
                                <input
                                    type="text"
                                    className={`form-control ${styles.formControl}`}
                                    value={benefitInput}
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                                    placeholder="Add a benefit and press Enter"
                                />
                                <button type="button" className={styles.addBtn} onClick={addBenefit}>
                                    Add
                                </button>
                            </div>
                            <div className={styles.tagList}>
                                {formData.benefits.map((benefit, index) => (
                                    <span key={index} className={styles.tag}>
                                        {benefit}
                                        <button type="button" onClick={() => removeBenefit(benefit)}>
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className={styles.stepContent}>
                        <h3 className={styles.stepTitle}>💰 Compensation & Timeline</h3>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label htmlFor="salaryMin" className={styles.formLabel}>
                                    Minimum Salary (USD)
                                </label>
                                <input
                                    type="number"
                                    className={`form-control ${styles.formControl}`}
                                    id="salaryMin"
                                    name="salaryMin"
                                    value={formData.salaryMin}
                                    onChange={handleInputChange}
                                    placeholder="50000"
                                />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label htmlFor="salaryMax" className={styles.formLabel}>
                                    Maximum Salary (USD)
                                </label>
                                <input
                                    type="number"
                                    className={`form-control ${styles.formControl} ${errors.salaryMax ? styles.error : ""}`}
                                    id="salaryMax"
                                    name="salaryMax"
                                    value={formData.salaryMax}
                                    onChange={handleInputChange}
                                    placeholder="80000"
                                />
                                {errors.salaryMax && <div className={styles.errorMessage}>{errors.salaryMax}</div>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="applicationDeadline" className={styles.formLabel}>
                                Application Deadline <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="date"
                                className={`form-control ${styles.formControl} ${errors.applicationDeadline ? styles.error : ""}`}
                                id="applicationDeadline"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split("T")[0]}
                            />
                            {errors.applicationDeadline && <div className={styles.errorMessage}>{errors.applicationDeadline}</div>}
                        </div>

                        <div className={styles.previewSection}>
                            <h4 className={styles.previewTitle}>📋 Job Preview</h4>
                            <div className={styles.jobPreview}>
                                <div className={styles.previewHeader}>
                                    <h5>{formData.jobTitle || "Job Title"}</h5>
                                    <div className={styles.previewMeta}>
                                        {formData.category} • {formData.location} • {formData.employmentType}
                                    </div>
                                </div>
                                <div className={styles.previewContent}>
                                    <p>
                                        {formData.jobDescription
                                            ? formData.jobDescription.substring(0, 150) + "..."
                                            : "Job description will appear here..."}
                                    </p>
                                    {formData.skills.length > 0 && (
                                        <div className={styles.previewSkills}>
                                            {formData.skills.slice(0, 5).map((skill, index) => (
                                                <span key={index} className={styles.previewTag}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className={styles.jobPostForm}>
            {/* Step Progress */}
            <div className={styles.stepProgress}>
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className={`${styles.stepItem} ${currentStep >= step.number ? styles.active : ""} ${currentStep > step.number ? styles.completed : ""}`}
                    >
                        <div className={styles.stepIcon}>{step.icon}</div>
                        <div className={styles.stepText}>{step.title}</div>
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <form className={styles.formContent}>
                {renderStep()}

                {/* Navigation */}
                <div className={styles.formNavigation}>
                    <div className={styles.navLeft}>
                        {currentStep > 1 && (
                            <button type="button" className={styles.prevBtn} onClick={prevStep}>
                                ← Previous
                            </button>
                        )}
                    </div>

                    <div className={styles.navRight}>
                        {currentStep < 4 ? (
                            <button type="button" className={styles.nextBtn} onClick={nextStep}>
                                Next →
                            </button>
                        ) : (
                            <div className={styles.finalActions}>
                                <button type="button" className={styles.draftBtn} onClick={handleSaveDraft}>
                                    💾 Save as Draft
                                </button>
                                <button type="button" className={styles.publishBtn} onClick={handlePublish}>
                                    🚀 {isEditing ? "Update Job" : "Publish Now"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default JobPostForm
