'use client';

import React, { useState } from 'react';
import { ClinicalAtlasEntry } from '@/lib/clinical/clinical-schemas';
import { Locale } from '@/src/domain/content/schema';
import { ClinicalContentShield } from './ClinicalContentShield';
import { IllustratedAlternative } from './IllustratedAlternative';
import { ClinicalZoomModal } from './ClinicalZoomModal';
import { ShieldCheck, Info, Maximize2, Pill, Activity } from 'lucide-react';

interface DualAnatomicalPresentationProps {
  entry: ClinicalAtlasEntry;
  locale: Locale;
}

export const DualAnatomicalPresentation: React.FC<DualAnatomicalPresentationProps> = ({
  entry,
  locale
}) => {
  const [activeTab, setActiveTab] = useState<'male' | 'female' | 'extragenital'>('male');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const diseaseTitle = entry.diseaseName[locale] || entry.diseaseName.en;
  const syndromeTitle = entry.syndromeCategory[locale] || entry.syndromeCategory.en;
  const summaryText = entry.learnerSummary[locale] || entry.learnerSummary.en;

  const currentPresentation =
    activeTab === 'male'
      ? entry.malePresentation
      : activeTab === 'female'
      ? entry.femalePresentation
      : null;

  return (
    <div className="w-full bg-paper-pure border border-border rounded-2xl p-3 sm:p-4 shadow-sm space-y-3 select-none text-ink">
      {/* Header with Title & Kit Tag */}
      <div className="flex items-center justify-between pb-2 border-b border-border/80 gap-2">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal-dark">
            {syndromeTitle}
          </div>
          <h3 className="text-sm sm:text-base font-black font-display text-ink leading-tight">
            {diseaseTitle}
          </h3>
        </div>

        {entry.nacoKitNumber && (
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase shrink-0 shadow-sm"
            style={{ backgroundColor: entry.nacoKitColor || '#10353A' }}
          >
            NACO Kit {entry.nacoKitNumber}
          </span>
        )}
      </div>

      {/* Anatomical Perspective Tabs */}
      <div className="flex items-center bg-paper-deep/80 p-1 rounded-xl border border-border text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveTab('male')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 text-[11px] ${
            activeTab === 'male'
              ? 'bg-teal text-white shadow-sm font-bold'
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          <span>♂ {locale === 'hi' ? 'पुरुष शरीर रचना' : 'Penis / Urethral'}</span>
        </button>

        <button
          onClick={() => setActiveTab('female')}
          className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 text-[11px] ${
            activeTab === 'female'
              ? 'bg-teal text-white shadow-sm font-bold'
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          <span>♀ {locale === 'hi' ? 'महिला शरीर रचना' : 'Vulva / Cervical'}</span>
        </button>

        {entry.extragenitalPresentation && (
          <button
            onClick={() => setActiveTab('extragenital')}
            className={`py-1.5 px-2.5 rounded-lg transition-all text-center text-[10px] ${
              activeTab === 'extragenital'
                ? 'bg-amber-600 text-white shadow-sm font-bold'
                : 'text-ink-muted hover:text-ink'
            }`}
            title="Extragenital Signs"
          >
            <span>{locale === 'hi' ? 'अन्य अंग' : 'Other Sites'}</span>
          </button>
        )}
      </div>

      {/* Main Presentation Body with Shield */}
      <div className="space-y-2">
        <ClinicalContentShield
          locale={locale}
          sensitivity="high"
          illustratedFallback={
            <IllustratedAlternative
              diseaseId={entry.id}
              locale={locale}
              activeAnatomy={activeTab === 'male' ? 'penis_urethral' : 'vulva_cervical'}
            />
          }
        >
          {/* Clinical Visual Card (Unlocked on reveal) */}
          <div className="relative bg-black/80 rounded-xl overflow-hidden p-2 text-center text-white min-h-[140px] flex flex-col items-center justify-center space-y-2">
            <Activity className="w-8 h-8 text-amber-400 animate-pulse" />
            <div className="text-xs font-bold text-amber-200">
              {currentPresentation?.siteName[locale] || currentPresentation?.siteName.en}
            </div>
            <p className="text-[10px] text-gray-300 max-w-xs">
              {currentPresentation?.visualNotes[locale] || currentPresentation?.visualNotes.en}
            </p>
            <button
              onClick={() => setIsZoomOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-xs rounded-full transition-all text-white font-medium"
            >
              <Maximize2 className="w-3 h-3" />
              <span>{locale === 'hi' ? 'बड़ा करके देखें' : 'Inspect Full Screen'}</span>
            </button>
          </div>
        </ClinicalContentShield>

        {/* Anatomical Symptoms Description */}
        <div className="bg-paper-deep/40 p-2.5 rounded-xl border border-border text-[11px] space-y-1">
          <div className="font-bold text-[10px] uppercase text-teal-dark flex items-center gap-1">
            <Info className="w-3 h-3 text-teal" />
            <span>
              {activeTab === 'male'
                ? (locale === 'hi' ? 'पुरुषों में लक्षण' : 'Male Clinical Symptoms')
                : (locale === 'hi' ? 'महिलाओं में लक्षण' : 'Female Clinical Symptoms')}
              :
            </span>
          </div>
          <p className="text-ink leading-relaxed">
            {currentPresentation?.symptoms[locale] || currentPresentation?.symptoms.en}
          </p>
        </div>

        {/* Non-Diagnostic Safety Callout */}
        <div className="bg-mint/40 p-2 rounded-lg border border-mint-dark/30 flex items-start gap-1.5 text-[10px] text-teal-dark">
          <ShieldCheck className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
          <span className="leading-tight">
            {locale === 'hi'
              ? 'निदान केवल डॉक्टर द्वारा परीक्षण से होता है। नजदीकी सुरक्षा क्लिनिक में मुफ्त परामर्श प्राप्त करें।'
              : 'Diagnosis requires clinical history and testing. Visit your nearest government Suraksha Clinic for free care.'}
          </span>
        </div>
      </div>

      {/* Clinical Zoom Lightbox Modal */}
      <ClinicalZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        entry={entry}
        locale={locale}
        activeTab={activeTab}
      />
    </div>
  );
};
