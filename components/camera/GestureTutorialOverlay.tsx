'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Sparkles, MoveRight, MoveLeft, MoveUp, MoveDown, Volume2, Check } from 'lucide-react';

interface GestureTutorialOverlayProps {
  isOpen: boolean;
  onDismiss: () => void;
  locale: Locale;
}

export const GestureTutorialOverlay: React.FC<GestureTutorialOverlayProps> = ({
  isOpen,
  onDismiss,
  locale,
}) => {
  if (!isOpen) return null;
  const isHindi = locale === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-paper border-2 border-brass/60 rounded-3xl max-w-sm sm:max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 relative text-ink text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink-black text-paper rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHindi ? 'सिंगल फिंगर जेस्चर' : 'INDEX FINGER 4-WAY CONTROL'}</span>
        </div>

        {/* Animated Hand Demonstration Showing Index Finger */}
        <div className="relative w-40 h-36 mx-auto bg-paper-shadow/60 rounded-2xl border-2 border-brass/40 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="relative animate-hand-wave">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black text-white font-mono text-[10px] font-black rounded tracking-wider shadow">
              INDEX FINGER ☝️
            </div>

            <svg
              viewBox="0 0 100 120"
              className="w-24 h-24 stroke-ink-teal fill-transparent"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Pointing Index Finger Silhouette */}
              <path d="M 45 110 L 45 30 C 45 20 55 20 55 30 L 55 65 C 55 60 62 60 62 68 L 62 72 C 62 68 68 68 68 75 L 68 80 C 68 75 74 75 74 85 L 74 110 Z" />
              {/* Thumb */}
              <path d="M 45 80 C 35 80 35 95 45 95" strokeDasharray="2 2" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="absolute bottom-1 inset-x-2 flex items-center justify-between text-[10px] font-mono font-bold text-ink-muted">
            <span className="flex items-center gap-0.5 text-care-blue-dark">
              <MoveLeft className="w-2.5 h-2.5" /> Prev
            </span>
            <span className="flex items-center gap-0.5 text-amber-600">
              <MoveUp className="w-2.5 h-2.5" /> Kit
            </span>
            <span className="flex items-center gap-0.5 text-coral">
              Next <MoveRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>

        {/* Clear Instructions */}
        <div className="space-y-1.5 text-left bg-paper-deep/60 p-3 rounded-2xl border border-brass/25 text-xs">
          <div className="flex items-center justify-between font-bold text-ink-teal">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-ink-teal text-paper flex items-center justify-center text-[9px] font-mono">1</span>
              <span>{isHindi ? '👈 / 👉 उंगली बाएं या दाएं हिलाएं' : '👈 / 👉 Point Finger Left / Right'}</span>
            </div>
            <span className="text-[10px] text-coral font-mono uppercase">Turn Page</span>
          </div>

          <div className="flex items-center justify-between font-bold text-ink-teal">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-ink-teal text-paper flex items-center justify-center text-[9px] font-mono">2</span>
              <span>{isHindi ? '👆 / 👇 उंगली ऊपर या नीचे हिलाएं' : '👆 / 👇 Point Finger Up / Down'}</span>
            </div>
            <span className="text-[10px] text-care-blue-dark font-mono uppercase">Change Kit</span>
          </div>

          <div className="flex items-center justify-between font-bold text-ink-teal">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-ink-teal text-paper flex items-center justify-center text-[9px] font-mono">3</span>
              <span>{isHindi ? '☝️ उंगली 1 सेकंड रोकें (Still Hold)' : '☝️ Hold Finger Still (1s)'}</span>
            </div>
            <span className="text-[10px] text-mineral-green-dark font-mono uppercase">Play Audio</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onDismiss}
          className="w-full py-2.5 bg-ink-teal hover:bg-teal-dark text-paper font-bold rounded-2xl text-xs sm:text-sm shadow-xl transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4 text-brass-light" />
          <span>{isHindi ? 'समझ गए, पढ़ना शुरू करें' : 'Got It! Start Reading'}</span>
        </button>
      </div>
    </div>
  );
};
