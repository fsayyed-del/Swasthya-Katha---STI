import { describe, it, expect } from 'bun:test';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import assetRegistry from '@/content/clinical/asset-registry.json';
import claimRegistry from '@/content/clinical/claim-registry.json';
import protocolRegistry from '@/content/clinical/protocol-registry.json';
import searchManifest from '@/content/visual-research/visual-search-manifest.json';
import searchResults from '@/content/visual-research/search-results.json';
import assetShortlist from '@/content/visual-research/asset-shortlist.json';

describe('Clinical Atlas Systematic Image Research & Asset Pipeline Invariants', () => {
  it('validates visual search manifest has required collections and queries', () => {
    expect(searchManifest.collections.length).toBeGreaterThan(0);
    searchManifest.collections.forEach((col) => {
      expect(col.id.length).toBeGreaterThan(0);
      expect(col.searchQueries.length).toBeGreaterThan(0);
      expect(['public-learner', 'public-and-facilitator', 'educational-shielded', 'facilitator']).toContain(col.audience);
    });
  });

  it('validates all search candidates are scored and qualified in asset shortlist', () => {
    expect(searchResults.length).toBeGreaterThan(0);
    expect(assetShortlist.length).toBeGreaterThan(0);
    assetShortlist.forEach((item) => {
      expect(item.compositeScore).toBeGreaterThanOrEqual(4.0);
      expect(item.verdict).toBe('APPROVED_GREEN');
    });
  });

  it('verifies canonical asset registry has 100% Green Cleared and Approved items', () => {
    expect(assetRegistry.length).toBeGreaterThan(0);
    assetRegistry.forEach((asset) => {
      expect(asset.clinicalStatus).toBe('approved');
      expect(asset.publicationStatus).toBe('published');
      expect(asset.sourceOrganization).toBeDefined();
      expect(asset.attributionText.length).toBeGreaterThan(0);
      expect(asset.licenseType.length).toBeGreaterThan(0);
      expect(asset.altText.en.length).toBeGreaterThan(0);
      expect(asset.altText.hi.length).toBeGreaterThan(0);
    });
  });

  it('enforces SHA-256 cryptographic integrity for every derivative WebP file', () => {
    assetRegistry.forEach((asset) => {
      const relPath = asset.derivativePaths.webp.replace(/^\//, '');
      const fullPath = path.join(process.cwd(), 'public', relPath.replace(/^public\//, ''));
      expect(fs.existsSync(fullPath)).toBe(true);

      const fileBuffer = fs.readFileSync(fullPath);
      const calculatedHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      expect(calculatedHash).toBe(asset.originalChecksum);
    });
  });

  it('verifies clinical claim registry maps all major syndromes accurately', () => {
    expect(claimRegistry.length).toBe(4);
    claimRegistry.forEach((claim) => {
      expect(claim.diseaseId.length).toBeGreaterThan(0);
      expect(claim.maleSite.length).toBeGreaterThan(0);
      expect(claim.femaleSite.length).toBeGreaterThan(0);
      expect(claim.clinicalEvidence.length).toBeGreaterThan(0);
    });
  });

  it('validates NACO 7-Kit protocol registry adheres to 2026 standards', () => {
    expect(protocolRegistry.length).toBe(7);
    protocolRegistry.forEach((kit, idx) => {
      expect(kit.kitNumber).toBe(idx + 1);
      expect(kit.indications.length).toBeGreaterThan(0);
      expect(kit.partnerManagement.length).toBeGreaterThan(0);
      expect(kit.followUpSchedule.length).toBeGreaterThan(0);
      expect(kit.staffOnlyRegimen.length).toBeGreaterThan(0);
    });
  });
});
