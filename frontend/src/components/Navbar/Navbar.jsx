import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import $ from 'jquery';

function Navbar() {
    const location = useLocation();
    const sectionArray = [1, 2, 3, 4, 5];

    useEffect(() => {
        // Check if we're on the homepage
        if (location.pathname === '/') {
            // Scroll event handler
            const handleScroll = () => {
                const docScroll = $(document).scrollTop();
                sectionArray.forEach((value, index) => {
                    const offsetSection = $(`#section_${value}`).offset()?.top - 75;
                    if (docScroll + 1 >= offsetSection) {
                        $('.navbar-nav .nav-item .nav-link')
                            .removeClass('active')
                            .addClass('inactive');
                        $('.navbar-nav .nav-item .nav-link')
                            .eq(index)
                            .addClass('active')
                            .removeClass('inactive');
                    }
                });
            };

            // Attach scroll listener
            $(document).on('scroll', handleScroll);

            // Set initial state
            $('.navbar-nav .nav-item .nav-link')
                .removeClass('active')
                .addClass('inactive');
            $('.navbar-nav .nav-item .nav-link')
                .eq(0)
                .addClass('active')
                .removeClass('inactive');

            // Click event for smooth scrolling
            sectionArray.forEach((value, index) => {
                $('.click-scroll')
                    .eq(index)
                    .on('click', function (e) {
                        e.preventDefault();
                        const offsetClick = $(`#section_${value}`).offset()?.top - 75;
                        $('html, body').animate({ scrollTop: offsetClick }, 300);
                    });
            });

            // Cleanup event listeners when component unmounts or path changes
            return () => {
                $(document).off('scroll', handleScroll);
                $('.click-scroll').off('click');
            };
        } else {
            // On non-homepage routes, clear active class
            $('.navbar-nav .nav-item .nav-link')
                .removeClass('active')
                .addClass('inactive');
        }
    }, [location.pathname])
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
                                Browse Topics
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/#section_3" className="nav-link click-scroll">
                                How it works
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/#section_4" className="nav-link click-scroll">
                                FAQs
                            </Link>
                        </li>

                        <li className="nav-item">
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
                                    <Link to="/topic-listing" className="dropdown-item">
                                        Topics Listing
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="dropdown-item">
                                        Contact Form
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="d-none d-lg-block">
                        <Link
                            to="/authentication"
                            className="navbar-icon bi-person smoothscroll"
                        ></Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
