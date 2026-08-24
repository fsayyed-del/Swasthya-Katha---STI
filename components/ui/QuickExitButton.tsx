'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

interface QuickExitButtonProps {
  locale?: Locale;
}

export const QuickExitButton: React.FC<QuickExitButtonProps> = () => {
  const handleQuickExit = () => {
    try {
      localStorage.removeItem('swasthya_katha_progress');
      localStorage.removeItem('swasthya_katha_settings');
    } catch {
      // ignore
    }
    window.location.replace('https://www.google.com');
  };

  return (
    <button
      onClick={handleQuickExit}
      title="Exit to safe page"
      className="p-1.5 bg-danger/10 hover:bg-danger text-danger hover:text-white rounded-full border border-danger/30 transition-all focus:outline-none focus:ring-2 focus:ring-danger flex items-center justify-center shadow-sm"
      aria-label="Exit"
    >
      <LogOut className="w-4 h-4" aria-hidden="true" />
    </button>
  );
};
