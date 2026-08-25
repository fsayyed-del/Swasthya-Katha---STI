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
      className={`w-full bg-coral/10 border border-coral/30 rounded-xl p-2 sm:p-2.5 space-y-1 select-none shadow-sm shrink-0 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-coral/20 pb-0.5">
        <div className="flex items-center gap-1 font-bold text-[9px] sm:text-[10px] text-coral-dark uppercase tracking-wider">
          <Users className="w-3 h-3 text-coral shrink-0" />
          <span>{locale === 'hi' ? 'समूह चर्चा संकेत' : 'Facilitator Prompt'}</span>
        </div>
        <span className="text-[8.5px] font-bold text-coral-dark bg-coral/20 px-1.5 py-0.2 rounded-full">
          Discussion
        </span>
      </div>

      <div className="flex items-start gap-1.5 pt-0.5">
        <MessageSquare className="w-3 h-3 text-coral shrink-0 mt-0.5" />
        <p className="text-[10px] sm:text-[11px] text-ink font-medium leading-snug line-clamp-3">
          "{promptText}"
        </p>
      </div>
    </div>
  );
};
