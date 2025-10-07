import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';

// Reusable Card component for integrations
const IntegrationCard = ({ title, desc, icon, connected, onClick }) => (
    <motion.div
        className="bg-theme-card/50 border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] transform hover:-translate-y-1 transition-transform duration-300"
        variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
        }}
    >
        <div className="flex items-center gap-4">
            <div className="bg-theme-bg p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-lg text-white">{title}</h3>
                <p className="text-sm text-theme-muted">{desc}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
            <button
                onClick={onClick}
                disabled={connected}
                className="bg-theme-accent text-theme-bg font-bold py-2 px-5 rounded-lg transition-all duration-300 disabled:bg-theme-ok disabled:cursor-not-allowed hover:bg-white"
            >
                {connected ? 'Connected' : 'Connect'}
            </button>
            {connected && <span className="text-sm font-medium text-theme-ok">✓ Active</span>}
        </div>
    </motion.div>
);

const Integrations = () => {
    const { authUser } = useAuthContext();

    // Handlers for connecting accounts
    const handleGoogleConnect = () => {
        window.location.href = "http://localhost:8080/api/auth/google";
    };
    const handleFacebookConnect = () => {
        window.location.href = "http://localhost:8080/api/auth/facebook";
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold text-white">Integrations</h1>
            <p className="text-theme-muted mt-2 mb-8">Connect your Google Business Profile and social accounts to unlock all features.</p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                <IntegrationCard
                    title="Google Business Profile"
                    desc="Sync reviews, photos & profile info."
                    icon={<FaGoogle className="text-2xl text-white" />}
                    connected={!!authUser?.user?.googleId} // Check if googleId exists
                    onClick={handleGoogleConnect}
                />
                <IntegrationCard
                    title="Facebook"
                    desc="Post content directly to your page."
                    icon={<FaFacebook className="text-2xl text-[#1877F2]" />}
                    connected={!!authUser?.user?.facebookId} // Check if facebookId exists
                    onClick={handleFacebookConnect}
                />
                <IntegrationCard
                    title="Instagram"
                    desc="Publish reels and posts from the app."
                    icon={<FaInstagram className="text-2xl text-pink-500" />}
                    connected={false} // Abhi ke liye disabled
                    onClick={() => toast.error("Instagram integration coming soon!")}
                />
            </motion.div>
        </motion.div>
    );
};

export default Integrations;

