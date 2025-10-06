import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

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
            const res = await axios.post("http://localhost:8080/api/auth/signup", {
                name,
                email,
                password,
            });

            const data = res.data;

            // User data ko localStorage aur context me save karna
            localStorage.setItem("mv-digital-user", JSON.stringify(data.user));
            setAuthUser(data.user);

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