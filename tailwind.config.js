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
          navy: '#0B1924',       // Deep Alpine Slate (dark hero/footer surface)
          navySoft: '#122636',   // Elevated dark card surface
          sky: '#0284C7',        // Accessible Sky Cyan (matches logo MounTech cyan)
          skyBright: '#2EB6E0',  // Exact Logo Mountain/MounTech Cyan
          skyDark: '#0369A1',    // Hover / AA contrast Sky
          green: '#15803D',      // Evergreen Pine (matches logo Solution/trees green)
          greenBright: '#22C55E',// Highlight Pine on dark surfaces
          ice: '#F0F9FF',        // Light Glacial Sky tint
          mint: '#F0FDF4',       // Soft Evergreen tint
          canvas: '#F8FAFC',     // Crisp off-white page canvas
          surface: '#FFFFFF',    // Pure white card surface
          ink: '#0F1E2E',        // Primary text
          muted: '#5A6D7E',      // Secondary text
          border: '#E2E8F0',     // Subtle hairline border
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
        'subtle': '0 1px 2px 0 rgba(11, 25, 36, 0.04)',
        'elevated': '0 12px 32px -8px rgba(11, 25, 36, 0.08), 0 4px 12px -4px rgba(11, 25, 36, 0.04)',
        'glow-brand': '0 10px 30px -10px rgba(2, 132, 199, 0.35)',
      },
    },
  },
  plugins: [],
}
