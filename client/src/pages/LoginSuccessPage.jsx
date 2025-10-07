import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import api from '../api/axiosInstance';
import toast from 'react-hot-toast';

const LoginSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    useEffect(() => {
        const handleLoginSuccess = async () => {
            const token = searchParams.get('token');
            if (token) {
                try {
                    const res = await api.get("/api/auth/me");
                    const user = res.data;
                    const authData = { user, token };
                    localStorage.setItem("mv-digital-user", JSON.stringify(authData));
                    setAuthUser(authData);
                    toast.success(`Logged in as ${user.name}!`);

                    if (user.onboardingComplete) {
                        navigate('/'); // <-- YAHAN FIX KIYA GAYA HAI
                    } else {
                        navigate('/onboarding');
                    }
                } catch (error) {
                    toast.error("Failed to fetch user details.");
                    navigate('/login');
                }
            } else {
                toast.error("Login failed. No token found.");
                navigate('/login');
            }
        };
        handleLoginSuccess();
    }, [searchParams, navigate, setAuthUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-theme-bg">
            <p className="text-white text-xl animate-pulse">Authenticating...</p>
        </div>
    );
};

export default LoginSuccessPage;
