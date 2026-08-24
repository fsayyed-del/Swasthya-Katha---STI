import { z } from 'zod';
import { Locale } from '@/src/domain/content/schema';

export const ReviewStatusSchema = z.enum([
  'proposed',
  'source_pending',
  'rights_pending',
  'clinical_pending',
  'revision_requested',
  'clinical_approved',
  'language_pending',
  'accessibility_pending',
  'published',
  'withdrawn',
  'expired'
]);
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;

export const AudienceRoleSchema = z.enum(['learner', 'facilitator', 'clinical']);
export type AudienceRole = z.infer<typeof AudienceRoleSchema>;

export const ClinicalClaimSchema = z.object({
  id: z.string(),
  text: z.record(z.string(), z.string()), // multilingual text by locale
  audience: AudienceRoleSchema,
  sourceIds: z.array(z.string()).min(1),
  reviewStatus: ReviewStatusSchema,
  reviewerId: z.string().nullable(),
  reviewedAt: z.string().nullable(),
  reviewDueAt: z.string().nullable()
});
export type ClinicalClaim = z.infer<typeof ClinicalClaimSchema>;

export const ClinicalAssetSchema = z.object({
  id: z.string(),
  type: z.enum(['photo', 'illustration', 'diagram']),
  anatomySite: z.enum(['penis_urethral', 'vulva_cervical', 'extragenital_systemic', 'microscopic']),
  title: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  sourceUri: z.string(),
  localAssetPath: z.string().nullable(),
  rightsStatus: z.enum(['unknown', 'pending', 'cleared', 'rejected']),
  consentStatus: z.enum(['not_applicable', 'unknown', 'pending', 'verified']),
  sensitivity: z.enum(['low', 'moderate', 'high']),
  altText: z.record(z.string(), z.string()),
  reviewStatus: ReviewStatusSchema
});
export type ClinicalAsset = z.infer<typeof ClinicalAssetSchema>;

export const ProtocolReferenceSchema = z.object({
  id: z.string(),
  jurisdiction: z.string(),
  guidelineTitle: z.string(),
  guidelineVersion: z.string(),
  sourceUrl: z.string(),
  reviewedBy: z.string(),
  reviewedAt: z.string(),
  status: z.enum(['draft', 'approved', 'expired', 'withdrawn']),
  staffOnly: z.literal(true)
});
export type ProtocolReference = z.infer<typeof ProtocolReferenceSchema>;

export const ClinicalAtlasEntrySchema = z.object({
  id: z.string(),
  diseaseName: z.record(z.string(), z.string()),
  pathogen: z.string().nullable(),
  syndromeCategory: z.record(z.string(), z.string()),
  nacoKitNumber: z.number().nullable(),
  nacoKitColor: z.string().nullable(),
  scope: z.object({
    country: z.array(z.string()),
    population: z.array(z.string())
  }),
  learnerSummary: z.record(z.string(), z.string()),
  malePresentation: z.object({
    siteName: z.record(z.string(), z.string()),
    symptoms: z.record(z.string(), z.string()),
    visualNotes: z.record(z.string(), z.string()),
    assetId: z.string()
  }),
  femalePresentation: z.object({
    siteName: z.record(z.string(), z.string()),
    symptoms: z.record(z.string(), z.string()),
    visualNotes: z.record(z.string(), z.string()),
    assetId: z.string()
  }),
  extragenitalPresentation: z.object({
    siteName: z.record(z.string(), z.string()),
    description: z.record(z.string(), z.string()),
    assetId: z.string()
  }).nullable(),
  claims: z.array(ClinicalClaimSchema),
  assets: z.array(ClinicalAssetSchema),
  nacoKitReferences: z.array(z.string()),
  clinicalProtocolReferenceIds: z.array(z.string()),
  overallStatus: ReviewStatusSchema
});
export type ClinicalAtlasEntry = z.infer<typeof ClinicalAtlasEntrySchema>;
