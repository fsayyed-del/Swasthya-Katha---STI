import { describe, it, expect } from 'vitest';
import { PublicationSchema } from '@/src/domain/content/schema';
import { SWASTHYA_KATHA_PUBLICATION } from '@/src/domain/content/sample_data';
import { NACO_KITS, NacoKitSchema } from '@/src/domain/content/naco_kits';

describe('Swasthya Katha Schema & Content Validation', () => {
  it('validates the complete publication against PublicationSchema', () => {
    const result = PublicationSchema.safeParse(SWASTHYA_KATHA_PUBLICATION);
    expect(result.success).toBe(true);
  });

  it('contains 4 comprehensive lessons including the final NACO Kits Spread', () => {
    const lessons = SWASTHYA_KATHA_PUBLICATION.chapters[0].lessons;
    expect(lessons).toHaveLength(4);
    expect(lessons[0].id).toBe('lesson-1-what-is-an-sti');
    expect(lessons[1].id).toBe('lesson-2-hidden-signs');
    expect(lessons[2].id).toBe('lesson-3-testing-journey');
    expect(lessons[3].id).toBe('lesson-4-naco-kits-toolkit');
  });

  it('validates all 7 NACO Syndromic Kits against NacoKitSchema', () => {
    expect(NACO_KITS).toHaveLength(7);
    for (const kit of NACO_KITS) {
      const parsed = NacoKitSchema.safeParse(kit);
      expect(parsed.success).toBe(true);
      expect(kit.kitNumber).toBeGreaterThanOrEqual(1);
      expect(kit.kitNumber).toBeLessThanOrEqual(7);
      expect(kit.clinicalRegimen).toBeDefined();
      expect(kit.partnerManagement.en).toBeTruthy();
      expect(kit.partnerManagement.hi).toBeTruthy();
      expect(kit.followUpSchedule.en).toBeTruthy();
    }
  });

  it('ensures each lesson has valid multilingual titles and key messages in EN and HI', () => {
    const lessons = SWASTHYA_KATHA_PUBLICATION.chapters[0].lessons;
    for (const lesson of lessons) {
      expect(lesson.title.en).toBeTruthy();
      expect(lesson.title.hi).toBeTruthy();
      expect(lesson.keyMessage.en).toBeTruthy();
      expect(lesson.keyMessage.hi).toBeTruthy();
    }
  });

  it('ensures Kit 1 to Kit 7 cover all required colors correctly', () => {
    const expectedColors = ['Grey', 'Green', 'White', 'Blue', 'Red', 'Yellow', 'Black'];
    const actualColors = NACO_KITS.map((k) => k.colorName.en);
    for (const color of expectedColors) {
      expect(actualColors.some((c) => c.toLowerCase().includes(color.toLowerCase()))).toBe(true);
    }
  });
});
