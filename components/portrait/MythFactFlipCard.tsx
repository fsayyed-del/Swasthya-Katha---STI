'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface MythFactFlipCardProps {
  mythText: string;
  factText: string;
  locale: Locale;
  index: number;
  isHighlighted?: boolean;
  className?: string;
}

export const MythFactFlipCard: React.FC<MythFactFlipCardProps> = ({
  mythText,
  factText,
  locale,
  index,
  isHighlighted = false,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isHindi = locale === 'hi';
  const shouldFlip = isFlipped || isHighlighted;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
      }}
      className={`group perspective-1000 w-full min-h-[70px] sm:min-h-[78px] cursor-pointer select-none transition-all duration-300 ${
        isHighlighted ? 'scale-[1.02] ring-2 ring-amber-400 rounded-2xl' : ''
      } ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Comparison Card ${index}: ${shouldFlip ? 'Fact view' : 'Myth view'}. Hover or tap to flip.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`flip-card-inner relative w-full h-full rounded-2xl transform-style-preserve-3d transition-transform duration-500 shadow-xs group-hover:rotate-y-180 ${
          shouldFlip ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT: Calming Soft Peach / Linen (Myth) */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FCF4ED] to-[#F9EBE0] border border-[#E8C6B6] rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8C6B6]/60 pb-1 text-[9px] sm:text-[9.5px] text-[#A84833] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-coral shrink-0" />
              <span>{isHindi ? 'भ्रांति / Myth' : 'Myth / Common Misconception'}</span>
            </span>
            <span className="flex items-center gap-1 text-[8.5px] text-ink-muted font-medium bg-paper/80 px-2 py-0.5 rounded-full border border-[#E8C6B6]/50">
              <Sparkles className="w-2.5 h-2.5 text-coral" />
              <span>{isHindi ? 'सच जानने हेतु होवर करें' : 'Hover / Tap for Fact'}</span>
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-ink-black font-semibold my-auto leading-snug line-clamp-2 px-0.5">
            "{mythText}"
          </p>

          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] text-ink-muted font-medium pt-0.5 border-t border-black/5">
            <span>Card 0{index}</span>
            <span className="text-[#A84833] font-bold flex items-center gap-0.5">
              <span>{isHindi ? 'वैज्ञानिक सच देखें' : 'View Scientific Fact'}</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

        {/* BACK: Calming Soft Sage / Mint Green (Fact) - NOT DARK */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#F2F9F5] via-[#EAF5EF] to-[#DDF0E6] border-2 border-mineral-green/40 rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between border-b border-mineral-green/30 pb-1 text-[9px] sm:text-[9.5px] text-mineral-green-dark font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-mineral-green-dark shrink-0" />
              <span>{isHindi ? 'वैज्ञानिक सच / Clinical Fact' : 'Verified Clinical Fact'}</span>
            </span>
            <span className="text-[8px] sm:text-[8.5px] font-mono font-bold bg-mineral-green/20 text-mineral-green-dark px-2 py-0.5 rounded-full">
              {isHindi ? 'प्रमाणित' : 'NACO Verified'}
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] text-ink-teal font-bold my-auto leading-snug line-clamp-2 px-0.5">
            {factText}
          </p>

          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] text-mineral-green-dark font-medium pt-0.5 border-t border-mineral-green/20">
            <span>Card 0{index}</span>
            <span className="font-bold">✓ 100% Medically Accurate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
