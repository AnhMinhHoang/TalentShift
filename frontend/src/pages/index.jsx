import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

function Index() {
  const [activeTab, setActiveTab] = useState("design"); // State for active tab

  useEffect(() => {
    // Load external scripts
    const loadScripts = () => {
      const scripts = [
        "/asset/js/jquery.min.js",
        "/asset/js/bootstrap.bundle.min.js",
        "/asset/js/jquery.sticky.js",
        "/asset/js/click-scroll.js",
        "/asset/js/custom.js"
      ];

      scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Maintain execution order
        document.body.appendChild(script);
      });
    };

    loadScripts();

    // Cleanup if needed
    return () => {
      // Remove scripts if necessary
    };
  }, []);

  const tabContent = {
    design: [
      {
        title: "Web Design",
        description: "Topic Listing Template based on Bootstrap 5",
        badge: 14,
        image: "/asset/images/topics/undraw_Remote_design_team_re_urdx.png",
      },
      {
        title: "Graphic",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 75,
        image: "/asset/images/topics/undraw_Redesign_feedback_re_jvm0.png",
      },
      {
        title: "Logo Design",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 100,
        image: "/asset/images/topics/colleagues-working-cozy-office-medium-shot.png",
      },
    ],
    marketing: [
      {
        title: "Advertising",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 30,
        image: "/asset/images/topics/undraw_online_ad_re_ol62.png",
      },
      {
        title: "Video Content",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 65,
        image: "/asset/images/topics/undraw_Group_video_re_btu7.png",
      },
      {
        title: "Viral Tweet",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 50,
        image: "/asset/images/topics/undraw_viral_tweet_gndb.png",
      },
    ],
    finance: [
      {
        title: "Investment",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 30,
        image: "/asset/images/topics/undraw_Finance_re_gnv2.png",
      },
      {
        title: "Finance",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        badge: 25,
        image: "/asset/images/businesswoman-using-tablet-analysis.jpg",
      },
    ],
    music: [
      {
        title: "Composing Song",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 45,
        image: "/asset/images/topics/undraw_Compose_music_re_wpiw.png",
      },
      {
        title: "Online Music",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 45,
        image: "/asset/images/topics/undraw_happy_music_g6wc.png",
      },
      {
        title: "Podcast",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 20,
        image: "/asset/images/topics/undraw_Podcast_audience_re_4i5q.png",
      },
    ],
    education: [
      {
        title: "Graduation",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 80,
        image: "/asset/images/topics/undraw_Graduation_re_gthn.png",
      },
      {
        title: "Educator",
        description: "Lorem Ipsum dolor sit amet consectetur",
        badge: 75,
        image: "/asset/images/topics/undraw_Educator_re_ju47.png",
      },
    ],
  };

  return (
    <Fragment>
      <main>
        <section
          className="hero-section d-flex justify-content-center align-items-center"
          id="section_1"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12 mx-auto">
                <h1 className="text-white text-center">
                  Discover. Learn. Enjoy
                </h1>

                <h6 className="text-center">
                  platform for creatives around the world
                </h6>

                <form
                  method="get"
                  className="custom-form mt-4 pt-2 mb-lg-0 mb-5"
                  role="search"
                >
                  <div className="input-group input-group-lg">
                    <span
                      className="input-group-text bi-search"
                      id="basic-addon1"
                    ></span>

                    <input
                      name="keyword"
                      type="search"
                      className="form-control"
                      id="keyword"
                      placeholder="Design, Code, Marketing, Finance ..."
                      aria-label="Search"
                    />

                    <button type="submit" className="form-control">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                <div className="custom-block bg-white shadow-lg">
                  <a href="topics-detail.html">
                    <div className="d-flex">
                      <div>
                        <h5 className="mb-2">Web Design</h5>

                        <p className="mb-0">
                          When you search for free CSS templates, you will
                          notice that TemplateMo is one of the best websites.
                        </p>
                      </div>

                      <span className="badge bg-design rounded-pill ms-auto">
                        14
                      </span>
                    </div>

                    <img
                      src="/asset/images/topics/undraw_Remote_design_team_re_urdx.png"
                      className="custom-block-image img-fluid"
                      alt=""
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="custom-block custom-block-overlay">
                  <div className="d-flex flex-column h-100">
                    <img
                      src="/asset/images/businesswoman-using-tablet-analysis.jpg"
                      className="custom-block-image img-fluid"
                      alt=""
                    />

                    <div className="custom-block-overlay-text d-flex">
                      <div>
                        <h5 className="text-white mb-2">Finance</h5>

                        <p className="text-white">
                          Topic Listing Template includes homepage, listing
                          page, detail page, and contact page. You can feel free
                          to edit and adapt for your CMS requirements.
                        </p>

                        <a
                          href="topics-detail.html"
                          className="btn custom-btn mt-2 mt-lg-3"
                        >
                          Learn More
                        </a>
                      </div>

                      <span className="badge bg-finance rounded-pill ms-auto">
                        25
                      </span>
                    </div>

                    <div className="social-share d-flex">
                      <p className="text-white me-4">Share:</p>

                      <ul className="social-icon">
                        <li className="social-icon-item">
                          <a
                            href="#"
                            className="social-icon-link bi-twitter"
                          ></a>
                        </li>

                        <li className="social-icon-item">
                          <a
                            href="#"
                            className="social-icon-link bi-facebook"
                          ></a>
                        </li>

                        <li className="social-icon-item">
                          <a
                            href="#"
                            className="social-icon-link bi-pinterest"
                          ></a>
                        </li>
                      </ul>

                      <a
                        href="#"
                        className="custom-icon bi-bookmark ms-auto"
                      ></a>
                    </div>

                    <div className="section-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="explore-section section-padding" id="section_2">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="mb-4">Browse Topics</h2>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "design" ? "active" : ""}`}
                    onClick={() => setActiveTab("design")}
                  >
                    Design
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "marketing" ? "active" : ""}`}
                    onClick={() => setActiveTab("marketing")}
                  >
                    Marketing
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "finance" ? "active" : ""}`}
                    onClick={() => setActiveTab("finance")}
                  >
                    Finance
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "music" ? "active" : ""}`}
                    onClick={() => setActiveTab("music")}
                  >
                    Music
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "education" ? "active" : ""}`}
                    onClick={() => setActiveTab("education")}
                  >
                    Education
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tab-content" id="myTabContent">
                  {Object.keys(tabContent).map((tab) => (
                    <div
                      key={tab}
                      className={`tab-pane fade ${activeTab === tab ? "show active" : ""}`}
                      role="tabpanel"
                      aria-labelledby={`${tab}-tab`}
                    >
                      <div className="row">
                        {tabContent[tab].map((item, index) => (
                          <div key={index} className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                            <div className="custom-block bg-white shadow-lg">
                              <div className="d-flex">
                                <div>
                                  <h5 className="mb-2">{item.title}</h5>
                                  <p className="mb-0">{item.description}</p>
                                </div>
                                <span className="badge bg-design rounded-pill ms-auto">
                                  {item.badge}
                                </span>
                              </div>
                              <img
                                src={item.image}
                                className="custom-block-image img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  <ul
                    className="vertical-scrollable-timeline"
                    id="vertical-scrollable-timeline"
                  >
                    <div className="list-progress">
                      <div className="inner"></div>
                    </div>

                    <li>
                      <h4 className="text-white mb-3">
                        Search your favourite topic
                      </h4>

                      <p className="text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reiciendis, cumque magnam? Sequi, cupiditate quibusdam
                        alias illum sed esse ad dignissimos libero sunt,
                        quisquam numquam aliquam? Voluptas, accusamus omnis?
                      </p>

                      <div className="icon-holder">
                        <i className="bi-search"></i>
                      </div>
                    </li>

                    <li>
                      <h4 className="text-white mb-3">
                        Bookmark &amp; Keep it for yourself
                      </h4>

                      <p className="text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Sint animi necessitatibus aperiam repudiandae nam
                        omnis est vel quo, nihil repellat quia velit error modi
                        earum similique odit labore. Doloremque, repudiandae?
                      </p>

                      <div className="icon-holder">
                        <i className="bi-bookmark"></i>
                      </div>
                    </li>

                    <li>
                      <h4 className="text-white mb-3">Read &amp; Enjoy</h4>

                      <p className="text-white">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Animi vero quisquam, rem assumenda similique
                        voluptas distinctio, iste est hic eveniet debitis ut
                        ducimus beatae id? Quam culpa deleniti officiis autem?
                      </p>

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
                  <a href="#" className="btn custom-btn custom-border-btn ms-3">
                    Check out Youtube
                  </a>
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
                <img
                  src="/asset/images/faq_graphic.jpg"
                  className="img-fluid"
                  alt="FAQs"
                />
              </div>

              <div className="col-lg-6 col-12 m-auto">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        What is Topic Listing?
                      </button>
                    </h2>

                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Topic Listing is free Bootstrap 5 CSS template.{" "}
                        <strong>
                          You are not allowed to redistribute this template
                        </strong>{" "}
                        on any other template collection website without our
                        permission. Please contact TemplateMo for more detail.
                        Thank you.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        How to find a topic?
                      </button>
                    </h2>

                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        You can search on Google with <strong>keywords</strong>{" "}
                        such as templatemo portfolio, templatemo one-page
                        layouts, photography, digital marketing, etc.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Does it need to paid?
                      </button>
                    </h2>

                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact-section section-padding section-bg"
          id="section_5"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 text-center">
                <h2 className="mb-5">Get in touch</h2>
              </div>

              <div className="col-lg-5 col-12 mb-4 mb-lg-0">
                <iframe
                  className="google-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.065641062665!2d-122.4230416990949!3d37.80335401520422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858127459fabad%3A0x808ba520e5e9edb7!2sFrancisco%20Park!5e1!3m2!1sen!2sth!4v1684340239744!5m2!1sen!2sth"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg- mb-md-0 ms-auto">
                <h4 className="mb-3">Head office</h4>

                <p>
                  Bay St &amp;, Larkin St, San Francisco, CA 94109, United
                  States
                </p>

                <hr />

                <p className="d-flex align-items-center mb-1">
                  <span className="me-2">Phone</span>

                  <a href="tel: 305-240-9671" className="site-footer-link">
                    305-240-9671
                  </a>
                </p>

                <p className="d-flex align-items-center">
                  <span className="me-2">Email</span>

                  <a
                    href="mailto:info@company.com"
                    className="site-footer-link"
                  >
                    info@company.com
                  </a>
                </p>
              </div>

              <div className="col-lg-3 col-md-6 col-12 mx-auto">
                <h4 className="mb-3">Dubai office</h4>

                <p>Burj Park, Downtown Dubai, United Arab Emirates</p>

                <hr />

                <p className="d-flex align-items-center mb-1">
                  <span className="me-2">Phone</span>

                  <a href="tel: 110-220-3400" className="site-footer-link">
                    110-220-3400
                  </a>
                </p>

                <p className="d-flex align-items-center">
                  <span className="me-2">Email</span>

                  <a
                    href="mailto:info@company.com"
                    className="site-footer-link"
                  >
                    info@company.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </Fragment>
  );
}

export default Index;
