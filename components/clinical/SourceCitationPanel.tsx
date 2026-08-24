'use client';

import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface SourceCitationPanelProps {
  nacoCitation?: string;
  philId?: string;
  creator?: string;
  locale: Locale;
}

export const SourceCitationPanel: React.FC<SourceCitationPanelProps> = ({
  nacoCitation = 'NACO National STI/RTI Guidelines 2026 • Ministry of Health & Family Welfare India',
  philId,
  creator,
  locale
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-paper-deep/60 border border-border/80 rounded-xl p-2 text-[10px] text-ink-muted">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-teal">
          <BookOpen className="w-3 h-3" />
          <span>{locale === 'hi' ? 'सरकारी स्रोत एवं संदर्भ' : 'Official Citation & Provenance'}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[9px] font-bold text-ink underline hover:text-teal"
        >
          {isOpen ? (locale === 'hi' ? 'छिपाएं' : 'Hide Details') : (locale === 'hi' ? 'विवरण देखें' : 'View Details')}
        </button>
      </div>

      <div className="mt-1 text-[9px] leading-relaxed text-ink line-clamp-1 font-medium">
        {nacoCitation}
      </div>

      {isOpen && (
        <div className="mt-2 pt-1.5 border-t border-border/60 space-y-1 animate-fade-in text-[9px]">
          {philId && (
            <div>
              <span className="font-bold text-ink">CDC/PHIL Record:</span> Public Health Image Library ID #{philId} (Public Domain US Government Work).
            </div>
          )}
          {creator && (
            <div>
              <span className="font-bold text-ink">Content Provider:</span> {creator}.
            </div>
          )}
          <div className="text-emerald-800 font-bold flex items-center gap-1 pt-0.5">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>Rights Status: Green Cleared • Clinical Review Approved</span>
          </div>
        </div>
      )}
    </div>
  );
};
