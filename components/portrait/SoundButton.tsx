'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';

interface SoundButtonProps {
  textToSpeak?: string;
  sectionsToSpeak?: string[];
  locale: Locale;
  pageNumber?: number;
  className?: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({
  textToSpeak = '',
  sectionsToSpeak,
  locale,
  pageNumber,
  className = '',
}) => {
  const isAudioPlaying = useBookStore((s) => s.isAudioPlaying);
  const setAudioPlaying = useBookStore((s) => s.setAudioPlaying);
  const activeAudioPage = useBookStore((s) => s.activeAudioPage);
  const setActiveAudioPage = useBookStore((s) => s.setActiveAudioPage);
  const activeAudioSentenceIndex = useBookStore((s) => s.activeAudioSentenceIndex);
  const setActiveAudioSentenceIndex = useBookStore((s) => s.setActiveAudioSentenceIndex);
  const currentLeafIndex = useBookStore((s) => s.currentLeafIndex);

  const isCurrentPagePlaying = isAudioPlaying && activeAudioPage === pageNumber;
  const sectionsRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);

  // Compute speech sections
  const sections: string[] = React.useMemo(() => {
    if (sectionsToSpeak && sectionsToSpeak.length > 0) {
      return sectionsToSpeak.filter((s) => s.trim().length > 0);
    }
    if (textToSpeak) {
      // Split text into meaningful sentences
      const split = textToSpeak
        .split(/(?<=[.!?।])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      return split.length > 0 ? split : [textToSpeak];
    }
    return [];
  }, [sectionsToSpeak, textToSpeak]);

  sectionsRef.current = sections;

  // Stop speech synthesis on page turn
  useEffect(() => {
    if (isAudioPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      setActiveAudioPage(null);
      setActiveAudioSentenceIndex(0);
    }
  }, [currentLeafIndex]);

  const speakSection = useCallback(
    (index: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const currentSections = sectionsRef.current;
      if (index >= currentSections.length) {
        setAudioPlaying(false);
        setActiveAudioPage(null);
        setActiveAudioSentenceIndex(0);
        return;
      }

      currentIndexRef.current = index;
      setActiveAudioSentenceIndex(index);
      setActiveAudioPage(pageNumber ?? null);
      setAudioPlaying(true);

      const text = currentSections[index];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.92;

      utterance.onend = () => {
        if (index + 1 < currentSections.length) {
          speakSection(index + 1);
        } else {
          setAudioPlaying(false);
          setActiveAudioPage(null);
          setActiveAudioSentenceIndex(0);
        }
      };

      utterance.onerror = () => {
        setAudioPlaying(false);
        setActiveAudioPage(null);
        setActiveAudioSentenceIndex(0);
      };

      window.speechSynthesis.speak(utterance);
    },
    [locale, pageNumber, setAudioPlaying, setActiveAudioPage, setActiveAudioSentenceIndex]
  );

  const toggleSpeech = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isCurrentPagePlaying) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      setActiveAudioPage(null);
      setActiveAudioSentenceIndex(0);
    } else {
      window.speechSynthesis.cancel();
      speakSection(0);
    }
  }, [isCurrentPagePlaying, speakSection, setAudioPlaying, setActiveAudioPage, setActiveAudioSentenceIndex]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSpeech();
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-paper border-2 border-brass flex items-center justify-center text-ink-teal transition-all duration-300 hover:scale-105 active:scale-95 z-30 shadow-md ${
        isCurrentPagePlaying ? 'bg-amber-100 ring-2 ring-amber-500 scale-105 animate-pulse' : 'hover:bg-paper-shadow'
      } ${className}`}
      aria-label={isCurrentPagePlaying ? 'Stop spoken audio' : 'Listen to complete spoken audio narration with highlights'}
      title={isCurrentPagePlaying ? 'Stop audio narration' : 'Click to listen to full page audio with visual highlights'}
    >
      {isCurrentPagePlaying ? (
        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-coral" />
      ) : (
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-ink-teal" />
      )}
      {isCurrentPagePlaying && (
        <span className="absolute -inset-1 rounded-full border-2 border-coral animate-ping opacity-60 pointer-events-none" />
      )}
    </button>
  );
};
