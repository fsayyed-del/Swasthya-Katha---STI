import { describe, it, expect } from 'bun:test';
import { LandmarkSmoother } from '@/lib/gestures/landmarkSmoothing';
import { SwipeClassifier } from '@/lib/gestures/swipeClassifier';

describe('Camera Gesture Recognition & Neutral Reset Invariants', () => {
  it('smooths raw landmark stream without losing responsiveness', () => {
    const smoother = new LandmarkSmoother(0.5);
    const p1 = smoother.smooth({ x: 0.2, y: 0.5 });
    expect(p1.x).toBe(0.2);

    const p2 = smoother.smooth({ x: 0.4, y: 0.5 });
    // 0.5 * 0.4 + 0.5 * 0.2 = 0.3
    expect(p2.x).toBeCloseTo(0.3, 2);
  });

  it('classifies a fast leftward hand swipe as forward page turn', () => {
    const classifier = new SwipeClassifier(400, 0.15, 0.0004, 1.2);
    const now = 1000;

    classifier.addPoint({ x: 0.8, y: 0.5 }, now);
    classifier.addPoint({ x: 0.5, y: 0.5 }, now + 100);
    classifier.addPoint({ x: 0.2, y: 0.5 }, now + 200);

    const obs = classifier.classify();
    expect(obs.direction).toBe('forward');
    expect(obs.confidence).toBeGreaterThan(0.6);
  });

  it('classifies a fast rightward hand swipe as backward page turn', () => {
    const classifier = new SwipeClassifier(400, 0.15, 0.0004, 1.2);
    const now = 1000;

    classifier.addPoint({ x: 0.2, y: 0.5 }, now);
    classifier.addPoint({ x: 0.5, y: 0.5 }, now + 100);
    classifier.addPoint({ x: 0.8, y: 0.5 }, now + 200);

    const obs = classifier.classify();
    expect(obs.direction).toBe('backward');
    expect(obs.confidence).toBeGreaterThan(0.6);
  });

  it('ignores vertical head/body nodding motion', () => {
    const classifier = new SwipeClassifier(400, 0.15, 0.0004, 1.2);
    const now = 1000;

    // Movement purely in y (vertical)
    classifier.addPoint({ x: 0.5, y: 0.2 }, now);
    classifier.addPoint({ x: 0.5, y: 0.5 }, now + 100);
    classifier.addPoint({ x: 0.5, y: 0.8 }, now + 200);

    const obs = classifier.classify();
    expect(obs.direction).toBe('none');
  });
});
