'use client';

import React from 'react';
import { Camera, CameraOff, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface CameraStatusIndicatorProps {
  isActive: boolean;
  lastDirection: 'forward' | 'backward' | null;
  onStop: () => void;
  onOpenModal: () => void;
  locale: Locale;
}

export const CameraStatusIndicator: React.FC<CameraStatusIndicatorProps> = ({
  isActive,
  lastDirection,
  onStop,
  onOpenModal,
  locale,
}) => {
  const isHindi = locale === 'hi';

  if (!isActive) {
    return (
      <button
        onClick={onOpenModal}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-paper/90 hover:bg-paper text-ink-teal border border-brass/40 rounded-full shadow-md text-xs font-bold transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
        title="Enable Touch-Free Camera Gestures"
      >
        <Camera className="w-3.5 h-3.5 text-mineral-green" />
        <span className="hidden sm:inline">{isHindi ? 'कैमरा जेस्चर' : 'Camera Control'}</span>
        <Sparkles className="w-3 h-3 text-coral" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-ink-teal text-paper rounded-full shadow-lg border border-brass text-xs font-bold backdrop-blur-sm animate-pulse-slow">
      {/* Live Gesture Direction Feedback */}
      {lastDirection === 'forward' ? (
        <span className="flex items-center gap-1 text-amber-300 font-extrabold text-[11px] animate-bounce">
          <ArrowRight className="w-3.5 h-3.5" />
          <span>Next Spread</span>
        </span>
      ) : lastDirection === 'backward' ? (
        <span className="flex items-center gap-1 text-care-blue-light font-extrabold text-[11px] animate-bounce">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Prev Spread</span>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Camera className="w-3.5 h-3.5 text-brass-light" />
          <span className="text-[10px] tracking-wide uppercase font-mono hidden sm:inline">
            {isHindi ? 'जेस्चर सक्रिय' : 'Gesture Active'}
          </span>
        </span>
      )}

      {/* Quick Stop Button */}
      <button
        onClick={onStop}
        className="ml-1 p-1 hover:bg-white/20 rounded-full text-paper/80 hover:text-white transition-colors"
        title="Stop Camera Gestures"
        aria-label="Stop Camera Gestures"
      >
        <CameraOff className="w-3.5 h-3.5 text-coral" />
      </button>
    </div>
  );
};
