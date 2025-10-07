import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axiosInstance';

const LoginSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    useEffect(() => {
        const handleLoginSuccess = async () => {
            const token = searchParams.get('token');
            console.log("1. Token from URL:", token);

            if (token) {
                try {
                    // Token ko headers me set karke user details fetch karein
                    const res = await api.get("/api/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    const user = res.data;

                    // LocalStorage aur AuthContext ko update karna
                    const authData = { user, token };
                    console.log("2. Data being saved to localStorage:", authData);

                    localStorage.setItem("mv-digital-user", JSON.stringify(authData));

                    // Context me bhi poora 'authData' save karein
                    setAuthUser(authData);

                    toast.success("Logged in with Google successfully!");

                    // User ko onboarding ya dashboard par redirect karna
                    if (user.onboardingComplete) {
                        navigate('/dashboard');
                    } else {
                        navigate('/onboarding');
                    }

                } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch user details.");
                    navigate('/login');
                }
            } else {
                toast.error("Google login failed. No token found.");
                navigate('/login');
            }
        };

        handleLoginSuccess();
    }, [searchParams, navigate, setAuthUser]);

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center">
            <p className="text-white text-xl">Logging you in...</p>
        </div>
    );
};

export default LoginSuccessPage;
