import React, { useState, useEffect } from 'react';
import schemesData from '../data/schemes.json';
import { useFinancials } from '../context/FinancialContext.jsx';

const T = {
  en: {
    step1: "Step 1", land_q: "How much land do you own?",
    step2: "Step 2", income_q: "What is your yearly income?",
    matching: 'Scrutinizing Profile...', found: 'Matched Schemes!',
    apply: 'How to Apply', steps: 'Next Steps', close: 'Back',
    guidance: 'This is not just a game. You can use this in real life too. - Artha Chacha',
    apply_now: "APPLY NOW", return_list: "BACK TO LIST",
    land_options: { none: "No Land", small: "< 2 Hectares", medium: "2-5 Hectares", large: "> 5 Hectares" },
    income_options: { low: "< 1 Lakh", mid: "1-3 Lakhs", high: "3-5 Lakhs", vhigh: "> 5 Lakhs" },
    visit_csc: "Visit nearest Panchayat / CSC Center", carry_docs: "Carry Aadhaar & Bank Details", ask_reg: "Ask for registration in"
  },
  hi: {
    step1: "कदम १", land_q: "आपकी ज़मीन कितनी है?",
    step2: "कदम २", income_q: "आपकी सालाना आय कितनी है?",
    matching: 'प्रोफ़ाइल की जाँच...', found: 'योग्य योजनाएं!',
    apply: 'आवेदन प्रक्रिया', steps: 'अगले कदम', close: 'वापस',
    guidance: 'यह सिर्फ गेम नहीं है। इसे तुम असल ज़िंदगी में भी इस्तेमाल कर सकते हो। - अर्था चाचा',
    apply_now: "आवेदन करें", return_list: "वापस सूची",
    land_options: { none: "ज़मीन नहीं है", small: "२ हेक्टेयर से कम", medium: "२-५ हेक्टेयर", large: "५ हेक्टेयर से अधिक" },
    income_options: { low: "१ लाख से कम", mid: "१-३ लाख", high: "३-५ लाख", vhigh: "५ लाख से अधिक" },
    visit_csc: "नज़दीकी पंचायत या CSC सेंटर जाएँ", carry_docs: "आधार कार्ड और बैंक पासबुक साथ रखें", ask_reg: "पंजीकरण मांगें"
  },
  mr: {
    step1: "पाऊल १", land_q: "तुमची जमीन किती आहे?",
    step2: "पाऊल २", income_q: "तुमचे वार्षिक उत्पन्न किती आहे?",
    matching: 'प्रोफાઇલ तपासत आहे...', found: 'पात्र योजना!',
    apply: 'अर्ज करण्याची प्रक्रिया', steps: 'पुढील पावले', close: 'मागे',
    guidance: 'हा फक्त खेळ नाही. तुम्ही हे खऱ्या आयुष्यातही वापरू शकता. - अर्था चाचा',
    apply_now: "आता अर्ज करा", return_list: "परत यादीत",
    land_options: { none: "जमीन नाही", small: "२ हेक्टरपेक्षा कमी", medium: "२-५ हेक्टर", large: "५ हेक्टरपेक्षा जास्त" },
    income_options: { low: "१ लाखापेक्षा कमी", mid: "१-३ लाख", high: "३-५ लाख", vhigh: "५ लाखापेक्षा जास्त" },
    visit_csc: "जवळच्या पंचायत किंवा CSC केंद्राला भेट द्या", carry_docs: "आधार आणि बँक तपशील सोबत ठेवा", ask_reg: "मध्ये नोंदणीसाठी विचारा"
  },
  gu: {
    step1: "પગલું ૧", land_q: "તમારી પાસે કેટલી જમીન છે?",
    step2: "પગલું ૨", income_q: "તમારી વાર્ષિક આવક કેટલી છે?",
    matching: 'પ્રોફાઇલ તપાસી રહ્યા છીએ...', found: 'મેળ ખાતી યોજનાઓ!',
    apply: 'કેવી રીતે અરજી કરવી', steps: 'આગળના પગલાં', close: 'પાછા',
    guidance: 'આ માત્ર એક રમત નથી. તમે વાસ્તવિક જીવનમાં પણ આનો ઉપયોગ કરી શકો છો. - અર્થ ચાચા',
    apply_now: "અત્યારે જ અરજી કરો", return_list: "યાદી પર પાછા",
    land_options: { none: "જમીન નથી", small: "૨ હેક્ટરથી ઓછી", medium: "૨-૫ હેક્ટર", large: "૫ હેક્ટરથી વધુ" },
    income_options: { low: "૧ લાખથી ઓછી", mid: "૧-૩ લાખ", high: "૩-૫ લાખ", vhigh: "૫ લાખથી વધુ" },
    visit_csc: "નજીકની પંચાયત અથવા CSC સેન્ટરની મુલાકાત લો", carry_docs: "આધાર અને બેંકની વિગતો સાથે રાખો", ask_reg: "માં નોંધણી માટે પૂછો"
  },
  bn: {
    step1: "ধাপ ১", land_q: "আপনার কতটুকু জমি আছে?",
    step2: "ধাপ ২", income_q: "আপনার বার্ষিক আয় কত?",
    matching: 'প্রোফাইল যাচাই করা হচ্ছে...', found: 'উপযুক্ত প্রকল্প!',
    apply: 'কিভাবে আবেদন করবেন', steps: 'পরবর্তী পদক্ষেপ', close: 'ফিরে যান',
    guidance: 'এটি শুধু একটি খেলা নয়। আপনি বাস্তব জীবনেও এটি ব্যবহার করতে পারেন। - অর্থ চাচা',
    apply_now: "এখনই আবেদন করুন", return_list: "তালিকায় ফিরুন",
    land_options: { none: "জমি নেই", small: "২ হেক্টরের কম", medium: "২-৫ হেক্টর", large: "৫ হেক্টরের বেশি" },
    income_options: { low: "১ লাখের কম", mid: "১-৩ লাখ", high: "৩-৫ লাখ", vhigh: "৫ লাখের বেশি" },
    visit_csc: "নিকটস্থ পঞ্চায়েত বা CSC কেন্দ্রে যান", carry_docs: "আধার ও ব্যাংক বিবরণী সাথে রাখুন", ask_reg: "এ নিবন্ধনের জন্য বলুন"
  },
  te: {
    step1: "దశ 1", land_q: "మీకు ఎంత భూమి ఉంది?",
    step2: "దశ 2", income_q: "మీ వార్షిక ఆదాయం ఎంత?",
    matching: 'ప్రొఫైల్ తనిఖీ చేస్తోంది...', found: 'సరిపోయే పథకాలు!',
    apply: 'ఎలా దరఖాస్తు చేయాలి', steps: 'తదుపరి దశలు', close: 'వెనుకకు',
    guidance: 'ఇది కేవలం ఆట మాత్రమే కాదు. మీరు దీన్ని నిజ జీవితంలో కూడా ఉపయోగించవచ్చు. - అర్థా చాచా',
    apply_now: "ఇప్పుడే దరఖాస్తు చేయండి", return_list: "తిరిగి జాబితాకు",
    land_options: { none: "భూమి లేదు", small: "2 హెక్టార్ల కంటే తక్కువ", medium: "2-5 హెక్టార్లు", large: "5 హెక్టార్ల కంటే ఎక్కువ" },
    income_options: { low: "1 లక్ష కంటే తక్కువ", mid: "1-3 లక్షలు", high: "3-5 లక్షలు", vhigh: "5 లక్షల కంటే ఎక్కువ" },
    visit_csc: "సమీపంలోని పంచాయతీ లేదా CSC కేంద్రాన్ని సందర్శించండి", carry_docs: "ఆధార్ మరియు బ్యాంకు వివరాలను తీసుకెళ్లండి", ask_reg: "లో నమోదు కోసం అడగండి"
  },
  ta: {
    step1: "படி 1", land_q: "உங்களிடம் எவ்வளவு நிலம் உள்ளது?",
    step2: "படி 2", income_q: "உங்கள் ஆண்டு வருமானம் எவ்வளவு?",
    matching: 'சுயவிவரம் சரிபார்க்கப்படுகிறது...', found: 'பொருந்தும் திட்டங்கள்!',
    apply: 'விண்ணப்பிப்பது எப்படி', steps: 'அடுத்த படிகள்', close: 'பின்னால்',
    guidance: 'இது ஒரு விளையாட்டு மட்டுமல்ல. நீங்கள் நிஜ வாழ்க்கையிலும் இதைப் பயன்படுத்தலாம். - அர்த்தா சாச்சா',
    apply_now: "இப்போது விண்ணப்பிக்கவும்", return_list: "பட்டியலுக்குத் திரும்பு",
    land_options: { none: "நிலம் இல்லை", small: "2 ஹெக்டேருக்கும் குறைவாக", medium: "2-5 ஹெக்டேர்", large: "5 ஹெக்டேருக்கும் அதிகமாக" },
    income_options: { low: "1 லட்சத்திற்கும் குறைவாக", mid: "1-3 லட்சம்", high: "3-5 லட்சம்", vhigh: "5 லட்சத்திற்கும் அதிகமாக" },
    visit_csc: "அருகிலுள்ள பஞ்சாயத்து அல்லது CSC மையத்திற்குச் செல்லவும்", carry_docs: "ஆதார் மற்றும் வங்கி விவரங்களை எடுத்துச் செல்லவும்", ask_reg: "பதிவு செய்யக் கேட்கவும்"
  },
  kn: {
    step1: "ಹಂತ 1", land_q: "ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಜಮೀನು ಇದೆ?",
    step2: "ಹಂತ 2", income_q: "ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯ ಎಷ್ಟು?",
    matching: 'ಪ್ರೊಫೈಲ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...', found: 'ಹೊಂದುವ ಯೋಜನೆಗಳು!',
    apply: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ', steps: 'ಮುಂದಿನ ಹಂತಗಳು', close: 'ಹಿಂದಕ್ಕೆ',
    guidance: 'ಇದು ಕೇವಲ ಆಟವಲ್ಲ. ನೀವು ಇದನ್ನು ನಿಜ ಜೀವನದಲ್ಲೂ ಬಳಸಬಹುದು. - ಅರ್ಥಾ ಚಾಚಾ',
    apply_now: "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", return_list: "ಮರಳಿ ಪಟ್ಟಿಗೆ",
    land_options: { none: "ಜಮೀನು ಇಲ್ಲ", small: "2 ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಕಡಿಮೆ", medium: "2-5 ಹೆಕ್ಟೇರ್", large: "5 ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಹೆಚ್ಚು" },
    income_options: { low: "1 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ", mid: "1-3 ಲಕ್ಷ", high: "3-5 ಲಕ್ಷ", vhigh: "5 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು" },
    visit_csc: "ಹತ್ತಿರದ ಪಂಚಾಯತ್ ಅಥವಾ CSC ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ", carry_docs: "ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ತನ್ನಿ", ask_reg: "ನಲ್ಲಿ ನೋಂದಣಿಗೆ ಕೇಳಿ"
  },
  bh: {
    step1: "कदम १", land_q: "राउर जमीन केतना बा?",
    step2: "कदम २", income_q: "राउर सालाना आमदनी केतना बा?",
    matching: 'प्रोफाइल चेक होता...', found: 'योग्य योजना!',
    apply: 'आवेदन कइसे करीं', steps: 'अगला कदम', close: 'पीछे',
    guidance: 'ई खाली गेम ना ह। रउआ असली जिनगी में भी एकर इस्तेमाल कर सकेनी। - अर्था चाचा',
    apply_now: "अभी आवेदन करीं", return_list: "वापस लिस्ट पर",
    land_options: { none: "जमीन नईखे", small: "२ हेक्टेयर से कम", medium: "२-५ हेक्टेयर", large: "५ हेक्टेयर से जादे" },
    income_options: { low: "१ लाख से कम", mid: "१-३ लाख", high: "३-५ लाख", vhigh: "५ लाख से जादे" },
    visit_csc: "नगीचे के पंचायत भा CSC सेंटर जाईं", carry_docs: "आधार कार्ड आ बैंक पासबुक साथे राखीं", ask_reg: "खाती रजिस्ट्रेशन मांगीं"
  }
};

