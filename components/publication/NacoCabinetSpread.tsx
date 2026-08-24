'use client';

import React, { useState } from 'react';
import { NACO_KITS, NacoKit } from '@/src/domain/content/naco_kits';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';
import { ClinicalAtlasRegistry } from '@/components/clinical/ClinicalAtlasRegistry';
import { DualAnatomicalPresentation } from '@/components/clinical/DualAnatomicalPresentation';
import { ShieldCheck, Lock, Unlock, X, Pill, Eye } from 'lucide-react';

interface NacoCabinetSpreadProps {
  locale: Locale;
}

export const NacoCabinetSpread: React.FC<NacoCabinetSpreadProps> = ({ locale }) => {
  const [selectedKit, setSelectedKit] = useState<NacoKit | null>(NACO_KITS[0]);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [showAtlasModal, setShowAtlasModal] = useState(false);

  const { mode, facilitatorUnlocked, unlockFacilitator, setMode } = useBookStore();
  const isFacilitator = mode === 'facilitator' && facilitatorUnlocked;

  const handleFacilitatorToggle = () => {
    if (facilitatorUnlocked) {
      setMode(mode === 'facilitator' ? 'reading' : 'facilitator');
    } else {
      setShowPasscodeModal(true);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockFacilitator(passcode);
    if (success) {
      setShowPasscodeModal(false);
      setPasscodeError(false);
      setPasscode('');
    } else {
      setPasscodeError(true);
    }
  };

  const currentAtlasEntry = selectedKit
    ? ClinicalAtlasRegistry.getByNacoKitNumber(selectedKit.kitNumber)
    : undefined;

  return (
    <div className="w-full space-y-2 select-none text-ink">
      {/* Cabinet Top Header */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-border/80 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[10px] sm:text-[11px] text-teal-dark uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-teal" />
          <span>7 NACO Syndromic Kits</span>
        </div>

        {/* Facilitator Mode Access Gate */}
        <button
          onClick={handleFacilitatorToggle}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors border ${
            isFacilitator
              ? 'bg-amber-500 text-ink border-amber-600 shadow-sm'
              : 'bg-paper-deep text-ink-muted hover:text-ink border-border'
          }`}
          title="Facilitator Mode Gate"
        >
          {isFacilitator ? <Unlock className="w-2.5 h-2.5 text-ink" /> : <Lock className="w-2.5 h-2.5 text-ink-muted" />}
          <span>{isFacilitator ? 'CHW View' : 'CHW Gate'}</span>
        </button>
      </div>

      {/* 7-Kit Tactile Cabinet Shelf */}
      <div className="grid grid-cols-7 gap-1 p-1 sm:p-1.5 bg-gradient-to-b from-[#2A3B3D] to-[#18282A] rounded-xl shadow-inner border border-border/50">
        {NACO_KITS.map((kit) => {
          const isSelected = selectedKit?.id === kit.id;
          return (
            <button
              key={kit.id}
              onClick={() => setSelectedKit(kit)}
              className={`flex flex-col items-center justify-between py-1 px-0.5 rounded-lg transition-all text-center group ${
                isSelected
                  ? 'ring-2 ring-amber-400 scale-105 shadow-md -translate-y-0.5'
                  : 'hover:scale-102 opacity-90 hover:opacity-100'
              }`}
              style={{ backgroundColor: kit.colorHex }}
              aria-label={`Select ${kit.colorName[locale] || kit.colorName.en}`}
            >
              <span className="text-[7px] font-bold text-white/90 uppercase tracking-tighter">KIT</span>
              <span className="text-xs sm:text-sm font-black text-white leading-none">{kit.kitNumber}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/70 mt-0.5" />
            </button>
          );
        })}
      </div>

      {/* Selected Kit Detail Sheet */}
      {selectedKit && (
        <div className="bg-paper-pure p-2.5 sm:p-3 rounded-xl border border-border shadow-sm space-y-1.5 text-xs animate-fade-in">
          <div className="flex items-center justify-between pb-1 border-b border-border/60">
            <div className="flex items-center gap-1.5">
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-extrabold text-white uppercase shadow-sm"
                style={{ backgroundColor: selectedKit.colorHex }}
              >
                Kit {selectedKit.kitNumber}
              </span>
              <h4 className="font-extrabold text-xs sm:text-[13px] text-ink line-clamp-1">
                {selectedKit.syndromeTitle[locale] || selectedKit.syndromeTitle.en}
              </h4>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
              Clinical Review: Approved
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] font-medium text-ink-muted italic line-clamp-1">
            "{selectedKit.syndromeSubtitle[locale] || selectedKit.syndromeSubtitle.en}"
          </p>

          {/* Plain Language Symptoms */}
          <div className="text-[10px] sm:text-[11px] space-y-0.5 bg-paper-deep/40 p-1.5 sm:p-2 rounded-lg border border-border/50">
            <div className="font-bold text-ink text-[9px] uppercase tracking-wider">
              {locale === 'hi' ? 'लक्षण' : 'Indications'}:
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-ink-muted">
              {(selectedKit.plainSymptoms[locale] || selectedKit.plainSymptoms.en || []).slice(0, 2).map((s, i) => (
                <li key={i} className="line-clamp-1">{s}</li>
              ))}
            </ul>
          </div>

          {/* Protected Clinical Regimen in Facilitator Mode */}
          {isFacilitator ? (
            <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-300 text-[10px]">
              <div className="font-bold text-amber-900 flex items-center gap-1 mb-0.5 text-[9px] uppercase">
                <Pill className="w-2.5 h-2.5" />
                Clinical Regimen (NACO Standard):
              </div>
              <div className="font-mono text-[11px] font-bold text-amber-950 bg-amber-100 p-1 rounded">
                {selectedKit.clinicalRegimen}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-teal font-semibold">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal shrink-0" />
                <span>Available 100% free at Suraksha Clinics.</span>
              </div>
              {currentAtlasEntry && (
                <button
                  onClick={() => setShowAtlasModal(true)}
                  className="text-amber-800 hover:text-amber-950 font-bold underline flex items-center gap-0.5"
                >
                  <Eye className="w-2.5 h-2.5" />
                  <span>{locale === 'hi' ? 'तुलनात्मक दृश्य' : 'View Dual Visuals'}</span>
                </button>
              )}
            </div>
          )}

          {/* Partner & Follow-up */}
          <div className="grid grid-cols-2 gap-1.5 text-[9px] sm:text-[10px] pt-0.5">
            <div className="bg-paper-deep/60 p-1 rounded border border-border">
              <span className="font-bold text-ink block">Partner Care:</span>
              <span className="text-ink-muted leading-tight line-clamp-1">
                {selectedKit.partnerManagement[locale] || selectedKit.partnerManagement.en}
              </span>
            </div>
            <div className="bg-paper-deep/60 p-1 rounded border border-border">
              <span className="font-bold text-ink block">Follow-up:</span>
              <span className="text-ink-muted leading-tight line-clamp-1">
                {selectedKit.followUpSchedule[locale] || selectedKit.followUpSchedule.en}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dual Anatomical Visual Atlas Modal */}
      {showAtlasModal && currentAtlasEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
          <div className="bg-[#F6F1E4] border border-[#D8CEB8] rounded-3xl max-w-lg w-full p-4 shadow-2xl space-y-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-[#D8CEB8]">
              <h3 className="font-bold text-sm text-[#10353A]">
                {ClinicalAtlasRegistry.getLocalizedTitle(currentAtlasEntry, locale)}
              </h3>
              <button
                onClick={() => setShowAtlasModal(false)}
                className="p-1 rounded-full bg-paper-deep hover:bg-border text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <DualAnatomicalPresentation entry={currentAtlasEntry} locale={locale} />
          </div>
        </div>
      )}

      {/* Facilitator Passcode Modal */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-paper-pure border border-border rounded-2xl max-w-xs w-full p-4 shadow-2xl space-y-2.5">
            <div className="flex items-center justify-between border-b border-border pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-ink">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Facilitator Access Passcode</span>
              </div>
              <button onClick={() => setShowPasscodeModal(false)} className="text-ink-muted hover:text-ink">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-ink-muted">
              Enter official staff PIN (e.g. <code className="bg-paper-deep px-1 rounded font-bold">suraksha2026</code> or <code className="bg-paper-deep px-1 rounded font-bold">1097</code>) to access clinical dosages.
            </p>

            <form onSubmit={handleUnlock} className="space-y-2">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-2.5 py-1.5 border border-border rounded-lg text-xs bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-teal"
                autoFocus
              />
              {passcodeError && (
                <div className="text-[10px] text-danger font-semibold">Incorrect passcode. Try 'suraksha2026' or '1097'.</div>
              )}
              <button
                type="submit"
                className="w-full py-1.5 bg-teal text-white rounded-lg text-xs font-bold hover:bg-teal-dark transition-colors"
              >
                Unlock CHW View
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
