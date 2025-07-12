import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { fetchBookmarkedJobsByUser, fetchAppliedJobsByUser } from "../../services/jobService";
import OverviewTab from "./OverviewTab";
import AppliedJobsTab from "./AppliedJobsTab";
import FollowedJobsTab from "./FollowedJobsTab";
import RatingTab from "./RatingTab";
import ProfileSidebar from "./ProfileSidebar";

const JobTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabFromQuery = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabFromQuery || "overview");
  const { userData, setUserData } = useAuth();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync tab param from URL to activeTab
    if (tabFromQuery && tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userData?.userId) {
          const [bookmarked, applied] = await Promise.all([
            fetchBookmarkedJobsByUser(userData.userId),
            fetchAppliedJobsByUser(userData.userId),
          ]);
          setBookmarkedJobs(bookmarked);
          setAppliedJobs(applied);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userData?.userId) {
      fetchData();
    }
  }, [userData?.userId]);

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
              <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === "rating" ? "active" : ""}`}
                    onClick={() => handleTabClick("rating")}
                >
                  My Ratings
                </button>
              </li>
            </ul>

            <div className="row g-0">
              <div className="col-md-3 border-end">
                <ProfileSidebar userData={userData} setUserData={setUserData} />
              </div>
              <div className="col-md-9">
                <div className="p-4">
                  {activeTab === "applied" && (
                      <AppliedJobsTab
                          appliedJobs={appliedJobs}
                          setAppliedJobs={setAppliedJobs}
                          loading={loading}
                      />
                  )}
                  {activeTab === "followed" && (
                      <FollowedJobsTab
                          bookmarkedJobs={bookmarkedJobs}
                          setBookmarkedJobs={setBookmarkedJobs}
                          loading={loading}
                      />
                  )}
                  {activeTab === "overview" && <OverviewTab userData={userData} setUserData={setUserData} />}
                  {activeTab === "rating" && <RatingTab userData={userData} loading={loading} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default JobTracker;