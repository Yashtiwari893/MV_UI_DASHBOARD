import React from 'react';
import { FaStar } from 'react-icons/fa';

// Review card to display reviewer info, comment, and action button
const ReviewCard = ({ review, onGenerateReply }) => {
    // Star rating helper
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'} />
            );
        }
        return stars;
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-dark-border mb-4">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-white">{review.authorName}</h4>
                <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
            </div>

            <p className="text-gray-300 mt-2 text-sm">"{review.comment}"</p>

            <div className="mt-4">
                <button
                    onClick={() => onGenerateReply(review)} // ✅ pass full review object
                    className="bg-gray-700 hover:bg-gray-600 text-sm text-white font-bold py-1 px-3 rounded"
                >
                    Generate Reply
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
