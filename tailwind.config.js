/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nvidia: '#76B900',
        cyber: {
          dark: '#0a0e27',
          darker: '#050813',
          blue: '#00d4ff',
          purple: '#b900ff',
          pink: '#ff006e',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(118, 185, 0, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(118, 185, 0, 0.8)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
