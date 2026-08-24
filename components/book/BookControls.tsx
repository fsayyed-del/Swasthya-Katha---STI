'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';

interface BookControlsProps {
  currentLeafIndex: number;
  totalLeaves: number;
  locale: Locale;
}

export const BookControls: React.FC<BookControlsProps> = ({
  currentLeafIndex,
  totalLeaves,
  locale,
}) => {
  const getPageLabel = () => {
    if (currentLeafIndex === 0) {
      return locale === 'hi' ? '📖 मुखपृष्ठ (Cover)' : '📖 Front Cover';
    }
    if (currentLeafIndex >= totalLeaves - 1) {
      return locale === 'hi' ? '📖 अंतिम पृष्ठ (Back Cover)' : '📖 Back Cover';
    }
    return locale === 'hi'
      ? `पृष्ठ ${currentLeafIndex * 2} - ${currentLeafIndex * 2 + 1} / 14`
      : `Spread ${currentLeafIndex} of ${totalLeaves - 2}`;
  };

  return (
    <div className="flex items-center justify-between gap-4 select-none text-xs text-ink-muted px-2 py-1">
      {/* Spread Counter Pill */}
      <div className="px-3 py-1 bg-paper-deep/80 rounded-full font-bold text-ink border border-border shadow-sm text-[11px]">
        {getPageLabel()}
      </div>

      {/* Navigation Progress Dots */}
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: totalLeaves }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentLeafIndex === idx ? 'w-5 bg-teal' : 'w-1.5 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="hidden sm:flex items-center gap-1 text-[10px] text-ink-muted opacity-80">
        <kbd className="px-1.5 py-0.5 bg-paper-deep rounded border border-border font-mono">←</kbd>
        <kbd className="px-1.5 py-0.5 bg-paper-deep rounded border border-border font-mono">→</kbd>
        <span>keys to flip</span>
      </div>
    </div>
  );
};
