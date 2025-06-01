import React from "react"
import JobActionButtons from "./JobActionButtons"
import styles from "./JobListTable.module.css"

const JobListTable = ({ jobs, onCloseJob, onDeleteJob, onEditJob, onViewApplicants }) => {
    const getStatusBadge = (status) => {
        const statusClasses = {
            Open: styles.statusOpen,
            Closed: styles.statusClosed,
            Draft: styles.statusDraft,
        }

        return <span className={`${styles.statusBadge} ${statusClasses[status]}`}>{status}</span>
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    if (jobs.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📋</div>
                <h3 className={styles.emptyTitle}>No Jobs Found</h3>
                <p className={styles.emptyText}>You haven't posted any jobs yet or no jobs match your current filters.</p>
            </div>
        )
    }

    return (
        <div className={styles.tableContainer}>
            <div className="table-responsive">
                <table className={`table ${styles.jobTable}`}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th scope="col">Job Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date Posted</th>
                            <th scope="col">Location</th>
                            <th scope="col" className={styles.actionsColumn}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id} className={styles.tableRow}>
                                <td className={styles.jobTitleCell}>
                                    <div className={styles.jobTitle}>{job.jobTitle}</div>
                                    <div className={styles.jobType}>{job.employmentType}</div>
                                </td>
                                <td>{getStatusBadge(job.status)}</td>
                                <td className={styles.categoryCell}>{job.category}</td>
                                <td className={styles.dateCell}>{formatDate(job.datePosted)}</td>
                                <td className={styles.locationCell}>
                                    <span className={styles.locationBadge}>{job.location}</span>
                                </td>
                                <td className={styles.actionsCell}>
                                    <JobActionButtons
                                        job={job}
                                        onClose={() => onCloseJob(job.id)}
                                        onDelete={() => onDeleteJob(job.id)}
                                        onEdit={() => onEditJob(job.id)}
                                        onViewApplicants={() => onViewApplicants(job.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default JobListTable
