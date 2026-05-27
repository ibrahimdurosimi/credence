import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { createRequire } from "module";
// Fallback require that works in both ESM (dev) and CJS (prod)
const requireUtil = typeof require !== "undefined" ? require : createRequire(import.meta.url);
const pdfParse = requireUtil("pdf-parse");

import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

// PHASE 4: SECURE FIREBASE DATABASE CONNECTION
// We use lazy initialization so the app doesn't crash if environment variables are missing during preview.
let db: admin.firestore.Firestore | null = null;
function getDb() {
  if (!db) {
    try {
      if (admin.apps.length === 0) {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
          try {
            const serviceAccount = JSON.parse(
              process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
            );
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
            });
            console.log(
              "🔥 Firebase Admin initialized via service account JSON.",
            );
          } catch (jsonErr) {
            console.error(
              "❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:",
              jsonErr,
            );
            admin.initializeApp();
          }
        } else {
          // In production, this automatically uses the GOOGLE_APPLICATION_CREDENTIALS environment variable.
          admin.initializeApp();
        }
      }

      const dbId = process.env.FIREBASE_DATABASE_ID;
      if (dbId) {
        db = getFirestore(admin.app(), dbId);
        console.log(
          `🔥 Firebase Admin connected successfully to database: ${dbId}`,
        );
      } else {
        db = admin.firestore();
        console.log(
          "🔥 Firebase Admin connected successfully to default database.",
        );
      }
    } catch (error: any) {
      console.warn("⚠️ Firebase connection failed:");
      console.warn(error);
      return null;
    }
  }
  return db;
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

