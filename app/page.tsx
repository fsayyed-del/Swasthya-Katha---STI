'use client';

import React from 'react';
import { ReaderShell } from '@/components/reader/ReaderShell';
import { SWASTHYA_KATHA_PUBLICATION } from '@/src/domain/content/sample_data';

export default function HomePage() {
  return <ReaderShell publication={SWASTHYA_KATHA_PUBLICATION} initialLocale="en" />;
}
