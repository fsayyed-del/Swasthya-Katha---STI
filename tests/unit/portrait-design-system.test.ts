import { describe, it, expect } from 'bun:test';
import { PORTRAIT_BOOK_PAGES } from '@/content/portrait-pages/portrait-manifest';

describe('Swasthya Katha Portrait Ebook Design System Invariants', () => {
  it('contains exactly 9 canonical page templates (00 to 08)', () => {
    expect(PORTRAIT_BOOK_PAGES.length).toBe(9);
    PORTRAIT_BOOK_PAGES.forEach((page, idx) => {
      expect(page.pageNumber).toBe(idx);
    });
  });

  it('validates every page has non-empty English & Hindi titles, audio scripts, and facilitator prompts', () => {
    PORTRAIT_BOOK_PAGES.forEach((page) => {
      expect(page.title.en.length).toBeGreaterThan(0);
      expect(page.title.hi.length).toBeGreaterThan(0);
      expect(page.audioScript.en.length).toBeGreaterThan(0);
      expect(page.audioScript.hi.length).toBeGreaterThan(0);
      expect(page.facilitatorPrompt.en.length).toBeGreaterThan(0);
      expect(page.facilitatorPrompt.hi.length).toBeGreaterThan(0);
      expect(page.accessibilityDescription.en.length).toBeGreaterThan(0);
      expect(page.bodyLines.en.length).toBeGreaterThan(0);
      expect(page.bodyLines.hi.length).toBeGreaterThan(0);
    });
  });

  it('enforces ZERO medication dosage in learner view across all pages', () => {
    // Dosage regex patterns like 500mg, 1g, 2.4 MU, 400mg, oral single dose
    const dosageRegex = /\b(\d+(\.\d+)?\s*(mg|g|mu|ml))\b/i;

    PORTRAIT_BOOK_PAGES.forEach((page) => {
      page.bodyLines.en.forEach((line) => {
        expect(dosageRegex.test(line)).toBe(false);
      });
      page.bodyLines.hi.forEach((line) => {
        expect(dosageRegex.test(line)).toBe(false);
      });
    });
  });

  it('validates Page 04 contains complete clinical governance metadata', () => {
    const page04 = PORTRAIT_BOOK_PAGES[4];
    expect(page04.id).toBe('page-04-sensitive-signs');
    expect(page04.chapterHue).toBe('mineral-green');
    expect(page04.clinicalMetadata).toBeDefined();
    expect(page04.clinicalMetadata?.source).toContain('CDC');
    expect(page04.clinicalMetadata?.reviewer).toContain('Dr. A. Sharma');
    expect(page04.clinicalMetadata?.version).toBe('1.0-Governed');
  });

  it('validates Chapter Hues conform strictly to the 3-color semantic system', () => {
    const allowedHues = ['mineral-green', 'coral', 'care-blue', undefined];
    PORTRAIT_BOOK_PAGES.forEach((page) => {
      expect(allowedHues).toContain(page.chapterHue);
    });
  });
});