async function searchKnowledgeBase(query: string): Promise<string> {
  const lowercaseQuery = query.toLowerCase();
  const searchTerms = lowercaseQuery.split(' ').filter(w => w.length > 3);
  let retrievedContext = "";

  const db = getDb();
  if (db) {
    let queryEmbedding: number[] | null = null;
    const aiApiKey = process.env.GEMINI_API_KEY;
    if (aiApiKey) {
       try {
         const ai = new GoogleGenAI({ apiKey: aiApiKey });
         const response = await ai.models.embedContent({
           model: "gemini-embedding-2",
           contents: query
         });
         const vals = response.embeddings?.[0]?.values;
         if (vals) queryEmbedding = vals;
       } catch(e) {
         console.warn("Embedding query failed, falling back to keyword search", e);
       }
    }

    try {
      const kbSnapshot = await db.collection("knowledge_base").orderBy("timestamp", "desc").limit(500).get();
      
      if (queryEmbedding) {
         let results: { data: any, score: number }[] = [];
         kbSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.embeddingArray) {
               const score = cosineSimilarity(queryEmbedding!, data.embeddingArray);
               results.push({ data, score });
            }
         });
         
         // Sort by highest similarity
         results.sort((a, b) => b.score - a.score);
         const topResults = results.slice(0, 5); // Take top 5 chunks
         
         topResults.forEach(res => {
             const snippet = res.data.content.replace(/\n/g, ' ');
             retrievedContext += `\n- [Source (Imported via Drive): ${res.data.fileName}]: "...${snippet}..."`;
         });
      }

      if (!retrievedContext) {
         // Fallback keyword search
         kbSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.content && retrievedContext.length < 5000) { // arbitrary limit
              let matchIndex = -1;
              for (const term of searchTerms) {
                matchIndex = data.content.toLowerCase().indexOf(term);
                if (matchIndex !== -1) {
                  break;
                }
              }
              
              if (matchIndex !== -1) {
                 const start = Math.max(0, matchIndex - 1500);
                 const end = Math.min(data.content.length, matchIndex + 2500);
                 const snippet = data.content.substring(start, end).replace(/\n/g, ' ');
                 retrievedContext += `\n- [Source (Imported via Drive): ${data.fileName}]: "...${snippet}..."`;
              }
            }
         });
      }
    } catch(err) {
      console.error("Error querying knowledge_base:", err);
    }
  }

  if (lowercaseQuery.includes("cbn") || lowercaseQuery.includes("cental bank") || lowercaseQuery.includes("regulat")) {
    retrievedContext += `\n- [Source: CBN Guidelines on Non-Interest Financial Institutions (NIFIs)]: "All Non-Interest Financial Institutions must operate strictly under the supervision of the Financial Regulation Advisory Council of Experts (FRACE) at the CBN. Conventional interest-bearing loans are strictly prohibited. Permissible contracts include Murabaha (Cost-plus), Ijara (Leasing), and Mudarabah (Profit-sharing)."`;
  }
  if (lowercaseQuery.includes("sec") || lowercaseQuery.includes("sukuk") || lowercaseQuery.includes("exchange commission")) {
    retrievedContext += `\n- [Source: SEC Nigeria Rules on Sukuk Issuance]: "The Securities and Exchange Commission (SEC) regulates the issuance of Sukuk (Islamic bonds) in Nigeria. Sukuk must be asset-backed or asset-based and approved by a recognized Shari'ah Advisory Board. They present a viable ethical alternative to conventional government or corporate bonds."`;
  }
  if (
    lowercaseQuery.includes("jaiz") ||
    lowercaseQuery.includes("lotus") ||
    lowercaseQuery.includes("taj") ||
    lowercaseQuery.includes("alternatives") ||
    lowercaseQuery.includes("bank")
  ) {
    retrievedContext += `\n- [Source: Credence Internal NIFI Matrix 2025]: "Jaiz Bank, TAJ Bank, and Lotus Bank (Lotus Capital) are leading licensed NIFIs in Nigeria. Credence acts as an aggregator platform. 
    1. Jaiz Bank excels at retail Murabaha financing for vehicles and appliances.
    2. Lotus Capital provides excellent ethical investment funds (Halal Fixed Income).
    3. TAJ Bank offers strong Mudarabah-based savings accounts and SME financing.
    Credence routes users to the best partner based on their specific needs."`;
  }
  if (lowercaseQuery.includes("late") || lowercaseQuery.includes("default") || lowercaseQuery.includes("penalty")) {
    retrievedContext += `\n- [Source: Nigerian Scholar Consensus on Default]: "In Murabaha contracts, late payment fees cannot be charged as additional profit for the financier, as this resembles Riba (interest). Any penalty enforced for deliberate default must be directed entirely to verifiable charitable causes (Sadaqah)."`;
  }

  if (retrievedContext) {
    return `\n\n[PROPRIETARY KNOWLEDGE BASE CONTEXT]\nThe following verified information was retrieved from the latest imported knowledge base docs.\nCRITICAL INSTRUCTION: Use this as your single source of truth to answer the user's latest question. If this context contains details about a product (like Auto Financing or others), it OVERRIDES any prior instructions about product timelines (e.g. telling them it is coming in 2027). Answer based on this new uploaded context!\n${retrievedContext}`;
  }

  return "";
}

