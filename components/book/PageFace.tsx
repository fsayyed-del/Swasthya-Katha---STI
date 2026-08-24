'use client';

import React from 'react';
import { PageContent } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { CoverPage } from '../publication/CoverPage';
import { BackCoverPage } from '../publication/BackCoverPage';
import { LivingNetworkScene } from '../visuals/scenes/LivingNetworkScene';
import { HiddenSignsScene } from '../visuals/scenes/HiddenSignsScene';
import { ClinicJourneyScene } from '../visuals/scenes/ClinicJourneyScene';
import { ProtectionOrbitScene } from '../visuals/scenes/ProtectionOrbitScene';
import { NacoCabinetSpread } from '../publication/NacoCabinetSpread';
import { EditorialDiseasePage } from '../clinical/EditorialDiseasePage';
import { EDITORIAL_DISEASE_DATA } from '@/content/clinical/editorial-disease-data';

interface PageFaceProps {
  content: PageContent;
  locale: Locale;
  isBackFace?: boolean;
  onTargetClick?: (targetId: string) => void;
  activeTargetId?: string;
  onLocaleChange?: (locale: Locale) => void;
}

export const PageFace: React.FC<PageFaceProps> = ({
  content,
  locale,
  isBackFace = false,
  onTargetClick,
  activeTargetId,
  onLocaleChange,
}) => {
  const heading = content.heading[locale] || content.heading.en;
  const eyebrow = content.eyebrow?.[locale] || content.eyebrow?.en;
  const subheading = content.subheading?.[locale] || content.subheading?.en;
  const keyMessage = content.keyMessage?.[locale] || content.keyMessage?.en;
  const bodyText = content.bodyText[locale] || content.bodyText.en || [];

  // Special Cover Renderers
  if (content.sceneType === 'cover') {
    return <CoverPage content={content} locale={locale} onLocaleChange={onLocaleChange} />;
  }
  if (content.sceneType === 'back-cover') {
    return <BackCoverPage content={content} locale={locale} />;
  }

  // Clinical Disease Editorial Spreads (with Male & Female photos displayed openly)
  if (
    content.sceneType &&
    EDITORIAL_DISEASE_DATA[content.sceneType]
  ) {
    return (
      <div className={`page-face ${isBackFace ? 'page-face-back' : 'page-face-front'} relative overflow-y-auto`}>
        {isBackFace ? <div className="spine-crease-left" /> : <div className="spine-crease-right" />}
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA[content.sceneType]}
          locale={locale}
          pageNumber={content.pageNumber || undefined}
        />
      </div>
    );
  }

  // Interactive & Realistic SVG Demonstration Scenes
  const renderScene = () => {
    if (content.sceneType === 'sti-network') {
      return (
        <LivingNetworkScene
          locale={locale}
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
        />
      );
    }
    if (content.sceneType === 'hidden-signs') {
      return (
        <HiddenSignsScene
          locale={locale}
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
        />
      );
    }
    if (content.sceneType === 'clinic-journey') {
      return (
        <ClinicJourneyScene
          locale={locale}
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
        />
      );
    }
    if (content.sceneType === 'suraksha-intro') {
      return (
        <ProtectionOrbitScene
          locale={locale}
          activeTargetId={activeTargetId}
          onTargetClick={onTargetClick}
        />
      );
    }
    if (content.sceneType === 'naco-cabinet') {
      return <NacoCabinetSpread locale={locale} />;
    }
    return null;
  };

  return (
    <div
      className={`page-face ${isBackFace ? 'page-face-back' : 'page-face-front'} p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between select-none relative overflow-y-auto`}
    >
      {/* Spine Crease Shading */}
      {isBackFace ? <div className="spine-crease-left" /> : <div className="spine-crease-right" />}

      {/* Top Header Eyebrow */}
      <div>
        <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-border/80 text-xs">
          {eyebrow && (
            <span className="font-bold text-[10px] sm:text-xs uppercase tracking-widest text-teal font-display">
              {eyebrow}
            </span>
          )}
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-ink-muted ml-auto tracking-wider">
            Swasthya Katha
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-base sm:text-lg lg:text-xl font-black font-display text-ink leading-tight">
          {heading}
        </h2>

        {subheading && (
          <p className="text-[11px] sm:text-xs font-medium text-ink-muted mt-0.5 italic leading-snug">
            "{subheading}"
          </p>
        )}
      </div>

      {/* Middle Content: Key Message, Text & Visuals */}
      <div className="my-auto py-1 space-y-2">
        {keyMessage && (
          <div className="bg-mint/40 p-2 sm:p-2.5 rounded-xl border border-mint-dark/30 shadow-sm">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-teal-dark">
              {locale === 'hi' ? 'मुख्य संदेश' : 'Key Message'}:
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-ink mt-0.5 leading-relaxed">
              {keyMessage}
            </p>
          </div>
        )}

        {/* Body Paragraphs */}
        {!content.sceneType && bodyText.length > 0 && (
          <div className="space-y-1.5 text-xs text-ink-muted leading-relaxed">
            {bodyText.map((p, idx) => (
              <p key={idx} className="bg-paper-deep/30 p-2 rounded-lg border border-border/40">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Render Authoritative Realistic SVG Scene */}
        {renderScene()}
      </div>

      {/* Bottom Footer Page Counter */}
      <div className="pt-1 border-t border-border/80 flex items-center justify-between text-[10px] text-ink-muted font-mono font-medium">
        {isBackFace ? (
          <>
            <span>{content.pageNumber ? `Page 0${content.pageNumber}` : ''}</span>
            <span className="text-[9px] opacity-70">← Drag to turn backward</span>
          </>
        ) : (
          <>
            <span className="text-[9px] opacity-70">Drag to turn forward →</span>
            <span>{content.pageNumber ? `Page 0${content.pageNumber}` : ''}</span>
          </>
        )}
      </div>
    </div>
  );
};
