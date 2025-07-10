import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Shield, Home, ArrowLeft, Lock, AlertTriangle } from "lucide-react"
import styles from "./styles/Unauthorized.module.css"

const Unauthorized = () => {
    return (
        <div className={styles.unauthorizedPage}>
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={8} md={10} className="text-center">
                        <div className={styles.errorContainer}>
                            {/* Animated Icon */}
                            <div className={styles.iconContainer}>
                                <div className={styles.shieldIcon}>
                                    <Shield size={80} />
                                </div>
                                <div className={styles.lockIcon}>
                                    <Lock size={40} />
                                </div>
                            </div>

                            {/* Error Code */}
                            <div className={styles.errorCode}>403</div>

                            {/* Main Message */}
                            <h1 className={styles.errorTitle}>Access Denied</h1>
                            <p className={styles.errorDescription}>
                                Oops! You don't have permission to access this page. This area is restricted and requires proper
                                authorization.
                            </p>

                            {/* Additional Info */}
                            <div className={styles.infoBox}>
                                <AlertTriangle size={20} className={styles.warningIcon} />
                                <span>
                  If you believe this is an error, please contact our support team or check your account permissions.
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
                                    <Link to="/login" className={styles.helpLink}>
                                        Login
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

export default Unauthorized