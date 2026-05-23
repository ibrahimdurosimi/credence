import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, Calculator, ShieldCheck, Building2, Lightbulb, Target, MessageSquare, Send, Share2, Download, ChevronRight, X } from "lucide-react";

interface AdvisorViewProps {
  setCurrentTab: (tab: string) => void;
}

type Message = {
  id: string;
  sender: "bot" | "user";
  text?: string;
  tool?: string;
};

export default function AdvisorView({ setCurrentTab }: AdvisorViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "As-salamu alaykum! 👋 I'm Umaiza — your personal ethical finance guide.\n\nI'm here to help you make smart, interest-free financial decisions — whether you're ready to apply today, still planning ahead, or just exploring your options.\n\nHere's what I can help you with:\n💬 Find the right halal financing for your need\n📊 Check if you're financially ready for financing\n💡 Improve your financial position — spending tips, savings goals\n🧮 Calculate your monthly payments — no RIBA, no surprises\n🏦 Compare non-interest banks — neutral and honest\n🔍 Bust myths about Islamic finance\n📋 Build your personal finance roadmap\n\nWhat's on your mind today?",
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [activeTool, setActiveTool] = useState("ask-umaiza");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: "ask-umaiza", icon: MessageCircle, label: "Ask Umaiza" },
    { id: "murabaha", icon: Calculator, label: "Murabaha Calc" },
    { id: "readiness", icon: ShieldCheck, label: "Readiness Check" },
    { id: "comparator", icon: Building2, label: "Bank Comparator" },
    { id: "myths", icon: Lightbulb, label: "Myth Buster" },
    { id: "planner", icon: Target, label: "Finance Planner" },
    { id: "whatsapp", icon: MessageSquare, label: "WhatsApp" },
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setActiveTool("ask-umaiza");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ sender: m.sender, text: m.text }))
            .filter(m => m.text) // filter out tool-only messages if any
        })
      });
      const data = await response.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: data.reply }]);
    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: "I'm having trouble connecting right now. Let me know if I can help with anything else!" }]);
    }
  };

  const activateTool = (toolId: string) => {
    setActiveTool(toolId);
    let introText = "";
    if (toolId === "murabaha") introText = "Let me calculate that for you. Adjust the sliders to see your exact monthly payment — no hidden fees, no surprises.";
    else if (toolId === "readiness") introText = "Let's check if you're ready to apply. I'll ask you 4 quick questions — it takes about 60 seconds.";
    else if (toolId === "comparator") introText = "I'll help you find the right non-interest bank for your specific need. What are you looking to finance?";
    else if (toolId === "myths") introText = "Let's bust some myths about halal finance. Tap True or False — I'll reveal the real answer after each one.";
    else if (toolId === "planner") introText = "Let's map your ethical financial life. Select the goals you're working toward and I'll build your personal financing roadmap.";
    else if (toolId === "whatsapp") introText = "Prefer WhatsApp? Send Umaiza a message directly — same intelligence, in the app you already use.";
    
    if (introText) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "bot", text: introText, tool: toolId }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1E0A4E] text-white overflow-hidden w-full font-sans relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0" style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}></div>
      
      <div className="w-full max-w-[680px] mx-auto bg-[#1E0A4E] shadow-2xl h-full flex flex-col relative z-10 border-x border-white/5">
        {/* 1. Top Bar */}
        <div className="flex-none bg-[#150838] border-b border-white/[0.06] px-4 py-3 flex items-center justify-between z-10 sticky top-0">
          <button onClick={() => setCurrentTab("home")} className="flex items-center gap-1.5 text-white/70 hover:text-white transition cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[13px] font-medium">Back</span>
          </button>
          <div className="flex items-center">
            <span className="font-serif text-[22px] font-medium text-[#D4A843]">O</span>
            <span className="font-serif text-[22px] font-medium text-white tracking-tight">credence</span>
          </div>
          <div className="w-12"></div> {/* Spacer for balance */}
        </div>

        {/* 2. Umaiza Hero */}
        <div className="flex-none py-6 px-4 flex flex-col items-center justify-center text-center">
          <div className="relative mb-3">
            <div className="w-14 h-14 bg-[#D4A843] rounded-full flex items-center justify-center font-serif text-[26px] font-bold text-[#1E0A4E]">
              U
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#1E0A4E] rounded-full p-1 border-2 border-[#1E0A4E]">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="font-serif text-2xl text-white mb-1.5 font-medium">Umaiza</h1>
          <div className="text-[13px] text-white/50 mb-1">AI-powered · Interest-free financial advisor</div>
          <div className="text-[13px] text-white/50 mb-3">Ask anything. Get real answers. No RIBA.</div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Online — responds instantly
          </div>
        </div>

        {/* 3. Tool Selector */}
        <div className="flex-none py-3 border-y border-white/5 bg-[#1E0A4E]/50">
          <div className="px-4 text-[11px] uppercase tracking-[0.15em] text-[#D4A843] mb-2.5 font-medium">Choose a tool</div>
          <div className="flex overflow-x-auto hide-scrollbar px-4 pb-2 gap-2 snap-x">
            {tools.map(tool => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button 
                  key={tool.id} 
                  onClick={() => activateTool(tool.id)}
                  className={`snap-start flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-[13px] transition-all cursor-pointer border ${
                    isActive 
                      ? "bg-[#D4A843]/10 border-[#D4A843]/30 text-[#D4A843]" 
                      : "bg-white/5 border-transparent text-white/60 hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4A843]" : "text-white/40"}`} />
                  <span className={isActive ? "font-medium" : ""}>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Main Tool Area / Conversation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 pb-[120px] w-full hide-scrollbar">
          <div className="flex flex-col gap-4 max-w-[700px] mx-auto w-full">
            {messages.map((msg, idx) => (
              <React.Fragment key={msg.id}>
                {msg.text && (
                  <div
                    className={`flex flex-col text-[14px] leading-[1.6] shadow-sm animate-fade-in-up w-fit
                      ${msg.sender === "user" 
                        ? "bg-[#D4A843] text-[#1E0A4E] rounded-tl-[16px] rounded-tr-[4px] rounded-br-[16px] rounded-bl-[16px] font-medium max-w-[85%] self-end p-3.5 px-4" 
                        : "bg-white/[0.07] text-white/90 rounded-tl-[4px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] max-w-[90%] p-4 whitespace-pre-wrap"
                      }`
                    }
                  >
                    {msg.text}
                  </div>
                )}
                
                {/* Render Tool Cards inline */}
                {msg.tool === "murabaha" && <MurabahaTool />}
                {msg.tool === "readiness" && <ReadinessTool />}
                {msg.tool === "comparator" && <ComparatorTool />}
                {msg.tool === "myths" && <MythsTool />}
                {msg.tool === "planner" && <PlannerTool />}
                {msg.tool === "whatsapp" && <WhatsAppTool />}
              </React.Fragment>
            ))}

            {messages.length === 1 && activeTool === "ask-umaiza" && (
               <div className="flex flex-col gap-2 mt-2 w-full max-w-[320px]">
                 <button onClick={() => handleSend("I need financing for something specific")} className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[13px] text-white/80 flex justify-between items-center hover:bg-white/10 transition text-left cursor-pointer">
                   I need financing for something specific <ChevronRight className="w-3.5 h-3.5 text-[#D4A843]" />
                 </button>
                 <button onClick={() => handleSend("Am I ready to take on financing?")} className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[13px] text-white/80 flex justify-between items-center hover:bg-white/10 transition text-left cursor-pointer">
                   Am I ready to take on financing? <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                 </button>
                 <button onClick={() => handleSend("How does halal financing work?")} className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[13px] text-white/80 flex justify-between items-center hover:bg-white/10 transition text-left cursor-pointer">
                   How does halal financing work? <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                 </button>
                 <button onClick={() => handleSend("What products are available now?")} className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[13px] text-white/80 flex justify-between items-center hover:bg-white/10 transition text-left cursor-pointer">
                   What products are available now? <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                 </button>
               </div>
            )}

            {isTyping && (
              <div className="bg-white/[0.07] rounded-tl-[4px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] p-4 flex gap-1.5 items-center w-fit animate-fade-in-up">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            )}
            <div ref={scrollRef} className="h-4" />
          </div>
        </div>

        {/* Input Bar Persistent */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1E0A4E]/90 backdrop-blur-xl border-t border-white/5 px-4 pt-4 pb-4 z-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex gap-2.5 items-center w-full"
          >
            <div className="flex-1 bg-white/[0.04] border border-white/5 rounded-full px-5 py-3.5 flex items-center shadow-inner">
               <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Umaiza anything..."
                  className="w-full bg-transparent text-[14px] text-white placeholder-white/30 focus:outline-none focus:ring-0 font-sans"
               />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="w-[48px] h-[48px] bg-[#D4A843] rounded-full flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 transition-transform active:scale-95 shadow-lg shadow-[#D4A843]/20"
            >
              <Send className="w-[18px] h-[18px] text-[#1E0A4E] shrink-0 transform -translate-x-[2px] translate-y-[2px]" />
            </button>
          </form>
          <div className="text-center mt-3">
             <div className="text-[11px] text-white/30 leading-snug">
               Your conversation is private. Umaiza never shares your details without your permission.<br/>
               Powered by Credence · credence.ng
             </div>
          </div>
        </div>
      </div>

      {/* Styles for scrollbar hiding */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}

// ------ Tool Components Inline ------

function MurabahaTool() {
  const [amount, setAmount] = useState(1500000);
  const [tenure, setTenure] = useState(12);
  const tenures = [6, 12, 18, 24, 36];

  const downPayment = amount * 0.3;
  const financed = amount - downPayment;
  const profit = financed * 0.1; // flat 10%
  const total = financed + profit;
  const monthly = total / tenure;

  const formatNaira = (val: number) => "₦" + val.toLocaleString('en-NG', { maximumFractionDigits: 0 });

  return (
    <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl overflow-hidden w-full max-w-[340px] animate-fade-in-up shadow-xl shadow-black/20">
       <div className="bg-[#D4A843]/10 border-b border-[#D4A843]/20 px-4 py-3 flex items-center gap-2">
         <Calculator className="w-4 h-4 text-[#D4A843]" />
         <span className="text-[#D4A843] font-medium text-[13px]">Murabaha Calculator</span>
       </div>
       <div className="p-5 flex flex-col gap-6">
         <div>
           <div className="text-[11px] text-white/50 font-medium tracking-wider mb-3">TOTAL FINANCING AMOUNT</div>
           <div className="font-serif text-3xl text-white mb-4">{formatNaira(amount)}</div>
           <input 
             type="range" 
             min="500000" 
             max="10000000" 
             step="100000" 
             value={amount}
             onChange={(e) => setAmount(Number(e.target.value))}
             className="w-full accent-[#D4A843] h-1.5 bg-white/10 rounded-full appearance-none outline-none"
           />
         </div>
         
         <div>
           <div className="text-[11px] text-white/50 font-medium tracking-wider mb-3">REPAYMENT TENURE</div>
           <div className="flex gap-1.5 flex-wrap">
             {tenures.map(t => (
               <button 
                 key={t}
                 onClick={() => setTenure(t)}
                 className={`px-3 py-1.5 rounded-full text-[12px] transition ${
                   tenure === t 
                   ? "bg-[#D4A843] text-[#1E0A4E] font-medium" 
                   : "border border-white/20 text-white/50 hover:bg-white/10"
                 }`}
               >
                 {t} mo
               </button>
             ))}
           </div>
         </div>

         <div className="bg-[#1E0A4E] rounded-xl p-4 border border-white/5 shadow-inner">
            <div className="text-[10px] text-[#D4A843] uppercase tracking-wider font-semibold mb-1">FIXED MONTHLY INSTALMENT</div>
            <div className="font-serif text-3xl text-[#D4A843] mb-2">{formatNaira(monthly)}</div>
            <div className="text-[11px] text-white/60 mb-2">
              Down payment: {formatNaira(downPayment)} · Financed: {formatNaira(financed)}
            </div>
            <div className="text-[10px] text-white/30 italic">
              Profit margin: indicative only · 0% compound interest
            </div>
         </div>

         <div className="flex gap-2">
           <a href="https://wa.me/2348034534545?text=I%20just%20calculated%20my%20Murabaha%20payments%20on%20Umaiza!%20Check%20it%20out%20at%20credence.ng/advisor" target="_blank" rel="noreferrer" className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 flex items-center justify-center gap-1.5 text-[12px] text-white hover:bg-white/10 transition">
             <Share2 className="w-3.5 h-3.5" /> Share
           </a>
           <button className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2.5 flex items-center justify-center gap-1.5 text-[12px] text-white hover:bg-white/10 transition cursor-not-allowed opacity-50">
             <Download className="w-3.5 h-3.5" /> Save
           </button>
         </div>

         <button className="w-full bg-[#D4A843] text-[#1E0A4E] shadow-xl py-3.5 rounded-full font-semibold text-[14px]">
           Apply for Umrah Financing →
         </button>
       </div>
    </div>
  );
}

function ReadinessTool() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({});

  const handleAnswer = (q: number, a: string) => {
    setAnswers({ ...answers, [q]: a });
    if (step < 4) setStep(step + 1);
    else setStep(5); // result
  };

  const getResult = () => {
    if (answers[1] === "Not currently") return "not-eligible";
    if (answers[2] === "Below ₦100,000") return "borderline";
    return "eligible";
  };

  if (step === 5) {
    const result = getResult();
    return (
      <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up flex flex-col gap-3">
        {result === "eligible" && (
           <>
             <div className="text-emerald-400 font-serif text-xl font-medium">You look eligible! 🎉</div>
             <div className="text-[13px] text-white/80 leading-relaxed">Based on your answers, you're likely a strong candidate for Credence financing. The next step is a quick conversation with Umaiza to confirm.</div>
           </>
        )}
        {result === "borderline" && (
           <>
             <div className="text-amber-400 font-serif text-xl font-medium">Almost there</div>
             <div className="text-[13px] text-white/80 leading-relaxed">You may qualify depending on the specific product and capital partner requirements. Let Umaiza guide you through your options.</div>
           </>
        )}
        {result === "not-eligible" && (
           <>
             <div className="text-white/90 font-serif text-xl font-medium">Not quite yet — but let's plan ahead</div>
             <div className="text-[13px] text-white/80 leading-relaxed">Based on your answers, you may not meet current eligibility requirements. But Umaiza can help you understand what to work toward and when to reapply.</div>
           </>
        )}
        <button className="w-full bg-[#D4A843] text-[#1E0A4E] py-3 rounded-xl font-semibold text-[13px] mt-2 cursor-pointer">Talk to Umaiza now →</button>
        <a href="https://wa.me/2348034534545?text=Hi%20Umaiza%2C%20I%20just%20took%20the%20Readiness%20Check!" target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-[#25D366]/20 transition mt-1">
          <Share2 className="w-3.5 h-3.5" /> Share Result
        </a>
      </div>
    );
  }

  const currentQ = () => {
    switch (step) {
      case 1:
        return {
          q: "Are you currently employed or have a verifiable income?",
          opts: ["Yes — salaried employment", "Yes — self-employed / business", "Not currently"]
        };
      case 2:
        return {
          q: "What is your approximate monthly income?",
          opts: ["Below ₦100,000", "₦100,000 — ₦300,000", "₦300,000 — ₦500,000", "Above ₦500,000"]
        };
      case 3:
        return {
          q: "Have you accessed any form of bank financing in the last 12 months?",
          opts: ["Yes — conventional loan", "Yes — non-interest financing", "No"]
        };
      case 4:
        return {
          q: "What product are you interested in financing?",
          opts: ["Umrah Financing", "Solar Energy", "Rent / Housing", "Education", "Something else"]
        };
      default: return { q: "", opts: [] };
    }
  };

  const { q, opts } = currentQ();

  return (
    <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up">
      <div className="text-[#D4A843] font-medium text-[13px] mb-4 flex items-center gap-2">
         <ShieldCheck className="w-4 h-4" /> Eligibility Quiz
      </div>
      <div className="text-[13px] text-white/80 mb-4 font-medium">Question {step}/4: {q}</div>
      <div className="flex flex-col gap-2 mb-3">
         {opts.map(o => (
           <button key={o} onClick={() => handleAnswer(step, o)} className="bg-white/5 border border-white/10 p-3 rounded-xl text-left text-[13px] hover:border-[#D4A843]/50 transition cursor-pointer">{o}</button>
         ))}
      </div>
    </div>
  );
}

function ComparatorTool() {
  const [selected, setSelected] = useState<string | null>(null);
  const needs = [
    { id: "umrah", label: "Umrah or Hajj pilgrimage" },
    { id: "home", label: "Home or rent" },
    { id: "solar", label: "Solar / renewable energy" },
    { id: "sme", label: "SME or business" },
    { id: "edu", label: "Education or training" }
  ];

  if (selected) {
    return (
      <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="text-[13px] font-medium text-[#D4A843]">Recommended Banks</div>
          <button onClick={() => setSelected(null)} className="text-[11px] text-white/50 hover:text-white transition cursor-pointer">Back</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="font-serif text-[15px] font-medium text-white mb-1">Jaiz Bank</div>
            <div className="text-[12px] text-emerald-400 mb-2">Excellent for {needs.find(n => n.id === selected)?.label}</div>
            <div className="text-[12px] text-white/60 leading-relaxed">Strong retail footprint with flexible Murabaha options tailored for individual needs.</div>
          </div>
          
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="font-serif text-[15px] font-medium text-white mb-1">TAJ Bank</div>
            <div className="text-[12px] text-emerald-400 mb-2">Strong alternative</div>
            <div className="text-[12px] text-white/60 leading-relaxed">Fast processing times with highly competitive pricing structures for consumer goods.</div>
          </div>
        </div>
        
        <div className="text-[11px] text-white/40 italic">Note: Credence works alongside these institutions as a marketplace — we can refer you directly.</div>
        
        <a href="https://wa.me/2348034534545?text=Hi%20Umaiza%2C%20help%20me%20compare%20non-interest%20banks!" target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-[#25D366]/20 transition mt-2">
          <Share2 className="w-3.5 h-3.5" /> Share Comparison
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up">
      <div className="flex flex-col gap-2 mb-3">
        {needs.map((n) => (
          <button key={n.id} onClick={() => setSelected(n.id)} className="bg-white/5 border border-white/10 p-3 rounded-xl text-left text-[13px] hover:border-[#D4A843] transition hover:text-[#D4A843] cursor-pointer">
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MythsTool() {
  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const myths = [
    { statement: "Non-interest financing is always more expensive than a regular bank loan.", answer: false, explanation: "Non-interest financing uses a fixed profit margin agreed upfront — it never compounds. For many people it ends up cheaper than a conventional loan with compounding interest over time." },
    { statement: "Only Muslims can use non-interest banking in Nigeria.", answer: false, explanation: "Any Nigerian can access non-interest banking products. The CBN licenses non-interest banks to serve all Nigerians regardless of religion. The products are built on fairness and transparency — values that transcend any single faith." },
    { statement: "Non-interest banks are not regulated by the CBN.", answer: false, explanation: "All non-interest banks in Nigeria operate under a dedicated CBN regulatory framework — the Non-Interest Financial Institutions (NIFI) guidelines. They are fully licensed and regulated." },
    { statement: "Murabaha is just interest with a different name.", answer: false, explanation: "Murabaha is a cost-plus sale — the capital partner buys the asset and sells it to you at a higher price agreed upfront. The key difference: the amount never changes or compounds. With interest, your debt can grow. With Murabaha, it cannot." },
    { statement: "You need to be very wealthy to access non-interest financing.", answer: false, explanation: "Credence is specifically designed for employed Nigerians with regular income — not the ultra-wealthy. Products like Umrah Financing start with manageable down payments and monthly instalments designed to fit real salaries." }
  ];

  const currentMyth = myths[currentMythIndex];

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer ? "True" : "False");
    setRevealed(true);
  };

  const nextMyth = () => {
    if (currentMythIndex < myths.length - 1) {
      setCurrentMythIndex(currentMythIndex + 1);
      setRevealed(false);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl overflow-hidden w-full max-w-[340px] animate-fade-in-up flex flex-col">
       <div className="bg-[#D4A843]/10 border-b border-[#D4A843]/20 px-4 py-3 flex items-center gap-2">
         <Lightbulb className="w-4 h-4 text-[#D4A843]" />
         <span className="text-[#D4A843] font-medium text-[13px]">Myth Buster</span>
       </div>
       <div className="p-5 flex flex-col items-start w-full">
         <div className="text-[11px] text-white/50 tracking-wider font-mono mb-3">MYTH #{currentMythIndex + 1}</div>
         <div className="font-serif text-[18px] text-white leading-[1.4] mb-6">"{currentMyth.statement}"</div>
         
         {!revealed ? (
           <div className="flex gap-3 mb-2 w-full">
             <button onClick={() => handleAnswer(true)} className="flex-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-3 rounded-xl text-[14px] font-medium hover:bg-emerald-500/20 transition cursor-pointer">True</button>
             <button onClick={() => handleAnswer(false)} className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 py-3 rounded-xl text-[14px] font-medium hover:bg-red-500/20 transition cursor-pointer">False</button>
           </div>
         ) : (
           <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4 w-full animate-fade-in">
             <div className="text-[13px] font-medium mb-2 uppercase tracking-wide">
               <span className={currentMyth.answer ? "text-emerald-400" : "text-[#D4A843]"}>
                 Actually, it's {currentMyth.answer ? "True" : "False"}
               </span>
             </div>
             <div className="text-[13px] text-white/80 leading-[1.6]">{currentMyth.explanation}</div>
           </div>
         )}

         {revealed && (
           <div className="flex flex-col gap-2 w-full">
             {currentMythIndex < myths.length - 1 && (
               <button onClick={nextMyth} className="w-full bg-[#1E0A4E] text-white border border-white/20 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-white/10 transition cursor-pointer">
                 Next myth <ArrowRight className="w-3.5 h-3.5" />
               </button>
             )}
             <a href={`https://wa.me/2348034534545?text=Did%20you%20know%3F%20${encodeURIComponent(currentMyth.explanation)}%20%E2%80%94%20Find%20out%20more%20at%20credence.ng%2Fadvisor`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-[#25D366]/20 transition mt-1">
               <Share2 className="w-3.5 h-3.5" /> Share this myth
             </a>
           </div>
         )}
       </div>
    </div>
  );
}

function PlannerTool() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const goals = [
    { label: "Umrah or Hajj", icon: "✈️" },
    { label: "Home or rent", icon: "🏠" },
    { label: "Solar energy", icon: "☀️" },
    { label: "Education", icon: "📚" }
  ];

  const toggleGoal = (label: string) => {
    if (selectedGoals.includes(label)) {
      setSelectedGoals(selectedGoals.filter(g => g !== label));
    } else {
      setSelectedGoals([...selectedGoals, label]);
    }
  };

  if (showRoadmap) {
    return (
      <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl w-full max-w-[340px] animate-fade-in-up p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="text-[13px] font-medium text-[#D4A843]">Your Roadmap</div>
          <button onClick={() => setShowRoadmap(false)} className="text-[11px] text-white/50 hover:text-white transition cursor-pointer">Back</button>
        </div>

        <div className="flex flex-col gap-3 relative pl-4 border-l border-white/10 py-1">
          {selectedGoals.includes("Umrah or Hajj") && (
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">AVAILABLE NOW</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="text-[14px] font-medium text-white mb-1">UmrahNowPayLater</div>
                <div className="text-[12px] text-white/60">₦600K down • ₦38K/mo (36m)</div>
              </div>
            </div>
          )}
          {selectedGoals.includes("Solar energy") && (
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#D4A843] shadow-[0_0_8px_rgba(212,168,67,0.5)]"></div>
              <div className="text-[10px] font-mono text-[#D4A843] uppercase tracking-wider mb-1">Q3 2026</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="text-[14px] font-medium text-white mb-1">Solar Financing</div>
                <div className="text-[12px] text-white/60">₦300K down • ₦25K/mo (24m)</div>
              </div>
            </div>
          )}
          {selectedGoals.includes("Home or rent") && (
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40"></div>
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">Q4 2026</div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="text-[14px] font-medium text-white mb-1">Rent Financing</div>
                <div className="text-[12px] text-white/60">TBD • Rent-to-own structure</div>
              </div>
            </div>
          )}
          {selectedGoals.includes("Education") && (
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">2027</div>
               <div className="bg-white/5 border border-white/10 rounded-lg p-3 opacity-70">
                <div className="text-[14px] font-medium text-white mb-1">Education Financing</div>
                <div className="text-[12px] text-white/60">MSc / PhD Support</div>
              </div>
            </div>
          )}
          {selectedGoals.length === 0 && (
            <div className="text-[12px] text-white/50 italic py-2">Please select at least one goal to build your roadmap.</div>
          )}
        </div>

        <a href="https://wa.me/2348034534545?text=Check%20out%20my%20ethical%20financial%20roadmap%20on%20Umaiza!%20credence.ng/advisor" target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-[#25D366]/20 transition mt-2 cursor-pointer">
          <Share2 className="w-3.5 h-3.5" /> Share my plan
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.04] border border-[#D4A843]/20 rounded-2xl w-full max-w-[340px] animate-fade-in-up p-5">
      <div className="flex flex-col gap-2 mb-4">
        {goals.map((g, i) => {
          const isSelected = selectedGoals.includes(g.label);
          return (
            <button 
               key={i} 
               onClick={() => toggleGoal(g.label)}
               className={`flex items-center gap-3 border p-3.5 rounded-xl transition text-left cursor-pointer ${
                 isSelected 
                 ? "bg-[#D4A843]/10 border-[#D4A843]/50" 
                 : "bg-white/5 border-white/10 hover:bg-white/10"
               }`}
            >
               <span className="text-xl">{g.icon}</span>
               <span className={`text-[14px] font-medium ${isSelected ? "text-[#D4A843]" : "text-white/90"}`}>{g.label}</span>
            </button>
          )
        })}
      </div>
      <button 
         onClick={() => setShowRoadmap(true)}
         disabled={selectedGoals.length === 0}
         className="w-full bg-[#D4A843] disabled:opacity-50 text-[#1E0A4E] py-3.5 rounded-xl font-semibold text-[14px] mb-3 cursor-pointer"
      >
        Build my roadmap →
      </button>
    </div>
  );
}

function WhatsAppTool() {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl w-full max-w-[340px] animate-fade-in-up overflow-hidden shadow-lg">
      <div className="bg-[#25D366]/10 border-b border-[#25D366]/20 p-4 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        </div>
        <div className="text-[14px] text-white/90 font-medium">Send 'Hi Umaiza' to get started.</div>
        <div className="text-[12px] text-[#25D366]">Available 24/7 · Free · No RIBA</div>
      </div>
      <div className="p-4 bg-white/5">
         <a 
           href="https://wa.me/2348034534545?text=Hi%20Umaiza%2C%20I%20want%20to%20learn%20about%20ethical%20financing"
           target="_blank"
           rel="noreferrer"
           className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg"
         >
           Open WhatsApp
         </a>
      </div>
    </div>
  );
}
