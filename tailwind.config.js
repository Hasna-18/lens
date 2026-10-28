/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        primary: {
          DEFAULT: '#009ab1',
          50: '#f0fafb',
          100: '#dcf3f6',
          200: '#bce8ee',
          300: '#8ed6e0',
          400: '#4fbacb',
          500: '#009ab1',
          600: '#009ab1',
          700: '#008397',
          800: '#006a7b',
          900: '#005462',
          950: '#002f38',
        },
        cyan: {
          300: '#8ed6e0',
          400: '#4fbacb',
          500: '#009ab1',
          600: '#008397',
        },
        sky: {
          50: '#f0fafb',
          100: '#dcf3f6',
          200: '#bce8ee',
          300: '#8ed6e0',
          400: '#4fbacb',
          500: '#009ab1',
          600: '#009ab1',
          700: '#008397',
          800: '#006a7b',
          900: '#005462',
          950: '#002f38',
        },
        blue: {
          50: '#f0fafb',
          100: '#dcf3f6',
          200: '#bce8ee',
          300: '#8ed6e0',
          400: '#4fbacb',
          500: '#009ab1',
          600: '#009ab1',
          700: '#008397',
          800: '#006a7b',
          900: '#005462',
          950: '#002f38',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        pink: {
          500: '#ec4899',
        },
        dark: {
          950: '#030712',
          900: '#080e1a',
          800: '#0d1829',
          700: '#13233c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 154, 177, 0.35)',
        'glow-blue': '0 0 25px rgba(0, 154, 177, 0.35)',
        'glow-purple': '0 0 25px rgba(139, 92, 246, 0.35)',
        'glass': '0 16px 40px 0 rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
};
