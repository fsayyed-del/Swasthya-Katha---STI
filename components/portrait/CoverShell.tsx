'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Sparkles, MoveRight, BookOpen, ShieldCheck, Stethoscope, FileText } from 'lucide-react';
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
      className={`relative w-full h-full p-4 sm:p-6 lg:p-7 flex flex-col justify-between select-none cursor-pointer bg-gradient-to-br from-[#FCF9F3] via-[#F6EEE2] to-[#EAE0D0] border-r-4 border-brass/50 shadow-2xl rounded-r-3xl overflow-hidden group ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Closed book cover, titled Swasthya Katha: STI & Syphilis Handbook for Prison & Closed Settings. Activate to open."
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {/* Decorative Gold Filigree Corner Accents */}
      <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-brass/60 pointer-events-none rounded-tr-lg" />
      <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-brass/60 pointer-events-none rounded-br-lg" />
      <div className="absolute inset-3 border border-brass/30 rounded-2xl pointer-events-none" />

      {/* Top Institutional Accreditation & Language Switcher */}
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink-teal/10 border border-ink-teal/25 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-ink-teal uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-mineral-green" />
          <span>{isHindi ? 'इंडिया एचआईवी/एड्स एलायंस • NACO 2026' : 'India HIV/AIDS Alliance • NACO 2026'}</span>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="bg-paper/90 backdrop-blur-xs border border-brass/40 rounded-full px-2 py-0.5 shadow-sm">
          <LocaleSwitcher currentLocale={locale} onLocaleChange={onLocaleChange} />
        </div>
      </div>

      {/* Center Editorial Title & Purpose Block */}
      <div className="relative z-10 text-center my-auto space-y-2.5 sm:space-y-3 shrink-0">
        {/* Compact Medical Shield Emblem (Fixed Size) */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#123A3C] via-[#1E4D4F] to-[#0A2224] text-paper flex items-center justify-center shadow-lg border border-amber-300/60 p-2 group-hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 50,15 L 80,28 C 80,62 50,85 50,85 C 50,85 20,62 20,28 Z" fill="rgba(216, 238, 230, 0.25)" stroke="#E0C58E" />
            <path d="M 50,26 L 50,72" stroke="#E0C58E" strokeWidth="4" />
            <circle cx="50" cy="32" r="5" fill="#D97B66" stroke="#E0C58E" strokeWidth="2" />
            <path d="M 38,44 Q 50,38 62,44 Q 50,54 38,44" fill="none" stroke="#D8EEE6" strokeWidth="3" />
            <path d="M 40,56 Q 50,50 60,56 Q 50,64 40,56" fill="none" stroke="#D8EEE6" strokeWidth="3" />
          </svg>
        </div>

        {/* Display Title in Fraunces */}
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-ink-teal leading-tight">
            {isHindi ? 'स्वास्थ्य कथा' : 'Swasthya Katha'}
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm font-display italic font-bold text-brass">
            {isHindi
              ? 'यौन संचारित संक्रमण (STI) एवं सिफलिस फील्ड रेडी रेकनर'
              : 'STI & Syphilis Clinical Handbook & Ready Reckoner'}
          </p>
          <div className="text-[9.5px] sm:text-[10.5px] font-mono font-bold text-care-blue-dark tracking-wider uppercase">
            {isHindi
              ? 'कारागार एवं बंद संस्थान (Prison & OCS) फील्ड टीमों हेतु'
              : 'For Prison & Closed-Setting (OCS) Field Teams'}
          </div>
        </div>

        {/* Contextual Narrative from Project Concept */}
        <p className="text-[10px] sm:text-[11px] md:text-xs text-ink-muted font-body font-medium max-w-md mx-auto leading-relaxed line-clamp-3 px-1">
          {isHindi
            ? 'कारागारों एवं बंद संस्थानों में पुरुषों व महिलाओं में STI/सिफलिस लक्षणों की त्वरित पहचान, सिंड्रोमिक केस मैनेजमेंट (SCM), समय पर रेफरल, काउंसलिंग एवं राष्ट्रीय दिशा-निर्देशों के तहत सटीक रिपोर्टिंग हेतु व्यावहारिक मार्गदर्शिका।'
            : 'A practical, field-oriented ready reckoner for Project Coordinators to identify common STI syndromes, facilitate timely testing & referrals, and ensure standardized Syndromic Case Management (SCM) reporting.'}
        </p>

        {/* 3 Core Functional Pillar Badges */}
        <div className="grid grid-cols-3 gap-1.5 max-w-sm mx-auto pt-1 text-[8.5px] sm:text-[9px] font-bold">
          <div className="bg-paper border border-brass/40 rounded-lg p-1 text-ink-teal flex items-center justify-center gap-1 shadow-xs">
            <Stethoscope className="w-3 h-3 text-mineral-green shrink-0" />
            <span>{isHindi ? 'लक्षण पहचान' : 'Case ID'}</span>
          </div>
          <div className="bg-paper border border-brass/40 rounded-lg p-1 text-ink-teal flex items-center justify-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>{isHindi ? 'NACO किट (SCM)' : 'NACO SCM Kits'}</span>
          </div>
          <div className="bg-paper border border-brass/40 rounded-lg p-1 text-ink-teal flex items-center justify-center gap-1 shadow-xs">
            <FileText className="w-3 h-3 text-coral shrink-0" />
            <span>{isHindi ? 'रेफरल व रिपोर्टिंग' : 'Referral Care'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Open Invitation */}
      <div className="relative z-10 text-center shrink-0 pt-1">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-ink-teal via-[#1E4D4F] to-ink-teal hover:from-teal-dark hover:to-ink-teal text-paper font-semibold text-xs sm:text-sm rounded-full transition-all shadow-lg group-hover:scale-105 group-active:scale-95 border border-amber-300/40">
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>{isHindi ? 'पुस्तिका खोलने के लिए क्लिक या स्वाइप करें' : 'Click or swipe to open handbook'}</span>
          <MoveRight className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
