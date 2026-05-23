import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Plane, House, ShieldCheck, Briefcase, Activity, CheckCircle, Clock, MessageSquare, BookOpen, Palette } from "lucide-react";
import AdvisorChat from "./AdvisorChat";
import { PRODUCTS } from "../data";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  setShowThemePopup?: (show: boolean) => void;
}

export default function HomeView({ setCurrentTab, setShowThemePopup }: HomeViewProps) {
  const [activeAccordionIdx, setActiveAccordionIdx] = useState(0);

  // Cycling headline words
  const financeWords = ["Finance", "Afford", "Enable", "Unlock", "Build", "Fund"];
  const compromiseWords = ["compromise", "guilt", "RIBA", "worry", "doubt", "limits"];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % financeWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [financeWords.length]);

  const accordions = [
    {
      title: "Lifestyle",
      subtitle: "Faith, growth & experience",
      icon: <Plane className="h-5 w-5 text-[#C9A84C]" />,
      items: [
        { name: "Umrah Financing", status: "Live now", statusType: "live" },
        { name: "Hajj financing", status: "Q4 2026", statusType: "soon" },
        { name: "Studies Financing", status: "2027", statusType: "coming" },
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
        { name: "Auto Financing", status: "2027", statusType: "coming" },
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
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in relative">
      
      {/* Absolute theme toggle button specifically on homepage */}
      {setShowThemePopup && (
        <button 
          onClick={() => setShowThemePopup(true)}
          className="fixed bottom-6 left-6 z-40 bg-white border border-purple-deep/10 hover:border-gold hover:text-gold shadow-lg rounded-full p-3.5 flex items-center justify-center text-purple-deep transition-all hover:scale-105 group"
          title="Change Aesthetic Theme"
        >
          <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-cream text-purple-deep pt-32 pb-24 px-6 lg:pt-40 lg:pb-32 lg:px-12">
        {/* Geometric Islamic-inspired Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l10 10-10 10-10-10L30 0zm0 60l10-10-10-10-10 10L30 60zM0 30l10-10 10 10-10 10L0 30zm60 0l-10-10-10 10 10 10 10-10z' fill='%23D4A843' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}></div>
        {/* Subtle patterned gold grids */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        {/* Beautiful blur orb top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

        <div className="relative mx-auto max-w-7xl z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-gold animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                Ethical Lifestyle Finance
              </span>
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[1.2] md:text-7xl tracking-tight text-purple-deep mb-8 min-h-[140px] md:min-h-[160px]">
              <span className="inline-block transition-all duration-500 text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600 italic pr-2">
                {financeWords[wordIdx]}
              </span>
              the life you want. Without <span className="inline-block transition-all duration-500 delay-100 text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600 italic pl-1">{compromiseWords[wordIdx]}</span>
            </h1>

            <p className="text-purple-deep/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 font-sans font-light">
              Credence is a financial technology platform that enables faith-conscious Nigerians to finance the life they want — without compromising the values they hold.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => setCurrentTab("umaiza")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-light text-purple-deep font-bold px-8 py-4 text-base shadow-[0_8px_24px_rgba(212,168,67,0.4)] hover:shadow-[0_12px_28px_rgba(212,168,67,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Get Started today <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentTab("products")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-purple-deep/20 bg-purple-deep/5 hover:bg-purple-deep/10 hover:border-purple-deep/30 text-purple-deep px-8 py-4 text-base font-semibold transition-all cursor-pointer"
              >
                See how it works
              </button>
            </div>
          </div>
          
          {/* Right side elements */}
          <div className="hidden lg:block relative h-[600px] w-full">
            <div className="absolute top-10 right-10 bg-white border border-purple-deep/10 rounded-3xl p-6 shadow-xl w-80 transform rotate-3 hover:rotate-0 transition duration-500 cursor-pointer hover:shadow-2xl z-20" onClick={() => setCurrentTab("products")}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                  <Plane className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-purple-deep font-serif text-lg font-medium">UmrahNowPayLater</div>
                  <div className="text-gold text-xs font-mono uppercase tracking-widest mt-1">0% RIBA</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-gold w-1/3" />
                </div>
                <div className="flex justify-between text-xs text-purple-deep/50 font-mono">
                  <span>30% Down</span>
                  <span>Spread over 36m</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-48 right-32 bg-white border border-purple-deep/10 rounded-3xl p-6 shadow-xl w-80 transform -rotate-3 hover:rotate-0 transition duration-500 cursor-pointer hover:shadow-2xl z-10" onClick={() => setCurrentTab("products")}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <House className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-purple-deep font-serif text-lg font-medium">Solar & Renewable</div>
                  <div className="text-emerald-600 text-xs font-mono uppercase tracking-widest mt-1">Cost-plus model</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-1/4" />
                </div>
                <div className="flex justify-between text-xs text-purple-deep/50 font-mono">
                  <span>Fixed profit</span>
                  <span>Zero compounding</span>
                </div>
              </div>
            </div>

            <div className="absolute top-80 right-4 bg-white border border-purple-deep/10 rounded-3xl p-6 shadow-xl w-80 transform rotate-6 hover:rotate-0 transition duration-500 cursor-pointer hover:shadow-2xl z-30" onClick={() => setCurrentTab("products")}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Briefcase className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-purple-deep font-serif text-lg font-medium">Business Assets</div>
                  <div className="text-blue-600 text-xs font-mono uppercase tracking-widest mt-1">Ijara Model</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-2/5" />
                </div>
                <div className="flex justify-between text-xs text-purple-deep/50 font-mono">
                  <span>Flexible term</span>
                  <span>Rent-to-own</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 3. Problem/Solution Section */}
      <section className="py-20 px-6 mx-auto max-w-7xl animate-fade-in">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
          Why Credence exists
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-purple-deep mb-4">
          Your ethical values shouldn't cost you access.
        </h2>
        <p className="text-purple-deep/80 max-w-2xl mb-12 text-sm md:text-base leading-relaxed">
          Non-interest banks target large corporate clients. Millions of retail customers go without—not because they don&apos;t qualify, but because consumer distribution was never bridged. Until now.
        </p>

        {/* Grid cards */}
        <div className="flex md:grid gap-4 md:gap-6 md:grid-cols-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
          <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-200">
            <span className="font-serif text-2xl font-semibold text-gold/40 block mb-4">01</span>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">RIBA is a hard line</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              For millions of Nigerians, interest-based financing is an absolute non-starter. The desire to maintain shariah-compliant integrity is the first priority.
            </p>
          </div>
          <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-200">
            <span className="font-serif text-2xl font-semibold text-gold/40 block mb-4">02</span>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">Institutions stay corporate</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              Non-interest banking exists, but consumer distribution is expensive, high-friction, and difficult to manage. Retail pipelines remain completely unaddressed.
            </p>
          </div>
          <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-2xl border border-purple-deep/10 bg-white p-8 hover:shadow-lg hover:border-gold/30 transition duration-200">
            <span className="font-serif text-2xl font-semibold text-gold/40 block mb-4">03</span>
            <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">No one built the bridge</h3>
            <p className="text-purple-deep/70 text-sm leading-relaxed">
              28.8 million Nigerians are completely financially excluded. Essential needs — solar, housing, education, pilgrimage — go unmet. Until now.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Advisor Immersive Section */}
      <section className="bg-purple-deep text-cream py-20 px-6 border-y border-cream/5">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Umaiza — AI-powered interest-free financial advisor
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight mb-4">
              Meet your personal<br />
              <span className="text-gold italic font-serif">ethical finance guide.</span>
            </h2>
            <p className="text-cream/70 text-sm md:text-base leading-relaxed max-w-lg mb-8">
              Not a chatbot. Not a form. A genuinely intelligent advisor that understands your needs, checks your eligibility, and connects you to the right ethical financing — in plain language, in minutes.
            </p>

            <ul className="space-y-3.5 mb-10 text-sm text-cream/80">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Understands your need in natural language</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Checks eligibility across all Credence products</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Explains how ethical financing actually works</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span>Available 24/7 — no appointment needed</span>
              </li>
            </ul>

            <button
              onClick={() => {
                const element = document.getElementById("advisor-chat-pane");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 hover:border-gold hover:text-gold px-6 py-3 text-sm font-semibold transition cursor-pointer"
            >
              Ask Umaiza <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Interactive Chat Block */}
          <div id="advisor-chat-pane" className="relative scroll-mt-24">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
            <div 
              className="relative rounded-[20px] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md cursor-pointer group hover:border-gold/50 transition-all aspect-[4/5] max-h-[520px] min-h-[480px] flex flex-col"
              onClick={() => setCurrentTab("umaiza")}
            >
              <div className="absolute inset-0 bg-purple-deep/60 group-hover:bg-purple-deep/40 transition-all z-20 flex flex-col items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none">
                 <div className="bg-[#D4A843] text-purple-deep px-7 py-3.5 rounded-full font-semibold shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform hover:bg-yellow-500">
                   Talk to Umaiza Now <ArrowRight className="h-4 w-4" />
                 </div>
              </div>
              
              <div className="p-4 px-5 border-b border-white/5 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none filter blur-[1px] group-hover:blur-none">
                <div className="flex items-center gap-3">
                  <div className="w-[38px] h-[38px] bg-gold rounded-full flex items-center justify-center font-serif text-[17px] font-semibold text-purple-deep">
                    U
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-white leading-tight">Umaiza</div>
                    <div className="flex items-center gap-1.5 text-[12px] text-white/40 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
                      Online — responds instantly
                    </div>
                  </div>
                </div>
              </div>

              <div className="opacity-50 group-hover:opacity-100 transition-opacity p-6 pointer-events-none filter blur-[1px] group-hover:blur-none flex-1 flex flex-col justify-end gap-3 pb-8">
                 <div className="bg-white/5 border border-white/10 text-white/85 p-4 py-3 rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px] rounded-tl-[2px] max-w-[85%] text-[13.5px] leading-[1.6]">
                   As-salamu alaykum! I'm Umaiza, your personal interest-free finance guide. What would you like to finance today?
                 </div>
                 <div className="bg-gold text-purple-deep p-4 py-3 rounded-tl-[14px] rounded-br-[14px] rounded-bl-[14px] rounded-tr-[2px] max-w-[85%] ml-auto text-[13.5px] leading-[1.6] font-medium">
                   I want to go for Umrah but I can't pay everything upfront
                 </div>
                 <div className="bg-white/5 border border-white/10 text-white/85 p-4 py-3 rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px] rounded-tl-[2px] max-w-[85%] text-[13.5px] leading-[1.6]">
                   MashaAllah — may Allah accept your intention! With Umrah Financing, you pay just 30% now and spread the rest over up to 36 months. 100% interest-free, fully halal. Want me to check if you qualify?
                 </div>
              </div>
            </div>
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
        <p className="text-purple-deep/80 max-w-xl mb-12 text-sm leading-relaxed">
          We don't lend capital. We don't sell merchandise. We orchestrate the trusted relationships that make ethical financing work at scale.
        </p>

        <div className="flex md:grid gap-4 md:gap-6 md:grid-cols-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
          <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-2xl border border-purple-deep/10 bg-white p-8 flex flex-col justify-between hover:border-gold transition duration-200">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-deep/5 text-purple-deep mb-6">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">For customers</h3>
              <p className="text-purple-deep/70 text-sm leading-relaxed mb-6">
                Interest-free financing for the things that matter — Umrah, education, energy, home. Your values, fully intact.
              </p>
            </div>
            <button onClick={() => setCurrentTab("products")} className="inline-flex items-center gap-1 text-sm font-bold text-purple-deep hover:text-gold transition cursor-pointer">
              Browse products <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-2xl border border-purple-deep/10 bg-white p-8 flex flex-col justify-between hover:border-emerald-600/30 transition duration-200">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/5 text-emerald-700 mb-6">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">For merchants</h3>
              <p className="text-purple-deep/70 text-sm leading-relaxed mb-6">
                Convert browsers to buyers with qualified ethical financing at checkout. No inventory risk, no integration hassle.
              </p>
            </div>
            <button onClick={() => setCurrentTab("merchants")} className="inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-gold transition cursor-pointer">
              Become a merchant <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-2xl border border-purple-deep/10 bg-white p-8 flex flex-col justify-between hover:border-gold/40 transition duration-200">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/5 text-gold mb-6">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-purple-deep mb-3">For capital providers</h3>
              <p className="text-purple-deep/70 text-sm leading-relaxed mb-6">
                Reach retail customers without building expensive consumer distribution. Pre-qualified, principle-aligned, ready to fund.
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
              <p className="text-purple-deep/80 text-base leading-relaxed">
                From pilgrimage requirements to solar backup power, and SME working support—we structure everything directly with authorized non-interest institutions.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("products")}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border-2 border-purple-deep bg-transparent text-purple-deep px-6 py-2.5 text-sm font-bold hover:bg-purple-deep hover:text-cream transition cursor-pointer"
            >
              View Full Catalog <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex md:grid gap-4 md:gap-6 md:grid-cols-3 items-stretch overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
            {accordions.map((accordion, accordionIdx) => (
              <div
                key={accordionIdx}
                className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center rounded-3xl border border-purple-deep/10 bg-white p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-purple-deep/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform duration-300">
                    {accordion.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-purple-deep">{accordion.title}</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-deep/50 mt-1">
                      {accordion.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {accordion.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between border-b border-dashed border-purple-deep/20 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-purple-deep/90">{item.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider ${
                          item.statusType === "live"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.statusType === "soon"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-purple-deep/10 text-purple-deep/70"
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
      <section className="bg-purple-deep text-cream py-20 px-6 text-center border-t border-cream/5">
        <div className="mx-auto max-w-3xl leading-relaxed">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono">
            YOUR ETHICAL FINANCIAL LIFE STARTS HERE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-6">
            Ready to finance the life<br />
            <span className="text-gold italic font-serif">you actually want?</span>
          </h2>
          <p className="text-cream/75 text-sm md:text-base max-w-lg mx-auto mb-10">
            Whether you're a customer, a merchant, or a capital partner — we'd love to talk.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentTab("umaiza")}
              className="inline-flex items-center gap-2 rounded-full bg-gold text-purple-deep font-semibold px-8 py-3.5 text-sm shadow-[0_4px_14px_rgba(212,168,67,0.35)] hover:scale-[1.02] transition cursor-pointer"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentTab("umaiza")}
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 hover:border-gold hover:text-gold px-8 py-3.5 text-sm transition cursor-pointer"
            >
              Talk to Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
