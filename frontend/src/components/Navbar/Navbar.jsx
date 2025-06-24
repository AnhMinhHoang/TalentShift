import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../pages/AuthContext";

import $ from "jquery";

function Navbar() {
  const location = useLocation();
  const sectionArray = [1, 2, 3, 4, 5];
  const { user, logout } = useAuth();

  useEffect(() => {
    // Check if we're on the homepage
    if (location.pathname === "/") {
      // Scroll event handler
      const handleScroll = () => {
        const docScroll = $(document).scrollTop();
        sectionArray.forEach((value, index) => {
          const offsetSection = $(`#section_${value}`).offset()?.top - 75;
          if (docScroll + 1 >= offsetSection) {
            $(".navbar-nav .nav-item .nav-link")
              .removeClass("active")
              .addClass("inactive");
            $(".navbar-nav .nav-item .nav-link")
              .eq(index)
              .addClass("active")
              .removeClass("inactive");
          }
        });
      };

      // Attach scroll listener
      $(document).on("scroll", handleScroll);

      // Set initial state
      $(".navbar-nav .nav-item .nav-link")
        .removeClass("active")
        .addClass("inactive");
      $(".navbar-nav .nav-item .nav-link")
        .eq(0)
        .addClass("active")
        .removeClass("inactive");

      // Click event for smooth scrolling
      sectionArray.forEach((value, index) => {
        $(".click-scroll")
          .eq(index)
          .on("click", function (e) {
            e.preventDefault();
            const offsetClick = $(`#section_${value}`).offset()?.top - 75;
            $("html, body").animate({ scrollTop: offsetClick }, 300);
          });
      });

      // Cleanup event listeners when component unmounts or path changes
      return () => {
        $(document).off("scroll", handleScroll);
        $(".click-scroll").off("click");
      };
    } else {
      // On non-homepage routes, clear active class
      $(".navbar-nav .nav-item .nav-link")
        .removeClass("active")
        .addClass("inactive");
    }
  }, [location.pathname]);
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/">
          <i className="bi-back"></i>
          <span>TalentShift</span>
        </a>

        <div className="d-lg-none ms-auto me-4">
          <a href="#" className="navbar-icon bi-person smoothscroll"></a>
        </div>

        {/*top in the href don't know what is that thing*/}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-5 me-lg-auto">
            <li className="nav-item">
              <Link to="/#section_1" className="nav-link click-scroll">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/#section_2" className="nav-link click-scroll">
                About
              </Link>
            </li>

            <li className="nav-item">
              <div>
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <div>
                <Link to="/job-posting" className="nav-link">
                  Post Job
                </Link>
              </div>
            </li>

            {/* <li className="nav-item">
              <Link to="/#section_5" className="nav-link click-scroll">
                Contact
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarLightDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pages
              </a>

              <ul
                className="dropdown-menu dropdown-menu-light"
                aria-labelledby="navbarLightDropdownMenuLink"
              >
                <li>
                  <Link to="/jobs" className="dropdown-item">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="dropdown-item">
                    Contact Form
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>

          <div className="d-none d-lg-block">
            {user ? (
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: 600, fontSize: 16, color: '#fff' }}>{user.fullName || 'User'}</div>
                      <div style={{ fontSize: 13, color: '#e0e0e0', fontWeight: 400 }}>
                        Balance: <span style={{ color: '#ffd700', fontWeight: 600 }}>{user.balance !== undefined ? user.balance : '1,000,000'}₫</span>
                      </div>
                    </span>
                    <img
                      src={user.avatar || '/asset/images/default-profile.jpg'}
                      alt="avatar"
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', background: '#eee' }}
                    />
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/profile-page" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="navbar-icon bi-person smoothscroll"
              ></Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
