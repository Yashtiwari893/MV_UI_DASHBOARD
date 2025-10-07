import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import { FcGoogle } from "react-icons/fc";

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
        const { user } = await signup(formData);
        if (user) {
            if(user.onboardingComplete){
                navigate('/dashboard');
            } else {
                navigate('/onboarding');
            }
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/api/auth/google";
    };

    return (
        <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center font-sans">
            <div className="bg-dark-card p-8 rounded-lg shadow-lg w-full max-w-md border border-dark-border">
                <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
                
                {/* --- EMAIL/PASSWORD FORM START --- */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
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
                            className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
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
                            className="w-full p-3 bg-gray-700 rounded-lg border border-dark-border focus:outline-none focus:border-primary-blue"
                            placeholder="••••••••"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-blue hover:bg-primary-purple text-white font-bold p-3 rounded-lg transition duration-300 disabled:bg-primary-blue/70"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up with Email'}
                    </button>
                </form>
                {/* --- EMAIL/PASSWORD FORM END --- */}
                
                {/* --- GOOGLE BUTTON SECTION START --- */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-dark-border"></div>
                    <span className="mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-dark-border"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-lg transition duration-300"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>
                {/* --- GOOGLE BUTTON SECTION END --- */}

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-blue hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;