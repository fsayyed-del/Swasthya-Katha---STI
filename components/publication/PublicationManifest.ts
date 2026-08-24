import { Locale } from '@/src/domain/content/schema';

export type ManifestReviewStatus = 'approved' | 'pending' | 'expired';

export interface PageContent {
  id: string;
  pageNumber: number | null; // null for cover / back cover
  heading: Record<Locale, string>;
  eyebrow?: Record<Locale, string>;
  subheading?: Record<Locale, string>;
  bodyText: Record<Locale, string[]>;
  keyMessage?: Record<Locale, string>;
  sceneType?:
    | 'cover'
    | 'welcome'
    | 'sti-network'
    | 'hidden-signs'
    | 'clinic-journey'
    | 'suraksha-intro'
    | 'naco-cabinet'
    | 'care-referral'
    | 'back-cover'
    | 'primary-syphilis'
    | 'secondary-syphilis'
    | 'gonorrhea'
    | 'chlamydia-lgv'
    | 'genital-herpes'
    | 'chancroid-pediculosis'
    | 'genital-warts';
  accessibilityDescription: Record<Locale, string>;
  clinicalReviewStatus: ManifestReviewStatus;
}

export interface PublicationLeaf {
  id: string;
  index: number; // 0 to 7
  kind: 'cover' | 'content' | 'interactive' | 'back-cover';
  chapterId: string;
  front: PageContent;
  back: PageContent;
}

export interface PublicationManifest {
  manifestVersion: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  edition: string;
  totalLeaves: number; // 8
  totalFaces: number;  // 16
  leaves: PublicationLeaf[];
}

