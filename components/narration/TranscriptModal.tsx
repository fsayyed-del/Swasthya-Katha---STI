'use client';

import React from 'react';
import { X, FileText } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  transcript: string;
  locale: Locale;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  title,
  transcript,
  locale
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="transcript-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-paper-pure border border-border shadow-2xl rounded-2xl max-w-lg w-full p-6 text-ink relative">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal" />
            <h3 id="transcript-title" className="text-base font-bold font-display">
              {locale === 'hi' ? 'ऑडियो प्रतिलेख (Transcript)' : 'Narration Transcript'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper-deep text-ink-muted hover:text-ink transition-colors"
            aria-label="Close transcript"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4">
          <h4 className="text-xs font-bold text-teal-dark mb-2">{title}</h4>
          <div className="bg-paper-deep/60 p-4 rounded-xl border border-border text-sm leading-relaxed text-ink max-h-[300px] overflow-y-auto font-body">
            {transcript || (locale === 'hi' ? 'इस पाठ के लिए प्रतिलेख उपलब्ध है।' : 'Full transcript is available for this lesson.')}
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-teal text-white rounded-lg text-xs font-bold hover:bg-teal-dark transition-colors"
          >
            {locale === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
