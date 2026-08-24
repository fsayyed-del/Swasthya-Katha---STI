'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { ContentNoticeBlock } from './ContentNoticeBlock';
import { Lock, EyeOff } from 'lucide-react';

interface ClinicalImageGateProps {
  imageSrc: string;
  altText: string;
  locale: Locale;
  className?: string;
}

export const ClinicalImageGate: React.FC<ClinicalImageGateProps> = ({
  imageSrc,
  altText,
  locale,
  className = '',
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  if (isSkipped) {
    return (
      <div className="p-3 bg-paper-deep/60 rounded-xl border border-brass/30 text-center text-xs text-ink-muted flex items-center justify-center gap-2">
        <EyeOff className="w-4 h-4 text-ink-muted" />
        <span>
          {locale === 'hi'
            ? 'फोटो छोड़ी गई है। रेखाचित्र ऊपर प्रदर्शित है।'
            : 'Photo skipped. Showing drawing only.'}
        </span>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className={`relative ${className}`}>
        <ContentNoticeBlock
          locale={locale}
          onConsent={() => setIsUnlocked(true)}
          onSkip={() => setIsSkipped(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative bg-paper-shadow rounded-2xl p-2 border-2 border-brass/50 overflow-hidden shadow-inner ${className}`}>
      <div className="flex items-center justify-between px-2 py-1 mb-1.5 text-xs text-ink-teal font-semibold border-b border-brass/30">
        <span>Clinical Reference (Consented View)</span>
        <button
          onClick={() => setIsUnlocked(false)}
          className="inline-flex items-center gap-1 text-[11px] text-coral hover:underline"
        >
          <Lock className="w-3 h-3" />
          <span>Lock / Hide</span>
        </button>
      </div>

      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/10 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-contain"
        />
      </div>
    </div>
  );
};
