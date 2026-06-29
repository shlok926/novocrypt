import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        qs: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          dark: '#0F172A',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          orange: '#F59E0B',
          red: '#EF4444',
          green: '#10B981',
          text: '#1E293B',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #0F172A, #1E3A8A)',
        'quantum-gradient': 'linear-gradient(to right, #9333EA, #2563EB)',
      },
    },
  },
  plugins: [],
} satisfies Config;
