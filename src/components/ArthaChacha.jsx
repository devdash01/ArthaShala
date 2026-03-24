import React, { useState, useEffect } from 'react';
import arthaChachaImg from '../assets/artha_chacha.png';

const T = {
  en: {
    step1: "Hello! I am Artha Chacha. I'm here to help you manage your money this season.",
    step2: "Here is your Wallet and your Debt. Keep that 'Artha Score' shield green for a happy life!",
    step3: "Confused? Just tap this green button and tell me what you need in your own voice.",
    step4: "This is the Panchayat. Looking for help? The government schemes that match your profile will appear here!",
    step5: "It's sowing season! You need ₹15,000 for seeds. Go to the Bank or Sahukar now. Make a smart choice!",
    next: "Next", finish: "Start Journey", sahukarWarning: "High Interest", bankSafe: "Safe Choice",
    sahukarDialogue: "This must be repaid quickly, or there will be trouble.",
    schemeDialogue: "Great! The government scheme saved your money.",
    moduleStart: "Let's begin:", moduleComplete: "Lesson Complete!"
  },
  hi: {
    step1: "राम-राम! मैं अर्था चाचा हूँ। मैं इस सीजन में आपके पैसे मैनेज करने में आपकी मदद करने आया हूँ।",
    step2: "यहाँ आपकी जेब और आपका कर्ज है। सुखद जीवन के लिए 'अर्था स्कोर' शील्ड को हरा रखें!",
    step3: "उलझन में हैं? इस हरे बटन को दबाएँ और मुझे अपनी आवाज में बताएँ कि आपको क्या चाहिए।",
    step4: "यह पंचायत है। आपकी प्रोफाइल से मेल खाने वाली सरकारी योजनाएँ यहाँ दिखाई देंगी!",
    step5: "बुवाई का समय है! आपको बीजों के लिए ₹15,000 चाहिए। अभी बैंक या साहूकार के पास जाएँ।",
    next: "आगे", finish: "शुरू करें", sahukarWarning: "सावधान!", bankSafe: "सुरक्षित",
    sahukarDialogue: "यह कर्ज जल्दी चुकाना होगा, नहीं तो मुश्किल होगी।",
    schemeDialogue: "बहुत बढ़िया! सरकारी योजना ने आपके पैसे बचा लिए।",
    moduleStart: "आइए शुरू करें:", moduleComplete: "पाठ पूरा हुआ!"
  },
  mr: {
    step1: "नमस्कार! मी अर्था चाचा आहे. या हंगामात तुमचे पैसे नियोजन करण्यास मी मदत करेन.",
    step2: "येथे तुमचे पाकीट आणि कर्ज आहे. सुखी जीवनासाठी 'अर्था स्कोर' हिरवा ठेवा!",
    step3: "गोंधळात आहात? या हिरव्या बटणावर टॅप करा आणि तुमच्या स्वतःच्या आवाजात सांगा.",
    step4: "ही पंचायत आहे. सरकारी योजना ज्या तुमच्या प्रोफाइलशी जुळतात त्या येथे दिसतील!",
    step5: "पेरणीचा हंगाम आहे! बियाण्यासाठी ₹15,000 हवे आहेत. बँक किंवा सावकाराकडे जा.",
    next: "पुढील", finish: "सुरू करा", sahukarWarning: "जास्त व्याज", bankSafe: "सुरक्षित",
    sahukarDialogue: "हे कर्ज लवकर फेडावे लागेल, नाहीतर अडचण होईल.",
    schemeDialogue: "छान! सरकारी योजनेमुळे तुमचे पैसे वाचले.",
    moduleStart: "चला सुरू करूया:", moduleComplete: "पाठ पूर्ण झाला!"
  },
  gu: {
    step1: "નમસ્તે! હું અર્થ ચાચા છું. આ સીઝનમાં તમારા પૈસાનું સંચાલન કરવામાં હું તમને મદદ કરીશ.",
    step2: "અહીં તમારું વૉલેટ અને દેવું છે. સુખી જીવન માટે 'અર્થ સ્કોર' લીલો રાખો!",
    step3: "મૂંઝવણમાં છો? આ લીલા બટન પર ટેપ કરો અને તમારા અવાજમાં મને કહો.",
    step4: "આ પંચાયત છે. તમારી પ્રોફાઇલ સાથે મેળ ખાતી સરકારી યોજનાઓ અહીં દેખાશે!",
    step5: "વાવણીની સીઝન છે! બિયારણ માટે ₹15,000 જોઈએ છે. બેંક કે શાહુકાર પાસે જાઓ.",
    next: "આગળ", finish: "શરૂ કરો", sahukarWarning: "વધારે વ્યાજ", bankSafe: "સુરક્ષિત",
    sahukarDialogue: "આ દેવું જલ્દી ચૂકવવું પડશે, નહીંતર મુશ્કેલી થશે.",
    schemeDialogue: "સરસ! સરકારી યોજનાએ તમારા પૈસા બચાવ્યા.",
    moduleStart: "ચાલો શરૂ કરીએ:", moduleComplete: "પાઠ પૂર્ણ થયો!"
  },
  bn: {
    step1: "নমস্কার! আমি অর্থ চাচা। এই মরসুমে আপনার টাকা পরিচালনা করতে আমি সাহায্য করব।",
    step2: "এখানে আপনার ওয়ালেট এবং ঋণ আছে। সুখী জীবনের জন্য 'অর্থ স্কোর' সবুজ রাখুন!",
    step3: "দ্বিধায় আছেন? এই সবুজ বোতামটি টিপুন এবং আপনার নিজের ভাষায় আমাকে বলুন।",
    step4: "এটি পঞ্চায়েত। আপনার প্রোফাইলের সাথে মেলে এমন সরকারি প্রকল্পগুলি এখানে দেখা যাবে!",
    step5: "বপনের মরসুম! বীজের জন্য ₹১৫,০০০ চাই। এখনই ব্যাংক বা মহাজনের কাছে যান।",
    next: "পরবর্তী", finish: "শুরু করুন", sahukarWarning: "অতিরিক্ত সুদ", bankSafe: "নিরাপদ",
    sahukarDialogue: "এই ঋণ দ্রুত পরিশোধ করতে হবে, অন্যথায় সমস্যা হবে।",
    schemeDialogue: "দারুণ! সরকারি প্রকল্প আপনার টাকা বাঁচিয়েছে।",
    moduleStart: "চলুন শুরু করি:", moduleComplete: "পাঠ সম্পন্ন!"
  },
  te: {
    step1: "నమస్కారం! నేను అర్థా చాచా. ఈ సీజనులో మీ డబ్బును మేనేజ్ చేయడంలో నేను సహాయం చేస్తాను.",
    step2: "ఇక్కడ మీ వాలెట్ మరియు అప్పు ఉంది. సుఖీభవ కోసం 'అర్థా స్కోర్' పచ్చగా ఉంచండి!",
    step3: "కన్ఫ్యూజన్ లో ఉన్నారా? ఈ పచ్చని బటన్ నొక్కి మీ స్వంత గొంతుతో చెప్పండి.",
    step4: "ఇది పంచాయతీ. మీ ప్రొఫైల్ కి సరిపోయే ప్రభుత్వ పథకాలు ఇక్కడ కనిపిస్తాయి!",
    step5: "విత్తనాల సమయం! విత్తనాల కోసం ₹15,000 కావాలి. వెంటనే బ్యాంకు లేదా వడ్డీ వ్యాపారి దగ్గరికి వెళ్లండి.",
    next: "తరువాత", finish: "ప్రారంభించండి", sahukarWarning: "ఎక్కువ వడ్డీ", bankSafe: "సురక్షితం",
    sahukarDialogue: "ఈ అప్పు త్వరగా తీర్చాలి, లేకపోతే ఇబ్బంది అవుతుంది.",
    schemeDialogue: "అద్భుతం! ప్రభుత్వ పథకం మీ డబ్బును ఆదా చేసింది.",
    moduleStart: "మొదలు పెడదాం:", moduleComplete: "పాఠం పూర్తయింది!"
  },
  ta: {
    step1: "வணக்கம்! நான் அர்த்தா சாச்சா. இந்த பருவத்தில் உங்கள் பணத்தை மேலாண்மை செய்ய நான் உதவுகிறேன்.",
    step2: "இதோ உங்கள் பணப்பை மற்றும் கடன். மகிழ்ச்சியான வாழ்க்கைக்கு 'அர்த்தா ஸ்கோர்' பச்சையாக இருக்கட்டும்!",
    step3: "குழப்பமா? இந்தப் பச்சை பொத்தானைத் தட்டி உங்கள் சொந்த குரலில் என்னிடம் சொல்லுங்கள்.",
    step4: "இது பஞ்சாயத்து. உங்கள் சுயவிவரத்திற்கு ஏற்ற அரசு திட்டங்கள் இங்கே தோன்றும்!",
    step5: "விதைப்பு காலம்! விதைகளுக்கு ₹15,000 தேவை. உடனே வங்கி அல்லது வட்டிக்காரரிடம் செல்லுங்கள்.",
    next: "அடுத்து", finish: "தொடங்கு", sahukarWarning: "அதிக வட்டி", bankSafe: "பாதுகாப்பான",
    sahukarDialogue: "இந்த கடனை விரைவில் திருப்பிச் செலுத்த வேண்டும், இல்லையெனில் சிக்கல் ஏற்படும்.",
    schemeDialogue: "அற்புதம்! அரசு திட்டம் உங்கள் பணத்தைச் சேமித்தது.",
    moduleStart: "தொடங்குவோம்:", moduleComplete: "பாடம் முடிந்தது!"
  },
  kn: {
    step1: "ನಮಸ್ಕಾರ! ನಾನು ಅರ್ಥಾ ಚಾಚಾ. ಈ ಸೀಸನ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಹಣ ನಿರ್ವಹಣೆಗೆ ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
    step2: "ಇಲ್ಲಿ ನಿಮ್ಮ ವಾಲೆಟ್ ಮತ್ತು ಸಾಲವಿದೆ. ಸುಖಿ ಜೀವನಕ್ಕಾಗಿ 'ಅರ್ಥಾ ಸ್ಕೋರ್' ಹಸಿರಾಗಿಡಿ!",
    step3: "ಗೊಂದಲವೇ? ಈ ಹಸಿರು ಬಟನ್ ಒತ್ತಿ ನಿಮ್ಮ ಧ್ವನಿಯಲ್ಲಿ ನಿಮಗೆ ಏನು ಬೇಕು ಎಂದು ಹೇಳಿ.",
    step4: "ಇದು ಪಂಚಾಯತ್. ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ಗೆ ಹೊಂದುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ!",
    step5: "ಬಿತ್ತನೆ ಸಮಯ! ಬೀಜಕ್ಕಾಗಿ ₹15,000 ಬೇಕು. ಈಗಲೇ ಬ್ಯಾಂಕ್ ಅಥವಾ ಲೇವಾದೇವಿಗಾರರ ಬಳಿ ಹೋಗಿ.",
    next: "ಮುಂದೆ", finish: "ಪ್ರಾರಂಭಿಸಿ", sahukarWarning: "ಹೆಚ್ಚಿನ ಬಡ್ಡಿ", bankSafe: "ಸುರಕ್ಷಿತ",
    sahukarDialogue: "ಈ ಸಾಲವನ್ನು ಬೇಗನೆ ತೀರಿಸಬೇಕು, ಇಲ್ಲದಿದ್ದರೆ ತೊಂದರೆಯಾಗುತ್ತದೆ.",
    schemeDialogue: "ಉತ್ತಮ! ಸರ್ಕಾರಿ ಯೋಜನೆಯು ನಿಮ್ಮ ಹಣ ಉಳಿಸಿದೆ.",
    moduleStart: "ಪ್ರಾರಂಭಿಸೋಣ:", moduleComplete: "ಪಾಠ ಪೂರ್ಣಗೊಂಡಿದೆ!"
  },
  bh: {
    step1: "राम-राम! हम अर्था चाचा हईं। ई सीजन में राउर पइसा मैनेज करे में मदद करे खातिर आइल बानी।",
    step2: "इहँवा राउर जेब आ राउर कर्जा बा। सुखद जिनगी खातिर 'अर्था स्कोर' के हरियर राखीं!",
    step3: "परेशान बानी? बस ई हरियर बटन दबाईं आ अपना आवाज में बताईं कि का चाहीं।",
    step4: "ई पंचायत ह। राउर प्रोफाइल से मेल खाए वाला सरकारी योजना इहँवा लौकी!",
    step5: "बोआई के समय बा! बीअन खातिर ₹15,000 चाहीं। अभी बैंक भा महाजन के पास जाईं।",
    next: "आगे", finish: "शुरू करीं", sahukarWarning: "सावधान!", bankSafe: "सुरक्षित",
    sahukarDialogue: "ई कर्जा जल्दी चुकावे के होई, ना तऽ मुश्किल होई।",
    schemeDialogue: "बहुत नीमन! सरकारी योजना राउर पइसा बचा लेलक।",
    moduleStart: "आईं शुरू कइल जाव:", moduleComplete: "पाठ पूरा भइल!"
  }
};

