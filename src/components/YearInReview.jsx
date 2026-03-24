import React from 'react';

export default function YearInReview({
  totalIncome = 0,
  totalInterestPaid = 0,
  selectedLoanType = 'sahukar',
  language = 'hi',
  onReset
}) {
  const isHi = language === 'hi';
  const isSahukar = selectedLoanType === 'sahukar';
  
  // Calculate specific values
  const netProfit = totalIncome - totalInterestPaid;
  
  // Static comparative math based on standard parameters
  const actualInterest = totalInterestPaid;
  // If they took a bank loan, actual is the bank interest. 
  // If they took sahukar (60% APR equivalent), KCC (4% APR) would be roughly 1/15th of the interest.
  const bankInterestEquivalent = isSahukar ? Math.round(actualInterest * (4 / 60)) : actualInterest;
  const difference = Math.abs(actualInterest - bankInterestEquivalent);

  return (
    <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-start overflow-y-auto bg-slate-900 animate-in fade-in duration-700" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ── 1. THE HEADER (The Brutal Truth) ── */}
      <div className={`w-full max-w-[320px] px-5 pt-12 pb-10 shadow-2xl rounded-b-[2.5rem] ${isSahukar ? 'bg-red-600' : 'bg-green-600'} shrink-0`}>
        <div className="text-center">
          <span className="text-5xl mb-3 block">{isSahukar ? '⚠️' : '🎉'}</span>
          <h1 className="text-2xl font-black text-white italic tracking-tighter leading-tight mb-2 break-words">
            {isSahukar 
              ? (isHi ? 'सावधान! कर्ज ने नुकसान पहुँचाया।' : 'Warning! Debt hurt your profit.')
              : (isHi ? 'बधाई हो! आपने समझदारी बरती।' : 'Congrats! You were smart.')}
          </h1>
          
          <div className="mt-6 bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30 text-white">
            <span className="text-[10px] uppercase tracking-widest font-black opacity-80 block mb-0.5">
              {isHi ? 'शुद्ध लाभ (Net Profit)' : 'Net Profit'}
            </span>
            <div className="text-4xl font-black tracking-tighter tabular-nums">
              ₹{netProfit.toLocaleString('en-IN')}
            </div>
            <div className="flex justify-between mt-3 border-t border-white/20 pt-3 text-[10px] font-black uppercase tracking-tight">
              <span className="opacity-80">{isHi ? 'आय:' : 'Income:'} ₹{Math.max(0, totalIncome).toLocaleString('en-IN')}</span>
              <span className="opacity-80">{isHi ? 'ब्याज:' : 'Interest:'} ₹{actualInterest.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. THE TIME MACHINE (The Comparative Lesson) ── */}
      <div className="w-full max-w-[320px] px-4 -mt-5 z-10 space-y-3 pb-24">
        
        {/* Card A (Your Choice) */}
        <div className={`p-5 rounded-[2rem] border-2 shadow-xl ${isSahukar ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex justify-between items-start mb-2">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${isSahukar ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
              {isHi ? 'आपका फैसला' : 'Your Choice'}
            </span>
            <span className="text-xl">{isSahukar ? '💸' : '🏦'}</span>
          </div>
          <h2 className={`text-base font-black mb-0.5 break-words ${isSahukar ? 'text-red-900' : 'text-green-900'}`}>
            {isSahukar 
              ? (isHi ? 'साहूकार का कर्ज' : 'Moneylender Debt') 
              : (isHi ? 'बैंक का कर्ज' : 'Bank Debt')}
          </h2>
          <p className={`text-xl font-black tracking-tighter tabular-nums ${isSahukar ? 'text-red-600' : 'text-green-600'}`}>
            {isHi ? '₹' + actualInterest.toLocaleString('en-IN') + ' ब्याज' : 'Paid ₹' + actualInterest.toLocaleString('en-IN')}
          </p>
        </div>

        {/* The Gap Highlight (Only show if they made a mistake) */}
        {isSahukar && difference > 0 && (
          <div className="relative flex justify-center py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-red-500/50"></div></div>
            <div className="relative bg-red-600 text-white text-sm font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/30">
              {isHi ? `आपने ₹${difference.toLocaleString('en-IN')} का नुकसान किया!` : `You lost ₹${difference.toLocaleString('en-IN')}!`}
            </div>
          </div>
        )}

        {/* Card B (The Alternative) */}
        {isSahukar && (
          <div className="p-5 rounded-[2rem] bg-indigo-50 border-2 border-indigo-200 shadow-xl opacity-90 scale-[0.98]">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-indigo-500 text-white">
                {isHi ? 'स्मार्ट विकल्प' : 'Smart Choice'}
              </span>
              <span className="text-xl">🏦</span>
            </div>
            <h2 className="text-base font-black text-indigo-950 mb-0.5 break-words">
              {isHi ? 'बैंक का कर्ज (KCC)' : 'KCC Bank Debt'}
            </h2>
            <p className="text-lg font-black text-indigo-700/80 tabular-nums">
              {isHi 
                ? `सिर्फ ₹${bankInterestEquivalent.toLocaleString('en-IN')} ब्याज लगता` 
                : `Only ₹${bankInterestEquivalent.toLocaleString('en-IN')} interest`}
            </p>
          </div>
        )}
      </div>

      {/* ── 3. THE ACTION LOOP (Redemption) ── */}
      <div className="fixed bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent z-50 text-center flex justify-center">
        <button 
          onClick={onReset}
          className="w-full max-w-[280px] py-4 bg-white text-slate-900 active:scale-95 transition-all rounded-2xl text-lg font-black shadow-2xl animate-pulse"
        >
          {isHi ? 'फिर से कोशिश करें ➔' : 'TRY AGAIN ➔'}
        </button>
      </div>
      
    </div>
  );
}
 
 
