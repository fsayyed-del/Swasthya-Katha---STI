'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface ContentNoticeBlockProps {
  locale: Locale;
  onConsent: () => void;
  onSkip: () => void;
  className?: string;
}

export const ContentNoticeBlock: React.FC<ContentNoticeBlockProps> = ({
  locale,
  onConsent,
  onSkip,
  className = '',
}) => {
  const isHindi = locale === 'hi';

  return (
    <div
      className={`w-full bg-[#FAF5EC] border-2 border-brass/40 rounded-2xl p-4 sm:p-5 space-y-3 select-none shadow-md ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-2 text-ink-teal font-display font-bold text-base sm:text-lg border-b border-brass/30 pb-2">
        <AlertCircle className="w-5 h-5 text-coral shrink-0" />
        <span>
          {isHindi
            ? 'स्वास्थ्य शिक्षा सूचना (ऐच्छिक फोटो)'
            : 'Educational Content Notice (Optional Photo)'}
        </span>
      </div>

      <p className="text-base sm:text-lg text-ink font-body leading-relaxed">
        {isHindi
          ? 'यह अगली तस्वीर स्वास्थ्य कार्यकर्ताओं और पीयर एजुकेटर्स को सिखाने के लिए उपयोग की जाने वाली एक वास्तविक क्लिनिकल फोटो है। यह किसी बीमारी का खुद अनुमान लगाने के लिए नहीं है।'
          : 'This next image is a real photo used for teaching health workers and peer educators. It is not here to help you guess what someone has.'}
      </p>

      <div className="flex items-center gap-3 pt-1 flex-wrap">
        <button
          onClick={onConsent}
          className="flex-1 min-w-[140px] py-2.5 px-4 bg-ink-teal hover:bg-teal-dark text-paper font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all shadow active:scale-95"
        >
          <Eye className="w-4 h-4 text-mineral-green" />
          <span>{isHindi ? 'आगे बढ़ें (फोटो देखें)' : 'Continue (View Photo)'}</span>
        </button>

        <button
          onClick={onSkip}
          className="flex-1 min-w-[140px] py-2.5 px-4 bg-paper-shadow hover:bg-paper-deep text-ink font-semibold text-sm sm:text-base rounded-xl border border-brass/40 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <EyeOff className="w-4 h-4 text-ink-muted" />
          <span>{isHindi ? 'छोड़ें — केवल चित्र देखें' : 'Skip — use drawing only'}</span>
        </button>
      </div>
    </div>
  );
};
