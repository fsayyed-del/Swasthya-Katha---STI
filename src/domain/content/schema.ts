import { z } from 'zod';

export const LocaleSchema = z.enum(['en', 'hi', 'mr', 'bn', 'ta', 'te']);
export type Locale = z.infer<typeof LocaleSchema>;

export const LocalizedTextSchema = z.object({
  locale: LocaleSchema,
  value: z.string(),
  readingLevel: z.string().optional(),
  reviewStatus: z.enum(['draft', 'translated', 'reviewed', 'approved']).default('draft'),
});
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

export const SceneTargetSchema = z.object({
  id: z.string(),
  label: z.record(LocaleSchema, z.string()),
  description: z.record(LocaleSchema, z.string()),
  narrationAliases: z.array(z.string()).optional(),
  focusOrder: z.number().default(0),
  fallbackText: z.record(LocaleSchema, z.string()).optional(),
});
export type SceneTarget = z.infer<typeof SceneTargetSchema>;

export const VisualSceneSchema = z.object({
  id: z.string(),
  renderer: z.enum(['svg', 'webgl', 'static']),
  fallbackAsset: z.string().optional(),
  targetIds: z.array(z.string()),
  sceneDescription: z.record(LocaleSchema, z.string()),
});
export type VisualScene = z.infer<typeof VisualSceneSchema>;

export const TimelineEventSchema = z.object({
  id: z.string(),
  startMs: z.number().nonnegative(),
  endMs: z.number().positive(),
  blockId: z.string(),
  textTokenIds: z.array(z.string()).optional(),
  sceneTargetIds: z.array(z.string()).optional(),
  action: z.enum(['highlight', 'pulse', 'trace', 'show']).default('highlight'),
});
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;

export const NarrationTrackSchema = z.object({
  id: z.string(),
  locale: LocaleSchema,
  audioUrl: z.string().optional(),
  transcript: z.string(),
  events: z.array(TimelineEventSchema),
});
export type NarrationTrack = z.infer<typeof NarrationTrackSchema>;

export const LessonBlockSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'illustration', 'diagram', 'animation', 'quiz', 'action', 'naco_kits']),
  order: z.number(),
  content: z.record(LocaleSchema, z.string()),
  sceneId: z.string().optional(),
  narrationTrackId: z.string().optional(),
  accessibilityDescription: z.record(LocaleSchema, z.string()).optional(),
  actionPrompt: z.record(LocaleSchema, z.string()).optional(),
  referralInfo: z.record(LocaleSchema, z.string()).optional(),
});
export type LessonBlock = z.infer<typeof LessonBlockSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  chapterId: z.string(),
  title: z.record(LocaleSchema, z.string()),
  subtitle: z.record(LocaleSchema, z.string()).optional(),
  keyMessage: z.record(LocaleSchema, z.string()),
  learningObjective: z.record(LocaleSchema, z.string()),
  blocks: z.array(LessonBlockSchema),
  narration: z.record(LocaleSchema, NarrationTrackSchema).optional(),
  scene: VisualSceneSchema.optional(),
  targets: z.array(SceneTargetSchema).optional(),
  clinicalReviewStatus: z.enum(['pending', 'approved', 'rejected']).optional(),
  languageReviewStatus: z.record(LocaleSchema, z.enum(['pending', 'approved', 'rejected'])).optional(),
  reviewDueDate: z.string().optional(),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ChapterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  number: z.number(),
  title: z.record(LocaleSchema, z.string()),
  summary: z.record(LocaleSchema, z.string()),
  lessons: z.array(LessonSchema),
});
export type Chapter = z.infer<typeof ChapterSchema>;

export const PublicationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.record(LocaleSchema, z.string()),
  tagline: z.record(LocaleSchema, z.string()),
  edition: z.string(),
  version: z.string(),
  status: z.enum(['draft', 'review', 'published', 'withdrawn']).default('draft'),
  supportedLocales: z.array(LocaleSchema),
  chapters: z.array(ChapterSchema),
  clinicalReviewDueAt: z.string().optional(),
});
export type Publication = z.infer<typeof PublicationSchema>;
