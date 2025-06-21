import React from "react"
import { useState, useEffect } from "react"
import { notification } from "antd"
import JobFilterBar from "../../components/Enterprise/JobFilterBar"
import JobListTable from "../../components/Enterprise/JobListTable"
import styles from "./style/JobListPage.module.css"

const JobListPage = () => {
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        dateFrom: "",
        dateTo: "",
    })

    useEffect(() => {
        loadJobs()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [jobs, filters])

    const loadJobs = () => {
        const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")
        setJobs(savedJobs)
    }

    const applyFilters = () => {
        let filtered = [...jobs]

        // Search filter
        if (filters.search) {
            filtered = filtered.filter((job) => job.jobTitle.toLowerCase().includes(filters.search.toLowerCase()))
        }

        // Status filter
        if (filters.status) {
            filtered = filtered.filter((job) => job.status === filters.status)
        }

        // Date range filter
        if (filters.dateFrom) {
            filtered = filtered.filter((job) => job.datePosted >= filters.dateFrom)
        }
        if (filters.dateTo) {
            filtered = filtered.filter((job) => job.datePosted <= filters.dateTo)
        }

        setFilteredJobs(filtered)
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    const handleCloseJob = (jobId) => {
        const updatedJobs = jobs.map((job) => (job.id === jobId ? { ...job, status: "Closed" } : job))
        setJobs(updatedJobs)
        localStorage.setItem("jobs", JSON.stringify(updatedJobs))

        notification.success({
            message: "Job Closed",
            description: "The job posting has been closed successfully.",
            placement: "topRight",
        })
    }

    const handleDeleteJob = (jobId) => {
        const updatedJobs = jobs.filter((job) => job.id !== jobId)
        setJobs(updatedJobs)
        localStorage.setItem("jobs", JSON.stringify(updatedJobs))

        notification.success({
            message: "Job Deleted",
            description: "The job posting has been deleted successfully.",
            placement: "topRight",
        })
    }

    const handleEditJob = (jobId) => {
        // In a real app, this would navigate to the edit page
        notification.info({
            message: "Edit Job",
            description: "Redirecting to edit page...",
            placement: "topRight",
        })
    }

    const handleViewApplicants = (jobId) => {
        notification.info({
            message: "View Applicants",
            description: "Opening applicants view...",
            placement: "topRight",
        })
    }

    return (
        <div className={styles.jobListPage}>
            <div className="container-fluid pt-5 mt-3">
                <div className="row">
                    <div className="col-12">
                        <div className={styles.pageHeader}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1 className={styles.pageTitle}>Job Management Dashboard</h1>
                                    <p className={styles.pageSubtitle}>Manage your job postings and track applications</p>
                                </div>
                                <div className={styles.statsContainer}>
                                    <div className={styles.statCard}>
                                        <div className={styles.statNumber}>{jobs.filter((j) => j.status === "Open").length}</div>
                                        <div className={styles.statLabel}>Active Jobs</div>
                                    </div>
                                    <div className={styles.statCard}>
                                        <div className={styles.statNumber}>{jobs.filter((j) => j.status === "Draft").length}</div>
                                        <div className={styles.statLabel}>Drafts</div>
                                    </div>
                                    <div className={styles.statCard}>
                                        <div className={styles.statNumber}>{jobs.length}</div>
                                        <div className={styles.statLabel}>Total Jobs</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className={styles.dashboardContainer}>
                            <JobFilterBar filters={filters} onFilterChange={handleFilterChange} />

                            <JobListTable
                                jobs={filteredJobs}
                                onCloseJob={handleCloseJob}
                                onDeleteJob={handleDeleteJob}
                                onEditJob={handleEditJob}
                                onViewApplicants={handleViewApplicants}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListPage
