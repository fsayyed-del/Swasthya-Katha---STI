'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Sparkles, MoveRight } from 'lucide-react';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';

interface CoverShellProps {
  onOpen: () => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  className?: string;
}

export const CoverShell: React.FC<CoverShellProps> = ({
  onOpen,
  locale,
  onLocaleChange,
  className = '',
}) => {
  const isHindi = locale === 'hi';

  return (
    <div
      onClick={onOpen}
      className={`relative w-full h-full p-5 sm:p-7 lg:p-9 flex flex-col justify-between select-none cursor-pointer bg-gradient-to-br from-[#FAF5EC] via-[#F4EDE0] to-[#EAE0CD] border-r-4 border-brass/40 shadow-2xl rounded-r-3xl overflow-hidden ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Closed book cover, titled Swasthya Katha. Activate to open."
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {/* Decorative Brass Corner Ornaments */}
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-brass pointer-events-none rounded-tr-lg" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-brass pointer-events-none rounded-br-lg" />
      <div className="absolute inset-4 border border-brass/25 rounded-2xl pointer-events-none" />

      {/* Top Header Badge & Language Switcher */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-mineral-green/15 border border-mineral-green/30 rounded-full text-xs font-bold text-mineral-green-dark uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHindi ? 'राष्ट्रीय स्वास्थ्य संस्करण 2026' : 'National Health Edition 2026'}</span>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="bg-paper border border-brass/40 rounded-full px-2 py-0.5 shadow-sm">
          <LocaleSwitcher currentLocale={locale} onLocaleChange={onLocaleChange} />
        </div>
      </div>

      {/* Center Motif & Title */}
      <div className="relative z-10 text-center my-auto space-y-4">
        {/* Paper-Cut Mineral-Green Protective Hand & Leaf Motif */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#4F7A6C] to-[#3B5C51] text-paper flex items-center justify-center shadow-lg border-2 border-brass/60 p-3">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            {/* Open Protective Palm Motif */}
            <path d="M 30,75 C 30,55 35,40 40,25 C 43,15 57,15 60,25 C 65,40 70,55 70,75 Z" fill="#D8EEE6" stroke="#123A3C" />
            <path d="M 50,30 L 50,65" stroke="#123A3C" strokeWidth="4" />
            <circle cx="50" cy="50" r="8" fill="#D97B66" />
          </svg>
        </div>

        {/* Title in Fraunces (Display) */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-ink-teal leading-tight">
          {isHindi ? 'स्वास्थ्य कथा' : 'Swasthya Katha'}
        </h1>

        <p className="text-base sm:text-lg text-ink-muted font-body font-medium max-w-sm mx-auto leading-relaxed">
          {isHindi
            ? 'यौन स्वास्थ्य, जांच एवं सरकारी सुरक्षा क्लिनिक देखभाल की सम्मानजनक सचित्र गाइड।'
            : 'A visual, respectful, and stigma-free guide to health, testing, and care.'}
        </p>

        <div className="pt-1">
          <span className="inline-block px-3 py-1 bg-care-blue/15 border border-care-blue/30 rounded-full text-xs sm:text-sm font-bold text-care-blue-dark">
            NACO Syndromic Care • Suraksha Clinics
          </span>
        </div>
      </div>

      {/* Bottom Gesture Affordance */}
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-teal hover:bg-teal-dark text-paper font-semibold text-sm sm:text-base rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 animate-pulse">
          <span>{isHindi ? 'खोलने के लिए छुएं या स्वाइप करें' : 'Touch or swipe to open'}</span>
          <MoveRight className="w-4 h-4 text-brass-light" />
        </div>
      </div>
    </div>
  );
};
