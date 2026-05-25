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
    <footer className="relative overflow-hidden bg-purple-deep pt-32 pb-4">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        
        {/* Main Floating Footer Card (Cream) */}
        <div className="bg-cream rounded-[40px] p-6 lg:p-12 relative mt-16 lg:mt-24 shadow-2xl">
          
          {/* Nested Inner Banner Card (Purple/Gold) - Overlapping top */}
          <div className="bg-gradient-to-br from-purple-deep to-[#2A0E5C] text-white rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:-mt-24 lg:-mt-32 mb-12 shadow-xl border border-gold/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-[60px] pointer-events-none" />
            <div className="max-w-xl relative z-10">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Stay updated with ethical finance.</h2>
              <p className="text-white/80 font-sans mb-6">Subscribe to our newsletter for the latest updates, transparent insights, and new product announcements from Credence.</p>
              
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <button className="bg-gold text-purple-deep px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Bold Decorative Element (Image 2 vibes) */}
            <div className="hidden lg:flex items-center justify-center opacity-10 font-serif font-black text-9xl uppercase select-none pointer-events-none">
              NEWS
            </div>
          </div>

          {/* Links Section */}
          <div className="grid gap-16 lg:grid-cols-12 mb-12 pb-12 border-b border-purple-deep/10">
            
            {/* Brand Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6">
                  <span className="font-serif text-3xl font-medium text-gold mr-1">O</span>
                  <span className="font-serif text-3xl font-medium text-purple-deep tracking-tight">credence</span>
                </div>
                <p className="text-sm text-purple-deep/70 leading-relaxed max-w-sm mb-8">
                  A financial technology platform connecting ethical capital providers, merchants, and faith-conscious customers across Nigeria.
                </p>
                
                {/* Social Links */}
                <div className="flex items-center gap-4 text-purple-deep mb-8 lg:mb-0">
                  <a href="https://twitter.com/Credenceng" target="_blank" rel="noopener noreferrer" className="bg-purple-deep/5 p-3 rounded-full hover:bg-gold hover:text-purple-deep transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="mailto:ebrahim@credence.ng" className="bg-purple-deep/5 p-3 rounded-full hover:bg-gold hover:text-purple-deep transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="https://credence.ng" className="bg-purple-deep/5 p-3 rounded-full hover:bg-gold hover:text-purple-deep transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Nav Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Column 1 - Company */}
              <div>
                <h4 className="text-sm font-bold text-purple-deep/90 mb-6 font-serif">Company</h4>
                <ul className="space-y-4 text-sm text-purple-deep/70">
                  <li><button onClick={() => handleNavClick("about")} className="hover:text-gold transition cursor-pointer font-medium">About us</button></li>
                  <li><button onClick={() => handleNavClick("advisor")} className="hover:text-gold transition cursor-pointer font-medium">Advisor</button></li>
                  <li><button onClick={() => handleNavClick("contact")} className="hover:text-gold transition cursor-pointer font-medium">Contact</button></li>
                  <li><button className="hover:text-gold transition cursor-pointer font-medium">Careers</button></li>
                </ul>
              </div>

              {/* Column 2 - Products */}
              <div>
                <h4 className="text-sm font-bold text-purple-deep/90 mb-6 font-serif">Products</h4>
                <ul className="space-y-4 text-sm text-purple-deep/70">
                  <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer font-medium">All Services</button></li>
                  <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer font-medium">Umrah Financing</button></li>
                  <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer font-medium">Solar Financing</button></li>
                  <li><button onClick={() => handleNavClick("products")} className="hover:text-gold transition cursor-pointer font-medium">Business Assets</button></li>
                </ul>
              </div>

              {/* Column 3 - Contact Info */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-sm font-bold text-purple-deep/90 mb-6 font-serif">Contact</h4>
                <ul className="space-y-4 text-sm text-purple-deep/70">
                  <li className="flex flex-col">
                    <span className="text-xs text-purple-deep/50 uppercase tracking-wider mb-1 font-semibold">Phone</span>
                    <a href="tel:+2348056599547" className="hover:text-gold transition font-medium">+234 805 659 9547</a>
                  </li>
                  <li className="flex flex-col mt-4">
                    <span className="text-xs text-purple-deep/50 uppercase tracking-wider mb-1 font-semibold">Email</span>
                    <a href="mailto:ebrahim@credence.ng" className="hover:text-gold transition font-medium">ebrahim@credence.ng</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright & Secondary Links */}
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-purple-deep/60 gap-4 mb-8">
            <p>© 2026 Credence Technologies Ltd. All rights reserved.</p>
            <div className="flex gap-6 font-medium">
              <a href="#" className="hover:text-gold transition">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition">Terms of Use</a>
              <a href="#" className="hover:text-gold transition">Legal</a>
            </div>
          </div>

          {/* Legal Disclaimer Block (Image 3 implementation) */}
          <div className="bg-[#f2f2f2] rounded-2xl p-6 md:p-8 text-left border border-[#e5e5e5]">
            <div className="flex items-center gap-3 mb-4 text-[#333]">
              <AlertCircle className="w-5 h-5 text-[#666]" />
              <h3 className="font-serif text-2xl text-[#333] tracking-tight">Disclaimer of liability</h3>
            </div>
            <div className="space-y-3 text-sm text-[#555] leading-relaxed">
              <p>
                Credence accept no responsibility should any damages be caused to a person as a result of the use that is made of information provided in, or taken from, this site or as a result of reliance on the information available on the site.
              </p>
              <p>
                This disclaimer of liability also applies to any damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction, or unauthorized access to, alteration of, or use of information under any cause of action. Credence is a technology intermediary and does not operate as a licensed lender or bank. All financing products are originated and provided by licensed capital partners.
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
