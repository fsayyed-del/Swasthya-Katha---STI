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
    <div className="w-full h-full p-2.5 sm:p-3.5 md:p-4 flex flex-col justify-between select-none overflow-hidden text-ink bg-paper">
      {/* Top Editorial Header */}
      <div className="shrink-0">
        <div className="flex items-center justify-between border-b border-brass/40 pb-0.5 mb-1 text-[9px] sm:text-[10px] font-mono font-bold text-ink-muted uppercase tracking-wider">
          <span>{tag}</span>
          <span
            className="px-2 py-0.5 rounded-full text-white text-[8.5px] sm:text-[9.5px] font-bold shadow-sm"
            style={{ backgroundColor: data.kitBadge.color }}
          >
            {kitBadge}
          </span>
        </div>

        {/* Fraunces Display Title */}
        <h2 className="text-base sm:text-lg md:text-xl font-black font-display text-ink-teal leading-tight tracking-tight">
          {title}
        </h2>
      </div>

      {/* Main Magazine Layout Body */}
      <div className="py-1 space-y-1.5 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Overview Paragraph */}
        <div className="bg-paper-shadow/60 px-2 py-1 rounded-lg border border-brass/30 text-[10px] sm:text-[11px] text-ink leading-relaxed font-medium shrink-0">
          <p className="line-clamp-2">{overview}</p>
        </div>

        {/* Dual Clinical Images Grid (Compact Aspect Ratio to prevent bottom overflow) */}
        <div className="grid grid-cols-2 gap-1.5 shrink-0">
          {data.photos.slice(0, 2).map((photo) => (
            <div
              key={photo.id}
              className="bg-paper rounded-lg border border-brass/40 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              {/* Gender Tag Banner */}
              <div className="bg-ink-teal text-paper px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center justify-between">
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
                <span className="text-brass-light font-mono text-[7.5px]">CDC/NACO</span>
              </div>

              {/* Responsive Compact Image */}
              <div className="relative w-full aspect-[16/10] bg-black/10">
                <Image
                  src={photo.imageSrc}
                  alt={photo.caption[locale] || photo.caption.en}
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
                  className="object-cover"
                />
              </div>

              {/* Caption & Reference Citation */}
              <div className="px-1.5 py-1 bg-paper text-[8.5px] sm:text-[9px] text-ink leading-tight font-medium border-t border-brass/20">
                <p className="line-clamp-1 font-semibold">{photo.caption[locale] || photo.caption.en}</p>
                <div className="text-[7.5px] text-ink-muted mt-0.5 font-mono italic line-clamp-1">
                  {photo.citation}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Presentation Details (Male vs Female Columns with generous room) */}
        <div className="grid grid-cols-2 gap-1.5 text-[9.5px] sm:text-[10.5px] shrink-0">
          <div className="bg-paper-deep/60 p-1.5 sm:p-2 rounded-lg border border-brass/25 space-y-0.5">
            <span className="font-bold text-ink-teal text-[8.5px] sm:text-[9.5px] uppercase block tracking-wider">
              {isHindi ? 'पुरुषों में मुख्य लक्षण' : 'Male Findings'}:
            </span>
            <p className="text-ink-muted leading-tight line-clamp-3">{maleDetails}</p>
          </div>

          <div className="bg-paper-deep/60 p-1.5 sm:p-2 rounded-lg border border-brass/25 space-y-0.5">
            <span className="font-bold text-ink-teal text-[8.5px] sm:text-[9.5px] uppercase block tracking-wider">
              {isHindi ? 'महिलाओं में मुख्य लक्षण' : 'Female Findings'}:
            </span>
            <p className="text-ink-muted leading-tight line-clamp-3">{femaleDetails}</p>
          </div>
        </div>
      </div>

      {/* Editorial Footer with Sound Button */}
      <div className="pt-1 mt-0.5 border-t border-brass/30 flex items-center justify-between text-[8.5px] sm:text-[9.5px] text-ink-muted font-mono font-medium shrink-0">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-mineral-green" />
          <span>Suraksha Clinic Syndromic Standard</span>
        </div>
        <div className="flex items-center gap-2">
          <SoundButton textToSpeak={audioScriptText} locale={locale} pageNumber={pageNumber} />
          <span className="font-bold text-brass">{pageNumber ? `Page 0${pageNumber}` : ''}</span>
        </div>
      </div>
    </div>
  );
};
