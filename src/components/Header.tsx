import React, { useState } from "react";
import { Menu, X, Sparkles, Receipt, Coins, ShieldCheck, Compass } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "partners", label: "Partners" },
    { id: "capital", label: "For Capital" },
    { id: "merchants", label: "For Merchants" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E0A4E]/80 backdrop-blur-md border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 cursor-pointer focus:outline-none group text-left"
          id="nav-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-purple-deep font-bold font-serif text-xl group-hover:scale-105 transition-transform">
            C
          </div>
          <span className="font-sans text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-gold-light transition duration-200">
            Credence
          </span>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition duration-200 cursor-pointer ${
                currentTab === item.id
                  ? "text-gold font-semibold border-b-[2px] border-gold pb-1 mt-[2px]"
                  : "text-white/80 hover:text-gold hover:scale-[1.02]"
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
            className="hidden rounded-full bg-gold px-6 py-2.5 text-xs font-bold text-purple-deep shadow-[0_2px_10px_rgba(212,168,67,0.3)] transition-all hover:bg-gold-light hover:scale-105 active:scale-95 sm:inline-flex cursor-pointer"
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full bg-white/5 p-2 text-white hover:bg-white/10 lg:hidden focus:outline-none transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-18 left-4 right-4 z-40 rounded-2xl border border-white/10 bg-purple-deep p-6 shadow-2xl lg:hidden">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 text-left text-sm font-medium transition ${
                  currentTab === item.id
                    ? "text-gold font-semibold pl-2 border-l-2 border-gold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="mt-4 w-full rounded-xl bg-gold py-3 text-center text-sm font-semibold text-purple-deep transition duration-150 hover:bg-gold-light"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
