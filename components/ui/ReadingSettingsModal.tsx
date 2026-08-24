'use client';

import React from 'react';
import { X, Type, Eye, Zap, Trash2, Sliders } from 'lucide-react';
import { Locale } from '@/src/domain/content/schema';

export type TextScale = 'normal' | 'large' | 'xlarge';
export type ContrastMode = 'paper' | 'high-contrast' | 'dark';
export type MotionProfile = 'full' | 'reduced' | 'lite';
export type ReaderMode = 'magazine' | 'linear' | 'facilitator';

export interface ReadingSettings {
  textScale: TextScale;
  contrastMode: ContrastMode;
  motionProfile: MotionProfile;
  readerMode: ReaderMode;
}

interface ReadingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onSettingsChange: (settings: ReadingSettings) => void;
  locale: Locale;
}

export const ReadingSettingsModal: React.FC<ReadingSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  locale,
}) => {
  if (!isOpen) return null;

  const handleResetData = () => {
    try {
      localStorage.clear();
      alert('Local reading progress and bookmarks cleared successfully.');
      window.location.reload();
    } catch {
      // ignore
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-paper-pure border border-ink/20 shadow-2xl rounded-2xl max-w-md w-full p-6 text-ink relative">
        <div className="flex items-center justify-between pb-4 border-b border-ink/10">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-teal" />
            <h2 id="settings-title" className="text-lg font-bold font-display">
              {locale === 'hi' ? 'रीडिंग सेटिंग्स' : locale === 'mr' ? 'वाचन सेटिंग्ज' : 'Reader Settings'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper-deep text-ink-muted hover:text-ink transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-5 text-sm">
          {/* Reader Mode Selection */}
          <div>
            <label className="font-semibold block mb-2 text-ink">
              {locale === 'hi' ? 'अनुभव मोड' : locale === 'mr' ? 'अनुभव मोड' : 'Experience Mode'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'magazine', label: '📖 Magazine', desc: '3D Flip' },
                { id: 'linear', label: '📄 Linear', desc: 'Simple' },
                { id: 'facilitator', label: '🩺 Facilitator', desc: 'Teaching' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSettingsChange({ ...settings, readerMode: m.id as ReaderMode })}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    settings.readerMode === m.id
                      ? 'bg-teal text-white border-teal shadow-sm font-semibold'
                      : 'bg-paper-deep/60 hover:bg-paper-deep border-border text-ink'
                  }`}
                >
                  <div className="text-xs font-bold">{m.label}</div>
                  <div className="text-[10px] opacity-80">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Size Scaling */}
          <div>
            <label className="font-semibold flex items-center gap-1.5 mb-2 text-ink">
              <Type className="w-4 h-4 text-teal" />
              {locale === 'hi' ? 'अक्षर का आकार' : locale === 'mr' ? 'अक्षरांचा आकार' : 'Text Size'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'A (Normal)' },
                { id: 'large', label: 'A+ (Large)' },
                { id: 'xlarge', label: 'A++ (Extra)' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSettingsChange({ ...settings, textScale: s.id as TextScale })}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                    settings.textScale === s.id
                      ? 'bg-teal text-white border-teal font-bold'
                      : 'bg-paper-deep/60 hover:bg-paper-deep border-border text-ink'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast & Paper Tone */}
          <div>
            <label className="font-semibold flex items-center gap-1.5 mb-2 text-ink">
              <Eye className="w-4 h-4 text-teal" />
              {locale === 'hi' ? 'रंग और कंट्रास्ट' : locale === 'mr' ? 'रंग व कॉन्ट्रास्ट' : 'Color & Contrast'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'paper', label: '📜 Paper Warm' },
                { id: 'high-contrast', label: '☀️ High Contrast' },
                { id: 'dark', label: '🌙 Dark Ink' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSettingsChange({ ...settings, contrastMode: c.id as ContrastMode })}
                  className={`py-2 px-2 rounded-lg border text-xs font-medium transition-colors ${
                    settings.contrastMode === c.id
                      ? 'bg-teal text-white border-teal font-bold'
                      : 'bg-paper-deep/60 hover:bg-paper-deep border-border text-ink'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Motion Preference */}
          <div>
            <label className="font-semibold flex items-center gap-1.5 mb-2 text-ink">
              <Zap className="w-4 h-4 text-teal" />
              {locale === 'hi' ? 'एनीमेशन व गति' : locale === 'mr' ? 'अ‍ॅनिमेशन गती' : 'Motion & Animation'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'full', label: 'Full Motion' },
                { id: 'reduced', label: 'Reduced' },
                { id: 'lite', label: 'Static (Lite)' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSettingsChange({ ...settings, motionProfile: m.id as MotionProfile })}
                  className={`py-2 px-2 rounded-lg border text-xs font-medium transition-colors ${
                    settings.motionProfile === m.id
                      ? 'bg-teal text-white border-teal font-bold'
                      : 'bg-paper-deep/60 hover:bg-paper-deep border-border text-ink'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy & Reset Local Data */}
          <div className="pt-3 border-t border-ink/10">
            <button
              onClick={handleResetData}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold text-danger bg-danger/10 hover:bg-danger hover:text-white transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'स्थानीय रीडिंग डेटा मिटाएं (Clear History)' : 'Clear Local History & Progress'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
