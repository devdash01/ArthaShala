import React from 'react';

/**
 * DecisionModal
 * 
 * Props:
 *   title      - string: heading shown in the modal
 *   subtitle   - string: context description
 *   options    - array of { label, sublabel, cost, debtAdded, waste, isGood }
 *   onChoose   - fn(cost, debtAdded, waste) fired when option clicked
 *   onClose    - fn() fired when backdrop clicked
 */
export default function DecisionModal({ title, subtitle, options = [], onChoose, onClose }) {
  if (!options || options.length === 0) return null;

  return (
    <div
      className="absolute inset-0 z-[3000] flex items-center justify-center p-2 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

      <div
        className="relative w-[92vw] max-w-[320px] bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/40 animate-in zoom-in slide-in-from-bottom-10 duration-500 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 px-5 pt-8 pb-5 text-center relative overflow-hidden shrink-0">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />
          <h2 className="text-[15px] font-black text-white leading-tight mb-2 uppercase tracking-tight relative z-10 break-words">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest opacity-80 relative z-10 break-words">
              {subtitle}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
          <div className="p-4 flex flex-col gap-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onChoose(opt.cost, opt.debtAdded, opt.waste, opt)}
              className={`w-full text-left p-4 rounded-3xl border-2 transition-all active:scale-[0.98] group relative overflow-hidden bg-white shadow-sm
                ${opt.isGood ? 'border-green-100' : 'border-red-100'}`}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner border transition-colors ${opt.isGood ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  {opt.icon || (opt.isGood ? '✅' : '⚠️')}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="font-black text-slate-900 text-[13px] leading-tight mb-1.5 uppercase break-words">
                    {opt.label}
                  </p>
                  {opt.sublabel && (
                    <p className={`text-[9px] font-black uppercase tracking-widest leading-none break-words ${opt.isGood ? 'text-green-600' : 'text-red-600'}`}>
                      {opt.sublabel}
                    </p>
                  )}
                </div>
                {(opt.waste > 0 || opt.debtAdded > 0) && (
                   <div className="text-right shrink-0">
                      <span className={`text-[12px] font-black tabular-nums ${opt.isGood ? 'text-slate-900' : 'text-red-600'}`}>
                        ₹{(opt.waste || opt.debtAdded).toLocaleString()}
                      </span>
                   </div>
                )}
              </div>
            </button>
          ))}
        </div>
        </div>

        {/* Localized Footer Feedback - Generic Positive Reinforcement */}
        <div className="p-4 bg-slate-100/50 border-t border-slate-200 flex justify-center shrink-0">
           <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase text-center">
             Choose wisely • विकास की ओर बढ़ें
           </p>
        </div>
      </div>
    </div>
  );
}
