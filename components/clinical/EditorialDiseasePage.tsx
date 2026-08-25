'use client';

import React from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, Stethoscope, Sparkles } from 'lucide-react';
import { SoundButton } from '../portrait/SoundButton';

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

  const audioScriptText = `${title}. ${overview} ${isHindi ? 'पुरुषों में लक्षण:' : 'Male Findings:'} ${maleDetails} ${isHindi ? 'महिलाओं में लक्षण:' : 'Female Findings:'} ${femaleDetails}`;

  const malePhoto = data.photos.find((p) => p.gender === 'male') || data.photos[0];
  const femalePhoto = data.photos.find((p) => p.gender === 'female') || data.photos[1] || data.photos[0];

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

        {/* Fraunces Display Title */}
        <h2 className="text-sm sm:text-base md:text-lg font-black font-display text-ink-teal leading-tight tracking-tight">
          {title}
        </h2>
      </div>

      {/* Main Magazine Layout Body (Scrollable on mobile so NO text is ever truncated) */}
      <div className="flex-1 overflow-y-auto pr-0.5 space-y-2 py-0.5">
        {/* Overview Paragraph with Left Gold Border (Full Text - No Line Clamp) */}
        <div className="bg-paper-shadow/70 border-l-3 border-brass px-2.5 py-1.5 rounded-r-xl border-y border-r border-brass/25 text-[10px] sm:text-[11px] text-ink leading-relaxed font-medium shrink-0 shadow-xs">
          <p>{overview}</p>
        </div>

        {/* Vertical Stack on Mobile (Up and Down), Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* MALE PRESENTATION SECTION (Top on Mobile) */}
          {malePhoto && (
            <div className="bg-paper rounded-xl border border-brass/40 overflow-hidden shadow-xs flex flex-col space-y-1.5 p-1.5 ring-1 ring-black/5">
              {/* Male Photo Frame */}
              <div className="relative w-full aspect-[16/10] bg-black/10 rounded-lg overflow-hidden border border-brass/20">
                <div className="absolute top-1 left-1 z-10 bg-ink-teal/95 text-paper px-2 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider rounded-md shadow-xs flex items-center gap-1">
                  <span>{isHindi ? '♂ पुरुष लक्षण (Male)' : '♂ Male Presentation'}</span>
                </div>
                <Image
                  src={malePhoto.imageSrc}
                  alt={malePhoto.caption[locale] || malePhoto.caption.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="text-[8.5px] sm:text-[9px] text-ink font-bold leading-tight">
                {malePhoto.caption[locale] || malePhoto.caption.en}
              </div>

              {/* Male Clinical Findings (Full Text - No Line Clamp) */}
              <div className="bg-gradient-to-br from-paper-deep/60 to-paper-shadow/80 p-2 rounded-lg border border-brass/30 text-[9px] sm:text-[10px]">
                <span className="font-bold text-ink-teal text-[8.5px] sm:text-[9px] uppercase tracking-wider block mb-0.5">
                  {isHindi ? 'पुरुषों में लक्षण:' : 'Male Findings:'}
                </span>
                <p className="text-ink leading-relaxed font-medium">{maleDetails}</p>
              </div>
            </div>
          )}

          {/* FEMALE PRESENTATION SECTION (Down on Mobile) */}
          {femalePhoto && (
            <div className="bg-paper rounded-xl border border-brass/40 overflow-hidden shadow-xs flex flex-col space-y-1.5 p-1.5 ring-1 ring-black/5">
              {/* Female Photo Frame */}
              <div className="relative w-full aspect-[16/10] bg-black/10 rounded-lg overflow-hidden border border-brass/20">
                <div className="absolute top-1 left-1 z-10 bg-coral/95 text-paper px-2 py-0.5 text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider rounded-md shadow-xs flex items-center gap-1">
                  <span>{isHindi ? '♀ महिला लक्षण (Female)' : '♀ Female Presentation'}</span>
                </div>
                <Image
                  src={femalePhoto.imageSrc}
                  alt={femalePhoto.caption[locale] || femalePhoto.caption.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="text-[8.5px] sm:text-[9px] text-ink font-bold leading-tight">
                {femalePhoto.caption[locale] || femalePhoto.caption.en}
              </div>

              {/* Female Clinical Findings (Full Text - No Line Clamp) */}
              <div className="bg-gradient-to-br from-paper-deep/60 to-paper-shadow/80 p-2 rounded-lg border border-brass/30 text-[9px] sm:text-[10px]">
                <span className="font-bold text-coral-dark text-[8.5px] sm:text-[9px] uppercase tracking-wider block mb-0.5">
                  {isHindi ? 'महिलाओं में लक्षण:' : 'Female Findings:'}
                </span>
                <p className="text-ink leading-relaxed font-medium">{femaleDetails}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editorial Footer with Sound Button & Accreditation */}
      <div className="pt-1 mt-1 border-t border-brass/30 flex items-center justify-between text-[8px] sm:text-[9px] text-ink-muted font-mono font-medium shrink-0">
        <div className="flex items-center gap-1 text-mineral-green-dark">
          <ShieldCheck className="w-3.5 h-3.5 text-mineral-green" />
          <span className="font-semibold">NACO Syndromic Protocol</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SoundButton textToSpeak={audioScriptText} locale={locale} pageNumber={pageNumber} />
          <span className="font-bold text-brass font-display">{pageNumber ? `Page 0${pageNumber}` : ''}</span>
        </div>
      </div>
    </div>
  );
};
