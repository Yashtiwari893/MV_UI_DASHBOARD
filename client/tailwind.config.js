/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aapke reference project se custom colors
      colors: {
        'theme-bg': '#0b1020',
        'theme-card': '#121836',
        'theme-text': '#e7e9ee',
        'theme-muted': '#aab2c8',
        'theme-accent': '#64d2ff',
        'theme-ok': '#3ddc97',
        'theme-warn': '#ffd166',
        'theme-err': '#ef476f',
        'theme-ring': 'rgba(100,210,255,.35)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}