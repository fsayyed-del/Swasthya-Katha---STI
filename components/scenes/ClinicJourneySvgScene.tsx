'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';

interface ClinicJourneySvgSceneProps {
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
  locale: Locale;
}

export const ClinicJourneySvgScene: React.FC<ClinicJourneySvgSceneProps> = ({
  activeTargetId,
  onTargetClick,
  locale
}) => {
  const steps = [
    {
      id: 'target-step-1-welcome',
      num: '1',
      title: locale === 'hi' ? 'स्वागत व टोकन' : 'Welcome & Token',
      desc: locale === 'hi' ? 'नाम गुप्त रहता है' : 'Private code given'
    },
    {
      id: 'target-step-2-counseling',
      num: '2',
      title: locale === 'hi' ? 'एकांत परामर्श' : 'Private Counseling',
      desc: locale === 'hi' ? 'बिना किसी संकोच के बात' : 'Kind, confidential talk'
    },
    {
      id: 'target-step-3-sample',
      num: '3',
      title: locale === 'hi' ? 'सरल जांच' : 'Painless Check',
      desc: locale === 'hi' ? 'एक बूंद खून / स्वैब' : 'Quick finger prick / swab'
    },
    {
      id: 'target-step-4-free-kit',
      num: '4',
      title: locale === 'hi' ? 'मुफ्त NACO किट' : 'Free NACO Kit',
      desc: locale === 'hi' ? 'दवा व मुफ्त कंडोम' : 'Free care & condoms'
    }
  ];

  return (
    <div className="w-full flex flex-col items-center bg-paper-deep/50 rounded-2xl p-4 border border-border/70 overflow-hidden shadow-inner">
      <div className="w-full flex items-center justify-between text-xs text-ink-muted mb-3 font-medium">
        <span>🏥 Suraksha Clinic Step-by-Step Pathway</span>
        <span className="text-teal font-bold">100% Free Government Care</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {steps.map((step) => {
          const isActive = activeTargetId === step.id;
          return (
            <div
              key={step.id}
              onClick={() => onTargetClick?.(step.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                isActive
                  ? 'bg-teal text-white border-teal shadow-md scale-105'
                  : 'bg-paper hover:bg-paper-pure border-border text-ink'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 ${
                isActive ? 'bg-white text-teal' : 'bg-teal/10 text-teal'
              }`}>
                {step.num}
              </div>
              <div className="font-bold text-xs">{step.title}</div>
              <div className={`text-[11px] mt-1 ${isActive ? 'text-white/90' : 'text-ink-muted'}`}>
                {step.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
