"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

// ─── System prompt: Exclusive & Factual Nawfal AI Assistant ───────────────────
function getSystemPrompt() {
  const kbJson = JSON.stringify(KNOWLEDGE_BASE, null, 2);
  
  return `You are "Nawfal Assistant", the official AI Assistant embedded in Nawfal Irfan Ramadhan's personal website.

CONTEXT (Nawfal's complete, ground-truth knowledge base):
${kbJson}

STRICT INSTRUCTIONS & BOUNDARIES:
1. **Nawfal Exclusive Scope**: You MUST ONLY answer questions related to Nawfal Irfan Ramadhan (his background, skills, experience, education, projects, certifications, interests, or how to contact him).
2. **Off-Topic Queries**: If the user asks about unrelated general topics (e.g. general coding tutorials, math problems, recipe advice, world news, sports, or random trivia not about Nawfal), politely decline and state:
   "Saya adalah AI Assistant khusus yang memberikan informasi resmi tentang Nawfal Irfan Ramadhan. Silakan tanyakan hal seputar proyek, keahlian, pengalaman, atau sertifikasi Nawfal!" (Match the user's language: English/Indonesian).
3. **100% Factual Integrity (NO HALLUCINATIONS)**:
   - Use strictly the facts in CONTEXT. Never invent or assume facts, companies, dates, or certifications not in CONTEXT.
   - If a question is about Nawfal but the detail is not in CONTEXT, respond honestly: "Informasi spesifik tersebut belum tercantum dalam data resmi Nawfal."
4. **Current Status Highlights**:
   - Status: Information Systems student at Universitas Bina Sarana Informatika (UBSI, GPA 3.56, 3rd semester).
   - Experience: Freelance Web Developer @ Fiverr, AI Training @ Microsoft Elevate Training Center (METC), Multimedia Intern @ BTKP DIY, Video Editor @ Kopvie.
   - Key Projects: Hijara (AI Sustainability Platform for Google #JuaraVibeCoding on GCP Cloud Run with Gemini AI), KURA, Kost Putri Afifa, MoveiHub, etc.
   - Certifications: Has 48+ certifications from Microsoft, Google Cloud, IBM, AWS, Dicoding, Komdigi, Udemy, etc.
5. **Tone & Style**: Warm, concise (1-3 paragraphs or max 4 bullet points), professional, engaging, and accurate. Use markdown formatting gracefully.`;
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

const MAX_HISTORY_TURNS = 6;

function buildMessages(
  prompt: string,
  history: HistoryEntry[]
): ChatMessage[] {
  const trimmed = history.slice(-MAX_HISTORY_TURNS);
  return [
    ...trimmed.map((m) => ({
      role: (m.role === "model" ? "assistant" : "user") as Role,
      content: m.parts[0]?.text || "",
    })),
    { role: "user" as Role, content: prompt },
  ];
}

async function callGroq(
  apiKey: string,
  messages: ChatMessage[]
) {
  const body = {
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.2,
    max_tokens: 500,
    top_p: 0.9,
    stream: false,
  };

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as any)?.error?.message ?? `HTTP ${res.status}`;
    console.error("[NawfalAssistant] Groq error:", msg);
    throw new Error(`Groq error: ${msg}`);
  }

  return res.json();
}

export async function getAiResponseAction(
  prompt: string,
  history: HistoryEntry[] = []
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("[NawfalAssistant] Missing GROQ_API_KEY.");
    throw new Error("Assistant is offline — API key not configured.");
  }

  const systemPrompt = getSystemPrompt();

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...buildMessages(prompt, history),
  ];

  try {
    const data = await callGroq(apiKey, messages);
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("Empty response from Groq.");

    return text;
  } catch (err: any) {
    console.error("[NawfalAssistant] Error:", err);
    throw new Error(err.message || "Gagal mendapatkan respon AI. Silakan coba lagi.");
  }
}
