import { HandLandmarkPoint } from './gestureTypes';

/**
 * Exponential Moving Average (EMA) smoothing for hand landmarks.
 */
export class LandmarkSmoother {
  private alpha: number;
  private previousPoint: HandLandmarkPoint | null = null;

  constructor(alpha: number = 0.65) {
    this.alpha = Math.max(0.1, Math.min(1.0, alpha));
  }

  public smooth(current: HandLandmarkPoint): HandLandmarkPoint {
    if (!this.previousPoint) {
      this.previousPoint = { ...current };
      return current;
    }

    const smoothed: HandLandmarkPoint = {
      x: this.alpha * current.x + (1 - this.alpha) * this.previousPoint.x,
      y: this.alpha * current.y + (1 - this.alpha) * this.previousPoint.y,
      z: current.z !== undefined && this.previousPoint.z !== undefined
        ? this.alpha * current.z + (1 - this.alpha) * this.previousPoint.z
        : current.z,
    };

    this.previousPoint = smoothed;
    return smoothed;
  }

  public reset(): void {
    this.previousPoint = null;
  }
}
