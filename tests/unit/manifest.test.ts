import { describe, it, expect } from 'vitest';
import { CANONICAL_PUBLICATION_MANIFEST } from '@/components/publication/PublicationManifest';

describe('Canonical Publication Manifest Invariants (Master Plan v3.0)', () => {
  it('enforces strictly 8 physical leaves', () => {
    expect(CANONICAL_PUBLICATION_MANIFEST.totalLeaves).toBe(8);
    expect(CANONICAL_PUBLICATION_MANIFEST.leaves).toHaveLength(8);
  });

  it('enforces strictly 16 total page faces', () => {
    expect(CANONICAL_PUBLICATION_MANIFEST.totalFaces).toBe(16);
    let faceCount = 0;
    CANONICAL_PUBLICATION_MANIFEST.leaves.forEach((leaf) => {
      if (leaf.front) faceCount++;
      if (leaf.back) faceCount++;
    });
    expect(faceCount).toBe(16);
  });

  it('validates 0-based leaf indices match array positions', () => {
    CANONICAL_PUBLICATION_MANIFEST.leaves.forEach((leaf, idx) => {
      expect(leaf.index).toBe(idx);
    });
  });

  it('ensures all 16 page faces have approved clinical review status', () => {
    CANONICAL_PUBLICATION_MANIFEST.leaves.forEach((leaf) => {
      expect(leaf.front.clinicalReviewStatus).toBe('approved');
      expect(leaf.back.clinicalReviewStatus).toBe('approved');
    });
  });

  it('ensures each face contains non-empty English and Hindi headings and text', () => {
    CANONICAL_PUBLICATION_MANIFEST.leaves.forEach((leaf) => {
      expect(leaf.front.heading.en).toBeTruthy();
      expect(leaf.front.heading.hi).toBeTruthy();
      expect(leaf.back.heading.en).toBeTruthy();
      expect(leaf.back.heading.hi).toBeTruthy();
    });
  });
});
