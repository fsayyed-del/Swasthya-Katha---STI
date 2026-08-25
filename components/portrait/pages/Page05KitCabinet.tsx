'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { LearnerFacilitatorToggle } from '../LearnerFacilitatorToggle';
import { FacilitatorPromptCard } from '../FacilitatorPromptCard';

interface Page05KitCabinetProps {
  locale: Locale;
}

export const Page05KitCabinet: React.FC<Page05KitCabinetProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[5];
  const isHindi = locale === 'hi';
  const [isFacilitator, setIsFacilitator] = useState(false);
  const [selectedKit, setSelectedKit] = useState('kit-1');

  const kits = [
    {
      id: 'kit-1',
      num: '1',
      name: isHindi ? 'किट 1: ग्रे' : 'Kit 1: Grey',
      color: '#718096',
      learnerIndication: isHindi ? 'मूत्रमार्ग एवं ग्रीवा स्राव' : 'Urethral & Cervical Discharge',
      facilitatorRegimen: 'Azithromycin 1g oral single dose + Cefixime 400mg oral single dose',
    },
    {
      id: 'kit-2',
      num: '2',
      name: isHindi ? 'किट 2: हरा' : 'Kit 2: Green',
      color: '#2F855A',
      learnerIndication: isHindi ? 'योनि स्राव एवं खुजली' : 'Vaginal Discharge (Vaginitis)',
      facilitatorRegimen: 'Secnidazole 2g single dose + Fluconazole 150mg single dose',
    },
    {
      id: 'kit-3',
      num: '3',
      name: isHindi ? 'किट 3: सफेद' : 'Kit 3: White',
      color: '#CBD5E1',
      learnerIndication: isHindi ? 'दर्द रहित जननांग घाव' : 'Non-Herpetic Genital Ulcers',
      facilitatorRegimen: 'Benzathine Penicillin 2.4 MU IM + Azithromycin 1g single dose',
    },
    {
      id: 'kit-4',
      num: '4',
      name: isHindi ? 'किट 4: नीला' : 'Kit 4: Blue',
      color: '#2B6CB0',
      learnerIndication: isHindi ? 'पेनिसिलिन एलर्जी वाले जननांग घाव' : 'Genital Ulcers (Penicillin Allergic)',
      facilitatorRegimen: 'Doxycycline 100mg twice daily x 15 days + Azithromycin 1g',
    },
    {
      id: 'kit-5',
      num: '5',
      name: isHindi ? 'किट 5: लाल' : 'Kit 5: Red',
      color: '#C53030',
      learnerIndication: isHindi ? 'दर्दनाक छाले एवं हर्पीस' : 'Herpetic Genital Ulcers (Herpes)',
      facilitatorRegimen: 'Acyclovir 400mg three times daily x 7 days',
    },
    {
      id: 'kit-6',
      num: '6',
      name: isHindi ? 'किट 6: पीला' : 'Kit 6: Yellow',
      color: '#D69E2E',
      learnerIndication: isHindi ? 'पेट के निचले हिस्से का दर्द (PID)' : 'Lower Abdominal Pain / PID',
      facilitatorRegimen: 'Cefixime 400mg + Metronidazole 400mg BD x 14 days + Doxycycline 100mg BD x 14 days',
    },
    {
      id: 'kit-7',
      num: '7',
      name: isHindi ? 'किट 7: काला' : 'Kit 7: Black',
      color: '#1A202C',
      learnerIndication: isHindi ? 'जांघ की गिल्टी में सूजन (बूबो)' : 'Inguinal Lymphadenopathy / Bubo',
      facilitatorRegimen: 'Doxycycline 100mg twice daily x 21 days + Azithromycin 1g',
    },
  ];

  // Touch-Free Vertical Gesture: Cycle through kits with Up/Down hand wave
  useEffect(() => {
    const handleGestureCycle = (e: any) => {
      const dir = e.detail?.direction;
      setSelectedKit((curr) => {
        const idx = kits.findIndex((k) => k.id === curr);
        if (dir === 'next') {
          const nextIdx = (idx + 1) % kits.length;
          return kits[nextIdx].id;
        } else {
          const prevIdx = (idx - 1 + kits.length) % kits.length;
          return kits[prevIdx].id;
        }
      });
    };

    window.addEventListener('gesture:cycle-option', handleGestureCycle);
    return () => window.removeEventListener('gesture:cycle-option', handleGestureCycle);
  }, [kits]);

  const activeKitObj = kits.find((k) => k.id === selectedKit) || kits[0];

  return (
    <PageSurface
      pageNumber={12}
      chapterHue="care-blue"
      audioScriptText={page.audioScript[locale] || page.audioScript.en}
      locale={locale}
    >
      {/* Top Header & Mode Toggle */}
      <div className="flex items-start justify-between gap-2 shrink-0">
        <div>
          <div className="text-[10px] font-bold text-care-blue-dark uppercase tracking-widest border-b border-brass/30 pb-0.5">
            {page.eyebrow?.[locale] || page.eyebrow?.en}
          </div>
          <h2 className="text-lg sm:text-xl font-black font-display text-ink-teal mt-0.5">
            {page.title[locale] || page.title.en}
          </h2>
        </div>

        <LearnerFacilitatorToggle
          isFacilitator={isFacilitator}
          onToggle={setIsFacilitator}
          locale={locale}
        />
      </div>

      {/* 3D Tactile Medicine Cabinet Grid */}
      <div className="bg-gradient-to-br from-[#123A3C] to-[#0A2226] p-2.5 sm:p-3 rounded-xl border border-brass shadow-md text-paper shrink-0">
        <div className="flex items-center justify-between pb-1.5 border-b border-brass/40 text-[10.5px]">
          <span className="font-bold text-brass-light uppercase tracking-wider">
            NACO Syndromic Cabinet (7 Kits)
          </span>
          <span className="text-[9px] bg-paper/20 px-1.5 py-0.5 rounded text-paper font-semibold">
            {isFacilitator ? 'Facilitator Mode' : 'Learner View'}
          </span>
        </div>

        {/* 7 Compartments Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 pt-2">
          {kits.map((k) => {
            const isSelected = selectedKit === k.id;
            return (
              <button
                key={k.id}
                onClick={() => setSelectedKit(k.id)}
                className={`flex flex-col items-center justify-between p-1 sm:p-1.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-brass bg-white/20 scale-105 shadow ring-1 ring-amber-400'
                    : 'border-white/20 bg-black/20 hover:bg-white/10'
                }`}
                style={{ backgroundColor: isSelected ? k.color : undefined }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center text-[9px] font-black text-white"
                  style={{ backgroundColor: k.color }}
                >
                  {k.num}
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-bold text-white mt-0.5 text-center line-clamp-1">
                  Kit {k.num}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Kit Drawer Detail */}
        <div className="mt-2 p-2 bg-paper text-ink rounded-lg border border-brass/40 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[11px] sm:text-xs text-ink-teal">
              {activeKitObj.name}
            </span>
            <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded bg-care-blue/20 text-care-blue-dark">
              NACO SCM
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-semibold text-ink leading-tight">
            {isHindi ? 'लक्षण संकेत: ' : 'Indication: '}
            <span className="text-mineral-green-dark">{activeKitObj.learnerIndication}</span>
          </p>

          {/* FACILITATOR ONLY PANEL: Revealed only when isFacilitator is true */}
          {isFacilitator && (
            <div className="pt-1 mt-1 border-t border-brass/30 bg-coral/10 p-1.5 rounded border border-coral/30 space-y-0.5 animate-fade-in">
              <div className="font-bold text-[9px] text-coral-dark uppercase tracking-wider">
                Staff Clinical Protocol:
              </div>
              <p className="text-[9.5px] text-ink font-mono font-medium leading-tight">
                {activeKitObj.facilitatorRegimen}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Facilitator Group Prompt Card (when in Facilitator view) */}
      {isFacilitator ? (
        <FacilitatorPromptCard
          promptText={page.facilitatorPrompt[locale] || page.facilitatorPrompt.en}
          locale={locale}
        />
      ) : (
        <div className="bg-care-blue/15 p-2 rounded-xl border border-care-blue/30 text-[10.5px] text-ink font-medium flex items-center justify-between shrink-0">
          <span>
            {isHindi
              ? 'प्रत्येक किट सुरक्षा क्लीनिक में मुफ्त मिलती है। कभी खुद से दवा न लें।'
              : 'Each kit is provided free at Suraksha Clinics. Never self-medicate.'}
          </span>
          <span className="text-[9px] font-bold text-care-blue-dark bg-paper px-1.5 py-0.5 rounded shadow-sm">
            Free Care
          </span>
        </div>
      )}
    </PageSurface>
  );
};
