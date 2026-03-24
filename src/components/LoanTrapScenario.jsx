/**
 * LoanTrapScenario.jsx
 * 
 * Scenario: Medical Emergency. ₹5000 needed.
 * Locations: Sahukar (Instant/High Interest), Bank (Low Interest/Delay), Panchayat (Govt Schemes).
 */
import React, { useState, useEffect, useCallback } from 'react';

const OUTCOMES = {
  sahukar: {
    titles: {
      hi: '⚠️ करज़ का बोझ',
      en: '⚠️ Debt Trap',
    },
    subtitles: {
      hi: 'साहूकार से तुरंत पैसे तो मिले, पर ब्याज बहुत ज्यादा है।',
      en: 'Got cash instantly, but the interest is crushing.',
    },
    arthaChange: -25,
    color: 'red',
    mapTint: 'rgba(239,68,68,0.15)',
    totalLoss: '₹8,000',
    lines: [
      { icon: '💸', label: { hi: 'मूल राशि', en: 'Principal' }, value: '₹5,000' },
      { icon: '📈', label: { hi: 'ब्याज', en: 'Interest' }, value: '₹3,000' },
      { icon: '🚨', label: { hi: 'स्थिति', en: 'Status' }, value: 'Critical' },
    ],
  },
  bank: {
    titles: {
      hi: '🏦 सही ऋण',
      en: '🏦 Safe Loan',
    },
    subtitles: {
      hi: 'बैंक से थोड़ी देरी हुई, पर ब्याज बहुत कम है।',
      en: 'Application took time, but the interest is very low.',
    },
    arthaChange: 5,
    color: 'yellow',
    mapTint: 'rgba(251,191,36,0.12)',
    totalLoss: '₹5,200',
    lines: [
      { icon: '💸', label: { hi: 'मूल राशि', en: 'Principal' }, value: '₹5,000' },
      { icon: '📉', label: { hi: 'ब्याज', en: 'Interest' }, value: '₹200' },
      { icon: '🛡️', label: { hi: 'स्थिति', en: 'Status' }, value: 'Safe' },
    ],
  },
  panchayat: {
    titles: {
      hi: '🌟 समझदारी',
      en: '🌟 Smart Choice',
    },
    subtitles: {
      hi: 'सरकारी योजनाओं से पूरी मदद मिली!',
      en: 'Government schemes covered the costs!',
    },
    arthaChange: 20,
    color: 'green',
    mapTint: 'rgba(34,197,94,0.15)',
    totalLoss: '₹0',
    lines: [
      { icon: '🛡️', label: { hi: 'आयुष्मान भारत', en: 'Ayushman' }, value: 'Free' },
      { icon: '🌾', label: { hi: 'पीएम-किसान', en: 'PM-Kisan' }, value: 'Enabled' },
      { icon: '💰', label: { hi: 'बचत', en: 'Savings' }, value: '₹5,000' },
    ],
  },
};

