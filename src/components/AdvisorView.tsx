import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, MessageCircle, Calculator, ShieldCheck, Building2, Lightbulb, Target, MessageSquare, Send, Share2, Download, ChevronRight, X, Copy, Moon, Sun } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { User } from "firebase/auth";

interface AdvisorViewProps {
  setCurrentTab: (tab: string) => void;
  user: User | null;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

type Message = {
  id: string;
  sender: "bot" | "user";
  text?: string;
  tool?: string;
};

export default function AdvisorView({ setCurrentTab, user, isDark, setIsDark }: AdvisorViewProps) {
  const defaultMessage: Message = {
    id: "1",
    sender: "bot",
    text: "As-salam alaykum! 👋 I'm Umaiza, your AI financial buddy for all things Ethical Finance.\n\nHere’s how I can help:\n• Find the perfect ethical financing deals🎯 \n• Get clarity on Islamic finance concerns you have 🧮 \n• Let me help you access your financial health 💰 \n• Compare Islamic banks honestly 🏦\n• Or just tell me what's on your mind today? \n\nLet's get started! 🚀",
  };

  const [messages, setMessages] = useState<Message[]>([defaultMessage]);
  const [inputText, setInputText] = useState("");
  const [activeTool, setActiveTool] = useState("ask-umaiza");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.uid) {
      fetch(`/api/chat/history?uid=${user.uid}`)
        .then(res => res.json())
        .then(data => {
           if (data.messages && data.messages.length > 0) {
             setMessages(data.messages.map((m: any, idx: number) => ({
               id: idx.toString(),
               sender: m.sender,
               text: m.text,
               tool: m.tool
             })));
           }
        })
        .catch(err => console.error("Failed to load history", err));
    }
  }, [user]);

  const themeVars = {
    bg: isDark ? "bg-purple-deep" : "bg-cream",
    textObj: isDark ? "text-white" : "text-purple-deep",
    subText: isDark ? "text-white/50" : "text-purple-deep/60",
    topBarBg: isDark ? "bg-purple-deep" : "bg-cream",
    topBarBorder: "border-transparent",
    gold: "text-[#D4A843]",
    goldBg: "bg-[#D4A843]",
    mutatedWhite: isDark ? "bg-white/[0.07] text-white/90" : "bg-white border border-[#1E0A4E]/10 text-purple-deep/90 shadow-sm",
    mutatedLight: isDark ? "bg-white/5 border-white/10" : "bg-purple-deep/5 border-[#1E0A4E]/10",
    inputBg: isDark ? "bg-purple-deep/90" : "bg-cream/90",
  };

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
            .filter(m => m.text), // filter out tool-only messages if any
          userProfile: user ? {
            name: user.displayName,
            email: user.email,
            uid: user.uid
          } : null
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
    <div className={`flex flex-col h-screen ${themeVars.bg} ${themeVars.textObj} overflow-hidden w-full font-sans relative transition-colors duration-300`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.04]" : "opacity-[0.03]"} z-0`} style={{ backgroundImage: "radial-gradient(circle at center, currentColor 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}></div>
      
      <div className={`w-full max-w-[680px] mx-auto ${themeVars.bg} shadow-2xl h-full flex flex-col relative z-10 border-x ${isDark ? "border-white/5" : "border-[#1E0A4E]/5"} transition-colors duration-300`}>
        {/* 1. Top Bar */}
        <div className={`flex-none ${themeVars.topBarBg} border-b ${themeVars.topBarBorder} px-4 py-2 flex items-center justify-between z-10 sticky top-0 transition-colors duration-300`}>
          <button onClick={() => setCurrentTab("home")} className={`flex items-center gap-1.5 w-16 ${isDark ? 'text-white/70 hover:text-white' : 'text-purple-deep/70 hover:text-purple-deep'} transition cursor-pointer`}>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[13px] font-medium">Back</span>
          </button>
          
          <div className="flex flex-col items-center justify-center mt-1">
            <div className="relative">
               <div className={`w-10 h-10 ${themeVars.goldBg} rounded-full flex items-center justify-center`}>
                 <svg viewBox="0 0 100 100" className="w-full h-full p-2 object-contain text-purple-deep" fill="none">
                  <circle cx="50" cy="42" r="22" stroke="currentColor" strokeWidth="12" />
                  <path d="M 28 72 Q 50 95 72 72" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                </svg>
               </div>
               <div className={`absolute -bottom-0.5 -right-0.5 ${themeVars.topBarBg} rounded-full p-[2px]`}>
                 <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border border-white/20"></div>
               </div>
            </div>
            <div className={`font-serif text-[15px] font-medium mt-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>Umaiza</div>
          </div>

          <div className="w-16 flex justify-end">
            <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded-full ${isDark ? 'bg-white/10 text-white/70 hover:text-white' : 'bg-purple-deep/5 text-purple-deep/70 hover:text-purple-deep'} transition cursor-pointer`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. Umaiza Meta Info */}
        <div className="flex-none pt-4 pb-2 px-4 flex flex-col items-center justify-center text-center">
          <div className={`text-[13px] ${themeVars.subText}`}>Ask-anything, ethical finance. Get real answers.</div>
        </div>



        {/* 4. Main Tool Area / Conversation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 pb-[120px] w-full hide-scrollbar">
          <div className="flex flex-col gap-4 max-w-[700px] mx-auto w-full">
            {messages.map((msg, idx) => (
              <React.Fragment key={msg.id}>
                {msg.text && (
                  <div className="flex flex-col w-fit">
                    <div
                      className={`flex flex-col text-[14px] leading-[1.6] shadow-sm animate-fade-in-up w-fit
                        ${msg.sender === "user" 
                          ? "bg-[#D4A843] text-purple-deep rounded-tl-[16px] rounded-tr-[4px] rounded-br-[16px] rounded-bl-[16px] font-medium max-w-[85%] self-end p-3.5 px-4" 
                          : `${themeVars.mutatedWhite} rounded-tl-[4px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] max-w-[90%] p-4`
                        }`
                      }
                    >
                      {msg.sender === "user" ? (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      ) : (
                        <div className={`markdown-body text-[14px] leading-[1.6] focus:outline-none max-w-none ${isDark ? 'text-white/90 [&>strong]:text-white' : 'text-purple-deep/90 [&>strong]:text-purple-deep'} [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:mb-3 [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:mb-3 [&>li]:mb-1 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:mb-2 [&>h1]:text-[#D4A843] [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mb-2 [&>h2]:text-[#D4A843] [&>h3]:text-[#D4A843] [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mb-1 [&>h3]:mt-2 [&>strong]:font-bold [&>em]:italic`}>
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {msg.sender === "bot" && !msg.tool && (
                      <div className="flex items-center gap-2 mt-2 ml-1">
                         <button 
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text!);
                          }}
                          title="Copy to clipboard"
                          className={`flex items-center justify-center p-1.5 px-2.5 ${themeVars.mutatedLight} rounded-lg ${isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-purple-deep/60 hover:text-purple-deep hover:bg-purple-deep/10'} transition-colors cursor-pointer shadow-sm gap-1.5`}
                         >
                           <Copy className="w-3 h-3" />
                           <span className="text-[11px] font-medium">Copy</span>
                         </button>
                         <a 
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(msg.text!)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share to WhatsApp"
                          className="flex items-center justify-center p-1.5 px-2.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg text-[#25D366] hover:bg-[#25D366]/20 transition-colors cursor-pointer shadow-sm gap-1.5"
                         >
                           <Share2 className="w-3 h-3" />
                           <span className="text-[11px] font-medium">Share</span>
                         </a>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Render Tool Cards inline */}
                {msg.tool === "murabaha" && <MurabahaTool isDark={isDark} />}
                {msg.tool === "readiness" && <ReadinessTool isDark={isDark} />}
                {msg.tool === "comparator" && <ComparatorTool isDark={isDark} />}
                {msg.tool === "myths" && <MythsTool isDark={isDark} />}
                {msg.tool === "planner" && <PlannerTool isDark={isDark} />}
                {msg.tool === "whatsapp" && <WhatsAppTool isDark={isDark} />}
              </React.Fragment>
            ))}

            {messages.length === 1 && activeTool === "ask-umaiza" && (
               <div className="flex flex-col gap-2 mt-2 w-full max-w-[320px]">
                 <button onClick={() => handleSend("I need financing for something specific")} className={`${themeVars.mutatedLight} rounded-xl px-4 py-3 text-[13px] ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-purple-deep/80 hover:bg-purple-deep/10'} flex justify-between items-center transition text-left cursor-pointer`}>
                   I need financing for something specific <ChevronRight className="w-3.5 h-3.5 text-[#D4A843]" />
                 </button>
                 <button onClick={() => handleSend("Am I ready to take on financing?")} className={`${themeVars.mutatedLight} rounded-xl px-4 py-3 text-[13px] ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-purple-deep/80 hover:bg-purple-deep/10'} flex justify-between items-center transition text-left cursor-pointer`}>
                   Am I ready to take on financing? <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-white/30' : 'text-purple-deep/30'}`} />
                 </button>
                 <button onClick={() => handleSend("How does halal financing work?")} className={`${themeVars.mutatedLight} rounded-xl px-4 py-3 text-[13px] ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-purple-deep/80 hover:bg-purple-deep/10'} flex justify-between items-center transition text-left cursor-pointer`}>
                   How does halal financing work? <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-white/30' : 'text-purple-deep/30'}`} />
                 </button>
                 <button onClick={() => handleSend("What products are available now?")} className={`${themeVars.mutatedLight} rounded-xl px-4 py-3 text-[13px] ${isDark ? 'text-white/80 hover:bg-white/10' : 'text-purple-deep/80 hover:bg-purple-deep/10'} flex justify-between items-center transition text-left cursor-pointer`}>
                   What products are available now? <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-white/30' : 'text-purple-deep/30'}`} />
                 </button>
               </div>
            )}

            {isTyping && (
              <div className={`${isDark ? 'bg-white/[0.07]' : 'bg-white shadow-sm border border-[#1E0A4E]/10'} rounded-tl-[4px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] p-4 flex gap-1.5 items-center w-fit animate-fade-in-up`}>
                <div className={`w-1.5 h-1.5 ${isDark ? 'bg-white/40' : 'bg-purple-deep/40'} rounded-full animate-bounce`} style={{ animationDelay: "0s" }} />
                <div className={`w-1.5 h-1.5 ${isDark ? 'bg-white/40' : 'bg-purple-deep/40'} rounded-full animate-bounce`} style={{ animationDelay: "0.2s" }} />
                <div className={`w-1.5 h-1.5 ${isDark ? 'bg-white/40' : 'bg-purple-deep/40'} rounded-full animate-bounce`} style={{ animationDelay: "0.4s" }} />
              </div>
            )}
            <div ref={scrollRef} className="h-4" />
          </div>
        </div>

        {/* Input Bar Persistent */}
        <div className={`absolute bottom-0 left-0 right-0 ${themeVars.inputBg} backdrop-blur-xl border-t ${isDark ? 'border-white/5' : 'border-[#1E0A4E]/10'} px-4 pt-4 pb-4 z-20 transition-colors duration-300`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex gap-2.5 items-center w-full"
          >
            <div className={`flex-1 ${isDark ? 'bg-white/[0.04] border-white/5 shadow-inner' : 'bg-white border-[#1E0A4E]/10 shadow-sm'} border rounded-full px-5 py-3.5 flex items-center transition-colors duration-300`}>
               <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Umaiza anything..."
                  className={`w-full bg-transparent text-[14px] ${isDark ? 'text-white placeholder-white/30' : 'text-purple-deep placeholder-[#1E0A4E]/40'} focus:outline-none focus:ring-0 font-sans`}
               />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="w-[48px] h-[48px] bg-[#D4A843] rounded-full flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 transition-transform active:scale-95 shadow-lg shadow-[#D4A843]/20"
            >
              <Send className="w-[18px] h-[18px] text-purple-deep shrink-0 transform -translate-x-[2px] translate-y-[2px]" />
            </button>
          </form>
          <div className="text-center mt-3">
             <div className={`text-[11px] ${isDark ? 'text-white/30' : 'text-purple-deep/40'} leading-snug`}>
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

function MurabahaTool({ isDark }: { isDark: boolean }) {
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
    <div className={`border rounded-2xl overflow-hidden w-full max-w-[340px] animate-fade-in-up ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20 shadow-xl shadow-black/20' : 'bg-white border-[#1E0A4E]/10 shadow-lg'}`}>
       <div className={`border-b px-4 py-3 flex items-center gap-2 ${isDark ? 'bg-[#D4A843]/10 border-[#D4A843]/20' : 'bg-cream border-cream-mid'}`}>
         <Calculator className={`w-4 h-4 ${isDark ? 'text-[#D4A843]' : 'text-purple-deep'}`} />
         <span className={`${isDark ? 'text-[#D4A843]' : 'text-purple-deep'} font-medium text-[13px]`}>Murabaha Calculator</span>
       </div>
       <div className="p-5 flex flex-col gap-6">
         <div>
           <div className={`text-[11px] font-medium tracking-wider mb-3 ${isDark ? 'text-white/50' : 'text-purple-deep/60'}`}>TOTAL FINANCING AMOUNT</div>
           <div className={`font-serif text-3xl mb-4 ${isDark ? 'text-white' : 'text-purple-deep'}`}>{formatNaira(amount)}</div>
           <input 
             type="range" 
             min="500000" 
             max="10000000" 
             step="100000" 
             value={amount}
             onChange={(e) => setAmount(Number(e.target.value))}
             className={`w-full accent-[#D4A843] h-1.5 rounded-full appearance-none outline-none ${isDark ? 'bg-white/10' : 'bg-purple-deep/10'}`}
           />
         </div>
         
         <div>
           <div className={`text-[11px] font-medium tracking-wider mb-3 ${isDark ? 'text-white/50' : 'text-purple-deep/60'}`}>REPAYMENT TENURE</div>
           <div className="flex gap-1.5 flex-wrap">
             {tenures.map(t => (
               <button 
                 key={t}
                 onClick={() => setTenure(t)}
                 className={`px-3 py-1.5 rounded-full text-[12px] transition ${
                   tenure === t 
                   ? "bg-[#D4A843] text-purple-deep font-medium" 
                   : `${isDark ? 'border border-white/20 text-white/50 hover:bg-white/10' : 'border border-[#1E0A4E]/20 text-purple-deep/60 hover:bg-purple-deep/5'}`
                 }`}
               >
                 {t} mo
               </button>
             ))}
           </div>
         </div>

         <div className={`rounded-xl p-4 border shadow-inner ${isDark ? 'bg-purple-deep border-white/5' : 'bg-cream border-[#1E0A4E]/5'}`}>
            <div className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${isDark ? 'text-[#D4A843]' : 'text-purple-deep'}`}>FIXED MONTHLY INSTALMENT</div>
            <div className={`font-serif text-3xl mb-2 ${isDark ? 'text-[#D4A843]' : 'text-purple-deep'}`}>{formatNaira(monthly)}</div>
            <div className={`text-[11px] mb-2 ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>
              Down payment: {formatNaira(downPayment)} · Financed: {formatNaira(financed)}
            </div>
            <div className={`text-[10px] italic ${isDark ? 'text-white/30' : 'text-purple-deep/50'}`}>
              Profit margin: indicative only · 0% compound interest
            </div>
         </div>

         <div className="flex gap-2">
           <a href="https://wa.me/2348034534545?text=I%20just%20calculated%20my%20Murabaha%20payments%20on%20Umaiza!%20Check%20it%20out%20at%20credence.ng/advisor" target="_blank" rel="noreferrer" className={`flex-1 border rounded-lg py-2.5 flex items-center justify-center gap-1.5 text-[12px] transition ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-[#1E0A4E]/10 text-purple-deep hover:bg-purple-deep/5'}`}>
             <Share2 className="w-3.5 h-3.5" /> Share
           </a>
           <button className={`flex-1 border rounded-lg py-2.5 flex items-center justify-center gap-1.5 text-[12px] transition cursor-not-allowed opacity-50 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-[#1E0A4E]/10 text-purple-deep'}`}>
             <Download className="w-3.5 h-3.5" /> Save
           </button>
         </div>

         <button className="w-full bg-[#D4A843] text-purple-deep shadow-xl py-3.5 rounded-full font-semibold text-[14px]">
           Apply for Umrah Financing →
         </button>
       </div>
    </div>
  );
}

