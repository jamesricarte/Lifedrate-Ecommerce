/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translate(-50%, -50px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.5s ease',
        fadeOut: 'fadeOut 0.5s ease 2.5s forwards',
      },
      colors: {
        success: '#4caf50',
        error: '#f44336',
      },
    },
  },
  plugins: [],
}

