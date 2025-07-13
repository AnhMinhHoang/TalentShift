import { useState } from "react"
import { FaStar, FaTimes } from "react-icons/fa"
import styles from "./RatingModal.module.css"

const RatingModal = ({ visible, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating === 0 || comment.trim() === "") return

        setIsSubmitting(true)
        try {
            await onSubmit({ stars: rating, comment: comment.trim() })
            // Reset form
            setRating(0)
            setHoveredRating(0)
            setComment("")
        } catch (error) {
            console.error("Error submitting rating:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setRating(0)
        setHoveredRating(0)
        setComment("")
        onClose()
    }

    if (!visible) return null

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Rate Freelancer</h3>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    <div className={styles.ratingSection}>
                        <label className={styles.label}>How was your experience?</label>
                        <div className={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`${styles.starBtn} ${star <= (hoveredRating || rating) ? styles.starActive : ""}`}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <FaStar />
                                </button>
                            ))}
                        </div>
                        <div className={styles.ratingText}>
                            {rating > 0 && (
                                <span>
                  {rating === 1 && "Poor"}
                                    {rating === 2 && "Fair"}
                                    {rating === 3 && "Good"}
                                    {rating === 4 && "Very Good"}
                                    {rating === 5 && "Excellent"}
                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.commentSection}>
                        <label className={styles.label} htmlFor="comment">
                            Share your feedback
                        </label>
                        <textarea
                            id="comment"
                            className={styles.commentInput}
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us about your experience working with this freelancer..."
                            required
                        />
                        <div className={styles.charCount}>{comment.length}/500</div>
                    </div>

                    <div className={styles.modalFooter}>
                        <button type="button" className={styles.cancelBtn} onClick={handleClose} disabled={isSubmitting}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={rating === 0 || comment.trim() === "" || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Submitting...
                                </>
                            ) : (
                                "Submit Rating"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RatingModal