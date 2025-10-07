import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review, onGenerateReply }) => {
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'} />);
        }
        return stars;
    };

    return (
        <div className="bg-[#1a1a1a]/50 border border-border-glass p-4 rounded-lg transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-white">{review.authorName}</h4>
                <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
            </div>
            <p className="text-gray-300 mt-2 text-sm">"{review.comment}"</p>
            <div className="mt-4">
                <button
                    onClick={() => onGenerateReply(review.comment)}
                    className="bg-primary-purple/80 hover:bg-primary-purple text-sm text-white font-bold py-1 px-3 rounded-md shadow-lg hover:shadow-neon-purple transition-all duration-200"
                >
                    Generate Reply
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
