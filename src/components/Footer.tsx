import React from "react";
import { Mail, Phone, Globe, Twitter, AlertCircle } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden text-white/90 bg-[#11052C] border-t border-white/10 pt-24 pb-12">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top Section - Newsletter & Main Links */}
        <div className="grid gap-16 lg:grid-cols-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <span className="font-serif text-3xl font-medium text-gold">O</span>
                <span className="font-serif text-3xl font-medium text-white tracking-tight">credence</span>
              </div>
              <h3 className="font-sans text-gold uppercase tracking-[0.2em] text-xs font-bold mb-4">
                ETHICAL LIFESTYLE FINANCE
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-md mb-8">
                A financial technology platform connecting ethical capital providers, merchants, and faith-conscious customers across Nigeria.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <a href="mailto:ebrahim@credence.ng" className="hover:text-gold transition w-fit">ebrahim@credence.ng</a>
                <a href="tel:+2348056599547" className="hover:text-gold transition w-fit">+234 805 659 9547</a>
                <a href="https://credence.ng" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition w-fit">credence.ng</a>
                <a href="https://twitter.com/Credenceng" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition w-fit">@Credenceng</a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 pt-2">
            {/* Column 2 - Company */}
            <div>
              <h4 className="text-xs font-bold text-white mb-6 uppercase tracking-wider">Company</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><button onClick={() => handleNavClick("about")} className="hover:text-gold transition cursor-pointer">About</button></li>
                <li><button onClick={() => handleNavClick("about")} className="hover:text-gold transition cursor-pointer">Leadership</button></li>
                <li><button onClick={() => handleNavClick("advisor")} className="hover:text-gold transition cursor-pointer">Advisor</button></li>
                <li><button onClick={() => handleNavClick("contact")} className="hover:text-gold transition cursor-pointer">Contact</button></li>
              </ul>
            </div>

            {/* Column 3 - Products */}
            <div>
              <h4 className="text-xs font-bold text-white mb-6 uppercase tracking-wider">Products</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">All Products</button></li>
                <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">Umrah Financing</button></li>
                <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">Solar Financing</button></li>
                <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">Coming Soon</button></li>
              </ul>
            </div>

            {/* Column 4 - Partner with Us */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-bold text-white mb-6 uppercase tracking-wider">Partner with Us</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><button onClick={() => handleNavClick("partners")} className="hover:text-gold transition cursor-pointer">Strategic Partners</button></li>
                <li><button onClick={() => handleNavClick("capital")} className="hover:text-gold transition cursor-pointer">Capital Providers</button></li>
                <li><button onClick={() => handleNavClick("merchants")} className="hover:text-gold transition cursor-pointer">Merchants</button></li>
                <li><button className="hover:text-gold transition cursor-pointer">Referral Programme</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start justify-between text-xs text-white/40">
          <div className="flex shrink-0">
            <p>© 2026 Credence Technologies Ltd. All rights reserved.</p>
          </div>
          <div className="max-w-2xl text-left bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed">
            <p>
              Credence is a technology intermediary and does not operate as a licensed lender, bank, or financial institution. All financing products are originated and provided by licensed capital partners. Credence does not hold, deploy, or guarantee any capital. Product availability and terms are subject to partner approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
