'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, RotateCw } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface MythFactFlipCardProps {
  mythText: string;
  factText: string;
  locale: Locale;
  index: number;
  className?: string;
}

export const MythFactFlipCard: React.FC<MythFactFlipCardProps> = ({
  mythText,
  factText,
  locale,
  index,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
      }}
      className={`perspective-1000 w-full min-h-[95px] sm:min-h-[110px] cursor-pointer select-none ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Comparison Card ${index}: ${isFlipped ? 'Fact view' : 'Myth view'}. Click to flip.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`flip-card-inner relative w-full h-full rounded-xl transform-style-preserve-3d transition-transform duration-500 shadow-sm ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT: Muted Coral (Myth) */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#FDF2E9] to-[#FBE6D6] border border-coral/40 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-coral/30 pb-1 text-[11px] text-coral-dark font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-coral shrink-0" />
              <span>{locale === 'hi' ? 'भ्रांति / Myth' : 'Myth / Some think...'}</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-ink-muted">
              <RotateCw className="w-3 h-3" />
              <span>{locale === 'hi' ? 'पलटें' : 'Tap to Flip'}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-ink font-bold my-auto leading-snug">
            "{mythText}"
          </p>

          <div className="text-[10px] text-ink-muted text-right font-medium">
            Card {index} • Tap to see scientific fact →
          </div>
        </div>

        {/* BACK: Deep Ink-Teal (Fact) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#123A3C] to-[#0A2226] text-paper border border-mineral-green rounded-xl p-2.5 sm:p-3 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between border-b border-mineral-green/40 pb-1 text-[11px] text-mineral-green-light font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-mineral-green-light shrink-0" />
              <span>{locale === 'hi' ? 'वैज्ञानिक सच / Fact' : 'Scientific Fact / Actually...'}</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-paper/70">
              <RotateCw className="w-3 h-3" />
              <span>{locale === 'hi' ? 'वापस पलटें' : 'Flip Back'}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-amber-200 font-extrabold my-auto leading-snug">
            {factText}
          </p>

          <div className="text-[10px] text-paper/80 text-right font-medium">
            ✓ 100% Scientifically Verified
          </div>
        </div>
      </div>
    </div>
  );
};
