'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

interface BackCoverProps {
  locale: Locale;
  onReopen?: () => void;
}

export const BackCover: React.FC<BackCoverProps> = ({ locale, onReopen }) => {
  const isHindi = locale === 'hi';

  return (
    <div
      onClick={onReopen}
      className="relative w-full h-full p-5 sm:p-7 lg:p-9 flex flex-col justify-between select-none bg-gradient-to-bl from-[#FAF5EC] via-[#F4EDE0] to-[#EAE0CD] border-l-4 border-brass/40 shadow-2xl rounded-l-3xl overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label="Back cover of Swasthya Katha. Click to return to start."
    >
      {/* Decorative Brass Corner Ornaments */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-brass pointer-events-none rounded-tl-lg" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-brass pointer-events-none rounded-bl-lg" />
      <div className="absolute inset-4 border border-brass/25 rounded-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-coral/15 border border-coral/30 rounded-full text-xs font-bold text-coral-dark uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHindi ? 'राष्ट्रीय स्वास्थ्य शिक्षा पहल' : 'National Health Initiative'}</span>
        </div>
        <span className="text-xs font-mono font-bold text-brass">NACO / MoHFW</span>
      </div>

      {/* Center Motif & Accreditation */}
      <div className="relative z-10 text-center my-auto space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-ink-teal text-paper flex items-center justify-center shadow-lg border-2 border-brass/60 p-3">
          <ShieldCheck className="w-10 h-10 text-brass-light" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-ink-teal leading-tight">
          {isHindi ? 'स्वास्थ्य कथा' : 'Swasthya Katha'}
        </h2>

        <p className="text-xs sm:text-sm text-ink-muted font-body font-medium max-w-xs mx-auto leading-relaxed">
          {isHindi
            ? 'राष्ट्रीय एड्स नियंत्रण संगठन (NACO), स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार के दिशा-निर्देशों पर आधारित।'
            : 'Published in alignment with National AIDS Control Organisation (NACO) and Ministry of Health & Family Welfare guidelines.'}
        </p>

        <div className="p-3 bg-care-blue/15 border border-care-blue/30 rounded-xl max-w-xs mx-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-care-blue-dark">
            <PhoneCall className="w-3.5 h-3.5 text-care-blue" />
            <span>National AIDS Helpline: <strong>1097</strong></span>
          </div>
          <p className="text-[10px] text-ink-muted mt-0.5">24x7 Toll-Free • Multilingual • 100% Confidential</p>
        </div>
      </div>

      {/* Bottom Reopen Hint */}
      <div className="relative z-10 text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReopen?.();
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink-teal hover:bg-teal-dark text-paper font-semibold text-xs sm:text-sm rounded-full transition-all shadow hover:scale-105 active:scale-95"
        >
          <span>{isHindi ? 'पुनः प्रारंभ करें (प्रथम पृष्ठ)' : 'Read Again from Beginning'}</span>
        </button>
      </div>
    </div>
  );
};
