'use client';

import React from 'react';
import { usePrefersReducedMotion } from './MotionPreference';

interface LayerRevealProps {
  isRevealed: boolean;
  children: React.ReactNode;
  revealMode?: 'fade' | 'slide' | 'instant';
  className?: string;
}

export const LayerReveal: React.FC<LayerRevealProps> = ({
  isRevealed,
  children,
  revealMode = 'fade',
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced || revealMode === 'instant') {
    return isRevealed ? <g className={className}>{children}</g> : null;
  }

  return (
    <g
      className={`transition-all duration-500 ${
        isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      } ${className}`}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {children}
    </g>
  );
};
