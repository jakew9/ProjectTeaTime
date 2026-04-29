/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#062c16',
        'water-blue': '#1a4a5e',
        'white-tea': '#f5ebe0',
        'green-tea': '#a7c4a0',
        'oolong': '#d4a574',
        'black-tea': '#3d2c2c',
        'herbal': '#c9a7c7',
        'cream': '#faf8f5',
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'Georgia', 'serif'],
        'body': ['Lora', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'fill-bar': 'fill-bar 3s ease-out forwards',
        'water-rise': 'water-rise 1.5s ease-out forwards',
        'water-drain': 'water-drain 1s ease-in forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'fill-bar': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'water-rise': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'water-drain': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
