/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF2F9',
          100: '#D9E1F0',
          200: '#B3C2DF',
          300: '#8098C6',
          400: '#4E6BA5',
          500: '#2E4A80',
          600: '#22396A',
          700: '#1B2E54', // Primary Dark
          800: '#152442',
          900: '#0F1A30',
          950: '#0A1222',
        },
        amber: {
          50: '#FFF7ED',
          100: '#FFEDD6',
          200: '#FFD9AC',
          300: '#FFC178',
          400: '#FFAE4C',
          500: '#FF9B25', // Primary Accent
          600: '#F07C00',
          700: '#C25F03',
          800: '#9A4B0B',
          900: '#7C3F0D',
        },
        forest: {
          50: '#F0F7F2',
          100: '#DCEDE1',
          200: '#BBDBC6',
          300: '#8FC2A1',
          400: '#63A57B',
          500: '#478A58', // Highlight
          600: '#376E45',
          700: '#2C5738',
          800: '#25462F',
          900: '#1F3A28',
        },
        cloud: '#F6F8FC',
        lilac: '#EFEDFB',
        peach: '#FFF3E9',
        mint: '#EEF7F1',
        sky: '#EAF1FD',
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Nunito"', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        4.5: '1.125rem',
        13: '3.25rem',
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        blob: '42% 58% 60% 40% / 45% 40% 60% 55%',
      },
      boxShadow: {
        clay: '0 18px 40px -12px rgba(27,46,84,0.18), 0 4px 10px -4px rgba(27,46,84,0.10)',
        'clay-lg': '0 32px 70px -20px rgba(27,46,84,0.28), 0 8px 20px -8px rgba(27,46,84,0.12)',
        'clay-amber': '0 18px 40px -14px rgba(255,155,37,0.55)',
        'clay-navy': '0 18px 40px -14px rgba(27,46,84,0.45)',
        'inner-soft': 'inset 0 2px 6px rgba(255,255,255,0.75), inset 0 -4px 10px rgba(27,46,84,0.06)',
        ring: '0 0 0 1px rgba(27,46,84,0.06)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-22px) translateX(8px)' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.7)', opacity: '0.65' },
          '80%,100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '70%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        dash: { to: { strokeDashoffset: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        marquee: 'marquee 38s linear infinite',
        pulseRing: 'pulseRing 2.6s cubic-bezier(0.2,0.6,0.3,1) infinite',
        shimmer: 'shimmer 2.2s infinite',
        pop: 'pop 0.5s cubic-bezier(0.2,0.8,0.3,1) both',
      },
    },
  },
  plugins: [],
}
