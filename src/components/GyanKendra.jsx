import React from 'react';
import { useFinancials } from '../context/FinancialContext.jsx';
import learningModules from '../data/learningModules';

export default function GyanKendra({ onSelectModule, onExploreVillage }) {
  const { language, completedModules, arthaScore } = useFinancials();

  const t = {
    hi: { title: 'ज्ञान केंद्र', subtitle: 'सफलता की ओर आपका पहला कदम', start: 'सीखें', completed: 'पूर्ण', score: 'आपका स्कोर', explore: 'गाँव घूमें ➔' },
    en: { title: 'Gyan Kendra', subtitle: 'Your first step to success', start: 'Learn', completed: 'Done', score: 'Your Score', explore: 'Explore Village ➔' },
    mr: { title: 'ज्ञान केंद्र', subtitle: 'यशस्वी होण्यासाठी तुमचे पहिले पाऊल', start: 'शिका', completed: 'पूर्ण', score: 'तुमचा स्कोर', explore: 'गाव पाहा ➔' },
    gu: { title: 'જ્ઞાન કેન્દ્ર', subtitle: 'સફળતા તરફ તમારું પહેલું ડગલું', start: 'શીખો', completed: 'પૂર્ણ', score: 'તમારો સ્કોર', explore: 'ગામની મુલાકાત ➔' },
    bh: { title: 'ज्ञान केंद्र', subtitle: 'सफलता के ओर राउर पहिला कदम', start: 'सीखीं', completed: 'पूरा', score: 'राउर स्कोर', explore: 'गाँव घूमीं ➔' },
    bn: { title: 'জ্ঞান কেন্দ্র', subtitle: 'সফলতার দিকে আপনার প্রথম পদক্ষেপ', start: 'শিখুন', completed: 'সম্পন্ন', score: 'আপনার স্কোর', explore: 'গ্রাম দেখুন ➔' },
    te: { title: 'జ్ఞాన కేంద్రం', subtitle: 'విజయానికి మీ మొదటి అడుగు', start: 'నేర్చుకోండి', completed: 'పూర్తయింది', score: 'మీ స్కోర్', explore: 'గ్రామాన్ని సందర్శించండి ➔' },
    ta: { title: 'ஞான கேந்திரா', subtitle: 'வெற்றியை நோக்கிய உங்கள் முதல் படி', start: 'கற்றுக்கொள்ளுங்கள்', completed: 'முடிந்தது', score: 'உங்கள் மதிப்பெண்', explore: 'கிராமத்தை ஆராயுங்கள் ➔' },
    kn: { title: 'ಜ್ಞಾನ ಕೇಂದ್ರ', subtitle: 'ಯಶಸ್ಸಿನೆಡೆಗೆ ನಿಮ್ಮ ಮೊದಲ ಹೆಜ್ಜೆ', start: 'ಕಲಿಯಿರಿ', completed: 'ಪೂರ್ಣ', score: 'ನಿಮ್ಮ ಸ್ಕೋರ್', explore: 'ಗ್ರಾಮ ವೀಕ್ಷಿಸಿ ➔' }
  }[language] || {
    title: 'Gyan Kendra',
    subtitle: 'Your first step to success',
    start: 'Learn',
    completed: 'Done',
    score: 'Your Score',
    explore: 'Explore Village ➔'
  };

  const moduleIcons = {
    seed_trap: '🌾',
    monsoon_ruin: '🌧️',
    medical_shock: '🏥',
    cyber_fraud: '📱',
    distress_sell: '⚖️',
    soil_health: '🧪',
    wedding_pressure: '💍',
    pension_plan: '👴',
    microfinance: '🐄',
    emergency_funds: '🔧'
  };

  return (
    <div className="h-full w-full bg-orange-50/30 flex flex-col overflow-hidden font-sans">
      
      {/* Header Section - More compact for mobile */}
      <header className="px-4 pt-8 pb-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white relative shadow-md shrink-0">
        <div className="absolute top-2 right-4 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
          <span className="text-[9px] font-black uppercase tracking-tight text-white/80 mr-1.5">{t.score}</span>
          <span className="text-lg font-black italic">{arthaScore}</span>
        </div>
        
        <h1 className="text-2xl font-black italic tracking-tighter leading-none mb-0.5">
          {t.title}
        </h1>
        <p className="text-amber-100 font-bold text-[11px] opacity-90">
          {t.subtitle}
        </p>
      </header>

      {/* Explore Village CTA - Compacted */}
      <div className="px-4 mt-3 shrink-0">
        <button 
          onClick={onExploreVillage}
          className="w-full bg-white border border-amber-200 p-3 rounded-2xl flex items-center justify-between shadow-lg shadow-amber-900/5 active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-xl group-hover:rotate-12 transition-transform">
              🚜
            </div>
            <span className="text-base font-black text-amber-900 italic">{t.explore}</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-black">
            +
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-4 grid grid-cols-2 gap-3 auto-rows-max custom-scrollbar">
        {learningModules.map((module, idx) => {
          const isCompleted = completedModules.includes(module.id);
          const isLocked = false; // All modules are unlocked as per user request
          const icon = moduleIcons[module.id] || module.icon || '📖';

          return (
            <div 
              key={module.id}
              onClick={() => !isLocked && onSelectModule(module.id)}
              className={`relative flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all duration-500 cursor-pointer ${isCompleted ? 'bg-green-50 border-green-200' : isLocked ? 'bg-slate-100 border-slate-200 opacity-50 grayscale cursor-not-allowed' : 'bg-white border-white shadow-lg shadow-amber-900/5 hover:border-amber-400 hover:scale-[1.02]'}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2.5 shadow-inner border shrink-0 ${isCompleted ? 'bg-green-100 border-green-200' : 'bg-orange-50 border-orange-100'}`}>
                {isLocked ? '🔒' : icon}
              </div>
              
              <h3 className="text-center text-[10px] font-black text-slate-800 leading-tight tracking-tight uppercase line-clamp-2 h-7 px-1">
                {language === 'hi' ? (module.titleHi || module.title) : module.title}
              </h3>
              
              {isCompleted ? (
                <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-[8px] font-black uppercase tracking-wider shrink-0">
                  {t.completed}
                </div>
              ) : !isLocked && (
                <div className="mt-2 px-3 py-1 bg-amber-500 text-white rounded-lg text-[8px] font-black uppercase tracking-wider shadow-md shadow-amber-500/30 shrink-0">
                  {t.start}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fixed bottom safety visual */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300/40 rounded-full pointer-events-none" />

    </div>
  );
}
