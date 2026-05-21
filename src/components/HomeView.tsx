import React, { useState } from "react";
import { Sparkles, ArrowRight, Plane, House, ShieldCheck, Briefcase, Activity, CheckCircle, Flame } from "lucide-react";
import AdvisorChat from "./AdvisorChat";
import { PRODUCTS } from "../data";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const [activeAccordionIdx, setActiveAccordionIdx] = useState(0);

  const accordions = [
    {
      title: "Lifestyle",
      subtitle: "Faith, growth & experience",
      icon: <Plane className="h-5 w-5 text-[#C9A84C]" />,
      items: [
        { name: "UmrahNowPayLater", status: "Live now", statusType: "live" },
        { name: "Hajj financing", status: "Q4 2026", statusType: "soon" },
        { name: "Higher education — MSc/PhD", status: "2027", statusType: "coming" },
        { name: "Professional certifications", status: "2027", statusType: "coming" },
      ],
    },
    {
      title: "Household",
      subtitle: "Family, home & essentials",
      icon: <House className="h-5 w-5 text-[#C9A84C]" />,
      items: [
        { name: "Solar / renewable energy", status: "Q3 2026", statusType: "soon" },
        { name: "Rent financing", status: "Q4 2026", statusType: "soon" },
        { name: "Housing down payment", status: "2027", statusType: "coming" },
        { name: "Nikkah / wedding prep", status: "2027", statusType: "coming" },
      ],
    },
    {
      title: "Business",
      subtitle: "SME capital & growth",
      icon: <Briefcase className="h-5 w-5 text-[#C9A84C]" />,
      items: [
        { name: "SME inventory financing", status: "2027", statusType: "coming" },
        { name: "Equipment financing", status: "2027", statusType: "coming" },
        { name: "Working capital facilities", status: "2028", statusType: "coming" },
      ],
    },
  ];

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E0A4E] via-[#2A1061] to-[#160636] text-white pt-40 pb-32 px-6">
        {/* Subtle patterned gold grids */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        {/* Beautiful blur orb top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        
        {/* Absolute visual golden border side decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gold to-gold-light md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 z-10">
          <div className="max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 mb-8 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-gold animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                Ethical Lifestyle Finance
              </span>
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[1.05] md:text-7xl tracking-tight text-white mb-8">
              Finance the life you want.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fdea98] italic md:not-italic drop-shadow-sm">Without compromise.</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 font-sans font-light">
              Credence is the trusted fintech platform enabling faith-conscious Nigerians to access retail financing completely interest-free—never compromising principle for convenience.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => setCurrentTab("contact")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light text-purple-deep font-bold px-8 py-4 text-base shadow-[0_8px_24px_rgba(212,168,67,0.4)] hover:shadow-[0_12px_28px_rgba(212,168,67,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Get Started today <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentTab("products")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 text-white px-8 py-4 text-base font-semibold transition-all cursor-pointer"
              >
                See how it works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Ticker Section */}
      <div className="bg-white border-y border-[#E8E2D8] py-4 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee flex-nowrap shrink-0">
          <div className="flex items-center gap-12 text-xs font-semibold uppercase font-mono tracking-wider text-slate-500">
            {Array(4).fill([
              "Ethical Finance", "Powered by Sterling NIB", "Zero RIBA", "UmrahNowPayLater", "HalalInside", "Aspire Tech"
            ]).flat().map((text, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>{text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Problem/Solution Section */}
      <section className="py-20 px-6 mx-auto max-w-7xl animate-fade-in">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
          Why Credence exists
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-purple-deep mb-4">
          Your ethical values shouldn't cost you access.
        </h2>
        <p className="text-slate-600 max-w-2xl mb-12 text-sm md:text-base leading-relaxed">
          Non-interest banks target large corporate clients. Millions of retail customers go without—not because they don&apos;t qualify, but because consumer distribution was never bridged. Until now.
        </p>

        {/* Grid cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-200">
            <span className="font-serif text-2xl font-semibold text-gold/40 block mb-4">01</span>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">RIBA is a hard line</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              For millions of Nigerians, interest-based financing is an absolute non-starter. The desire to maintain shariah-compliant integrity is the first priority.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-200">
            <span className="font-serif text-2xl font-semibold text-gold/40 block mb-4">02</span>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">Institutions stay corporate</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Non-interest banking exists, but consumer distribution is expensive, high-friction, and difficult to manage. Retail pipelines remain completely unaddressed.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-200">
            <span className="font-serif text-2xl font-semibold text-gold/40 block mb-4">03</span>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">We built the bridge</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Credence establishes raw, secure connections between customer demand, merchants, and banking liquidity—meaning simplified finance fully approved under non-interest standards.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Advisor Immersive Section */}
      <section className="bg-purple-deep text-white py-20 px-6 border-y border-white/5">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Credence Advisor
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight mb-4">
              Meet your personal<br />
              <span className="text-gold italic font-serif">ethical finance guide.</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg mb-8">
              Not a dry question form. Not a rigid bot. A highly compassionate advisor that outlines eligibility, details how contract leasing actually works, and matches you to the right non-interest product.
            </p>

            <ul className="space-y-3.5 mb-10 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Understands your need in natural English</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Explains the exact profit margins transparently</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Zero variable interest rates, zero hidden fees</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Direct interface with Sterling NIB processes</span>
              </li>
            </ul>

            <button
              onClick={() => {
                const element = document.getElementById("advisor-chat-pane");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-gold hover:text-gold px-6 py-3 text-sm font-semibold transition cursor-pointer"
            >
              Try Credence Advisor <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Interactive Chat Block */}
          <div id="advisor-chat-pane" className="relative scroll-mt-24">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <AdvisorChat />
          </div>
        </div>
      </section>

      {/* 5. Marketplace Grid */}
      <section className="py-20 px-6 mx-auto max-w-7xl">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
          A three-sided marketplace
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-purple-deep mb-4">
          One platform. Three winners.
        </h2>
        <p className="text-slate-600 max-w-xl mb-12 text-sm leading-relaxed">
          We don't buy or warehouse inventory. We don't lend direct banking capital. We orchestrate the interface that allows individuals, merchants, and ethical funders to connect.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 flex flex-col justify-between hover:border-gold transition duration-200">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-deep/5 text-purple-deep mb-6">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">For customers</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Spread expensive life costs across predictable fixed monthly tenures completely free of variable riba. Secure and private with immediate decisions.
              </p>
            </div>
            <button onClick={() => setCurrentTab("products")} className="inline-flex items-center gap-1 text-sm font-bold text-purple-deep hover:text-gold transition cursor-pointer">
              Browse products <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 flex flex-col justify-between hover:border-emerald-600/30 transition duration-200">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/5 text-emerald-700 mb-6">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">For merchants</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Offer installment checkouts to high-intent shoppers, converting browsers who would normally walk away. 100% of purchase values settled instantly.
              </p>
            </div>
            <button onClick={() => setCurrentTab("merchants")} className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-gold transition cursor-pointer">
              Become a merchant <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-[#E8E2D8] bg-white p-8 flex flex-col justify-between hover:border-gold/40 transition duration-200">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/5 text-gold mb-6">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">For capital providers</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Reach highly pre-qualified retail pipeline to deploy capital. Fully audited compliance, real-time risk scores, zero direct branch operation cost.
              </p>
            </div>
            <button onClick={() => setCurrentTab("capital")} className="inline-flex items-center gap-1 text-sm font-bold text-amber-800 hover:text-gold transition cursor-pointer">
              Partner with us <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Product Focus Areas / Bento Grid */}
      <section className="bg-cream border-t border-purple-deep/5 py-24 px-6 relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #D4A843 1px, transparent 1px), linear-gradient(to bottom, #D4A843 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
                Product focus areas
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-purple-deep mb-4">
                Built for every stage of life.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                From pilgrimage requirements to solar backup power, and SME working support—we structure everything directly with authorized non-interest institutions.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("products")}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border-2 border-purple-deep bg-transparent text-purple-deep px-6 py-2.5 text-sm font-bold hover:bg-purple-deep hover:text-white transition cursor-pointer"
            >
              View Full Catalog <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {accordions.map((accordion, accordionIdx) => (
              <div
                key={accordionIdx}
                className="rounded-3xl border border-purple-deep/10 bg-white p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-purple-deep/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform duration-300">
                    {accordion.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-purple-deep">{accordion.title}</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                      {accordion.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {accordion.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-slate-700">{item.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider ${
                          item.statusType === "live"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.statusType === "soon"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Action CTA Section */}
      <section className="bg-purple-deep text-white py-20 px-6 text-center border-t border-white/5">
        <div className="mx-auto max-w-3xl leading-relaxed">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono">
            Get Started with Credence
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-6">
            Ready to finance the life<br />
            <span className="text-gold italic font-serif">you actually want?</span>
          </h2>
          <p className="text-white/75 text-sm md:text-base max-w-lg mx-auto mb-10">
            Join thousands of modern Nigerians who align their wealth structures to their personal ethical standards. Apply for free inside minutes.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentTab("contact")}
              className="inline-flex items-center gap-2 rounded-full bg-gold text-purple-deep font-semibold px-8 py-3.5 text-sm shadow-[0_4px_14px_rgba(212,168,67,0.35)] hover:scale-[1.02] transition cursor-pointer"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("advisor-chat-pane");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-gold hover:text-gold px-8 py-3.5 text-sm transition cursor-pointer"
            >
              Talk to Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
