'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/src/domain/content/schema';
import { ShieldCheck, Info, Eye, EyeOff } from 'lucide-react';
import { SourceCitationPanel } from './SourceCitationPanel';
import { IllustratedAlternative } from './IllustratedAlternative';

export interface ClinicalPhotoPair {
  id: string;
  diseaseName: Partial<Record<Locale, string>>;
  pathogen: string;
  syndrome: Partial<Record<Locale, string>>;
  nacoKit: string;
  kitColor: string;
  shortDesc: Partial<Record<Locale, string>>;
  philId?: string;
  malePhoto: {
    src: string;
    caption: Partial<Record<Locale, string>>;
    symptoms: Partial<Record<Locale, string>>;
  };
  femalePhoto: {
    src: string;
    caption: Partial<Record<Locale, string>>;
    symptoms: Partial<Record<Locale, string>>;
  };
}

export const CLINICAL_PAIRS: Record<string, ClinicalPhotoPair> = {
  'syphilis-primary': {
    id: 'syphilis-primary',
    diseaseName: {
      en: 'Primary Syphilis (Chancre)',
      hi: 'प्राथमिक सिफलिस (शैंकर घाव)',
      mr: 'प्राथमिक सिफिलीस',
      bn: 'প্রাথমিক সিফিলিস',
      ta: 'முதன்மை சிபிலிஸ்',
      te: 'ప్రాథమిక సిఫిలిస్'
    },
    pathogen: 'Treponema pallidum (Spirochete)',
    syndrome: {
      en: 'Non-Herpetic Genital Ulcer',
      hi: 'दर्द रहित जननांग घाव सिंड्रोम',
      mr: 'नॉन-हर्पेटिक व्रण',
      bn: 'নন-হার্পেটিক আলসার',
      ta: 'ஹெர்பெஸ் அல்லாத புண்',
      te: 'హెర్పెస్ కాని పుండు'
    },
    nacoKit: 'NACO Kit 3 (Black)',
    kitColor: '#1F2937',
    philId: '3804',
    shortDesc: {
      en: 'Single, clean-based, painless indurated sore appearing 2-3 weeks after exposure. Heals spontaneously but spirochetes disseminate without penicillin therapy.',
      hi: 'एकल, दर्द रहित, सख्त किनारे वाला साफ घाव। पेनिसिलिन के बिना जीवाणु शरीर में बने रहते हैं।'
    },
    malePhoto: {
      src: '/images/clinical/syphilis_male_chancre.webp',
      caption: {
        en: 'Male: Primary Chancre on glans penis with indurated borders',
        hi: 'पुरुष: लिंग के मुंड पर सख्त किनारे वाला एकल दर्द रहित घाव'
      },
      symptoms: {
        en: 'Painless, clean-based firm button-like ulcer on foreskin/glans.',
        hi: 'बिना दर्द का सख्त उभरा हुआ घाव।'
      }
    },
    femalePhoto: {
      src: '/images/clinical/syphilis_female_chancre.webp',
      caption: {
        en: 'Female: Solitary painless genital chancre on labia/fourchette',
        hi: 'महिला: योनि द्वार पर एकल दर्द रहित घाव'
      },
      symptoms: {
        en: 'Painless indurated ulcer with clean red base on labia majora.',
        hi: 'योनि के बाहरी अंगों पर बिना दर्द का साफ घाव।'
      }
    }
  },
  'syphilis-secondary': {
    id: 'syphilis-secondary',
    diseaseName: {
      en: 'Secondary Syphilis (Rash & Condyloma)',
      hi: 'द्वितीयक सिफलिस (चकत्ते एवं मस्से)',
      mr: 'द्वितीयक सिफिलीस',
      bn: 'দ্বিতীয় পর্যায়ের সিফিলিস',
      ta: 'இரண்டாம் நிலை சிபிலிஸ்',
      te: 'ద్వితీయ సిఫిలిస్'
    },
    pathogen: 'Treponema pallidum (Systemic spread)',
    syndrome: {
      en: 'Systemic Dissemination & Mucocutaneous Lesions',
      hi: 'त्वचा एवं हथेलियों पर चकत्ते',
      mr: 'त्वचेवर पुरळ व चट्टे',
      bn: 'ত্বকের ফুসকুড়ি',
      ta: 'தோல் தடிப்புகள்',
      te: 'చర్మ దద్దుర్లు'
    },
    nacoKit: 'NACO Kit 3 (Black)',
    kitColor: '#1F2937',
    philId: '6807',
    shortDesc: {
      en: 'Reddish-brown papulosquamous rash on palms/soles and moist verrucous condyloma lata in perineum.',
      hi: 'हथेलियों और तलवों पर तांबे जैसे लाल चकत्ते और गुप्तांगों पर गीले मस्से।'
    },
    malePhoto: {
      src: '/images/clinical/syphilis_palms_rash.webp',
      caption: {
        en: 'Papulosquamous annular rash on palms and soles',
        hi: 'हथेलियों पर विशिष्ट गोल लाल-भूरे चकत्ते'
      },
      symptoms: {
        en: 'Non-itchy coppery red spots on palms and soles.',
        hi: 'बिना खुजली वाले तांबे जैसे लाल धब्बे।'
      }
    },
    femalePhoto: {
      src: '/images/clinical/syphilis_condyloma_lata_female.webp',
      caption: {
        en: 'Female: Condyloma lata moist plaques in perineal folds',
        hi: 'महिला: योनि क्षेत्र में उभरे हुए अत्यधिक संक्रामक मस्से'
      },
      symptoms: {
        en: 'Moist, heaped-up verrucous plaques in skin folds.',
        hi: 'त्वचा की सिलवटों में गीले, उभरे हुए चकत्ते।'
      }
    }
  },
  'gonorrhea': {
    id: 'gonorrhea',
    diseaseName: {
      en: 'Gonorrhea (Purulent Discharge)',
      hi: 'गोनोरिया (गाढ़ा मवाद स्राव)',
      mr: 'गोनोरिया (पूस्त्राव)',
      bn: 'গনোরিয়া (পূঁজ নিঃসরণ)',
      ta: 'கொனோரியா (சீழ் கசிவு)',
      te: 'గొనేరియా (చీము కారడం)'
    },
    pathogen: 'Neisseria gonorrhoeae (Diplococci)',
    syndrome: {
      en: 'Urethral & Cervical Discharge Syndrome',
      hi: 'मूत्रमार्ग एवं ग्रीवा स्राव सिंड्रोम',
      mr: 'मूत्रमार्ग व गर्भाशयग्रीवा स्त्राव',
      bn: 'মূত্রনালী ও সার্ভিকাল স্রাব',
      ta: 'சிறுநீர் குழாய் சீழ் கசிவு',
      te: 'మూత్రనాళ చీము స్రావం'
    },
    nacoKit: 'NACO Kit 1 (Grey)',
    kitColor: '#4B5563',
    philId: '3813',
    shortDesc: {
      en: 'Severe burning pain during urination with copious, thick creamy pus discharge. Curable with NACO Kit 1.',
      hi: 'पेशाब में तेज जलन और गाढ़े पीले मवाद का स्राव। नैको किट 1 से पूरी तरह ठीक होता है।'
    },
    malePhoto: {
      src: '/images/clinical/gonorrhea_male_urethritis.webp',
      caption: {
        en: 'Male: Copious purulent creamy urethral discharge',
        hi: 'पुरुष: मूत्रमार्ग से गाढ़ा पीला-सफेद मवाद स्राव'
      },
      symptoms: {
        en: 'Severe burning with continuous pus discharge.',
        hi: 'पेशाब में तेज जलन और लगातार मवाद।'
      }
    },
    femalePhoto: {
      src: '/images/clinical/gonorrhea_cervicitis.webp',
      caption: {
        en: 'Female: Endocervical purulent exudate & cervicitis',
        hi: 'महिला: गर्भाशय ग्रीवा से मवाद का स्राव'
      },
      symptoms: {
        en: 'Yellowish vaginal discharge, cervical redness and pain.',
        hi: 'योनि से पीला मवाद और गर्भाशय ग्रीवा में सूजन।'
      }
    }
  },
  'chlamydia': {
    id: 'chlamydia',
    diseaseName: {
      en: 'Chlamydia (Watery Discharge & Cervicitis)',
      hi: 'क्लैमाइडिया (पतला स्राव एवं सूजन)',
      mr: 'क्लॅमिडीया',
      bn: 'ক্ল্যামাইডিয়া',
      ta: 'கிளமிடியா',
      te: 'క్లామిడియా'
    },
    pathogen: 'Chlamydia trachomatis (Intracellular bacterium)',
    syndrome: {
      en: 'Non-Gonococcal Urethritis & Cervicitis',
      hi: 'गैर-गोनोकोकल मूत्रमार्ग स्राव',
      mr: 'संसर्गजन्य स्त्राव',
      bn: 'সার্ভিকাল স্রাব',
      ta: 'கருப்பை வாய் தொற்று',
      te: 'గర్భాశయ స్రావం'
    },
    nacoKit: 'NACO Kit 1 / Kit 2',
    kitColor: '#10B981',
    philId: '3815',
    shortDesc: {
      en: 'Thin, clear/mucoid discharge and mild dysuria. Often "silent" (asymptomatic in 70% of women) but causes PID if untreated.',
      hi: 'पतला पानी जैसा स्राव और हल्की जलन। 70% महिलाओं में बिना लक्षण के रहता है लेकिन बांझपन का कारण बन सकता है।'
    },
    malePhoto: {
      src: '/images/clinical/chlamydia_male_urethritis.webp',
      caption: {
        en: 'Male: Thin, watery/mucoid clear urethral discharge',
        hi: 'पुरुष: मूत्रमार्ग से पतला पारदर्शी स्राव'
      },
      symptoms: {
        en: 'Mild burning and morning mucoid droplet.',
        hi: 'सुबह के समय हल्की बूंद और हल्की जलन।'
      }
    },
    femalePhoto: {
      src: '/images/clinical/chlamydia_cervicitis.webp',
      caption: {
        en: 'Female: Mucopurulent cervicitis from chlamydial infection',
        hi: 'महिला: गर्भाशय ग्रीवा से श्लेष्मा मवाद स्राव'
      },
      symptoms: {
        en: 'Friable cervix with yellow mucopurulent exudate.',
        hi: 'गर्भाशय ग्रीवा से पीला श्लेष्मा स्राव।'
      }
    }
  },
  'herpes': {
    id: 'herpes',
    diseaseName: {
      en: 'Genital Herpes (Painful Blisters)',
      hi: 'जननांग हर्पीस (दर्दनाक फफोले)',
      mr: 'हर्पीस (वेदनादायी फोड)',
      bn: 'জেনিটাল হার্পিস',
      ta: 'ஹெர்பெஸ் கொப்புளங்கள்',
      te: 'హెర్పెస్ బొబ్బలు'
    },
    pathogen: 'Herpes Simplex Virus (HSV-2 / HSV-1)',
    syndrome: {
      en: 'Herpetic Genital Ulcer Disease',
      hi: 'हर्पेटिक दर्दनाक अल्सर सिंड्रोम',
      mr: 'हर्पेटिक व्रण',
      bn: 'হার্পেটিক আলসার',
      ta: 'ஹெர்பெஸ் புண்கள்',
      te: 'హెర్పెస్ పుండ్లు'
    },
    nacoKit: 'NACO Kit 5 (Red)',
    kitColor: '#DC2626',
    philId: '3820',
    shortDesc: {
      en: 'Grouped, painful fluid-filled blisters that break into shallow sores. NACO Kit 5 (Acyclovir) relieves pain and speeds healing.',
      hi: 'पानी से भरे दर्दनाक छालों का गुच्छा जो फूटकर उथले घाव बन जाते हैं। नैको किट 5 दर्द को तुरंत रोकता है।'
    },
    malePhoto: {
      src: '/images/clinical/herpes_male_vesicles.webp',
      caption: {
        en: 'Male: Multiple grouped vesicles and erosions on shaft',
        hi: 'पुरुष: लिंग पर दर्दनाक छालों एवं घावों का गुच्छा'
      },
      symptoms: {
        en: 'Tingling followed by multiple tender fluid-filled vesicles.',
        hi: 'तेज झुनझुनी और पानी भरे दर्दनाक दाने।'
      }
    },
    femalePhoto: {
      src: '/images/clinical/herpes_female_ulcers.webp',
      caption: {
        en: 'Female: Multiple coalescing shallow painful labial ulcers',
        hi: 'महिला: योनि के होठों पर उथले दर्दनाक घाव'
      },
      symptoms: {
        en: 'Severe burning pain, multiple shallow ulcers, and groin swelling.',
        hi: 'पेशाब में तेज जलन और कई सारे उथले घाव।'
      }
    }
  },
  'warts': {
    id: 'warts',
    diseaseName: {
      en: 'Genital Warts (Condyloma Acuminata)',
      hi: 'जननांग मस्से (कैंडिलोमा)',
      mr: 'जननेंद्रियावरील चामखीळ',
      bn: 'জেনিটাল আঁচিল',
      ta: 'பிறப்புறுப்பு மருக்கள்',
      te: 'జననేంద్రియ పులిపిర్లు'
    },
    pathogen: 'Human Papillomavirus (HPV 6 & 11)',
    syndrome: {
      en: 'Genital Warty Growths',
      hi: 'गोभी जैसे उभरे हुए मस्से',
      mr: 'चामखीळ सिंड्रोम',
      bn: 'আঁচিল সিন্ড্রোম',
      ta: 'மருக்கள் சிண்ட்ரோம்',
      te: 'పులిపిరి సిండ్రోమ్'
    },
    nacoKit: 'Suraksha Clinic Referral',
    kitColor: '#D97706',
    philId: '3833',
    shortDesc: {
      en: 'Painless, fleshy cauliflower-like growths on genitals. Treated safely at Suraksha Clinics via specialized topical solutions or cryotherapy.',
      hi: 'फूलगोभी जैसे उभरे हुए दर्द रहित मस्से। सुरक्षा क्लिनिक में विशेष दवा या क्रायोथेरेपी से हटाए जाते हैं।'
    },
    malePhoto: {
      src: '/images/clinical/warts_male_glans.webp',
      caption: {
        en: 'Male: Exophytic verrucous warts on glans penis',
        hi: 'पुरुष: लिंग के मुंड पर फूलगोभी जैसे मस्से'
      },
      symptoms: {
        en: 'Painless fleshy bumps or cauliflower-like clusters.',
        hi: 'बिना दर्द के उभरे हुए मांसल मस्से।'
      }
    },
    femalePhoto: {
      src: '/images/clinical/warts_female_fourchette.webp',
      caption: {
        en: 'Female: Verrucous lesions on posterior fourchette & labia',
        hi: 'महिला: योनि द्वार पर उभरे हुए मस्से'
      },
      symptoms: {
        en: 'Multiple rough fleshy warts around vaginal opening.',
        hi: 'योनि द्वार के आसपास खुरदरे मस्से।'
      }
    }
  }
};

