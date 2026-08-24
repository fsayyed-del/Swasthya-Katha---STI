'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface SyphilisProgressionSvgProps {
  locale: Locale;
}

export const SyphilisProgressionSvg: React.FC<SyphilisProgressionSvgProps> = ({ locale }) => {
  return (
    <div className="w-full bg-[#10353A] text-white rounded-2xl p-4 sm:p-5 border border-amber-500/30 shadow-xl select-none space-y-3">
      <div className="flex items-center justify-between border-b border-teal-700/60 pb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
            Disease Progression & Cure
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-white">
            {locale === 'hi' ? 'सिफलिस का विकास एवं तुरंत उपचार' : 'Syphilis Stages & Immediate Cure'}
          </h4>
        </div>
        <span className="text-[10px] font-bold bg-amber-400 text-teal-950 px-2.5 py-0.5 rounded-full">
          100% Curable
        </span>
      </div>

      {/* 3-Stage Progression Roadmap */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Stage 1 */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-teal-600/40 text-xs space-y-1">
          <div className="text-[10px] font-bold uppercase text-amber-300">Stage 1: Primary</div>
          <div className="font-extrabold text-white text-xs">Painless Chancre</div>
          <p className="text-[10px] text-teal-100/80 leading-snug">
            Single clean sore appears 2–3 weeks after contact. It heals spontaneously, but bacteria multiply inside.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-teal-600/40 text-xs space-y-1">
          <div className="text-[10px] font-bold uppercase text-amber-300">Stage 2: Secondary</div>
          <div className="font-extrabold text-white text-xs">Palm & Sole Rash</div>
          <p className="text-[10px] text-teal-100/80 leading-snug">
            4–10 weeks later, non-itchy spots appear on palms and body with mild fever or lymph swelling.
          </p>
        </div>

        {/* Immediate Cure */}
        <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-500/50 text-xs space-y-1">
          <div className="text-[10px] font-bold uppercase text-emerald-300">NACO Kit 3 (White)</div>
          <div className="font-extrabold text-white text-xs flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Complete Cure</span>
          </div>
          <p className="text-[10px] text-emerald-100/90 leading-snug">
            Single-dose Benzathine Penicillin eliminates 100% of bacteria, preventing long-term harm.
          </p>
        </div>
      </div>
    </div>
  );
};
