export interface PagePhysicsConfig {
  commitProgress: number;      // e.g. 0.35 (35% drag commits the flip)
  cancelProgress: number;      // e.g. 0.15 (below 15% immediately snaps back)
  velocityThreshold: number;   // e.g. 0.4 px/ms (fast flick commits turn)
  maxRotation: number;         // 180 degrees
  springStiffness: number;     // for spring easing
  springDamping: number;
  dragResistance: number;
}

export const DEFAULT_PHYSICS_CONFIG: PagePhysicsConfig = {
  commitProgress: 0.32,
  cancelProgress: 0.12,
  velocityThreshold: 0.35,
  maxRotation: 180,
  springStiffness: 280,
  springDamping: 24,
  dragResistance: 0.95,
};
