'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { SceneDefinition, SceneTargetDefinition } from '@/content/visual-scenes/scene-definitions';
import { Info, ShieldCheck } from 'lucide-react';

interface SceneDescriptionProps {
  scene: SceneDefinition;
  locale: Locale;
  activeTarget?: SceneTargetDefinition;
}

export const SceneDescription: React.FC<SceneDescriptionProps> = ({
  scene,
  locale,
  activeTarget,
}) => {
  const title = scene.title[locale] || scene.title.en;
  const desc = scene.description[locale] || scene.description.en;

  const targetLabel = activeTarget?.label[locale] || activeTarget?.label.en;
  const targetDesc = activeTarget?.description[locale] || activeTarget?.description.en;

  return (
    <div className="w-full bg-paper-pure/90 border border-border rounded-xl p-2.5 space-y-1.5 text-xs text-ink select-none shadow-sm">
      <div className="flex items-center justify-between border-b border-border/60 pb-1">
        <div className="flex items-center gap-1.5 font-bold text-[10px] text-teal uppercase tracking-wider">
          <Info className="w-3 h-3 text-teal shrink-0" />
          <span>{title}</span>
        </div>
        <span className="text-[8px] font-bold text-emerald-800 bg-mint px-1.5 py-0.5 rounded">
          Scientific Education
        </span>
      </div>

      {activeTarget ? (
        <div className="bg-paper-deep/60 p-2 rounded-lg border border-border/80 space-y-0.5 animate-fade-in">
          <div className="font-extrabold text-[11px] text-teal-dark">
            {targetLabel}
          </div>
          <p className="text-[10px] text-ink-muted leading-relaxed">
            {targetDesc}
          </p>
        </div>
      ) : (
        <p className="text-[10px] text-ink-muted leading-relaxed font-medium">
          {desc}
        </p>
      )}

      <div className="flex items-center gap-1 text-[9px] text-teal font-medium pt-0.5">
        <ShieldCheck className="w-3 h-3 text-teal shrink-0" />
        <span>
          {locale === 'hi'
            ? 'यह दृश्य शैक्षणिक समझ के लिए है, निदान के लिए नहीं।'
            : 'Interactive visual for health education. Cannot diagnose a condition.'}
        </span>
      </div>
    </div>
  );
};
