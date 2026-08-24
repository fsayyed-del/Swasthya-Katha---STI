'use client';

import React, { useEffect, useRef } from 'react';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 40 && currentLeafIndex < totalLeaves) {
      nextLeaf();
    } else if (diffX < -40 && currentLeafIndex > 0) {
      prevLeaf();
    }
    touchStartX.current = null;
  };

  // Page click handler matching the author's logic
  const handlePageClick = (e: React.MouseEvent, leafIdx: number, isBack: boolean) => {
    const target = e.target as HTMLElement;
    // Don't turn page if clicking interactive controls
    if (target.closest('button, a, input, select, [role="button"], .perspective-1000, .flip-card-inner, audio, video')) {
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
            // Map 1-based page number to leaf index:
            // Page 1..2 -> Leaf 0 / 1
            // Page 3..4 -> Leaf 1 / 2
            // Page 5..6 -> Leaf 2 / 3
            // Page 7..8 -> Leaf 3 / 4
            // Page 9..10 -> Leaf 4 / 5
            // Page 11..12 -> Leaf 5 / 6
            // Page 13..14 -> Leaf 6 / 7
            // Page 15 -> Leaf 7
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
      className="flipbook-container-stage w-full h-full flex flex-col items-center justify-center relative select-none py-2"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating Left Page Turn Button */}
      {currentLeafIndex > 0 && (
        <button
          onClick={() => prevLeaf()}
          className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-ink-teal/95 hover:bg-ink-teal text-paper shadow-2xl backdrop-blur-sm border-2 border-brass/60 transition-all hover:scale-110 active:scale-95"
          aria-label="Previous Page"
          title="Previous Page (←)"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-brass-light" />
        </button>
      )}

      {/* Floating Right Page Turn Button */}
      {currentLeafIndex < totalLeaves && (
        <button
          onClick={() => nextLeaf()}
          className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-ink-teal/95 hover:bg-ink-teal text-paper shadow-2xl backdrop-blur-sm border-2 border-brass/60 transition-all hover:scale-110 active:scale-95"
          aria-label="Next Page"
          title="Next Page (→)"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-brass-light" />
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
        {leaves.map((leaf) => (
          <div
            key={leaf.index}
            className="page"
            style={
              {
                '--i': leaf.index,
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
        ))}
      </div>
    </div>
  );
};
