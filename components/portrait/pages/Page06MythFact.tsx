'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { MythFactFlipCard } from '../MythFactFlipCard';
import { Sparkles, ShieldAlert } from 'lucide-react';

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
        ? 'केवल देखकर पता लगाया जा सकता है कि किसी को STI या सिफलिस है या नहीं।'
        : 'You can tell if someone has an STI just by looking at them.',
      fact: isHindi
        ? 'अधिकांश STI व सिफलिस मामलों में कोई बाहरी लक्षण नहीं दिखता। केवल क्लिनिकल व लैब टेस्ट ही सही स्थिति बताते हैं।'
        : 'Most STIs (including early Syphilis & Chlamydia) show zero obvious symptoms. Only certified clinical testing confirms infection.',
    },
    {
      idx: 2,
      myth: isHindi
        ? 'साथ खाना खाने, कपड़े साझा करने या टॉयलेट सीट के इस्तेमाल से STI फैलता है।'
        : 'STIs spread through casual contact, sharing food, clothes, or toilet seats.',
      fact: isHindi
        ? 'STI केवल असुरक्षित शारीरिक संपर्क या संक्रमित सुई/रक्त से फैलता है, सामान्य दैनिक मेलजोल से कभी नहीं।'
        : 'STIs are transmitted strictly via unprotected sexual contact or blood exchange, never through daily casual contact.',
    },
    {
      idx: 3,
      myth: isHindi
        ? 'जांच कराने पर पहचान उजागर होगी और सामाजिक बदनामी या भेदभाव का सामना करना पड़ेगा।'
        : 'Getting tested means you will be judged, exposed, or shamed.',
      fact: isHindi
        ? 'सरकारी सुरक्षा क्लिनिक में सभी परामर्श व जांच 100% गोपनीय, कोड-आधारित, सम्मानजनक और पूर्णतः निःशुल्क हैं।'
        : 'Suraksha Clinic visits are 100% confidential, non-judgmental, free, and protected under national patient privacy guidelines.',
    },
    {
      idx: 4,
      myth: isHindi
        ? 'जननांग घाव या स्राव अपने आप ठीक हो जाने पर दवा की कोई आवश्यकता नहीं होती।'
        : 'Once symptoms or ulcers disappear on their own, the infection is cured.',
      fact: isHindi
        ? 'सिफलिस का घाव सूखने के बाद बैक्टीरिया शरीर में फैलता रहता है। NACO किट का पूरा कोर्स लेना अनिवार्य है।'
        : 'Primary Syphilis ulcers often heal while bacteria spreads internally. Completing the full NACO kit regimen is essential.',
    },
  ];

  return (
    <PageSurface
      pageNumber={13}
      chapterHue="coral"
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Editorial Header */}
      <div className="shrink-0 border-b border-brass/40 pb-1 mb-1">
        <div className="flex items-center justify-between">
          <div className="text-[9px] sm:text-[10px] font-mono font-bold text-[#A84833] uppercase tracking-widest flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-coral" />
            <span>{isHindi ? 'अध्याय 4 • भ्रांतियां एवं वैज्ञानिक तथ्य' : 'CHAPTER 4 • MYTHS VS. SCIENTIFIC FACTS'}</span>
          </div>
          <span className="text-[8.5px] font-mono font-bold text-ink-muted bg-paper-shadow px-2 py-0.5 rounded-full">
            {isHindi ? 'होवर / टैप करें' : 'Hover to Reveal'}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-black font-display text-ink-teal leading-tight mt-0.5">
          {isHindi ? 'सच या भ्रम: वैज्ञानिक तथ्यों की पड़ताल' : 'True or False: Myths vs. Clinical Facts'}
        </h2>
        <p className="text-[9px] sm:text-[9.5px] text-ink-muted font-medium">
          {isHindi
            ? 'कार्ड पर कर्सर ले जाएं (या टैप करें) और भ्रांति के पीछे का प्रमाणित वैज्ञानिक सच जानें।'
            : 'Hover over each card (or tap on mobile) to flip and discover the verified scientific truth.'}
        </p>
      </div>

      {/* 4 Interactive Hover-Flip Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 flex-1 overflow-hidden my-auto py-0.5">
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

      {/* Bottom Summary Callout */}
      <div className="bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-xl text-[8.5px] sm:text-[9px] text-ink font-medium flex items-center justify-between shrink-0 mt-1">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
          <span>
            {isHindi
              ? 'सटीक जानकारी ही कलंक और भ्रांतियों को मिटाने का सबसे सशक्त माध्यम है।'
              : 'Accurate scientific awareness is the strongest shield against stigma and misinformation.'}
          </span>
        </span>
        <span className="font-bold text-[#A84833] shrink-0">NACO Certified</span>
      </div>
    </PageSurface>
  );
};
