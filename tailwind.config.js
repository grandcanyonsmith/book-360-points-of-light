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
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        spiritual: {
          gold: '#FFD700',
          'gold-light': '#FFF3C4',
          'gold-dark': '#B8860B',
          light: '#FFF9E6',
          peace: '#E6F3FF',
          'peace-dark': '#B8D4E8',
          faith: '#4A90E2',
          'faith-light': '#7BAFF2',
          'faith-dark': '#2E5C8A',
          hope: '#87CEEB',
          'hope-light': '#B8E3F5',
          love: '#FF6B6B',
          'love-light': '#FF9999',
          wisdom: '#6B5B95',
          'wisdom-light': '#9B8BC5',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        script: ['Dancing Script', 'cursive'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        '7xl': '5rem',
        '8xl': '6rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'rotate-slow': 'rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-center': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 215, 0, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 215, 0, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(255, 215, 0, 0.3)',
      },
    },
  },
  plugins: [],
} 