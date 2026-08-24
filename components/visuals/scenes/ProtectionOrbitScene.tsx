'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { VISUAL_SCENES } from '@/content/visual-scenes/scene-definitions';
import { SceneShell } from '../SceneShell';
import { SceneTarget } from '../SceneTarget';
import { SceneDescription } from '../SceneDescription';

interface ProtectionOrbitSceneProps {
  locale: Locale;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
}

export const ProtectionOrbitScene: React.FC<ProtectionOrbitSceneProps> = ({
  locale,
  activeTargetId: externalTargetId,
  onTargetClick,
}) => {
  const scene = VISUAL_SCENES['protection-orbit'];
  const [internalTargetId, setInternalTargetId] = useState<string>('orbit-protection');
  const activeId = externalTargetId || internalTargetId;

  const handleSelect = (id: string) => {
    setInternalTargetId(id);
    onTargetClick?.(id);
  };

  const currentTarget = scene.targets.find((t) => t.id === activeId);

  // 6 Orbit Nodes around circle (cx: 600, cy: 360, radius: 240)
  const nodes = [
    { id: 'orbit-conversation', num: '1', title: 'Talk', angle: 0, color: '#0D9488' },
    { id: 'orbit-protection', num: '2', title: 'Condom', angle: 60, color: '#059669' },
    { id: 'orbit-testing', num: '3', title: 'Test', angle: 120, color: '#2563EB' },
    { id: 'orbit-treatment', num: '4', title: 'Cure', angle: 180, color: '#D97706' },
    { id: 'orbit-partner', num: '5', title: 'Partner', angle: 240, color: '#7C3AED' },
    { id: 'orbit-followup', num: '6', title: 'Follow-Up', angle: 300, color: '#DB2777' },
  ];

  return (
    <div className="w-full space-y-2 select-none">
      <SceneShell scene={scene} locale={locale} activeTargetId={activeId} onTargetClick={handleSelect}>
        {/* Orbital Track Ring */}
        <circle cx="600" cy="360" r="240" fill="none" stroke="#D8CEB8" strokeWidth="3" strokeDasharray="8 6" />
        <circle cx="600" cy="360" r="240" fill="none" stroke="#0D9488" strokeWidth="1" opacity="0.4" />

        {/* Central Core: Sexual Health & Wellbeing Hub */}
        <g id="orbit-center" transform="translate(600, 360)">
          <circle cx="0" cy="0" r="70" fill="url(#grad-teal-rich)" filter="url(#soft-glow)" />
          <circle cx="0" cy="0" r="62" fill="#10353A" stroke="#F59E0B" strokeWidth="3" />
          {/* Star / Wellness Icon */}
          <text y="-8" textAnchor="middle" fill="#F59E0B" fontSize="24">✦</text>
          <text y="16" textAnchor="middle" fill="#F6F1E4" fontSize="12" fontWeight="900" letterSpacing="1">
            WELLNESS
          </text>
          <text y="32" textAnchor="middle" fill="#A7D7D9" fontSize="9" fontWeight="bold">
            SURAKSHA
          </text>
        </g>

        {/* 6 Interactive Orbit Nodes */}
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 600 + 240 * Math.cos(rad);
          const y = 360 + 240 * Math.sin(rad);
          const isSelected = activeId === n.id;

          return (
            <React.Fragment key={n.id}>
              {/* Radial spoke from center */}
              <line
                x1="600"
                y1="360"
                x2={x}
                y2={y}
                stroke={isSelected ? n.color : '#D8CEB8'}
                strokeWidth={isSelected ? 3 : 1.5}
                strokeDasharray={isSelected ? 'none' : '4 4'}
              />

              <SceneTarget
                id={n.id}
                isActive={isSelected}
                onClick={() => handleSelect(n.id)}
                transform={`translate(${x}, ${y})`}
                aria-label={`Node ${n.num}: ${n.title}`}
              >
                <circle cx="0" cy="0" r="40" fill="#FFFFFF" stroke={n.color} strokeWidth="3.5" filter="url(#soft-glow)" />
                <circle cx="0" cy="-10" r="12" fill={n.color} opacity="0.2" />
                <text y="-6" textAnchor="middle" fill={n.color} fontSize="11" fontWeight="900">
                  {n.num}
                </text>
                <text y="14" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">
                  {n.title}
                </text>
              </SceneTarget>
            </React.Fragment>
          );
        })}
      </SceneShell>

      {/* Accessible Interactive Description */}
      <SceneDescription scene={scene} locale={locale} activeTarget={currentTarget} />
    </div>
  );
};
