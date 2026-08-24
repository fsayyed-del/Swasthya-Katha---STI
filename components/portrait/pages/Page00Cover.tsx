'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { CoverShell } from '../CoverShell';

interface Page00CoverProps {
  onOpen: () => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const Page00Cover: React.FC<Page00CoverProps> = ({
  onOpen,
  locale,
  onLocaleChange,
}) => {
  return (
    <CoverShell
      onOpen={onOpen}
      locale={locale}
      onLocaleChange={onLocaleChange}
    />
  );
};
