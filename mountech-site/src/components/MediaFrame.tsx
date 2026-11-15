import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  title?: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  darkFallback?: boolean;
}

export default function MediaFrame({
  src,
  alt,
  title,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  eager = false,
  darkFallback = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${
        darkFallback ? 'bg-[#0B1924]' : 'bg-[#F0F9FF]'
      } ${className}`}
    >
      {hasError ? (
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${
            darkFallback
              ? 'bg-gradient-to-br from-[#0B1924] via-[#122636] to-[#0E3A47] text-[#F8FAFC]'
              : 'bg-gradient-to-br from-[#F0F9FF] via-white to-[#ECFDF5] text-[#0F1E2E]'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${
              darkFallback
                ? 'bg-white/5 border-white/10 text-[#2EB6E0]'
                : 'bg-white border-[#E2E8F0] text-[#0284C7]'
            }`}
          >
            <Cpu size={22} />
          </div>
          <span className="text-xs font-medium tracking-tight max-w-xs">
            {title || alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
