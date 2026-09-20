/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cohere Core Palette Tokens
        cohere: {
          ink: '#17171c',          // Near-black primary
          text: '#212121',         // Primary body text
          canvas: '#fbfbfa',       // Warm crisp canvas
          stone: '#eeece7',        // Soft stone card surface
          sand: '#f5f4f0',         // Subtle background section
          slate: '#75758a',        // Secondary meta text
          subtle: '#93939f',       // Muted slate
          coral: '#ff7759',        // Signature brand warm accent
          green: '#003c33',        // Deep enterprise green
          teal: '#00a389',         // Vibrant teal indicator
          blue: '#1863dc',         // Action blue
          dark: '#0d1117',         // Deep dark product surface
          darkcard: '#121721',     // Deep console card
          darkborder: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(0, 0, 0, 0.08)',
        },
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        accent2: 'var(--accent2)',
        green: 'var(--green)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        text: 'var(--text)',
        'text-sub': 'var(--text-sub)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        cohere: '18px',
      },
    },
  },
  plugins: [],
}
