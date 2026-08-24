'use client';

import React, { useState } from 'react';
import { NACO_KITS, NACO_CONSIDERATIONS } from '@/src/domain/content/naco_kits';
import { NacoKitCard } from './NacoKitCard';
import { SurakshaHelplineCard } from '../ui/SurakshaHelplineCard';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, UserCheck, Stethoscope, Sparkles, Filter, Info, Heart } from 'lucide-react';

interface NacoKitSpreadProps {
  locale: Locale;
  defaultFacilitator?: boolean;
}

export const NacoKitSpread: React.FC<NacoKitSpreadProps> = ({
  locale,
  defaultFacilitator = false,
}) => {
  const [isFacilitator, setIsFacilitator] = useState(defaultFacilitator);
  const [expandedKitId, setExpandedKitId] = useState<string | null>('kit-1-grey');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const considerationsTitle = NACO_CONSIDERATIONS.title[locale] || NACO_CONSIDERATIONS.title.en;

  const filteredKits = NACO_KITS.filter((kit) => {
    if (filterCategory === 'discharge') return kit.id.includes('grey') || kit.id.includes('green');
    if (filterCategory === 'ulcer') return kit.id.includes('white') || kit.id.includes('blue') || kit.id.includes('red');
    if (filterCategory === 'pain') return kit.id.includes('yellow') || kit.id.includes('black');
    return true;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in text-ink">
      {/* Top Banner with Official Health Authority Accreditation */}
      <div className="bg-gradient-to-r from-teal-dark via-teal to-teal-dark text-white rounded-2xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-extrabold text-xl tracking-tighter border border-white/30 shadow-inner">
            NACO
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-teal-light">
              National AIDS Control Organisation • Ministry of Health & Family Welfare
            </div>
            <h2 className="text-lg sm:text-2xl font-display font-bold leading-tight">
              {locale === 'hi' ? 'STI/RTI सिंड्रोमिक केस मैनेजमेंट एवं रंगीन किट' : 'STI/RTI Syndromic Case Management'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-0.5">
              {locale === 'hi'
                ? 'सरकारी सुरक्षा क्लिनिकों में 7 कलर-कोडेड किटों द्वारा सुरक्षित, नि:शुल्क और गोपनीय इलाज'
                : 'Standardized, Free & Confidential Care with 7 Color-Coded Kits at Suraksha Clinics'}
            </p>
          </div>
        </div>

        {/* Persona Switcher Toggle (Learner vs Facilitator) */}
        <div className="flex items-center bg-teal-dark/90 p-1.5 rounded-xl border border-white/20 shadow-inner shrink-0">
          <button
            onClick={() => setIsFacilitator(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isFacilitator ? 'bg-white text-teal-dark shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{locale === 'hi' ? 'नागरिक / पाठक मोड' : 'Learner View'}</span>
          </button>
          <button
            onClick={() => setIsFacilitator(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isFacilitator ? 'bg-orange text-ink shadow-sm' : 'text-white/80 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>{locale === 'hi' ? 'स्वास्थ्य कार्यकर्ता मोड' : 'Facilitator / CHW'}</span>
          </button>
        </div>
      </div>

      {/* Symptom Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-paper-deep/60 p-2.5 rounded-xl border border-border">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <span className="flex items-center gap-1 text-ink-muted text-[11px] uppercase tracking-wider pl-1">
            <Filter className="w-3.5 h-3.5" />
            {locale === 'hi' ? 'लक्षण अनुसार चुनें' : 'Filter by Symptoms'}:
          </span>
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी 7 किट (All 7 Kits)' : 'All 7 Kits' },
            { id: 'discharge', label: locale === 'hi' ? 'स्राव / जलन (Discharge)' : 'Discharge (Kits 1 & 2)' },
            { id: 'ulcer', label: locale === 'hi' ? 'घाव / छाले (Ulcers)' : 'Genital Ulcers (Kits 3, 4, 5)' },
            { id: 'pain', label: locale === 'hi' ? 'पेट दर्द / गांठ (Pain & Bubo)' : 'Pain & Bubo (Kits 6 & 7)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                filterCategory === tab.id
                  ? 'bg-teal text-white shadow-sm'
                  : 'bg-paper text-ink hover:bg-paper-pure border border-border/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isFacilitator && (
          <div className="text-[11px] bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-2.5 py-1 rounded-md font-semibold border border-amber-300">
            🩺 Clinical Protocol & Dosages Active
          </div>
        )}
      </div>

      {/* Grid of Color-Coded Kit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKits.map((kit) => (
          <NacoKitCard
            key={kit.id}
            kit={kit}
            locale={locale}
            isFacilitatorMode={isFacilitator}
            isExpanded={expandedKitId === kit.id}
            onToggle={() => setExpandedKitId(expandedKitId === kit.id ? null : kit.id)}
          />
        ))}
      </div>

      {/* Universal Considerations for Management of All STI/RTI */}
      <div className="bg-paper-pure border border-border rounded-2xl p-5 shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          <Heart className="w-5 h-5 text-rose-500" />
          <h3 className="font-display font-bold text-base sm:text-lg text-ink">
            {considerationsTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NACO_CONSIDERATIONS.points.map((p) => {
            const title = p.title[locale] || p.title.en;
            const desc = p.desc[locale] || p.desc.en;
            return (
              <div key={p.id} className="bg-paper-deep/40 p-3.5 rounded-xl border border-border/70 text-xs">
                <div className="font-bold text-teal-dark mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
                  <span>{title}</span>
                </div>
                <p className="text-ink-muted leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Care & Suraksha Helpline 1097 */}
      <SurakshaHelplineCard locale={locale} />
    </div>
  );
};
