'use client';

import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useBookStore } from '@/lib/state/bookStore';
import { Locale } from '@/src/domain/content/schema';

interface CompactSoundButtonProps {
  locale: Locale;
}

export const CompactSoundButton: React.FC<CompactSoundButtonProps> = ({ locale }) => {
  const { isAudioPopoverOpen, setAudioPopoverOpen, isAudioPlaying } = useBookStore();

  return (
    <button
      onClick={() => setAudioPopoverOpen(!isAudioPopoverOpen)}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl border transition-all transform hover:scale-105 active:scale-95 ${
        isAudioPlaying
          ? 'bg-amber-500 text-teal-dark border-amber-400 font-extrabold ring-4 ring-amber-400/30'
          : 'bg-[#10353A] text-white border-teal-light/30 hover:bg-[#0D2C30]'
      }`}
      aria-label="Open Audio Narration Controls"
      title="Audio Narration & Voice Guide"
    >
      <div className="relative">
        <Volume2 className="w-5 h-5" />
        {isAudioPlaying && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
        )}
      </div>

      <span className="text-xs font-bold tracking-tight">
        {isAudioPlaying ? (locale === 'hi' ? 'बोल रहा है...' : 'Listening...') : (locale === 'hi' ? 'आवाज़' : 'Audio')}
      </span>

      {/* Live Audio Waveform Bars when playing */}
      {isAudioPlaying && (
        <div className="flex items-center gap-0.5 h-3 ml-0.5" aria-hidden="true">
          <div className="w-0.5 h-full bg-teal-dark animate-pulse" />
          <div className="w-0.5 h-2/3 bg-teal-dark animate-pulse delay-75" />
          <div className="w-0.5 h-full bg-teal-dark animate-pulse delay-150" />
        </div>
      )}
    </button>
  );
};
