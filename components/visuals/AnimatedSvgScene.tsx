'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { usePrefersReducedMotion } from './MotionPreference';
import { ShieldCheck } from 'lucide-react';

interface AnimatedSvgSceneProps {
  sceneType: 'transmission' | 'clinic-journey' | 'microscope-reveal';
  locale: Locale;
  onTargetClick?: (targetId: string) => void;
}

interface StepItem {
  num: string;
  title: Partial<Record<Locale, string>>;
  desc: Partial<Record<Locale, string>>;
  color: string;
}

export const AnimatedSvgScene: React.FC<AnimatedSvgSceneProps> = ({
  sceneType,
  locale,
  onTargetClick,
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  if (sceneType === 'clinic-journey') {
    const steps: StepItem[] = [
      {
        num: '1',
        title: { en: 'Token Registration', hi: 'टोकन पंजीकरण' },
        desc: { en: 'Private token code protects identity.', hi: 'गोपनीय कोड से नाम सुरक्षित रहता है।' },
        color: '#10353A'
      },
      {
        num: '2',
        title: { en: 'Private Counseling', hi: 'एकांत परामर्श' },
        desc: { en: 'Compassionate one-on-one session.', hi: 'प्रशिक्षित काउंसलर से व्यक्तिगत चर्चा।' },
        color: '#0D9488'
      },
      {
        num: '3',
        title: { en: 'Gentle Test Sample', hi: 'दर्द-रहित जांच' },
        desc: { en: 'Quick drop or gentle swab.', hi: 'उंगली से एक बूंद खून या हल्का स्वैब।' },
        color: '#D97706'
      },
      {
        num: '4',
        title: { en: 'Free NACO Care Kit', hi: 'मुफ्त NACO किट' },
        desc: { en: 'Pre-packaged kit & free condoms.', hi: 'रंगीन दवा किट एवं मुफ्त कंडोम।' },
        color: '#059669'
      }
    ];

    return (
      <div className="w-full bg-paper-pure border border-border rounded-2xl p-3 space-y-2 select-none shadow-sm">
        <div className="flex items-center justify-between pb-1 border-b border-border/80 text-xs">
          <span className="font-extrabold text-[10px] text-teal uppercase tracking-wider">
            {locale === 'hi' ? '4-चरणीय क्लिनिक यात्रा' : '4-Step Clinic Journey'}
          </span>
          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            100% Confidential
          </span>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const stepTitle = step.title[locale] || step.title.en || '';
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center p-1.5 rounded-xl border text-center transition-all ${
                  isActive
                    ? 'bg-teal text-white border-teal-dark shadow-md scale-105'
                    : 'bg-paper-deep/60 text-ink border-border hover:bg-paper-deep'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] mb-0.5">
                  {step.num}
                </span>
                <span className="text-[9px] font-black leading-tight line-clamp-1">
                  {stepTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="bg-paper-deep/50 p-2.5 rounded-xl border border-border/80 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow"
            style={{ backgroundColor: steps[activeStep].color }}
          >
            {steps[activeStep].num}
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-ink leading-tight">
              {steps[activeStep].title[locale] || steps[activeStep].title.en || ''}
            </h4>
            <p className="text-[10px] text-ink-muted leading-relaxed mt-0.5">
              {steps[activeStep].desc[locale] || steps[activeStep].desc.en || ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: Transmission & Prevention Vector Scene
  return (
    <div className="w-full bg-paper-pure border border-border rounded-2xl p-3 space-y-2 select-none shadow-sm">
      <div className="flex items-center justify-between pb-1 border-b border-border/80 text-xs">
        <span className="font-extrabold text-[10px] text-teal uppercase tracking-wider">
          {locale === 'hi' ? 'संक्रमण मार्ग एवं बचाव' : 'Transmission & Protection Dynamics'}
        </span>
        <span className="text-[9px] font-bold text-emerald-800">
          Scientific Fact
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        {/* Intimate Fluids Transmission */}
        <div className="bg-red-50/70 border border-red-200 rounded-xl p-2 space-y-1">
          <div className="text-[9px] font-bold text-red-900 uppercase">
            {locale === 'hi' ? 'संक्रमण कैसे होता है' : 'How Transmission Occurs'}:
          </div>
          <ul className="text-[9px] text-red-950 space-y-0.5 list-disc list-inside">
            <li>{locale === 'hi' ? 'असुरक्षित यौन संपर्क' : 'Unprotected sexual intercourse'}</li>
            <li>{locale === 'hi' ? 'संक्रमित शारीरिक तरल' : 'Infected body fluids'}</li>
            <li>{locale === 'hi' ? 'गर्भावस्था के दौरान शिशु को' : 'Mother to child during birth'}</li>
          </ul>
        </div>

        {/* Casual Contact Safety */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2 space-y-1">
          <div className="text-[9px] font-bold text-emerald-900 uppercase">
            {locale === 'hi' ? 'कभी नहीं फैलता' : 'Never Transmitted Via'}:
          </div>
          <ul className="text-[9px] text-emerald-950 space-y-0.5 list-disc list-inside">
            <li>{locale === 'hi' ? 'हाथ मिलाने या गले मिलने से' : 'Hugs, handshakes & casual touch'}</li>
            <li>{locale === 'hi' ? 'साथ खाना खाने या बर्तनों से' : 'Sharing food, water, or utensils'}</li>
            <li>{locale === 'hi' ? 'टॉयलेट सीट या तैराकी से' : 'Toilet seats or swimming pools'}</li>
          </ul>
        </div>
      </div>

      <div className="bg-mint/40 p-2 rounded-xl border border-mint-dark/20 text-[9px] text-teal-dark font-medium flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-teal shrink-0" />
        <span>
          {locale === 'hi'
            ? 'कंडोम का सही उपयोग और नियमित जांच ही सच्ची सुरक्षा है।'
            : 'Consistent barrier protection (condoms) and routine testing keep you safe.'}
        </span>
      </div>
    </div>
  );
};
