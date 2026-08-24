'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { MousePointer, Smartphone, Volume2, MoveRight } from 'lucide-react';

interface Page01GesturesProps {
  locale: Locale;
}

export const Page01Gestures: React.FC<Page01GesturesProps> = ({ locale }) => {
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
        <div className="text-[11px] font-bold text-ink-teal uppercase tracking-widest border-b border-brass/30 pb-0.5">
          {page.eyebrow?.[locale] || page.eyebrow?.en}
        </div>
        <h2 className="text-xl sm:text-2xl font-black font-display text-ink-teal mt-0.5">
          {page.title[locale] || page.title.en}
        </h2>
      </div>

      {/* Two Gesture Demonstration Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 my-auto">
        {/* Panel 1: Desktop / Mouse Corner Drag */}
        <div className="bg-paper-shadow/60 border border-brass/30 rounded-xl p-2.5 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-ink-teal">
            <MousePointer className="w-3.5 h-3.5 text-mineral-green shrink-0" />
            <span>{isHindi ? '1. कोने को खींचें' : '1. Drag Corner'}</span>
          </div>

          <div className="h-16 bg-paper rounded-lg border border-brass/20 flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-1.5 animate-pulse">
              <span className="text-xl">📄</span>
              <MoveRight className="w-4 h-4 text-ink-teal" />
              <span className="text-[10px] font-bold text-ink-teal bg-paper-shadow px-1.5 py-0.5 rounded">
                {isHindi ? 'पन्ना पलटें' : 'Turn Page'}
              </span>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-ink-muted leading-tight font-medium">
            {isHindi
              ? 'माउस से किसी भी कोने को पकड़कर आगे या पीछे खींचें।'
              : 'Click and drag any page corner forward or backward smoothly.'}
          </p>
        </div>

        {/* Panel 2: Mobile Touch Swipe */}
        <div className="bg-paper-shadow/60 border border-brass/30 rounded-xl p-2.5 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-ink-teal">
            <Smartphone className="w-3.5 h-3.5 text-coral shrink-0" />
            <span>{isHindi ? '2. स्वाइप करें' : '2. Swipe Touch'}</span>
          </div>

          <div className="h-16 bg-paper rounded-lg border border-brass/20 flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-1.5 animate-pulse">
              <span className="text-xl">👉</span>
              <MoveRight className="w-4 h-4 text-coral" />
              <span className="text-[10px] font-bold text-coral bg-coral/10 px-1.5 py-0.5 rounded">
                {isHindi ? 'स्वाइप करें' : 'Swipe Touch'}
              </span>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-ink-muted leading-tight font-medium">
            {isHindi
              ? 'स्क्रीन पर बाएं या दाएं स्वाइप करें।'
              : 'Swipe left or right anywhere on your phone or tablet screen.'}
          </p>
        </div>
      </div>

      {/* Brass Speaker Callout */}
      <div className="bg-gradient-to-r from-brass/15 via-brass/25 to-brass/15 border border-brass rounded-xl p-2 sm:p-2.5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-paper border border-brass flex items-center justify-center text-ink-teal sound-btn-ring shrink-0">
          <Volume2 className="w-4 h-4 text-ink-teal" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-xs sm:text-sm text-ink-teal">
            {isHindi ? 'आवाज (ऑडियो) से सुनें' : 'Listen with Audio Narration'}
          </div>
          <p className="text-[10px] sm:text-xs text-ink-muted leading-tight">
            {isHindi
              ? 'हर पन्ने के नीचे दिए गए ब्रास स्पीकर बटन को दबाकर सुनें।'
              : 'Tap the brass speaker at the bottom of any page to listen.'}
          </p>
        </div>
      </div>
    </PageSurface>
  );
};
