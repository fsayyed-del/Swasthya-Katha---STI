'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { MythFactFlipCard } from '../MythFactFlipCard';

interface Page06MythFactProps {
  locale: Locale;
}

export const Page06MythFact: React.FC<Page06MythFactProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[6];
  const isHindi = locale === 'hi';

  const cards = [
    {
      idx: 1,
      myth: isHindi
        ? 'केवल देखकर पता लगाया जा सकता है कि किसी को संक्रमण है या नहीं।'
        : 'You can tell if someone has an infection just by looking at them.',
      fact: isHindi
        ? 'अधिकांश संक्रमणों में कोई शुरुआती लक्षण नहीं दिखता। केवल टेस्ट ही सच्चाई बताता है।'
        : 'Most infections have zero early signs. Only a clinical test tells the truth.',
    },
    {
      idx: 2,
      myth: isHindi
        ? 'साथ खाना खाने, हाथ मिलाने या टॉयलेट सीट से STI संक्रमण फैलता है।'
        : 'STIs spread through casual contact, sharing food, or toilet seats.',
      fact: isHindi
        ? 'STI केवल असुरक्षित अंतरंग शारीरिक संपर्क से फैलता है, सामान्य दैनिक संपर्क से कभी नहीं।'
        : 'STIs never spread through hugging, sharing utensils, or toilet seats.',
    },
    {
      idx: 3,
      myth: isHindi
        ? 'क्लिनिक में जांच कराने पर नाम उजागर होगा और लोग बातें बनाएंगे।'
        : 'Getting tested means you will be judged, exposed, or shamed.',
      fact: isHindi
        ? 'सरकारी सुरक्षा क्लिनिक में सभी जांच 100% गोपनीय, कोड-आधारित और पूर्णतः मुफ्त हैं।'
        : 'Suraksha Clinic visits are 100% confidential, respectful, and free.',
    },
  ];

  return (
    <PageSurface
      pageNumber={6}
      chapterHue="coral"
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Header */}
      <div className="shrink-0">
        <div className="text-[10px] font-bold text-coral-dark uppercase tracking-widest border-b border-brass/30 pb-0.5">
          {page.eyebrow?.[locale] || page.eyebrow?.en}
        </div>
        <h2 className="text-xl sm:text-2xl font-black font-display text-ink-teal mt-0.5">
          {page.title[locale] || page.title.en}
        </h2>
        <p className="text-[10.5px] sm:text-xs text-ink-muted mt-0.5 font-medium">
          {page.subheading?.[locale] || page.subheading?.en}
        </p>
      </div>

      {/* 3 Interactive 3D Flip Comparison Cards */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between overflow-hidden my-auto py-0.5">
        {cards.map((c) => (
          <MythFactFlipCard
            key={c.idx}
            index={c.idx}
            mythText={c.myth}
            factText={c.fact}
            locale={locale}
          />
        ))}
      </div>
    </PageSurface>
  );
};
