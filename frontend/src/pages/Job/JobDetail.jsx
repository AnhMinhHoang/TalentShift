import { useState, useEffect } from "react"
import { Container, Row, Col, Button, Badge, Modal, Form } from "react-bootstrap"
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
  FaUser,
  FaCalendarAlt,
  FaAward,
  FaGraduationCap,
  FaBriefcase as FaWork,
  FaQuoteLeft,
  FaTrophy,
  FaStar,
  FaExclamationTriangle,
  FaCreditCard,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa"
import { notification } from "antd"
import styles from "./Styles/JobDetail.module.css"
import userProfileStyles from "../userProfile/style/UserProfile.module.css"
import {
  fetchJobById,
  applyToJob,
  toggleBookmark,
  updateJob,
  getAllRatingsByFreelancer,
} from "../../services/jobService"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../AuthContext.jsx"
import apis from "../../services/api"
import { getImageUrl } from "../../utils/imageUtils";
import AvatarWithFallback from '../../components/AvatarWithFallback';

// Accept Applicant Confirmation Modal Component
const AcceptApplicantModal = ({
  show,
  onHide,
  applicant,
  originalAmount,
  feePercentage = 7,
  onConfirm,
  formatSalary,
  userData,
}) => {
  const parsedOriginal = Number(originalAmount);
  const feeAmount = parsedOriginal * (feePercentage / 100);
  const totalAmount = parsedOriginal + feeAmount;

  const hasEnoughBalance = userData.balance >= totalAmount

  return (
    <Modal show={show} onHide={onHide} centered className={styles.acceptApplicantModal} backdrop="static">
      <Modal.Header className={styles.acceptModalHeader}>
        <div className={styles.acceptModalIcon}>
          <FaUser />
        </div>
        <Modal.Title className={styles.acceptModalTitle}>Accept Applicant</Modal.Title>
        <Button variant="link" onClick={onHide} className={styles.acceptCloseButton}>
          <FaTimes />
        </Button>
      </Modal.Header>

      <Modal.Body className={styles.acceptModalBody}>
        {applicant && (
          <div className={styles.applicantSummary}>
            <div className={styles.applicantSummaryHeader}>
              <div className={styles.applicantSummaryAvatar}>
                <AvatarWithFallback
                  src={applicant.avatar && applicant.avatar !== "/placeholder.svg" ? getImageUrl(applicant.avatar) : null}
                  alt={applicant.applicantName}
                  name={applicant.applicantName}
                  size={48}
                  className={styles.applicantSummaryAvatarImg}
                />
              </div>
              <div className={styles.applicantSummaryInfo}>
                <h4>{applicant.applicantName}</h4>
                <p>You are about to accept this applicant</p>
              </div>
            </div>
          </div>
        )}
        <div>
          <div className={styles.paymentBreakdown}>
            <h5>Payment Breakdown</h5>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Project Budget</span>
              <span className={styles.breakdownValue}>{formatSalary(originalAmount)}</span>
            </div>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Platform Fee ({feePercentage}%)</span>
              <span className={styles.breakdownValue}>{formatSalary(feeAmount)}</span>
            </div>
            <div className={styles.breakdownDivider}></div>
            <div className={`${styles.breakdownItem} ${styles.breakdownTotal}`}>
              <span className={styles.breakdownLabel}>Total Amount</span>
              <span className={styles.breakdownValue}>{formatSalary(totalAmount)}</span>
            </div>
          </div>

          <div className={styles.balanceCheck}>
            <div className={styles.balanceCheckItem}>
              <span className={styles.balanceCheckLabel}>Your Current Balance</span>
              <span
                className={`${styles.balanceCheckValue} ${hasEnoughBalance ? styles.sufficient : styles.insufficient}`}
              >
                {formatSalary(userData.balance)}
              </span>
            </div>
            {!hasEnoughBalance && (
              <div className={styles.insufficientWarning}>
                <FaExclamationTriangle className={styles.warningIcon} />
                <span>Insufficient balance. You'll be redirected to top up.</span>
              </div>
            )}
          </div>

          <div className={styles.acceptanceNote}>
            <FaInfoCircle className={styles.noteIcon} />
            <p>
              By accepting this applicant, all other applications will be automatically rejected, and the project will
              move to "In Progress" status.
            </p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.acceptModalFooter}>
        <Button variant="outline-secondary" onClick={onHide} className={styles.acceptCancelButton}>
          Cancel
        </Button>
        <Button
          variant={hasEnoughBalance ? "success" : "warning"}
          onClick={() => onConfirm(hasEnoughBalance)}
          className={styles.acceptConfirmButton}
        >
          {hasEnoughBalance ? (
            <>
              <FaCheck className="me-2" />
              Accept & Pay {formatSalary({ minBudget: totalAmount })}
            </>
          ) : (
            <>
              <FaCreditCard className="me-2" />
              Top Up & Accept
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Custom read-only component for Summary
const ReadOnlySummarySection = ({ summary }) => {
  return (
    <div className={styles.profileSection}>
      <div className={styles.sectionHeader}>
        <FaUser className={styles.sectionIcon} />
        <h4>Summary</h4>
      </div>
      {summary && summary.trim() ? (
        <div className={styles.summaryCard}>
          <p>{summary}</p>
        </div>
      ) : (
        <p className="text-muted fs-6 fst-italic">No summary available.</p>
      )}
    </div>
  )
}

// Custom read-only component for Skills
const ReadOnlySkillsSection = ({ mainSkills, otherSkills }) => {
  const hasMainSkills = mainSkills && mainSkills.length > 0
  const hasOtherSkills = otherSkills && otherSkills.length > 0
  const hasAnySkills = hasMainSkills || hasOtherSkills

  return (
    <div className={styles.profileSection}>
      <div className={styles.sectionHeader}>
        <FaAward className={styles.sectionIcon} />
        <h4>Skills</h4>
      </div>
      {hasAnySkills ? (
        <div className={styles.skillsContainer}>
          {hasMainSkills && (
            <div className={styles.skillCategory}>
              <h6>Main Skills</h6>
              <div className={styles.skillTags}>
                {mainSkills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {hasOtherSkills && (
            <div className={styles.skillCategory}>
              <h6>Other Skills</h6>
              <div className={styles.skillTags}>
                {otherSkills.map((skill, index) => (
                  <span key={index} className={styles.skillTagSecondary}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-muted fs-6 fst-italic">No skills listed.</p>
      )}
    </div>
  )
}

// Custom read-only component for Work Experience
const ReadOnlyExperienceSection = ({ workExperiences }) => {
  const hasExperiences = workExperiences && workExperiences.length > 0

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Now") return "Now"
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(2)
    return `${month}-${year}`
  }

  return (
    <div className={styles.profileSection}>
      <div className={styles.sectionHeader}>
        <FaWork className={styles.sectionIcon} />
        <h4>Work Experience</h4>
      </div>
      {hasExperiences ? (
        <div className={styles.experienceList}>
          {workExperiences.map((experience) => (
            <div className={styles.experienceItem} key={experience.id}>
              <div className={styles.experienceHeader}>
                <h6>
                  {experience.position} at {experience.company}
                </h6>
              </div>
              <div className={styles.experienceDuration}>
                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
              </div>
              {experience.description && <p className={styles.experienceDescription}>{experience.description}</p>}
              {experience.projects && experience.projects.length > 0 && (
                <div className="mt-2">
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
          ))}
        </div>
      ) : (
        <p className="text-muted fs-6 fst-italic">No work experience listed.</p>
      )}
    </div>
  )
}

// Custom read-only component for Education
const ReadOnlyEducationSection = ({ educations }) => {
  const hasEducations = educations && educations.length > 0

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Now") return "Now"
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(2)
    return `${month}-${year}`
  }

  return (
    <div className={styles.profileSection}>
      <div className={styles.sectionHeader}>
        <FaGraduationCap className={styles.sectionIcon} />
        <h4>Education</h4>
      </div>
      {hasEducations ? (
        <div className={styles.educationList}>
          {educations.map((education) => (
            <div className={styles.educationItem} key={education.id}>
              <div className={styles.educationHeader}>
                <h6>{education.school}</h6>
                {education.major && <span className={styles.educationMajor}>{education.major}</span>}
              </div>
              <div className={styles.educationDuration}>
                {formatDate(education.startDate)} - {formatDate(education.endDate)}
              </div>
              {education.description && <p className={styles.experienceDescription}>{education.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted fs-6 fst-italic">No education listed.</p>
      )}
    </div>
  )
}

// Custom read-only component for Certificates
const ReadOnlyCertificateSection = ({ certificates }) => {
  const hasCertificates = certificates && certificates.length > 0

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(2)
    return `${month}-${year}`
  }

  return (
    <div className={styles.profileSection}>
      <div className={styles.sectionHeader}>
        <FaAward className={styles.sectionIcon} />
        <h4>Certificates</h4>
      </div>
      {hasCertificates ? (
        <div className={styles.educationList}>
          {certificates.map((certificate) => (
            <div className={styles.educationItem} key={certificate.id}>
              <div className={styles.educationHeader}>
                <h6>{certificate.name}</h6>
              </div>
              <div className={styles.educationDuration}>{formatDate(certificate.issueDate)}</div>
              <p className={styles.experienceDescription}>{certificate.score}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted fs-6 fst-italic">No certificates listed.</p>
      )}
    </div>
  )
}

// Enhanced Applicant Modal Component
const ApplicantDetailModal = ({
  show,
  onHide,
  selectedApplicant,
  activeTab,
  setActiveTab,
  userData,
  job,
  ratings,
  ratingLoading,
  ratingError,
  applicantProfile,
  profileLoading,
  profileError,
  onAcceptApplicant,
  getTimeSincePosted,
  calculateAverageRating,
  renderStars,
  formatDateArray,
}) => {
  if (!selectedApplicant) return null

  const hasCustomAvatar = selectedApplicant?.avatar && selectedApplicant.avatar !== "/placeholder.svg"
  const getAvatarLetter = () =>
    selectedApplicant?.applicantName ? selectedApplicant.applicantName.charAt(0).toUpperCase() : "A"

  const renderInformationTab = () => (
    <div className={styles.modalTabContent}>
      {/* Applicant Header Card */}
      <div className={styles.applicantHeaderCard}>
        <div className={styles.applicantAvatarSection}>
          {hasCustomAvatar ? (
            <AvatarWithFallback
              src={getImageUrl(selectedApplicant.avatar)}
              alt={selectedApplicant.applicantName}
              name={selectedApplicant.applicantName}
              size={64}
              className={styles.modalApplicantAvatar}
            />
          ) : (
            <AvatarWithFallback
              src={null}
              alt={selectedApplicant.applicantName}
              name={selectedApplicant.applicantName}
              size={64}
              className={styles.modalDefaultAvatar}
            />
          )}
          <div className={styles.applicantBasicInfo}>
            <h3 className={styles.applicantModalName}>{selectedApplicant.applicantName}</h3>
            <div className={styles.applicantMetaInfo}>
              <span className={styles.metaItem}>
                <FaCalendarAlt className={styles.metaIcon} />
                Applied {getTimeSincePosted({ createdAt: selectedApplicant.appliedAt })}
              </span>
              {userData?.userId && userData.userId === job.hirerId && (
                <span className={`${styles.statusBadgeModal} ${styles[`status${selectedApplicant.status}`]}`}>
                  {selectedApplicant.status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Letter Section */}
      <div className={styles.infoSection}>
        <div className={styles.sectionHeader}>
          <FaQuoteLeft className={styles.sectionIcon} />
          <h4>Cover Letter</h4>
        </div>
        <div className={styles.coverLetterCard}>
          {selectedApplicant.coverLetter ? (
            <p className={styles.coverLetterText}>{selectedApplicant.coverLetter}</p>
          ) : (
            <p className={styles.noCoverLetter}>No cover letter provided</p>
          )}
        </div>
      </div>

      {/* Application Details */}
      <div className={styles.infoSection}>
        <div className={styles.sectionHeader}>
          <FaUser className={styles.sectionIcon} />
          <h4>Application Details</h4>
        </div>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Applicant Name</span>
            <span className={styles.detailValue}>{selectedApplicant.applicantName}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Application TIME</span>
            <span className={styles.detailValue}>{getTimeSincePosted({ createdAt: selectedApplicant.appliedAt })}</span>
          </div>
          {userData?.userId && userData.userId === job.hirerId && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Current Status</span>
              <span className={`${styles.detailValue} ${styles.statusText}`}>{selectedApplicant.status}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {userData?.userId && userData.userId === job.hirerId && selectedApplicant.status === "WAITING" && (
        <div className={styles.actionSection}>
          <Button className={styles.acceptButton} onClick={() => onAcceptApplicant(selectedApplicant)}>
            <FaCheck className="me-2" />
            Accept Applicant
          </Button>
        </div>
      )}
    </div>
  )

  const renderRatingsTab = () => (
    <div className={styles.modalTabContent}>
      {ratingLoading ? (
        <div className={styles.loadingSection}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading ratings...</p>
        </div>
      ) : ratingError ? (
        <div className={styles.errorSection}>
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {ratingError}
          </div>
        </div>
      ) : (
        <div>
          {/* Ratings Overview */}
          <div className={styles.ratingsOverview}>
            <div className={styles.ratingsSummary}>
              <div className={styles.averageRating}>
                <span className={styles.ratingNumber}>{calculateAverageRating()}</span>
                <div className={styles.ratingStars}>{renderStars(Number.parseFloat(calculateAverageRating()))}</div>
                <span className={styles.ratingCount}>
                  {ratings.length} review{ratings.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className={styles.ratingStats}>
                <FaTrophy className={styles.trophyIcon} />
                <span>Professional Rating</span>
              </div>
            </div>
          </div>

          {/* Ratings List */}
          {ratings.length === 0 ? (
            <div className={styles.noRatingsSection}>
              <FaStar className={styles.noRatingsIcon} />
              <h5>No ratings yet</h5>
              <p>This freelancer hasn't received any ratings yet.</p>
            </div>
          ) : (
            <div className={styles.ratingsList}>
              {ratings.map((rating) => (
                <div key={rating.id} className={styles.ratingCard}>
                  <div className={styles.ratingCardHeader}>
                    <div className={styles.ratingJobInfo}>
                      <h5 className={styles.ratingJobTitle}>{rating.jobTitle}</h5>
                      <span className={styles.ratingJobId}>Job #{rating.jobId}</span>
                    </div>
                    <div className={styles.ratingStarsSection}>{renderStars(rating.stars)}</div>
                  </div>

                  {rating.comment && (
                    <div className={styles.ratingComment}>
                      <FaQuoteLeft className={styles.quoteIcon} />
                      <p>{rating.comment}</p>
                    </div>
                  )}

                  <div className={styles.ratingFooter}>
                    <div className={styles.ratingClient}>
                      <FaUser className={styles.clientIcon} />
                      <span>Rated by {rating.hirerName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderProfileTab = () => (
    <div className={styles.modalTabContent}>
      {profileLoading ? (
        <div className={styles.loadingSection}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading profile...</p>
        </div>
      ) : profileError ? (
        <div className={styles.errorSection}>
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {profileError}
          </div>
        </div>
      ) : applicantProfile ? (
        <div className={styles.profileContent}>
          <ReadOnlySummarySection summary={applicantProfile.bio || ""} />
          <ReadOnlySkillsSection
            mainSkills={applicantProfile.skills
              .filter((skill) => skill.skillType === "MAIN")
              .map((skill) => skill.skillName)}
            otherSkills={applicantProfile.skills
              .filter((skill) => skill.skillType === "ADDITIONAL")
              .map((skill) => skill.skillName)}
          />
          <ReadOnlyExperienceSection
            workExperiences={applicantProfile.experiences.map((exp) => ({
              id: exp.expId,
              position: exp.jobPosition,
              company: exp.companyName,
              startDate: Array.isArray(exp.startDate) ? formatDateArray(exp.startDate) : exp.startDate,
              endDate: exp.currentlyWork
                ? "Now"
                : Array.isArray(exp.endDate)
                  ? formatDateArray(exp.endDate)
                  : exp.endDate,
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
              endDate: edu.currentlyStudy
                ? "Now"
                : Array.isArray(edu.endDate)
                  ? formatDateArray(edu.endDate)
                  : edu.endDate,
              description: edu.description,
            }))}
          />
          <ReadOnlyCertificateSection
            certificates={applicantProfile.certificates.map((cert) => ({
              id: cert.certificateId,
              name: cert.certificateName,
              issueDate: Array.isArray(cert.certificateDate)
                ? formatDateArray(cert.certificateDate)
                : cert.certificateDate,
              score: cert.achievement,
              description: cert.certificateDescription,
            }))}
          />
        </div>
      ) : (
        <div className={styles.noDataSection}>
          <h5>No profile data available</h5>
        </div>
      )}
    </div>
  )

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className={styles.enhancedApplicantModal}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <FaUser className="me-2" />
          Applicant Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {/* Enhanced Tab Navigation */}
        <div className={styles.modalTabsContainer}>
          <button
            className={`${styles.modalTab} ${activeTab === "information" ? styles.activeModalTab : ""}`}
            onClick={() => setActiveTab("information")}
          >
            <FaUser className={styles.tabIcon} />
            Information
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === "ratings" ? styles.activeModalTab : ""}`}
            onClick={() => setActiveTab("ratings")}
          >
            <FaStar className={styles.tabIcon} />
            Ratings
          </button>
          <button
            className={`${styles.modalTab} ${activeTab === "profile" ? styles.activeModalTab : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaBriefcase className={styles.tabIcon} />
            Profile
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.modalTabsContent}>
          {activeTab === "information" && renderInformationTab()}
          {activeTab === "ratings" && renderRatingsTab()}
          {activeTab === "profile" && renderProfileTab()}
        </div>
      </Modal.Body>
    </Modal>
  )
}

const getTimeSincePosted = (job) => {
  if (!job?.createdAt) return "recently"

  let postedDate
  if (Array.isArray(job.createdAt) && job.createdAt.length === 7) {
    const [year, month, day, hours, minutes, seconds, nanoseconds] = job.createdAt
    postedDate = new Date(year, month - 1, day, hours, minutes, seconds, nanoseconds / 1_000_000)
  } else if (typeof job.createdAt === "string" && job.createdAt.includes(",")) {
    const [year, month, day, hours, minutes, seconds, nanoseconds] = job.createdAt.split(",").map(Number)
    postedDate = new Date(year, month - 1, day, hours, minutes, seconds, nanoseconds / 1_000_000)
  } else {
    postedDate = new Date(job.createdAt)
  }

  if (isNaN(postedDate)) return "Invalid date"

  const now = new Date()
  const diffInMs = now - postedDate
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
  if (diffInDays === 1) return "1 day ago"
  return `${diffInDays} days ago`
}

const formatSalary = (job) => {
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  if (!job.minBudget && !job.maxBudget) return "Salary not specified"
  if (!job.minBudget) {
    const maxBudget = Number.parseFloat(job.maxBudget)
    return isNaN(maxBudget) ? "Salary not specified" : formatter.format(maxBudget)
  }
  if (!job.maxBudget) {
    const minBudget = Number.parseFloat(job.minBudget)
    return isNaN(minBudget) ? "Salary not specified" : formatter.format(minBudget)
  }

  const minBudget = Number.parseFloat(job.minBudget)
  const maxBudget = Number.parseFloat(job.maxBudget)
  if (isNaN(minBudget) || isNaN(maxBudget)) return "Salary not specified"

  return `${formatter.format(minBudget)} - ${formatter.format(maxBudget)}`
}

const formatCurrency = (amount) => {
  const parsed = Number(amount); // handles numbers and numeric strings more reliably
  if (typeof parsed !== "number" || isNaN(parsed)) return "Invalid amount";

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(parsed);
};


export default function JobDetail() {
  const { userData, getUserById } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [showShareModal, setShowShareModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [showApplicantModal, setShowApplicantModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [pendingApplicant, setPendingApplicant] = useState(null)
  const [isApplied, setIsApplied] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [activeApplicantTab, setActiveApplicantTab] = useState("information")
  const [viewMode, setViewMode] = useState("tabs")
  const [copySuccess, setCopySuccess] = useState(false)
  const [formData, setFormData] = useState({ coverLetter: "" })
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ratings, setRatings] = useState([])
  const [ratingLoading, setRatingLoading] = useState(false)
  const [ratingError, setRatingError] = useState(null)
  const [api, contextHolder] = notification.useNotification()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [applicantProfile, setApplicantProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState(null)

  useEffect(() => {
    let isMounted = true
      ; (async function fetchJob() {
        try {
          const response = await fetchJobById(id, userData?.userId)
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
            applicant:
              response.applicant?.map((app) => ({
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
          }

          if (isMounted) {
            setJob(transformedJob)
            setIsApplied(
              response.applicant?.some((app) => app.applicantId === userData?.userId && !app.bookmarked) ?? false,
            )
            setIsSaved(transformedJob.bookmarked || false)
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message || "Failed to load job details")
            console.error("Error fetching job:", err)
          }
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      })()

    return () => {
      isMounted = false
    }
  }, [id, userData?.userId])

  useEffect(() => {
    if (showApplicantModal && activeApplicantTab === "ratings" && selectedApplicant?.applicantId) {
      const fetchRatings = async () => {
        setRatingLoading(true)
        setRatingError(null)
        try {
          const ratingsData = await getAllRatingsByFreelancer(selectedApplicant.applicantId)
          setRatings(ratingsData)
        } catch (err) {
          setRatingError(err.message || "Failed to fetch ratings")
          console.error("Failed to fetch ratings:", err)
        } finally {
          setRatingLoading(false)
        }
      }
      fetchRatings()
    }
  }, [showApplicantModal, activeApplicantTab, selectedApplicant?.applicantId])

  useEffect(() => {
    if (showApplicantModal && activeApplicantTab === "profile" && selectedApplicant?.applicantId) {
      const fetchApplicantProfile = async () => {
        setProfileLoading(true)
        setProfileError(null)
        try {
          const response = await apis.get(`/users/${selectedApplicant.applicantId}`)
          setApplicantProfile(response.data)
        } catch (err) {
          setProfileError(err.message || "Failed to fetch applicant profile")
          console.error("Failed to fetch applicant profile:", err)
        } finally {
          setProfileLoading(false)
        }
      }
      fetchApplicantProfile()
    }
  }, [showApplicantModal, activeApplicantTab, selectedApplicant?.applicantId])

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
      showProgress: true,
      pauseOnHover: true,
    })
  }

  const renderStars = (stars) => {
    const fullStars = Math.floor(stars)
    const emptyStars = 5 - fullStars

    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className={styles.starFilled} />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar key={`empty-${index}`} className={styles.starEmpty} />
        ))}
      </div>
    )
  }

  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0
    const total = ratings.reduce((sum, rating) => sum + rating.stars, 0)
    return (total / ratings.length).toFixed(1)
  }

  const formatDateArray = (dateArray) => {
    if (!dateArray || !Array.isArray(dateArray)) return "N/A"
    const [year, month, day] = dateArray
    const formattedMonth = String(month).padStart(2, "0")
    const formattedDay = String(day).padStart(2, "0")
    return `${year}-${formattedMonth}-${formattedDay}`
  }

  const hasCustomLogo = job?.companyLogoPath && job.companyLogoPath !== "/asset/images/default-company-logo.png"
  const getAvatarLetter = () => (job.companyName ? job.companyName.charAt(0).toUpperCase() : "C")

  const hasCustomApplicantAvatar = (applicant) => applicant?.avatar && applicant.avatar !== "/placeholder.svg"
  const getApplicantAvatarLetter = (applicant) =>
    applicant?.applicantName ? applicant.applicantName.charAt(0).toUpperCase() : "A"

  const handleApplyClick = () => {
    if (!userData?.userId) {
      openNotification("error", "Login Required", "Please log in to apply for this job")
      return
    }
    setShowApplyModal(true)
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    if (!userData?.userId) {
      openNotification("error", "Login Required", "Please log in to apply for this job")
      return
    }
    try {
      const updatedJob = await applyToJob(id, userData.userId, formData.coverLetter)
      setShowApplyModal(false)
      setFormData({ coverLetter: "" })
      setIsApplied(true)
      setIsSaved(updatedJob.bookmarked || false)

      const transformedJob = {
        ...job,
        applicant:
          updatedJob.applicant?.map((app) => ({
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
      }

      setJob(transformedJob)
      setCurrentPage(1)

      openNotification(
        "success",
        "Application Submitted!",
        "Your application has been successfully submitted. Good luck!",
      )
    } catch (error) {
      openNotification("error", "Application Failed", error.message || "Failed to submit application")
    }
  }

  const handleSaveJob = async () => {
    if (!userData?.userId) {
      openNotification("error", "Login Required", "Please log in to bookmark this job")
      return
    }
    try {
      const updatedJob = await toggleBookmark(id, userData.userId)
      setIsSaved(updatedJob.bookmarked)
      openNotification(
        "success",
        isSaved ? "Bookmark Removed" : "Bookmark Added",
        isSaved ? "Job removed from bookmarks" : "Job added to bookmarks",
      )
    } catch (error) {
      openNotification("error", "Bookmark Failed", error.message || "Failed to toggle bookmark")
    }
  }

  const handleShareClick = () => {
    setShowShareModal(true)
  }

  const handleCopyLink = () => {
    const jobLink = window.location.href
    navigator.clipboard
      .writeText(jobLink)
      .then(() => {
        setCopySuccess(true)
        openNotification("success", "Link Copied!", "Job link has been copied to clipboard")
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
        openNotification("error", "Copy Failed", "Failed to copy link to clipboard")
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value.slice(0, 500),
    })
  }

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant)
    setShowApplicantModal(true)
    setActiveApplicantTab("information")
  }

  const calculateRequiredBalance = () => {
    const budget = job.maxBudget || job.minBudget || 0
    return budget * 1.07 // Add 7% fee
  }

  // New handler for accept applicant button click
  const handleAcceptApplicantClick = (applicant) => {
    setPendingApplicant(applicant)
    setShowAcceptModal(true)
  }

  // New handler for accept confirmation
  const handleAcceptConfirm = async (hasEnoughBalance) => {
    if (!hasEnoughBalance) {
      setShowAcceptModal(false)
      navigate("/payment");
      return
    }

    // Proceed with acceptance
    await handleAcceptApplicant(pendingApplicant)
    setShowAcceptModal(false)
    setPendingApplicant(null)
  }

  const handleAcceptApplicant = async (applicant) => {
    if (!userData?.userId || userData.userId !== job.hirerId) {
      openNotification("error", "Unauthorized", "Only the hirer can accept applicants")
      return
    }

    const requiredBalance = calculateRequiredBalance()

    try {
      const updatedapplicant = job.applicant.map((app) => ({
        ...app,
        status: app.applicantId === applicant.applicantId ? "IN_PROGRESS" : "REJECTED",
      }))

      const updatedJobData = {
        ...job,
        status: "PENDING",
        maxBudget: requiredBalance.toString(),
        applicant: updatedapplicant,
      }

      const updatedJob = await updateJob(job.id, updatedJobData)
      setJob({
        ...job,
        applicant:
          updatedJob.applicant?.map((app) => ({
            ...app,
            applicantName: app.applicantName || "Unknown Applicant",
            status: app.status,
            coverLetter: app.coverLetter || "",
            bookmarked: app.bookmarked ?? false,
          })) || [],
      })
      setShowApplicantModal(false)
      openNotification(
        "success",
        "Applicant Accepted",
        `${applicant.applicantName}'s application has been accepted, others have been rejected.`,
      )

      await getUserById(userData.userId) // Refresh user data to update balance
    } catch (error) {
      openNotification("error", "Accept Failed", error.message || "Failed to accept applicant")
    }
  }

  const totalPages = Math.ceil(job?.applicant.filter((app) => !app.bookmarked).length / itemsPerPage)
  const paginatedApplicants = job?.applicant
    .filter((app) => !app.bookmarked)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
        )
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
        )
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
        )
      case "applicants":
        return (
          <div>
            <h2>Job Applicants ({job.applicant.filter((app) => !app.bookmarked).length})</h2>
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
                        <AvatarWithFallback
                          src={getImageUrl(applicant.avatar)}
                          alt={applicant.applicantName}
                          name={applicant.applicantName}
                          size={36}
                          className={styles.applicantAvatar}
                        />
                      ) : (
                        <AvatarWithFallback
                          src={null}
                          alt={applicant.applicantName}
                          name={applicant.applicantName}
                          size={36}
                          className={styles.defaultAvatarApplicant}
                        />
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
                        bg={
                          applicant.status === "WAITING"
                            ? "warning"
                            : applicant.status === "IN_PROGRESS"
                              ? "info"
                              : applicant.status === "COMPLETED"
                                ? "success"
                                : "danger"
                        }
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
        )
      default:
        return null
    }
  }

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
            <h2>Job Applicants ({job.applicant.filter((app) => !app.bookmarked).length})</h2>
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
                      <AvatarWithFallback
                        src={getImageUrl(applicant.avatar)}
                        alt={applicant.applicantName}
                        name={applicant.applicantName}
                        size={36}
                        className={styles.applicantAvatar}
                      />
                    ) : (
                      <AvatarWithFallback
                        src={null}
                        alt={applicant.applicantName}
                        name={applicant.applicantName}
                        size={36}
                        className={styles.defaultAvatarApplicant}
                      />
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
                      bg={
                        applicant.status === "WAITING"
                          ? "warning"
                          : applicant.status === "IN_PROGRESS"
                            ? "success"
                            : "danger"
                      }
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
    )
  }

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
  )

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    )
  }
  if (error) return <div>Error: {error}</div>
  if (!job) return <div>Job not found</div>

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
                    <AvatarWithFallback
                      src={hasCustomLogo ? getImageUrl(job.companyLogoPath) : null}
                      alt={job.companyName}
                      name={job.companyName}
                      size={48}
                      className={styles.logo}
                    />
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
                      <Button variant="outline-secondary" className={styles.saveButton} onClick={handleSaveJob}>
                        {isSaved ? <FaBookmark /> : <FaRegBookmark />} {isSaved ? "Saved" : "Save"}
                      </Button>
                    )}
                    <Button variant="outline-secondary" className={styles.shareButton} onClick={handleShareClick}>
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
                    Applicants ({job.applicant?.filter((app) => !app.bookmarked).length || 0})
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

      {/* Share Modal */}
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

      {/* Apply Modal */}
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered size="lg">
        <Modal.Header closeButton className={styles.applyModalHeader}>
          <Modal.Title className="text-black font-weight-bold">
            Please tell us why you're a good fit for this project
          </Modal.Title>
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
                <Form.Text className="text-muted">{500 - formData.coverLetter.length} characters remaining</Form.Text>
              </Form.Group>
            </div>

            <div className={styles.formActions}>
              <Button variant="outline-secondary" onClick={() => setShowApplyModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className={styles.submitButton} disabled={!formData.coverLetter.trim()}>
                <FaCheck className="me-1" /> Submit Application
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Enhanced Applicant Modal */}
      <ApplicantDetailModal
        show={showApplicantModal}
        onHide={() => setShowApplicantModal(false)}
        selectedApplicant={selectedApplicant}
        activeTab={activeApplicantTab}
        setActiveTab={setActiveApplicantTab}
        userData={userData}
        job={job}
        ratings={ratings}
        ratingLoading={ratingLoading}
        ratingError={ratingError}
        applicantProfile={applicantProfile}
        profileLoading={profileLoading}
        profileError={profileError}
        onAcceptApplicant={handleAcceptApplicantClick}
        getTimeSincePosted={getTimeSincePosted}
        calculateAverageRating={calculateAverageRating}
        renderStars={renderStars}
        formatDateArray={formatDateArray}
      />

      {/* Accept Applicant Confirmation Modal */}
      <AcceptApplicantModal
        show={showAcceptModal}
        onHide={() => {
          setShowAcceptModal(false)
          setPendingApplicant(null)
        }}
        applicant={pendingApplicant}
        originalAmount={job?.maxBudget || job?.minBudget || 0}
        feePercentage={7}
        onConfirm={handleAcceptConfirm}
        formatSalary={formatCurrency}
        userData={userData}
      />
    </div>
  )
}
