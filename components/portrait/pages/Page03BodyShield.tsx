'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { IconLabel } from '../IconLabel';
import { ShieldCheck, Stethoscope, HeartHandshake } from 'lucide-react';

interface Page03BodyShieldProps {
  locale: Locale;
}

export const Page03BodyShield: React.FC<Page03BodyShieldProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[3];
  const isHindi = locale === 'hi';

  return (
    <PageSurface
      pageNumber={3}
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

      {/* Central Dimensional Paper-Cut Illustration (Shield around calm figure) */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#EBF5F0] via-[#E2EFE9] to-[#D5E7DF] rounded-2xl border-2 border-mineral-green/40 p-4 flex items-center justify-center overflow-hidden shadow-inner">
        {/* Radiating Aura Rings */}
        <div className="absolute w-48 h-48 rounded-full border border-mineral-green/20 animate-pulse-slow" />
        <div className="absolute w-64 h-64 rounded-full border border-mineral-green/10" />

        {/* Layered Paper-Cut Figure & Shield Vector */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Shield Graphic */}
          <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-b-full bg-gradient-to-b from-[#4F7A6C] to-[#2F5247] border-4 border-paper shadow-xl flex items-center justify-center p-3 text-paper">
            <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 50,15 L 85,30 C 85,75 50,105 50,105 C 50,105 15,75 15,30 Z" fill="#D8EEE6" stroke="#123A3C" strokeWidth="5" />
              {/* Inner Heart / Life Symbol */}
              <path d="M 50,45 C 50,35 60,35 65,45 C 70,55 50,75 50,75 C 50,75 30,55 35,45 C 40,35 50,35 50,45 Z" fill="#D97B66" stroke="#123A3C" strokeWidth="4" />
            </svg>
          </div>
          <span className="text-xs font-black text-mineral-green-dark uppercase tracking-widest mt-1 bg-paper/90 px-2.5 py-0.5 rounded-full border border-mineral-green/30 shadow-sm">
            {isHindi ? 'प्राकृतिक सुरक्षा कवच' : 'Protective Immunity'}
          </span>
        </div>
      </div>

      {/* 3 Icon Chips */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <IconLabel
          icon={<ShieldCheck className="w-6 h-6 text-mineral-green" />}
          label={isHindi ? 'समय पर जांच' : 'Testing Helps'}
          sublabel={isHindi ? 'सच्चाई जाने' : 'Stay Clear'}
          tintColor="mineral-green"
        />

        <IconLabel
          icon={<Stethoscope className="w-6 h-6 text-care-blue" />}
          label={isHindi ? 'सही देखभाल' : 'Care Helps'}
          sublabel={isHindi ? 'पूर्ण उपचार' : 'Quick Cure'}
          tintColor="care-blue"
        />

        <IconLabel
          icon={<HeartHandshake className="w-6 h-6 text-coral" />}
          label={isHindi ? 'आप अकेले नहीं' : 'Not Alone'}
          sublabel={isHindi ? 'हमेशा सहयोग' : 'Supportive'}
          tintColor="coral"
        />
      </div>
    </PageSurface>
  );
};
