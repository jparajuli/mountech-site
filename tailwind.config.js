/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mt: {
          navy: '#101828',
          navySoft: '#182235',
          blue: '#2563EB',
          blueDark: '#1D4ED8',
          cyan: '#22D3EE',
          indigo: '#6366F1',
          ice: '#EFF6FF',
          canvas: '#F8FAFC',
          surface: '#FFFFFF',
          ink: '#172033',
          muted: '#64748B',
          border: '#E2E8F0',
        },
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        accent2: 'var(--accent2)',
        green: 'var(--green)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-sub': 'var(--text-sub)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Manrope"', '-apple-system', 'sans-serif'],
        display: ['"Manrope"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(16, 24, 40, 0.04)',
        'elevated': '0 12px 32px -8px rgba(16, 24, 40, 0.08), 0 4px 12px -4px rgba(16, 24, 40, 0.04)',
        'glow-blue': '0 10px 30px -10px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [],
}
