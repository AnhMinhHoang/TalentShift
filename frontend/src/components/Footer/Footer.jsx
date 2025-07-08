import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Users, Briefcase, Shield } from "lucide-react"
import styles from "./Footer.module.css"

export default function Footer({ pageIcon }) {
  return (
      <footer className={styles.footer}>
        <Container>
          <Row className="py-5">
            <Col md={4} className="mb-4 mb-md-0">
              <div className="d-flex align-items-center mb-3">
                <div className={styles.logoContainer}>
                  <img src="/asset/images/icons/favicon-32x32.png" alt="TalentShift" className={styles.logo} />
                </div>
                <h5 className={`mb-0 ms-2 ${styles.brandName}`}>TalentShift</h5>
              </div>
              <p className={styles.description}>
                The premier platform connecting talented freelancers with amazing opportunities. Whether you're hiring or
                looking for work, we've got you covered.
              </p>
              <div className={styles.socialIcons}>
                <Link to="#" className={styles.socialIcon}>
                  <Facebook size={18} />
                </Link>
                <Link to="#" className={styles.socialIcon}>
                  <Twitter size={18} />
                </Link>
                <Link to="#" className={styles.socialIcon}>
                  <Linkedin size={18} />
                </Link>
                <Link to="#" className={styles.socialIcon}>
                  <Instagram size={18} />
                </Link>
              </div>
            </Col>

            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <div className="d-flex align-items-center mb-3">
                <Users size={16} className={`me-2 ${styles.sectionIcon}`} />
                <h6 className={styles.sectionTitle}>For Freelancers</h6>
              </div>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/find-jobs">Find Jobs</Link>
                </li>
                <li>
                  <Link to="/freelancer-signup">Join as Freelancer</Link>
                </li>
                <li>
                  <Link to="/build-profile">Build Profile</Link>
                </li>
                <li>
                  <Link to="/freelancer-resources">Resources</Link>
                </li>
                <li>
                  <Link to="/success-stories">Success Stories</Link>
                </li>
              </ul>
            </Col>

            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <div className="d-flex align-items-center mb-3">
                <Briefcase size={16} className={`me-2 ${styles.sectionIcon}`} />
                <h6 className={styles.sectionTitle}>For Hirers</h6>
              </div>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/post-job">Post a Job</Link>
                </li>
                <li>
                  <Link to="/hire-freelancers">Find Talent</Link>
                </li>
                <li>
                  <Link to="/enterprise">Enterprise</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/hiring-guide">Hiring Guide</Link>
                </li>
              </ul>
            </Col>

            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <Shield size={16} className={`me-2 ${styles.sectionIcon}`} />
                <h6 className={styles.sectionTitle}>Get in Touch</h6>
              </div>
              <ul className={styles.contactInfo}>
                <li>
                  <Mail size={16} className="me-2" />
                  <span>hello@talentshift.com</span>
                </li>
                <li>
                  <Phone size={16} className="me-2" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li>
                  <MapPin size={16} className="me-2" />
                  <span>San Francisco, CA 94102</span>
                </li>
              </ul>

              <div className="mt-4">
                <h6 className={styles.sectionTitle}>Company</h6>
                <ul className={styles.footerLinks}>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/help">Help Center</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <hr className={styles.divider} />

          <Row className="py-3">
            <Col md={6} className="text-center text-md-start">
              <p className={`mb-0 ${styles.copyright}`}>
                &copy; {new Date().getFullYear()} TalentShift. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <ul className={styles.legalLinks}>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Policy</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
  )
}
