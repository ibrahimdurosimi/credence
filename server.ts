import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array required" });
      }

      // If no API key configured, use a rule-based smart assistant
      if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY not found in environment. Using rule-based fallback assistant.");
        const userMsg = messages[messages.length - 1]?.text || "";
        const reply = getFallbackResponse(userMsg);
        return res.json({ reply });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are Credence Advisor, an empathetic, professional, and knowledgeable AI financial advisor representing Credence (credence.ng).
Credence connects faith-conscious consumers in Nigeria to ethical, 100% interest-free (shariah-compliant) retail financing through partnerships with institutions like Sterling Non-Interest Bank (Sterling NIB) and merchants like New Crescent Travel.

KEY PRODUCTS:
1. UmrahNowPayLater: Live now. Book with 30% down, pay balance over up to 36 months, 100% interest free. Managed with Sterling NIB and New Crescent Travel.
2. Solar & Renewable Energy Pilot: Launching Q3 2026. Custom home solar systems starting from ₦1.2M, with 20% down, up to 24-month interest-free payments. Includes 3-year warranty.
3. Rent Financing: Launching Q4 2026. Enables monthly rent payment under shariah-compliant Ijarah lease models instead of paying the whole year upfront.

Your style:
- Begin with a warm, respectful greeting (e.g. "As-salamu alaykum" or "Welcome to Credence").
- Be humble, professional, clear, and highly supportive.
- Address questions about how ethical structures work (Murabaha/cost-plus, Ijarah/rental leasing) in clear, plain, everyday English.
- Avoid preachy or overly complex academic jargon. Frame non-interest options as clean, fair, value-protecting alternatives.
- Prompt users to check out the Products and interactive Murabaha Finance Calculator inside the app to see immediate figures.
- Keep answers concise and strictly accurate based on these details.`;

      // Map format to standard GenAI structure
      const contents = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I was unable to generate a response. Please try again.";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: "Failed to communicate with AI Assistant. Please try again." });
    }
  });

  function getFallbackResponse(query: string): string {
    const q = query.toLowerCase();
    if (q.includes("umrah") || q.includes("travel") || q.includes("pilgrimage")) {
      return "As-salamu alaykum. Our 'UmrahNowPayLater' package lets you perform your pilgrimage with just 30% down payment, and spread the remaining 70% cost over up to 36 months entirely interest-free. We partner with Sterling NIB and New Crescent Travel to manage all logistics. You can use our interactive calculator on the Products tab to see immediate figures!";
    }
    if (q.includes("solar") || q.includes("energy") || q.includes("power") || q.includes("generator")) {
      return "Hello. Our upcoming Solar and Renewable Energy Financing pilot (Q3 2026) offers robust home solar backup systems. You make a 20% down payment and pay the rest over up to 24 months with 0% interest and a fixed profit margin. It includes complete setup and a 3-year warranty.";
    }
    if (q.includes("rent") || q.includes("housing") || q.includes("home") || q.includes("landlord")) {
      return "Welcome. Credence Rent Financing (Q4 2026) will enable monthly rent payment options under halal lease-to-own or rental leasing (Ijarah) contracts. Credence pays your landlord a full year upfront, and you repay Credence in comfortable monthly installments. No interest, no riba.";
    }
    if (q.includes("capital") || q.includes("partner") || q.includes("sterling")) {
      return "Hello. Capital providers like banks or fund managers can gain premium access to Nigeria's high-intent retail market through Credence without expensive physical branch distribution. We handle product structures, KYC, pre-vetting, and contract management. Let's arrange a call through our Contact page!";
    }
    if (q.includes("merchant") || q.includes("sell")) {
      return "Greetings. By joining Credence as an approved merchant, you can offer interest-free deferred payments directly at checkout, transforming browsers into buyers and raising average basket sizes, with 100% of capital funded and cleared upfront by our banking partners.";
    }
    return "As-salamu alaykum! I am the Credence Advisor. I help faith-conscious Nigerian consumers secure 100% ethical, interest-free financing for life needs like Umrah pilgrimage, home solar systems, and rent help. How can I assist you with your financing goals today?";
  }

  // Vite dev middleware vs static assets in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Credence Server running on http://localhost:${PORT}`);
  });
}

startServer();
