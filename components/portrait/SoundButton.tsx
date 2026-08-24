'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';

interface SoundButtonProps {
  textToSpeak: string;
  locale: Locale;
  pageNumber?: number;
  className?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  textToSpeak,
  locale,
  pageNumber,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentLeafIndex = useBookStore((s) => s.currentLeafIndex);

  // Stop speech when turning to another page
  useEffect(() => {
    if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [currentLeafIndex]);

  const toggleSpeech = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.92;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  }, [isPlaying, textToSpeak, locale]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSpeech();
  };

  // Determine if this page is the primary active visible page
  const isPageVisible = () => {
    if (pageNumber === undefined) return true;
    if (currentLeafIndex === 0) return pageNumber <= 1;
    const activeLeftPage = 2 * currentLeafIndex - 1;
    const activeRightPage = 2 * currentLeafIndex;
    // Prioritize the right page face on double spread or match active left
    return pageNumber === activeRightPage || (pageNumber === activeLeftPage && activeRightPage > 15);
  };

  // Touch-Free Palm Hold Gesture: toggles audio narration only for the visible page
  useEffect(() => {
    const handleGestureAudio = () => {
      if (isPageVisible()) {
        toggleSpeech();
      }
    };
    window.addEventListener('gesture:audio-toggle', handleGestureAudio);
    return () => window.removeEventListener('gesture:audio-toggle', handleGestureAudio);
  }, [toggleSpeech, currentLeafIndex, pageNumber]);

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
      {isPlaying && (
        <span className="absolute -inset-1 rounded-full border border-coral animate-ping opacity-60 pointer-events-none" />
      )}
    </button>
  );
};
