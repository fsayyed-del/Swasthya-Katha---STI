'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CameraGestureCommand, CameraGestureState } from '@/lib/gestures/gestureTypes';
import { LandmarkSmoother } from '@/lib/gestures/landmarkSmoothing';
import { SwipeClassifier } from '@/lib/gestures/swipeClassifier';

export interface UseCameraGestureOptions {
  enabled: boolean;
  onCommand: (cmd: CameraGestureCommand) => void;
  cooldownMs?: number;
}

export function useCameraGesture({
  enabled,
  onCommand,
  cooldownMs = 800,
}: UseCameraGestureOptions) {
  const [state, setState] = useState<CameraGestureState>('CAMERA_OFF');
  const [lastDirection, setLastDirection] = useState<'forward' | 'backward' | 'up' | 'down' | 'hold' | 'point' | 'fist' | null>(null);
  const [lastSource, setLastSource] = useState<'swipe' | 'tilt' | 'vertical' | 'hold' | 'point' | 'fist' | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const smootherRef = useRef(new LandmarkSmoother(0.55));
  const classifierRef = useRef(new SwipeClassifier(240, 0.08, 0.0003));
  const lastCommitTimeRef = useRef(0);
  const isNeutralArmedRef = useRef(true);

  // Focus Mode state (Shift+Tab touch-free control)
  const isFocusModeActiveRef = useRef(false);

  // Deliberate Hand Raise tracking for Audio Palm Hold
  const hasHandMovedRecentlyRef = useRef(false);
  const palmHoldStartTimeRef = useRef<number | null>(null);
  const palmHoldPosRef = useRef<{ x: number; y: number } | null>(null);

  // Open Palm to Fist Pulse Tracker (for Focus Mode toggle & Selection)
  const wasPalmOpenRef = useRef(false);
  const palmOpenTimestampRef = useRef(0);
  const lastPulseTimeRef = useRef(0);
  const pulsePendingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    smootherRef.current.reset();
    classifierRef.current.clear();
    setState('CAMERA_OFF');
    setLastDirection(null);
    setLastSource(null);
    onCommand({ type: 'CAMERA_STOP' });
  }, [onCommand]);

  useEffect(() => {
    if (!enabled) {
      stopCamera();
      return;
    }

    let stream: MediaStream | null = null;
    let animId: number;
    let isCancelled = false;

    async function initCamera() {
      try {
        setState('REQUESTING_PERMISSION');
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 320 },
            height: { ideal: 240 },
            frameRate: { ideal: 30 },
          },
          audio: false,
        });

        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        if (!videoRef.current) {
          videoRef.current = document.createElement('video');
          videoRef.current.playsInline = true;
          videoRef.current.muted = true;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        if (!canvasRef.current) {
          canvasRef.current = document.createElement('canvas');
          canvasRef.current.width = 160;
          canvasRef.current.height = 120;
        }

        setState('READY');
        onCommand({ type: 'CAMERA_READY' });

        const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
        let prevImageData: Uint8ClampedArray | null = null;

        const processFrame = () => {
          if (isCancelled || !videoRef.current || videoRef.current.readyState < 2) {
            animId = requestAnimationFrame(processFrame);
            return;
          }

          const canvas = canvasRef.current!;
          const width = canvas.width;
          const height = canvas.height;

          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, width, height);
            const frame = ctx.getImageData(0, 0, width, height);
            const data = frame.data;

            let skinSumX = 0;
            let skinSumY = 0;
            let skinPixelCount = 0;

            let motionPixelCount = 0;
            let motionSumX = 0;
            let motionSumY = 0;

            for (let i = 0; i < data.length; i += 16) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              // Skin Color Presence Detection
              const isSkin =
                r > 60 &&
                g > 35 &&
                b > 20 &&
                r > g &&
                g > b &&
                r - g > 10 &&
                Math.abs(r - b) > 14;

              const pixelIdx = i / 4;
              const px = pixelIdx % width;
              const py = Math.floor(pixelIdx / width);

              if (isSkin) {
                skinSumX += px;
                skinSumY += py;
                skinPixelCount++;
              }

              // Motion Difference Detection
              if (prevImageData) {
                const prevR = prevImageData[i];
                const prevG = prevImageData[i + 1];
                const prevB = prevImageData[i + 2];
                const diff = Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);

                if (diff > 35 && isSkin) {
                  motionSumX += px;
                  motionSumY += py;
                  motionPixelCount++;
                }
              }
            }

            prevImageData = new Uint8ClampedArray(data);
            const now = performance.now();

            if (motionPixelCount >= 25) {
              hasHandMovedRecentlyRef.current = true;
            }

            // Settle / Re-arm check
            if (motionPixelCount < 12 && now - lastCommitTimeRef.current > cooldownMs) {
              isNeutralArmedRef.current = true;
            }

            // 1. OPEN PALM TO FIST TRANSITION DETECTION (✋ ➜ ✊)
            if (skinPixelCount >= 230) {
              wasPalmOpenRef.current = true;
              palmOpenTimestampRef.current = now;
            } else if (
              wasPalmOpenRef.current &&
              skinPixelCount <= 140 &&
              now - palmOpenTimestampRef.current <= 600 &&
              now - lastCommitTimeRef.current > 450
            ) {
              // Registered Open Palm -> Close Fist transition
              wasPalmOpenRef.current = false;
              lastCommitTimeRef.current = now;
              setLastDirection('fist');
              setLastSource('fist');

              const timeSinceLastPulse = now - lastPulseTimeRef.current;
              lastPulseTimeRef.current = now;

              if (!isFocusModeActiveRef.current) {
                // Focus mode is OFF -> Activate Focus Mode
                isFocusModeActiveRef.current = true;
                onCommand({ type: 'GESTURE_FOCUS_TOGGLE', active: true });
                window.dispatchEvent(new CustomEvent('gesture:focus-mode-toggle', { detail: { active: true } }));
              } else {
                // Focus mode is ON: Check single vs double pulse
                if (timeSinceLastPulse < 1200) {
                  // Double Pulse -> Exit Focus Mode
                  if (pulsePendingTimerRef.current) {
                    clearTimeout(pulsePendingTimerRef.current);
                    pulsePendingTimerRef.current = null;
                  }
                  isFocusModeActiveRef.current = false;
                  onCommand({ type: 'GESTURE_FOCUS_TOGGLE', active: false });
                  window.dispatchEvent(new CustomEvent('gesture:focus-mode-toggle', { detail: { active: false } }));
                } else {
                  // Single Pulse -> Select / Click focused item
                  pulsePendingTimerRef.current = setTimeout(() => {
                    if (isFocusModeActiveRef.current) {
                      onCommand({ type: 'GESTURE_FOCUS_SELECT' });
                      window.dispatchEvent(new CustomEvent('gesture:focus-select'));
                    }
                    pulsePendingTimerRef.current = null;
                  }, 400);
                }
              }
            }

            // 2. DELIBERATE PALM HOLD AUDIO TOGGLE (Only when not in focus mode)
            if (!isFocusModeActiveRef.current && skinPixelCount >= 220 && hasHandMovedRecentlyRef.current) {
              const palmMeanX = skinSumX / skinPixelCount / width;
              const palmMeanY = skinSumY / skinPixelCount / height;

              if (motionPixelCount < 16) {
                if (!palmHoldStartTimeRef.current) {
                  palmHoldStartTimeRef.current = now;
                  palmHoldPosRef.current = { x: palmMeanX, y: palmMeanY };
                } else if (palmHoldPosRef.current) {
                  const holdDrift = Math.hypot(palmMeanX - palmHoldPosRef.current.x, palmMeanY - palmHoldPosRef.current.y);
                  if (holdDrift < 0.05 && now - palmHoldStartTimeRef.current >= 850 && isNeutralArmedRef.current && now - lastCommitTimeRef.current > cooldownMs) {
                    lastCommitTimeRef.current = now;
                    isNeutralArmedRef.current = false;
                    palmHoldStartTimeRef.current = null;
                    hasHandMovedRecentlyRef.current = false;
                    setLastDirection('hold');
                    setLastSource('hold');
                    onCommand({ type: 'GESTURE_AUDIO_TOGGLE' });
                    window.dispatchEvent(new CustomEvent('gesture:audio-toggle'));
                  }
                }
              } else {
                palmHoldStartTimeRef.current = null;
              }
            } else {
              palmHoldStartTimeRef.current = null;
            }

            // 3. DYNAMIC INDEX FINGER NAVIGATION
            if (motionPixelCount >= 20) {
              const meanX = motionSumX / motionPixelCount / width;
              const meanY = motionSumY / motionPixelCount / height;

              const smoothed = smootherRef.current.smooth({
                x: meanX,
                y: meanY,
              });
              classifierRef.current.addPoint(smoothed, now);

              const obs = classifierRef.current.classify();
              const timeSinceCommit = now - lastCommitTimeRef.current;

              if (obs.direction !== 'none' && obs.confidence >= 0.6 && isNeutralArmedRef.current && timeSinceCommit > cooldownMs) {
                lastCommitTimeRef.current = now;
                isNeutralArmedRef.current = false;
                palmHoldStartTimeRef.current = null;
                setLastDirection(obs.direction);
                setLastSource(obs.source === 'none' ? null : obs.source);

                if (isFocusModeActiveRef.current) {
                  // In Focus Mode: Hand motions navigate Shift+Tab focus
                  const navDir = obs.direction === 'forward' || obs.direction === 'down' ? 'next' : 'prev';
                  onCommand({ type: 'GESTURE_FOCUS_NAVIGATE', direction: navDir });
                  window.dispatchEvent(new CustomEvent('gesture:focus-navigate', { detail: { direction: navDir } }));
                } else {
                  // Normal Reading Mode: Page flips & option cycles
                  if (obs.direction === 'forward' || obs.direction === 'backward') {
                    onCommand({
                      type: 'GESTURE_COMMIT',
                      direction: obs.direction,
                      source: obs.source === 'none' ? undefined : obs.source,
                    });
                  } else if (obs.direction === 'up' || obs.direction === 'down') {
                    const cycleDir = obs.direction === 'up' ? 'next' : 'prev';
                    onCommand({ type: 'GESTURE_CYCLE_OPTION', direction: cycleDir });
                    window.dispatchEvent(new CustomEvent('gesture:cycle-option', { detail: { direction: cycleDir } }));
                  }
                }

                classifierRef.current.clear();
                smootherRef.current.reset();
              }
            }
          }

          animId = requestAnimationFrame(processFrame);
        };

        animId = requestAnimationFrame(processFrame);
      } catch (err: any) {
        console.warn('Camera gesture init error:', err);
        setState('ERROR');
        onCommand({ type: 'CAMERA_ERROR', error: err.message || 'Permission denied' });
      }
    }

    initCamera();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enabled, cooldownMs, onCommand, stopCamera]);

  return {
    state,
    lastDirection,
    lastSource,
    stopCamera,
  };
}
