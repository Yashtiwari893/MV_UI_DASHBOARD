import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { authUser } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-10 bg-theme-card/50 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10">
            <div>
                <input
                    placeholder="Search..."
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-theme-accent w-64 hidden md:block"
                />
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleLogout}
                    className="text-sm font-semibold text-theme-muted hover:text-white transition-colors"
                >
                    Logout
                </button>
                <div className="w-8 h-8 rounded-full bg-theme-accent grid place-items-center text-theme-bg font-bold">
                    {authUser?.user?.name ? authUser.user.name.charAt(0).toUpperCase() : 'A'}
                </div>
            </div>
        </header>
    );
};

export default Header;