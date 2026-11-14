/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070E17',
        navy: '#0D1B2A',
        depth: '#1B263B',
        steel: '#415A77',
        sage: '#778D7A',
        sand: '#D4C4A8',
        cream: '#F4F1DE',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(212, 196, 168, 0.35)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -5%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-4%, 4%, 0) scale(0.96)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.85' },
        },
        wingBeat: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-2.2deg)' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        shimmer: 'shimmer 14s ease infinite',
        'spin-slow': 'spinSlow 46s linear infinite',
        'spin-slower': 'spinSlow 90s linear infinite reverse',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'wing-beat': 'wingBeat 5.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
