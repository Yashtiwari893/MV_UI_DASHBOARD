import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";

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

        const { user } = await signup(formData);

        if (user) {

            if (user.onboardingComplete) {

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
<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-sans">
<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
<h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
 
                {/* --- SIGNUP FORM --- */}
<form onSubmit={handleSubmit}>
<div className="mb-4">
<label className="block text-gray-400 mb-2" htmlFor="name">

                            Full Name
</label>
<input

                            type="text"

                            id="name"

                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"

                            placeholder="John Doe"

                            onChange={handleChange}

                            value={formData.name}

                            required

                        />
</div>
 
                    <div className="mb-4">
<label className="block text-gray-400 mb-2" htmlFor="email">

                            Email Address
</label>
<input

                            type="email"

                            id="email"

                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"

                            placeholder="you@example.com"

                            onChange={handleChange}

                            value={formData.email}

                            required

                        />
</div>
 
                    <div className="mb-6">
<label className="block text-gray-400 mb-2" htmlFor="password">

                            Password
</label>
<input

                            type="password"

                            id="password"

                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500"

                            placeholder="••••••••"

                            onChange={handleChange}

                            value={formData.password}

                            required

                        />
</div>
 
                    <button

                        type="submit"

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300 disabled:bg-blue-400"

                        disabled={loading}
>

                        {loading ? 'Signing Up...' : 'Sign Up with Email'}
</button>
</form>
 
                {/* --- DIVIDER --- */}
<div className="my-6 flex items-center">
<div className="flex-grow border-t border-gray-700"></div>
<span className="mx-4 text-gray-400">OR</span>
<div className="flex-grow border-t border-gray-700"></div>
</div>
 
                {/* --- GOOGLE BUTTON --- */}
<button

                    onClick={handleGoogleLogin}

                    className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-lg transition duration-300"
>
<FcGoogle size={22} />

                    Continue with Google
</button>
 
                {/* --- LOGIN LINK --- */}
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

 