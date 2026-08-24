'use client';

import React, { useEffect } from 'react';
import { ClinicalAtlasEntry } from '@/lib/clinical/clinical-schemas';
import { Locale } from '@/src/domain/content/schema';
import { X, ShieldAlert, BookOpen, ExternalLink } from 'lucide-react';
import { IllustratedAlternative } from './IllustratedAlternative';

interface ClinicalZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: ClinicalAtlasEntry;
  locale: Locale;
  activeTab: 'male' | 'female' | 'extragenital';
}

export const ClinicalZoomModal: React.FC<ClinicalZoomModalProps> = ({
  isOpen,
  onClose,
  entry,
  locale,
  activeTab
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const diseaseTitle = entry.diseaseName[locale] || entry.diseaseName.en;
  const currentPresentation =
    activeTab === 'male'
      ? entry.malePresentation
      : activeTab === 'female'
      ? entry.femalePresentation
      : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="zoom-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-[#F6F1E4] border border-[#D8CEB8] rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-[#10353A]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#D8CEB8] pb-3">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-teal font-display">
              Clinical Diagnostic Atlas • {activeTab === 'male' ? 'Male Anatomy' : 'Female Anatomy'}
            </div>
            <h2 id="zoom-modal-title" className="text-lg sm:text-xl font-black font-display text-ink">
              {diseaseTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-paper-deep hover:bg-border text-ink transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Non-Diagnostic Advisory Banner */}
        <div className="bg-amber-100 border border-amber-300 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-[11px] uppercase tracking-wide">
              {locale === 'hi' ? 'महत्वपूर्ण सूचना: यह निदान उपकरण नहीं है' : 'Notice: Non-Diagnostic Educational Reference'}
            </div>
            <p className="text-[11px] mt-0.5 leading-relaxed">
              {locale === 'hi'
                ? 'तस्वीरें केवल शैक्षिक संदर्भ के लिए हैं। किसी भी लक्षण के सटीक उपचार के लिए नजदीकी सुरक्षा क्लिनिक जाएं।'
                : 'Images are for health education. Definitive diagnosis requires lab tests and medical evaluation at a Suraksha Clinic.'}
            </p>
          </div>
        </div>

        {/* Expanded Visual Asset */}
        <div className="bg-paper-pure p-4 rounded-2xl border border-border shadow-inner flex flex-col items-center justify-center">
          <IllustratedAlternative
            diseaseId={entry.id}
            locale={locale}
            activeAnatomy={activeTab === 'male' ? 'penis_urethral' : 'vulva_cervical'}
          />
        </div>

        {/* Clinical Presentation Breakdown */}
        <div className="bg-paper-deep/50 p-3.5 rounded-xl border border-border space-y-2 text-xs">
          <div className="font-bold text-ink text-xs uppercase tracking-wider">
            {currentPresentation?.siteName[locale] || currentPresentation?.siteName.en}
          </div>
          <p className="text-ink leading-relaxed">
            {currentPresentation?.symptoms[locale] || currentPresentation?.symptoms.en}
          </p>
          <div className="text-[11px] text-ink-muted italic">
            <strong>{locale === 'hi' ? 'नैदानिक विवरण' : 'Clinical Characteristics'}:</strong>{' '}
            {currentPresentation?.visualNotes[locale] || currentPresentation?.visualNotes.en}
          </div>
        </div>

        {/* Footer with Government Source Citation */}
        <div className="border-t border-border pt-3 flex items-center justify-between text-[11px] text-ink-muted">
          <div className="flex items-center gap-1.5 font-medium">
            <BookOpen className="w-4 h-4 text-teal" />
            <span>NACO National Guidelines 2026 • MoHFW India</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-teal text-white rounded-xl text-xs font-bold hover:bg-teal-dark transition-colors shadow"
          >
            {locale === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
