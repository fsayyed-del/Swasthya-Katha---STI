'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';
import { PAGE_SPEECH_SCRIPTS } from '@/lib/audio/pageSpeechManifest';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X, Sparkles } from 'lucide-react';

interface MediumAudioPlayerBarProps {
  locale: Locale;
}

export const MediumAudioPlayerBar: React.FC<MediumAudioPlayerBarProps> = ({ locale }) => {
  const currentLeafIndex = useBookStore((s) => s.currentLeafIndex);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [rate, setRate] = useState<number>(0.95);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Determine current active page number
  const getActivePageNumber = useCallback(() => {
    if (currentLeafIndex === 0) return 0;
    // On double spread, default to the right-hand primary page (or left if last)
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
        setIsPlaying(false);
        setCurrentSentenceIndex(0);
        return;
      }

      setCurrentSentenceIndex(index);
      const text = sentences[index];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = rate;

      utterance.onend = () => {
        if (index + 1 < sentences.length) {
          speakSentence(index + 1);
        } else {
          setIsPlaying(false);
          setCurrentSentenceIndex(0);
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech error:', e);
        setIsPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsOpen(true);
    },
    [sentences, locale, rate]
  );

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsOpen(true);
      speakSentence(currentSentenceIndex);
    }
  }, [isPlaying, speakSentence, currentSentenceIndex]);

  // Stop when page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSentenceIndex(0);
    }
  }, [currentLeafIndex]);

  // Listen to global palm hold gesture or sound button clicks
  useEffect(() => {
    const handleAudioToggle = () => {
      togglePlay();
    };
    window.addEventListener('gesture:audio-toggle', handleAudioToggle);
    return () => window.removeEventListener('gesture:audio-toggle', handleAudioToggle);
  }, [togglePlay]);

  if (!isOpen && !isPlaying) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          togglePlay();
        }}
        className="fixed bottom-3 right-3 sm:bottom-5 sm:right-6 z-50 flex items-center gap-2 px-3 py-2 bg-paper/95 hover:bg-paper text-ink-teal border-2 border-brass rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 font-bold text-xs backdrop-blur-sm"
        title="Listen to Page Audio Narration"
      >
        <Volume2 className="w-4 h-4 text-coral animate-pulse" />
        <span className="hidden sm:inline font-mono uppercase tracking-wider text-[10px]">
          {locale === 'hi' ? 'ऑडियो सुनें' : 'Listen'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-2 inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:max-w-xl w-full z-50 animate-slide-up select-none">
      <div className="bg-ink-teal/95 text-paper border-2 border-brass rounded-3xl p-3 sm:p-4 shadow-2xl backdrop-blur-md flex flex-col gap-2">
        {/* Header: Title, Live Waveform, and Close */}
        <div className="flex items-center justify-between border-b border-brass/30 pb-1.5 text-xs">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold text-brass-light font-display truncate">
              {pageScript.title[locale] || pageScript.title.en}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Speed Toggle */}
            <button
              onClick={() => {
                const nextRate = rate === 0.95 ? 1.15 : rate === 1.15 ? 0.85 : 0.95;
                setRate(nextRate);
                if (isPlaying) {
                  speakSentence(currentSentenceIndex);
                }
              }}
              className="px-2 py-0.5 rounded-full bg-paper/10 hover:bg-paper/20 text-[10px] font-mono font-bold text-brass-light transition-colors"
            >
              {rate}x
            </button>

            {/* Close / Stop Button */}
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
                setIsOpen(false);
              }}
              className="p-1 hover:bg-white/20 rounded-full text-paper/80 hover:text-white transition-colors"
              title="Close Audio Reader"
            >
              <X className="w-4 h-4 text-coral" />
            </button>
          </div>
        </div>

        {/* Medium-Style Live Karaoke Sentence Highlighter Text */}
        <div className="bg-black/30 p-2.5 rounded-2xl max-h-24 overflow-y-auto border border-white/10 text-xs sm:text-sm leading-relaxed scrollbar-thin">
          <p className="space-x-1">
            {sentences.map((sentence, idx) => {
              const isCurrent = idx === currentSentenceIndex && isPlaying;
              const isPast = idx < currentSentenceIndex;
              return (
                <span
                  key={idx}
                  onClick={() => speakSentence(idx)}
                  className={`inline cursor-pointer transition-all duration-200 ${
                    isCurrent
                      ? 'bg-amber-300 text-ink-black font-extrabold px-1.5 py-0.5 rounded-md shadow-md ring-2 ring-amber-400'
                      : isPast
                      ? 'text-paper/60 line-through-none'
                      : 'text-paper/90 hover:text-amber-200'
                  }`}
                >
                  {sentence}{' '}
                </span>
              );
            })}
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono text-brass-light/80">
            {currentSentenceIndex + 1} / {sentences.length} {locale === 'hi' ? 'वाक्य' : 'sentences'}
          </span>

          <div className="flex items-center gap-3">
            {/* Prev Sentence */}
            <button
              onClick={() => speakSentence(Math.max(0, currentSentenceIndex - 1))}
              disabled={currentSentenceIndex === 0}
              className="p-1.5 bg-paper/10 hover:bg-paper/20 rounded-full text-paper disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              title="Previous sentence"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="p-2.5 bg-amber-400 hover:bg-amber-300 text-ink-teal font-black rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ring-2 ring-amber-500"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            {/* Next Sentence */}
            <button
              onClick={() => speakSentence(Math.min(sentences.length - 1, currentSentenceIndex + 1))}
              disabled={currentSentenceIndex >= sentences.length - 1}
              className="p-1.5 bg-paper/10 hover:bg-paper/20 rounded-full text-paper disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              title="Next sentence"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[10px] font-mono text-emerald-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {isPlaying ? (locale === 'hi' ? 'पढ़ रहा है...' : 'Narrating...') : (locale === 'hi' ? 'रुका हुआ' : 'Paused')}
          </span>
        </div>
      </div>
    </div>
  );
};
