import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header'; // Header ko import karna zaruri hai

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-theme-bg text-theme-text font-sans">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                {/* --- YAHAN HEADER MISSING THA --- */}
                <Header /> 
                
                {/* Page ka content is div ke andar aayega */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;