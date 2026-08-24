'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClinicalSyndromesDiagramSvgProps {
  locale: Locale;
}

export const ClinicalSyndromesDiagramSvg: React.FC<ClinicalSyndromesDiagramSvgProps> = ({ locale }) => {
  const [activeSyndrome, setActiveSyndrome] = useState<0 | 1 | 2 | 3>(0);

  const syndromes = [
    {
      title: 'Discharge Syndrome',
      titleHi: 'स्राव सिंड्रोम (Discharge)',
      badge: 'Kit 1 (Grey) / Kit 2 (Green)',
      badgeColor: '#2F855A',
      features: [
        'Burning sensation during urination',
        'Thick, yellow/white or curdy mucosal discharge',
        'Caused by Gonorrhea, Chlamydia, or Trichomonas/Candida',
      ],
      featuresHi: [
        'पेशाब में जलन या दर्द',
        'सफेद, पीला या गाढ़ा स्राव',
        'गोनोरिया, क्लैमाइडिया या कैंडिडा के कारण',
      ],
      iconType: 'discharge',
    },
    {
      title: 'Genital Ulcer (Non-Herpetic)',
      titleHi: 'घाव सिंड्रोम - गैर हर्पीस (Chancre)',
      badge: 'Kit 3 (White) / Kit 4 (Blue)',
      badgeColor: '#2B6CB0',
      features: [
        'Single painless, hard-bordered sore (Chancre / Syphilis)',
        'Often heals on surface while bacteria travel internally',
        'Completely curable with single-dose Benzathine Penicillin',
      ],
      featuresHi: [
        'एकल, दर्द-रहित कठोर घाव (सिफलिस का लक्षण)',
        'ऊपर से ठीक दिखता है लेकिन अंदर फैलता है',
        'पेनिसिलिन किट से तुरंत पूर्ण इलाज',
      ],
      iconType: 'chancre',
    },
    {
      title: 'Genital Ulcer (Herpetic)',
      titleHi: 'हर्पीस फफोले (Herpetic Blisters)',
      badge: 'Kit 5 (Red)',
      badgeColor: '#C53030',
      features: [
        'Clustered, small fluid-filled painful blisters',
        'Rupture into shallow, tingling sores',
        'Quickly calmed and controlled with antiviral Acyclovir',
      ],
      featuresHi: [
        'गुच्छेदार, पानी भरे दर्दनाक छोटे फफोले',
        'फूटकर जलन और टीस पैदा करते हैं',
        'एंटीवायरल एसाइक्लोविर किट से तेजी से राहत',
      ],
      iconType: 'herpes',
    },
    {
      title: 'Pelvic Pain & Inguinal Bubo',
      titleHi: 'पेट दर्द एवं गिल्टी (PID & Bubo)',
      badge: 'Kit 6 (Yellow) / Kit 7 (Black)',
      badgeColor: '#D69E2E',
      features: [
        'Lower abdominal ache or fever (PID in women)',
        'Swollen, tender lymph node in groin (Bubo / LGV / Chancroid)',
        '14-21 day broad-spectrum cure to prevent scarring',
      ],
      featuresHi: [
        'पेड़ू (निचले पेट) में लगातार दर्द या बुखार',
        'जांघ के जोड़ (ग्रोइन) में दर्दनाक गिल्टी की सूजन',
        'व्यापक किट उपचार से पूर्ण रोकथाम',
      ],
      iconType: 'bubo',
    },
  ];

  const current = syndromes[activeSyndrome];

  return (
    <div className="w-full bg-paper-pure rounded-2xl p-4 sm:p-5 border border-border shadow-md select-none text-ink space-y-3">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal text-white flex items-center justify-center">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal">
              NACO Syndromic Diagnostic Atlas
            </span>
            <h4 className="text-xs sm:text-sm font-extrabold text-ink">
              {locale === 'hi' ? '4 प्रमुख नैदानिक सिंड्रोम वर्गीकरण' : '4 Major Clinical Syndromes'}
            </h4>
          </div>
        </div>

        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
          WHO / NACO Guideline
        </span>
      </div>

      {/* Syndrome Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {syndromes.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSyndrome(idx as any)}
            className={`p-2 rounded-xl text-left transition-all border ${
              activeSyndrome === idx
                ? 'bg-teal text-white border-teal shadow font-bold'
                : 'bg-paper-deep/60 hover:bg-paper-deep text-ink-muted border-border'
            }`}
          >
            <div className="text-[9px] uppercase tracking-wider opacity-80">Syndrome {idx + 1}</div>
            <div className="text-[11px] font-extrabold line-clamp-1">
              {locale === 'hi' ? s.titleHi.split(' ')[0] : s.title.split(' ')[0]}
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Syndrome Canvas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-paper-deep/30 p-3 rounded-xl border border-border/80">
        {/* Vector Anatomical Icon */}
        <div className="flex items-center justify-center p-2">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            {/* Background Medical Cross Grid */}
            <circle cx="50" cy="50" r="42" fill="#E4D9BE" fillOpacity="0.4" stroke="#D8CEB8" strokeWidth="2" />
            
            {activeSyndrome === 0 && (
              /* Discharge Visual */
              <g fill="#2F855A">
                <path d="M 50,20 C 50,20 30,50 30,65 C 30,76 39,85 50,85 C 61,85 70,76 70,65 C 70,50 50,20 50,20 Z" />
                <circle cx="42" cy="62" r="3" fill="#E6FFFA" />
                <circle cx="55" cy="70" r="2" fill="#E6FFFA" />
              </g>
            )}

            {activeSyndrome === 1 && (
              /* Indurated Chancre Visual */
              <g>
                <circle cx="50" cy="50" r="28" fill="#E2E8F0" stroke="#2B6CB0" strokeWidth="4" />
                <circle cx="50" cy="50" r="16" fill="#2B6CB0" />
                <circle cx="50" cy="50" r="8" fill="#CBD5E0" />
              </g>
            )}

            {activeSyndrome === 2 && (
              /* Clustered Vesicles Visual */
              <g fill="#C53030">
                <circle cx="42" cy="40" r="10" stroke="#FEB2B2" strokeWidth="2" />
                <circle cx="58" cy="42" r="12" stroke="#FEB2B2" strokeWidth="2" />
                <circle cx="48" cy="60" r="11" stroke="#FEB2B2" strokeWidth="2" />
                <circle cx="36" cy="56" r="8" stroke="#FEB2B2" strokeWidth="1.5" />
                <circle cx="62" cy="58" r="7" stroke="#FEB2B2" strokeWidth="1.5" />
                <circle cx="40" cy="38" r="3" fill="#FFF5F5" />
                <circle cx="56" cy="40" r="3" fill="#FFF5F5" />
              </g>
            )}

            {activeSyndrome === 3 && (
              /* Inguinal Bubo / Lymph Node Visual */
              <g>
                <path d="M 30,35 Q 50,20 70,35 Q 85,55 70,75 Q 50,85 30,75 Q 15,55 30,35 Z" fill="#D69E2E" stroke="#744210" strokeWidth="3" />
                <circle cx="50" cy="55" r="14" fill="#B7791F" />
                <circle cx="48" cy="52" r="4" fill="#FEFCBF" />
              </g>
            )}
          </svg>
        </div>

        {/* Clinical Presentation & Indications */}
        <div className="sm:col-span-2 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <h5 className="font-extrabold text-sm text-ink">
              {locale === 'hi' ? current.titleHi : current.title}
            </h5>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase shadow-sm"
              style={{ backgroundColor: current.badgeColor }}
            >
              {current.badge}
            </span>
          </div>

          <ul className="space-y-1">
            {(locale === 'hi' ? current.featuresHi : current.features).map((feat, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-ink-muted font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
