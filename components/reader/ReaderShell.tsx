'use client';

import React, { useState, useEffect } from 'react';
import { Publication, Lesson, Locale } from '@/src/domain/content/schema';
import { LocaleSwitcher } from '../ui/LocaleSwitcher';
import { QuickExitButton } from '../ui/QuickExitButton';
import { ReadingSettingsModal, ReadingSettings } from '../ui/ReadingSettingsModal';
import { MagazineSpread } from './MagazineSpread';
import { LinearReader } from './LinearReader';
import { FacilitatorReader } from './FacilitatorReader';
import { NarrationBar } from '../narration/NarrationBar';
import { BookOpen, Settings, List, Layers, ShieldCheck, Heart } from 'lucide-react';

interface ReaderShellProps {
  publication: Publication;
  initialLocale?: Locale;
}

export const ReaderShell: React.FC<ReaderShellProps> = ({
  publication,
  initialLocale = 'en',
}) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState<string | undefined>(undefined);
  const [highlightedWordIdx, setHighlightedWordIdx] = useState<number | undefined>(undefined);

  const [settings, setSettings] = useState<ReadingSettings>({
    textScale: 'normal',
    contrastMode: 'paper',
    motionProfile: 'full',
    readerMode: 'magazine',
  });

  // Flatten all lessons from chapters
  const allLessons: Lesson[] = publication.chapters.flatMap((ch) => ch.lessons);
  const totalPages = allLessons.length;
  const currentLesson = allLessons[currentPage - 1] || allLessons[0];

  // Text content for narration
  const activeNarrationText = `${currentLesson.title[locale] || currentLesson.title.en}. ${
    currentLesson.subtitle?.[locale] || currentLesson.subtitle?.en || ''
  }. ${currentLesson.keyMessage[locale] || currentLesson.keyMessage.en}. ${currentLesson.blocks
    .map((b) => b.content[locale] || b.content.en)
    .join(' ')}`;

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (settings.readerMode !== 'magazine') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'Home') {
        setCurrentPage(1);
      } else if (e.key === 'End') {
        setCurrentPage(totalPages);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, settings.readerMode]);

  // Apply visual text-scale and contrast classes
  const getContainerClasses = () => {
    let classes = 'min-h-screen transition-colors duration-300 font-body ';
    if (settings.contrastMode === 'dark') {
      classes += 'bg-ink text-paper-pure ';
    } else if (settings.contrastMode === 'high-contrast') {
      classes += 'bg-white text-black font-semibold ';
    } else {
      classes += 'bg-paper text-ink ';
    }

    if (settings.textScale === 'large') {
      classes += 'text-lg ';
    } else if (settings.textScale === 'xlarge') {
      classes += 'text-xl ';
    } else {
      classes += 'text-base ';
    }
    return classes;
  };

  return (
    <div className={getContainerClasses()}>
      {/* Top Header App Bar */}
      <header className="sticky top-0 z-40 bg-paper-pure/90 backdrop-blur-md border-b border-border/80 px-4 py-2.5 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Magazine Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal text-white flex items-center justify-center font-display font-bold text-xl shadow-md">
              SK
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-display font-extrabold text-base sm:text-lg text-ink tracking-tight">
                <span>{publication.title[locale] || publication.title.en}</span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest bg-mint text-teal-dark px-2 py-0.5 rounded-full border border-mint-dark/30">
                  NACO Edition
                </span>
              </div>
              <div className="text-[11px] text-ink-muted hidden md:block">
                {publication.tagline[locale] || publication.tagline.en}
              </div>
            </div>
          </div>

          {/* Controls: Mode Switcher, Language, Settings, Quick Exit */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Mode Selector Dropdown */}
            <div className="hidden sm:flex items-center bg-paper-deep rounded-full p-1 border border-border text-xs font-semibold">
              <button
                onClick={() => setSettings({ ...settings, readerMode: 'magazine' })}
                className={`px-3 py-1 rounded-full transition-all ${
                  settings.readerMode === 'magazine'
                    ? 'bg-teal text-white shadow-sm font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                📖 Magazine
              </button>
              <button
                onClick={() => setSettings({ ...settings, readerMode: 'linear' })}
                className={`px-3 py-1 rounded-full transition-all ${
                  settings.readerMode === 'linear'
                    ? 'bg-teal text-white shadow-sm font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                📄 Linear
              </button>
              <button
                onClick={() => setSettings({ ...settings, readerMode: 'facilitator' })}
                className={`px-3 py-1 rounded-full transition-all ${
                  settings.readerMode === 'facilitator'
                    ? 'bg-amber-500 text-ink shadow-sm font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                🩺 Facilitator
              </button>
            </div>

            {/* Language Switcher */}
            <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />

            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full bg-paper-deep hover:bg-border text-ink transition-colors border border-border"
              title="Reader Settings"
              aria-label="Open Reader Settings"
            >
              <Settings className="w-4 h-4 text-teal" />
            </button>

            {/* Quick Exit Button */}
            <QuickExitButton locale={locale} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-32">
        {settings.readerMode === 'magazine' && (
          <MagazineSpread
            lesson={currentLesson}
            locale={locale}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            onPrevPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            activeTargetId={activeTargetId}
            onTargetClick={setActiveTargetId}
            highlightedWordIdx={highlightedWordIdx}
          />
        )}

        {settings.readerMode === 'linear' && (
          <LinearReader lessons={allLessons} locale={locale} />
        )}

        {settings.readerMode === 'facilitator' && (
          <FacilitatorReader lessons={allLessons} locale={locale} />
        )}
      </main>

      {/* Sticky Bottom Narration Audio Player */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-paper/95 backdrop-blur-md border-t border-border/80 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <NarrationBar
            textToSpeak={activeNarrationText}
            title={currentLesson.title[locale] || currentLesson.title.en || 'Lesson'}
            locale={locale}
            onActiveTargetChange={setActiveTargetId}
            onWordHighlight={setHighlightedWordIdx}
          />
        </div>
      </div>

      {/* Settings Modal */}
      <ReadingSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
        locale={locale}
      />
    </div>
  );
};
