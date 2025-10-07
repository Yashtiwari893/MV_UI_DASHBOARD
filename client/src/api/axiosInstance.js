import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// Request Interceptor (ye pehle se hai)
api.interceptors.request.use(
    (config) => {
        const authDataString = localStorage.getItem('mv-digital-user');
        if (authDataString) {
            const token = JSON.parse(authDataString).token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- NAYA CODE: Response Interceptor ---
// Ye function har response ke aane ke BAAD chalega
api.interceptors.response.use(
    (response) => {
        // Agar response successful hai, to kuch na karo, response ko aage jaane do
        return response;
    },
    (error) => {
        // Agar response me error hai, to check karo
        if (error.response && error.response.status === 401) {
            // Agar 401 Unauthorized error hai
            // 1. Local storage se user ka data hata do
            localStorage.removeItem('mv-digital-user');
            
            // 2. User ko batao ki session expire ho gaya hai
            toast.error('Session expired. Please log in again.');

            // 3. User ko login page par redirect kar do
            // window.location.href = '/login'; 
            // Ye reload karega, iski jagah hum event create karenge for better UX in future. Abhi ke liye bas itna kaafi hai.
            // For now, let's just clear the storage and let the ProtectedRoute handle the redirect on next interaction.
            // A better way is to force a redirect.
            window.location.href = '/login';
        }
        // Baaki errors ko aage jaane do taaki component use handle kar sake
        return Promise.reject(error);
    }
);

export default api;