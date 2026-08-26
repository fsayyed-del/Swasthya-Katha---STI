import { create } from 'zustand';
import { Locale } from '@/src/domain/content/schema';
import { playPageTurnSound } from '@/lib/audio/pageTurnSound';

export type ReaderMode = 'reading' | 'facilitator' | 'linear';

interface BookStoreState {
  currentLeafIndex: number;
  totalLeaves: number;
  turnDirection: 'forward' | 'backward' | null;
  mode: ReaderMode;
  locale: Locale;
  isAudioPopoverOpen: boolean;
  isAudioPlaying: boolean;
  activeAudioPage: number | null;
  activeAudioSentenceIndex: number;
  audioProgress: number;
  facilitatorUnlocked: boolean;
  hasSeenDragHint: boolean;

  // Actions
  setLeafIndex: (index: number) => void;
  nextLeaf: () => void;
  prevLeaf: () => void;
  setMode: (mode: ReaderMode) => void;
  setLocale: (locale: Locale) => void;
  setAudioPopoverOpen: (open: boolean) => void;
  setAudioPlaying: (playing: boolean) => void;
  setActiveAudioPage: (page: number | null) => void;
  setActiveAudioSentenceIndex: (index: number) => void;
  setAudioProgress: (progress: number) => void;
  unlockFacilitator: (passcode: string) => boolean;
  dismissDragHint: () => void;
}

let lastTurnTimestamp = 0;
const TURN_ANIMATION_LOCK_MS = 750; // Strictly matching CSS 3D turn duration (700ms) to prevent double page flips

export const useBookStore = create<BookStoreState>((set, get) => ({
  currentLeafIndex: 0,
  totalLeaves: 8, // Exactly 8 physical leaves = 16 rich pages (Cover to Back Cover)
  turnDirection: null,
  mode: 'reading',
  locale: 'en',
  isAudioPopoverOpen: false,
  isAudioPlaying: false,
  activeAudioPage: null,
  activeAudioSentenceIndex: 0,
  audioProgress: 0,
  facilitatorUnlocked: false,
  hasSeenDragHint: false,

  setLeafIndex: (index: number) => {
    const clamped = Math.max(0, Math.min(get().totalLeaves, index));
    if (clamped !== get().currentLeafIndex) {
      playPageTurnSound();
    }
    set({ currentLeafIndex: clamped, isAudioPlaying: false, activeAudioPage: null, activeAudioSentenceIndex: 0 });
  },

  nextLeaf: () => {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - lastTurnTimestamp < TURN_ANIMATION_LOCK_MS) {
      return; // Locked during ongoing page turn animation
    }
    if (get().currentLeafIndex < get().totalLeaves) {
      lastTurnTimestamp = now;
      playPageTurnSound();
      const nextIdx = get().currentLeafIndex + 1;
      set({ currentLeafIndex: nextIdx, turnDirection: 'forward', isAudioPlaying: false, activeAudioPage: null, activeAudioSentenceIndex: 0 });
    }
  },

  prevLeaf: () => {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - lastTurnTimestamp < TURN_ANIMATION_LOCK_MS) {
      return; // Locked during ongoing page turn animation
    }
    if (get().currentLeafIndex > 0) {
      lastTurnTimestamp = now;
      playPageTurnSound();
      const prevIdx = get().currentLeafIndex - 1;
      set({ currentLeafIndex: prevIdx, turnDirection: 'backward', isAudioPlaying: false, activeAudioPage: null, activeAudioSentenceIndex: 0 });
    }
  },

  setMode: (mode: ReaderMode) => set({ mode }),
  setLocale: (locale: Locale) => set({ locale }),
  setAudioPopoverOpen: (isAudioPopoverOpen: boolean) => set({ isAudioPopoverOpen }),
  setAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
  setActiveAudioPage: (activeAudioPage: number | null) => set({ activeAudioPage }),
  setActiveAudioSentenceIndex: (activeAudioSentenceIndex: number) => set({ activeAudioSentenceIndex }),
  setAudioProgress: (audioProgress: number) => set({ audioProgress }),

  unlockFacilitator: (passcode: string) => {
    if (passcode.trim().toLowerCase() === 'suraksha2026' || passcode.trim() === '1097') {
      set({ facilitatorUnlocked: true, mode: 'facilitator' });
      return true;
    }
    return false;
  },

  dismissDragHint: () => set({ hasSeenDragHint: true }),
}));
