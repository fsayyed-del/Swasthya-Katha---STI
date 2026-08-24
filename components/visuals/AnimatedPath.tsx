'use client';

import React from 'react';
import { usePrefersReducedMotion } from './MotionPreference';

interface AnimatedPathProps {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  animated?: boolean;
  opacity?: number;
  className?: string;
}

export const AnimatedPath: React.FC<AnimatedPathProps> = ({
  d,
  stroke = '#0D9488',
  strokeWidth = 3,
  strokeDasharray = '8 6',
  animated = true,
  opacity = 0.8,
  className = '',
}) => {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeLinecap="round"
      opacity={opacity}
      className={`${animated && !prefersReduced ? 'animate-pulse-slow' : ''} ${className}`}
    />
  );
};
