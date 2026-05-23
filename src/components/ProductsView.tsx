import React, { useState } from "react";
import { ArrowRight, Plane, House, Briefcase, Calculator, AlertCircle, Sparkles, CheckCircle2, ChevronDown, BookOpen } from "lucide-react";
import { PRODUCTS } from "../data";

export default function ProductsView({ setCurrentTab }: { setCurrentTab: (tab: string) => void }) {
  const [activeWaitlist, setActiveWaitlist] = useState<string | null>(null);

  // Calculator State
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [calcCost, setCalcCost] = useState(PRODUCTS[0].itemCost);
  const [calcDpPct, setCalcDpPct] = useState(PRODUCTS[0].downPaymentPct);
  const [calcTenure, setCalcTenure] = useState(PRODUCTS[0].maxMonths);

  const dpAmt = calcCost * (calcDpPct / 100);
  const principal = calcCost - dpAmt;
  // Based on the fullscale calculator, typically 1% per month flat profit rate is used as indicative
  const profit = principal * 0.01 * calcTenure;
  const adminFee = 25000;
  const totalObligation = principal + profit + adminFee;
  const monthly = calcTenure > 0 ? (totalObligation / calcTenure) : 0;

  const handleSelectProductGrid = (prod: typeof PRODUCTS[0]) => {
    setSelectedProduct(prod);
    setCalcCost(prod.itemCost);
    setCalcDpPct(prod.downPaymentPct);
    setCalcTenure(prod.maxMonths);
  };

  const getProductIcon = (id: string) => {
    switch(id) {
      case 'umrah': case 'hajj': return <Plane className="h-5 w-5" />;
      case 'education': return <BookOpen className="h-5 w-5" />;
      case 'solar': case 'rent': return <House className="h-5 w-5" />;
      case 'sme_inventory': return <Briefcase className="h-5 w-5" />;
      default: return <Plane className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-purple-deep text-white pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mb-6">
            Finance every chapter<br/>of your life. Ethically.
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-sans font-light">
            Three territories. Dozens of products. One principle — no RIBA, ever.
          </p>
        </div>
      </section>

      {/* TERRITORY EXPLORER */}
      <div className="max-w-7xl mx-auto px-6 py-20 divide-y divide-[#E8E2D8]">
        
        {/* TERRITORY 1 - LIFESTYLE */}
        <section className="py-20 lg:py-32 flex flex-col lg:flex-row gap-16 lg:items-start group">
          <div className="lg:sticky lg:top-32 lg:w-1/3">
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E0A4E]/5 text-gold mb-8 group-hover:bg-[#1E0A4E] transition-colors">
               <Plane className="h-8 w-8" />
             </div>
             <h2 className="font-serif text-4xl font-bold text-purple-deep mb-6">Lifestyle</h2>
             <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4 font-mono">
               Faith, Growth & Experience
             </div>
             <p className="text-slate-600 leading-relaxed mb-6">
               For the moments that define who you are. Umrah is not a luxury — it is an obligation. Education is not optional — it is investment. These are the things worth financing with integrity.
             </p>
          </div>
          <div className="lg:w-2/3 space-y-12">
             <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E8E2D8]">
               <h3 className="font-serif text-2xl font-bold text-purple-deep mb-4 flex items-center justify-between">
                 Umrah Financing <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono tracking-widest px-3 py-1.5 rounded-full uppercase">Live Now</span>
               </h3>
               <p className="text-slate-600 mb-8 border-b border-[#E8E2D8] pb-6">
                 Perform your holy pilgrimage today without financial burden. Structure: <strong>Murabaha</strong> (cost-plus).
               </p>
               <h4 className="text-xs font-bold text-purple-deep uppercase tracking-[0.1em] mb-4">Coming Soon in Lifestyle</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li className="flex justify-between items-center text-slate-700">Hajj Financing <span className="text-[10px] text-slate-500 font-mono">Q4 2026</span></li>
                 <li className="flex justify-between items-center text-slate-700">Studies Financing <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">Personal Travel <span className="text-[10px] text-slate-500 font-mono">2028</span></li>
               </ul>
             </div>
             
             <div className="grid sm:grid-cols-2 gap-8 bg-cream p-8 rounded-3xl border border-[#E8E2D8]">
               <div>
                  <h4 className="text-sm font-bold text-purple-deep mb-2 font-serif">Who this is for:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">The faith-conscious professional who wants to fulfil their spiritual and personal ambitions without waiting years to save — and without the guilt of interest.</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-purple-deep mb-2 font-serif">How it works:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">All Lifestyle products use <strong>Murabaha</strong> — a cost-plus structure where the price is agreed upfront and never changes.</p>
               </div>
             </div>
          </div>
        </section>

        {/* TERRITORY 2 - HOUSEHOLD */}
        <section className="py-20 lg:py-32 flex flex-col lg:flex-row gap-16 lg:items-start group">
          <div className="lg:sticky lg:top-32 lg:w-1/3">
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E0A4E]/5 text-gold mb-8 group-hover:bg-[#1E0A4E] transition-colors">
               <House className="h-8 w-8" />
             </div>
             <h2 className="font-serif text-4xl font-bold text-purple-deep mb-6">Household</h2>
             <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4 font-mono">
               Family, Home & Essentials
             </div>
             <p className="text-slate-600 leading-relaxed mb-6">
               A home should be a sanctuary, not a source of financial stress. Generator fuel costs are eating Nigerian family budgets alive. These are the essentials that deserve ethical financing.
             </p>
          </div>
          <div className="lg:w-2/3 space-y-12">
             <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E8E2D8]">
               <h3 className="font-serif text-2xl font-bold text-purple-deep mb-4 flex items-center justify-between">
                 Solar / Renewable Energy <span className="text-[10px] bg-amber-100 text-amber-800 font-mono tracking-widest px-3 py-1.5 rounded-full uppercase">Pilot Q3 2026</span>
               </h3>
               <p className="text-slate-600 mb-8 border-b border-[#E8E2D8] pb-6">
                 Power your home with clean, constant solar energy. Swap generator fuel for transparent installments.
               </p>
               <h3 className="font-serif text-2xl font-bold text-purple-deep mb-4 flex items-center justify-between mt-6">
                 Rent Financing <span className="text-[10px] bg-amber-100 text-amber-800 font-mono tracking-widest px-3 py-1.5 rounded-full uppercase">Q4 2026</span>
               </h3>
               <p className="text-slate-600 mb-8 border-b border-[#E8E2D8] pb-6">
                 Eliminate the painful 1-year upfront rent cycle. Credence pays your landlord upfront; you repay us monthly.
               </p>
               
               <h4 className="text-xs font-bold text-purple-deep uppercase tracking-[0.1em] mb-4">Coming Soon in Household</h4>
               <ul className="space-y-4 text-sm font-medium">
                 <li className="flex justify-between items-center text-slate-700">Auto Financing <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">Housing Down Payment <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">Nikkah / Wedding Financing <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">School Fees <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">Healthcare <span className="text-[10px] text-slate-500 font-mono">2028</span></li>
                 <li className="flex justify-between items-center text-slate-700">Home Appliances <span className="text-[10px] text-slate-500 font-mono">2028</span></li>
               </ul>
             </div>
             
             <div className="grid sm:grid-cols-2 gap-8 bg-cream p-8 rounded-3xl border border-[#E8E2D8]">
               <div>
                  <h4 className="text-sm font-bold text-purple-deep mb-2 font-serif">Who this is for:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">The Nigerian family building their foundation — managing a home, raising children, and trying to make smart financial decisions that don't compromise their values.</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-purple-deep mb-2 font-serif">How it works:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Household products use a mix of <strong>Murabaha</strong> (for goods) and <strong>Ijarah</strong> (for assets like solar and auto) — both fully Shariah-compliant structures.</p>
               </div>
             </div>
          </div>
        </section>

        {/* TERRITORY 3 - BUSINESS */}
        <section className="py-20 lg:py-32 flex flex-col lg:flex-row gap-16 lg:items-start group">
          <div className="lg:sticky lg:top-32 lg:w-1/3">
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E0A4E]/5 text-gold mb-8 group-hover:bg-[#1E0A4E] transition-colors">
               <Briefcase className="h-8 w-8" />
             </div>
             <h2 className="font-serif text-4xl font-bold text-purple-deep mb-6">Business</h2>
             <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4 font-mono">
               SME Capital & Growth
             </div>
             <p className="text-slate-600 leading-relaxed mb-6">
               Nigerian small businesses are the engine of the economy. But access to ethical working capital is almost non-existent at the SME level. Credence is changing that.
             </p>
          </div>
          <div className="lg:w-2/3 space-y-12">
             <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E8E2D8]">
               <h4 className="text-xs font-bold text-purple-deep uppercase tracking-[0.1em] mb-4">Coming Soon in Business</h4>
               <ul className="space-y-4 text-sm font-medium border-b border-[#E8E2D8] pb-8 mb-8">
                 <li className="flex justify-between items-center text-slate-700">SME Inventory Financing <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">Equipment Financing <span className="text-[10px] text-slate-500 font-mono">2027</span></li>
                 <li className="flex justify-between items-center text-slate-700">Working Capital <span className="text-[10px] text-slate-500 font-mono">2028</span></li>
                 <li className="flex justify-between items-center text-slate-700">Vocational Training <span className="text-[10px] text-slate-500 font-mono">2028</span></li>
               </ul>
             </div>
             
             <div className="grid sm:grid-cols-2 gap-8 bg-cream p-8 rounded-3xl border border-[#E8E2D8]">
               <div>
                  <h4 className="text-sm font-bold text-purple-deep mb-2 font-serif">Who this is for:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">The Muslim entrepreneur who refuses to grow their business on interest-based debt — and has been waiting for an ethical alternative that actually works.</p>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-purple-deep mb-2 font-serif">How it works:</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Business products use <strong>Murabaha</strong> for inventory and equipment, and <strong>Musharaka</strong> (partnership financing) for working capital — structures that align the interests of lender and borrower.</p>
               </div>
             </div>
          </div>
        </section>

      </div>

      {/* CALCULATOR TOOL SECTION */}
      <section className="bg-[#FAF8F5] py-24 px-6 border-y border-[#E8E2D8]" id="calculator">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-[#E8E2D8] flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left Column */}
            <div className="flex-1 space-y-12">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 text-gold uppercase text-[10px] font-bold tracking-widest font-mono">
                   <Calculator className="h-4 w-4" /> FINANCE ESTIMATOR
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-purple-deep mt-4 mb-4">
                   Interactive Murabaha Calculator
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                   Halal financing uses "Murabaha" (cost-plus cost deferred trade). We purchase the item for you and sell it to you at cost plus a fixed flat profit margin pre-agreed. No variable fees.
                </p>
              </div>

              {/* Select Product Grid */}
              <div>
                <label className="text-xs font-bold text-purple-deep uppercase tracking-widest block mb-6 font-mono">Select Finance Product</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PRODUCTS.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => handleSelectProductGrid(p)}
                      className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${selectedProduct.id === p.id ? 'border-gold bg-gold/5 ring-1 ring-gold/20' : 'border-[#E8E2D8] hover:border-gold/30 hover:bg-cream'}`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-purple-deep shrink-0 shadow-sm border border-[#E8E2D8]">
                         {getProductIcon(p.id)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-purple-deep mb-1">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase">{p.statusText}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-10">
                 {/* ITEM COST */}
                 <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-xs font-bold text-purple-deep uppercase tracking-widest font-mono">Total Item Cost (₦)</label>
                      <span className="font-mono font-bold text-purple-deep">₦{calcCost.toLocaleString()}</span>
                    </div>
                    <div className="relative pt-1">
                      <input 
                        type="range" 
                        min={Math.max(100000, selectedProduct.itemCost / 2)} 
                        max={selectedProduct.itemCost * 2} 
                        step="10000" 
                        value={calcCost} 
                        onChange={(e) => setCalcCost(parseInt(e.target.value) || 0)} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold" 
                      />
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] uppercase font-mono text-slate-400">
                       <span>Min: ₦{(Math.max(100000, selectedProduct.itemCost / 2)).toLocaleString()}</span>
                       <span>Max: ₦{(selectedProduct.itemCost * 2).toLocaleString()}</span>
                    </div>
                 </div>

                 {/* DOWN PAYMENT */}
                 <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-xs font-bold text-purple-deep uppercase tracking-widest font-mono">Down Payment ({calcDpPct}%)</label>
                      <span className="font-mono font-bold text-purple-deep">₦{dpAmt.toLocaleString()}</span>
                    </div>
                    <div className="relative pt-1">
                      <input 
                        type="range" 
                        min={selectedProduct.downPaymentPct} 
                        max="80" 
                        value={calcDpPct} 
                        onChange={(e) => setCalcDpPct(parseInt(e.target.value))} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold" 
                      />
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] uppercase font-mono text-slate-400">
                       <span>Minimum Required: {selectedProduct.downPaymentPct}%</span>
                       <span>Max: 80%</span>
                    </div>
                 </div>
                 
                 {/* TENURE */}
                 <div>
                    <label className="text-xs font-bold text-purple-deep uppercase tracking-widest block mb-4 font-mono">Financing Tenure (Months)</label>
                    <div className="flex flex-wrap gap-3">
                       {[3, 6, 12, 18, 24, 36, 48].filter(t => t <= selectedProduct.maxMonths).map(t => (
                          <button 
                            key={t}
                            onClick={() => setCalcTenure(t)}
                            className={`px-5 py-2.5 text-xs font-mono font-medium rounded-xl border transition-all ${calcTenure === t ? 'bg-[#1E0A4E] text-white border-[#1E0A4E] shadow-md' : 'bg-transparent text-purple-deep border-[#E8E2D8] hover:border-purple-deep/30'}`}
                          >
                            {t} Months
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-[420px] bg-[#1E0A4E] rounded-[2rem] p-8 lg:p-10 text-white flex flex-col justify-between shrink-0 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-32 bg-white/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
              
              <div className="relative z-10">
                 <h3 className="font-serif font-bold text-2xl mb-8 text-gold">Repayment Breakdown</h3>
                 
                 <div className="space-y-6 text-sm font-mono border-b border-white/10 pb-10 mb-10">
                   <div className="flex justify-between items-center">
                     <span className="text-white/70">Total Cost of Asset:</span>
                     <span className="font-bold">₦{calcCost.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                   </div>
                   <div className="flex justify-between items-center text-emerald-400">
                     <span>Down Payment (To pay today):</span>
                     <span className="font-bold">-₦{dpAmt.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-white/70">Financed Principal:</span>
                     <span className="font-bold">₦{principal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                   </div>
                   
                   <div className="flex justify-between items-center pt-4">
                     <span className="text-white/70">Stated Profit (1.0% flat/mo):</span>
                     <span className="text-gold font-bold">₦{profit.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-white/70">Admin Processing Fee:</span>
                     <span className="font-bold">₦{adminFee.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                   </div>
                 </div>
                 
                 <div className="flex gap-3 items-start mb-10 text-[11px] text-white/50 font-sans leading-relaxed">
                    <AlertCircle className="w-5 h-5 text-gold shrink-0 -mt-0.5" />
                    <p>
                      The profit is mutually agreed, fixed upfront, and NEVER changes even in defaults. Zero variable compound interest.
                    </p>
                 </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <div className="mb-8">
                   <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 mb-3 font-mono">Fixed Monthly Installment</div>
                   <div className="font-serif text-5xl font-bold text-gold flex items-baseline gap-2">
                     ₦{monthly.toLocaleString(undefined, {maximumFractionDigits:0})} 
                     <span className="text-sm font-sans font-normal text-white/50 tracking-normal">/ month</span>
                   </div>
                </div>
                
                <button 
                  onClick={() => setCurrentTab('advisor')}
                  className="w-full bg-gold hover:bg-yellow-500 text-[#1E0A4E] font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-sans"
                >
                   Apply for pre-qualification
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section className="bg-cream py-24 px-6 border-b border-[#E8E2D8]">
        <div className="max-w-3xl mx-auto text-center">
             <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-deep mb-6">
               Are you a merchant, capital provider, or institution?
             </h2>
             <p className="text-slate-600 leading-relaxed text-lg mb-8 max-w-xl mx-auto">
                Credence is actively onboarding partners across all three territories. If you serve any of the needs above — let's talk.
             </p>
             <button
               onClick={() => setCurrentTab("build")}
               className="inline-flex items-center gap-2 rounded-full border border-purple-deep bg-purple-deep text-white px-8 py-3.5 text-sm font-bold hover:bg-[#1E0A4E] transition cursor-pointer"
             >
               Build With Credence <ArrowRight className="h-4 w-4" />
             </button>
        </div>
      </section>

      {/* WAITLIST SECTION */}
      <section className="bg-gold text-purple-deep py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
             <h2 className="font-serif text-3xl font-bold mb-4">
               Don't see your product live yet?
             </h2>
             <p className="text-purple-deep/80 font-medium mb-8">
                Join the waitlist and be first to know when your category launches.
             </p>
             <button
               onClick={() => setCurrentTab("advisor")}
               className="inline-flex items-center gap-2 rounded-full bg-white text-purple-deep px-8 py-3.5 text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
             >
               Join Waitlist <ArrowRight className="h-4 w-4" />
             </button>
        </div>
      </section>

    </div>
  );
}
