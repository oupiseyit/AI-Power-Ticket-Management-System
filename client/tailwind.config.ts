import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        glass: {
          bg: '#0f172a',
          text: '#e2e8f0',
          secondary: '#94a3b8',
          muted: '#475569',
          accent: '#38bdf8',
          accentDark: '#0ea5e9',
          red: '#ef4444',
          redTint: 'rgba(239,68,68,0.12)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
