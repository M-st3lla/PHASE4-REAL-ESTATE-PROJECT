// src/components/Reviews.js

import React, { useState, useContext } from 'react';
import { landLocations } from './Data';
import { propertyLocations } from './PropertyData';
import { UserContext } from '../UserContext';
import './Reviews.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showUserReviews, setShowUserReviews] = useState(false);
    const { isAuthenticated } = useContext(UserContext);

    const sellers = [...landLocations, ...propertyLocations].map(location => location.seller_contact);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            seller: selectedSeller,
            rating,
            reviewText,
        };
        setReviews([...reviews, newReview]);
        setSelectedSeller('');
        setRating(0);
        setReviewText('');
    };

    return (
        <div className="reviews-container">
            <h2>Leave a Review</h2>
            {isAuthenticated ? (
                <>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Select Seller:
                            <select value={selectedSeller} onChange={(e) => setSelectedSeller(e.target.value)}>
                                <option value="">Select a seller</option>
                                {sellers.map((seller, index) => (
                                    <option key={index} value={seller.name}>{seller.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Rating:
                            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value={0}>Select a rating</option>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Review:
                            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                        </label>
                        <button type="submit">Submit Review</button>
                    </form>
                    <button onClick={() => setShowUserReviews(!showUserReviews)}>
                        {showUserReviews ? 'Hide User Reviews' : 'Show User Reviews'}
                    </button>
                </>
            ) : (
                <p>Please log in to leave a review and view user reviews.</p>
            )}
            {showUserReviews && (
                <div className="reviews-list">
                    <h3>Reviews</h3>
                    {reviews.map((review, index) => (
                        <div key={index} className="review">
                            <h4>{review.seller}</h4>
                            <p>Rating: {review.rating} / 5</p>
                            <p>{review.reviewText}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
