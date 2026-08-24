'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText, Gauge } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';
import { TranscriptModal } from './TranscriptModal';

interface NarrationBarProps {
  textToSpeak: string;
  title: string;
  locale: Locale;
  onActiveTargetChange?: (targetId: string | undefined) => void;
  onWordHighlight?: (wordIndex: number) => void;
}

export const NarrationBar: React.FC<NarrationBarProps> = ({
  textToSpeak,
  title,
  locale,
  onActiveTargetChange,
  onWordHighlight
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    wordsRef.current = textToSpeak.split(/\s+/);
  }, [textToSpeak]);

  useEffect(() => {
    // Stop any ongoing speech when text or locale changes
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setProgress(0);
    }
  }, [textToSpeak, locale]);

  const handlePlayPause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Audio playback is not supported in this browser. Please use the Transcript.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    // Set locale language code
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
    utterance.volume = isMuted ? 0 : 1;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const textBefore = textToSpeak.slice(0, charIndex);
        const currentWordIdx = textBefore.split(/\s+/).length - 1;
        onWordHighlight?.(currentWordIdx);

        // Progress estimate
        if (textToSpeak.length > 0) {
          setProgress(Math.min(100, Math.round((charIndex / textToSpeak.length) * 100)));
        }
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      onActiveTargetChange?.(undefined);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleReplay = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setProgress(0);
      setTimeout(() => {
        handlePlayPause();
      }, 50);
    }
  };

  const handleSpeedChange = () => {
    const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 0.75 : 1;
    setSpeed(nextSpeed);
    if (isPlaying) {
      handleReplay();
    }
  };

  return (
    <>
      <div className="bg-paper-pure border border-border/90 shadow-card rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-ink">
        {/* Playback Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={handlePlayPause}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
              isPlaying
                ? 'bg-orange text-ink hover:bg-orange-dark'
                : 'bg-teal text-white hover:bg-teal-dark'
            }`}
            aria-label={isPlaying ? 'Pause Narration' : 'Play Narration'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? (locale === 'hi' ? 'रोकें (Pause)' : 'Pause') : (locale === 'hi' ? 'सुनें (Listen)' : 'Listen')}</span>
          </button>

          <button
            onClick={handleReplay}
            className="p-2 rounded-xl bg-paper-deep hover:bg-border text-ink transition-colors border border-border"
            title="Replay from start"
            aria-label="Replay audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSpeedChange}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-paper-deep hover:bg-border text-ink text-xs font-bold transition-colors border border-border"
            title="Playback Speed"
            aria-label={`Current speed ${speed}x`}
          >
            <Gauge className="w-3.5 h-3.5 text-teal" />
            <span>{speed}x</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-paper-deep hover:bg-border text-ink transition-colors border border-border"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-danger" /> : <Volume2 className="w-4 h-4 text-teal" />}
          </button>
        </div>

        {/* Live Audio Progress Bar */}
        <div className="w-full sm:flex-1 mx-2">
          <div className="w-full bg-paper-deep rounded-full h-2 overflow-hidden border border-border/80">
            <div
              className="bg-teal h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Transcript View Button */}
        <button
          onClick={() => setShowTranscript(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-paper-deep hover:bg-paper text-ink text-xs font-semibold border border-border transition-colors w-full sm:w-auto justify-center"
        >
          <FileText className="w-4 h-4 text-teal" />
          <span>{locale === 'hi' ? 'प्रतिलेख (Transcript)' : 'Transcript'}</span>
        </button>
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
