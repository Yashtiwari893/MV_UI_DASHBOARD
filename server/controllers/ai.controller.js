const { GoogleGenerativeAI } = require("@google/generative-ai");

// API Key ke sath Gemini client ko initialize karein
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateReply = async (req, res) => {
    try {
        // Frontend se review ka text lena
        const { reviewText, businessName } = req.body;

        if (!reviewText || !businessName) {
            return res.status(400).json({ message: "Review text and business name are required." });
        }

        // Gemini model ko select karein
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // AI ko instruction (prompt) dena
        const prompt = `You are a professional and friendly social media manager for a business named "${businessName}". A customer left the following review: "${reviewText}". 
        Write a positive, appreciative, and SEO-friendly reply to this review in under 50 words. Thank the customer and mention the business name.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiReply = response.text();

        res.status(200).json({ reply: aiReply });

    } catch (error) {
        console.error("Error generating AI reply:", error);
        res.status(500).json({ message: "Failed to generate AI reply." });
    }
};
const generateSocialPost = async (req, res) => {
    try {
        const { topic, businessName } = req.body;

        if (!topic || !businessName) {
            return res.status(400).json({ message: "Topic and business name are required." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an expert social media copywriter for a business named "${businessName}". 
        Create a captivating social media post about "${topic}". The post should be engaging, under 100 words, and include 3-5 relevant, trending hashtags.
        The response should be in a JSON format with two keys: "caption" and "hashtags" (where hashtags is an array of strings). For example: {"caption": "Your post here...", "hashtags": ["#example1", "#example2"]}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponseText = response.text();

        // Clean up the response to make sure it's valid JSON
        const jsonString = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiPost = JSON.parse(jsonString);

        res.status(200).json(aiPost);

    } catch (error) {
        console.error("Error generating AI post:", error);
        res.status(500).json({ message: "Failed to generate AI post." });
    }
};

module.exports = { generateReply, generateSocialPost };
