// src/pages/JobListing/JobListingPage.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchJobCategories, fetchLocations, fetchAllJobs } from "../../services/jobService";
import JobCard from "../../components/JobCard/JobCard";

export default function JobListingPage() {
  // State variables
  const [formFilters, setFormFilters] = useState({
    search: "",
    location: "",
    category: "",
    salaryRange: 0,
    sort: "newest",
    page: 0,
    size: 10
  });

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch categories and locations
        const [cats, locs] = await Promise.all([
          fetchJobCategories(),
          fetchLocations()
        ]);

        setCategories(cats);
        setLocations(locs);

        // Fetch jobs with initial filters
        const response = await fetchAllJobs(formFilters);
        console.log(response.data);
        setJobs(response.data);
        setTotalJobs(response.data.length);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFormFilters(prev => ({ ...prev, ...newFilters, page: 0 }));
  };

  // Fetch jobs when filters change
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchAllJobs(formFilters);
        setJobs(response.data);
        setTotalJobs(response.data.length);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [formFilters]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFormFilters(prev => ({ ...prev, page: newPage }));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: "5rem" }}>
      <main className="flex-grow-1 bg-light py-4">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar Filters */}
            <div className="col-md-4 col-lg-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Search by Job Title */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Search by Job Title</h3>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Job title or company"
                        value={formFilters.search}
                        onChange={(e) => handleFilterChange({ search: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Location</h3>
                    <select
                      className="form-select"
                      value={formFilters.location}
                      onChange={(e) => handleFilterChange({ location: e.target.value })}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filters */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Category</h3>
                    {categories.map((category) => (
                      <div key={category} className="d-flex justify-content-between mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`category-${category.toLowerCase()}`}
                            checked={formFilters.category === category}
                            onChange={(e) =>
                              handleFilterChange({
                                category: e.target.checked ? category : ''
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`category-${category.toLowerCase()}`}
                          >
                            {category}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Salary Range */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Salary</h3>
                    <input
                      type="range"
                      className="form-range mb-3"
                      min="0"
                      max="100"
                      value={formFilters.salaryRange}
                      onChange={(e) => handleFilterChange({ salaryRange: e.target.value })}
                    />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small fw-medium">
                        Min Salary: ${formFilters.salaryRange * 1000}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleFilterChange({ salaryRange: formFilters.salaryRange })}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="col-md-8 col-lg-9">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="text-muted mb-0 small">
                      Showing {jobs.length} of {totalJobs} results
                    </p>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "180px" }}
                      value={formFilters.sort}
                      onChange={(e) => handleFilterChange({ sort: e.target.value })}
                    >
                      <option value="newest">Sort by: Newest</option>
                      <option value="oldest">Sort by: Oldest</option>
                      <option value="salary-high">Sort by: Salary (High)</option>
                      <option value="salary-low">Sort by: Salary (Low)</option>
                    </select>
                  </div>

                  {/* Job Cards */}
                  {jobs.length === 0 ? (
                    <div className="text-center py-5">
                      <h4>No jobs found</h4>
                      <p>Try adjusting your filters</p>
                    </div>
                  ) : (
                    <>
                      {jobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}

                      {/* Pagination */}
                      <div className="d-flex justify-content-center mt-4">
                        <nav aria-label="Page navigation">
                          <ul className="pagination">
                            {[...Array(Math.ceil(totalJobs / formFilters.size)).keys()].map(page => (
                              <li
                                key={page}
                                className={`page-item ${formFilters.page === page ? 'active' : ''}`}
                              >
                                <button
                                  className="page-link rounded-circle"
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page + 1}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                    </>
                  )}
                </div>
              </div>


              {/* Top Companies Section */}
              <div className="mt-5 mb-4">
                <h2 className="text-center fw-bold mb-2">Top Company</h2>
                <p className="text-center text-muted mb-4">
                  Find your dream job at these leading social platforms
                </p>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {[
                    {
                      name: "Instagram",
                      logo: "fab fa-linkedin",
                      color: "#0077B5",
                      description:
                        "Explore roles in marketing, design, engineering, and product management.",
                    },
                    {
                      name: "Tesla",
                      logo: "fab fa-twitter",
                      color: "#1DA1F2",
                      description:
                        "Find roles in engineering, software, and renewable energy.",
                    },
                    {
                      name: "McDonald's",
                      logo: "fab fa-facebook",
                      color: "#4267B2",
                      description:
                        "Explore roles in customer service, management, and operations.",
                    },
                    {
                      name: "Apple",
                      logo: "fab fa-youtube",
                      color: "#FF0000",
                      description:
                        "Explore positions in software, hardware, and retail.",
                    },
                  ].map((company) => (
                    <div key={company.name} className="col">
                      <div className="card h-100 text-center">
                        <div className="card-body">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{
                              width: "64px",
                              height: "64px",
                              backgroundColor: `${company.color}20`,
                            }}
                          >
                            <i
                              className={`${company.logo} fa-2x`}
                              style={{ color: company.color }}
                            ></i>
                          </div>
                          <h5 className="card-title">{company.name}</h5>
                          <p className="card-text text-muted small mb-3">
                            {company.description}
                          </p>
                          <button className="btn btn-outline-info btn-sm">
                            View Jobs
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
