'use client';

import React from 'react';
import { PhoneCall, ShieldCheck, Clock, Globe } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface HelplineCardProps {
  locale: Locale;
  className?: string;
}

export const HelplineCard: React.FC<HelplineCardProps> = ({
  locale,
  className = '',
}) => {
  const isHindi = locale === 'hi';

  return (
    <div
      className={`w-full bg-gradient-to-br from-[#EBF3F5] via-[#E2EDF0] to-[#D5E5E8] border-2 border-care-blue/50 rounded-2xl p-4 sm:p-5 space-y-3 select-none shadow-md ${className}`}
    >
      <div className="flex items-center justify-between border-b border-care-blue/30 pb-2">
        <div className="flex items-center gap-2 font-display font-black text-ink-teal text-base sm:text-lg">
          <PhoneCall className="w-5 h-5 text-care-blue shrink-0 animate-bounce" />
          <span>{isHindi ? 'राष्ट्रीय निःशुल्क हेल्पलाइन' : 'National Toll-Free Helpline'}</span>
        </div>
        <span className="text-xs font-bold text-care-blue-dark bg-care-blue/20 px-2.5 py-0.5 rounded-full">
          Govt. of India
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-paper p-3.5 rounded-xl border border-care-blue/40 shadow-inner">
        <div>
          <div className="text-xs text-ink-muted font-bold uppercase tracking-wider">
            {isHindi ? 'डायरेक्ट हेल्पलाइन नंबर' : 'Direct Helpline Number'}
          </div>
          <a
            href="tel:1097"
            className="text-3xl sm:text-4xl font-black font-display text-ink-teal tracking-wider hover:text-care-blue-dark transition-colors inline-flex items-center gap-2 mt-0.5"
            aria-label="Call National Helpline 1097"
          >
            <span>1097</span>
            <span className="text-xs font-bold bg-mineral-green text-white px-2 py-0.5 rounded-full">
              CALL FREE
            </span>
          </a>
        </div>

        <div className="text-xs text-ink space-y-1 font-medium sm:text-right border-t sm:border-t-0 sm:border-l border-brass/30 pt-2 sm:pt-0 sm:pl-4">
          <div className="flex items-center gap-1.5 sm:justify-end text-ink-teal">
            <Clock className="w-3.5 h-3.5 text-care-blue" />
            <span>24 Hours • 7 Days a Week</span>
          </div>
          <div className="flex items-center gap-1.5 sm:justify-end text-ink-muted">
            <Globe className="w-3.5 h-3.5 text-care-blue" />
            <span>Hindi, English & Regional Languages</span>
          </div>
          <div className="flex items-center gap-1.5 sm:justify-end text-mineral-green-dark font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-mineral-green" />
            <span>100% Anonymous & Confidential</span>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-ink-muted text-center font-medium">
        {isHindi
          ? 'सरकारी सुरक्षा क्लिनिक देश के सभी जिला अस्पतालों में स्थित हैं। यहाँ सभी जांच एवं दवाएं पूर्णतः मुफ्त हैं।'
          : 'Suraksha Clinics operate in every Government District Hospital across India with 100% free syndromic testing and care.'}
      </p>
    </div>
  );
};
