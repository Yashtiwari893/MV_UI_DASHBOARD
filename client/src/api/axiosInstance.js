import axios from 'axios';

// Ek custom axios instance banayein
const api = axios.create({
    baseURL: 'http://localhost:8080', // Hamare backend ka base URL
});

// Request Interceptor
// Ye function har request ke bheje jaane se PEHLE chalega
api.interceptors.request.use(
    (config) => {
        const authDataString = localStorage.getItem('mv-digital-user');
        if (authDataString) {
            const token = JSON.parse(authDataString).token;
            if (token) {
                // Agar token hai, to har request ke header me 'Authorization' add kar do
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;