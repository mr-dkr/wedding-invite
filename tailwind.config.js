/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#fffbf7',
          100: '#faf8f3',
          200: '#f5f1ed',
        },
        gold: {
          50: '#fef9f0',
          300: '#f4d09e',
          400: '#e8c547',
          500: '#d4af37',
          600: '#b8943d',
          700: '#9c7a34',
        },
      },
      keyframes: {
        'welcome-marquee': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'welcome-marquee': 'welcome-marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
