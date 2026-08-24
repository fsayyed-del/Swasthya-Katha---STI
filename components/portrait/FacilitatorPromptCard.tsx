'use client';

import React from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface FacilitatorPromptCardProps {
  promptText: string;
  locale: Locale;
  className?: string;
}

export const FacilitatorPromptCard: React.FC<FacilitatorPromptCardProps> = ({
  promptText,
  locale,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-coral/10 border-2 border-coral/30 rounded-2xl p-3.5 sm:p-4 space-y-1.5 select-none shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-coral/20 pb-1">
        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-coral-dark uppercase tracking-wider">
          <Users className="w-4 h-4 text-coral shrink-0" />
          <span>{locale === 'hi' ? 'समूह चर्चा संकेत (प्रशिक्षक हेतु)' : 'Facilitator Group Prompt'}</span>
        </div>
        <span className="text-[10px] font-bold text-coral-dark bg-coral/20 px-2 py-0.5 rounded-full">
          Discussion Starter
        </span>
      </div>

      <div className="flex items-start gap-2 pt-0.5">
        <MessageSquare className="w-4 h-4 text-coral shrink-0 mt-0.5" />
        <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
          "{promptText}"
        </p>
      </div>
    </div>
  );
};
