import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnboard from '../hooks/useOnboard'; // Make sure this hook exists

const OnboardingPage = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: '',
        website: '',
    });
    const { loading, onboard } = useOnboard();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onboard(formData);
        if (success) {
            navigate('/'); // <-- YAHAN FIX KIYA GAYA HAI
        }
    };

    return (
        <div className="min-h-screen bg-theme-bg text-white flex items-center justify-center font-sans">
            <div className="bg-theme-card/50 border border-white/10 rounded-2xl p-8 shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2 text-white">Your Business Details</h2>
                <p className="text-center text-theme-muted mb-6">This helps us tailor your experience.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-theme-muted text-sm font-bold mb-2" htmlFor="businessName">Business Name *</label>
                        <input
                            type="text" id="businessName" placeholder="e.g., The Digital Cafe" required
                            className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-theme-accent"
                            onChange={handleChange} value={formData.businessName}
                        />
                    </div>
                    <div>
                        <label className="block text-theme-muted text-sm font-bold mb-2" htmlFor="businessType">Business Type</label>
                        <input
                            type="text" id="businessType" placeholder="e.g., Marketing Agency"
                            className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-theme-accent"
                            onChange={handleChange} value={formData.businessType}
                        />
                    </div>
                    <div>
                        <label className="block text-theme-muted text-sm font-bold mb-2" htmlFor="website">Website</label>
                        <input
                            type="url" id="website" placeholder="https://example.com"
                            className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-theme-accent"
                            onChange={handleChange} value={formData.website}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-theme-accent text-theme-bg font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Continue to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OnboardingPage;
