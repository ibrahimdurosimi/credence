import React, { useState, useRef, useEffect } from "react";
import { Send, User, ChevronRight, HelpCircle, Loader, MessageSquare } from "lucide-react";
import { ChatMessage } from "../types";

export default function AdvisorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "As-salamu alaykum! I'm Umaiza, your personal interest-free finance guide. What would you like to finance today?",
      timestamp: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "I want to go for Umrah but can't pay upfront",
    "How does the Solar pilot work?",
    "Is Rent Financing interest-free?",
    "How does Credence make money if there is 0% Riba?"
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Call server endpoint /api/chat
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.warn("Express server Gemini API failed. Using heuristic fallback response.", error);
      // Heuristic fallback response client side
      setTimeout(() => {
        setIsTyping(false);
        const reply = getClientFallbackResponse(text);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    }
  };

  const getClientFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("umrah") || q.includes("travel") || q.includes("pilgrimage")) {
      return "Umrah Financing is fully shariah-compliant. You make a 30% down payment, and spread the remainder over up to 36 months, 100% interest free (0% APR). All booking administration and accommodation in Makkah & Madinah are taken care of. Check the Products page for our calculator!";
    }
    if (q.includes("solar") || q.includes("energy") || q.includes("power") || q.includes("generator")) {
      return "Our upcoming Solar backup systems (Q3 2026 pilot) feature robust premium solar options beginning from ₦1.2M. Requires a 20% down payment and supports tenure up to 24 interest-free monthly installments. Comes fully installed with 3 years of warranty.";
    }
    if (q.includes("rent") || q.includes("lease") || q.includes("apartment")) {
      return "Rent Financing launches Q4 2026. Under the lease-to-use (Ijarah) model, Credence pays your landlord the full 1-year annual lease requirement, allowing you to settle with Credence in plain interest-free monthly rentals. This eases high liquid cash constraints!";
    }
    if (q.includes("money") || q.includes("cost") || q.includes("profit") || q.includes("revenue") || q.includes("make")) {
      return "Great question! Under shariah-compliant Murabaha (cost-plus markup), we buy the asset at wholesale rates or secure bulk provider discounts. We state our flat markup and purchase cost transparently upfront. Once you agree, that profit figure remains fixed. We never charge late fees, compounding penalties, or variable interest rates.";
    }
    return "Credence provides 100% interest-free (0% Riba) financial facilitation! We offer: \n- Umrah Financing (Live)\n- Home Solar systems (Q3 2026)\n- Rent installments (Q4 2026)\nTell me which capability you want to outline, and I'll detail the payment down values!";
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-[20px] overflow-hidden flex flex-col h-[520px]">
      {/* Chat Top */}
      <div className="p-4 px-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] bg-gold rounded-full flex items-center justify-center font-serif text-[17px] font-semibold text-[#1E0A4E]">
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
        <div className="text-[10px] font-semibold tracking-[0.08em] text-gold bg-gold/10 border border-gold/20 rounded-md px-2 py-1 uppercase">
          AI
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 pb-2 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col p-3 px-4 text-[13.5px] leading-[1.6] shadow-sm animate-fade-in-up
              ${msg.sender === "user" 
                ? "bg-gold text-[#1E0A4E] rounded-tl-[14px] rounded-tr-[2px] rounded-br-[14px] rounded-bl-[14px] font-medium max-w-[80%] self-end" 
                : "bg-white/5 border border-white/10 text-white/85 rounded-tl-[2px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px] max-w-[88%] w-fit"
              }`
            }
            style={{ whiteSpace: "pre-line", animationDelay: idx === messages.length - 1 ? '0.1s' : '0s' }}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="bg-white/5 rounded-tl-[2px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px] p-4 flex gap-1.5 items-center w-fit animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Chips */}
      {messages.length === 1 && (
        <div className="px-5 pb-[14px] flex flex-col gap-1.5">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s)}
              className="bg-white/5 border border-white/10 rounded-[10px] px-3.5 py-2.5 text-[12.5px] text-white/65 flex justify-between items-center hover:bg-white/10 transition-colors text-left w-full cursor-pointer"
            >
              <span>{s}</span> 
              <ChevronRight className="w-3 h-3 text-white/30" />
            </button>
          ))}
        </div>
      )}

      {/* Chat Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-3.5 px-4 border-t border-white/5 flex gap-2.5 items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Umaiza anything..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-[13px] text-white placeholder-white/35 focus:outline-none focus:border-gold/30 font-sans transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="w-[34px] h-[34px] bg-gold rounded-full flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 text-[#1E0A4E] shrink-0 transform -translate-x-[1px] translate-y-[1px]" />
        </button>
      </form>
    </div>
  );
}
