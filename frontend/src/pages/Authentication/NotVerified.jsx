import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserCheck, Home, ArrowLeft, Clock, AlertTriangle } from "lucide-react"
import styles from "./styles/NotVerified.module.css"

const NotVerified = () => {
    return (
        <div className={styles.unauthorizedPage}>
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={8} md={10} className="text-center">
                        <div className={styles.errorContainer}>
                            {/* Animated Icon */}
                            <div className={styles.iconContainer}>
                                <div className={styles.shieldIcon}>
                                    <UserCheck size={80} />
                                </div>
                                <div className={styles.lockIcon}>
                                    <Clock size={40} />
                                </div>
                            </div>

                            {/* Error Code */}
                            <div className={styles.errorCode}>⏳</div>

                            {/* Main Message */}
                            <h1 className={styles.errorTitle}>Account Not Verified</h1>
                            <p className={styles.errorDescription}>
                                Your account is currently pending verification by our admin team. Please wait while we review your
                                account details and approve your access.
                            </p>

                            {/* Additional Info */}
                            <div className={styles.infoBox}>
                                <AlertTriangle size={20} className={styles.warningIcon} />
                                <span>
                  Verification typically takes 24-48 hours to complete. If you have any questions, please contact our support team.
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
                                    <Link to="/help" className={styles.helpLink}>
                                        Help Center
                                    </Link>
                                    <span className={styles.linkSeparator}>•</span>
                                    <Link to="/contact" className={styles.helpLink}>
                                        Contact Support
                                    </Link>
                                    <span className={styles.linkSeparator}>•</span>
                                    <Link to="/profile" className={styles.helpLink}>
                                        View Profile
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

export default NotVerified