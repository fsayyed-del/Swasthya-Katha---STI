'use client';

import React from 'react';

interface BookShadowProps {
  isOpen: boolean;
  isDragging?: boolean;
}

export const BookShadow: React.FC<BookShadowProps> = ({ isOpen, isDragging }) => {
  return (
    <div
      className={`absolute -inset-4 -bottom-8 rounded-[40px] pointer-events-none transition-all duration-500 z-0 ${
        isOpen
          ? 'bg-gradient-to-t from-black/25 via-black/10 to-transparent blur-xl scale-100'
          : 'bg-gradient-to-t from-black/35 via-black/15 to-transparent blur-2xl max-w-[55%] ml-auto scale-95'
      } ${isDragging ? 'opacity-90' : 'opacity-75'}`}
      aria-hidden="true"
    />
  );
};
