import { HandLandmarkPoint, SwipeObservation, GestureDirection } from './gestureTypes';

export class SwipeClassifier {
  private history: { point: HandLandmarkPoint; timestamp: number }[] = [];
  private readonly windowDurationMs: number;
  private readonly minDistanceThreshold: number;
  private readonly minVelocityThreshold: number;
  private readonly verticalConstraintRatio: number;

  constructor(
    windowDurationMs: number = 400,
    minDistanceThreshold: number = 0.18, // 18% of frame width
    minVelocityThreshold: number = 0.0006, // normalized pixels/ms
    verticalConstraintRatio: number = 1.4
  ) {
    this.windowDurationMs = windowDurationMs;
    this.minDistanceThreshold = minDistanceThreshold;
    this.minVelocityThreshold = minVelocityThreshold;
    this.verticalConstraintRatio = verticalConstraintRatio;
  }

  public addPoint(point: HandLandmarkPoint, timestamp: number = performance.now()): void {
    this.history.push({ point, timestamp });
    // Keep only points within windowDurationMs
    const cutoff = timestamp - this.windowDurationMs;
    this.history = this.history.filter((item) => item.timestamp >= cutoff);
  }

  public classify(): SwipeObservation {
    if (this.history.length < 3) {
      return {
        horizontalDistance: 0,
        verticalDistance: 0,
        velocityX: 0,
        confidence: 0,
        durationMs: 0,
        direction: 'none',
      };
    }

    const first = this.history[0];
    const last = this.history[this.history.length - 1];

    const dx = last.point.x - first.point.x;
    const dy = last.point.y - first.point.y;
    const dt = Math.max(1, last.timestamp - first.timestamp);

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const velocityX = absDx / dt;

    // Check if horizontal intent dominates vertical motion
    const isHorizontal = absDx > absDy * this.verticalConstraintRatio;
    const hasEnoughDistance = absDx >= this.minDistanceThreshold;
    const hasEnoughVelocity = velocityX >= this.minVelocityThreshold;

    let direction: GestureDirection = 'none';
    let confidence = 0;

    if (isHorizontal && (hasEnoughDistance || hasEnoughVelocity)) {
      // In mirrored webcam:
      // Hand moving left on screen (dx < 0) -> Next Page (forward)
      // Hand moving right on screen (dx > 0) -> Previous Page (backward)
      direction = dx < 0 ? 'forward' : 'backward';
      confidence = Math.min(1.0, (absDx / this.minDistanceThreshold) * 0.7 + (velocityX / this.minVelocityThreshold) * 0.3);
    }

    return {
      horizontalDistance: dx,
      verticalDistance: dy,
      velocityX,
      confidence,
      durationMs: dt,
      direction,
    };
  }

  public clear(): void {
    this.history = [];
  }
}
