'use client';

import React from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { MoveRight, Sparkles, Shield, Package, HelpCircle, PhoneCall } from 'lucide-react';

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
      type: 'icon',
      icon: <Shield className="w-6 h-6 text-mineral-green" />,
      bg: 'bg-mineral-green/15',
    },
    {
      pageIdx: 4,
      num: '02',
      title: isHindi ? 'सिफलिस: प्राथमिक व द्वितीयक' : 'Syphilis: Chancre & Rashes',
      desc: isHindi ? 'घाव, हथेलियों पर चकत्ते व किट 3' : 'Chancres, Palmar Rashes & Kit 3',
      pageLabel: '04',
      type: 'image',
      imageSrc: '/images/clinical/primary-syphilis-male.webp',
      imageAlt: 'Primary Syphilis',
    },
    {
      pageIdx: 6,
      num: '03',
      title: isHindi ? 'गोनोरिया, क्लैमाइडिया व एलजीवी' : 'Gonorrhea & Chlamydia',
      desc: isHindi ? 'मवाद स्राव एवं गिल्टी सूजन' : 'Purulent Discharge & Buboes (Kit 1 & 7)',
      pageLabel: '06',
      type: 'image',
      imageSrc: '/images/clinical/gonorrhea-male-urethritis.webp',
      imageAlt: 'Gonorrhea Urethritis',
    },
    {
      pageIdx: 8,
      num: '04',
      title: isHindi ? 'हर्पीस, चैनक्रॉइड व जूँ' : 'Herpes, Chancroid & Lice',
      desc: isHindi ? 'दर्दनाक छाले, घाव व पेडीकुलोसिस' : 'Vesicles, Ulcers & Crab Lice (Kit 5)',
      pageLabel: '08',
      type: 'image',
      imageSrc: '/images/clinical/herpes-primary-male.webp',
      imageAlt: 'Genital Herpes',
    },
  ];

  const chaptersCol2 = [
    {
      pageIdx: 10,
      num: '05',
      title: isHindi ? 'मस्से, योनि स्राव व PID' : 'Warts, Vaginitis & PID',
      desc: isHindi ? 'HPV मस्से, असामान्य स्राव व किट 2/6' : 'HPV Papules, Vaginitis & Kit 2/6',
      pageLabel: '10',
      type: 'image',
      imageSrc: '/images/clinical/warts-male-glans.webp',
      imageAlt: 'Genital Warts HPV',
    },
    {
      pageIdx: 12,
      num: '06',
      title: isHindi ? 'NACO 7 कलर किट कैबिनेट' : 'The NACO 7-Kit Cabinet',
      desc: isHindi ? 'सिंड्रोमिक दवाएं एवं उपचार किट' : 'NACO Syndromic Medicine Kits',
      pageLabel: '12',
      type: 'icon',
      icon: <Package className="w-6 h-6 text-care-blue" />,
      bg: 'bg-care-blue/15',
    },
    {
      pageIdx: 13,
      num: '07',
      title: isHindi ? 'सच या झूठ: भ्रांति निवारण' : 'True or False: Myths & Facts',
      desc: isHindi ? 'वैज्ञानिक प्रमाण एवं तथ्य' : 'Clinical Facts & Guidance',
      pageLabel: '13',
      type: 'icon',
      icon: <HelpCircle className="w-6 h-6 text-coral" />,
      bg: 'bg-coral/15',
    },
    {
      pageIdx: 14,
      num: '08',
      title: isHindi ? 'मदद कहाँ पाएं (1097 हेल्पलाइन)' : 'Where to Get Help & 1097',
      desc: isHindi ? '100% गोपनीय सुरक्षा क्लिनिक' : 'Suraksha Clinics & Support',
      pageLabel: '14',
      type: 'icon',
      icon: <PhoneCall className="w-6 h-6 text-mineral-green-dark" />,
      bg: 'bg-amber-100',
    },
  ];

  return (
    <PageSurface
      pageNumber={2}
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Editorial Header */}
      <div className="flex items-center justify-between border-b border-brass/40 pb-0.5 shrink-0">
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono font-bold text-ink-muted uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-coral" />
          <span>{isHindi ? 'राष्ट्रीय सिंड्रोमिक दिशानिर्देश' : 'National Syndromic Guidelines'}</span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-brass tracking-wider">NACO / MoHFW</span>
      </div>

      {/* Magazine Title Section */}
      <div className="flex items-baseline justify-between border-b border-brass/30 pb-0.5 shrink-0">
        <h2 className="text-lg sm:text-xl font-black font-display text-ink-teal tracking-tight uppercase">
          {isHindi ? 'विषय सूची' : 'CONTENTS & CLINICAL INDEX'}
        </h2>
        <span className="text-[9px] sm:text-[10px] text-ink-muted font-serif italic">
          {isHindi ? 'क्लिक करके सीधे पृष्ठ पर जाएं' : 'Click any section to jump directly'}
        </span>
      </div>

      {/* Systematic 2-Column Visual Index Grid with Embedded Images in Each Row */}
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 flex-1 py-0.5 overflow-hidden my-auto">
        {/* Column 1 */}
        <div className="space-y-1 flex flex-col justify-between">
          {chaptersCol1.map((ch) => (
            <button
              key={ch.pageIdx}
              onClick={() => onNavigateToPage(ch.pageIdx)}
              className="w-full flex items-center gap-2 p-1.5 rounded-xl bg-paper-shadow/50 hover:bg-paper-shadow border border-brass/30 hover:border-brass transition-all text-left group shadow-xs"
            >
              {/* Embedded Visual Thumbnail */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-brass/40 bg-black/10 shrink-0 flex items-center justify-center">
                {ch.type === 'image' && ch.imageSrc ? (
                  <Image
                    src={ch.imageSrc}
                    alt={ch.imageAlt || ch.title}
                    fill
                    sizes="60px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${ch.bg}`}>
                    {ch.icon}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="font-bold text-[10.5px] sm:text-[11.5px] text-ink-teal group-hover:text-coral transition-colors leading-tight truncate">
                  {ch.title}
                </div>
                <div className="text-[8.5px] sm:text-[9px] text-ink-muted leading-tight line-clamp-1 mt-0.5">
                  {ch.desc}
                </div>
              </div>

              {/* Page Badge */}
              <div className="flex items-center gap-0.5 shrink-0 pl-0.5">
                <span className="font-display font-black text-[11px] sm:text-xs text-brass group-hover:text-coral">
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
              className="w-full flex items-center gap-2 p-1.5 rounded-xl bg-paper-shadow/50 hover:bg-paper-shadow border border-brass/30 hover:border-brass transition-all text-left group shadow-xs"
            >
              {/* Embedded Visual Thumbnail */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-brass/40 bg-black/10 shrink-0 flex items-center justify-center">
                {ch.type === 'image' && ch.imageSrc ? (
                  <Image
                    src={ch.imageSrc}
                    alt={ch.imageAlt || ch.title}
                    fill
                    sizes="60px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${ch.bg}`}>
                    {ch.icon}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="font-bold text-[10.5px] sm:text-[11.5px] text-ink-teal group-hover:text-care-blue-dark transition-colors leading-tight truncate">
                  {ch.title}
                </div>
                <div className="text-[8.5px] sm:text-[9px] text-ink-muted leading-tight line-clamp-1 mt-0.5">
                  {ch.desc}
                </div>
              </div>

              {/* Page Badge */}
              <div className="flex items-center gap-0.5 shrink-0 pl-0.5">
                <span className="font-display font-black text-[11px] sm:text-xs text-brass group-hover:text-care-blue-dark">
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
