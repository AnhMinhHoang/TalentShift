import { useState, useEffect } from "react"
import { getAllRatingsByFreelancer } from "../../services/jobService"
import styles from "./style/UserProfile.module.css"

const RatingTab = ({ userData, loading }) => {
    const [ratings, setRatings] = useState([])
    const [ratingLoading, setRatingLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRatings = async () => {
            if (!userData?.userId) return

            setRatingLoading(true)
            setError(null)

            try {
                const ratingsData = await getAllRatingsByFreelancer(userData.userId)
                setRatings(ratingsData)
            } catch (err) {
                setError(err.message)
                console.error("Failed to fetch ratings:", err)
            } finally {
                setRatingLoading(false)
            }
        }

        fetchRatings()
    }, [userData?.userId])

    const renderStars = (stars) => {
        const fullStars = Math.floor(stars)
        const emptyStars = 5 - fullStars

        return (
            <div className={styles.ratingStars}>
                {[...Array(fullStars)].map((_, index) => (
                    <i key={`full-${index}`} className={`fas fa-star ${styles.ratingStar}`}></i>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <i key={`empty-${index}`} className={`far fa-star ${styles.ratingStarEmpty}`}></i>
                ))}
            </div>
        )
    }

    const calculateAverageRating = () => {
        if (ratings.length === 0) return 0
        const total = ratings.reduce((sum, rating) => sum + rating.stars, 0)
        return (total / ratings.length).toFixed(1)
    }

    const getStarDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        ratings.forEach((rating) => {
            distribution[rating.stars] = (distribution[rating.stars] || 0) + 1
        })
        return distribution
    }

    const EmptyState = () => (
        <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateIcon}>
                <i className="bi bi-star"></i>
            </div>
            <h3 className={styles.emptyStateTitle}>No Ratings Yet</h3>
            <p className={styles.emptyStateDescription}>
                Complete some jobs to start receiving ratings from clients. Your ratings help build trust and showcase your
                expertise to potential employers.
            </p>
            <a href="/jobs" className={styles.emptyStateAction}>
                <i className="bi bi-briefcase"></i>
                Find Jobs
            </a>
        </div>
    )

    const LoadingState = () => (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading your ratings...</p>
        </div>
    )

    if (loading || ratingLoading) {
        return <LoadingState />
    }

    if (error) {
        return (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <div>
                    <strong>Error loading ratings:</strong> {error}
                </div>
            </div>
        )
    }

    if (ratings.length === 0) {
        return <EmptyState />
    }

    const averageRating = calculateAverageRating()
    const starDistribution = getStarDistribution()

    return (
        <div className={styles.ratingContainer}>
            {/* Rating Header with Stats */}
            <div className={styles.ratingHeader}>
                <h2 className="mb-0 text-white">My Ratings & Reviews</h2>
                <div className={styles.ratingStats}>
                    <div className={styles.ratingStat}>
                        <div className={styles.ratingStatValue}>{averageRating}</div>
                        <div className={styles.ratingStatLabel}>Average Rating</div>
                    </div>
                    <div className={styles.ratingStat}>
                        <div className={styles.ratingStatValue}>{ratings.length}</div>
                        <div className={styles.ratingStatLabel}>Total Reviews</div>
                    </div>
                    <div className={styles.ratingStat}>
                        <div className={styles.ratingStatValue}>{starDistribution[5]}</div>
                        <div className={styles.ratingStatLabel}>5-Star Reviews</div>
                    </div>
                    <div className={styles.ratingStat}>
                        <div className={styles.ratingStatValue}>{Math.round((starDistribution[5] / ratings.length) * 100)}%</div>
                        <div className={styles.ratingStatLabel}>Satisfaction Rate</div>
                    </div>
                </div>
            </div>

            {/* Rating Cards */}
            <div className="row">
                {ratings.map((rating) => (
                    <div key={rating.id} className="col-12 mb-3">
                        <div className={styles.ratingCard}>
                            <div className={styles.ratingCardHeader}>
                                <div className={styles.ratingJobInfo}>
                                    <h5 className={styles.ratingJobTitle}>{rating.jobTitle}</h5>
                                    <div className={styles.ratingClient}>
                                        <i className="bi bi-person-circle me-2"></i>
                                        Reviewed by {rating.hirerName}
                                    </div>
                                    {renderStars(rating.stars)}
                                </div>
                                <div className={styles.ratingValue}>{rating.stars}/5</div>
                            </div>

                            {rating.comment && (
                                <div className={styles.ratingComment}>
                                    <i className="bi bi-quote me-2"></i>
                                    {rating.comment}
                                </div>
                            )}

                            <div className={styles.ratingMeta}>
                                <div>
                                    <i className="bi bi-calendar3 me-1"></i>
                                    <small>Job completed</small>
                                </div>
                                <div className={styles.jobId}>Job #{rating.jobId}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingTab