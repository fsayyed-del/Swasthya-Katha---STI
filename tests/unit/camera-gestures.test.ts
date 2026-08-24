import { describe, it, expect } from 'bun:test';
import { LandmarkSmoother } from '@/lib/gestures/landmarkSmoothing';
import { SwipeClassifier } from '@/lib/gestures/swipeClassifier';

describe('Camera Gesture Recognition & Neutral Reset Invariants', () => {
  it('smooths raw landmark stream without losing responsiveness', () => {
    const smoother = new LandmarkSmoother(0.6);
    const p1 = smoother.smooth({ x: 0.2, y: 0.5 });
    expect(p1.x).toBe(0.2);

    const p2 = smoother.smooth({ x: 0.4, y: 0.5 });
    expect(p2.x).toBeCloseTo(0.32, 2);
  });

  it('classifies a fast leftward hand swipe as forward page turn', () => {
    const classifier = new SwipeClassifier(220, 0.06, 0.00028, 20);
    const now = 1000;

    classifier.addPoint({ x: 0.8, y: 0.5 }, now);
    classifier.addPoint({ x: 0.6, y: 0.5 }, now + 30);
    classifier.addPoint({ x: 0.4, y: 0.5 }, now + 60);

    const obs = classifier.classify();
    expect(obs.direction).toBe('forward');
    expect(obs.confidence).toBeGreaterThanOrEqual(0.7);
  });

  it('classifies a fast rightward hand swipe as backward page turn', () => {
    const classifier = new SwipeClassifier(220, 0.06, 0.00028, 20);
    const now = 1000;

    classifier.addPoint({ x: 0.2, y: 0.5 }, now);
    classifier.addPoint({ x: 0.4, y: 0.5 }, now + 30);
    classifier.addPoint({ x: 0.6, y: 0.5 }, now + 60);

    const obs = classifier.classify();
    expect(obs.direction).toBe('backward');
    expect(obs.confidence).toBeGreaterThanOrEqual(0.7);
  });

  it('classifies vertical upward motion as up option cycle', () => {
    const classifier = new SwipeClassifier(220, 0.06, 0.00028, 20);
    const now = 1000;

    classifier.addPoint({ x: 0.5, y: 0.8 }, now);
    classifier.addPoint({ x: 0.5, y: 0.5 }, now + 30);
    classifier.addPoint({ x: 0.5, y: 0.2 }, now + 60);

    const obs = classifier.classify();
    expect(obs.direction).toBe('up');
  });

  it('ignores static hand angle holding without intentional dynamic flick', () => {
    const classifier = new SwipeClassifier(220, 0.06, 0.00028, 20);
    const now = 1000;

    classifier.addPoint({ x: 0.5, y: 0.5, angle: 15 }, now);
    classifier.addPoint({ x: 0.51, y: 0.5, angle: 15 }, now + 30);
    classifier.addPoint({ x: 0.5, y: 0.51, angle: 15 }, now + 60);

    const obs = classifier.classify();
    expect(obs.direction).toBe('none');
  });
});
