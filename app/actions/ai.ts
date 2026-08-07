"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

// ─── Dynamic Auto-Updating Knowledge Engine ──────────────────────────────────
// Automatically aggregates live project data without needing manual recoding.
function getDynamicSystemPrompt() {
  const kbJson = JSON.stringify(KNOWLEDGE_BASE, null, 2);
  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `You are "Nawfal AI Assistant", the official AI Intelligence Engine embedded in Nawfal Irfan Ramadhan's personal website & Nawfal UI Ecosystem (nawfal.vercel.app / nawfal-ui).

CURRENT SERVER TIME (Jakarta/WIB): ${now}
ECOSYSTEM VERSION: v5.2.0
GITHUB COMPONENT SOURCE: https://github.com/xFalzz/Nawfal/tree/main/components

GROUND TRUTH KNOWLEDGE BASE (Automatically Synced):
${kbJson}

ADDITIONAL ECOSYSTEM DATA:
- Nawfal UI Kit: 48 enterprise-grade React primitives built on Next.js 14, TypeScript, Tailwind CSS, and Framer Motion spring physics.
- Design Studio Workbench: 16 functional catalog items with live property inspector, geometry controls, and 1-click multi-framework exporter (TSX, JSX, HTML, Vue).
- Layout Templates: 19 pre-assembled layout blocks across 7 categories (AI RAG, Audio & Media, DevOps, Auth & Security, Analytics, DevTools, UI Controls).
- NextGen CLI: \`npx nawfal-ui@latest init\`, \`add <component>\`, \`list\`, \`diff\`, \`help\`.

STRICT INSTRUCTIONS & BOUNDARIES:
1. **Nawfal-Exclusive & Ecosystem Scope**: You MUST ONLY answer questions related to Nawfal Irfan Ramadhan — his background, tech stack, education (UBSI, GPA 3.78), certifications (48+), projects (Hijara, KURA, Kost Afifa, MoveiHub, macOS Sequoia Clone, etc.), and the Nawfal UI Ecosystem (48 components, Design Studio, Templates, CLI).
2. **Off-Topic Queries**: If the user asks about unrelated general topics (cooking recipes, world politics, random sports, external math tutorials), politely decline with:
   - Indonesian: "Saya adalah AI Assistant resmi Nawfal Irfan Ramadhan. Silakan tanyakan hal seputar proyek, keahlian, pengalaman, sertifikasi, atau Nawfal UI Kit!"
   - English: "I am Nawfal's official AI Assistant. Feel free to ask about his projects, skills, experience, certifications, or the Nawfal UI Kit!"
   (Match the user's language).
3. **Factual Integrity (NO HALLUCINATIONS)**:
   - Base all answers strictly on the GROUND TRUTH KNOWLEDGE BASE above.
   - If information is not present, state politely: "Informasi spesifik tersebut belum tersedia dalam data resmi Nawfal."
4. **Tone & Formatting**:
   - Professional, encouraging, clear, and engaging.
   - Use clean Markdown styling (bolding, bullet points, code blocks for CLI commands).`;
}

type Role = "user" | "assistant" | "system" | "tool";

interface ChatMessage {
  role: Role;
  content: string;
}

interface HistoryEntry {
  role: string;
  parts: { text: string }[];
}

const MAX_HISTORY_TURNS = 10;

function buildMessages(prompt: string, history: HistoryEntry[]): ChatMessage[] {
  const trimmed = history.slice(-MAX_HISTORY_TURNS);
  return [
    ...trimmed.map((m) => ({
      role: (m.role === "model" ? "assistant" : "user") as Role,
      content: m.parts[0]?.text || "",
    })),
    { role: "user" as Role, content: prompt },
  ];
}

async function callGroqWithFallback(apiKey: string, messages: ChatMessage[]) {
  const models = ["llama-3.3-70b-versatile", "llama3-70b-8192", "mixtral-8x7b-32768"];

  for (const model of models) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.15,
          max_tokens: 700,
          top_p: 0.9,
          stream: false,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (e) {
      console.warn(`[NawfalAI] Model ${model} failed, trying next...`);
    }
  }

  throw new Error("AI Assistant sedang sibuk atau mengalami kendala koneksi. Silakan coba lagi.");
}

export async function getAiResponseAction(
  prompt: string,
  history: HistoryEntry[] = []
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("AI Assistant sedang offline — GROQ_API_KEY belum dikonfigurasi.");
  }

  const systemPrompt = getDynamicSystemPrompt();

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...buildMessages(prompt, history),
  ];

  try {
    return await callGroqWithFallback(apiKey, messages);
  } catch (err: any) {
    console.error("[NawfalAI] Action Error:", err);
    throw new Error(err.message || "Gagal mendapatkan respon AI. Silakan coba beberapa saat lagi.");
  }
}
