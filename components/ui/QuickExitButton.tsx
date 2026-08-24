'use client';

import React from 'react';
import { LogOut, ShieldAlert } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface QuickExitButtonProps {
  locale: Locale;
}

const LABELS: Record<Locale, { title: string; exitText: string }> = {
  en: { title: "Quick Exit to safe page", exitText: "Quick Exit" },
  hi: { title: "सुरक्षित पृष्ठ पर तुरंत बाहर निकलें", exitText: "त्वरित निकास" },
  mr: { title: "त्वरित बाहेर पडा", exitText: "त्वरित निकास" },
  bn: { title: "দ্রুত প্রস্থান", exitText: "দ্রুত প্রস্থান" },
  ta: { title: "விரைவு வெளியேறு", exitText: "வெளியேறு" },
  te: { title: "త్వరిత నిష్క్రమణ", exitText: "నిష్క్రమణ" }
};

export const QuickExitButton: React.FC<QuickExitButtonProps> = ({ locale }) => {
  const handleQuickExit = () => {
    // Clear local storage and immediately redirect to neutral search page
    try {
      localStorage.removeItem('swasthya_katha_progress');
      localStorage.removeItem('swasthya_katha_settings');
    } catch {
      // ignore
    }
    window.location.replace('https://www.google.com');
  };

  const label = LABELS[locale] || LABELS.en;

  return (
    <button
      onClick={handleQuickExit}
      title={label.title}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 hover:bg-danger text-danger hover:text-white rounded-full border border-danger/30 transition-colors text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-danger"
      aria-label={label.title}
    >
      <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">{label.exitText}</span>
      <LogOut className="w-3 h-3" aria-hidden="true" />
    </button>
  );
};
