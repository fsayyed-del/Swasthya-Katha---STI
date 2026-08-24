'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { HelplineCard } from '../HelplineCard';
import { CheckCircle2, Lock, HeartHandshake } from 'lucide-react';

interface Page07GetHelpProps {
  locale: Locale;
}

export const Page07GetHelp: React.FC<Page07GetHelpProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[7];
  const isHindi = locale === 'hi';

  return (
    <PageSurface
      pageNumber={7}
      chapterHue="care-blue"
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Header */}
      <div>
        <div className="text-xs font-bold text-care-blue-dark uppercase tracking-widest border-b border-brass/30 pb-1">
          {page.eyebrow?.[locale] || page.eyebrow?.en}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-display text-ink-teal mt-1">
          {page.title[locale] || page.title.en}
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-medium">
          {page.subheading?.[locale] || page.subheading?.en}
        </p>
      </div>

      {/* 3 Core Supportive Action Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
        <div className="bg-paper-shadow/60 border border-care-blue/30 rounded-xl p-2.5 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-mineral-green shrink-0" />
          <div className="text-xs font-bold text-ink">
            {isHindi ? '1. आपकी अपनी पसंद' : '1. Your Choice'}
          </div>
        </div>

        <div className="bg-paper-shadow/60 border border-care-blue/30 rounded-xl p-2.5 flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-care-blue shrink-0" />
          <div className="text-xs font-bold text-ink">
            {isHindi ? '2. 100% पूर्ण गोपनीयता' : '2. 100% Confidential'}
          </div>
        </div>

        <div className="bg-paper-shadow/60 border border-care-blue/30 rounded-xl p-2.5 flex items-center gap-2.5">
          <HeartHandshake className="w-5 h-5 text-coral shrink-0" />
          <div className="text-xs font-bold text-ink">
            {isHindi ? '3. मुफ्त एवं सम्मानजनक' : '3. Free & Respectful'}
          </div>
        </div>
      </div>

      {/* Prominent Referral Helpline Card */}
      <div className="pt-1">
        <HelplineCard locale={locale} />
      </div>
    </PageSurface>
  );
};
