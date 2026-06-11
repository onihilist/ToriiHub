/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#1f1f1f',
        accent: {
          DEFAULT: '#8b5cf6', // violet-500
          hover: '#a78bfa', // purple-400
        },
        text: {
          primary: '#f0f0f0',
          secondary: '#6b7280',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
