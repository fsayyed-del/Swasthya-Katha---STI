'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';

interface IllustratedAlternativeProps {
  diseaseId: string;
  locale: Locale;
  activeAnatomy: 'penis_urethral' | 'vulva_cervical' | 'extragenital_systemic';
}

export const IllustratedAlternative: React.FC<IllustratedAlternativeProps> = ({
  diseaseId,
  locale,
  activeAnatomy
}) => {
  if (diseaseId === 'syphilis-primary') {
    return (
      <div className="w-full bg-gradient-to-br from-paper-pure via-mint/20 to-paper-deep p-3 rounded-xl border border-teal/20 text-center space-y-2">
        <svg viewBox="0 0 240 120" className="w-full max-w-[200px] mx-auto drop-shadow-sm" aria-label="Syphilis chancre clinical diagram">
          <rect width="240" height="120" rx="12" fill="#F4EDE0" stroke="#D8CEB8" strokeWidth="2" />
          {/* Tissue Layer */}
          <path d="M 20 80 Q 80 70 140 75 Q 200 80 220 75 L 220 110 L 20 110 Z" fill="#E8D5C4" />
          {/* Solitary Indurated Ulcer */}
          <ellipse cx="120" cy="72" rx="28" ry="14" fill="#C5705D" stroke="#8B3A2B" strokeWidth="2" />
          <ellipse cx="120" cy="72" rx="20" ry="9" fill="#E69A8D" />
          <circle cx="120" cy="72" r="6" fill="#8B3A2B" opacity="0.8" />
          {/* Anatomical Induration Markers */}
          <path d="M 85 50 L 95 65" stroke="#10353A" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="80" y="45" fontSize="8" fontWeight="bold" fill="#10353A" textAnchor="end">
            {locale === 'hi' ? 'सख्त किनारा' : 'Indurated Border'}
          </text>
          <path d="M 155 50 L 140 68" stroke="#10353A" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="160" y="45" fontSize="8" fontWeight="bold" fill="#10353A" textAnchor="start">
            {locale === 'hi' ? 'साफ सूखा आधार' : 'Clean Dry Base'}
          </text>
        </svg>

        <div className="text-[10px] text-ink-muted">
          <span className="font-bold text-teal-dark">
            {activeAnatomy === 'penis_urethral'
              ? (locale === 'hi' ? 'लिंग पर प्राथमिक घाव (एकल दर्द रहित)' : 'Male Anatomy: Solitary Painless Chancre')
              : (locale === 'hi' ? 'योनि पर प्राथमिक घाव (एकल दर्द रहित)' : 'Female Anatomy: Solitary Painless Chancre')}
          </span>
        </div>
      </div>
    );
  }

  if (diseaseId === 'gonorrhea') {
    return (
      <div className="w-full bg-gradient-to-br from-paper-pure via-amber-50 to-paper-deep p-3 rounded-xl border border-amber-300/40 text-center space-y-2">
        <svg viewBox="0 0 240 120" className="w-full max-w-[200px] mx-auto drop-shadow-sm" aria-label="Gonococcal discharge diagram">
          <rect width="240" height="120" rx="12" fill="#F4EDE0" stroke="#D8CEB8" strokeWidth="2" />
          {/* Mucosal Canal */}
          <path d="M 40 45 C 90 45, 150 40, 200 45 L 200 75 C 150 80, 90 75, 40 75 Z" fill="#FAD4C0" stroke="#E08A2C" strokeWidth="1.5" />
          {/* Purulent Discharge Drops */}
          <circle cx="150" cy="60" r="8" fill="#F59E0B" opacity="0.9" />
          <circle cx="170" cy="60" r="10" fill="#D97706" opacity="0.9" />
          <path d="M 190 60 Q 210 60 215 75 Q 205 90 195 75 Z" fill="#F59E0B" />
          {/* Inflammation Indicators */}
          <text x="120" y="30" fontSize="9" fontWeight="extrabold" fill="#92400E" textAnchor="middle">
            {locale === 'hi' ? 'गाढ़ा पीला मवाद स्राव (नैको किट 1)' : 'Thick Purulent Discharge (NACO Kit 1)'}
          </text>
        </svg>

        <div className="text-[10px] text-ink-muted">
          <span className="font-bold text-amber-800">
            {activeAnatomy === 'penis_urethral'
              ? (locale === 'hi' ? 'मूत्रमार्ग से गाढ़ा मवाद और जलन' : 'Male Anatomy: Copious Purulent Discharge & Dysuria')
              : (locale === 'hi' ? 'गर्भाशय ग्रीवा से स्राव एवं सूजन' : 'Female Anatomy: Cervical Discharge & Erythema')}
          </span>
        </div>
      </div>
    );
  }

  // Default Fallback: Herpetic Vesicles Diagram
  return (
    <div className="w-full bg-gradient-to-br from-paper-pure via-red-50 to-paper-deep p-3 rounded-xl border border-red-200 text-center space-y-2">
      <svg viewBox="0 0 240 120" className="w-full max-w-[200px] mx-auto drop-shadow-sm" aria-label="Herpetic vesicle cluster diagram">
        <rect width="240" height="120" rx="12" fill="#F4EDE0" stroke="#D8CEB8" strokeWidth="2" />
        {/* Erythematous Skin Base */}
        <ellipse cx="120" cy="65" rx="55" ry="25" fill="#FECACA" stroke="#EF4444" strokeWidth="1.5" />
        {/* Vesicle Clusters */}
        <circle cx="105" cy="60" r="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="7" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
        <circle cx="135" cy="62" r="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
        <circle cx="115" cy="70" r="5.5" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
        <text x="120" y="30" fontSize="9" fontWeight="extrabold" fill="#991B1B" textAnchor="middle">
          {locale === 'hi' ? 'दर्दनाक पानी भरे फफोलों का गुच्छा (नैको किट 5)' : 'Clustered Painful Vesicles (NACO Kit 5)'}
        </text>
      </svg>
      <div className="text-[10px] text-ink-muted">
        <span className="font-bold text-red-800">
          {locale === 'hi' ? 'हर्पीस के विशिष्ट फफोले और उथले घाव' : 'Grouped Herpetic Vesicles on Erythematous Base'}
        </span>
      </div>
    </div>
  );
};
