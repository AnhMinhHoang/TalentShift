import React from "react";

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
                        <input type="text" className="form-control" placeholder="Search..." />
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
                <span className="badge" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                  Waiting
                </span>
                        </td>
                    </tr>
                    <tr>
                        <td>FullStack Developer</td>
                        <td>FPT Software</td>
                        <td>23-09-2024</td>
                        <td>
                <span className="badge" style={{ backgroundColor: "#f8d7da", color: "#721c24" }}>
                  Rejected
                </span>
                        </td>
                    </tr>
                    <tr>
                        <td>FullStack Developer</td>
                        <td>FPT Software</td>
                        <td>23-09-2024</td>
                        <td>
                <span className="badge" style={{ backgroundColor: "#d4edda", color: "#155724" }}>
                  Completed
                </span>
                        </td>
                    </tr>
                    <tr>
                        <td>FullStack Developer</td>
                        <td>FPT Software</td>
                        <td>23-09-2024</td>
                        <td>
                <span className="badge" style={{ backgroundColor: "#cce5ff", color: "#004085" }}>
                  In Progress
                </span>
                        </td>
                    </tr>
                    <tr>
                        <td>FullStack Developer</td>
                        <td>FPT Software</td>
                        <td>23-09-2024</td>
                        <td>
                <span className="badge" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                  Waiting
                </span>
                        </td>
                    </tr>
                    <tr>
                        <td>FullStack Developer</td>
                        <td>FPT Software</td>
                        <td>23-09-2024</td>
                        <td>
                <span className="badge" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
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
                        <a className="page-link" href="#" style={{ backgroundColor: "#428A9B", borderColor: "#428A9B" }}>
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

export default AppliedJobsTab;