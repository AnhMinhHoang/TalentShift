import React from "react"
import styles from "./JobFilterBar.module.css"

const JobFilterBar = ({ filters, onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target
        onFilterChange({
            ...filters,
            [name]: value,
        })
    }

    const handleClearFilters = () => {
        onFilterChange({
            search: "",
            status: "",
            dateFrom: "",
            dateTo: "",
        })
    }

    return (
        <div className={styles.filterBar}>
            <div className="row align-items-end">
                <div className="col-lg-3 col-md-6 mb-3">
                    <label htmlFor="search" className={styles.filterLabel}>
                        Search Jobs
                    </label>
                    <input
                        type="text"
                        className={`form-control ${styles.filterInput}`}
                        id="search"
                        name="search"
                        value={filters.search}
                        onChange={handleInputChange}
                        placeholder="Search by job title..."
                    />
                </div>

                <div className="col-lg-2 col-md-6 mb-3">
                    <label htmlFor="status" className={styles.filterLabel}>
                        Status
                    </label>
                    <select
                        className={`form-select ${styles.filterInput}`}
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={handleInputChange}
                    >
                        <option value="">All Status</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>

                <div className="col-lg-2 col-md-6 mb-3">
                    <label htmlFor="dateFrom" className={styles.filterLabel}>
                        From Date
                    </label>
                    <input
                        type="date"
                        className={`form-control ${styles.filterInput}`}
                        id="dateFrom"
                        name="dateFrom"
                        value={filters.dateFrom}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-lg-2 col-md-6 mb-3">
                    <label htmlFor="dateTo" className={styles.filterLabel}>
                        To Date
                    </label>
                    <input
                        type="date"
                        className={`form-control ${styles.filterInput}`}
                        id="dateTo"
                        name="dateTo"
                        value={filters.dateTo}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-lg-3 col-md-12 mb-3">
                    <div className={styles.filterActions}>
                        <button type="button" className={`btn ${styles.clearBtn}`} onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobFilterBar
