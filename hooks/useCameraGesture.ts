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
  const [lastDirection, setLastDirection] = useState<'forward' | 'backward' | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const smootherRef = useRef(new LandmarkSmoother(0.65));
  const classifierRef = useRef(new SwipeClassifier(400, 0.16, 0.0005, 1.3));
  const lastCommitTimeRef = useRef(0);
  const isNeutralRef = useRef(true);

  // Stop camera tracks cleanly
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
            frameRate: { ideal: 24, max: 30 },
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

        // Optical Hand Movement Analysis Loop
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

            let motionSumX = 0;
            let motionSumY = 0;
            let motionPixelCount = 0;

            if (prevImageData) {
              // Frame differencing & skin-tone luminance filter for gesture center
              for (let i = 0; i < data.length; i += 16) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                const prevR = prevImageData[i];
                const prevG = prevImageData[i + 1];
                const prevB = prevImageData[i + 2];

                const diff = Math.abs(r - prevR) + Math.abs(g - prevG) + Math.abs(b - prevB);

                // Check for intentional movement with skin-like tone
                if (diff > 45 && r > g && g > b) {
                  const pixelIdx = i / 4;
                  const px = pixelIdx % width;
                  const py = Math.floor(pixelIdx / width);

                  motionSumX += px;
                  motionSumY += py;
                  motionPixelCount++;
                }
              }
            }

            // Save previous frame
            prevImageData = new Uint8ClampedArray(data);

            const now = performance.now();

            if (motionPixelCount > 40) {
              const rawX = (motionSumX / motionPixelCount) / width;
              const rawY = (motionSumY / motionPixelCount) / height;

              const smoothed = smootherRef.current.smooth({ x: rawX, y: rawY });
              classifierRef.current.addPoint(smoothed, now);

              const obs = classifierRef.current.classify();

              // Check if neutral state is satisfied after cooldown
              const timeSinceCommit = now - lastCommitTimeRef.current;
              if (timeSinceCommit > cooldownMs) {
                isNeutralRef.current = true;
              }

              if (obs.direction !== 'none' && obs.confidence > 0.6 && isNeutralRef.current && timeSinceCommit > cooldownMs) {
                // Trigger commit
                lastCommitTimeRef.current = now;
                isNeutralRef.current = false;
                setLastDirection(obs.direction);
                onCommand({ type: 'GESTURE_COMMIT', direction: obs.direction });

                // Reset classifier
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
    stopCamera,
  };
}
