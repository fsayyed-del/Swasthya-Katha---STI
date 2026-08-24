import { describe, it, expect } from 'bun:test';
import { VISUAL_SCENES } from '@/content/visual-scenes/scene-definitions';

describe('Realistic SVG Visual Scenes Invariants (Version 1.0)', () => {
  const sceneKeys = ['living-network', 'hidden-signs', 'clinic-journey', 'naco-cabinet', 'protection-orbit'];

  it('contains all 5 canonical realistic SVG demonstration scenes', () => {
    sceneKeys.forEach((key) => {
      expect(VISUAL_SCENES[key]).toBeDefined();
    });
  });

  it('verifies every scene has valid viewBox and multilingual titles and descriptions', () => {
    sceneKeys.forEach((key) => {
      const s = VISUAL_SCENES[key];
      expect(s.viewBox).toBe('0 0 1200 720');
      expect(s.title.en.length).toBeGreaterThan(0);
      expect(s.title.hi.length).toBeGreaterThan(0);
      expect(s.description.en.length).toBeGreaterThan(0);
      expect(s.description.hi.length).toBeGreaterThan(0);
      expect(s.staticFallback.length).toBeGreaterThan(0);
      expect(['static', 'fade', 'stepwise']).toContain(s.reducedMotionMode);
    });
  });

  it('validates targets for each scene have unique IDs, valid focus orders, and multilingual labels', () => {
    sceneKeys.forEach((key) => {
      const s = VISUAL_SCENES[key];
      expect(s.targets.length).toBeGreaterThan(0);

      const targetIds = new Set<string>();
      s.targets.forEach((target, idx) => {
        expect(targetIds.has(target.id)).toBe(false);
        targetIds.add(target.id);

        expect(target.label.en.length).toBeGreaterThan(0);
        expect(target.label.hi.length).toBeGreaterThan(0);
        expect(target.description.en.length).toBeGreaterThan(0);
        expect(target.description.hi.length).toBeGreaterThan(0);
        expect(target.focusOrder).toBe(idx + 1);
      });
    });
  });

  it('validates animation definitions reference existing target IDs', () => {
    sceneKeys.forEach((key) => {
      const s = VISUAL_SCENES[key];
      const validIds = new Set(s.targets.map((t) => t.id));

      s.animation.forEach((anim) => {
        expect(anim.id.length).toBeGreaterThan(0);
        expect(anim.endMs).toBeGreaterThan(anim.startMs);
        expect(['draw', 'fade', 'pulse', 'reveal', 'trace', 'move']).toContain(anim.action);
        expect(['none', 'show', 'focus']).toContain(anim.reducedMotionAction);

        anim.targetIds.forEach((tid) => {
          expect(validIds.has(tid)).toBe(true);
        });
      });
    });
  });
});