export const CANONICAL_PUBLICATION_MANIFEST: PublicationManifest = {
  manifestVersion: '3.0.0',
  title: {
    en: 'Swasthya Katha',
    hi: 'स्वास्थ्य कथा',
    mr: 'स्वास्थ्य कथा',
    bn: 'স্বাস্থ্য কথা',
    ta: 'சுவாஸ்த்ய கதா',
    te: 'స్వాస్థ్య కథ',
  },
  subtitle: {
    en: 'Visual & Audio Magazine on Sexual Health & NACO Syndromic Care',
    hi: 'यौन स्वास्थ्य, रोकथाम एवं NACO सिंड्रोमिक देखभाल की सचित्र पत्रिका',
    mr: 'लैंगिक आरोग्य व NACO सिंड्रोमिक उपचारांची सचित्र मार्गदर्शिका',
    bn: 'যৌন স্বাস্থ্য ও ন্যাকো সিন্ড্রোমিক কেয়ারের সচিত্র নির্দেশিকা',
    ta: 'பாலியல் சுகாதாரம் மற்றும் NACO வண்ண கிட் வழிகாட்டி',
    te: 'లైంగిక ఆరోగ్యం మరియు NACO సంరక్షణ మార్గదర్శి',
  },
  edition: 'First National Edition 2026',
  totalLeaves: 8,
  totalFaces: 16,
  leaves: [
    // LEAF 0: Front Cover & Page 1 (Welcome)
    {
      id: 'leaf-0',
      index: 0,
      kind: 'cover',
      chapterId: 'cover',
      front: {
        id: 'face-0-front-cover',
        pageNumber: null,
        heading: {
          en: 'Swasthya Katha',
          hi: 'स्वास्थ्य कथा',
          mr: 'स्वास्थ्य कथा',
          bn: 'স্বাস্থ্য কথা',
          ta: 'சுவாஸ்த்ய கதா',
          te: 'స్వాస్థ్య కథ',
        },
        eyebrow: {
          en: 'National Health Editorial Edition 2026',
          hi: 'राष्ट्रीय स्वास्थ्य संस्करण 2026',
          mr: 'राष्ट्रीय आरोग्य आवृत्ती २०२६',
          bn: 'জাতীয় স্বাস্থ্য সংস্করণ ২০২৬',
          ta: 'தேசிய சுகாதார பதிப்பு 2026',
          te: 'జాతీయ ఆరోగ్య సంచిక 2026',
        },
        subheading: {
          en: 'A visual, respectful, and stigma-free guide to sexual health, testing, and government Suraksha Clinic care.',
          hi: 'यौन स्वास्थ्य, जांच एवं सरकारी सुरक्षा क्लिनिक देखभाल की सहज, सम्मानजनक और गोपनीय सचित्र गाइड।',
          mr: 'लैंगिक आरोग्य, तपासणी आणि शासकीय सुरक्षा क्लिनिक उपचारांची मार्गदर्शिका.',
          bn: 'যৌন স্বাস্থ্য, পরীক্ষা ও সরকারি সুরক্ষা ক্লিনিকের সহজ ও গোপনীয় সচিত্র গাইড।',
          ta: 'பாலியல் சுகாதாரம் மற்றும் பரிசோதனை பற்றிய வழிகாட்டி.',
          te: 'లైంగిక ఆరోగ్యం మరియు పరీక్షల గురించిన సచిత్ర మార్గదర్శి.',
        },
        bodyText: {
          en: ['Drag the page edge or swipe to open the book.'],
          hi: ['किताब खोलने के लिए पन्ने के किनारे को खींचें (Drag) या स्वाइप करें।'],
          mr: ['पुस्तक उघडण्यासाठी पानाच्या कडेला ड्रॅग किंवा स्वाइप करा.'],
          bn: ['বইটি খুলতে পৃষ্ঠার কিনারা টেনে আনুন বা সোয়াইপ করুন।'],
          ta: ['புத்தகத்தை திறக்க பக்கத்தை இழுக்கவும்.'],
          te: ['పుస్తకాన్ని తెరవడానికి పేజీని లాగండి లేదా స్వైప్ చేయండి.'],
        },
        sceneType: 'cover',
        accessibilityDescription: {
          en: 'Tactile editorial book cover with embossed gold lettering and deep ink-teal ground.',
          hi: 'गहरे टील रंग की भव्य बुक कवर जिस पर सुनहरे अक्षरों में स्वास्थ्य कथा लिखा है।',
          mr: 'टील रंगाचे आकर्षक मुखपृष्ठ.',
          bn: 'একটি মনোরম বইয়ের প্রচ্ছদ।',
          ta: 'அழகிய புத்தக அட்டைப்படம்.',
          te: 'పుస్తక ముఖచిత్రం.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-1-welcome',
        pageNumber: 1,
        heading: {
          en: 'Welcome to Swasthya Katha',
          hi: 'स्वास्थ्य कथा में आपका स्वागत है',
          mr: 'स्वास्थ्य कथा मध्ये आपले स्वागत आहे',
          bn: 'স্বাস্থ্য কথায় আপনাকে স্বাগতম',
          ta: 'சுவாஸ்த்ய கதா-விற்கு நல்வரவு',
          te: 'స్వాస్థ్య కథకు స్వాగతం',
        },
        eyebrow: {
          en: 'Editorial Note',
          hi: 'संपादकीय संदेश',
          mr: 'संपादकीय',
          bn: 'সম্পাদকীয়',
          ta: 'தலையங்கம்',
          te: 'సంపాదకీయం',
        },
        bodyText: {
          en: [
            'Health is our most precious asset, yet sexual health is often clouded by silence, misinformation, and unnecessary fear.',
            'This publication brings you clear, scientifically verified, and compassionate health education. It is designed to be read, heard, and shared freely with your partner or community.',
          ],
          hi: [
            'स्वास्थ्य हमारा सबसे बड़ा धन है, लेकिन यौन स्वास्थ्य पर अक्सर संकोच और भ्रांतियों का पर्दा पड़ा रहता है।',
            'यह पत्रिका आपके लिए वैज्ञानिक, स्पष्ट और सम्मानजनक जानकारी लेकर आई है, जिसे आप बिना किसी झिझक के पढ़ और सुन सकते हैं।',
          ],
          mr: [
            'लैंगिक आरोग्याबाबत योग्य माहिती मिळणे हा प्रत्येकाचा अधिकार आहे.',
            'ही पत्रिका शास्त्रीय व सोप्या भाषेत मार्गदर्शन करते.',
          ],
          bn: ['যৌন স্বাস্থ্য সম্পর্কিত সঠিক ও বিজ্ঞানসম্মত তথ্য সকলের জন্য।'],
          ta: ['பாலியல் சுகாதாரம் பற்றிய தெளிவான அறிவியல் தகவல்கள்.'],
          te: ['లైంగిక ఆరోగ్యం గురించిన స్పష్టమైన శాస్త్రీయ సమాచారం.'],
        },
        sceneType: 'welcome',
        accessibilityDescription: {
          en: 'An editorial introduction welcoming readers and outlining the book mission.',
          hi: 'संपादकीय परिचय जो पाठकों का स्वागत करता है।',
          mr: 'परिचय पृष्ठ.',
          bn: 'ভূমিকা পাতা।',
          ta: 'அறிமுக பக்கம்.',
          te: 'పరిచయ పేజీ.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 1: Page 2 (Transmission Network) & Page 3 (Primary Syphilis)
    {
      id: 'leaf-1',
      index: 1,
      kind: 'content',
      chapterId: 'transmission-primary-syphilis',
      front: {
        id: 'face-2-transmission-network',
        pageNumber: 2,
        heading: {
          en: 'How Transmission Occurs',
          hi: 'संक्रमण कैसे फैलता है?',
          mr: 'संसर्ग कसा पसरतो?',
          bn: 'সংক্রমণ কীভাবে ছড়ায়?',
          ta: 'தொற்று எவ்வாறு பரவுகிறது?',
          te: 'సంక్రమణ ఎలా వ్యాపిస్తుంది?',
        },
        eyebrow: {
          en: 'Biological Pathways',
          hi: 'संक्रमण मार्ग',
          mr: 'संसर्ग मार्ग',
          bn: 'সংক্রমণের গতিপথ',
          ta: 'தொற்று பரவல்',
          te: 'సంక్రమణ మార్గాలు',
        },
        bodyText: {
          en: [
            'Germs travel through microscopic bodily fluids during unprotected intimate contact.',
            'They NEVER spread through casual touch, hugs, sharing food, toilet seats, or handshakes.',
          ],
          hi: [
            'कीटाणु केवल असुरक्षित अंतरंग संपर्क के दौरान शारीरिक तरल पदार्थों से फैलते हैं।',
            'हाथ मिलाने, गले मिलने, साथ खाने या टॉयलेट सीट से यह कभी नहीं फैलता।',
          ],
          mr: ['हस्त आंदोलन किंवा एकत्र जेवल्याने हा आजार कधीही पसरत नाही.'],
          bn: ['একসাথে খাওয়া বা স্পর্শের মাধ্যমে এটি ছড়ায় না।'],
          ta: ['கைகுலுக்குவதாலோ ஒன்றாக உண்பதாலோ பரவாது.'],
          te: ['కరచాలనం లేదా కలిసి తినడం వల్ల ఇది వ్యాపించదు.'],
        },
        sceneType: 'sti-network',
        accessibilityDescription: {
          en: 'Interactive node diagram demonstrating transmission pathways between partners and clinical counseling intervention.',
          hi: 'संक्रमण मार्गों और सुरक्षा क्लिनिक की भूमिका को दर्शाता आरेख।',
          mr: 'संसर्ग मार्ग दर्शवणारा आलेख.',
          bn: 'সংক্রমণের গতিপথের চিত্র।',
          ta: 'தொற்று பரவல் வரைபடம்.',
          te: 'సంక్రమణ మార్గాల చిత్రం.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-3-primary-syphilis',
        pageNumber: 3,
        heading: {
          en: 'Primary Syphilis (Treponema pallidum)',
          hi: 'प्राथमिक सिफलिस (प्रारंभिक अवस्था)',
          mr: 'प्राथमिक सिफिलीस',
          bn: 'প্রাথমিক সিফিলিস',
          ta: 'முதன்மை சிபിലിஸ்',
          te: 'ప్రైమరీ సిఫిలిస్',
        },
        eyebrow: {
          en: 'Clinical Atlas Spread',
          hi: 'क्लिनिकल एटलस',
          mr: 'वैद्यकीय माहिती',
          bn: 'ক্লিনিক্যাল অ্যাটলাস',
          ta: 'மருத்துவ ஆவணம்',
          te: 'క్లినికల్ అట్లాస్',
        },
        bodyText: {
          en: [
            'Primary syphilis presents with a solitary, painless genital ulcer (chancre) with an indurated margin and clean base.',
          ],
          hi: [
            'प्राथमिक सिफलिस में जननांग पर एक दर्द-रहित घाव (शैंकर) होता है जिसके किनारे कड़े और तल साफ होते हैं।',
          ],
          mr: ['वेदना नसलेली जखम.'],
          bn: ['ব্যথাহীন প্রাথমিক ঘা।'],
          ta: ['வலியற்ற புண்.'],
          te: ['నొప్పి లేని పుండు.'],
        },
        sceneType: 'primary-syphilis',
        accessibilityDescription: {
          en: 'Clinical comparison of male and female primary syphilitic chancres with diagnostic descriptions.',
          hi: 'पुरुष और महिला प्राथमिक सिफलिस शैंकर की क्लिनिकल तुलना।',
          mr: 'सिफिलीस माहिती.',
          bn: 'সিফিলিস চিত্র।',
          ta: 'சிபிலிஸ் படம்.',
          te: 'సిఫిలిస్ చిత్రం.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 2: Page 4 (Secondary Syphilis) & Page 5 (Gonorrhea)
    {
      id: 'leaf-2',
      index: 2,
      kind: 'content',
      chapterId: 'secondary-syphilis-gonorrhea',
      front: {
        id: 'face-4-secondary-syphilis',
        pageNumber: 4,
        heading: {
          en: 'Secondary Syphilis: Systemic Signs',
          hi: 'द्वितीयक सिफलिस: चकत्ते एवं लक्षण',
          mr: 'द्वितीयक सिफिलीस',
          bn: 'দ্বিতীয় স্তর সিফিলিস',
          ta: 'இரண்டாம் நிலை சிபிலிஸ்',
          te: 'ద్వితీయ దశ సిఫిలిస్',
        },
        eyebrow: {
          en: 'Systemic Spread',
          hi: 'शारीरिक प्रसार',
          mr: 'शारीरिक लक्षणे',
          bn: 'শারীরিক লক্ষণ',
          ta: 'உடல் அறிகுறிகள்',
          te: 'శరీర వ్యాప్తి',
        },
        bodyText: {
          en: [
            'Secondary syphilis features non-itchy copper-red maculopapular rash on trunk, palms, and soles, oral mucous patches, and condyloma lata.',
          ],
          hi: [
            'हथेलियों और तलवों पर तांबे जैसे लाल चकत्ते, मुंह में छाले और जननांगों पर मस्सेनुमा उभार (कंडायलोमा लाटा) होते हैं।',
          ],
          mr: ['अंगावर लाल चट्टे व पुरळ.'],
          bn: ['শরীরে লাল ফুসকুড়ি ও ঘা।'],
          ta: ['உடலில் தடிப்புகள்.'],
          te: ['శరీరంపై ఎర్రటి దద్దుర్లు.'],
        },
        sceneType: 'secondary-syphilis',
        accessibilityDescription: {
          en: 'Photographic atlas of secondary syphilis showing trunk rash, palmar lesions, and condyloma lata.',
          hi: 'द्वितीयक सिफलिस के चकत्तों और उभारों का सचित्र विवरण।',
          mr: 'द्वितीयक सिफिलीस छायाचित्रे.',
          bn: 'সিফিলিস দ্বিতীয় স্তরের ছবি।',
          ta: 'இரண்டாம் நிலை சிபிலிஸ் புகைப்படங்கள்.',
          te: 'సిఫిలిస్ ద్వితీయ దశ చిత్రాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-5-gonorrhea',
        pageNumber: 5,
        heading: {
          en: 'Gonorrhea (Neisseria gonorrhoeae)',
          hi: 'गोनोरिया (सुजाक संक्रमण)',
          mr: 'गोनोरिया (प्रमेह)',
          bn: 'গনোরিয়া',
          ta: 'வெட்டை நோய் (கொனோரியா)',
          te: 'గొనేరియా',
        },
        eyebrow: {
          en: 'Purulent Discharge Syndrome',
          hi: 'मवाद स्राव सिंड्रोम',
          mr: 'स्राव लक्षणे',
          bn: 'পুঁজ নিঃসরণ',
          ta: 'சீழ் வெளியேற்றம்',
          te: 'చీము స్రావం',
        },
        bodyText: {
          en: [
            'Gonorrhea causes severe burning during urination and thick purulent yellow-green discharge in men and women.',
          ],
          hi: [
            'गोनोरिया में पेशाब में तीव्र जलन और मूत्रमार्ग से गाढ़ा पीला-हरा मवाद जैसा स्राव होता है।',
          ],
          mr: ['लघवी करताना तीव्र जळजळ व मवाद स्राव.'],
          bn: ['প্রস্রাবে জ্বালাপোড়া ও পুঁজ নিঃসরণ।'],
          ta: ['சிறுநீர் கழிக்கும்போது எரிச்சல்.'],
          te: ['మూత్ర విసర్జనలో మంట మరియు చీము.'],
        },
        sceneType: 'gonorrhea',
        accessibilityDescription: {
          en: 'Clinical presentations of gonococcal urethritis and cervicitis in male and female anatomy.',
          hi: 'पुरुष और महिला में गोनोरिया स्राव की क्लिनिकल तस्वीरें।',
          mr: 'गोनोरिया लक्षणे.',
          bn: 'গনোরিয়ার লক্ষণ।',
          ta: 'கொனோரியா அறிகுறிகள்.',
          te: 'గొనేరియా లక్షణాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 3: Page 6 (Chlamydia & LGV) & Page 7 (Genital Herpes)
    {
      id: 'leaf-3',
      index: 3,
      kind: 'content',
      chapterId: 'chlamydia-herpes',
      front: {
        id: 'face-6-chlamydia-lgv',
        pageNumber: 6,
        heading: {
          en: 'Chlamydia & Lymphogranuloma Venereum (LGV)',
          hi: 'क्लैमाइडिया एवं एलजीवी (गिल्टी सूजन)',
          mr: 'क्लॅमिडिया व एलजीव्ही',
          bn: 'ক্লামাইডিয়া ও এলজিভি',
          ta: 'கிளமிடியா மற்றும் எல்ஜிவி',
          te: 'క్లామిడియా మరియు ఎల్‌జివి',
        },
        eyebrow: {
          en: 'Mucopurulent & Inguinal Syndrome',
          hi: 'स्राव एवं गिल्टी सिंड्रोम',
          mr: 'स्राव व गाठ लक्षणे',
          bn: 'স্রাব ও লিম্ফ নোড ফোলা',
          ta: 'சுரப்பு மற்றும் நெறிகட்டுதல்',
          te: 'స్రావం మరియు బిళ్ల కట్టడం',
        },
        bodyText: {
          en: [
            'Chlamydia causes watery urethral discharge and cervicitis, while LGV causes painful enlarged inguinal buboes.',
          ],
          hi: [
            'क्लैमाइडिया से पतला पानी जैसा स्राव और एलजीवी से जांघ की गिल्टी में बड़ा दर्दनाक उभार (बूबो) होता है।',
          ],
          mr: ['पातळ स्राव व जांघेत गाठ.'],
          bn: ['পাতলা স্রাব ও কুঁচকিতে ফোলা গ্রন্থি।'],
          ta: ['மெல்லிய திரவம் மற்றும் நெறிகட்டுதல்.'],
          te: ['చీము స్రావం మరియు గజ్జల్లో బిళ్లలు.'],
        },
        sceneType: 'chlamydia-lgv',
        accessibilityDescription: {
          en: 'Clinical imagery of chlamydial urethritis and unilateral LGV inguinal bubo swelling.',
          hi: 'क्लैमाइडिया स्राव और एलजीवी गिल्टी उभार की क्लिनिकल तस्वीरें।',
          mr: 'क्लॅमिडिया व एलजीव्ही चित्रे.',
          bn: 'ক্লামাইডিয়া ও এলজিভির ছবি।',
          ta: 'கிளமிடியா புகைப்படங்கள்.',
          te: 'క్లామిడియా చిత్రాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-7-genital-herpes',
        pageNumber: 7,
        heading: {
          en: 'Genital Herpes Simplex (HSV-2)',
          hi: 'जननांग हर्पीस (हर्पीस सिम्प्लेक्स)',
          mr: 'हर्पीस संसर्ग',
          bn: 'যৌনাঙ্গে হারপিস',
          ta: 'ஹெர்பிஸ் தொற்று',
          te: 'హెర్పెస్ సంక్రమణ',
        },
        eyebrow: {
          en: 'Vesicular Ulceration Syndrome',
          hi: 'दर्दनाक छाले सिंड्रोम',
          mr: 'वेदनादायी फोड',
          bn: 'বেদনাদায়ক ফোস্কা',
          ta: 'கொப்புளங்கள்',
          te: 'నొప్పిగల బొబ్బలు',
        },
        bodyText: {
          en: [
            'Herpes presents with crops of painful fluid-filled blisters that rupture into tender, shallow ulcers.',
          ],
          hi: [
            'हर्पीस में पानी भरे छोटे दर्दनाक छाले होते हैं जो फूटकर लाल घाव बन जाते हैं।',
          ],
          mr: ['पाण्याचे दुखरे फोड व अल्सर.'],
          bn: ['পানিভর্তি ছোট ছোট ফোস্কা ও ঘা।'],
          ta: ['நீர்க்கொப்புளங்கள் மற்றும் புண்கள்.'],
          te: ['నీటి బొబ్బలు మరియు బాధాకరమైన పుండ్లు.'],
        },
        sceneType: 'genital-herpes',
        accessibilityDescription: {
          en: 'Photographs of primary and recurrent genital herpes vesicle clusters and shallow ulcerations.',
          hi: 'जननांग हर्पीस के छालों और घावों की क्लिनिकल तस्वीरें।',
          mr: 'हर्पीस फोडांची छायाचित्रे.',
          bn: 'হারপিসের ফোস্কার ছবি।',
          ta: 'ஹெர்பிஸ் புண்களின் புகைப்படங்கள்.',
          te: 'హెర్పెస్ బొబ్బల చిత్రాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 4: Page 8 (Chancroid & Pediculosis) & Page 9 (Genital Warts)
    {
      id: 'leaf-4',
      index: 4,
      kind: 'content',
      chapterId: 'chancroid-warts',
      front: {
        id: 'face-8-chancroid-pediculosis',
        pageNumber: 8,
        heading: {
          en: 'Chancroid & Pediculosis Pubis (Crab Lice)',
          hi: 'चैनक्रॉइड एवं जूँ (जूँ संक्रमण)',
          mr: 'शँक्रॉइड व उवा संसर्ग',
          bn: 'শ্যাঙ্ক্রয়েড ও উকুন সংক্রমণ',
          ta: 'சாங்க்ராய்டு மற்றும் பேன் தொற்று',
          te: 'షాంక్రాయిడ్ మరియు పేను సంక్రమణ',
        },
        eyebrow: {
          en: 'Painful Ulcers & Parasites',
          hi: 'गहरे घाव एवं परजीवी',
          mr: 'जखम व परजीवी',
          bn: 'গভীর ঘা ও পরজীবী',
          ta: 'ஆழமான புண்கள் மற்றும் ஒட்டுண்ணி',
          te: 'లోతైన పుండ్లు మరియు పరాన్నజీవులు',
        },
        bodyText: {
          en: [
            'Chancroid causes multiple soft painful ulcers. Pediculosis pubis causes intense itching from crab lice clinging to pubic hairs.',
          ],
          hi: [
            'चैनक्रॉइड में गहरे दर्दनाक घाव होते हैं। पेडीकुलोसिस में जूँ बालों से चिपककर तीव्र खुजली करती हैं।',
          ],
          mr: ['दुखऱ्या जखमा व तीव्र खाज.'],
          bn: ['বেদনাদায়ক ঘা ও তীব্র চুলকানি।'],
          ta: ['வலியுடன் கூடிய புண் மற்றும் அரிப்பு.'],
          te: ['బాధాకరమైన పుండ్లు మరియు తీవ్రమైన దురద.'],
        },
        sceneType: 'chancroid-pediculosis',
        accessibilityDescription: {
          en: 'Clinical photos of chancroid ulcers and pubic crab lice clinging to hairs.',
          hi: 'चैनक्रॉइड घाव और जूँ संक्रमण की क्लिनिकल तस्वीरें।',
          mr: 'शँक्रॉइड व उवांची छायाचित्रे.',
          bn: 'শ্যাঙ্ক্রয়েড ও উকুনের ছবি।',
          ta: 'சாங்க்ராய்டு மற்றும் பேன் படங்கள்.',
          te: 'షాంక్రాయిడ్ మరియు పేను చిత్రాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-9-genital-warts',
        pageNumber: 9,
        heading: {
          en: 'Genital Warts (Condyloma Acuminata)',
          hi: 'जननांग मस्से (कंडायलोमा एक्युमिनाटा)',
          mr: 'गुप्तांगावरील चामखीळ',
          bn: 'যৌনাঙ্গে আঁচিল',
          ta: 'பாலியல் மருக்கள்',
          te: 'లైంగిక మొటిమలు',
        },
        eyebrow: {
          en: 'Human Papillomavirus (HPV)',
          hi: 'एचपीवी जननांग मस्से',
          mr: 'एचपीव्ही संसर्ग',
          bn: 'এইচপিভি সংক্রমণ',
          ta: 'எச்பிவி தொற்று',
          te: 'హెచ్‌పివి సంక్రమణ',
        },
        bodyText: {
          en: [
            'HPV causes cauliflower-like flesh-colored warts on external genitalia and perianal regions.',
          ],
          hi: [
            'ह्यूमन पेपिलोमावायरस से जननांगों पर फूलगोभी जैसे उभरे हुए मस्से होते हैं।',
          ],
          mr: ['फुलकोबीच्या आकाराच्या चामखिळी.'],
          bn: ['ফুলকপির মতো মাংসল আঁচিল।'],
          ta: ['காலிஃபிளவர் போன்ற மருக்கள்.'],
          te: ['కాలీఫ్లవర్ ఆకారంలో మొటిమలు.'],
        },
        sceneType: 'genital-warts',
        accessibilityDescription: {
          en: 'Clinical imagery of male and female typical and giant condyloma acuminata warts.',
          hi: 'पुरुष और महिला जननांग मस्सों की क्लिनिकल तस्वीरें।',
          mr: 'चामखिळींची छायाचित्रे.',
          bn: 'যৌনাঙ্গের আঁচিলের ছবি।',
          ta: 'மருக்களின் புகைப்படங்கள்.',
          te: 'మొటిమల చిత్రాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 5: Page 10 (Hidden Signs) & Page 11 (Clinic Journey)
    {
      id: 'leaf-5',
      index: 5,
      kind: 'interactive',
      chapterId: 'asymptomatic-clinic-journey',
      front: {
        id: 'face-10-hidden-signs',
        pageNumber: 10,
        heading: {
          en: 'Some Infections Have No Visible Signs',
          hi: 'कई बार बाहर से कोई लक्षण नहीं दिखता',
          mr: 'अनेकदा कोणतीही लक्षणे दिसत नाहीत',
          bn: 'অনেক সময় কোনো লক্ষণ থাকে না',
          ta: 'அறிகுறிகள் தெரிவதில்லை',
          te: 'లక్షణాలు కనిపించవు',
        },
        eyebrow: {
          en: 'Asymptomatic Presentation',
          hi: 'लक्षण-रहित संक्रमण',
          mr: 'लक्षणविरहित संसर्ग',
          bn: 'সুপ্ত সংক্রমণ',
          ta: 'அறிகுறியற்ற நிலை',
          te: 'లక్షణాలు లేని స్థితి',
        },
        bodyText: {
          en: [
            'Up to 70% of women and 50% of men carry infections silently without pain or sores.',
            'Regular testing at a Suraksha Clinic is the only reliable way to know your true status.',
          ],
          hi: [
            '70% महिलाओं और 50% पुरुषों में शुरुआत में कोई दर्द या घाव नहीं होता।',
            'सुरक्षा क्लिनिक में नियमित जांच ही स्वास्थ्य की सच्चाई जानने का एकमात्र सही तरीका है।',
          ],
          mr: ['नियमित चाचणीनेच खरी स्थिती समजते.'],
          bn: ['নিয়মিত পরীক্ষাই সুরক্ষার একমাত্র পথ।'],
          ta: ['வழக்கமான பரிசோதனையே பாதுகாப்பு.'],
          te: ['క్రమబద్ధమైన పరీక్షే అసలైన రక్షణ.'],
        },
        sceneType: 'hidden-signs',
        accessibilityDescription: {
          en: 'Interactive microscope reveal illustrating how micro-organisms colonize silently without symptoms.',
          hi: 'बिना लक्षण वाले कीटाणुओं को दर्शाता सूक्ष्मदर्शी चित्र।',
          mr: 'सूक्ष्मदर्शी चित्र.',
          bn: 'মাইক্রোস্কোপিক চিত্র।',
          ta: 'நுண்ணோக்கி படம்.',
          te: 'సూక్ష్మదర్శిని చిత్రం.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-11-clinic-journey',
        pageNumber: 11,
        heading: {
          en: 'The 4-Step Suraksha Clinic Journey',
          hi: 'सुरक्षा क्लिनिक के 4 आसान चरण',
          mr: 'तपासणीच्या ४ सोप्या पायऱ्या',
          bn: 'সুরক্ষা ক্লিনিকের ৪টি ধাপ',
          ta: '4 எளிய சிகிச்சை நிலைகள்',
          te: '4 సులభమైన దశలు',
        },
        eyebrow: {
          en: 'Confidential Care Pathway',
          hi: 'गोपनीय सेवा मार्ग',
          mr: 'गोपनीय सेवा',
          bn: 'গোপনীয় সেবা ধাপ',
          ta: 'ரகசிய சிகிச்சை முறை',
          te: 'రహస్య సంరక్షణ విధానం',
        },
        bodyText: {
          en: [
            '1. Anonymous Token Registration • 2. Private Counseling • 3. Painless Sample Check • 4. Free Medicine Kit',
          ],
          hi: [
            '1. निजी कोड पंजीकरण • 2. एकांत परामर्श • 3. दर्द-रहित जांच • 4. मुफ्त दवा किट एवं कंडोम',
          ],
          mr: ['१. टोकन २. समुपदेशन ३. तपासणी ४. मोफत किट'],
          bn: ['১. কোড ২. আলোচনা ৩. পরীক্ষা ৪. বিনামূল্যে কিট'],
          ta: ['1. பதிவு 2. ஆலோசனை 3. பரிசோதனை 4. இலவச மருந்து'],
          te: ['1. నమోదు 2. కౌన్సెలింగ్ 3. పరీక్ష 4. ఉచిత కిట్'],
        },
        sceneType: 'clinic-journey',
        accessibilityDescription: {
          en: 'Visual flow showing the 4 steps of a confidential Suraksha Clinic appointment.',
          hi: 'सुरक्षा क्लिनिक के चारों चरणों का प्रवाह आरेख।',
          mr: '४ टप्प्यांचा प्रवाह आलेख.',
          bn: '৪টি ধাপের চিত্র।',
          ta: '4 சிகிச்சை நிலைகள்.',
          te: '4 చికిత్స దశలు.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 6: Page 12 (NACO 7-Kit Cabinet) & Page 13 (Care & Partner Support)
    {
      id: 'leaf-6',
      index: 6,
      kind: 'interactive',
      chapterId: 'cabinet-spread',
      front: {
        id: 'face-12-naco-7-kits-cabinet',
        pageNumber: 12,
        heading: {
          en: 'NACO 7 Color-Coded Kit Cabinet',
          hi: 'NACO 7 कलर-कोडेड किट कैबिनेट',
          mr: 'NACO ७ रंगीत किट कॅबिनेट',
          bn: 'ন্যাকো ৭টি কালার-কোডেড কিট কেবিনেট',
          ta: 'NACO 7 வண்ண கிட் அலமாரி',
          te: 'NACO 7 రంగు కిట్ల క్యాబినెట్',
        },
        eyebrow: {
          en: 'Standard Syndromic Regimens',
          hi: 'मानक सिंड्रोमिक किट',
          mr: 'प्रमाणित किट्स',
          bn: 'মানসম্মত কিটসমূহ',
          ta: 'மருத்துவ கிட்கள்',
          te: 'ప్రామాణిక కిట్లు',
        },
        bodyText: {
          en: [
            'Tap any kit box below to inspect its targeted symptom cluster and partner care guidelines.',
          ],
          hi: [
            'किसी भी किट बॉक्स पर टैप करके उसके लक्षण और साथी के इलाज की जानकारी देखें।',
          ],
          mr: ['माहिती पाहण्यासाठी कोणत्याही किटवर टॅप करा.'],
          bn: ['বিস্তারিত জানতে যেকোনো কিটে ট্যাপ করুন।'],
          ta: ['விவரங்களை அறிய கிட் மீது தொடவும்.'],
          te: ['వివరాల కోసం ఏదైనా కిట్‌పై నొక్కండి.'],
        },
        sceneType: 'naco-cabinet',
        accessibilityDescription: {
          en: 'Interactive tactile cabinet displaying the 7 color-coded NACO kits: Grey, Green, White, Blue, Red, Yellow, and Black.',
          hi: '7 रंगीन NACO किटों को प्रदर्शित करता इंटरएक्टिव संदूक।',
          mr: '७ रंगीत किट्सचे परस्परसंवादी कॅबिनेट.',
          bn: '৭টি কালার-কোডেড কিটের ইন্টারঅ্যাক্টিভ কেবিনেট।',
          ta: '7 வண்ண கிட்களின் தொகுப்பு.',
          te: '7 రంగు కిట్ల సమగ్ర సమాచారం.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-13-universal-care-rules',
        pageNumber: 13,
        heading: {
          en: 'Universal Rules for STI/RTI Care',
          hi: 'यौन स्वास्थ्य देखभाल के मूलभूत नियम',
          mr: 'उपचारांचे मूलभूत नियम',
          bn: 'চিকিৎসার সার্বজনীন নিয়মাবলী',
          ta: 'சிகிச்சை விதிமுறைகள்',
          te: 'సంరక్షణ నియమావళి',
        },
        eyebrow: {
          en: 'Care & Prevention Pillars',
          hi: 'देखभाल के 5 आधार स्तंभ',
          mr: '५ आधारस्तंभ',
          bn: '৫টি মূল স্তম্ভ',
          ta: '5 முக்கிய தூண்கள்',
          te: '5 ముఖ్య స్తంభాలు',
        },
        bodyText: {
          en: [
            '1. Free & Confidential Counseling • 2. Treat Both Partners (Ping-Pong Effect) • 3. Complete Medication Course • 4. Free HIV & Syphilis Check • 5. Free Condoms',
          ],
          hi: [
            '1. पूर्ण गोपनीयता एवं सम्मान • 2. दोनों साथियों का एक साथ इलाज • 3. दवा का पूरा कोर्स • 4. मुफ्त एचआईवी व सिफलिस जांच • 5. मुफ्त कंडोम',
          ],
          mr: ['दोन्ही जोडीदारांवर एकत्र उपचार, संयम, मोफत तपासणी व संपूर्ण गोपनीयता.'],
          bn: ['উভয় সঙ্গীর চিকিৎসা, সুরক্ষা ও বিনামূল্যে রক্ত পরীক্ষা।'],
          ta: ['இருவருக்கும் சிகிச்சை, ரகசிய ஆலோசனை மற்றும் ரத்த பரிசோதனை.'],
          te: ['ఇద్దరికీ చికిత్స, రహస్య కౌన్సెలింగ్ మరియు ఉచిత పరీక్షలు.'],
        },
        sceneType: 'care-referral',
        accessibilityDescription: {
          en: 'The 5 universal considerations for managing STIs including partner treatment, ICTC referral, and condoms.',
          hi: 'यौन संक्रमण प्रबंधन के 5 सार्वभौमिक नियम।',
          mr: '५ मूलभूत नियम.',
          bn: '৫টি প্রধান নিয়মাবলী।',
          ta: '5 முக்கிய விதிமுறைகள்.',
          te: '5 ముఖ్యమైన నియమాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
    },

    // LEAF 7: Page 14 (Helpline & Referral) & Back Cover
    {
      id: 'leaf-7',
      index: 7,
      kind: 'back-cover',
      chapterId: 'referral-back-cover',
      front: {
        id: 'face-14-helpline-referral',
        pageNumber: 14,
        heading: {
          en: 'Where to Get Free & Confidential Help',
          hi: 'नि:शुल्क एवं गोपनीय सहायता कहाँ पाएं?',
          mr: 'मोफत व गोपनीय मदत कोठे मिळवावी?',
          bn: 'বিনামূল্যে ও গোপনীয় সেবা কোথায় পাবেন?',
          ta: 'இலவச ரகசிய உதவி எங்கே கிடைக்கும்?',
          te: 'ఉచిత మరియు రహస్య సహాయం ఎక్కడ లభిస్తుంది?',
        },
        eyebrow: {
          en: 'National Helpline 1097',
          hi: 'राष्ट्रीय हेल्पलाइन 1097',
          mr: 'राष्ट्रीय हेल्पलाईन १०९७',
          bn: 'জাতীয় হেল্পলাইন ১০৯৭',
          ta: 'தேசிய உதவி எண் 1097',
          te: 'జాతీయ హెల్ప్‌లైన్ 1097',
        },
        bodyText: {
          en: [
            'National AIDS Helpline: Dial 1097 from any phone in India (Toll-Free, 24x7, Multilingual).',
            'Suraksha Clinics: Located at every Government District Hospital and Medical College in your city.',
            'Always remember: Safe health is your right. Healthcare workers are here to support you with kindness and privacy.',
          ],
          hi: [
            'राष्ट्रीय एड्स हेल्पलाइन: भारत के किसी भी फोन से 1097 डायल करें (टोल-फ्री, 24 घंटे, बहुभाषी)।',
            'सुरक्षा क्लिनिक: आपके शहर के सभी सरकारी जिला अस्पतालों और मेडिकल कॉलेजों में उपलब्ध।',
            'याद रखें: सुरक्षित स्वास्थ्य आपका अधिकार है और स्वास्थ्य कार्यकर्ता आपकी मदद के लिए तत्पर हैं।',
          ],
          mr: ['१०९७ डायल करा किंवा जवळच्या शासकीय सुरक्षा क्लिनिकला भेट द्या.'],
          bn: ['যেকোনো ফোন থেকে ১০৯৭ নম্বরে কল করুন বা সরকারি ক্লিনিকে যান।'],
          ta: ['1097 எண்ணை அழைக்கவும் அல்லது அரசு மருத்துவமனையை அணுகவும்.'],
          te: ['1097 నంబర్‌కు కాల్ చేయండి లేదా ప్రభుత్వ ఆసుపత్రిని సంప్రదించండి.'],
        },
        sceneType: 'suraksha-intro',
        accessibilityDescription: {
          en: 'Direct referral options including Toll-Free National Helpline 1097 and District Suraksha Clinics.',
          hi: 'राष्ट्रीय हेल्पलाइन 1097 और सुरक्षा क्लिनिक रेफरल कार्ड।',
          mr: 'हेल्पलाईन १०९७ माहिती.',
          bn: 'হেল্পলাইন ১০৯৭ এর বিবরণ।',
          ta: 'உதவி எண் 1097 தகவல்.',
          te: 'హెల్ప్‌లైన్ 1097 వివరాలు.',
        },
        clinicalReviewStatus: 'approved',
      },
      back: {
        id: 'face-15-back-cover',
        pageNumber: null,
        heading: {
          en: 'Swasthya Katha',
          hi: 'स्वास्थ्य कथा',
          mr: 'स्वास्थ्य कथा',
          bn: 'স্বাস্থ্য কথা',
          ta: 'சுவாஸ்த்ய கதா',
          te: 'స్వాస్థ్య కథ',
        },
        eyebrow: {
          en: 'National Health Education Initiative',
          hi: 'राष्ट्रीय स्वास्थ्य शिक्षा पहल',
          mr: 'राष्ट्रीय आरोग्य उपक्रम',
          bn: 'জাতীয় স্বাস্থ্য উদ্যোগ',
          ta: 'தேசிய சுகாதார முன்முயற்சி',
          te: 'జాతీయ ఆరోగ్య చొరవ',
        },
        subheading: {
          en: 'Empowering communities through visual, understandable, and accessible health learning.',
          hi: 'सचित्र, सुगम और गरिमापूर्ण स्वास्थ्य शिक्षा द्वारा समाज को सशक्त बनाना।',
          mr: 'सचित्र व सोप्या आरोग्य शिक्षणातून समाजाचे सक्षमीकरण.',
          bn: 'সচিত্র ও সহজ স্বাস্থ্যশিক্ষার মাধ্যমে সমাজকে সচেতন করা।',
          ta: 'காட்சி வழியான எளிய சுகாதார கல்வி.',
          te: 'సచిత్ర మరియు సులభమైన ఆరోగ్య విద్య ద్వారా అవగాహన.',
        },
        bodyText: {
          en: [
            'Published in collaboration with National AIDS Control Organisation (NACO), Ministry of Health & Family Welfare, Govt. of India.',
            'Drag right to turn back, or tap the cover to reopen.',
          ],
          hi: [
            'राष्ट्रीय एड्स नियंत्रण संगठन (NACO), स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार के सहयोग से प्रकाशित।',
            'वापस जाने के लिए दाईं ओर खींचें, या किताब फिर से खोलने के लिए टैप करें।',
          ],
          mr: ['पुन्हा वाचण्यासाठी कव्हरवर टॅप करा.'],
          bn: ['পুনরায় পড়তে প্রচ্ছদে ট্যাপ করুন।'],
          ta: ['மீண்டும் படிக்க அட்டையை தொடவும்.'],
          te: ['మళ్ళీ చదవడానికి కవర్‌పై నొక్కండి.'],
        },
        sceneType: 'back-cover',
        accessibilityDescription: {
          en: 'Back cover of Swasthya Katha showing publishing accreditation and close-book state.',
          hi: 'स्वास्थ्य कथा की बैक कवर।',
          mr: 'मागचे मुखपृष्ठ.',
          bn: 'বইয়ের পেছনের প্রচ্ছদ।',
          ta: 'புத்தகத்தின் பின் அட்டை.',
          te: 'పుస్తక వెనుక ముఖచిత్రం.',
        },
        clinicalReviewStatus: 'approved',
      },
    },
  ],
};
