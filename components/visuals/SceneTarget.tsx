'use client';

import React from 'react';

interface SceneTargetProps {
  id: string;
  isActive?: boolean;
  onClick?: () => void;
  tabIndex?: number;
  role?: string;
  'aria-label'?: string;
  children: React.ReactNode;
  transform?: string;
  className?: string;
}

export const SceneTarget: React.FC<SceneTargetProps> = ({
  id,
  isActive = false,
  onClick,
  tabIndex = 0,
  role = 'button',
  'aria-label': ariaLabel,
  children,
  transform,
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <g
      id={id}
      data-target={id}
      data-active={isActive}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      transform={transform}
      className={`scene-target cursor-pointer transition-all duration-300 outline-none ${
        isActive ? 'active-target ring-2 ring-amber-400' : 'hover:opacity-90'
      } ${className}`}
      style={{
        transformOrigin: 'center center',
      }}
    >
      {/* Active Glowing Outline Indicator */}
      {isActive && (
        <circle
          cx="0"
          cy="0"
          r="48"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeDasharray="6 4"
          className="animate-spin-slow opacity-80"
        />
      )}

      {children}
    </g>
  );
};
