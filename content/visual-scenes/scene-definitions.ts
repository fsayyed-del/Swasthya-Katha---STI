import { Locale } from '@/src/domain/content/schema';

export type SceneTargetDefinition = {
  id: string;
  label: Partial<Record<Locale, string>>;
  description: Partial<Record<Locale, string>>;
  focusOrder: number;
  narrationAliases: string[];
  fallbackText: Partial<Record<Locale, string>>;
};

export type AnimationDefinition = {
  id: string;
  targetIds: string[];
  startMs: number;
  endMs: number;
  action: 'draw' | 'fade' | 'pulse' | 'reveal' | 'trace' | 'move';
  reducedMotionAction: 'none' | 'show' | 'focus';
};

export type SceneDefinition = {
  id: string;
  viewBox: string;
  title: Partial<Record<Locale, string>>;
  description: Partial<Record<Locale, string>>;
  targets: SceneTargetDefinition[];
  animation: AnimationDefinition[];
  staticFallback: string;
  reducedMotionMode: 'static' | 'fade' | 'stepwise';
};

export const VISUAL_SCENES: Record<string, SceneDefinition> = {
  'living-network': {
    id: 'living-network',
    viewBox: '0 0 1200 720',
    title: {
      en: 'The Living Network: Health & Care Pathways',
      hi: 'जीवन का नेटवर्क: स्वास्थ्य, देखभाल एवं सुरक्षा मार्ग',
      mr: 'आरोग्य व काळजी मार्ग',
      bn: 'স্বাস্থ্য ও सुरक्षার সংযোগ ব্যবস্থা',
      ta: 'ஆரோக்கிய மற்றும் பாதுகாப்பு வழிகள்',
      te: 'ఆరోగ్య మరియు సంరక్షణ మార్గాలు'
    },
    description: {
      en: 'An educational illustration demonstrating that health is about human relationships, communication, testing, and supportive healthcare rather than moral judgment.',
      hi: 'एक सजीव चित्र जो दर्शाता है कि यौन स्वास्थ्य किसी दोष या चरित्र से नहीं बल्कि बातचीत, सुरक्षा और समय पर स्वास्थ्य देखभाल से जुड़ा है।'
    },
    targets: [
      {
        id: 'node-person-a',
        label: { en: 'Open Communication', hi: 'खुली बातचीत' },
        description: { en: 'Honest, respectful conversation between partners about testing and protection.', hi: 'साथी के साथ जांच और सुरक्षा पर सम्मानजनक बातचीत।' },
        focusOrder: 1,
        narrationAliases: ['communication', 'partner', 'talk'],
        fallbackText: { en: 'Partners talking respectfully about health.', hi: 'स्वास्थ्य पर खुलकर बात करते साथी।' }
      },
      {
        id: 'node-testing',
        label: { en: 'Suraksha Clinic Testing', hi: 'सुरक्षा क्लिनिक जांच' },
        description: { en: 'Routine confidential check-ups provide clarity and peace of mind.', hi: 'नियमित और गोपनीय जांच मन को शांति और स्पष्टता देती है।' },
        focusOrder: 2,
        narrationAliases: ['clinic', 'testing', 'check'],
        fallbackText: { en: 'Testing clinic node offering free anonymous care.', hi: 'मुफ्त गोपनीय जांच केंद्र।' }
      },
      {
        id: 'node-protection',
        label: { en: 'Barrier Protection', hi: 'कंडोम सुरक्षा' },
        description: { en: 'Consistent condom use creates a reliable barrier preventing transmission.', hi: 'कंडोम का सही उपयोग संक्रमण को फैलने से रोकता है।' },
        focusOrder: 3,
        narrationAliases: ['protection', 'condom', 'barrier'],
        fallbackText: { en: 'Protective shield representing barrier methods.', hi: 'सुरक्षा ढाल जो संक्रमण रोकती है।' }
      },
      {
        id: 'node-care',
        label: { en: 'Compassionate Care', hi: 'सम्मानजनक उपचार' },
        description: { en: 'Immediate syndromic management and counseling restores complete wellbeing.', hi: 'तुरंत सही दवा और परामर्श से पूर्ण स्वास्थ्य लाभ होता है।' },
        focusOrder: 4,
        narrationAliases: ['care', 'treatment', 'support'],
        fallbackText: { en: 'Supportive healthcare node.', hi: 'सहानुभूतिपूर्ण देखभाल।' }
      }
    ],
    animation: [
      {
        id: 'anim-path-connect',
        targetIds: ['node-person-a', 'node-testing', 'node-protection', 'node-care'],
        startMs: 0,
        endMs: 3000,
        action: 'draw',
        reducedMotionAction: 'show'
      }
    ],
    staticFallback: '/images/scenes/living_network_static.svg',
    reducedMotionMode: 'static'
  },
  'hidden-signs': {
    id: 'hidden-signs',
    viewBox: '0 0 1200 720',
    title: {
      en: 'Hidden Signs: Appearance vs Scientific Reality',
      hi: 'अदृश्य लक्षण: बाहरी रूप बनाम वैज्ञानिक सत्य',
      mr: 'अदृश्य लक्षण व सत्य',
      bn: 'অদৃশ্য লক্ষণ ও সত্য',
      ta: 'தெரியாத அறிகுறிகள்',
      te: 'కనిపించని లక్షణాలు'
    },
    description: {
      en: 'Interactive magnifying lens metaphor demonstrating that up to 70% of STIs have zero visible external symptoms and only laboratory testing can reveal true health status.',
      hi: 'सूक्ष्मदर्शी लेंस का इंटरएक्टिव चित्र जो समझाता है कि 70% संक्रमणों में बाहर से कोई लक्षण नहीं दिखता, केवल क्लिनिकल जांच ही सच्चाई बता सकती है।'
    },
    targets: [
      {
        id: 'target-visible-surface',
        label: { en: 'Healthy Appearance', hi: 'स्वस्थ बाहरी रूप' },
        description: { en: 'A person may look and feel completely healthy and energetic.', hi: 'व्यक्ति बाहर से पूरी तरह स्वस्थ और ऊर्जावान दिख सकता है।' },
        focusOrder: 1,
        narrationAliases: ['appearance', 'healthy', 'surface'],
        fallbackText: { en: 'Healthy silhouette with clear skin.', hi: 'स्वस्थ दिखने वाला व्यक्ति।' }
      },
      {
        id: 'target-hidden-pathogens',
        label: { en: 'Dormant Micro-organisms', hi: 'शांत सूक्ष्म जीवाणु' },
        description: { en: 'Microscopic bacteria can live quietly without causing pain or sores.', hi: 'जीवाणु बिना दर्द या घाव दिए चुपचाप शरीर में रह सकते हैं।' },
        focusOrder: 2,
        narrationAliases: ['microscope', 'hidden', 'bacteria'],
        fallbackText: { en: 'Abstract vector microorganisms inside the cellular window.', hi: 'कोशिका के भीतर शांत सूक्ष्म जीवाणु।' }
      },
      {
        id: 'target-testing-reassurance',
        label: { en: 'Routine Check Reassurance', hi: 'नियमित जांच सुरक्षा' },
        description: { en: 'A quick painless check at a Suraksha Clinic detects infections before any harm.', hi: 'समय पर साधारण जांच भविष्य की परेशानियों से बचाती है।' },
        focusOrder: 3,
        narrationAliases: ['clinic-check', 'lab-test'],
        fallbackText: { en: 'Safe clinic testing shield.', hi: 'सुरक्षा क्लिनिक जांच ढाल।' }
      }
    ],
    animation: [
      {
        id: 'anim-lens-reveal',
        targetIds: ['target-hidden-pathogens'],
        startMs: 0,
        endMs: 2500,
        action: 'reveal',
        reducedMotionAction: 'show'
      }
    ],
    staticFallback: '/images/scenes/hidden_signs_static.svg',
    reducedMotionMode: 'stepwise'
  },
  'clinic-journey': {
    id: 'clinic-journey',
    viewBox: '0 0 1200 720',
    title: {
      en: 'The 5-Step Suraksha Clinic Journey',
      hi: 'सुरक्षा क्लिनिक की 5-चरणीय यात्रा',
      mr: '५ टप्प्यांची क्लिनिक भेट',
      bn: 'সুরক্ষা ক্লিনিকের ৫টি সহজ ধাপ',
      ta: '5 நிலைகளின் சிகிச்சை பயணம்',
      te: 'సురక్ష క్లినిక్ 5 దశల ప్రయాణం'
    },
    description: {
      en: 'Step-by-step reassuring walkthrough of a confidential, stigma-free visit to a government Suraksha Clinic.',
      hi: 'सरकारी सुरक्षा क्लिनिक में जाने पर मिलने वाली सम्मानजनक, एकांत और मुफ्त देखभाल का चरणबद्ध विवरण।'
    },
    targets: [
      {
        id: 'step-arrive',
        label: { en: '1. Welcome & Token', hi: '1. स्वागत एवं टोकन' },
        description: { en: 'Receive a private token number that keeps your personal identity 100% confidential.', hi: 'एक निजी टोकन कोड मिलता है जिससे नाम उजागर नहीं होता।' },
        focusOrder: 1,
        narrationAliases: ['step1', 'token', 'arrive'],
        fallbackText: { en: 'Step 1: Private Token Registration.', hi: 'चरण 1: निजी टोकन पंजीकरण।' }
      },
      {
        id: 'step-counsel',
        label: { en: '2. Private Talk', hi: '2. एकांत परामर्श' },
        description: { en: 'Speak in a private room with a trained, compassionate counselor.', hi: 'एकांत कमरे में प्रशिक्षित काउंसलर से खुलकर बातचीत।' },
        focusOrder: 2,
        narrationAliases: ['step2', 'counseling', 'talk'],
        fallbackText: { en: 'Step 2: Confidential Counseling.', hi: 'चरण 2: एकांत परामर्श।' }
      },
      {
        id: 'step-assess',
        label: { en: '3. Gentle Check', hi: '3. दर्द-रहित जांच' },
        description: { en: 'Painless, gentle examination or rapid finger-prick blood drop.', hi: 'उंगली से एक बूंद खून या हल्का स्वैब।' },
        focusOrder: 3,
        narrationAliases: ['step3', 'check', 'sample'],
        fallbackText: { en: 'Step 3: Gentle Sample Assessment.', hi: 'चरण 3: दर्द-रहित जांच।' }
      },
      {
        id: 'step-guidance',
        label: { en: '4. Free NACO Kit', hi: '4. मुफ्त दवा किट' },
        description: { en: 'Receive the exact color-coded NACO kit and free quality condoms immediately.', hi: 'तुरंत सही रंग की मुफ्त दवा किट एवं कंडोम।' },
        focusOrder: 4,
        narrationAliases: ['step4', 'kit', 'medicine'],
        fallbackText: { en: 'Step 4: Free Standardized NACO Kit.', hi: 'चरण 4: मुफ्त दवा किट।' }
      },
      {
        id: 'step-followup',
        label: { en: '5. Follow-Up Reassurance', hi: '5. 7-दिवसीय स्वास्थ्य पुष्टि' },
        description: { en: 'Return after 7 days for a quick check ensuring complete cure.', hi: '7 दिन बाद आकर पुष्टि करें कि संक्रमण पूर्णतः ठीक हो चुका है।' },
        focusOrder: 5,
        narrationAliases: ['step5', 'followup', 'heal'],
        fallbackText: { en: 'Step 5: Follow-Up Reassurance.', hi: 'चरण 5: स्वास्थ्य पुष्टि।' }
      }
    ],
    animation: [
      {
        id: 'anim-journey-flow',
        targetIds: ['step-arrive', 'step-counsel', 'step-assess', 'step-guidance', 'step-followup'],
        startMs: 0,
        endMs: 4000,
        action: 'trace',
        reducedMotionAction: 'show'
      }
    ],
    staticFallback: '/images/scenes/clinic_journey_static.svg',
    reducedMotionMode: 'stepwise'
  },
  'naco-cabinet': {
    id: 'naco-cabinet',
    viewBox: '0 0 1200 720',
    title: {
      en: 'The 7 Color-Coded Syndromic Kit Cabinet',
      hi: '7 कलर-कोडेड NACO दवा कैबिनेट',
      mr: '७ रंगीत किट्सची कॅबिनेट',
      bn: '৭টি রঙের ন্যাকো কিট ক্যাবিনেট',
      ta: '7 வண்ண கிட் அலமாரி',
      te: '7 రంగు కిట్ల క్యాబినెట్'
    },
    description: {
      en: 'Tactile 3D cabinet representing the 7 standardized syndromic management kits designed by the National AIDS Control Organisation (NACO).',
      hi: '7 रंगीन किटों का स्पर्शनीय कैबिनेट जो भारत सरकार के सिंड्रोमिक उपचार मॉडल को प्रदर्शित करता है।'
    },
    targets: [
      {
        id: 'kit-1-grey',
        label: { en: 'Kit 1: Grey (Discharge)', hi: 'किट 1: ग्रे (स्राव)' },
        description: { en: 'Urethral & Cervical Discharge (Gonorrhea & Chlamydia coverage)', hi: 'मूत्रमार्ग एवं ग्रीवा स्राव' },
        focusOrder: 1,
        narrationAliases: ['kit1', 'grey'],
        fallbackText: { en: 'Kit 1: Grey box for urethral discharge.', hi: 'किट 1: ग्रे बॉक्स।' }
      },
      {
        id: 'kit-2-green',
        label: { en: 'Kit 2: Green (Vaginitis)', hi: 'किट 2: हरा (योनि स्राव)' },
        description: { en: 'Vaginal Discharge (Candidiasis, Trichomoniasis, Bacterial Vaginosis)', hi: 'योनि स्राव एवं खुजली' },
        focusOrder: 2,
        narrationAliases: ['kit2', 'green'],
        fallbackText: { en: 'Kit 2: Green box for vaginitis.', hi: 'किट 2: हरा बॉक्स।' }
      },
      {
        id: 'kit-3-black',
        label: { en: 'Kit 3: Black (Ulcers)', hi: 'किट 3: काला (घाव)' },
        description: { en: 'Non-Herpetic Genital Ulcers (Syphilis & Chancroid)', hi: 'दर्द रहित जननांग घाव' },
        focusOrder: 3,
        narrationAliases: ['kit3', 'black'],
        fallbackText: { en: 'Kit 3: Black box for genital ulcers.', hi: 'किट 3: काला बॉक्स।' }
      },
      {
        id: 'kit-4-blue',
        label: { en: 'Kit 4: Blue (Penicillin Allergic)', hi: 'किट 4: नीला (एलर्जी)' },
        description: { en: 'Non-Herpetic Genital Ulcers in Penicillin-Allergic individuals', hi: 'पेनिसिलिन एलर्जी वाले रोगियों के लिए' },
        focusOrder: 4,
        narrationAliases: ['kit4', 'blue'],
        fallbackText: { en: 'Kit 4: Blue box for penicillin allergy.', hi: 'किट 4: नीला बॉक्स।' }
      },
      {
        id: 'kit-5-red',
        label: { en: 'Kit 5: Red (Herpes)', hi: 'किट 5: लाल (हर्पीस)' },
        description: { en: 'Herpetic Genital Ulcers (Genital Herpes Simplex)', hi: 'दर्दनाक छाले एवं हर्पीस' },
        focusOrder: 5,
        narrationAliases: ['kit5', 'red'],
        fallbackText: { en: 'Kit 5: Red box for herpes ulcers.', hi: 'किट 5: लाल बॉक्स।' }
      },
      {
        id: 'kit-6-yellow',
        label: { en: 'Kit 6: Yellow (Lower Abdominal Pain)', hi: 'किट 6: पीला (पेट दर्द / PID)' },
        description: { en: 'Pelvic Inflammatory Disease (PID)', hi: 'महिलाओं में पेट के निचले हिस्से का दर्द' },
        focusOrder: 6,
        narrationAliases: ['kit6', 'yellow'],
        fallbackText: { en: 'Kit 6: Yellow box for PID.', hi: 'किट 6: पीला बॉक्स।' }
      },
      {
        id: 'kit-7-brown',
        label: { en: 'Kit 7: Brown (Groin Swelling)', hi: 'किट 7: भूरा (गिल्टी / बूबो)' },
        description: { en: 'Inguinal Lymphadenopathy / Bubo', hi: 'जांघ की गिल्टी में सूजन' },
        focusOrder: 7,
        narrationAliases: ['kit7', 'brown'],
        fallbackText: { en: 'Kit 7: Brown box for bubo.', hi: 'किट 7: भूरा बॉक्स।' }
      }
    ],
    animation: [
      {
        id: 'anim-cabinet-drawer',
        targetIds: ['kit-1-grey', 'kit-2-green', 'kit-3-black', 'kit-4-blue', 'kit-5-red', 'kit-6-yellow', 'kit-7-brown'],
        startMs: 0,
        endMs: 3500,
        action: 'pulse',
        reducedMotionAction: 'show'
      }
    ],
    staticFallback: '/images/scenes/naco_cabinet_static.svg',
    reducedMotionMode: 'static'
  },
  'protection-orbit': {
    id: 'protection-orbit',
    viewBox: '0 0 1200 720',
    title: {
      en: 'The Protection & Wellness Orbit',
      hi: 'सुरक्षा, जांच एवं स्वास्थ्य परिक्रमा चक्र',
      mr: 'आरोग्य संरक्षण चक्र',
      bn: 'সুরক্ষা ও স্বাস্থ্য চক্র',
      ta: 'பாதுகாப்பு மற்றும் ஆரோக்கிய வளையம்',
      te: 'రక్షణ మరియు ఆరోగ్య చక్రం'
    },
    description: {
      en: 'Harmonious holistic wheel connecting 6 essential pillars: Honest Conversation, Consistent Condom Protection, Routine Testing, Immediate Treatment, Partner Care, and 7-Day Follow-Up.',
      hi: 'एक संपूर्ण स्वास्थ्य चक्र जो 6 स्तंभों को जोड़ता है: खुली बातचीत, कंडोम सुरक्षा, नियमित जांच, तुरंत इलाज, साथी की देखभाल, और 7-दिवसीय पुष्टि।'
    },
    targets: [
      {
        id: 'orbit-conversation',
        label: { en: '1. Conversation', hi: '1. खुली बातचीत' },
        description: { en: 'Normalize discussing sexual health with partners without fear or stigma.', hi: 'बिना किसी संकोच के यौन स्वास्थ्य पर संवाद।' },
        focusOrder: 1,
        narrationAliases: ['conversation', 'talk'],
        fallbackText: { en: 'Honest conversation node.', hi: 'संवाद स्तंभ।' }
      },
      {
        id: 'orbit-protection',
        label: { en: '2. Barrier Protection', hi: '2. कंडोम सुरक्षा' },
        description: { en: 'Consistent use of condoms prevents passing of bodily fluids.', hi: 'कंडोम का सही व नियमित उपयोग।' },
        focusOrder: 2,
        narrationAliases: ['protection', 'condom'],
        fallbackText: { en: 'Barrier protection node.', hi: 'सुरक्षा स्तंभ।' }
      },
      {
        id: 'orbit-testing',
        label: { en: '3. Routine Testing', hi: '3. नियमित जांच' },
        description: { en: 'Periodic check-ups at Suraksha Clinics reveal hidden infections.', hi: 'समय पर क्लिनिकल जांच।' },
        focusOrder: 3,
        narrationAliases: ['testing', 'check'],
        fallbackText: { en: 'Routine testing node.', hi: 'जांच स्तंभ।' }
      },
      {
        id: 'orbit-treatment',
        label: { en: '4. Immediate Care', hi: '4. तुरंत इलाज' },
        description: { en: 'Complete the entire course of free NACO syndromic medication.', hi: 'डॉक्टर द्वारा दी गई पूरी दवा लेना।' },
        focusOrder: 4,
        narrationAliases: ['treatment', 'medicine'],
        fallbackText: { en: 'Medical treatment node.', hi: 'इलाज स्तंभ।' }
      },
      {
        id: 'orbit-partner',
        label: { en: '5. Partner Care', hi: '5. साथी की देखभाल' },
        description: { en: 'Simultaneous treatment for partners stops repeat infections.', hi: 'दोनों साथियों का एक साथ इलाज।' },
        focusOrder: 5,
        narrationAliases: ['partner-care'],
        fallbackText: { en: 'Partner care node.', hi: 'साथी की देखभाल स्तंभ।' }
      },
      {
        id: 'orbit-followup',
        label: { en: '6. Follow-Up Reassurance', hi: '6. स्वास्थ्य पुष्टि' },
        description: { en: 'Revisit the clinic after 7 days to confirm complete resolution.', hi: '7 दिन बाद स्वास्थ्य लाभ की पुष्टि।' },
        focusOrder: 6,
        narrationAliases: ['followup-node'],
        fallbackText: { en: 'Follow-up reassurance node.', hi: 'पुष्टि स्तंभ।' }
      }
    ],
    animation: [
      {
        id: 'anim-orbit-spin',
        targetIds: ['orbit-conversation', 'orbit-protection', 'orbit-testing', 'orbit-treatment', 'orbit-partner', 'orbit-followup'],
        startMs: 0,
        endMs: 6000,
        action: 'pulse',
        reducedMotionAction: 'show'
      }
    ],
    staticFallback: '/images/scenes/protection_orbit_static.svg',
    reducedMotionMode: 'static'
  }
};
