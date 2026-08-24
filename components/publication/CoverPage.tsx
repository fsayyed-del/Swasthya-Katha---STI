'use client';

import React, { useState } from 'react';
import { PageContent } from './PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';
import { Sparkles, MoveRight, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { useBookStore } from '@/lib/state/bookStore';

interface CoverPageProps {
  content: PageContent;
  locale: Locale;
  onLocaleChange?: (locale: Locale) => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ content, locale, onLocaleChange }) => {
  const heading = content.heading[locale] || content.heading.en;
  const eyebrow = content.eyebrow?.[locale] || content.eyebrow?.en;
  const subheading = content.subheading?.[locale] || content.subheading?.en;

  const { nextLeaf } = useBookStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const text = `${heading}. ${subheading}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = locale === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    }
  };

  return (
    <div
      className="page-face page-face-front bg-gradient-to-br from-[#10353A] via-[#0D2C30] to-[#081D20] text-[#F6F1E4] p-4 sm:p-6 lg:p-7 flex flex-col justify-between select-none relative border-r-2 border-amber-600/30 overflow-hidden shadow-2xl"
    >
      {/* Decorative Gold Inset Border */}
      <div className="absolute inset-2.5 sm:inset-3 border-2 border-amber-400/40 rounded-xl pointer-events-none" />
      <div className="absolute inset-3.5 sm:inset-4 border border-amber-400/20 rounded-lg pointer-events-none" />

      {/* Top Emblem & Edition */}
      <div className="relative z-10 text-center pt-0.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300">
          <Sparkles className="w-3 h-3" />
          <span>{eyebrow}</span>
        </div>
      </div>

      {/* Center Title, Subtitle & Crest */}
      <div className="relative z-10 text-center my-auto space-y-2.5 sm:space-y-3.5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-teal-dark flex items-center justify-center font-display font-black text-xl sm:text-2xl shadow-lg border-2 border-amber-200/80">
          SK
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-amber-200 drop-shadow-md leading-tight">
          {heading}
        </h1>

        <p className="text-xs sm:text-sm text-amber-100/90 font-medium max-w-xs sm:max-w-sm mx-auto leading-relaxed">
          {subheading}
        </p>

        {/* Integrated Language & Audio Controls on the Starting Page */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
          {/* Language Selector */}
          <div className="bg-white/10 hover:bg-white/15 border border-amber-400/30 rounded-full px-2 py-0.5 text-xs text-white">
            <LocaleSwitcher currentLocale={locale} onLocaleChange={onLocaleChange || (() => {})} />
          </div>

          {/* Audio Narration Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow ${
              isPlayingAudio
                ? 'bg-amber-500 text-ink animate-pulse'
                : 'bg-white/15 hover:bg-white/25 text-amber-200 border border-amber-400/40'
            }`}
            title="Listen to audio narration"
          >
            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isPlayingAudio ? (locale === 'hi' ? 'रोकें' : 'Stop') : (locale === 'hi' ? 'ऑडियो सुनें' : 'Audio')}</span>
          </button>
        </div>

        <div className="pt-1">
          <span className="inline-block px-3 py-0.5 bg-white/10 rounded-full text-[10px] sm:text-xs font-bold text-emerald-300 border border-emerald-400/30">
            NACO Syndromic Care • Suraksha Clinics
          </span>
        </div>
      </div>

      {/* Bottom Physical Drag / Click to Open Button */}
      <div className="relative z-10 text-center pb-0.5">
        <button
          onClick={() => nextLeaf()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#10353A] font-extrabold text-xs sm:text-sm rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>{locale === 'hi' ? 'पत्रिका खोलें / Open Book' : 'Open Book / पत्रिका खोलें'}</span>
          <MoveRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Corner Curl Visual Indicator */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-amber-400/30 via-transparent to-transparent pointer-events-none rounded-tl-3xl animate-corner-hint" />
    </div>
  );
};
