'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { Users, Pill, Stethoscope, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface Page05KitCabinetProps {
  locale: Locale;
}

export const Page05KitCabinet: React.FC<Page05KitCabinetProps> = ({ locale }) => {
  const page = PORTRAIT_BOOK_PAGES[5];
  const isHindi = locale === 'hi';
  const [selectedKit, setSelectedKit] = useState('kit-1');

  const kits = [
    {
      id: 'kit-1',
      num: '1',
      name: isHindi ? 'किट 1: ग्रे' : 'Kit 1: Grey',
      color: '#718096',
      syndrome: isHindi ? 'मूत्रमार्ग / ग्रीवा स्राव एवं अंडकोष सूजन' : 'Urethral & Cervical Discharge, Scrotal Swelling',
      signs: isHindi
        ? 'मूत्रमार्ग से मवाद, पेशाब में तीव्र जलन, बार-बार पेशाब आना, अंडकोष में सूजन व दर्द।'
        : 'Purulent/mucoid discharge, burning micturition, painful scrotal swelling, fever.',
      composition: 'Tab. Azithromycin 1g oral single dose + Tab. Cefixime 400mg (or 800mg) oral single dose',
      partnerRule: isHindi ? 'हाल के सभी यौन साथियों का उपचार करें (Treat all recent partners)' : 'Treat all recent sexual partners',
    },
    {
      id: 'kit-2',
      num: '2',
      name: isHindi ? 'किट 2: हरा' : 'Kit 2: Green',
      color: '#2F855A',
      syndrome: isHindi ? 'योनि स्राव एवं खुजली (Vaginitis)' : 'Vaginal Discharge Syndrome (Vaginitis)',
      signs: isHindi
        ? 'दही जैसा सफेद या हरा झागदार स्राव, तीव्र योनि खुजली, संभोग में दर्द, कमर दर्द।'
        : 'Curd-like white or frothy greenish discharge, intense vulval pruritus, dyspareunia.',
      composition: 'Tab. Secnidazole 2000 mg single dose + Tab. Fluconazole 150 mg single dose',
      partnerRule: isHindi ? 'लक्षण दिखने पर साथी का उपचार करें (Treat partners when symptomatic)' : 'Treat partner when symptomatic',
    },
    {
      id: 'kit-3',
      num: '3',
      name: isHindi ? 'किट 3: सफेद' : 'Kit 3: White',
      color: '#A0AEC0',
      syndrome: isHindi ? 'दर्द-रहित जननांग घाव (सिफलिस व चैनक्रॉइड)' : 'Genital Ulcer Disease (Syphilis & Chancroid)',
      signs: isHindi
        ? 'जननांग पर एक या अधिक कड़े किनारे वाले घाव (शैंकर), गिल्टी में सूजन।'
        : 'Solitary dry-based indurated chancre or ragged ulcer, inguinal lymphadenopathy.',
      composition: 'Inj. Benzathine penicillin G 2.4 MU IM + Tab. Azithromycin 1000 mg single dose',
      partnerRule: isHindi ? 'पिछले 3 महीनों के सभी साथियों का उपचार करें (Past 3 months partners)' : 'Treat all sexual partners for past 3 months',
    },
    {
      id: 'kit-4',
      num: '4',
      name: isHindi ? 'किट 4: नीला' : 'Kit 4: Blue',
      color: '#2B6CB0',
      syndrome: isHindi ? 'पेनिसिलिन एलर्जी वाले जननांग घाव' : 'Genital Ulcers (Penicillin Allergic)',
      signs: isHindi
        ? 'पेनिसिलिन से एलर्जी के इतिहास वाले रोगियों में जननांग घाव (सिफलिस/चैनक्रॉइड)।'
        : 'Genital ulcers in patients with documented history of penicillin allergy.',
      composition: 'Tab. Doxycycline 100 mg (twice daily x 14 days) + Tab. Azithromycin 1 g single dose',
      partnerRule: isHindi ? 'पिछले 3 महीनों के सभी साथियों का उपचार करें (Past 3 months partners)' : 'Treat all sexual partners for past 3 months',
    },
    {
      id: 'kit-5',
      num: '5',
      name: isHindi ? 'किट 5: लाल' : 'Kit 5: Red',
      color: '#C53030',
      syndrome: isHindi ? 'दर्दनाक छाले एवं जननांग हर्पीस (HSV)' : 'Herpetic Genital Ulcers (HSV-2)',
      signs: isHindi
        ? 'पानी भरे छोटे दर्दनाक दानों व छालों का गुच्छा, जलन, चुभन, बार-बार होने वाले घाव।'
        : 'Grouped painful vesicles, recurrent shallow erosions, burning genital paresthesias.',
      composition: 'Tab. Acyclovir 400 mg (three times daily x 7 days - 21 tablets)',
      partnerRule: isHindi ? 'साथी के उपचार की आवश्यकता नहीं (No partner treatment required)' : 'No partner treatment required',
    },
    {
      id: 'kit-6',
      num: '6',
      name: isHindi ? 'किट 6: पीला' : 'Kit 6: Yellow',
      color: '#D69E2E',
      syndrome: isHindi ? 'पेट के निचले हिस्से में दर्द (PID)' : 'Lower Abdominal Pain / PID',
      signs: isHindi
        ? 'पेट के निचले हिस्से में दर्द, गर्भाशय ग्रीवा में छूने पर दर्द, बुखार, असामान्य स्राव।'
        : 'Lower abdomen tenderness, cervical motion pain, fever, abnormal discharge.',
      composition: 'Tab. Cefixime 400mg STAT + Tab. Metronidazole 400mg BD x 14d + Cap. Doxycycline 100mg BD x 14d',
      partnerRule: isHindi ? 'पुरुष साथी का किट 1 (ग्रे) से उपचार करें (Treat male partner with Kit 1)' : 'Treat male sexual partner with Kit 1',
    },
    {
      id: 'kit-7',
      num: '7',
      name: isHindi ? 'किट 7: काला' : 'Kit 7: Black',
      color: '#1A202C',
      syndrome: isHindi ? 'जांघ की गिल्टी में सूजन (बूबो) एवं LGV' : 'Inguinal Bubo & LGV Proctitis',
      signs: isHindi
        ? 'जांघ में गिल्टी की बड़ी, दर्दनाक सूजन (बूबो), मवाद, गुदा स्राव।'
        : 'Unilateral swollen tender inguinal lymph nodes (bubo), anorectal discharge.',
      composition: 'Tab. Doxycycline 100 mg (twice daily x 21 days - 42 capsules) + Tab. Azithromycin 1g',
      partnerRule: isHindi ? 'पिछले 3 सप्ताह के सभी साथियों का उपचार करें (Past 3 weeks partners)' : 'Treat all sexual partners for past 3 weeks',
    },
    {
      id: 'kit-8',
      num: '8',
      name: isHindi ? 'किट 8: भूरा' : 'Kit 8: Brown',
      color: '#7B341E',
      syndrome: isHindi ? 'एनोरेक्टल स्राव सिंड्रोम' : 'Anorectal Discharge Syndrome',
      signs: isHindi
        ? 'गुदा मार्ग से मवाद स्राव, दर्द, मल त्याग में बेचैनी व जलन।'
        : 'Tenesmus, purulent rectal discharge, perianal irritation and burning.',
      composition: 'Tab. Cefixime 800 mg STAT dose + Tab. Doxycycline 100 mg (twice daily x 7 days)',
      partnerRule: isHindi ? 'हाल के यौन साथियों का उपचार करें (Treat recent partners)' : 'Treat recent sexual partners',
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
      audioScriptText={`${activeKitObj.name}. ${activeKitObj.syndrome}. ${activeKitObj.signs}. ${isHindi ? 'दवा संयोजन:' : 'Regimen:'} ${activeKitObj.composition}. ${activeKitObj.partnerRule}`}
      locale={locale}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-brass/40 pb-0.5 shrink-0">
        <div>
          <div className="text-[9px] sm:text-[10px] font-bold text-care-blue-dark uppercase tracking-widest">
            {isHindi ? 'NACO राष्ट्रीय सिंड्रोमिक मानक' : 'NACO 2025/2026 STANDARDS'}
          </div>
          <h2 className="text-base sm:text-lg font-black font-display text-ink-teal leading-tight">
            {isHindi ? 'NACO कलर-कोडेड किट मार्गदर्शिका' : 'NACO Color-Coded STI Kits'}
          </h2>
        </div>
        <span className="text-[8.5px] sm:text-[9px] font-mono font-bold bg-care-blue/15 text-care-blue-dark px-2 py-0.5 rounded-full">
          8 Standard Kits
        </span>
      </div>

      {/* 8-Kit Selector Carousel Bar */}
      <div className="grid grid-cols-8 gap-1 py-1 shrink-0">
        {kits.map((k) => {
          const isSelected = selectedKit === k.id;
          return (
            <button
              key={k.id}
              onClick={() => setSelectedKit(k.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-lg border transition-all text-center ${
                isSelected
                  ? 'border-amber-400 scale-105 shadow-sm ring-2 ring-amber-400 bg-white/30'
                  : 'border-brass/30 bg-paper-shadow/60 hover:bg-paper-shadow'
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center text-[8.5px] font-black text-white shadow-xs"
                style={{ backgroundColor: k.color }}
              >
                {k.num}
              </div>
              <span className="text-[8px] font-bold text-ink-teal mt-0.5 line-clamp-1">
                K{k.num}
              </span>
            </button>
          );
        })}
      </div>

      {/* Comprehensive Selected Kit Breakdown Card */}
      <div className="flex-1 flex flex-col justify-between bg-paper-shadow/40 border border-brass/40 rounded-xl p-2.5 space-y-1.5 overflow-hidden my-auto">
        {/* Kit Title & Color Ribbon Banner */}
        <div className="flex items-center justify-between border-b border-brass/30 pb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
              style={{ backgroundColor: activeKitObj.color }}
            />
            <span className="font-display font-black text-xs sm:text-sm text-ink-teal">
              {activeKitObj.name}
            </span>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-ink-teal text-paper uppercase tracking-wider">
            {activeKitObj.syndrome}
          </span>
        </div>

        {/* 1. Clinical Signs & Symptoms */}
        <div className="bg-paper p-1.5 rounded-lg border border-brass/25 space-y-0.5">
          <div className="flex items-center gap-1 text-[9px] font-bold text-ink-teal uppercase tracking-wider">
            <Stethoscope className="w-3 h-3 text-mineral-green shrink-0" />
            <span>{isHindi ? 'पहचान एवं मुख्य लक्षण (Signs & Symptoms)' : 'Clinical Indications & Symptoms'}:</span>
          </div>
          <p className="text-[9.5px] sm:text-[10px] text-ink font-medium leading-snug line-clamp-2">
            {activeKitObj.signs}
          </p>
        </div>

        {/* 2. Standardized Composition / Drug Regimen */}
        <div className="bg-paper p-1.5 rounded-lg border border-brass/25 space-y-0.5">
          <div className="flex items-center gap-1 text-[9px] font-bold text-coral-dark uppercase tracking-wider">
            <Pill className="w-3 h-3 text-coral shrink-0" />
            <span>{isHindi ? 'दवा संयोजन (NACO Prescribed Regimen)' : 'Standardized Drug Composition'}:</span>
          </div>
          <p className="text-[9.5px] sm:text-[10px] text-ink font-mono font-medium leading-snug line-clamp-2">
            {activeKitObj.composition}
          </p>
        </div>

        {/* 3. Partner Management Rule Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-1.5 rounded-lg flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <div className="text-[9px] sm:text-[9.5px] text-ink font-bold">
              <span className="text-amber-800 uppercase">{isHindi ? 'पार्टनर प्रोटोकॉल: ' : 'Partner Protocol: '}</span>
              <span>{activeKitObj.partnerRule}</span>
            </div>
          </div>
          <span className="text-[8px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full shrink-0">
            Mandatory SCM
          </span>
        </div>
      </div>

      {/* Closed Setting Facilitator Note */}
      <div className="bg-care-blue/15 px-2 py-1 rounded-lg border border-care-blue/30 text-[8.5px] sm:text-[9px] text-ink font-medium flex items-center justify-between shrink-0">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-care-blue shrink-0" />
          <span>
            {isHindi
              ? 'जेल एवं बंद संस्थानों में सभी किट सुरक्षा क्लिनिक रेफरल द्वारा निःशुल्क उपलब्ध कराई जाती हैं।'
              : 'Provided free at Suraksha Clinics. Complete syndromic case management ensures zero reinfection.'}
          </span>
        </span>
        <span className="font-bold text-care-blue-dark">100% Free Care</span>
      </div>
    </PageSurface>
  );
};
