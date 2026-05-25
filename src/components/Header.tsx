import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Receipt, Coins, ShieldCheck, Compass, Moon, Sun } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkTheme: boolean;
  setTheme: (isDark: boolean) => void;
}

export default function Header({ currentTab, setCurrentTab, isDarkTheme, setTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { id: "umaiza", label: "Umaiza" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "build", label: "Build With Credence" },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-purple-deep/10 shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center cursor-pointer focus:outline-none group text-left"
          id="nav-logo"
        >
          <span className="font-serif text-3xl font-medium text-gold">O</span>
          <span className="font-serif text-3xl font-medium tracking-tight text-purple-deep">credence</span>
        </button>

        {/* Desktop Navbar */}
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition duration-200 cursor-pointer ${
                currentTab === item.id
                  ? 'font-semibold border-b-[2px] pb-1 mt-[2px] text-purple-deep border-purple-deep opacity-100'
                  : 'text-purple-deep opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTheme(!isDarkTheme)}
            className="p-2 focus:outline-none transition rounded-full text-purple-deep hover:bg-purple-deep/10"
            aria-label="Toggle Dark Theme"
          >
            {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => handleNavClick("umaiza")}
            className="hidden rounded-full px-6 py-2.5 text-xs font-bold shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all hover:scale-105 active:scale-95 sm:inline-flex cursor-pointer bg-purple-deep text-cream hover:bg-purple-deep/90"
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 lg:hidden focus:outline-none transition text-purple-deep hover:bg-purple-deep/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-18 left-4 right-4 z-40 rounded-2xl p-6 shadow-2xl lg:hidden bg-cream border border-purple-deep/10">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 text-left text-sm font-medium transition ${
                  currentTab === item.id
                    ? 'font-semibold pl-2 border-l-2 text-purple-deep border-purple-deep opacity-100'
                    : 'text-purple-deep opacity-70 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("umaiza")}
              className="mt-4 w-full rounded-full py-3 text-center text-sm font-semibold transition duration-150 bg-purple-deep text-cream hover:bg-purple-deep/90"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
