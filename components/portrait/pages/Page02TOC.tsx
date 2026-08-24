'use client';

import React from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { MoveRight, Sparkles } from 'lucide-react';

interface Page02TOCProps {
  locale: Locale;
  onNavigateToPage: (pageIndex: number) => void;
}

export const Page02TOC: React.FC<Page02TOCProps> = ({
  locale,
  onNavigateToPage,
}) => {
  const page = PORTRAIT_BOOK_PAGES[2];
  const isHindi = locale === 'hi';

  const chaptersCol1 = [
    {
      pageIdx: 3,
      num: '01',
      title: isHindi ? "शरीर का सुरक्षा कवच" : "Your Body's Shield",
      desc: isHindi ? 'प्राकृतिक प्रतिरक्षा एवं स्वास्थ्य रक्षा' : 'Natural Defenses & Care Basics',
      pageLabel: '03',
    },
    {
      pageIdx: 4,
      num: '02',
      title: isHindi ? 'सिफलिस: प्राथमिक व द्वितीयक' : 'Syphilis: Chancre & Rashes',
      desc: isHindi ? 'घाव, हथेलियों पर चकत्ते व किट 3' : 'Chancres, Palmar Rashes & Kit 3',
      pageLabel: '04',
    },
    {
      pageIdx: 6,
      num: '03',
      title: isHindi ? 'गोनोरिया, क्लैमाइडिया व एलजीवी' : 'Gonorrhea & Chlamydia',
      desc: isHindi ? 'मवाद स्राव एवं गिल्टी सूजन' : 'Purulent Discharge & Buboes (Kit 1 & 7)',
      pageLabel: '06',
    },
    {
      pageIdx: 8,
      num: '04',
      title: isHindi ? 'हर्पीस, चैनक्रॉइड व जूँ' : 'Herpes, Chancroid & Lice',
      desc: isHindi ? 'दर्दनाक छाले, घाव व पेडीकुलोसिस' : 'Vesicles, Ulcers & Crab Lice (Kit 5)',
      pageLabel: '08',
    },
  ];

  const chaptersCol2 = [
    {
      pageIdx: 10,
      num: '05',
      title: isHindi ? 'मस्से, योनि स्राव व PID' : 'Warts, Vaginitis & PID',
      desc: isHindi ? 'HPV मस्से, असामान्य स्राव व किट 2/6' : 'HPV Papules, Vaginitis & Kit 2/6',
      pageLabel: '10',
    },
    {
      pageIdx: 12,
      num: '06',
      title: isHindi ? 'NACO 7 कलर किट कैबिनेट' : 'The NACO 7-Kit Cabinet',
      desc: isHindi ? 'मानकीकृत सिंड्रोमिक दवाएं' : 'Standardized Drug Protocols',
      pageLabel: '12',
    },
    {
      pageIdx: 13,
      num: '07',
      title: isHindi ? 'सच या झूठ: भ्रांति निवारण' : 'True or False: Myths & Facts',
      desc: isHindi ? 'वैज्ञानिक प्रमाण एवं फ्लिप कार्ड्स' : 'Evidence-Based 3D Flip Cards',
      pageLabel: '13',
    },
    {
      pageIdx: 14,
      num: '08',
      title: isHindi ? 'मदद कहाँ पाएं (हेल्पलाइन)' : 'Where to Get Help & 1097',
      desc: isHindi ? '100% गोपनीय सुरक्षा क्लिनिक' : 'Suraksha Clinics & Support',
      pageLabel: '14',
    },
  ];

  return (
    <PageSurface
      pageNumber={2}
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Editorial Header */}
      <div className="flex items-center justify-between border-b border-brass/40 pb-1 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-ink-muted uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-coral" />
          <span>{isHindi ? 'राष्ट्रीय स्वास्थ्य पत्रिका' : 'National Health Edition 2026'}</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-brass tracking-wider">NACO / MoHFW</span>
      </div>

      {/* Canva-Style Top Image Preview Mosaic Grid */}
      <div className="grid grid-cols-4 gap-1.5 h-20 sm:h-24 shrink-0 my-0.5">
        {/* Mosaic Item 1: Syphilis */}
        <div className="relative rounded-lg overflow-hidden border border-brass/40 bg-black/10 shadow-sm">
          <Image
            src="/images/clinical/syphilis_chancre_penis.webp"
            alt="Primary syphilis"
            fill
            sizes="120px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-teal/80 via-transparent to-transparent flex items-end p-1">
            <span className="text-[8px] font-bold text-paper font-mono uppercase">Syphilis</span>
          </div>
        </div>

        {/* Mosaic Item 2: Gonorrhea */}
        <div className="relative rounded-lg overflow-hidden border border-brass/40 bg-black/10 shadow-sm">
          <Image
            src="/images/clinical/gonorrhea_male_urethritis.webp"
            alt="Gonorrhea"
            fill
            sizes="120px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-teal/80 via-transparent to-transparent flex items-end p-1">
            <span className="text-[8px] font-bold text-paper font-mono uppercase">Gonorrhea</span>
          </div>
        </div>

        {/* Mosaic Item 3: Herpes */}
        <div className="relative rounded-lg overflow-hidden border border-brass/40 bg-black/10 shadow-sm">
          <Image
            src="/images/clinical/herpes_male_vesicles.webp"
            alt="Herpes"
            fill
            sizes="120px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-teal/80 via-transparent to-transparent flex items-end p-1">
            <span className="text-[8px] font-bold text-paper font-mono uppercase">Herpes</span>
          </div>
        </div>

        {/* Mosaic Item 4: Warts */}
        <div className="relative rounded-lg overflow-hidden border border-brass/40 bg-black/10 shadow-sm">
          <Image
            src="/images/clinical/slide_18_img_1.jpeg"
            alt="Genital warts"
            fill
            sizes="120px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-teal/80 via-transparent to-transparent flex items-end p-1">
            <span className="text-[8px] font-bold text-paper font-mono uppercase">HPV Warts</span>
          </div>
        </div>
      </div>

      {/* Magazine Title Section */}
      <div className="flex items-baseline justify-between border-b border-brass/30 pb-0.5 shrink-0">
        <h2 className="text-xl sm:text-2xl font-black font-display text-ink-teal tracking-tight uppercase">
          {isHindi ? 'विषय सूची' : 'CONTENTS'}
        </h2>
        <span className="text-[10px] text-ink-muted font-serif italic">
          {isHindi ? 'क्लिक करके सीधे पृष्ठ पर जाएं' : 'Click any section to jump directly'}
        </span>
      </div>

      {/* 2-Column Canva-Inspired Editorial Index Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 flex-1 py-0.5 overflow-hidden my-auto">
        {/* Column 1 */}
        <div className="space-y-1 flex flex-col justify-between">
          {chaptersCol1.map((ch) => (
            <button
              key={ch.pageIdx}
              onClick={() => onNavigateToPage(ch.pageIdx)}
              className="w-full flex items-center justify-between p-1.5 rounded-lg bg-paper-shadow/40 hover:bg-paper-shadow border border-brass/20 hover:border-brass transition-all text-left group"
            >
              <div className="pr-1 flex-1">
                <div className="font-bold text-[11px] sm:text-xs text-ink-teal group-hover:text-coral transition-colors leading-tight">
                  {ch.title}
                </div>
                <div className="text-[9px] text-ink-muted leading-tight line-clamp-1">
                  {ch.desc}
                </div>
              </div>
              <div className="flex items-center gap-0.5 shrink-0 pl-1">
                <span className="font-display font-black text-xs sm:text-sm text-brass group-hover:text-coral">
                  {ch.pageLabel}
                </span>
                <MoveRight className="w-2.5 h-2.5 text-brass opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-1 flex flex-col justify-between">
          {chaptersCol2.map((ch) => (
            <button
              key={ch.pageIdx}
              onClick={() => onNavigateToPage(ch.pageIdx)}
              className="w-full flex items-center justify-between p-1.5 rounded-lg bg-paper-shadow/40 hover:bg-paper-shadow border border-brass/20 hover:border-brass transition-all text-left group"
            >
              <div className="pr-1 flex-1">
                <div className="font-bold text-[11px] sm:text-xs text-ink-teal group-hover:text-care-blue-dark transition-colors leading-tight">
                  {ch.title}
                </div>
                <div className="text-[9px] text-ink-muted leading-tight line-clamp-1">
                  {ch.desc}
                </div>
              </div>
              <div className="flex items-center gap-0.5 shrink-0 pl-1">
                <span className="font-display font-black text-xs sm:text-sm text-brass group-hover:text-care-blue-dark">
                  {ch.pageLabel}
                </span>
                <MoveRight className="w-2.5 h-2.5 text-brass opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageSurface>
  );
};
