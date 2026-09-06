import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'full' | 'mark' | 'monochrome' | 'dark' | 'default';
  className?: string;
  animated?: boolean;
  theme?: 'light' | 'dark';
}

export default function Logo({ 
  size = 32, 
  showText = false, 
  variant = 'full',
  className = '',
  animated = false,
  theme = 'light'
}: LogoProps) {
  const uniqueId = React.useId().replace(/:/g, '');

  const isDark = theme === 'dark' || variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* ── COHERE-INSPIRED GEOMETRIC SUMMIT PETAL EMBLEM ── */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="MounTech Solution Logo"
      >
        <defs>
          {/* Subtle Voronoi-gradient transitions */}
          <linearGradient id={`${uniqueId}-peak`} x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#17171c" />
            <stop offset="55%" stopColor="#2c2c38" />
            <stop offset="100%" stopColor="#ff7759" />
          </linearGradient>

          <linearGradient id={`${uniqueId}-accent`} x1="32" y1="14" x2="52" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff7759" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <linearGradient id={`${uniqueId}-cyan`} x1="12" y1="24" x2="32" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00a389" />
            <stop offset="100%" stopColor="#1863dc" />
          </linearGradient>
        </defs>

        {/* Outer Grounding Axis */}
        <circle 
          cx="32" 
          cy="32" 
          r="30" 
          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"} 
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Facet 01: Left Geo Ridge (Teal-to-Indigo Conduit) */}
        <path
          d="M 12 48 L 26 22 L 32 32 L 20 48 Z"
          fill={isDark ? "#00a389" : `url(#${uniqueId}-cyan)`}
          className={animated ? "transition-transform duration-500 hover:scale-105" : ""}
          opacity={isDark ? "0.9" : "0.95"}
        />

        {/* Facet 02: Central High-Altitude Apex Summit (Cohere Ink / Near-Black) */}
        <path
          d="M 32 12 L 44 48 L 32 40 L 22 48 Z"
          fill={isDark ? "#ffffff" : "#17171c"}
          className={animated ? "transition-transform duration-500 hover:-translate-y-0.5" : ""}
        />

        {/* Facet 03: Right Sovereign Slope (Coral Warmth) */}
        <path
          d="M 32 12 L 52 48 L 40 48 Z"
          fill={`url(#${uniqueId}-accent)`}
          opacity="0.95"
        />

        {/* Micro Telemetry Horizon Nodes */}
        <circle cx="32" cy="12" r="2.5" fill="#ff7759" />
        <circle cx="12" cy="48" r="1.5" fill={isDark ? "#ffffff" : "#17171c"} />
        <circle cx="52" cy="48" r="1.5" fill={isDark ? "#ffffff" : "#17171c"} />
      </svg>

      {/* ── COHERE-STYLE TYPOGRAPHY LOCKUP ── */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-display text-base font-extrabold tracking-[-0.03em] ${
              isDark ? 'text-white' : 'text-cohere-ink'
            }`}>
              MOUNTECH
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cohere-coral inline-block" />
          </div>
          <span className={`font-mono text-[9px] uppercase tracking-[0.2em] mt-0.5 ${
            isDark ? 'text-white/50' : 'text-cohere-slate'
          }`}>
            SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
}
