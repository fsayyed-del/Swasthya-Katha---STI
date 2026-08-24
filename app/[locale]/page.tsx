'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ReaderShell } from '@/components/reader/ReaderShell';
import { SWASTHYA_KATHA_PUBLICATION } from '@/src/domain/content/sample_data';
import { Locale, LocaleSchema } from '@/src/domain/content/schema';

export default function LocalizedPage() {
  const params = useParams();
  const rawLocale = typeof params?.locale === 'string' ? params.locale : 'en';
  const parsed = LocaleSchema.safeParse(rawLocale);
  const locale: Locale = parsed.success ? parsed.data : 'en';

  return <ReaderShell publication={SWASTHYA_KATHA_PUBLICATION} initialLocale={locale} />;
}
