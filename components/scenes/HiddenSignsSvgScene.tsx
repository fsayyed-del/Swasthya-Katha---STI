'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface HiddenSignsSvgSceneProps {
  activeTargetId?: string;
  onTargetClick?: (targetId: string) => void;
  locale: Locale;
}

export const HiddenSignsSvgScene: React.FC<HiddenSignsSvgSceneProps> = ({
  activeTargetId,
  onTargetClick,
  locale
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full flex flex-col items-center bg-paper-deep/50 rounded-2xl p-4 border border-border/70 overflow-hidden shadow-inner">
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        <button
          onClick={() => {
            setRevealed(!revealed);
            onTargetClick?.(revealed ? 'target-healthy-exterior' : 'target-hidden-layer');
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            revealed
              ? 'bg-orange text-ink-DEFAULT border border-orange-dark'
              : 'bg-teal text-white hover:bg-teal-dark'
          }`}
        >
          {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>
            {revealed
              ? (locale === 'hi' ? 'बाहरी दृश्य देखें' : 'View Exterior Only')
              : (locale === 'hi' ? 'भीतरी सूक्ष्म स्थिति देखें (Reveal Layer)' : 'Reveal Silent Internal Layer')}
          </span>
        </button>

        <span className="text-[11px] text-ink-muted bg-paper px-2 py-1 rounded-md border border-border">
          {revealed ? '🔬 Microscope Layer Active' : '👤 Normal Visual Check'}
        </span>
      </div>

      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto max-h-[300px] select-none"
        role="img"
        aria-label="Illustration demonstrating that appearance does not confirm lack of infection"
      >
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Card 1: Visual Appearance Box */}
        <g
          id="target-healthy-exterior"
          role="button"
          tabIndex={0}
          onClick={() => onTargetClick?.('target-healthy-exterior')}
          className="cursor-pointer"
        >
          <rect
            x="40"
            y="30"
            width="240"
            height="250"
            rx="18"
            fill="#ffffff"
            stroke={activeTargetId === 'target-healthy-exterior' ? "#0b6b67" : "#d9dedb"}
            strokeWidth={activeTargetId === 'target-healthy-exterior' ? "4" : "2"}
          />
          {/* Person Smiling */}
          <circle cx="160" cy="110" r="45" fill="#d8eee6" />
          <circle cx="145" cy="100" r="4" fill="#182027" />
          <circle cx="175" cy="100" r="4" fill="#182027" />
          <path d="M 145 125 Q 160 142 175 125" fill="none" stroke="#182027" strokeWidth="3" strokeLinecap="round" />
          {/* Healthy Check Badge */}
          <rect x="70" y="195" width="180" height="34" rx="8" fill="#d8eee6" />
          <text x="160" y="217" textAnchor="middle" className="text-xs font-bold fill-teal-dark">
            {locale === 'hi' ? 'बाहर से 100% स्वस्थ' : 'Looks 100% Fit & Healthy'}
          </text>
          <text x="160" y="250" textAnchor="middle" className="text-[11px] fill-ink-muted">
            {locale === 'hi' ? 'कोई घाव या दर्द नहीं' : 'No visible sores or pain'}
          </text>
        </g>

        {/* Card 2: Scientific Reality Box */}
        <g
          id="target-hidden-layer"
          role="button"
          tabIndex={0}
          onClick={() => onTargetClick?.('target-hidden-layer')}
          className="cursor-pointer"
        >
          <rect
            x="320"
            y="30"
            width="240"
            height="250"
            rx="18"
            fill={revealed ? "#fffaf0" : "#f7fafc"}
            stroke={revealed || activeTargetId === 'target-hidden-layer' ? "#f29f58" : "#d9dedb"}
            strokeWidth={revealed || activeTargetId === 'target-hidden-layer' ? "4" : "2"}
          />

          {revealed ? (
            <>
              {/* Internal micro-organisms revealed */}
              <circle cx="440" cy="110" r="45" fill="#fef3c7" stroke="#f29f58" strokeDasharray="3 3" />
              {/* Micro-organisms particles */}
              <circle cx="425" cy="95" r="5" fill="#e53e3e" className="animate-pulse" />
              <circle cx="455" cy="105" r="6" fill="#dd6b20" className="animate-pulse" />
              <circle cx="435" cy="125" r="5" fill="#e53e3e" className="animate-pulse" />
              <circle cx="450" cy="85" r="4" fill="#3182ce" />
              
              <rect x="340" y="195" width="200" height="34" rx="8" fill="#feebc8" />
              <text x="440" y="217" textAnchor="middle" className="text-xs font-bold fill-warning">
                {locale === 'hi' ? 'संक्रमण शांत मौजूद हो सकता है' : 'Infection Can Exist Silently'}
              </text>
              <text x="440" y="250" textAnchor="middle" className="text-[11px] fill-ink-muted">
                {locale === 'hi' ? '70% मामलों में कोई दर्द नहीं होता' : 'Up to 70% cases show no pain'}
              </text>
            </>
          ) : (
            <>
              {/* Hidden placeholder */}
              <circle cx="440" cy="110" r="45" fill="#edf2f7" />
              <text x="440" y="115" textAnchor="middle" className="text-2xl font-extrabold fill-ink-muted/40">?</text>
              <text x="440" y="210" textAnchor="middle" className="text-xs font-semibold fill-ink-muted">
                {locale === 'hi' ? 'भीतरी स्थिति जानने के लिए टैप करें' : 'Tap to reveal internal facts'}
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
