'use client';

import React from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, Stethoscope, Sparkles, AlertCircle, Users, CheckCircle2, Pill } from 'lucide-react';
import { SoundButton } from '../portrait/SoundButton';
import { useBookStore } from '@/lib/state/bookStore';

export interface ClinicalPhotoItem {
  id: string;
  imageSrc: string;
  caption: Partial<Record<Locale, string>> & { en: string };
  gender: 'male' | 'female' | 'both';
  citation: string;
}

export interface DiseaseEditorialData {
  id: string;
  tag: Partial<Record<Locale, string>> & { en: string };
  title: Partial<Record<Locale, string>> & { en: string };
  kitBadge: { en: string; hi: string; color: string } & Partial<Record<Locale, string>>;
  overview: Partial<Record<Locale, string>> & { en: string };
  maleDetails: Partial<Record<Locale, string>> & { en: string };
  femaleDetails: Partial<Record<Locale, string>> & { en: string };
  photos: ClinicalPhotoItem[];
  regimen?: Partial<Record<Locale, string>> & { en: string };
  partnerProtocol?: Partial<Record<Locale, string>> & { en: string };
  closedSettingPearl?: Partial<Record<Locale, string>> & { en: string };
}

interface EditorialDiseasePageProps {
  data: DiseaseEditorialData;
  locale: Locale;
  pageNumber?: number;
}

