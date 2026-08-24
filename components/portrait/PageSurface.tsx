'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { ChapterHue } from '@/content/portrait-pages/portrait-manifest';
import { SoundButton } from './SoundButton';

interface PageSurfaceProps {
  pageNumber: number;
  chapterHue?: ChapterHue;
  audioScriptText: string;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
}

export const PageSurface: React.FC<PageSurfaceProps> = ({
  pageNumber,
  chapterHue,
  audioScriptText,
  locale,
  children,
  className = '',
}) => {
  const getChapterEdgeClass = () => {
    switch (chapterHue) {
      case 'mineral-green':
        return 'chapter-edge-green';
      case 'coral':
        return 'chapter-edge-coral';
      case 'care-blue':
        return 'chapter-edge-blue';
      default:
        return '';
    }
  };

  return (
    <div
      className={`page-surface deckle-edge relative w-full h-full p-3 sm:p-4 md:p-5 flex flex-col justify-between select-none overflow-hidden ${getChapterEdgeClass()} ${className}`}
      style={{
        backgroundColor: 'var(--paper)',
      }}
    >
      {/* SVG feTurbulence Paper Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
        <svg className="w-full h-full">
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-grain)" />
        </svg>
      </div>

      {/* Main Page Content Body - Compact Flex Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between overflow-hidden my-auto py-1 space-y-2">
        {children}
      </div>

      {/* Bottom Folio & Sound Button Bar */}
      <div className="relative z-20 pt-1.5 border-t border-brass/30 flex items-center justify-between mt-auto shrink-0">
        {/* Folio Numeral in Brass (Fraunces) */}
        <div className="font-display font-black text-xs sm:text-sm text-brass tracking-wider">
          {pageNumber > 0 ? `Page 0${pageNumber}` : ''}
        </div>

        {/* Floating Brass Sound Button */}
        <SoundButton textToSpeak={audioScriptText} locale={locale} />
      </div>
    </div>
  );
};
