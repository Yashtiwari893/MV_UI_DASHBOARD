import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import api from '../api/axiosInstance';
import { FaEye, FaStar, FaUserFriends, FaStore } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    // --- States ---
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [reviewInput, setReviewInput] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [aiReply, setAiReply] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // --- Fetch Google My Business Accounts ---
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

    // --- Handle AI Review Reply Generation ---
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
                businessName: accounts[0]?.displayName || "our business",
                seoKeywords: seoKeywords || '',
            });
            setAiReply(res.data.reply);
        } catch (error) {
            console.error("AI reply generation error:", error);
            toast.error("Failed to generate reply.");
        } finally {
            setIsGenerating(false);
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

                    {/* --- AI Review Reply + SEO Section --- */}
                    <div className="mt-8 bg-dark-card p-6 rounded-lg shadow-neon-sm border border-dark-border">
                        <h3 className="text-xl font-bold mb-4">AI Review Reply Generator</h3>
                        <form onSubmit={handleGenerateReply}>
                            {/* SEO Keywords Input */}
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

                            {/* Review Input */}
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="reviewInput">
                                    Customer Review
                                </label>
                                <textarea
                                    id="reviewInput"
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
                                    rows="3"
                                    placeholder="Paste a customer review here... e.g., 'The service was amazing!'"
                                    value={reviewInput}
                                    onChange={(e) => setReviewInput(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-primary-purple hover:bg-violet-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Generating...' : 'Generate SEO Reply'}
                            </button>
                        </form>

                        {aiReply && (
                            <div className="mt-4 border-t border-dark-border pt-4">
                                <h4 className="font-semibold text-gray-400">AI Generated Reply:</h4>
                                <p className="mt-2 text-gray-300 whitespace-pre-wrap">{aiReply}</p>
                            </div>
                        )}
                    </div>

                    {/* --- Placeholder for Graphs / Insights --- */}
                    <div className="bg-dark-card p-6 rounded-lg shadow-neon-sm border border-dark-border mt-8">
                        Main content area for graphs...
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
