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
        backdrop-blur-xl bg-white/40 border border-white/20 
        shadow-[0_8px_32px_0_rgba(45,89,83,0.15)]
        transition-all duration-300
        ${hover ? 'hover:bg-white/50 hover:shadow-[0_12px_40px_0_rgba(45,89,83,0.2)] hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
