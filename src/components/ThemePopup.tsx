import React from "react";
import { Moon, Sun } from "lucide-react";

interface ThemePopupProps {
  show: boolean;
  onSelectTheme: (isDark: boolean) => void;
}

export default function ThemePopup({ show, onSelectTheme }: ThemePopupProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-purple-deep/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center transform scale-100 animate-fade-in-up">
        <h2 className="font-serif text-3xl font-bold text-purple-deep mb-3">Choose Your Aesthetic</h2>
        <p className="text-purple-deep/70 mb-8 text-sm leading-relaxed">
          Experience Credence in your preferred style. You can change this later.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelectTheme(false)}
            className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-purple-deep/10 hover:border-[#D4A843] hover:bg-cream/50 transition cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sun className="w-8 h-8 text-[#D4A843]" />
            </div>
            <span className="font-bold text-purple-deep">Light Theme</span>
          </button>

          <button
            onClick={() => onSelectTheme(true)}
            className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border-2 border-[#1E0A4E] bg-purple-deep hover:border-[#D4A843] transition cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Moon className="w-8 h-8 text-[#D4A843]" />
            </div>
            <span className="font-bold text-white">Dark Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
}
