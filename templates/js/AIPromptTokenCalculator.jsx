import React, { useState } from "react";

export function AIPromptTokenCalculator() {
  const [active, setActive] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <span className="font-bold uppercase tracking-wider text-neutral-200">ai-prompt-token-calculator</span>
        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400 font-semibold">VERIFIED</span>
      </div>
      <p className="text-neutral-400 text-[11px] leading-relaxed">
        Nawfal UI Kit JavaScript Component (AIPromptTokenCalculator) built with standard React & Tailwind.
      </p>
      <div className="flex justify-end gap-2 pt-2 border-t border-neutral-900">
        <button onClick={() => setActive(!active)} className="rounded bg-white text-black px-3 py-1 text-[10px] font-bold hover:bg-neutral-200 transition-colors">
          Toggle State
        </button>
      </div>
    </div>
  );
}
