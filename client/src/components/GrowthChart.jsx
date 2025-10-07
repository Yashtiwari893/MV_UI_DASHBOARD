import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', reviews: 6, posts: 1 }, { name: 'Tue', reviews: 9, posts: 2 },
    { name: 'Wed', reviews: 4, posts: 1 }, { name: 'Thu', reviews: 7, posts: 2 },
    { name: 'Fri', reviews: 12, posts: 3 }, { name: 'Sat', reviews: 8, posts: 2 },
    { name: 'Sun', reviews: 14, posts: 2 },
];

const GrowthChart = () => {
    return (
        <div className="bg-theme-card/50 border border-white/10 rounded-2xl p-6 h-96">
            <h3 className="font-bold text-lg text-white mb-4">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#aab2c8" />
                    <YAxis stroke="#aab2c8" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(18, 24, 54, 0.9)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }} />
                    <Line type="monotone" dataKey="reviews" name="New Reviews" stroke="#64d2ff" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="posts" name="Posts Created" stroke="#3ddc97" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GrowthChart;
