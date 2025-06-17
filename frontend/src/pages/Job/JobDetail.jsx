import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaBriefcase,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaChevronRight,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaCheck,
  FaUser,
  FaPhone,
  FaFileAlt,
} from "react-icons/fa";
import { notification } from "antd";
import styles from "./Styles/JobDetail.module.css";
import jobData from "./JobData.json";
import { useParams } from 'react-router-dom';
import { fetchJobById } from '../../services/jobService';

export default function JobDetail() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [copySuccess, setCopySuccess] = useState(false);
  const [tagExpanded, setTagExpanded] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Notification API setup
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetchJobById(id);
        // Transform backend data to frontend format
        const jobData = transformJobData(response.data);
        setJob(jobData);
      } catch (err) {
        setError(err.message || 'Failed to load job details');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Transform backend job data to match frontend structure
  const transformJobData = (backendJob) => {
    return {
      id: backendJob.id,
      title: backendJob.title,
      company: backendJob.hirer?.companyName || 'Unknown Company',
      logo: backendJob.hirer?.logo || '/placeholder.svg',
      category: backendJob.category?.name || 'Uncategorized',
      salary: `$${backendJob.minBudget}-$${backendJob.maxBudget}`,
      description: backendJob.description,
      responsibilities: backendJob.responsibilities || [],
      skills: backendJob.skills?.map(skill => skill.skillName) || [],
      tags: [], // Not in backend model
      relatedJobs: [], // Not in backend model
      similarCompanies: [], // Not in backend model
      createdAt: new Date(backendJob.createdAt).toLocaleDateString(),
      // Add other fields as needed
    };
  };

  if (loading) return <div>Loading job details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  const jobLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";


  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(jobLink)
      .then(() => {
        setCopySuccess(true);
        openNotification(
          "success",
          "Link Copied!",
          "Job link has been copied to clipboard"
        );
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        openNotification(
          "error",
          "Copy Failed",
          "Failed to copy link to clipboard"
        );
      });
  };

  const handleTagExpand = (id) => {
    setTagExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Mock data - in a real app, this would come from an API
  // const job = jobData;

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    openNotification(
      "success",
      isSaved ? "Job Removed" : "Job Saved",
      isSaved
        ? "This job has been removed from your saved jobs"
        : "This job has been saved to your profile"
    );
  };

  const handleApplyClick = () => {
    setShowApplyModal(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the application data to your backend
    setShowApplyModal(false);
    openNotification(
      "success",
      "Application Submitted!",
      "Your application has been successfully submitted. Good luck!"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  return (
    <div className={`${styles.pageWrapper} ${styles.jobDetail}`}>
      {contextHolder} {/* Ant Design notification container */}
      <Container className={styles.jobDetailContainer}>
        <Row className="mb-4">
          <Col md={12}>
            <div className={`${styles.createdTime} rounded-pill`}>
              <FaClock className={styles.icon} /> {job.createdAt}
            </div>
            <div className={styles.jobHeader}>
              {/* Left Section - Job Details */}
              <div className="d-flex align-items-center w-100 justify-content-between">
                <div className="d-flex align-items-center">
                  <div className={styles.companyLogo}>
                    <img
                      src={job.logo || "/placeholder.svg"}
                      alt={job.company}
                      className={styles.logo}
                    />
                  </div>
                  <div className={styles.jobTitleSection}>
                    <h1 className={styles.jobTitle}>{job.title}</h1>
                    <div className={styles.jobMeta}>
                      <span className={styles.category}>
                        <FaBriefcase className={styles.icon} /> {job.category}
                      </span>
                      {/* <span className={styles.location}>
                        <FaMapMarkerAlt className={styles.icon} />{" "}
                        {job.location}
                      </span> */}
                      <span className={styles.salary}>
                        <FaDollarSign className={styles.icon} /> {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Buttons */}
                <div className="d-flex flex-column align-items-end">
                  <Button
                    className={`${styles.applyButton} mb-3`}
                    onClick={handleApplyClick}
                  >
                    Apply Now
                  </Button>
                  <div className="d-flex">
                    <Button
                      variant="outline-secondary"
                      className={`${styles.shareButton} me-2`}
                      onClick={handleShareClick}
                    >
                      <FaShare /> Share
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className={styles.saveButton}
                      onClick={handleSaveJob}
                    >
                      {isSaved ? <FaBookmark /> : <FaRegBookmark />}{" "}
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <div className={styles.tabsContainer}>
              <div
                className={`${styles.tab} ${activeTab === "description" ? styles.activeTab : ""
                  }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </div>
              <div
                className={`${styles.tab} ${activeTab === "responsibilities" ? styles.activeTab : ""
                  }`}
                onClick={() => setActiveTab("responsibilities")}
              >
                Responsibilities
              </div>
              <div
                className={`${styles.tab} ${activeTab === "skills" ? styles.activeTab : ""
                  }`}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </div>
              {/* <div
                className={`${styles.tab} ${
                  activeTab === "benefits" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("benefits")}
              >
                Benefits
              </div> */}
            </div>

            <div className={styles.jobSection}>
              {activeTab === "description" && (
                <div className={styles.jobDescription}>
                  <h2>Job Description</h2>
                  {job.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}

              {activeTab === "responsibilities" && (
                <div>
                  <h2>Key Responsibilities</h2>
                  <ul className={styles.responsibilitiesList}>
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className={styles.responsibilityItem}>
                        <span className={styles.dot}></span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "skills" && (
                <div>
                  <h2>Professional Skills</h2>
                  <ul className={styles.skillsList}>
                    {job.skills.map((skill, index) => (
                      <li key={index} className={styles.skillItem}>
                        <span className={styles.dot}></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "benefits" && (
                <div>
                  <h2>Benefits & Perks</h2>
                  <ul className={styles.benefitsList}>
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className={styles.benefitItem}>
                        <span className={styles.dot}></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.jobSection}>
              <h2>Tags</h2>
              <div className={styles.tagsContainer}>
                {job.tags.map((tag, index) => (
                  <Badge key={index} className={styles.tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className={styles.relatedJobsSection}>
              <div className={styles.sectionHeader}>
                <h2>Related Jobs</h2>
                <a href="#" className={styles.viewAllLink}>
                  View All <FaChevronRight />
                </a>
              </div>
              <p>
                All are filtered position to related what you've searched
                already
              </p>

              <div className={styles.relatedJobsGrid}>
                {job.relatedJobs.map((relatedJob) => (
                  <div key={relatedJob.id} className={styles.relatedJobCard}>
                    <div className={styles.relatedJobHeader}>
                      <img
                        src={relatedJob.logo || "/placeholder.svg"}
                        alt={relatedJob.company}
                        className={styles.relatedJobLogo}
                      />
                      <div>
                        <h3 className={styles.relatedJobTitle}>
                          {relatedJob.title}
                        </h3>
                        <p className={styles.relatedJobCompany}>
                          {relatedJob.company}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.relatedJobMeta} pb-4`}>
                      <span className={styles.relatedJobCategory}>
                        <FaBriefcase className={styles.icon} />{" "}
                        {relatedJob.category}
                      </span>
                      <span className={styles.relatedJobSalary}>
                        <FaDollarSign className={styles.icon} />{" "}
                        {relatedJob.salary}
                      </span>
                    </div>
                    <div className={styles.relatedJobTags}>
                      {(tagExpanded[relatedJob.id] === true // Explicitly check for true
                        ? relatedJob.tags // Show all tags when expanded
                        : relatedJob.tags.slice(0, 3)
                      ) // Show only 3 tags when not expanded (undefined or false)
                        .map((tag, index) => (
                          <Badge key={index} className={styles.relatedJobTag}>
                            {tag}
                          </Badge>
                        ))}
                      {tagExpanded[relatedJob.id] !== true &&
                        relatedJob.tags.length > 3 && ( // Show "+X" when not expanded
                          <Badge
                            className={`${styles.relatedJobTag} ${styles.moreTag}`}
                            onClick={() => handleTagExpand(relatedJob.id)}
                          >
                            +{relatedJob.tags.length - 3}
                          </Badge>
                        )}
                      <div
                        className={`${styles.createdTime} rounded-pill mt-2`}
                      >
                        <FaClock className={styles.icon} /> {job.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className={styles.jobOverview}>
              <h2>Job Overview</h2>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Job Title</div>
                <div className={styles.overviewValue}>{job.title}</div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Company</div>
                <div className={styles.overviewValue}>{job.company}</div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Category</div>
                <div className={styles.overviewValue}>{job.category}</div>
              </div>
              <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Offered Salary</div>
                <div className={styles.overviewValue}>{job.salary}</div>
              </div>
              {/* <div className={styles.overviewItem}>
                <div className={styles.overviewLabel}>Location</div>
                <div className={styles.overviewValue}>{job.location}</div>
              </div>
              <div className={styles.companyMap}>
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Company location map"
                  className={styles.mapImage}
                />
              </div> */}
            </div>

            <div className={styles.similarCompanies}>
              <h2>Similar Companies</h2>
              {job.similarCompanies.map((company) => (
                <div key={company.id} className={styles.similarCompanyItem}>
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className={styles.similarCompanyLogo}
                  />
                  <div className={styles.similarCompanyInfo}>
                    <h3>{company.name}</h3>
                    <p>{company.industry}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      {/* Share Modal */}
      <Modal
        show={showShareModal}
        onHide={() => setShowShareModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Share This Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.shareLink}>
            <input
              type="text"
              readOnly
              value={jobLink}
              className={styles.shareLinkInput}
            />
            <Button
              className={`${copySuccess ? styles.copyButtonFalse : styles.copyButton
                }`}
              variant="primary"
              onClick={handleCopyLink}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </div>

          {/* <div className={styles.shareOptions}>
            <Button variant="outline-primary" className={styles.shareOption}>
              <FaLinkedin /> LinkedIn
            </Button>
            <Button variant="outline-info" className={styles.shareOption}>
              <FaTwitter /> Twitter
            </Button>
            <Button variant="outline-primary" className={styles.shareOption}>
              <FaFacebook /> Facebook
            </Button>
            <Button variant="outline-secondary" className={styles.shareOption}>
              <FaEnvelope /> Email
            </Button>
          </div> */}
        </Modal.Body>
      </Modal>
      {/* Apply Job Modal */}
      <Modal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className={styles.applyModalHeader}>
          <Modal.Title>Apply for {job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.applyModalCompanyInfo}>
            <img
              src={job.logo || "/placeholder.svg"}
              alt={job.company}
              className={styles.applyModalLogo}
            />
            <div>
              <h4>{job.company}</h4>
              <p>
                {job.location} • {job.salary}
              </p>
            </div>
          </div>

          <Form onSubmit={handleApplySubmit}>
            {/* <div className={styles.formSection}>
              <h5>Personal Information</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Full Name <span className={styles.requiredField}>*</span>
                    </Form.Label>
                    <div className={styles.inputWithIcon}>
                      <FaUser className={styles.formIcon} />
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email <span className={styles.requiredField}>*</span>
                    </Form.Label>
                    <div className={styles.inputWithIcon}>
                      <FaEnvelope className={styles.formIcon} />
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <div className={styles.inputWithIcon}>
                      <FaPhone className={styles.formIcon} />
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </div> */}

            <div className={styles.formSection}>
              <h5>Cover Letter</h5>
              {/* <Form.Group className="mb-3">
                <Form.Label>
                  Resume <span className={styles.requiredField}>*</span>
                </Form.Label>
                <div className={styles.fileUploadContainer}>
                  <div className={styles.fileUpload}>
                    <FaFileAlt className={styles.fileIcon} />
                    <div>
                      <p className={styles.uploadText}>
                        {formData.resume
                          ? formData.resume.name
                          : "Upload your resume"}
                      </p>
                      <p className={styles.fileHint}>
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  </div>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className={styles.hiddenFileInput}
                  />
                </div>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Cover Letter (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a good fit for this position"
                  rows={4}
                />
              </Form.Group>
            </div>

            <div className={styles.formActions}>
              <Button
                variant="outline-secondary"
                onClick={() => setShowApplyModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className={styles.submitButton}>
                <FaCheck className="me-1" /> Submit Application
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
