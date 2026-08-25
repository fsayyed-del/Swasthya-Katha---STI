'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Sparkles, MoveRight, BookOpen, ShieldCheck, Stethoscope, FileText, Download, CheckCircle2, Share, PlusSquare, X } from 'lucide-react';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';
import { usePWAInstall } from '@/hooks/usePWAInstall';

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
  const { isInstallable, isInstalled, isIOS, installPWA } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInstalled) return;

    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    const success = await installPWA();
    if (!success) {
      // Fallback instructions for browsers without beforeinstallprompt
      setShowIOSModal(true);
    }
  };

  return (
    <div
      onClick={onOpen}
      className={`relative w-full h-full p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between select-none cursor-pointer bg-gradient-to-br from-[#FCF9F3] via-[#F6EEE2] to-[#EAE0D0] border-r-4 border-brass/50 shadow-2xl rounded-r-3xl overflow-hidden group ${className}`}
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
      <div className="absolute top-3.5 right-3.5 w-7 h-7 border-t-2 border-r-2 border-brass/60 pointer-events-none rounded-tr-lg" />
      <div className="absolute bottom-3.5 right-3.5 w-7 h-7 border-b-2 border-r-2 border-brass/60 pointer-events-none rounded-br-lg" />
      <div className="absolute inset-2.5 border border-brass/30 rounded-2xl pointer-events-none" />

      {/* Top Institutional Accreditation & Language Switcher */}
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-ink-teal/10 border border-ink-teal/25 rounded-full text-[8.5px] sm:text-[9.5px] font-mono font-bold text-ink-teal uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-mineral-green" />
          <span>{isHindi ? 'इंडिया एचआईवी/एड्स एलायंस • NACO 2026' : 'India HIV/AIDS Alliance • NACO 2026'}</span>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="bg-paper/90 backdrop-blur-xs border border-brass/40 rounded-full px-2 py-0.5 shadow-sm">
          <LocaleSwitcher currentLocale={locale} onLocaleChange={onLocaleChange} />
        </div>
      </div>

      {/* Center Editorial Title & Purpose Block */}
      <div className="relative z-10 text-center my-auto space-y-2 sm:space-y-2.5 shrink-0">
        {/* Compact Book Emblem Icon */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 mx-auto rounded-2xl bg-gradient-to-br from-[#123A3C] via-[#1E4D4F] to-[#0A2224] text-paper flex items-center justify-center shadow-lg border border-amber-300/60 p-2 group-hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Open Book Vector */}
            <path d="M 50,22 C 35,16 20,20 12,24 L 12,76 C 20,72 35,68 50,74 C 65,68 80,72 88,76 L 88,24 C 80,20 65,16 50,22 Z" fill="rgba(250, 246, 237, 0.2)" stroke="#E0C58E" />
            <path d="M 50,22 L 50,74" stroke="#E0C58E" strokeWidth="4" />
            <path d="M 24,38 L 40,36" stroke="#D8EEE6" strokeWidth="3" />
            <path d="M 24,48 L 40,46" stroke="#D8EEE6" strokeWidth="3" />
            <circle cx="70" cy="46" r="7" fill="#D97B66" stroke="#E0C58E" strokeWidth="2" />
          </svg>
        </div>

        {/* Display Title in Fraunces */}
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-ink-teal leading-tight">
            {isHindi ? 'स्वास्थ्य कथा' : 'Swasthya Katha'}
          </h1>
          <p className="text-[11px] sm:text-xs font-display italic font-bold text-brass">
            {isHindi
              ? 'यौन संचारित संक्रमण (STI) एवं सिफलिस फील्ड रेडी रेकनर'
              : 'STI & Syphilis Clinical Handbook & Ready Reckoner'}
          </p>
          <div className="text-[9px] sm:text-[10px] font-mono font-bold text-care-blue-dark tracking-wider uppercase">
            {isHindi
              ? 'कारागार एवं बंद संस्थान (Prison & OCS) फील्ड टीमों हेतु'
              : 'For Prison & Closed-Setting (OCS) Field Teams'}
          </div>
        </div>

        {/* Contextual Narrative from Project Concept */}
        <p className="text-[9.5px] sm:text-[10.5px] text-ink-muted font-body font-medium max-w-md mx-auto leading-relaxed line-clamp-3 px-1">
          {isHindi
            ? 'कारागारों एवं बंद संस्थानों में पुरुषों व महिलाओं में STI/सिफलिस लक्षणों की त्वरित पहचान, सिंड्रोमिक केस मैनेजमेंट (SCM), समय पर रेफरल, काउंसलिंग एवं राष्ट्रीय दिशा-निर्देशों के तहत सटीक रिपोर्टिंग हेतु व्यावहारिक मार्गदर्शिका।'
            : 'A practical, field-oriented ready reckoner for Project Coordinators to identify common STI syndromes, facilitate timely testing & referrals, and ensure standardized Syndromic Case Management (SCM) reporting.'}
        </p>

        {/* 3 Core Functional Pillar Badges */}
        <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto pt-0.5 text-[8px] sm:text-[8.5px] font-bold">
          <div className="bg-paper border border-brass/40 rounded-lg p-1 text-ink-teal flex items-center justify-center gap-1 shadow-xs">
            <Stethoscope className="w-2.5 h-2.5 text-mineral-green shrink-0" />
            <span>{isHindi ? 'लक्षण पहचान' : 'Case ID'}</span>
          </div>
          <div className="bg-paper border border-brass/40 rounded-lg p-1 text-ink-teal flex items-center justify-center gap-1 shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
            <span>{isHindi ? 'NACO किट' : 'NACO SCM'}</span>
          </div>
          <div className="bg-paper border border-brass/40 rounded-lg p-1 text-ink-teal flex items-center justify-center gap-1 shadow-xs">
            <FileText className="w-2.5 h-2.5 text-coral shrink-0" />
            <span>{isHindi ? 'रेफरल' : 'Referrals'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Dual Action Buttons: Open & Download Offline Ebook */}
      <div className="relative z-10 space-y-1.5 shrink-0 pt-0.5">
        {/* Open Handbook Button */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-ink-teal via-[#1E4D4F] to-ink-teal hover:from-teal-dark hover:to-ink-teal text-paper font-semibold text-xs rounded-full transition-all shadow-md group-hover:scale-105 border border-amber-300/40">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>{isHindi ? 'पुस्तिका खोलें' : 'Read Handbook'}</span>
            <MoveRight className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>
        </div>

        {/* Download / Install Offline Ebook Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleDownloadClick}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold border transition-all shadow-xs ${
              isInstalled
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-paper hover:bg-amber-100 text-ink-teal border-brass/60 hover:scale-105'
            }`}
            title="Download full ebook as offline app for any device"
          >
            {isInstalled ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{isHindi ? 'ऑफलाइन पुस्तिका इंस्टॉल है' : 'Offline Ebook Ready'}</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3 text-coral animate-bounce" />
                <span>{isHindi ? 'ऑफलाइन ई-बुक डाउनलोड करें (PWA)' : 'Download Offline Ebook (App)'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* iOS / Browser Installation Helper Modal */}
      {showIOSModal && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div className="bg-paper border-2 border-brass rounded-2xl max-w-xs w-full p-4 shadow-2xl space-y-3 text-ink">
            <div className="flex items-center justify-between border-b border-brass/40 pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-ink-teal">
                <Download className="w-4 h-4 text-coral" />
                <span>{isHindi ? 'ऑफलाइन ई-बुक डाउनलोड करें' : 'Install Offline Handbook'}</span>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 hover:bg-black/10 rounded-full"
              >
                <X className="w-4 h-4 text-ink-muted" />
              </button>
            </div>

            <p className="text-[11px] text-ink leading-relaxed font-medium">
              {isHindi
                ? 'इस संपूर्ण सचित्र पुस्तिका को अपने फोन, टैबलेट या कंप्यूटर पर 100% बिना इंटरनेट के उपयोग हेतु डाउनलोड करें:'
                : 'Save this entire medical handbook to your home screen / desktop for 100% offline access in closed settings:'}
            </p>

            <div className="bg-paper-shadow/80 p-2.5 rounded-xl border border-brass/30 space-y-2 text-[10px] font-medium text-ink">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-ink-teal text-paper flex items-center justify-center text-[9px] font-bold shrink-0">1</span>
                <span>{isHindi ? 'ब्राउज़र के मेन्यू या शेयर बटन पर टैप करें' : 'Tap the Share or Browser Menu (⎋)'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-ink-teal text-paper flex items-center justify-center text-[9px] font-bold shrink-0">2</span>
                <span className="flex items-center gap-1">
                  <span>{isHindi ? '"होम स्क्रीन पर जोड़ें" चुनें' : 'Select "Add to Home Screen"'}</span>
                  <PlusSquare className="w-3 h-3 text-ink-teal" />
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-1.5 bg-ink-teal text-paper rounded-xl text-xs font-bold shadow hover:bg-teal-dark"
            >
              {isHindi ? 'समझ गया' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
