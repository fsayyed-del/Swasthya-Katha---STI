import { describe, it, expect } from 'vitest';
import { pageTurnReducer, initialPageTurnState } from '@/components/book/pageTurnReducer';

describe('pageTurnReducer FSM tests', () => {
  it('starts in IDLE state', () => {
    expect(initialPageTurnState.state).toBe('IDLE');
    expect(initialPageTurnState.progress).toBe(0);
    expect(initialPageTurnState.rotationAngle).toBe(0);
  });

  it('transitions from IDLE to PRESSED on POINTER_DOWN', () => {
    const nextState = pageTurnReducer(initialPageTurnState, {
      type: 'POINTER_DOWN',
      x: 300,
      y: 200,
      leafIndex: 0,
      direction: 'forward',
    });

    expect(nextState.state).toBe('PRESSED');
    expect(nextState.startX).toBe(300);
    expect(nextState.startY).toBe(200);
    expect(nextState.direction).toBe('forward');
  });

  it('locks direction and enters DRAGGING on horizontal movement past threshold', () => {
    const pressedState = pageTurnReducer(initialPageTurnState, {
      type: 'POINTER_DOWN',
      x: 300,
      y: 200,
      leafIndex: 0,
      direction: 'forward',
    });

    // Move left by 50px (horizontal dominant)
    const draggingState = pageTurnReducer(pressedState, {
      type: 'POINTER_MOVE',
      x: 250,
      y: 202,
      containerWidth: 400,
      intentThreshold: 10,
    });

    expect(draggingState.state).toBe('DRAGGING');
    expect(draggingState.isDirectionLocked).toBe(true);
    expect(draggingState.isVerticalScroll).toBe(false);
    expect(draggingState.progress).toBeGreaterThan(0);
    expect(draggingState.rotationAngle).toBeGreaterThan(0);
  });

  it('permits vertical scroll and returns to IDLE if vertical movement is dominant', () => {
    const pressedState = pageTurnReducer(initialPageTurnState, {
      type: 'POINTER_DOWN',
      x: 300,
      y: 200,
      leafIndex: 0,
      direction: 'forward',
    });

    // Move down by 40px, horizontal by 2px (vertical dominant)
    const verticalState = pageTurnReducer(pressedState, {
      type: 'POINTER_MOVE',
      x: 302,
      y: 240,
      containerWidth: 400,
      intentThreshold: 10,
    });

    expect(verticalState.state).toBe('IDLE');
    expect(verticalState.isDirectionLocked).toBe(true);
    expect(verticalState.isVerticalScroll).toBe(true);
  });

  it('commits turn to COMPLETING on POINTER_UP if progress exceeds threshold', () => {
    const draggingState = {
      ...initialPageTurnState,
      state: 'DRAGGING' as const,
      direction: 'forward' as const,
      progress: 0.45, // > 0.32
      rotationAngle: 81,
    };

    const nextState = pageTurnReducer(draggingState, {
      type: 'POINTER_UP',
      velocityX: -0.1,
      commitThreshold: 0.32,
    });

    expect(nextState.state).toBe('COMPLETING');
    expect(nextState.progress).toBe(1);
    expect(nextState.rotationAngle).toBe(180);
  });

  it('snaps back to SNAPPING_BACK on POINTER_UP if progress is below threshold', () => {
    const draggingState = {
      ...initialPageTurnState,
      state: 'DRAGGING' as const,
      direction: 'forward' as const,
      progress: 0.15, // < 0.32
      rotationAngle: 27,
    };

    const nextState = pageTurnReducer(draggingState, {
      type: 'POINTER_UP',
      velocityX: 0,
      commitThreshold: 0.32,
    });

    expect(nextState.state).toBe('SNAPPING_BACK');
    expect(nextState.progress).toBe(0);
    expect(nextState.rotationAngle).toBe(0);
  });

  it('handles idempotent double POINTER_UP without crashing', () => {
    const settledState = {
      ...initialPageTurnState,
      state: 'SETTLED' as const,
    };

    const nextState = pageTurnReducer(settledState, {
      type: 'POINTER_UP',
      velocityX: 0,
    });

    expect(nextState.state).toBe('SETTLED');
  });
});