export default function ArthaChacha({ 
  activeModal, 
  lastDecision, 
  language = 'hi', 
  isFirstVisit, 
  onCompleteTour,
  onStepChange
}) {
  const [tourStep, setTourStep] = useState(isFirstVisit ? 1 : 0);
  const [bubbleText, setBubbleText] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [avatarExpression, setAvatarExpression] = useState('happy');

  const t = T[language] || T.hi;

  useEffect(() => {
    if (tourStep > 0) {
      setBubbleText(t[`step${tourStep}`]);
      setShowMessage(true);
      if (onStepChange) onStepChange(tourStep);
    } else {
      setShowMessage(false);
      if (onStepChange) onStepChange(0);
    }
  }, [tourStep, t, onStepChange]);

  const handleNext = () => {
    if (tourStep < 5) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      if (onStepChange) onStepChange(nextStep);
    } else {
      setTourStep(0);
      onCompleteTour();
      if (onStepChange) onStepChange(0);
    }
  };

  useEffect(() => {
    if (tourStep > 0) return;
    if (!lastDecision) return;

    let newBubble = null;
    if (lastDecision.type === 'loan' && lastDecision.source === 'moneylender') {
      newBubble = t.sahukarDialogue;
      setAvatarExpression('worried');
    } else if (lastDecision.type === 'scheme') {
      newBubble = t.schemeDialogue;
      setAvatarExpression('happy');
    }

    if (newBubble) {
      setBubbleText(newBubble);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setAvatarExpression('happy');
      }, 4000);
    }
  }, [lastDecision, tourStep, t]);

  let statusText = '';
  if (tourStep === 0) {
    if (activeModal === 'moneylender') statusText = t.sahukarWarning;
    else if (activeModal === 'bank' || activeModal === 'panchayat') statusText = t.bankSafe;
  }

  const getPositionStyles = () => {
     if (tourStep === 0) return "bottom-4 right-4 scale-90";
     if (tourStep === 1) return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110";
     if (tourStep === 2) return "top-1/4 right-2 scale-90";
     if (tourStep === 3) return "bottom-32 left-1/2 -translate-x-1/2 scale-100";
     if (tourStep === 4) return "top-40 left-8 scale-90";
     if (tourStep === 5) return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110";
     return "bottom-4 right-4 scale-90";
  };

  return (
    <div className={`absolute transition-all duration-700 ease-in-out z-[1000] flex flex-col items-end pointer-events-none ${getPositionStyles()}`}>
      {/* Speech Bubble */}
      <div className={`mb-3 max-w-[240px] bg-white/95 backdrop-blur-xl text-slate-800 p-4 rounded-[2rem] rounded-br-none shadow-2xl border border-white/40 transition-all duration-500 origin-bottom-right pointer-events-auto ${showMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75'}`}>
        <p className="text-[11px] font-black leading-snug tracking-tight">{bubbleText}</p>
        {tourStep > 0 && (
          <div className="flex justify-end mt-3">
            <button 
              onClick={handleNext}
              className="px-4 py-1.5 bg-indigo-600 active:scale-95 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-md transition-all"
            >
              {tourStep === 5 ? t.finish : t.next} →
            </button>
          </div>
        )}
      </div>

      {/* Chacha Avatar */}
      <div className="relative pointer-events-auto group">
        {statusText && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl border border-white/10">
            {statusText}
          </div>
        )}
        <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white shadow-2xl transition-transform duration-500 ${avatarExpression === 'worried' ? 'scale-90' : 'scale-100'}`}>
          <img src={arthaChachaImg} alt="Artha Chacha" className="w-full h-full object-cover bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
