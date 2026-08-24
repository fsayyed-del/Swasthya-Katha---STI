'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { SceneDefinition } from '@/content/visual-scenes/scene-definitions';
import { usePrefersReducedMotion } from './MotionPreference';

interface SceneShellProps {
  scene: SceneDefinition;
  locale: Locale;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const SceneShell: React.FC<SceneShellProps> = ({
  scene,
  locale,
  activeTargetId,
  onTargetClick,
  children,
  className = '',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const title = scene.title[locale] || scene.title.en;
  const desc = scene.description[locale] || scene.description.en;

  return (
    <div className={`scene-shell w-full relative select-none ${className}`}>
      {/* SVG Canvas Frame with Studio Lighting & Noise Filter */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-[#FAF7F0] via-[#F4EDE0] to-[#EAE0CD] rounded-2xl border border-[#D8CEB8] shadow-inner overflow-hidden flex items-center justify-center p-2 sm:p-4">
        <svg
          viewBox={scene.viewBox}
          role="img"
          aria-labelledby={`title-${scene.id} desc-${scene.id}`}
          className="w-full h-full max-h-full transition-transform duration-500"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(16, 53, 58, 0.08))',
          }}
        >
          <title id={`title-${scene.id}`}>{title}</title>
          <desc id={`desc-${scene.id}`}>{desc}</desc>

          {/* SVG Definitions for Gradients, Shadows & Filters */}
          <defs>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="paper-texture">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
              <feComposite in2="SourceGraphic" in="glitch" operator="in" />
            </filter>

            {/* Reusable Visual Gradients */}
            <linearGradient id="grad-teal-rich" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#134E54" />
              <stop offset="100%" stopColor="#0B2B2F" />
            </linearGradient>

            <linearGradient id="grad-gold-warm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="grad-mint-fresh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#6EE7B7" />
            </linearGradient>

            <linearGradient id="grad-card-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F8F5EE" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Render Scene Layers */}
          {children}
        </svg>
      </div>
    </div>
  );
};
