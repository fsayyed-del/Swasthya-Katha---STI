'use client';

import React, { useEffect, useRef } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';
import { Page00Cover } from './pages/Page00Cover';
import { Page01Gestures } from './pages/Page01Gestures';
import { Page02TOC } from './pages/Page02TOC';
import { Page03BodyShield } from './pages/Page03BodyShield';
import { Page04SensitiveSigns } from './pages/Page04SensitiveSigns';
import { Page05KitCabinet } from './pages/Page05KitCabinet';
import { Page06MythFact } from './pages/Page06MythFact';
import { Page07GetHelp } from './pages/Page07GetHelp';
import { Page08Closing } from './pages/Page08Closing';

interface PortraitBookStageProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const PortraitBookStage: React.FC<PortraitBookStageProps> = ({
  locale,
  onLocaleChange,
}) => {
  const { currentLeafIndex, setLeafIndex, nextLeaf, prevLeaf, totalLeaves } = useBookStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextLeaf();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevLeaf();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextLeaf, prevLeaf]);

  // Touch Swipe Handlers (30% threshold)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50) {
      // Swiped Left -> Next Page
      nextLeaf();
    } else if (diffX < -50) {
      // Swiped Right -> Previous Page
      prevLeaf();
    }
    touchStartX.current = null;
  };

  const renderActivePage = () => {
    switch (currentLeafIndex) {
      case 0:
        return (
          <Page00Cover
            onOpen={() => nextLeaf()}
            locale={locale}
            onLocaleChange={onLocaleChange}
          />
        );
      case 1:
        return <Page01Gestures locale={locale} />;
      case 2:
        return <Page02TOC locale={locale} onNavigateToPage={(idx) => setLeafIndex(idx)} />;
      case 3:
        return <Page03BodyShield locale={locale} />;
      case 4:
        return <Page04SensitiveSigns locale={locale} />;
      case 5:
        return <Page05KitCabinet locale={locale} />;
      case 6:
        return <Page06MythFact locale={locale} />;
      case 7:
        return <Page07GetHelp locale={locale} />;
      case 8:
        return <Page08Closing locale={locale} />;
      default:
        return (
          <Page00Cover
            onOpen={() => nextLeaf()}
            locale={locale}
            onLocaleChange={onLocaleChange}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="portrait-stage relative w-full max-w-[680px] aspect-[3/4] max-h-[92vh] mx-auto flex items-center justify-center p-2 sm:p-4 select-none"
    >
      {/* Outer 3D Book Shell */}
      <div className="portrait-book relative w-full h-full rounded-2xl shadow-spread flex overflow-hidden border border-brass/40">
        {/* Persistent Teal Spine with Brass Stitching Line (Left Edge) */}
        {currentLeafIndex > 0 && (
          <div className="spine-persistent">
            <div className="spine-stitch" />
          </div>
        )}

        {/* Inner Page Rendering Area */}
        <div className={`relative w-full h-full ${currentLeafIndex > 0 ? 'pl-5' : ''}`}>
          {renderActivePage()}
        </div>
      </div>
    </div>
  );
};
