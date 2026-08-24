'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { ClinicalImageGate } from '../ClinicalImageGate';
import { NonDiagnosticDisclaimer } from '../NonDiagnosticDisclaimer';
import { ClinicalMetadataFooter } from '../ClinicalMetadataFooter';

interface Page04SensitiveSignsProps {
  locale: Locale;
}

export const Page04SensitiveSigns: React.FC<Page04SensitiveSignsProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[4];
  const isHindi = locale === 'hi';

  return (
    <PageSurface
      pageNumber={4}
      chapterHue="mineral-green"
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Header */}
      <div>
        <div className="text-xs font-bold text-mineral-green-dark uppercase tracking-widest border-b border-brass/30 pb-1">
          {page.eyebrow?.[locale] || page.eyebrow?.en}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-display text-ink-teal mt-1">
          {page.title[locale] || page.title.en}
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-medium">
          {page.subheading?.[locale] || page.subheading?.en}
        </p>
      </div>

      {/* Primary Dimensional Paper-Cut Illustration FIRST (Non-graphic, calm noticing figure) */}
      <div className="w-full bg-paper-shadow/50 border-2 border-mineral-green/30 rounded-2xl p-3 sm:p-4 flex items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#4F7A6C] to-[#2F5247] flex items-center justify-center text-paper shrink-0 shadow-md">
          <svg viewBox="0 0 80 80" className="w-12 h-12 fill-none stroke-current" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="40" cy="25" r="12" fill="#D8EEE6" stroke="#123A3C" />
            <path d="M 20,65 C 20,45 35,42 40,42 C 45,42 60,45 60,65" fill="#D8EEE6" stroke="#123A3C" />
            {/* Gentle Hand Noticing Point */}
            <circle cx="52" cy="52" r="5" fill="#D97B66" />
          </svg>
        </div>

        <div className="flex-1 space-y-1">
          <div className="font-bold text-sm sm:text-base text-ink-teal">
            {isHindi ? '1. अपने शरीर को समझना' : '1. Notice Without Panic'}
          </div>
          <p className="text-xs sm:text-sm text-ink font-body leading-relaxed">
            {isHindi
              ? 'शरीर में सूजन, खुजली या दर्द होने पर घबराएं नहीं। यह साधारण चिकित्सीय स्थिति हो सकती है।'
              : 'Noticing changes is common. Never try to guess on your own — visit a health worker.'}
          </p>
        </div>
      </div>

      {/* Gated Clinical Reference Image Container (Locked until explicit opt-in) */}
      <div className="pt-1">
        <ClinicalImageGate
          imageSrc="/images/clinical/syphilis_chancre_penis.webp"
          altText="Clinical reference photograph of primary syphilitic ulcer on male anatomy"
          locale={locale}
        />
      </div>

      {/* Mandatory Non-Diagnostic Disclaimer Strip */}
      <NonDiagnosticDisclaimer locale={locale} />

      {/* Clinical Governance Metadata Footer */}
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
