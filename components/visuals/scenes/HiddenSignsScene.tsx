'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { VISUAL_SCENES } from '@/content/visual-scenes/scene-definitions';
import { SceneShell } from '../SceneShell';
import { SceneTarget } from '../SceneTarget';
import { SceneDescription } from '../SceneDescription';
import { LayerReveal } from '../LayerReveal';

interface HiddenSignsSceneProps {
  locale: Locale;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
}

export const HiddenSignsScene: React.FC<HiddenSignsSceneProps> = ({
  locale,
  activeTargetId: externalTargetId,
  onTargetClick,
}) => {
  const scene = VISUAL_SCENES['hidden-signs'];
  const [internalTargetId, setInternalTargetId] = useState<string>('target-hidden-pathogens');
  const [isLensRevealed, setIsLensRevealed] = useState<boolean>(true);
  const activeId = externalTargetId || internalTargetId;

  const handleSelect = (id: string) => {
    setInternalTargetId(id);
    if (id === 'target-hidden-pathogens') {
      setIsLensRevealed(true);
    }
    onTargetClick?.(id);
  };

  const currentTarget = scene.targets.find((t) => t.id === activeId);

  return (
    <div className="w-full space-y-2 select-none">
      <SceneShell scene={scene} locale={locale} activeTargetId={activeId} onTargetClick={handleSelect}>
        {/* Ambient Grid Lines */}
        <g opacity="0.3">
          <line x1="100" y1="360" x2="1100" y2="360" stroke="#D8CEB8" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="600" y1="80" x2="600" y2="640" stroke="#D8CEB8" strokeWidth="1" strokeDasharray="6 6" />
        </g>

        {/* Left Side: Healthy External Appearance Silhouette */}
        <g id="person-silhouette" transform="translate(360, 360)">
          {/* Outer Aura */}
          <circle cx="0" cy="0" r="160" fill="#FEF3C7" opacity="0.4" />
          
          {/* Head & Torso Vector Artwork */}
          <circle cx="0" cy="-60" r="45" fill="#E28D75" stroke="#10353A" strokeWidth="3" />
          {/* Friendly Expression */}
          <path d="M -12,-55 Q -8,-62 -4,-55" fill="none" stroke="#10353A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 4,-55 Q 8,-62 12,-55" fill="none" stroke="#10353A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M -10,-42 Q 0,-34 10,-42" fill="none" stroke="#10353A" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Body Torso */}
          <path d="M -65,80 C -65,-10 65,-10 65,80 Z" fill="#0D9488" stroke="#10353A" strokeWidth="3" />
          
          <text y="115" textAnchor="middle" fill="#10353A" fontSize="14" fontWeight="900">
            Visible Surface: 100% Calm & Healthy
          </text>
        </g>

        {/* Connecting Inspection Ray */}
        <g transform="translate(600, 360)">
          <path d="M -100,0 L 100,0" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 4" />
          <polygon points="100,0 85,-6 85,6" fill="#F59E0B" />
        </g>

        {/* Right Side: Magnifying Inspection Lens (Reveals Silent Pathogens) */}
        <g id="inspection-lens" transform="translate(840, 360)">
          {/* Lens Glass Base */}
          <circle cx="0" cy="0" r="140" fill="#FFFFFF" stroke="#0D9488" strokeWidth="8" filter="url(#soft-glow)" />
          <circle cx="0" cy="0" r="128" fill="#F0FDFA" />

          {/* Abstract Microscopic Cellular World (Layer Reveal) */}
          <LayerReveal isRevealed={isLensRevealed}>
            {/* Spirochete (Syphilis) Corkscrew */}
            <path
              d="M -60,-40 Q -40,-60 -20,-40 T 20,-40 T 60,-40"
              fill="none"
              stroke="#D97706"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-pulse"
            />
            {/* Diplococci (Gonorrhea) Pairs */}
            <g transform="translate(-40, 30)">
              <circle cx="-6" cy="0" r="10" fill="#EF4444" opacity="0.9" />
              <circle cx="6" cy="0" r="10" fill="#DC2626" opacity="0.9" />
            </g>
            <g transform="translate(40, 40)">
              <circle cx="-6" cy="0" r="10" fill="#EF4444" opacity="0.9" />
              <circle cx="6" cy="0" r="10" fill="#DC2626" opacity="0.9" />
            </g>
            {/* Viral Vesicle Spheres (Herpes) */}
            <circle cx="20" cy="-10" r="14" fill="#3B82F6" opacity="0.8" />
            <circle cx="45" cy="-20" r="10" fill="#60A5FA" opacity="0.8" />
          </LayerReveal>

          {/* Lens Metal Rim & Handle */}
          <circle cx="0" cy="0" r="132" fill="none" stroke="#10353A" strokeWidth="4" />
          <path d="M 95,95 L 150,150" stroke="#10353A" strokeWidth="16" strokeLinecap="round" />
          <path d="M 95,95 L 150,150" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />

          {/* Label */}
          <text y="175" textAnchor="middle" fill="#10353A" fontSize="13" fontWeight="900">
            Microscope Reality: Silent Germs
          </text>
        </g>

        {/* Interactive Targets */}
        <SceneTarget
          id="target-visible-surface"
          isActive={activeId === 'target-visible-surface'}
          onClick={() => handleSelect('target-visible-surface')}
          transform="translate(360, 240)"
          aria-label="Healthy External Appearance"
        >
          <rect x="-70" y="-18" width="140" height="36" rx="18" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" filter="url(#soft-glow)" />
          <text y="5" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="bold">
            1. Zero Pain / Signs
          </text>
        </SceneTarget>

        <SceneTarget
          id="target-hidden-pathogens"
          isActive={activeId === 'target-hidden-pathogens'}
          onClick={() => handleSelect('target-hidden-pathogens')}
          transform="translate(840, 200)"
          aria-label="Dormant Microscopic Bacteria"
        >
          <rect x="-80" y="-18" width="160" height="36" rx="18" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" filter="url(#soft-glow)" />
          <text y="5" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">
            2. Germs Can Live Quietly
          </text>
        </SceneTarget>
      </SceneShell>

      {/* Accessible Interactive Description */}
      <SceneDescription scene={scene} locale={locale} activeTarget={currentTarget} />
    </div>
  );
};
