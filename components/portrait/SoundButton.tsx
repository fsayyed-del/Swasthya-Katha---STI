'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface SoundButtonProps {
  textToSpeak: string;
  locale: Locale;
  className?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  textToSpeak,
  locale,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.92; // Clear, deliberate pace for low-literacy clarity
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-paper border-2 border-brass flex items-center justify-center text-ink-teal sound-btn-ring transition-all duration-300 hover:scale-105 active:scale-95 z-30 shadow-md ${
        isPlaying ? 'bg-amber-100 ring-2 ring-amber-500 animate-pulse' : 'hover:bg-paper-shadow'
      } ${className}`}
      aria-label={isPlaying ? 'Stop spoken audio' : 'Listen to spoken audio narration'}
      title={isPlaying ? 'Stop audio' : 'Listen to narration'}
    >
      {isPlaying ? (
        <VolumeX className="w-5 h-5 text-coral" />
      ) : (
        <Volume2 className="w-5 h-5 text-ink-teal" />
      )}
      {/* Visual pulse halo when active */}
      {isPlaying && (
        <span className="absolute -inset-1 rounded-full border border-coral animate-ping opacity-60 pointer-events-none" />
      )}
    </button>
  );
};
