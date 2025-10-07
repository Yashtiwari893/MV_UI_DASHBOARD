import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axiosInstance';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ name, email, password }) => {
        // Basic validation
        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            return false;
        }

        setLoading(true);
        try {
            const res = await api.post("/api/auth/signup", { name, email, password });
            const data = res.data;

            // Full authData object with user and token
            const authData = { user: data.user, token: data.token };

            localStorage.setItem("mv-digital-user", JSON.stringify(authData));
            setAuthUser(authData);

            toast.success("Signup successful!");
            return true;

        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;
