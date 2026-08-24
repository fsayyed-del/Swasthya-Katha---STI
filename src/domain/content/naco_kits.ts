import { z } from 'zod';
import { LocaleSchema } from './schema';

export const NacoKitSchema = z.object({
  id: z.string(),
  kitNumber: z.number().min(1).max(7),
  colorName: z.record(LocaleSchema, z.string()),
  colorHex: z.string(),
  bgClass: z.string(),
  borderClass: z.string(),
  badgeTextClass: z.string(),
  syndromeTitle: z.record(LocaleSchema, z.string()),
  syndromeSubtitle: z.record(LocaleSchema, z.string()),
  plainSymptoms: z.record(LocaleSchema, z.array(z.string())),
  clinicalSymptoms: z.array(z.string()),
  plainExplanation: z.record(LocaleSchema, z.string()),
  clinicalRegimen: z.string(),
  partnerManagement: z.record(LocaleSchema, z.string()),
  followUpSchedule: z.record(LocaleSchema, z.string()),
  keyNote: z.record(LocaleSchema, z.string()).optional(),
});

export type NacoKit = z.infer<typeof NacoKitSchema>;

export const NACO_KITS: NacoKit[] = [
  {
    id: "kit-1-grey",
    kitNumber: 1,
    colorName: {
      en: "Grey Kit",
      hi: "ग्रे किट (Kit 1)",
      mr: "राखाडी किट (Kit 1)",
      bn: "ধূসর কিট (Kit 1)",
      ta: "சாம்பல் நிற கிட்",
      te: "గ్రే కిట్"
    },
    colorHex: "#718096",
    bgClass: "bg-slate-700 text-white",
    borderClass: "border-slate-500",
    badgeTextClass: "bg-slate-800 text-slate-100",
    syndromeTitle: {
      en: "Urethral / Cervical Discharge & Scrotal Swelling",
      hi: "मूत्रमार्ग / गर्भाशय ग्रीवा से स्राव एवं अंडकोश में सूजन",
      mr: "मूत्रमार्ग / गर्भाशय ग्रीवेतून स्त्राव व अंडकोषाची सूज",
      bn: "ইউরেথ্রাল / সার্ভিকাল স্রাব ও স্ক্রোটাল ফোলা",
      ta: "சிறுநீர்க்குழாய் / கருப்பை வாய் கசிவு",
      te: "మూత్రనాళం / గర్భాశయ స్రావాలు"
    },
    syndromeSubtitle: {
      en: "Burning while passing urine, unusual discharge, or genital swelling",
      hi: "पेशाब में जलन, असामान्य स्राव या जननांगों में दर्द/सूजन",
      mr: "लघवी करताना जळजळ, असामान्य स्त्राव किंवा गुप्तांगात वेदना/सूज",
      bn: "প্রস্রাবে জ্বালাপোড়া বা অস্বাভাবিক স্রাব",
      ta: "சிறுநீர் கழிக்கும்போது எரிச்சல்",
      te: "మూత్రవిసర్జన సమయంలో మంట"
    },
    plainSymptoms: {
      en: [
        "Pus or cloudy discharge when urinating",
        "Burning sensation or increased frequency of urination",
        "Swelling or pain in the scrotal area",
        "Mild fever or general body discomfort"
      ],
      hi: [
        "पेशाब के साथ मवाद या असामान्य पानी जैसा स्राव",
        "पेशाब करते समय तेज जलन या बार-बार पेशाब आना",
        "अंडकोश में तेज दर्द या सूजन",
        "हल्का बुखार या शरीर में थकान"
      ],
      mr: [
        "लघवी करताना पू किंवा पांढरा स्त्राव",
        "लघवी करताना जळजळ किंवा वारंवार लघवी लागणे",
        "अंडकोषात सूज किंवा वेदना",
        "अंगात बारीक ताप किंवा थकवा"
      ],
      bn: [
        "প্রস্রাবের সাথে অস্বাভাবিক স্রাব",
        "প্রস্রাবে তীব্র জ্বালাপোড়া",
        "অণ্ডকোষে ব্যথা বা ফোলা",
        "জ্বর বা শারীরিক দুর্বলতা"
      ],
      ta: ["அசாதாரண கசிவு", "சிறுநீர் கழிக்கும்போது எரிச்சல்"],
      te: ["అసాధారణ స్రావం", "మూత్రంలో మంట"]
    },
    clinicalSymptoms: [
      "Urethral Discharge (Pus or muco-purulent)",
      "Cervical Discharge (altered quantity, color, odor)",
      "Painful Scrotal Swelling",
      "Burning micturition & increased urinary frequency"
    ],
    plainExplanation: {
      en: "This standard kit provides dual protection to clear bacterial causes safely. Both tablets are taken together under the guidance of a Suraksha Clinic counselor.",
      hi: "यह किट जीवाणु संक्रमण को सुरक्षित रूप से समाप्त करती है। सुरक्षा क्लिनिक में डॉक्टर की देखरेख में दोनों दवाएं एक साथ दी जाती हैं।",
      mr: "हे किट जिवाणू संसर्ग पूर्णपणे बरा करते. सुरक्षा क्लिनिकमध्ये समुपदेशकांच्या मार्गदर्शनाखाली हे दिले जाते.",
      bn: "এই কিটটি ব্যাকটেরিয়ার সংক্রমণ দূর করে সম্পূর্ণ আরোগ্য দেয়।",
      ta: "இந்த கிட் பாக்டீரியா தொற்றை பாதுகாப்பாக குணப்படுத்துகிறது.",
      te: "ఈ కిట్ బాక్టీరియల్ ఇన్‌ఫెక్షన్‌ను సురక్షితంగా నివారిస్తుంది."
    },
    clinicalRegimen: "Tab. Azithromycin 1 gm OD Stat + Tab. Cefixime 400 mg OD Stat",
    partnerManagement: {
      en: "Treat all recent sexual partners to prevent passing the infection back and forth.",
      hi: "सभी हालिया यौन साथियों का भी इलाज आवश्यक है ताकि दोबारा संक्रमण न फैले।",
      mr: "पुन्हा संसर्ग टाळण्यासाठी लैंगिक जोडीदारावरही उपचार करणे आवश्यक आहे.",
      bn: "পুনরায় সংক্রমণ রোধ করতে যৌন সঙ্গীরও চিকিৎসা প্রয়োজন।",
      ta: "மீண்டும் தொற்று ஏற்படாமல் இருக்க துணையையும் பரிசோதிக்க வேண்டும்.",
      te: "తిరిగి ఇన్ఫెక్షన్ రాకుండా ఉండటానికి భాగస్వామికి కూడా చికిత్స అవసరం."
    },
    followUpSchedule: {
      en: "Re-visit Suraksha Clinic on Day 7 for a routine check-up.",
      hi: "7वें दिन सुरक्षा क्लिनिक में फॉलो-अप जांच कराएं।",
      mr: "७ व्या दिवशी सुरक्षा क्लिनिकमध्ये फेरतपासणी करा.",
      bn: "৭ম দিনে ফলো-আপ চেকআপ করান।",
      ta: "7 ஆம் நாளில் மறு பரிசோதனைக்கு வரவும்.",
      te: "7వ రోజు ఫాలో-అప్ చెకప్ కోసం రండి."
    },
    keyNote: {
      en: "Provided free of charge with confidential counseling at all Suraksha Clinics.",
      hi: "सभी सरकारी सुरक्षा क्लिनिकों में पूर्ण गोपनीयता के साथ नि:शुल्क उपलब्ध।",
      mr: "सर्व शासकीय सुरक्षा क्लिनिकमध्ये पूर्ण गोपनीयतेसह मोफत उपलब्ध.",
      bn: "সকল সরকারি সুরক্ষা ক্লিনিকে সম্পূর্ণ বিনামূল্যে ও গোপনে উপলব্ধ।",
      ta: "அனைத்து சுரக்ஷா கிளினிக்குகளிலும் இலவசமாக கிடைக்கும்.",
      te: "అన్ని సురక్ష క్లినిక్‌లలో ఉచితంగా లభిస్తుంది."
    }
  },
  {
    id: "kit-2-green",
    kitNumber: 2,
    colorName: {
      en: "Green Kit",
      hi: "हरा किट (Kit 2)",
      mr: "हिरवे किट (Kit 2)",
      bn: "সবুজ কিট (Kit 2)",
      ta: "பச்சை நிற கிட்",
      te: "గ్రీన్ కిట్"
    },
    colorHex: "#2F855A",
    bgClass: "bg-emerald-700 text-white",
    borderClass: "border-emerald-500",
    badgeTextClass: "bg-emerald-900 text-emerald-100",
    syndromeTitle: {
      en: "Vaginal Discharge",
      hi: "योनि स्राव (Vaginal Discharge)",
      mr: "योनीतून स्त्राव (Vaginal Discharge)",
      bn: "যোনি স্রাব (Vaginal Discharge)",
      ta: "யோனி கசிவு",
      te: "యోని స్రావం"
    },
    syndromeSubtitle: {
      en: "Changes in color, odor, itching, or soreness in the vaginal area",
      hi: "स्राव के रंग/गंध में बदलाव, खुजली या जलन",
      mr: "स्त्रावाचा रंग किंवा वासात बदल, खाज किंवा जळजळ",
      bn: "স্রাবের রঙ বা গন্ধে পরিবর্তন এবং চুলকানি",
      ta: "துர்நாற்றம் அல்லது அரிப்புடன் கூடிய கசிவு",
      te: "దురద లేదా మంటతో కూడిన స్రావాలు"
    },
    plainSymptoms: {
      en: [
        "Unusual vaginal discharge (curdy white, yellowish, or frothy)",
        "Intense itching or burning in the genital area",
        "Pain or burning during urination or intimate contact",
        "Lower backache (menstrual history taken to rule out pregnancy)"
      ],
      hi: [
        "असामान्य योनि स्राव (दही जैसा सफेद, पीला या झागदार)",
        "जननांगों में तेज खुजली या जलन",
        "पेशाब या संबंध के समय दर्द",
        "कमर में दर्द (गर्भावस्था की जांच के साथ)"
      ],
      mr: [
        "असामान्य पांढरा किंवा पिवळसर स्त्राव",
        "गुप्तांगाच्या भागात खाज किंवा जळजळ",
        "लघवी करताना त्रास किंवा पाठदुखी"
      ],
      bn: [
        "অস্বাভাবিক যোনি স্রাব ও চুলকানি",
        "প্রস্রাবের সময় জ্বালা ও তলপেটে অস্বস্তি"
      ],
      ta: ["அசாதாரண யோனி கசிவு", "அரிப்பு மற்றும் எரிச்சல்"],
      te: ["అసాధారణ యోని స్రావం", "దురద మరియు మంట"]
    },
    clinicalSymptoms: [
      "Abnormal vaginal discharge (Trichomoniasis / Candidiasis / Bacterial Vaginosis)",
      "Vulval itching and erythema",
      "Dysuria & dyspareunia"
    ],
    plainExplanation: {
      en: "Contains targeted treatments for both fungal (yeast) and protozoal/bacterial causes. Given in a single clinic visit.",
      hi: "यह फंगल और बैक्टीरियल दोनों तरह के कारणों को ठीक करने के लिए एक बार में दी जाने वाली असरदार दवा है।",
      mr: "फंगल आणि इतर संसर्गांवर एकाच भेटीत उपचार करणारे प्रभावी किट.",
      bn: "ফাঙ্গাল ও ব্যাকটেরিয়াল সংক্রমণের জন্য এককালীন কার্যকরী ডোজ।",
      ta: "தொற்றை விரைவாக குணப்படுத்தும் மாத்திரைகள்.",
      te: "ఫంగల్ మరియు బాక్టీరియల్ సమస్యలను నివారించే ప్రభావవంతమైన మందులు."
    },
    clinicalRegimen: "Tab. Secnidazole 2 g OD Stat + Cap. Fluconazole 150 mg OD Stat",
    partnerManagement: {
      en: "Partner is treated if they have noticeable symptoms or recurrent discharge occurs.",
      hi: "यदि साथी में भी कोई लक्षण दिखाई दें तो उनका भी उपचार किया जाता है।",
      mr: "जोडीदारास लक्षणे असल्यास त्यांचाही उपचार केला जातो.",
      bn: "সঙ্গীর লক্ষণ থাকলে তারও চিকিৎসা করা হয়।",
      ta: "துணைக்கு அறிகுறிகள் இருந்தால் சிகிச்சை அளிக்கப்படும்.",
      te: "భాగస్వామికి లక్షణాలు ఉంటే చికిత్స చేయాలి."
    },
    followUpSchedule: {
      en: "Check up on Day 7 to ensure symptoms have fully resolved.",
      hi: "7वें दिन क्लिनिक में फॉलो-अप लें।",
      mr: "७ व्या दिवशी फेरतपासणी करावी.",
      bn: "৭ম দিনে স্বাস্থ্যকর্মীর কাছে রিপোর্ট করুন।",
      ta: "7 ஆம் நாளில் மருத்துவரை அணுகவும்.",
      te: "7వ రోజు తిరిగి సంప్రదించండి."
    }
  },
  {
    id: "kit-3-white",
    kitNumber: 3,
    colorName: {
      en: "White Kit",
      hi: "सफेद किट (Kit 3)",
      mr: "पांढरे किट (Kit 3)",
      bn: "সাদা কিট (Kit 3)",
      ta: "வெள்ளை நிற கிட்",
      te: "వైట్ కిట్"
    },
    colorHex: "#EDF2F7",
    bgClass: "bg-slate-100 text-slate-900",
    borderClass: "border-slate-400",
    badgeTextClass: "bg-slate-300 text-slate-900 font-bold",
    syndromeTitle: {
      en: "Genital Ulcer (Non-Herpetic)",
      hi: "जननांगों में छाला या घाव (Non-Herpetic Ulcer)",
      mr: "गुप्तांगावरील व्रण / जखम (Non-Herpetic)",
      bn: "যৌনাঙ্গে ক্ষত বা ঘা (Non-Herpetic)",
      ta: "பிறப்புறுப்பு புண் (நான்-ஹெர்பெடிக்)",
      te: "జననేంద్రియ పుండ్లు"
    },
    syndromeSubtitle: {
      en: "Single or multiple sores in the genital area with swollen groin glands",
      hi: "जननांगों पर एक या अधिक घाव/छाले एवं जांघों की ग्रंथियों में सूजन",
      mr: "गुप्तांगावर एक किंवा अधिक जखमा व जांघेतील गाठींना सूज",
      bn: "যৌনাঙ্গে এক বা একাধিক ঘা এবং কুঁচকির গ্রন্থি ফোলা",
      ta: "பிறப்புறுப்பில் வலி அல்லது வலியற்ற புண்",
      te: "జననేంద్రియ భాగంలో పుండ్లు"
    },
    plainSymptoms: {
      en: [
        "Single or multiple sores/ulcers in the genital area (painful or painless)",
        "Burning sensation in the affected area",
        "Enlarged, tender lymph glands in the groin"
      ],
      hi: [
        "जननांगों पर एक या कई छाले (दर्दयुक्त या बिना दर्द वाले)",
        "प्रभावित जगह पर जलन या खुजली",
        "जांघों (ग्रोइन) की ग्रंथियों में सूजन या गांठ"
      ],
      mr: [
        "गुप्तांगावर एक किंवा अनेक फोड/जखमा",
        "जखमेच्या ठिकाणी जळजळ",
        "जांघेत गाठ किंवा सूज येणे"
      ],
      bn: [
        "যৌনাঙ্গে এক বা একাধিক ক্ষত বা ঘা",
        "ক্ষতস্থানে জ্বালাপোড়া বা চুলকানি",
        "কুঁচকিতে গ্রন্থি ফোলা"
      ],
      ta: ["பிறப்புறுப்பில் புண்", "எரிச்சல் உணர்வு"],
      te: ["జననేంద్రియాలపై పుండ్లు", "మంట లేదా నొప్పి"]
    },
    clinicalSymptoms: [
      "Genital ulcer (Syphilis / Chancroid)",
      "Single indurated ulcer or multiple painful ulcers",
      "Inguinal lymphadenopathy"
    ],
    plainExplanation: {
      en: "Primary treatment using penicillin and oral medication to heal the ulcer and prevent complications.",
      hi: "यह दवा घाव को ठीक करती है और संक्रमण को शरीर में आगे फैलने से रोकती है।",
      mr: "जखम बरी करण्यासाठी व संसर्ग शरीरात पसरण्यापासून रोखण्यासाठी हे दिले जाते.",
      bn: "ক্ষত নিরাময় ও দীর্ঘমেয়াদী জটিলতা দূর করতে এই চিকিৎসা দেওয়া হয়।",
      ta: "புண்ணை முழுமையாக குணப்படுத்த உதவும் சிகிச்சை.",
      te: "పుండ్లను త్వరగా నయం చేసి ఇన్‌ఫెక్షన్ వ్యాపించకుండా చేస్తుంది."
    },
    clinicalRegimen: "Inj. Benzathine penicillin (2.4 MU) 1 vial + Tab. Azithromycin (1 gm) Single dose",
    partnerManagement: {
      en: "Treat all sexual partners from the past 3 months to ensure full family protection.",
      hi: "पिछले 3 महीनों के सभी यौन साथियों का उपचार जरूरी है।",
      mr: "मागील ३ महिन्यांतील सर्व लैंगिक जोडीदारांवर उपचार करणे आवश्यक.",
      bn: "বিগত ৩ মাসের সকল যৌন সঙ্গীর চিকিৎসা নিশ্চিত করতে হবে।",
      ta: "கடந்த 3 மாதங்களில் இருந்த அனைத்து பாலியல் துணைகளுக்கும் சிகிச்சை அவசியம்.",
      te: "గత 3 నెలల్లోని భాగస్వాములకు కూడా చికిత్స అవసరం."
    },
    followUpSchedule: {
      en: "Follow up on Day 7 to verify the sore is healing cleanly.",
      hi: "7वें दिन घाव भरने की पुष्टि के लिए क्लिनिक आएं।",
      mr: "७ व्या दिवशी तपासणीसाठी यावे.",
      bn: "৭ম দিনে ঘা শুকানোর অগ্রগতি যাচাই করুন।",
      ta: "7 ஆம் நாளில் பரிசோதனைக்கு வரவும்.",
      te: "7వ రోజు ఫాలో-అప్ చెకప్."
    }
  },
  {
    id: "kit-4-blue",
    kitNumber: 4,
    colorName: {
      en: "Blue Kit",
      hi: "नीला किट (Kit 4)",
      mr: "निळे किट (Kit 4)",
      bn: "নীল কিট (Kit 4)",
      ta: "நீல நிற கிட்",
      te: "బ్లూ కిట్"
    },
    colorHex: "#2B6CB0",
    bgClass: "bg-blue-800 text-white",
    borderClass: "border-blue-500",
    badgeTextClass: "bg-blue-950 text-blue-100",
    syndromeTitle: {
      en: "Genital Ulcer (If Allergic to Penicillin)",
      hi: "जननांगों में घाव (पेनिसिलिन एलर्जी होने पर)",
      mr: "गुप्तांगावरील व्रण (पेनिसिलिन ॲलर्जी असल्यास)",
      bn: "যৌনাঙ্গে ক্ষত (পেনিসিলিন এলার্জি রোগীদের জন্য)",
      ta: "பிறப்புறுப்பு புண் (பென்சிலின் ஒவ்வாமை உள்ளவர்களுக்கு)",
      te: "జననేంద్రియ పుండ్లు (పెన్సిలిన్ అలెర్జీ ఉన్నవారికి)"
    },
    syndromeSubtitle: {
      en: "Safe alternative oral course for individuals allergic to penicillin injections",
      hi: "पेनिसिलिन इंजेक्शन से एलर्जी वाले लोगों के लिए सुरक्षित खाने वाली दवा",
      mr: "पेनिसिलिनची ॲलर्जी असणाऱ्यांसाठी सुरक्षित गोळ्यांचा कोर्स",
      bn: "পেনিসিলিনে এলার্জি থাকলে মুখে খাওয়ার নিরাপদ বিকল্প কোর্স",
      ta: "பென்சிலின் ஊசிக்கு மாற்று சிகிச்சை மாத்திரைகள்",
      te: "పెన్సిలిన్ పడనివారికి ప్రత్యామ్నాయ చికిత్స"
    },
    plainSymptoms: {
      en: [
        "Genital sores in a patient known to have penicillin sensitivity/allergy",
        "Burning sensation in the groin or genital region",
        "Enlarged lymph nodes"
      ],
      hi: [
        "पेनिसिलिन से एलर्जी वाले व्यक्तियों में जननांगों के छाले",
        "जननांगों में जलन या सूजन",
        "ग्रंथियों में दर्द"
      ],
      mr: [
        "पेनिसिलिन ॲलर्जी असणाऱ्या व्यक्तींमध्ये गुप्तांगावर जखम",
        "जांघेत गाठ व वेदना"
      ],
      bn: ["পেনিসিলিন সংবেদনশীল রোগীদের যৌনাঙ্গে ঘা ও ব্যথা"],
      ta: ["பென்சிலின் ஒவ்வாமை உள்ளவர்களுக்கு பிறப்புறுப்பு புண்கள்"],
      te: ["పెన్సిలిన్ అలెర్జీ ఉన్నవారికి పుండ్ల చికిత్స"]
    },
    clinicalSymptoms: [
      "Genital ulcer in Penicillin-allergic patients",
      "Alternative regimen for Syphilis / Chancroid"
    ],
    plainExplanation: {
      en: "A 15-day oral antibiotic course designed specifically for patients who cannot receive penicillin injections safely.",
      hi: "यह 15 दिन का विशेष कोर्स उन लोगों के लिए है जो पेनिसिलिन इंजेक्शन नहीं ले सकते।",
      mr: "पेनिसिलिन न चालणाऱ्या रुग्णांसाठी १५ दिवसांचा तोंडी औषधांचा सुरक्षित कोर्स.",
      bn: "পেনিসিলিন ইনজেকশন নিতে না পারা রোগীদের জন্য ১৫ দিনের নিরাপদ অ্যান্টিবায়োটিক কোর্স।",
      ta: "15 நாட்களுக்கான மாற்று சிகிச்சை மாத்திரைகள்.",
      te: "15 రోజుల పాటు తీసుకునే సురక్షితమైన మందులు."
    },
    clinicalRegimen: "Doxycycline 100 mg (BD for 15 days) + Azithromycin 1 gm (Single dose)",
    partnerManagement: {
      en: "Treat all sexual partners from the past 3 months.",
      hi: "पिछले 3 महीनों के सभी यौन साथियों का उपचार जरूरी है।",
      mr: "मागील ३ महिन्यांतील जोडीदारांवर उपचार.",
      bn: "বিগত ৩ মাসের সঙ্গীদের চিকিৎসা আবশ্যক।",
      ta: "கடந்த 3 மாத பாலியல் துணைகளுக்கு சிகிச்சை.",
      te: "గత 3 నెలల భాగస్వాములకు చికిత్స."
    },
    followUpSchedule: {
      en: "Follow up on Day 7 and Day 14 to complete the full 15-day course.",
      hi: "7वें और 14वें दिन फॉलो-अप जांच कराएं।",
      mr: "७ व्या आणि १४ व्या दिवशी तपासणी करा.",
      bn: "৭ম ও ১৪তম দিনে ফলো-अप নিন।",
      ta: "7 மற்றும் 14 ஆம் நாட்களில் மறுபரிசோதனை.",
      te: "7 మరియు 14వ రోజులలో ఫాలో-అప్."
    }
  },
  {
    id: "kit-5-red",
    kitNumber: 5,
    colorName: {
      en: "Red Kit",
      hi: "लाल किट (Kit 5)",
      mr: "लाल किट (Kit 5)",
      bn: "লাল কিট (Kit 5)",
      ta: "சிகப்பு நிற கிட்",
      te: "రెడ్ కిట్"
    },
    colorHex: "#C53030",
    bgClass: "bg-rose-700 text-white",
    borderClass: "border-rose-500",
    badgeTextClass: "bg-rose-900 text-rose-100",
    syndromeTitle: {
      en: "Genital Ulcer (Herpetic / Water Blisters)",
      hi: "जननांगों में पानी वाले छाले या फुंसियां (Herpes)",
      mr: "गुप्तांगावर पाण्याचे फोड / नागीण (Herpetic)",
      bn: "যৌনাঙ্গে জলভর্তি ফুসকুড়ি বা ফোস্কা (Herpetic)",
      ta: "பிறப்புறுப்பு கொப்புளங்கள் (ஹெர்பெஸ்)",
      te: "జననేంద్రియ బొబ్బలు (హెర్పెస్)"
    },
    syndromeSubtitle: {
      en: "Multiple tiny, painful blisters or recurrent shallow sores",
      hi: "दर्दनाक पानी भरे छोटे छाले जो बार-बार उभर सकते हैं",
      mr: "लहान, दुखणारे पाण्याचे फोड जे वारंवार येऊ शकतात",
      bn: "ছোট ছোট যন্ত্রণাদায়ক জলভর্তি ফোস্কা",
      ta: "வலியை உண்டாக்கும் சிறிய நீர்க்குமிழ்கள்",
      te: "నొప్పితో కూడిన చిన్న నీటి బొబ్బలు"
    },
    plainSymptoms: {
      en: [
        "Clusters of small, painful fluid-filled blisters on genital skin",
        "Intense tingling, burning, or itching before sores appear",
        "Sores break open into shallow ulcers, then crust over and heal",
        "Recurrent episodes over time"
      ],
      hi: [
        "जननांगों पर पानी भरे छोटे-छोटे दर्दनाक दानों का गुच्छा",
        "छाले निकलने से पहले त्वचा पर चुभन या तेज जलन",
        "छालों का फूटकर सूखना और पपड़ी बनना",
        "समय-समय पर दोबारा होने की संभावना"
      ],
      mr: [
        "गुप्तांगावर लहान पाण्याचे फोड येणे व दुखणे",
        "फोड येण्यापूर्वी खाज व जळजळ जाणवणे",
        "काही दिवसांनी फोड सुकून खपली धरणे"
      ],
      bn: [
        "যৌনাঙ্গে ছোট ছোট পানিভরা ফুসকুড়ির ঝাঁক",
        "ফুসকুড়ি হওয়ার আগে তীব্র জ্বালা বা চুলকানি",
        "ফুসকুড়ি ফেটে গিয়ে ঘা হওয়া"
      ],
      ta: ["பிறப்புறுப்பில் நீர்க்குமிழ்கள்", "கடுமையான எரிச்சல் மற்றும் அரிப்பு"],
      te: ["చిన్న నీటి బొబ్బల గుచ్ఛం", "తీవ్రమైన మంట మరియు దురద"]
    },
    clinicalSymptoms: [
      "Genital Herpes (HSV-2 / HSV-1)",
      "Multiple painful vesicular or ulcerative lesions",
      "Recurrent history with prodromal burning sensation"
    ],
    plainExplanation: {
      en: "Antiviral medication (7-day course) that speeds up healing, calms nerve pain, and reduces virus shedding.",
      hi: "यह 7 दिन की एंटीवायरल दवा छालों को जल्दी सुखाती है, दर्द कम करती है और वायरस को शांत करती है।",
      mr: "७ दिवसांचे अँटीव्हायरल औषध फोड लवकर भरून काढते आणि वेदना कमी करते.",
      bn: "৭ দিনের অ্যান্টিভাইরাল ওষুধ যা দ্রুত ক্ষত সারায় এবং ব্যথা কমায়।",
      ta: "7 நாட்களுக்கான வைரஸ் எதிர்ப்பு மருந்து.",
      te: "7 రోజుల యాంటీవైరల్ మందులు త్వరగా నయం చేస్తాయి."
    },
    clinicalRegimen: "Tab. Acyclovir 400 mg TDS for 7 days",
    partnerManagement: {
      en: "No routine partner medication required unless partner has active symptoms. Practice abstinence while blisters are present.",
      hi: "यदि साथी में छाले न हों तो उन्हें दवा की जरूरत नहीं होती। छाले ठीक होने तक शारीरिक संबंध से बचें।",
      mr: "जोडीदाराला लक्षणे नसल्यास औषध लागत नाही. फोड असताना संबंध टाळावेत.",
      bn: "সঙ্গীর লক্ষণ না থাকলে ওষুধের প্রয়োজন নেই। ঘা থাকা অবস্থায় সঙ্গম থেকে বিরত থাকুন।",
      ta: "துணைக்கு அறிகுறிகள் இல்லையெனில் மருந்து தேவையில்லை.",
      te: "భాగస్వామికి లక్షణాలు లేకపోతే మందులు అవసరం లేదు."
    },
    followUpSchedule: {
      en: "Re-evaluate on Day 7 to confirm lesion healing.",
      hi: "7वें दिन क्लिनिक में दोबारा दिखाएं।",
      mr: "७ व्या दिवशी फेरतपासणी करा.",
      bn: "৭ম দিনে ঘা পরীক্ষা করান।",
      ta: "7 ஆம் நாளில் பரிசோதனைக்கு வரவும்.",
      te: "7వ రోజు పరీక్ష చేయించుకోండి."
    }
  },
  {
    id: "kit-6-yellow",
    kitNumber: 6,
    colorName: {
      en: "Yellow Kit",
      hi: "पीला किट (Kit 6)",
      mr: "पिवळे किट (Kit 6)",
      bn: "হলুদ কিট (Kit 6)",
      ta: "மஞ்சள் நிற கிட்",
      te: "ఎల్లో కిట్"
    },
    colorHex: "#D69E2E",
    bgClass: "bg-amber-600 text-white",
    borderClass: "border-amber-400",
    badgeTextClass: "bg-amber-800 text-amber-100",
    syndromeTitle: {
      en: "Lower Abdominal Pain (Pelvic Inflammatory Infection)",
      hi: "पेट के निचले हिस्से में दर्द (Pelvic Inflammatory Disease)",
      mr: "पोटाच्या खालच्या भागात दुखणे (LAP / PID)",
      bn: "তলপেটে তীব্র ব্যথা (LAP / PID)",
      ta: "அடிவயிற்று வலி (இடுப்பு அழற்சி நோய்)",
      te: "పొత్తికడుపు నొప్పి (LAP)"
    },
    syndromeSubtitle: {
      en: "Dull or sharp pain in lower abdomen, fever, irregular bleeding, or discharge",
      hi: "पेट के निचले हिस्से में दर्द, बुखार, अनियमित मासिक या बदबूदार स्राव",
      mr: "ओटीपोटात तीव्र वेदना, ताप, मासिक पाळीतील अनियमितता",
      bn: "তলপেটে ব্যথা, জ্বর ও অনিয়মিত রক্তস্রাব",
      ta: "காய்ச்சல் மற்றும் ஒழுங்கற்ற இரத்தப்போக்குடன் அடிவயிற்று வலி",
      te: "జ్వరం మరియు రక్తస్రావంతో పొత్తికడుపు నొప్పి"
    },
    plainSymptoms: {
      en: [
        "Persistent ache or tenderness in the lower abdomen",
        "Fever, nausea, or general weakness",
        "Abnormal vaginal bleeding or painful periods (dysmenorrhea)",
        "Pain during intimacy or urination",
        "Cervical motion tenderness on examination"
      ],
      hi: [
        "पेट के निचले हिस्से (पेल्विस) में लगातार मीठा या तेज दर्द",
        "बुखार, कमजोरी या उल्टी जैसा महसूस होना",
        "माहवारी में अनचाहा खून आना या अत्यधिक दर्द",
        "शारीरिक संबंध के दौरान दर्द या पेशाब में जलन"
      ],
      mr: [
        "ओटीपोटात सतत दुखणे किंवा कळा येणे",
        "ताप व थकवा",
        "मासिक पाळीत जास्त रक्तस्त्राव किंवा असह्य वेदना",
        "संबंधादरम्यान त्रास"
      ],
      bn: [
        "তলপেটে তীব্র বা দীর্ঘস্থায়ী ব্যথা",
        "জ্বর ও দুর্বলতা",
        "মাসিকে অনিয়ম বা অতিরিক্ত রক্তক্ষরণ",
        "শারীরিক সম্পর্কের সময় অস্বস্তি"
      ],
      ta: ["தொடர்ச்சியான அடிவயிற்று வலி", "காய்ச்சல் மற்றும் சோர்வு"],
      te: ["పొత్తికడుపులో నిరంతర నొప్పి", "జ్వరం మరియు అలసట"]
    },
    clinicalSymptoms: [
      "Pelvic Inflammatory Disease (PID / LAP)",
      "Bilateral lower abdominal tenderness",
      "Cervical motion tenderness & purulent discharge",
      "Fever > 38°C & abnormal vaginal bleeding"
    ],
    plainExplanation: {
      en: "Comprehensive 14-day triple antibiotic regimen to treat upper reproductive tract infections and protect long-term fertility.",
      hi: "यह 14 दिन का पूर्ण कोर्स है जो गर्भाशय और नलों के संक्रमण को ठीक करता है और भविष्य में मातृत्व की सुरक्षा करता है।",
      mr: "गर्भाशय आणि नलिकांच्या संसर्गावर मात करणारा व भविष्यातील आरोग्यासाठी १४ दिवसांचा पूर्ण कोर्स.",
      bn: "গর্ভাশয় ও প্রজননতন্ত্রের জটিলতা দূর করতে ১৪ দিনের পূর্ণাঙ্গ অ্যান্টিবায়োটিক কোর্স।",
      ta: "கருப்பை ஆரோக்கியத்தை காக்கும் 14 நாட்கள் முழுமையான சிகிச்சை.",
      te: "గర్భాశయ ఆరోగ్యాన్ని కాపాడే 14 రోజుల సంపూర్ణ కోర్సు."
    },
    clinicalRegimen: "Tab. Cefixime 400 mg OD stat + Tab. Metronidazole 400 mg BD x 14 days + Doxycycline 100 mg BD x 14 days",
    partnerManagement: {
      en: "Treat male sexual partners with Kit 1 (Grey) to prevent reinfection.",
      hi: "पुरुष साथी को किट 1 (ग्रे किट) से उपचार दिया जाता है।",
      mr: "पुरुष जोडीदारास किट १ (राखाडी किट) द्वारे उपचार दिले जातात.",
      bn: "পুরুষ সঙ্গীকে কিট ১ (ধূসর কিট) দিয়ে চিকিৎসা করতে হবে।",
      ta: "ஆண் துணைக்கு கிட் 1 (சாம்பல்) கொண்டு சிகிச்சை அளிக்கப்பட வேண்டும்.",
      te: "మగ భాగస్వామికి కిట్ 1 (గ్రే) తో చికిత్స చేయాలి."
    },
    followUpSchedule: {
      en: "Strict clinical follow-up on Day 3, Day 7, and Day 14.",
      hi: "तीसरे दिन (Day 3), 7वें दिन और 14वें दिन अनिवार्य जांच।",
      mr: "३ रा दिवस, ७ वा दिवस आणि १४ व्या दिवशी क्लिनिकमध्ये तपासणी.",
      bn: "৩য়, ৭ম ও ১৪তম দিনে নিয়মিত ফলো-আপ জরুরি।",
      ta: "3, 7 மற்றும் 14 ஆம் நாட்களில் கட்டாய பரிசோதனை.",
      te: "3, 7 మరియు 14వ రోజులలో తప్పనిసరి ఫాలో-అప్."
    }
  },
  {
    id: "kit-7-black",
    kitNumber: 7,
    colorName: {
      en: "Black Kit",
      hi: "काला किट (Kit 7)",
      mr: "काळे किट (Kit 7)",
      bn: "কালো কিট (Kit 7)",
      ta: "கருப்பு நிற கிட்",
      te: "బ్లాక్ కిట్"
    },
    colorHex: "#1A202C",
    bgClass: "bg-neutral-900 text-white",
    borderClass: "border-neutral-600",
    badgeTextClass: "bg-neutral-800 text-neutral-100",
    syndromeTitle: {
      en: "Inguinal Bubo (Painful Groin Swelling)",
      hi: "जांघ में गांठ या सूजन (Inguinal Bubo)",
      mr: "जांघेतील मोठी दुखरी गाठ / सूज (Inguinal Bubo)",
      bn: "কুঁচকিতে যন্ত্রণাদায়ক ফোলা বা টিউমার (Inguinal Bubo)",
      ta: "தொடை இடுக்கில் நெறிகட்டுதல் (இங்குயினல் புபோ)",
      te: "గజ్జల్లో నొప్పిగల గడ్డలు (ఇంగ్వియల్ బుబో)"
    },
    syndromeSubtitle: {
      en: "Painful enlargement of lymph nodes in the groin, with prior sores or discharge",
      hi: "जांघ के जोड़ (ग्रोइन) में बड़ी दुखती गांठ, पहले कभी छाले या मवाद का इतिहास",
      mr: "जांघेत मोठी सूज किंवा गाठ ज्यातून वेदना होतात",
      bn: "কুঁচকিতে যন্ত্রণাদায়ক বড় ফোলা ভাব",
      ta: "தொடை பகுதியில் கடுமையான வலி மற்றும் வீக்கம்",
      te: "గజ్జల్లో తీవ్రమైన నొప్పి మరియు వాపు"
    },
    plainSymptoms: {
      en: [
        "Enlarged, painful swelling in the groin (inguinal crease)",
        "Preceding history of genital ulcer or pus discharge",
        "Fever, shivering, or feeling sick"
      ],
      hi: [
        "जांघ के जोड़ (ग्रोइन) में बड़ी और बहुत दुखती हुई गांठ",
        "कुछ दिन पहले जननांगों पर छाला या मवाद आने का इतिहास",
        "तेज बुखार, कंपकंपी या शरीर टूटना"
      ],
      mr: [
        "जांघेत खूप दुखणारी मोठी गाठ",
        "पूर्वी गुप्तांगावर जखम किंवा स्त्राव झाल्याचा इतिहास",
        "ताप व अस्वस्थता"
      ],
      bn: [
        "কুঁচকিতে খুব যন্ত্রণাদায়ক ফোলা বা গ্রন্থি",
        "অতীতে যৌনাঙ্গে ঘা বা স্রাবের ইতিহাস",
        "তীব্র জ্বর ও শারীরিক অস্বস্তি"
      ],
      ta: ["தொடை இடுக்கில் பெரிய நெறிகட்டுதல்", "காய்ச்சல்"],
      te: ["గజ్జల్లో పెద్ద వాపు", "జ్వరం మరియు ఒంటి నొప్పులు"]
    },
    clinicalSymptoms: [
      "Inguinal Bubo (Lymphogranuloma Venereum / Chancroid)",
      "Fluctuant painful inguinal lymphadenitis",
      "Fistula or sinus formation if untreated"
    ],
    plainExplanation: {
      en: "A comprehensive 21-day antibiotic regimen to safely resolve the deep infection, protect the lymph system, and avoid surgical drainage.",
      hi: "यह 21 दिन का कोर्स है जो गहरी ग्रंथियों के संक्रमण को पूरी तरह शांत करता है और सर्जरी की नौबत से बचाता है।",
      mr: "जांघेतील खोल संसर्ग बरा करणारा आणि शस्त्रक्रिया टाळणारा २१ दिवसांचा पूर्ण औषध कोर्स.",
      bn: "লিম্ফ গ্রন্থির গভীর সংক্রমণ দূর করতে এবং অস্ত্রোপচার এড়াতে ২১ দিনের পূর্ণ কোর্স।",
      ta: "21 நாட்களுக்கான முழுமையான சிகிச்சை முறை.",
      te: "శస్త్రచికిత్స లేకుండా ఇన్ఫెక్షన్‌ను నయం చేసే 21 రోజుల కోర్సు."
    },
    clinicalRegimen: "Tab. Azithromycin 1 gm OD Stat + Tab. Doxycycline 100 mg BD for 21 days",
    partnerManagement: {
      en: "Treat all sexual partners from the past 3 weeks.",
      hi: "पिछले 3 हफ्तों के सभी यौन साथियों का उपचार जरूरी है।",
      mr: "मागील ३ आठवड्यांतील सर्व जोडीदारांवर उपचार.",
      bn: "বিগত ৩ সপ্তাহের সকল সঙ্গীর চিকিৎসা প্রয়োজন।",
      ta: "கடந்த 3 வார பாலியல் துணைகளுக்கு சிகிச்சை.",
      te: "గత 3 వారాల భాగస్వాములకు చికిత్స."
    },
    followUpSchedule: {
      en: "Follow up on Day 7, Day 14, and Day 21 until the swelling is completely gone.",
      hi: "7वें, 14वें और 21वें दिन अनिवार्य फॉलो-अप जांच।",
      mr: "७ वा, १४ वा आणि २१ व्या दिवशी क्लिनिकमध्ये तपासणी.",
      bn: "৭ম, ১৪তম ও ২১তম দিনে নিয়মিত ফলো-আপ।",
      ta: "7, 14 மற்றும் 21 ஆம் நாட்களில் தொடர் பரிசோதனை.",
      te: "7, 14 మరియు 21వ రోజులలో తప్పనిసరి ఫాలో-అప్."
    }
  }
];

