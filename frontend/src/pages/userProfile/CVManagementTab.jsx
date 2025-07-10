import React from "react";

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
                        <input type="text" className="form-control" placeholder="Search..." />
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
                    <div key={item} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="mb-1">VanA Back-End Developer</h6>
                            <small className="text-muted">Created at 06/2022</small>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-sm" style={{ backgroundColor: "#428A9B", color: "white" }}>
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

export default CVManagementTab;