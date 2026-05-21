import React from "react";
import { ShoppingBag, ArrowUpRight, TrendingUp, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

export default function MerchantsView() {
  const gains = [
    {
      title: "Elevated checkout conversion",
      text: "Stop losing high-intent shoppers who would otherwise abandon cart because compliant non-interest credit was unavailable.",
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />
    },
    {
      title: "Zero transaction risk",
      text: "Our partnered non-interest banks clear the full item cost upfront directly to your merchant account within 24 hours of contract signing.",
      icon: <ShoppingBag className="h-5 w-5 text-emerald-600" />
    },
    {
      title: "Expanded ticket values",
      text: "Allowing users to purchase higher-tier solar installations or comprehensive travels by converting expensive upfront lump sums into monthly installments.",
      icon: <Sparkles className="h-5 w-5 text-emerald-600" />
    }
  ];

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-deep text-white pt-32 pb-24 px-6 border-b border-[#E8E2D8]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              For Retail Merchants
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Convert ethical principle<br />
              <span className="text-gold italic font-serif">into purchase power.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Offer qualified deferred payment options directly at your point of sale. Convert moral high-intent browsers into buyers with fast approvals and zero inventory risk.
            </p>
          </div>
        </div>
      </section>

      {/* Main Benefits Columns */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
            Partner Benefits
          </span>
          <h2 className="font-serif text-3xl font-semibold text-purple-deep">
            Convert more, risk nothing.
          </h2>
          <div className="h-0.5 w-12 bg-gold mx-auto mt-4" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {gains.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E8E2D8] p-8 hover:shadow-md hover:border-gold/30 transition">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 mb-6 border border-emerald-100">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Merchant categories */}
      <section className="bg-white border-y border-[#E8E2D8] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-lg mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Market scope
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-purple-deep">
              Niches we serve or are onboarding
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Travel & Hajj Logistics", desc: "Live since 2025: bookings, flights, and Holy land travels." },
              { title: "Solar & Inverter setups", desc: "Pilot Q3 2026: residential and micro-business backup power." },
              { title: "Education & Tuition", desc: "Forming partnerships for high-ticket academic fees." }
            ].map((p, idx) => (
              <div key={idx} className="bg-cream border border-[#E8E2D8] p-6 rounded-2xl flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base font-bold text-purple-deep">{p.title}</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
