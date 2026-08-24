'use client';

import React from 'react';
import { Lesson, Locale } from '@/src/domain/content/schema';
import { StiNetworkSvgScene } from '../scenes/StiNetworkSvgScene';
import { HiddenSignsSvgScene } from '../scenes/HiddenSignsSvgScene';
import { ClinicJourneySvgScene } from '../scenes/ClinicJourneySvgScene';
import { NacoKitSpread } from '../scenes/NacoKitSpread';
import { SurakshaHelplineCard } from '../ui/SurakshaHelplineCard';
import { BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

interface LinearReaderProps {
  lessons: Lesson[];
  locale: Locale;
}

export const LinearReader: React.FC<LinearReaderProps> = ({ lessons, locale }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-6 animate-fade-in text-ink">
      {/* Intro Notice for Accessibility */}
      <div className="bg-paper-pure p-5 rounded-2xl border border-border shadow-sm flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-base text-teal-dark">
            {locale === 'hi' ? 'लीनियर (सरल) पठन मोड सक्रिय है' : 'Linear (Accessible) Reading Mode Active'}
          </h2>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            {locale === 'hi'
              ? 'यह मोड बिना किसी 3D एनीमेशन या जटिल इशारों के सभी पाठों को सीधा और क्रमबद्ध रूप में प्रस्तुत करता है।'
              : 'This mode presents all health lessons and diagrams in a direct vertical flow, fully accessible for screen readers and low-bandwidth connections.'}
          </p>
        </div>
      </div>

      {/* Sequential Lessons */}
      {lessons.map((lesson, idx) => {
        const title = lesson.title[locale] || lesson.title.en || '';
        const subtitle = lesson.subtitle?.[locale] || lesson.subtitle?.en;
        const keyMessage = lesson.keyMessage[locale] || lesson.keyMessage.en || '';
        const isFinalNacoSpread = lesson.id === 'lesson-4-naco-kits-toolkit';

        return (
          <article
            key={lesson.id}
            id={lesson.slug}
            className="bg-paper-pure rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6"
          >
            {/* Lesson Header */}
            <div className="border-b border-border pb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal">
                {locale === 'hi' ? `पाठ संख्या ${idx + 1}` : `Lesson ${idx + 1}`}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink mt-1">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm font-medium text-ink-muted mt-1.5 italic">
                  "{subtitle}"
                </p>
              )}
            </div>

            {/* Key Message */}
            <div className="bg-mint/40 p-4 rounded-2xl border border-mint-dark/30 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-teal-dark uppercase tracking-wider">
                  {locale === 'hi' ? 'मुख्य संदेश' : 'Key Message'}:
                </div>
                <p className="text-sm font-medium text-ink mt-1 leading-relaxed">{keyMessage}</p>
              </div>
            </div>

            {/* Lesson Text Blocks */}
            <div className="space-y-4 text-sm leading-relaxed text-ink">
              {lesson.blocks
                .filter((b) => b.type === 'text')
                .map((block) => (
                  <p key={block.id} className="bg-paper-deep/30 p-3 rounded-xl border border-border/50">
                    {block.content[locale] || block.content.en}
                  </p>
                ))}
            </div>

            {/* Visual Scene or Spread */}
            <div className="pt-2">
              {lesson.id === 'lesson-1-what-is-an-sti' && <StiNetworkSvgScene locale={locale} />}
              {lesson.id === 'lesson-2-hidden-signs' && <HiddenSignsSvgScene locale={locale} />}
              {lesson.id === 'lesson-3-testing-journey' && <ClinicJourneySvgScene locale={locale} />}
              {isFinalNacoSpread && <NacoKitSpread locale={locale} />}
            </div>
          </article>
        );
      })}

      {/* Direct Care Helpline Bottom Banner */}
      <SurakshaHelplineCard locale={locale} />
    </div>
  );
};
