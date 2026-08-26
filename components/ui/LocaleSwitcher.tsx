'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface LocaleSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  className?: string;
}

const SUPPORTED_LOCALES: { code: Locale; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
];

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  currentLocale,
  onLocaleChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLocale = SUPPORTED_LOCALES.find((l) => l.code === currentLocale) || SUPPORTED_LOCALES[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const handleSelect = (code: Locale, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onLocaleChange(code);
    setIsOpen(false);
  };

  const handleContainerInteraction = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerInteraction}
      onPointerDown={handleContainerInteraction}
      onMouseDown={handleContainerInteraction}
      onTouchStart={handleContainerInteraction}
      className={`relative inline-block text-left select-none ${className}`}
    >
      {/* Dropdown Toggle Pill */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper/95 hover:bg-paper text-ink-teal border border-brass/60 rounded-full text-[11px] sm:text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ink-teal/40"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-teal-dark shrink-0" />
        <span className="font-semibold text-ink-teal">
          {activeLocale.nativeName} ({activeLocale.label})
        </span>
        <ChevronDown className={`w-3 h-3 text-ink-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="absolute right-0 top-full mt-1.5 w-44 bg-paper rounded-xl shadow-2xl border-2 border-brass/60 py-1 z-[100] animate-slide-up text-ink overflow-hidden"
          role="listbox"
        >
          <div className="px-3 py-1 border-b border-brass/20 text-[9.5px] font-mono font-bold text-ink-muted uppercase tracking-wider">
            भाषा निवडा / Choose Language
          </div>
          {SUPPORTED_LOCALES.map((loc) => {
            const isSelected = loc.code === currentLocale;
            return (
              <button
                key={loc.code}
                type="button"
                onClick={(e) => handleSelect(loc.code, e)}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors font-medium hover:bg-amber-100 ${
                  isSelected ? 'bg-amber-200/70 text-ink-teal font-black' : 'text-ink'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold leading-tight">{loc.nativeName}</span>
                  <span className="text-[10px] text-ink-muted leading-tight">{loc.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-ink-teal font-bold shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
