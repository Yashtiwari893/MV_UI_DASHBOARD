import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axiosInstance';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ email, password }) => {
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return null;
        }

        setLoading(true);
        try {
            const res = await api.post("/api/auth/login", { email, password });
            const data = res.data;

            // Full authData object with user and token
            const authData = { user: data.user, token: data.token };

            localStorage.setItem("mv-digital-user", JSON.stringify(authData));
            setAuthUser(authData);

            toast.success("Logged in successfully!");
            return data.user;

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
