'use client';

/**
 * Web Audio API based synthesized page-turn sound generator.
 * Produces a realistic, tactile paper rustle and page flutter on page turn
 * without requiring external network audio file dependencies.
 */
let audioCtx: AudioContext | null = null;

export function playPageTurnSound(): void {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx = new AudioContextClass();
    }

    const now = audioCtx.currentTime;

    // Buffer of white noise
    const bufferSize = audioCtx.sampleRate * 0.28; // ~280ms flutter
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Bandpass filter to simulate paper frequency
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.28);
    filter.Q.setValueAtTime(3.0, now);

    // Gain envelope for realistic whoosh/curl decay
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.28);
  } catch (err) {
    // Non-blocking fallback
    console.debug('Page turn audio unavailable', err);
  }
}
