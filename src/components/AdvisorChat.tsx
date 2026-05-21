import React, { useState, useRef, useEffect } from "react";
import { Send, User, ChevronRight, HelpCircle, Loader, MessageSquare } from "lucide-react";
import { ChatMessage } from "../types";

export default function AdvisorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "As-salamu alaykum! I'm Credence Advisor. I make interest-free financing clear and accessible. What would you like to finance today?",
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
      return "UmrahNowPayLater is fully shariah-compliant. You make a 30% down payment, and spread the remainder over up to 36 months, 100% interest free (0% APR). All booking administration and accommodation in Makkah & Madinah are taken care of. Check the Products page for our calculator!";
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
    return "Credence provides 100% interest-free (0% Riba) financial facilitation! We offer: \n- UmrahNowPayLater (Live)\n- Home Solar systems (Q3 2026)\n- Rent installments (Q4 2026)\nTell me which capability you want to outline, and I'll detail the payment down values!";
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[520px] rounded-3xl border border-white/10 bg-[#1E0A4E]/90 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Chat Box Header */}
      <div className="flex items-center gap-3 bg-[#0F0530] p-5 border-b border-white/5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-purple-deep font-serif font-bold text-lg">
          CA
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">Credence Advisor</h4>
          <span className="flex items-center gap-1.5 text-[11px] text-gold font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Online — Responds instantly
          </span>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/50 text-[10px] font-mono">
          AI
        </div>
      </div>

      {/* Messages Scrollbox */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#1E0A4E]/30">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user" ? "ml-auto items-end" : "items-start"
            }`}
          >
            <div
              className={`rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gold text-purple-deep rounded-tr-none font-medium shadow-md"
                  : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-white/30 mt-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-white/40 text-xs py-1">
            <Loader className="h-3.5 w-3.5 animate-spin text-gold" />
            Credence Advisor is formulating a compliant breakdown...
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggestions block */}
      {messages.length === 1 && (
        <div className="px-5 pb-3">
          <div className="text-[11px] text-gold font-semibold uppercase tracking-wider mb-2 font-mono flex items-center gap-1">
            <HelpCircle className="h-3 w-3" /> Quick suggestions
          </div>
          <div className="flex flex-col gap-1.5">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                className="flex items-center justify-between text-left text-[12px] bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/10 rounded-lg px-3 py-2 text-white/80 transition cursor-pointer"
              >
                <span>{s}</span>
                <ChevronRight className="h-3 w-3 text-gold" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User Chat input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex items-center gap-2 p-4 bg-[#0F0530] border-t border-white/5"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about down-payments, contracts, or Murabaha..."
          className="flex-1 bg-white/5 border border-white/15 hover:border-white/30 focus:border-gold text-sm text-white rounded-xl px-4 py-3 placeholder-white/30 focus:outline-none transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-purple-deep hover:bg-gold-light active:scale-95 disabled:opacity-40 disabled:scale-100 transition cursor-pointer"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