// ── FLOATING EVENT CARD ───────────────────────────────────────────
function FloatingEventCard({ onDismiss, language }) {
  const isHi = language === 'hi';
  return (
    <div className="absolute top-14 left-0 right-0 z-[3000] flex justify-center px-4 animate-in slide-in-from-top-4 duration-500">
      <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden transform">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 px-3 py-2 flex items-center gap-2">
          <span className="text-xl">🚨</span>
          <div className="min-w-0">
            <p className="text-white font-black text-[10px] uppercase tracking-wider truncate">
              {isHi ? 'आपातकालीन समस्या!' : 'Medical Emergency!'}
            </p>
            <p className="text-red-100 text-[9px] font-bold">
              {isHi ? '₹5000 की जरूरत है' : '₹5000 needed'}
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm flex-shrink-0">👴</div>
            <div className="bg-red-50 rounded-2xl rounded-tl-sm px-3 py-2 flex-1">
              <p className="text-red-950 font-black text-[11px] leading-tight italic break-words">
                {isHi 
                  ? '"बहू बीमार है, इलाज के लिए ₹5000 चाहिए। इंतजाम कैसे करें?"'
                  : '"Daughter-in-law is sick. We need ₹5000 for treatment."'}
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="w-full py-2.5 bg-red-600 text-white rounded-xl font-black text-[10px] active:scale-95 transition-all uppercase tracking-widest shadow-md"
          >
            {isHi ? 'मदद खोजें ➔' : 'Find Help ➔'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TOP INSTRUCTION HINT ──────────────────────────────────────────
function InstructionHint({ icon, text }) {
  return (
    <div className="absolute top-6 left-0 right-0 z-[3000] pointer-events-none flex justify-center px-4 animate-in slide-in-from-top-4 duration-500">
      <div className="max-w-[280px] w-full bg-slate-900/95 backdrop-blur-md border border-indigo-400/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
        <span className="text-xl animate-bounce shrink-0">{icon}</span>
        <p className="text-white font-black text-[11px] leading-tight tracking-tight break-words">{text}</p>
      </div>
    </div>
  );
}

// ── PICKER COMPONENTS ─────────────────────────────────────────────
function SahukarPicker({ onPick, onClose, language }) {
  const isHi = language === 'hi';
  return (
    <div className="absolute inset-x-0 bottom-32 z-[4000] flex justify-center px-4 animate-in slide-in-from-bottom-8 duration-300">
      <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
        <div className="bg-red-700 px-3 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <div className="min-w-0">
              <p className="text-white font-black text-[10px] uppercase tracking-tight truncate">{isHi ? 'साहूकार' : 'Moneylender'}</p>
              <p className="text-red-200 text-[8px] font-bold truncate">{isHi ? 'तुरंत नकद' : 'Instant Cash'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 text-sm p-1">✕</button>
        </div>
        <div className="p-2">
          <button onClick={() => onPick('sahukar')}
            className="w-full p-3 bg-red-50 border-2 border-red-100 rounded-xl flex items-center gap-3 active:scale-95 transition-all text-left">
            <span className="text-2xl shrink-0">😱</span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-slate-950 text-[11px] leading-tight break-words">{isHi ? '₹5,000 अभी लें' : 'Take ₹5,000 Now'}</p>
              <p className="text-red-600 text-[9px] font-black leading-tight mt-0.5 italic break-words">{isHi ? 'कोई कागज़ नहीं, ब्याज ज्यादा' : 'No paperwork, high interest'}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function BankPicker({ onPick, onClose, language }) {
  const isHi = language === 'hi';
  return (
    <div className="absolute inset-x-0 bottom-32 z-[4000] flex justify-center px-4 animate-in slide-in-from-bottom-8 duration-300">
      <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
        <div className="bg-indigo-700 px-3 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏦</span>
            <div className="min-w-0">
              <p className="text-white font-black text-[10px] uppercase tracking-tight truncate">
                {isHi ? 'बैंक ऋण' : 'Bank Loan'}
              </p>
              <p className="text-indigo-200 text-[8px] font-bold truncate">{isHi ? 'सुरक्षित और सस्ता' : 'Safe & Low Interest'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 text-sm p-1">✕</button>
        </div>
        <div className="p-2.5">
          <button onClick={() => onPick('bank')}
            className="w-full p-3 bg-indigo-50 border-2 border-indigo-200 rounded-xl flex items-center gap-3 active:scale-95 transition-all text-left">
            <span className="text-2xl shrink-0">📝</span>
            <div className="flex-1 min-w-0">
              <p className="font-black text-slate-900 text-[11px] break-words">
                {isHi ? '₹5,000 पर्सनल लोन' : '₹5,000 Personal Loan'}
              </p>
              <p className="text-indigo-600 text-[9px] font-black mt-0.5 italic break-words">
                {isHi ? 'थोड़ा कागजी काम, पर ब्याज कम।' : 'Some paperwork, but low interest.'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function PanchayatPicker({ onPick, onClose, language }) {
  const isHi = language === 'hi';
  return (
    <div className="absolute inset-x-0 bottom-32 z-[4000] flex justify-center px-4 animate-in slide-in-from-bottom-8 duration-300">
      <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100">
        <div className="bg-green-700 px-3 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <div className="min-w-0">
              <p className="text-white font-black text-[10px] uppercase tracking-tight truncate">
                {isHi ? 'सरकारी योजनाएं' : 'Eligible Schemes'}
              </p>
              <p className="text-green-200 text-[8px] font-bold truncate">{isHi ? 'मुफ्त सरकारी मदद' : 'Government Support'}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 text-sm p-1">✕</button>
        </div>
        <div className="p-3">
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl space-y-2.5">
             <div className="flex items-center gap-3">
                <span className="text-xl shrink-0">🛡️</span>
                <p className="font-black text-slate-900 text-[10px] leading-tight flex-1 break-words">
                  {isHi ? 'आयुष्मान भारत - इलाज मुफ्त!' : 'Ayushman Bharat - Free treatment!'}
                </p>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-xl shrink-0">🚜</span>
                <p className="font-black text-slate-900 text-[10px] leading-tight flex-1 break-words">
                  {isHi ? 'पीएम-किसान भी उपलब्ध।' : 'PM-Kisan also available.'}
                </p>
             </div>
          </div>
          <button onClick={() => onPick('panchayat')}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-black text-[10px] active:scale-95 transition-all mt-3 shadow-lg uppercase tracking-widest">
            {isHi ? 'योजना चुनें ➔' : 'Claim Scheme ➔'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TIME PASSING OVERLAY ──────────────────────────────────────────
function TimePassingOverlay({ stage, language }) {
  const isHi = language === 'hi';
  const stages = {
    day1:    { label: isHi ? 'दिन 1' : 'Day 1',    emoji: '🚑', step: 0 },
    week2:   { label: isHi ? 'सप्ताह 2' : 'Week 2',   emoji: '💊', step: 1 },
    month1:  { label: isHi ? 'महिना 1' : 'Month 1',  emoji: '🏥', step: 2 },
  };
  const s = stages[stage] || stages.day1;
  return (
    <div className="absolute inset-0 z-[5000] bg-slate-950/95 flex flex-col items-center justify-center gap-6 px-8">
      <p className="text-red-400 font-black uppercase tracking-widest text-[10px]">
        {isHi ? 'समय बीत रहा है' : 'Time Passing'}
      </p>
      <div className="text-8xl animate-bounce">{s.emoji}</div>
      <h1 className="text-5xl font-black text-white italic tracking-tighter">{s.label}</h1>
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-700 ${i <= s.step ? 'bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/10'}`} />
        ))}
      </div>
    </div>
  );
}

// ── OUTCOME CARD ──────────────────────────────────────────────────
function OutcomeCard({ outcome, onDone, onWantExplanation, language }) {
  const isHi = language === 'hi';
  const isGood = outcome.color === 'green';
  const isBad = outcome.color === 'red';
  const title = outcome.titles[language] || outcome.titles.hi || outcome.titles.en;
  const subtitle = outcome.subtitles[language] || outcome.subtitles.hi || outcome.subtitles.en;

  return (
    <div className="absolute inset-x-0 top-10 z-[4000] flex justify-center px-4 animate-in zoom-in-95 duration-500">
      <div className="w-full max-w-[280px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[80vh]">
        <div className={`px-4 py-3 shrink-0 ${isGood ? 'bg-gradient-to-r from-green-600 to-emerald-600' : isBad ? 'bg-gradient-to-r from-red-600 to-orange-700' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}>
          <h2 className="text-white font-black text-[13px] leading-tight uppercase tracking-tight">{title}</h2>
          <p className="text-white/80 font-bold text-[9px] leading-tight mt-1 break-words">{subtitle}</p>
        </div>
        
        <div className="overflow-y-auto p-4 space-y-3 flex-1 custom-scrollbar">
          {outcome.totalLoss && (
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-black text-[9px] uppercase tracking-widest shrink-0 ${isBad ? 'text-red-500' : 'text-amber-500'}`}>
                 {isHi ? 'कुल लागत: ' : 'Total: '}{outcome.totalLoss}
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
          )}
          {outcome.lines.map((l, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl border ${isGood ? 'bg-green-50/50 border-green-100' : isBad ? 'bg-red-50/50 border-red-100' : 'bg-amber-50/50 border-amber-100'}`}>
              <span className="text-xl shrink-0">{l.icon}</span>
              <span className="flex-1 font-black text-slate-800 text-[10px] break-words uppercase tracking-tight">
                {l.label[language] || l.label.hi || l.label.en}
              </span>
              <span className={`font-black text-[11px] shrink-0 tabular-nums ${isGood ? 'text-green-700' : isBad ? 'text-red-700' : 'text-amber-700'}`}>{l.value}</span>
            </div>
          ))}

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">👴</span>
            <p className="text-amber-900 font-black italic text-[10px] leading-snug break-words uppercase tracking-tight">
              {isHi 
                ? '"सही वक़्त पर लिया गया फैसला आपको बड़े संकट से बचा सकता है।"'
                : '"A timely decision can save you from big debts."'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2 shrink-0">
          <button onClick={onWantExplanation}
            className="w-full py-2 bg-white border border-slate-200 text-slate-500 rounded-xl font-black text-[10px] active:scale-95 transition-all uppercase tracking-[0.15em] shadow-sm">
            {isHi ? 'सीखें 💡' : 'Learn 💡'}
          </button>
          <button onClick={onDone}
            className={`w-full py-3.5 text-white rounded-xl font-black text-xs active:scale-95 transition-all shadow-lg uppercase tracking-[0.2em] ${isGood ? 'bg-green-600' : 'bg-slate-900'}`}>
            {isHi ? 'आगे बढ़ें ➔' : 'Next ➔'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function LoanTrapScenario({ language = 'hi', onComplete, onShowInsight, onHighlightsChange, onMapTintChange, onRegisterTapHandler }) {
  const [stage, setStage] = useState('intro'); // intro | pick | time_passing | outcome
  const [timeStage, setTimeStage] = useState('day1');
  const [activePicker, setActivePicker] = useState(null); // 'moneylender' | 'bank' | 'panchayat'
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const highlights = stage === 'pick' ? ['moneylender', 'bank', 'panchayat'] : [];
    onHighlightsChange(highlights);
  }, [stage, onHighlightsChange]);

  useEffect(() => {
    if (stage === 'outcome' && outcome) {
      onMapTintChange(outcome.mapTint);
    } else {
      onMapTintChange(null);
    }
  }, [stage, outcome, onMapTintChange]);

  const handleLocationTap = useCallback((locId) => {
    if (stage === 'pick') {
      if (['moneylender', 'bank', 'panchayat'].includes(locId)) {
        setActivePicker(locId);
      }
    }
  }, [stage]);

  useEffect(() => {
    onRegisterTapHandler?.(handleLocationTap);
  }, [handleLocationTap, onRegisterTapHandler]);

  const handleSelection = (type) => {
    setActivePicker(null);
    setStage('time_passing');
    setTimeStage('day1');
    setTimeout(() => setTimeStage('week2'), 1500);
    setTimeout(() => setTimeStage('month1'), 3000);
    setTimeout(() => {
      setOutcome(OUTCOMES[type]);
      setStage('outcome');
      // Pass a special flag to insight to use the alternate data
    }, 4500);
  };

  const isDimmed = stage === 'pick' && !activePicker;

  return (
    <>
      {isDimmed && (
        <div className="absolute inset-0 z-[2000] bg-slate-900/55 backdrop-blur-[1px] pointer-events-none transition-all" />
      )}

      {stage === 'intro' && <FloatingEventCard language={language} onDismiss={() => setStage('pick')} />}

      {stage === 'pick' && !activePicker && (
        <InstructionHint 
          icon="🔍" 
          text={language === 'hi' 
            ? "साहूकार, बैंक या पंचायत पर जाएं और मदद मांगें।" 
            : "Visit Moneylender, Bank or Panchayat for help."} 
        />
      )}

      {activePicker === 'moneylender' && <SahukarPicker language={language} onPick={handleSelection} onClose={() => setActivePicker(null)} />}
      {activePicker === 'bank' && <BankPicker language={language} onPick={handleSelection} onClose={() => setActivePicker(null)} />}
      {activePicker === 'panchayat' && <PanchayatPicker language={language} onPick={handleSelection} onClose={() => setActivePicker(null)} />}

      {stage === 'time_passing' && <TimePassingOverlay language={language} stage={timeStage} />}

      {stage === 'outcome' && outcome && (
        <OutcomeCard
          language={language}
          outcome={outcome}
          onDone={onComplete}
          onWantExplanation={() => onShowInsight?.({ ...outcome, moduleId: 'loan_trap' })}
        />
      )}
    </>
  );
}
