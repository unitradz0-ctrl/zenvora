/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand
        primary: {
          DEFAULT: '#0A2463',
          light: '#1A3A8F',
          dark: '#061640',
        },
        accent: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#1D4ED8',
        },
        // Legacy tokens (keep for seller/admin screens)
        ink: '#0A2463',
        violet: {
          DEFAULT: '#3B82F6',
          2: '#60A5FA',
          soft: '#EFF6FF',
        },
        gold: {
          DEFAULT: '#F59E0B',
          soft: '#FEF3C7',
        },
        teal: {
          DEFAULT: '#00A99D',
          soft: '#DDF6F3',
        },
        coral: {
          DEFAULT: '#EF4444',
          soft: '#FEE2E2',
        },
        blue: {
          DEFAULT: '#3B82F6',
          soft: '#DBEAFE',
        },
        pink: '#EC4899',
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        line: '#E2E8F0',
        mute: '#64748B',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Inter"', '"Nunito"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['11.5px', { lineHeight: '1.4' }],
        'sm':   ['12.5px', { lineHeight: '1.4' }],
        'base': ['14px',   { lineHeight: '1.5' }],
        'md':   ['15px',   { lineHeight: '1.5' }],
        'lg':   ['16px',   { lineHeight: '1.4' }],
        'xl':   ['18px',   { lineHeight: '1.3' }],
        '2xl':  ['20px',   { lineHeight: '1.3' }],
        '3xl':  ['22px',   { lineHeight: '1.2' }],
        '4xl':  ['24px',   { lineHeight: '1.1' }],
        '5xl':  ['28px',   { lineHeight: '1.08' }],
        '6xl':  ['32px',   { lineHeight: '1.05' }],
        '7xl':  ['36px',   { lineHeight: '1.0' }],
        '8xl':  ['40px',   { lineHeight: '1.0' }],
        'tab':  ['10.5px', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'sm':    '6px',
        DEFAULT: '10px',
        'md':    '12px',
        'lg':    '16px',
        'xl':    '20px',
        '2xl':   '24px',
        '3xl':   '32px',
        'full':  '9999px',
      },
      backgroundImage: {
        'hero':          'linear-gradient(135deg, #0A2463 0%, #1A3A8F 60%, #2563EB 100%)',
        'hero-overlay':  'linear-gradient(180deg, rgba(10,36,99,0.85) 0%, rgba(10,36,99,0.6) 100%)',
        'nav-gradient':  'linear-gradient(90deg, #0A2463, #1E40AF)',
        'card-gradient': 'linear-gradient(135deg, #0A2463, #2563EB)',
        'seller-hero':   'linear-gradient(160deg, #0A2463, #1E40AF 70%, #3B82F6)',
        'wallet-card':   'linear-gradient(150deg, #0A2463, #2563EB)',
        'seller-banner': 'linear-gradient(120deg, #2563EB, #7C3AED)',
        'verified-success': 'linear-gradient(170deg, #0F7E77, #00A99D)',
        'splash':        'linear-gradient(165deg, #0A2463, #1E40AF 60%, #3B82F6)',
        'buyer-hero':    'linear-gradient(160deg, #0A2463, #1E40AF 70%, #3B82F6)',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'nav':  '0 2px 8px rgba(10,36,99,0.15)',
        'seg':  '0 1px 3px rgba(0,0,0,0.10)',
        'btn':  '0 4px 12px rgba(59,130,246,0.3)',
      },
      keyframes: {
        'slide-up': {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%':   { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'slide-up':  'slide-up 0.25s ease-out',
        'fade-in':   'fade-in 0.2s ease-out',
        'fade-out':  'fade-out 0.3s ease-in forwards',
      },
      spacing: {
        'px-app': '16px',
        'safe':   '24px',
      },
    },
  },
  plugins: [],
}
