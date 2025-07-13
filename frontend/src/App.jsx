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
import FillFormVerifiedOutlet from "./components/FillFormVerifiedOutlet.jsx";
import NotVerified from "./pages/Authentication/NotVerified.jsx";
import AuthenCheckOutlet from "./components/AuthenCheckOutlet.jsx";
import NotFound from "./pages/Authentication/NotFound.jsx";

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
        {/* Route without layout (unauth fallback) */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/notverify" element={<NotVerified />} />
        <Route path="*" element={<NotFound />} />

        {/* All routes inside main layout */}
        <Route element={<MainLayout />}>

          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route element={<AuthenCheckOutlet />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/job-detail" element={<JobDetail />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Private routes: user must be logged in */}
          <Route element={<PrivateOutlet />}>

            {/* Verified users only */}
            <Route element={<FillFormVerifiedOutlet />}>
              {/* Payment-related routes */}
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/plan" element={<Plan />} />
              <Route path="/transaction-result" element={<TransactionResult />} />

              {/* HIRER-only routes */}
              <Route element={<RoleBasedOutlet allowedRoles={['HIRER']} />}>
                <Route path="/job-posting" element={<JobPost />} />
                <Route path="/enterprise-profile-page" element={<EnterpriseProfile />} />
              </Route>

              {/* FREELANCER-only routes */}
              <Route element={<RoleBasedOutlet allowedRoles={['FREELANCER']} />}>
                <Route path="/job-apply" element={<JobApply />} />
                <Route path="/profile-page" element={<JobTracker />} />
              </Route>
            </Route>

            {/* Authenticated HIRER but not yet verified */}
            <Route element={<RoleBasedOutlet allowedRoles={['HIRER']} />}>
              <Route path="/hirer-additional" element={<HirerAdditionalRegistration />} />
            </Route>

            {/* Authenticated FREELANCER but not yet verified */}
            <Route element={<RoleBasedOutlet allowedRoles={['FREELANCER']} />}>
              <Route path="/register-additional" element={<RegisterAdditional />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </AntdApp>
  );
}

export default App;
