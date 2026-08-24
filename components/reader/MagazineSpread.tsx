'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Lesson, Locale } from '@/src/domain/content/schema';
import { StiNetworkSvgScene } from '../scenes/StiNetworkSvgScene';
import { HiddenSignsSvgScene } from '../scenes/HiddenSignsSvgScene';
import { ClinicJourneySvgScene } from '../scenes/ClinicJourneySvgScene';
import { NacoKitSpread } from '../scenes/NacoKitSpread';

interface MagazineSpreadProps {
  lesson: Lesson;
  locale: Locale;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
  highlightedWordIdx?: number;
}

export const MagazineSpread: React.FC<MagazineSpreadProps> = ({
  lesson,
  locale,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  activeTargetId,
  onTargetClick,
  highlightedWordIdx,
}) => {
  const isFinalNacoSpread = lesson.id === 'lesson-4-naco-kits-toolkit';
  const title = lesson.title[locale] || lesson.title.en || '';
  const subtitle = lesson.subtitle?.[locale] || lesson.subtitle?.en;
  const keyMessage = lesson.keyMessage[locale] || lesson.keyMessage.en || '';

  // Render appropriate interactive scene based on lesson ID
  const renderScene = () => {
    if (lesson.id === 'lesson-1-what-is-an-sti') {
      return (
        <StiNetworkSvgScene
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
          locale={locale}
        />
      );
    }
    if (lesson.id === 'lesson-2-hidden-signs') {
      return (
        <HiddenSignsSvgScene
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
          locale={locale}
        />
      );
    }
    if (lesson.id === 'lesson-3-testing-journey') {
      return (
        <ClinicJourneySvgScene
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
          locale={locale}
        />
      );
    }
    if (isFinalNacoSpread) {
      return <NacoKitSpread locale={locale} />;
    }
    return null;
  };

  return (
    <div className="w-full relative select-none">
      {/* 3D Magazine Spread Container */}
      <div className="bg-paper-pure rounded-3xl border border-border shadow-page overflow-hidden relative min-h-[580px] flex flex-col justify-between">
        {/* Subtle Central Spine Crease (Desktop view) */}
        <div className="hidden lg:block absolute inset-y-0 left-1/2 w-8 -ml-4 bg-gradient-to-r from-black/5 via-black/10 to-transparent pointer-events-none z-10" />

        {/* Spread Content */}
        <div className="p-6 sm:p-8 md:p-10 flex-1 flex flex-col justify-between">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80 text-xs">
            <div className="flex items-center gap-2 text-teal font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Swasthya Katha • Edition 2026</span>
            </div>
            <div className="px-3 py-1 bg-paper-deep rounded-full font-bold text-ink-muted text-[11px] border border-border">
              {locale === 'hi' ? `पृष्ठ ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
            </div>
          </div>

          {/* If final spread (NACO Kits Explorer), render full-width toolkit spread */}
          {isFinalNacoSpread ? (
            <div className="flex-1 py-2">
              <NacoKitSpread locale={locale} />
            </div>
          ) : (
            /* Standard Dual-Column Editorial Spread on Desktop, Single Column on Mobile */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
              {/* Left Editorial Page: Title, Subtitle, Key Plain-Language Message */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-mint text-teal-dark rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    {locale === 'hi' ? 'महत्वपूर्ण सबक' : 'Health Education'}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-ink leading-tight">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-sm font-medium text-ink-muted mt-2 italic">
                      "{subtitle}"
                    </p>
                  )}
                </div>

                {/* Key Message Card */}
                <div className="bg-paper-deep/80 p-4 rounded-2xl border-l-4 border-teal shadow-sm space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-teal-dark">
                    {locale === 'hi' ? 'मुख्य संदेश (Key Takeaway)' : 'Key Message'}:
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed font-medium text-ink">
                    {keyMessage}
                  </p>
                </div>

                {/* Lesson Blocks Text */}
                <div className="space-y-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {lesson.blocks
                    .filter((b) => b.type === 'text')
                    .map((block) => (
                      <p key={block.id} className="bg-paper/50 p-2.5 rounded-xl border border-border/50">
                        {block.content[locale] || block.content.en}
                      </p>
                    ))}
                </div>
              </div>

              {/* Right Editorial Page: Interactive Visual Scene */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                {renderScene()}
              </div>
            </div>
          )}

          {/* Spread Bottom Navigation Bar */}
          <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
            <button
              onClick={onPrevPage}
              disabled={currentPage <= 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage <= 1
                  ? 'opacity-30 cursor-not-allowed bg-paper-deep text-ink-muted'
                  : 'bg-paper-deep hover:bg-paper hover:shadow-md text-ink border border-border'
              }`}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{locale === 'hi' ? 'पिछला पृष्ठ' : 'Previous'}</span>
            </button>

            {/* Page Dots Indicator */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPage === idx + 1 ? 'w-6 bg-teal' : 'w-2 bg-border'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage >= totalPages
                  ? 'opacity-30 cursor-not-allowed bg-paper-deep text-ink-muted'
                  : 'bg-teal text-white hover:bg-teal-dark shadow-sm'
              }`}
              aria-label="Next Page"
            >
              <span>{locale === 'hi' ? 'अगला पृष्ठ' : 'Next Page'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
