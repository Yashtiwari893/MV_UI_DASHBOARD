import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { loading, signup } = useSignup();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup(formData);
        if (success) {
            navigate('/onboarding'); // Successful signup ke baad onboarding page par bhejo
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="John Doe"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                            placeholder="••••••••"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300 disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;