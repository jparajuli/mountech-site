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
  size = 48,
  className = '',
  animated = false,
  theme = 'light',
  variant = 'full'
}: LogoProps) {
  const isDark = theme === 'dark' || variant === 'dark';

  return (
    <div
      className={`inline-flex items-center select-none ${
        isDark ? 'bg-white rounded-xl px-2.5 py-1 shadow-sm' : ''
      } ${className}`}
    >
      <img
        src="/assets/aistudio/1logo_ab98d74c.jpg"
        alt="MounTech Solution"
        style={{ height: `${size}px`, width: 'auto' }}
        className={`object-contain flex-shrink-0 ${
          isDark ? '' : 'mix-blend-multiply'
        } ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}
      />
    </div>
  );
}
