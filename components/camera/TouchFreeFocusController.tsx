'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useBookStore } from '@/lib/state/bookStore';
import { Target, CheckCircle2, XCircle, ArrowRightLeft, Hand } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface TouchFreeFocusControllerProps {
  locale: Locale;
}

export const TouchFreeFocusController: React.FC<TouchFreeFocusControllerProps> = ({ locale }) => {
  const currentLeafIndex = useBookStore((s) => s.currentLeafIndex);
  const isFocusMode = useBookStore((s) => (s as any).isFocusMode || false);
  const setFocusMode = useBookStore((s) => (s as any).setFocusMode);

  const [isActive, setIsActive] = useState(false);
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Scan and gather visible interactive elements on the active page spread
  const scanInteractiveElements = useCallback(() => {
    if (typeof document === 'undefined') return [];

    const selectors = [
      'button:not([disabled])',
      '[role="button"]',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex="0"]',
      '.flip-card-inner',
      '.sound-btn-ring',
    ];

    const allNodes = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(', ')));

    // Filter to only visible elements on screen with non-zero dimensions
    const visibleElements = allNodes.filter((el) => {
      // Avoid selecting the focus controller overlay buttons themselves
      if (el.closest('.focus-controller-hud')) return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 12 && rect.height > 12 && rect.top < window.innerHeight && rect.bottom > 0;
    });

    return visibleElements;
  }, []);

  // Update target bounding box for visual laser indicator
  const updateTargetRect = useCallback((index: number, items: HTMLElement[]) => {
    if (items.length > 0 && items[index]) {
      const el = items[index];
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      setTargetRect(el.getBoundingClientRect());
    } else {
      setTargetRect(null);
    }
  }, []);

  // Sync elements when active or page changes
  useEffect(() => {
    if (isActive) {
      const found = scanInteractiveElements();
      setElements(found);
      const safeIndex = Math.min(currentIndex, Math.max(0, found.length - 1));
      setCurrentIndex(safeIndex);
      updateTargetRect(safeIndex, found);
    } else {
      setTargetRect(null);
    }
  }, [isActive, currentLeafIndex, scanInteractiveElements, updateTargetRect]);

  // Update rect on scroll/resize
  useEffect(() => {
    if (!isActive) return;

    const handleReposition = () => {
      if (elements[currentIndex]) {
        setTargetRect(elements[currentIndex].getBoundingClientRect());
      }
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isActive, elements, currentIndex]);

  // Navigate focus forward or backward
  const navigateFocus = useCallback(
    (direction: 'next' | 'prev') => {
      if (!isActive || elements.length === 0) return;

      setCurrentIndex((prev) => {
        let nextIdx = direction === 'next' ? prev + 1 : prev - 1;
        if (nextIdx >= elements.length) nextIdx = 0;
        if (nextIdx < 0) nextIdx = elements.length - 1;

        updateTargetRect(nextIdx, elements);
        return nextIdx;
      });
    },
    [isActive, elements, updateTargetRect]
  );

  // Trigger click on currently focused element
  const triggerSelect = useCallback(() => {
    if (!isActive || elements.length === 0) return;
    const currentEl = elements[currentIndex];
    if (currentEl) {
      // Visual feedback ripple on element
      currentEl.classList.add('ring-4', 'ring-emerald-400', 'ring-offset-2', 'scale-105');
      setTimeout(() => {
        currentEl.classList.remove('ring-4', 'ring-emerald-400', 'ring-offset-2', 'scale-105');
      }, 300);

      // Programmatic click
      currentEl.focus();
      currentEl.click();
    }
  }, [isActive, elements, currentIndex]);

  // Listen to gesture events from camera engine
  useEffect(() => {
    const handleToggleMode = (e: any) => {
      const activeState = e.detail?.active !== undefined ? e.detail.active : !isActive;
      setIsActive(activeState);
    };

    const handleFocusNav = (e: any) => {
      if (isActive) {
        navigateFocus(e.detail?.direction || 'next');
      }
    };

    const handleFocusSelect = () => {
      if (isActive) {
        triggerSelect();
      }
    };

    window.addEventListener('gesture:focus-mode-toggle', handleToggleMode);
    window.addEventListener('gesture:focus-navigate', handleFocusNav);
    window.addEventListener('gesture:focus-select', handleFocusSelect);

    return () => {
      window.removeEventListener('gesture:focus-mode-toggle', handleToggleMode);
      window.removeEventListener('gesture:focus-navigate', handleFocusNav);
      window.removeEventListener('gesture:focus-select', handleFocusSelect);
    };
  }, [isActive, navigateFocus, triggerSelect]);

  if (!isActive) return null;

  return (
    <div className="focus-controller-hud fixed inset-0 pointer-events-none z-[100] select-none">
      {/* Top Floating Gesture Control HUD Banner */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-auto bg-ink-teal/95 text-paper border-2 border-brass px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-slide-down">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-display font-black text-xs text-brass-light tracking-wide">
            <Target className="w-4 h-4 text-coral" />
            <span>{locale === 'hi' ? 'टच-फ्री कंट्रोल मोड (Shift+Tab)' : 'Touch-Free Control Mode (Shift+Tab)'}</span>
          </div>
          <div className="text-[10px] font-mono text-paper/90 flex items-center gap-2">
            <span>👈 👉 {locale === 'hi' ? 'उंगली: विकल्प बदलें' : 'Wave: Next/Prev'}</span>
            <span>•</span>
            <span>✋➜✊ {locale === 'hi' ? 'हथेली बंद: चुनें' : 'Close Palm: Select'}</span>
            <span>•</span>
            <span>✋✊x2 {locale === 'hi' ? 'दो बार: बाहर निकलें' : 'Double Close: Exit'}</span>
          </div>
        </div>

        <button
          onClick={() => setIsActive(false)}
          className="p-1 hover:bg-white/20 rounded-full text-coral transition-colors ml-2"
          title="Exit Focus Mode"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Pulsing Target Laser Highlight Box over Focused Element */}
      {targetRect && (
        <div
          className="fixed transition-all duration-200 ease-out border-2 border-amber-400 bg-amber-400/20 rounded-xl pointer-events-none shadow-2xl ring-4 ring-amber-400/60 ring-offset-2 animate-pulse"
          style={{
            top: `${targetRect.top - 4}px`,
            left: `${targetRect.left - 4}px`,
            width: `${targetRect.width + 8}px`,
            height: `${targetRect.height + 8}px`,
          }}
        >
          {/* Badge indicator on top of focused element */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-ink-teal text-brass-light border border-brass text-[9px] font-mono font-black shadow-lg flex items-center gap-1 whitespace-nowrap">
            <Hand className="w-2.5 h-2.5 text-coral animate-bounce" />
            <span>
              {currentIndex + 1}/{elements.length} • ✋➜✊ {locale === 'hi' ? 'चुनें' : 'Select'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
