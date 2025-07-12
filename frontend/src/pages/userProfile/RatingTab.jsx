import React, { useState, useEffect } from "react";
import { getAllRatingsByFreelancer } from "../../services/jobService";

const RatingTab = ({ userData, loading }) => {
    const [ratings, setRatings] = useState([]);
    const [ratingLoading, setRatingLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            if (!userData?.userId) return;

            setRatingLoading(true);
            setError(null);

            try {
                const ratingsData = await getAllRatingsByFreelancer(userData.userId);
                setRatings(ratingsData);
            } catch (err) {
                setError(err.message);
                console.error("Failed to fetch ratings:", err);
            } finally {
                setRatingLoading(false);
            }
        };

        fetchRatings();
    }, [userData?.userId]);

    const renderStars = (stars) => {
        const fullStars = Math.floor(stars);
        const emptyStars = 5 - fullStars;

        return (
            <div className="d-flex align-items-center">
                {[...Array(fullStars)].map((_, index) => (
                    <i key={`full-${index}`} className="fas fa-star text-warning me-1"></i>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <i key={`empty-${index}`} className="far fa-star text-muted me-1"></i>
                ))}
                <span className="ms-2 text-muted">({stars}/5)</span>
            </div>
        );
    };

    const calculateAverageRating = () => {
        if (ratings.length === 0) return 0;
        const total = ratings.reduce((sum, rating) => sum + rating.stars, 0);
        return (total / ratings.length).toFixed(1);
    };

    if (loading || ratingLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">My Ratings</h4>
                {ratings.length > 0 && (
                    <div className="text-end">
                        <div className="fw-bold">Average Rating: {calculateAverageRating()}</div>
                        <div className="text-muted">Based on {ratings.length} review{ratings.length !== 1 ? 's' : ''}</div>
                    </div>
                )}
            </div>

            {ratings.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fas fa-star fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No ratings yet</h5>
                    <p className="text-muted">Complete some jobs to start receiving ratings from clients.</p>
                </div>
            ) : (
                <div className="row">
                    {ratings.map((rating) => (
                        <div key={rating.id} className="col-12 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5 className="card-title text-primary mb-2">
                                                {rating.jobTitle}
                                            </h5>
                                            <div className="mb-3">
                                                {renderStars(rating.stars)}
                                            </div>
                                            {rating.comment && (
                                                <div className="mb-3">
                                                    <h6 className="text-muted mb-2">Client Feedback:</h6>
                                                    <p className="card-text">{rating.comment}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4 text-md-end">
                                            <div className="mb-2">
                                                <small className="text-muted">Rated by:</small>
                                                <div className="fw-bold">{rating.hirerName}</div>
                                            </div>
                                            <div>
                                                <small className="text-muted">Job ID: #{rating.jobId}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingTab;