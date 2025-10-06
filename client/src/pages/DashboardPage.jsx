import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard'; // Naye component ko import karein

// react-icons se kuch icons import karein
import { FaEye, FaStar, FaUserFriends, FaChartLine } from 'react-icons/fa';

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-8">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>

          {/* --- NAYA CODE START --- */}

          {/* Grid layout banayenge cards ke liye */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Reusable StatsCard component ka 4 baar istemal */}
            <StatsCard title="Total Views" value="718" Icon={FaEye} />
            <StatsCard title="Avg. Rating" value="4.7 ★" Icon={FaStar} />
            <StatsCard title="Total Followers" value="1,820" Icon={FaUserFriends} />
            <StatsCard title="Engagement" value="17,848" Icon={FaChartLine} />
          </div>

          {/* Yahan baki ke dashboard components aage aayenge */}
          <div className="bg-gray-900 p-6 rounded-lg">
            Main content area for graphs...
          </div>

          {/* --- NAYA CODE END --- */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;