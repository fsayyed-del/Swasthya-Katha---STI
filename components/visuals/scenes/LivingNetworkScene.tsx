'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { VISUAL_SCENES } from '@/content/visual-scenes/scene-definitions';
import { SceneShell } from '../SceneShell';
import { SceneTarget } from '../SceneTarget';
import { SceneDescription } from '../SceneDescription';
import { AnimatedPath } from '../AnimatedPath';

interface LivingNetworkSceneProps {
  locale: Locale;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
}

export const LivingNetworkScene: React.FC<LivingNetworkSceneProps> = ({
  locale,
  activeTargetId: externalTargetId,
  onTargetClick,
}) => {
  const scene = VISUAL_SCENES['living-network'];
  const [internalTargetId, setInternalTargetId] = useState<string>('node-person-a');
  const activeId = externalTargetId || internalTargetId;

  const handleSelect = (id: string) => {
    setInternalTargetId(id);
    onTargetClick?.(id);
  };

  const currentTarget = scene.targets.find((t) => t.id === activeId);

  return (
    <div className="w-full space-y-2 select-none">
      <SceneShell scene={scene} locale={locale} activeTargetId={activeId} onTargetClick={handleSelect}>
        {/* Soft Ambient Background Nodes */}
        <g id="ambient-orbits" opacity="0.4">
          <circle cx="600" cy="360" r="280" fill="none" stroke="#D8CEB8" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="600" cy="360" r="180" fill="none" stroke="#D8CEB8" strokeWidth="1" strokeDasharray="4 4" />
        </g>

        {/* Connective Fluid Curved Pathways */}
        <g id="connection-paths">
          {/* Path 1: Person A to Central Node */}
          <AnimatedPath
            d="M 280,240 Q 420,280 600,360"
            stroke={activeId === 'node-person-a' ? '#0D9488' : '#A7D7D9'}
            strokeWidth={activeId === 'node-person-a' ? 4 : 2.5}
            strokeDasharray={activeId === 'node-person-a' ? 'none' : '8 6'}
            opacity={activeId === 'node-person-a' ? 1 : 0.6}
          />
          {/* Path 2: Central Node to Testing */}
          <AnimatedPath
            d="M 600,360 Q 760,260 920,220"
            stroke={activeId === 'node-testing' ? '#0D9488' : '#A7D7D9'}
            strokeWidth={activeId === 'node-testing' ? 4 : 2.5}
            strokeDasharray={activeId === 'node-testing' ? 'none' : '8 6'}
            opacity={activeId === 'node-testing' ? 1 : 0.6}
          />
          {/* Path 3: Central Node to Protection */}
          <AnimatedPath
            d="M 600,360 Q 520,500 320,520"
            stroke={activeId === 'node-protection' ? '#0D9488' : '#A7D7D9'}
            strokeWidth={activeId === 'node-protection' ? 4 : 2.5}
            strokeDasharray={activeId === 'node-protection' ? 'none' : '8 6'}
            opacity={activeId === 'node-protection' ? 1 : 0.6}
          />
          {/* Path 4: Central Node to Care */}
          <AnimatedPath
            d="M 600,360 Q 740,480 880,500"
            stroke={activeId === 'node-care' ? '#0D9488' : '#A7D7D9'}
            strokeWidth={activeId === 'node-care' ? 4 : 2.5}
            strokeDasharray={activeId === 'node-care' ? 'none' : '8 6'}
            opacity={activeId === 'node-care' ? 1 : 0.6}
          />
        </g>

        {/* Central Core: Health Information Node */}
        <g id="central-health-node" transform="translate(600, 360)">
          <circle cx="0" cy="0" r="52" fill="url(#grad-teal-rich)" filter="url(#soft-glow)" />
          <circle cx="0" cy="0" r="46" fill="#10353A" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Core Symbol: Caduceus / Health Cross */}
          <path d="M -12,0 L 12,0 M 0,-12 L 0,12" stroke="#F6F1E4" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="0" r="4" fill="#F59E0B" />
          <text y="30" textAnchor="middle" fill="#F6F1E4" fontSize="10" fontWeight="900" letterSpacing="1">
            CARE CORE
          </text>
        </g>

        {/* Target 1: Open Communication (Person A & B) */}
        <SceneTarget
          id="node-person-a"
          isActive={activeId === 'node-person-a'}
          onClick={() => handleSelect('node-person-a')}
          transform="translate(280, 240)"
          aria-label="Open Communication Node"
        >
          <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#0D9488" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Avatar Silhouette */}
          <circle cx="-10" cy="-6" r="12" fill="#E28D75" />
          <path d="M -24,18 C -24,4 -10,4 -10,18 Z" fill="#E28D75" />
          <circle cx="10" cy="-6" r="12" fill="#F1C27D" />
          <path d="M 0,18 C 0,4 14,4 24,18 Z" fill="#F1C27D" />
          {/* Speech Bubble Icon */}
          <circle cx="0" cy="-22" r="10" fill="#F59E0B" />
          <text x="0" y="-18" textAnchor="middle" fill="#10353A" fontSize="9" fontWeight="bold">💬</text>
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">
            Talk & Trust
          </text>
        </SceneTarget>

        {/* Target 2: Suraksha Clinic Testing */}
        <SceneTarget
          id="node-testing"
          isActive={activeId === 'node-testing'}
          onClick={() => handleSelect('node-testing')}
          transform="translate(920, 220)"
          aria-label="Suraksha Clinic Testing Node"
        >
          <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Clinic Icon */}
          <path d="M -16,12 L -16,-10 L 0,-20 L 16,-10 L 16,12 Z" fill="#E0E7FF" stroke="#2563EB" strokeWidth="2" />
          <path d="M -5,-4 L 5,-4 M 0,-9 L 0,1" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">
            Painless Check
          </text>
        </SceneTarget>

        {/* Target 3: Barrier Protection */}
        <SceneTarget
          id="node-protection"
          isActive={activeId === 'node-protection'}
          onClick={() => handleSelect('node-protection')}
          transform="translate(320, 520)"
          aria-label="Barrier Protection Node"
        >
          <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#059669" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Shield Icon */}
          <path d="M 0,-18 L 14,-10 C 14,8 0,18 0,18 C 0,18 -14,8 -14,-10 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
          <path d="M -5,0 L -1,4 L 6,-4" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">
            Protection
          </text>
        </SceneTarget>

        {/* Target 4: Compassionate Care & Support */}
        <SceneTarget
          id="node-care"
          isActive={activeId === 'node-care'}
          onClick={() => handleSelect('node-care')}
          transform="translate(880, 500)"
          aria-label="Compassionate Care Node"
        >
          <circle cx="0" cy="0" r="42" fill="#FFFFFF" stroke="#D97706" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Helping Hands / Heart */}
          <path d="M 0,6 C -12,-4 -14,-14 0,-14 C 14,-14 12,-4 0,6 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">
            Free NACO Care
          </text>
        </SceneTarget>
      </SceneShell>

      {/* Accessible Interactive Description */}
      <SceneDescription scene={scene} locale={locale} activeTarget={currentTarget} />
    </div>
  );
};
