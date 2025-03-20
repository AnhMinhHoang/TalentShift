import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg1 from "../../assets/images/bg.jpg";
import logo1 from "../../assets/images/company/lenovo-logo.png";

export default function JobApply() {
    const { id: eidFromUrl } = useParams(); // Extract eid from URL
    const location = useLocation();
    const jobData = location.state?.job;

    const [eid, setEid] = useState("10"); // Default eid to 9 if not in URL
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [jobType, setJobType] = useState("All Jobs");
    const [description, setDescription] = useState("");
    const [resume, setResume] = useState(null);

    // Handle Checkbox
    const [isAccepted, setIsAccepted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsAccepted(event.target.checked);
        setShowWarning(false); // Reset warning when checkbox state changes
    };

    return (
        <>
            <section
                className="bg-half-170 d-table w-100 pt-5"
                style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "top" }}
            >
                <div className="bg-overlay bg-gradient-overlay"></div>

                <div className="position-relatives">
                    <div
                        className="hero-banner text-white text-center py-5"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/placeholder.svg?height=500&width=1200")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            paddingBottom: '60px',
                        }}
                    >
                        <div className="container position-relative z-1">
                            <div className="mb-4">
                                <div className="bg-white rounded-circle d-inline-flex p-2 mb-3">
                                    <img
                                        src={logo1}
                                        className="avatar avatar-ex-sm rounded-circle"
                                        alt="logo"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </div>
                            </div>
                            <h1 className="display-4 fw-bold mb-4">Back-End Developer</h1>

                        </div>
                        <nav aria-label="breadcrumb"
                            className="position-absolute bottom-0 start-50 translate-middle-x"
                        >
                            <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link to="/" className="text-white me-2">
                                        TalentShift
                                    </Link>
                                </li>
                                /
                                <li className="breadcrumb-item">
                                    <Link to="/" className="text-white me-2">
                                        Job
                                    </Link>
                                </li>
                                /
                                <li className="breadcrumb-item active text-white" aria-current="page">
                                    Job Apply
                                </li>
                            </ol>
                        </nav>

                    </div>

                </div>

            </section >

            <section className="section bg-light py-5 ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="card border-0 shadow" >
                                <form className="rounded p-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Your Name :<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    name="name"
                                                    id="name2"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name :"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Your Email :<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    name="email"
                                                    id="email2"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Your email :"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Your Phone no. :<span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    name="number"
                                                    id="number2"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Your phone no. :"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Job Title :
                                                </label>
                                                <input
                                                    name="subject"
                                                    id="subject2"
                                                    className="form-control"
                                                    placeholder="Title :"
                                                    value={occupation}
                                                    onChange={(e) => setOccupation(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Types of jobs :
                                                </label>
                                                <select
                                                    className="form-control form-select"
                                                    id="Sortbylist-Shop"
                                                    value={jobType}
                                                    onChange={(e) => setJobType(e.target.value)}
                                                >
                                                    <option value="All Jobs">All Jobs</option>
                                                    <option value="Full Time">Full Time</option>
                                                    <option value="Half Time">Half Time</option>
                                                    <option value="Remote">Remote</option>
                                                    <option value="In Office">In Office</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">
                                                    Description :
                                                </label>
                                                <textarea
                                                    name="comments"
                                                    id="comments2"
                                                    rows="4"
                                                    className="form-control"
                                                    placeholder="Describe the job :"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="formFile"
                                                    className="form-label fw-semibold"
                                                >
                                                    Upload Your Cv / Resume :
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="formFile"
                                                    onChange={(e) => setResume(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                        checked={isAccepted}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault"
                                                    >
                                                        I Accept{" "}
                                                        <Link to="#" className="text-primary decoration-none">
                                                            Terms And Condition
                                                        </Link>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    type="submit"
                                                    id="submit2"
                                                    name="send"
                                                    className="submitBtn btn btn-primary w-25"
                                                    value="Apply Now"
                                                    style={{
                                                        opacity: isAccepted ? 1 : 0.5,
                                                        cursor: isAccepted ? "pointer" : "not-allowed",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {showWarning && (
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className="text-danger">
                                                        You need to accept the terms and conditions before
                                                        applying.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}