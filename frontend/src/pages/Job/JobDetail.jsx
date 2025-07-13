import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge, Modal, Form, Nav } from "react-bootstrap";
import {
  FaDollarSign,
  FaClock,
  FaBriefcase,
  FaShare,
  FaCheck,
  FaTh,
  FaList,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { notification } from "antd";
import styles from "./Styles/JobDetail.module.css";
import userProfileStyles from "../userProfile/style/UserProfile.module.css";
import { fetchJobById, applyToJob, toggleBookmark, updateJob, getAllRatingsByFreelancer } from "../../services/jobService";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import api from "../../services/api";

// Custom read-only component for Summary
const ReadOnlySummarySection = ({ summary }) => {
  return (
    <div className="mb-4">
      <h4>Summary</h4>
      {summary && summary.trim() ? (
        <p className="text-muted fs-5" style={{ wordWrap: 'break-word', whiteSpace: 'normal', overflowWrap: 'break-word' }}>
          {summary}
        </p>
      ) : (
        <p className="text-muted fs-6 fst-italic">No summary available.</p>
      )}
    </div>
  );
};

// Custom read-only component for Skills
const ReadOnlySkillsSection = ({ mainSkills, otherSkills, styles }) => {
  const hasMainSkills = mainSkills && mainSkills.length > 0;
  const hasOtherSkills = otherSkills && otherSkills.length > 0;
  const hasAnySkills = hasMainSkills || hasOtherSkills;

  return (
    <div className="mb-4">
      <h4>Skills</h4>
      {hasAnySkills ? (
        <>
          <div className="mb-3">
            <h5 className="mb-2 fw-semibold">Main Skills</h5>
            {hasMainSkills ? (
              <div className="d-flex flex-wrap gap-2">
                {mainSkills.map((skill, index) => (
                  <span key={index} className={`badge fs-6 ${userProfileStyles.skillBadge}`}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted fs-6 fst-italic">No main skills listed.</p>
            )}
          </div>
          <div>
            <h5 className="mb-2 fw-semibold">Other Skills</h5>
            {hasOtherSkills ? (
              <div className="d-flex flex-wrap gap-2">
                {otherSkills.map((skill, index) => (
                  <span key={index} className={`badge fs-6 ${userProfileStyles.skillBadge}`}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted fs-6 fst-italic">No other skills listed.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-muted fs-6 fst-italic">No skills listed.</p>
      )}
    </div>
  );
};

// Custom read-only component for Work Experience
const ReadOnlyExperienceSection = ({ workExperiences }) => {
  const hasExperiences = workExperiences && workExperiences.length > 0;

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Now") return "Now";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}-${year}`;
  };

  return (
    <div className="mb-4">
      <h4>Work Experience</h4>
      {hasExperiences ? (
        workExperiences.map((experience) => (
          <div className="mb-3" key={experience.id}>
            <div className="row">
              <div className="col-md-3">
                <p className="mb-1">
                  {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                </p>
              </div>
              <div className="col-md-9">
                <h6 className="mb-1">
                  {experience.position} at {experience.company}
                </h6>
                <p className="text-muted small mb-2">{experience.description}</p>
                {experience.projects && experience.projects.length > 0 && (
                  <div className="mt-2 mb-2">
                    <h6 className="small">Projects:</h6>
                    <ul className="list-unstyled ps-3">
                      {experience.projects.map((project) => (
                        <li key={project.id} className="small text-muted">
                          {project.name} ({project.time})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted fs-6 fst-italic">No work experience listed.</p>
      )}
    </div>
  );
};

// Custom read-only component for Education
const ReadOnlyEducationSection = ({ educations }) => {
  const hasEducations = educations && educations.length > 0;

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Now") return "Now";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}-${year}`;
  };

  return (
    <div className="mb-4">
      <h4>Education</h4>
      {hasEducations ? (
        educations.map((education) => (
          <div className="mb-3" key={education.id}>
            <div className="row">
              <div className="col-md-3">
                <p className="mb-1">
                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                </p>
              </div>
              <div className="col-md-9">
                <h6 className="mb-1">{education.school}</h6>
                {education.major && <p className="text-muted mb-1">{education.major}</p>}
                <p className="text-muted small">{education.description}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted fs-6 fst-italic">No education listed.</p>
      )}
    </div>
  );
};

// Custom read-only component for Certificates
const ReadOnlyCertificateSection = ({ certificates }) => {
  const hasCertificates = certificates && certificates.length > 0;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}-${year}`;
  };

  return (
    <div className="mb-4">
      <h4>Certificates</h4>
      {hasCertificates ? (
        certificates.map((certificate) => (
          <div className="mb-3" key={certificate.id}>
            <div className="row">
              <div className="col-md-3">
                <p className="mb-1">{formatDate(certificate.issueDate)}</p>
              </div>
              <div className="col-md-9">
                <h6 className="mb-1">{certificate.name}</h6>
                <p>{certificate.score}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted fs-6 fst-italic">No certificates listed.</p>
      )}
    </div>
  );
};

const getTimeSincePosted = (job) => {
  if (!job?.createdAt) return "recently";

  let postedDate;
  if (Array.isArray(job.createdAt) && job.createdAt.length === 7) {
    const [year, month, day, hours, minutes, seconds, nanoseconds] = job.createdAt;
    postedDate = new Date(year, month - 1, day, hours, minutes, seconds, nanoseconds / 1_000_000);
  } else if (typeof job.createdAt === "string" && job.createdAt.includes(",")) {
    const [year, month, day, hours, minutes, seconds, nanoseconds] = job.createdAt.split(",").map(Number);
    postedDate = new Date(year, month - 1, day, hours, minutes, seconds, nanoseconds / 1_000_000);
  } else {
    postedDate = new Date(job.createdAt);
  }

  if (isNaN(postedDate)) return "Invalid date";

  const now = new Date();
  const diffInMs = now - postedDate;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  if (diffInDays === 1) return "1 day ago";
  return `${diffInDays} days ago`;
};

const formatSalary = (job) => {
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (!job.minBudget && !job.maxBudget) return "Salary not specified";
  if (!job.minBudget) {
    const maxBudget = Number.parseFloat(job.maxBudget);
    return isNaN(maxBudget) ? "Salary not specified" : formatter.format(maxBudget);
  }
  if (!job.maxBudget) {
    const minBudget = Number.parseFloat(job.minBudget);
    return isNaN(minBudget) ? "Salary not specified" : formatter.format(minBudget);
  }

  const minBudget = Number.parseFloat(job.minBudget);
  const maxBudget = Number.parseFloat(job.maxBudget);
  if (isNaN(minBudget) || isNaN(maxBudget)) return "Salary not specified";

  return `${formatter.format(minBudget)} - ${formatter.format(maxBudget)}`;
};

const renderStars = (stars) => {
  const fullStars = Math.floor(stars);
  const emptyStars = 5 - fullStars;

  return (
    <div className="d-flex align-items-center">
      {[...Array(fullStars)].map((_, index) => (
        <i key={`full-${index}`} className="fas fa-star text-warning me-1"></i>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={`empty-${index}`} className="far fa-star text-muted me-1"></i>
      ))}
      <span className="ms-2 text-muted">({stars}/5)</span>
    </div>
  );
};

export default function JobDetail() {
  const { userData, getUserById } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [activeApplicantTab, setActiveApplicantTab] = useState("information");
  const [viewMode, setViewMode] = useState("tabs");
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({ coverLetter: "" });
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingError, setRatingError] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [applicantProfile, setApplicantProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async function fetchJob() {
      try {
        const response = await fetchJobById(id, userData?.userId);
        const transformedJob = {
          id: response.id,
          jobTitle: response.jobTitle || "Untitled Job",
          companyName: response.companyName || "Unknown Company",
          companyLogoPath: response.companyLogoPath,
          category: response.category || "Uncategorized",
          minBudget: response.minBudget,
          maxBudget: response.maxBudget,
          description: response.description || "No description available",
          keyResponsibilities: response.keyResponsibilities || [],
          skills: response.skills || [],
          idealSkills: response.idealSkills || [],
          hirerId: response.hirerId,
          publishStatus: "PUBLISHED",
          applicant: response.applicant?.map((app) => ({
            id: app.id,
            applicantId: app.applicantId,
            applicantName: app.applicantName || "Unknown Applicant",
            avatar: app.avatar,
            appliedAt: app.appliedAt,
            status: app.status,
            coverLetter: app.coverLetter || "",
            bookmarked: app.bookmarked ?? false,
          })) || [],
          bookmarked: response.bookmarked || false,
          createdAt: response.createdAt,
        };

        if (isMounted) {
          setJob(transformedJob);
          setIsApplied(response.applicant?.some((app) => app.applicantId === userData?.userId && !app.bookmarked) ?? false);
          setIsSaved(transformedJob.bookmarked || false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load job details");
          console.error("Error fetching job:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id, userData?.userId]);

  useEffect(() => {
    if (showApplicantModal && activeApplicantTab === "ratings" && selectedApplicant?.applicantId) {
      const fetchRatings = async () => {
        setRatingLoading(true);
        setRatingError(null);
        try {
          const ratingsData = await getAllRatingsByFreelancer(selectedApplicant.applicantId);
          setRatings(ratingsData);
        } catch (err) {
          setRatingError(err.message || "Failed to fetch ratings");
          console.error("Failed to fetch ratings:", err);
        } finally {
          setRatingLoading(false);
        }
      };
      fetchRatings();
    }
  }, [showApplicantModal, activeApplicantTab, selectedApplicant?.applicantId]);

  useEffect(() => {
    if (showApplicantModal && activeApplicantTab === "profile" && selectedApplicant?.applicantId) {
      const fetchApplicantProfile = async () => {
        setProfileLoading(true);
        setProfileError(null);
        try {
          const response = await api.get(`/users/${selectedApplicant.applicantId}`);
          setApplicantProfile(response.data);
        } catch (err) {
          setProfileError(err.message || "Failed to fetch applicant profile");
          console.error("Failed to fetch applicant profile:", err);
        } finally {
          setProfileLoading(false);
        }
      };
      fetchApplicantProfile();
    }
  }, [showApplicantModal, activeApplicantTab, selectedApplicant?.applicantId]);

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const hasCustomLogo = job?.companyLogoPath && job.companyLogoPath !== "/asset/images/default-company-logo.png";
  const getAvatarLetter = () => (job.companyName ? job.companyName.charAt(0).toUpperCase() : "C");

  const hasCustomApplicantAvatar = (applicant) => applicant?.avatar && applicant.avatar !== "/placeholder.svg";
  const getApplicantAvatarLetter = (applicant) => (applicant?.applicantName ? applicant.applicantName.charAt(0).toUpperCase() : "A");

  const handleApplyClick = () => {
    if (!userData?.userId) {
      openNotification("error", "Login Required", "Please log in to apply for this job");
      return;
    }
    setShowApplyModal(true);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!userData?.userId) {
      openNotification("error", "Login Required", "Please log in to apply for this job");
      return;
    }
    try {
      const updatedJob = await applyToJob(id, userData.userId, formData.coverLetter);
      setShowApplyModal(false);
      setFormData({ coverLetter: "" });
      setIsApplied(true);
      setIsSaved(updatedJob.bookmarked || false);

      const transformedJob = {
        ...job,
        applicant: updatedJob.applicant?.map((app) => ({
          id: app.id,
          applicantId: app.applicantId,
          applicantName: app.applicantName || "Unknown Applicant",
          avatar: app.avatar,
          appliedAt: app.appliedAt,
          status: app.status,
          coverLetter: app.coverLetter || "",
          bookmarked: app.bookmarked ?? false,
        })) || [],
        bookmarked: updatedJob.bookmarked || false,
      };

      setJob(transformedJob);
      setCurrentPage(1);

      openNotification(
        "success",
        "Application Submitted!",
        "Your application has been successfully submitted. Good luck!"
      );
    } catch (error) {
      openNotification("error", "Application Failed", error.message || "Failed to submit application");
    }
  };

  const handleSaveJob = async () => {
    if (!userData?.userId) {
      openNotification("error", "Login Required", "Please log in to bookmark this job");
      return;
    }
    try {
      const updatedJob = await toggleBookmark(id, userData.userId);
      setIsSaved(updatedJob.bookmarked);
      openNotification(
        "success",
        isSaved ? "Bookmark Removed" : "Bookmark Added",
        isSaved ? "Job removed from bookmarks" : "Job added to bookmarks"
      );
    } catch (error) {
      openNotification("error", "Bookmark Failed", error.message || "Failed to toggle bookmark");
    }
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    const jobLink = window.location.href;
    navigator.clipboard
      .writeText(jobLink)
      .then(() => {
        setCopySuccess(true);
        openNotification("success", "Link Copied!", "Job link has been copied to clipboard");
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        openNotification("error", "Copy Failed", "Failed to copy link to clipboard");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.slice(0, 500),
    });
  };

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantModal(true);
    setActiveApplicantTab("information");
  };

  const calculateRequiredBalance = () => {
    const budget = job.maxBudget || job.minBudget || 0;
    return budget * 1.07; // Add 7% fee
  };

  const handleAcceptApplicant = async (applicant) => {
    if (!userData?.userId || userData.userId !== job.hirerId) {
      openNotification("error", "Unauthorized", "Only the hirer can accept applicants");
      return;
    }

    const requiredBalance = calculateRequiredBalance();
    if (userData.balance < requiredBalance) {
      setShowTopUpModal(true);
      return;
    }

    try {
      const updatedapplicant = job.applicant.map((app) => ({
        ...app,
        status: app.applicantId === applicant.applicantId ? "IN_PROGRESS" : "REJECTED",
      }));

      const updatedJobData = {
        ...job,
        status: "PENDING",
        maxBudget: requiredBalance.toString(),
        applicant: updatedapplicant,
      };

      const updatedJob = await updateJob(job.id, updatedJobData);
      setJob({
        ...job,
        applicant: updatedJob.applicant?.map((app) => ({
          ...app,
          applicantName: app.applicantName || "Unknown Applicant",
          status: app.status,
          coverLetter: app.coverLetter || "",
          bookmarked: app.bookmarked ?? false,
        })) || [],
      });
      setShowApplicantModal(false);
      openNotification(
        "success",
        "Applicant Accepted",
        `${applicant.applicantName}'s application has been accepted, others have been rejected.`
      );

      await getUserById(userData.userId); // Refresh user data to update balance
    } catch (error) {
      openNotification("error", "Accept Failed", error.message || "Failed to accept applicant");
    }
  };

  const handleTopUpConfirm = () => {
    setShowTopUpModal(false);
    navigate("/payment");
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    return (total / ratings.length).toFixed(1);
  };

  const totalPages = Math.ceil(job?.applicant.length / itemsPerPage);
  const paginatedApplicants = job?.applicant.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDateArray = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray)) return "N/A";
    const [year, month, day] = dateArray;
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className={styles.jobDescription}>
            <h2>Job Description</h2>
            {job.description ? (
              job.description.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p>No description available.</p>
            )}
          </div>
        );
      case "responsibilities":
        return (
          <div>
            <h2>Key Responsibilities</h2>
            <ul className={styles.responsibilitiesList}>
              {job.keyResponsibilities && job.keyResponsibilities.length > 0 ? (
                job.keyResponsibilities.map((responsibility, index) => (
                  <li key={index} className={styles.responsibilityItem}>
                    <span className={styles.dot}></span>
                    {responsibility}
                  </li>
                ))
              ) : (
                <li>No responsibilities listed.</li>
              )}
            </ul>
          </div>
        );
      case "idealSkills":
        return (
          <div>
            <h2>Ideal Skills</h2>
            <ul className={styles.skillsList}>
              {job.idealSkills && job.idealSkills.length > 0 ? (
                job.idealSkills.map((skill, index) => (
                  <li key={index} className={styles.skillItem}>
                    <span className={styles.dot}></span>
                    {skill}
                  </li>
                ))
              ) : (
                <li>No ideal skills listed.</li>
              )}
            </ul>
          </div>
        );
      case "applicants":
        return (
          <div>
            <h2>Job Applicants ({job.applicant.length})</h2>
            <div className={styles.applicantsList}>
              {paginatedApplicants.map((applicant, index) => (
                <div
                  key={applicant.id}
                  className={`${styles.applicantCard} ${styles.animatedCard}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleApplicantClick(applicant)}
                >
                  <div className={styles.applicantHeader}>
                    <div className={styles.applicantAvatarContainer}>
                      {hasCustomApplicantAvatar(applicant) ? (
                        <img
                          src={applicant.avatar}
                          alt={applicant.applicantName}
                          className={styles.applicantAvatar}
                        />
                      ) : (
                        <div className={styles.defaultAvatarApplicant}>
                          {getApplicantAvatarLetter(applicant)}
                        </div>
                      )}
                    </div>
                    <div className={styles.applicantInfo}>
                      <h4 className={styles.applicantName}>{applicant.applicantName}</h4>
                      <p className={styles.applicantDate}>
                        Applied {getTimeSincePosted({ createdAt: applicant.appliedAt })}
                      </p>
                    </div>
                    {userData?.userId && userData.userId === job.hirerId && (
                      <Badge
                        bg={applicant.status === "WAITING" ? "warning" : applicant.status === "IN_PROGRESS" ? "success" : "danger"}
                        className={`ms-auto ${styles.statusBadge}`}
                      >
                        {applicant.status}
                      </Badge>
                    )}
                  </div>
                  <div className={styles.applicantCoverLetter}>{applicant.coverLetter}</div>
                  <div className={styles.applicantFooter}>
                    <span className={styles.viewProfile}>Click to view details →</span>
                  </div>
                </div>
              ))}
            </div>
            {job.applicant.length > itemsPerPage && renderPagination()}
          </div>
        );
      default:
        return null;
    }
  };

  const renderAllContent = () => {
    return (
      <div className={styles.allContentContainer}>
        <div className={styles.jobSection}>
          <div className={styles.sectionHeader}>
            <h2>Job Description</h2>
          </div>
          <div className={styles.jobDescription}>
            {job.description ? (
              job.description.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </div>

        <div className={styles.jobSection}>
          <div className={styles.sectionHeader}>
            <h2>Key Responsibilities</h2>
          </div>
          <ul className={styles.responsibilitiesList}>
            {job.keyResponsibilities && job.keyResponsibilities.length > 0 ? (
              job.keyResponsibilities.map((responsibility, index) => (
                <li key={index} className={styles.responsibilityItem}>
                  <span className={styles.dot}></span>
                  {responsibility}
                </li>
              ))
            ) : (
              <li>No responsibilities listed.</li>
            )}
          </ul>
        </div>

        <div className={styles.jobSection}>
          <div className={styles.sectionHeader}>
            <h2>Ideal Skills</h2>
          </div>
          <ul className={styles.skillsList}>
            {job.idealSkills && job.idealSkills.length > 0 ? (
              job.idealSkills.map((skill, index) => (
                <li key={index} className={styles.skillItem}>
                  <span className={styles.dot}></span>
                  {skill}
                </li>
              ))
            ) : (
              <li>No ideal skills listed.</li>
            )}
          </ul>
        </div>

        <div className={styles.jobSection}>
          <div className={styles.sectionHeader}>
            <h2>Job Applicants ({job.applicant.length})</h2>
          </div>
          <div className={styles.applicantsList}>
            {paginatedApplicants.map((applicant, index) => (
              <div
                key={applicant.id}
                className={`${styles.applicantCard} ${styles.animatedCard}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleApplicantClick(applicant)}
              >
                <div className={styles.applicantHeader}>
                  <div className={styles.applicantAvatarContainer}>
                    {hasCustomApplicantAvatar(applicant) ? (
                      <img
                        src={applicant.avatar}
                        alt={applicant.applicantName}
                        className={styles.applicantAvatar}
                      />
                    ) : (
                      <div className={styles.defaultAvatarApplicant}>
                        {getApplicantAvatarLetter(applicant)}
                      </div>
                    )}
                  </div>
                  <div className={styles.applicantInfo}>
                    <h4 className={styles.applicantName}>{applicant.applicantName}</h4>
                    <p className={styles.applicantDate}>
                      Applied {getTimeSincePosted({ createdAt: applicant.appliedAt })}
                    </p>
                  </div>
                  {userData?.userId && userData.userId === job.hirerId && (
                    <Badge
                      bg={applicant.status === "WAITING" ? "warning" : applicant.status === "IN_PROGRESS" ? "success" : "danger"}
                      className={`ms-auto ${styles.statusBadge}`}
                    >
                      {applicant.status}
                    </Badge>
                  )}
                </div>
                <div className={styles.applicantCoverLetter}>{applicant.coverLetter}</div>
                <div className={styles.applicantFooter}>
                  <span className={styles.viewProfile}>Click to view details →</span>
                </div>
              </div>
            ))}
          </div>
          {job.applicant.length > itemsPerPage && renderPagination()}
        </div>
      </div>
    );
  };

  const renderPagination = () => (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Button
        variant="outline-secondary"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="me-2"
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "primary" : "outline-secondary"}
          onClick={() => setCurrentPage(page)}
          className="mx-1"
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline-secondary"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="ms-2"
      >
        Next
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className={`${styles.pageWrapper} ${styles.jobDetail}`}>
      {contextHolder}
      <Container className={styles.jobDetailContainer}>
        <Row className="mb-4">
          <Col md={12}>
            <div className={`${styles.createdTime} rounded-pill`}>
              <FaClock className={styles.icon} /> {getTimeSincePosted(job)}
            </div>
            <div className={styles.jobHeader}>
              <div className="d-flex align-items-center w-100 justify-content-between">
                <div className="d-flex align-items-center">
                  <div className={styles.companyLogo}>
                    {hasCustomLogo ? (
                      <img
                        src={job.companyLogoPath || "/placeholder.svg"}
                        alt={job.companyName}
                        className={styles.logo}
                      />
                    ) : (
                      <div className={styles.defaultAvatar}>{getAvatarLetter()}</div>
                    )}
                  </div>
                  <div className={styles.jobTitleSection}>
                    <h1 className={styles.jobTitle}>{job.jobTitle || "Untitled Job"}</h1>
                    <div className={styles.jobMeta}>
                      <span className={styles.category}>
                        <FaBriefcase className={styles.icon} /> {job.category}
                      </span>
                      <span className={styles.salary}>
                        <FaDollarSign className={styles.icon} /> {formatSalary(job)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  {userData && userData?.role !== "HIRER" && userData.fillingForm && (
                    <Button
                      className={`${styles.applyButton} mb-2 ${isApplied ? styles.appliedButton : ""}`}
                      onClick={handleApplyClick}
                      disabled={isApplied}
                    >
                      {isApplied ? (
                        <>
                          <FaCheck className="me-1" /> Applied
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                  )}
                  <div className="d-flex flex-row align-items-center gap-2">
                    {!isApplied && userData && userData?.role !== "HIRER" && userData.fillingForm && (
                      <Button
                        variant="outline-secondary"
                        className={styles.saveButton}
                        onClick={handleSaveJob}
                      >
                        {isSaved ? <FaBookmark /> : <FaRegBookmark />} {isSaved ? "Saved" : "Save"}
                      </Button>
                    )}
                    <Button
                      variant="outline-secondary"
                      className={styles.shareButton}
                      onClick={handleShareClick}
                    >
                      <FaShare /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <div className={styles.viewToggle}>
              <span className={styles.toggleLabel}>View Mode:</span>
              <button
                className={`${styles.toggleButton} ${viewMode === "tabs" ? styles.active : ""}`}
                onClick={() => setViewMode("tabs")}
              >
                <FaTh /> Tabs
              </button>
              <button
                className={`${styles.toggleButton} ${viewMode === "vertical" ? styles.active : ""}`}
                onClick={() => setViewMode("vertical")}
              >
                <FaList /> All Sections
              </button>
            </div>

            {viewMode === "tabs" ? (
              <>
                <div className={styles.tabsContainer}>
                  <div
                    className={`${styles.tab} ${activeTab === "description" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("description")}
                  >
                    Description
                  </div>
                  <div
                    className={`${styles.tab} ${activeTab === "responsibilities" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("responsibilities")}
                  >
                    Responsibilities
                  </div>
                  <div
                    className={`${styles.tab} ${activeTab === "idealSkills" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("idealSkills")}
                  >
                    Ideal Skills
                  </div>
                  <div
                    className={`${styles.tab} ${activeTab === "applicants" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("applicants")}
                  >
                    Applicants ({job.applicant?.length || 0})
                  </div>
                </div>

                <div className={styles.jobSection}>{renderTabContent()}</div>
              </>
            ) : (
              renderAllContent()
            )}

            <div className={styles.skillsSection}>
              <h3>Required Skills</h3>
              <div className={styles.tagsContainer}>
                {job.skills && job.skills.length > 0 ? (
                  job.skills.map((skill, index) => (
                    <Badge key={index} className={styles.tag}>
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p>No tags available.</p>
                )}
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className={styles.jobOverview}>
              <h2>Job Overview</h2>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Job Title</div>
                <div className={styles.overviewValue}>{job.jobTitle || "Untitled Job"}</div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Company</div>
                <div className={styles.overviewValue}>{job.companyName || "Unknown Company"}</div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Category</div>
                <div className={styles.overviewValue}>{job.category}</div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Offered Salary</div>
                <div className={styles.overviewValue}>{formatSalary(job)}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share This Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.shareLink}>
            <input type="text" readOnly value={window.location.href} className={styles.shareLinkInput} />
            <Button
              className={`${copySuccess ? styles.copyButtonFalse : styles.copyButton}`}
              variant="primary"
              onClick={handleCopyLink}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered size="lg">
        <Modal.Header closeButton className={styles.applyModalHeader}>
          <Modal.Title className="text-black font-weight-bold">Please tell us why you're a good fit for this project</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem" }}>
          <h4 className={userProfileStyles.jobTitleModal}>{job.jobTitle}</h4>
          <p>
            <FaDollarSign /> {formatSalary(job)}
          </p>
          <Form onSubmit={handleApplySubmit}>
            <div className={styles.formSection}>
              <h5>Cover Letter</h5>
              <Form.Group className="mb-3">
                <Form.Label>Cover Letter (Required)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a good fit for this position"
                  rows={4}
                  required
                  maxLength={500}
                />
                <Form.Text className="text-muted">
                  {500 - formData.coverLetter.length} characters remaining
                </Form.Text>
              </Form.Group>
            </div>

            <div className={styles.formActions}>
              <Button variant="outline-secondary" onClick={() => setShowApplyModal(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className={styles.submitButton}
                disabled={!formData.coverLetter.trim()}
              >
                <FaCheck className="me-1" /> Submit Application
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showApplicantModal}
        onHide={() => setShowApplicantModal(false)}
        centered
        size="lg"
        className={styles.applicantModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedApplicant?.applicantName} - Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav variant="tabs" defaultActiveKey="information" onSelect={(key) => setActiveApplicantTab(key)}>
            <Nav.Item>
              <Nav.Link eventKey="information">Information</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ratings">Ratings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
          </Nav>
          {selectedApplicant && (
            <div className={userProfileStyles.applicantDetails} style={{ marginTop: "1rem" }}>
              {activeApplicantTab === "information" ? (
                <div>
                  <h5>Name</h5>
                  <p>{selectedApplicant.applicantName || "Unknown Applicant"}</p>
                  {userData?.userId && userData.userId === job.hirerId && (
                    <>
                      <h5>Status</h5>
                      <p>{selectedApplicant.status || "Unknown"}</p>
                    </>
                  )}
                  <h5>Applied At</h5>
                  <p>{getTimeSincePosted({ createdAt: selectedApplicant.appliedAt })}</p>
                  <h5>Cover Letter</h5>
                  <p>{selectedApplicant.coverLetter || "No cover letter provided"}</p>
                  {userData?.userId && userData.userId === job.hirerId && selectedApplicant.status === "WAITING" && (
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={() => handleAcceptApplicant(selectedApplicant)}
                    >
                      <FaCheck className="me-1" /> Accept Applicant
                    </Button>
                  )}
                </div>
              ) : activeApplicantTab === "ratings" ? (
                <div>
                  {ratingLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : ratingError ? (
                    <div className="alert alert-danger" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {ratingError}
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">{selectedApplicant.applicantName}'s Ratings</h4>
                        {ratings.length > 0 && (
                          <div className="text-end">
                            <div className="fw-bold">Average Rating: {calculateAverageRating()}</div>
                            <div className="text-muted">Based on {ratings.length} review{ratings.length !== 1 ? "s" : ""}</div>
                          </div>
                        )}
                      </div>
                      {ratings.length === 0 ? (
                        <div className="text-center py-5">
                          <i className="fas fa-star fa-3x text-muted mb-3"></i>
                          <h5 className="text-muted">No ratings yet</h5>
                          <p className="text-muted">This freelancer has not received any ratings yet.</p>
                        </div>
                      ) : (
                        <div className="row">
                          {ratings.map((rating) => (
                            <div key={rating.id} className="col-12 mb-4">
                              <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-8">
                                      <h5 className="card-title text-primary mb-2">{rating.jobTitle}</h5>
                                      <div className="mb-3">{renderStars(rating.stars)}</div>
                                      {rating.comment && (
                                        <div className="mb-3">
                                          <h6 className="text-muted mb-2">Client Feedback:</h6>
                                          <p className="card-text">{rating.comment}</p>
                                        </div>
                                      )}
                                    </div>
                                    <div className="col-md-4 text-md-end">
                                      <div className="mb-2">
                                        <small className="text-muted">Rated by:</small>
                                        <div className="fw-bold">{rating.hirerName}</div>
                                      </div>
                                      <div>
                                        <small className="text-muted">Job ID: #{rating.jobId}</small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {profileLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : profileError ? (
                    <div className="alert alert-danger" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {profileError}
                    </div>
                  ) : applicantProfile ? (
                    <div>
                      <ReadOnlySummarySection summary={applicantProfile.bio || ""} />
                      <ReadOnlySkillsSection
                        mainSkills={applicantProfile.skills
                          .filter((skill) => skill.skillType === "MAIN")
                          .map((skill) => skill.skillName)}
                        otherSkills={applicantProfile.skills
                          .filter((skill) => skill.skillType === "ADDITIONAL")
                          .map((skill) => skill.skillName)}
                        styles={styles}
                      />
                      <ReadOnlyExperienceSection
                        workExperiences={applicantProfile.experiences.map((exp) => ({
                          id: exp.expId,
                          position: exp.jobPosition,
                          company: exp.companyName,
                          startDate: Array.isArray(exp.startDate) ? formatDateArray(exp.startDate) : exp.startDate,
                          endDate: exp.currentlyWork ? "Now" : Array.isArray(exp.endDate) ? formatDateArray(exp.endDate) : exp.endDate,
                          description: exp.jobDescription,
                          projects: exp.projects.map((proj) => ({
                            id: proj.projectId,
                            name: proj.projectName,
                            time: proj.projectTime,
                            description: proj.projectDescription,
                          })),
                        }))}
                      />
                      <ReadOnlyEducationSection
                        educations={applicantProfile.educations.map((edu) => ({
                          id: edu.educationId,
                          school: edu.schoolName,
                          major: edu.majorName,
                          startDate: Array.isArray(edu.startDate) ? formatDateArray(edu.startDate) : edu.startDate,
                          endDate: edu.currentlyStudy ? "Now" : Array.isArray(edu.endDate) ? formatDateArray(edu.endDate) : edu.endDate,
                          description: edu.description,
                        }))}
                      />
                      <ReadOnlyCertificateSection
                        certificates={applicantProfile.certificates.map((cert) => ({
                          id: cert.certificateId,
                          name: cert.certificateName,
                          issueDate: Array.isArray(cert.certificateDate) ? formatDateArray(cert.certificateDate) : cert.certificateDate,
                          score: cert.achievement,
                          description: cert.certificateDescription,
                        }))}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <h5 className="text-muted">No profile data available</h5>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showTopUpModal}
        onHide={() => setShowTopUpModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Insufficient Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your current balance is insufficient to accept this applicant.</p>
          <p>
            Required: {formatSalary({ minBudget: calculateRequiredBalance() })}
            <br />
            Your balance: {formatSalary({ minBudget: userData?.balance || 0 })}
          </p>
          <p>Would you like to top up your account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowTopUpModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTopUpConfirm}>
            Top Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}