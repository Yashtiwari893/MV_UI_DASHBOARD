import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaStar, FaUsers, FaEye, FaShare } from 'react-icons/fa';

// Mock Data for Charts
const monthlyData = [
    { name: 'Jan', reach: 4000, engagement: 2400 }, { name: 'Feb', reach: 3000, engagement: 1398 },
    { name: 'Mar', reach: 2000, engagement: 9800 }, { name: 'Apr', reach: 2780, engagement: 3908 },
    { name: 'May', reach: 1890, engagement: 4800 }, { name: 'Jun', reach: 2390, engagement: 3800 },
];

const reviewSourceData = [
    { name: 'Google', value: 400 }, { name: 'Facebook', value: 300 },
    { name: 'Website', value: 300 }, { name: 'Other', value: 200 },
];

const postTypeData = [
    { name: 'Image Post', count: 120 }, { name: 'Video Post', count: 80 },
    { name: 'Carousel', count: 50 }, { name: 'Story', count: 150 },
];

const COLORS = ['#64d2ff', '#3ddc97', '#ffd166', '#aab2c8'];

// Small Stats Card component specific to this page
const AnalyticsStatCard = ({ title, value, Icon }) => (
    <div className="bg-theme-card/50 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-4">
            <Icon className="text-2xl text-theme-accent" />
            <div>
                <p className="text-sm font-medium text-theme-muted">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);

const Analytics = () => {
    // Animation Variants
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold text-white">Analytics & Insights</h1>
                <p className="text-theme-muted mt-2 mb-8">Deep dive into your performance metrics.</p>
            </motion.div>

            {/* Top Stats Cards */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={containerVariants}>
                <motion.div variants={itemVariants}><AnalyticsStatCard title="Overall Rating" value="4.8 ★" Icon={FaStar} /></motion.div>
                <motion.div variants={itemVariants}><AnalyticsStatCard title="New Followers (30d)" value="+ 1,204" Icon={FaUsers} /></motion.div>
                <motion.div variants={itemVariants}><AnalyticsStatCard title="Total Reach (30d)" value="1.2M" Icon={FaEye} /></motion.div>
                <motion.div variants={itemVariants}><AnalyticsStatCard title="Total Shares (30d)" value="8,921" Icon={FaShare} /></motion.div>
            </motion.div>

            {/* Main Charts Section */}
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={containerVariants}>
                {/* Monthly Performance Chart */}
                <motion.div variants={itemVariants} className="bg-theme-card/50 border border-white/10 rounded-2xl p-6 h-96">
                    <h3 className="font-bold text-lg text-white mb-4">Monthly Performance</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#aab2c8" />
                            <YAxis stroke="#aab2c8" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 24, 54, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }} />
                            <Legend />
                            <Line type="monotone" dataKey="reach" name="Post Reach" stroke="#64d2ff" strokeWidth={2} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="engagement" name="Engagement" stroke="#3ddc97" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Post Type Performance */}
                <motion.div variants={itemVariants} className="bg-theme-card/50 border border-white/10 rounded-2xl p-6 h-96">
                    <h3 className="font-bold text-lg text-white mb-4">Post Type Performance</h3>
                     <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={postTypeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                           <XAxis dataKey="name" stroke="#aab2c8" />
                           <YAxis stroke="#aab2c8" />
                           <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 24, 54, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }} />
                           <Legend />
                           <Bar dataKey="count" name="Total Posts" fill="#64d2ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </motion.div>

             {/* Review Source Chart */}
             <motion.div variants={itemVariants} className="mt-8 bg-theme-card/50 border border-white/10 rounded-2xl p-6 h-96">
                <h3 className="font-bold text-lg text-white mb-4">Review Sources</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                        <Pie
                            data={reviewSourceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {reviewSourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 24, 54, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </motion.div>
        </motion.div>
    );
};

export default Analytics;