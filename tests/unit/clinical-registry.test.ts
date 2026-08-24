import { describe, it, expect } from 'bun:test';
import { ClinicalAtlasRegistry } from '@/components/clinical/ClinicalAtlasRegistry';
import { ClinicalAtlasEntrySchema } from '@/lib/clinical/clinical-schemas';
import approvedEntriesJson from '@/content/clinical/registry.approved.json';

describe('Clinical Atlas Registry Invariants & Governance (Ethical Plan v2.0)', () => {
  it('validates all entries strictly match the ClinicalAtlasEntrySchema', () => {
    expect(approvedEntriesJson.length).toBeGreaterThan(0);
    approvedEntriesJson.forEach((rawEntry) => {
      const parsed = ClinicalAtlasEntrySchema.safeParse(rawEntry);
      expect(parsed.success).toBe(true);
    });
  });

  it('ensures every approved entry has clinical_approved overall status', () => {
    const approved = ClinicalAtlasRegistry.getAllApproved();
    expect(approved.length).toBe(approvedEntriesJson.length);
    approved.forEach((entry) => {
      expect(entry.overallStatus).toBe('clinical_approved');
    });
  });

  it('verifies every entry has complete dual-anatomical (Male & Female) presentation details', () => {
    const entries = ClinicalAtlasRegistry.getAllApproved();
    entries.forEach((entry) => {
      // Male presentation checks
      expect(entry.malePresentation.siteName.en.length).toBeGreaterThan(0);
      expect(entry.malePresentation.symptoms.en.length).toBeGreaterThan(0);
      expect(entry.malePresentation.visualNotes.en.length).toBeGreaterThan(0);

      // Female presentation checks
      expect(entry.femalePresentation.siteName.en.length).toBeGreaterThan(0);
      expect(entry.femalePresentation.symptoms.en.length).toBeGreaterThan(0);
      expect(entry.femalePresentation.visualNotes.en.length).toBeGreaterThan(0);
    });
  });

  it('correctly maps NACO syndromic kit numbers to clinical atlas entries', () => {
    // Kit 1 (Gonorrhea)
    const kit1Entry = ClinicalAtlasRegistry.getByNacoKitNumber(1);
    expect(kit1Entry).toBeDefined();
    expect(kit1Entry?.id).toBe('gonorrhea');

    // Kit 3 (Syphilis)
    const kit3Entry = ClinicalAtlasRegistry.getByNacoKitNumber(3);
    expect(kit3Entry).toBeDefined();
    expect(kit3Entry?.id).toBe('syphilis-primary');

    // Kit 5 (Herpes)
    const kit5Entry = ClinicalAtlasRegistry.getByNacoKitNumber(5);
    expect(kit5Entry).toBeDefined();
    expect(kit5Entry?.id).toBe('herpes-genital');
  });

  it('ensures multilingual localization helpers return non-empty strings', () => {
    const entry = ClinicalAtlasRegistry.getById('syphilis-primary');
    expect(entry).toBeDefined();
    if (entry) {
      expect(ClinicalAtlasRegistry.getLocalizedTitle(entry, 'en')).toBe('Primary Syphilis (Chancre)');
      expect(ClinicalAtlasRegistry.getLocalizedTitle(entry, 'hi')).toContain('सिफलिस');
      expect(ClinicalAtlasRegistry.getLocalizedSummary(entry, 'en').length).toBeGreaterThan(10);
    }
  });
});
