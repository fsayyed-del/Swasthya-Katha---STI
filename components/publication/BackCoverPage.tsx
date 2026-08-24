'use client';

import React from 'react';
import { PageContent } from './PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

interface BackCoverPageProps {
  content: PageContent;
  locale: Locale;
}

export const BackCoverPage: React.FC<BackCoverPageProps> = ({ content, locale }) => {
  const heading = content.heading[locale] || content.heading.en;
  const eyebrow = content.eyebrow?.[locale] || content.eyebrow?.en;
  const subheading = content.subheading?.[locale] || content.subheading?.en;

  return (
    <div
      className="page-face page-face-back bg-gradient-to-bl from-[#10353A] via-[#0D2C30] to-[#081D20] text-[#F6F1E4] p-5 sm:p-7 lg:p-8 flex flex-col justify-between select-none relative border-l-2 border-amber-600/30 overflow-hidden shadow-2xl"
    >
      <div className="spine-crease-left" />
      <div className="absolute inset-2.5 sm:inset-3 border-2 border-amber-400/40 rounded-xl pointer-events-none" />

      {/* Top Emblem */}
      <div className="relative z-10 text-center pt-1">
        <span className="inline-block px-3 py-0.5 bg-amber-400/10 border border-amber-400/30 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300">
          {eyebrow}
        </span>
      </div>

      {/* Center Body */}
      <div className="relative z-10 text-center my-auto space-y-3 sm:space-y-4 max-w-xs sm:max-w-sm mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black font-display text-amber-200 leading-tight">
          {heading}
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed font-medium">
          {subheading}
        </p>

        {/* 1097 Helpline Reassurance Box */}
        <div className="bg-white/10 p-3 sm:p-3.5 rounded-xl border border-white/20 text-left flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
              National AIDS Helpline
            </div>
            <div className="text-base sm:text-lg font-black text-white">Dial 1097 (Toll-Free, 24x7)</div>
          </div>
        </div>
      </div>

      {/* Accreditation Notice */}
      <div className="relative z-10 text-center text-[10px] text-amber-200/70 border-t border-amber-400/20 pt-2">
        Ministry of Health & Family Welfare • Government of India
      </div>
    </div>
  );
};