function ReadinessTool({ isDark }: { isDark: boolean }) {
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
      <div className={`border rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up flex flex-col gap-3 ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
        {result === "eligible" && (
           <>
             <div className="text-emerald-500 font-serif text-xl font-medium">You look eligible! 🎉</div>
             <div className={`text-[13px] leading-relaxed ${isDark ? 'text-white/80' : 'text-purple-deep/80'}`}>Based on your answers, you're likely a strong candidate for Credence financing. The next step is a quick conversation with Umaiza to confirm.</div>
           </>
        )}
        {result === "borderline" && (
           <>
             <div className="text-amber-500 font-serif text-xl font-medium">Almost there</div>
             <div className={`text-[13px] leading-relaxed ${isDark ? 'text-white/80' : 'text-purple-deep/80'}`}>You may qualify depending on the specific product and capital partner requirements. Let Umaiza guide you through your options.</div>
           </>
        )}
        {result === "not-eligible" && (
           <>
             <div className={`font-serif text-xl font-medium ${isDark ? 'text-white/90' : 'text-purple-deep'}`}>Not quite yet — but let's plan ahead</div>
             <div className={`text-[13px] leading-relaxed ${isDark ? 'text-white/80' : 'text-purple-deep/80'}`}>Based on your answers, you may not meet current eligibility requirements. But Umaiza can help you understand what to work toward and when to reapply.</div>
           </>
        )}
        <button className="w-full bg-[#D4A843] text-purple-deep py-3 rounded-xl font-semibold text-[13px] mt-2 cursor-pointer">Talk to Umaiza now →</button>
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
    <div className={`border rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
      <div className={`font-medium text-[13px] mb-4 flex items-center gap-2 ${isDark ? 'text-[#D4A843]' : 'text-purple-deep'}`}>
         <ShieldCheck className="w-4 h-4" /> Eligibility Quiz
      </div>
      <div className={`text-[13px] mb-4 font-medium ${isDark ? 'text-white/80' : 'text-purple-deep/80'}`}>Question {step}/4: {q}</div>
      <div className="flex flex-col gap-2 mb-3">
         {opts.map(o => (
           <button key={o} onClick={() => handleAnswer(step, o)} className={`border p-3 rounded-xl text-left text-[13px] transition cursor-pointer ${isDark ? 'bg-white/5 border-white/10 hover:border-[#D4A843]/50 text-white' : 'bg-cream border-cream-mid hover:border-[#1E0A4E]/30 text-purple-deep'}`}>{o}</button>
         ))}
      </div>
    </div>
  );
}

