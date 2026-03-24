import React, { useEffect, useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

const ArthaScoreDetails = ({ currentScore, walletBalance, language, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getZone = (score, lang) => {
    const t_zones = {
      en: { 
        high: { status: 'Village Pride', consequence: 'Banks trust you fully; you will get loans easily.' },
        mid: { status: 'Be Careful', consequence: 'Banks are cautious with you. Pay on time.' },
        low: { status: 'Debt Trap', consequence: 'Banks do not trust you. Debt could grow.' }
      },
      hi: { 
        high: { status: 'गाँव का गौरव', consequence: 'बैंक आप पर पूरा भरोसा करते हैं। आपको लोन आसानी से मिलेगा।' },
        mid: { status: 'सतर्क रहें', consequence: 'बैंक आपके साथ सावधानी बरत रहे हैं। समय पर भुगतान करें।' },
        low: { status: 'साहूकार का जाल', consequence: 'बैंक आप पर भरोसा नहीं कर रहे हैं। कर्ज का बोझ बढ़ सकता है।' }
      },
      mr: { 
        high: { status: 'गावाचा गौरव', consequence: 'बँकांचा तुमच्यावर पूर्ण विश्वास आहे। कर्ज सहज मिळेल।' },
        mid: { status: 'सतर्क रहा', consequence: 'बँका तुमच्या बाबतीत सावध आहेत। वेळेवर पैसे भरा।' },
        low: { status: 'सावकाराचे जाळे', consequence: 'बँकांचा तुमच्यावर विश्वास नाही। कर्जाचा बोजा वाढू शकतो।' }
      },
      gu: { 
        high: { status: 'ગામનું ગૌરવ', consequence: 'બેંકો તમારા પર પૂરો વિશ્વાસ રાખે છે। લોન સરળતાથી મળશે।' },
        mid: { status: 'સતર્ક રહો', consequence: 'બેંકો તમારા માટે સાવચેત છે। સમયસર ચૂકવણી કરો।' },
        low: { status: 'શાહુકારની જાળ', consequence: 'બેંકો તમારા પર વિશ્વાસ નથી કરતી। દેવું વધી શકે છે।' }
      },
      bn: { 
        high: { status: 'গ্রামের গৌরব', consequence: 'ব্যাংকগুলি আপনার ওপর পূর্ণ ভরসা করে। ঋণ সহজে পাবেন।' },
        mid: { status: 'সতর্ক থাকুন', consequence: 'ব্যাংকগুলি আপনার প্রতি সতর্ক। সময়মতো পরিশোধ করুন।' },
        low: { status: 'মহাজনের জাল', consequence: 'ব্যাংকগুলি আপনার ওপর ভরসা করছে না। ঋণের বোঝা বাড়তে পারে।' }
      },
      te: { 
        high: { status: 'గ్రామ గర్వం', consequence: 'బ్యాంకులు మిమ్మల్ని పూర్తిగా నమ్ముతాయి; మీకు త్వరగా లోన్లు వస్తాయి.' },
        mid: { status: 'జాగ్రత్తగా ఉండండి', consequence: 'బ్యాంకులు మీ పట్ల జాగ్రత్తగా ఉన్నాయి. సకాలంలో చెల్లించండి.' },
        low: { status: 'అప్పుల ఊబి', consequence: 'బ్యాంకులు మిమ్మల్ని నమ్మడం లేదు. అప్పు పెరిగే అవకాశం ఉంది.' }
      },
      ta: { 
        high: { status: 'கிராமத்தின் பெருமை', consequence: 'வங்கிகள் உங்களை முழுமையாக நம்புகின்றன; உங்களுக்கு எளிதாக கடன் கிடைக்கும்.' },
        mid: { status: 'கவனமாக இருங்கள்', consequence: 'வங்கிகள் உங்களிடம் எச்சரிக்கையாக உள்ளன. சரியான நேரத்தில் பணம் செலுத்துங்கள்.' },
        low: { status: 'கடன் வலை', consequence: 'வங்கிகள் உங்களை நம்பவில்லை. கடன் அதிகரிக்கலாம்.' }
      },
      kn: { 
        high: { status: 'ಗ್ರಾಮದ ಹೆಮ್ಮೆ', consequence: 'ಬ್ಯಾಂಕುಗಳು ನಿಮ್ಮನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಂಬುತ್ತವೆ; ನಿಮಗೆ ಸುಲಭವಾಗಿ ಸಾಲ ಸಿಗುತ್ತದೆ.' },
        mid: { status: 'ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ', consequence: 'ಬ್ಯಾಂಕುಗಳು ನಿಮ್ಮ ಬಗ್ಗೆ ಎಚ್ಚರವಾಗಿವೆ. ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಪಾವತಿಸಿ.' },
        low: { status: 'ಸಾಲದ ಸುಳಿ', consequence: 'ಬ್ಯಾಂಕುಗಳು ನಿಮ್ಮನ್ನು ನಂಬುತ್ತಿಲ್ಲ. ಸಾಲ ಹೆಚ್ಚಾಗಬಹುದು.' }
      },
      bh: { 
        high: { status: 'गाँव के शान', consequence: 'बैंक राउर पूरा भरोसा करेला। राउर लोन आसानी से मिल जाई।' },
        mid: { status: 'सावधान रहीं', consequence: 'बैंक राउर साथे सावधानी बरतत बा। समय पर पैसा भरल करीं।' },
        low: { status: 'साहूकार के जाल', consequence: 'बैंक राउर भरोसा नईखे करत। राउर कर्जा बढ़ सकेला।' }
      }
    };

    const zoneT = t_zones[lang] || t_zones.en;

    if (score >= 71) return { color: 'from-green-600 to-lime-500', ...zoneT.high };
    if (score >= 41) return { color: 'from-yellow-500 to-orange-400', ...zoneT.mid };
    return { color: 'from-red-600 to-orange-500', ...zoneT.low };
  };

  const zoneInfo = getZone(currentScore, language);

  const T_LABELS = {
    hi: { boost: 'स्कोर बढ़ाएं', lower: 'स्कोर घटाएं', bank: 'बैंक लेनदेन', crop: 'फसल बीमा', health: 'आयुष्मान भारत', debt: 'साहूकार कर्ज', late: 'किश्त देरी', otp: 'OTP शेयर', footer: 'आपका आर्थिक स्वास्थ्य, भारत की प्रगति' },
    en: { boost: 'Boost Score', lower: 'Lower Score', bank: 'Bank Deals', crop: 'Crop Insurance', health: 'Ayushman Card', debt: 'Debt Trap', late: 'Late Pays', otp: 'Sharing OTP', footer: 'Your Financial Health, India\'s Progress' },
    mr: { boost: 'स्कोर वाढवा', lower: 'स्कोर कमी करा', bank: 'बँक व्यवहार', crop: 'पीक विमा', health: 'आयुष्मान भारत', debt: 'सावकाराचे कर्ज', late: 'हप्ता उशीर', otp: 'OTP शेअर', footer: 'तुमचे आर्थिक आरोग्य, भारताची प्रगती' },
    gu: { boost: 'સ્કોર વધારો', lower: 'સ્કોર ઘટાડો', bank: 'બેંક વ્યવહાર', crop: 'પાક વીમો', health: 'આયુષ્માન ભારત', debt: 'શાહુકારનું દેવું', late: 'હપ્તામાં વિલંબ', otp: 'OTP શેર', footer: 'તમારું આર્થિક સ્વાસ્થ્ય, ભારતની પ્રગતિ' },
    bn: { boost: 'স্কোর বাড়ান', lower: 'স্কোর কমান', bank: 'ব্যাংক লেনদেন', crop: 'ফসল বিমা', health: 'আয়ুষ্মান ভারত', debt: 'মহাজনের ঋণ', late: 'কিস্তিতে দেরি', otp: 'OTP শেয়ার', footer: 'আপনার আর্থিক স্বাস্থ্য, ভারতের প্রগতি' },
    te: { boost: 'స్కోర్ పెంచుకోండి', lower: 'స్కోర్ తగ్గించుకోండి', bank: 'బ్యాంకు లావాదేవీలు', crop: 'పంట భీమా', health: 'ఆయుష్మాన్ భారత్', debt: 'వడ్డీ వ్యాపారి అప్పు', late: 'వాయిదా ఆలస్యం', otp: 'OTP షేరింగ్', footer: 'మీ ఆర్థిక ఆరోగ్యం, భారత ప్రగతి' },
    ta: { boost: 'ஸ்கோரை உயர்த்தவும்', lower: 'ஸ்கோரை குறைக்கவும்', bank: 'வங்கி பரிவர்த்தனை', crop: 'பயிர் காப்பீடு', health: 'ஆயுஷ்மான் பாரத்', debt: 'கந்துவட்டி கடன்', late: 'தவணை தாமதம்', otp: 'OTP பகிர்தல்', footer: 'உங்கள் பொருளாதார ஆரோக்கியம், இந்தியாவின் முன்னேற்றம்' },
    kn: { boost: 'ಸ್ಕೋರ್ ಹೆಚ್ಚಿಸಿ', lower: 'ಸ್ಕೋರ್ ಕಡಿಮೆಮಾಡಿ', bank: 'ಬ್ಯಾಂಕ್ ವಹಿವಾಟು', crop: 'ಬೆಳೆ ವಿಮೆ', health: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್', debt: 'ಸಾಲಗಾರನ ಸಾಲ', late: 'ಕಂತು ವಿಳಂಬ', otp: 'OTP ಹಂಚಿಕೆ', footer: 'ನಿಮ್ಮ ಆರ್ಥಿಕ ಆರೋಗ್ಯ, ಭಾರತದ ಪ್ರಗತಿ' },
    bh: { boost: 'स्कोर बढ़ाएं', lower: 'स्कोर घटाएं', bank: 'बैंक लेनदेन', crop: 'फसल बीमा', health: 'आयुष्मान भारत', debt: 'साहूकार कर्ज', late: 'किश्त देरी', otp: 'OTP शेयर', footer: 'राउर आर्थिक सेहत, भारत के प्रगति' }
  };

  const labels = T_LABELS[language] || T_LABELS.en;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className={`fixed inset-0 z-[5000] flex flex-col justify-end transition-all duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={handleClose} />
      <div className={`relative w-full max-w-[320px] mx-auto bg-slate-950 shadow-2xl border-t border-white/10 rounded-t-[3rem] p-4 flex flex-col transition-transform duration-500 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ height: '80vh' }}>
        <button onClick={handleClose} className="absolute top-6 right-6 text-white/30 hover:text-white text-3xl font-light p-2 transition-colors z-[6000]">✕</button>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pt-6 pb-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative flex flex-col items-center">
              <div className="relative w-48 h-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 border-[12px] border-white/5 rounded-full" />
                <div className={`absolute top-0 left-0 w-48 h-48 border-[12px] border-transparent rounded-full bg-gradient-to-r ${zoneInfo.color} transition-all duration-1000`} style={{ clipPath: `polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)`, transform: `rotate(${(currentScore / 100) * 180 - 180}deg)`, transformOrigin: 'center' }} />
              </div>
              <div className="absolute top-8 flex flex-col items-center">
                <span className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl">{currentScore}</span>
              </div>
            </div>
            <div>
              <h2 className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${zoneInfo.color} tracking-tight leading-tight uppercase`}>{zoneInfo.status}</h2>
            </div>
            <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 shadow-inner">
              <p className="text-[12px] text-white/80 font-black leading-snug italic uppercase tracking-wider">{zoneInfo.consequence}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 w-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-green-400 font-black text-[10px] tracking-widest uppercase">{labels.boost}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 p-2 rounded-xl truncate"><span className="text-sm">🏦</span> {labels.bank}</div>
                  <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 p-2 rounded-xl truncate"><span className="text-sm">🛡️</span> {labels.crop}</div>
                  <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 p-2 rounded-xl truncate col-span-2"><span className="text-sm">🩺</span> {labels.health}</div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-red-400 font-black text-[10px] tracking-widest uppercase">{labels.lower}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 p-2 rounded-xl truncate"><span className="text-sm">🧛</span> {labels.debt}</div>
                  <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 p-2 rounded-xl truncate"><span className="text-sm">📉</span> {labels.late}</div>
                  <div className="flex items-center gap-2 text-white/60 text-[9px] font-black bg-white/5 p-2 rounded-xl truncate col-span-2"><span className="text-sm">🛑</span> {labels.otp}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 text-center text-white/20 text-[9px] font-black tracking-[0.3em] uppercase shrink-0 border-t border-white/5">{labels.footer}</div>
      </div>
    </div>
  );
};

export default ArthaScoreDetails;
