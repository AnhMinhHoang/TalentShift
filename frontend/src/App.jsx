import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./pages/AuthContext.jsx";
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
import JobTracker from "./pages/userProfile/Profile_Page.jsx";

// import "bootstrap/dist/css/bootstrap.min.css";
import RegisterAdditional from "./pages/Authentication/RegisterAdditional.jsx";
import JobPost from "./pages/Job/JobPost/JobPost.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on every route change
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AntdApp>
          <ScrollToTop />
          <ScrollToAnchor />
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/job-detail" element={<JobDetail />} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register-addition" element={<RegisterAdditional />} />
            <Route path="/job-posting" element={<JobPost />} />
            <Route path="/profile-page" element={<JobTracker />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AntdApp>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