function ComparatorTool({ isDark }: { isDark: boolean }) {
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
      <div className={`border rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up flex flex-col gap-4 ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-white/10' : 'border-[#1E0A4E]/10'}`}>
          <div className="text-[13px] font-medium text-[#D4A843]">Recommended Banks</div>
          <button onClick={() => setSelected(null)} className={`text-[11px] transition cursor-pointer ${isDark ? 'text-white/50 hover:text-white' : 'text-purple-deep/50 hover:text-purple-deep'}`}>Back</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-deep/5 border-[#1E0A4E]/10'}`}>
            <div className={`font-serif text-[15px] font-medium mb-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>Jaiz Bank</div>
            <div className={`text-[12px] mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Excellent for {needs.find(n => n.id === selected)?.label}</div>
            <div className={`text-[12px] leading-relaxed ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>Strong retail footprint with flexible Murabaha options tailored for individual needs.</div>
          </div>
          
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-deep/5 border-[#1E0A4E]/10'}`}>
            <div className={`font-serif text-[15px] font-medium mb-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>TAJ Bank</div>
            <div className={`text-[12px] mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Strong alternative</div>
            <div className={`text-[12px] leading-relaxed ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>Fast processing times with highly competitive pricing structures for consumer goods.</div>
          </div>
        </div>
        
        <div className={`text-[11px] italic ${isDark ? 'text-white/40' : 'text-purple-deep/50'}`}>Note: Credence works alongside these institutions as a marketplace — we can refer you directly.</div>
        
        <a href="https://wa.me/2348034534545?text=Hi%20Umaiza%2C%20help%20me%20compare%20non-interest%20banks!" target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-[#25D366]/20 transition mt-2">
          <Share2 className="w-3.5 h-3.5" /> Share Comparison
        </a>
      </div>
    );
  }

  return (
    <div className={`border rounded-2xl p-5 w-full max-w-[340px] animate-fade-in-up ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
      <div className="flex flex-col gap-2 mb-3">
        {needs.map((n) => (
          <button key={n.id} onClick={() => setSelected(n.id)} className={`border p-3 rounded-xl text-left text-[13px] hover:border-[#D4A843] transition hover:text-[#D4A843] cursor-pointer ${isDark ? 'bg-white/5 border-white/10' : 'bg-cream border-[#1E0A4E]/10 text-purple-deep'}`}>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MythsTool({ isDark }: { isDark: boolean }) {
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
    <div className={`border rounded-2xl overflow-hidden w-full max-w-[340px] animate-fade-in-up flex flex-col ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
       <div className={`border-b px-4 py-3 flex items-center gap-2 ${isDark ? 'bg-[#D4A843]/10 border-[#D4A843]/20' : 'bg-[#D4A843]/5 border-cream-mid'}`}>
         <Lightbulb className={`w-4 h-4 ${isDark ? 'text-[#D4A843]' : 'text-purple-deep'}`} />
         <span className={`${isDark ? 'text-[#D4A843]' : 'text-purple-deep'} font-medium text-[13px]`}>Myth Buster</span>
       </div>
       <div className="p-5 flex flex-col items-start w-full">
         <div className={`text-[11px] tracking-wider font-mono mb-3 ${isDark ? 'text-white/50' : 'text-purple-deep/60'}`}>MYTH #{currentMythIndex + 1}</div>
         <div className={`font-serif text-[18px] leading-[1.4] mb-6 ${isDark ? 'text-white' : 'text-purple-deep'}`}>"{currentMyth.statement}"</div>
         
         {!revealed ? (
           <div className="flex gap-3 mb-2 w-full">
             <button onClick={() => handleAnswer(true)} className={`flex-1 border py-3 rounded-xl text-[14px] font-medium transition cursor-pointer ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}>True</button>
             <button onClick={() => handleAnswer(false)} className={`flex-1 border py-3 rounded-xl text-[14px] font-medium transition cursor-pointer ${isDark ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'}`}>False</button>
           </div>
         ) : (
           <div className={`p-4 rounded-xl border mb-4 w-full animate-fade-in ${isDark ? 'bg-white/5 border-white/10' : 'bg-cream border-[#1E0A4E]/10'}`}>
             <div className="text-[13px] font-medium mb-2 uppercase tracking-wide">
               <span className={currentMyth.answer ? (isDark ? "text-emerald-400" : "text-emerald-600") : "text-[#D4A843]"}>
                 Actually, it's {currentMyth.answer ? "True" : "False"}
               </span>
             </div>
             <div className={`text-[13px] leading-[1.6] ${isDark ? 'text-white/80' : 'text-purple-deep/80'}`}>{currentMyth.explanation}</div>
           </div>
         )}

         {revealed && (
           <div className="flex flex-col gap-2 w-full">
             {currentMythIndex < myths.length - 1 && (
               <button onClick={nextMyth} className={`border py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium transition cursor-pointer ${isDark ? 'bg-purple-deep text-white border-white/20 hover:bg-white/10' : 'bg-purple-deep text-white border-transparent hover:bg-opacity-90'}`}>
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

function PlannerTool({ isDark }: { isDark: boolean }) {
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
      <div className={`border rounded-2xl w-full max-w-[340px] animate-fade-in-up p-5 flex flex-col gap-4 ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-white/10' : 'border-[#1E0A4E]/10'}`}>
          <div className={`text-[13px] font-medium ${isDark ? 'text-[#D4A843]' : 'text-purple-deep'}`}>Your Roadmap</div>
          <button onClick={() => setShowRoadmap(false)} className={`text-[11px] transition cursor-pointer ${isDark ? 'text-white/50 hover:text-white' : 'text-purple-deep/50 hover:text-purple-deep'}`}>Back</button>
        </div>

        <div className={`flex flex-col gap-3 relative pl-4 border-l py-1 ${isDark ? 'border-white/10' : 'border-[#1E0A4E]/10'}`}>
          {selectedGoals.includes("Umrah or Hajj") && (
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>AVAILABLE NOW</div>
              <div className={`border rounded-lg p-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-deep/5 border-[#1E0A4E]/10'}`}>
                <div className={`text-[14px] font-medium mb-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>UmrahNowPayLater</div>
                <div className={`text-[12px] ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>₦600K down • ₦38K/mo (36m)</div>
              </div>
            </div>
          )}
          {selectedGoals.includes("Solar energy") && (
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#D4A843] shadow-[0_0_8px_rgba(212,168,67,0.5)]"></div>
              <div className="text-[10px] font-mono text-[#D4A843] uppercase tracking-wider mb-1">Q3 2026</div>
              <div className={`border rounded-lg p-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-deep/5 border-[#1E0A4E]/10'}`}>
                <div className={`text-[14px] font-medium mb-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>Solar Financing</div>
                <div className={`text-[12px] ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>₦300K down • ₦25K/mo (24m)</div>
              </div>
            </div>
          )}
          {selectedGoals.includes("Home or rent") && (
            <div className="relative">
              <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-white/40' : 'bg-purple-deep/30'}`}></div>
              <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-white/50' : 'text-purple-deep/50'}`}>Q4 2026</div>
              <div className={`border rounded-lg p-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-deep/5 border-[#1E0A4E]/10'}`}>
                <div className={`text-[14px] font-medium mb-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>Rent Financing</div>
                <div className={`text-[12px] ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>TBD • Rent-to-own structure</div>
              </div>
            </div>
          )}
          {selectedGoals.includes("Education") && (
            <div className="relative">
              <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-white/20' : 'bg-purple-deep/20'}`}></div>
              <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isDark ? 'text-white/40' : 'text-purple-deep/40'}`}>2027</div>
               <div className={`border rounded-lg p-3 opacity-70 ${isDark ? 'bg-white/5 border-white/10' : 'bg-purple-deep/5 border-[#1E0A4E]/10'}`}>
                <div className={`text-[14px] font-medium mb-1 ${isDark ? 'text-white' : 'text-purple-deep'}`}>Education Financing</div>
                <div className={`text-[12px] ${isDark ? 'text-white/60' : 'text-purple-deep/70'}`}>MSc / PhD Support</div>
              </div>
            </div>
          )}
          {selectedGoals.length === 0 && (
            <div className={`text-[12px] italic py-2 ${isDark ? 'text-white/50' : 'text-purple-deep/50'}`}>Please select at least one goal to build your roadmap.</div>
          )}
        </div>

        <a href="https://wa.me/2348034534545?text=Check%20out%20my%20ethical%20financial%20roadmap%20on%20Umaiza!%20credence.ng/advisor" target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[12px] font-medium hover:bg-[#25D366]/20 transition mt-2 cursor-pointer">
          <Share2 className="w-3.5 h-3.5" /> Share my plan
        </a>
      </div>
    );
  }

  return (
    <div className={`border rounded-2xl w-full max-w-[340px] animate-fade-in-up p-5 ${isDark ? 'bg-white/[0.04] border-[#D4A843]/20' : 'bg-white border-[#1E0A4E]/10 shadow-sm'}`}>
      <div className="flex flex-col gap-2 mb-4">
        {goals.map((g, i) => {
          const isSelected = selectedGoals.includes(g.label);
          return (
            <button 
               key={i} 
               onClick={() => toggleGoal(g.label)}
               className={`flex items-center gap-3 border p-3.5 rounded-xl transition text-left cursor-pointer ${
                 isSelected 
                 ? (isDark ? "bg-[#D4A843]/10 border-[#D4A843]/50" : "bg-[#D4A843]/10 border-[#D4A843]/50")
                 : (isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-cream border-cream-mid hover:border-[#1E0A4E]/20 text-purple-deep")
               }`}
            >
               <span className="text-xl">{g.icon}</span>
               <span className={`text-[14px] font-medium ${isSelected ? "text-[#D4A843]" : (isDark ? "text-white/90" : "text-purple-deep/90")}`}>{g.label}</span>
            </button>
          )
        })}
      </div>
      <button 
         onClick={() => setShowRoadmap(true)}
         disabled={selectedGoals.length === 0}
         className="w-full bg-[#D4A843] disabled:opacity-50 text-purple-deep py-3.5 rounded-xl font-semibold text-[14px] mb-3 cursor-pointer"
      >
        Build my roadmap →
      </button>
    </div>
  );
}

function WhatsAppTool({ isDark }: { isDark: boolean }) {
  return (
    <div className={`border rounded-2xl w-full max-w-[340px] animate-fade-in-up overflow-hidden shadow-lg ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-[#1E0A4E]/10'}`}>
      <div className={`bg-[#25D366]/10 border-b border-[#25D366]/20 p-4 flex flex-col items-center justify-center text-center gap-3`}>
        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        </div>
        <div className={`text-[14px] font-medium ${isDark ? 'text-white/90' : 'text-purple-deep/90'}`}>Send 'Hi Umaiza' to get started.</div>
        <div className="text-[12px] text-[#25D366]">Available 24/7 · Free · No RIBA</div>
      </div>
      <div className={`p-4 ${isDark ? 'bg-white/5' : 'bg-cream'}`}>
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
