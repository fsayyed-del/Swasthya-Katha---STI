'use client';

import React from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Camera, ShieldCheck, Hand, X, Sparkles } from 'lucide-react';

interface CameraPermissionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  locale: Locale;
}

export const CameraPermissionPanel: React.FC<CameraPermissionPanelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  locale,
}) => {
  if (!isOpen) return null;
  const isHindi = locale === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-paper border-2 border-brass/60 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-ink">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-paper-shadow text-ink-muted hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-mineral-green/20 border border-mineral-green/40 flex items-center justify-center text-mineral-green-dark shadow-inner">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-coral uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? 'वैकल्पिक सुविधा' : 'Optional Feature'}</span>
            </div>
            <h3 className="text-xl font-bold font-display text-ink-teal">
              {isHindi ? 'कैमरा जेस्चर पेज टर्नर' : 'Camera Gesture Page Turner'}
            </h3>
          </div>
        </div>

        {/* Description & Privacy Guarantees */}
        <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
          {isHindi
            ? 'कैमरे के सामने हाथ को बाएं या दाएं लहराकर (Swipe) बिना स्क्रीन छुए पत्रिका के पन्ने पलटें।'
            : 'Turn magazine pages touch-free by gently waving your open hand left or right in front of your camera.'}
        </p>

        <div className="bg-paper-shadow/70 p-3 rounded-2xl border border-brass/30 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-ink-teal">
            <ShieldCheck className="w-4 h-4 text-mineral-green shrink-0" />
            <span>{isHindi ? '100% ऑन-डिवाइस गोपनीयता' : '100% On-Device Privacy'}</span>
          </div>
          <ul className="text-ink-muted space-y-1 list-disc list-inside text-[11px] leading-relaxed">
            <li>{isHindi ? 'वीडियो कभी रिकॉर्ड या सर्वर पर अपलोड नहीं होता।' : 'Video is processed locally and never recorded or uploaded.'}</li>
            <li>{isHindi ? 'कोई फेस-रिकॉग्निशन या पहचान स्टोर नहीं की जाती।' : 'No facial recognition or personal identity tracking.'}</li>
            <li>{isHindi ? 'आप इसे किसी भी समय तुरंत बंद कर सकते हैं।' : 'You can turn off camera gestures at any time.'}</li>
          </ul>
        </div>

        {/* Gesture Guide */}
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2.5 bg-paper-deep/50 rounded-xl border border-brass/20">
            <Hand className="w-5 h-5 mx-auto text-mineral-green mb-1 animate-pulse" />
            <div className="font-bold text-ink-teal">{isHindi ? '👈 बाएं लहराएं' : '👈 Swipe Left'}</div>
            <div className="text-[10px] text-ink-muted">{isHindi ? 'अगला पन्ना' : 'Next Page'}</div>
          </div>
          <div className="p-2.5 bg-paper-deep/50 rounded-xl border border-brass/20">
            <Hand className="w-5 h-5 mx-auto text-care-blue mb-1 animate-pulse" />
            <div className="font-bold text-ink-teal">{isHindi ? '👉 दाएं लहराएं' : '👉 Swipe Right'}</div>
            <div className="text-[10px] text-ink-muted">{isHindi ? 'पिछला पन्ना' : 'Previous Page'}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-paper-shadow text-ink font-semibold rounded-2xl text-xs hover:bg-paper-deep transition-colors"
          >
            {isHindi ? 'रद्द करें' : 'Continue Without Camera'}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 bg-ink-teal hover:bg-teal-dark text-paper font-bold rounded-2xl text-xs shadow-md transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-brass-light" />
            <span>{isHindi ? 'कैमरा शुरू करें' : 'Enable Gestures'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
