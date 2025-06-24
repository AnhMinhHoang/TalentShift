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
import "antd/dist/reset.css";
import ScrollToAnchor from "./ScrollToAnchor.jsx";
import RegisterAdditional from "./pages/Authentication/RegisterAdditional.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import HirerAdditionalRegistration from "./pages/Authentication/HirerAdditionalRegistration.jsx";
import JobApply from './pages/jobApply/jobApplyPage.jsx';
import JobPost from './pages/Job/JobPost/JobPost.jsx';
import JobTracker from './pages/userProfile/Profile_Page.jsx';
import Plan from './pages/payment/Plan.jsx';
import Success from './pages/payment/Success.jsx';
import EnterpriseProfile from './pages/enterpriseProfile/EnterpriseProfile.jsx';
import RatingSystem from "./pages/Rating.jsx";

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
            
            {/* Job Detail Routes */}
            <Route path="/job-detail" element={<JobDetail />} /> {/* Job detail without ID */}
            <Route path="/job-detail/:id" element={<JobDetail />} /> {/* Job detail with ID - e.g., /job-detail/1 */}
            
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register-additional" element={<RegisterAdditional />} />
            <Route path="/job-posting" element={<JobPost />} />
            <Route path="/hirer-additional" element={<HirerAdditionalRegistration />}/>
            <Route path="/profile-page" element={<JobTracker />} />
            <Route path="/job-apply" element={<JobApply />} />
            <Route path="/enterprise-profile-page" element={<EnterpriseProfile />} />
            
            {/* Payment Routes */}
            <Route path='/payment' element={<Plan />} />
            <Route path='/payment/plan' element={<Plan />} />
            <Route path='/payment-success' element={<Success />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rating" element={<RatingSystem />} />
          </Routes>
        </AntdApp>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
