import React from "react";
import { useNavigate } from "react-router-dom"
import PricingCard from "../../components/PaymentComponents/PricingCard"
import styles from "./style/Plan.module.css"
import { BriefcaseFill, Building, BuildingFill } from "react-bootstrap-icons"

const Plan = () => {
    const navigate = useNavigate()

    const handleSubscribe = (plan) => {
        // Simulate payment processing
        console.log(`Processing payment for ${plan.name} plan`)

        // Store selected plan in sessionStorage for the success page
        sessionStorage.setItem("selectedPlan", JSON.stringify(plan))

        // Redirect to success page after "payment"
        setTimeout(() => {
            navigate("/payment/success")
        }, 1000)
    }

    const pricingPlans = [
        {
            id: 1,
            name: "Freemium",
            price: "$0",
            period: "per month",
            icon: <BriefcaseFill size={40} className={styles.planIcon} />,
            features: [
                "Post up to 10 jobs",
                "Basic candidate filtering",
                "Email support",
                "30-day job listings",
                "Basic analytics",
            ],
            popular: false,
            color: "#428A9B",
        },
        {
            id: 2,
            name: "Plus",
            price: "$499",
            originalPrice: "$699",
            discount: "30%",
            period: "per month",
            icon: <Building size={40} className={styles.planIcon} />,
            features: [
                "Post up to 50 jobs",
                "Advanced candidate filtering",
                "Priority email & phone support",
                "60-day job listings",
                "Detailed analytics dashboard",
                "Featured company profile",
                "Applicant tracking system",
            ],
            popular: true,
            color: "#266987",
        },
        {
            id: 3,
            name: "Premium",
            price: "$999",
            originalPrice: "$1299",
            discount: "30%",

            period: "per month",
            icon: <BuildingFill size={40} className={styles.planIcon} />,
            features: [
                "Unlimited job postings",
                "AI-powered candidate matching",
                "Dedicated account manager",
                "90-day job listings",
                "Advanced analytics & reporting",
                "Premium company profile",
                "Custom branding options",
                "API access",
                "Bulk posting tools",
            ],
            popular: false,
            color: "#428A9B",
        },
    ]

    return (
        <div className={styles.planContainer}>
            {/* Hero Section */}
            <div className={`${styles.heroSection} text-center`}>
                <div className="container py-5">
                    <h1 className={styles.heroTitle}>Enterprise Job Posting Solutions</h1>
                    <p className={styles.heroSubtitle}>
                        Connect with top talent and scale your team with our powerful recruiting platform
                    </p>
                    <div className={styles.heroStats}>
                        <div className="row justify-content-center mt-4">
                            <div className="col-md-3 mb-4 mb-md-0">
                                <div className={styles.statBox}>
                                    <h3>10,000+</h3>
                                    <p>Active Candidates</p>
                                </div>
                            </div>
                            <div className="col-md-3 mb-4 mb-md-0">
                                <div className={styles.statBox}>
                                    <h3>94%</h3>
                                    <p>Hiring Success Rate</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className={styles.statBox}>
                                    <h3>500+</h3>
                                    <p>Enterprise Clients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="container py-5">
                <h2 className={`text-center mb-5 ${styles.sectionTitle}`}>Choose Your Plan</h2>
                <div className="row justify-content-center">
                    {pricingPlans.map((plan) => (
                        <div key={plan.id} className="col-lg-4 col-md-6 mb-4">
                            <PricingCard plan={plan} onSubscribe={() => handleSubscribe(plan)} />
                        </div>
                    ))}
                </div>

            </div>


        </div>
    )
}

export default Plan
