import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'full' | 'mark' | 'monochrome' | 'default';
  className?: string;
  animated?: boolean;
}

export default function Logo({ 
  size = 32, 
  showText = false, 
  variant = 'full',
  className = '',
  animated = false 
}: LogoProps) {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
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
          {/* Primary Himalayan Peak Gradient (Cyan-Blue) */}
          <linearGradient id={`summit-main-${uniqueId}`} x1="32" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Secondary Peak Gradient (Violet-Indigo) */}
          <linearGradient id={`summit-sec-${uniqueId}`} x1="16" y1="22" x2="32" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>

          {/* Facet Shading Gradient */}
          <linearGradient id={`facet-light-${uniqueId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          {/* Glowing Apex Node */}
          <radialGradient id={`apex-glow-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Base Grid Gradient */}
          <linearGradient id={`base-line-${uniqueId}`} x1="4" y1="54" x2="60" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ── BASE FOUNDATION GRID & CIRCUIT RUNNERS ── */}
        <g opacity="0.85">
          {/* Ground telemetry plane line */}
          <line x1="6" y1="54" x2="58" y2="54" stroke={`url(#base-line-${uniqueId})`} strokeWidth="1.75" strokeLinecap="round" />
          
          {/* Circuit nodes on base line */}
          <circle cx="10" cy="54" r="1.5" fill="#34d399" />
          <circle cx="32" cy="54" r="2" fill="#60a5fa" />
          <circle cx="54" cy="54" r="1.5" fill="#a78bfa" />

          {/* Subtle vertical telemetry drops */}
          <line x1="18" y1="54" x2="18" y2="58" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="46" y1="54" x2="46" y2="58" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>

        {/* ── SECONDARY MOUNTAIN PEAK (West Ridge) ── */}
        {/* Shadow facet */}
        <polygon 
          points="8,54 20,24 28,40 18,54" 
          fill={`url(#summit-sec-${uniqueId})`} 
          opacity="0.85" 
        />
        {/* Light facet */}
        <polygon 
          points="20,24 28,40 32,54 20,54" 
          fill={`url(#summit-sec-${uniqueId})`} 
          opacity="0.95" 
        />
        {/* Geometric light sheen */}
        <polygon 
          points="20,24 28,40 20,54" 
          fill={`url(#facet-light-${uniqueId})`} 
        />
        {/* Secondary Peak Snowcap / Precision Ridge */}
        <polyline 
          points="16,33 20,24 24,31" 
          stroke="#ffffff" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* ── PRIMARY HIMALAYAN APEX PEAK (Central High Summit) ── */}
        {/* Shadow facet (Left side of high peak) */}
        <polygon 
          points="24,44 42,12 32,54 20,54" 
          fill="rgba(15, 23, 42, 0.75)" 
        />
        {/* Main eastern illuminated flank */}
        <polygon 
          points="42,12 56,54 32,54" 
          fill={`url(#summit-main-${uniqueId})`} 
        />
        {/* High-contrast crystalline facet */}
        <polygon 
          points="42,12 32,54 39,36" 
          fill={`url(#facet-light-${uniqueId})`} 
        />

        {/* Apex Summit Snowcap */}
        <path 
          d="M37 22L42 12L47 23.5L42.5 20.5L39.5 23.5Z" 
          fill="#ffffff" 
        />
        <polyline 
          points="36,24 42,12 48,24" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* ── CYBER CIRCUIT DATA CONDUITS (Overlaid on Slopes) ── */}
        <path 
          d="M20 24L32 40L42 12" 
          stroke="#38bdf8" 
          strokeWidth="1.2" 
          strokeDasharray="2 2" 
          opacity="0.8" 
        />
        <path 
          d="M42 12L49 32L39 46L32 54" 
          stroke="#34d399" 
          strokeWidth="1.2" 
          strokeDasharray="2 1.5" 
          opacity="0.85" 
        />

        {/* ── APEX BEACON (Summiting AI Node) ── */}
        <circle 
          cx="42" 
          cy="12" 
          r="4.5" 
          fill={`url(#apex-glow-${uniqueId})`} 
          className={animated ? 'animate-pulse' : ''} 
        />
        <circle cx="42" cy="12" r="1.75" fill="#ffffff" />

        {/* ── EMBEDDED BINARY TELEMETRY MATRIX ── */}
        <g fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="4.5" letterSpacing="0">
          <text x="44" y="8" fill="#38bdf8" opacity="0.95">1</text>
          <text x="34" y="9" fill="#a78bfa" opacity="0.8">0</text>
          <text x="26" y="16" fill="#34d399" opacity="0.85">1</text>
          <text x="50" y="20" fill="#60a5fa" opacity="0.75">0</text>
          <text x="12" y="32" fill="#94a3b8" opacity="0.6">0</text>
          <text x="53" y="42" fill="#38bdf8" opacity="0.8">1</text>
        </g>
      </svg>

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
            <span className="text-base sm:text-lg font-extrabold tracking-[-0.03em]">MOUNTECH</span>
            <span className="text-accent text-sm font-semibold tracking-wider font-mono">SOLUTION</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
            Sovereign AI & IT Architecture
          </span>
        </div>
      )}
    </div>
  );
}
