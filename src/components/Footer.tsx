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
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-purple-deep font-bold font-serif text-xl">
                  C
                </div>
                <span className="font-sans text-2xl font-bold text-white tracking-tight">
                  Credence
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-md">
                A premier ethical financial technology platform connecting capital providers, merchants, and faith-conscious customers across Nigeria.
              </p>
              
              {/* Newsletter */}
              <div className="max-w-md">
                <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-white/90 mb-3">Newsletter</h4>
                <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-white/5 border border-white/10 focus:border-gold rounded-full px-4 py-2.5 text-sm text-white outline-none transition"
                  />
                  <button type="submit" className="shrink-0 bg-gold text-purple-deep font-bold px-6 py-2.5 rounded-full hover:bg-gold-light transition">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1 - Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <button onClick={() => handleNavClick("about")} className="hover:text-gold transition cursor-pointer">About Us</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("about")} className="hover:text-gold transition cursor-pointer">Leadership</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("partners")} className="hover:text-gold transition cursor-pointer">Strategic Partners</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("contact")} className="hover:text-gold transition cursor-pointer">Contact Desk</button>
                </li>
              </ul>
            </div>

            {/* Column 2 - Products */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gold mb-6">Product Suite</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">All Products</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">UmrahNowPayLater</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">Solar Power Systems</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer">Rent Installments</button>
                </li>
              </ul>
            </div>

            {/* Column 3 - Partnerships */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gold mb-6">Integrations</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <button onClick={() => handleNavClick("capital")} className="hover:text-gold transition cursor-pointer">For Capital Providers</button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("merchants")} className="hover:text-gold transition cursor-pointer">For Retail Merchants</button>
                </li>
                <li>
                  <button className="hover:text-gold transition cursor-pointer">Ethics Board Charter</button>
                </li>
                <li>
                  <button className="hover:text-gold transition cursor-pointer">Sterling NIB Oversight</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-8" />

        {/* Contact & Social Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/70 font-mono">
            <a href="mailto:ebrahim@credence.ng" className="flex items-center gap-2 hover:text-gold transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gold">
                <Mail className="h-3.5 w-3.5" />
              </span>
              ebrahim@credence.ng
            </a>
            <a href="tel:+2348056599547" className="flex items-center gap-2 hover:text-gold transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gold">
                <Phone className="h-3.5 w-3.5" />
              </span>
              +234 805 659 9547
            </a>
          </div>
          <div className="flex gap-4">
            <a href="https://credence.ng" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:text-gold hover:border-gold transition">
              <Globe className="h-4 w-4" />
            </a>
            <a href="https://twitter.com/Credenceng" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:text-gold hover:border-gold transition">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between text-xs text-white/40">
          <div className="flex flex-col gap-2">
            <p>© 2026 Credence Technologies Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
            </div>
          </div>
          <div className="max-w-xl flex gap-3 leading-relaxed text-left bg-white/5 p-4 rounded-xl border border-white/10">
            <AlertCircle className="h-5 w-5 shrink-0 text-gold mt-0.5" />
            <p>
              Credence is an ethical technology intermediary and contract orchestrator, not a licensed financial institution or deposit-taking bank. 
              All financial contracts are processed, approved, and cleared through licensed non-interest banking collaborators including Sterling NIB. Valid RC: 1840292.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
