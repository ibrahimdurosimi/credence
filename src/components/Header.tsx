import React, { useState } from "react";
import { Menu, X, Sparkles, Receipt, Coins, ShieldCheck, Compass } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = currentTab === "advisor";

  const navigation = [
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "build", label: "Build With Credence" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDark ? 'bg-[#1E0A4E]' : 'bg-cream/90 backdrop-blur-md border-b border-[#E8E2D8]'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center cursor-pointer focus:outline-none group text-left"
          id="nav-logo"
        >
          <span className="font-serif text-3xl font-medium text-gold">O</span>
          <span className={`font-serif text-3xl font-medium tracking-tight ${isDark ? 'text-white' : 'text-purple-deep'}`}>credence</span>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition duration-200 cursor-pointer ${
                currentTab === item.id
                  ? `font-semibold border-b-[2px] pb-1 mt-[2px] ${isDark ? 'text-gold border-gold' : 'text-purple-deep border-purple-deep'}`
                  : `${isDark ? 'text-white/80 hover:text-gold' : 'text-purple-deep/70 hover:text-purple-deep'} hover:scale-[1.02]`
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("contact")}
            className={`hidden rounded-full px-6 py-2.5 text-xs font-bold shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all hover:scale-105 active:scale-95 sm:inline-flex cursor-pointer ${
              isDark ? 'bg-white text-purple-deep hover:bg-white/90' : 'bg-purple-deep text-white hover:bg-purple-deep/90'
            }`}
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-full p-2 lg:hidden focus:outline-none transition ${
              isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-purple-deep/5 text-purple-deep hover:bg-purple-deep/10'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Drawer */}
      {mobileMenuOpen && (
        <div className={`absolute top-18 left-4 right-4 z-40 rounded-2xl p-6 shadow-2xl lg:hidden ${
          isDark ? 'bg-purple-deep border border-white/10' : 'bg-white border border-[#E8E2D8]'
        }`}>
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 text-left text-sm font-medium transition ${
                  currentTab === item.id
                    ? `font-semibold pl-2 border-l-2 ${isDark ? 'text-gold border-gold' : 'text-purple-deep border-purple-deep'}`
                    : `${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-purple-deep'}`
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className={`mt-4 w-full rounded-full py-3 text-center text-sm font-semibold transition duration-150 ${
                isDark ? 'bg-white text-purple-deep hover:bg-white/90' : 'bg-purple-deep text-white hover:bg-purple-deep/90'
              }`}
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
