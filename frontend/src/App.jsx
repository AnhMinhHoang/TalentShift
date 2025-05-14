import React, { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from './pages/index'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import TopicDetail from "./pages/TopicDetail.jsx";
import TopicListing from "./pages/TopicListing.jsx";
import Contact from "./pages/Contact.jsx";
import ScrollToAnchor from "./ScrollToAnchor.jsx";
import JobApply from './pages/jobApply/jobApplyPage.jsx';
import JobPost from './pages/jobPost/jobPostPage.jsx';
import JobTracker from './pages/userProfile/Profile_Page.jsx';
import Plan from './pages/payment/Plan.jsx';
import Success from './pages/payment/Success.jsx';
import EnterpriseProfile from './pages/enterpriseProfile/EnterpriseProfile.jsx';

// import 'bootstrap/dist/css/bootstrap.min.css';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on every route change
    }, [pathname]);

    return null;
}

function App() {

    return (
        <div className="App">
            <Router>
                <ScrollToTop />
                <ScrollToAnchor />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/topic-detail" element={<TopicDetail />} />
                    <Route path="/topic-listing" element={<TopicListing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/job-apply" element={<JobApply />} />
                    <Route path="/job-post" element={<JobPost />} />
                    <Route path="/profile-page" element={<JobTracker />} />
                    <Route path="/enterprise-profile-page" element={<EnterpriseProfile />} />
                    <Route path='/payment' element={<Plan />} />
                    <Route path='/payment-success' element={<Success />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    )
}

export default App
