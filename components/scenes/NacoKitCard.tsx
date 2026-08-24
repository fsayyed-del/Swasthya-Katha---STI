'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Calendar, AlertCircle, Pill, ShieldCheck } from 'lucide-react';
import { NacoKit } from '@/src/domain/content/naco_kits';
import { Locale } from '@/src/domain/content/schema';

interface NacoKitCardProps {
  kit: NacoKit;
  locale: Locale;
  isFacilitatorMode: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const NacoKitCard: React.FC<NacoKitCardProps> = ({
  kit,
  locale,
  isFacilitatorMode,
  isExpanded = false,
  onToggle,
}) => {
  const colorName = kit.colorName[locale] || kit.colorName.en || '';
  const syndromeTitle = kit.syndromeTitle[locale] || kit.syndromeTitle.en || '';
  const syndromeSubtitle = kit.syndromeSubtitle[locale] || kit.syndromeSubtitle.en || '';
  const symptoms = kit.plainSymptoms[locale] || kit.plainSymptoms.en || [];
  const explanation = kit.plainExplanation[locale] || kit.plainExplanation.en || '';
  const partnerMgmt = kit.partnerManagement[locale] || kit.partnerManagement.en || '';
  const followUp = kit.followUpSchedule[locale] || kit.followUpSchedule.en || '';

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-card flex flex-col justify-between ${
        isExpanded ? 'ring-2 ring-teal shadow-xl scale-[1.01]' : 'hover:shadow-lg'
      } bg-paper-pure border-border`}
    >
      {/* Kit Header with Official Color Theme */}
      <div className={`p-4 ${kit.bgClass} flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-3">
          {/* 3D Kit Box Badge */}
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex flex-col items-center justify-center font-bold shrink-0 shadow-inner">
            <span className="text-[10px] tracking-widest uppercase opacity-80">KIT</span>
            <span className="text-base leading-none">{kit.kitNumber}</span>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">{colorName}</div>
            <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight line-clamp-1">
              {syndromeTitle}
            </h3>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 transition-colors shrink-0"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${colorName}`}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between text-ink">
        <div>
          <p className="text-xs font-medium text-ink-muted mb-3 italic">
            "{syndromeSubtitle}"
          </p>

          {/* Plain Symptoms List */}
          <div className="mb-3 space-y-1.5">
            <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              {locale === 'hi' ? 'मुख्य लक्षण' : locale === 'mr' ? 'प्रमुख लक्षणे' : 'Key Signs & Symptoms'}:
            </div>
            <ul className="space-y-1 text-xs">
              {symptoms.slice(0, isExpanded ? symptoms.length : 2).map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-teal font-bold leading-none mt-0.5">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expanded Details Drawer */}
        {isExpanded && (
          <div className="pt-3 border-t border-border/80 space-y-3 text-xs animate-fade-in">
            {/* How it helps */}
            <div className="bg-mint/40 p-2.5 rounded-xl border border-mint-dark/30">
              <div className="font-bold text-teal-dark flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-teal" />
                {locale === 'hi' ? 'यह किट कैसे मदद करती है' : 'How this kit helps'}:
              </div>
              <p className="text-ink text-[11px] leading-relaxed">{explanation}</p>
            </div>

            {/* Facilitator / Clinical Regimen View */}
            {isFacilitatorMode && (
              <div className="bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-300 dark:border-amber-700">
                <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
                  <Pill className="w-3.5 h-3.5" />
                  Clinical Regimen (NACO Protocol):
                </div>
                <div className="font-mono text-xs font-bold text-amber-950 dark:text-amber-100 bg-amber-100/80 dark:bg-amber-900/60 p-1.5 rounded border border-amber-200">
                  {kit.clinicalRegimen}
                </div>
              </div>
            )}

            {/* Partner Management */}
            <div className="flex items-start gap-2 bg-paper-deep/60 p-2.5 rounded-xl border border-border">
              <Users className="w-4 h-4 text-orange shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-ink text-[11px]">
                  {locale === 'hi' ? 'साथी की देखभाल (Partner Care)' : 'Partner Management'}:
                </div>
                <div className="text-[11px] text-ink-muted leading-snug">{partnerMgmt}</div>
              </div>
            </div>

            {/* Follow-up Timeline */}
            <div className="flex items-start gap-2 bg-paper-deep/60 p-2.5 rounded-xl border border-border">
              <Calendar className="w-4 h-4 text-blue shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-ink text-[11px]">
                  {locale === 'hi' ? 'फॉलो-अप जांच (Follow-up)' : 'Follow-up Schedule'}:
                </div>
                <div className="text-[11px] text-ink-muted leading-snug">{followUp}</div>
              </div>
            </div>
          </div>
        )}

        {/* Card Footer Action */}
        <div className="pt-3 mt-2 flex items-center justify-between text-[11px]">
          <span className="text-teal font-semibold">
            {locale === 'hi' ? 'सुरक्षा क्लिनिक में मुफ्त' : 'Free at Suraksha Clinic'}
          </span>
          <button
            onClick={onToggle}
            className="text-ink-muted hover:text-teal font-bold transition-colors"
          >
            {isExpanded ? (locale === 'hi' ? 'कम देखें' : 'Show Less') : (locale === 'hi' ? 'विवरण देखें →' : 'View Details →')}
          </button>
        </div>
      </div>
    </div>
  );
};
