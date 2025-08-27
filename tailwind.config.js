module.exports = {
  darkMode: 'class', // Enables class-based dark mode (✅ correct)
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Watches all files inside src folder (✅ standard)
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',     // ✅ custom animation class
        'slide-up': 'slideUp 0.6s ease-out forwards',   // ✅ custom animation class
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [], // ✅ No additional plugins
};
