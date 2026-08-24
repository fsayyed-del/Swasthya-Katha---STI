'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface LocaleSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const LOCALES: { code: Locale; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
];

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  currentLocale,
  onLocaleChange,
}) => {
  return (
    <div className="relative inline-flex items-center gap-1.5 bg-paper-deep/80 px-2.5 py-1.5 rounded-full border border-border/80 text-ink shadow-sm text-sm">
      <Globe className="w-4 h-4 text-teal-DEFAULT shrink-0" aria-hidden="true" />
      <label htmlFor="locale-select" className="sr-only">
        Select Language
      </label>
      <select
        id="locale-select"
        value={currentLocale}
        onChange={(e) => onLocaleChange(e.target.value as Locale)}
        className="bg-transparent text-ink font-medium focus:outline-none cursor-pointer pr-1 text-xs sm:text-sm"
      >
        {LOCALES.map((loc) => (
          <option key={loc.code} value={loc.code} className="bg-paper text-ink">
            {loc.nativeName} ({loc.label})
          </option>
        ))}
      </select>
    </div>
  );
};
