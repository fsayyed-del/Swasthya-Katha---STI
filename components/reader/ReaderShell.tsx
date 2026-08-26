'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Publication, Locale } from '@/src/domain/content/schema';
import { DoublePageFlipBook } from '../book/DoublePageFlipBook';
import { LinearReader } from './LinearReader';
import { FacilitatorReader } from './FacilitatorReader';
import { QuickExitButton } from '../ui/QuickExitButton';
import { ReadingSettingsModal, ReadingSettings } from '../ui/ReadingSettingsModal';
import { CameraStatusIndicator } from '../camera/CameraStatusIndicator';
import { GestureTutorialOverlay } from '../camera/GestureTutorialOverlay';
import { TouchFreeFocusController } from '../camera/TouchFreeFocusController';
import { useCameraGesture } from '@/hooks/useCameraGesture';
import { useBookStore } from '@/lib/state/bookStore';
import { CameraGestureCommand } from '@/lib/gestures/gestureTypes';
import { Lock } from 'lucide-react';

interface ReaderShellProps {
  publication?: Publication;
  initialLocale?: Locale;
}

export const ReaderShell: React.FC<ReaderShellProps> = ({
  initialLocale = 'en',
}) => {
  const {
    locale,
    setLocale,
    mode,
    nextLeaf,
    prevLeaf,
    facilitatorUnlocked,
    unlockFacilitator,
  } = useBookStore();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showFacilitatorPrompt, setShowFacilitatorPrompt] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Camera Gesture State (Default inactive so user lands directly on clean Cover page with zero popups)
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleCameraCommand = useCallback((cmd: CameraGestureCommand) => {
    if (cmd.type === 'GESTURE_COMMIT') {
      if (cmd.direction === 'forward') {
        nextLeaf();
      } else if (cmd.direction === 'backward') {
        prevLeaf();
      }
      setShowTutorial(false);
    } else if (cmd.type === 'CAMERA_STOP' || cmd.type === 'CAMERA_ERROR') {
      setIsCameraEnabled(false);
    }
  }, [nextLeaf, prevLeaf]);

  const { state: cameraState, lastDirection, lastSource, stopCamera } = useCameraGesture({
    enabled: isCameraEnabled,
    onCommand: handleCameraCommand,
  });

  const [settings, setSettings] = useState<ReadingSettings>({
    textScale: 'normal',
    contrastMode: 'paper',
    motionProfile: 'full',
    readerMode: 'magazine',
  });

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockFacilitator(enteredPin)) {
      setShowFacilitatorPrompt(false);
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  const getContainerClasses = () => {
    let classes = 'min-h-screen transition-colors duration-300 font-body ';
    if (settings.contrastMode === 'dark') {
      classes += 'bg-[#06181A] text-[#F7F1E4] ';
    } else if (settings.contrastMode === 'high-contrast') {
      classes += 'bg-white text-black font-semibold ';
    } else {
      classes += 'bg-[#E8DFCE] text-[#1B1B18] ';
    }

    if (settings.textScale === 'large') {
      classes += 'text-lg ';
    } else if (settings.textScale === 'xlarge') {
      classes += 'text-xl ';
    } else {
      classes += 'text-base ';
    }
    return classes;
  };

  return (
    <div className={`${getContainerClasses()} relative overflow-x-hidden select-none`}>
      {/* Top Left Floating Bar: Camera Hand Gestures Status & Re-open Tutorial */}
      <nav className="fixed top-3 left-3 z-50 flex items-center gap-2">
        <CameraStatusIndicator
          isActive={isCameraEnabled && cameraState === 'READY'}
          lastDirection={lastDirection}
          lastSource={lastSource}
          onStop={() => {
            stopCamera();
            setIsCameraEnabled(false);
          }}
          onOpenModal={() => {
            setIsCameraEnabled(true);
            setShowTutorial(true);
          }}
          locale={locale}
        />
      </nav>

      {/* Minimal Top-Right Privacy Exit Button */}
      <nav className="fixed top-3 right-3 z-50">
        <QuickExitButton locale={locale} />
      </nav>

      {/* Main Reading Stage (Double-page on Desktop/Tablet, Single-page on Mobile) */}
      <main className="w-screen h-screen p-0 m-0 overflow-hidden flex items-center justify-center">
        {mode === 'reading' && (
          <DoublePageFlipBook
            locale={locale}
            onLocaleChange={setLocale}
          />
        )}

        {mode === 'linear' && (
          <LinearReader
            lessons={[]}
            locale={locale}
          />
        )}

        {mode === 'facilitator' && (
          <FacilitatorReader
            lessons={[]}
            locale={locale}
          />
        )}
      </main>

      {/* Touch-Free Full Focus (Shift+Tab) Controller Overlay */}
      <TouchFreeFocusController locale={locale} />

      {/* Hand Gesture Swipe & Tilt Animated Tutorial Overlay (only shown when user clicks camera) */}
      <GestureTutorialOverlay
        isOpen={showTutorial}
        onDismiss={() => setShowTutorial(false)}
        locale={locale}
      />

      {/* Settings Modal */}
      <ReadingSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
        locale={locale}
      />

      {/* Facilitator Access Passcode Modal */}
      {showFacilitatorPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-paper border border-brass/50 rounded-2xl max-w-xs w-full p-5 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 border-b border-brass/40 pb-2">
              <Lock className="w-5 h-5 text-coral" />
              <h3 className="font-bold text-sm text-ink-teal">Facilitator Access Guard</h3>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              Clinical dosages are restricted to certified healthcare staff. Enter staff PIN (e.g. <code className="bg-paper-shadow px-1 rounded font-bold">suraksha2026</code> or <code className="bg-paper-shadow px-1 rounded font-bold">1097</code>) to unlock.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter PIN..."
                className="w-full px-3 py-2 border border-brass/40 rounded-xl text-xs bg-white text-ink focus:outline-none focus:ring-2 focus:ring-ink-teal"
                autoFocus
              />
              {pinError && (
                <div className="text-[11px] text-coral font-semibold">Incorrect PIN. Try 'suraksha2026' or '1097'.</div>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFacilitatorPrompt(false)}
                  className="flex-1 py-1.5 bg-paper-shadow text-ink rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 bg-ink-teal text-paper rounded-xl text-xs font-bold hover:bg-teal-dark"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
