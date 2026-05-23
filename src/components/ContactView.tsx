import React, { useState } from "react";
import { Mail, Phone, Globe, MapPin, Send, CheckCircle2, Loader, ArrowRight } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    type: "Customer",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean dispatching
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="bg-cream text-purple-deep min-h-[600px] flex items-center justify-center px-6 py-20 animate-fade-in">
        <div className="bg-white border border-purple-deep/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-6 border border-emerald-100">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 animate-bounce" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3 text-purple-deep">
            Message Dispatched!
          </h2>
          <p className="text-purple-deep/50 text-sm leading-relaxed mb-8">
            Thank you, <span className="font-bold text-purple-deep">{formData.name}</span>. Your request as a <span className="font-bold text-purple-deep">{formData.type}</span> has been securely logged on our systems. Ebra'him Durosimi and the team will get in touch with you shortly.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", org: "", email: "", type: "Customer", message: "" });
            }}
            className="w-full text-center py-3 bg-purple-deep text-white font-semibold text-sm rounded-xl hover:bg-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            Send another message <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream text-purple-deep overflow-x-hidden animate-fade-in pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-deep text-white pt-32 pb-24 px-6 border-b border-purple-deep/10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#D4A843 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold md:w-3" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-3 font-mono">
              Get in touch
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Let&apos;s build a <span className="text-gold italic font-serif">legacy.</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              Whether you are an individual wanting to check Murabaha budgets, a retail merchant, or a capital partner—let&apos;s start the conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Main split work blocks */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Quick info columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-purple-deep/10 rounded-2xl p-6 flex items-start gap-4 hover:border-gold transition">
              <div className="p-3 bg-gold/15 rounded-xl text-gold">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-deep/40 uppercase tracking-widest font-bold">Email Desk</span>
                <span className="block text-sm font-semibold text-purple-deep mt-1">ebrahim@credence.ng</span>
              </div>
            </div>

            <div className="bg-white border border-purple-deep/10 rounded-2xl p-6 flex items-start gap-4 hover:border-gold transition">
              <div className="p-3 bg-gold/15 rounded-xl text-gold">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-deep/40 uppercase tracking-widest font-bold">Direct Phone</span>
                <span className="block text-sm font-semibold text-purple-deep mt-1">+234 805 659 9547</span>
              </div>
            </div>

            <div className="bg-white border border-purple-deep/10 rounded-2xl p-6 flex items-start gap-4 hover:border-gold transition">
              <div className="p-3 bg-gold/15 rounded-xl text-gold">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-deep/40 uppercase tracking-widest font-bold">Direct Web</span>
                <span className="block text-sm font-semibold text-purple-deep mt-1">credence.ng</span>
              </div>
            </div>

            <div className="bg-white border border-purple-deep/10 rounded-2xl p-6 flex items-start gap-4 hover:border-gold transition">
              <div className="p-3 bg-gold/15 rounded-xl text-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-deep/40 uppercase tracking-widest font-bold">Locations</span>
                <span className="block text-sm font-semibold text-purple-deep mt-1">Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Fully featured contact form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-purple-deep/10 rounded-3xl p-8 lg:col-span-3 space-y-6 shadow-md"
          >
            <h2 className="font-serif text-2xl font-semibold text-purple-deep">Send a Direct Inquiry</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-deep/50 font-mono">Your Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-purple-deep/10 focus:border-gold rounded-xl px-4 py-3 text-sm focus:outline-none transition"
                  placeholder="e.g. Ibrahim"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-deep/50 font-mono">Mail Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-purple-deep/10 focus:border-gold rounded-xl px-4 py-3 text-sm focus:outline-none transition"
                  placeholder="e.g. team@credence.ng"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-deep/50 font-mono">Organization</label>
                <input
                  type="text"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full bg-white border border-purple-deep/10 focus:border-gold rounded-xl px-4 py-3 text-sm focus:outline-none transition"
                  placeholder="Company name (optional)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-deep/50 font-mono">I am a</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-white border border-purple-deep/10 focus:border-gold rounded-xl px-4 py-3 text-sm focus:outline-none transition cursor-pointer"
                >
                  <option>Customer</option>
                  <option>Merchant</option>
                  <option>Capital Provider</option>
                  <option>Strategic Inquirer</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-deep/50 font-mono">Your Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-purple-deep/10 focus:border-gold rounded-xl px-4 py-3 text-sm focus:outline-none transition"
                placeholder="Kindly detail your requirements or support inquiries..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-gold hover:bg-[#c49835] text-purple-deep font-bold px-8 py-3.5 text-sm active:scale-95 disabled:opacity-40 disabled:scale-100 transition cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" /> Transmitting Details...
                </>
              ) : (
                <>
                  Transmit Message <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
