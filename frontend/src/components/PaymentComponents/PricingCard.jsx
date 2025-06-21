import React from "react";
import { CheckCircleFill } from "react-bootstrap-icons"
import styles from "./PricingCard.module.css"

const PricingCard = ({ plan, onSubscribe }) => {
    return (
        <div
            className={`${styles.pricingCard} ${plan.popular ? styles.popularPlan : ""}`}
            style={{ "--plan-color": plan.color }}
        >
            {/* {plan.discount && <div className={styles.discountBadge}>Save {plan.discount}</div>} */}

            {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}

            <div className={styles.cardHeader}>
                {plan.icon}
                <h3 className={styles.planName}>{plan.name}</h3>
            </div>

            <div className={styles.pricingSection}>
                {plan.originalPrice && (
                    <div className={styles.originalPrice}>
                        <del>{plan.originalPrice}</del>
                    </div>
                )}
                <div className={styles.price}>
                    <span className={styles.currencySymbol}>{plan.price.charAt(0)}</span>
                    <span className={styles.priceAmount}>{plan.price.substring(1)}</span>
                </div>
                <div className={styles.pricePeriod}>{plan.period}</div>
            </div>

            <div className={styles.featuresList}>
                <ul>
                    {plan.features.map((feature, index) => (
                        <li key={index}>
                            <CheckCircleFill className={styles.checkIcon} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className={`${styles.subscribeButton} ${plan.popular ? styles.popularButton : ""}`}
                onClick={() => onSubscribe()}
            >
                Subscribe Now
            </button>

            {plan.popular ? (
                <div className={styles.guaranteeText}>30-day money-back guarantee</div>
            ) : (
                <div className={styles.cancelText}>Cancel anytime</div>
            )}
        </div>
    )
}

export default PricingCard
