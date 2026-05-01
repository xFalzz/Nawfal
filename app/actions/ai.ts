"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

// ─── Serialized once at module load, not per-request ───────────────────────
const KB = JSON.stringify(KNOWLEDGE_BASE);

// ─── System prompt: Nawfal-first, general knowledge allowed ────────────────
const SYSTEM_PROMPT = `You are Nawfal's smart portfolio assistant. You serve two roles:

1. **Nawfal Expert** — For questions about Nawfal, ONLY use the CONTEXT below. Never invent facts about him.
2. **General Assistant** — For other topics, answer from your training knowledge accurately.

CONTEXT (Nawfal's data):${KB}

RULES:
- About Nawfal → CONTEXT only. If not in CONTEXT → "I don't have that specific info about Nawfal."
- General knowledge → Answer confidently if you're sure. If uncertain, say "I'm not certain about that" instead of guessing.
- Time-sensitive topics (today's news, current prices, live events) → "My knowledge has a cutoff date, so I can't provide real-time info on that. Please check a live source."
- Match the user's language automatically.
- Be concise: 1–3 sentences for simple questions. Use Markdown (bold, bullets) only when it genuinely helps.
- Max 3 bullet points per list. No filler words.
- Tone: warm, professional, helpful.
- Always prioritize accuracy over completeness — a short correct answer beats a long wrong one.`;

// ─── Types ─────────────────────────────────────────────────────────────────
type Role = "user" | "assistant";

interface ChatMessage {
  role: Role;
  content: string;
}

interface HistoryEntry {
  role: string;
  parts: { text: string }[];
}

// ─── Trim history to stay within token budget ──────────────────────────────
const MAX_HISTORY_TURNS = 6;

function buildMessages(
  prompt: string,
  history: HistoryEntry[]
): ChatMessage[] {
  const trimmed = history.slice(-MAX_HISTORY_TURNS);

  return [
    ...trimmed.map((m) => ({
      role: (m.role === "model" ? "assistant" : "user") as Role,
      content: m.parts[0].text,
    })),
    { role: "user" as Role, content: prompt },
  ];
}

// ─── Main action ───────────────────────────────────────────────────────────
export async function getAiResponseAction(
  prompt: string,
  history: HistoryEntry[] = []
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("[NawfalAssistant] Missing GROQ_API_KEY.");
    throw new Error("Assistant is offline — API key not configured.");
  }

  const body = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...buildMessages(prompt, history),
    ],
    temperature: 0.2,
    max_tokens: 400,
    top_p: 0.9,
    stream: false,
  };

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = (err as any)?.error?.message ?? `HTTP ${response.status}`;
    console.error("[NawfalAssistant] Groq error:", msg);
    throw new Error(`Groq error: ${msg}`);
  }

  const data = await response.json();
  const text: string | undefined = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Empty response from Groq.");
  }

  const usage = data.usage;
  if (usage) {
    console.log(
      `[NawfalAssistant] Tokens — prompt: ${usage.prompt_tokens}, completion: ${usage.completion_tokens}, total: ${usage.total_tokens}`
    );
  }

  return text;
}
