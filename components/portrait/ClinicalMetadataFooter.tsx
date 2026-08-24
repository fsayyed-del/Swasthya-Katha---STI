'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ClinicalMetadataFooterProps {
  source?: string;
  reviewer?: string;
  dateReviewed?: string;
  rightsLicense?: string;
  version?: string;
  className?: string;
}

export const ClinicalMetadataFooter: React.FC<ClinicalMetadataFooterProps> = ({
  source = 'CDC Public Health Image Library (PHIL) / NACO National Guidelines',
  reviewer = 'Dr. A. Sharma, MD (National Clinical Lead)',
  dateReviewed = '2026-08-24',
  rightsLicense = 'Public Domain / Open Educational License',
  version = '1.0-Governed',
  className = '',
}) => {
  return (
    <footer
      className={`w-full pt-2.5 pb-1 border-t border-brass/40 text-[11px] sm:text-xs text-ink-muted select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 font-bold text-ink-teal uppercase tracking-wider mb-1">
        <ShieldCheck className="w-3.5 h-3.5 text-mineral-green shrink-0" />
        <span>Clinical Governance & Attribution</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 leading-tight opacity-90">
        <span>
          <strong className="text-ink">Source:</strong> {source}
        </span>
        <span className="text-brass font-bold">•</span>
        <span>
          <strong className="text-ink">Reviewer:</strong> {reviewer}
        </span>
        <span className="text-brass font-bold">•</span>
        <span>
          <strong className="text-ink">Date:</strong> {dateReviewed}
        </span>
        <span className="text-brass font-bold">•</span>
        <span>
          <strong className="text-ink">Rights:</strong> {rightsLicense}
        </span>
        <span className="text-brass font-bold">•</span>
        <span>
          <strong className="text-ink">Version:</strong> {version}
        </span>
      </div>
    </footer>
  );
};
