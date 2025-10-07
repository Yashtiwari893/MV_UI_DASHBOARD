import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();

  // Ye check karega ki user logged in hai aur uske paas token bhi hai ya nahi
  if (!authUser || !authUser.token) {
    // Agar user ya token nahi hai, to use seedha login page par bhej do
    return <Navigate to="/login" />;
  }

  // Agar sab theek hai, to user ko wo page dikhao jo wo dekhna chahta tha (e.g., Dashboard)
  return children;
};

export default ProtectedRoute;
