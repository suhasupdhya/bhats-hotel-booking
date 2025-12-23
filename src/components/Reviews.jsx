import React, { useState, useEffect } from 'react';
import { API_URL } from '../utils/api';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
    const [showReviews, setShowReviews] = useState(false);

    useEffect(() => {
        // Only fetch if showing? Or fetch always? Fetching always for now so count is ready if needed, 
        // but user asked for "dropdown called see reviews which after clicked all the reviews will become visible"
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${API_URL}/reviews`);
            const data = await res.json();
            setReviews(data);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });
            if (res.ok) {
                alert('Review Submitted!');
                setNewReview({ name: '', rating: 5, comment: '' });
                fetchReviews();
            } else {
                alert('Failed to submit review');
            }
        } catch (err) {
            alert('Error submitting review');
        }
    };

    return (
        <section id="reviews" className="reviews-section section-padding">
            <div className="container">
                <div className="section-title">
                    <h2>Customer Reviews</h2>
                </div>

                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowReviews(!showReviews)}
                    >
                        {showReviews ? 'Hide Reviews' : 'See Reviews'}
                    </button>
                </div>

                {showReviews && (
                    <div className="reviews-grid" style={{ marginBottom: '3rem', animation: 'fadeIn 0.5s ease' }}>
                        {reviews.length === 0 ? (
                            <p className="text-center">No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <div className="review-header">
                                        <span className="reviewer-name">{review.name}</span>
                                        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`${i < review.rating ? 'fas' : 'far'} fa-star`}></i>
                                        ))}
                                    </div>
                                    <p>{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}

                <div className="review-form-container">
                    <h3>Write a Review</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="rating-input" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                    key={star}
                                    className={`${star <= newReview.rating ? 'fas' : 'far'} fa-star`}
                                    style={{ fontSize: '2rem', cursor: 'pointer', color: star <= newReview.rating ? '#d4af37' : '#ddd' }}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                ></i>
                            ))}
                        </div>

                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label>Your Review</label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                rows="4"
                                required
                                placeholder="Share your experience..."
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Review</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
