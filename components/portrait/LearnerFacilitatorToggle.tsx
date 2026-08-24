'use client';

import React from 'react';
import { User, UserCheck } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface LearnerFacilitatorToggleProps {
  isFacilitator: boolean;
  onToggle: (isFacilitator: boolean) => void;
  locale: Locale;
  className?: string;
}

export const LearnerFacilitatorToggle: React.FC<LearnerFacilitatorToggleProps> = ({
  isFacilitator,
  onToggle,
  locale,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 bg-paper border border-brass/40 rounded-full shadow-sm ${className}`}
      role="radiogroup"
      aria-label="Reading Mode"
    >
      <button
        onClick={() => onToggle(false)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all ${
          !isFacilitator
            ? 'bg-ink-teal text-paper shadow'
            : 'text-ink-muted hover:text-ink'
        }`}
        role="radio"
        aria-checked={!isFacilitator}
        title="Learner Mode (General Public)"
      >
        <User className="w-3.5 h-3.5" />
        <span>{locale === 'hi' ? 'सामान्य पाठक' : 'Learner'}</span>
      </button>

      <button
        onClick={() => onToggle(true)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all ${
          isFacilitator
            ? 'bg-coral text-white shadow'
            : 'text-ink-muted hover:text-ink'
        }`}
        role="radio"
        aria-checked={isFacilitator}
        title="Facilitator Mode (Educator & Clinic Guide)"
      >
        <UserCheck className="w-3.5 h-3.5" />
        <span>{locale === 'hi' ? 'प्रशिक्षक मोड' : 'Facilitator'}</span>
      </button>
    </div>
  );
};
