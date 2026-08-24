'use client';

import React from 'react';
import { PublicationLeaf } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { PageFace } from './PageFace';

interface BookPageProps {
  leaf: PublicationLeaf;
  currentLeafIndex: number;
  totalLeaves: number;
  locale: Locale;
  dragProgress?: number; // 0 to 1 if this leaf is actively dragged
  isDragging?: boolean;
  onTargetClick?: (targetId: string) => void;
  activeTargetId?: string;
  onLocaleChange?: (locale: Locale) => void;
}

export const BookPage: React.FC<BookPageProps> = ({
  leaf,
  currentLeafIndex,
  totalLeaves,
  locale,
  dragProgress = 0,
  isDragging = false,
  onTargetClick,
  activeTargetId,
  onLocaleChange
}) => {
  const isTurned = leaf.index < currentLeafIndex;
  const isCurrent = leaf.index === currentLeafIndex;
  const isPrevious = leaf.index === currentLeafIndex - 1;

  // Calculate static or active rotation angle
  let rotationAngle = isTurned ? -180 : 0;
  if (isDragging) {
    if (isCurrent) {
      // Dragging forward: from 0 to -180
      rotationAngle = -180 * dragProgress;
    } else if (isPrevious) {
      // Dragging backward: from -180 to 0
      rotationAngle = -180 + (180 * dragProgress);
    }
  }

  // Calculate physical Z-index stacking
  let zIndex = 10;
  if (isDragging && (isCurrent || isPrevious)) {
    zIndex = 50; // Active dragging leaf stays on top
  } else if (isTurned) {
    zIndex = 10 + leaf.index; // Left turned leaves stack in forward order
  } else {
    zIndex = 10 + (totalLeaves - leaf.index); // Right un-turned leaves stack in reverse order
  }

  return (
    <div
      className="page-leaf"
      style={{
        zIndex,
        transform: `rotateY(${rotationAngle}deg)`,
        transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      data-leaf-index={leaf.index}
      data-leaf-turned={isTurned}
    >
      {/* Front Face (Visible when flat on right side) */}
      <PageFace
        content={leaf.front}
        isBackFace={false}
        locale={locale}
        onTargetClick={onTargetClick}
        activeTargetId={activeTargetId}
        onLocaleChange={onLocaleChange}
      />

      {/* Back Face (Visible after turning 180deg onto left side) */}
      <PageFace
        content={leaf.back}
        isBackFace={true}
        locale={locale}
        onTargetClick={onTargetClick}
        activeTargetId={activeTargetId}
        onLocaleChange={onLocaleChange}
      />
    </div>
  );
};
