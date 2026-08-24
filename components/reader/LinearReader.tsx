'use client';

import React from 'react';
import { CANONICAL_PUBLICATION_MANIFEST } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { StiNetworkSvgScene } from '../scenes/StiNetworkSvgScene';
import { HiddenSignsSvgScene } from '../scenes/HiddenSignsSvgScene';
import { ClinicJourneySvgScene } from '../scenes/ClinicJourneySvgScene';
import { NacoCabinetSpread } from '../publication/NacoCabinetSpread';
import { SurakshaHelplineCard } from '../ui/SurakshaHelplineCard';
import { BookOpen, CheckCircle } from 'lucide-react';

interface LinearReaderProps {
  lessons?: any[];
  locale: Locale;
}

export const LinearReader: React.FC<LinearReaderProps> = ({ locale }) => {
  const manifest = CANONICAL_PUBLICATION_MANIFEST;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-4 animate-fade-in text-[#10353A]">
      {/* Accessibility Header Notice */}
      <div className="bg-white p-5 rounded-2xl border border-[#D8CEB8] shadow-sm flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#D6E8E5] flex items-center justify-center text-[#10353A] shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-base text-[#10353A]">
            {locale === 'hi' ? 'लीनियर (सुलभ) पठन मोड' : 'Linear Accessible Reading Mode'}
          </h2>
          <p className="text-xs text-[#4A6367] mt-1 leading-relaxed">
            {locale === 'hi'
              ? 'यह मोड बिना किसी 3D एनीमेशन के सभी 14 पृष्ठों को सीधा, सरल और क्रमबद्ध रूप में प्रस्तुत करता है।'
              : 'All 14 pages and clinical diagrams presented sequentially for screen readers and low-bandwidth accessibility.'}
          </p>
        </div>
      </div>

      {/* Sequential Leaves (16 Faces) */}
      {manifest.leaves.map((leaf) => {
        const faces = [leaf.front, leaf.back];

        return (
          <div key={leaf.id} className="space-y-4">
            {faces.map((face) => {
              if (face.sceneType === 'cover' || face.sceneType === 'back-cover') {
                return null; // Skip cover frames in linear text view
              }

              const heading = face.heading[locale] || face.heading.en;
              const eyebrow = face.eyebrow?.[locale] || face.eyebrow?.en;
              const keyMessage = face.keyMessage?.[locale] || face.keyMessage?.en;
              const bodyText = face.bodyText[locale] || face.bodyText.en || [];

              return (
                <article
                  key={face.id}
                  id={face.id}
                  className="bg-white rounded-2xl border border-[#D8CEB8] p-6 sm:p-8 shadow-sm space-y-4"
                >
                  {/* Eyebrow & Page Number */}
                  <div className="flex items-center justify-between border-b border-[#D8CEB8]/70 pb-2">
                    {eyebrow && (
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#10353A]">
                        {eyebrow}
                      </span>
                    )}
                    {face.pageNumber && (
                      <span className="text-xs font-mono font-bold text-[#4A6367]">
                        Page {face.pageNumber}
                      </span>
                    )}
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#10353A]">
                    {heading}
                  </h3>

                  {/* Key Message */}
                  {keyMessage && (
                    <div className="bg-[#D6E8E5]/50 p-3.5 rounded-xl border border-teal-600/20 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#10353A] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm font-medium text-[#10353A] leading-relaxed">
                        {keyMessage}
                      </p>
                    </div>
                  )}

                  {/* Body Text */}
                  <div className="space-y-2 text-xs sm:text-sm text-[#4A6367] leading-relaxed">
                    {bodyText.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Visual Scene Integration */}
                  {face.sceneType === 'sti-network' && <StiNetworkSvgScene locale={locale} />}
                  {face.sceneType === 'hidden-signs' && <HiddenSignsSvgScene locale={locale} />}
                  {face.sceneType === 'clinic-journey' && <ClinicJourneySvgScene locale={locale} />}
                  {face.sceneType === 'naco-cabinet' && <NacoCabinetSpread locale={locale} />}
                </article>
              );
            })}
          </div>
        );
      })}

      {/* Suraksha Care & Referral Footer */}
      <SurakshaHelplineCard locale={locale} />
    </div>
  );
};
