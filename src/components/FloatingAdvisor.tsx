import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export default function FloatingAdvisor({ setCurrentTab }: { setCurrentTab: (tab: string) => void }) {
  return (
    <button
      onClick={() => setCurrentTab("umaiza")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gold text-purple-deep px-5 py-3.5 rounded-full shadow-[0_4px_20px_rgba(212,168,67,0.4)] hover:scale-105 active:scale-95 transition-all group cursor-pointer"
    >
      <div className="flex items-center justify-center h-8 w-8 bg-purple-deep text-gold rounded-full font-serif font-bold text-sm">
        <svg viewBox="0 0 100 100" className="w-full h-full p-1.5 object-contain" fill="none">
          <circle cx="50" cy="42" r="22" stroke="currentColor" strokeWidth="12" />
          <path d="M 28 72 Q 50 95 72 72" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
      <span className="font-bold text-sm">Ask Umaiza</span>
    </button>
  );
}
