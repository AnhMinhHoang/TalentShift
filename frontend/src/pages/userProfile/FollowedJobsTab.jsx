import React from "react";

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
                                            background: "linear-gradient(to bottom right, #ff6b6b, #6b66ff)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div className="rounded-circle bg-white" style={{ width: "32px", height: "32px" }}></div>
                                    </div>
                                    <div>
                                        <h6 className="card-title mb-1">Forward Security Director</h6>
                                        <p className="card-text small text-muted">Bosch, Singapore and Shinjuku Co</p>
                                    </div>
                                    <button className="btn btn-link p-0 ms-auto" style={{ color: "#428A9B" }}>
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

                                <button className="btn w-100" style={{ backgroundColor: "#428A9B", color: "white" }}>
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

export default FollowedJobsTab;