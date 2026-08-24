'use client';

import React, { useState } from 'react';
import { CANONICAL_PUBLICATION_MANIFEST } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { Stethoscope, MessageSquare, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { StiNetworkSvgScene } from '../scenes/StiNetworkSvgScene';
import { HiddenSignsSvgScene } from '../scenes/HiddenSignsSvgScene';
import { ClinicJourneySvgScene } from '../scenes/ClinicJourneySvgScene';
import { NacoCabinetSpread } from '../publication/NacoCabinetSpread';
import { SurakshaHelplineCard } from '../ui/SurakshaHelplineCard';
import { useBookStore } from '@/lib/state/bookStore';

interface FacilitatorReaderProps {
  lessons?: any[];
  locale: Locale;
}

export const FacilitatorReader: React.FC<FacilitatorReaderProps> = ({ locale }) => {
  const manifest = CANONICAL_PUBLICATION_MANIFEST;
  const [leafIdx, setLeafIdx] = useState(2); // Start at Lesson 1 by default
  const { facilitatorUnlocked } = useBookStore();

  const currentLeaf = manifest.leaves[leafIdx] || manifest.leaves[2];
  const heading = currentLeaf.front.heading[locale] || currentLeaf.front.heading.en;
  const keyMessage = currentLeaf.front.keyMessage?.[locale] || currentLeaf.front.keyMessage?.en;

  const discussionPrompts: Record<number, string> = {
    0: 'Introduce Swasthya Katha to the community group and explain that learning is confidential.',
    1: 'Emphasize that anyone can read this without an account, and demonstrate the gesture.',
    2: 'Ask participants: "Why should we view an STI as a common biological issue rather than a matter of blame?"',
    3: 'Ask the group: "Can someone carry an infection even if they look 100% healthy? Why is visual checking unsafe?"',
    4: 'Explain the 4 steps of Suraksha Clinic visits and highlight the private token system.',
    5: 'Explain why syndromic management gives instant treatment without lab delays.',
    6: 'Walk through all 7 NACO kits and emphasize why treating both partners prevents the Ping-Pong effect.',
    7: 'Provide the 1097 helpline and direct participants to their nearest District Hospital Suraksha Clinic.',
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-4 animate-fade-in text-[#10353A]">
      {/* Facilitator Status Banner */}
      <div className="bg-[#E08A2C] text-[#10353A] rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10353A] text-white flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-[#10353A]">
              Community Health Worker & Facilitator Mode
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display leading-tight">
              {locale === 'hi' ? 'सामुदायिक स्वास्थ्य शिक्षा एवं परामर्श गाइड' : 'Presentation & Group Counseling Guide'}
            </h2>
          </div>
        </div>

        {/* Step Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLeafIdx(Math.max(0, leafIdx - 1))}
            disabled={leafIdx === 0}
            className="px-3 py-1.5 bg-[#10353A] text-white rounded-lg text-xs font-bold disabled:opacity-40 hover:bg-[#0A2226] transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>
          <span className="text-xs font-bold px-2.5 py-1 bg-white/90 rounded-md font-mono">
            Leaf {leafIdx + 1} / {manifest.leaves.length}
          </span>
          <button
            onClick={() => setLeafIdx(Math.min(manifest.leaves.length - 1, leafIdx + 1))}
            disabled={leafIdx === manifest.leaves.length - 1}
            className="px-3 py-1.5 bg-[#10353A] text-white rounded-lg text-xs font-bold disabled:opacity-40 hover:bg-[#0A2226] transition-colors flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Facilitator Canvas */}
      <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 sm:p-8 shadow-card space-y-6">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            Teaching Module {leafIdx + 1}
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#10353A] mt-2">
            {heading}
          </h1>
        </div>

        {/* Facilitator Prompt Card */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-start gap-3 text-amber-950">
          <MessageSquare className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Facilitator Discussion Prompt:
            </div>
            <p className="text-sm font-semibold mt-1 leading-relaxed">
              {discussionPrompts[leafIdx] || discussionPrompts[2]}
            </p>
          </div>
        </div>

        {/* Key Teaching Point */}
        {keyMessage && (
          <div className="bg-[#F6F1E4] p-4 rounded-2xl border border-[#D8CEB8]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#10353A]">
              Key Teaching Point:
            </div>
            <p className="text-sm sm:text-base font-medium mt-1 leading-relaxed text-[#10353A]">
              {keyMessage}
            </p>
          </div>
        )}

        {/* Interactive Visual Canvas */}
        <div className="pt-2">
          {currentLeaf.front.sceneType === 'sti-network' && <StiNetworkSvgScene locale={locale} />}
          {currentLeaf.front.sceneType === 'hidden-signs' && <HiddenSignsSvgScene locale={locale} />}
          {currentLeaf.front.sceneType === 'clinic-journey' && <ClinicJourneySvgScene locale={locale} />}
          {currentLeaf.front.sceneType === 'naco-cabinet' && <NacoCabinetSpread locale={locale} />}
        </div>
      </div>

      <SurakshaHelplineCard locale={locale} />
    </div>
  );
};
