import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnboard from '../hooks/useOnboard';

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
            navigate('/dashboard'); // Successful onboarding ke baad dashboard par bhejo
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2">Tell us about your Business</h2>
                <p className="text-center text-gray-400 mb-6">This will help us customize your experience.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="businessName">Business Name</label>
                        <input
                            type="text" id="businessName" placeholder="e.g., The Digital Cafe" required
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                            onChange={handleChange} value={formData.businessName}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="businessType">Business Type (Optional)</label>
                        <input
                            type="text" id="businessType" placeholder="e.g., Marketing Agency, Restaurant"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                            onChange={handleChange} value={formData.businessType}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="website">Website (Optional)</label>
                        <input
                            type="url" id="website" placeholder="https://example.com"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                            onChange={handleChange} value={formData.website}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300 disabled:bg-blue-400"
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