'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, HelpCircle, ArrowRight, Activity } from 'lucide-react';

interface ThreeLayerDefinition {
  plainMeaning: Record<Locale, string>;
  clinicalContext: Record<Locale, string>;
  safeAction: Record<Locale, string>;
}

interface VisualCaptionProps {
  definition: ThreeLayerDefinition;
  locale: Locale;
  syndromeTitle?: string;
}

export const VisualCaption: React.FC<VisualCaptionProps> = ({
  definition,
  locale,
  syndromeTitle,
}) => {
  const plainText = definition.plainMeaning[locale] || definition.plainMeaning.en;
  const contextText = definition.clinicalContext[locale] || definition.clinicalContext.en;
  const actionText = definition.safeAction[locale] || definition.safeAction.en;

  return (
    <div className="w-full bg-paper-pure border border-border rounded-xl p-2.5 sm:p-3 space-y-2 text-xs select-none shadow-sm">
      {syndromeTitle && (
        <div className="flex items-center gap-1 text-[10px] font-black text-teal uppercase tracking-wider pb-0.5 border-b border-border/60">
          <Activity className="w-3 h-3 text-teal" />
          <span>{syndromeTitle}</span>
        </div>
      )}

      {/* Layer 1: Plain-Language Meaning (What the reader may notice) */}
      <div className="space-y-0.5">
        <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wide flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-teal" />
          <span>{locale === 'hi' ? 'लक्षण का अर्थ' : 'What You May Notice'}:</span>
        </div>
        <p className="text-[11px] text-ink leading-relaxed font-medium pl-2.5">
          {plainText}
        </p>
      </div>

      {/* Layer 2: Why Professional Care Matters */}
      <div className="space-y-0.5 bg-paper-deep/50 p-2 rounded-lg border border-border/50">
        <div className="text-[9px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1">
          <HelpCircle className="w-2.5 h-2.5 text-amber-700" />
          <span>{locale === 'hi' ? 'डॉक्टर की जांच क्यों जरूरी है' : 'Why Testing Matters'}:</span>
        </div>
        <p className="text-[10px] text-ink-muted leading-relaxed pl-3.5">
          {contextText}
        </p>
      </div>

      {/* Layer 3: Safe Action Step */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/60 text-[10px]">
        <div className="flex items-center gap-1 font-bold text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{actionText}</span>
        </div>
        <span className="text-[8px] font-bold bg-mint px-1.5 py-0.5 rounded text-teal-dark shrink-0">
          100% Free
        </span>
      </div>
    </div>
  );
};
