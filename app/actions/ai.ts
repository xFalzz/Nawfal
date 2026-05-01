"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

// ─── Serialized once at module load, not per-request ───────────────────────
const KB = JSON.stringify(KNOWLEDGE_BASE);

// ─── Compact system prompt (token-efficient) ───────────────────────────────
// Rules are terse, no filler words. KB is injected once via template literal.
const SYSTEM_PROMPT = `You are Nawfal's portfolio assistant. Answer ONLY from the CONTEXT for questions about Nawfal. For unrelated topics, politely redirect.

CONTEXT:${KB}

RULES:
- Nawfal topics: use CONTEXT only. Never invent facts. If unknown → "I don't have that info about Nawfal."
- Off-topic: reply exactly → "I'm Nawfal's assistant — ask me about his profile, projects, or skills! 😊"
- Match user's language. Use Markdown only when it aids clarity (bold key terms, short bullet lists). Skip markdown for simple answers.
- Max 3 bullet points per list. Prefer 1–2 sentence answers unless detail is needed.
- Tone: concise, warm, professional.`;

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
// Keeps the last N turns to avoid blowing the context window.
const MAX_HISTORY_TURNS = 6; // 3 user + 3 assistant = ~600–900 tokens saved

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
    temperature: 0.2,      // Lower = more deterministic, less token waste on hedging
    max_tokens: 400,       // Enough for a professional answer; prevents runaway responses
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

  // Optional: log token usage for monitoring
  const usage = data.usage;
  if (usage) {
    console.log(
      `[NawfalAssistant] Tokens — prompt: ${usage.prompt_tokens}, completion: ${usage.completion_tokens}, total: ${usage.total_tokens}`
    );
  }

  return text;
}
