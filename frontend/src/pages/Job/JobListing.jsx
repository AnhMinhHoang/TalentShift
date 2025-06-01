import { useState } from "react";
import { Link } from "react-router-dom";

// Sample job data
const jobData = [
  {
    id: 1,
    title: "Forward Security Director",
    company: "Reach, Synapse and Shield Co.",
    companyInitials: "FS",
    location: "Remote",
    salary: "$80000-$90000",
    tags: ["Full-time", "Remote", "Senior", "Security", "Director"],
    accentColor: "primary",
  },
  {
    id: 2,
    title: "Senior Frontend Developer",
    company: "TechVision Solutions",
    companyInitials: "TV",
    location: "San Francisco",
    salary: "$120000-$150000",
    tags: ["Full-time", "React", "TypeScript", "Senior"],
    accentColor: "primary",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Innovate Labs",
    companyInitials: "IL",
    location: "New York",
    salary: "$110000-$130000",
    tags: ["Full-time", "Product", "Management", "Agile"],
    accentColor: "primary",
  },
  {
    id: 4,
    title: "UX/UI Designer",
    company: "Creative Minds Inc.",
    companyInitials: "CM",
    location: "Remote",
    salary: "$90000-$110000",
    tags: ["Full-time", "Design", "Figma", "User Experience"],
    accentColor: "primary",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Systems Ltd.",
    companyInitials: "CS",
    location: "London",
    salary: "$100000-$120000",
    tags: ["Full-time", "AWS", "Kubernetes", "CI/CD"],
    accentColor: "primary",
  },
];

