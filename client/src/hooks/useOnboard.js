import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axiosInstance';

const useOnboard = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const onboard = async ({ businessName, businessType, website }) => {
        if (!businessName) {
            toast.error("Business name is required");
            return false;
        }

        setLoading(true);
        try {
            // Token ko headers me bhejna
            const token = authUser?.token || JSON.parse(localStorage.getItem("mv-digital-user"))?.token;

            if (!token) {
                toast.error("User not authenticated");
                return false;
            }

            const res = await api.post(
                "/api/business/onboard",
                { businessName, businessType, website },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Onboarding complete ho gayi hai, to user ka local data update karein
            const updatedAuthData = {
                token,
                user: {
                    ...((authUser && authUser.user) || {}),
                    onboardingComplete: true
                }
            };

            localStorage.setItem("mv-digital-user", JSON.stringify(updatedAuthData));
            setAuthUser(updatedAuthData);

            toast.success("Business details saved!");
            return true;

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, onboard };
};

export default useOnboard;
