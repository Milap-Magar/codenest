/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      colors: {
        ink: {
          50: '#f5f7fb',
          100: '#e9edf6',
          200: '#cdd5e6',
          300: '#a3b0cd',
          400: '#6f7fa3',
          500: '#4a5876',
          600: '#323d57',
          700: '#222a3e',
          800: '#151a28',
          900: '#0b0f1a',
          950: '#050810',
        },
        brand: {
          50: '#ecfff4',
          100: '#d1fde4',
          200: '#a4f9ca',
          300: '#6cefa9',
          400: '#3ddd89',
          500: '#1ac271',
          600: '#0e9d5b',
          700: '#0d7c4b',
          800: '#0f623d',
          900: '#0e5034',
        },
        accent: {
          300: '#b9a4ff',
          400: '#9a82ff',
          500: '#7a57f5',
          600: '#5e3ddc',
          700: '#4a2bbf',
        },
        signal: {
          pink: '#ff5d8f',
          amber: '#ffb020',
          cyan: '#2dd4bf',
        },
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(10, 15, 30, 0.35)',
        lift: '0 24px 60px -20px rgba(10, 15, 30, 0.55), 0 2px 6px -2px rgba(10,15,30,0.4)',
        glow: '0 0 0 1px rgba(122, 87, 245, 0.25), 0 18px 50px -18px rgba(122, 87, 245, 0.65)',
        'glow-brand':
          '0 0 0 1px rgba(26, 194, 113, 0.25), 0 18px 50px -18px rgba(26, 194, 113, 0.55)',
        'inner-ring': 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 50% 0%, rgba(122,87,245,0.18), transparent 60%), linear-gradient(to bottom right, rgba(26,194,113,0.08), transparent 40%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'shine': 'shine 3.5s linear infinite',
        'pulse-soft': 'pulse-soft 3.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
        'caret': 'caret 1.1s steps(2) infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        caret: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