export const EditorialDiseasePage: React.FC<EditorialDiseasePageProps> = ({
  data,
  locale,
  pageNumber,
}) => {
  const isHindi = locale === 'hi';
  const tag = data.tag[locale] || data.tag.en;
  const title = data.title[locale] || data.title.en;
  const kitBadge = data.kitBadge[locale] || data.kitBadge.en;
  const overview = data.overview[locale] || data.overview.en;
  const maleDetails = data.maleDetails[locale] || data.maleDetails.en;
  const femaleDetails = data.femaleDetails[locale] || data.femaleDetails.en;
  const regimen = data.regimen ? (data.regimen[locale] || data.regimen.en) : null;
  const partnerProtocol = data.partnerProtocol ? (data.partnerProtocol[locale] || data.partnerProtocol.en) : null;
  const closedSettingPearl = data.closedSettingPearl ? (data.closedSettingPearl[locale] || data.closedSettingPearl.en) : null;

  // Live Audio Highlighting State from Zustand
  const isAudioPlaying = useBookStore((s) => s.isAudioPlaying);
  const activeAudioPage = useBookStore((s) => s.activeAudioPage);
  const activeAudioSentenceIndex = useBookStore((s) => s.activeAudioSentenceIndex);

  // Active page matching logic: strictly when audio is actively playing on THIS page
  const isThisPageNarrating = isAudioPlaying && activeAudioPage === pageNumber;

  const malePhoto = data.photos.find((p) => p.gender === 'male') || data.photos[0];
  const femalePhoto = data.photos.find((p) => p.gender === 'female') || data.photos[1] || data.photos[0];

  const maleCaption = malePhoto ? (malePhoto.caption[locale] || malePhoto.caption.en) : '';
  const femaleCaption = femalePhoto ? (femalePhoto.caption[locale] || femalePhoto.caption.en) : '';

  // Comprehensive 5-Section Spoken Audio Narrative for this Page
  const sectionsToSpeak: string[] = [
    // Section 0: Title & Classification
    `${title}. ${tag}.`,
    // Section 1: Clinical Overview Description
    `${overview}`,
    // Section 2: Male Presentation & Findings
    `${isHindi ? 'पुरुष लक्षण विवरण:' : 'Male Clinical Presentation:'} ${maleCaption ? `${maleCaption}. ` : ''}${maleDetails}`,
    // Section 3: Female Presentation & Findings
    `${isHindi ? 'महिला लक्षण विवरण:' : 'Female Clinical Presentation:'} ${femaleCaption ? `${femaleCaption}. ` : ''}${femaleDetails}`,
    // Section 4: Prescribed NACO SCM Regimen & Field Guidance
    `${regimen ? `${isHindi ? 'नाको सिंड्रोमिक उपचार:' : 'NACO Syndromic SCM Regimen:'} ${regimen}. ` : ''}${partnerProtocol ? `${isHindi ? 'पार्टनर प्रबंधन:' : 'Partner Protocol:'} ${partnerProtocol}. ` : ''}${closedSettingPearl ? `${isHindi ? 'फील्ड टिप:' : 'Field Pearl:'} ${closedSettingPearl}` : ''}`,
  ].filter((s) => s.trim().length > 0);

  return (
    <div className="w-full h-full p-2.5 sm:p-3.5 md:p-4 flex flex-col justify-between select-none overflow-hidden text-ink bg-paper">
      {/* Top Editorial Header */}
      <div className="shrink-0 border-b border-brass/40 pb-1 mb-1">
        <div className="flex items-center justify-between gap-1 mb-0.5 text-[8.5px] sm:text-[9.5px] font-mono font-bold text-ink-muted uppercase tracking-wider">
          <span className="flex items-center gap-1 truncate max-w-[65%]">
            <Sparkles className="w-3 h-3 text-coral shrink-0" />
            <span className="truncate">{tag}</span>
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-white text-[8px] sm:text-[9px] font-bold shadow-xs border border-white/30 shrink-0"
            style={{ backgroundColor: data.kitBadge.color }}
          >
            {kitBadge}
          </span>
        </div>

        {/* Fraunces Display Title with Live Audio Highlight */}
        <h2
          className={`text-sm sm:text-base md:text-lg font-black font-display text-ink-teal leading-tight tracking-tight transition-all duration-300 ${
            isThisPageNarrating && activeAudioSentenceIndex === 0
              ? 'bg-amber-200/95 text-ink-black px-2 py-0.5 rounded-lg ring-2 ring-amber-500 shadow-md scale-[1.01]'
              : ''
          }`}
        >
          {title}
        </h2>
      </div>

      {/* Main Scrollable Body with Real-Time Content Highlighting */}
      <div className="flex-1 overflow-y-auto pr-0.5 space-y-2 py-0.5">
        {/* Section 1: Overview Paragraph with Live Audio Highlight */}
        <div
          className={`border-l-3 border-brass px-2.5 py-1.5 rounded-r-xl border-y border-r border-brass/25 text-[9.5px] sm:text-[10.5px] text-ink leading-relaxed font-medium shadow-xs transition-all duration-300 ${
            isThisPageNarrating && activeAudioSentenceIndex === 1
              ? 'bg-amber-100/95 ring-2 ring-amber-500 shadow-md scale-[1.01] border-l-4 border-amber-600'
              : 'bg-paper-shadow/70'
          }`}
        >
          <p>{overview}</p>
        </div>

        {/* Section 2 & 3: Vertical Stack on Mobile (Up & Down), Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* MALE PRESENTATION CARD */}
          {malePhoto && (
            <div
              className={`bg-paper rounded-xl border overflow-hidden shadow-xs flex flex-col space-y-1.5 p-1.5 ring-1 transition-all duration-300 ${
                isThisPageNarrating && activeAudioSentenceIndex === 2
                  ? 'border-amber-500 ring-2 ring-amber-500 bg-amber-50/90 shadow-lg scale-[1.02]'
                  : 'border-brass/40 ring-black/5'
              }`}
            >
              <div
                className={`relative w-full aspect-[16/10] bg-black/10 rounded-lg overflow-hidden border transition-all ${
                  isThisPageNarrating && activeAudioSentenceIndex === 2 ? 'ring-2 ring-amber-400 border-amber-400' : 'border-brass/20'
                }`}
              >
                <div className={`absolute top-1 left-1 z-10 text-paper px-2 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider rounded-md shadow-xs flex items-center gap-1 ${
                  isThisPageNarrating && activeAudioSentenceIndex === 2 ? 'bg-amber-600 animate-pulse' : 'bg-ink-teal/95'
                }`}>
                  <span>{isHindi ? '♂ पुरुष लक्षण (Male)' : '♂ Male Presentation'}</span>
                </div>
                <Image
                  src={malePhoto.imageSrc}
                  alt={maleCaption}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className={`text-[8.5px] sm:text-[9px] font-bold leading-tight ${
                isThisPageNarrating && activeAudioSentenceIndex === 2 ? 'text-amber-950 font-extrabold' : 'text-ink'
              }`}>
                {maleCaption}
              </div>

              <div className={`p-2 rounded-lg border text-[9px] sm:text-[10px] transition-all ${
                isThisPageNarrating && activeAudioSentenceIndex === 2
                  ? 'bg-amber-100/90 border-amber-400 text-ink-black ring-1 ring-amber-400'
                  : 'bg-gradient-to-br from-paper-deep/60 to-paper-shadow/80 border-brass/30 text-ink'
              }`}>
                <span className="font-bold text-ink-teal text-[8.5px] sm:text-[9px] uppercase tracking-wider block mb-0.5">
                  {isHindi ? 'पुरुषों में मुख्य लक्षण:' : 'Male Clinical Findings:'}
                </span>
                <p className="leading-relaxed font-medium">{maleDetails}</p>
              </div>
            </div>
          )}

          {/* FEMALE PRESENTATION CARD */}
          {femalePhoto && (
            <div
              className={`bg-paper rounded-xl border overflow-hidden shadow-xs flex flex-col space-y-1.5 p-1.5 ring-1 transition-all duration-300 ${
                isThisPageNarrating && activeAudioSentenceIndex === 3
                  ? 'border-amber-500 ring-2 ring-amber-500 bg-amber-50/90 shadow-lg scale-[1.02]'
                  : 'border-brass/40 ring-black/5'
              }`}
            >
              <div
                className={`relative w-full aspect-[16/10] bg-black/10 rounded-lg overflow-hidden border transition-all ${
                  isThisPageNarrating && activeAudioSentenceIndex === 3 ? 'ring-2 ring-amber-400 border-amber-400' : 'border-brass/20'
                }`}
              >
                <div className={`absolute top-1 left-1 z-10 text-paper px-2 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider rounded-md shadow-xs flex items-center gap-1 ${
                  isThisPageNarrating && activeAudioSentenceIndex === 3 ? 'bg-coral animate-pulse' : 'bg-coral/95'
                }`}>
                  <span>{isHindi ? '♀ महिला लक्षण (Female)' : '♀ Female Presentation'}</span>
                </div>
                <Image
                  src={femalePhoto.imageSrc}
                  alt={femaleCaption}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className={`text-[8.5px] sm:text-[9px] font-bold leading-tight ${
                isThisPageNarrating && activeAudioSentenceIndex === 3 ? 'text-amber-950 font-extrabold' : 'text-ink'
              }`}>
                {femaleCaption}
              </div>

              <div className={`p-2 rounded-lg border text-[9px] sm:text-[10px] transition-all ${
                isThisPageNarrating && activeAudioSentenceIndex === 3
                  ? 'bg-amber-100/90 border-amber-400 text-ink-black ring-1 ring-amber-400'
                  : 'bg-gradient-to-br from-paper-deep/60 to-paper-shadow/80 border-brass/30 text-ink'
              }`}>
                <span className="font-bold text-coral-dark text-[8.5px] sm:text-[9px] uppercase tracking-wider block mb-0.5">
                  {isHindi ? 'महिलाओं में मुख्य लक्षण:' : 'Female Clinical Findings:'}
                </span>
                <p className="leading-relaxed font-medium">{femaleDetails}</p>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: High-Yield Field Coordinator Action Section (NACO SCM Protocol & Partner Guidelines) */}
        {(regimen || partnerProtocol || closedSettingPearl) && (
          <div
            className={`space-y-1.5 pt-1 rounded-xl transition-all duration-300 ${
              isThisPageNarrating && activeAudioSentenceIndex === 4
                ? 'p-1.5 bg-amber-100/95 ring-2 ring-amber-500 shadow-md scale-[1.01]'
                : ''
            }`}
          >
            {/* Prescribed Regimen Pill */}
            {regimen && (
              <div
                className={`border rounded-xl p-2 text-[8.5px] sm:text-[9.5px] text-emerald-950 flex items-start gap-2 shadow-xs transition-all ${
                  isThisPageNarrating && activeAudioSentenceIndex === 4
                    ? 'bg-emerald-100/90 border-emerald-500 font-bold ring-1 ring-emerald-400'
                    : 'bg-emerald-50/90 border-emerald-300'
                }`}
              >
                <Pill className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-emerald-900 block text-[8px] sm:text-[9px]">
                    {isHindi ? 'NACO सिंड्रोमिक उपचार (Prescribed SCM Regimen):' : 'NACO Syndromic SCM Regimen:'}
                  </span>
                  <span className="font-semibold">{regimen}</span>
                </div>
              </div>
            )}

            {/* Partner Tracing & Closed-Setting Pearl */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {partnerProtocol && (
                <div className="bg-blue-50/90 border border-blue-200 rounded-xl p-2 text-[8px] sm:text-[9px] text-blue-950 flex items-start gap-1.5">
                  <Users className="w-3.5 h-3.5 text-care-blue-dark shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-900 uppercase block">
                      {isHindi ? 'पार्टनर प्रबंधन:' : 'Partner Notification:'}
                    </span>
                    <span>{partnerProtocol}</span>
                  </div>
                </div>
              )}

              {closedSettingPearl && (
                <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-2 text-[8px] sm:text-[9px] text-amber-950 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900 uppercase block">
                      {isHindi ? 'जेल/OCS फील्ड टिप:' : 'Prison / OCS Field Pearl:'}
                    </span>
                    <span>{closedSettingPearl}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Editorial Footer with Sound Button & Accreditation */}
      <div className="pt-1 mt-0.5 border-t border-brass/30 flex items-center justify-between text-[8px] sm:text-[9px] text-ink-muted font-mono font-medium shrink-0">
        <div className="flex items-center gap-1 text-mineral-green-dark">
          <ShieldCheck className="w-3.5 h-3.5 text-mineral-green" />
          <span className="font-semibold">NACO SCM Protocol</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SoundButton
            sectionsToSpeak={sectionsToSpeak}
            locale={locale}
            pageNumber={pageNumber}
          />
          <span className="font-bold text-brass font-display">{pageNumber ? `Page 0${pageNumber}` : ''}</span>
        </div>
      </div>
    </div>
  );
};
