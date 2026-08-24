'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { ClinicalMetadataFooter } from '../ClinicalMetadataFooter';
import { Sparkles, PhoneCall } from 'lucide-react';

interface Page08ClosingProps {
  locale: Locale;
}

export const Page08Closing: React.FC<Page08ClosingProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[8];
  const isHindi = locale === 'hi';

  return (
    <PageSurface
      pageNumber={8}
      chapterHue="coral"
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Header */}
      <div>
        <div className="text-xs font-bold text-coral-dark uppercase tracking-widest border-b border-brass/30 pb-1 flex items-center justify-between">
          <span>{page.eyebrow?.[locale] || page.eyebrow?.en}</span>
          <span className="flex items-center gap-1 text-brass">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete</span>
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-display text-ink-teal mt-1">
          {page.title[locale] || page.title.en}
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-medium">
          {page.subheading?.[locale] || page.subheading?.en}
        </p>
      </div>

      {/* Central Reassurance Paper-Cut Motif in Coral */}
      <div className="bg-gradient-to-br from-[#FDF2E9] to-[#FBE6D6] border-2 border-coral/30 rounded-2xl p-4 sm:p-5 text-center space-y-2 shadow-inner">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-coral/20 border-2 border-coral/50 flex items-center justify-center text-coral shadow-md">
          <svg viewBox="0 0 80 80" className="w-10 h-10 fill-none stroke-current" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 40,15 C 40,15 20,25 20,45 C 20,60 40,70 40,70 C 40,70 60,60 60,45 C 60,25 40,15 40,15 Z" fill="#D97B66" stroke="#123A3C" />
            <circle cx="40" cy="42" r="6" fill="#F7F1E4" />
          </svg>
        </div>

        <p className="text-sm sm:text-base text-ink font-semibold max-w-md mx-auto leading-relaxed">
          {isHindi
            ? 'स्वास्थ्य के बारे में जागरूक होना आपके और आपके परिवार के सुरक्षित भविष्य की सबसे बड़ी शुरुआत है।'
            : 'Taking time to understand your health and rights is a powerful step toward lasting wellbeing.'}
        </p>

        {/* Small Helpline Repeat */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs font-bold text-ink-teal">
          <PhoneCall className="w-4 h-4 text-care-blue" />
          <span>National AIDS Helpline: <strong className="text-coral-dark text-sm">1097</strong> (24/7 Free)</span>
        </div>
      </div>

      {/* Back Cover Governance Credits */}
      <ClinicalMetadataFooter
        source={page.clinicalMetadata?.source}
        reviewer={page.clinicalMetadata?.reviewer}
        dateReviewed={page.clinicalMetadata?.dateReviewed}
        rightsLicense={page.clinicalMetadata?.rightsLicense}
        version={page.clinicalMetadata?.version}
      />
    </PageSurface>
  );
};
