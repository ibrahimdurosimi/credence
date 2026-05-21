import React from "react";
import { Sparkles, Calendar, BookOpen, Award, Check } from "lucide-react";
import { MILESTONES, TEAM } from "../data";

export default function AboutView() {
  const principles = [
    {
      title: "Principle First",
      text: "Every product and partnership passes a strict ethical filter—no interest, no compound penalties, no riba, no compromise.",
    },
    {
      title: "Customer Owned",
      text: "We own the consumer trust, the data layer, and the service experience. Capital and custody partners align with our strict standards.",
    },
    {
      title: "Built for Scale",
      text: "We don't tinker at the edges or build custom localized niches. We are building unified financial infrastructure for 90 million underserved Nigerians.",
    },
  ];

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-purple-deep text-white pt-32 pb-24 px-6 border-b border-[#E8E2D8]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              About Credence
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Building the bridge <br />
              <span className="text-gold italic font-serif">ethical finance deserves.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              We exist to make interest-free financing accessible, simple, and dignified—at the scale Nigeria&apos;s underserved faith-conscious population deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision double bento */}
      <section className="py-20 px-6 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl border border-[#E8E2D8] bg-white p-10 hover:shadow-lg hover:border-gold/30 transition">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold block mb-3 font-mono">
              Our Mission
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-purple-deep mb-4">
              Build the trusted bridge between ethical capital and the people who need it.
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Making interest-free deferred payments convenient, highly transparent, and shariah-compliant—never asking consumers to compromise values for access.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-[#E8E2D8] bg-white p-10 hover:shadow-lg hover:border-gold/30 transition">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold block mb-3 font-mono">
              Our Vision
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-purple-deep mb-4">
              A frictionless three-sided marketplace matching capital, merchants, and buyers.
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Establishing a powerful, unified platform that powers consumer trust, automates underwriting data, and opens non-interest retail access.
            </p>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="bg-white border-y border-[#E8E2D8] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Our Principles
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-purple-deep">
              What we stand for.
            </h2>
            <div className="h-0.5 w-12 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((p, idx) => (
              <div key={idx} className="rounded-2xl bg-cream-mid border border-[#E8E2D8] p-8 hover:shadow-md hover:border-gold/30 transition">
                <h3 className="font-serif text-xl font-bold text-purple-deep mb-3">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Milestones Timeline split */}
      <section className="py-20 px-6 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Biography */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Leadership
            </span>
            {TEAM.map((member, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-serif text-3xl md:text-5xl font-semibold text-purple-deep">
                  {member.name}
                </h2>
                <p className="text-sm font-semibold tracking-wider uppercase text-gold font-mono">
                  {member.role}
                </p>
                <div className="h-0.5 w-12 bg-gold my-4" />
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  {member.bio.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Milestones */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-6 font-mono">
              Key Milestones
            </span>

            <ol className="relative border-l-2 border-gold/30 pl-8 space-y-8">
              {MILESTONES.map((milestone, idx) => (
                <li key={idx} className="relative group">
                  {/* Glowing gold dot */}
                  <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center">
                    <span className="h-3.5 w-3.5 rounded-full bg-gold border-2 border-cream group-hover:scale-110 transition shadow-[0_0_8px_rgba(212,168,67,0.5)]" />
                  </span>
                  <div>
                    <span className="font-serif text-xl font-bold block mb-1 text-purple-deep">
                      {milestone.year}
                    </span>
                    <h4 className="font-serif text-md font-semibold text-gold mb-2">{milestone.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
