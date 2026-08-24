'use client';

import React, { useState } from 'react';
import { Lesson, Locale } from '@/src/domain/content/schema';
import { Stethoscope, Users, MessageSquare, ChevronLeft, ChevronRight, CheckSquare } from 'lucide-react';
import { StiNetworkSvgScene } from '../scenes/StiNetworkSvgScene';
import { HiddenSignsSvgScene } from '../scenes/HiddenSignsSvgScene';
import { ClinicJourneySvgScene } from '../scenes/ClinicJourneySvgScene';
import { NacoKitSpread } from '../scenes/NacoKitSpread';
import { SurakshaHelplineCard } from '../ui/SurakshaHelplineCard';

interface FacilitatorReaderProps {
  lessons: Lesson[];
  locale: Locale;
}

export const FacilitatorReader: React.FC<FacilitatorReaderProps> = ({ lessons, locale }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeLesson = lessons[currentIdx];

  const title = activeLesson.title[locale] || activeLesson.title.en || '';
  const keyMessage = activeLesson.keyMessage[locale] || activeLesson.keyMessage.en || '';
  const isFinalSpread = activeLesson.id === 'lesson-4-naco-kits-toolkit';

  // Facilitator discussion prompts for group counseling
  const getDiscussionPrompt = () => {
    if (activeLesson.id === 'lesson-1-what-is-an-sti') {
      return locale === 'hi'
        ? "चर्चा बिंदु: 'क्या आपने कभी सुना है कि साधारण शारीरिक संपर्क से भी संक्रमण हो सकता है? किसी को दोष देने के बजाय सही इलाज कैसे मदद करता है?'"
        : "Discussion Prompt: 'Ask participants: Why is it important to see an STI as a regular medical issue rather than a matter of shame or personal blame?'";
    }
    if (activeLesson.id === 'lesson-2-hidden-signs') {
      return locale === 'hi'
        ? "चर्चा बिंदु: 'अगर किसी को कोई दर्द या घाव नहीं है, तो भी क्या उसे जांच करानी चाहिए? क्यों?'"
        : "Discussion Prompt: 'Ask the group: If someone feels 100% fine, could they still carry an infection? Why is visual inspection unreliable?'";
    }
    if (activeLesson.id === 'lesson-3-testing-journey') {
      return locale === 'hi'
        ? "चर्चा बिंदु: 'क्लिनिक में नाम गोपनीय क्यों रखा जाता है? इससे लोगों का डर कैसे दूर होता है?'"
        : "Discussion Prompt: 'Ask participants: What usually stops people from visiting a clinic, and how does the confidential Suraksha Clinic token system help?'";
    }
    return locale === 'hi'
      ? "चर्चा बिंदु: '7 रंगीन किटों के लाभ और साथी के एक साथ उपचार का महत्व समझाएं।'"
      : "Discussion Prompt: 'Demonstrate the 7 color-coded kits and explain the Ping-Pong effect (why both partners must take medication together).'";
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 py-6 animate-fade-in text-ink">
      {/* Facilitator Header Bar */}
      <div className="bg-amber-500 text-ink-DEFAULT rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-ink">
              Community Health Worker & Facilitator Mode
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display leading-tight">
              {locale === 'hi' ? 'सामुदायिक स्वास्थ्य शिक्षा एवं परामर्श गाइड' : 'Presentation & Group Counseling Tool'}
            </h2>
          </div>
        </div>

        {/* Lesson Step Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
            disabled={currentIdx === 0}
            className="px-3 py-1.5 bg-ink text-white rounded-lg text-xs font-bold disabled:opacity-40 hover:bg-ink-muted transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>
          <span className="text-xs font-bold px-2 py-1 bg-white/80 rounded-md">
            {currentIdx + 1} / {lessons.length}
          </span>
          <button
            onClick={() => setCurrentIdx(Math.min(lessons.length - 1, currentIdx + 1))}
            disabled={currentIdx === lessons.length - 1}
            className="px-3 py-1.5 bg-ink text-white rounded-lg text-xs font-bold disabled:opacity-40 hover:bg-ink-muted transition-colors flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Facilitator Canvas */}
      <div className="bg-paper-pure rounded-3xl border-2 border-amber-400 p-6 sm:p-8 shadow-card space-y-6">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider">
            Lesson Module {currentIdx + 1}
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-ink mt-2">
            {title}
          </h1>
        </div>

        {/* Group Discussion Prompt Card */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-start gap-3 text-amber-950">
          <MessageSquare className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {locale === 'hi' ? 'समूह चर्चा प्रश्न (Facilitator Prompt)' : 'Group Discussion Prompt'}:
            </div>
            <p className="text-sm font-semibold mt-1 leading-relaxed">{getDiscussionPrompt()}</p>
          </div>
        </div>

        {/* Key Educational Message */}
        <div className="bg-paper-deep p-4 rounded-2xl border border-border">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-dark">
            {locale === 'hi' ? 'मुख्य सीख (Key Teaching Point)' : 'Key Teaching Point'}:
          </div>
          <p className="text-sm sm:text-base font-medium mt-1 leading-relaxed text-ink">{keyMessage}</p>
        </div>

        {/* Interactive Visual Canvas */}
        <div className="pt-2">
          {activeLesson.id === 'lesson-1-what-is-an-sti' && <StiNetworkSvgScene locale={locale} />}
          {activeLesson.id === 'lesson-2-hidden-signs' && <HiddenSignsSvgScene locale={locale} />}
          {activeLesson.id === 'lesson-3-testing-journey' && <ClinicJourneySvgScene locale={locale} />}
          {isFinalSpread && <NacoKitSpread locale={locale} defaultFacilitator={true} />}
        </div>
      </div>

      {/* Referral & Helpline Action Card */}
      <SurakshaHelplineCard locale={locale} />
    </div>
  );
};
