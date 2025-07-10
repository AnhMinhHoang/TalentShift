import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import OverviewTab from "./OverviewTab";
import AppliedJobsTab from "./AppliedJobsTab";
import CVManagementTab from "./CVManagementTab";
import FollowedJobsTab from "./FollowedJobsTab";
import ProfileSidebar from "./ProfileSidebar";

const JobTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabFromQuery = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabFromQuery || "overview");
  const { userData, setUserData } = useAuth();

  useEffect(() => {
    // Sync tab param from URL to activeTab
    if (tabFromQuery && tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    navigate(`?tab=${tabName}`);
  };

  return (
      <div className="bg-light py-4 mt-5">
        <div className="container">
          <div className="card shadow-sm">
            <ul className="nav nav-tabs px-3">
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => handleTabClick("overview")}
                >
                  Overview
                </button>
              </li>
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "cv" ? "active" : ""}`}
                    onClick={() => handleTabClick("cv")}
                >
                  CV Management
                </button>
              </li>
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "applied" ? "active" : ""}`}
                    onClick={() => handleTabClick("applied")}
                >
                  Applied Job
                </button>
              </li>
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "followed" ? "active" : ""}`}
                    onClick={() => handleTabClick("followed")}
                >
                  Followed Job
                </button>
              </li>
            </ul>

            <div className="row g-0">
              <div className="col-md-3 border-end">
                <ProfileSidebar userData={userData} setUserData={setUserData} />
              </div>
              <div className="col-md-9">
                <div className="p-4">
                  {activeTab === "applied" && <AppliedJobsTab />}
                  {activeTab === "cv" && <CVManagementTab />}
                  {activeTab === "followed" && <FollowedJobsTab />}
                  {activeTab === "overview" && <OverviewTab userData={userData} setUserData={setUserData} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default JobTracker;
