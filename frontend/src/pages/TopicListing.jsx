import React from 'react'
import { Link } from "react-router-dom";

function TopicListing() {
  return (
      <main>
        <header className="site-header d-flex flex-column justify-content-center align-items-center">
          <div className="container">
            <div className="row align-items-center">

              <div className="col-lg-5 col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Homepage</Link></li>

                    <li className="breadcrumb-item active" aria-current="page">Topics Listing</li>
                  </ol>
                </nav>

                <h2 className="text-white">Topics Listing</h2>
              </div>

            </div>
          </div>
        </header>


        <section className="section-padding">
          <div className="container">
            <div className="row">

              <div className="col-lg-12 col-12 text-center">
                <h3 className="mb-4">Popular Topics</h3>
              </div>

              <div className="col-lg-8 col-12 mt-3 mx-auto">
                <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                  <div className="d-flex">
                    <img src="/asset/images/topics/undraw_Remote_design_team_re_urdx.png"
                         className="custom-block-image img-fluid" alt=""/>

                    <div className="custom-block-topics-listing-info d-flex">
                      <div>
                        <h5 className="mb-2">Web Design</h5>

                        <p className="mb-0">Topic Listing includes home, listing, detail and contact pages. Feel free to
                          modify this template for your custom websites.</p>

                        <Link to="/topic-detail" className="btn custom-btn mt-3 mt-lg-4">Learn More</Link>
                      </div>

                      <span className="badge bg-design rounded-pill ms-auto">14</span>
                    </div>
                  </div>
                </div>

                <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                  <div className="d-flex">
                    <img src="/asset/images/topics/undraw_online_ad_re_ol62.png" className="custom-block-image img-fluid"
                         alt=""/>

                    <div className="custom-block-topics-listing-info d-flex">
                      <div>
                        <h5 className="mb-2">Advertising</h5>

                        <p className="mb-0">Visit TemplateMo website to download free CSS templates. Lorem ipsum dolor,
                          sit amet consectetur adipisicing elit animi necessitatibus</p>

                        <Link to="/topic-detail" className="btn custom-btn mt-3 mt-lg-4">Learn More</Link>
                      </div>

                      <span className="badge bg-advertising rounded-pill ms-auto">30</span>
                    </div>
                  </div>
                </div>

                <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
                  <div className="d-flex">
                    <img src="/asset/images/topics/undraw_Podcast_audience_re_4i5q.png"
                         className="custom-block-image img-fluid" alt=""/>

                    <div className="custom-block-topics-listing-info d-flex">
                      <div>
                        <h5 className="mb-2">Podcast</h5>

                        <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit animi
                          necessitatibus</p>

                        <Link to="/topic-detail" className="btn custom-btn mt-3 mt-lg-4">Learn More</Link>
                      </div>

                      <span className="badge bg-music rounded-pill ms-auto">20</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center mb-0">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">Prev</span>
                      </a>
                    </li>

                    <li className="page-item active" aria-current="page">
                      <a className="page-link" href="#">1</a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">4</a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#">5</a>
                    </li>

                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </section>


        <section className="section-padding section-bg">
          <div className="container">
            <div className="row">

              <div className="col-lg-12 col-12">
                <h3 className="mb-4">Trending Topics</h3>
              </div>

              <div className="col-lg-6 col-md-6 col-12 mt-3 mb-4 mb-lg-0">
                <div className="custom-block bg-white shadow-lg">
                  <Link to="/topic-detail">
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

              <div className="col-lg-6 col-md-6 col-12 mt-lg-3">
                <div className="custom-block custom-block-overlay">
                  <div className="d-flex flex-column h-100">
                    <img src="/asset/images/businesswoman-using-tablet-analysis.jpg" className="custom-block-image img-fluid"
                         alt=""/>

                    <div className="custom-block-overlay-text d-flex">
                      <div>
                        <h5 className="text-white mb-2">Finance</h5>

                        <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint animi
                          necessitatibus aperiam repudiandae nam omnis</p>

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
        </section>
      </main>
  )
}

export default TopicListing