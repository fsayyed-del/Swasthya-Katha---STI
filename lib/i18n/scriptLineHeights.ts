import { Locale } from '@/src/domain/content/schema';

export const SCRIPT_LINE_HEIGHTS: Record<Locale, { base: string; headings: string; display: string }> = {
  en: { base: 'leading-relaxed', headings: 'leading-tight', display: 'leading-none' },
  hi: { base: 'leading-loose', headings: 'leading-snug', display: 'leading-tight' }, // Extra headroom for Devanagari mātrās
  mr: { base: 'leading-loose', headings: 'leading-snug', display: 'leading-tight' },
  bn: { base: 'leading-loose', headings: 'leading-snug', display: 'leading-tight' },
  ta: { base: 'leading-loose', headings: 'leading-snug', display: 'leading-tight' },
  te: { base: 'leading-loose', headings: 'leading-snug', display: 'leading-tight' },
};

export const TEXT_EXPANSION_RATIOS: Record<Locale, number> = {
  en: 1.0,
  hi: 1.25, // Hindi runs ~25% longer
  mr: 1.25,
  bn: 1.2,
  ta: 1.3,
  te: 1.3,
};
