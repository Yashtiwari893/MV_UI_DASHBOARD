import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { authUser } = useAuthContext();

  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700">
      <div>
        <h1 className="text-xl font-semibold text-white ">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, {authUser?.name}!</p>
      </div>
      <div>
        {/* Placeholder for profile icon or other actions */}
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Connect Account
        </button>
      </div>
    </header>
  );
};

export default Header;