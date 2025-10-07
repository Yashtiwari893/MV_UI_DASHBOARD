import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../components/StatsCard';
import GrowthChart from '../components/GrowthChart';
import { FaEye, FaStar, FaUserFriends, FaStore } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Realistic mock data for the activity table
const recentActivity = [
    { time: "2h ago", activity: "Replied to Google review (Aman ⭐⭐⭐⭐⭐)", status: "Done" },
    { time: "5h ago", activity: "Scheduled Instagram post for 7 PM", status: "Queued" },
    { time: "Yesterday", activity: "New review received (Neha ⭐⭐)", status: "Pending" },
    { time: "Yesterday", activity: "Profile photo updated on GBP", status: "Success" },
];

const ActivityRow = ({ item }) => {
    const getStatusChipStyle = (status) => {
        switch (status) {
            case 'Success':
            case 'Done':
                return 'bg-theme-ok/10 text-theme-ok border-theme-ok/20';
            case 'Queued':
                return 'bg-theme-accent/10 text-theme-accent border-theme-accent/20';
            case 'Pending':
                return 'bg-theme-warn/10 text-theme-warn border-theme-warn/20';
            default:
                return 'bg-theme-muted/10 text-theme-muted border-theme-muted/20';
        }
    };

    return (
        <tr className="border-b border-white/5">
            <td className="py-3 pr-4 text-sm text-theme-muted">{item.time}</td>
            <td className="py-3 pr-4 text-white">{item.activity}</td>
            <td className="py-3 text-right">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusChipStyle(item.status)}`}>
                    {item.status}
                </span>
            </td>
        </tr>
    );
};

const DashboardPage = () => {
    // Animation Variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-theme-muted mt-2 mb-8">Here's a glance at your business performance.</p>
            </motion.div>

            {/* Stats Cards Section */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}><StatsCard title="Total Reviews" value="238" Icon={FaStar} change="+12%" changeType="increase" /></motion.div>
                <motion.div variants={itemVariants}><StatsCard title="Avg. Rating" value="4.7 ★" Icon={FaStore} change="+0.1" changeType="increase" /></motion.div>
                <motion.div variants={itemVariants}><StatsCard title="Profile Views (7d)" value="3,420" Icon={FaEye} change="+18%" changeType="increase" /></motion.div>
                <motion.div variants={itemVariants}><StatsCard title="Post Reach (7d)" value="12,450" Icon={FaUserFriends} change="-5%" changeType="decrease" /></motion.div>
            </motion.div>

            <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={containerVariants}>
                {/* Main Growth Chart */}
                <motion.div className="lg:col-span-2" variants={itemVariants}>
                    <GrowthChart />
                </motion.div>

                {/* Quick Tasks & Actions */}
                <motion.div variants={itemVariants} className="bg-theme-card/50 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-white">Quick Actions</h3>
                    <NavLink to="/content-studio" className="w-full text-center bg-theme-accent/80 text-theme-bg font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:bg-theme-accent">
                        Generate New Post
                    </NavLink>
                    <NavLink to="/integrations" className="w-full text-center bg-white/10 text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:bg-white/20">
                        Manage Integrations
                    </NavLink>
                </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 bg-theme-card/50 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-white mb-4">Recent Activity</h3>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            <th className="py-2 pr-4 font-semibold text-sm text-theme-muted">Time</th>
                            <th className="py-2 pr-4 font-semibold text-sm text-theme-muted">Activity</th>
                            <th className="py-2 text-right font-semibold text-sm text-theme-muted">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentActivity.map((item, index) => <ActivityRow key={index} item={item} />)}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
};

export default DashboardPage;

