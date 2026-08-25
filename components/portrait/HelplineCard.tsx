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
      className={`w-full bg-gradient-to-br from-[#EBF3F5] via-[#E2EDF0] to-[#D5E5E8] border border-care-blue/40 rounded-xl p-2.5 sm:p-3 space-y-1.5 select-none shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-care-blue/30 pb-1">
        <div className="flex items-center gap-1.5 font-display font-black text-ink-teal text-xs sm:text-sm">
          <PhoneCall className="w-4 h-4 text-care-blue shrink-0 animate-bounce" />
          <span>{isHindi ? 'राष्ट्रीय निःशुल्क हेल्पलाइन' : 'National Toll-Free Helpline'}</span>
        </div>
        <span className="text-[8.5px] font-bold text-care-blue-dark bg-care-blue/20 px-2 py-0.2 rounded-full">
          Govt. of India
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-paper p-2 rounded-lg border border-care-blue/30 shadow-inner">
        <div>
          <div className="text-[9px] text-ink-muted font-bold uppercase tracking-wider">
            {isHindi ? 'डायरेक्ट हेल्पलाइन' : 'Direct Helpline Number'}
          </div>
          <a
            href="tel:1097"
            className="text-2xl sm:text-3xl font-black font-display text-ink-teal tracking-wider hover:text-care-blue-dark transition-colors inline-flex items-center gap-2 mt-0.5"
            aria-label="Call National Helpline 1097"
          >
            <span>1097</span>
            <span className="text-[8.5px] font-bold bg-mineral-green text-white px-1.5 py-0.2 rounded-full">
              CALL FREE
            </span>
          </a>
        </div>

        <div className="text-[9.5px] text-ink space-y-0.5 font-medium sm:text-right border-t sm:border-t-0 sm:border-l border-brass/30 pt-1 sm:pt-0 sm:pl-3">
          <div className="flex items-center gap-1 sm:justify-end text-ink-teal">
            <Clock className="w-3 h-3 text-care-blue" />
            <span>24 Hours • 7 Days a Week</span>
          </div>
          <div className="flex items-center gap-1 sm:justify-end text-ink-muted">
            <Globe className="w-3 h-3 text-care-blue" />
            <span>Hindi, English & Regional Languages</span>
          </div>
          <div className="flex items-center gap-1 sm:justify-end text-mineral-green-dark font-bold">
            <ShieldCheck className="w-3 h-3 text-mineral-green" />
            <span>100% Anonymous & Confidential</span>
          </div>
        </div>
      </div>

      <p className="text-[9px] sm:text-[10px] text-ink-muted text-center font-medium leading-tight">
        {isHindi
          ? 'सरकारी सुरक्षा क्लिनिक देश के सभी जिला अस्पतालों में स्थित हैं। यहाँ सभी जांच एवं दवाएं पूर्णतः मुफ्त हैं।'
          : 'Suraksha Clinics operate in every Government District Hospital across India with 100% free syndromic testing and care.'}
      </p>
    </div>
  );
};
