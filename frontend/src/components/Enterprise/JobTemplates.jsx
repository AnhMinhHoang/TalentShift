import React from "react"
import styles from "./JobTemplates.module.css"

const JobTemplates = ({ onSelectTemplate }) => {
    const templates = [
        {
            id: 1,
            jobTitle: "Senior Software Engineer",
            category: "Engineering",
            employmentType: "Full-time",
            location: "Remote",
            jobDescription:
                "We're looking for a Senior Software Engineer to join our dynamic team. You'll be responsible for designing, developing, and maintaining scalable web applications using modern technologies.",
            requirements:
                "• 5+ years of experience in software development\n• Proficiency in React, Node.js, and TypeScript\n• Experience with cloud platforms (AWS/Azure)\n• Strong problem-solving skills\n• Bachelor's degree in Computer Science or related field",
            skills: ["React", "Node.js", "TypeScript", "AWS"],
            benefits: ["Health Insurance", "Remote Work", "Stock Options", "Learning Budget"],
            experienceLevel: "Senior",
            icon: "💻",
            color: "#4285f4",
        },
        {
            id: 2,
            jobTitle: "UX/UI Designer",
            category: "Design",
            employmentType: "Full-time",
            location: "Hybrid",
            jobDescription:
                "Join our design team to create beautiful, user-centered digital experiences. You'll work closely with product managers and engineers to bring innovative ideas to life.",
            requirements:
                "• 3+ years of UX/UI design experience\n• Proficiency in Figma, Sketch, or Adobe Creative Suite\n• Strong portfolio showcasing design process\n• Understanding of user research methodologies\n• Experience with design systems",
            skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
            benefits: ["Creative Freedom", "Design Tools Budget", "Flexible Hours", "Team Retreats"],
            experienceLevel: "Mid-level",
            icon: "🎨",
            color: "#ea4335",
        },
        {
            id: 3,
            jobTitle: "Marketing Manager",
            category: "Marketing",
            employmentType: "Full-time",
            location: "On-site",
            jobDescription:
                "Lead our marketing efforts to drive brand awareness and customer acquisition. You'll develop and execute comprehensive marketing strategies across multiple channels.",
            requirements:
                "• 4+ years of marketing experience\n• Experience with digital marketing platforms\n• Strong analytical and communication skills\n• Knowledge of SEO/SEM best practices\n• Bachelor's degree in Marketing or related field",
            skills: ["Digital Marketing", "SEO", "Analytics", "Content Strategy"],
            benefits: ["Performance Bonus", "Conference Budget", "Health Insurance", "Career Growth"],
            experienceLevel: "Mid-level",
            icon: "📈",
            color: "#34a853",
        },
        {
            id: 4,
            jobTitle: "Data Scientist",
            category: "Engineering",
            employmentType: "Full-time",
            location: "Remote",
            jobDescription:
                "Join our data team to extract insights from complex datasets and build machine learning models that drive business decisions.",
            requirements:
                "• PhD or Master's in Data Science, Statistics, or related field\n• Proficiency in Python, R, and SQL\n• Experience with machine learning frameworks\n• Strong statistical analysis skills\n• Experience with big data technologies",
            skills: ["Python", "Machine Learning", "SQL", "Statistics"],
            benefits: ["Research Time", "Conference Attendance", "Latest Hardware", "Flexible Schedule"],
            experienceLevel: "Senior",
            icon: "📊",
            color: "#fbbc04",
        },
    ]

    return (
        <div className={styles.templatesContainer}>
            <div className={styles.templatesHeader}>
                <h3 className={styles.templatesTitle}>🚀 Quick Start Templates</h3>
                <p className={styles.templatesSubtitle}>Choose a template to get started quickly</p>
            </div>

            <div className="row">
                {templates.map((template) => (
                    <div key={template.id} className="col-lg-3 col-md-6 mb-3">
                        <div
                            className={styles.templateCard}
                            onClick={() => onSelectTemplate(template)}
                            style={{ "--template-color": template.color }}
                        >
                            <div className={styles.templateIcon}>{template.icon}</div>
                            <div className={styles.templateContent}>
                                <h4 className={styles.templateTitle}>{template.jobTitle}</h4>
                                <div className={styles.templateMeta}>
                                    <span className={styles.templateCategory}>{template.category}</span>
                                    <span className={styles.templateType}>{template.employmentType}</span>
                                </div>
                                <div className={styles.templateSkills}>
                                    {template.skills.slice(0, 3).map((skill, index) => (
                                        <span key={index} className={styles.skillTag}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.templateOverlay}>
                                <span className={styles.useTemplate}>Use Template</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobTemplates
