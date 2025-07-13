import { useState, useEffect, useMemo } from "react"
import { fetchJobCategories, fetchAllActiveJobs } from "../../services/jobService"
import JobCard from "../../components/JobCard/JobCard.jsx"
import { useAuth } from "../AuthContext.jsx"
import styles from "./Styles/JobListing.module.css"

export default function JobListingPage() {
  const { userData } = useAuth()

  const [formFilters, setFormFilters] = useState({
    search: "",
    category: "",
    minSalary: 0,
    sort: "newest",
    page: 0,
    size: 10,
  })

  const [allJobs, setAllJobs] = useState([]) // Store all jobs
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [tempSalaryRange, setTempSalaryRange] = useState(0)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchJobCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetchAllActiveJobs(userData?.userId)
        console.log(response);
        setAllJobs(response) // Store all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [userData?.userId])

  // Filter and sort jobs based on formFilters
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = [...allJobs]

    // Apply search filter
    if (formFilters.search.trim()) {
      const searchTerm = formFilters.search.toLowerCase()
      filtered = filtered.filter(job =>
        job.jobTitle?.toLowerCase().includes(searchTerm) ||
        job.companyName?.toLowerCase().includes(searchTerm) ||
        job.description?.toLowerCase().includes(searchTerm)
      )
    }

    // Apply category filter
    if (formFilters.category) {
      filtered = filtered.filter(job => job.category === formFilters.category)
    }

    // Apply salary filter
    if (formFilters.minSalary > 0) {
      filtered = filtered.filter(job => {
        const minBudget = Number.parseFloat(job.minBudget) || 0
        const maxBudget = Number.parseFloat(job.maxBudget) || 0
        const jobMaxSalary = Math.max(minBudget, maxBudget)
        return jobMaxSalary >= formFilters.minSalary
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (formFilters.sort) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "salary-high":
          const aMaxSalary = Math.max(
            Number.parseFloat(a.minBudget) || 0,
            Number.parseFloat(a.maxBudget) || 0
          )
          const bMaxSalary = Math.max(
            Number.parseFloat(b.minBudget) || 0,
            Number.parseFloat(b.maxBudget) || 0
          )
          return bMaxSalary - aMaxSalary
        case "salary-low":
          const aMinSalary = Math.min(
            Number.parseFloat(a.minBudget) || Number.MAX_VALUE,
            Number.parseFloat(a.maxBudget) || Number.MAX_VALUE
          )
          const bMinSalary = Math.min(
            Number.parseFloat(b.minBudget) || Number.MAX_VALUE,
            Number.parseFloat(b.maxBudget) || Number.MAX_VALUE
          )
          return aMinSalary - bMinSalary
        default:
          return 0
      }
    })

    return filtered
  }, [allJobs, formFilters])

  // Paginate the filtered jobs
  const paginatedJobs = useMemo(() => {
    const startIndex = formFilters.page * formFilters.size
    const endIndex = startIndex + formFilters.size
    return filteredAndSortedJobs.slice(startIndex, endIndex)
  }, [filteredAndSortedJobs, formFilters.page, formFilters.size])

  const totalJobs = filteredAndSortedJobs.length
  const totalPages = Math.ceil(totalJobs / formFilters.size)
  const startResult = formFilters.page * formFilters.size + 1
  const endResult = Math.min((formFilters.page + 1) * formFilters.size, totalJobs)

  const handleFilterChange = (newFilters) => {
    setFormFilters((prev) => ({ ...prev, ...newFilters, page: 0 }))
  }

  const handleSalaryRangeChange = (value) => {
    setTempSalaryRange(value)
  }

  const applySalaryFilter = () => {
    handleFilterChange({ minSalary: tempSalaryRange * 1000000 })
  }

  const handlePageChange = (newPage) => {
    setFormFilters((prev) => ({ ...prev, page: newPage }))
  }

  // Function to refresh a specific job after application
  const refreshJob = async (jobId) => {
    try {
      const response = await fetchAllActiveJobs(userData?.userId)
      setAllJobs(response)
    } catch (error) {
      console.error("Error refreshing jobs:", error)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        <p className={styles.loadingText}>Loading amazing opportunities...</p>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper} style={{ paddingTop: "2rem" }}>
      <main className={styles.mainContent}>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 col-lg-3">
              <div className={`card ${styles.filterCard}`}>
                <div className="card-body">
                  <div className="mb-4">
                    <h3 className={styles.filterTitle}><i className="bi bi-search me-2"></i>Search Jobs</h3>
                    <div className={styles.searchWrapper}>
                      <input
                        type="text"
                        className={`form-control ${styles.searchInput}`}
                        placeholder="Job title or company"
                        value={formFilters.search}
                        onChange={(e) => handleFilterChange({ search: e.target.value })}
                      />
                      <i className="bi bi-search"></i>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className={styles.filterTitle}><i className="bi bi-grid-3x3-gap me-2"></i>Category</h3>
                    <div className={styles.categoryList}>
                      {categories.map((category) => (
                        <div key={category} className={styles.categoryItem}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`category-${category.toLowerCase()}`}
                            checked={formFilters.category === category}
                            onChange={(e) => handleFilterChange({ category: e.target.checked ? category : "" })}
                          />
                          <label className={styles.categoryLabel} htmlFor={`category-${category.toLowerCase()}`}>
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className={styles.filterTitle}><i className="bi bi-cash me-2"></i>Salary Range</h3>
                    <div className={styles.salarySection}>
                      <input
                        type="range"
                        className={`form-range ${styles.salaryRange}`}
                        min="0"
                        max="100"
                        value={tempSalaryRange}
                        onChange={(e) => handleSalaryRangeChange(e.target.value)}
                      />
                      <div className={styles.salaryDisplay}>
                        <span className={styles.salaryValue}>Min: {tempSalaryRange} million VND</span>
                        <button className={`btn ${styles.applyBtn}`} onClick={applySalaryFilter}>Apply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-lg-9">
              <div className={`card ${styles.jobsCard}`}>
                <div className="card-body">
                  <div className={styles.jobsHeader}>
                    <div className={styles.resultsInfo}>
                      <div className={styles.totalJobs}><i className="bi bi-briefcase-fill me-2"></i>{totalJobs} Jobs Available</div>
                      {totalJobs > 0 && <div className={styles.currentResults}>Showing {startResult}-{endResult} of {totalJobs} results</div>}
                    </div>
                    <div className={styles.sortWrapper}>
                      <label className={styles.sortLabel}><i className="bi bi-sort-down me-2"></i>Sort by:</label>
                      <select
                        className={`form-select ${styles.sortSelect}`}
                        value={formFilters.sort}
                        onChange={(e) => handleFilterChange({ sort: e.target.value })}
                      >
                        <option value="newest">Latest Jobs</option>
                        <option value="oldest">Oldest First</option>
                        <option value="salary-high">Highest Salary</option>
                        <option value="salary-low">Lowest Salary</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.jobsList}>
                    {paginatedJobs.length === 0 ? (
                      <div className={styles.noResults}>
                        <div className={styles.noResultsIcon}><i className="bi bi-search display-1"></i></div>
                        <h3>No jobs found</h3>
                        <p>Try adjusting your search criteria or filters to find more opportunities</p>
                        <button
                          className={`btn ${styles.clearFiltersBtn}`}
                          onClick={() => {
                            setFormFilters({
                              search: "",
                              category: "",
                              minSalary: 0,
                              sort: "newest",
                              page: 0,
                              size: 10,
                            })
                            setTempSalaryRange(0)
                          }}
                        >
                          Clear All Filters
                        </button>
                      </div>
                    ) : (
                      <>
                        {paginatedJobs.map((job) => (
                          <JobCard
                            key={job.id}
                            job={job}
                            userData={userData}
                            onJobUpdate={() => refreshJob(job.id)}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {totalJobs > 0 && (
                <div className={styles.paginationWrapper}>
                  <div className={styles.paginationInfo}><span>Page {formFilters.page + 1} of {totalPages || 1}</span></div>
                  <nav className={styles.paginationNav}>
                    <div className={styles.paginationControls}>
                      <button
                        className={`btn ${styles.paginationArrow} ${formFilters.page === 0 ? styles.disabled : ""}`}
                        onClick={() => handlePageChange(formFilters.page - 1)}
                        disabled={formFilters.page === 0}
                        title="Previous page"
                      >
                        <i className="bi bi-chevron-double-left"></i>
                      </button>
                      <button
                        className={`btn ${styles.paginationBtn} ${formFilters.page === 0 ? styles.disabled : ""}`}
                        onClick={() => handlePageChange(formFilters.page - 1)}
                        disabled={formFilters.page === 0}
                      >
                        <i className="bi bi-chevron-left"></i>Previous
                      </button>
                      <div className={styles.pageNumbers}>
                        {totalPages <= 1 ? (
                          <button className={`btn ${styles.pageNumber} ${styles.active}`}>1</button>
                        ) : (
                          (() => {
                            const pages = []
                            const currentPage = formFilters.page
                            const maxVisiblePages = 5

                            let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2))
                            const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1)

                            if (endPage - startPage < maxVisiblePages - 1) {
                              startPage = Math.max(0, endPage - maxVisiblePages + 1)
                            }

                            if (startPage > 0) {
                              pages.push(<button key={0} className={`btn ${styles.pageNumber}`} onClick={() => handlePageChange(0)}>1</button>)
                              if (startPage > 1) {
                                pages.push(<span key="ellipsis1" className={styles.ellipsis}>...</span>)
                              }
                            }

                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <button
                                  key={i}
                                  className={`btn ${styles.pageNumber} ${i === currentPage ? styles.active : ""}`}
                                  onClick={() => handlePageChange(i)}
                                >
                                  {i + 1}
                                </button>
                              )
                            }

                            if (endPage < totalPages - 1) {
                              if (endPage < totalPages - 2) {
                                pages.push(<span key="ellipsis2" className={styles.ellipsis}>...</span>)
                              }
                              pages.push(
                                <button
                                  key={totalPages - 1}
                                  className={`btn ${styles.pageNumber}`}
                                  onClick={() => handlePageChange(totalPages - 1)}
                                >
                                  {totalPages}
                                </button>
                              )
                            }

                            return pages
                          })()
                        )}
                      </div>
                      <button
                        className={`btn ${styles.paginationBtn} ${formFilters.page === totalPages - 1 || totalPages <= 1 ? styles.disabled : ""}`}
                        onClick={() => handlePageChange(formFilters.page + 1)}
                        disabled={formFilters.page === totalPages - 1 || totalPages <= 1}
                      >
                        Next<i className="bi bi-chevron-right"></i>
                      </button>
                      <button
                        className={`btn ${styles.paginationArrow} ${formFilters.page === totalPages - 1 || totalPages <= 1 ? styles.disabled : ""}`}
                        onClick={() => handlePageChange(formFilters.page + 1)}
                        disabled={formFilters.page === totalPages - 1 || totalPages <= 1}
                        title="Next page"
                      >
                        <i className="bi bi-chevron-double-right"></i>
                      </button>
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}