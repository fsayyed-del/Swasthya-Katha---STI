'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { MousePointer, Smartphone, Camera, Volume2, MoveRight, Sparkles } from 'lucide-react';

interface Page01GesturesProps {
  locale: Locale;
  onOpenCamModal?: () => void;
}

export const Page01Gestures: React.FC<Page01GesturesProps> = ({ locale, onOpenCamModal }) => {
  const page = PORTRAIT_BOOK_PAGES[1];
  const isHindi = locale === 'hi';

  return (
    <PageSurface
      pageNumber={1}
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Header */}
      <div>
        <div className="text-[10px] sm:text-[11px] font-bold text-ink-teal uppercase tracking-widest border-b border-brass/30 pb-0.5">
          {page.eyebrow?.[locale] || page.eyebrow?.en}
        </div>
        <h2 className="text-lg sm:text-2xl font-black font-display text-ink-teal mt-0.5">
          {page.title[locale] || page.title.en}
        </h2>
      </div>

      {/* 3 Interaction Modes (Touch/Mouse, Camera Wave, and Audio) */}
      <div className="space-y-2 flex-1 my-auto py-1">
        {/* Panel 1: Touch & Mouse Navigation */}
        <div className="bg-paper-shadow/60 border border-brass/30 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-paper border border-brass/40 flex items-center justify-center text-coral shadow-sm shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-ink-teal leading-tight">
                {isHindi ? '1. टच व माउस स्वाइप' : '1. Touch & Mouse Swipe'}
              </div>
              <p className="text-[10px] sm:text-xs text-ink-muted leading-tight">
                {isHindi
                  ? 'स्क्रीन पर स्वाइप करें या पेज के कोने को क्लिक करके पलटें।'
                  : 'Swipe left/right or click and drag any corner to turn.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-brass bg-paper px-2 py-0.5 rounded border border-brass/30 shrink-0">
            Touch / Drag
          </span>
        </div>

        {/* Panel 2: Touch-Free Camera Wave Gesture */}
        <div className="bg-gradient-to-r from-mineral-green/15 via-mineral-green/25 to-mineral-green/15 border-2 border-mineral-green/40 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-mineral-green text-paper flex items-center justify-center shadow-md shrink-0 animate-pulse">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-ink-teal leading-tight">
                <span>{isHindi ? '2. टच-फ्री कैमरा जेस्चर' : '2. Touch-Free Camera Wave'}</span>
                <span className="bg-coral text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                  New
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-ink leading-tight font-medium mt-0.5">
                {isHindi
                  ? '👈 बाएं हाथ लहराएं = अगला पन्ना | 👉 दाएं = पिछला पन्ना'
                  : '👈 Wave Left = Next Page | 👉 Wave Right = Previous'}
              </p>
            </div>
          </div>

          {onOpenCamModal && (
            <button
              onClick={onOpenCamModal}
              className="px-2.5 py-1.5 bg-mineral-green hover:bg-emerald-800 text-white rounded-lg text-[10px] sm:text-xs font-bold shadow transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{isHindi ? 'चालू करें' : 'Try It'}</span>
            </button>
          )}
        </div>

        {/* Panel 3: Brass Speaker Callout */}
        <div className="bg-paper-shadow/60 border border-brass/30 rounded-xl p-2 sm:p-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-paper border border-brass flex items-center justify-center text-ink-teal sound-btn-ring shrink-0">
            <Volume2 className="w-4 h-4 text-ink-teal" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-ink-teal leading-tight">
              {isHindi ? '3. ऑडियो वाचन से सुनें' : '3. Listen with Audio Narration'}
            </div>
            <p className="text-[10px] sm:text-xs text-ink-muted leading-tight">
              {isHindi
                ? 'हर पन्ने के नीचे दिए गए ब्रास स्पीकर बटन को दबाकर सुनें।'
                : 'Tap the brass speaker at the bottom of any page to listen.'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Hint */}
      <div className="border-t border-brass/30 pt-1 text-center text-[10px] text-ink-muted font-mono">
        <span>{isHindi ? 'राष्ट्रीय सिंड्रोमिक दिशानिर्देश • NACO 2026' : 'National Syndromic Guidelines • NACO 2026'}</span>
      </div>
    </PageSurface>
  );
};
