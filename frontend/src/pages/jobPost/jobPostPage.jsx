import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg1 from "../../assets/images/bg.jpg";
import logo1 from "../../assets/images/company/lenovo-logo.png";

export default function JobPost() {
    return (
        <>
            <section
                className="bg-half-170 d-table w-100 pt-5"
                style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "top" }}
            >
                <div className="bg-overlay bg-gradient-overlay"></div>

                <div className="position-relative" style={{ minHeight: '300px' }}>
                    <div
                        className="hero-banner text-white text-center"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/placeholder.svg?height=500&width=1200")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            paddingBottom: '60px'
                        }}
                    >
                        <div className="container position-relative z-1">
                            <h1 className="display-6 fw-bold mt-5">Create a Job Post</h1>
                        </div>

                        <nav
                            aria-label="breadcrumb"
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
                                    Job Post
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="section bg-light  py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="card border-0 shadow">
                                <form className="rounded shadow p-4">
                                    <div className="row">
                                        <h5 className="mb-3">Job Details:</h5>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Job Title :</label>
                                                <input name="subject" id="subject2" className="form-control" placeholder="Title :" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Description :</label>
                                                <textarea name="comments" id="comments2" rows="4" className="form-control" placeholder="Describe the job :"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Job Type:</label>
                                                <select className="form-control form-select" id="Type">
                                                    <option value="WD">Web Designer</option>
                                                    <option value="WD">Web Developer</option>
                                                    <option value="UI">UI / UX Desinger</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Job Categories:</label>
                                                <select className="form-control form-select" id="Categories">
                                                    <option>All Jobs</option>
                                                    <option>Full Time</option>
                                                    <option>Half Time</option>
                                                    <option>Remote</option>
                                                    <option>In Office</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Salary:</label>
                                                <select className="form-control form-select" id="Salary">
                                                    <option value="HOURL">Hourly</option>
                                                    <option value="MONTH">Monthly</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="mb-3 mt-md-4 pt-md-1">
                                                <label className="form-label small fw-bold d-none"></label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text border" id="basic-addon1">$</span>
                                                    <input type="number" className="form-control" min="1" max="1000" placeholder="Min" id="MIn" aria-describedby="inputGroupPrepend" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="mb-3 mt-md-4 pt-md-1">
                                                <label className="form-label small fw-bold d-none"></label>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text border" id="basic-addon1">$</span>
                                                    <input type="number" className="form-control" min="1" max="1000" placeholder="Max" id="Max" aria-describedby="inputGroupPrepend" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h5 className="mb-3">Skill & Experience:</h5>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Skills:</label>
                                                <input name="name" id="skills" type="text" className="form-control" placeholder="Web Developer" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Qualifications:</label>
                                                <input name="name" id="Qualifications" type="text" className="form-control" placeholder="Qualifications" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Experience:</label>
                                                <input name="name" id="Experience" type="text" className="form-control" placeholder="Experience" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Industry:</label>
                                                <select className="form-control form-select" id="Industry">
                                                    <option value="BANK">Banking</option>
                                                    <option value="BIO">Biotechnology</option>
                                                    <option value="AVI">Aviation</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <h5 className="mb-3">Skill & Experience:</h5>
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Address:</label>
                                                <input name="name" id="Address" type="text" className="form-control" placeholder="Address" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Country:</label>
                                                <select className="form-control form-select" id="Country">
                                                    <option value="USA">USA</option>
                                                    <option value="CAD">Canada</option>
                                                    <option value="CHINA">China</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">State:</label>
                                                <select className="form-control form-select" id="State">
                                                    <option value="CAL">California</option>
                                                    <option value="TEX">Texas</option>
                                                    <option value="FLOR">Florida</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <input type="submit" id="submit2" name="send" className="submitBnt btn btn-primary" value="Post Now" />
                                        </div>
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