export const NACO_CONSIDERATIONS = {
  title: {
    en: "Universal Rules for STI/RTI Care at Suraksha Clinics",
    hi: "सुरक्षा क्लिनिकों में यौन स्वास्थ्य देखभाल के महत्वपूर्ण नियम",
    mr: "सुरक्षा क्लिनिकमधील उपचारांचे मूलभूत नियम",
    bn: "সুরক্ষা ক্লিনিকে চিকিৎসার সার্বজনীন নিয়মাবলী",
    ta: "சுரக்ஷா கிளினிக் சிகிச்சை விதிமுறைகள்",
    te: "సురక్ష క్లినిక్ ముఖ్య నియమాలు"
  },
  points: [
    {
      id: "counseling",
      title: {
        en: "Free & Confidential Counseling",
        hi: "नि:शुल्क एवं पूरी तरह गोपनीय परामर्श",
        mr: "मोफत व पूर्णपणे गोपनीय समुपदेशन",
        bn: "বিনামূল্যে ও গোপনীয় পরামর্শ",
        ta: "இலவச ரகசிய ஆலோசனை",
        te: "ఉచిత మరియు రహస్య కౌన్సెలింగ్"
      },
      desc: {
        en: "Trained counselors explain everything kindly with zero judgment. Your privacy is 100% protected.",
        hi: "प्रशिक्षित काउंसलर बिना किसी संकोच या शर्म के मार्गदर्शन करते हैं। आपकी पहचान पूरी तरह गुप्त रखी जाती है।",
        mr: "प्रशिक्षित समुपदेशक कोणताही संकोच न बाळगता मार्गदर्शन करतात. तुमची माहिती गुप्त राहते.",
        bn: "দক্ষ পরামর্শদাতারা কোনো বিচার না করে আন্তরিকভাবে সাহায্য করেন। আপনার গোপনীয়তা অক্ষুণ্ণ থাকে।",
        ta: "பயிற்சி பெற்ற ஆலோசகர்கள் கனிவுடன் வழிகாட்டுகின்றனர்.",
        te: "శిక్షణ పొందిన కౌన్సెలర్లు స్నేహపూర్వకంగా మార్గదర్శకత్వం చేస్తారు."
      }
    },
    {
      id: "partner-care",
      title: {
        en: "Treat Both Partners (Ping-Pong Effect Prevention)",
        hi: "दोनों साथियों का एक साथ इलाज (पिंग-पोंग संक्रमण से बचाव)",
        mr: "दोन्ही जोडीदारांवर एकत्र उपचार",
        bn: "উভয় সঙ্গীর একসাথে চিকিৎসা",
        ta: "இருவருக்கும் ஒரே நேரத்தில் சிகிச்சை",
        te: "ఇద్దరు భాగస్వాములకు ఒకేసారి చికిత్స"
      },
      desc: {
        en: "Treating only one person causes the infection to bounce back. Mutual treatment cures both completely.",
        hi: "यदि केवल एक व्यक्ति दवा ले, तो संबंध बनाने पर बीमारी दोबारा लौट आती है। दोनों का इलाज ही स्थायी समाधान है।",
        mr: "फक्त एकाने उपचार घेतल्यास संसर्ग पुन्हा होऊ शकतो. दोघांनी औषध घेणे आवश्यक आहे.",
        bn: "কেবল একজন চিকিৎসা নিলে সংক্রমণ ফিরে আসতে পারে। উভয়ের চিকিৎসা স্থায়ী সমাধান।",
        ta: "இருவரும் சிகிச்சை பெறுவது மட்டுமே தொற்றை முழுமையாக குணப்படுத்தும்.",
        te: "ఒక్కరు మాత్రమే చికిత్స తీసుకుంటే ఇన్‌ఫెక్షన్ మళ్ళీ వస్తుంది. ఇద్దరూ మందులు వాడాలి."
      }
    },
    {
      id: "abstinence-condoms",
      title: {
        en: "Free Condoms & Protection During Treatment",
        hi: "इलाज के दौरान परहेज एवं मुफ्त निरोध (कंडोम) वितरण",
        mr: "उपचारादरम्यान काळजी व मोफत निरोध वाटप",
        bn: "চিকিৎসাকালীন সতর্কতা ও বিনামূল্যে কনডম",
        ta: "சிகிச்சையின் போது இடைவெளி மற்றும் இலவச ஆணுறை",
        te: "చికిత్స సమయంలో జాగ్రత్తలు మరియు ఉచిత కండోమ్‌లు"
      },
      desc: {
        en: "Refrain from sexual contact or use condoms consistently until the full medication course is completed.",
        hi: "दवा का कोर्स पूरा होने तक शारीरिक संबंध से बचें या अनिवार्य रूप से कंडोम का सही उपयोग करें।",
        mr: "औषध पूर्ण होईपर्यंत संयम पाळा किंवा नेहमी निरोधचा योग्य वापर करा.",
        bn: "কোর্স শেষ না হওয়া পর্যন্ত শারীরিক সম্পর্ক থেকে বিরত থাকুন বা সঠিক নিয়মে কনডম ব্যবহার করুন।",
        ta: "மருந்து முடியும் வரை உடலுறவை தவிர்க்கவும் அல்லது ஆணுறையை சரியாக பயன்படுத்தவும்.",
        te: "కోర్సు పూర్తయ్యే వరకు సంయమనం పాటించండి లేదా కండోమ్‌లను సరిగ్గా వాడండి."
      }
    },
    {
      id: "ictc-referral",
      title: {
        en: "Confidential HIV & Syphilis Check (ICTC)",
        hi: "आई.सी.टी.सी. में मुफ्त एच.आई.वी. एवं रक्त जांच",
        mr: "आयसीटीसी (ICTC) मध्ये मोफत तपासणी",
        bn: "আইসিটিসি-তে বিনামূল্যে রক্ত পরীক্ষা",
        ta: "இலவச ரத்த பரிசோதனை (ICTC)",
        te: "ఉచిత రక్త పరీక్షలు (ICTC)"
      },
      desc: {
        en: "Every visitor is offered a quick, free, single-prick blood check to ensure total peace of mind.",
        hi: "संपूर्ण निश्चिंतता के लिए उंगली से एक बूंद खून लेकर मुफ्त और तुरंत जांच की सुविधा दी जाती है।",
        mr: "संपूर्ण समाधानासाठी एका थेंबात जलद व मोफत चाचणी उपलब्ध.",
        bn: "এক ফোঁটা রক্তে দ্রুত ও নির্ভুল বিনামূল্যে পরীক্ষার সুবিধা।",
        ta: "முழுமையான மன அமைதிக்காக விரைவான ரத்த பரிசோதனை.",
        te: "పూర్తి మనశ్శాంతి కోసం వేలి నుంచి ఒక చుక్క రక్తంతో ఉచిత పరీక్ష."
      }
    },
    {
      id: "hepb-vaccine",
      title: {
        en: "Hepatitis B Protection",
        hi: "हेपेटाइटिस बी टीकाकरण परामर्श",
        mr: "हिपॅटायटीस बी लसीकरण सल्ला",
        bn: "হেপাটাইটিস বি টিকাদান পরামর্শ",
        ta: "ஹெபடைடிஸ் பி தடுப்பூசி ஆலோசனை",
        te: "హెపటైటిస్ బి టీకా సలహా"
      },
      desc: {
        en: "Ask your clinic doctor about Hepatitis B immunization to protect your liver health for life.",
        hi: "अपने लिवर की आजीवन सुरक्षा के लिए डॉक्टर से हेपेटाइटिस बी के टीके के बारे में पूछें।",
        mr: "लिव्हरच्या दीर्घायुष्यासाठी डॉक्टरांकडून हिपॅटायटीस बी लसीबद्दल माहिती घ्या.",
        bn: "লিভারের আজীবন সুরক্ষার জন্য ডাক্তারের কাছে হেপাটাইটিস বি টিকার পরামর্শ নিন।",
        ta: "கல்லீரல் பாதுகாப்பிற்காக தடுப்பூசி பற்றி மருத்துவரிடம் கேளுங்கள்.",
        te: "కాలేయ రక్షణ కోసం హెపటైటిస్ బి టీకా గురించి వైద్యుడిని అడగండి."
      }
    }
  ]
};

