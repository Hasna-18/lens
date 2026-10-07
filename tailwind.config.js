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
        cyan: {
          400: '#38bdf8',
          500: '#06b6d4',
        },
        sky: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0a192f',
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
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.35)',
        'glow-blue': '0 0 25px rgba(2, 132, 199, 0.35)',
        'glow-purple': '0 0 25px rgba(139, 92, 246, 0.35)',
        'glass': '0 16px 40px 0 rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
};
