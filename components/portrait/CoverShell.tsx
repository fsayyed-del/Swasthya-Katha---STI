'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Sparkles, MoveRight, BookOpen, ShieldCheck } from 'lucide-react';
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
      className={`relative w-full h-full p-4 sm:p-7 lg:p-8 flex flex-col justify-between select-none cursor-pointer bg-gradient-to-br from-[#FCF8F2] via-[#F5ECE0] to-[#E5D7BF] border-r-4 border-brass/50 shadow-2xl rounded-r-3xl overflow-hidden group ${className}`}
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
      {/* Decorative Gold Filigree Corner Accents */}
      <div className="absolute top-3.5 right-3.5 w-10 h-10 border-t-2 border-r-2 border-brass/70 pointer-events-none rounded-tr-xl" />
      <div className="absolute bottom-3.5 right-3.5 w-10 h-10 border-b-2 border-r-2 border-brass/70 pointer-events-none rounded-br-xl" />
      <div className="absolute inset-3 border border-brass/30 rounded-2xl pointer-events-none" />

      {/* Top Institutional Header & Language Switcher */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink-teal/10 border border-ink-teal/25 rounded-full text-[9.5px] sm:text-[10.5px] font-mono font-bold text-ink-teal uppercase tracking-widest shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-mineral-green" />
          <span>{isHindi ? 'राष्ट्रीय स्वास्थ्य संस्करण 2026' : 'Alliance India • NACO 2026'}</span>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="bg-paper/90 backdrop-blur-xs border border-brass/40 rounded-full px-2 py-0.5 shadow-sm">
          <LocaleSwitcher currentLocale={locale} onLocaleChange={onLocaleChange} />
        </div>
      </div>

      {/* Center Masterpiece Motif & Typography */}
      <div className="relative z-10 text-center my-auto space-y-3 sm:space-y-4">
        {/* Layered Paper-Cut Medical Shield Emblem */}
        <div className="w-18 h-18 sm:w-22 sm:h-22 mx-auto rounded-3xl bg-gradient-to-br from-[#123A3C] via-[#1E4D4F] to-[#0A2224] text-paper flex items-center justify-center shadow-xl border-2 border-amber-300/60 p-3 group-hover:scale-105 transition-transform duration-500">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Protective Shield Geometry */}
            <path d="M 50,15 L 80,28 C 80,62 50,85 50,85 C 50,85 20,62 20,28 Z" fill="rgba(216, 238, 230, 0.2)" stroke="#E0C58E" />
            {/* Caduceus / Health Torch Core */}
            <path d="M 50,26 L 50,72" stroke="#E0C58E" strokeWidth="4" />
            <circle cx="50" cy="32" r="5" fill="#D97B66" stroke="#E0C58E" strokeWidth="2" />
            <path d="M 38,44 Q 50,38 62,44 Q 50,54 38,44" fill="none" stroke="#D8EEE6" strokeWidth="3" />
            <path d="M 40,56 Q 50,50 60,56 Q 50,64 40,56" fill="none" stroke="#D8EEE6" strokeWidth="3" />
          </svg>
        </div>

        {/* Display Title in Fraunces */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-ink-teal leading-none">
            {isHindi ? 'स्वास्थ्य कथा' : 'Swasthya Katha'}
          </h1>
          <p className="text-xs sm:text-sm font-display italic font-semibold text-brass">
            {isHindi ? 'यौन स्वास्थ्य एवं सिंड्रोमिक केस मैनेजमेंट मार्गदर्शिका' : 'STI Clinical Atlas & Field Ready Reckoner'}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-ink-muted font-body font-medium max-w-sm mx-auto leading-relaxed">
          {isHindi
            ? 'कारागारों एवं बंद संस्थानों हेतु लक्षण पहचान, NACO किट प्रोटोकॉल और सुरक्षित परामर्श।'
            : 'A practical, field-oriented ready reckoner for STI identification, NACO kits, and referrals in closed settings.'}
        </p>

        {/* Accredited Program Badge */}
        <div className="pt-1">
          <span className="inline-block px-3.5 py-1 bg-mineral-green/15 border border-mineral-green/30 rounded-full text-[10px] sm:text-[11px] font-bold text-mineral-green-dark shadow-xs">
            {isHindi ? 'सुरक्षा क्लीनिक मानक • NACO 7-किट सिंड्रोमिक प्रबंधन' : 'Syndromic Case Management • Suraksha Standard'}
          </span>
        </div>
      </div>

      {/* Bottom Interactive Open Invitation */}
      <div className="relative z-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-ink-teal via-[#1E4D4F] to-ink-teal hover:from-teal-dark hover:to-ink-teal text-paper font-semibold text-xs sm:text-sm rounded-full transition-all shadow-xl group-hover:scale-105 group-active:scale-95 border border-amber-300/40">
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>{isHindi ? 'खोलने के लिए क्लिक करें या स्वाइप करें' : 'Click or swipe to open handbook'}</span>
          <MoveRight className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
