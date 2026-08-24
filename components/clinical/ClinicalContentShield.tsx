'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface ClinicalContentShieldProps {
  children: React.ReactNode;
  illustratedFallback?: React.ReactNode;
  locale: Locale;
  sensitivity?: 'low' | 'moderate' | 'high';
}

export const ClinicalContentShield: React.FC<ClinicalContentShieldProps> = ({
  children,
  illustratedFallback,
  locale,
  sensitivity = 'high'
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showIllustrated, setShowIllustrated] = useState(true);

  if (showIllustrated && illustratedFallback) {
    return (
      <div className="space-y-2">
        {illustratedFallback}
        <div className="flex items-center justify-between text-[10px] text-ink-muted px-1">
          <span className="flex items-center gap-1 font-semibold text-teal-dark">
            <Sparkles className="w-3 h-3 text-teal" />
            {locale === 'hi' ? 'दिशानिर्देशित सचित्र दृश्य' : 'Dignified Illustrated View'}
          </span>
          <button
            onClick={() => {
              setShowIllustrated(false);
              setIsRevealed(false);
            }}
            className="text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
          >
            {locale === 'hi' ? 'नैदानिक फोटोग्राफी देखें' : 'View Clinical Photography'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-paper-deep/30">
      {/* Blurred Content Container */}
      <div
        className={`transition-all duration-500 ${
          isRevealed ? 'filter-none' : 'blur-xl select-none pointer-events-none opacity-40 scale-95'
        }`}
      >
        {children}
      </div>

      {/* Sensitive Content Warning Shield (When Hidden) */}
      {!isRevealed && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-md text-white text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
            <ShieldAlert className="w-4 h-4" />
          </div>

          <div className="space-y-1 max-w-xs">
            <h4 className="text-xs font-bold text-amber-200">
              {locale === 'hi' ? 'संवेदनशील नैदानिक सामग्री' : 'Sensitive Clinical Content'}
            </h4>
            <p className="text-[10px] text-paper-light/90 leading-tight">
              {locale === 'hi'
                ? 'यह तस्वीर स्वास्थ्य शिक्षा के लिए है। केवल देखने से निदान नहीं होता। प्रशिक्षित स्वास्थ्य कार्यकर्ता से परामर्श लें।'
                : 'Intended for health education. Visual appearance cannot confirm diagnosis. Consult a health counselor.'}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsRevealed(true)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-ink font-bold text-xs rounded-full shadow transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{locale === 'hi' ? 'चित्र देखें' : 'Reveal Visual'}</span>
            </button>

            {illustratedFallback && (
              <button
                onClick={() => setShowIllustrated(true)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white font-medium text-xs rounded-full transition-all"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>{locale === 'hi' ? 'चित्रण पर लौटें' : 'Illustration View'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Discreet Re-hide / Switch button when revealed */}
      {isRevealed && (
        <div className="flex items-center justify-between p-1.5 bg-paper-deep/80 border-t border-border text-[10px] text-ink-muted">
          <button
            onClick={() => setIsRevealed(false)}
            className="flex items-center gap-1 hover:text-ink font-medium"
          >
            <EyeOff className="w-3 h-3" />
            <span>{locale === 'hi' ? 'छिपाएं' : 'Hide Photo'}</span>
          </button>
          {illustratedFallback && (
            <button
              onClick={() => setShowIllustrated(true)}
              className="text-teal hover:text-teal-dark font-bold underline"
            >
              {locale === 'hi' ? 'सचित्र दृश्य पर स्विच करें' : 'Switch to Illustration'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
