import React from "react";
import { ArrowRight } from "lucide-react";
import { MILESTONES, TEAM } from "../data";

export default function AboutView() {
  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-purple-deep text-white py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-6">
            Building the bridge<br />ethical finance deserves.
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-sans font-light">
            We exist to make interest-free financing accessible, simple, and dignified — for every Nigerian who refuses to compromise their values to access it.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE STORY (WHY WE EXIST) */}
      <section className="py-24 px-6 mx-auto max-w-4xl">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-6 font-mono text-center">
          WHY WE EXIST
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-purple-deep mb-10 text-center leading-tight">
          Because 90 million Nigerians deserve better than a choice between their faith and their financial life.
        </h2>
        <div className="space-y-6 text-slate-700 leading-relaxed text-lg font-light">
          <p>
            For millions of Nigerians, money is not just a transaction. It is a moral act.
          </p>
          <p>
            When a Muslim professional needs to finance their child's university education, buy a car, install solar panels, or finally make that Umrah trip they have been planning for years — they face a choice that no one should have to make: compromise your values, or go without.
          </p>
          <p>
            This is not a small problem. Nigeria has over 90 million Muslims — the fifth largest Muslim population on earth. And yet the infrastructure to serve their financial needs with integrity barely exists at the retail level. The non-interest banks that do exist prioritise large corporate clients. The products that do exist are invisible, inaccessible, or poorly understood.
          </p>
          <p>
            The result? Millions of faith-conscious Nigerians either use interest-based products reluctantly — carrying the weight of that compromise quietly — or they simply opt out of the credit economy entirely. They go without the solar system that would cut their electricity costs. They delay Umrah for another year, and then another. They rent forever because they can never access an ethical mortgage.
          </p>
          <p>
            We started Credence because we believe this is fixable. Not with charity. Not with regulation. With technology and the right marketplace architecture.
          </p>
          <p className="font-medium text-purple-deep text-xl mt-8">
            Credence is the bridge.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE SCALE OF THE OPPORTUNITY */}
      <section className="bg-white py-24 px-6 border-y border-[#E8E2D8]">
        <div className="mx-auto max-w-6xl">
           <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-6 font-mono text-center">
            THE SCALE OF THE OPPORTUNITY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-purple-deep mb-16 text-center max-w-4xl mx-auto leading-tight">
            This isn't a niche market. It's the most underserved financial segment in Africa.
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
             <div>
               <div className="text-4xl md:text-5xl font-serif text-gold font-bold mb-2">90M</div>
               <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">Muslims in Nigeria</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-serif text-gold font-bold mb-2">$4B</div>
               <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">NIB sector size</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-serif text-gold font-bold mb-2">110%</div>
               <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">YoY sector growth</div>
             </div>
             <div>
               <div className="text-4xl md:text-5xl font-serif text-gold font-bold mb-2">47%</div>
               <div className="text-sm font-semibold uppercase tracking-wider text-slate-500 font-mono">NW exclusion rate</div>
             </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-slate-700 leading-relaxed text-lg font-light text-center">
             The non-interest banking sector in Nigeria is growing at 110% year-on-year. The demand is not the problem. Distribution is. There are only a handful of licensed non-interest institutions serving 90 million potential customers. The gap between supply and demand is not a crack — it is a chasm. And it represents one of the largest untapped financial markets on the African continent.
          </div>
        </div>
      </section>

      {/* SECTION 4: WHERE FINANCE IS GOING */}
      <section className="py-24 px-6 mx-auto max-w-4xl">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-6 font-mono text-center">
          WHERE FINANCE IS GOING
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-purple-deep mb-10 text-center leading-tight">
          The future of credit is ethical, values-based, and community-rooted.
        </h2>
        <div className="space-y-6 text-slate-700 leading-relaxed text-lg font-light">
          <p>
            Conventional credit was built for a world that assumed everyone shared the same relationship with money and debt. That world never existed — and it certainly does not describe Nigeria.
          </p>
          <p>
            Globally, Islamic finance assets exceeded $3.5 trillion in 2024 and are projected to reach $6.7 trillion by 2027 (Fitch Ratings). The fastest growing segment is not corporate sukuk or sovereign bonds — it is retail consumer finance. Ordinary people who want to buy things, fund experiences, and build lives without the burden of interest.
          </p>
          <p>
            In Nigeria, the CBN has been actively building the regulatory framework for non-interest finance. The infrastructure exists. What has been missing is the consumer-facing layer — the technology, the distribution, and the trust that turns a regulatory framework into a lived financial reality for millions of people.
          </p>
          <p>
            That is exactly what Credence is building.
          </p>
          <p>
            The future of credit in Nigeria is not a bigger loan book. It is a smarter, fairer marketplace — one where capital providers, merchants, and customers connect on terms that everyone can stand behind. Where your faith and your financial ambitions are not in conflict. Where the technology works as hard as you do.
          </p>
          <p className="font-medium text-purple-deep text-xl mt-8">
            Credence is not chasing the future. We are building it.
          </p>
        </div>
      </section>

      {/* SECTION 5: WHY THIS MATTERS BEYOND FAITH */}
      <section className="bg-[#1E0A4E] text-white py-24 px-6 border-y border-white/5">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-6 font-mono text-center">
            WHY THIS MATTERS BEYOND FAITH
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-white mb-10 text-center leading-tight">
            Financial exclusion is not just inconvenient. It is dangerous.
          </h2>
          <div className="space-y-6 text-white/80 leading-relaxed text-lg font-light">
            <p>
              When faith-conscious Nigerians are excluded from the formal credit economy, the consequences ripple outward in ways that affect everyone.
            </p>
            <p>
              Families that cannot access ethical financing for solar energy continue to spend 20-30% of their income on generator fuel — money that could have built savings, funded education, or grown a business.
            </p>
            <p>
              Young professionals who refuse interest-based student loans delay or abandon postgraduate education — limiting their earning potential and the human capital available to Nigeria's economy.
            </p>
            <p>
              Small business owners who cannot access ethical working capital either stagnate, borrow from exploitative informal lenders, or close entirely.
            </p>
            <p>
              And the broader economy loses. Every Nigerian who opts out of the formal financial system because it does not serve their values is a node of economic activity that goes unrecorded, unsupported, and unreached.
            </p>
            <p>
              The solution is not to ask people to compromise their values. The solution is to build a financial system worthy of them.
            </p>
            <p className="font-medium text-gold text-xl mt-8">
              That is Credence.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHAT WE STAND FOR */}
      <section className="py-24 px-6 border-b border-[#E8E2D8] bg-cream">
        <div className="max-w-6xl mx-auto">
           <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-4 font-mono text-center">
              WHAT WE STAND FOR
           </span>
           <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-purple-deep mb-16 text-center">
              What we stand for.
           </h2>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D8]">
                <h3 className="font-serif text-xl font-bold text-purple-deep mb-4">Principle First</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Every product and partnership passes a strict ethical filter. No interest. No compromise. No exceptions.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D8]">
                <h3 className="font-serif text-xl font-bold text-purple-deep mb-4">Customer Owned</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We own the relationship, the trust, and the data layer. Capital follows where the customer leads — not the other way around.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E2D8]">
                <h3 className="font-serif text-xl font-bold text-purple-deep mb-4">Built for Scale</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We are not building a niche product for a small community. We are building infrastructure for tens of millions of faith-conscious Nigerians — and anyone else who believes finance should be honest.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP */}
      <section className="py-24 px-6 border-b border-[#E8E2D8] bg-white">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-6 font-mono text-center">
            LEADERSHIP
          </span>
          {TEAM.map((member, idx) => (
            <div key={idx} className="bg-cream border border-[#E8E2D8] p-10 rounded-3xl mt-12 flex flex-col md:flex-row gap-10 items-start">
               <div className="w-24 h-24 bg-purple-deep rounded-full flex items-center justify-center text-4xl font-serif text-gold shrink-0">
                 {member.name.charAt(0)}
               </div>
               <div>
                  <h3 className="font-serif text-2xl font-bold text-purple-deep mb-2">{member.name}</h3>
                  <div className="text-sm uppercase tracking-widest text-slate-500 font-mono mb-6">{member.role}</div>
                  <div className="space-y-4 text-slate-700 leading-relaxed font-light">
                    <p>
                      Credence was not built from a whiteboard. It was built from lived experience — the frustration of watching capable, ambitious, faith-conscious Nigerians navigate a financial system that was not designed for them.
                    </p>
                    <p>
                      Eb'rahim spent four years in deliberate preparation before founding Credence: completing a PGD in Islamic Finance, working inside a non-interest financial institution to understand the industry from within, and studying the intersection of technology, ethics, and financial access across Nigeria and the GCC.
                    </p>
                    <p>
                      He brings a background in digital product innovation, growth marketing, and business model design — previously building an EdTech startup and a digital marketing agency. He is a 2019 alumnus of Accion Venture Lab, one of the world's leading fintech incubation programmes.
                    </p>
                    <p className="font-medium text-purple-deep">
                      Credence is the culmination of that preparation. A company built thesis-first — not because it was the easiest path, but because it was the right one.
                    </p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: KEY MILESTONES */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
           <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-12 font-mono text-center">
            KEY MILESTONES
          </span>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gold/30 before:to-transparent">
             {MILESTONES.map((ms, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold bg-cream text-purple-deep shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold font-serif text-sm">
                     {ms.year.substring(2)}
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-[#E8E2D8] bg-white shadow-sm transition hover:border-gold/50 hover:shadow-md">
                      <div className="font-mono text-xs text-gold uppercase tracking-widest mb-2 flex items-center justify-between">
                         {ms.year}
                      </div>
                      <h3 className="font-bold text-purple-deep mb-2">{ms.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{ms.description}</p>
                   </div>
                </div>
             ))}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold bg-cream text-purple-deep shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold font-serif text-sm">
                     26
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-[#E8E2D8] bg-white shadow-sm transition hover:border-gold/50 hover:shadow-md border-b-[3px] border-b-gold">
                      <div className="font-mono text-xs text-gold uppercase tracking-widest mb-2 flex items-center justify-between">
                         2026
                      </div>
                      <h3 className="font-bold text-purple-deep mb-2">Growth Phase</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">Credence website and Umaiza AI Advisor launched. Growth phase begins.</p>
                   </div>
                </div>
          </div>
        </div>
      </section>
    </div>
  );
}