export default function YojanaConnect({ onClose }) {
  const { farmerProfile, setFarmerProfile, language } = useFinancials();
  const [step, setStep] = useState('land'); 
  const [matches, setMatches] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [localLand, setLocalLand] = useState(null);
  const [localIncome, setLocalIncome] = useState(null);

  const t = T[language] || T.en;

  useEffect(() => {
    if (step !== 'matching') return;
    const timer = setTimeout(() => {
      const result = schemesData.filter(s => {
        const cond = s.triggerConditions || {};
        const req = cond.requiredProfile || {};
        const prof = (farmerProfile.profession || farmerProfile.occupation || 'farmer').toLowerCase();
        if (req.profession && req.profession.toLowerCase() !== prof) return false;
        if (req.land && localLand !== req.land) return false;
        if (req.income && localIncome !== req.income) return false;
        return true;
      });
      setMatches(result.slice(0, 3));
      setStep('schemes');
    }, 1500);
    return () => clearTimeout(timer);
  }, [step, localLand, localIncome, farmerProfile]);

  const getSchemeName = (s) => {
    const key = `name${language.charAt(0).toUpperCase()}${language.slice(1)}`;
    return s[key] || s.nameHi || s.name;
  };

  const getSchemeDesc = (s) => {
    const key = `description${language.charAt(0).toUpperCase()}${language.slice(1)}`;
    return s[key] || s.descriptionHi || s.description;
  };

  return (
    <div className="fixed inset-0 z-[6000] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-3 font-sans">
      <div className="w-[92vw] max-w-[320px] bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col max-h-[85vh]">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-xl">🌍</div>
             <h2 className="text-white font-black text-xs tracking-tight uppercase">Yojana Connect</h2>
          </div>
          <button onClick={onClose} className="text-white/40 text-sm p-1">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
          {step === 'land' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="text-center">
                <p className="text-indigo-500 font-black text-[9px] uppercase tracking-widest mb-1">{t.step1}</p>
                <h3 className="text-base font-black text-slate-800 leading-tight">{t.land_q}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'None', label: t.land_options.none },
                  { id: '< 2 Hectares', label: t.land_options.small },
                  { id: '2-5 Hectares', label: t.land_options.medium },
                  { id: '> 5 Hectares', label: t.land_options.large }
                ].map(opt => (
                  <button key={opt.id} onClick={() => { setLocalLand(opt.id); setStep('income'); }}
                    className="w-full py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-700 active:bg-indigo-50 active:border-indigo-200 transition-all text-left px-5 uppercase tracking-wide">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'income' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="text-center">
                <p className="text-indigo-500 font-black text-[9px] uppercase tracking-widest mb-1">{t.step2}</p>
                <h3 className="text-base font-black text-slate-800 leading-tight">{t.income_q}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: '< 1 Lakh', label: t.income_options.low },
                  { id: '1-3 Lakhs', label: t.income_options.mid },
                  { id: '3-5 Lakhs', label: t.income_options.high },
                  { id: '> 5 Lakhs', label: t.income_options.vhigh }
                ].map(opt => (
                  <button key={opt.id} onClick={() => { setLocalIncome(opt.id); setStep('matching'); }}
                    className="w-full py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-700 active:bg-indigo-50 active:border-indigo-200 transition-all text-left px-5 uppercase tracking-wide">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'matching' && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
               <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
               <p className="text-slate-600 font-black text-[10px] animate-pulse uppercase tracking-widest">{t.matching}</p>
            </div>
          )}

          {step === 'schemes' && (
            <>
              <div className="text-center">
                <p className="text-indigo-500 font-black text-[9px] uppercase tracking-widest mb-0.5">{t.found}</p>
                <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none uppercase">
                   {t.found}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {matches.length > 0 ? matches.map(s => (
                  <div key={s.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl pt-1">🛡️</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-indigo-700 text-[11px] leading-tight uppercase mb-1">
                          {getSchemeName(s)}
                        </h4>
                        <p className="text-slate-500 font-bold text-[10px] leading-snug line-clamp-2">
                          {getSchemeDesc(s)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedScheme(s); setStep('apply'); }}
                      className="w-full py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black active:scale-95 transition-all shadow-md uppercase tracking-[0.2em]">
                      {t.apply_now} ➔
                    </button>
                  </div>
                )) : (
                  <div className="py-12 text-center text-slate-300 font-black text-[10px] uppercase tracking-widest">
                    No matches found
                  </div>
                )}
              </div>
            </>
          )}

          {step === 'apply' && selectedScheme && (
            <div className="flex flex-col gap-5 animate-in slide-in-from-right-4 duration-300">
               <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">📍</div>
                  <h3 className="text-base font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">{t.apply}</h3>
                  <p className="text-indigo-600 font-black text-[10px] uppercase tracking-widest leading-none">
                    {getSchemeName(selectedScheme)}
                  </p>
               </div>
               <div className="space-y-3">
                  <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.2em]">{t.steps}</p>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-3 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
                      <span className="w-5 h-5 shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-[10px]">1</span>
                      <p className="text-slate-800 font-bold text-[10px] leading-tight">{t.visit_csc}</p>
                    </div>
                    <div className="flex items-start gap-3 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
                      <span className="w-5 h-5 shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-[10px]">2</span>
                      <p className="text-slate-800 font-bold text-[10px] leading-tight">{t.carry_docs}</p>
                    </div>
                    <div className="flex items-start gap-3 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
                      <span className="w-5 h-5 shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-[10px]">3</span>
                      <div className="flex flex-col gap-1">
                        <p className="text-slate-800 font-bold text-[10px] leading-tight">{t.ask_reg}</p>
                        <p className="text-indigo-700 font-black text-[10px] italic leading-tight">{getSchemeName(selectedScheme)}</p>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="p-4 bg-amber-50 rounded-[2rem] flex items-start gap-3 border border-amber-100">
                  <span className="text-2xl flex-shrink-0 mt-1">👴</span>
                  <p className="text-amber-900 font-black italic text-[10px] leading-relaxed">
                    "{t.guidance}"
                  </p>
               </div>
               <button onClick={() => setStep('schemes')}
                  className="w-full py-2.5 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 active:scale-95 transition-all uppercase tracking-widest">
                  {t.return_list}
               </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100">
           <button onClick={onClose}
              className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] active:scale-95 transition-all shadow-xl tracking-[0.2em] uppercase">
              {t.close}
           </button>
        </div>
      </div>
    </div>
  );
}