export default function JobListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState(0);
  const [sortOption, setSortOption] = useState("newest");

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        paddingTop: "5rem",
      }}
    >
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Location</h3>
                    <select
                      className="form-select"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Choose city</option>
                      <option value="new-york">New York</option>
                      <option value="san-francisco">San Francisco</option>
                      <option value="london">London</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>

                  {/* Category Filters */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Category</h3>
                    {[
                      "Commerce",
                      "Telecomunications",
                      "Design",
                      "Hotel & Tourism",
                      "Financial Services",
                    ].map((category) => (
                      <div
                        key={category}
                        className="d-flex justify-content-between mb-2"
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`category-${category.toLowerCase()}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`category-${category.toLowerCase()}`}
                          >
                            {category}
                          </label>
                        </div>
                        <span className="text-muted small">5</span>
                      </div>
                    ))}
                  </div>

                  {/* Date Posted */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Date Posted</h3>
                    {[
                      "All",
                      "Last 24 hours",
                      "Last 3 days",
                      "Last 7 days",
                      "Last 30 days",
                    ].map((option) => (
                      <div
                        key={option}
                        className="d-flex justify-content-between mb-2"
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="datePosted"
                            id={`date-${option
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            defaultChecked={option === "All"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`date-${option
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {option}
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
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                    />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small fw-medium">
                        Salary: ${salaryRange * 1000} - $99999
                      </span>
                      <button className="btn btn-sm btn-outline-secondary">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <h3 className="h6 fw-bold mb-3">Tags</h3>
                    <div className="d-flex flex-wrap gap-2">
                      {[
                        "Full-time",
                        "Remote",
                        "Senior",
                        "Tech",
                        "Finance",
                        "Marketing",
                        "Design",
                        "Healthcare",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="badge bg-info bg-opacity-10 text-info"
                        >
                          {tag}
                        </span>
                      ))}
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
                      Showing 5 of 101 results
                    </p>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "180px" }}
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="newest">Sort by: Newest</option>
                      <option value="oldest">Sort by: Oldest</option>
                      <option value="salary-high">
                        Sort by: Salary (High)
                      </option>
                      <option value="salary-low">Sort by: Salary (Low)</option>
                    </select>
                  </div>

                  {/* Job Cards - Directly embedded in this component */}

                  {/* Job Card 1 */}
                  <div className="card mb-3 bg-primary bg-opacity-10 border-primary border-opacity-25">
                    <Link to="/job-detail" className="text-decoration-none">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex gap-3">
                            <div
                              className="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              <span className="fw-bold">FS</span>
                            </div>
                            <div>
                              <h5 className="card-title mb-0">
                                Customer Support Associate
                              </h5>
                              <p className="card-text text-muted small">
                                Fast Support Solutions
                              </p>
                            </div>
                          </div>
                          <button className="btn btn-link text-muted p-0">
                            <i className="bi bi-star"></i>
                          </button>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-primary bg-opacity-10 text-primary rounded p-1 me-1">
                              <i className="bi bi-geo-alt small"></i>
                            </span>
                            Remote
                          </span>
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-success bg-opacity-10 text-success rounded p-1 me-1">
                              <i className="bi bi-cash small"></i>
                            </span>
                            $280 - $400/month
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {["Full-time | Customer Support | Remote"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="badge bg-warning bg-opacity-10 text-warning"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>

                        <div className="text-end">
                          <button className="btn btn-warning btn-sm text-white">
                            Apply
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Job Card 2 */}
                  <div className="card mb-3 bg-primary bg-opacity-10 border-primary border-opacity-25">
                    <Link to="/job-detail" className="text-decoration-none">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex gap-3">
                            <div
                              className="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              <span className="fw-bold">TV</span>
                            </div>
                            <div>
                              <h5 className="card-title mb-0">
                                Digital Marketing Intern
                              </h5>
                              <p className="card-text text-muted small">
                                Digital Growth
                              </p>
                            </div>
                          </div>
                          <button className="btn btn-link text-muted p-0">
                            <i className="bi bi-star"></i>
                          </button>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-primary bg-opacity-10 text-primary rounded p-1 me-1">
                              <i className="bi bi-geo-alt small"></i>
                            </span>
                            Remote
                          </span>
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-success bg-opacity-10 text-success rounded p-1 me-1">
                              <i className="bi bi-cash small"></i>
                            </span>
                            $200 - $320/month
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {["Internship | Digital Marketing | Remote"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="badge bg-info bg-opacity-10 text-info"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>

                        <div className="text-end">
                          <button className="btn btn-info btn-sm text-white">
                            Apply
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Job Card 3 */}
                  <div className="card mb-3 bg-primary bg-opacity-10 border-primary border-opacity-25">
                    <Link to="/job-detail" className="text-decoration-none">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex gap-3">
                            <div
                              className="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              <span className="fw-bold">IL</span>
                            </div>
                            <div>
                              <h5 className="card-title mb-0">
                                Freelance Content Writer
                              </h5>
                              <p className="card-text text-muted small">
                                Content Creators Hub
                              </p>
                            </div>
                          </div>
                          <button className="btn btn-link text-muted p-0">
                            <i className="bi bi-star"></i>
                          </button>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-primary bg-opacity-10 text-primary rounded p-1 me-1">
                              <i className="bi bi-geo-alt small"></i>
                            </span>
                            Remote
                          </span>
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-success bg-opacity-10 text-success rounded p-1 me-1">
                              <i className="bi bi-cash small"></i>
                            </span>
                            $240 - $360/month
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {["Freelancer | Content Writing | Remote"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="badge bg-success bg-opacity-10 text-success"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>

                        <div className="text-end">
                          <button className="btn btn-success btn-sm text-white">
                            Apply
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Job Card 4 */}
                  <div className="card mb-3 bg-primary bg-opacity-10 border-primary border-opacity-25">
                    <Link to="/job-detail" className="text-decoration-none">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex gap-3">
                            <div
                              className="rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              <span className="fw-bold">CM</span>
                            </div>
                            <div>
                              <h5 className="card-title mb-0">
                                UX/UI Designer
                              </h5>
                              <p className="card-text text-muted small">
                                Creative Studio.
                              </p>
                            </div>
                          </div>
                          <button className="btn btn-link text-muted p-0">
                            <i className="bi bi-star"></i>
                          </button>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-primary bg-opacity-10 text-primary rounded p-1 me-1">
                              <i className="bi bi-geo-alt small"></i>
                            </span>
                            Remote
                          </span>
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-success bg-opacity-10 text-success rounded p-1 me-1">
                              <i className="bi bi-cash small"></i>
                            </span>
                            $200 - $320/month
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {["Internship | UX/UI Design | Figma | Remote"].map(
                            (tag) => (
                              <span
                                key={tag}
                                className="badge bg-primary bg-opacity-10 text-primary"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>

                        <div className="text-end">
                          <button className="btn btn-primary btn-sm text-white">
                            Apply
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Job Card 5 */}

                  <div className="card mb-3 bg-primary bg-opacity-10 border-danger border-opacity-25">
                    <Link to="/job-detail" className="text-decoration-none">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex gap-3">
                            <div
                              className="rounded-circle bg-danger bg-opacity-25 text-danger d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              <span className="fw-bold">CS</span>
                            </div>
                            <div>
                              <h5 className="card-title mb-0">
                                Freelance Video Editor (YouTube)
                              </h5>
                              <p className="card-text text-muted small">
                                Video Creators
                              </p>
                            </div>
                          </div>
                          <button className="btn btn-link text-muted p-0">
                            <i className="bi bi-star"></i>
                          </button>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-primary bg-opacity-10 text-primary rounded p-1 me-1">
                              <i className="bi bi-geo-alt small"></i>
                            </span>
                            Remote
                          </span>
                          <span className="badge bg-light text-dark d-flex align-items-center">
                            <span className="bg-success bg-opacity-10 text-success rounded p-1 me-1">
                              <i className="bi bi-cash small"></i>
                            </span>
                            $200 - $400/month
                          </span>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {[
                            "Freelancer | Video Editing | YouTube | Remote",
                          ].map((tag) => (
                            <span
                              key={tag}
                              className="badge bg-danger bg-opacity-10 text-danger"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-end">
                          <button className="btn btn-danger btn-sm text-white">
                            Apply
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Pagination */}
                  <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li className="page-item active">
                          <a className="page-link rounded-circle" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link rounded-circle" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link rounded-circle" href="#">
                            <i className="bi bi-chevron-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
