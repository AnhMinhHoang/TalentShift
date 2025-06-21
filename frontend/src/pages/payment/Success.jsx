import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircleFill, ArrowLeft } from "react-bootstrap-icons"
import styles from "./style/Success.module.css"
import { notification } from "antd"

const Success = () => {
    const navigate = useNavigate()
    const [plan, setPlan] = useState(true)

    useEffect(() => {
        // Get the selected plan from sessionStorage
        const selectedPlan = sessionStorage.getItem("selectedPlan")

        if (selectedPlan) {
            setPlan(JSON.parse(selectedPlan))

            // Show success notification
            notification.success({
                message: "Payment Successful!",
                description: "Your subscription has been activated. You can now start posting jobs.",
                placement: "topRight",
                duration: 5,
            })
        } else {
            // If no plan is found, redirect to the plan selection page
            navigate("/payment-success")
        }
    }, [navigate])

    const handleReturnToDashboard = () => {
        navigate("/userProfile")
    }

    if (!plan) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.successContainer}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className={styles.successCard}>
                            <div className={styles.successHeader}>
                                <CheckCircleFill className={styles.successIcon} />
                                <h1>Payment Successful!</h1>
                                <p>Thank you for subscribing to our {plan.name} plan</p>
                            </div>

                            <div className="alert alert-success" role="alert">
                                Your account has been successfully upgraded. You can now access all the features included in your
                                subscription.
                            </div>

                            <div className={styles.planSummary}>
                                <h3>Plan Summary</h3>
                                <div className={styles.summaryDetails}>
                                    <div className="row mb-3">
                                        <div className="col-6 fw-bold">Plan:</div>
                                        <div className="col-6">{plan.name}</div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6 fw-bold">Price:</div>
                                        <div className="col-6">
                                            {plan.price} {plan.period}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6 fw-bold">Billing Cycle:</div>
                                        <div className="col-6">Monthly</div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6 fw-bold">Next Billing Date:</div>
                                        <div className="col-6">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.featuresIncluded}>
                                <h4>Features Included:</h4>
                                <ul className="list-group">
                                    {/* {plan.features.map((feature, index) => (
                                        <li key={index} className="list-group-item border-0 d-flex align-items-center">
                                            <CheckCircleFill className={styles.featureIcon} />
                                            <span>{feature}</span>
                                        </li>
                                    ))} */}
                                </ul>
                            </div>


                            <div className={styles.actionButtons}>
                                <button className={`btn ${styles.dashboardBtn}`} onClick={handleReturnToDashboard}>
                                    <ArrowLeft /> Return to Dashboard
                                </button>
                                <button className={`btn ${styles.postJobBtn}`}>Post Your First Job</button>
                            </div>

                            <div className={styles.supportInfo}>
                                <p>
                                    Need help getting started? Contact our support team at{" "}
                                    <a href="mailto:support@jobplatform.com">support@jobplatform.com</a> or call us at{" "}
                                    <a href="tel:+18005551234">1-800-555-1234</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
