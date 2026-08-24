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
  setAudioProgress: (progress: number) => void;
  unlockFacilitator: (passcode: string) => boolean;
  dismissDragHint: () => void;
}

export const useBookStore = create<BookStoreState>((set, get) => ({
  currentLeafIndex: 0,
  totalLeaves: 8, // Exactly 8 physical leaves = 16 rich pages (Cover to Back Cover)
  turnDirection: null,
  mode: 'reading',
  locale: 'en',
  isAudioPopoverOpen: false,
  isAudioPlaying: false,
  audioProgress: 0,
  facilitatorUnlocked: false,
  hasSeenDragHint: false,

  setLeafIndex: (index: number) => {
    const clamped = Math.max(0, Math.min(get().totalLeaves, index));
    if (clamped !== get().currentLeafIndex) {
      playPageTurnSound();
    }
    set({ currentLeafIndex: clamped });
  },

  nextLeaf: () => {
    if (get().currentLeafIndex < get().totalLeaves) {
      playPageTurnSound();
      const nextIdx = get().currentLeafIndex + 1;
      set({ currentLeafIndex: nextIdx, turnDirection: 'forward' });
    }
  },

  prevLeaf: () => {
    if (get().currentLeafIndex > 0) {
      playPageTurnSound();
      const prevIdx = get().currentLeafIndex - 1;
      set({ currentLeafIndex: prevIdx, turnDirection: 'backward' });
    }
  },

  setMode: (mode: ReaderMode) => set({ mode }),
  setLocale: (locale: Locale) => set({ locale }),
  setAudioPopoverOpen: (isAudioPopoverOpen: boolean) => set({ isAudioPopoverOpen }),
  setAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),
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
