import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ReviewCard from '../components/ReviewCard';
import api from '../api/axiosInstance';
import { FaEye, FaStar, FaUserFriends, FaStore } from 'react-icons/fa';
import toast from 'react-hot-toast';

// --- Mock Reviews ---
const mockReviews = [
    { id: 1, reviewId: 'review123', authorName: 'Rohan Sharma', rating: 5, comment: 'The cappuccino was perfect! Best coffee shop in the area.' },
    { id: 2, reviewId: 'review456', authorName: 'Priya Mehta', rating: 4, comment: 'Great ambiance and friendly staff. The music was a bit loud.' },
    { id: 3, reviewId: 'review789', authorName: 'Ankit Desai', rating: 3, comment: 'The service was a little slow during peak hours.' }
];

const DashboardPage = () => {
    // --- Business Data States ---
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Review Reply Generator States ---
    const [reviewInput, setReviewInput] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [aiReply, setAiReply] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isPosting, setIsPosting] = useState(false);

    // --- Social Post Generator States ---
    const [postTopic, setPostTopic] = useState('');
    const [generatedPost, setGeneratedPost] = useState(null);
    const [isGeneratingPost, setIsGeneratingPost] = useState(false);

    // --- Fetch GMB Accounts (Mock or API) ---
    useEffect(() => {
        const fetchGmbAccounts = async () => {
            try {
                setLoading(true);
                const res = await api.get('/api/gmb/accounts');
                setAccounts(res.data);
            } catch (error) {
                console.error("Failed to fetch GMB accounts", error);
                toast.error(error.response?.data?.message || "Could not fetch GMB data.");
            } finally {
                setLoading(false);
            }
        };
        fetchGmbAccounts();
    }, []);

    // --- Select Review ---
    const handleReviewSelect = (review) => {
        setSelectedReview(review);
        setReviewInput(review.comment);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Generate AI Review Reply ---
    const handleGenerateReply = async (e) => {
        e.preventDefault();
        if (!reviewInput) {
            toast.error("Please enter a review to reply to.");
            return;
        }
        setIsGenerating(true);
        setAiReply('');
        try {
            const res = await api.post('/api/ai/generate-reply', {
                reviewText: reviewInput,
                businessName: "The Chill Point Cafe",
                seoKeywords: seoKeywords
            });
            setAiReply(res.data.reply);
        } catch (error) {
            toast.error("Failed to generate reply.");
        } finally {
            setIsGenerating(false);
        }
    };

    // --- Post Reply to GMB (Mock API) ---
    const handlePostReply = async () => {
        if (!aiReply || !selectedReview) {
            toast.error("Please generate a reply first.");
            return;
        }
        setIsPosting(true);
        try {
            const res = await api.post(`/api/gmb/reviews/${selectedReview.reviewId}/reply`, {
                replyText: aiReply
            });
            toast.success(res.data.message || "Reply posted successfully!");
            setAiReply('');
            setSelectedReview(null);
            setReviewInput('');
        } catch (error) {
            toast.error("Failed to post reply.");
        } finally {
            setIsPosting(false);
        }
    };

    // --- Generate Social Post ---
    const handleGeneratePost = async (e) => {
        e.preventDefault();
        if (!postTopic) {
            toast.error("Please enter a topic for the post.");
            return;
        }
        setIsGeneratingPost(true);
        setGeneratedPost(null);
        try {
            const res = await api.post('/api/ai/generate-post', {
                topic: postTopic,
                businessName: "The Chill Point Cafe",
            });
            setGeneratedPost(res.data);
            toast.success("Post generated successfully!");
        } catch (error) {
            toast.error("Failed to generate post.");
        } finally {
            setIsGeneratingPost(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#211f1f] text-white font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-bg p-8">
                    <h2 className="text-2xl font-bold mb-6">Overview</h2>

                    {/* --- Stats Section --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                        {loading ? (
                            <p>Loading business info...</p>
                        ) : accounts.length > 0 ? (
                            <>
                                <StatsCard title="Business Name" value={accounts[0]?.displayName || 'N/A'} Icon={FaStore} />
                                <StatsCard title="Avg. Rating" value="4.7 ★" Icon={FaStar} />
                                <StatsCard title="Total Followers" value="1,820" Icon={FaUserFriends} />
                                <StatsCard title="Total Views" value="718" Icon={FaEye} />
                            </>
                        ) : (
                            <p>No Google Business account found.</p>
                        )}
                    </div>

                    {/* --- AI Tools Section (2 Columns) --- */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* --- AI Review Reply Generator --- */}
                        <div className="bg-dark-card p-6 rounded-lg shadow-neon-sm border border-dark-border">
                            <h3 className="text-xl font-bold mb-4">AI Review Reply Generator</h3>
                            <form onSubmit={handleGenerateReply}>
                                <div className="mb-4">
                                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="seoKeywords">
                                        SEO Keywords (comma-separated)
                                    </label>
                                    <input
                                        id="seoKeywords"
                                        type="text"
                                        className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
                                        placeholder="e.g., best cafe in surat, fresh coffee"
                                        value={seoKeywords}
                                        onChange={(e) => setSeoKeywords(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="reviewInput">
                                        Customer Review
                                    </label>
                                    <textarea
                                        id="reviewInput"
                                        className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
                                        rows="3"
                                        placeholder="Paste a customer review here..."
                                        value={reviewInput}
                                        onChange={(e) => setReviewInput(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-primary-purple hover:bg-violet-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? 'Generating...' : 'Generate Reply'}
                                </button>
                            </form>

                            {aiReply && (
                                <div className="mt-4 border-t border-dark-border pt-4">
                                    <h4 className="font-semibold text-gray-400">AI Generated Reply:</h4>
                                    <p className="mt-2 text-gray-300 whitespace-pre-wrap">{aiReply}</p>

                                    <button
                                        onClick={handlePostReply}
                                        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                        disabled={isPosting}
                                    >
                                        {isPosting ? 'Posting...' : 'Post Reply to GMB'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* --- AI Social Post Generator --- */}
                        <div className="bg-dark-card p-6 rounded-lg shadow-neon-sm border border-dark-border">
                            <h3 className="text-xl font-bold mb-4">AI Social Post Generator</h3>
                            <form onSubmit={handleGeneratePost}>
                                <div className="mb-4">
                                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="postTopic">
                                        Post Topic
                                    </label>
                                    <input
                                        id="postTopic"
                                        type="text"
                                        className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
                                        placeholder="e.g., Our new weekend coffee discount"
                                        value={postTopic}
                                        onChange={(e) => setPostTopic(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-primary-purple hover:bg-violet-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    disabled={isGeneratingPost}
                                >
                                    {isGeneratingPost ? 'Generating Post...' : 'Generate Post'}
                                </button>
                            </form>

                            {generatedPost && (
                                <div className="mt-4 border-t border-dark-border pt-4">
                                    <h4 className="font-semibold text-gray-400">AI Generated Caption:</h4>
                                    <p className="mt-2 text-gray-300 whitespace-pre-wrap">{generatedPost.caption}</p>

                                    {/* --- SAFETY CHECK for Hashtags --- */}
                                    {Array.isArray(generatedPost?.hashtags) && generatedPost.hashtags.length > 0 ? (
                                        <>
                                            <h4 className="font-semibold text-gray-400 mt-4">Suggested Hashtags:</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {generatedPost.hashtags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-700 text-sm text-gray-300 px-2 py-1 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-500 mt-2">No hashtags suggested.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- Recent Activity Section --- */}
                    <div className="mt-8 bg-dark-card p-6 rounded-lg shadow-neon-sm border border-dark-border">
                        <h3 className="text-xl font-bold mb-4">Recent Activity (Mock Data)</h3>
                        <div>
                            {mockReviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    onGenerateReply={() => handleReviewSelect(review)}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
