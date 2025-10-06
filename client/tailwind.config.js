/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Naye colors add kar rahe hain
      colors: {
        // Background colors (dark shades)
        'dark-bg': '#0F172A', // Main background (Slate 900 se bhi dark)
        'dark-card': '#1E293B', // Cards background (Slate 800 se bhi dark)
        'dark-border': '#334155', // Borders (Slate 700)

        // Primary/Accent colors (jo neon effect ke liye use honge)
        'primary-blue': '#6366F1', // Indigo 500
        'primary-purple': '#8B5CF6', // Violet 500
        'accent-green': '#22C55E', // Green 500 (graphs ke liye)
        'accent-red': '#EF4444', // Red 500
      },
      // Custom shadow (glow) effect
      boxShadow: {
        'neon-sm': '0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3)', // Primary blue glow
        'neon-md': '0 0 15px rgba(99, 102, 241, 0.6), 0 0 25px rgba(99, 102, 241, 0.4)',
      },
      // Custom font family
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Google Fonts se Inter font use karenge
        // Agar koi aur font chahiye to yahan add kar sakte hain
      },
    },
  },
  plugins: [],
}