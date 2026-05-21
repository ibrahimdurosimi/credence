import React from "react";
import { PARTNERS } from "../data";
import { Handshake, Landmark, Navigation, Zap, Award } from "lucide-react";

export default function PartnersView() {
  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-deep text-white pt-32 pb-24 px-6 border-b border-[#E8E2D8]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Collaborative trust
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Built on credibility.<br />
              <span className="text-gold italic font-serif">Powered by partnership.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Credence does not act as a balance-sheet lender or single travel operator. We orchestrate the verified agreements that lock in pricing, guarantee logistics, and manage capital custody transparently.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#E8E2D8] p-8 hover:shadow-lg hover:border-gold/30 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-1">
                  {partner.role}
                </span>
                <h3 className="font-serif text-2xl font-bold text-purple-deep mb-4">{partner.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{partner.description}</p>
              </div>

              {/* Styled Letter Representative Circular Logo */}
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-6">
                <div className="font-serif font-bold text-lg text-purple-deep flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold">
                  {partner.logo}
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-950">Active Integration</span>
                  <span className="block text-[10px] font-semibold text-gold uppercase font-mono tracking-wider">
                    Verified Halal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alliance Charter */}
      <section className="bg-white border-y border-[#E8E2D8] py-20 px-6">
        <div className="mx-auto max-w-3xl leading-relaxed text-center">
          <Award className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-purple-deep">
            The Credence Ethics & compliance Charter
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            All our digital contracts are independently vetted to secure non-interest validation, fully complying with local regulatory mandates and globally aligned shariah auditing criteria.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            <span>✓ Cost-plus Murabaha</span>
            <span>•</span>
            <span>✓ Rental Ijarah leasing</span>
            <span>•</span>
            <span>✓ Zero compounding variable rates</span>
          </div>
        </div>
      </section>
    </div>
  );
}
