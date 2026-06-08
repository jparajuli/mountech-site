import React from 'react';

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* ── BACKGROUND DEFINITIONS & MATRICES ── */}
      <defs>
        {/* Subtle glowing gradients for internal mountain data trails */}
        <linearGradient id="mountain-glow-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--accent-dim)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="mountain-glow-right" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── FLOATING BINARY MATRIX CLOUD (As per GN0DL.jpg apex layout) ── */}
      <g id="binary-cloud" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="5" letterSpacing="0">
        {/* Top Tier */}
        <text x="30" y="7" fill="#ffffff">0</text>
        
        {/* Second Tier */}
        <text x="25" y="13" fill="#ffffff" opacity="0.9">1</text>
        <text x="35" y="13" fill="var(--accent)" opacity="0.95">0</text>
        
        {/* Third Tier */}
        <text x="20" y="19" fill="#ffffff" opacity="0.8">0</text>
        <text x="29" y="19" fill="var(--green)">1</text>
        <text x="39" y="19" fill="#ffffff" opacity="0.85">0</text>
        
        {/* Fourth Tier / Base of Cloud */}
        <text x="14" y="25" fill="var(--text-muted)">1</text>
        <text x="23" y="25" fill="var(--accent2)">0</text>
        <text x="33" y="25" fill="#ffffff" opacity="0.9">1</text>
        <text x="43" y="25" fill="var(--green)">0</text>
        <text x="50" y="25" fill="var(--text-muted)">1</text>
      </g>

      {/* ── ISOMETRIC TECH MOUNTAIN PEAKS ── */}
      <g id="mountain-range" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Internal Matrix Tech Shading Lines (Left Slope Textures) */}
        <path d="M12 48L24 34M16 51L30 35M8 45L18 34" stroke="url(#mountain-glow-left)" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
        
        {/* Internal Matrix Tech Shading Lines (Center Facet Textures) */}
        <path d="M32 26V54M26 33L32 40M38 33L32 40M22 41L32 52M42 41L32 52" stroke="url(#mountain-glow-right)" strokeWidth="1.2" opacity="0.7" />
        
        {/* Main Base Mountain Backplanes */}
        <path 
          d="M6 54L22 32L32 44L48 28L58 54" 
          stroke="rgba(255, 255, 255, 0.15)" 
          strokeWidth="1.5" 
          fill="rgba(13, 17, 23, 0.3)"
        />

        {/* Deep Embedded Cyber Geometric Tracks (glowing data circuits) */}
        <path d="M22 32L32 44" stroke="var(--green)" strokeWidth="1.5" opacity="0.8" />
        <path d="M48 28L32 44" stroke="var(--accent)" strokeWidth="2" />
        <path d="M6 54L22 32" stroke="var(--accent2)" strokeWidth="1.5" />

        {/* High-Contrast Silver/White Ridge Caps (Reflecting the bright snowcaps in image) */}
        <path 
          d="M18 37.5L22 32L24.5 35" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
        />
        <path 
          d="M44 32L48 28L51.5 33.5" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
        />
        
        {/* Ground Terminal Plane Line */}
        <line x1="4" y1="54" x2="60" y2="54" stroke="var(--border)" strokeWidth="2" />
      </g>

      {/* Embedded Micro Binary Data Flags on Slopes */}
      <text x="13" y="43" fill="var(--green)" fontSize="3.5" fontFamily="monospace" fontWeight="600" opacity="0.7">1</text>
      <text x="47" y="42" fill="var(--accent)" fontSize="3.5" fontFamily="monospace" fontWeight="600" opacity="0.7">0</text>
      <text x="35" y="49" fill="var(--accent2)" fontSize="3.5" fontFamily="monospace" fontWeight="600" opacity="0.6">1</text>
    </svg>
  );
}
