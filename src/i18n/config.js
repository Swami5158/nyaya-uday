import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          // --- HOME PAGE ---
          welcome_title: "Nyaya-Uday",
          hero_subtitle: "Empowering the next generation of legal minds. Discover the Judicial Career Path — Early, Clearly, Honestly.",
          get_started: "Get Started Now",
          watch_demo: "Watch Demo",
          students: "Students",
          state_exams: "State Exams",
          free_guidance: "Free Guidance",
          goal1_title: "Clear Career Path",
          goal1_text: "Step-by-step guidance to becoming a judge in various high courts.",
          goal2_title: "Think Like a Judge",
          goal2_text: "Test your ethics and logic with real-world judicial simulations.",
          goal3_title: "Self-Assessment",
          goal3_text: "Detailed analytics to see if you're ready for the bench.",

          // --- LEARN PAGE ---
          learn_title: "Understanding the Courtroom",
          learn_subtitle: "Every role is vital to ensuring justice is served fairly.",
          court_arrangement: "Typical Courtroom Arrangement",
          role_judge_title: "The Judge",
          role_judge_desc: "The impartial umpire who ensures the law is followed and the trial is fair.",
          judge_point1: "Rules on evidence",
          judge_point2: "Instructs the jury",
          judge_point3: "Decides final sentences",
          role_prosecutor_title: "The Prosecutor",
          role_prosecutor_desc: "Represents the government. Their goal is to prove a crime was committed.",
          pros_point1: "Presents state evidence",
          pros_point2: "Seeks legal justice",
          pros_point3: "Burden of proof lies here",
          role_defense_title: "The Defense",
          role_defense_desc: "The shield for the accused, protecting their constitutional and legal rights.",
          def_point1: "Cross-examines witnesses",
          def_point2: "Challenges evidence",
          def_point3: "Protects the innocent",
          role_magistrate_title: "The Magistrate",
          role_magistrate_desc: "Handles the 'entry-level' stages of the legal system and minor cases.",
          mag_point1: "Issues search warrants",
          mag_point2: "Sets bail amounts",
          mag_point3: "Initial hearings",
          case_study_title: "Case Study: The Shoplifting Trial",
          study_pros: "Shows CCTV footage of the theft.",
          study_def: "Argues the footage is too blurry to identify the client.",
          study_judge: "Rules that the blurry footage is still allowed as evidence.",
          study_mag: "Signed the warrant to search the suspect's house earlier.",

          // --- TABLE & COMMON ---
          table_title: "Comparison Table",
          col_role: "Role",
          col_duty: "Primary Duty",
          col_alliance: "Alliance",
          duty_prosecutor: "Prove Guilt",
          duty_defense: "Protect Rights",
          duty_judge: "Impartial Ruling",
          alliance_gov: "Government",
          alliance_accused: "The Accused",
          alliance_law: "The Law (Neutral)",
          prosecutor: "Prosecutor",
          defense: "Defense",
          judge: "Judge",
          magistrate: "Magistrate",
          start_sim_btn: "Start Judge Simulation",
        }
      },
      hi: {
        translation: {
          // --- HOME PAGE ---
          welcome_title: "न्याय-उदय",
          hero_subtitle: "कानूनी दिमागों की अगली पीढ़ी को सशक्त बनाना। न्यायिक करियर पथ की खोज करें — जल्दी, स्पष्ट रूप से, ईमानदारी से।",
          get_started: "अभी शुरू करें",
          watch_demo: "डेमो देखें",
          students: "छात्र",
          state_exams: "राज्य परीक्षा",
          free_guidance: "मुफ्त मार्गदर्शन",
          goal1_title: "स्पष्ट करियर पथ",
          goal1_text: "विभिन्न उच्च न्यायालयों में न्यायाधीश बनने के लिए चरण-दर-चरण मार्गदर्शन।",
          goal2_title: "जज की तरह सोचें",
          goal2_text: "वास्तविक दुनिया के न्यायिक सिमुलेशन के साथ अपनी नैतिकता और तर्क का परीक्षण करें।",
          goal3_title: "आत्म-मूल्यांकन",
          goal3_text: "विस्तृत विश्लेषण यह देखने के लिए कि क्या आप बेंच (न्यायाधीश पद) के लिए तैयार हैं।",

          // --- LEARN PAGE ---
          learn_title: "न्यायालय को समझना",
          learn_subtitle: "न्याय निष्पक्ष रूप से मिले, इसके लिए हर भूमिका महत्वपूर्ण है।",
          court_arrangement: "सामान्य न्यायालय व्यवस्था",
          role_judge_title: "न्यायाधीश (जज)",
          role_judge_desc: "निष्पक्ष अंपायर जो यह सुनिश्चित करता है कि कानून का पालन हो और मुकदमा निष्पक्ष हो।",
          judge_point1: "सबूतों पर फैसला",
          judge_point2: "जूरी को निर्देश देना",
          judge_point3: "अंतिम सजा तय करना",
          role_prosecutor_title: "अभियोजक (प्रॉसिक्यूटर)",
          role_prosecutor_desc: "सरकार का प्रतिनिधित्व करता है। इनका लक्ष्य अपराध साबित करना है।",
          pros_point1: "राज्य के सबूत पेश करना",
          pros_point2: "कानूनी न्याय की मांग करना",
          pros_point3: "सबूत पेश करने का भार यहाँ होता है",
          role_defense_title: "बचाव पक्ष (डिफेंस)",
          role_defense_desc: "आरोपी की ढाल, उनके संवैधानिक और कानूनी अधिकारों की रक्षा करना।",
          def_point1: "गवाहों से जिरह",
          def_point2: "सबूतों को चुनौती देना",
          def_point3: "निर्दोष की रक्षा करना",
          role_magistrate_title: "मजिस्ट्रेट",
          role_magistrate_desc: "कानूनी प्रणाली के 'प्रवेश-स्तर' के चरणों और छोटे मामलों को संभालता है।",
          mag_point1: "तलाशी वारंट जारी करना",
          mag_point2: "जमानत राशि तय करना",
          mag_point3: "प्रारंभिक सुनवाई",
          case_study_title: "केस स्टडी: दुकान में चोरी का मुकदमा",
          study_pros: "चोरी के CCTV फुटेज दिखाता है।",
          study_def: "तर्क देता है कि फुटेज क्लाइंट की पहचान करने के लिए बहुत धुंधली है।",
          study_judge: "नियम देता है कि धुंधली फुटेज को अभी भी सबूत के रूप में अनुमति है।",
          study_mag: "संदिग्ध के घर की तलाशी के वारंट पर पहले हस्ताक्षर किए थे।",

          // --- TABLE & COMMON ---
          table_title: "तुलना तालिका",
          col_role: "भूमिका",
          col_duty: "प्राथमिक कर्तव्य",
          col_alliance: "गठबंधन (Alliance)",
          duty_prosecutor: "दोष सिद्ध करना",
          duty_defense: "अधिकारों की रक्षा",
          duty_judge: "निष्पक्ष निर्णय",
          alliance_gov: "सरकार",
          alliance_accused: "अभियुक्त (आरोपी)",
          alliance_law: "कानून (तटस्थ)",
          prosecutor: "अभियोजक",
          defense: "बचाव पक्ष",
          judge: "जज",
          magistrate: "मजिस्ट्रेट",
          start_sim_btn: "जज सिमुलेशन शुरू करें",
        }
      }
    }
  });

export default i18n;