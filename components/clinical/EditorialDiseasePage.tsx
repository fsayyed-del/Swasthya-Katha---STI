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

  return (
    <div className="w-full h-full p-2 sm:p-3 md:p-4 flex flex-col justify-between select-none overflow-hidden text-ink bg-paper">
      {/* Top Editorial Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between gap-1 border-b border-brass/40 pb-0.5 mb-0.5 text-[8px] sm:text-[9px] font-mono font-bold text-ink-muted uppercase tracking-wider">
          <span className="flex items-center gap-1 truncate max-w-[60%]">
            <Sparkles className="w-2.5 h-2.5 text-coral shrink-0" />
            <span className="truncate">{tag}</span>
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-white text-[8px] sm:text-[9px] font-bold shadow-xs border border-white/30 shrink-0"
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

      {/* Main Magazine Layout Body */}
      <div className="py-0.5 space-y-1 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Overview Paragraph with Left Gold Border */}
        <div className="bg-paper-shadow/60 border-l-2 border-brass px-2 py-0.5 rounded-r-lg border-y border-r border-brass/25 text-[9px] sm:text-[10.5px] text-ink leading-relaxed font-medium shrink-0">
          <p className="line-clamp-2">{overview}</p>
        </div>

        {/* Dual Clinical Images Grid with Gallery Frames */}
        <div className="grid grid-cols-2 gap-1.5 shrink-0">
          {data.photos.slice(0, 2).map((photo) => (
            <div
              key={photo.id}
              className="bg-paper rounded-xl border border-brass/40 overflow-hidden shadow-xs flex flex-col justify-between ring-1 ring-black/5"
            >
              {/* Gender Tag Banner */}
              <div className="bg-gradient-to-r from-ink-teal to-[#1B4D50] text-paper px-1.5 py-0.5 text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>
                  {photo.gender === 'male'
                    ? isHindi
                      ? '♂ पुरुष लक्षण'
                      : '♂ Male Presentation'
                    : photo.gender === 'female'
                    ? isHindi
                      ? '♀ महिला लक्षण'
                      : '♀ Female Presentation'
                    : 'Clinical Finding'}
                </span>
                <span className="text-amber-200 font-mono text-[7px]">Atlas</span>
              </div>

              {/* Responsive Image Frame */}
              <div className="relative w-full aspect-[16/9] bg-black/10">
                <Image
                  src={photo.imageSrc}
                  alt={photo.caption[locale] || photo.caption.en}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption & Reference Citation */}
              <div className="px-1.5 py-0.5 bg-paper text-[8px] sm:text-[8.5px] text-ink leading-tight font-medium border-t border-brass/20">
                <p className="line-clamp-1 font-bold text-ink-teal">{photo.caption[locale] || photo.caption.en}</p>
                <div className="text-[7px] text-ink-muted font-mono italic line-clamp-1">
                  {photo.citation}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Presentation Details (Male vs Female Columns) */}
        <div className="grid grid-cols-2 gap-1.5 text-[8.5px] sm:text-[9.5px] shrink-0">
          <div className="bg-gradient-to-br from-paper-deep/60 to-paper-shadow/80 p-1.5 rounded-xl border border-brass/30 space-y-0.5 shadow-xs">
            <span className="font-bold text-ink-teal text-[8px] sm:text-[9px] uppercase block tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-teal shrink-0" />
              <span>{isHindi ? 'पुरुषों में लक्षण' : 'Male Findings'}:</span>
            </span>
            <p className="text-ink-muted leading-tight line-clamp-2 sm:line-clamp-3">{maleDetails}</p>
          </div>

          <div className="bg-gradient-to-br from-paper-deep/60 to-paper-shadow/80 p-1.5 rounded-xl border border-brass/30 space-y-0.5 shadow-xs">
            <span className="font-bold text-coral-dark text-[8px] sm:text-[9px] uppercase block tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
              <span>{isHindi ? 'महिलाओं में लक्षण' : 'Female Findings'}:</span>
            </span>
            <p className="text-ink-muted leading-tight line-clamp-2 sm:line-clamp-3">{femaleDetails}</p>
          </div>
        </div>
      </div>

      {/* Editorial Footer with Sound Button & Accreditation */}
      <div className="pt-0.5 border-t border-brass/30 flex items-center justify-between text-[8px] sm:text-[9px] text-ink-muted font-mono font-medium shrink-0">
        <div className="flex items-center gap-1 text-mineral-green-dark">
          <ShieldCheck className="w-3 h-3 text-mineral-green" />
          <span className="font-semibold">NACO SCM Protocol</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SoundButton textToSpeak={audioScriptText} locale={locale} pageNumber={pageNumber} />
          <span className="font-bold text-brass font-display">{pageNumber ? `Page 0${pageNumber}` : ''}</span>
        </div>
      </div>
    </div>
  );
};
