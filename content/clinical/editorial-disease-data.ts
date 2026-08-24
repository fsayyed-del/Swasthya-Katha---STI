import { DiseaseEditorialData } from '@/components/clinical/EditorialDiseasePage';

export const EDITORIAL_DISEASE_DATA: Record<string, DiseaseEditorialData> = {
  'primary-syphilis': {
    id: 'primary-syphilis',
    tag: { en: '09-07-2026 • CLINICAL ATLAS', hi: 'क्लिनिकल एटलस • सिफलिस' },
    title: { en: 'Primary Syphilis (Treponema pallidum)', hi: 'प्राथमिक सिफलिस (प्रारंभिक अवस्था)' },
    kitBadge: { en: 'NACO Kit 3 (White/Black)', hi: 'NACO किट 3', color: '#1A202C' },
    overview: {
      en: 'Primary syphilis manifests as a solitary, painless genital ulcer (chancre) with an indurated border and clean base, developing 10–90 days after exposure.',
      hi: 'प्राथमिक सिफलिस में जननांग पर एक दर्द-रहित घाव (शैंकर) होता है जिसके किनारे कड़े और तल साफ होते हैं। यह संपर्क के 10 से 90 दिनों में प्रकट होता है।',
    },
    maleDetails: {
      en: 'Single dry-based, painless indurated chancre on coronal sulcus, glans, or penile shaft with rubbery regional lymphadenopathy.',
      hi: 'लिंग की मुंड या शाफ्ट पर एक कठोर, दर्द-रहित घाव और जांघ की गिल्टी में सूजन।',
    },
    femaleDetails: {
      en: 'Painless chancre on labia majora/minora, fourchette, or cervix. Frequently overlooked due to internal anatomic location.',
      hi: 'योनिद्वार, लेबिया या गर्भाशय ग्रीवा पर दर्द-रहित घाव। आंतरिक होने के कारण अक्सर ध्यान नहीं जाता।',
    },
    photos: [
      {
        id: 'syphilis-male',
        imageSrc: '/images/clinical/syphilis_chancre_penis.webp',
        caption: {
          en: 'Primary Chancre (Male): Dry-based, painless ulcer with clean indurated borders on the penile shaft.',
          hi: 'प्राथमिक शैंकर (पुरुष): लिंग पर कड़े किनारों वाला दर्द-रहित सूखा घाव।',
        },
        gender: 'male',
        citation: 'Mosby-Wolfe / McGraw-Hill / CDC PHIL ID #1234',
      },
      {
        id: 'syphilis-female',
        imageSrc: '/images/clinical/syphilis_chancre_vulva.webp',
        caption: {
          en: 'Primary Chancre (Female): Solitary painless genital chancre with a clean base on the vulva.',
          hi: 'प्राथमिक शैंकर (महिला): योनि पर साफ तल वाला एकल दर्द-रहित जननांग घाव।',
        },
        gender: 'female',
        citation: 'Naval Medical Center, Portsmouth, VA / CDC',
      },
    ],
  },

  'secondary-syphilis': {
    id: 'secondary-syphilis',
    tag: { en: '09-07-2026 • SYSTEMIC MANIFESTATIONS', hi: 'द्वितीयक सिफलिस • शारीरिक प्रसार' },
    title: { en: 'Secondary Syphilis: Systemic Signs', hi: 'द्वितीयक सिफलिस: चकत्ते एवं लक्षण' },
    kitBadge: { en: 'NACO Kit 3 (White/Black)', hi: 'NACO किट 3', color: '#1A202C' },
    overview: {
      en: 'Occurs 4–10 weeks after primary chancre. Features non-itchy copper-red maculopapular rash on trunk, palms, and soles, oral mucous patches, and condyloma lata.',
      hi: 'प्राथमिक घाव के 4 से 10 सप्ताह बाद पूरे शरीर, हथेलियों और तलवों पर तांबे जैसे लाल चकत्ते, मुंह में छाले और जननांगों पर मस्सेनुमा उभार (कंडायलोमा लाटा) होते हैं।',
    },
    maleDetails: {
      en: 'Extensive papulosquamous annular rash over trunk, copper-red lesions on palms/soles, and highly infectious moist condyloma lata.',
      hi: 'पीठ, सीने, हथेलियों व तलवों पर गोल चकत्ते और जननांगों पर अत्यधिक संक्रामक गीले उभार।',
    },
    femaleDetails: {
      en: 'Palmar/plantar rashes, mucous patches in oral cavity, patchy alopecia, and hypertrophic perianal condyloma lata.',
      hi: 'हथेलियों पर चकत्ते, मुंह के भीतर सफेद छाले और गुदा के आसपास उभरे हुए गीले मस्से।',
    },
    photos: [
      {
        id: 'secondary-trunk',
        imageSrc: '/images/clinical/slide_3_img_1.jpeg',
        caption: {
          en: 'Secondary Syphilis Trunk Rash: Generalized non-pruritic maculopapular eruptions across the back and trunk.',
          hi: 'द्वितीयक सिफलिस: पीठ और धड़ पर बिना खुजली वाले लाल चकत्ते।',
        },
        gender: 'both',
        citation: 'Atlas of Sexually Transmitted Diseases / McGraw-Hill',
      },
      {
        id: 'secondary-palms',
        imageSrc: '/images/clinical/slide_3_img_2.jpeg',
        caption: {
          en: 'Palmar Papulosquamous Rash: Characteristic annular copper-colored lesions on palms.',
          hi: 'हथेली पर तांबे के रंग के विशेष चकत्ते (पामर रैश)।',
        },
        gender: 'both',
        citation: 'Handsfield / McGraw-Hill',
      },
    ],
  },

  'gonorrhea': {
    id: 'gonorrhea',
    tag: { en: '09-07-2026 • PURULENT DISCHARGE', hi: 'सुजाक (गोनोरिया) • मवाद स्राव' },
    title: { en: 'Gonorrhea (Neisseria gonorrhoeae)', hi: 'गोनोरिया (सुजाक संक्रमण)' },
    kitBadge: { en: 'NACO Kit 1 (Grey)', hi: 'NACO किट 1 (ग्रे)', color: '#4A5568' },
    overview: {
      en: 'Gram-negative diplococcal infection characterized by severe burning micturition and copious, thick purulent yellow-green discharge in both men and women.',
      hi: 'ग्राम-नेगेटिव बैक्टीरिया से होने वाला संक्रमण जिसमें पेशाब में तीव्र जलन और गाढ़ा पीला-हरा मवाद जैसा स्राव होता है।',
    },
    maleDetails: {
      en: 'Acute urethritis with intense dysuria and profuse creamy purulent urethral discharge appearing 2–7 days post-exposure.',
      hi: 'पेशाब करते समय अत्यधिक जलन और लिंग से गाढ़ा मवाद निकलना (एक्यूट यूरेथ्राइटिस)।',
    },
    femaleDetails: {
      en: 'Purulent urethritis and endocervicitis with abnormal vaginal discharge, pelvic ache, or completely asymptomatic in up to 70% of women.',
      hi: 'योनि व मूत्रमार्ग से मवाद स्राव और गर्भाशय ग्रीवा में सूजन। 70% महिलाओं में कोई दर्द नहीं होता।',
    },
    photos: [
      {
        id: 'gonorrhea-male',
        imageSrc: '/images/clinical/gonorrhea_male_urethritis.webp',
        caption: {
          en: 'Male Urethritis: Copious, thick purulent gonococcal discharge from the urethral meatus.',
          hi: 'पुरुष मूत्रमार्ग स्राव: मूत्रमार्ग से गाढ़ा मवाद जैसा गोनोकोकल स्राव।',
        },
        gender: 'male',
        citation: 'Mosby-Wolfe / CDC PHIL ID #1237',
      },
      {
        id: 'gonorrhea-female',
        imageSrc: '/images/clinical/gonorrhea_female_urethritis.webp',
        caption: {
          en: 'Female Urethritis: Purulent discharge at the external urethral orifice.',
          hi: 'महिला मूत्रमार्ग स्राव: मूत्रद्वार पर गाढ़ा मवाद स्राव।',
        },
        gender: 'female',
        citation: 'London: Mosby-Wolfe / CDC',
      },
    ],
  },

  'chlamydia-lgv': {
    id: 'chlamydia-lgv',
    tag: { en: '09-07-2026 • MUCOPURULENT CERVICITIS & BUBO', hi: 'क्लैमाइडिया एवं एलजीवी' },
    title: { en: 'Chlamydia & Lymphogranuloma Venereum (LGV)', hi: 'क्लैमाइडिया एवं एलजीवी (गिल्टी सूजन)' },
    kitBadge: { en: 'NACO Kit 1 & Kit 7', hi: 'NACO किट 1 एवं किट 7', color: '#78350F' },
    overview: {
      en: 'Chlamydia trachomatis causes silent urethritis and cervicitis, while LGV serovars (L1-L3) produce painful enlarged inguinal lymph nodes (buboes).',
      hi: 'क्लैमाइडिया से पतला मवाद स्राव और एलजीवी से जांघ की गिल्टी में बड़ी और दर्दनाक सूजन (बूबो) होती है।',
    },
    maleDetails: {
      en: 'Mild dysuria with clear or thin mucoid urethral discharge; unilateral painful swollen groin lymph nodes (LGV bubo).',
      hi: 'पेशाब में हल्की जलन, पानी जैसा पतला स्राव और जांघ की गिल्टी में बड़ा दर्दनाक उभार।',
    },
    femaleDetails: {
      en: 'Mucopurulent cervicitis, cervical friability (bleeding on contact), pelvic pain, and risk of Pelvic Inflammatory Disease (PID).',
      hi: 'गर्भाशय ग्रीवा में सूजन, छूने पर रक्तस्राव और पेट के निचले हिस्से में तेज दर्द।',
    },
    photos: [
      {
        id: 'chlamydia-male',
        imageSrc: '/images/clinical/chlamydia_male_urethritis.webp',
        caption: {
          en: 'Chlamydial Urethritis: Thin, mucoid, watery discharge from the male urethra.',
          hi: 'क्लैमाइडिया स्राव: मूत्रमार्ग से पतला पानी जैसा स्राव।',
        },
        gender: 'male',
        citation: 'Walter Stamm, MD / Handsfield Atlas',
      },
      {
        id: 'lgv-bubo',
        imageSrc: '/images/clinical/lgv_inguinal_bubo.webp',
        caption: {
          en: 'LGV Inguinal Bubo: Unilateral enlarged, tender inguinal lymphadenopathy.',
          hi: 'एलजीवी बूबो: जांघ की गिल्टी में बड़ी और दर्दनाक सूजन।',
        },
        gender: 'male',
        citation: 'Lawrence B. Stack, MD / McGraw-Hill',
      },
    ],
  },

  'genital-herpes': {
    id: 'genital-herpes',
    tag: { en: '09-07-2026 • VESICULAR ULCERATIONS', hi: 'जननांग हर्पीस • दर्दनाक छाले' },
    title: { en: 'Genital Herpes Simplex (HSV-2)', hi: 'जननांग हर्पीस (हर्पीस सिम्प्लेक्स)' },
    kitBadge: { en: 'NACO Kit 5 (Red)', hi: 'NACO किट 5 (लाल)', color: '#DC2626' },
    overview: {
      en: 'Viral infection presenting with clusters of extremely painful fluid-filled vesicles that rupture into shallow, erythematous ulcerations.',
      hi: 'हर्पीस वायरस से होने वाला संक्रमण जिसमें पानी भरे छोटे दर्दनाक छाले होते हैं जो फूटकर लाल घाव बन जाते हैं।',
    },
    maleDetails: {
      en: 'Multiple painful grouped vesicles and erosions on the glans, foreskin, and penile shaft with burning and tingling sensations.',
      hi: 'लिंग पर पानी भरे दानों और छालों का गुच्छा, जिसमें तेज चुभन, दर्द और जलन होती है।',
    },
    femaleDetails: {
      en: 'Severe vulvar pain, multiple coalescing ulcerations on labia, dysuria, vaginal discharge, and cervical erosions.',
      hi: 'योनिद्वार और लेबिया पर अत्यधिक दर्दनाक छाले व घाव, जिससे पेशाब में तेज चुभन होती है।',
    },
    photos: [
      {
        id: 'herpes-male',
        imageSrc: '/images/clinical/herpes_male_vesicles.webp',
        caption: {
          en: 'Primary Genital Herpes (Male): Multiple grouped vesicular lesions and superficial ulcerations.',
          hi: 'पुरुष हर्पीस: लिंग पर पानी भरे छालों और घावों का गुच्छा।',
        },
        gender: 'male',
        citation: 'Hunter Handsfield / McGraw-Hill / CDC',
      },
      {
        id: 'herpes-female',
        imageSrc: '/images/clinical/herpes_female_ulcers.webp',
        caption: {
          en: 'Primary Genital Herpes (Female): Multiple coalescing superficial ulcerations on the vulva.',
          hi: 'महिला हर्पीस: योनि पर अत्यधिक दर्दनाक छालों व घावों का फैलाव।',
        },
        gender: 'female',
        citation: 'Lawrence B. Stack, MD / CDC PHIL ID #1240',
      },
    ],
  },

  'chancroid-pediculosis': {
    id: 'chancroid-pediculosis',
    tag: { en: '09-07-2026 • ULCERS & PARASITES', hi: 'चैनक्रॉइड एवं जूँ (जूँ संक्रमण)' },
    title: { en: 'Chancroid & Pediculosis Pubis (Crab Lice)', hi: 'चैनक्रॉइड एवं जूँ संक्रमण' },
    kitBadge: { en: 'NACO Kit 3 & Kit 7', hi: 'NACO किट 3 एवं किट 7', color: '#1F2937' },
    overview: {
      en: 'Chancroid causes painful ragged deep ulcers and fluctuant buboes. Pediculosis pubis involves Phthirus pubis lice clinging to pubic hairs causing intense nocturnal pruritus.',
      hi: 'चैनक्रॉइड में गहरे दर्दनाक घाव और गिल्टी में मवाद होता है। पेडीकुलोसिस में जूँ बालों की जड़ों में चिपककर तीव्र खुजली करती हैं।',
    },
    maleDetails: {
      en: 'Multiple painful soft ulcers with undermined edges and suppurative inguinal bubo; visible crab lice and nits attached to pubic hair.',
      hi: 'गहरे दर्दनाक घाव, गिल्टी में मवाद और जांघ के बालों में जूँ एवं उनके अंडे (निट्स)।',
    },
    femaleDetails: {
      en: 'Painful ulcers at the introitus and fourchette; severe itching in pubic region, perianal area, and occasionally eyelashes.',
      hi: 'योनि प्रवेश द्वार पर गहरे दर्दनाक घाव और प्यूबिक क्षेत्र में तेज खुजली।',
    },
    photos: [
      {
        id: 'chancroid-ulcers',
        imageSrc: '/images/clinical/chancroid_ulcers.webp',
        caption: {
          en: 'Chancroid Lesions: Multiple painful deep ulcerations with ragged undermined edges.',
          hi: 'चैनक्रॉइड घाव: असमान किनारों वाले गहरे और अत्यंत दर्दनाक घाव।',
        },
        gender: 'both',
        citation: 'Hunter Handsfield / McGraw-Hill',
      },
      {
        id: 'pediculosis-hair',
        imageSrc: '/images/clinical/pediculosis_pubis_hair.webp',
        caption: {
          en: 'Pediculosis Pubis (Crab Lice): Phthirus pubis lice and nits firmly attached to pubic hairs.',
          hi: 'पेडीकुलोसिस प्यूबिस: जांघ के बालों से चिपकी हुई जूँ और उनके अंडे।',
        },
        gender: 'both',
        citation: 'Mosby-Wolfe / CDC PHIL ID #1244',
      },
    ],
  },

  'genital-warts': {
    id: 'genital-warts',
    tag: { en: '09-07-2026 • HUMAN PAPILLOMAVIRUS', hi: 'जननांग मस्से (एचपीवी)' },
    title: { en: 'Genital Warts (Condyloma Acuminata)', hi: 'जननांग मस्से (कंडायलोमा एक्युमिनाटा)' },
    kitBadge: { en: 'Clinical Management', hi: 'क्लिनिकल उपचार', color: '#D97706' },
    overview: {
      en: 'Caused by HPV (types 6 and 11). Presents as fleshy, cauliflower-like exophytic papules on the external genitalia and perianal region.',
      hi: 'ह्यूमन पेपिलोमावायरस (HPV) से होने वाले फूलगोभी के आकार के उभरे हुए मस्से जो जननांगों व गुदा के आसपास फैलते हैं।',
    },
    maleDetails: {
      en: 'Fleshy, verrucous papules on the glans penis, foreskin, urethral meatus, and scrotum.',
      hi: 'लिंग की मुंड, चमड़ी और अंडकोष पर फूलगोभी जैसे उभरे हुए मस्से।',
    },
    femaleDetails: {
      en: 'Exophytic cauliflower-like lesions on the labia majora/minora, introitus, posterior fourchette, and perianal skin.',
      hi: 'योनिद्वार, लेबिया और गुदा के आसपास उभरे हुए खुरदुरे मस्सों का गुच्छा।',
    },
    photos: [
      {
        id: 'warts-male',
        imageSrc: '/images/clinical/slide_18_img_1.jpeg',
        caption: {
          en: 'Genital Warts (Male): Typical verrucous condyloma acuminata lesions on the glans penis.',
          hi: 'पुरुष जननांग मस्से: लिंग के अगले भाग पर उभरे हुए मस्से।',
        },
        gender: 'male',
        citation: 'Morse, Moreland, Thompson / McGraw-Hill',
      },
      {
        id: 'warts-female',
        imageSrc: '/images/clinical/slide_17_img_2.jpeg',
        caption: {
          en: 'Genital Warts (Female): Verrucous cauliflower-like lesions of the posterior fourchette and vulva.',
          hi: 'महिला जननांग मस्से: योनिद्वार पर फूलगोभी के आकार के मस्सों का समूह।',
        },
        gender: 'female',
        citation: 'Hunter Handsfield / McGraw-Hill',
      },
    ],
  },

  'vaginal-discharge-pid': {
    id: 'vaginal-discharge-pid',
    tag: { en: '09-07-2026 • VAGINITIS & PELVIC PAIN', hi: 'योनि स्राव एवं पीआईडी' },
    title: { en: 'Vaginitis Syndromes & Pelvic Inflammatory Disease (PID)', hi: 'योनि स्राव एवं पेल्विक सूजन (पीआईडी)' },
    kitBadge: { en: 'NACO Kit 2 & Kit 6', hi: 'NACO किट 2 एवं 6', color: '#059669' },
    overview: {
      en: 'Vaginitis presents with abnormal vaginal discharge, odor, and pruritus (Candidiasis, Trichomoniasis, BV). Ascending infection causes PID with lower abdominal pain and cervical motion tenderness.',
      hi: 'योनि स्राव (किट 2) में खुजली, दुर्गंध व असामान्य स्राव होता है। संक्रमण ऊपर फैलने पर पीआईडी (किट 6) बनता है जिसमें पेट के निचले हिस्से में तीव्र दर्द होता है।',
    },
    maleDetails: {
      en: 'Male sexual partners often harbor Trichomonas or Candida subclinically; partner treatment prevents reinfection cycle.',
      hi: 'पुरुष साथी में भी संक्रमण के रोगाणु हो सकते हैं, अतः दोनों का साथ में उपचार आवश्यक है।',
    },
    femaleDetails: {
      en: 'Curd-like white or frothy greenish discharge, vulvar erythema, dyspareunia, cervical motion tenderness, and lower abdominal pain.',
      hi: 'दही जैसा सफेद या हरा झागदार स्राव, तीव्र खुजली, गर्भाशय ग्रीवा में दर्द और पेट के निचले हिस्से में सूजन।',
    },
    photos: [
      {
        id: 'vaginitis-cervicitis',
        imageSrc: '/images/clinical/chlamydia_cervicitis.webp',
        caption: {
          en: 'Mucopurulent Endocervicitis: Erythematous, friable cervix with yellow mucopurulent exudate.',
          hi: 'एंडोसर्विकाइटिस: गर्भाशय ग्रीवा में लाली, सूजन और मवाद जैसा स्राव।',
        },
        gender: 'female',
        citation: 'CDC / Dr. Wiesner PHIL ID #1239',
      },
      {
        id: 'gonorrhea-bartholins',
        imageSrc: '/images/clinical/gonorrhea_bartholins_cyst.webp',
        caption: {
          en: 'Bartholin Abscess: Painful fluctuant swelling of the Bartholin gland secondary to acute STI infection.',
          hi: 'बार्थोलिन ग्रंथि में मवाद भरी दर्दनाक सूजन।',
        },
        gender: 'female',
        citation: 'CDC / Handsfield Atlas of Sexually Transmitted Diseases',
      },
    ],
  },
};
