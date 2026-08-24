'use client';

import React from 'react';
import { PublicationManifest } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { BookPage } from './BookPage';
import { PageTurnState } from './pageTurnReducer';

interface PageStackProps {
  manifest: PublicationManifest;
  currentLeafIndex: number;
  locale: Locale;
  turnState: PageTurnState;
  onTargetClick?: (targetId: string) => void;
  activeTargetId?: string;
  onLocaleChange?: (locale: Locale) => void;
}

export const PageStack: React.FC<PageStackProps> = ({
  manifest,
  currentLeafIndex,
  locale,
  turnState,
  onTargetClick,
  activeTargetId,
  onLocaleChange
}) => {
  const isDragging = turnState.state === 'DRAGGING' || turnState.state === 'PRESSED';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto" style={{ transformStyle: 'preserve-3d' }}>
      {manifest.leaves.map((leaf) => {
        const isDraggedLeaf = isDragging && (
          (turnState.direction === 'forward' && leaf.index === currentLeafIndex) ||
          (turnState.direction === 'backward' && leaf.index === currentLeafIndex - 1)
        );

        return (
          <BookPage
            key={leaf.id}
            leaf={leaf}
            currentLeafIndex={currentLeafIndex}
            totalLeaves={manifest.leaves.length}
            locale={locale}
            dragProgress={isDraggedLeaf ? turnState.progress : 0}
            isDragging={isDraggedLeaf}
            onTargetClick={onTargetClick}
            activeTargetId={activeTargetId}
            onLocaleChange={onLocaleChange}
          />
        );
      })}
    </div>
  );
};
