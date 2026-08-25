import { DiseaseEditorialData } from '@/components/clinical/EditorialDiseasePage';

export const EDITORIAL_DISEASE_DATA: Record<string, DiseaseEditorialData> = {
  'primary-syphilis': {
    id: 'primary-syphilis',
    tag: { en: 'NACO SCM ATLAS • GENITAL ULCER', hi: 'क्लिनिकल एटलस • प्राथमिक सिफलिस' },
    title: { en: 'Primary Syphilis (Treponema pallidum)', hi: 'प्राथमिक सिफलिस (प्रारंभिक अवस्था)' },
    kitBadge: { en: 'NACO Kit 3 (White) / Kit 4 (Blue)', hi: 'NACO किट 3 (सफेद) / किट 4 (नीला)', color: '#1A202C' },
    overview: {
      en: 'Primary syphilis manifests as a solitary, dry-based, painless genital ulcer (chancre) with indurated borders and a clean base, developing 10–90 days after exposure.',
      hi: 'प्राथमिक सिफलिस में जननांग पर एक दर्द-रहित, साफ आधार वाला सख्त घाव (शैंकर) होता है। यह संपर्क के 10 से 90 दिनों में प्रकट होता है।',
    },
    maleDetails: {
      en: 'Single dry-based, painless indurated chancre on coronal sulcus, glans, or penile shaft with rubbery, non-tender regional inguinal lymphadenopathy.',
      hi: 'लिंग की मुंड या शाफ्ट पर एक कठोर, दर्द-रहित घाव और जांघ की गिल्टी में बिना दर्द वाली सूजन।',
    },
    femaleDetails: {
      en: 'Solitary, painless genital chancre with clean base on labia majora/minora, posterior fourchette, or cervix. Often unnoticed due to internal location.',
      hi: 'योनिद्वार, लेबिया या गर्भाशय ग्रीवा पर साफ तल वाला दर्द-रहित घाव। आंतरिक होने से अक्सर ध्यान नहीं जाता।',
    },
    photos: [
      {
        id: 'primary-syphilis-male',
        imageSrc: '/images/clinical/primary-syphilis-male.webp',
        caption: {
          en: 'Primary Chancre (Male): Dry-based, painless ulcer with indurated borders on the glans penis.',
          hi: 'प्राथमिक शैंकर (पुरुष): लिंग पर कड़े किनारों वाला दर्द-रहित सूखा घाव।',
        },
        gender: 'male',
        citation: 'Courtesy of A. Wisdom: Sexually Transmitted Diseases. London: Mosby-Wolfe; 1992.',
      },
      {
        id: 'primary-syphilis-female',
        imageSrc: '/images/clinical/primary-syphilis-female.webp',
        caption: {
          en: 'Primary Chancre (Female): Solitary, painless genital chancre with a clean base on the vulva.',
          hi: 'प्राथमिक शैंकर (महिला): योनि पर साफ तल वाला एकल दर्द-रहित जननांग घाव।',
        },
        gender: 'female',
        citation: 'Dept of Dermatology, Naval Medical Center, Portsmouth, VA.',
      },
    ],
  },

  'secondary-syphilis': {
    id: 'secondary-syphilis',
    tag: { en: 'NACO SCM ATLAS • SYSTEMIC SIGNS', hi: 'द्वितीयक सिफलिस • शारीरिक प्रसार' },
    title: { en: 'Secondary Syphilis: Systemic Signs', hi: 'द्वितीयक सिफलिस: चकत्ते एवं लक्षण' },
    kitBadge: { en: 'NACO Kit 3 (White) / Kit 4 (Blue)', hi: 'NACO किट 3 (सफेद) / किट 4 (नीला)', color: '#1A202C' },
    overview: {
      en: 'Develops 4–10 weeks after primary chancre. Characterized by copper-red non-pruritic papulosquamous rashes on palms and soles, trunk rash, oral mucous patches, and moist condyloma lata.',
      hi: 'प्राथमिक घाव के 4 से 10 सप्ताह बाद हथेलियों व तलवों पर बिना खुजली वाले तांबे जैसे लाल चकत्ते, मुंह में छाले और जननांगों पर गीले मस्सेनुमा उभार (कंडायलोमा लाटा) होते हैं।',
    },
    maleDetails: {
      en: 'Characteristic papulosquamous annular rash on palms and soles, generalized trunk rash, and highly infectious moist condyloma lata in intertriginous skin folds.',
      hi: 'हथेलियों व तलवों पर गोल चकत्ते, पीठ पर दाने और सिलवटों में अत्यधिक संक्रामक गीले उभार।',
    },
    femaleDetails: {
      en: 'Palmar/plantar hyperkeratotic rashes, oral mucous patches, diffuse lymphadenopathy, patchy alopecia, and hypertrophic perianal condyloma lata.',
      hi: 'हथेलियों पर चकत्ते, मुंह के भीतर सफेद संक्रामक छाले और गुदा के आसपास उभरे हुए गीले मस्से।',
    },
    photos: [
      {
        id: 'secondary-syphilis-palms',
        imageSrc: '/images/clinical/secondary-syphilis-palms.webp',
        caption: {
          en: 'Secondary Syphilis (Palms): Papulosquamous annular rash of secondary syphilis on palms.',
          hi: 'पामर रैश: हथेली पर तांबे के रंग के विशेष गोल चकत्ते।',
        },
        gender: 'both',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
      {
        id: 'secondary-syphilis-condyloma-lata',
        imageSrc: '/images/clinical/secondary-syphilis-condyloma-lata.webp',
        caption: {
          en: 'Condyloma Lata: Verrucous, heaped-up moist lesions of secondary syphilis.',
          hi: 'कंडायलोमा लाटा: जननांगों के आसपास उभरे हुए अत्यधिक संक्रामक गीले मस्से।',
        },
        gender: 'both',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
    ],
  },

  'gonorrhea': {
    id: 'gonorrhea',
    tag: { en: 'NACO SCM ATLAS • PURULENT DISCHARGE', hi: 'सुजाक (गोनोरिया) • मवाद स्राव' },
    title: { en: 'Gonorrhea (Neisseria gonorrhoeae)', hi: 'गोनोरिया (सुजाक संक्रमण)' },
    kitBadge: { en: 'NACO Kit 1 (Grey)', hi: 'NACO किट 1 (ग्रे)', color: '#4A5568' },
    overview: {
      en: 'Gram-negative diplococcal infection causing acute severe burning during urination and thick, purulent yellow-green discharge. Can lead to cervicitis, conjunctivitis, and disseminated infection.',
      hi: 'बैक्टीरिया जनित संक्रमण जिसमें पेशाब में तीव्र जलन और गाढ़ा पीला-हरा मवाद जैसा स्राव होता है। यह गर्भाशय ग्रीवा और आंखों में भी फैल सकता है।',
    },
    maleDetails: {
      en: 'Acute gonococcal urethritis with intense dysuria, erythema at the urethral meatus, and copious purulent creamy discharge within 2–7 days of exposure.',
      hi: 'पेशाब करते समय अत्यधिक जलन और लिंग से गाढ़ा मवाद निकलना (एक्यूट यूरेथ्राइटिस)।',
    },
    femaleDetails: {
      en: 'Gonococcal urethritis and endocervicitis with friable cervix, abnormal vaginal discharge, pelvic pain, or asymptomatic progression to PID in 70% of cases.',
      hi: 'योनि व मूत्रमार्ग से मवाद स्राव और गर्भाशय ग्रीवा में सूजन। 70% महिलाओं में कोई दर्द नहीं होता।',
    },
    photos: [
      {
        id: 'gonorrhea-male',
        imageSrc: '/images/clinical/gonorrhea-male-urethritis.webp',
        caption: {
          en: 'Male Urethritis: Purulent, copious urethral discharge in a patient with gonococcal urethritis.',
          hi: 'पुरुष मूत्रमार्ग स्राव: मूत्रमार्ग से गाढ़ा मवाद जैसा गोनोकोकल स्राव।',
        },
        gender: 'male',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
      {
        id: 'gonorrhea-female',
        imageSrc: '/images/clinical/gonorrhea-female-urethritis.webp',
        caption: {
          en: 'Female Urethritis: Gonococcal urethritis in a female patient with purulent discharge.',
          hi: 'महिला मूत्रमार्ग स्राव: मूत्रद्वार पर गाढ़ा मवाद स्राव।',
        },
        gender: 'female',
        citation: 'Morse, Moreland, Thompson: Atlas of STDs. London: Mosby-Wolfe; 1990.',
      },
    ],
  },

  'chlamydia-lgv': {
    id: 'chlamydia-lgv',
    tag: { en: 'NACO SCM ATLAS • CERVICITIS & BUBO', hi: 'क्लैमाइडिया एवं एलजीवी' },
    title: { en: 'Chlamydia & Lymphogranuloma Venereum (LGV)', hi: 'क्लैमाइडिया एवं एलजीवी (गिल्टी सूजन)' },
    kitBadge: { en: 'NACO Kit 1 (Grey) & Kit 7 (Black)', hi: 'NACO किट 1 एवं किट 7', color: '#1F2937' },
    overview: {
      en: 'Chlamydia trachomatis causes thin watery urethritis and mucopurulent cervicitis, while LGV invasive serovars cause unilateral painful swollen inguinal lymph nodes (buboes).',
      hi: 'क्लैमाइडिया से पतला पानी जैसा स्राव और एलजीवी से जांघ की गिल्टी में बड़ी और दर्दनाक सूजन (बूबो) होती है।',
    },
    maleDetails: {
      en: 'Mild dysuria with clear/thin mucoid urethral discharge; unilateral tender, enlarged inguinal lymphadenopathy (LGV bubo) requiring NACO Kit 7 Black.',
      hi: 'पेशाब में हल्की जलन, पानी जैसा पतला स्राव और जांघ की गिल्टी में बड़ा दर्दनाक उभार (किट 7 काला)।',
    },
    femaleDetails: {
      en: 'Mucopurulent cervicitis with yellow exudate from cervical os, cervical friability, deep dyspareunia, and risk of ascending Pelvic Inflammatory Disease (PID).',
      hi: 'गर्भाशय ग्रीवा में सूजन, छूने पर रक्तस्राव और पेट के निचले हिस्से में तेज दर्द।',
    },
    photos: [
      {
        id: 'chlamydia-male',
        imageSrc: '/images/clinical/chlamydia-male-urethritis.webp',
        caption: {
          en: 'Male Urethritis: Thin, watery urethral discharge of chlamydial urethritis.',
          hi: 'क्लैमाइडिया स्राव: मूत्रमार्ग से पतला पानी जैसा स्राव।',
        },
        gender: 'male',
        citation: 'Walter Stamm, MD & H. Hunter Handsfield: Atlas of STDs. McGraw-Hill; 1992.',
      },
      {
        id: 'lgv-bubo',
        imageSrc: '/images/clinical/lgv-inguinal-bubo.webp',
        caption: {
          en: 'Lymphogranuloma Venereum (LGV): Unilateral left lymphadenopathy / bubo in groin.',
          hi: 'एलजीवी बूबो: जांघ की गिल्टी में बड़ी और दर्दनाक सूजन।',
        },
        gender: 'male',
        citation: 'Courtesy of Lawrence B. Stack, MD.',
      },
    ],
  },

  'genital-herpes': {
    id: 'genital-herpes',
    tag: { en: 'NACO SCM ATLAS • VESICULAR ULCERS', hi: 'जननांग हर्पीस • दर्दनाक छाले' },
    title: { en: 'Genital Herpes Simplex (HSV-2)', hi: 'जननांग हर्पीस (हर्पीस सिम्प्लेक्स)' },
    kitBadge: { en: 'NACO Kit 5 (Red)', hi: 'NACO किट 5 (लाल)', color: '#DC2626' },
    overview: {
      en: 'Viral infection by HSV-2 presenting as painful fluid-filled vesicles in clusters that rupture into shallow, tender ulcerations with burning paresthesias.',
      hi: 'हर्पीस वायरस से होने वाला संक्रमण जिसमें पानी भरे छोटे दर्दनाक छाले होते हैं जो फूटकर लाल घाव बन जाते हैं।',
    },
    maleDetails: {
      en: 'Multiple grouped vesicles and shallow erosions on glans, penile shaft, and prepuce with severe burning, tingling, and local tender lymphadenopathy.',
      hi: 'लिंग पर पानी भरे दानों और छालों का गुच्छा, जिसमें तेज चुभन, दर्द और जलन होती है।',
    },
    femaleDetails: {
      en: 'Multiple coalescing superficial ulcerations of the vulva, severe dysuria, vaginal discharge, and cervical erosive ulcerations.',
      hi: 'योनिद्वार और लेबिया पर अत्यधिक दर्दनाक छालों व घावों का फैलाव, जिससे पेशाब में तेज चुभन होती है।',
    },
    photos: [
      {
        id: 'herpes-primary-female',
        imageSrc: '/images/clinical/herpes-primary-female.webp',
        caption: {
          en: 'Primary Lesions (Female): Multiple coalescing superficial ulcerations of primary genital herpes.',
          hi: 'महिला हर्पीस: योनि पर अत्यधिक दर्दनाक छालों व घावों का फैलाव।',
        },
        gender: 'female',
        citation: 'Courtesy of Lawrence B. Stack, MD.',
      },
      {
        id: 'herpes-primary-male',
        imageSrc: '/images/clinical/herpes-primary-male.webp',
        caption: {
          en: 'Primary Lesions (Male): Multiple genital vesicles of primary genital herpes.',
          hi: 'पुरुष हर्पीस: लिंग पर पानी भरे छालों और घावों का गुच्छा।',
        },
        gender: 'male',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
    ],
  },

  'chancroid-pediculosis': {
    id: 'chancroid-pediculosis',
    tag: { en: 'NACO SCM ATLAS • ULCERS & LICE', hi: 'चैनक्रॉइड एवं जूँ संक्रमण' },
    title: { en: 'Chancroid & Pediculosis Pubis (Crab Lice)', hi: 'चैनक्रॉइड एवं जूँ संक्रमण' },
    kitBadge: { en: 'NACO Kit 3 (White) & Hygiene', hi: 'NACO किट 3 एवं स्वच्छता', color: '#1F2937' },
    overview: {
      en: 'Chancroid (Haemophilus ducreyi) causes multiple painful deep ulcers with undermined ragged borders and fluctuant buboes. Pediculosis pubis causes intense pubic itching from crab lice and nits.',
      hi: 'चैनक्रॉइड में गहरे दर्दनाक घाव और गिल्टी में मवाद होता है। पेडीकुलोसिस में जूँ बालों की जड़ों में चिपककर तीव्र खुजली करती हैं।',
    },
    maleDetails: {
      en: 'Multiple painful soft ulcers with ragged purulent edges and suppurative inguinal lymph nodes; Phthirus pubis lice clinging to pubic hairs.',
      hi: 'गहरे दर्दनाक घाव, गिल्टी में मवाद और जांघ के बालों में जूँ एवं उनके अंडे (निट्स)।',
    },
    femaleDetails: {
      en: 'Extremely painful ragged ulcerations at fourchette and introitus; intense nocturnal itching in pubic region and perianal area.',
      hi: 'योनि प्रवेश द्वार पर गहरे दर्दनाक घाव और प्यूबिक क्षेत्र में तेज खुजली।',
    },
    photos: [
      {
        id: 'chancroid-lesions',
        imageSrc: '/images/clinical/chancroid-lesions.webp',
        caption: {
          en: 'Chancroid Lesions: Multiple painful, deep ulcerations with ragged borders.',
          hi: 'चैनक्रॉइड घाव: असमान किनारों वाले गहरे और अत्यंत दर्दनाक घाव।',
        },
        gender: 'both',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
      {
        id: 'pediculosis-pubic-hair',
        imageSrc: '/images/clinical/pediculosis-pubic-hair.webp',
        caption: {
          en: 'Pediculosis Pubis: Phthirus pubis (crab louse) and nits attached to pubic hair.',
          hi: 'पेडीकुलोसिस प्यूबिस: जांघ के बालों से चिपकी हुई जूँ और उनके अंडे।',
        },
        gender: 'both',
        citation: 'Morse, Moreland, Thompson: Atlas of STDs. London: Mosby-Wolfe; 1990.',
      },
    ],
  },

  'genital-warts': {
    id: 'genital-warts',
    tag: { en: 'NACO SCM ATLAS • HPV VERRUCOUS', hi: 'जननांग मस्से (एचपीवी)' },
    title: { en: 'Condyloma Acuminata (Genital Warts)', hi: 'जननांग मस्से (कंडायलोमा एक्युमिनाटा)' },
    kitBadge: { en: 'Clinical Podophyllin / Cryotherapy', hi: 'क्लिनिकल पोडोफिलिन / क्रायोथेरेपी', color: '#D97706' },
    overview: {
      en: 'Caused by low-risk HPV types 6 and 11. Presents as fleshy, hyperkeratotic, cauliflower-like exophytic papules and giant verrucous plaques on genitalia and perianal skin.',
      hi: 'ह्यूमन पेपिलोमावायरस (HPV) से होने वाले फूलगोभी के आकार के उभरे हुए मस्से जो जननांगों व गुदा के आसपास फैलते हैं।',
    },
    maleDetails: {
      en: 'Verrucous, cauliflower-like lesions on coronal sulcus, glans penis, shaft, and scrotum, occasionally growing into giant condyloma plaques.',
      hi: 'लिंग की मुंड, चमड़ी और अंडकोष पर फूलगोभी जैसे उभरे हुए मस्से।',
    },
    femaleDetails: {
      en: 'Extensive verrucous lesions on posterior fourchette, labia majora/minora, vaginal introitus, and perianal region.',
      hi: 'योनिद्वार, लेबिया और गुदा के आसपास उभरे हुए खुरदुरे मस्सों का गुच्छा।',
    },
    photos: [
      {
        id: 'warts-female-fourchette',
        imageSrc: '/images/clinical/warts-female-fourchette.webp',
        caption: {
          en: 'Genital Warts (Female): Verrucous lesions of the posterior fourchette.',
          hi: 'महिला जननांग मस्से: योनिद्वार पर फूलगोभी के आकार के मस्सों का समूह।',
        },
        gender: 'female',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
      {
        id: 'warts-giant-male',
        imageSrc: '/images/clinical/warts-giant-male.webp',
        caption: {
          en: 'Giant Condyloma Acuminata (Male): Giant verrucous warts on glans penis.',
          hi: 'पुरुष जननांग मस्से: लिंग के अगले भाग पर विशाल मस्सों का समूह।',
        },
        gender: 'male',
        citation: 'Courtesy of A. Wisdom: Sexually Transmitted Diseases. London: Mosby-Wolfe; 1992.',
      },
    ],
  },

  'vaginal-discharge-pid': {
    id: 'vaginal-discharge-pid',
    tag: { en: 'NACO SCM ATLAS • DISCHARGE & PID', hi: 'योनि स्राव एवं पीआईडी' },
    title: { en: 'Vaginitis Syndromes & Pelvic Inflammatory Disease (PID)', hi: 'योनि स्राव एवं पेल्विक सूजन (पीआईडी)' },
    kitBadge: { en: 'NACO Kit 2 (Green) & Kit 6 (Yellow)', hi: 'NACO किट 2 (हरा) एवं किट 6 (पीला)', color: '#059669' },
    overview: {
      en: 'Vaginitis involves abnormal discharge, odor, and itching (Candidiasis, Trichomoniasis, BV). Ascending infection causes PID with lower abdominal pain and cervical motion tenderness.',
      hi: 'योनि स्राव (किट 2) में खुजली, दुर्गंध व असामान्य स्राव होता है। संक्रमण ऊपर फैलने पर पीआईडी (किट 6) बनता है जिसमें पेट के निचले हिस्से में तीव्र दर्द होता है।',
    },
    maleDetails: {
      en: 'Male sexual partners often harbor Trichomonas or Candida subclinically; simultaneous partner treatment is critical to break transmission.',
      hi: 'पुरुष साथी में भी संक्रमण के रोगाणु हो सकते हैं, अतः दोनों का साथ में उपचार आवश्यक है।',
    },
    femaleDetails: {
      en: 'Curd-like white or frothy greenish discharge, vulvar erythema, dyspareunia, cervical motion tenderness, and lower abdominal pain.',
      hi: 'दही जैसा सफेद या हरा झागदार स्राव, तीव्र खुजली, गर्भाशय ग्रीवा में दर्द और पेट के निचले हिस्से में सूजन।',
    },
    photos: [
      {
        id: 'gonorrhea-cervicitis',
        imageSrc: '/images/clinical/gonorrhea-cervicitis.webp',
        caption: {
          en: 'Cervicitis: Endocervical purulent exudate with friable cervix in acute STI infection.',
          hi: 'एंडोसर्विकाइटिस: गर्भाशय ग्रीवा में लाली, सूजन और मवाद जैसा स्राव।',
        },
        gender: 'female',
        citation: 'King K. Holmes, MD & H. Hunter Handsfield: Atlas of STDs. McGraw-Hill; 1992.',
      },
      {
        id: 'gonorrhea-bartholins-abscess',
        imageSrc: '/images/clinical/gonorrhea-bartholins-abscess.webp',
        caption: {
          en: "Bartholin's Abscess: Enlarged, fluctuant, tender Bartholin's abscess of the labia.",
          hi: 'बार्थोलिन ग्रंथि में मवाद भरी दर्दनाक सूजन।',
        },
        gender: 'female',
        citation: 'Courtesy of A. Wisdom: Sexually Transmitted Diseases. London: Mosby-Wolfe; 1992.',
      },
    ],
  },
};