interface ClinicalPhotoGalleryProps {
  pairId: string;
  locale: Locale;
}

export const ClinicalPhotoGallery: React.FC<ClinicalPhotoGalleryProps> = ({ pairId, locale }) => {
  const item = CLINICAL_PAIRS[pairId] || CLINICAL_PAIRS['syphilis-primary'];
  const [isRevealed, setIsRevealed] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);

  const title = item.diseaseName[locale] || item.diseaseName.en || '';
  const desc = item.shortDesc[locale] || item.shortDesc.en || '';

  const maleCaption = item.malePhoto.caption[locale] || item.malePhoto.caption.en || '';
  const femaleCaption = item.femalePhoto.caption[locale] || item.femalePhoto.caption.en || '';

  return (
    <div className="w-full bg-paper-pure/95 border border-border rounded-2xl p-2.5 sm:p-3 shadow-sm space-y-2 select-none text-ink">
      {/* Disease Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-border/80">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-teal">
            {item.syndrome[locale] || item.syndrome.en}
          </div>
          <h3 className="text-xs sm:text-sm font-black font-display text-ink leading-tight">
            {title}
          </h3>
        </div>

        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-black text-white uppercase shrink-0 shadow-sm"
          style={{ backgroundColor: item.kitColor }}
        >
          {item.nacoKit}
        </span>
      </div>

      {/* 3-Layer Definition Overview Card */}
      <div className="bg-paper-deep/40 p-2 rounded-xl border border-border/60 space-y-1 text-xs">
        <p className="text-[10px] sm:text-[11px] text-ink leading-snug font-medium">
          {desc}
        </p>
        <div className="text-[9px] text-ink-muted flex items-center justify-between pt-0.5 border-t border-border/40">
          <span>{locale === 'hi' ? 'कारण' : 'Pathogen'}: <strong>{item.pathogen}</strong></span>
          <button
            onClick={() => setShowIllustration(!showIllustration)}
            className="text-teal font-bold underline hover:text-teal-dark"
          >
            {showIllustration
              ? (locale === 'hi' ? 'फोटो दृश्य' : 'View Clinical Photos')
              : (locale === 'hi' ? 'चित्र रेखाचित्र' : 'View Diagram')}
          </button>
        </div>
      </div>

      {/* Visual Presentation Area: Illustrated Alternative OR Shielded Clinical Photos */}
      {showIllustration ? (
        <div className="p-2 bg-paper-deep/30 rounded-xl border border-border flex flex-col items-center justify-center">
          <IllustratedAlternative diseaseId={item.id} locale={locale} activeAnatomy="penis_urethral" />
        </div>
      ) : (
        <div className="relative">
          {/* Side-by-Side Dual-Anatomical Photos */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 transition-all duration-300 ${!isRevealed ? 'filter blur-md pointer-events-none' : ''}`}>
            {/* Male Clinical Photo */}
            <div className="bg-paper-deep/60 rounded-xl p-1.5 border border-border/70 space-y-1">
              <div className="flex items-center justify-between text-[9px] font-extrabold text-teal pb-0.5">
                <span>♂ {locale === 'hi' ? 'पुरुष शरीर रचना' : 'Male Presentation'}</span>
                <span className="text-[8px] opacity-70">CDC/PHIL Record</span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-border shadow-inner bg-black">
                <Image
                  src={item.malePhoto.src}
                  alt={maleCaption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized
                />
              </div>

              <p className="text-[9px] font-bold text-ink leading-tight pt-0.5 line-clamp-2">
                {maleCaption}
              </p>
            </div>

            {/* Female Clinical Photo */}
            <div className="bg-paper-deep/60 rounded-xl p-1.5 border border-border/70 space-y-1">
              <div className="flex items-center justify-between text-[9px] font-extrabold text-teal pb-0.5">
                <span>♀ {locale === 'hi' ? 'महिला शरीर रचना' : 'Female Presentation'}</span>
                <span className="text-[8px] opacity-70">CDC/PHIL Record</span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-border shadow-inner bg-black">
                <Image
                  src={item.femalePhoto.src}
                  alt={femaleCaption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  unoptimized
                />
              </div>

              <p className="text-[9px] font-bold text-ink leading-tight pt-0.5 line-clamp-2">
                {femaleCaption}
              </p>
            </div>
          </div>

          {/* Sensitive Content Blur Shield Overlay */}
          {!isRevealed && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-paper/80 backdrop-blur-sm rounded-xl text-center space-y-2 border border-border">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                {locale === 'hi' ? 'संवेदनशील शैक्षिक चिकित्सा तस्वीर' : 'Sensitive Educational Medical Photo'}
              </div>
              <p className="text-[10px] text-ink-muted max-w-xs leading-relaxed">
                {locale === 'hi'
                  ? 'तस्वीरें केवल शैक्षिक संदर्भ के लिए हैं। किसी भी स्थिति में डॉक्टर से जांच कराएं।'
                  : 'Contains clinical reference photography. Visual appearance cannot confirm diagnosis.'}
              </p>
              <button
                onClick={() => setIsRevealed(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal text-white rounded-full text-[11px] font-bold shadow hover:bg-teal-dark transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{locale === 'hi' ? 'तस्वीर देखें' : 'Reveal Clinical Photo'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Official Government Provenance Panel */}
      <SourceCitationPanel philId={item.philId} locale={locale} />
    </div>
  );
};
