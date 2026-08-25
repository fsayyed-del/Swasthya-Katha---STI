'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { ShieldAlert } from 'lucide-react';

interface NonDiagnosticDisclaimerProps {
  locale: Locale;
  className?: string;
}

export const NonDiagnosticDisclaimer: React.FC<NonDiagnosticDisclaimerProps> = ({
  locale,
  className = '',
}) => {
  const isHindi = locale === 'hi';

  return (
    <div
      className={`w-full bg-[#FAF5EC] border-l-4 border-coral rounded-r-xl p-3 sm:p-3.5 space-y-1 select-none shadow-sm ${className}`}
      role="note"
    >
      <div className="flex items-center gap-1.5 text-coral-dark font-bold text-xs sm:text-sm uppercase tracking-wider">
        <ShieldAlert className="w-4 h-4 text-coral shrink-0" />
        <span>
          {isHindi
            ? 'क्लिनिकल मार्गदर्शन सूचना (Educational Notice)'
            : 'Clinical Educational Notice'}
        </span>
      </div>

      <p className="text-sm sm:text-[15px] text-ink font-medium leading-relaxed">
        {isHindi
          ? 'कोई भी तस्वीर यह नहीं बता सकती कि किसी शरीर के भीतर क्या हो रहा है। केवल एक स्वास्थ्य कार्यकर्ता (डॉक्टर) ही जांच करके यह बता सकता है। यदि आपको कुछ अलग महसूस होता है, तो सही कदम हमेशा एक ही है: तुरंत स्वास्थ्य कार्यकर्ता से बात करें।'
          : 'A picture cannot tell you what is happening in a body. Only a health worker doing a test can tell you that. If something feels different for you, the next right step is always the same: go talk to a health worker.'}
      </p>
    </div>
  );
};
