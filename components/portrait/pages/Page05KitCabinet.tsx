'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';
import { PageSurface } from '../PageSurface';
import { Users, Pill, Stethoscope, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

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
      code: 'Kit 1',
      name: isHindi ? 'किट 1: ग्रे' : 'Kit 1: Grey',
      colorName: isHindi ? 'ग्रे (Grey)' : 'Grey',
      color: '#4A5568',
      textColor: '#FFFFFF',
      syndromeShort: isHindi ? 'स्राव व जलन' : 'Discharge',
      syndrome: isHindi ? 'मूत्रमार्ग / ग्रीवा स्राव एवं अंडकोष सूजन' : 'Urethral & Cervical Discharge, Scrotal Swelling',
      indications: isHindi
        ? ['पेशाब में तीव्र जलन या दर्द', 'मूत्रमार्ग से गाढ़ा मवाद जैसा स्राव', 'अंडकोष में तेज दर्द व सूजन', 'बार-बार पेशाब की इच्छा']
        : ['Purulent or mucoid urethral discharge', 'Severe dysuria / burning during urination', 'Painful scrotal swelling & tenderness', 'Increased frequency of micturition'],
      drugs: [
        { name: 'Tab. Azithromycin 1000 mg', dose: isHindi ? '1 ग्राम (एकल खुराक)' : '1 g (Single Oral Dose)' },
        { name: 'Tab. Cefixime 400 mg', dose: isHindi ? '400 मि.ग्रा. (एकल खुराक)' : '400 mg (Single Oral Dose)' },
      ],
      partnerProtocol: isHindi
        ? 'हाल के सभी यौन साथियों का उपचार करें (Treat all recent partners)'
        : 'Treat all recent sexual partners simultaneously with Kit 1',
      partnerDays: isHindi ? 'हाल के सभी साथी' : 'All Recent Partners',
    },
    {
      id: 'kit-2',
      num: '2',
      code: 'Kit 2',
      name: isHindi ? 'किट 2: हरा' : 'Kit 2: Green',
      colorName: isHindi ? 'हरा (Green)' : 'Green',
      color: '#2F855A',
      textColor: '#FFFFFF',
      syndromeShort: isHindi ? 'योनि स्राव' : 'Vaginitis',
      syndrome: isHindi ? 'योनि स्राव एवं तीव्र खुजली (Vaginitis)' : 'Vaginal Discharge Syndrome (Vaginitis)',
      indications: isHindi
        ? ['दही जैसा सफेद या झागदार हरा स्राव', 'योनिद्वार पर अत्यधिक खुजली व लाली', 'संभोग के दौरान दर्द (Dyspareunia)', 'कमर के निचले हिस्से में दर्द']
        : ['Curd-like white or frothy greenish discharge', 'Intense vulval itching, erythema & edema', 'Pain during intercourse (Dyspareunia)', 'Lower backache with irritation'],
      drugs: [
        { name: 'Tab. Secnidazole 2000 mg', dose: isHindi ? '2 ग्राम (एकल खुराक)' : '2 g (Single Oral Dose)' },
        { name: 'Cap. Fluconazole 150 mg', dose: isHindi ? '150 मि.ग्रा. (एकल खुराक)' : '150 mg (Single Oral Dose)' },
      ],
      partnerProtocol: isHindi
        ? 'लक्षण दिखने पर ही यौन साथी का उपचार करें (Treat when symptomatic)'
        : 'Treat sexual partner only when symptomatic',
      partnerDays: isHindi ? 'लक्षण दिखने पर' : 'When Symptomatic',
    },
    {
      id: 'kit-3',
      num: '3',
      code: 'Kit 3',
      name: isHindi ? 'किट 3: सफेद' : 'Kit 3: White',
      colorName: isHindi ? 'सफेद (White)' : 'White',
      color: '#E2E8F0',
      textColor: '#1A202C',
      syndromeShort: isHindi ? 'दर्द-रहित घाव' : 'GUD Syphilis',
      syndrome: isHindi ? 'दर्द-रहित जननांग घाव (सिफलिस व चैनक्रॉइड)' : 'Non-Herpetic Genital Ulcers (Syphilis & Chancroid)',
      indications: isHindi
        ? ['जननांग पर कड़े किनारे वाला सूखा घाव (शैंकर)', 'घाव में कोई दर्द नहीं होना', 'जांघ की गिल्टी में रबर जैसी सूजन', 'चैनक्रॉइड के गहरे दर्दनाक घाव']
        : ['Solitary dry-based painless ulcer (chancre)', 'Indurated clean borders on genitalia', 'Rubbery non-tender inguinal lymphadenopathy', 'Multiple painful soft ragged ulcers (Chancroid)'],
      drugs: [
        { name: 'Inj. Benzathine Penicillin G 2.4 MU', dose: isHindi ? '24 लाख यूनिट (IM इंजेक्शन)' : '2.4 MU IM (Single Deep Injection)' },
        { name: 'Tab. Azithromycin 1000 mg', dose: isHindi ? '1 ग्राम (एकल खुराक)' : '1 g (Single Oral Dose)' },
      ],
      partnerProtocol: isHindi
        ? 'पिछले 3 महीनों के सभी यौन साथियों का उपचार करें'
        : 'Treat all sexual partners for the past 3 months',
      partnerDays: isHindi ? 'पिछले 3 माह' : 'Past 3 Months',
    },
    {
      id: 'kit-4',
      num: '4',
      code: 'Kit 4',
      name: isHindi ? 'किट 4: नीला' : 'Kit 4: Blue',
      colorName: isHindi ? 'नीला (Blue)' : 'Blue',
      color: '#2B6CB0',
      textColor: '#FFFFFF',
      syndromeShort: isHindi ? 'पेनिसिलिन एलर्जी' : 'Penicillin Allergy',
      syndrome: isHindi ? 'पेनिसिलिन एलर्जी वाले जननांग घाव' : 'Genital Ulcers (Penicillin Allergic Patients)',
      indications: isHindi
        ? ['पेनिसिलिन दवा से एलर्जी का इतिहास', 'जननांग पर सिफलिस या चैनक्रॉइड के घाव', 'गिल्टी में सूजन एवं लाली']
        : ['Documented history of penicillin allergy', 'Non-herpetic genital ulcers (Syphilis/Chancroid)', 'Inguinal lymphadenopathy without BPG'],
      drugs: [
        { name: 'Tab. Doxycycline 100 mg', dose: isHindi ? '1 गोली सुबह-शाम x 14 दिन (28 कैप्सूल)' : '100 mg BD x 14 days (28 capsules)' },
        { name: 'Tab. Azithromycin 1000 mg', dose: isHindi ? '1 ग्राम (एकल खुराक)' : '1 g (Single Oral Dose)' },
      ],
      partnerProtocol: isHindi
        ? 'पिछले 3 महीनों के सभी यौन साथियों का उपचार करें'
        : 'Treat all sexual partners for the past 3 months',
      partnerDays: isHindi ? 'पिछले 3 माह' : 'Past 3 Months',
    },
    {
      id: 'kit-5',
      num: '5',
      code: 'Kit 5',
      name: isHindi ? 'किट 5: लाल' : 'Kit 5: Red',
      colorName: isHindi ? 'लाल (Red)' : 'Red',
      color: '#C53030',
      textColor: '#FFFFFF',
      syndromeShort: isHindi ? 'हर्पीस छाले' : 'Herpes Ulcers',
      syndrome: isHindi ? 'दर्दनाक छाले एवं जननांग हर्पीस (HSV-2)' : 'Herpetic Genital Ulcers (Genital Herpes)',
      indications: isHindi
        ? ['पानी भरे छोटे दर्दनाक दानों का गुच्छा', 'फूटने पर बनने वाले सतही लाल घाव', 'जननांगों में तेज चुभन, जलन व झनझनाहट', 'बार-बार उभरने वाले दर्दनाक छाले']
        : ['Grouped fluid-filled painful vesicles', 'Shallow coalescing superficial ulcerations', 'Burning paresthesias & tingling sensation', 'Recurrent localized genital erosions'],
      drugs: [
        { name: 'Tab. Acyclovir 400 mg', dose: isHindi ? '1 गोली दिन में 3 बार x 7 दिन (21 गोलियां)' : '400 mg TDS x 7 days (21 tablets)' },
      ],
      partnerProtocol: isHindi
        ? 'साथी के दवा उपचार की आवश्यकता नहीं (वायरल संक्रमण)'
        : 'No partner treatment required (viral etiology)',
      partnerDays: isHindi ? 'उपचार नहीं' : 'No Rx Needed',
    },
    {
      id: 'kit-6',
      num: '6',
      code: 'Kit 6',
      name: isHindi ? 'किट 6: पीला' : 'Kit 6: Yellow',
      colorName: isHindi ? 'पीला (Yellow)' : 'Yellow',
      color: '#D69E2E',
      textColor: '#1A202C',
      syndromeShort: isHindi ? 'पेट दर्द PID' : 'Lower Abdomen PID',
      syndrome: isHindi ? 'पेट के निचले हिस्से में दर्द (PID)' : 'Lower Abdominal Pain (LAP) / PID',
      indications: isHindi
        ? ['पेट के निचले हिस्से व पेल्विस में तेज दर्द', 'गर्भाशय ग्रीवा को छूने पर अत्यधिक दर्द', 'बुखार एवं असामान्य दुर्गंधयुक्त स्राव', 'मासिक धर्म में अनियमितता व भारी रक्तस्राव']
        : ['Lower abdominal pain & pelvic tenderness', 'Cervical motion tenderness on examination', 'Fever with abnormal purulent discharge', 'Menstrual irregularities & dysmenorrhea'],
      drugs: [
        { name: 'Tab. Cefixime 400 mg', dose: isHindi ? '400 मि.ग्रा. (एकल खुराक STAT)' : '400 mg Single STAT Dose' },
        { name: 'Tab. Metronidazole 400 mg', dose: isHindi ? '1 गोली सुबह-शाम x 14 दिन (28 गोलियां)' : '400 mg BD x 14 days (28 tablets)' },
        { name: 'Cap. Doxycycline 100 mg', dose: isHindi ? '1 कैप्सूल सुबह-शाम x 14 दिन (28 कैप्सूल)' : '100 mg BD x 14 days (28 capsules)' },
      ],
      partnerProtocol: isHindi
        ? 'पुरुष साथी का किट 1 (ग्रे) द्वारा अनिवार्य उपचार करें'
        : 'Treat male sexual partner simultaneously with Kit 1',
      partnerDays: isHindi ? 'पुरुष साथी को किट 1' : 'Partner Kit 1',
    },
    {
      id: 'kit-7',
      num: '7',
      code: 'Kit 7',
      name: isHindi ? 'किट 7: काला' : 'Kit 7: Black',
      colorName: isHindi ? 'काला (Black)' : 'Black',
      color: '#1A202C',
      textColor: '#FFFFFF',
      syndromeShort: isHindi ? 'गिल्टी सूजन' : 'Inguinal Bubo',
      syndrome: isHindi ? 'जांघ की गिल्टी में सूजन (बूबो) एवं LGV' : 'Inguinal Bubo & LGV Proctitis',
      indications: isHindi
        ? ['जांघ में गिल्टी (लिम्फ नोड) की बड़ी दर्दनाक सूजन', 'गिल्टी में मवाद भरना व घाव बनना', 'पूर्व में जननांग घाव का इतिहास', 'गुदा मार्ग से मवाद स्राव (LGV Proctitis)']
        : ['Unilateral painful swollen inguinal bubo', 'Fluctuant, tender suppurative lymph node', 'Preceding history of genital ulcer/discharge', 'Anorectal purulent discharge (Proctitis)'],
      drugs: [
        { name: 'Cap. Doxycycline 100 mg', dose: isHindi ? '1 कैप्सूल सुबह-शाम x 21 दिन (42 कैप्सूल)' : '100 mg BD x 21 days (42 capsules)' },
        { name: 'Tab. Azithromycin 1000 mg', dose: isHindi ? '1 ग्राम (एकल खुराक STAT)' : '1 g Single Oral Dose' },
      ],
      partnerProtocol: isHindi
        ? 'पिछले 3 सप्ताह के सभी यौन साथियों का उपचार करें'
        : 'Treat all sexual partners for the past 3 weeks',
      partnerDays: isHindi ? 'पिछले 3 सप्ताह' : 'Past 3 Weeks',
    },
    {
      id: 'kit-8',
      num: '8',
      code: 'Kit 8',
      name: isHindi ? 'किट 8: भूरा' : 'Kit 8: Brown',
      colorName: isHindi ? 'भूरा (Brown)' : 'Brown',
      color: '#7B341E',
      textColor: '#FFFFFF',
      syndromeShort: isHindi ? 'एनोरेक्टल स्राव' : 'Anorectal Discharge',
      syndrome: isHindi ? 'एनोरेक्टल स्राव सिंड्रोम (Anorectal Discharge)' : 'Anorectal Discharge Syndrome',
      indications: isHindi
        ? ['गुदा मार्ग से मवाद या श्लेष्मा स्राव', 'मल त्याग के समय मरोड़ व तेज दर्द (Tenesmus)', 'गुदा के आसपास लाली, खुजली व जलन']
        : ['Purulent or mucoid rectal discharge', 'Painful defecation & straining (Tenesmus)', 'Perianal erythema, pruritus & burning'],
      drugs: [
        { name: 'Tab. Cefixime 800 mg', dose: isHindi ? '800 मि.ग्रा. (एकल खुराक STAT)' : '800 mg Single STAT Dose' },
        { name: 'Tab. Doxycycline 100 mg', dose: isHindi ? '1 गोली सुबह-शाम x 7 दिन (14 कैप्सूल)' : '100 mg BD x 7 days (14 capsules)' },
      ],
      partnerProtocol: isHindi
        ? 'हाल के सभी यौन साथियों का उपचार करें'
        : 'Treat all recent sexual partners simultaneously',
      partnerDays: isHindi ? 'हाल के सभी साथी' : 'Recent Partners',
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

  const activeKit = kits.find((k) => k.id === selectedKit) || kits[0];

  return (
    <PageSurface
      pageNumber={12}
      chapterHue="care-blue"
      audioScriptText={`${activeKit.name}. ${activeKit.syndrome}. ${isHindi ? 'पहचान:' : 'Signs:'} ${activeKit.indications.join(', ')}. ${isHindi ? 'दवाएं:' : 'Regimen:'} ${activeKit.drugs.map((d) => `${d.name} (${d.dose})`).join(' + ')}. ${activeKit.partnerProtocol}`}
      locale={locale}
    >
      {/* Top Header Section */}
      <div className="flex items-center justify-between border-b border-brass/40 pb-1 shrink-0">
        <div>
          <div className="text-[9px] sm:text-[10px] font-mono font-bold text-care-blue-dark uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{isHindi ? 'NACO 2025/2026 राष्ट्रीय सिंड्रोमिक मानक' : 'NACO 2025/2026 CLINICAL STANDARDS'}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black font-display text-ink-teal leading-tight">
            {isHindi ? 'NACO कलर-कोडेड किट गाइड (8 किट)' : 'NACO Color-Coded STI Treatment Kits'}
          </h2>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mineral-green/15 border border-mineral-green/30 text-[9px] font-bold text-mineral-green-dark">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Suraksha Standard</span>
        </div>
      </div>

      {/* 8-Kit Interactive Pouch Shelf Selector */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 py-1 shrink-0">
        {kits.map((k) => {
          const isSelected = selectedKit === k.id;
          return (
            <button
              key={k.id}
              onClick={() => setSelectedKit(k.id)}
              className={`relative flex flex-col items-center justify-between p-1.5 rounded-xl border transition-all text-center group cursor-pointer ${
                isSelected
                  ? 'border-amber-400 bg-white shadow-md ring-2 ring-amber-400 -translate-y-0.5 scale-105'
                  : 'border-brass/30 bg-paper-shadow/60 hover:bg-white/80 hover:border-brass'
              }`}
            >
              {/* Mini Color Pouch Seal */}
              <div
                className="w-full h-4 rounded-md shadow-xs flex items-center justify-center text-[8px] font-mono font-black border border-black/10"
                style={{ backgroundColor: k.color, color: k.textColor }}
              >
                K{k.num}
              </div>

              {/* Short Label */}
              <span className={`text-[8.5px] font-bold mt-1 leading-none truncate w-full ${isSelected ? 'text-ink-teal font-extrabold' : 'text-ink-muted'}`}>
                {k.syndromeShort}
              </span>
            </button>
          );
        })}
      </div>

      {/* Master 3D Sealed Kit Inspection Spec-Sheet */}
      <div className="flex-1 flex flex-col justify-between bg-paper-shadow/50 border-2 border-brass/40 rounded-2xl p-2.5 sm:p-3 space-y-1.5 overflow-hidden my-auto shadow-sm">
        {/* Top Pouch Banner with Authentic Packaging Emblems */}
        <div className="flex items-center justify-between border-b border-brass/30 pb-1.5 shrink-0">
          <div className="flex items-center gap-2">
            {/* Sealed Color Badge */}
            <div
              className="px-3 py-1 rounded-lg font-mono font-black text-xs shadow-xs border border-black/20 flex items-center gap-1.5"
              style={{ backgroundColor: activeKit.color, color: activeKit.textColor }}
            >
              <span>{activeKit.code.toUpperCase()}</span>
              <span className="opacity-70 text-[9px]">({activeKit.colorName})</span>
            </div>

            <div className="font-display font-black text-xs sm:text-sm text-ink-teal leading-tight">
              {activeKit.syndrome}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[8.5px] font-mono font-bold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full border border-amber-300">
            <span>NACO Sealed Kit</span>
          </div>
        </div>

        {/* 2-Column Clinical Representation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 overflow-hidden">
          {/* Left Column: Clinical Signs & Symptoms */}
          <div className="bg-paper p-2 rounded-xl border border-brass/30 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-ink-teal uppercase tracking-wider border-b border-brass/20 pb-1 mb-1">
                <Stethoscope className="w-3.5 h-3.5 text-mineral-green shrink-0" />
                <span>{isHindi ? 'लक्षण पहचान (Signs & Symptoms)' : 'Clinical Indications & Signs'}:</span>
              </div>
              <ul className="space-y-0.5 text-[9px] sm:text-[9.5px] text-ink leading-tight font-medium">
                {activeKit.indications.map((ind, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-mineral-green font-black shrink-0">•</span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Certified Drug Regimen */}
          <div className="bg-paper p-2 rounded-xl border border-brass/30 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-coral-dark uppercase tracking-wider border-b border-brass/20 pb-1 mb-1">
                <Pill className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>{isHindi ? 'दवा संरचना (Composition)' : 'Certified Drug Regimen'}:</span>
              </div>
              <div className="space-y-1">
                {activeKit.drugs.map((drug, i) => (
                  <div key={i} className="bg-paper-shadow/60 p-1.5 rounded-lg border border-brass/20">
                    <div className="font-mono font-bold text-[9.5px] sm:text-[10px] text-ink-teal leading-tight">
                      {drug.name}
                    </div>
                    <div className="text-[8.5px] sm:text-[9px] text-ink-muted font-medium mt-0.5">
                      {drug.dose}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Partner Management Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border border-amber-500/35 p-1.5 rounded-xl flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-800 shrink-0" />
            <div className="text-[9px] sm:text-[10px] text-ink leading-tight">
              <span className="font-black text-amber-900 uppercase tracking-wider">
                {isHindi ? 'पार्टनर प्रबंधन: ' : 'Partner Protocol: '}
              </span>
              <span className="font-bold text-ink-black">{activeKit.partnerProtocol}</span>
            </div>
          </div>

          <span className="text-[8px] font-mono font-extrabold bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full shrink-0 shadow-xs border border-amber-400">
            {activeKit.partnerDays}
          </span>
        </div>
      </div>

      {/* Closed Setting Facilitator Note */}
      <div className="bg-care-blue/15 px-2.5 py-1 rounded-xl border border-care-blue/30 text-[8.5px] sm:text-[9.5px] text-ink font-medium flex items-center justify-between shrink-0">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-care-blue-dark shrink-0" />
          <span>
            {isHindi
              ? 'कारागारों एवं बंद संस्थानों में सुरक्षा क्लीनिक रेफरल द्वारा सभी 8 किट निःशुल्क दी जाती हैं।'
              : 'Provided free of charge at all Government Suraksha Clinics. Complete the full course.'}
          </span>
        </span>
        <span className="font-bold text-care-blue-dark shrink-0">100% Free & Confidential</span>
      </div>
    </PageSurface>
  );
};
