'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { VISUAL_SCENES } from '@/content/visual-scenes/scene-definitions';
import { SceneShell } from '../SceneShell';
import { SceneTarget } from '../SceneTarget';
import { SceneDescription } from '../SceneDescription';

interface NacoCabinetSceneProps {
  locale: Locale;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
}

export const NacoCabinetScene: React.FC<NacoCabinetSceneProps> = ({
  locale,
  activeTargetId: externalTargetId,
  onTargetClick,
}) => {
  const scene = VISUAL_SCENES['naco-cabinet'];
  const [internalTargetId, setInternalTargetId] = useState<string>('kit-1-grey');
  const activeId = externalTargetId || internalTargetId;

  const handleSelect = (id: string) => {
    setInternalTargetId(id);
    onTargetClick?.(id);
  };

  const currentTarget = scene.targets.find((t) => t.id === activeId);

  const kits = [
    { id: 'kit-1-grey', num: '1', color: '#4B5563', name: 'Grey', x: 170 },
    { id: 'kit-2-green', num: '2', color: '#10B981', name: 'Green', x: 310 },
    { id: 'kit-3-black', num: '3', color: '#1F2937', name: 'Black', x: 450 },
    { id: 'kit-4-blue', num: '4', color: '#2563EB', name: 'Blue', x: 590 },
    { id: 'kit-5-red', num: '5', color: '#DC2626', name: 'Red', x: 730 },
    { id: 'kit-6-yellow', num: '6', color: '#D97706', name: 'Yellow', x: 870 },
    { id: 'kit-7-brown', num: '7', color: '#78350F', name: 'Brown', x: 1010 },
  ];

  return (
    <div className="w-full space-y-2 select-none">
      <SceneShell scene={scene} locale={locale} activeTargetId={activeId} onTargetClick={handleSelect}>
        {/* Dimensional 3D Cabinet Shelf Base */}
        <g id="cabinet-furniture">
          {/* Outer Wood / Metal Gutter */}
          <rect x="80" y="220" width="1040" height="280" rx="18" fill="#18282A" stroke="#0D1E20" strokeWidth="4" />
          <rect x="92" y="232" width="1016" height="256" rx="12" fill="#24383B" />
          {/* Shelf Gutter divider */}
          <line x1="92" y1="460" x2="1108" y2="460" stroke="#0F2022" strokeWidth="6" />
        </g>

        {/* 7 Color-Coded Kits Staged Inside Cabinet */}
        {kits.map((k) => {
          const isSelected = activeId === k.id;
          return (
            <SceneTarget
              key={k.id}
              id={k.id}
              isActive={isSelected}
              onClick={() => handleSelect(k.id)}
              transform={`translate(${k.x}, ${isSelected ? 310 : 340})`}
              aria-label={`Kit ${k.num}: ${k.name}`}
            >
              {/* 3D Box Shadow when elevated */}
              {isSelected && (
                <ellipse cx="0" cy="90" rx="45" ry="12" fill="#000000" opacity="0.4" filter="url(#soft-glow)" />
              )}

              {/* Box Geometry */}
              <rect
                x="-48"
                y="-70"
                width="96"
                height="140"
                rx="10"
                fill={k.color}
                stroke="#FFFFFF"
                strokeWidth={isSelected ? 3.5 : 1.5}
                filter="url(#soft-glow)"
              />

              {/* Kit Badge Header */}
              <rect x="-38" y="-58" width="76" height="22" rx="6" fill="#FFFFFF" opacity="0.25" />
              <text y="-43" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1">
                KIT {k.num}
              </text>

              {/* Color Name */}
              <text y="15" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">
                {k.name}
              </text>

              {/* Sealed Certified Stamp */}
              <circle cx="0" cy="45" r="10" fill="#FFFFFF" opacity="0.3" />
              <text y="48" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">NACO</text>
            </SceneTarget>
          );
        })}
      </SceneShell>

      {/* Accessible Interactive Description */}
      <SceneDescription scene={scene} locale={locale} activeTarget={currentTarget} />
    </div>
  );
};
