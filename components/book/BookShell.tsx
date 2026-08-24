'use client';

import React, { useRef, useEffect, useReducer } from 'react';
import { PublicationManifest } from '../publication/PublicationManifest';
import { Locale } from '@/src/domain/content/schema';
import { PageStack } from './PageStack';
import { Spine } from './Spine';
import { PageEdges } from './PageEdges';
import { BookShadow } from './BookShadow';
import { GestureZones } from './GestureZones';
import { pageTurnReducer, initialPageTurnState } from './pageTurnReducer';
import { useBookStore } from '@/lib/state/bookStore';

interface BookShellProps {
  manifest: PublicationManifest;
  locale: Locale;
  onTargetClick?: (targetId: string) => void;
  activeTargetId?: string;
  onLocaleChange?: (locale: Locale) => void;
}

export const BookShell: React.FC<BookShellProps> = ({
  manifest,
  locale,
  onTargetClick,
  activeTargetId,
  onLocaleChange,
}) => {
  const { currentLeafIndex, setLeafIndex, nextLeaf, prevLeaf, totalLeaves } = useBookStore();
  const [turnState, dispatch] = useReducer(pageTurnReducer, {
    ...initialPageTurnState,
    activeLeafIndex: currentLeafIndex,
  });

  const shellRef = useRef<HTMLDivElement>(null);
  const isOpen = currentLeafIndex > 0;
  const isDragging = turnState.state === 'DRAGGING' || turnState.state === 'PRESSED';

  // Handle pointer down
  const handlePointerDown = (e: React.PointerEvent) => {
    if (turnState.state !== 'IDLE' && turnState.state !== 'SETTLED') return;
    const rect = shellRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const isRightHalf = clickX >= rect.width / 2;

    if (isRightHalf && currentLeafIndex < totalLeaves - 1) {
      // Forward turn on right side
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dispatch({
        type: 'POINTER_DOWN',
        x: e.clientX,
        y: e.clientY,
        leafIndex: currentLeafIndex,
        direction: 'forward',
      });
    } else if (!isRightHalf && currentLeafIndex > 0) {
      // Backward turn on left side
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dispatch({
        type: 'POINTER_DOWN',
        x: e.clientX,
        y: e.clientY,
        leafIndex: currentLeafIndex - 1,
        direction: 'backward',
      });
    }
  };

  // Handle pointer move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (turnState.state !== 'PRESSED' && turnState.state !== 'DRAGGING') return;
    const rect = shellRef.current?.getBoundingClientRect();
    const containerWidth = rect ? rect.width / 2 : 400;

    dispatch({
      type: 'POINTER_MOVE',
      x: e.clientX,
      y: e.clientY,
      containerWidth,
    });
  };

  // Handle pointer up
  const handlePointerUp = (e: React.PointerEvent) => {
    if (turnState.state !== 'DRAGGING' && turnState.state !== 'PRESSED') return;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const dx = e.clientX - turnState.startX;
    const velocityX = dx / Math.max(1, Date.now() - 50); // rough estimate

    dispatch({
      type: 'POINTER_UP',
      velocityX,
    });
  };

  // Handle animation completion when committing/snapping
  useEffect(() => {
    if (turnState.state === 'COMPLETING') {
      const timer = setTimeout(() => {
        if (turnState.direction === 'forward') {
          nextLeaf();
          dispatch({ type: 'ANIMATION_SETTLED', finalLeafIndex: currentLeafIndex + 1 });
        } else if (turnState.direction === 'backward') {
          prevLeaf();
          dispatch({ type: 'ANIMATION_SETTLED', finalLeafIndex: currentLeafIndex - 1 });
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    if (turnState.state === 'SNAPPING_BACK') {
      const timer = setTimeout(() => {
        dispatch({ type: 'ANIMATION_SETTLED', finalLeafIndex: currentLeafIndex });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [turnState.state, turnState.direction, currentLeafIndex, nextLeaf, prevLeaf]);

  // Center calculation: when closed at Leaf 0, shift book right by 25% of stage so the single right cover is centered!
  // When opened (Leaf > 0), shift is 0% so the full 2-page open spread is centered!
  const getShellTransform = () => {
    if (!isOpen) {
      return 'translateX(-25%) rotateY(0deg)';
    }
    if (currentLeafIndex === totalLeaves - 1) {
      return 'translateX(25%) rotateY(0deg)';
    }
    return 'translateX(0%) rotateY(0deg)';
  };

  return (
    <div className="relative w-full flex items-center justify-center p-0 my-auto">
      {/* 3D Shell Container (Maximized full viewport height and width) */}
      <div
        ref={shellRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => dispatch({ type: 'POINTER_CANCEL' })}
        className="flipbook-shell relative w-full max-w-[1320px] xl:max-w-[1440px] aspect-[16/10] max-h-[94vh] touch-pan-y"
        style={{
          transform: getShellTransform(),
        }}
      >
        {/* Ambient Realistic Studio Lighting Shadow */}
        <BookShadow isOpen={isOpen} isDragging={isDragging} />

        {/* Stacked 3D Leaves */}
        <PageStack
          manifest={manifest}
          currentLeafIndex={currentLeafIndex}
          locale={locale}
          turnState={turnState}
          onTargetClick={onTargetClick}
          activeTargetId={activeTargetId}
          onLocaleChange={onLocaleChange}
        />

        {/* Central Spine Gutter & Crease */}
        <Spine isOpen={isOpen} />

        {/* Realistic Page Edges */}
        <PageEdges leafIndex={currentLeafIndex} totalLeaves={totalLeaves} />

        {/* Accessible Invisible Gesture Zones */}
        <GestureZones
          currentLeafIndex={currentLeafIndex}
          totalLeaves={totalLeaves}
          onForwardClick={nextLeaf}
          onBackwardClick={prevLeaf}
        />
      </div>
    </div>
  );
};
