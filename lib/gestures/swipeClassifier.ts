import { HandLandmarkPoint, SwipeObservation, GestureDirection } from './gestureTypes';

export class SwipeClassifier {
  private history: { point: HandLandmarkPoint; timestamp: number }[] = [];
  private readonly windowDurationMs: number;
  private readonly minDistanceThreshold: number;
  private readonly minVelocityThreshold: number;

  constructor(
    windowDurationMs: number = 220, // Snappy 220ms sliding window
    minDistanceThreshold: number = 0.06, // 6% of screen: effortless finger flick
    minVelocityThreshold: number = 0.00025 // Instant response
  ) {
    this.windowDurationMs = windowDurationMs;
    this.minDistanceThreshold = minDistanceThreshold;
    this.minVelocityThreshold = minVelocityThreshold;
  }

  public addPoint(point: HandLandmarkPoint, timestamp: number = performance.now()): void {
    if (this.history.length > 0) {
      const prev = this.history[this.history.length - 1];
      const jump = Math.hypot(point.x - prev.point.x, point.y - prev.point.y);
      const dt = timestamp - prev.timestamp;
      // Reset if finger disappears and reappears elsewhere
      if (jump > 0.38 && dt < 60) {
        this.history = [];
      }
    }

    this.history.push({ point, timestamp });
    const cutoff = timestamp - this.windowDurationMs;
    this.history = this.history.filter((item) => item.timestamp >= cutoff);
  }

  public classify(): SwipeObservation {
    if (this.history.length < 2) {
      return {
        horizontalDistance: 0,
        verticalDistance: 0,
        velocityX: 0,
        velocityY: 0,
        angleChange: 0,
        confidence: 0,
        durationMs: 0,
        direction: 'none',
        source: 'none',
      };
    }

    const first = this.history[0];
    const last = this.history[this.history.length - 1];

    const dx = last.point.x - first.point.x;
    const dy = last.point.y - first.point.y;
    const dt = Math.max(1, last.timestamp - first.timestamp);

    if (dt < 35) {
      return {
        horizontalDistance: 0,
        verticalDistance: 0,
        velocityX: 0,
        velocityY: 0,
        angleChange: 0,
        confidence: 0,
        durationMs: dt,
        direction: 'none',
        source: 'none',
      };
    }

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const velocityX = absDx / dt;
    const velocityY = absDy / dt;

    let direction: GestureDirection = 'none';
    let source: 'point' | 'swipe' | 'vertical' | 'none' = 'none';
    let confidence = 0;

    // UNIFIED SINGLE-HAND INDEX FINGER 4-WAY CONTROLLER:
    // 1. Horizontal Finger Flick (👈 Left = Forward, 👉 Right = Backward)
    if (absDx >= absDy && (absDx >= this.minDistanceThreshold || velocityX >= this.minVelocityThreshold)) {
      direction = dx < 0 ? 'forward' : 'backward';
      source = 'point';
      confidence = Math.min(1.0, (absDx / this.minDistanceThreshold) * 0.5 + (velocityX / this.minVelocityThreshold) * 0.5);
    }
    // 2. Vertical Finger Flick (👆 Up = Next Kit, 👇 Down = Prev Kit)
    else if (absDy > absDx && (absDy >= this.minDistanceThreshold || velocityY >= this.minVelocityThreshold)) {
      direction = dy < 0 ? 'up' : 'down';
      source = 'vertical';
      confidence = Math.min(1.0, (absDy / this.minDistanceThreshold) * 0.5 + (velocityY / this.minVelocityThreshold) * 0.5);
    }

    return {
      horizontalDistance: dx,
      verticalDistance: dy,
      velocityX,
      velocityY,
      angleChange: 0,
      confidence,
      durationMs: dt,
      direction,
      source,
    };
  }

  public clear(): void {
    this.history = [];
  }
}
