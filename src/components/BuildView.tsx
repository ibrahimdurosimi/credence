import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PARTNERS } from "../data";

export default function BuildView({ setCurrentTab }: { setCurrentTab: (tab: string) => void }) {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero */}
      <section className="bg-purple-deep text-white py-24 px-6 flex justify-center border-t border-white/5 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MCAwQzIyLjQgMCAwIDIyLjQgMCA1MHMyMi40IDUwIDUwIDUwIDUwLTIyLjQgNTAtNTBTNzEuNiAwIDUwIDB6TTEwIDUwaTJBNzMgNzMgMCAwIDEgNTcgOGwtMy0yQTc1IDc1IDAgMCAwIDYgNDhsNCAyaU05MCA1MGktMkE3MyA3MyAwIDAgMCA0MyA5MmwzIDJBNzUgNzUgMCAwIDEgOTQgNTJsLTQtMmkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-60"></div>
        </div>
        <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono">
            BUILD WITH CREDENCE
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            The ethical finance marketplace is being built. Be part of it.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
            Credence connects three types of partners into one ecosystem — capital providers who want retail distribution, merchants who want ethical checkout financing, and strategic partners who want to shape the future of values-based finance in Nigeria.
          </p>
        </div>
      </section>

      {/* Track 1 - Capital Providers */}
      <section className="py-24 px-6 border-b border-purple-deep/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:pr-16">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono">
              FOR CAPITAL PROVIDERS
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-purple-deep mb-6">
              Retail distribution without the overhead.
            </h2>
            <p className="text-purple-deep/70 leading-relaxed mb-6">
              Non-interest banks and ethical finance institutions chase corporate deals because retail distribution is expensive to build. Credence removes that barrier entirely. We bring you a pre-qualified, principle-aligned retail pipeline — you provide the capital product, we handle customer acquisition, onboarding, and relationship management.
            </p>
            <ul className="space-y-4 text-sm text-purple-deep/90 font-medium mb-10">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Pre-qualified retail customers</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Transparent 1–3% commission on closed deals</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Brand-safe, principle-aligned distribution</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Real-time portfolio analytics</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Co-designed product structures</li>
            </ul>
            <button className="flex items-center gap-2 text-purple-deep font-bold hover:text-gold transition group w-fit">
              Talk to our capital team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full lg:w-1/2">
             <div className="bg-cream rounded-2xl p-10 h-full flex flex-col justify-center border border-purple-deep/10">
                <div className="grid grid-cols-2 gap-8 text-center sm:text-left">
                  <div>
                    <div className="text-3xl font-serif text-purple-deep font-bold mb-1">90M</div>
                    <div className="text-xs uppercase tracking-wider text-purple-deep/50 font-mono">Addressable Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-purple-deep font-bold mb-1">$4B</div>
                    <div className="text-xs uppercase tracking-wider text-purple-deep/50 font-mono">Industry Size</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-purple-deep font-bold mb-1">110%</div>
                    <div className="text-xs uppercase tracking-wider text-purple-deep/50 font-mono">YoY Growth</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-purple-deep font-bold mb-1">1–3%</div>
                    <div className="text-xs uppercase tracking-wider text-purple-deep/50 font-mono">Commission</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Track 2 - Merchants */}
      <section className="py-24 px-6 border-b border-purple-deep/10 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 lg:pl-16">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono">
              FOR MERCHANTS
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-purple-deep mb-6">
              Convert principle into purchase.
            </h2>
            <p className="text-purple-deep/70 leading-relaxed mb-6">
              Millions of ethically-driven Nigerians abandon high-ticket purchases because no compliant financing exists at checkout. Credence brings them back to your storefront — qualified, motivated, and ready to buy. You focus on your product. We handle the financing.
            </p>
            <ul className="space-y-4 text-sm text-purple-deep/90 font-medium mb-10">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Higher conversion on high-ticket items</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Larger average transaction value</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Pre-qualified, principle-aligned buyers</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Risk-free — capital partners fund the deal</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Simple onboarding, branded checkout experience</li>
            </ul>
            <button className="flex items-center gap-2 text-purple-deep font-bold hover:text-gold transition group w-fit">
              Become a Credence merchant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full lg:w-1/2">
             <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10 h-full flex flex-col border border-purple-deep/10 items-center justify-center">
                 {/* Illustration of checkout */}
                 <div className="w-full max-w-sm border border-slate-200 rounded-xl overflow-hidden bg-[#fafafa]">
                    <div className="p-4 border-b border-slate-200 bg-white font-serif font-bold text-purple-deep">Merchant Checkout</div>
                    <div className="p-6 space-y-4">
                       <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                       <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                       <div className="pt-4 mt-4 border-t border-slate-200 space-y-3">
                         <div className="flex justify-between text-sm">
                            <span className="text-purple-deep/50">Total amount</span>
                            <span className="font-mono font-bold text-purple-deep">₦1,200,000</span>
                         </div>
                         <div className="w-full py-3 rounded-md bg-purple-deep text-white text-center text-sm font-semibold flex items-center justify-center gap-2 mt-2">
                           <span className="font-serif text-lg text-gold leading-none">O</span>
                           <span>Pay with Credence</span>
                         </div>
                       </div>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Track 3 - Strategic Partners */}
      <section className="py-24 px-6 border-b border-purple-deep/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:pr-16">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono">
              FOR STRATEGIC PARTNERS
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-purple-deep mb-6">
              Built on trust. Powered by collaboration.
            </h2>
            <p className="text-purple-deep/70 leading-relaxed mb-6">
              Credence is building Nigeria's ethical finance infrastructure. We are actively seeking strategic partners — technology providers, Islamic finance institutions, community organisations, and impact investors — who want to be part of that mission from the ground up.
            </p>
            <ul className="space-y-4 text-sm text-purple-deep/90 font-medium mb-10">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Early partner positioning in a growing ecosystem</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Co-design opportunities on new products</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Access to Credence's customer data insights</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gold" /> Association with Nigeria's leading ethical finance brand</li>
            </ul>
            <button className="flex items-center gap-2 text-purple-deep font-bold hover:text-gold transition group w-fit">
              Explore strategic partnership <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full lg:w-1/2">
             <div className="bg-purple-deep text-white rounded-2xl p-10 h-full flex flex-col justify-center">
                <h3 className="font-serif text-xl font-bold mb-8 text-gold">Our current ecosystem partners</h3>
                <div className="grid gap-4">
                  {PARTNERS.map(p => (
                    <div key={p.name} className="flex flex-col gap-2 p-5 rounded-xl border border-white/10 bg-white/5">
                       <div className="flex items-center justify-between">
                         <span className="font-bold font-serif text-lg">{p.name}</span>
                         <span className="text-[10px] font-mono uppercase text-white/50 border border-white/20 px-2 py-0.5 rounded-full">{p.role}</span>
                       </div>
                       <p className="text-xs text-white/70 leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center bg-cream">
        <h2 className="font-serif text-3xl font-bold text-purple-deep mb-8">Ready to build ethical finance together?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setCurrentTab("contact")} className="rounded-full bg-purple-deep px-8 py-3.5 text-sm font-bold text-white transition hover:bg-purple-deep/90 hover:scale-105">
            Get in touch &rarr;
          </button>
          <button onClick={() => setCurrentTab("umaiza")} className="rounded-full border border-purple-deep px-8 py-3.5 text-sm font-bold text-purple-deep transition hover:bg-white hover:scale-105">
            Ask Umaiza &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}
