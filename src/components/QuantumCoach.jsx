import { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

export default function QuantumCoach({ language, finances, onRunSim }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Generate initial contextual advice
    const getAdvice = () => {
      const adviceMap = {
        hi: {
          debt: "कर्ज बहुत ज्यादा है! ब्याज कम करने के लिए SHG केंद्र जाएँ।",
          surplus: "पैसा बचा है! अच्छे रिटर्न के लिए बैंक में FD कराएं।",
          good: "संतुलन अच्छा है। फसल की स्थिति देखने के लिए खेत पर जाएँ।"
        },
        en: {
          debt: "High Debt Detected. Visit the SHG Center to consolidate at lower interest.",
          surplus: "Surplus Cash! Consider a Fixed Deposit (FD) at the Bank for better returns.",
          good: "Good balance. Visit the Farm to check on your crop status."
        },
        mr: {
          debt: "जास्त कर्ज आढळले! व्याज कमी करण्यासाठी SHG केंद्राला भेट द्या.",
          surplus: "शिल्लक रोख! चांगल्या परताव्यासाठी बँकेत FD चा विचार करा.",
          good: "उत्तम शिल्लक. पिकाची स्थिती पाहण्यासाठी शेतात जा."
        },
        gu: {
          debt: "વધારે દેવું જણાયેલ છે! વ્યાજ ઘટાડવા માટે SHG કેન્દ્રની મુલાકાત લો.",
          surplus: "વધારાની રોકડ! સારા વળતર માટે બેંકમાં FD કરવાનું વિચારો.",
          good: "સારું સંતુલન. પાકની સ્થિતિ જોવા માટે ખેતરે જાઓ."
        },
        ta: {
          debt: "கடன் அதிகமாக உள்ளது! வட்டியை குறைக்க SHG மையத்திற்குச் செல்லுங்கள்.",
          surplus: "கூடுதல் பணம்! நல்ல முதலீட்டுக்காக வங்கியில் FD செய்யுங்கள்.",
          good: "நல்ல சமநிலை. பயிரின் நிலையை பார்க்க பண்ணைக்குச் செல்லுங்கள்."
        },
        te: {
          debt: "అప్పు ఎక్కువగా ఉంది! వడ్డీ తగ్గించడానికి SHG కేంద్రానికి వెళ్ళండి.",
          surplus: "అదనపు నగదు! మంచి లాభాల కోసం బ్యాంకులో FD రిజిస్టర్ చేయండి.",
          good: "మంచి క్రమశిక్షణ. పంట పరిస్థితి చూడటానికి పొలానికి వెళ్ళండి."
        },
        kn: {
          debt: "ಹೆಚ್ಚಿನ ಸಾಲ ಕಂಡುಬಂದಿದೆ! ಬಡ್ಡಿ ಕಡಿಮೆ ಮಾಡಲು SHG ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
          surplus: "ಹೆಚ್ಚುವರಿ ಹಣ! ಉತ್ತಮ ಆದಾಯಕ್ಕಾಗಿ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ FD ಪರಿಗಣಿಸಿ.",
          good: "ಉತ್ತಮ ಸಮತೋಲನ. ಬೆಳೆ ಸ್ಥಿತಿ ನೋಡಲು ಹೊಲಕ್ಕೆ ಭೇಟಿ ನೀಡಿ."
        },
        bn: {
          debt: "অতিরিক্ত ঋণ ধরা পড়েছে! সুদের হার কমাতে SHG কেন্দ্রে যান।",
          surplus: "বাড়তি টাকা! ভালো আয়ের জন্য ব্যাংকে FD করার কথা ভাবুন।",
          good: "ভালো ব্যালেন্স। ফসলের অবস্থা দেখতে খামারে যান।"
        },
        bh: {
          debt: "कर्जा ढेर बा! ब्याज कम करे खातिर SHG केंद्र जाईं।",
          surplus: "पैसा बचल बा! नीमन फायदा खातिर बैंक में FD कराईं।",
          good: "बैलेंस ठीक बा। फसल देखे खातिर खेत पे जाईं।"
        }
      };

      const langAdvice = adviceMap[language] || adviceMap.en;
      if (finances.loans > 5000) return langAdvice.debt;
      if (finances.cash > 8000) return langAdvice.surplus;
      return langAdvice.good;
    };
    
    setMessages([{
      id: 1,
      text: getAdvice(),
      sender: 'coach',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, [finances, language]);

  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden animate-fade-in font-sans">
      <header className="p-4 bg-slate-900 text-white flex items-center gap-3">
         <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xl">🤖</div>
         <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest italic leading-tight">Artha Advisor</h3>
            <p className="text-[8px] font-black text-indigo-400 tracking-widest leading-none">Quantum Core Active</p>
         </div>
      </header>

      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar bg-slate-50/50">
        {messages.map(msg => (
          <div key={msg.id} className="flex flex-col gap-1 max-w-[85%] self-start">
             <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                <p className="text-[12px] font-black text-slate-700 leading-snug italic">
                   "{msg.text}"
                </p>
             </div>
             <span className="text-[7px] font-black text-slate-400 uppercase ml-2">{msg.time}</span>
          </div>
        ))}
        
        <div className="mt-2 flex flex-wrap gap-2">
           <button onClick={onRunSim} className="px-4 py-2 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-md">
             {language === 'hi' ? 'भविष्य देखें' : 'Run Projection'}
           </button>
           <button className="px-4 py-2 bg-white text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100 active:scale-95 transition-all shadow-sm">
             {language === 'hi' ? 'बचत कैसे करें?' : 'How to Save?'}
           </button>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
         <div className="flex-1 h-10 bg-slate-50 rounded-full border border-slate-100 flex items-center px-4">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
              {language === 'hi' ? 'अगली घटना का इंतज़ार करें...' : 'Wait for next event...'}
            </span>
         </div>
         <button className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200 text-white active:scale-90 transition-all">
            <span className="text-xl">🎙️</span>
         </button>
      </div>
    </div>
  );
}
