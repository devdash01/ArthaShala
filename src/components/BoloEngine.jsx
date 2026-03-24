import React, { useState, useEffect, useCallback } from 'react';
import { useFinancials } from '../context/FinancialContext.jsx';

/**
 * BOLO VOICE ENGINE
 * Implements "Artha Chacha" as a voice-driven tutor and router.
 */
export default function BoloEngine({ onCommand, activeModal }) {
  const { 
    language, 
    walletBalance, 
    sahukarDebt, 
    bankDebt, 
    arthaScore, 
    currentMonth,
    farmerProfile
  } = useFinancials();
  
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [chachaResponse, setChachaResponse] = useState('');
  const [preferredVoice, setPreferredVoice] = useState(null);

  // Mapping of app codes to BCP-47 locale codes
  const localeMap = {
    hi: 'hi-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
    gu: 'gu-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    kn: 'kn-IN',
    bh: 'hi-IN', // Fallback for Bhojpuri
    en: 'en-US'
  };

  const currentLocale = localeMap[language] || 'en-US';

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const inVoices = voices.filter(v => v.lang.includes(language) || v.lang.includes('IN'));
      
      const localMale = inVoices.find(v => 
        v.localService && (v.name.toLowerCase().includes('male') || v.name.includes('Hemant') || v.name.includes('Rishi'))
      );
      const anyLocalIn = inVoices.find(v => v.localService);
      const anyIn = inVoices[0] || voices.find(v => v.lang.includes(language) || v.lang.includes('IN'));
      
      const finalVoice = localMale || anyLocalIn || anyIn;
      if (finalVoice) setPreferredVoice(finalVoice);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [language]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    window._recognition = recognition; 
    recognition.lang = currentLocale;
    recognition.continuous = false; // Stop after final result for cleaner UI
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('listening');
      setTranscript('');
      setChachaResponse('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
        else interimTranscript += event.results[i][0].transcript;
      }

      setTranscript(finalTranscript || interimTranscript);

      if (finalTranscript) {
        recognition.stop();
        processCommand(finalTranscript.toLowerCase());
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setStatus('idle');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processCommand = async (text) => {
    setIsThinking(true);
    setStatus('thinking');

    // Enhanced Contextual Logic
    setTimeout(() => {
      const input = text.toLowerCase();
      
      const getAIResponse = () => {
        // Navigation / Intent Recognition
        if (input.includes('panchayat') || input.includes('पंचायत') || input.includes('yojana') || input.includes('योजना')) {
          return { target: "panchayat", action: "open_node", spoken: language === 'hi' ? "पंचायत में सरकारी योजनाएं आपका इंतज़ार कर रही हैं। वहां जाकर अपना रजिस्ट्रेशन चेक करें।" : "Government schemes are waiting for you at the Panchayat. Please check your registration there." };
        }
        if (input.includes('bank') || input.includes('बैंक') || input.includes('loan') || input.includes('कर्ज') || input.includes('अउवा') || input.includes('लोन')) {
          if (bankDebt > 0 || sahukarDebt > 0) {
            const total = bankDebt + sahukarDebt;
            return { spoken: language === 'hi' ? `आपका कुल कर्ज ₹${total} है। इसमें से ₹${sahukarDebt} साहूकार का है, जिसे जल्दी चुकाना चाहिए।` : `Your total debt is ₹${total}. You owe ₹${sahukarDebt} to the moneylender; try to repay that first.` };
          }
          return { target: "bank", action: "open_node", spoken: language === 'hi' ? "बैंक चलना सबसे सुरक्षित है। वहां आपको कम ब्याज पर लोन मिल सकता है।" : "The bank is the safest place. You can get loans at much lower interest rates there." };
        }
        if (input.includes('score') || input.includes('स्कोर') || input.includes('पॉइंट')) {
          let advice = "";
          if (arthaScore < 40) advice = language === 'hi' ? "आपका स्कोर कम है। साहूकार से बचें और समय पर कर्ज चुकाएं।" : "Your score is low. Avoid moneylenders and repay loans on time.";
          else advice = language === 'hi' ? "आपका स्कोर अच्छा है! इसे बनाए रखने के लिए बैंक से लेनदेन करते रहें।" : "Your score is good! Keep using formal banking to maintain it.";
          return { spoken: (language === 'hi' ? `आपका अर्था स्कोर ${arthaScore} है। ` : `Your Artha Score is ${arthaScore}. `) + advice };
        }
        if (input.includes('paisa') || input.includes('money') || input.includes('बैलेंस') || input.includes('रुपया') || input.includes('पइसा')) {
          return { spoken: language === 'hi' ? `आपकी जेब में इस वक्त ₹${walletBalance} हैं। संभल कर खर्च करें!` : `You have ₹${walletBalance} in your wallet right now. Spend wisely!` };
        }
        if (input.includes('kheti') || input.includes('खेती') || input.includes('seeds') || input.includes('बीज')) {
          return { spoken: language === 'hi' ? "खेती के लिए हमेशा हाइब्रिड बीज चुनें। वे शुरू में महंगे हैं पर फसल अच्छी देते हैं।" : "Always choose hybrid seeds for farming. They might be costly initially but provide better yields." };
        }

        // Generic Rural Wisdom / AI fallback
        const fallbacks = {
          hi: ["साहूकार का कर्ज मीठा जहर है, इससे बचें।", "बैंक का KCC लोन सिर्फ 4% पर मिलता है, वही लें।", "हर महीने थोड़ी बचत जरूर करें, मुसीबत में काम आएगी।", "बिना सोचे-समझे किसी कागज़ पर अंगूठा न लगाएं।"],
          en: ["Moneylender's debt is like slow poison, avoid it.", "Bank's KCC loan is available at just 4%, take that.", "Save a little every month, it will help in emergencies.", "Never give your thumbprint or OTP without understanding fully."],
          mr: ["सावकाराचे कर्ज म्हणजे गोड विष आहे, त्यापासून सावध राहा.", "बँकेचे KCC कर्ज फक्त ४% वर मिळते, तेच घ्या.", "दरमहा थोडी बचत करा, संकटकाळात तीच कामाला येईल.", "पूर्ण माहिती घेतल्याशिवाय कुठेही अंगठा लावू नका."],
          gu: ["શાહુકારનું કરજ મીઠું ઝેર છે, તેનાથી બચો.", "બેંકની KCC લોન ફક્ત 4% પર મળે છે, તે જ લો.", "દર મહિને થોડી બચત કરો, મુસીબતમાં કામ આવશે.", "પૂરી જાણકારી વગર ક્યાંય અંગૂઠો ન લગાવશો."],
          ta: ["கந்துவட்டி கடன் ஒரு மெதுவான விஷம், அதைத் தவிர்க்கவும்.", "வங்கியின் KCC கடன் வெறும் 4% வட்டியில் கிடைக்கிறது, அதையே பெறுங்கள்.", "ஒவ்வொரு மாதமும் கொஞ்சம் சேமியுங்கள், அது அவசர காலத்தில் உதவும்.", "முழுமையாகப் புரியாமல் எங்கும் கைரேகை வைக்காதீர்கள்."],
          te: ["వడ్డీ వ్యాపారి అప్పు తీపి విషం వంటిది, దానికి దూరంగా ఉండండి.", "బ్యాంకు KCC రుణం కేవలం 4% వడ్డీకే లభిస్తుంది, దాన్నే తీసుకోండి.", "ప్రతి నెలా కొంత పొదుపు చేయండి, కష్టకాలంలో తోడుంటుంది.", "పూర్తిగా అవగాహన లేకుండా ఎక్కడా వేలిముద్ర వేయకండి."],
          kn: ["ಲೇವಾದೇವಿಗಾರರ ಸಾಲ ಸಿಹಿಯಾದ ವಿಷ, ಅದರಿಂದ ದೂರವಿರಿ.", "ಬ್ಯಾಂಕ್‌ನ KCC ಸಾಲ ಕೇವಲ 4% ಬಡ್ಡಿಯಲ್ಲಿ ಸಿಗುತ್ತದೆ, ಅದನ್ನೇ ಪಡೆಯಿರಿ.", "ಪ್ರತಿ ತಿಂಗಳು ಸ್ವಲ್ಪ ಉಳಿತಾಯ ಮಾಡಿ, ಸಂಕಷ್ಟದಲ್ಲಿ ನೆರವಾಗುತ್ತದೆ.", "ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ಇಲ್ಲದೆ ಎಲ್ಲಿಯೂ ಹೆಬ್ಬೆಟ್ಟು ಒತ್ತಬೇಡಿ."],
          bn: ["মহাজনের ঋণ মিষ্টি বিষের মতো, এটি এড়িয়ে চলুন।", "ব্যাংকের KCC ঋণ মাত্র ৪% সুদে পাওয়া যায়, সেটিই নিন।", "প্রতি মাসে অল্প অল্প করে সঞ্চয় করুন, বিপদে কাজে লাগবে।", "ভালোভাবে না বুঝে কোথাও বুড়ো আঙুলের ছাপ দেবেন না।"],
          bh: ["महाजन के कर्जा मीठ जहर ह, एहसे बचीं।", "बैंक के KCC कर्जा खाली 4% पे मिलेला, उहे लीं।", "हर महीना तनी-मनी बचत जरूर करीं, मुसीबत में काम आई।", "बिना सोझ-समझ के कवनो कागज पे अंगूठा ना लगाईं।"]
        };

        const list = fallbacks[language] || fallbacks.en;
        return { spoken: list[Math.floor(Math.random() * list.length)] };
      };

      const result = getAIResponse();
      setIsThinking(false);
      setChachaResponse(result.spoken);
      
      // Native Speech Synthesis
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(result.spoken);
        utterance.lang = currentLocale;
        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = 0.85;
        utterance.pitch = preferredVoice?.name.toLowerCase().includes('male') ? 0.95 : 0.85;
        
        utterance.onstart = () => setStatus('speaking');
        utterance.onend = () => {
          setStatus('idle');
          if (result.target) onCommand(result.target);
        };
        synth.speak(utterance);
      }
    }, 1000);
  };

  const toggleListening = () => {
    if (status === 'listening') {
      window._recognition?.stop();
      setStatus('idle');
    } else {
      startListening();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[6000] pointer-events-none flex flex-col items-center pb-6">
      <div className="mb-4 w-full max-w-[320px] px-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
        {status !== 'idle' && (
          <div className="bg-slate-950/95 backdrop-blur-2xl border border-white/20 p-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 pointer-events-auto ring-1 ring-white/10 shrink-0">
            {status === 'listening' && (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex gap-2 items-end h-10">
                  {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((i, idx) => (
                    <div key={idx} className="w-1.5 bg-gradient-to-t from-green-600 to-green-400 rounded-full animate-voice-bar-premium shadow-[0_0_15px_rgba(74,222,128,0.5)]" 
                      style={{ animationDelay: `${idx * 80}ms`, height: `${20 + i * 15}%` }} />
                  ))}
                </div>
                <div className="w-full px-2 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-green-300 font-bold text-center italic text-xs leading-tight break-words min-h-[1.5em] transition-all duration-300">
                    "{transcript || (language === 'hi' ? 'बोलिए, मैं सुन रहा हूँ...' : 'Listening to you...')}"
                  </p>
                </div>
                <p className="text-white/40 font-black text-[8px] uppercase tracking-[0.3em] animate-pulse">Live Translation Active</p>
              </div>
            )}
            
            {status === 'thinking' && (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="relative">
                  <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full animate-pulse" />
                </div>
                <p className="text-amber-200 font-bold text-[10px] uppercase tracking-widest">{language === 'hi' ? 'सोच रहा हूँ...' : 'Thinking...'}</p>
              </div>
            )}
            
            {status === 'speaking' && (
              <div className="flex flex-col items-center gap-4 text-center w-full animate-in zoom-in-95 duration-300">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-3xl shadow-inner relative z-10">👴</div>
                  <div className="absolute -inset-2 bg-green-500/20 rounded-full animate-ping opacity-40" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 w-full">
                   <p className="text-white font-black text-[13px] leading-snug tracking-tight italic break-words">
                    {chachaResponse}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pointer-events-auto relative group">
        {/* Glow effect */}
        <div className={`absolute -inset-1 rounded-full blur-xl transition-all duration-500 opacity-60 group-hover:opacity-100 ${status === 'listening' ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
        
        <button 
          onClick={toggleListening}
          className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl border-[6px] active:scale-90 z-10 ${status === 'listening' ? 'bg-red-600 border-red-200' : 'bg-gradient-to-br from-green-600 to-green-500 border-white hover:rotate-6'}`}
        >
          <div className="mb-0.5 transform group-hover:scale-110 transition-transform duration-300">
             {status === 'listening' ? (
               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                 <div className="w-4 h-4 bg-red-600 rounded-sm animate-pulse" />
               </div>
             ) : (
               <span className="text-4xl filter drop-shadow-lg">🎙️</span>
             )}
          </div>
          <span className="text-[10px] font-black text-white px-2 tracking-[0.2em] leading-none uppercase">
            {status === 'listening' ? 'STOP' : 'BOLO'}
          </span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes voice-bar-premium { 
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; } 
          50% { transform: scaleY(1.2); opacity: 1; } 
        }
        .animate-voice-bar-premium { animation: voice-bar-premium 0.8s ease-in-out infinite; }
      `}} />
    </div>
  );
}
