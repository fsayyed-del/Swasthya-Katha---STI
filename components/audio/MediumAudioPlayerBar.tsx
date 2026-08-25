'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';
import { PAGE_SPEECH_SCRIPTS } from '@/lib/audio/pageSpeechManifest';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface MediumAudioPlayerBarProps {
  locale: Locale;
}

export const MediumAudioPlayerBar: React.FC<MediumAudioPlayerBarProps> = ({ locale }) => {
  const currentLeafIndex = useBookStore((s) => s.currentLeafIndex);
  const isAudioPlaying = useBookStore((s) => s.isAudioPlaying);
  const setAudioPlaying = useBookStore((s) => s.setAudioPlaying);
  const activeAudioSentenceIndex = useBookStore((s) => s.activeAudioSentenceIndex);
  const setActiveAudioSentenceIndex = useBookStore((s) => s.setActiveAudioSentenceIndex);

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [rate, setRate] = useState<number>(0.95);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Determine current active page number
  const getActivePageNumber = useCallback(() => {
    if (currentLeafIndex === 0) return 0;
    const rightPage = 2 * currentLeafIndex;
    const leftPage = 2 * currentLeafIndex - 1;
    return rightPage <= 15 ? rightPage : leftPage;
  }, [currentLeafIndex]);

  const activePageNum = getActivePageNumber();
  const pageScript = PAGE_SPEECH_SCRIPTS[activePageNum] || PAGE_SPEECH_SCRIPTS[0];
  const sentences = pageScript.sentences[locale] || pageScript.sentences.en;

  // Speak a specific sentence by index
  const speakSentence = useCallback(
    (index: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      if (index >= sentences.length) {
        setAudioPlaying(false);
        setActiveAudioSentenceIndex(0);
        return;
      }

      setActiveAudioSentenceIndex(index);
      const text = sentences[index];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = rate;

      utterance.onend = () => {
        if (index + 1 < sentences.length) {
          speakSentence(index + 1);
        } else {
          setAudioPlaying(false);
          setActiveAudioSentenceIndex(0);
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech error:', e);
        setAudioPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setAudioPlaying(true);
      setIsOpen(true);
    },
    [sentences, locale, rate, setAudioPlaying, setActiveAudioSentenceIndex]
  );

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isAudioPlaying) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
    } else {
      setIsOpen(true);
      speakSentence(activeAudioSentenceIndex);
    }
  }, [isAudioPlaying, speakSentence, activeAudioSentenceIndex, setAudioPlaying]);

  // Stop when page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      setActiveAudioSentenceIndex(0);
    }
  }, [currentLeafIndex, setAudioPlaying, setActiveAudioSentenceIndex]);

  // Listen to global palm hold gesture or sound button clicks
  useEffect(() => {
    const handleAudioToggle = () => {
      togglePlay();
    };
    window.addEventListener('gesture:audio-toggle', handleAudioToggle);
    return () => window.removeEventListener('gesture:audio-toggle', handleAudioToggle);
  }, [togglePlay]);

  if (!isOpen && !isAudioPlaying) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          togglePlay();
        }}
        className="fixed bottom-3 right-3 sm:bottom-5 sm:right-6 z-50 flex items-center gap-2 px-3.5 py-2 bg-paper/95 hover:bg-paper text-ink-teal border-2 border-brass rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 font-bold text-xs backdrop-blur-md group"
        title="Listen to Page Spoken Narration"
      >
        <Volume2 className="w-4 h-4 text-coral group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-mono uppercase tracking-wider text-[10px] text-ink-teal font-extrabold">
          {locale === 'hi' ? 'ऑडियो सुनें' : 'Listen'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-2.5 inset-x-2.5 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-lg w-full z-50 animate-slide-up select-none">
      <div className="bg-ink-teal/95 text-paper border border-brass/50 rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl flex flex-col gap-1.5 ring-1 ring-white/10">
        {/* Header: Title, Live Equalizer Waveform, and Controls */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate pr-2">
            {isAudioPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 shrink-0">
                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                <span className="w-0.5 bg-amber-300 rounded-full animate-eq-2" />
                <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
              </div>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            )}
            <span className="font-bold text-amber-200 font-display truncate text-[11px] sm:text-xs">
              {pageScript.title[locale] || pageScript.title.en}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Speed Rate Toggle */}
            <button
              onClick={() => {
                const nextRate = rate === 0.95 ? 1.15 : rate === 1.15 ? 0.85 : 0.95;
                setRate(nextRate);
                if (isAudioPlaying) {
                  speakSentence(activeAudioSentenceIndex);
                }
              }}
              className="px-1.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[9px] font-mono font-bold text-amber-200 transition-colors"
            >
              {rate}x
            </button>

            {/* Close / Stop Button */}
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                setAudioPlaying(false);
                setIsOpen(false);
              }}
              className="p-1 hover:bg-white/20 rounded-full text-paper/80 hover:text-white transition-colors"
              title="Close Audio Player"
            >
              <X className="w-3.5 h-3.5 text-coral" />
            </button>
          </div>
        </div>

        {/* Floating Player Controls & Live Progress */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[9px] font-mono text-amber-100/80">
            {activeAudioSentenceIndex + 1} / {sentences.length} {locale === 'hi' ? 'वाक्य' : 'sentences'}
          </span>

          <div className="flex items-center gap-2.5">
            {/* Prev Sentence */}
            <button
              onClick={() => speakSentence(Math.max(0, activeAudioSentenceIndex - 1))}
              disabled={activeAudioSentenceIndex === 0}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-paper disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              title="Previous"
            >
              <SkipBack className="w-3 h-3" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="p-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-ink-teal font-black rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ring-2 ring-amber-400/80"
              title={isAudioPlaying ? 'Pause' : 'Play'}
            >
              {isAudioPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>

            {/* Next Sentence */}
            <button
              onClick={() => speakSentence(Math.min(sentences.length - 1, activeAudioSentenceIndex + 1))}
              disabled={activeAudioSentenceIndex >= sentences.length - 1}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-paper disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              title="Next"
            >
              <SkipForward className="w-3 h-3" />
            </button>
          </div>

          <span className="text-[9px] font-mono text-emerald-300 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
            {isAudioPlaying ? (locale === 'hi' ? 'पन्ने पर वाचन...' : 'Reading Page...') : (locale === 'hi' ? 'रुका हुआ' : 'Paused')}
          </span>
        </div>
      </div>
    </div>
  );
};