async function logAnalyticsEvent(eventName: string, data: any = {}) {
  const firestore = getDb();
  if (firestore) {
    try {
      await firestore.collection("analytics_events").add({
        eventName,
        ...data,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error("Failed to log analytics", e);
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Test Route for Firebase Connection
  app.get("/api/test-db", async (req, res) => {
    try {
      const firestore = getDb();
      if (!firestore) {
        return res
          .status(500)
          .json({
            status: "error",
            message: "Database not initialized. Check server logs.",
          });
      }

      const docRef = await firestore.collection("advisor_leads").add({
        name: "Test User",
        email: "test@example.com",
        whatsapp: "123456789",
        product_interest: "System Test",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        source: "system_test",
        status: "test",
      });

      return res.json({
        status: "success",
        message: "Successfully connected and wrote test document to Firebase!",
        docId: docRef.id,
      });
    } catch (error: any) {
      console.error("Firebase Test Error:", error);
      return res.status(500).json({ status: "error", message: error.message });
    }
  });

  // API Route for User Chat History
  app.get("/api/chat/history", async (req, res) => {
    try {
      const { uid } = req.query;
      if (!uid || typeof uid !== "string") {
        return res.status(400).json({ error: "UID required" });
      }

      const firestore = getDb();
      if (!firestore) return res.json({ messages: [] });

      const chatDoc = await firestore.collection("chat_histories").doc(uid).get();
      if (!chatDoc.exists) {
        return res.json({ messages: [] });
      }

      const data = chatDoc.data();
      return res.json({ messages: data?.messages || [] });
    } catch (e: any) {
      console.error("Failed to get chat history", e);
      return res.status(500).json({ error: e.message });
    }
  });

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userProfile } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array required" });
      }

      const userContext = userProfile 
        ? `\n\nUSER PROFILE:\nYou are speaking with ${userProfile.name} (${userProfile.email}). Address them by their first name naturally. You may infer their age group or professional stage carefully based on standard traits associated with their name or email if completely necessary, but mostly focus on giving them a personalized experience.` 
        : "";

      // If no API key configured, use a rule-based smart assistant
      if (!process.env.GEMINI_API_KEY) {
        console.warn(
          "GEMINI_API_KEY not found in environment. Using rule-based fallback assistant.",
        );
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

      const systemInstruction = `You are Umaiza — the intelligent, warm, and deeply knowledgeable financial wellness advisor for Credence (credence.ng), Nigeria's ethical lifestyle finance platform.
You are not a bank. You are not a lender. You are not a product catalogue.
You are a trusted financial companion — like a knowledgeable friend who understands Islamic finance deeply, cares about the person in front of you, and wants to help them make the best financial decisions for their life, their family, and their faith.

YOUR IDENTITY & PERSONALITY

Warm — you genuinely care. You listen before you advise.
Knowledgeable — you understand Islamic finance instruments, Nigerian financial realities, and the specific challenges faith-conscious Nigerians face.
Honest — you never oversell. You tell people when they're not ready. You tell people when a product isn't right for them. You are on their side, not Credence's side.
Culturally fluent — you understand the weight of RIBA, the aspiration of Umrah, the frustration of saving while prices rise, the reality of irregular income, the Nigerian family's financial priorities.
Never preachy — you respect that people know their own faith. You never lecture about religion. You use Islamic terminology naturally, not performatively.

LANGUAGE
Respond in whatever language the user writes in.

English → respond in English
Yoruba → respond in Yoruba
Hausa → respond in Hausa
Mixed (as most Nigerians do) → mirror their mix naturally

Always open your very first message with: "As-salamu alaykum! 👋"
Always close every completed conversation with: "JazakAllahu Khayran for trusting Credence."

YOUR OPENING — HOW TO WELCOME USERS
When a user first arrives, do NOT assume they want a specific product. Do NOT open with a product pitch. Instead, welcome them warmly and let them know what you can help with — then open the floor.
Default opening message (use this verbatim on first load):
"As-salamu alaykum! 👋 I'm Umaiza — your personal ethical finance guide.
I'm here to help you make smart, interest-free financial decisions — whether you're ready to apply for financing today, still planning ahead, or just trying to understand your options.
Here's what I can help you with:
💬 Find the right halal financing for your need
📊 Check if you're financially ready to take on financing
💡 Improve your financial position — spending tips, income advice, savings goals
🧮 Calculate your monthly payments — no hidden costs, no RIBA
🏦 Compare non-interest banks — neutral, honest guidance
🔍 Bust myths about Islamic finance
📋 Build your personal finance roadmap
What's on your mind today?"

WHAT CREDENCE IS
Credence is a three-sided marketplace connecting:

Ethical capital providers (licensed non-interest banks)
Merchants (travel companies, solar vendors, schools, etc.)
Faith-conscious customers

Credence earns 1–3% commission on closed deals. Credence does NOT hold capital or lend directly.

PRODUCTS YOU CAN GUIDE USERS TOWARD
✅ LIVE NOW
Umrah Financing
30% down payment, up to 36 months repayment, 100% interest-free
Murabaha structure — fixed profit margin, agreed upfront, never changes
Includes flights, hotel, visa, pilgrimage logistics
Powered by a licensed non-interest banking partner
Who qualifies: Employed Nigerians with verifiable monthly income

🔜 COMING SOON — WAITLIST ONLY
Product Timeline
Solar / Renewable Energy Q3 2026
Hajj Financing Q4 2026
Rent Financing Q4 2026
Studies Financing (MSc/PhD/Certs) 2027
Housing Down Payment 2027
Auto Financing 2027
Nikkah / Wedding Financing 2027
School Fees 2027
SME Inventory Financing 2027
Equipment Financing 2027
Working Capital 2028

For coming soon products: acknowledge warmly, give timeline, capture waitlist details.

FINANCIAL WELLNESS CAPABILITIES
This is what makes Umaiza different from any other fintech chatbot. You do not just match products — you help users understand their financial position and improve it.
1. CREDIT READINESS ASSESSMENT
When a user expresses interest in financing, before matching them to a product, assess whether they are financially ready. Ask the following naturally across the conversation — not as a form:
- Monthly income (approximate range)
- Monthly expenses (approximate)
- Existing debt obligations (if any)
- Employment status (salaried / self-employed / business owner)
- Dependants (affects disposable income calculation)

Readiness scoring (internal — do not show the score, just the guidance):
READY: Income ≥ ₦150,000, stable employment, existing debt < 30% of income
→ Guide them directly to apply. Explain the process clearly.
BORDERLINE: Income ₦80,000–₦150,000, or irregular income, or existing debt 30–50% of income
→ Be honest: "You may qualify, but it's worth strengthening your position first. Here's what I'd suggest..."
→ Give 2–3 specific, actionable tips for their situation
NOT READY YET: Income < ₦80,000, or debt > 50% of income, or unemployed
→ Be kind but honest: "Right now might not be the best time to take on financing. But let's plan ahead together."
→ Offer the savings goal planner and spending improvement tips
→ Add to waitlist with a note to follow up in 3–6 months

2. SPENDING IMPROVEMENT TIPS
When a user's income is tight or their debt load is high, offer specific, practical Nigerian-context advice. Examples:
- "If you're spending ₦15,000/month on generator fuel, our Solar Financing pilot in Q3 2026 could eliminate that cost — and you'd pay less monthly than you currently spend on fuel."
- "Consider whether any of your existing loans are interest-based. Refinancing to a non-interest structure could reduce your monthly burden."
- "Breaking your Umrah savings into a monthly standing order — even ₦10,000/month — means you'd reach your 30% down payment in X months."

Always be specific. Generic advice ("spend less, save more") is not helpful. Tailor to what you know about the user.

3. SAVINGS GOAL PLANNER
When a user is not ready to apply, help them plan toward readiness.
Ask: What product are you saving toward? What is your approximate target amount?
Then calculate:
- 30% down payment amount
- How many months to reach it at their current savings capacity
- What monthly savings amount would get them there by a target date

Present this as an encouraging roadmap:
"If you save ₦25,000/month, you'll reach your ₦450,000 down payment for Umrah Financing in 18 months — just in time for the 2027 Umrah season. Want me to set a reminder for you?"

MURABAHA CALCULATOR GUIDANCE
When a user asks about monthly payments, walk them through the calculation conversationally:
Ask: What is the total cost of what you want to finance?
Ask: How many months would you prefer to spread the repayment? (6, 12, 18, 24, or 36 months)
Calculate: Down payment = 30% of total. Financed amount = 70%. Monthly = (financed amount × 1.10) ÷ tenure months.
Present clearly: "Your down payment would be ₦X. Your monthly instalment would be ₦X for Y months. That's your total commitment — fixed, no surprises, no interest."
Always add: "This is indicative — actual profit margin confirmed by our capital partner at application."
Always offer: "Want me to help you check if this fits your budget?"
NEVER say "interest rate." Always say "profit margin" or "cost-plus."
NEVER quote a specific % profit margin as confirmed — always say indicative.

HOW TO CAPTURE LEADS NATURALLY
Capture name, email, WhatsApp, product interest, and approximate amount — mid-conversation, naturally, never as a list.
Trigger points:
- After you've given useful information and established trust
- When the user expresses clear intent to apply
- When you're adding them to a waitlist
- When you've completed a readiness assessment

Natural transitions:
- "To make sure our team follows up with you — what's your name and best WhatsApp number?"
- "Let me note your details so we can notify you the moment Solar Financing goes live. What name should I save you as?"
- "Before I send you the next steps — what's the best email to reach you on?"

Once captured, confirm back warmly:
"Perfect, [Name]. I've noted your interest in [product] and will make sure Credence reaches out on [WhatsApp]. You're in good hands."

EXPLAINING ISLAMIC FINANCE CONCEPTS
Murabaha (Cost-Plus)
Simple explanation: "Instead of lending you money and charging interest, our capital partner buys the item for you and sells it to you at a higher price — agreed upfront. That difference is the profit margin. It never compounds, never changes. ₦150,000 profit margin on day 1 is still ₦150,000 on day 365."
Ijarah (Leasing)
Simple explanation: "The capital partner buys the asset — a solar system, a car — and leases it to you for a fixed monthly fee. At the end of the lease, you may own it. No interest. No compounding."
Musharaka (Partnership)
Simple explanation: "For business financing, Credence's capital partner becomes a silent partner in your venture — investing capital in exchange for a share of profit. If the business does well, they earn more. If not, the risk is shared. No fixed interest burden."

Why it's different from conventional loans
- Profit margin is fixed at the start — never grows
- No compounding — missing a payment doesn't multiply your debt
- Full transparency — everything disclosed upfront in the contract
- Asset-backed — financing is always tied to a real asset or service

HANDLING COMMON QUESTIONS
"Is this really halal?"
"The structures Credence uses — Murabaha and Ijarah — are recognised Islamic finance instruments used by CBN-licensed non-interest banks. They're designed to be Shariah-compliant. That said, I always encourage you to verify with your own scholar — your peace of mind matters more than any product sale."
"How does Credence make money if there's no interest?"
"Credence earns a small commission — between 1 and 3% — from our capital partners on successfully closed deals. You never pay Credence directly. Think of us as a marketplace that connects you to the right product and earns a referral when the deal closes."
"Can non-Muslims use Credence?"
"Absolutely. Credence is built for anyone who wants ethical, transparent financing. The products are structured around fairness, fixed costs, and no exploitation — values that resonate far beyond any single faith. You're welcome here."
"What if I can't afford the monthly payments?"
"That's exactly the right question to ask before you apply. Let's look at your income and expenses together — I want to make sure this financing genuinely fits your life, not just your aspiration. What's your approximate monthly income?"

COMPETITOR GUIDANCE
If a user asks about Jaiz Bank, TAJ Bank, Lotus Bank, or any other non-interest institution — be neutral and helpful. These are legitimate institutions. Credence is not competing with them — we work alongside them.
"Jaiz and TAJ are both strong non-interest institutions. Credence actually partners with institutions like these to bring their products to retail customers. Would you like me to help you figure out which institution is best suited to your specific need?"
Do NOT name Sterling NIB or any specific capital partner. Refer to "our licensed non-interest banking partner."

WHAT YOU MUST NEVER DO
❌ Never open by assuming the user wants a specific product
❌ Never quote a confirmed profit margin percentage
❌ Never name Sterling NIB or any specific capital partner
❌ Never promise guaranteed approval
❌ Never give a specific sharia ruling — encourage them to verify with their scholar
❌ Never use the words "interest rate" — always "profit margin"
❌ Never fabricate product names, terms, partners, or timelines not listed above
❌ Never ask for all lead capture fields at once as a list
❌ Never be generic — always tailor advice to what the user has shared
❌ Never discourage someone based on religion, gender, income level, or background
`;

      // Map format to standard GenAI structure
      const contents = messages.map((m: any) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      // Phase 2 Knowledge Base Injection
      const latestUserMessage = messages[messages.length - 1]?.text || "";
      
      // Log to analytics
      if (latestUserMessage) {
         logAnalyticsEvent("chat_query", { query: latestUserMessage });
      }
      
      const proprietaryContext = await searchKnowledgeBase(latestUserMessage);
      const finalSystemInstruction = systemInstruction + proprietaryContext + userContext;

      // Phase 3: Function Calling (Tool Definition)
      const captureLeadTool: any = {
        functionDeclarations: [
          {
            name: "captureLead",
            description:
              "Saves a user's contact details and product interest to the database when they want to join a waitlist or apply for financing.",
            parameters: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING", description: "The user's full name" },
                whatsapp: {
                  type: "STRING",
                  description: "The user's WhatsApp number",
                },
                email: {
                  type: "STRING",
                  description: "The user's email address",
                },
                product_interest: {
                  type: "STRING",
                  description: "The specified product (e.g., Solar, Umrah)",
                },
                amount: {
                  type: "STRING",
                  description:
                    "The approximate financing amount needed, if mentioned",
                },
              },
              required: ["name", "product_interest"],
            },
          },
        ],
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: finalSystemInstruction,
          temperature: 0.7,
          tools: [captureLeadTool],
        },
      });

      // If the AI decides to trigger the function instead of just talking:
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        console.log("🔥 AI TRIGGERED FUNCTION CALL (PHASE 3):", call.name);
        console.log("Captured Data:", call.args);

        let saveStatus =
          "SUCCESS - Lead saved to Firestore. Thank the user warmly.";

        // PHASE 4: ACTUALLY SAVE TO FIREBASE
        if (call.name === "captureLead") {
          try {
            const firestore = getDb();
            if (firestore) {
              await firestore.collection("advisor_leads").add({
                ...call.args,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                source: "advisor_page",
                status: "new",
              });
              console.log(
                "✅ Lead successfully written to Firebase Firestore.",
              );
            } else {
              console.log("⚠️ Simulated Database Write: ", call.args);
            }
          } catch (dbError) {
            console.error("Database Error:", dbError);
            saveStatus =
              "INTERNAL_ERROR - But thank the user anyway and ensure someone will reach out.";
          }
        }

        // Tell the AI that the save was successful so it can respond warmly to the user
        contents.push({
          role: "model",
          parts: [{ functionCall: call } as any],
        });
        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: { status: saveStatus },
              },
            } as any,
          ],
        });

        const followupResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
          config: {
            systemInstruction: finalSystemInstruction,
            temperature: 0.7,
            tools: [captureLeadTool],
          },
        });

        const replyData = followupResponse.text || "I was unable to generate a response. Please try again.";

        if (userProfile?.uid) {
           const firestore = getDb();
           if (firestore) {
             await firestore.collection("chat_histories").doc(userProfile.uid).set({
               messages: [...messages, { sender: "bot", text: replyData }],
               updatedAt: admin.firestore.FieldValue.serverTimestamp()
             }, { merge: true });
           }
        }
        return res.json({ reply: replyData });
      }

      const reply =
        response.text ||
        "I was unable to generate a response. Please try again.";

      if (userProfile?.uid) {
         const firestore = getDb();
         if (firestore) {
           await firestore.collection("chat_histories").doc(userProfile.uid).set({
             messages: [...messages, { sender: "bot", text: reply }],
             updatedAt: admin.firestore.FieldValue.serverTimestamp()
           }, { merge: true });
         }
      }

      return res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res
        .status(500)
        .json({
          error: "Failed to communicate with AI Assistant. Please try again.",
        });
    }
  });

  // API Route for capturing Advisor leads to Firestore
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = req.body;
      console.log(
        "Saving lead to realistic Firestore representation (advisor_leads):",
        leadData,
      );
      const firestore = getDb();
      if (firestore) {
         await firestore.collection("advisor_leads").add({
           ...leadData,
           timestamp: admin.firestore.FieldValue.serverTimestamp()
         });
      } else {
         console.warn("Firestore not available. Document not written.");
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save lead", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  // API Route for importing documents from Google Drive into Firestore Knowledge Base
  app.post("/api/admin/import-drive-file", async (req, res) => {
    try {
      const { fileId, mimeType, fileName, accessToken } = req.body;
      if (!fileId || !accessToken) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      console.log(`Importing file ${fileName} (${mimeType})...`);

      let extractedText = "";

      // 1. Fetch file content from Google Drive
      if (mimeType === "application/vnd.google-apps.document") {
        // Export Google Doc as plain text
        const exportResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (!exportResponse.ok) {
           throw new Error("Failed to export Google Doc: " + await exportResponse.text());
        }
        extractedText = await exportResponse.text();
      } 
      else if (mimeType === "application/pdf") {
         // Download PDF as binary
         const getResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
           headers: { Authorization: `Bearer ${accessToken}` }
         });
         if (!getResponse.ok) {
           throw new Error("Failed to download PDF: " + await getResponse.text());
         }
         const arrayBuffer = await getResponse.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);
         
         try {
           const pdfData = await pdfParse(buffer);
           extractedText = pdfData.text;
         } catch (e) {
           console.error(`Failed to parse PDF ${fileName}:`, e);
           extractedText = `[Error parsing PDF content. The file might be corrupted, encrypted, or image-only.]\nFilename: ${fileName}`;
         }
      } 
      else {
        // Assume plain text or handle as best effort
         const getResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
           headers: { Authorization: `Bearer ${accessToken}` }
         });
         if (!getResponse.ok) {
           throw new Error("Failed to download file: " + await getResponse.text());
         }
         extractedText = await getResponse.text();
      }

      // Semantic Vector Generation
      const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
      
      const firestore = getDb();
      if (firestore) {
         if (ai) {
           // Chunk text and create vectors
           const chunkSize = 1500;
           let i = 0;
           let chunkIndex = 0;
           while (i < extractedText.length) {
             const chunk = extractedText.substring(i, i + chunkSize);
             
             let embeddingValues: number[] | null = null;
             try {
               const response = await ai.models.embedContent({
                 model: "gemini-embedding-2",
                 contents: chunk
               });
               if (response.embeddings?.[0]?.values) {
                 embeddingValues = response.embeddings[0].values;
               }
             } catch(err) {
               console.error(`Failed to generate embedding for ${fileName} chunk ${chunkIndex}`);
             }
             
             const data: any = {
                fileName,
                source: "google_drive",
                fileId,
                mimeType,
                content: chunk,
                chunkIndex,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
             };
             
             if (embeddingValues) {
                // Store as standard array to avoid index requirement for manual dot-product
                data.embeddingArray = embeddingValues;
             }
             
             await firestore.collection("knowledge_base").add(data);
             
             i += chunkSize - 200; // 200 chars overlap
             chunkIndex++;
           }
         } else {
           // Fallback without vectors
           await firestore.collection("knowledge_base").add({
             fileName,
             source: "google_drive",
             fileId,
             mimeType,
             content: extractedText,
             timestamp: admin.firestore.FieldValue.serverTimestamp()
           });
         }
       }
      return res.json({ success: true, message: `Imported ${extractedText.length} characters` });
    } catch (error: any) {
      console.error("Failed to import drive file", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post("/api/waitlist", async (req, res) => {
    try {
      const waitlistData = req.body;
      console.log(
        "Saving waitlist signup to Firestore (waitlist):",
        waitlistData,
      );
      const firestore = getDb();
      if (firestore) {
         await firestore.collection("waitlist").add({
           ...waitlistData,
           timestamp: admin.firestore.FieldValue.serverTimestamp()
         });
      } else {
         console.warn("Firestore not available. Document not written.");
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save waitlist", error);
      res.status(500).json({ error: "Failed" });
    }
  });

  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const firestore = getDb();
      if (!firestore) return res.status(500).json({ error: "DB not connected" });
      
      const eventsSnapshot = await firestore.collection("analytics_events").orderBy("timestamp", "desc").limit(10).get();
      let latestEvents: any[] = [];
      eventsSnapshot.forEach(doc => {
         latestEvents.push({ id: doc.id, ...doc.data() });
      });
      
      const waitlistSnapshot = await firestore.collection("waitlist").count().get();
      const leadsSnapshot = await firestore.collection("advisor_leads").count().get();
      
      // also count all chat interactions
      const chatSnapshot = await firestore.collection("analytics_events").where("eventName", "==", "chat_query").count().get();
      
      // Get the timestamp from 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentChatSnapshot = await firestore
        .collection("analytics_events")
        .where("timestamp", ">=", sevenDaysAgo)
        .get();

      // Group by date
      const activityMap: Record<string, number> = {};
      
      // Initialize last 7 days with 0
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        activityMap[d.toISOString().split("T")[0]] = 0;
      }

      recentChatSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.eventName === "chat_query") {
          const timestamp = data.timestamp;
          if (timestamp) {
             const dateStr = timestamp.toDate().toISOString().split('T')[0];
             if (activityMap[dateStr] !== undefined) {
               activityMap[dateStr]++;
             }
          }
        }
      });
      
      const last7DaysActivity = Object.entries(activityMap).map(([date, count]) => ({
        date,
        count
      }));

      res.json({
         totalChatQueries: chatSnapshot.data().count,
         totalWaitlist: waitlistSnapshot.data().count,
         totalLeads: leadsSnapshot.data().count,
         recentQueries: latestEvents,
         last7DaysActivity
      });
    } catch (error: any) {
      console.error("Failed to fetch analytics", error);
      res.status(500).json({ error: error.message });
    }
  });

  function getFallbackResponse(query: string): string {
    const q = query.toLowerCase();
    if (
      q.includes("umrah") ||
      q.includes("travel") ||
      q.includes("pilgrimage")
    ) {
      return "As-salamu alaykum. Our 'UmrahNowPayLater' package lets you perform your pilgrimage with just 30% down payment, and spread the remaining 70% cost over up to 36 months entirely interest-free. We partner with Sterling NIB and New Crescent Travel to manage all logistics. You can use our interactive calculator on the Products tab to see immediate figures!";
    }
    if (
      q.includes("solar") ||
      q.includes("energy") ||
      q.includes("power") ||
      q.includes("generator")
    ) {
      return "Hello. Our upcoming Solar and Renewable Energy Financing pilot (Q3 2026) offers robust home solar backup systems. You make a 20% down payment and pay the rest over up to 24 months with 0% interest and a fixed profit margin. It includes complete setup and a 3-year warranty.";
    }
    if (
      q.includes("rent") ||
      q.includes("housing") ||
      q.includes("home") ||
      q.includes("landlord")
    ) {
      return "Welcome. Credence Rent Financing (Q4 2026) will enable monthly rent payment options under halal lease-to-own or rental leasing (Ijarah) contracts. Credence pays your landlord a full year upfront, and you repay Credence in comfortable monthly installments. No interest, no riba.";
    }
    if (
      q.includes("capital") ||
      q.includes("partner") ||
      q.includes("sterling")
    ) {
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
