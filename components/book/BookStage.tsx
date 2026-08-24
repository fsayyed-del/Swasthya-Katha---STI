'use client';

import React, { useEffect } from 'react';
import { PublicationManifest } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { BookShell } from './BookShell';
import { useBookStore } from '@/lib/state/bookStore';

interface BookStageProps {
  manifest: PublicationManifest;
  locale: Locale;
  onTargetClick?: (targetId: string) => void;
  activeTargetId?: string;
  onLocaleChange?: (locale: Locale) => void;
}

export const BookStage: React.FC<BookStageProps> = ({
  manifest,
  locale,
  onTargetClick,
  activeTargetId,
  onLocaleChange,
}) => {
  const { currentLeafIndex, setLeafIndex, nextLeaf, prevLeaf, totalLeaves } = useBookStore();

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextLeaf();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevLeaf();
      } else if (e.key === 'Home') {
        setLeafIndex(0);
      } else if (e.key === 'End') {
        setLeafIndex(totalLeaves - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextLeaf, prevLeaf, setLeafIndex, totalLeaves]);

  return (
    <div className="flipbook-stage w-full h-[96vh] max-h-[1080px] flex items-center justify-center py-0 relative select-none">
      {/* Studio Lighting Background Glow */}
      <div className="absolute inset-0 bg-radial from-amber-100/30 via-transparent to-transparent pointer-events-none" />

      {/* 3D Physical Book Shell (Full Viewport Utilization) */}
      <BookShell
        manifest={manifest}
        locale={locale}
        onTargetClick={onTargetClick}
        activeTargetId={activeTargetId}
        onLocaleChange={onLocaleChange}
      />
    </div>
  );
};
