export type GestureState =
  | 'IDLE'
  | 'PRESSED'
  | 'DRAGGING'
  | 'SNAPPING_BACK'
  | 'COMPLETING'
  | 'SETTLED';

export interface PageTurnState {
  state: GestureState;
  activeLeafIndex: number;
  direction: 'forward' | 'backward' | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  progress: number; // 0.0 to 1.0
  rotationAngle: number; // 0 to 180 degrees
  releaseVelocity: number;
  isDirectionLocked: boolean;
  isVerticalScroll: boolean;
}

export type PageTurnAction =
  | { type: 'POINTER_DOWN'; x: number; y: number; leafIndex: number; direction: 'forward' | 'backward' }
  | { type: 'POINTER_MOVE'; x: number; y: number; containerWidth: number; intentThreshold?: number }
  | { type: 'POINTER_UP'; velocityX: number; commitThreshold?: number; velocityThreshold?: number }
  | { type: 'POINTER_CANCEL' }
  | { type: 'ANIMATION_SETTLED'; finalLeafIndex: number };

export const initialPageTurnState: PageTurnState = {
  state: 'IDLE',
  activeLeafIndex: 0,
  direction: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  progress: 0,
  rotationAngle: 0,
  releaseVelocity: 0,
  isDirectionLocked: false,
  isVerticalScroll: false,
};

export function pageTurnReducer(state: PageTurnState, action: PageTurnAction): PageTurnState {
  switch (action.type) {
    case 'POINTER_DOWN': {
      if (state.state !== 'IDLE' && state.state !== 'SETTLED') {
        return state; // ignore if already turning
      }
      return {
        ...initialPageTurnState,
        state: 'PRESSED',
        activeLeafIndex: action.leafIndex,
        direction: action.direction,
        startX: action.x,
        startY: action.y,
        currentX: action.x,
        currentY: action.y,
        progress: 0,
        rotationAngle: 0,
      };
    }

    case 'POINTER_MOVE': {
      if (state.state !== 'PRESSED' && state.state !== 'DRAGGING') {
        return state;
      }

      const dx = action.x - state.startX;
      const dy = action.y - state.startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const intentThreshold = action.intentThreshold ?? 10;

      // Lock direction if not yet locked
      if (!state.isDirectionLocked) {
        if (absDy > absDx && absDy > intentThreshold) {
          // Vertical dominant movement: permit standard browser scrolling
          return {
            ...state,
            isDirectionLocked: true,
            isVerticalScroll: true,
            state: 'IDLE',
          };
        }
        if (absDx > intentThreshold) {
          const width = Math.max(200, action.containerWidth);
          let calculatedProgress = 0;
          if (state.direction === 'forward') {
            const dragDist = Math.max(0, -dx);
            calculatedProgress = Math.min(1, Math.max(0, dragDist / width));
          } else if (state.direction === 'backward') {
            const dragDist = Math.max(0, dx);
            calculatedProgress = Math.min(1, Math.max(0, dragDist / width));
          }
          const rotationAngle = calculatedProgress * 180;

          return {
            ...state,
            isDirectionLocked: true,
            isVerticalScroll: false,
            state: 'DRAGGING',
            currentX: action.x,
            currentY: action.y,
            progress: calculatedProgress,
            rotationAngle,
          };
        }
        return {
          ...state,
          currentX: action.x,
          currentY: action.y,
        };
      }

      if (state.isVerticalScroll) {
        return state;
      }

      // Calculate progress (0.0 to 1.0)
      const width = Math.max(200, action.containerWidth);
      let calculatedProgress = 0;

      if (state.direction === 'forward') {
        // Dragging leftward (negative dx)
        const dragDist = Math.max(0, -dx);
        calculatedProgress = Math.min(1, Math.max(0, dragDist / width));
      } else if (state.direction === 'backward') {
        // Dragging rightward (positive dx)
        const dragDist = Math.max(0, dx);
        calculatedProgress = Math.min(1, Math.max(0, dragDist / width));
      }

      const rotationAngle = calculatedProgress * 180;

      return {
        ...state,
        state: 'DRAGGING',
        currentX: action.x,
        currentY: action.y,
        progress: calculatedProgress,
        rotationAngle,
      };
    }

    case 'POINTER_UP': {
      if (state.state !== 'DRAGGING' && state.state !== 'PRESSED') {
        return state;
      }

      const commitThreshold = action.commitThreshold ?? 0.32;
      const velocityThreshold = action.velocityThreshold ?? 0.35;
      const speed = Math.abs(action.velocityX);

      const shouldCommit = state.progress >= commitThreshold || speed >= velocityThreshold;

      if (shouldCommit) {
        return {
          ...state,
          state: 'COMPLETING',
          releaseVelocity: action.velocityX,
          progress: 1,
          rotationAngle: 180,
        };
      }

      return {
        ...state,
        state: 'SNAPPING_BACK',
        releaseVelocity: action.velocityX,
        progress: 0,
        rotationAngle: 0,
      };
    }

    case 'POINTER_CANCEL': {
      return {
        ...state,
        state: 'SNAPPING_BACK',
        progress: 0,
        rotationAngle: 0,
      };
    }

    case 'ANIMATION_SETTLED': {
      return {
        ...initialPageTurnState,
        state: 'SETTLED',
        activeLeafIndex: action.finalLeafIndex,
      };
    }

    default:
      return state;
  }
}
