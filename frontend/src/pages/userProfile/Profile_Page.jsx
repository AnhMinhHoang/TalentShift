import { useState } from "react";
import OverviewTab from "./OverviewTab";
// Import icons (assuming you're using a library like react-icons)
// If you're not using a library, you can create custom icon components

const JobTracker = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-light py-4 mt-5 pt-5">
      <div className="container">
        <div className="card shadow-sm">
          {/* Navigation Tabs */}
          <ul className="nav nav-tabs px-3">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "cv" ? "active" : ""}`}
                onClick={() => setActiveTab("cv")}
              >
                CV Management
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "applied" ? "active" : ""
                }`}
                onClick={() => setActiveTab("applied")}
              >
                Applied Job
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "followed" ? "active" : ""
                }`}
                onClick={() => setActiveTab("followed")}
              >
                Followed Job
              </button>
            </li>
          </ul>

          <div className="row g-0">
            {/* Profile Sidebar */}
            <div className="col-md-3 border-end">
              <div className="p-4 text-center">
                <div
                  className="mx-auto rounded-circle"
                  style={{
                    width: "128px",
                    height: "128px",
                    background:
                      "linear-gradient(to bottom right, #428A9B, #266987)",
                  }}
                ></div>
                <h5 className="mt-3 mb-0">Nguyen Van A</h5>
                <p className="text-muted small">nguyen@gmail.com</p>

                <div className="text-start mt-3 small">
                  <p className="text-muted">
                    Description Description: Just a normal guy here...Just a
                    normal guy here...Just a normal guy here...Just a normal guy
                    here...Just a normal guy here...Just a normal guy here...
                  </p>

                  <button
                    className="btn w-100 mt-2"
                    style={{ backgroundColor: "#428A9B", color: "white" }}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit Profile
                  </button>

                  <div className="mt-3">
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="bi bi-calendar me-2"
                        style={{ color: "#428A9B" }}
                      ></i>
                      <span>05-06-2024</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="bi bi-geo-alt me-2"
                        style={{ color: "#428A9B" }}
                      ></i>
                      <span>Hanoi, Vietnam</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="bi bi-telephone me-2"
                        style={{ color: "#428A9B" }}
                      ></i>
                      <span>123.456.7678</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="bi bi-envelope me-2"
                        style={{ color: "#428A9B" }}
                      ></i>
                      <span>gmail.com/ABC</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="bi bi-facebook me-2"
                        style={{ color: "#428A9B" }}
                      ></i>
                      <span>facebook.com/ABC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-9">
              <div className="p-4">
                {activeTab === "applied" && <AppliedJobsTab />}
                {activeTab === "cv" && <CVManagementTab />}
                {activeTab === "followed" && <FollowedJobsTab />}
                {activeTab === "overview" && <OverviewTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppliedJobsTab = () => {
  return (
    <div>
      <h4 className="mb-4">Applied Job</h4>

      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-8 mb-2 mb-md-0">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <select className="form-select">
            <option>Status - All</option>
            <option>Waiting</option>
            <option>Rejected</option>
            <option>Completed</option>
            <option>In Progress</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FullStack Developer</td>
              <td>FPT Software</td>
              <td>23-09-2024</td>
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: "#fff3cd", color: "#856404" }}
                >
                  Waiting
                </span>
              </td>
            </tr>
            <tr>
              <td>FullStack Developer</td>
              <td>FPT Software</td>
              <td>23-09-2024</td>
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
                >
                  Rejected
                </span>
              </td>
            </tr>
            <tr>
              <td>FullStack Developer</td>
              <td>FPT Software</td>
              <td>23-09-2024</td>
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: "#d4edda", color: "#155724" }}
                >
                  Completed
                </span>
              </td>
            </tr>
            <tr>
              <td>FullStack Developer</td>
              <td>FPT Software</td>
              <td>23-09-2024</td>
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: "#cce5ff", color: "#004085" }}
                >
                  In Progress
                </span>
              </td>
            </tr>
            <tr>
              <td>FullStack Developer</td>
              <td>FPT Software</td>
              <td>23-09-2024</td>
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: "#fff3cd", color: "#856404" }}
                >
                  Waiting
                </span>
              </td>
            </tr>
            <tr>
              <td>FullStack Developer</td>
              <td>FPT Software</td>
              <td>23-09-2024</td>
              <td>
                <span
                  className="badge"
                  style={{ backgroundColor: "#fff3cd", color: "#856404" }}
                >
                  Waiting
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-secondary d-flex align-items-center">
          <i className="bi bi-chevron-left me-1"></i> Previous
        </button>

        <ul className="pagination mb-0">
          <li className="page-item active">
            <a
              className="page-link"
              href="#"
              style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" style={{ color: "#428A9B" }}>
              2
            </a>
          </li>
        </ul>

        <button className="btn btn-outline-secondary d-flex align-items-center">
          Next <i className="bi bi-chevron-right ms-1"></i>
        </button>
      </div>
    </div>
  );
};

const CVManagementTab = () => {
  return (
    <div>
      <h4 className="mb-4">CV Management</h4>

      {/* Search and Add Button */}
      <div className="row mb-4">
        <div className="col-md-8 mb-2 mb-md-0">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="col-md-4">
          <button
            className="btn w-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#428A9B", color: "white" }}
          >
            <i className="bi bi-plus me-1"></i> Add New CV
          </button>
        </div>
      </div>

      {/* CV List */}
      <div className="list-group">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h6 className="mb-1">VanA Back-End Developer</h6>
              <small className="text-muted">Created at 06/2022</small>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm"
                style={{ backgroundColor: "#428A9B", color: "white" }}
              >
                Download CV
              </button>
              <button className="btn btn-danger btn-sm">Delete CV</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-secondary d-flex align-items-center">
          <i className="bi bi-chevron-left me-1"></i> Previous
        </button>

        <ul className="pagination mb-0">
          <li className="page-item active">
            <a
              className="page-link"
              href="#"
              style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" style={{ color: "#428A9B" }}>
              2
            </a>
          </li>
        </ul>

        <button className="btn btn-outline-secondary d-flex align-items-center">
          Next <i className="bi bi-chevron-right ms-1"></i>
        </button>
      </div>
    </div>
  );
};

const FollowedJobsTab = () => {
  return (
    <div>
      <h4 className="mb-4">Followed Job</h4>

      {/* Job Cards Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="col">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div
                    className="rounded"
                    style={{
                      width: "48px",
                      height: "48px",
                      background:
                        "linear-gradient(to bottom right, #ff6b6b, #6b66ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="rounded-circle bg-white"
                      style={{ width: "32px", height: "32px" }}
                    ></div>
                  </div>
                  <div>
                    <h6 className="card-title mb-1">
                      Forward Security Director
                    </h6>
                    <p className="card-text small text-muted">
                      Bosch, Singapore and Shinjuku Co
                    </p>
                  </div>
                  <button
                    className="btn btn-link p-0 ms-auto"
                    style={{ color: "#428A9B" }}
                  >
                    <i className="bi bi-bookmark"></i>
                  </button>
                </div>

                <div className="d-flex gap-3 mb-3 small text-muted">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-building me-1"></i>
                    <span>Hotels & Tourism</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-currency-dollar me-1"></i>
                    <span>$40000-$42000</span>
                  </div>
                </div>

                <button
                  className="btn w-100"
                  style={{ backgroundColor: "#428A9B", color: "white" }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-secondary d-flex align-items-center">
          <i className="bi bi-chevron-left me-1"></i> Previous
        </button>

        <ul className="pagination mb-0">
          <li className="page-item active">
            <a
              className="page-link"
              href="#"
              style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" style={{ color: "#428A9B" }}>
              2
            </a>
          </li>
        </ul>

        <button className="btn btn-outline-secondary d-flex align-items-center">
          Next <i className="bi bi-chevron-right ms-1"></i>
        </button>
      </div>
    </div>
  );
};

export default JobTracker;
