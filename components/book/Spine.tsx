'use client';

import React from 'react';

interface SpineProps {
  isOpen: boolean;
}

export const Spine: React.FC<SpineProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-y-0 left-1/2 -ml-3 w-6 pointer-events-none z-30 flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Central Book Spine Crease & Dynamic Shadow */}
      <div className="w-full h-full bg-gradient-to-r from-black/25 via-black/10 to-transparent shadow-inner" />
      <div className="absolute inset-y-2 w-0.5 bg-black/30" />
    </div>
  );
};
