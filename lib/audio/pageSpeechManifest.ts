import { Locale } from '@/src/domain/content/schema';
import { EDITORIAL_DISEASE_DATA } from '@/content/clinical/editorial-disease-data';

export interface PageSpeechScript {
  pageNumber: number;
  title: Partial<Record<Locale, string>> & { en: string };
  sentences: Partial<Record<Locale, string[]>> & { en: string[] };
}

export const PAGE_SPEECH_SCRIPTS: Record<number, PageSpeechScript> = {
  0: {
    pageNumber: 0,
    title: {
      en: 'Swasthya Katha - STI Healthcare Guide',
      hi: 'स्वास्थ्य कथा - एसटीआई स्वास्थ्य मार्गदर्शिका',
    },
    sentences: {
      en: [
        'Welcome to Swasthya Katha.',
        'A comprehensive, respectful guide to Sexually Transmitted Infections, prevention, and government NACO care in India.',
        'Turn the page to begin your learning journey.',
      ],
      hi: [
        'स्वास्थ्य कथा में आपका स्वागत है।',
        'यौन संचारित संक्रमण, रोकथाम और सरकारी नाको स्वास्थ्य सेवाओं की एक संपूर्ण मार्गदर्शिका।',
        'सीखने की यात्रा शुरू करने के लिए पन्ना पलटें।',
      ],
    },
  },
  1: {
    pageNumber: 1,
    title: {
      en: 'Touch-Free Gestures & Reader Guide',
      hi: 'टच-फ्री कैमरा जेस्चर और मार्गदर्शिका',
    },
    sentences: {
      en: [
        'Learn how to navigate effortlessly without touching your screen.',
        'Point your index finger left or right to turn pages.',
        'Point your index finger up or down to cycle through kits and options.',
        'Hold your open palm still for one second to play or pause this spoken audio narration.',
      ],
      hi: [
        'बिना स्क्रीन छुए आसानी से पढ़ने का तरीका जानें।',
        'पन्ने पलटने के लिए अपनी तर्जनी उंगली बाएं या दाएं हिलाएं।',
        'किट और विकल्प बदलने के लिए उंगली ऊपर या नीचे करें।',
        'इस ऑडियो को शुरू या बंद करने के लिए अपनी खुली हथेली 1 सेकंड स्थिर रखें।',
      ],
    },
  },
  2: {
    pageNumber: 2,
    title: {
      en: 'Table of Contents & Clinical Atlas',
      hi: 'विषय सूची एवं नैदानिक एटलस',
    },
    sentences: {
      en: [
        'Table of Contents.',
        'Chapter 1: The Body Shield and Prevention.',
        'Chapter 2: Syphilis and Genital Ulcer Diseases.',
        'Chapter 3: Gonorrhea, Chlamydia, and Discharge Syndromes.',
        'Chapter 4: Genital Herpes, Chancroid, and Warts.',
        'Chapter 5: The 7 NACO Syndromic Kits and Free Clinic Care.',
      ],
      hi: [
        'विषय सूची।',
        'अध्याय 1: शरीर की सुरक्षा और रोकथाम।',
        'अध्याय 2: सिफलिस और जननांग अल्सर रोग।',
        'अध्याय 3: गोनोरिया, क्लैमाइडिया और स्राव सिंड्रोम।',
        'अध्याय 4: जननांग हर्पीस, शैंकरोइड और मस्से।',
        'अध्याय 5: 7 नाको सिंड्रोमिक किट और मुफ्त सुरक्षा क्लिनिक।',
      ],
    },
  },
  3: {
    pageNumber: 3,
    title: {
      en: "The Body's Natural Shield",
      hi: 'शरीर की प्राकृतिक सुरक्षा प्रणाली',
    },
    sentences: {
      en: [
        "The body's mucosal linings in reproductive tracts serve as the first defense against pathogens.",
        'Barrier methods like latex condoms provide strong dual protection against STIs and unintended pregnancy.',
        'Regular screening at Suraksha Clinics ensures early detection and complete cure.',
      ],
      hi: [
        'प्रजनन अंगों की म्यूकोसल परत रोगाणुओं के खिलाफ पहली ढाल होती है।',
        'कंडोम एसटीआई और अनचाहे गर्भ दोनों से मजबूत सुरक्षा प्रदान करता है।',
        'सुरक्षा क्लिनिक में नियमित जांच से समय पर पहचान और पूरा इलाज संभव है।',
      ],
    },
  },
  4: {
    pageNumber: 4,
    title: {
      en: 'Primary Syphilis - Hard Chancre',
      hi: 'प्राथमिक सिफलिस - दर्द रहित घाव',
    },
    sentences: {
      en: [
        'Primary Syphilis is caused by Treponema pallidum bacterium.',
        'It presents as a single, painless, clean-based hard ulcer known as a chancre on genital or oral areas.',
        'It is treated under NACO Kit 3 White, with Kit 4 Blue as penicillin-allergic alternative.',
        'Never ignore a painless sore; early treatment prevents systemic damage.',
      ],
      hi: [
        'प्राथमिक सिफलिस ट्रेपोनेमा पैलिडम बैक्टीरिया के कारण होता है।',
        'यह जननांगों पर एक दर्द रहित, साफ आधार वाले सख्त घाव के रूप में दिखाई देता है।',
        'इसका इलाज नाको किट 3 सफेद या एलर्जी में किट 4 नीले द्वारा किया जाता है।',
        'बिना दर्द वाले घाव को कभी नजरअंदाज न करें; समय पर इलाज आगे के खतरे रोकता है।',
      ],
    },
  },
  5: {
    pageNumber: 5,
    title: {
      en: 'Secondary Syphilis - Systemic Rash & Condyloma Lata',
      hi: 'द्वितीयक सिफलिस - हथेलियों पर चकत्ते',
    },
    sentences: {
      en: [
        'Secondary Syphilis develops 4 to 10 weeks after untreated primary infection.',
        'Classic signs include copper-red rashes on palms and soles that do not itch.',
        'Moist, highly infectious grey-white lesions called condyloma lata may form in skin folds.',
        'Prompt treatment clears the infection completely and protects sexual partners.',
      ],
      hi: [
        'द्वितीयक सिफलिस बिना इलाज के 4 से 10 सप्ताह बाद फैलता है।',
        'इसके मुख्य लक्षण हथेलियों और तलवों पर तांबे जैसे लाल चकत्ते हैं जिनमें खुजली नहीं होती।',
        'त्वचा की सिलवटों में नम, अत्यधिक संक्रामक मस्से जैसे उभार बन सकते हैं।',
        'तुरंत इलाज से संक्रमण पूरी तरह ठीक हो जाता है और साथी भी सुरक्षित रहता है।',
      ],
    },
  },
  6: {
    pageNumber: 6,
    title: {
      en: 'Gonorrhea - Urethral & Cervical Discharge',
      hi: 'गोनोरिया - मवाद जैसा स्राव एवं जलन',
    },
    sentences: {
      en: [
        'Gonorrhea is a bacterial infection caused by Neisseria gonorrhoeae.',
        'Men experience intense burning during urination and thick yellowish penile discharge.',
        'Women may experience increased discharge or mild symptoms, risking pelvic inflammatory disease.',
        'NACO Kit 1 Grey provides dual-antibiotic syndromic coverage for complete clearance.',
      ],
      hi: [
        'गोनोरिया निसेरिया गोनोरिया बैक्टीरिया से होने वाला संक्रमण है।',
        'पुरुषों में पेशाब के दौरान तेज जलन और गाढ़ा पीला स्राव होता है।',
        'महिलाओं में हल्का स्राव या कोई लक्षण नहीं हो सकते, जिससे अंदरूनी सूजन का खतरा रहता है।',
        'नाको किट 1 ग्रे द्वारा इसका पूरा उपचार मुफ्त दिया जाता है।',
      ],
    },
  },
  7: {
    pageNumber: 7,
    title: {
      en: 'Chlamydia & Lymphogranuloma Venereum',
      hi: 'क्लैमाइडिया एवं एलजीवी (गिल्टी में सूजन)',
    },
    sentences: {
      en: [
        'Chlamydia trachomatis causes clear watery discharge and burning sensations.',
        'Over 70% of infections in women remain asymptomatic, making routine screening vital.',
        'Lymphogranuloma Venereum causes painful, swollen groin lymph nodes known as buboes.',
        'Managed under NACO Kit 1 Grey for discharge and Kit 7 Black for inguinal bubo.',
      ],
      hi: [
        'क्लैमाइडिया से हल्का पानी जैसा स्राव और जलन होती है।',
        'महिलाओं में 70% मामलों में कोई लक्षण नहीं दिखते, इसलिए जांच जरूरी है।',
        'एलजीवी के कारण जांघ की गिल्टी में तेज दर्द और सूजन हो जाती है।',
        'स्राव के लिए किट 1 ग्रे और गिल्टी के लिए किट 7 काला द्वारा इलाज किया जाता है।',
      ],
    },
  },
  8: {
    pageNumber: 8,
    title: {
      en: 'Genital Herpes - HSV-2 Painful Blisters',
      hi: 'जननांग हर्पीस - दर्दनाक पानी वाले छाले',
    },
    sentences: {
      en: [
        'Genital Herpes is caused by Herpes Simplex Virus Type 2.',
        'It presents as clusters of painful, fluid-filled vesicles that burst into shallow, tender ulcers.',
        'Accompanied by tingling, localized pain, and fever during primary outbreaks.',
        'Treated under NACO Kit 5 Red containing antiviral acyclovir to accelerate healing.',
      ],
      hi: [
        'जननांग हर्पीस हर्पीस सिम्प्लेक्स वायरस 2 के कारण होता है।',
        'इसमें दर्दनाक, पानी भरे छोटे दानों का गुच्छा बनता है जो फूटकर घाव बन जाते हैं।',
        'शुरुआती दिनों में जलन, तेज दर्द और बुखार हो सकता है।',
        'नाको किट 5 लाल की एंटीवायरल दवा घावों को तेजी से भरती है।',
      ],
    },
  },
  9: {
    pageNumber: 9,
    title: {
      en: 'Chancroid & Pediculosis Pubis',
      hi: 'शैंकरोइड (दर्दनाक घाव) एवं जूं',
    },
    sentences: {
      en: [
        'Chancroid is caused by Haemophilus ducreyi, causing deep, extremely painful, ragged ulcers with purulent bases.',
        'Pediculosis Pubis or pubic lice cause severe nocturnal itching and visible nits on hair shafts.',
        'Chancroid is covered under NACO Kit 3 White, while lice are treated with permethrin and hygiene.',
      ],
      hi: [
        'शैंकरोइड से बेहद दर्दनाक, गहरे और मवाद वाले घाव होते हैं।',
        'प्यूबिक जूं से रात के समय तेज खुजली होती है।',
        'शैंकरोइड का इलाज नाको किट 3 सफेद से और जूं का इलाज परमेथ्रिन लोशन से किया जाता है।',
      ],
    },
  },
  10: {
    pageNumber: 10,
    title: {
      en: 'Genital Warts - Human Papillomavirus',
      hi: 'जननांग मस्से - एचपीवी संक्रमण',
    },
    sentences: {
      en: [
        'Genital Warts are caused by low-risk Human Papillomavirus strains 6 and 11.',
        'They appear as soft, flesh-colored, cauliflower-like growths on mucosal and perianal tissues.',
        'Clinical treatment includes topical podophyllin applied by trained doctors or cryotherapy.',
        'HPV vaccination provides excellent preventive protection before sexual debut.',
      ],
      hi: [
        'जननांग मस्से ह्यूमन पेपिलोमावायरस टाइप 6 और 11 से होते हैं।',
        'यह फूलगोभी जैसे उभरे हुए, मांस के रंग के मस्सों के रूप में दिखते हैं।',
        'डॉक्टर द्वारा पोडोफिलिन या क्रायोथेरेपी से इन्हें हटाया जाता है।',
        'एचपीवी का टीका पहले लगवाने से इस संक्रमण से पूरी सुरक्षा मिलती है।',
      ],
    },
  },
  11: {
    pageNumber: 11,
    title: {
      en: 'Vaginal Discharge & Pelvic Inflammatory Disease',
      hi: 'योनि स्राव एवं पेल्विक सूजन (PID)',
    },
    sentences: {
      en: [
        'Vaginitis involves abnormal discharge, curd-like secretions with yeast, or frothy greenish discharge with trichomonas.',
        'Pelvic Inflammatory Disease causes chronic lower abdominal pain, cervical motion tenderness, and fever.',
        'Vaginitis is treated under NACO Kit 2 Green; Pelvic Inflammatory Disease under NACO Kit 6 Yellow.',
      ],
      hi: [
        'योनि स्राव में दही जैसा गाढ़ा स्राव या झागदार हरा स्राव और खुजली हो सकती है।',
        'पेल्विक सूजन यानी पीआईडी से पेट के निचले हिस्से में तेज दर्द और बुखार होता है।',
        'योनि स्राव के लिए किट 2 हरा और पीआईडी के लिए किट 6 पीला का पूरा कोर्स जरूरी है।',
      ],
    },
  },
  12: {
    pageNumber: 12,
    title: {
      en: 'The NACO 7-Kit Cabinet',
      hi: 'नाको 7-किट कैबिनेट',
    },
    sentences: {
      en: [
        'The National AIDS Control Organisation provides 7 color-coded syndromic kits free of cost.',
        'Kit 1 Grey for urethral and cervical discharge.',
        'Kit 2 Green for vaginitis and trichomoniasis.',
        'Kit 3 White for non-herpetic genital ulcers.',
        'Kit 4 Blue for penicillin-allergic patients.',
        'Kit 5 Red for genital herpes.',
        'Kit 6 Yellow for lower abdominal pain and PID.',
        'Kit 7 Black for inguinal bubo.',
      ],
      hi: [
        'राष्ट्रीय एड्स नियंत्रण संगठन (नाको) 7 रंग-कोडित किट मुफ्त उपलब्ध कराता है।',
        'किट 1 ग्रे: पेशाब में जलन व स्राव के लिए।',
        'किट 2 हरा: योनि स्राव व खुजली के लिए।',
        'किट 3 सफेद: बिना दर्द वाले घाव के लिए।',
        'किट 4 नीला: पेनिसिलिन एलर्जी वाले घाव के लिए।',
        'किट 5 लाल: हर्पीस के छालों के लिए।',
        'किट 6 पीला: पेट के निचले हिस्से में दर्द व पीआईडी के लिए।',
        'किट 7 काला: जांघ की गिल्टी में सूजन के लिए।',
      ],
    },
  },
  13: {
    pageNumber: 13,
    title: {
      en: 'Myth vs Fact Interactive Check',
      hi: 'भ्रम बनाम सच - सही जानकारी',
    },
    sentences: {
      en: [
        'Myth: STIs spread through toilet seats and sharing food. Fact: False. STIs spread through direct sexual contact and blood.',
        'Myth: If there is no pain, there is no STI. Fact: False. Syphilis chancres and chlamydia are often completely painless.',
        'Myth: Washing immediately after sex prevents STIs. Fact: False. Only barrier methods like condoms prevent transmission.',
      ],
      hi: [
        'भ्रम: शौचालय की सीट या खाना बांटने से एसटीआई फैलता है। सच: गलत। यह केवल असुरक्षित यौन संपर्क और रक्त से फैलता है।',
        'भ्रम: यदि दर्द नहीं है तो कोई बीमारी नहीं है। सच: गलत। सिफलिस और क्लैमाइडिया में अक्सर कोई दर्द नहीं होता।',
        'भ्रम: संबंध बनाने के बाद धोने से संक्रमण रुकता है। सच: गलत। केवल सही कंडोम का उपयोग ही सुरक्षा देता है।',
      ],
    },
  },
  14: {
    pageNumber: 14,
    title: {
      en: 'Where to Get Free Help - Suraksha Clinics & 1097',
      hi: 'मुफ्त सहायता कहां पाएं - सुरक्षा क्लिनिक और 1097',
    },
    sentences: {
      en: [
        'Free, confidential treatment is available across India at Government Suraksha Clinics.',
        'Call the toll-free NACO National Helpline at 1097 anytime for 24/7 counseling.',
        'Never feel ashamed to seek care; your health and dignity are completely protected.',
      ],
      hi: [
        'सरकारी सुरक्षा क्लिनिकों में पूरी तरह मुफ्त और गोपनीय इलाज उपलब्ध है।',
        '24 घंटे मुफ्त सलाह के लिए नाको राष्ट्रीय हेल्पलाइन 1097 पर कॉल करें।',
        'इलाज लेने में कभी संकोच न करें; आपका स्वास्थ्य और गोपनीयता पूरी तरह सुरक्षित है।',
      ],
    },
  },
  15: {
    pageNumber: 15,
    title: {
      en: 'Closing Accreditation & Safe Community Promise',
      hi: 'समापन, प्रमाणन एवं सुरक्षित समाज का संकल्प',
    },
    sentences: {
      en: [
        'Swasthya Katha is published for public health education aligned with NACO and WHO 2026 guidelines.',
        'Share this knowledge, practice safe sex, and encourage regular screening in your community.',
        'Thank you for reading Swasthya Katha.',
      ],
      hi: [
        'स्वास्थ्य कथा नाको और विश्व स्वास्थ्य संगठन के 2026 मानकों के अनुरूप जनहित में प्रकाशित है।',
        'यह जानकारी साझा करें, सुरक्षित यौन व्यवहार अपनाएं और समय पर जांच करवाएं।',
        'स्वास्थ्य कथा पढ़ने के लिए धन्यवाद।',
      ],
    },
  },
};
