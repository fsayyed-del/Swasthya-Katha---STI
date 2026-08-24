'use client';

import React from 'react';

interface IconLabelProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  tintColor?: 'mineral-green' | 'coral' | 'care-blue' | 'teal' | 'brass';
  onClick?: () => void;
  className?: string;
}

export const IconLabel: React.FC<IconLabelProps> = ({
  icon,
  label,
  sublabel,
  tintColor = 'teal',
  onClick,
  className = '',
}) => {
  const getTintClasses = () => {
    switch (tintColor) {
      case 'mineral-green':
        return 'bg-mineral-green/15 text-mineral-green-dark border-mineral-green/30 hover:bg-mineral-green/25';
      case 'coral':
        return 'bg-coral/15 text-coral-dark border-coral/30 hover:bg-coral/25';
      case 'care-blue':
        return 'bg-care-blue/15 text-care-blue-dark border-care-blue/30 hover:bg-care-blue/25';
      case 'brass':
        return 'bg-brass/15 text-brass-dark border-brass/30 hover:bg-brass/25';
      default:
        return 'bg-ink-teal/10 text-ink-teal border-ink-teal/20 hover:bg-ink-teal/15';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center select-none ${getTintClasses()} ${
        onClick ? 'cursor-pointer active:scale-95 shadow-sm' : ''
      } ${className}`}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 shrink-0">
        {icon}
      </div>
      <span className="font-semibold text-base sm:text-[17px] text-ink leading-snug">
        {label}
      </span>
      {sublabel && (
        <span className="text-xs sm:text-sm text-ink-muted mt-0.5 font-medium leading-tight">
          {sublabel}
        </span>
      )}
    </div>
  );
};
