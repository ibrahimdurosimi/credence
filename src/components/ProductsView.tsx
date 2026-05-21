import React, { useState } from "react";
import { Sparkles, Calendar, Calculator, Plane, House, Coins, CircleDollarSign, Check, HelpCircle, AlertCircle } from "lucide-react";
import { PRODUCTS } from "../data";

export default function ProductsView() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [packageCost, setPackageCost] = useState(PRODUCTS[0].itemCost);
  const [downPaymentPct, setDownPaymentPct] = useState(PRODUCTS[0].downPaymentPct);
  const [tenureMonths, setTenureMonths] = useState(12);

  // Murabaha calculator variables
  const handleProductChange = (prodId: string) => {
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod) {
      setSelectedProduct(prod);
      setPackageCost(prod.itemCost);
      setDownPaymentPct(prod.downPaymentPct);
      setTenureMonths(Math.min(12, prod.maxMonths));
    }
  };

  // Math logic:
  // Downpayment amount
  const downPaymentAmt = Math.round((packageCost * downPaymentPct) / 100);
  // Financed amount
  const financedAmt = packageCost - downPaymentAmt;
  // Murabaha cost-plus fixed profit margin: 
  // Let's assume a flat flat 1% profit margin per month (e.g., 12% simple profit markup on financed principal over 12 months)
  const flatMonthlyProfitRate = 0.01; 
  const totalProfitAmt = Math.round(financedAmt * flatMonthlyProfitRate * tenureMonths);
  // Admin processor processing cost
  const adminFee = 25000;
  // Total repayment amount (financed principal + profit + adminFee)
  const totalFinancedObligation = financedAmt + totalProfitAmt;
  // Monthly fixed installment
  const monthlyInstallment = Math.round(totalFinancedObligation / tenureMonths);

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in pb-20">
      {/* Hero Category Banner */}
      <section className="relative overflow-hidden bg-purple-deep text-white pt-32 pb-24 px-6 border-b border-[#E8E2D8]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Product Catalog
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Halal Financing.<br />
              <span className="text-gold italic font-serif">Predictable & Transparent.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-12">
              Browse our verified structures co-designed with Nigeria&apos;s accredited capital providers. Estimate your exact budgets instantly with our pre-stated profit modeling.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section First - Pure interactive value */}
      <section className="py-16 px-6 max-w-7xl mx-auto scroll-mt-24" id="calculator-section">
        <div className="bg-white rounded-3xl border border-[#E8E2D8] p-8 md:p-12 shadow-xl grid gap-12 lg:grid-cols-12">
          
          {/* Calculator Inputs Left (Lg: col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold font-mono mb-2">
                <Calculator className="h-4 w-4" /> Finance Estimator
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-purple-deep">
                Interactive Murabaha Calculator
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Halal financing uses "Murabaha" (cost-plus cost deferred trade). We purchase the item for you and sell it to you at cost plus a fixed flat profit margin pre-agreed. No variable fees.
              </p>
            </div>

            {/* Input 1: Product Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-deep block">
                Select Finance Product
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProductChange(p.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition ${
                      selectedProduct.id === p.id
                        ? "border-gold bg-gold/5"
                        : "border-[#E8E2D8] hover:border-slate-400 bg-white"
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-purple-deep/5">
                      {p.category === "lifestyle" ? <Plane className="h-4 w-4 text-purple-deep" /> : <House className="h-4 w-4 text-purple-deep" />}
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-purple-deep">{p.name}</span>
                      <span className="text-[10px] text-slate-500 block">{p.statusText}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Dynamic Cost Slider / Manual */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-deep">
                  Total Item Cost (₦)
                </label>
                <span className="font-mono text-sm font-bold text-purple-deep">
                  ₦{packageCost.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={Math.round(selectedProduct.itemCost * 0.5)}
                max={Math.round(selectedProduct.itemCost * 2.0)}
                step="50000"
                value={packageCost}
                onChange={(e) => setPackageCost(Number(e.target.value))}
                className="w-full h-1.5 accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Min: ₦{Math.round(selectedProduct.itemCost * 0.5).toLocaleString()}</span>
                <span>Max: ₦{Math.round(selectedProduct.itemCost * 2.0).toLocaleString()}</span>
              </div>
            </div>

            {/* Input 3: Downpayment Percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-deep">
                  Down Payment ({downPaymentPct}%)
                </label>
                <span className="font-mono text-sm font-bold text-purple-deep">
                  ₦{downPaymentAmt.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={selectedProduct.downPaymentPct}
                max="80"
                step="5"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full h-1.5 accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Minimum Required: {selectedProduct.downPaymentPct}%</span>
                <span>Max: 80%</span>
              </div>
            </div>

            {/* Input 4: Tenure Months */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-deep block mb-2">
                Financing Tenure (Months)
              </label>
              <div className="flex flex-wrap gap-2">
                {[3, 6, 12, 18, 24, 36, 48]
                  .filter((m) => m <= selectedProduct.maxMonths)
                  .map((month) => (
                    <button
                      key={month}
                      onClick={() => setTenureMonths(month)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                        tenureMonths === month
                          ? "bg-purple-deep text-white border-purple-deep"
                          : "bg-white text-slate-600 border-[#E8E2D8] hover:border-slate-400"
                      }`}
                    >
                      {month} Months
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Calculator Output Right (Lg: col-span-5) */}
          <div className="lg:col-span-5 bg-purple-deep rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="font-serif text-lg font-semibold border-b border-white/10 pb-4 mb-4 text-gold">
                Repayment Breakdown
              </h3>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Total Cost of Asset:</span>
                  <span className="font-mono">₦{packageCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-emerald-400 font-semibold">
                  <span>Down Payment (To pay today):</span>
                  <span className="font-mono">-₦{downPaymentAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Financed Principal:</span>
                  <span className="font-mono">₦{financedAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Stated Profit (1.0% flat/mo):</span>
                  <span className="font-mono text-gold">₦{totalProfitAmt.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Admin Processing Fee:</span>
                  <span className="font-mono">₦{adminFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 text-white/50 text-[11px] leading-relaxed">
                  <AlertCircle className="h-3 w-3 shrink-0 mt-0.5 text-gold" />
                  <span>The profit is mutually agreed, fixed upfront, and NEVER changes even in defaults. Zero variable compound interest.</span>
                </div>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="mt-8 border-t border-white/15 pt-6 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-white/50 block font-mono">
                  Fixed Monthly Installment
                </span>
                <div className="text-3xl md:text-4xl font-mono font-bold text-gold mt-1">
                  ₦{monthlyInstallment.toLocaleString()}
                  <span className="text-xs text-white/60 font-sans font-normal"> / month</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const element = document.getElementById("product-interest-apply");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-center py-3 bg-gold text-purple-deep font-bold text-sm rounded-xl hover:bg-gold-light hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer shadow-md"
              >
                Apply for pre-qualification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E8E2D8]">
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-2 font-mono">
            Verified Programs
          </span>
          <h2 className="font-serif text-3xl font-semibold text-purple-deep">
            Our Active Financing Suites
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-lg">
            Every listed product features audited, fully documented contracts representing clean ethical trade practices.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden hover:shadow-lg hover:border-gold/30 transition duration-200"
            >
              {/* Product Card Header */}
              <div className="p-6 bg-cream-mid border-b border-[#E8E2D8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-gold">
                    {prod.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-purple-deep mt-1">{prod.name}</h3>
                </div>
                <span
                  className={`text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                    prod.status === "live"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {prod.statusText}
                </span>
              </div>

              {/* Product Card Body */}
              <div className="p-8 space-y-6">
                <p className="text-slate-600 text-sm leading-relaxed">{prod.description}</p>

                {/* Requirements Grid */}
                <div className="grid grid-cols-2 gap-4 bg-cream p-4 rounded-xl text-center border border-[#E8E2D8]">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-mono block">Required Down Payment</span>
                    <span className="text-lg font-bold text-purple-deep font-mono mt-1 block">
                      {prod.downPaymentPct}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-mono block">Maximum Spread tenure</span>
                    <span className="text-lg font-bold text-purple-deep font-mono mt-1 block">
                      {prod.maxMonths} Mos
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 font-mono tracking-wider mb-3">
                    Contract Highlights
                  </h4>
                  <ul className="grid gap-2 text-sm text-slate-700">
                    {prod.features.map((feat, fidx) => (
                      <li key={fidx} className="flex gap-2 items-start">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick estimate button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedProduct(prod);
                      setPackageCost(prod.itemCost);
                      setDownPaymentPct(prod.downPaymentPct);
                      setTenureMonths(Math.min(12, prod.maxMonths));
                      const element = document.getElementById("calculator-section");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-center py-2.5 bg-purple-deep/5 hover:bg-gold/10 text-xs font-bold text-purple-deep hover:text-purple-deep border border-[#E8E2D8] hover:border-gold rounded-lg transition cursor-pointer"
                  >
                    Load into dynamic budget estimator
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anchor apply point */}
      <div id="product-interest-apply" />
    </div>
  );
}
