import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const HomePage = () => {
    const { authUser } = useAuthContext();
    
    // Agar user logged in hai (authUser object मौजूद hai), to use '/dashboard' par bhejo
    // Varna, use '/login' page par bhejo
    return authUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default HomePage;