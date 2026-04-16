import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/5 border border-white/10
        shadow-[0_4px_24px_0_rgba(0,0,0,0.4)]
        transition-all duration-300
        ${hover ? 'hover:bg-white/8 hover:border-white/15 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
