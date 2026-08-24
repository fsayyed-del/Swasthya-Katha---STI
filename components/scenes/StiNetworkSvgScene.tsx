'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';

interface StiNetworkSvgSceneProps {
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
  locale: Locale;
}

export const StiNetworkSvgScene: React.FC<StiNetworkSvgSceneProps> = ({
  activeTargetId,
  onTargetClick,
  locale
}) => {
  return (
    <div className="w-full relative flex flex-col items-center bg-paper-deep/50 rounded-2xl p-4 border border-border/70 overflow-hidden shadow-inner">
      <div className="w-full flex items-center justify-between text-xs text-ink-muted mb-2 font-medium">
        <span>🎨 Interactive Diagram (Tap nodes to inspect)</span>
        <span className="bg-mint text-teal-dark px-2 py-0.5 rounded-full font-semibold">Semantic SVG</span>
      </div>

      <svg
        viewBox="0 0 600 360"
        className="w-full h-auto max-h-[340px] drop-shadow-sm select-none"
        role="img"
        aria-label="Abstract diagram showing human connections and health counseling"
      >
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b6b67" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f29f58" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Network Mesh Lines */}
        <g stroke="#d9dedb" strokeWidth="2" strokeDasharray="4 4">
          <line x1="120" y1="180" x2="300" y2="100" />
          <line x1="300" y1="100" x2="480" y2="180" />
          <line x1="120" y1="180" x2="300" y2="260" />
          <line x1="300" y1="260" x2="480" y2="180" />
          <line x1="300" y1="100" x2="300" y2="260" />
        </g>

        {/* Transmission Pathways Layer */}
        <g
          id="target-transmission-path"
          role="button"
          tabIndex={0}
          onClick={() => onTargetClick?.('target-transmission-path')}
          className={`cursor-pointer transition-all ${
            activeTargetId === 'target-transmission-path' ? 'stroke-orange filter drop-shadow' : 'stroke-teal/40'
          }`}
          strokeWidth={activeTargetId === 'target-transmission-path' ? "5" : "3"}
        >
          <path d="M 120 180 Q 300 60 480 180" fill="none" />
          <path d="M 120 180 Q 300 300 480 180" fill="none" />
          {activeTargetId === 'target-transmission-path' && (
            <circle cx="300" cy="75" r="7" fill="#f29f58" className="animate-pulse" />
          )}
        </g>

        {/* Node 1: Person A */}
        <g
          id="target-people-network"
          role="button"
          tabIndex={0}
          onClick={() => onTargetClick?.('target-people-network')}
          className="cursor-pointer group"
        >
          <circle
            cx="120"
            cy="180"
            r="42"
            fill={activeTargetId === 'target-people-network' ? "#0b6b67" : "#ffffff"}
            stroke="#0b6b67"
            strokeWidth="3"
            filter={activeTargetId === 'target-people-network' ? "url(#glowEffect)" : undefined}
          />
          <circle cx="120" cy="165" r="14" fill={activeTargetId === 'target-people-network' ? "#ffffff" : "#0b6b67"} />
          <path
            d="M 95 205 Q 120 185 145 205"
            fill="none"
            stroke={activeTargetId === 'target-people-network' ? "#ffffff" : "#0b6b67"}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text
            x="120"
            y="240"
            textAnchor="middle"
            className="text-xs font-bold fill-ink"
          >
            {locale === 'hi' ? 'साथी A' : locale === 'mr' ? 'जोडीदार A' : 'Partner A'}
          </text>
        </g>

        {/* Node 2: Person B */}
        <g
          role="button"
          tabIndex={0}
          onClick={() => onTargetClick?.('target-people-network')}
          className="cursor-pointer group"
        >
          <circle
            cx="480"
            cy="180"
            r="42"
            fill={activeTargetId === 'target-people-network' ? "#0b6b67" : "#ffffff"}
            stroke="#0b6b67"
            strokeWidth="3"
            filter={activeTargetId === 'target-people-network' ? "url(#glowEffect)" : undefined}
          />
          <circle cx="480" cy="165" r="14" fill={activeTargetId === 'target-people-network' ? "#ffffff" : "#0b6b67"} />
          <path
            d="M 455 205 Q 480 185 505 205"
            fill="none"
            stroke={activeTargetId === 'target-people-network' ? "#ffffff" : "#0b6b67"}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text
            x="480"
            y="240"
            textAnchor="middle"
            className="text-xs font-bold fill-ink"
          >
            {locale === 'hi' ? 'साथी B' : locale === 'mr' ? 'जोडीदार B' : 'Partner B'}
          </text>
        </g>

        {/* Central Node 3: Health Worker & Clinic Guidance */}
        <g
          id="target-health-worker"
          role="button"
          tabIndex={0}
          onClick={() => onTargetClick?.('target-health-worker')}
          className="cursor-pointer"
        >
          <circle
            cx="300"
            cy="180"
            r="52"
            fill={activeTargetId === 'target-health-worker' ? "#f29f58" : "#d8eee6"}
            stroke="#0b6b67"
            strokeWidth="3"
            filter={activeTargetId === 'target-health-worker' ? "url(#glowEffect)" : undefined}
          />
          {/* Caduceus / Health Cross Symbol */}
          <rect x="294" y="160" width="12" height="40" rx="3" fill="#064946" />
          <rect x="280" y="174" width="40" height="12" rx="3" fill="#064946" />
          <text
            x="300"
            y="250"
            textAnchor="middle"
            className="text-xs font-extrabold fill-teal-dark"
          >
            {locale === 'hi' ? 'सुरक्षा क्लिनिक (NACO)' : locale === 'mr' ? 'सुरक्षा क्लिनिक' : 'Suraksha Clinic'}
          </text>
        </g>
      </svg>
    </div>
  );
};
