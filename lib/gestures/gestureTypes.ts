export type GestureDirection = 'forward' | 'backward' | 'up' | 'down' | 'hold' | 'point' | 'fist' | 'none';

export interface HandLandmarkPoint {
  x: number;
  y: number;
  z?: number;
  angle?: number;
  aspectRatio?: number; // Height / Width (e.g. > 1.4 for index finger)
  isPointing?: boolean;
}

export type CameraGestureCommand =
  | { type: 'GESTURE_COMMIT'; direction: 'forward' | 'backward'; source?: 'swipe' | 'tilt' | 'vertical' | 'hold' | 'point' | 'fist' }
  | { type: 'GESTURE_CYCLE_OPTION'; direction: 'next' | 'prev' }
  | { type: 'GESTURE_AUDIO_TOGGLE' }
  | { type: 'GESTURE_FOCUS_TOGGLE'; active?: boolean }
  | { type: 'GESTURE_FOCUS_SELECT' }
  | { type: 'GESTURE_FOCUS_NAVIGATE'; direction: 'next' | 'prev' }
  | { type: 'CAMERA_READY' }
  | { type: 'CAMERA_STOP' }
  | { type: 'CAMERA_ERROR'; error: string };

export interface SwipeObservation {
  horizontalDistance: number;
  verticalDistance: number;
  velocityX: number;
  velocityY: number;
  angleChange: number;
  confidence: number;
  durationMs: number;
  direction: GestureDirection;
  source: 'swipe' | 'tilt' | 'vertical' | 'hold' | 'point' | 'fist' | 'none';
}

export type CameraGestureState =
  | 'CAMERA_OFF'
  | 'REQUESTING_PERMISSION'
  | 'READY'
  | 'TRACKING'
  | 'COMMITTING'
  | 'COOLDOWN'
  | 'ERROR';
