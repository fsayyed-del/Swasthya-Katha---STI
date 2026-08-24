'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Gauge, FileText, Volume2 } from 'lucide-react';
import { useBookStore } from '@/lib/state/bookStore';
import { Locale } from '@/src/domain/content/schema';
import { TranscriptModal } from '../narration/TranscriptModal';

interface AudioPopoverProps {
  textToSpeak: string;
  title: string;
  locale: Locale;
}

export const AudioPopover: React.FC<AudioPopoverProps> = ({
  textToSpeak,
  title,
  locale,
}) => {
  const {
    isAudioPopoverOpen,
    setAudioPopoverOpen,
    isAudioPlaying,
    setAudioPlaying,
    audioProgress,
    setAudioProgress,
  } = useBookStore();

  const [speed, setSpeed] = useState<number>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speech synthesis on text/page or locale change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      setAudioProgress(0);
    }
  }, [textToSpeak, locale, setAudioPlaying, setAudioProgress]);

  const handlePlayPause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isAudioPlaying) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    const langMap: Record<Locale, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
    };
    utterance.lang = langMap[locale] || 'en-IN';
    utterance.rate = speed;

    utterance.onboundary = (event) => {
      if (event.name === 'word' && textToSpeak.length > 0) {
        setAudioProgress(Math.min(100, Math.round((event.charIndex / textToSpeak.length) * 100)));
      }
    };

    utterance.onend = () => {
      setAudioPlaying(false);
      setAudioProgress(100);
    };

    utterance.onerror = () => {
      setAudioPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setAudioPlaying(true);
  };

  const handleReplay = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      setAudioProgress(0);
      setTimeout(() => {
        handlePlayPause();
      }, 60);
    }
  };

  const handleSpeedToggle = () => {
    const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 0.75 : 1;
    setSpeed(nextSpeed);
    if (isAudioPlaying) {
      handleReplay();
    }
  };

  if (!isAudioPopoverOpen) return null;

  return (
    <>
      <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-paper-pure border border-border shadow-2xl rounded-2xl p-4 text-ink animate-fade-in">
        {/* Popover Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-teal" />
            <h4 className="font-bold text-xs sm:text-sm text-ink truncate max-w-[200px]">
              {title}
            </h4>
          </div>
          <button
            onClick={() => setAudioPopoverOpen(false)}
            className="p-1 rounded-full hover:bg-paper-deep text-ink-muted hover:text-ink transition-colors"
            aria-label="Close audio controls"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Playback Controls & Progress */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="w-full bg-paper-deep rounded-full h-1.5 overflow-hidden border border-border">
            <div
              className="bg-teal h-full transition-all duration-300 rounded-full"
              style={{ width: `${audioProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs transition-all shadow-sm ${
                isAudioPlaying
                  ? 'bg-amber-500 text-ink hover:bg-amber-600'
                  : 'bg-teal text-white hover:bg-teal-dark'
              }`}
            >
              {isAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isAudioPlaying ? 'Pause' : 'Play Voice'}</span>
            </button>

            {/* Replay Button */}
            <button
              onClick={handleReplay}
              className="p-2 rounded-xl bg-paper-deep hover:bg-border text-ink transition-colors border border-border"
              title="Replay"
              aria-label="Replay page audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Toggle */}
            <button
              onClick={handleSpeedToggle}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-paper-deep hover:bg-border text-ink text-xs font-bold transition-colors border border-border"
              title="Speed"
            >
              <Gauge className="w-3.5 h-3.5 text-teal" />
              <span>{speed}x</span>
            </button>

            {/* Transcript Button */}
            <button
              onClick={() => setShowTranscript(true)}
              className="p-2 rounded-xl bg-paper-deep hover:bg-border text-ink transition-colors border border-border"
              title="Transcript"
              aria-label="Open transcript"
            >
              <FileText className="w-4 h-4 text-teal" />
            </button>
          </div>
        </div>
      </div>

      <TranscriptModal
        isOpen={showTranscript}
        onClose={() => setShowTranscript(false)}
        title={title}
        transcript={textToSpeak}
        locale={locale}
      />
    </>
  );
};
