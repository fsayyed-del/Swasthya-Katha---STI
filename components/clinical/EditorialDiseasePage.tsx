'use client';

import React from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck } from 'lucide-react';
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
    <div className="w-full h-full p-3 sm:p-4 md:p-5 flex flex-col justify-between select-none overflow-hidden text-ink bg-paper">
      {/* Top Editorial Header */}
      <div>
        <div className="flex items-center justify-between border-b border-brass/40 pb-0.5 mb-1 text-[10px] sm:text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
          <span>{tag}</span>
          <span
            className="px-2 py-0.5 rounded-full text-white text-[9px] sm:text-[10px] font-bold shadow-sm"
            style={{ backgroundColor: data.kitBadge.color }}
          >
            {kitBadge}
          </span>
        </div>

        {/* Bold Editorial Fraunces Display Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-black font-display text-ink-teal leading-tight tracking-tight">
          {title}
        </h2>
      </div>

      {/* Main Magazine Layout Body */}
      <div className="my-auto py-1 space-y-2 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Overview Paragraph */}
        <div className="bg-paper-shadow/60 p-2 rounded-xl border border-brass/30 text-[11px] sm:text-xs text-ink leading-relaxed font-medium">
          <p>{overview}</p>
        </div>

        {/* Dual Clinical Images Grid (Male & Female side-by-side with Canonical Citations) */}
        <div className="grid grid-cols-2 gap-2">
          {data.photos.slice(0, 2).map((photo) => (
            <div
              key={photo.id}
              className="bg-paper rounded-xl border border-brass/40 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              {/* Gender Tag Banner */}
              <div className="bg-ink-teal text-paper px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>
                  {photo.gender === 'male'
                    ? isHindi
                      ? 'पुरुष लक्षण (Male)'
                      : 'Male Presentation'
                    : photo.gender === 'female'
                    ? isHindi
                      ? 'महिला लक्षण (Female)'
                      : 'Female Presentation'
                    : 'Clinical Finding'}
                </span>
                <span className="text-brass-light font-mono text-[8px]">CDC/NACO</span>
              </div>

              {/* High Definition Image */}
              <div className="relative w-full aspect-[4/3] bg-black/10">
                <Image
                  src={photo.imageSrc}
                  alt={photo.caption[locale] || photo.caption.en}
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-cover"
                />
              </div>

              {/* Caption & Reference Citation */}
              <div className="p-1.5 bg-paper text-[9px] sm:text-[10px] text-ink leading-tight font-medium border-t border-brass/20">
                <p className="line-clamp-2">{photo.caption[locale] || photo.caption.en}</p>
                <div className="text-[8px] text-ink-muted mt-0.5 font-mono italic line-clamp-1">
                  {photo.citation}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Presentation Details (Male vs Female Columns) */}
        <div className="grid grid-cols-2 gap-1.5 text-[10px] sm:text-[11px]">
          <div className="bg-paper-deep/50 p-1.5 sm:p-2 rounded-lg border border-brass/20 space-y-0.5">
            <span className="font-bold text-ink-teal text-[9px] sm:text-[10px] uppercase block">
              {isHindi ? 'पुरुषों में मुख्य लक्षण' : 'Male Findings'}:
            </span>
            <p className="text-ink-muted leading-tight line-clamp-2">{maleDetails}</p>
          </div>

          <div className="bg-paper-deep/50 p-1.5 sm:p-2 rounded-lg border border-brass/20 space-y-0.5">
            <span className="font-bold text-ink-teal text-[9px] sm:text-[10px] uppercase block">
              {isHindi ? 'महिलाओं में मुख्य लक्षण' : 'Female Findings'}:
            </span>
            <p className="text-ink-muted leading-tight line-clamp-2">{femaleDetails}</p>
          </div>
        </div>
      </div>

      {/* Editorial Footer with Sound Button */}
      <div className="pt-1 border-t border-brass/30 flex items-center justify-between text-[9px] sm:text-[10px] text-ink-muted font-mono font-medium shrink-0">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-mineral-green" />
          <span>Suraksha Clinic Syndromic Standard</span>
        </div>
        <div className="flex items-center gap-3">
          <SoundButton textToSpeak={audioScriptText} locale={locale} pageNumber={pageNumber} />
          <span className="font-bold text-brass">{pageNumber ? `Page 0${pageNumber}` : ''}</span>
        </div>
      </div>
    </div>
  );
};
