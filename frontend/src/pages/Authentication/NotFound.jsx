"use client"

import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Search, Home, ArrowLeft, MapPin, AlertTriangle } from "lucide-react"
import styles from "./styles/NotFound.module.css"

const NotFound = () => {
    return (
        <div className={styles.unauthorizedPage}>
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={8} md={10} className="text-center">
                        <div className={styles.errorContainer}>
                            {/* Animated Icon */}
                            <div className={styles.iconContainer}>
                                <div className={styles.shieldIcon}>
                                    <Search size={80} />
                                </div>
                                <div className={styles.lockIcon}>
                                    <MapPin size={40} />
                                </div>
                            </div>

                            {/* Error Code */}
                            <div className={styles.errorCode}>404</div>

                            {/* Main Message */}
                            <h1 className={styles.errorTitle}>Page Not Found</h1>
                            <p className={styles.errorDescription}>
                                Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the
                                wrong URL.
                            </p>

                            {/* Additional Info */}
                            <div className={styles.infoBox}>
                                <AlertTriangle size={20} className={styles.warningIcon} />
                                <span>
                  Don't worry! You can navigate back to our homepage or use the search feature to find what you're
                  looking for.
                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className={styles.actionButtons}>
                                <Button as={Link} to="/" className={`${styles.primaryButton} me-3`} size="lg">
                                    <Home size={20} className="me-2" />
                                    Go Home
                                </Button>
                                <Button
                                    onClick={() => window.history.back()}
                                    variant="outline-secondary"
                                    className={styles.secondaryButton}
                                    size="lg"
                                >
                                    <ArrowLeft size={20} className="me-2" />
                                    Go Back
                                </Button>
                            </div>

                            {/* Help Links */}
                            <div className={styles.helpLinks}>
                                <p className={styles.helpText}>Need help?</p>
                                <div className={styles.linkGroup}>
                                    <Link to="/jobs" className={styles.helpLink}>
                                        Browse Jobs
                                    </Link>
                                    <span className={styles.linkSeparator}>•</span>
                                    <Link to="/contact" className={styles.helpLink}>
                                        Contact Support
                                    </Link>
                                    <span className={styles.linkSeparator}>•</span>
                                    <Link to="/help" className={styles.helpLink}>
                                        Help Center
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Background Animation */}
            <div className={styles.backgroundAnimation}>
                <div className={styles.floatingShape}></div>
                <div className={styles.floatingShape}></div>
                <div className={styles.floatingShape}></div>
            </div>
        </div>
    )
}

export default NotFound
