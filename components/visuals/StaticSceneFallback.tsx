'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { SceneDefinition } from '@/content/visual-scenes/scene-definitions';
import { ShieldCheck, Info } from 'lucide-react';

interface StaticSceneFallbackProps {
  scene: SceneDefinition;
  locale: Locale;
}

export const StaticSceneFallback: React.FC<StaticSceneFallbackProps> = ({
  scene,
  locale,
}) => {
  const title = scene.title[locale] || scene.title.en;
  const desc = scene.description[locale] || scene.description.en;

  return (
    <div className="w-full bg-paper-pure border border-border rounded-2xl p-4 space-y-3 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
        <h3 className="font-extrabold text-sm text-ink">{title}</h3>
        <span className="text-[10px] font-bold text-teal bg-mint px-2 py-0.5 rounded">
          Static Diagram Fallback
        </span>
      </div>

      <p className="text-xs text-ink-muted leading-relaxed">
        {desc}
      </p>

      {/* Structured Target List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {scene.targets.map((target) => (
          <div key={target.id} className="bg-paper-deep/60 p-2 rounded-xl border border-border space-y-1">
            <div className="font-bold text-xs text-teal-dark">
              {target.label[locale] || target.label.en}
            </div>
            <p className="text-[11px] text-ink-muted leading-relaxed">
              {target.description[locale] || target.description.en}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-teal pt-1 border-t border-border/60">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        <span>For clinical assistance, visit your nearest free Suraksha Clinic.</span>
      </div>
    </div>
  );
};
