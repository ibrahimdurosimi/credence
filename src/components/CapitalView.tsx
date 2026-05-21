import React from "react";
import { Landmark, ArrowUpRight, TrendingUp, Users, Percent, Coins, CheckCircle, ShieldCheck } from "lucide-react";

export default function CapitalView() {
  const stats = [
    {
      value: "90M",
      label: "Faith-conscious retail potential",
      desc: "Millions of individuals who reject compound traditional credit structures out of principle.",
      icon: <Users className="h-5 w-5 text-gold" />
    },
    {
      value: "₦6.5T",
      label: "Estimated retail finance requirement",
      desc: "Massive latent consumer demand for solar panel systems, tuition support, and wedding setups.",
      icon: <Coins className="h-5 w-5 text-gold" />
    },
    {
      value: "110%",
      label: "YoY sector growth scale",
      desc: "Ethical non-interest finance continues to expand as Nigeria's fastest growth vertical.",
      icon: <TrendingUp className="h-5 w-5 text-gold" />
    },
    {
      value: "47%",
      label: "North-West exclusion rates",
      desc: "High market gaps presenting immense opportunity for early capital mobilization.",
      icon: <Percent className="h-5 w-5 text-gold" />
    }
  ];

  const highlights = [
    "Pre-vetted, retail customer flow containing verified KYC checks",
    "Predictable flat commissions structured entirely on matching closed contracts",
    "Complete support for shariah compliance, audited by on-ground boards",
    "Real-time metadata reports on credit exposure and repayments from our proprietary data-layer"
  ];

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-purple-deep text-white pt-32 pb-24 px-6 border-b border-[#E8E2D8]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Institutional capital
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Retail distribution<br />
              <span className="text-gold italic font-serif">without physical overhead.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Islamic investment desks and non-interest desks focus on wholesale, large-margin corporate finance because retail distribution is costly. Credence closes that loop.
            </p>
          </div>
        </div>
      </section>

      {/* Numerical Metrics Cards Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E8E2D8] p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition">
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 rounded-lg bg-gold/10">
                  {item.icon}
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300" />
              </div>
              <span className="font-serif text-4xl font-extrabold text-purple-deep font-mono leading-none">
                {item.value}
              </span>
              <h3 className="font-serif text-sm font-bold text-purple-deep mt-3">{item.label}</h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alliance Split details */}
      <section className="bg-white border-y border-[#E8E2D8] py-20 px-6">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              The Credence standard
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-purple-deep mb-4">
              Pre-vetted, halal capital deployment.
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              We compile and maintain the client relationship, the transaction files, and contract execution. You deploy liquidity securely into finalized physical assets which we sell to the consumer using Murabaha.
            </p>
          </div>

          <div className="space-y-4">
            {highlights.map((text, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-cream border border-[#E8E2D8] p-5 rounded-2xl">
                <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
