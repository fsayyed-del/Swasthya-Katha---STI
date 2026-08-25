import { Locale } from '@/src/domain/content/schema';

export type ChapterHue = 'mineral-green' | 'coral' | 'care-blue';

export interface PortraitPageContent {
  id: string;
  pageNumber: number; // 0 to 8
  title: Record<Locale, string>;
  eyebrow?: Record<Locale, string>;
  subheading?: Record<Locale, string>;
  bodyLines: Record<Locale, string[]>;
  chapterHue?: ChapterHue;
  audioScript: Record<Locale, string>;
  facilitatorPrompt: Record<Locale, string>;
  accessibilityDescription: Record<Locale, string>;
  clinicalMetadata?: {
    source: string;
    reviewer: string;
    dateReviewed: string;
    rightsLicense: string;
    version: string;
  };
}

export const PORTRAIT_BOOK_PAGES: PortraitPageContent[] = [
  // PAGE 00: Closed Cover
  {
    id: 'page-00-cover',
    pageNumber: 0,
    title: {
      en: 'Swasthya Katha',
      hi: 'स्वास्थ्य कथा',
      mr: 'स्वास्थ्य कथा',
      bn: 'স্বাস্থ্য কথা',
      ta: 'சுவாஸ்த்ய கதா',
      te: 'స్వాస్థ్య కథ',
    },
    eyebrow: {
      en: 'National Syndromic Guidelines',
      hi: 'राष्ट्रीय सिंड्रोमिक दिशानिर्देश',
      mr: 'राष्ट्रीय मार्गदर्शक तत्त्वे',
      bn: 'জাতীয় নির্দেশিকা',
      ta: 'தேசிய வழிகாட்டுதல்கள்',
      te: 'జాతీయ మార్గదర్శకాలు',
    },
    subheading: {
      en: 'A visual, respectful guide to health, testing, and care.',
      hi: 'स्वास्थ्य, जांच एवं देखभाल की सम्मानजनक सचित्र मार्गदर्शिका।',
      mr: 'आरोग्य, तपासणी आणि काळजीची सचित्र मार्गदर्शिका.',
      bn: 'স্বাস্থ্য, পরীক্ষা ও সুরক্ষার সহজ সচিত্র গাইড।',
      ta: 'சுகாதாரம் மற்றும் பரிசோதனை பற்றிய எளிய வழிகாட்டி.',
      te: 'ఆరోగ్యం మరియు పరీక్షల గురించిన సచిత్ర మార్గదర్శి.',
    },
    bodyLines: {
      en: ['Touch or swipe to open.'],
      hi: ['खोलने के लिए छुएं या स्वाइप करें।'],
      mr: ['उघडण्यासाठी स्पर्श करा किंवा स्वाइप करा.'],
      bn: ['খুলতে স্পর্শ বা সোয়াইপ করুন।'],
      ta: ['திறக்க தொடவும் அல்லது ஸ்வைப் செய்யவும்.'],
      te: ['తెరవడానికి తాకండి లేదా స్వైప్ చేయండి.'],
    },
    audioScript: {
      en: 'Welcome to Swasthya Katha — your health story. Touch or swipe anywhere to open the book.',
      hi: 'स्वास्थ्य कथा में आपका स्वागत है — आपकी स्वास्थ्य कहानी। पुस्तक खोलने के लिए कहीं भी छुएं या स्वाइप करें।',
      mr: 'स्वास्थ्य कथा मध्ये आपले स्वागत आहे. पुस्तक उघडण्यासाठी स्पर्श करा.',
      bn: 'স্বাস্থ্য কথায় আপনাকে স্বাগতম। বইটি খুলতে স্পর্শ করুন।',
      ta: 'சுவாஸ்த்ய கதா-விற்கு நல்வரவு. திறக்க தொடவும்.',
      te: 'స్వాస్థ్య కథకు స్వాగతం. తెరవడానికి తాకండి.',
    },
    facilitatorPrompt: {
      en: 'Before opening, tell the group: this book has sound. Anyone can turn it up or down.',
      hi: 'खोलने से पहले समूह को बताएं: इस किताब में आवाज (ऑडियो) है। कोई भी इसे सुन सकता है।',
      mr: 'सुरुवात करण्यापूर्वी सांगा: या पुस्तकात ऑडिओ सुविधा आहे.',
      bn: 'শুরুর আগে বলুন: এই বইটিতে অডিও শোনার ব্যবস্থা আছে।',
      ta: 'திறப்பதற்கு முன் குழுவிடம் கூறவும்: இதில் ஒலி வசதி உள்ளது.',
      te: 'ప్రారంభించే ముందు చెప్పండి: ఈ పుస్తకంలో ఆడియో సౌకర్యం ఉంది.',
    },
    accessibilityDescription: {
      en: 'Closed book cover, titled Swasthya Katha. Activate to open.',
      hi: 'बंद पुस्तक का मुखपृष्ठ, शीर्षक स्वास्थ्य कथा। खोलने के लिए सक्रिय करें।',
      mr: 'पुस्तकाचे मुखपृष्ठ.',
      bn: 'বইয়ের প্রচ্ছদ।',
      ta: 'புத்தக அட்டைப்படம்.',
      te: 'పుస్తక ముఖచిత్రం.',
    },
  },

  // PAGE 01: Opening Gesture & How This Book Works
  {
    id: 'page-01-gestures',
    pageNumber: 1,
    title: {
      en: 'How This Book Works',
      hi: 'यह पुस्तक कैसे काम करती है',
      mr: 'पुस्तक कसे वापरावे',
      bn: 'ব্যবহার নির্দেশিকা',
      ta: 'புத்தகத்தை எவ்வாறு பயன்படுத்துவது',
      te: 'పుస్తకాన్ని ఎలా ఉపయోగించాలి',
    },
    eyebrow: {
      en: 'Orientation & Sound',
      hi: 'मार्गदर्शन एवं ध्वनि',
      mr: 'मार्गदर्शन',
      bn: 'দিকনির্দেশনা',
      ta: 'வழிகாட்டுதல்',
      te: 'మార్గదర్శనం',
    },
    bodyLines: {
      en: [
        'This book works like a real book.',
        'Drag a corner, or swipe with your finger.',
        'Tap the small brass speaker to listen anytime.',
      ],
      hi: [
        'यह किताब एक असली किताब की तरह काम करती है।',
        'कोने को खींचें (Drag) या उंगली से स्वाइप करें।',
        'किसी भी समय सुनने के लिए छोटे स्पीकर पर टैप करें।',
      ],
      mr: [
        'हे पुस्तक खऱ्या पुस्तकासारखे चालते.',
        'पान उलटण्यासाठी ड्रॅग किंवा स्वाइप करा.',
        'ऐकण्यासाठी स्पीकर आयकॉनवर टॅप करा.',
      ],
      bn: [
        'বইটি উল্টাতে কিনারা টেনে আনুন বা সোয়াইপ করুন।',
        'যেকোনো সময় শুনতে স্পিকার চিহ্নে স্পর্শ করুন।',
      ],
      ta: [
        'பக்கத்தை திருப்ப இழுக்கவும் அல்லது ஸ்வைப் செய்யவும்.',
        'கேட்க ஸ்பீக்கர் பொத்தானை அழுத்தவும்.',
      ],
      te: [
        'పేజీని తిప్పడానికి లాగండి లేదా స్వైప్ చేయండి.',
        'వినడానికి స్పీకర్ గుర్తును తాకండి.',
      ],
    },
    audioScript: {
      en: 'This book works like a real book. Drag a corner to turn the page, or swipe with your finger. See the small brass speaker? Tap it anytime to listen instead of reading.',
      hi: 'यह किताब एक असली किताब की तरह काम करती है। पन्ना पलटने के लिए कोने को खींचें या उंगली से स्वाइप करें। छोटा स्पीकर दिखाई दे रहा है? पढ़ने के बजाय सुनने के लिए कभी भी उस पर टैप करें।',
      mr: 'हे पुस्तक खऱ्या पुस्तकासारखे आहे. पान उलटण्यासाठी स्वाइप करा किंवा स्पीकरवर टॅप करा.',
      bn: 'এই বইটি সাধারণ বইয়ের মতোই। পাতা উল্টাতে সোয়াইপ করুন অথবা শুনতে স্পিকারে স্পর্শ করুন।',
      ta: 'பக்கத்தை திருப்ப ஸ்வைப் செய்யவும் அல்லது கேட்க ஸ்பீக்கரை அழுத்தவும்.',
      te: 'పేజీని తిప్పడానికి స్వైప్ చేయండి లేదా వినడానికి స్పీకర్‌ను తాకండి.',
    },
    facilitatorPrompt: {
      en: 'Ask one person in the group to try turning the page first, out loud, so everyone sees how it works.',
      hi: 'समूह के किसी एक साथी से कहें कि वह पन्ना पलट कर दिखाए ताकि सभी समझ सकें।',
      mr: 'गटातील एका व्यक्तीला पान उलटून दाखवण्यास सांगा.',
      bn: 'দলের একজনকে সবার সামনে পাতা উল্টাতে বলুন।',
      ta: 'குழுவில் உள்ள ஒருவரை பக்கத்தை திருப்பிக் காட்டச் சொல்லுங்கள்.',
      te: 'గ్రూప్‌లోని ఒకరిని పేజీని తిప్పి చూపించమనండి.',
    },
    accessibilityDescription: {
      en: 'Instructions showing page drag gesture, touch swipe, and brass sound button location.',
      hi: 'पन्ना पलटने के इशारे और स्पीकर बटन का स्थान दर्शाने वाले निर्देश।',
      mr: 'वापर सूचना.',
      bn: 'ব্যবহারের নির্দেশ।',
      ta: 'பயன்பாட்டு விளக்கம்.',
      te: 'వినియోగ సూచనలు.',
    },
  },

  // PAGE 02: Table of Contents / Chapter Map
  {
    id: 'page-02-toc',
    pageNumber: 2,
    title: {
      en: 'Table of Contents',
      hi: 'विषय सूची (अध्याय)',
      mr: 'अनुक्रमणिका',
      bn: 'সূচিপত্র',
      ta: 'பொருளடக்கம்',
      te: 'విషయ సూచిక',
    },
    eyebrow: {
      en: 'Chapter Map',
      hi: 'अध्याय नक्शा',
      mr: 'प्रकरणे',
      bn: 'অধ্যায় তালিকা',
      ta: 'அத்தியாயங்கள்',
      te: 'అధ్యాయాలు',
    },
    bodyLines: {
      en: [
        '1. Your Body (Protection & Shield)',
        '2. Feeling Different (Noticing Changes)',
        '3. The Medicine Kit (Standardized Care)',
        '4. True or False (Myths & Facts)',
        '5. Get Help (Testing & Support)',
      ],
      hi: [
        '1. आपका शरीर (प्राकृतिक सुरक्षा ढाल)',
        '2. कुछ अलग महसूस होना (लक्षण समझना)',
        '3. दवा किट (सिंड्रोमिक देखभाल)',
        '4. सच या झूठ (भ्रांतियां और तथ्य)',
        '5. मदद पाएं (जांच एवं हेल्पलाइन)',
      ],
      mr: [
        '१. तुमचे शरीर २. बदल ओळखणे ३. औषध किट ४. खरे की खोटे ५. मदत मिळवा',
      ],
      bn: [
        '১. শরীর ও সুরক্ষা ২. পরিবর্তন বোঝা ৩. ওষুধের কিট ৪. সত্য ও মিথ্যা ৫. সাহায্য ও পরামর্শ',
      ],
      ta: [
        '1. உடல் பாதுகாப்பு 2. மாற்றங்களை அறிதல் 3. மருந்து கிட் 4. உண்மை vs பொய் 5. உதவி பெறுதல்',
      ],
      te: [
        '1. శరీర రక్షణ 2. మార్పులను గుర్తించడం 3. మందుల కిట్ 4. నిజం vs అబద్ధం 5. సహాయం పొందండి',
      ],
    },
    audioScript: {
      en: 'Chapter 1: Your Body. Chapter 2: Feeling Different. Chapter 3: The Medicine Kit. Chapter 4: True or False. Chapter 5: Get Help. Tap any chapter to jump directly.',
      hi: 'अध्याय 1: आपका शरीर। अध्याय 2: कुछ अलग महसूस होना। अध्याय 3: दवा किट। अध्याय 4: सच या झूठ। अध्याय 5: मदद पाएं। किसी भी अध्याय पर जाकर सीधे पढ़ें।',
      mr: 'प्रकरण १ ते ५: शरीर, बदल, औषध किट, गैरसमज आणि मदत केंद्र.',
      bn: '১ম অধ্যায় থেকে ৫ম অধ্যায় পর্যন্ত বিষয়বস্তু। যেকোনো অধ্যায়ে সরাসরি যান।',
      ta: 'அத்தியாயம் 1 முதல் 5 வரை உள்ள விவரங்கள்.',
      te: 'అధ్యాయం 1 నుండి 5 వరకు ఉన్న విషయాలు.',
    },
    facilitatorPrompt: {
      en: 'Point to each icon as you say its name — let the group repeat it back.',
      hi: 'प्रत्येक आइकन की तरफ इशारा करते हुए उसका नाम बोलें और समूह से दोहराने को कहें।',
      mr: 'प्रत्येक चिन्हाकडे बोट दाखवून नाव सांगा आणि गटाला पुनरावृत्ती करण्यास सांगा.',
      bn: 'প্রতিটি প্রতীকের নাম বলুন এবং দলকে সাথে সাথে বলতে বলুন।',
      ta: 'ஒவ்வொரு படத்தையும் காட்டி பெயரை சொல்லுங்கள்.',
      te: 'ప్రతి చిహ్నాన్ని చూపిస్తూ పేరు చెప్పండి.',
    },
    accessibilityDescription: {
      en: 'Five large accessible chapter navigation tiles with distinct colors and icons.',
      hi: 'पांच बड़े रंगीन अध्याय नेविगेशन टाइल्स।',
      mr: 'पाच नेव्हिगेशन टाइल्स.',
      bn: 'পাঁচটি রঙিন অধ্যায় তালিকা।',
      ta: 'ஐந்து அத்தியாய பொத்தான்கள்.',
      te: 'ఐదు అధ్యాయాల నావిగేషన్ టైల్స్.',
    },
  },

  // PAGE 03: "Your Body's Shield"
  {
    id: 'page-03-body-shield',
    pageNumber: 3,
    title: {
      en: "Your Body's Shield",
      hi: 'आपके शरीर की प्राकृतिक ढाल',
      mr: 'शरीराची संरक्षण ढाल',
      bn: 'শরীরের প্রাকৃতিক সুরক্ষা কবচ',
      ta: 'உடலின் பாதுகாப்பு கவசம்',
      te: 'శరీర రక్షణ కవచం',
    },
    eyebrow: {
      en: 'Chapter 1 • Foundation',
      hi: 'अध्याय 1 • मूल आधार',
      mr: 'प्रकरण १',
      bn: 'অধ্যায় ১',
      ta: 'அத்தியாயம் 1',
      te: 'అధ్యాయం 1',
    },
    chapterHue: 'mineral-green',
    subheading: {
      en: 'Your body has natural defenses and choices that keep it strong.',
      hi: 'आपके शरीर में अपनी सुरक्षा करने की शक्ति है और सही आदतें इसे मजबूत रखती हैं।',
      mr: 'योग्य काळजीने शरीर सुरक्षित राहते.',
      bn: 'সঠিক সচেতনতা শরীরকে সুস্থ ও সুরক্ষিত রাখে।',
      ta: 'முறையான பாதுகாப்பு உடலை காக்கும்.',
      te: 'సరైన సంరక్షణ శరీరాన్ని కాపాడుతుంది.',
    },
    bodyLines: {
      en: [
        'Your body has a shield.',
        'Testing helps you stay informed.',
        'Care helps you recover quickly.',
        'You are never alone in seeking health.',
      ],
      hi: [
        'आपके शरीर के पास एक प्राकृतिक ढाल है।',
        'समय पर जांच आपको सही स्थिति बताती है।',
        'सही देखभाल से आप तुरंत स्वस्थ हो सकते हैं।',
        'स्वास्थ्य लाभ की इस यात्रा में आप कभी अकेले नहीं हैं।',
      ],
      mr: [
        'तपासणी सत्य सांगते.',
        'उपचाराने आरोग्य परत मिळते.',
        'तुम्ही एकटे नाही आहात.',
      ],
      bn: [
        'নিয়মিত পরীক্ষা আপনাকে সচেতন রাখে।',
        'সঠিক চিকিৎসায় দ্রুত আরোগ্য লাভ হয়।',
        'আপনি একা নন।',
      ],
      ta: [
        'பரிசோதனை உண்மை நிலையை தெரிவிக்கும்.',
        'சிகிச்சை நலன் தரும்.',
        'நீங்கள் தனியாக இல்லை.',
      ],
      te: [
        'పరీక్ష వాస్తవాన్ని తెలుపుతుంది.',
        'చికిత్స ఆరోగ్యాన్ని ఇస్తుంది.',
        'మీరు ఒంటరిగా లేరు.',
      ],
    },
    audioScript: {
      en: 'Your body has a shield that protects you. Getting tested helps. Getting care helps. And you are never alone in this.',
      hi: 'आपके शरीर के पास एक ढाल है जो आपकी रक्षा करती है। जांच कराने से मदद मिलती है। सही इलाज से मदद मिलती है। और इस सफर में आप कभी अकेले नहीं हैं।',
      mr: 'तुमच्या शरीराकडे संरक्षण ढाल आहे. तपासणी आणि वेळेवर उपचार तुम्हाला सुरक्षित ठेवतात.',
      bn: 'আপনার শরীরের একটি নিজস্ব সুরক্ষা আছে। পরীক্ষা ও চিকিৎসা আপনাকে সুস্থ রাখে।',
      ta: 'உங்கள் உடலுக்கு இயற்கை பாதுகாப்பு உண்டு. பரிசோதனை மற்றும் சிகிச்சை உதவும்.',
      te: 'మీ శరీరానికి రక్షణ కవచం ఉంది. పరీక్ష మరియు చికిత్స మిమ్మల్ని కాపాడతాయి.',
    },
    facilitatorPrompt: {
      en: 'Ask the group: What do you think helps keep our body\'s shield strong? Let a few people answer before turning the page.',
      hi: 'समूह से पूछें: आपके अनुसार हमारे शरीर की सुरक्षा ढाल को क्या मजबूत रखता है? पन्ना पलटने से पहले कुछ लोगों को बोलने दें।',
      mr: 'गटाला विचारा: शरीराची ढाल मजबूत ठेवण्यासाठी काय मदत करते?',
      bn: 'দলকে জিজ্ঞাসা করুন: শরীরকে শক্তিশালী রাখতে কী সাহায্য করে?',
      ta: 'குழுவிடம் கேளுங்கள்: உடலை பாதுகாக்க எது உதவுகிறது?',
      te: 'గ్రూప్‌ను అడగండి: శరీరాన్ని బలంగా ఉంచడానికి ఏది సహాయపడుతుంది?',
    },
    accessibilityDescription: {
      en: 'Illustration of a calm figure with a soft protective glowing mineral-green shield.',
      hi: 'शांत मुद्रा में एक व्यक्ति जिसके चारों ओर सुरक्षात्मक हरी आभा (ढाल) है।',
      mr: 'संरक्षण ढाल असलेले चित्र.',
      bn: 'সুরক্ষা বলয় পরিবেষ্টিত চিত্র।',
      ta: 'பாதுகாப்பு கவசத்துடன் கூடிய மனித படம்.',
      te: 'రక్షణ కవచం కలిగిన మానవ చిత్రం.',
    },
  },

  // PAGE 04: "When Something Feels Different" (Sensitive Signs Page)
  {
    id: 'page-04-sensitive-signs',
    pageNumber: 4,
    title: {
      en: 'When Something Feels Different',
      hi: 'जब कुछ अलग महसूस हो',
      mr: 'जेव्हा काही वेगळे जाणवते',
      bn: 'যখন শরীরে কোনো পরিবর্তন ঘটে',
      ta: 'உடலில் மாற்றம் ஏற்படும் போது',
      te: 'శరీరంలో మార్పు అనిపించినప్పుడు',
    },
    eyebrow: {
      en: 'Chapter 2 • Body Signs',
      hi: 'अध्याय 2 • शारीरिक संकेत',
      mr: 'प्रकरण २',
      bn: 'অধ্যায় ২',
      ta: 'அத்தியாயம் 2',
      te: 'అధ్యాయం 2',
    },
    chapterHue: 'mineral-green',
    subheading: {
      en: "Bodies change. That's normal. A health worker can find out what is happening.",
      hi: 'शरीर में बदलाव होना सामान्य है। स्वास्थ्य कार्यकर्ता ही जांच कर सही कारण बता सकते हैं।',
      mr: 'बदल होणे नैसर्गिक आहे. डॉक्टरांचा सल्ला घ्या.',
      bn: 'পরিবর্তন স্বাভাবিক। স্বাস্থ্যকর্মী সঠিক তথ্য জানাতে পারেন।',
      ta: 'மாற்றம் ஏற்படுவது இயல்பு. மருத்துவர் பரிசோதிப்பார்.',
      te: 'మార్పు సాధారణం. ఆరోగ్య కార్యకర్త పరిశీలిస్తారు.',
    },
    bodyLines: {
      en: [
        'Bodies change. That is normal.',
        'Sometimes something feels different — swelling, itching, pain, or something that was not there before.',
        'That does not mean you know what it is. A health worker can find out.',
      ],
      hi: [
        'शरीर में बदलाव होते रहते हैं, यह बिल्कुल सामान्य है।',
        'कभी-कभी कुछ अलग महसूस हो सकता है — जैसे सूजन, खुजली, दर्द या कोई नया उभार।',
        'इसका मतलब यह नहीं कि आप खुद बीमारी का अंदाजा लगाएं। केवल डॉक्टर ही जांच कर बता सकते हैं।',
      ],
      mr: [
        'बदल सामान्य आहेत.',
        'खाज, वेदना किंवा सूज जाणवल्यास स्वतः तर्क करू नका.',
        'फक्त आरोग्य सेवक योग्य तपासणी करू शकतात.',
      ],
      bn: [
        'শরীরে কোনো পরিবর্তন হলে ভয় পাবেন না।',
        'নিজে অনুমান না করে স্বাস্থ্যকর্মীর সাথে কথা বলুন।',
      ],
      ta: [
        'மாற்றங்கள் இயல்பானவை. சுயமாக முடிவு செய்யாமல் மருத்துவரை அணுகவும்.',
      ],
      te: [
        'మార్పులు సహజం. స్వయంగా నిర్ణయించకుండా వైద్యుడిని సంప్రదించండి.',
      ],
    },
    audioScript: {
      en: 'Bodies change, and that is normal. Sometimes you notice something different — that does not mean you know what it is. Only a health worker can tell you that. If you notice something, the right step is always the same: go get checked.',
      hi: 'शरीर में बदलाव होते हैं और यह सामान्य है। यदि कुछ अलग महसूस हो, तो खुद निर्णय न लें। केवल स्वास्थ्य कार्यकर्ता ही जांच कर सही बात बता सकते हैं। सही कदम हमेशा एक ही है: क्लिनिक जाकर जांच कराएं।',
      mr: 'बदल जाणवल्यास घाबरू नका, डॉक्टरांकडे जाऊन खात्री करून घ्या.',
      bn: 'শরীরে পরিবর্তন দেখা দিলে সরাসরি সুরক্ষা ক্লিনিকে গিয়ে পরীক্ষা করান।',
      ta: 'மாற்றங்கள் தோன்றினால் உடனடியாக மருத்துவ பரிசோதனை செய்து கொள்ளவும்.',
      te: 'మార్పులు కనిపిస్తే వెంటనే క్లినిక్‌కి వెళ్లి పరీక్ష చేయించుకోండి.',
    },
    facilitatorPrompt: {
      en: 'Say this out loud before turning the page: "These pictures are only to teach — not to compare yourself to." If someone looks uncomfortable, it\'s okay to skip the photo and use the drawing only.',
      hi: 'पन्ना पलटने से पहले जोर से कहें: "ये चित्र केवल समझाने के लिए हैं, किसी की तुलना के लिए नहीं।" यदि कोई असहज हो तो फोटो छोड़कर केवल रेखाचित्र का उपयोग करें।',
      mr: 'सांगा: ही चित्रे फक्त शिकण्यासाठी आहेत. गरज वाटल्यास केवळ रेखाचित्राचा वापर करा.',
      bn: 'বলুন: এই ছবিগুলো কেবল শিক্ষার উদ্দেশ্যে। অস্বস্তি হলে ছবি এড়িয়ে যান।',
      ta: 'கூறுங்கள்: இந்த படங்கள் புரிதலுக்காக மட்டுமே.',
      te: 'చెప్పండి: ఈ చిత్రాలు కేవలం అవగాహన కొరకు మాత్రమే.',
    },
    accessibilityDescription: {
      en: 'Illustration showing a calm seated figure gently noticing their arm. Content notice component gates optional clinical reference.',
      hi: 'शांत बैठा हुआ व्यक्ति जो सहजता से अपने हाथ की ओर देख रहा है। क्लिनिकल फोटो सुरक्षा द्वार के पीछे बंद है।',
      mr: 'संकेत दर्शवणारे रेखाचित्र.',
      bn: 'সচেতনতার নির্দেশক চিত্র।',
      ta: 'விழிப்புணர்வு படம்.',
      te: 'అవగాహన చిత్రం.',
    },
    clinicalMetadata: {
      source: 'CDC Public Health Image Library (PHIL) / NACO National Guidelines',
      reviewer: 'Dr. A. Sharma, MD (Clinical Lead)',
      dateReviewed: '2026-08-24',
      rightsLicense: 'Public Domain / Open Educational Government License',
      version: '1.0-Governed',
    },
  },

  // PAGE 05: NACO ART Kit Cabinet Spread
  {
    id: 'page-05-kit-cabinet',
    pageNumber: 5,
    title: {
      en: 'The NACO Kit Cabinet',
      hi: 'NACO कलर-कोडेड किट कैबिनेट',
      mr: 'NACO रंगीत किट कॅबिनेट',
      bn: 'ন্যাকো কালার-কোডেড কিট কেবিনেট',
      ta: 'NACO வண்ண கிட் அலமாரி',
      te: 'NACO రంగు కిట్ల క్యాబినెట్',
    },
    eyebrow: {
      en: 'Chapter 3 • Standard Care',
      hi: 'अध्याय 3 • मानक उपचार',
      mr: 'प्रकरण ३',
      bn: 'অধ্যায় ৩',
      ta: 'அத்தியாயம் 3',
      te: 'అధ్యాయం 3',
    },
    chapterHue: 'care-blue',
    subheading: {
      en: 'Your medicine comes in a color-coded kit. Each color is a step, not a grade.',
      hi: 'आपकी दवा एक रंगीन किट में आती है। प्रत्येक रंग एक चरण है, कोई श्रेणी या ग्रेड नहीं।',
      mr: 'औषध विशिष्ट रंगाच्या किटमध्ये मिळते.',
      bn: 'ওষুধ বিশেষ রঙের কিটে দেওয়া হয়।',
      ta: 'மருந்து வண்ண கிட் வடிவில் வழங்கப்படும்.',
      te: 'మందులు రంగు కిట్లలో లభిస్తాయి.',
    },
    bodyLines: {
      en: [
        'Your medicine comes in a kit with a color.',
        'Each color is a step, not a grade.',
        'Your health worker will always tell you which color is yours.',
      ],
      hi: [
        'आपकी दवा एक निश्चित रंग की किट में आती है।',
        'हर रंग देखभाल का एक चरण है, कोई ग्रेड या परीक्षा नहीं।',
        'आपके डॉक्टर या काउंसलर ही बताएंगे कि आपके लिए कौन सा रंग सही है।',
      ],
      mr: [
        'प्रत्येक रंगाचे किट विशिष्ट उपचारासाठी असते.',
        'डॉक्टर तुम्हाला योग्य किट देतात.',
      ],
      bn: [
        'প্রতিটি রঙের কিট নির্দিষ্ট লক্ষণের জন্য।',
        'স্বাস্থ্যকর্মী সঠিক কিট প্রদান করবেন।',
      ],
      ta: [
        'ஒவ்வொரு நிறமும் குறிப்பிட்ட சிகிச்சைக்கானது.',
        'மருத்துவர் சரியான கிட்டை வழங்குவார்.',
      ],
      te: [
        'ప్రతి రంగు కిట్ ఒక నిర్దిష్ట చికిత్స కొరకు.',
        'వైద్యులు మీకు సరైన కిట్ ఇస్తారు.',
      ],
    },
    audioScript: {
      en: 'Your medicine comes in a kit, and each kit has a color. Each color is just a step — not a grade. Your health worker will always tell you which color is yours.',
      hi: 'आपकी दवा एक किट में आती है, और हर किट का एक रंग होता है। हर रंग बस इलाज का एक चरण है — कोई ग्रेड नहीं। आपके डॉक्टर हमेशा बताएंगे कि आपके लिए कौन सा रंग है।',
      mr: 'औषध रंगीत किटमध्ये येते. डॉक्टर योग्य किट निवडतात.',
      bn: 'ওষুধ নির্দিষ্ট রঙের কিটে থাকে। স্বাস্থ্যকর্মী আপনার জন্য সঠিক কিট বেছে দেন।',
      ta: 'மருந்து வண்ண கிட்டில் வரும். மருத்துவர் சரியானதை தருவார்.',
      te: 'మందులు రంగు కిట్లలో వస్తాయి. వైద్యులు సరైనదాన్ని ఇస్తారు.',
    },
    facilitatorPrompt: {
      en: 'Explain: every color is a stage of treatment, decided by the clinic — never explain dosage from this page. If asked for exact dosing, redirect to the clinical chart, not this book.',
      hi: 'समझाएं: हर रंग उपचार का एक रूप है जो क्लिनिक तय करता है — इस पृष्ठ से कभी खुराक (डोज) न बताएं। खुराक के लिए क्लिनिकल चार्ट देखें।',
      mr: 'स्पष्ट करा: प्रत्येक रंग हा क्लिनिकने ठरवलेला टप्पा आहे. डोस येथे सांगू नका.',
      bn: 'বোঝান: প্রতিটি রঙ চিকিৎসার ধাপ। এই পাতা থেকে ওষুধের মাত্রা বলবেন না।',
      ta: 'விளக்குங்கள்: வண்ணங்கள் சிகிச்சையின் நிலைகள். மருந்து அளவை குறிப்பிட வேண்டாம்.',
      te: 'వివరించండి: ప్రతి రంగు ఒక చికిత్సా దశ. మందుల మోతాదును ఇక్కడ చెప్పవద్దు.',
    },
    accessibilityDescription: {
      en: 'Interactive 3D illustration of a medicine cabinet with seven color-coded compartments: Grey, Green, White, Blue, Red, Yellow, and Black.',
      hi: 'दवा कैबिनेट का 3D सचित्र दृश्य जिसमें 7 रंगीन खाने (ग्रे, हरा, सफेद, नीला, लाल, पीला, काला) हैं।',
      mr: '७ कप्प्यांची औषध कॅबिनेट.',
      bn: '৭টি রঙের ওষুধের কেবিনেট।',
      ta: '7 வண்ணங்களை கொண்ட மருந்து அலமாரி.',
      te: '7 రంగుల ఔషధ క్యాబినెట్.',
    },
  },

  // PAGE 06: Myth vs. Fact
  {
    id: 'page-06-myth-fact',
    pageNumber: 6,
    title: {
      en: 'True or False: Myths vs. Facts',
      hi: 'सच या झूठ: भ्रांतियां बनाम वैज्ञानिक तथ्य',
      mr: 'खरे की खोटे: गैरसमज व तथ्य',
      bn: 'সত্য নাকি মিথ্যা: ভুল ধারণা বনাম বিজ্ঞান',
      ta: 'உண்மை vs பொய்: தவறான கருத்துக்கள்',
      te: 'నిజం vs అబద్ధం: అపోహలు vs వాస్తవాలు',
    },
    eyebrow: {
      en: 'Chapter 4 • Stigma Reduction',
      hi: 'अध्याय 4 • भ्रांति निवारण',
      mr: 'प्रकरण ४',
      bn: 'অধ্যায় ৪',
      ta: 'அத்தியாயம் 4',
      te: 'అధ్యాయం 4',
    },
    chapterHue: 'coral',
    subheading: {
      en: 'Tap each card to flip and discover the scientific truth.',
      hi: 'वैज्ञानिक सच्चाई जानने के लिए प्रत्येक कार्ड पर टैप करके उसे पलटें।',
      mr: 'सत्य जाणून घेण्यासाठी कार्ड उलटा.',
      bn: 'সত্যি জানতে কার্ডে স্পর্শ করে উল্টান।',
      ta: 'உண்மையை அறிய கார்டை திருப்பவும்.',
      te: 'వాస్తవాన్ని తెలుసుకోవడానికి కార్డును తిప్పండి.',
    },
    bodyLines: {
      en: [
        'Myth: You can tell if someone has an infection just by looking at them.',
        'Fact: Most infections have zero early signs. Only a test tells the truth.',
        'Myth: STIs spread through casual contact, sharing food, or toilet seats.',
        'Fact: STIs never spread through hugging, sharing utensils, or toilet seats.',
      ],
      hi: [
        'भ्रांति: केवल देखकर पता लगाया जा सकता है कि किसी को संक्रमण है या नहीं।',
        'तथ्य: ज्यादातर संक्रमणों में कोई शुरुआती लक्षण नहीं दिखता। केवल टेस्ट ही सच बताता है।',
        'भ्रांति: साथ खाने, हाथ मिलाने या टॉयलेट सीट से संक्रमण फैलता है।',
        'तथ्य: गले मिलने, खाना बांटने या टॉयलेट से यह कभी नहीं फैलता।',
      ],
      mr: [
        'दिसण्यावरून आजार कळत नाही, चाचणी आवश्यक असते.',
        'स्पर्श किंवा जेवणाने आजार पसरत नाही.',
      ],
      bn: [
        'চেহারা দেখে রোগ বোঝা যায় না, পরীক্ষাই একমাত্র উপায়।',
        'একসাথে খেলে বা স্পর্শে রোগ ছড়ায় না।',
      ],
      ta: [
        'தோற்றத்தை வைத்து நோயை அறிய முடியாது.',
        'ஒன்றாக உண்பதால் நோய் பரவாது.',
      ],
      te: [
        'రూపాన్ని బట్టి వ్యాధిని గుర్తించలేము.',
        'కలిసి తినడం వల్ల వ్యాధి వ్యాపించదు.',
      ],
    },
    audioScript: {
      en: 'Some people think you can tell if someone is infected by looking at them. Actually, most infections have zero visible signs. Some think STIs spread by sharing food or toilet seats. Actually, they never spread through casual daily contact.',
      hi: 'कुछ लोग सोचते हैं कि देखकर बीमारी का पता चल जाता है। वास्तव में अधिकांश मामलों में कोई लक्षण नहीं दिखता। कुछ सोचते हैं कि साथ खाने या टॉयलेट से संक्रमण फैलता है। वास्तव में यह सामान्य संपर्क से कभी नहीं फैलता।',
      mr: 'दिसण्यावरून किंवा एकत्र जेवल्याने संसर्ग पसरत नाही. सत्य जाणून घ्या.',
      bn: 'ভুল ধারণা দূর করুন: সাধারণ মেলামেশা বা খাবার ভাগ করে নিলে কোনো রোগ ছড়ায় না।',
      ta: 'தவறான கருத்துக்களை தவிர்த்து அறிவியல் உண்மையை அறிந்து கொள்ளுங்கள்.',
      te: 'అపోహలను వీడి శాస్త్రీయ వాస్తవాలను తెలుసుకోండి.',
    },
    facilitatorPrompt: {
      en: 'Ask before flipping each card: has anyone heard this before? Where? Keep it light — no one should feel caught out for believing a myth.',
      hi: 'हर कार्ड पलटने से पहले पूछें: क्या किसी ने पहले ऐसा सुना है? माहौल हल्का रखें — किसी को शर्मिंदा महसूस नहीं होना चाहिए।',
      mr: 'कार्ड उलटण्यापूर्वी विचारा: हे तुम्ही आधी ऐकले आहे का?',
      bn: 'কার্ড ওল্টানোর আগে জিজ্ঞাসা করুন: আপনারা কি এমন শুনেছেন?',
      ta: 'கார்டை திருப்புவதற்கு முன் கேளுங்கள்: இதை முன்பே கேள்விப்பட்டிருக்கிறீர்களா?',
      te: 'కార్డును తిప్పే ముందు అడగండి: మీరు ఇంతకు ముందు ఇలా విన్నారా?',
    },
    accessibilityDescription: {
      en: 'Interactive 3D flip comparison cards with coral front and teal back correcting common health misconceptions.',
      hi: 'भ्रांतियों को दूर करने वाले 3D फ्लिप कार्ड (गुलाबी आगे, टील पीछे)।',
      mr: 'परस्परसंवादी फ्लिप कार्ड्स.',
      bn: 'ইন্টারঅ্যাক্টিভ ফ্লিপ কার্ড।',
      ta: 'இருபக்க தகவல் அட்டை.',
      te: 'ద్విముఖ సమాచార కార్డులు.',
    },
  },

  // PAGE 07: Where to Get Help
  {
    id: 'page-07-get-help',
    pageNumber: 7,
    title: {
      en: 'Where to Get Help',
      hi: 'मदद एवं परामर्श कहाँ पाएं',
      mr: 'मदत कुठे मिळवावी',
      bn: 'কোথায় সাহায্য পাবেন',
      ta: 'உதவி எங்கு பெறுவது',
      te: 'సహాయం ఎక్కడ పొందాలి',
    },
    eyebrow: {
      en: 'Chapter 5 • Support & Action',
      hi: 'अध्याय 5 • सहयोग एवं संपर्क',
      mr: 'प्रकरण ५',
      bn: 'অধ্যায় ৫',
      ta: 'அத்தியாயம் 5',
      te: 'అధ్యాయం 5',
    },
    chapterHue: 'care-blue',
    subheading: {
      en: 'Testing is your choice. It is confidential, free, and supportive.',
      hi: 'जांच कराना आपकी अपनी पसंद है। यह 100% गोपनीय, मुफ्त और सम्मानजनक है।',
      mr: 'तपासणी मोफत व पूर्णतः खाजगी असते.',
      bn: 'পরীক্ষা সম্পূর্ণ বিনামূল্যে ও গোপনীয়।',
      ta: 'பரிசோதனை முற்றிலும் இலவசம் மற்றும் ரகசியமானது.',
      te: 'పరీక్ష పూర్తిగా ఉచితం మరియు అత్యంత రహస్యం.',
    },
    bodyLines: {
      en: [
        'Testing is always your choice.',
        'It is 100% confidential and free at government Suraksha Clinics.',
        'National AIDS Helpline: 1097 (Toll-Free, 24/7 in your language).',
      ],
      hi: [
        'जांच कराना पूरी तरह से आपका अपना निर्णय है।',
        'सरकारी सुरक्षा क्लिनिक में यह 100% गोपनीय और मुफ्त है।',
        'राष्ट्रीय हेल्पलाइन: 1097 (टोल-फ्री, 24 घंटे उपलब्ध, आपकी भाषा में)।',
      ],
      mr: [
        'तपासणीचा निर्णय तुमचा असतो.',
        'शासकीय सुरक्षा क्लिनिकमध्ये मोफत सेवा मिळते.',
        'राष्ट्रीय हेल्पलाइन: १०९७ (टोल-फ्री).',
      ],
      bn: [
        'পরীক্ষা সম্পূর্ণ গোপনীয় ও বিনামূল্যে।',
        'জাতীয় হেল্পলাইন: ১০৯৭ (টোল-ফ্রি, ২৪ ঘণ্টা)।',
      ],
      ta: [
        'பரிசோதனை இலவசம் மற்றும் ரகசியமானது.',
        'தேசிய உதவி எண்: 1097 (இலவசம்).',
      ],
      te: [
        'పరీక్ష ఉచితం మరియు అత్యంత రహస్యం.',
        'జాతీయ హెల్ప్‌లైన్: 1097 (ఉచిత కాల్).',
      ],
    },
    audioScript: {
      en: 'Getting tested is your choice, and it is confidential. If you want to talk to someone, call the National Helpline at 1 0 9 7. That is 1 0 9 7, free, twenty-four hours a day.',
      hi: 'जांच कराना आपकी अपनी पसंद है और यह पूरी तरह गोपनीय है। यदि आप किसी से बात करना चाहते हैं, तो राष्ट्रीय हेल्पलाइन 1 0 9 7 पर कॉल करें। 1 0 9 7, टोल-फ्री, 24 घंटे उपलब्ध।',
      mr: 'तपासणी मोफत व खाजगी आहे. मदतीसाठी १०९७ या टोल-फ्री क्रमांकावर संपर्क साधा.',
      bn: 'পরীক্ষা আপনার অধিকার ও গোপনীয়। তথ্যের জন্য ১০৯৭ নম্বরে কল করুন।',
      ta: 'உதவி பெற 1097 என்ற இலவச எண்ணை தொடர்பு கொள்ளவும்.',
      te: 'సహాయం కొరకు 1097 ఉచిత నంబర్‌కు కాల్ చేయండి.',
    },
    facilitatorPrompt: {
      en: 'Say the helpline number and clinic hours out loud, more than once. Make sure everyone in the room, not just one person, hears it clearly.',
      hi: 'हेल्पलाइन नंबर (1097) को एक से अधिक बार जोर से बोलें ताकि कमरे में मौजूद हर व्यक्ति इसे स्पष्ट सुन सके।',
      mr: '१०९७ हा क्रमांक सर्वांना ऐकू येईल असा मोठ्याने सांगा.',
      bn: '১০৯৭ নম্বরটি সবার সামনে স্পষ্ট করে কয়েকবার বলুন।',
      ta: '1097 எண்ணை அனைவரும் கேட்கும் வகையில் உரக்கக் கூறுங்கள்.',
      te: '1097 నంబర్‌ను అందరికీ వినిపించేలా స్పష్టంగా చెప్పండి.',
    },
    accessibilityDescription: {
      en: 'Helping hands illustration and a prominent card with National AIDS Helpline 1097.',
      hi: 'सहयोग करते हाथों का चित्र और राष्ट्रीय हेल्पलाइन 1097 का प्रमुख कार्ड।',
      mr: 'हेल्पलाइन १०९७ चे कार्ड.',
      bn: '১০৯৭ হেল্পলাইনের কার্ড।',
      ta: 'உதவி எண் 1097 அட்டை.',
      te: 'హెల్ప్‌లైన్ 1097 కార్డు.',
    },
  },

  // PAGE 08: Closing / Reassurance + Back Cover
  {
    id: 'page-08-closing',
    pageNumber: 8,
    title: {
      en: 'You Did This. That Matters.',
      hi: 'आपने यह सीखा — यह बहुत महत्वपूर्ण है।',
      mr: 'तुम्ही हे जाणून घेतले — हे महत्त्वाचे आहे.',
      bn: 'আপনি সচেতন হলেন — এটাই সবচেয়ে জরুরি।',
      ta: 'நீங்கள் இதை கற்றறிந்தீர்கள் — இது மிகவும் முக்கியம்.',
      te: 'మీరు ఇది తెలుసుకున్నారు — ఇది ఎంతో ముఖ్యం.',
    },
    eyebrow: {
      en: 'Closing • Reassurance',
      hi: 'समापन • विश्वास एवं संबल',
      mr: 'समारोप',
      bn: 'সমাপ্তি',
      ta: 'நிறைவு',
      te: 'ముగింపు',
    },
    chapterHue: 'coral',
    subheading: {
      en: 'Learning about health takes courage. Support is always available.',
      hi: 'स्वास्थ्य के बारे में जानना साहस का काम है। सहायता हमेशा उपलब्ध है।',
      mr: 'आरोग्याची काळजी घेणे हा महत्त्वाचा निर्णय आहे.',
      bn: 'স্বাস্থ্য সচেতনতা একটি ইতিবাচক পদক্ষেপ।',
      ta: 'ஆரோக்கியத்தை பேணுவது சிறந்த செயல்.',
      te: 'ఆరోగ్యం పట్ల అవగాహన ఎంతో ఉత్తమం.',
    },
    bodyLines: {
      en: [
        'You did this. That matters.',
        'Taking time to understand your body and care pathways is a vital step toward lifelong wellbeing.',
        'If you ever need help, Suraksha Clinics and Helpline 1097 are always there for you.',
      ],
      hi: [
        'आपने यह सीखा। यह बहुत मायने रखता है।',
        'अपने शरीर और सही स्वास्थ्य देखभाल को समझना स्वस्थ जीवन की ओर सबसे बड़ा कदम है।',
        'यदि आपको कभी भी सलाह या मदद की जरूरत हो, तो सुरक्षा क्लिनिक और 1097 हेल्पलाइन हमेशा आपके साथ हैं।',
      ],
      mr: [
        'तुम्ही महत्त्वाचे पाऊल उचलले आहे.',
        'सुरक्षा क्लिनिक आणि १०९७ नेहमी तुमच्या सेवेत आहेत.',
      ],
      bn: [
        'আপনি একটি গুরুত্বপূর্ণ পদক্ষেপ নিয়েছেন।',
        'সুরক্ষা ক্লিনিক ও ১০৯৭ হেল্পলাইন সর্বদা আপনার পাশে আছে।',
      ],
      ta: [
        'நீங்கள் சரியான முடிவை எடுத்துள்ளீர்கள்.',
        'சுரக்ஷா கிளினிக் மற்றும் 1097 எப்போதும் உங்கள் சேவையில்.',
      ],
      te: [
        'మీరు సరైన అడుగు వేశారు.',
        'సురక్ష క్లినిక్ మరియు 1097 ఎల్లప్పుడూ మీకు తోడుగా ఉంటాయి.',
      ],
    },
    audioScript: {
      en: 'You did this — that matters. If you ever need help, the National Helpline 1 0 9 7 is always there for you. Stay safe, stay informed.',
      hi: 'आपने यह सीखा — यह बहुत मायने रखता है। यदि आपको कभी भी मदद चाहिए, तो राष्ट्रीय हेल्पलाइन 1 0 9 7 हमेशा आपके लिए है। सुरक्षित रहें, जागरूक रहें।',
      mr: 'तुम्ही हे जाणून घेतले — हे महत्त्वाचे आहे. १०९७ नेहमी मदतीसाठी उपलब्ध आहे.',
      bn: 'সচেতন থাকুন, সুস্থ থাকুন। প্রয়োজনে ১০৯৭ নম্বরে যোগাযোগ করুন।',
      ta: 'பாதுகாப்பாக இருங்கள். தேவைப்படும் போது 1097 எண்ணை அழைக்கவும்.',
      te: 'సురక్షితంగా ఉండండి. అవసరమైనప్పుడు 1097 కి కాల్ చేయండి.',
    },
    facilitatorPrompt: {
      en: 'Close by asking if anyone has a question they didn\'t want to ask in front of the group — offer to talk one-on-one after.',
      hi: 'सत्र समाप्त करते हुए पूछें: क्या किसी का कोई ऐसा सवाल है जो वह सबके सामने नहीं पूछ पाया? बाद में एकांत में बात करने का अवसर दें।',
      mr: 'समाप्ती करताना सांगा: कोणाला वैयक्तिक प्रश्न असल्यास नंतर विचारू शकता.',
      bn: 'সেশন শেষে বলুন: কারো কোনো ব্যক্তিগত প্রশ্ন থাকলে আলাদাভাবে কথা বলতে পারেন।',
      ta: 'தனிப்பட்ட முறையில் பேச விரும்பினால் அமர்வுக்கு பின் சந்திக்கலாம் என கூறவும்.',
      te: 'ఎవరికైనా వ్యక్తిగత ప్రశ్నలు ఉంటే తర్వాత కలవవచ్చని చెప్పండి.',
    },
    accessibilityDescription: {
      en: 'Closing reassurance illustration echoing the open-hand motif in warm coral, with National AIDS Helpline 1097 and credits.',
      hi: 'खुले हाथ की आकृति के साथ समापन चित्र, राष्ट्रीय हेल्पलाइन 1097 और आभार विवरण।',
      mr: 'समारोप चित्र व १०९७ क्रमांक.',
      bn: 'সমাপ্তি চিত্র ও ১০৯৭ তথ্য।',
      ta: 'நிறைவு படம் மற்றும் உதவி எண்.',
      te: 'ముగింపు చిత్రం మరియు హెల్ప్‌లైన్ సమాచారం.',
    },
    clinicalMetadata: {
      source: 'National AIDS Control Organisation (NACO), MoHFW, Government of India',
      reviewer: 'National Clinical & Public Health Review Board',
      dateReviewed: '2026-08-24',
      rightsLicense: 'National Public Health Education Open License 2026',
      version: '1.0-Release',
    },
  },
];
