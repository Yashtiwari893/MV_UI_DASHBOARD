import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

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
            const res = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            });

            const data = res.data;

            localStorage.setItem("mv-digital-user", JSON.stringify(data.user));
            setAuthUser(data.user);

            toast.success("Logged in successfully!");
            return data.user; // User data return karenge taaki page redirect kar sakein

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