export const SURAKSHA_SERVICES = {
  helpline: "1097",
  helplineTitle: {
    en: "National AIDS Helpline (Toll-Free, 24x7)",
    hi: "राष्ट्रीय एड्स हेल्पलाइन (टोल-फ्री, 24x7)",
    mr: "राष्ट्रीय एड्स हेल्पलाईन (टोल-फ्री, २४x७)",
    bn: "জাতীয় এইডস হেল্পলাইন (টোল-ফ্রি, ২৪x৭)",
    ta: "தேசிய எய்ட்ஸ் உதவி எண்",
    te: "జాతీయ ఎయిడ్స్ హెల్ప్‌లైన్"
  },
  helplineSubtitle: {
    en: "Dial 1097 from any phone in India for free, confidential, multilingual guidance.",
    hi: "भारत में किसी भी फोन से 1097 डायल करें — नि:शुल्क, गोपनीय और अपनी भाषा में सहायता पाएं।",
    mr: "भारतातील कोणत्याही फोनवरून १०९७ डायल करा — मोफत आणि पूर्णपणे गोपनीय मार्गदर्शन.",
    bn: "ভারতের যেকোনো ফোন থেকে ১০৯৭ ডায়াল করুন — সম্পূর্ণ বিনামূল্যে ও গোপনীয় সহায়তা।",
    ta: "இந்தியாவின் எந்த போனிலிருந்தும் 1097 அழைக்கவும்.",
    te: "భారతదేశంలో ఏ ఫోన్ నుంచైనా 1097కు డయల్ చేయండి."
  },
  clinicName: {
    en: "Suraksha Clinic (Government of India / NACO)",
    hi: "सुरक्षा क्लिनिक (भारत सरकार / NACO)",
    mr: "सुरक्षा क्लिनिक (भारत सरकार / NACO)",
    bn: "সুরক্ষা ক্লিনিক (ভারত সরকার / NACO)",
    ta: "சுரக்ஷா கிளினிக்",
    te: "సురక్ష క్లినిక్"
  },
  clinicSubtitle: {
    en: "Located at all District Hospitals, Medical Colleges, and Sub-District Hospitals across India.",
    hi: "देश के सभी जिला अस्पतालों, मेडिकल कॉलेजों और उप-जिला अस्पतालों में स्थित।",
    mr: "देशातील सर्व जिल्हा रुग्णालये आणि वैद्यकीय महाविद्यालयांमध्ये उपलब्ध.",
    bn: "দেশের সমস্ত জেলা হাসপাতাল ও সরকারি মেডিকেল কলেজে অবস্থিত।",
    ta: "அனைத்து அரசு மாவட்ட மருத்துவமனைகளிலும் உள்ளது.",
    te: "అన్ని ప్రభుత్వ జిల్లా ఆసుపత్రులలో అందుబాటులో ఉంది."
  }
};
