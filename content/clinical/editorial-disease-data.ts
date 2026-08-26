import { DiseaseEditorialData } from '@/components/clinical/EditorialDiseasePage';

export const EDITORIAL_DISEASE_DATA: Record<string, DiseaseEditorialData> = {
  'primary-syphilis': {
    id: 'primary-syphilis',
    tag: {
      en: 'NACO SCM ATLAS • GENITAL ULCER',
      hi: 'क्लिनिकल एटलस • प्राथमिक सिफलिस',
      mr: 'क्लिनिकल ॲटलस • प्राथमिक सिफिलीस',
    },
    title: {
      en: 'Primary Syphilis (Treponema pallidum)',
      hi: 'प्राथमिक सिफलिस (प्रारंभिक अवस्था)',
      mr: 'प्राथमिक सिफिलीस (सुरुवातीची अवस्था)',
    },
    kitBadge: {
      en: 'NACO Kit 3 (White) / Kit 4 (Blue)',
      hi: 'NACO किट 3 (सफेद) / किट 4 (नीला)',
      mr: 'NACO किट ३ (पांढरा) / किट ४ (निळा)',
      color: '#1A202C',
    },
    overview: {
      en: 'Primary syphilis manifests as a solitary, dry-based, painless genital ulcer (chancre) with indurated borders and a clean base, developing 10–90 days after exposure.',
      hi: 'प्राथमिक सिफलिस में जननांग पर एक दर्द-रहित, साफ आधार वाला सख्त घाव (शैंकर) होता है। यह संपर्क के 10 से 90 दिनों में प्रकट होता है।',
      mr: 'प्राथमिक सिफिलीसमध्ये जननांगावर एक वेदनारहित, कडक कडा असलेली स्वच्छ जखम (शँकर) येते. संसर्गानंतर १० ते ९० दिवसांत ही लक्षणे दिसतात.',
    },
    maleDetails: {
      en: 'Single dry-based, painless indurated chancre on coronal sulcus, glans, or penile shaft with rubbery, non-tender regional inguinal lymphadenopathy.',
      hi: 'लिंग की मुंड या शाफ्ट पर एक कठोर, दर्द-रहित घाव और जांघ की गिल्टी में बिना दर्द वाली सूजन।',
      mr: 'लिंगाच्या टोकावर किंवा दांड्यावर कडक, वेदनारहित जखम आणि जांघेतील गाठींमध्ये वेदनारहित सूज.',
    },
    femaleDetails: {
      en: 'Solitary, painless genital chancre with clean base on labia majora/minora, posterior fourchette, or cervix. Often unnoticed due to internal location.',
      hi: 'योनिद्वार, लेबिया या गर्भाशय ग्रीवा पर साफ तल वाला दर्द-रहित घाव। आंतरिक होने से अक्सर ध्यान नहीं जाता।',
      mr: 'योनीमार्ग, लॅबिया किंवा गर्भाशयाच्या मुखावर वेदनारहित जखम. अंतर्गत भागात असल्याने सहसा लक्षात येत नाही.',
    },
    regimen: {
      en: 'Inj. Benzathine Penicillin G 2.4 MU IM Single Dose + Tab. Azithromycin 1g OD Single Dose (NACO Kit 3 White). If Penicillin-allergic: Kit 4 Blue (Cap. Doxycycline 100mg BD x 14 days).',
      hi: 'इंजेक्शन बेंजाथिन पेनिसिलिन 2.4 MU IM एकल खुराक + टैबलेट एज़िथ्रोमाइसिन 1g एकल खुराक (किट 3 सफेद)। पेनिसिलिन एलर्जी में किट 4 नीला (डॉक्सीसाइक्लिन 100mg BD x 14 दिन)।',
      mr: 'इंजेक्शन बेन्झाथिन पेनिसिलिन २.४ MU IM एकच डोस + गोळी अझिथ्रोमायसिन १ ग्रॅम एकच डोस (किट ३ पांढरा). ॲलर्जी असल्यास किट ४ निळा (डॉक्युसायक्लिन १००mg BD x १४ दिवस).',
    },
    partnerProtocol: {
      en: 'Trace and treat all sexual contacts from the past 3 months simultaneously.',
      hi: 'पिछले 3 महीनों के सभी यौन साथियों की पहचान कर एक साथ उपचार दें।',
      mr: 'मागील ३ महिन्यांतील सर्व लैंगिक साथीदारांचा शोध घेऊन एकाच वेळी उपचार करा.',
    },
    closedSettingPearl: {
      en: 'Painless ulcers break the mucosal barrier and multiply HIV transmission risk 3-5x. Dual Rapid HIV/Syphilis screening is mandatory.',
      hi: 'दर्द-रहित घाव त्वचा की सुरक्षा तोड़कर HIV के खतरे को 3-5 गुना बढ़ा देता है। दोहरी HIV/सिफलिस त्वरित जांच अनिवार्य है।',
      mr: 'वेदनारहित जखमेमुळे त्वचेचा अडथळा तुटतो व HIV संसर्गाचा धोका ३-५ पटीने वाढतो. दुहेरी HIV/सिफिलीस चाचणी आवश्यक आहे.',
    },
    photos: [
      {
        id: 'primary-syphilis-male',
        imageSrc: '/images/clinical/primary-syphilis-male.webp',
        caption: {
          en: 'Primary Chancre (Male): Dry-based, painless ulcer with indurated borders on the glans penis.',
          hi: 'प्राथमिक शैंकर (पुरुष): लिंग पर कड़े किनारों वाला दर्द-रहित सूखा घाव।',
          mr: 'प्राथमिक शँकर (पुरुष): लिंगाच्या टोकावर कडक कडा असलेली वेदनारहित जखम.',
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
          mr: 'प्राथमिक शँकर (महिला): योनीभागावर स्वच्छ तळाची वेदनारहित जखम.',
        },
        gender: 'female',
        citation: 'Dept of Dermatology, Naval Medical Center, Portsmouth, VA.',
      },
    ],
  },

  'secondary-syphilis': {
    id: 'secondary-syphilis',
    tag: {
      en: 'NACO SCM ATLAS • SYSTEMIC SIGNS',
      hi: 'द्वितीयक सिफलिस • शारीरिक प्रसार',
      mr: 'द्वितीयक सिफिलीस • शारीरिक प्रसार',
    },
    title: {
      en: 'Secondary Syphilis: Systemic Signs',
      hi: 'द्वितीयक सिफलिस: चकत्ते एवं लक्षण',
      mr: 'द्वितीयक सिफिलीस: पुरळ व लक्षणे',
    },
    kitBadge: {
      en: 'NACO Kit 3 (White) / Kit 4 (Blue)',
      hi: 'NACO किट 3 (सफेद) / किट 4 (नीला)',
      mr: 'NACO किट ३ (पांढरा) / किट ४ (निळा)',
      color: '#1A202C',
    },
    overview: {
      en: 'Develops 4–10 weeks after primary chancre. Characterized by copper-red non-pruritic papulosquamous rashes on palms and soles, trunk rash, oral mucous patches, and moist condyloma lata.',
      hi: 'प्राथमिक घाव के 4 से 10 सप्ताह बाद हथेलियों व तलवों पर बिना खुजली वाले तांबे जैसे लाल चकत्ते, मुंह में छाले और जननांगों पर गीले मस्सेनुमा उभार (कंडायलोमा लाटा) होते हैं।',
      mr: 'प्राथमिक जखमेनंतर ४ ते १० आठवड्यांनी तळहात व तळपायांवर खाज नसलेले तांबूस-लाल पुरळ, तोंडातील व्रण आणि ओलसर मस्से (कॉन्डायलोमा लाटा) तयार होतात.',
    },
    maleDetails: {
      en: 'Characteristic papulosquamous annular rash on palms and soles, generalized trunk rash, and highly infectious moist condyloma lata in intertriginous skin folds.',
      hi: 'हथेलियों व तलवों पर गोल चकत्ते, पीठ पर दाने और सिलवटों में अत्यधिक संक्रामक गीले उभार।',
      mr: 'तळहात आणि तळपायांवर लालसर पुरळ, अंगावर पुरळ आणि त्वचेच्या घड्यांमध्ये संसर्गजन्य ओलसर मस्से.',
    },
    femaleDetails: {
      en: 'Palmar/plantar hyperkeratotic rashes, oral mucous patches, diffuse lymphadenopathy, patchy alopecia, and hypertrophic perianal condyloma lata.',
      hi: 'हथेलियों पर चकत्ते, मुंह के भीतर सफेद संक्रामक छाले और गुदा के आसपास उभरे हुए गीले मस्से।',
      mr: 'तळहातावर पुरळ, तोंडात पांढरे संसर्गजन्य व्रण आणि गुदद्वाराभोवती ओलसर मस्से.',
    },
    regimen: {
      en: 'Inj. Benzathine Penicillin G 2.4 MU IM weekly x 3 doses (or Kit 4 Blue: Cap. Doxycycline 100mg BD x 14 days).',
      hi: 'इंजेक्शन बेंजाथिन पेनिसिलिन 2.4 MU IM साप्ताहिक (3 खुराक) अथवा किट 4 नीला (डॉक्सीसाइक्लिन 100mg BD x 14 दिन)।',
      mr: 'इंजेक्शन बेन्झाथिन पेनिसिलिन २.४ MU IM दर आठवड्याला (३ डोस) किंवा किट ४ निळा (डॉक्युसायक्लिन १००mg BD x १४ दिवस).',
    },
    partnerProtocol: {
      en: 'Notify and treat all sexual contacts from the past 12 months.',
      hi: 'पिछले 1 वर्ष के सभी यौन संपर्कों की पहचान कर उपचार दें।',
      mr: 'मागील १२ महिन्यांतील सर्व लैंगिक साथीदारांना शोधून उपचार द्या.',
    },
    closedSettingPearl: {
      en: 'Moist condyloma lata lesions contain dense treponemal spirochetes. Standard universal precautions are essential in closed barrack living.',
      hi: 'कंडायलोमा लाटा में अत्यधिक संक्रामक रोगाणु होते हैं। बैरकों में स्वच्छता व सावधानी अनिवार्य है।',
      mr: 'कॉन्डायलोमा लाटा मस्शांमध्ये तीव्र जंतू असतात. बंदिस्त बराकींमध्ये स्वच्छता व काळजी घेणे अत्यावश्यक आहे.',
    },
    photos: [
      {
        id: 'secondary-syphilis-palms',
        imageSrc: '/images/clinical/secondary-syphilis-palms.webp',
        caption: {
          en: 'Secondary Syphilis (Palms): Papulosquamous annular rash of secondary syphilis on palms.',
          hi: 'पामर रैश: हथेली पर तांबे के रंग के विशेष गोल चकत्ते।',
          mr: 'पामर पुरळ: तळहातावर तांबूस रंगाचे वैशिष्ट्यपूर्ण पुरळ.',
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
          mr: 'कॉन्डायलोमा लाटा: जननांगांभोवतीचे संसर्गजन्य ओलसर मस्से.',
        },
        gender: 'both',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
    ],
  },

  'gonorrhea': {
    id: 'gonorrhea',
    tag: {
      en: 'NACO SCM ATLAS • PURULENT DISCHARGE',
      hi: 'सुजाक (गोनोरिया) • मवाद स्राव',
      mr: 'गोनोरिया (सुजाक) • पू स्त्राव',
    },
    title: {
      en: 'Gonorrhea (Neisseria gonorrhoeae)',
      hi: 'गोनोरिया (सुजाक संक्रमण)',
      mr: 'गोनोरिया (सुजाक संसर्ग)',
    },
    kitBadge: {
      en: 'NACO Kit 1 (Grey)',
      hi: 'NACO किट 1 (ग्रे)',
      mr: 'NACO किट १ (राखाडी)',
      color: '#4A5568',
    },
    overview: {
      en: 'Gram-negative diplococcal infection causing acute severe burning during urination and thick, purulent yellow-green discharge. Can lead to cervicitis, epididymitis, and arthritis.',
      hi: 'बैक्टीरिया जनित संक्रमण जिसमें पेशाब में तीव्र जलन और गाढ़ा पीला-हरा मवाद जैसा स्राव होता है। यह गर्भाशय ग्रीवा और अंडकोष में सूजन फैला सकता है।',
      mr: 'लघवी करताना तीव्र जळजळ आणि पिवळसर-हिरवा घट्ट पू स्त्राव होणारा जिवाणू संसर्ग. वेळीच उपचार न केल्यास अंतर्गत अवयवांमध्ये सूज येऊ शकते.',
    },
    maleDetails: {
      en: 'Acute gonococcal urethritis with intense dysuria, erythema at the urethral meatus, and copious purulent creamy discharge within 2–7 days of exposure.',
      hi: 'पेशाब करते समय अत्यधिक जलन और लिंग से गाढ़ा मवाद निकलना (एक्यूट यूरेथ्राइटिस)।',
      mr: 'लघवी करताना तीव्र जळजळ आणि मूत्रमार्गातून घट्ट पू बाहेर पडणे.',
    },
    femaleDetails: {
      en: 'Gonococcal urethritis and endocervicitis with friable cervix, abnormal vaginal discharge, pelvic pain, or asymptomatic progression to PID in 70% of cases.',
      hi: 'योनि व मूत्रमार्ग से मवाद स्राव और गर्भाशय ग्रीवा में सूजन। 70% महिलाओं में कोई स्पष्ट दर्द नहीं होता।',
      mr: 'योनीमार्गातून पू स्त्राव आणि गर्भाशयाच्या मुखावर सूज. ७०% महिलांमध्ये सुरुवातीला कोणतेही लक्षण दिसत नाही.',
    },
    regimen: {
      en: 'Tab. Cefixime 400mg OD STAT + Tab. Azithromycin 1g OD STAT (NACO Kit 1 Grey).',
      hi: 'टैबलेट सेफिक्सिम 400mg + टैबलेट एज़िथ्रोमाइसिन 1g एकल खुराक (किट 1 ग्रे)।',
      mr: 'गोळी सेफिक्सिम ४००mg + गोळी अझिथ्रोमायसिन १ ग्रॅम एकच डोस (किट १ राखाडी).',
    },
    partnerProtocol: {
      en: 'Treat all sexual partners from the past 60 days simultaneously.',
      hi: 'पिछले 60 दिनों के सभी यौन साथियों का एक साथ उपचार करें।',
      mr: 'मागील ६० दिवसांतील सर्व लैंगिक साथीदारांचा एकाच वेळी उपचार करा.',
    },
    closedSettingPearl: {
      en: '70% of female gonococcal infections are asymptomatic. Screening high-risk prison populations uncovers hidden disease reservoirs.',
      hi: '70% महिलाओं में कोई लक्षण नहीं होते। जेलों में नियमित स्वास्थ्य जांच छिपे हुए संक्रमणों को रोकने में सहायक है।',
      mr: '७०% महिलांमध्ये लक्षणे नसतात. कारागृहांमध्ये नियमित तपासणीमुळे लपलेला संसर्ग रोखता येतो.',
    },
    photos: [
      {
        id: 'gonorrhea-male',
        imageSrc: '/images/clinical/gonorrhea-male-urethritis.webp',
        caption: {
          en: 'Male Urethritis: Purulent, copious urethral discharge in a patient with gonococcal urethritis.',
          hi: 'पुरुष मूत्रमार्ग स्राव: मूत्रमार्ग से गाढ़ा मवाद जैसा गोनोकोकल स्राव।',
          mr: 'पुरुष मूत्रमार्ग स्त्राव: मूत्रमार्गातून पू सारखा घट्ट स्त्राव.',
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
          mr: 'महिला मूत्रमार्ग स्त्राव: मूत्रमार्गावर पू सारखा स्त्राव.',
        },
        gender: 'female',
        citation: 'Morse, Moreland, Thompson: Atlas of STDs. London: Mosby-Wolfe; 1990.',
      },
    ],
  },

  'chlamydia-lgv': {
    id: 'chlamydia-lgv',
    tag: {
      en: 'NACO SCM ATLAS • CERVICITIS & BUBO',
      hi: 'क्लैमाइडिया एवं एलजीवी',
      mr: 'क्लॅमायडिया व एलजीव्ही',
    },
    title: {
      en: 'Chlamydia & Lymphogranuloma Venereum (LGV)',
      hi: 'क्लैमाइडिया एवं एलजीवी (गिल्टी सूजन)',
      mr: 'क्लॅमायडिया आणि एलजीव्ही (गाठींची सूज)',
    },
    kitBadge: {
      en: 'NACO Kit 1 (Grey) & Kit 7 (Black)',
      hi: 'NACO किट 1 एवं किट 7',
      mr: 'NACO किट १ व किट ७',
      color: '#1F2937',
    },
    overview: {
      en: 'Chlamydia trachomatis causes thin watery urethritis and mucopurulent cervicitis, while LGV invasive serovars cause unilateral painful swollen inguinal lymph nodes (buboes).',
      hi: 'क्लैमाइडिया से पतला पानी जैसा स्राव और एलजीवी से जांघ की गिल्टी में बड़ी और दर्दनाक सूजन (बूबो) होती है।',
      mr: 'क्लॅमायडियामुळे पातळ पांढरा स्त्राव होतो आणि एलजीव्हीमुळे जांघेतील गाठींमध्ये मोठी व वेदनादायी सूज (बुबो) येते.',
    },
    maleDetails: {
      en: 'Mild dysuria with clear/thin mucoid urethral discharge; unilateral tender, enlarged inguinal lymphadenopathy (LGV bubo) requiring NACO Kit 7 Black.',
      hi: 'पेशाब में हल्की जलन, पानी जैसा पतला स्राव और जांघ की गिल्टी में बड़ा दर्दनाक उभार (किट 7 काला)।',
      mr: 'लघवी करताना मंद जळजळ, पातळ स्त्राव आणि जांघेत मोठी दुखरी गाठ (किट ७ काळा).',
    },
    femaleDetails: {
      en: 'Mucopurulent cervicitis with yellow exudate from cervical os, cervical friability, deep dyspareunia, and risk of ascending Pelvic Inflammatory Disease (PID).',
      hi: 'गर्भाशय ग्रीवा में सूजन, छूने पर रक्तस्राव और पेट के निचले हिस्से में तेज दर्द।',
      mr: 'गर्भाशयाच्या मुखावर सूज, पिवळसर स्त्राव आणि ओटीपोटात तीव्र वेदना.',
    },
    regimen: {
      en: 'For Discharge: Kit 1 Grey (Cefixime + Azithromycin). For Inguinal Bubo (LGV): Cap. Doxycycline 100mg BD x 21 days + Tab. Azithromycin 1g STAT (NACO Kit 7 Black).',
      hi: 'स्राव हेतु: किट 1 ग्रे। जांघ की गिल्टी (एलजीवी बूबो) हेतु: किट 7 काला (डॉक्सीसाइक्लिन 100mg BD x 21 दिन + एज़िथ्रोमाइसिन 1g)।',
      mr: 'स्त्रावासाठी: किट १ राखाडी. जांघेतील गाठीसाठी: किट ७ काळा (डॉक्युसायक्लिन १००mg BD x २१ दिवस + अझिथ्रोमायसिन १g).',
    },
    partnerProtocol: {
      en: 'Treat all sexual contacts within 3 weeks prior to bubo onset.',
      hi: 'गिल्टी दिखने से 3 सप्ताह पूर्व के सभी यौन साथियों का उपचार करें।',
      mr: 'गाठ येण्यापूर्वीच्या ३ आठवड्यांतील सर्व लैंगिक साथीदारांवर उपचार करा.',
    },
    closedSettingPearl: {
      en: 'DO NOT incise or drain LGV buboes surgically, as this causes non-healing sinus tracts and chronic fistulas.',
      hi: 'जांघ की गिल्टी (बूबो) पर कभी चीरा न लगाएं, इससे पुराना नासूर (फिस्टुला) बन सकता है। केवल दवा से इलाज करें।',
      mr: 'जांघेतील गाठीवर कधीही शस्त्रक्रियेने चीरा मारू नका, त्यामुळे न भरणारी जुनी जखम (भगंदर) होऊ शकते. फक्त औषधोपचार करा.',
    },
    photos: [
      {
        id: 'chlamydia-male',
        imageSrc: '/images/clinical/chlamydia-male-urethritis.webp',
        caption: {
          en: 'Male Urethritis: Thin, watery urethral discharge of chlamydial urethritis.',
          hi: 'क्लैमाइडिया स्राव: मूत्रमार्ग से पतला पानी जैसा स्राव।',
          mr: 'क्लॅमायडिया स्त्राव: मूत्रमार्गातून पातळ पांढरा स्त्राव.',
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
          mr: 'एलजीव्ही बुबो: जांघेतील गाठीमध्ये मोठी व वेदनादायी सूज.',
        },
        gender: 'male',
        citation: 'Courtesy of Lawrence B. Stack, MD.',
      },
    ],
  },

  'genital-herpes': {
    id: 'genital-herpes',
    tag: {
      en: 'NACO SCM ATLAS • VESICULAR ULCERS',
      hi: 'जननांग हर्पीस • दर्दनाक छाले',
      mr: 'जननांग हर्पीस • वेदनादायी फोड',
    },
    title: {
      en: 'Genital Herpes Simplex (HSV-2)',
      hi: 'जननांग हर्पीस (हर्पीस सिम्प्लेक्स)',
      mr: 'जननांग हर्पीस (हर्पीस सिम्प्लेक्स)',
    },
    kitBadge: {
      en: 'NACO Kit 5 (Red)',
      hi: 'NACO किट 5 (लाल)',
      mr: 'NACO किट ५ (लाल)',
      color: '#DC2626',
    },
    overview: {
      en: 'Viral infection by HSV-2 presenting as painful fluid-filled vesicles in clusters that rupture into shallow, tender ulcerations with burning paresthesias.',
      hi: 'हर्पीस वायरस से होने वाला संक्रमण जिसमें पानी भरे छोटे दर्दनाक छाले होते हैं जो फूटकर लाल घाव बन जाते हैं।',
      mr: 'HSV-2 विषाणूमुळे होणारा संसर्ग, ज्यामध्ये जननांगावर पाणी भरलेले लहान वेदनादायी फोड येतात व फुटून अल्सर तयार होतात.',
    },
    maleDetails: {
      en: 'Multiple grouped vesicles and shallow erosions on glans, penile shaft, and prepuce with severe burning, tingling, and local tender lymphadenopathy.',
      hi: 'लिंग पर पानी भरे दानों और छालों का गुच्छा, जिसमें तेज चुभन, दर्द और जलन होती है।',
      mr: 'लिंगावर पाणी भरलेल्या लहान फोडांचे घोस, तीव्र जळजळ आणि जांघेत दुखणाऱ्या गाठी.',
    },
    femaleDetails: {
      en: 'Multiple coalescing superficial ulcerations of the vulva, severe dysuria, vaginal discharge, and cervical erosive ulcerations.',
      hi: 'योनिद्वार और लेबिया पर अत्यधिक दर्दनाक छालों व घावों का फैलाव, जिससे पेशाब में तेज चुभन होती है।',
      mr: 'योनीभागावर वेदनादायी फोड आणि जखमांचा फैलाव, लघवी करताना तीव्र टोचणे व वेदना.',
    },
    regimen: {
      en: 'Tab. Acyclovir 400mg TDS x 7 days (21 tablets total) (NACO Kit 5 Red). Keep lesions clean and dry.',
      hi: 'टैबलेट एसाइक्लोविर 400mg दिन में 3 बार x 7 दिन (कुल 21 गोलियां) (किट 5 लाल)। घाव को साफ व सूखा रखें।',
      mr: 'गोळी असायक्लोव्हिर ४००mg दिवसातून ३ वेळा x ७ दिवस (एकूण २१ गोळ्या) (किट ५ लाल). जखमा कोरड्या व स्वच्छ ठेवा.',
    },
    partnerProtocol: {
      en: 'Partner treatment is NOT indicated unless active vesicular lesions are present. Counsel on viral shedding.',
      hi: 'यदि साथी में छाले नहीं हैं तो दवा की जरूरत नहीं। सुरक्षित व्यवहार की काउंसलिंग दें।',
      mr: 'साथीदाराला फोड नसल्यास औषधांची गरज नाही. सुरक्षित वर्तनाचा सल्ला द्या.',
    },
    closedSettingPearl: {
      en: 'HSV-2 lesions double lifetime HIV transmission susceptibility. Provide barrier counseling & ongoing support.',
      hi: 'हर्पीस के घाव HIV के खतरे को दोगुना कर देते हैं। सुरक्षा उपायों की निरंतर काउंसलिंग दें।',
      mr: 'हर्पीसच्या जखमांमुळे HIV चा धोका दुप्पट होतो. नियमित सुरक्षित साधनांचा वापर करण्याचा सल्ला द्या.',
    },
    photos: [
      {
        id: 'herpes-primary-female',
        imageSrc: '/images/clinical/herpes-primary-female.webp',
        caption: {
          en: 'Primary Lesions (Female): Multiple coalescing superficial ulcerations of primary genital herpes.',
          hi: 'महिला हर्पीस: योनि पर अत्यधिक दर्दनाक छालों व घावों का फैलाव।',
          mr: 'महिला हर्पीस: योनीभागावर वेदनादायी फोड आणि जखमांचा फैलाव.',
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
          mr: 'पुरुष हर्पीस: लिंगावर पाणी भरलेल्या लहान फोडांचे घोस.',
        },
        gender: 'male',
        citation: 'H. Hunter Handsfield: Atlas of Sexually Transmitted Diseases. McGraw-Hill; 1992.',
      },
    ],
  },

  'chancroid-pediculosis': {
    id: 'chancroid-pediculosis',
    tag: {
      en: 'NACO SCM ATLAS • ULCERS & LICE',
      hi: 'चैनक्रॉइड एवं जूँ संक्रमण',
      mr: 'शँक्रॉइड आणि उवांचा संसर्ग',
    },
    title: {
      en: 'Chancroid & Pediculosis Pubis (Crab Lice)',
      hi: 'चैनक्रॉइड एवं जूँ संक्रमण',
      mr: 'शँक्रॉइड आणि प्यूबिक उवा (क्रॅब लाइस)',
    },
    kitBadge: {
      en: 'NACO Kit 3 (White) & Hygiene',
      hi: 'NACO किट 3 एवं स्वच्छता',
      mr: 'NACO किट ३ व स्वच्छता',
      color: '#1F2937',
    },
    overview: {
      en: 'Chancroid (Haemophilus ducreyi) causes multiple painful deep ulcers with undermined ragged borders and fluctuant buboes. Pediculosis pubis causes intense pubic itching from crab lice and nits.',
      hi: 'चैनक्रॉइड में गहरे दर्दनाक घाव और गिल्टी में मवाद होता है। पेडीकुलोसिस में जूँ बालों की जड़ों में चिपककर तीव्र खुजली करती हैं।',
      mr: 'शँक्रॉइडमध्ये खोल वेदनादायी जखमा आणि जांघेत पू भरलेली गाठ होते. प्यूबिक उवांमुळे जांघेच्या केसांमध्ये तीव्र खाज सुटते.',
    },
    maleDetails: {
      en: 'Multiple painful soft ulcers with ragged purulent edges and suppurative inguinal lymph nodes; Phthirus pubis lice clinging to pubic hairs.',
      hi: 'गहरे दर्दनाक घाव, गिल्टी में मवाद और जांघ के बालों में जूँ एवं उनके अंडे (निट्स)।',
      mr: 'अनेक वेदनादायी मऊ जखमा, जांघेत पू भरलेली गाठ आणि जांघेच्या केसांना चिकटलेल्या उवा व त्यांची अंडी.',
    },
    femaleDetails: {
      en: 'Extremely painful ragged ulcerations at fourchette and introitus; intense nocturnal itching in pubic region and perianal area.',
      hi: 'योनि प्रवेश द्वार पर गहरे दर्दनाक घाव और प्यूबिक क्षेत्र में तेज खुजली।',
      mr: 'योनीमार्गावर अत्यंत वेदनादायी जखमा आणि रात्रीच्या वेळी तीव्र खाज.',
    },
    regimen: {
      en: 'Chancroid: Inj. Benzathine Penicillin 2.4 MU + Tab. Azithromycin 1g (Kit 3 White). Pediculosis: Permethrin 1% lotion + wash all clothing/bedding.',
      hi: 'चैनक्रॉइड: किट 3 सफेद (पेनिसिलिन + एज़िथ्रोमाइसिन)। जूँ: पर्मेथ्रिन 1% लोशन + कपड़े व बिस्तर गर्म पानी से धोना।',
      mr: 'शँक्रॉइड: किट ३ पांढरा (पेनिसिलिन + अझिथ्रोमायसिन). उवांसाठी: परमार्थिन १% लोशन + कपडे व बिछाना गरम पाण्यात धुणे.',
    },
    partnerProtocol: {
      en: 'Treat all sexual contacts from the past 14 days and inspect barrack cellmates for body lice.',
      hi: 'पिछले 14 दिनों के यौन संपर्कों और बैरक के अन्य बंदियों में जूँ की जांच व उपचार करें।',
      mr: 'मागील १४ दिवसांतील लैंगिक साथीदारांचा व बराकीतील इतर बंदिवानांचा शोध घेऊन उपचार करा.',
    },
    closedSettingPearl: {
      en: 'In closed facilities, crab lice spread rapidly through shared bedding. Institutional laundering is key to eradication.',
      hi: 'जेलों में साझा कंबलों से जूँ तेजी से फैलती है। कंबलों और कपड़ों की सफाई सबसे महत्वपूर्ण है।',
      mr: 'कारागृहांमध्ये एकत्र वापरल्या जाणाऱ्या चादरी-कंबलांमुळे उवा वेगाने पसरतात. कपड्यांचे निर्जंतुकीकरण अत्यंत महत्त्वाचे आहे.',
    },
    photos: [
      {
        id: 'chancroid-lesions',
        imageSrc: '/images/clinical/chancroid-lesions.webp',
        caption: {
          en: 'Chancroid Lesions: Multiple painful, deep ulcerations with ragged borders.',
          hi: 'चैनक्रॉइड घाव: असमान किनारों वाले गहरे और अत्यंत दर्दनाक घाव।',
          mr: 'शँक्रॉइड जखमा: अनियमित कडा असलेल्या खोल व अतिशय वेदनादायी जखमा.',
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
          mr: 'प्यूबिक उवा: जांघेच्या केसांना चिकटलेली कीटक व अंडी.',
        },
        gender: 'both',
        citation: 'Morse, Moreland, Thompson: Atlas of STDs. London: Mosby-Wolfe; 1990.',
      },
    ],
  },

  'genital-warts': {
    id: 'genital-warts',
    tag: {
      en: 'NACO SCM ATLAS • HPV VERRUCOUS',
      hi: 'जननांग मस्से (एचपीवी)',
      mr: 'जननांगांवरील मस्से (HPV)',
    },
    title: {
      en: 'Condyloma Acuminata (Genital Warts)',
      hi: 'जननांग मस्से (कंडायलोमा एक्युमिनाटा)',
      mr: 'जननांगांवरील मस्से (कॉन्डायलोमा ॲक्युमिनाटा)',
    },
    kitBadge: {
      en: 'Clinical Podophyllin / Cryotherapy',
      hi: 'क्लिनिकल पोडोफिलिन / क्रायोथेरेपी',
      mr: 'क्लिनिकल पोडोफिलिन / क्रायोथेरपी',
      color: '#D97706',
    },
    overview: {
      en: 'Caused by low-risk HPV types 6 and 11. Presents as fleshy, hyperkeratotic, cauliflower-like exophytic papules and giant verrucous plaques on genitalia and perianal skin.',
      hi: 'ह्यूमन पेपिलोमावायरस (HPV) से होने वाले फूलगोभी के आकार के उभरे हुए मस्से जो जननांगों व गुदा के आसपास फैलते हैं।',
      mr: 'ह्युमन पॅपिलोमाव्हायरस (HPV) मुळे होणारे फुलकोबीच्या आकाराचे जननांगांवर व गुदद्वाराभोवती येणारे मांसल मस्से.',
    },
    maleDetails: {
      en: 'Verrucous, cauliflower-like lesions on coronal sulcus, glans penis, shaft, and scrotum, occasionally growing into giant condyloma plaques.',
      hi: 'लिंग की मुंड, चमड़ी और अंडकोष पर फूलगोभी जैसे उभरे हुए मस्से।',
      mr: 'लिंगावर, कातडीवर आणि अंडकोषावर फुलकोबीसारखे वाढलेले मस्से.',
    },
    femaleDetails: {
      en: 'Extensive verrucous lesions on posterior fourchette, labia majora/minora, vaginal introitus, and perianal region.',
      hi: 'योनिद्वार, लेबिया और गुदा के आसपास उभरे हुए खुरदुरे मस्सों का गुच्छा।',
      mr: 'योनीच्या बाहेरील भागावर आणि गुदद्वाराभोवती फुलकोबीसारख्या मस्शांचा समूह.',
    },
    regimen: {
      en: 'Topical Podophyllin 20-25% applied by clinician, Trichloroacetic Acid (TCA 80-90%), or Cryotherapy at Suraksha Clinic.',
      hi: 'सुरक्षा क्लिनिक में डॉक्टर द्वारा पोडोफिलिन 20-25% का लेप, टीसीए (TCA) अथवा क्रायोथेरेपी।',
      mr: 'सुरक्षा क्लिनिकमध्ये डॉक्टरांकडून पोडोफिलिन २०-२५% किंवा क्रायोथेरपीद्वारे उपचार.',
    },
    partnerProtocol: {
      en: 'Clinical examination of sexual partners; promote regular barrier protection (NACO condoms).',
      hi: 'यौन साथी की शारीरिक जांच और नियमित कंडोम के प्रयोग की सलाह दें।',
      mr: 'लैंगिक साथीदाराची वैद्यकीय तपासणी आणि नियमित निरोध वापरण्याचा सल्ला.',
    },
    closedSettingPearl: {
      en: 'Persistent HPV lesions require referral to Suraksha Clinics / Gynaecology for cervical cancer screening (Pap smear/VIA).',
      hi: 'लंबे समय तक रहने वाले मस्सों में सर्वाइकल कैंसर जांच (पैप स्मीयर) हेतु सुरक्षा क्लिनिक रेफर करें।',
      mr: 'दीर्घकाळ राहणाऱ्या मस्शांमध्ये गर्भाशयाच्या कर्करोगाच्या तपासणीसाठी (पॅप स्मीअर) सुरक्षा क्लिनिकमध्ये पाठवा.',
    },
    photos: [
      {
        id: 'warts-female-fourchette',
        imageSrc: '/images/clinical/warts-female-fourchette.webp',
        caption: {
          en: 'Genital Warts (Female): Verrucous lesions of the posterior fourchette.',
          hi: 'महिला जननांग मस्से: योनिद्वार पर फूलगोभी के आकार के मस्सों का समूह।',
          mr: 'महिला जननांग मस्से: योनीभागावर फुलकोबीसारख्या मस्शांचा समूह.',
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
          mr: 'पुरुष जननांग मस्से: लिंगाच्या टोकावर मोठे मस्से.',
        },
        gender: 'male',
        citation: 'Courtesy of A. Wisdom: Sexually Transmitted Diseases. London: Mosby-Wolfe; 1992.',
      },
    ],
  },

  'vaginal-discharge-pid': {
    id: 'vaginal-discharge-pid',
    tag: {
      en: 'NACO SCM ATLAS • DISCHARGE & PID',
      hi: 'योनि स्राव एवं पीआईडी',
      mr: 'योनी स्त्राव आणि पीआयडी',
    },
    title: {
      en: 'Vaginitis Syndromes & Pelvic Inflammatory Disease (PID)',
      hi: 'योनि स्राव एवं पेल्विक सूजन (पीआईडी)',
      mr: 'व्हॅजायनाइटिस व पेल्विक दाह (PID)',
    },
    kitBadge: {
      en: 'NACO Kit 2 (Green) & Kit 6 (Yellow)',
      hi: 'NACO किट 2 (हरा) एवं किट 6 (पीला)',
      mr: 'NACO किट २ (हिरवा) व किट ६ (पिवळा)',
      color: '#059669',
    },
    overview: {
      en: 'Vaginitis involves abnormal discharge, odor, and itching (Candidiasis, Trichomoniasis, BV). Ascending infection causes PID with lower abdominal pain and cervical motion tenderness.',
      hi: 'योनि स्राव (किट 2) में खुजली, दुर्गंध व असामान्य स्राव होता है। संक्रमण ऊपर फैलने पर पीआईडी (किट 6) बनता है जिसमें पेट के निचले हिस्से में तीव्र दर्द होता है।',
      mr: 'योनीतून असामान्य स्त्राव, खाज व दुर्गंधी (किट २). संसर्ग वर पसरल्यास ओटीपोटात तीव्र वेदना होऊन पीआयडी (किट ६) होतो.',
    },
    maleDetails: {
      en: 'Male sexual partners often harbor Trichomonas or Candida subclinically; simultaneous partner treatment is critical to break transmission.',
      hi: 'पुरुष साथी में भी संक्रमण के रोगाणु हो सकते हैं, अतः दोनों का साथ में उपचार आवश्यक है।',
      mr: 'पुरुष साथीदारामध्येही लक्षणे नसताना जंतू असू शकतात, त्यामुळे दोघांवर एकाच वेळी उपचार करणे आवश्यक आहे.',
    },
    femaleDetails: {
      en: 'Curd-like white or frothy greenish discharge, vulvar erythema, dyspareunia, cervical motion tenderness, and lower abdominal pain.',
      hi: 'दही जैसा सफेद या हरा झागदार स्राव, तीव्र खुजली, गर्भाशय ग्रीवा में दर्द और पेट के निचले हिस्से में सूजन।',
      mr: 'दह्यासारखा पांढरा किंवा फेसाळ हिरवा स्त्राव, खाज, ओटीपोटात दुखणे आणि सूज.',
    },
    regimen: {
      en: 'Vaginitis: Tab. Secnidazole 2g STAT + Cap. Fluconazole 150mg STAT (Kit 2 Green). PID: Tab. Cefixime 400mg STAT + Tab. Metronidazole 400mg BD x 14d + Cap. Doxycycline 100mg BD x 14d (Kit 6 Yellow).',
      hi: 'योनि स्राव: किट 2 हरा (सेकनिडाजोल 2g + फ्लुकोनाजोल 150mg)। पीआईडी: किट 6 पीला (सेफिक्सिम 400mg + मेट्रोनिडाजोल 400mg BD x 14 दिन + डॉक्सीसाइक्लिन 100mg BD x 14 दिन)।',
      mr: 'योनी स्त्राव: किट २ हिरवा (सेकनिडाझोल २g + फ्लुकोनाझोल १५०mg). पीआयडी: किट ६ पिवळा (सेफिक्सिम ४००mg + मेट्रोनिडाझोल ४००mg BD x १४ दिवस + डॉक्युसायक्लिन १००mg BD x १४ दिवस).',
    },
    partnerProtocol: {
      en: 'For PID & Trichomoniasis, treat male partner simultaneously with Kit 1 Grey (Cefixime + Azithromycin).',
      hi: 'पीआईडी एवं ट्राइकोमोनास में पुरुष साथी को भी किट 1 ग्रे देकर साथ में उपचार करें।',
      mr: 'पीआयडी व ट्रायकोमोनियासिसमध्ये पुरुष जोडीदाराला किट १ राखाडी देऊन सोबत उपचार करा.',
    },
    closedSettingPearl: {
      en: 'PID carries high risk of tubal infertility and chronic pelvic pain. Review in 72 hours; immediately refer if fever persists.',
      hi: 'पीआईडी से बांझपन का खतरा होता है। 72 घंटे में सुधार न होने पर तुरंत उच्च केंद्र रेफर करें।',
      mr: 'पीआयडीमुळे वंध्यत्वाचा धोका वाढतो. ७२ तासांत फरक न पडल्यास त्वरित उच्च रुग्णालयात पाठवा.',
    },
    photos: [
      {
        id: 'gonorrhea-cervicitis',
        imageSrc: '/images/clinical/gonorrhea-cervicitis.webp',
        caption: {
          en: 'Cervicitis: Endocervical purulent exudate with friable cervix in acute STI infection.',
          hi: 'एंडोसर्विकाइटिस: गर्भाशय ग्रीवा में लाली, सूजन और मवाद जैसा स्राव।',
          mr: 'सर्व्हिसायटिस: गर्भाशयाच्या मुखावर सूज आणि पू स्त्राव.',
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
          mr: 'बार्थोलिन ग्रंथीमध्ये पू भरलेली वेदनादायी गाठ.',
        },
        gender: 'female',
        citation: 'Courtesy of A. Wisdom: Sexually Transmitted Diseases. London: Mosby-Wolfe; 1992.',
      },
    ],
  },
};
