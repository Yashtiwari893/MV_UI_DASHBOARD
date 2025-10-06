import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

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
            // LocalStorage se token nikalna
            const token = JSON.parse(localStorage.getItem("mv-digital-user"))?.token;

            const res = await axios.post("http://localhost:8080/api/business/onboard", 
            { businessName, businessType, website }, 
            {
                headers: {
                    Authorization: `Bearer ${token}` // Token ko header me bhejna
                }
            });

            // Onboarding complete ho gayi hai, to user ka local data update karein
            const updatedUser = { ...authUser, onboardingComplete: true };
            localStorage.setItem("mv-digital-user", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);

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