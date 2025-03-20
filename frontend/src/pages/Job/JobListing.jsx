import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";

function JobListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading animation
    setLoading(true);

    // Simulate an API call with setTimeout
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  // Sample data array for main topics
  const topics = [
    {
      id: 1,
      title: "Web Design",
      description:
        "Topic Listing includes home, listing, detail and contact pages...",
      image: "/asset/images/topics/undraw_Remote_design_team_re_urdx.png",
      count: 14,
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 2,
      title: "Advertising",
      description: "Visit TemplateMo website to download free CSS templates...",
      image: "/asset/images/topics/undraw_online_ad_re_ol62.png",
      count: 30,
      skills: ["Marketing", "SEO", "Analytics"],
    },
    {
      id: 3,
      title: "Podcast",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit...",
      image: "/asset/images/topics/undraw_Podcast_audience_re_4i5q.png",
      count: 20,
      skills: ["Audio Editing", "Content Creation"],
    },
    {
      id: 4,
      title: "Investment",
      description: "Lorem Ipsum dolor sit amet consectetur",
      image: "/asset/images/topics/undraw_Finance_re_gnv2.png",
      count: 30,
      skills: ["Finance", "Analysis", "Excel"],
    },
    {
      id: 5,
      title: "Finance",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit...",
      image: "/asset/images/businesswoman-using-tablet-analysis.jpg",
      count: 25,
      skills: ["Accounting", "Python", "SQL"],
    },
  ];

  // Sample data for suggested jobs
  const suggestedJobs = [
    {
      id: 6,
      title: "Ky Su Phat Trien BackEnd - Khong",
      company: "MBBANK",
      skills: ["Oracle", "Java", "SQL"],
      image: "/asset/images/businesswoman-using-tablet-analysis.jpg", // Replace with actual logo path
    },
    {
      id: 7,
      title: "Chuyen vien, Chuyen vien cao...",
      company: "MBBANK",
      skills: ["SQL", "Python", "IT Security"],
      image: "/asset/images/businesswoman-using-tablet-analysis.jpg",
    },
    {
      id: 8,
      title: "IT Infrastructure Engineer",
      company: "Sunbytes",
      skills: ["English", "IT Infrastructure"],
      image: "/asset/images/businesswoman-using-tablet-analysis.jpg", // Replace with actual logo path
    },
    {
      id: 9,
      title: "Senior API Engineer (English)",
      company: "Alephon",
      skills: ["C#", "Restful Api", "API"],
      image: "/asset/images/businesswoman-using-tablet-analysis.jpg", // Replace with actual logo path
    },
    {
      id: 10,
      title: "Data Scientist",
      company: "HEINEKEN Vietnam",
      skills: ["SQL", "Python", "Data Science"],
      image: "/asset/images/businesswoman-using-tablet-analysis.jpg", // Replace with actual logo path
    },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTopics = topics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(topics.length / itemsPerPage);

  return (
    <main>
      <Loading isLoading={loading} />
      {/* Header */}
      <header
        className="site-header"
        style={{
          paddingTop: "100px",
          paddingBottom: "20px",
        }}
      >
        <section className="search-filter py-3">
          <div className="container">
            <div className="row mb-3">
              <div className="col-12">
                <div
                  style={{
                    backgroundColor: "var(--white-color)",
                    borderRadius: "0.375rem",
                    padding: "10px 15px",
                  }}
                  className="input-group col-8"
                >
                  <input
                    type="text"
                    className="form-control p-3 border-0"
                    placeholder="Tìm kiếm theo các Kỹ năng, Vị trí, Công ty..."
                    aria-label="Search"
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                  />
                  <button
                    className="btn text-white col-2"
                    type="submit"
                    style={{
                      backgroundColor: "#80d0c7",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <i className="bi bi-search me-1"></i> Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-sm-6 mb-2">
                <div className="dropdown w-100">
                  <button
                    className="btn btn-light dropdown-toggle w-100 text-start p-3"
                    type="button"
                    id="locationDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tất cả địa điểm
                  </button>
                  <ul
                    className="dropdown-menu w-100"
                    aria-labelledby="locationDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Hà Nội
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Hồ Chí Minh
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Đà Nẵng
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 mb-2">
                <div className="dropdown w-100">
                  <button
                    className="btn btn-light dropdown-toggle w-100 text-start p-3"
                    type="button"
                    id="levelDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tất cả cấp bậc
                  </button>
                  <ul
                    className="dropdown-menu w-100"
                    aria-labelledby="levelDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Nhân viên
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Quản lý
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Giám đốc
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 mb-2">
                <div className="dropdown w-100">
                  <button
                    className="btn btn-light dropdown-toggle w-100 text-start p-3"
                    type="button"
                    id="jobTypeDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tất cả loại công việc
                  </button>
                  <ul
                    className="dropdown-menu w-100"
                    aria-labelledby="jobTypeDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Toàn thời gian
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Bán thời gian
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Freelance
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 mb-2">
                <div className="d-flex">
                  <div className="dropdown flex-grow-1 me-2">
                    <button
                      className="btn btn-light dropdown-toggle w-100 text-start p-3"
                      type="button"
                      id="contractDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Tất cả loại hợp đồng
                    </button>
                    <ul
                      className="dropdown-menu w-100"
                      aria-labelledby="contractDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Dài hạn
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Ngắn hạn
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dự án
                        </a>
                      </li>
                    </ul>
                  </div>

                  <button className="btn btn-secondary" type="button">
                    <i className="bi bi-x-circle"></i> Xóa bộ lọc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section className="mt-4">
        <div className="container">
          {/* Main Content and Suggested Jobs */}
          <div className="row">
            {/* Main Content Area */}
            <div className="col-lg-9 col-12">
              <div className="row">
                <div className="col-12 ">
                  <h3 className="">Jobs</h3>
                </div>
                {currentTopics.length > 0 ? (
                  currentTopics.map((topic) => (
                    <div key={topic.id} className="col-12 mb-4">
                      <div className="custom-block custom-block-topics-listing bg-white shadow-lg p-4 d-flex align-items-center">
                        <img
                          src={topic.image}
                          className="custom-block-image img-fluid me-3"
                          alt={topic.title}
                          style={{ maxWidth: "100px" }}
                        />
                        <div className="flex-grow-1">
                          <h5 className="mb-2">
                            {topic.title}{" "}
                            <span className="badge bg-danger">Hot Job</span>
                          </h5>
                          <p className="mb-2">{topic.description}</p>
                          <div className="mb-2">
                            {topic.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="badge bg-secondary me-1"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <Link
                            to="/job-detail"
                            className="btn custom-btn mt-2"
                          >
                            Learn More
                          </Link>
                        </div>
                        <span className="badge bg-design rounded-pill ms-auto">
                          {topic.count}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No topics found.</p>
                )}
                {/* Pagination */}
                <div className="col-12">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </li>
                        )
                      )}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            {/* Suggested Jobs Section */}
            <div className="col-lg-3 col-12">
              <div className="suggested-jobs bg-white p-3 rounded shadow-sm mb-5">
                <h4 className="mb-3">Suggested Jobs</h4>
                {suggestedJobs.map((job) => (
                  <div key={job.id} className="mb-3 p-2 border rounded">
                    <div className="d-flex align-items-center">
                      <img
                        src={job.image}
                        className="me-2"
                        alt={`${job.company} logo`}
                        style={{ maxWidth: "50px" }}
                      />
                      <div>
                        <h6 className="mb-1">{job.title}</h6>
                        <p className="mb-0 text-muted">{job.company}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark me-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JobListing;
