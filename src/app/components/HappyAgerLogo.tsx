import React from 'react';
import Ebene1 from '../../imports/Ebene1';

interface HappyAgerLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HappyAgerLogo({ size = 'md', className = '' }: HappyAgerLogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  return (
    <div className={`${sizes[size]} ${className}`} style={{ aspectRatio: '363.79 / 111.09' }}>
      <Ebene1 />
    </div>
  );
}