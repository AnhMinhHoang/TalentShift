import React from "react";
import { useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import OverviewTab from "./OverviewTab";
import AppliedJobsTab from "./AppliedJobsTab";
import CVManagementTab from "./CVManagementTab";
import FollowedJobsTab from "./FollowedJobsTab";
import ProfileSidebar from "./ProfileSidebar";

const JobTracker = () => {
  const [activeTab, setActiveTab] = useState("overview");
    const { userData, setUserData } = useAuth();

  return (
      <div className="bg-light py-4 mt-5">
        <div className="container">
          <div className="card shadow-sm">
            {/* Navigation Tabs */}
            <ul className="nav nav-tabs px-3">
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "cv" ? "active" : ""}`} onClick={() => setActiveTab("cv")}>
                  CV Management
                </button>
              </li>
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "applied" ? "active" : ""}`}
                    onClick={() => setActiveTab("applied")}
                >
                  Applied Job
                </button>
              </li>
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "followed" ? "active" : ""}`}
                    onClick={() => setActiveTab("followed")}
                >
                  Followed Job
                </button>
              </li>
            </ul>

            <div className="row g-0">
              {/* Profile Sidebar */}
              <div className="col-md-3 border-end">
                <ProfileSidebar userData={userData} setUserData={setUserData} />
              </div>

              {/* Main Content */}
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