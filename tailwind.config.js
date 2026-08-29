/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36abf7',
          500: '#0c8ee9',
          600: '#0070c7',
          700: '#0159a1',
          800: '#064c84',
          900: '#0b3f6e',
          950: '#072849',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        kpm: {
          blue: '#0B3B8B',
          red: '#D32F2F',
          yellow: '#FFD700',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      }
    },
  },
  plugins: [],
};
