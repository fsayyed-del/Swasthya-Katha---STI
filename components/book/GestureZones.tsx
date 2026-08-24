'use client';

import React from 'react';
import { useBookStore } from '@/lib/state/bookStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GestureZonesProps {
  currentLeafIndex: number;
  totalLeaves: number;
  onForwardClick: () => void;
  onBackwardClick: () => void;
}

export const GestureZones: React.FC<GestureZonesProps> = ({
  currentLeafIndex,
  totalLeaves,
  onForwardClick,
  onBackwardClick,
}) => {
  const { hasSeenDragHint, dismissDragHint } = useBookStore();
  const canAdvance = currentLeafIndex < totalLeaves - 1;
  const canGoBack = currentLeafIndex > 0;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 select-none">
      {/* Left Edge Hotzone (Backward Turn) */}
      {canGoBack && (
        <div
          onClick={() => {
            dismissDragHint();
            onBackwardClick();
          }}
          className="absolute inset-y-0 left-0 w-16 sm:w-20 pointer-events-auto cursor-w-resize group flex items-center justify-start pl-2 transition-colors hover:bg-black/5"
          aria-label="Turn page backward"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onBackwardClick();
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/70 shadow-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-ink">
            <ChevronLeft className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Right Edge Hotzone (Forward Turn) */}
      {canAdvance && (
        <div
          onClick={() => {
            dismissDragHint();
            onForwardClick();
          }}
          className="absolute inset-y-0 right-0 w-16 sm:w-20 pointer-events-auto cursor-e-resize group flex items-center justify-end pr-2 transition-colors hover:bg-black/5"
          aria-label="Turn page forward"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onForwardClick();
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/70 shadow-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-ink">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* First-Use Corner Curl Hint on Right Bottom Corner */}
      {canAdvance && !hasSeenDragHint && currentLeafIndex === 0 && (
        <div
          className="absolute bottom-2 right-2 pointer-events-auto cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-teal-dark font-extrabold text-[11px] rounded-full shadow-lg border border-amber-300 animate-bounce"
          onClick={() => {
            dismissDragHint();
            onForwardClick();
          }}
        >
          <span>Drag or click edge to turn</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
