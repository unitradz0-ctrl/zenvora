/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1B1147',
        violet: {
          DEFAULT: '#5B2EE5',
          2: '#7A55F5',
          soft: '#EFEBFF',
        },
        gold: {
          DEFAULT: '#FFB300',
          soft: '#FFF3D1',
        },
        teal: {
          DEFAULT: '#00A99D',
          soft: '#DDF6F3',
        },
        coral: {
          DEFAULT: '#FF5E57',
          soft: '#FFE6E4',
        },
        blue: {
          DEFAULT: '#2F80ED',
          soft: '#DCEBFF',
        },
        pink: '#E8408C',
        bg: '#F7F5FF',
        line: '#E6E1F7',
        mute: '#6D688C',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Avenir Next"', '"Nunito"', '"SF Pro Rounded"', 'ui-rounded', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['11.5px', { lineHeight: '1.4' }],
        'sm': ['12.5px', { lineHeight: '1.4' }],
        'base': ['15px', { lineHeight: '1.5' }],
        'md': ['16px', { lineHeight: '1.5' }],
        'lg': ['17px', { lineHeight: '1.4' }],
        'xl': ['19px', { lineHeight: '1.3' }],
        '2xl': ['20px', { lineHeight: '1.3' }],
        '3xl': ['22px', { lineHeight: '1.2' }],
        '4xl': ['24px', { lineHeight: '1.1' }],
        '5xl': ['25px', { lineHeight: '1.08' }],
        '6xl': ['28px', { lineHeight: '1.08' }],
        '7xl': ['30px', { lineHeight: '1.05' }],
        '8xl': ['34px', { lineHeight: '1.0' }],
        '9xl': ['38px', { lineHeight: '1.0' }],
        'tab': ['10.5px', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'sm': '8px',
        'DEFAULT': '14px',
        'md': '16px',
        'lg': '18px',
        'xl': '22px',
        '2xl': '24px',
        '3xl': '30px',
        'full': '9999px',
        'phone': '46px',
      },
      spacing: {
        'px-app': '18px',
        'safe': '26px',
      },
      backgroundImage: {
        'buyer-hero': 'linear-gradient(160deg, #1B1147, #3B1EA8 70%, #5B2EE5)',
        'splash': 'linear-gradient(165deg, #1B1147, #3B1EA8 60%, #5B2EE5)',
        'seller-hero': 'linear-gradient(160deg, #10083A, #24146B 70%, #3B1EA8)',
        'verified-success': 'linear-gradient(170deg, #0F7E77, #00A99D)',
        'wallet-card': 'linear-gradient(150deg, #24146B, #5B2EE5)',
        'seller-banner': 'linear-gradient(120deg, #5B2EE5, #E8408C)',
      },
      boxShadow: {
        'seg': '0 1px 3px rgba(0,0,0,0.12)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.25s ease-out',
        'fade-out': 'fade-out 0.3s ease-in forwards',
      }
    },
  },
  plugins: [],
}
