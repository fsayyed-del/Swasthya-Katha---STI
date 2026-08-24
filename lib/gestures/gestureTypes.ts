export type GestureDirection = 'forward' | 'backward' | 'none';

export interface HandLandmarkPoint {
  x: number;
  y: number;
  z?: number;
}

export type CameraGestureCommand =
  | { type: 'GESTURE_START'; direction: 'forward' | 'backward' }
  | { type: 'GESTURE_PROGRESS'; progress: number; direction: 'forward' | 'backward' }
  | { type: 'GESTURE_COMMIT'; direction: 'forward' | 'backward' }
  | { type: 'GESTURE_CANCEL' }
  | { type: 'CAMERA_READY' }
  | { type: 'CAMERA_STOP' }
  | { type: 'CAMERA_ERROR'; error: string };

export interface SwipeObservation {
  horizontalDistance: number;
  verticalDistance: number;
  velocityX: number;
  confidence: number;
  durationMs: number;
  direction: GestureDirection;
}

export type CameraGestureState =
  | 'CAMERA_OFF'
  | 'REQUESTING_PERMISSION'
  | 'READY'
  | 'TRACKING'
  | 'HORIZONTAL_INTENT'
  | 'COMMITTING'
  | 'COOLDOWN'
  | 'ERROR';
