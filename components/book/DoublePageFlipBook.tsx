'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { useBookStore } from '@/lib/state/bookStore';
import { Page00Cover } from '../portrait/pages/Page00Cover';
import { Page01Gestures } from '../portrait/pages/Page01Gestures';
import { Page02TOC } from '../portrait/pages/Page02TOC';
import { Page03BodyShield } from '../portrait/pages/Page03BodyShield';
import { Page05KitCabinet } from '../portrait/pages/Page05KitCabinet';
import { Page06MythFact } from '../portrait/pages/Page06MythFact';
import { Page07GetHelp } from '../portrait/pages/Page07GetHelp';
import { Page08Closing } from '../portrait/pages/Page08Closing';
import { EditorialDiseasePage } from '../clinical/EditorialDiseasePage';
import { EDITORIAL_DISEASE_DATA } from '@/content/clinical/editorial-disease-data';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface DoublePageFlipBookProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const DoublePageFlipBook: React.FC<DoublePageFlipBookProps> = ({
  locale,
  onLocaleChange,
}) => {
  const { currentLeafIndex, setLeafIndex, nextLeaf, prevLeaf } = useBookStore();
  const bookRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalLeaves = 8; // 8 physical leaves = 16 rich pages

  // Sync CSS custom property --c on the .book element
  useEffect(() => {
    if (bookRef.current) {
      bookRef.current.style.setProperty('--c', String(currentLeafIndex));
    }
  }, [currentLeafIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentLeafIndex < totalLeaves) {
          nextLeaf();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentLeafIndex > 0) {
          prevLeaf();
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        setLeafIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setLeafIndex(totalLeaves);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLeafIndex, nextLeaf, prevLeaf, setLeafIndex]);

  // Touch Swipe handlers with dominant axis locking for butter-smooth mobile sliding
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only trigger horizontal flip if horizontal movement is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 25) {
      if (diffX > 0 && currentLeafIndex < totalLeaves) {
        nextLeaf();
      } else if (diffX < 0 && currentLeafIndex > 0) {
        prevLeaf();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Page click handler
  const handlePageClick = (e: React.MouseEvent, leafIdx: number, isBack: boolean) => {
    const target = e.target as HTMLElement;
    // Don't turn page if clicking interactive controls
    if (target.closest('button, a, input, select, [role="button"], audio, video, img')) {
      return;
    }
    if (isBack) {
      setLeafIndex(leafIdx);
    } else {
      setLeafIndex(leafIdx + 1);
    }
  };

  // 8 Canonical Physical Leaves (16 Pages)
  const leaves = [
    {
      index: 0,
      front: (
        <Page00Cover
          onOpen={() => setLeafIndex(1)}
          locale={locale}
          onLocaleChange={onLocaleChange}
        />
      ),
      back: <Page01Gestures locale={locale} />,
    },
    {
      index: 1,
      front: (
        <Page02TOC
          locale={locale}
          onNavigateToPage={(pageIdx) => {
            const targetLeaf = Math.min(totalLeaves, Math.ceil(pageIdx / 2));
            setLeafIndex(targetLeaf);
          }}
        />
      ),
      back: <Page03BodyShield locale={locale} />,
    },
    {
      index: 2,
      front: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['primary-syphilis']}
          locale={locale}
          pageNumber={4}
        />
      ),
      back: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['secondary-syphilis']}
          locale={locale}
          pageNumber={5}
        />
      ),
    },
    {
      index: 3,
      front: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['gonorrhea']}
          locale={locale}
          pageNumber={6}
        />
      ),
      back: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['chlamydia-lgv']}
          locale={locale}
          pageNumber={7}
        />
      ),
    },
    {
      index: 4,
      front: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['genital-herpes']}
          locale={locale}
          pageNumber={8}
        />
      ),
      back: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['chancroid-pediculosis']}
          locale={locale}
          pageNumber={9}
        />
      ),
    },
    {
      index: 5,
      front: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['genital-warts']}
          locale={locale}
          pageNumber={10}
        />
      ),
      back: (
        <EditorialDiseasePage
          data={EDITORIAL_DISEASE_DATA['vaginal-discharge-pid']}
          locale={locale}
          pageNumber={11}
        />
      ),
    },
    {
      index: 6,
      front: <Page05KitCabinet locale={locale} />,
      back: <Page06MythFact locale={locale} />,
    },
    {
      index: 7,
      front: <Page07GetHelp locale={locale} />,
      back: <Page08Closing locale={locale} />,
    },
  ];

  return (
    <div
      className="flipbook-container-stage w-full h-full flex flex-col items-center justify-center relative select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating Desktop Page Turn Button (Hidden on Mobile) */}
      {currentLeafIndex > 0 && (
        <button
          onClick={() => prevLeaf()}
          className="!hidden md:!flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-ink-teal/90 hover:bg-ink-teal text-paper shadow-2xl backdrop-blur-sm border-2 border-brass/60 transition-all hover:scale-110 active:scale-95"
          aria-label="Previous Page"
          title="Previous Page (←)"
        >
          <ChevronLeft className="w-6 h-6 text-brass-light" />
        </button>
      )}

      {/* Floating Desktop Page Turn Button (Hidden on Mobile) */}
      {currentLeafIndex < totalLeaves && (
        <button
          onClick={() => nextLeaf()}
          className="!hidden md:!flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-ink-teal/90 hover:bg-ink-teal text-paper shadow-2xl backdrop-blur-sm border-2 border-brass/60 transition-all hover:scale-110 active:scale-95"
          aria-label="Next Page"
          title="Next Page (→)"
        >
          <ChevronRight className="w-6 h-6 text-brass-light" />
        </button>
      )}

      {/* The 3D FlipBook Shell */}
      <div
        ref={bookRef}
        className="book"
        style={
          {
            '--c': currentLeafIndex,
          } as React.CSSProperties
        }
      >
        {leaves.map((leaf) => {
          // Virtualize rendering: Only render nearby leaves for maximum GPU speed
          const isNear = Math.abs(leaf.index - currentLeafIndex) <= 2;
          return (
            <div
              key={leaf.index}
              className={`page ${leaf.index === 0 && currentLeafIndex === 0 ? 'animate-preslide-hint' : ''}`}
              style={
                {
                  '--i': leaf.index,
                  visibility: isNear ? 'visible' : 'hidden',
                } as React.CSSProperties
              }
            >
              {/* FRONT FACE */}
              <div
                className={`front ${leaf.index === 0 ? 'cover' : ''}`}
                onClick={(e) => handlePageClick(e, leaf.index, false)}
              >
                {leaf.front}
              </div>

              {/* BACK FACE */}
              <div
                className={`back ${leaf.index === totalLeaves - 1 ? 'cover' : ''}`}
                onClick={(e) => handlePageClick(e, leaf.index, true)}
              >
                {leaf.back}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Subtle Bottom Navigation Bar (Ultra-responsive page flipping & progress indicator) */}
      {currentLeafIndex > 0 && (
        <div className="fixed bottom-2 z-40 flex md:hidden items-center justify-between gap-3 px-3 py-1 bg-ink-teal/90 backdrop-blur-md text-paper rounded-full border border-brass/40 shadow-lg text-[10px] font-bold">
          <button
            onClick={() => prevLeaf()}
            disabled={currentLeafIndex === 0}
            className="px-2 py-0.5 rounded-full hover:bg-white/10 disabled:opacity-30 transition-all active:scale-90"
          >
            ← {locale === 'hi' ? 'पिछला' : 'Prev'}
          </button>

          <span className="font-mono text-amber-200">
            {currentLeafIndex * 2} / {totalLeaves * 2}
          </span>

          <button
            onClick={() => nextLeaf()}
            disabled={currentLeafIndex === totalLeaves}
            className="px-2 py-0.5 rounded-full hover:bg-white/10 disabled:opacity-30 transition-all active:scale-90"
          >
            {locale === 'hi' ? 'अगला' : 'Next'} →
          </button>
        </div>
      )}
    </div>
  );
};
