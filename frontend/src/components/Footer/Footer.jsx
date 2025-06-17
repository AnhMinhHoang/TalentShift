import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import from react-router-dom
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer({ pageIcon }) {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              {pageIcon && (
                <div className={styles.iconContainer}>{pageIcon}</div>
              )}
              <h5 className="mb-0 ms-2 text-white">Company Name</h5>
            </div>
            <p className="text-white-50">
              We provide high-quality services and solutions for your business
              needs. Our team of experts is ready to help you achieve your
              goals.
            </p>
            <div className={styles.socialIcons}>
              <Link to="#" className={styles.socialIcon}>
                <Facebook size={18} />
              </Link>
              <Link to="#" className={styles.socialIcon}>
                <Twitter size={18} />
              </Link>
              <Link to="#" className={styles.socialIcon}>
                <Instagram size={18} />
              </Link>
            </div>
          </Col>

          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Col>

          <Col md={2} sm={6} className="mb-4 mb-md-0">
            <h6 className="text-white mb-3">Resources</h6>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="text-white mb-3">Contact Us</h6>
            <ul className={styles.contactInfo}>
              <li>
                <Mail size={16} className="me-2" />
                <span>info@companyname.com</span>
              </li>
              <li>
                <Phone size={16} className="me-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <MapPin size={16} className="me-2" />
                <span>123 Business Street, Suite 100, City, Country</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className={styles.divider} />

        <Row className="py-3">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-white-50">
              &copy; {new Date().getFullYear()} Company Name. All rights
              reserved.
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
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
