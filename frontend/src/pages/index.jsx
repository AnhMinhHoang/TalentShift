import React from "react"
import { Link } from "react-router-dom";
import ComboBox from "./dropDownCombobox.jsx";
import ImageCarousel from "./image-carousel.jsx"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];
const carouselImages = [
  {
    src: "/asset/images/first-slide.jpg",
    alt: "Creative Workspace",
    caption: "Find Your Perfect Place",
    description: "Browse through our extensive collection of job listings from top employers worldwide.",
  },
  {
    src: "/asset/images/second-slide.jpg",
    alt: "Job Opportunities",
    caption: "Thousands of Open Positions",
    description: "Colleagues working together in a modern office environment.",
  },
  {
    src: "/asset/images/third-slide.jpg",
    alt: "Productivity Focus",
    caption: "Boost Your Career Potential",
    description: "Access resources and tools designed to enhance your productivity and professional growth.",
  },
  {
    src: "/asset/images/last-slide.jpg",
    alt: "Professional Development",
    caption: "Continuous Learning Journey",
    description: "Expand your knowledge and skills with our educational resources and career development paths.",
  },
]
function index() {
  return (
      <main>
        <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12 mx-auto">
                <h1 className="text-white text-center">Discover. Learn. Enjoy</h1>
                <h6 className="text-center">platform for creatives around the world</h6>
                <form method="get" className="custom-form mt-4 pt-2 mb-lg-0 mb-5" role="search">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff',
                    borderRadius: 50,
                    padding: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    gap: 0,
                  }}>
                    <span style={{ padding: '0 18px', color: '#6c757d', fontSize: 22, display: 'flex', alignItems: 'center' }}>
                      <i className="bi bi-search"></i>
                    </span>
                    <input name="keyword" type="search" className="form-control border-0 shadow-none" id="keyword"
                      placeholder="Search for ..." aria-label="Search"
                      style={{ border: 'none', outline: 'none', boxShadow: 'none', fontSize: 18, background: 'transparent', color: '#333', borderRadius: 0, minWidth: 220 }}
                    />
                    <ComboBox options={options} />
                    <button type="submit" style={{
                      background: '#80d0c7',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 40,
                      fontWeight: 600,
                      fontSize: 20,
                      padding: '10px 38px',
                      marginLeft: 10,
                      transition: 'background 0.2s',
                      boxShadow: 'none',
                      cursor: 'pointer',
                    }}>Search</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

            <section className="featured-section py-5" style={{ background: "rgba(128, 208, 199, 0.2)" }}>
              <div className="container">
                <div className="row justify-content-center">
                  {/* For Employers Card */}
                  <div className="col-lg-5 col-md-6 col-12 mb-4 mb-lg-0" style={{ paddingRight: "10px" }}>
                    <div 
                      className="custom-block bg-white"
                      style={{
                        height: "auto", 
                        minHeight: "px",
                        borderRadius: "25px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <a href="#" style={{ textDecoration: "none", color: "inherit", height: "100%" }}>
                        <div className="d-flex p-30 h-40">
                          <div style={{ flex: "1" }}>
                            <h5 className="mb-4" style={{ color: "#13547a" }}>For Employers</h5>
                            <p className="mb-4">Hire talented freelancers from various fields. Post your job today and connect with skilled professionals.</p>
                            <div style={{ marginTop: "auto" }}>
                              <Link 
                                to="/topic-detail" 
                                className="btn custom-btn"
                                style={{
                                  background: "#80d0c7",
                                  color: "white",
                                  borderRadius: "25px",
                                  padding: "8px 20px",
                                }}
                              >
                                Post Your Job
                              </Link>
                            </div>
                          </div>
                          <div className="ms-3 d-flex align-items-center">
                            <img 
                              src="/asset/images/topics/banner-home-01 (1).svg" 
                              alt="For Employers"
                              style={{ maxWidth: "100%", maxHeight: "120px" }}
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* For Candidate Card */}
                  <div className="col-lg-5 col-md-6 col-12 mb-4 mb-lg-0" style={{ paddingLeft: "10px" }}>
                    <div 
                      className="custom-block bg-white"
                      style={{
                        height: "auto", 
                        minHeight: "300px",
                        borderRadius: "25px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <a href="#" style={{ textDecoration: "none", color: "inherit", height: "100%" }}>
                        <div className="d-flex p-30 h-40">
                          <div style={{ flex: "1" }}>
                            <h5 className="mb-4" style={{ color: "#13547a" }}>For Candidate</h5>
                            <p className="mb-4">Showcase your skills, connect with employers, and find freelance projects that match your expertise.</p>
                            <div style={{ marginTop: "auto" }}>
                              <Link 
                                to="/topic-detail" 
                                className="btn custom-btn"
                                style={{
                                  background: "#80d0c7",
                                  color: "white",
                                  borderRadius: "25px",
                                  padding: "8px 20px",
                                }}
                              >
                                Post Your CV
                              </Link>
                            </div>
                          </div>
                          <div className="ms-3 d-flex align-items-center">
                            <img 
                              src="/asset/images/topics/banner-home-02.svg" 
                              alt="For Candidate"
                              style={{ maxWidth: "100%", maxHeight: "120px" }}
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

        <section className="carousel-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4">Elevate Your Career</h2>
              <ImageCarousel images={carouselImages} />
            </div>
          </div>
        </div>
      </section>
        <section className="explore-section section-padding" id="section_2">

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="design-tab-pane" role="tabpanel"
                       aria-labelledby="design-tab" tabIndex="0">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                        <div className="custom-block bg-white ">
                        <img src="/asset/images/topics/undraw_Remote_design_team_re_urdx.png"
                          className="custom-block-image img-fluid" alt=""/>
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Reliable Dealings</h5>
                                <p className="mb-0">We ensure transparent and trustworthy interactions, helping you connect with the right professionals seamlessly.</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                        <div className="custom-block bg-white ">
                        <img src="/asset/images/topics/undraw_Redesign_feedback_re_jvm0.png"
                          className="custom-block-image img-fluid" alt=""/>
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Data Secured</h5>
                                <p className="mb-0">Your information is protected with top-tier security measures, ensuring privacy and safeguarding your data.</p>
                              </div>

                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="custom-block bg-white ">
                        <img src="/asset/images/topics/colleagues-working-cozy-office-medium-shot.png"
                          className="custom-block-image img-fluid" alt=""/>
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Live Chat Support 24</h5>
                                <p className="mb-0">Get instant assistance anytime with our 24/7 live chat support, ready to help with all your queries.</p>
                              </div>
                            </div>

                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="marketing-tab-pane" role="tabpanel" aria-labelledby="marketing-tab"
                       tabIndex="0">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Advertising</h5>
                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>
                              <span className="badge bg-advertising rounded-pill ms-auto">30</span>
                            </div>
                            <img src="/asset/images/topics/undraw_online_ad_re_ol62.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Video Content</h5>
                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>
                              <span className="badge bg-advertising rounded-pill ms-auto">65</span>
                            </div>
                            <img src="/asset/images/topics/undraw_Group_video_re_btu7.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Viral Tweet</h5>
                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>
                              <span className="badge bg-advertising rounded-pill ms-auto">50</span>
                            </div>
                            <img src="/asset/images/topics/undraw_viral_tweet_gndb.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="finance-tab-pane" role="tabpanel" aria-labelledby="finance-tab"
                       tabIndex="0">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Investment</h5>
                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>
                              <span className="badge bg-finance rounded-pill ms-auto">30</span>
                            </div>
                            <img src="/asset/images/topics/undraw_Finance_re_gnv2.png" className="custom-block-image img-fluid"
                                 alt=""/>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="custom-block custom-block-overlay">
                          <div className="d-flex flex-column h-100">
                            <img
                                src="/asset/images/businesswoman-using-tablet-analysis-graph-company-finance-strategy-statistics-success-concept-planning-future-office-room.jpg"
                                className="custom-block-image img-fluid" alt=""/>
                            <div className="custom-block-overlay-text d-flex">
                              <div>
                                <h5 className="text-white mb-2">Finance</h5>
                                <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                                  animi necessitatibus aperiam repudiandae nam omnis</p>
                                <Link to="/topic-detail" className="btn custom-btn mt-2 mt-lg-3">Learn More</Link>
                              </div>
                              <span className="badge bg-finance rounded-pill ms-auto">25</span>
                            </div>
                            <div className="social-share d-flex">
                              <p className="text-white me-4">Share:</p>
                              <ul className="social-icon">
                                <li className="social-icon-item">
                                  <a href="#" className="social-icon-link bi-twitter"></a>
                                </li>
                                <li className="social-icon-item">
                                  <a href="#" className="social-icon-link bi-facebook"></a>
                                </li>
                                <li className="social-icon-item">
                                  <a href="#" className="social-icon-link bi-pinterest"></a>
                                </li>
                              </ul>
                              <a href="#" className="custom-icon bi-bookmark ms-auto"></a>
                            </div>
                            <div className="section-overlay"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="music-tab-pane" role="tabpanel" aria-labelledby="music-tab"
                       tabIndex="0">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Composing Song</h5>
                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>
                              <span className="badge bg-music rounded-pill ms-auto">45</span>
                            </div>

                            <img src="/asset/images/topics/undraw_Compose_music_re_wpiw.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-3">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Online Music</h5>

                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>

                              <span className="badge bg-music rounded-pill ms-auto">45</span>
                            </div>

                            <img src="/asset/images/topics/undraw_happy_music_g6wc.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Podcast</h5>

                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>

                              <span className="badge bg-music rounded-pill ms-auto">20</span>
                            </div>

                            <img src="/asset/images/topics/undraw_Podcast_audience_re_4i5q.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="education-tab-pane" role="tabpanel" aria-labelledby="education-tab"
                       tabIndex="0">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-3">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Graduation</h5>

                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>

                              <span className="badge bg-education rounded-pill ms-auto">80</span>
                            </div>

                            <img src="/asset/images/topics/undraw_Graduation_re_gthn.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="custom-block bg-white shadow-lg">
                          <Link to="/topic-detail">
                            <div className="d-flex">
                              <div>
                                <h5 className="mb-2">Educator</h5>

                                <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                              </div>

                              <span className="badge bg-education rounded-pill ms-auto">75</span>
                            </div>

                            <img src="/asset/images/topics/undraw_Educator_re_ju47.png"
                                 className="custom-block-image img-fluid" alt=""/>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

          <section className="popular-category-section section-padding">
            <div className="container">
              <div className="row mb-4">
                <div className="col-8">
                  <h2>Popular category</h2>
                  <p className="text-muted">2025 jobs live - 293 added today.</p>
                </div>
                <div className="col-4 text-end d-flex align-items-center justify-content-end">
                  <Link to="/" className="view-all" style={{ color: "#13547a" }}>
                    View all categories
                  </Link>
                </div>
              </div>

              <div className="row position-relative">
                <button
                  className="category-nav-btn prev-btn"
                  style={{
                    position: "absolute",
                    left: "-15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "white",
                    border: "none",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <div className="col-lg-3 col-md-6 col-12 mb-4">
                  <div className="custom-block bg-white shadow-sm" style={{ borderRadius: "10px", padding: "20px" }}>
                    <div
                      className="category-icon d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#13547a",
                      }}
                    >
                      <i className="bi bi-code-slash text-white"></i>
                    </div>
                    <h5 className="mb-1">Development & IT</h5>
                    <p className="text-muted small mb-2">18 jobs</p>
                    <p className="small">Frontend, backend, web and app developer jobs.</p>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12 mb-4">
                  <div className="custom-block bg-white shadow-sm" style={{ borderRadius: "10px", padding: "20px" }}>
                    <div
                      className="category-icon d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#80d0c7",
                      }}
                    >
                      <i className="bi bi-bar-chart text-white"></i>
                    </div>
                    <h5 className="mb-1">Marketing & Sales</h5>
                    <p className="text-muted small mb-2">8 jobs</p>
                    <p className="small">Advertising, digital marketing and brand management jobs.</p>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12 mb-4">
                  <div className="custom-block bg-white shadow-sm" style={{ borderRadius: "10px", padding: "20px" }}>
                    <div
                      className="category-icon d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#13547a",
                      }}
                    >
                      <i className="bi bi-palette text-white"></i>
                    </div>
                    <h5 className="mb-1">Design & Creative</h5>
                    <p className="text-muted small mb-2">13 jobs</p>
                    <p className="small">Graphic, digital, web, and product design jobs.</p>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12 mb-4">
                  <div className="custom-block bg-white shadow-sm" style={{ borderRadius: "10px", padding: "20px" }}>
                    <div
                      className="category-icon d-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "#80d0c7",
                      }}
                    >
                      <i className="bi bi-headset text-white"></i>
                    </div>
                    <h5 className="mb-1">Customer Service</h5>
                    <p className="text-muted small mb-2">9 jobs</p>
                    <p className="small">Customer experience and account management jobs.</p>
                  </div>
                </div>

                <button
                  className="category-nav-btn next-btn"
                  style={{
                    position: "absolute",
                    right: "-15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "white",
                    border: "none",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </section>
 

        <section className="timeline-section section-padding" id="section_3">
          <div className="section-overlay"></div>

          <div className="container">
            <div className="row">

              <div className="col-12 text-center">
                <h2 className="text-white mb-4">How does it work?</h2>
              </div>

              <div className="col-lg-10 col-12 mx-auto">
                <div className="timeline-container">
                  <ul className="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                    <div className="list-progress">
                      <div className="inner"></div>
                    </div>

                    <li>
                      <h4 className="text-white mb-3">Search for Opportunities</h4>

                      <p className="text-white">Sign up and create a professional profile to showcase your skills, education, and experience. Then, start searching for freelance projects or job listings that match your interests.</p>

                      <div className="icon-holder">
                        <i className="bi-search"></i>
                      </div>
                    </li>

                    <li>
                      <h4 className="text-white mb-3">Connect &amp; Apply</h4>

                      <p className="text-white">Find exciting opportunities, message employers or clients directly, and apply for the jobs you're passionate about.</p>

                      <div className="icon-holder">
                        <i className="bi-bookmark"></i>
                      </div>
                    </li>

                    <li>
                      <h4 className="text-white mb-3">Work &amp; Get Paid</h4>

                      <p className="text-white">Complete projects and get paid securely through the platform. Enjoy flexible work and explore new growth opportunities.</p>

                      <div className="icon-holder">
                        <i className="bi-book"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 text-center mt-5">
                <p className="text-white">
                  Want to learn more?
                  <a href="#" className="btn custom-btn custom-border-btn ms-3">Check out Youtube</a>
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="faq-section section-padding" id="section_4">
          <div className="container">
            <div className="row">

              <div className="col-lg-6 col-12">
                <h2 className="mb-4">Frequently Asked Questions</h2>
              </div>

              <div className="clearfix"></div>

              <div className="col-lg-5 col-12">
                <img src="/asset/images/faq_graphic.jpg" className="img-fluid" alt="FAQs"/>
              </div>

              <div className="col-lg-6 col-12 m-auto">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        What is TalentShift?
                      </button>
                    </h2>

                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                         data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      TalentShift is an online platform designed specifically for students and freelancers to connect with employers globally. It allows you to find freelance jobs, showcase your skills, and create professional profiles. Whether you're just starting or looking to grow your career, TalentShift provides the perfect place to discover opportunities.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        How to find a job or project?
                      </button>
                    </h2>

                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                         data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      You can search for freelance opportunities by using keywords or categories that match your skills and interests. Create your profile, explore various job listings, and directly apply to the ones that best fit your expertise. Stay connected and responsive to increase your chances of landing your next project.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Can I edit my profile after creating it?
                      </button>
                    </h2>

                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                         data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Absolutely! You can update your profile anytime to reflect your latest skills, experience, or portfolio. Keeping your profile up-to-date helps you stand out to potential employers and ensures you're showcasing your best work.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
);
}

export default index;