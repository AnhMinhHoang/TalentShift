import React, { useEffect } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./pages/AuthContext.jsx";
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
import TransactionResult from './pages/payment/TransactionResult.jsx';
import EnterpriseProfile from './pages/enterpriseProfile/EnterpriseProfile.jsx';
import Payment from './pages/payment/Payment.jsx';
import Loading from "./components/Loading/Loading.jsx";
import Unauthorized from "./pages/Authentication/Unauthorized.jsx";
import RoleBasedOutlet from "./components/RoleBasedOutlet";
import PrivateOutlet from "./components/PrivateOutlet..jsx";
import MainLayout from "./components/MainLayout";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on every route change
  }, [pathname]);

  return null;
}

function App() {
  const { loading } = useAuth();

  if (loading) return <Loading isLoading={true} />;

  return (
    <AntdApp>
      <ScrollToTop />
      <ScrollToAnchor />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<PrivateOutlet />}>
            <Route path="/payment" element={<Payment />} />
            <Route path='/payment/plan' element={<Plan />} />
            <Route path='/transaction-result' element={<TransactionResult />} />
          </Route>
          {/* HIRER-only routes */}
          <Route element={<RoleBasedOutlet allowedRoles={['HIRER']} />}>
            <Route path="/job-posting" element={<JobPost />} />
            <Route path="/hirer-additional" element={<HirerAdditionalRegistration />} />
            <Route path="/enterprise-profile-page" element={<EnterpriseProfile />} />
          </Route>
          {/* FREELANCER-only routes */}
          <Route element={<RoleBasedOutlet allowedRoles={['FREELANCER']} />}>
            <Route path="/job-apply" element={<JobApply />} />
            <Route path="/profile-page" element={<JobTracker />} />
            <Route path="/register-additional" element={<RegisterAdditional />} />
          </Route>
          {/*Unauthenticated routes*/}
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-detail" element={<JobDetail />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        {/* Fallback for unauthorized access, no layout */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </AntdApp>
  );
}

export default App;
