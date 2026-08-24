'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { VISUAL_SCENES } from '@/content/visual-scenes/scene-definitions';
import { SceneShell } from '../SceneShell';
import { SceneTarget } from '../SceneTarget';
import { SceneDescription } from '../SceneDescription';

interface ClinicJourneySceneProps {
  locale: Locale;
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
}

export const ClinicJourneyScene: React.FC<ClinicJourneySceneProps> = ({
  locale,
  activeTargetId: externalTargetId,
  onTargetClick,
}) => {
  const scene = VISUAL_SCENES['clinic-journey'];
  const [internalTargetId, setInternalTargetId] = useState<string>('step-counsel');
  const activeId = externalTargetId || internalTargetId;

  const handleSelect = (id: string) => {
    setInternalTargetId(id);
    onTargetClick?.(id);
  };

  const currentTarget = scene.targets.find((t) => t.id === activeId);

  return (
    <div className="w-full space-y-2 select-none">
      <SceneShell scene={scene} locale={locale} activeTargetId={activeId} onTargetClick={handleSelect}>
        {/* Connecting Pathway Ribbon */}
        <g id="journey-pathway" opacity="0.6">
          <path
            d="M 160,360 C 260,320 340,320 400,360 S 540,400 600,360 S 740,320 800,360 S 940,400 1040,360"
            fill="none"
            stroke="#0D9488"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 160,360 C 260,320 340,320 400,360 S 540,400 600,360 S 740,320 800,360 S 940,400 1040,360"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        </g>

        {/* Step 1: Arrive & Token Registration */}
        <SceneTarget
          id="step-arrive"
          isActive={activeId === 'step-arrive'}
          onClick={() => handleSelect('step-arrive')}
          transform="translate(160, 360)"
          aria-label="Step 1: Welcome and Private Token"
        >
          <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#10353A" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Token Card Icon */}
          <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="900">#42</text>
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">1. Token</text>
        </SceneTarget>

        {/* Step 2: Private Counseling */}
        <SceneTarget
          id="step-counsel"
          isActive={activeId === 'step-counsel'}
          onClick={() => handleSelect('step-counsel')}
          transform="translate(380, 360)"
          aria-label="Step 2: Confidential Counseling"
        >
          <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#0D9488" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Closed Door / Private Room Icon */}
          <rect x="-14" y="-18" width="28" height="34" rx="3" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
          <circle cx="6" cy="0" r="2.5" fill="#0D9488" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">2. Talk</text>
        </SceneTarget>

        {/* Step 3: Gentle Sample Check */}
        <SceneTarget
          id="step-assess"
          isActive={activeId === 'step-assess'}
          onClick={() => handleSelect('step-assess')}
          transform="translate(600, 360)"
          aria-label="Step 3: Painless Sample Check"
        >
          <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Blood Drop / Gentle Swab Icon */}
          <path d="M 0,-14 C 8,-2 10,6 0,14 C -10,6 -8,-2 0,-14 Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">3. Check</text>
        </SceneTarget>

        {/* Step 4: Free NACO Kit */}
        <SceneTarget
          id="step-guidance"
          isActive={activeId === 'step-guidance'}
          onClick={() => handleSelect('step-guidance')}
          transform="translate(820, 360)"
          aria-label="Step 4: Standard NACO Kit"
        >
          <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#059669" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Medicine Kit Box Icon */}
          <rect x="-16" y="-12" width="32" height="22" rx="4" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
          <path d="M -6,0 L 6,0 M 0,-6 L 0,6" stroke="#059669" strokeWidth="2.5" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">4. Free Kit</text>
        </SceneTarget>

        {/* Step 5: Follow-Up Reassurance */}
        <SceneTarget
          id="step-followup"
          isActive={activeId === 'step-followup'}
          onClick={() => handleSelect('step-followup')}
          transform="translate(1040, 360)"
          aria-label="Step 5: Follow-Up Confirmation"
        >
          <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#D97706" strokeWidth="3" filter="url(#soft-glow)" />
          {/* Calendar Check Icon */}
          <rect x="-14" y="-14" width="28" height="26" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <line x1="-14" y1="-6" x2="14" y2="-6" stroke="#D97706" strokeWidth="1.5" />
          <path d="M -4,4 L -1,7 L 5,1" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <text y="30" textAnchor="middle" fill="#10353A" fontSize="11" fontWeight="800">5. 7-Day Care</text>
        </SceneTarget>
      </SceneShell>

      {/* Accessible Interactive Description */}
      <SceneDescription scene={scene} locale={locale} activeTarget={currentTarget} />
    </div>
  );
};
