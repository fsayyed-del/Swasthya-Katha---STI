'use client';

import React from 'react';
import { PhoneCall, MapPin, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';
import { SURAKSHA_SERVICES } from '@/src/domain/content/naco_kits';

interface SurakshaHelplineCardProps {
  locale: Locale;
  compact?: boolean;
}

export const SurakshaHelplineCard: React.FC<SurakshaHelplineCardProps> = ({
  locale,
  compact = false
}) => {
  const helplineTitle = SURAKSHA_SERVICES.helplineTitle[locale] || SURAKSHA_SERVICES.helplineTitle.en;
  const helplineSubtitle = SURAKSHA_SERVICES.helplineSubtitle[locale] || SURAKSHA_SERVICES.helplineSubtitle.en;
  const clinicName = SURAKSHA_SERVICES.clinicName[locale] || SURAKSHA_SERVICES.clinicName.en;
  const clinicSubtitle = SURAKSHA_SERVICES.clinicSubtitle[locale] || SURAKSHA_SERVICES.clinicSubtitle.en;

  return (
    <div className={`bg-gradient-to-br from-teal-dark via-teal to-teal-light text-white rounded-2xl p-5 shadow-lg border border-teal-light/30 ${compact ? 'text-xs' : 'text-sm'}`}>
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-base tracking-tight">{clinicName}</h4>
            <p className="text-white/80 text-xs">{clinicSubtitle}</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 bg-white/20 rounded-full text-[11px] font-semibold uppercase tracking-wider">
          100% Free & Confidential
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Direct Call Box */}
        <a
          href="tel:1097"
          className="flex items-center justify-between p-3.5 bg-white text-teal-dark rounded-xl shadow hover:bg-paper hover:shadow-md transition-all group"
          aria-label="Call National AIDS Helpline 1097"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">Toll-Free Helpline 24x7</div>
              <div className="text-xl font-extrabold tracking-tight text-teal-dark">Dial 1097</div>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-teal text-white text-xs font-bold rounded-lg group-hover:bg-teal-dark transition-colors">
            Call Free
          </span>
        </a>

        {/* Clinic Reassurance */}
        <div className="space-y-1.5 text-xs text-white/90">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-orange-light shrink-0" />
            <span>Free consultation & color-coded syndromic kits</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-orange-light shrink-0" />
            <span>Confidential HIV & Syphilis testing (ICTC)</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-orange-light shrink-0" />
            <span>Friendly, zero-judgment counseling for both partners</span>
          </div>
        </div>
      </div>
    </div>
  );
};
