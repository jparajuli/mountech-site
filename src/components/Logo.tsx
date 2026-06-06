import React from 'react';

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Cryptographic Hexagonal Boundary */}
      <polygon 
        points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" 
        stroke="rgba(255, 255, 255, 0.15)" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      
      {/* Sub-Peak (AI & Code Layers) */}
      <path 
        d="M6 22.5L13.5 12L19 19.5" 
        stroke="var(--accent2)" 
        strokeWidth="2" 
        strokeLinejoin="round" 
        strokeLinecap="round" 
      />
      
      {/* Primary Peak (Infrastructure Foundations) */}
      <path 
        d="M11 23L18.5 7.5L26.5 19.5" 
        stroke="var(--accent)" 
        strokeWidth="2" 
        strokeLinejoin="round" 
        strokeLinecap="round" 
      />
      
      {/* Data Transmission Grid Line */}
      <line 
        x1="18.5" 
        y1="7.5" 
        x2="18.5" 
        y2="2.5" 
        stroke="var(--green)" 
        strokeWidth="1.5" 
        strokeDasharray="2 2" 
      />
      
      {/* The Summit Node */}
      <circle 
        cx="18.5" 
        cy="7.5" 
        r="2" 
        fill="var(--green)" 
      />
    </svg>
  );
}
