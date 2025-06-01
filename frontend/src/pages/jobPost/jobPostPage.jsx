import React from "react"
import { useState, useEffect } from "react"
import { notification } from "antd"
import JobPostForm from "../../components/Enterprise/JobPostForm"
import JobTemplates from "../../components/Enterprise/JobTemplates"
import styles from "./style/JobPostPage.module.css"

const JobPostPage = ({ editJobId = null }) => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobDescription: "",
        requirements: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        employmentType: "",
        category: "",
        applicationDeadline: "",
        skills: [],
        benefits: [],
        companySize: "",
        experienceLevel: "",
    })

    const [isEditing, setIsEditing] = useState(false)
    const [showTemplates, setShowTemplates] = useState(false)
    const [autoSaveStatus, setAutoSaveStatus] = useState("")

    useEffect(() => {
        if (editJobId) {
            const existingJob = getJobById(editJobId)
            if (existingJob) {
                setFormData(existingJob)
                setIsEditing(true)
            }
        }
    }, [editJobId])

    // Auto-save functionality
    useEffect(() => {
        const autoSaveTimer = setTimeout(() => {
            if (formData.jobTitle || formData.jobDescription) {
                handleAutoSave()
            }
        }, 3000)

        return () => clearTimeout(autoSaveTimer)
    }, [formData])

    const getJobById = (id) => {
        const jobs = JSON.parse(localStorage.getItem("jobs") || "[]")
        return jobs.find((job) => job.id === id)
    }

    const handleAutoSave = () => {
        try {
            localStorage.setItem("jobDraft", JSON.stringify(formData))
            setAutoSaveStatus("✅ Auto-saved")
            setTimeout(() => setAutoSaveStatus(""), 2000)
        } catch (error) {
            setAutoSaveStatus("❌ Auto-save failed")
        }
    }

    const handleSaveDraft = (data) => {
        try {
            const jobs = JSON.parse(localStorage.getItem("jobs") || "[]")
            const jobData = {
                ...data,
                id: isEditing ? editJobId : Date.now(),
                status: "Draft",
                datePosted: isEditing ? formData.datePosted : new Date().toISOString().split("T")[0],
                dateUpdated: new Date().toISOString().split("T")[0],
                views: isEditing ? formData.views || 0 : 0,
                applications: isEditing ? formData.applications || 0 : 0,
            }

            if (isEditing) {
                const jobIndex = jobs.findIndex((job) => job.id === editJobId)
                jobs[jobIndex] = jobData
            } else {
                jobs.push(jobData)
            }

            localStorage.setItem("jobs", JSON.stringify(jobs))
            localStorage.removeItem("jobDraft")

            notification.success({
                message: "🎉 Draft Saved!",
                description: "Your job posting has been saved as a draft with all the latest changes.",
                placement: "topRight",
                duration: 3,
            })
        } catch (error) {
            notification.error({
                message: "❌ Error",
                description: "Failed to save draft. Please try again.",
                placement: "topRight",
            })
        }
    }

    const handlePublish = (data) => {
        try {
            const jobs = JSON.parse(localStorage.getItem("jobs") || "[]")
            const jobData = {
                ...data,
                id: isEditing ? editJobId : Date.now(),
                status: "Open",
                datePosted: isEditing ? formData.datePosted : new Date().toISOString().split("T")[0],
                dateUpdated: new Date().toISOString().split("T")[0],
                views: isEditing ? formData.views || 0 : 0,
                applications: isEditing ? formData.applications || 0 : 0,
                featured: Math.random() > 0.7, // Random featured status
            }

            if (isEditing) {
                const jobIndex = jobs.findIndex((job) => job.id === editJobId)
                jobs[jobIndex] = jobData
            } else {
                jobs.push(jobData)
            }

            localStorage.setItem("jobs", JSON.stringify(jobs))
            localStorage.removeItem("jobDraft")

            notification.success({
                message: "🚀 Job Published!",
                description:
                    "Your job posting is now live and accepting applications. Good luck finding the perfect candidate!",
                placement: "topRight",
                duration: 4,
            })
        } catch (error) {
            notification.error({
                message: "❌ Error",
                description: "Failed to publish job. Please try again.",
                placement: "topRight",
            })
        }
    }

    const handleTemplateSelect = (template) => {
        setFormData({ ...formData, ...template })
        setShowTemplates(false)
        notification.info({
            message: "📋 Template Applied",
            description: `${template.jobTitle} template has been applied to your form.`,
            placement: "topRight",
        })
    }

    return (
        <div className={styles.jobPostPage}>
            <div className="container-fluid pt-5 mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className={styles.pageHeader}>
                            <div className={styles.headerContent}>
                                <div className={styles.titleSection}>
                                    <h1 className={styles.pageTitle}>{isEditing ? "✏️ Edit Job Posting" : "✨ Create New Job Posting"}</h1>
                                    <p className={styles.pageSubtitle}>
                                        {isEditing
                                            ? "Update your job posting details"
                                            : "Fill in the details to post a new job opportunity"}
                                    </p>
                                    {autoSaveStatus && <div className={styles.autoSaveStatus}>{autoSaveStatus}</div>}
                                </div>

                                <div className={styles.headerActions}>
                                    <button className={styles.templateBtn} onClick={() => setShowTemplates(!showTemplates)}>
                                        📋 Use Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showTemplates && (
                    <div className="row">
                        <div className="col-12">
                            <JobTemplates onSelectTemplate={handleTemplateSelect} />
                        </div>
                    </div>
                )}

                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className={styles.formContainer}>
                            <JobPostForm
                                initialData={formData}
                                onSaveDraft={handleSaveDraft}
                                onPublish={handlePublish}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobPostPage
