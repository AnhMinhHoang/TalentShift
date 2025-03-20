import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import Index from "./pages/index";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import JobDetail from "./pages/Job/JobDetail.jsx";
import JobListing from "./pages/Job/JobListing.jsx";
import Contact from "./pages/Contact.jsx";
import LoginRegister from "./pages/LoginRegister.jsx";
import "antd/dist/reset.css";
import ScrollToAnchor from "./ScrollToAnchor.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import RegisterAdditional from "./pages/Authentication/RegisterAdditional.jsx";
import JobPost from "./pages/Job/JobPost/JobPost.jsx";

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
      <AntdApp>
        <Router>
          <ScrollToTop />
          <ScrollToAnchor />
          <Navbar />
          <Routes>
            <Route path="/register-addition" element={<RegisterAdditional />} />
            <Route path="job-posting" element={<JobPost />} />
            <Route path="/" element={<Index />} />
            <Route path="/topic-detail" element={<JobDetail />} />
            <Route path="/topic-listing" element={<JobListing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/authentication" element={<LoginRegister />} />
          </Routes>
        </Router>
      </AntdApp>
      <Footer />
    </div>
  );
}

export default App;
