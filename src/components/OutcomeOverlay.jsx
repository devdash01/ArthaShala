import React, { useEffect } from 'react';

const T = {
  en: { 
    success: { title: 'Right Decision!', subtitle: 'Your Artha Score has increased' },
    warning: { title: 'Expensive Choice!', subtitle: 'Caution! Your debt and score are affected' }
  },
  hi: { 
    success: { title: 'सही निर्णय!', subtitle: 'आपका आर्थिक स्कोर बढ़ गया है' },
    warning: { title: 'महंगा सौदा!', subtitle: 'सावधान! आपका कर्ज और स्कोर प्रभावित हुआ है' }
  },
  mr: { 
    success: { title: 'योग्य निर्णय!', subtitle: 'तुमचा अर्थ स्कोर वाढला आहे' },
    warning: { title: 'महागडा व्यवहार!', subtitle: 'सावधान! तुमचे कर्ज आणि स्कोरवर परिणाम झाला आहे' }
  },
  gu: { 
    success: { title: 'સાચો નિર્ણય!', subtitle: 'તમારો અર્થ સ્કોર વધ્યો છે' },
    warning: { title: 'મોંઘો સોદો!', subtitle: 'સાવધાન! તમારા દેવા અને સ્કોર પર અસર થઈ છે' }
  },
  bn: { 
    success: { title: 'সঠিক সিদ্ধান্ত!', subtitle: 'আপনার অর্থ স্কোর বৃদ্ধি পেয়েছে' },
    warning: { title: 'ব্যয়বহুল পছন্দ!', subtitle: 'সাবধান! আপনার ঋণ এবং স্কোর প্রভাবিত হয়েছে' }
  },
  te: { 
    success: { title: 'సరైన నిర్ణయం!', subtitle: 'మీ అర్థా స్కోర్ పెరిగింది' },
    warning: { title: 'ఖరీదైన ఎంపిక!', subtitle: 'జాగ్రత్త! మీ అప్పు మరియు స్కోరు ప్రభావితమయ్యాయి' }
  },
  ta: { 
    success: { title: 'சரியான முடிவு!', subtitle: 'உங்கள் அர்த்தா ஸ்கோர் அதிகரித்துள்ளது' },
    warning: { title: 'விலையுயர்ந்த தேர்வு!', subtitle: 'எச்சரிக்கை! உங்கள் கடன் மற்றும் மதிப்பெண் பாதிக்கப்பட்டுள்ளது' }
  },
  kn: { 
    success: { title: 'ಸರಿಯಾದ ನಿರ್ಧಾರ!', subtitle: 'ನಿಮ್ಮ ಅರ್ಥಾ ಸ್ಕೋರ್ ಹೆಚ್ಚಾಗಿದೆ' },
    warning: { title: 'ದುಬಾರಿ ಆಯ್ಕೆ!', subtitle: 'ಎಚ್ಚರಿಕೆ! ನಿಮ್ಮ ಸಾಲ ಮತ್ತು ಸ್ಕೋರ್ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರಿದೆ' }
  },
  bh: { 
    success: { title: 'सही फैसला!', subtitle: 'राउर आर्थिक स्कोर बढ़ गइल बा' },
    warning: { title: 'महंगा सौदा!', subtitle: 'सावधान! राउर कर्जा आ स्कोर पर असर पड़ल बा' }
  }
};

const OutcomeOverlay = ({ type, scoreChange, language, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const t = T[language] || T.en;
  const isPositive = type === 'success';

  const config = {
    success: {
      title: t.success.title,
      subtitle: t.success.subtitle,
      icon: '✅',
      animClass: 'animate-success-pop'
    },
    warning: {
      title: t.warning.title,
      subtitle: t.warning.subtitle,
      icon: '⚠️',
      animClass: 'animate-failure-shake'
    }
  };

  const { title, subtitle, icon, animClass } = config[type];

  return (
    <div className={`absolute inset-0 z-[2500] flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in duration-500 overflow-hidden ${type === 'success' ? 'bg-green-500/40' : 'bg-red-500/40'}`}>
      <button onClick={onComplete} className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl z-[2510] active:scale-90">✕</button>

      <div className={`flex flex-col items-center text-center p-6 w-[260px] rounded-[2.5rem] bg-slate-950 shadow-2xl border-2 ${type === 'success' ? 'border-green-400' : 'border-red-400'} ${animClass}`}>
        <div className="text-5xl mb-4 drop-shadow-2xl">{icon}</div>
        <h2 className={`text-[17px] font-black italic tracking-tighter mb-1.5 uppercase break-words leading-tight ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {title}
        </h2>
        <p className="text-[10px] font-black text-white/70 leading-snug mb-5 uppercase tracking-wider break-words">
          {subtitle}
        </p>
        <div className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
          <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em] shrink-0">Artha Score</span>
          <span className={`text-xl font-black tabular-nums ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{scoreChange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OutcomeOverlay;
