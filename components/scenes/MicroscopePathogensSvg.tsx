'use client';

import React, { useState } from 'react';
import { Locale } from '@/src/domain/content/schema';
import { Microscope, Sparkles, Info } from 'lucide-react';

interface MicroscopePathogensSvgProps {
  locale: Locale;
}

export const MicroscopePathogensSvg: React.FC<MicroscopePathogensSvgProps> = ({ locale }) => {
  const [selectedPathogen, setSelectedPathogen] = useState<'treponema' | 'neisseria' | 'chlamydia' | 'hsv'>('treponema');

  const pathogenData = {
    treponema: {
      name: 'Treponema pallidum (Syphilis)',
      nameHi: 'ट्रेपोनेमा पैलिडम (सिफलिस)',
      type: 'Spirochete Bacteria (Spiral-shaped)',
      description: 'Corkscrew-shaped bacteria that enter micro-abrasions, causing painless chancres before traveling systemically.',
      descriptionHi: 'सर्पिलाकार जीवाणु जो त्वचा के सूक्ष्म छिद्रों से प्रवेश कर घाव और संक्रमण पैदा करते हैं।',
      kitMapping: 'Cured by Kit 3 (White) / Kit 4 (Blue)',
      color: '#E08A2C',
    },
    neisseria: {
      name: 'Neisseria gonorrhoeae (Gonorrhea)',
      nameHi: 'नाइजीरिया गोनोरिया',
      type: 'Gram-negative Diplococci (Paired)',
      description: 'Paired kidney-bean shaped bacteria targeting mucosal membranes, causing burning urination and thick discharge.',
      descriptionHi: 'जोड़ों में रहने वाले जीवाणु जो मूत्रमार्ग और गर्भाशय ग्रीवा में जलन और स्राव पैदा करते हैं।',
      kitMapping: 'Cured by Kit 1 (Grey)',
      color: '#4FB6A6',
    },
    chlamydia: {
      name: 'Chlamydia trachomatis',
      nameHi: 'क्लैमाइडिया ट्रैकोमैटिस',
      type: 'Obligate Intracellular Bacteria',
      description: 'The most common silent bacterial STI. Often causes zero outward symptoms while damaging internal reproductive organs.',
      descriptionHi: 'सबसे आम शांत संक्रमण जो बिना किसी बाहरी दर्द के आंतरिक अंगों को प्रभावित करता है।',
      kitMapping: 'Cured by Kit 1 (Grey) / Kit 6 (Yellow)',
      color: '#2B6CB0',
    },
    hsv: {
      name: 'Herpes Simplex Virus (HSV-2)',
      nameHi: 'हर्पीस सिम्प्लेक्स वायरस (HSV-2)',
      type: 'Enveloped DNA Virus',
      description: 'Enveloped virus particles with glycoprotein spikes that cause recurring fluid-filled vesicles and nerve-root latency.',
      descriptionHi: 'वायरस कण जो पानी भरे दर्दनाक फफोले बनाते हैं और नसों में सुप्त रहते हैं।',
      kitMapping: 'Managed by Kit 5 (Red)',
      color: '#C53030',
    },
  };

  const active = pathogenData[selectedPathogen];

  return (
    <div className="w-full bg-[#0D2C30] text-[#F6F1E4] rounded-2xl p-4 sm:p-5 border border-teal-500/30 shadow-xl select-none">
      {/* Title & Microscope Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-teal-700/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-800/80 flex items-center justify-center text-amber-400">
            <Microscope className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              High-Power Electron Microscopy
            </span>
            <h4 className="text-xs sm:text-sm font-extrabold text-white">
              {locale === 'hi' ? 'सूक्ष्मदर्शी रोगाणु गैलरी' : 'Microscopic Pathogen Visualizer'}
            </h4>
          </div>
        </div>

        {/* Pathogen Switcher Pills */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-teal-600/30">
          {(['treponema', 'neisseria', 'chlamydia', 'hsv'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPathogen(key)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                selectedPathogen === key
                  ? 'bg-amber-400 text-teal-950 shadow font-extrabold'
                  : 'text-teal-200 hover:text-white'
              }`}
            >
              {key === 'treponema' && 'Syphilis'}
              {key === 'neisseria' && 'Gonorrhea'}
              {key === 'chlamydia' && 'Chlamydia'}
              {key === 'hsv' && 'Herpes'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual: Microscope Lens & Vector Graphics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Circular Microscope Lens Viewport */}
        <div className="relative aspect-square max-w-[200px] mx-auto rounded-full bg-gradient-to-br from-teal-950 via-[#07191C] to-black border-4 border-teal-500/40 shadow-inner flex items-center justify-center overflow-hidden">
          {/* Microscope Optical Reticle Crosshairs */}
          <div className="absolute inset-0 border border-teal-400/10 rounded-full" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-teal-400/20" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-teal-400/20" />
          <div className="absolute inset-6 border border-teal-400/15 rounded-full" />

          {/* SVG Vector Pathogen Art */}
          <svg className="w-full h-full p-4 relative z-10 animate-pulse" viewBox="0 0 200 200">
            {selectedPathogen === 'treponema' && (
              <g stroke="#E08A2C" strokeWidth="4" fill="none" strokeLinecap="round">
                {/* Spiral Spirochete 1 */}
                <path
                  d="M 30,120 Q 50,60 70,120 T 110,120 T 150,120 T 180,90"
                  className="filter drop-shadow-[0_0_8px_rgba(224,138,44,0.6)]"
                />
                {/* Spiral Spirochete 2 */}
                <path
                  d="M 20,60 Q 40,20 60,60 T 100,60 T 140,60 T 170,40"
                  stroke="#F6AD55"
                  strokeWidth="3.5"
                />
                {/* Spiral Spirochete 3 */}
                <path
                  d="M 50,160 Q 70,130 90,160 T 130,160 T 170,150"
                  stroke="#ED8936"
                  strokeWidth="3"
                />
              </g>
            )}

            {selectedPathogen === 'neisseria' && (
              <g fill="#4FB6A6" stroke="#234E52" strokeWidth="2">
                {/* Pair 1 Diplococci */}
                <g className="filter drop-shadow-[0_0_8px_rgba(79,182,166,0.6)]">
                  <ellipse cx="85" cy="100" rx="20" ry="26" transform="rotate(-15 85 100)" />
                  <ellipse cx="115" cy="100" rx="20" ry="26" transform="rotate(15 115 100)" />
                  <circle cx="82" cy="98" r="4" fill="#E6FFFA" />
                  <circle cx="118" cy="98" r="4" fill="#E6FFFA" />
                </g>
                {/* Pair 2 */}
                <g transform="translate(-40, -45) scale(0.65)" opacity="0.85">
                  <ellipse cx="85" cy="100" rx="20" ry="26" fill="#81E6D9" />
                  <ellipse cx="115" cy="100" rx="20" ry="26" fill="#81E6D9" />
                </g>
                {/* Pair 3 */}
                <g transform="translate(60, 40) scale(0.6)" opacity="0.75">
                  <ellipse cx="85" cy="100" rx="20" ry="26" fill="#319795" />
                  <ellipse cx="115" cy="100" rx="20" ry="26" fill="#319795" />
                </g>
              </g>
            )}

            {selectedPathogen === 'chlamydia' && (
              <g>
                {/* Host Cytoplasm boundary */}
                <circle cx="100" cy="100" r="75" fill="none" stroke="#2B6CB0" strokeDasharray="4 3" strokeWidth="2" />
                {/* Inclusion Vacuole */}
                <circle cx="100" cy="100" r="45" fill="#2B6CB0" fillOpacity="0.25" stroke="#63B3ED" strokeWidth="2" />
                {/* Elementary Bodies inside */}
                {[
                  [85, 80], [105, 75], [120, 90], [90, 105], [115, 110],
                  [80, 120], [105, 125], [125, 115], [95, 95], [110, 95]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="5" fill="#90CDF4" stroke="#2C5282" strokeWidth="1" />
                ))}
              </g>
            )}

            {selectedPathogen === 'hsv' && (
              <g>
                {/* Viral Envelope */}
                <circle cx="100" cy="100" r="50" fill="#742A2A" stroke="#C53030" strokeWidth="3" className="filter drop-shadow-[0_0_8px_rgba(197,48,48,0.7)]" />
                {/* Glycoprotein Spikes */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i * 360) / 16;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + 50 * Math.cos(rad);
                  const y1 = 100 + 50 * Math.sin(rad);
                  const x2 = 100 + 64 * Math.cos(rad);
                  const y2 = 100 + 64 * Math.sin(rad);
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FEB2B2" strokeWidth="2.5" />
                      <circle cx={x2} cy={y2} r="3" fill="#E53E3E" />
                    </g>
                  );
                })}
                {/* Icosahedral Core Capsid */}
                <polygon
                  points="100,70 125,82 125,118 100,130 75,118 75,82"
                  fill="#E53E3E"
                  stroke="#FFF5F5"
                  strokeWidth="1.5"
                />
              </g>
            )}
          </svg>

          {/* Scale Marker */}
          <div className="absolute bottom-2 text-[9px] font-mono text-teal-300/80 bg-black/60 px-2 py-0.5 rounded-full border border-teal-600/40">
            Scale: 10,000x
          </div>
        </div>

        {/* Clinical Info & NACO Kit Prescription Link */}
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
              {active.type}
            </span>
            <h5 className="font-extrabold text-sm sm:text-base text-white">
              {locale === 'hi' ? active.nameHi : active.name}
            </h5>
          </div>

          <p className="text-[11px] text-teal-100/90 leading-relaxed bg-black/20 p-2 rounded-lg border border-teal-700/40">
            {locale === 'hi' ? active.descriptionHi : active.description}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 shadow-sm">
              ✓ {active.kitMapping}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
