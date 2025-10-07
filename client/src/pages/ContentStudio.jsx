import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axiosInstance';
import toast from 'react-hot-toast';

const ContentStudio = () => {
    // States for all AI tools
    const [reviewInput, setReviewInput] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [aiReply, setAiReply] = useState('');
    const [isGeneratingReply, setIsGeneratingReply] = useState(false);
    
    const [postTopic, setPostTopic] = useState('');
    const [generatedPost, setGeneratedPost] = useState(null);
    const [isGeneratingPost, setIsGeneratingPost] = useState(false);

    const [generatedImage, setGeneratedImage] = useState(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    // Handlers for all AI tools
    const handleGenerateReply = async (e) => {
        e.preventDefault();
        if (!reviewInput) { toast.error("Please enter a review."); return; }
        setIsGeneratingReply(true); setAiReply('');
        try {
            const res = await api.post('/api/ai/generate-reply', { reviewText: reviewInput, businessName: "The Chill Point Cafe", seoKeywords: seoKeywords });
            setAiReply(res.data.reply);
        } catch (error) { toast.error("Failed to generate reply."); } finally { setIsGeneratingReply(false); }
    };

    const handleGeneratePost = async (e) => {
        e.preventDefault();
        if (!postTopic) { toast.error("Please enter a topic."); return; }
        setIsGeneratingPost(true); setGeneratedPost(null); setGeneratedImage(null);
        try {
            const res = await api.post('/api/ai/generate-post', { topic: postTopic, businessName: "The Chill Point Cafe" });
            setGeneratedPost(res.data);
            toast.success("Post generated!");
        } catch (error) { toast.error("Failed to generate post."); } finally { setIsGeneratingPost(false); }
    };

    const handleGenerateImage = async () => {
        if (!postTopic) { toast.error("Please provide a topic first."); return; }
        setIsGeneratingImage(true); setGeneratedImage(null);
        try {
            const res = await api.post('/api/ai/generate-image', { prompt: `A professional, high-quality photograph for a social media post about: ${postTopic}` });
            setGeneratedImage(res.data.image);
            toast.success("Image generated!");
        } catch (error) { toast.error("Failed to generate image."); } finally { setIsGeneratingImage(false); }
    };

    // Animation Variants
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold text-white">Content Studio</h1>
                <p className="text-theme-muted mt-2 mb-8">Your AI-powered assistant for creating marketing content.</p>
            </motion.div>

            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={containerVariants}>
                {/* Review Reply Generator */}
                <motion.div variants={itemVariants} className="bg-theme-card/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-white">AI Review Reply Generator</h3>
                    <form onSubmit={handleGenerateReply} className="space-y-4">
                        <div>
                            <label className="block text-theme-muted text-sm font-bold mb-2">SEO Keywords</label>
                            <input type="text" className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-theme-accent" placeholder="e.g., best cafe in surat" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-theme-muted text-sm font-bold mb-2">Customer Review</label>
                            <textarea className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-theme-accent" rows="3" placeholder="Paste a customer review here..." value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full bg-theme-accent text-theme-bg font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50" disabled={isGeneratingReply}>
                            {isGeneratingReply ? 'Generating...' : 'Generate Reply'}
                        </button>
                    </form>
                    {aiReply && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 border-t border-white/10 pt-4">
                        <h4 className="font-semibold text-gray-400">AI Generated Reply:</h4>
                        <p className="mt-2 text-gray-300 whitespace-pre-wrap">{aiReply}</p>
                    </motion.div>}
                </motion.div>

                {/* Social Post Generator */}
                <motion.div variants={itemVariants} className="bg-theme-card/50 border border-white/10 rounded-2xl p-6">
                     <h3 className="text-xl font-bold mb-4 text-white">AI Social Post Generator</h3>
                    <form onSubmit={handleGeneratePost} className="space-y-4">
                        <div>
                            <label className="block text-theme-muted text-sm font-bold mb-2">Post Topic</label>
                            <input type="text" className="w-full p-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-theme-accent" placeholder="e.g., Our new weekend discount" value={postTopic} onChange={(e) => setPostTopic(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full bg-theme-accent text-theme-bg font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50" disabled={isGeneratingPost}>
                            {isGeneratingPost ? 'Generating Post...' : 'Generate Post & Image Prompt'}
                        </button>
                    </form>
                    {generatedPost && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 border-t border-white/10 pt-4 space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-400">AI Generated Caption:</h4>
                            <p className="mt-2 text-gray-300 whitespace-pre-wrap">{generatedPost.caption}</p>
                        </div>
                        {Array.isArray(generatedPost.hashtags) && generatedPost.hashtags.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-gray-400">Suggested Hashtags:</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {generatedPost.hashtags.map((tag, idx) => ( <span key={idx} className="bg-white/10 text-sm text-gray-300 px-2 py-1 rounded">{tag}</span> ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <button onClick={handleGenerateImage} className="w-full bg-theme-ok/80 text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:bg-theme-ok disabled:opacity-50" disabled={isGeneratingImage}>
                                {isGeneratingImage ? 'Generating Image...' : 'Generate Image'}
                            </button>
                        </div>
                        {isGeneratingImage && <p className="text-center text-gray-400 animate-pulse">Generating your image, please wait...</p>}
                        {generatedImage && ( <div className="mt-4">
                            <h4 className="font-semibold text-gray-400">AI Generated Image:</h4>
                            <img src={generatedImage} alt="AI generated content" className="mt-2 rounded-lg w-full" />
                        </div>)}
                    </motion.div>}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ContentStudio;

