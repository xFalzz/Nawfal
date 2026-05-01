"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

// ─── Serialized once at module load ────────────────────────────────────────
const KB = JSON.stringify(KNOWLEDGE_BASE);

// ─── System prompt: Nawfal expert + web-augmented general assistant ────────
const SYSTEM_PROMPT = `You are Nawfal's smart portfolio assistant with web search capability.

CONTEXT (Nawfal's data):${KB}

ROLES:
1. **Nawfal Expert** — Questions about Nawfal → use CONTEXT only. Never invent facts about him.
2. **General Assistant** — Other topics → use your knowledge OR the search_web tool for current/real-time info.

WHEN TO SEARCH:
- Current events, news, prices, scores, weather → ALWAYS search.
- Facts you're unsure about → search to verify.
- Historical/well-known facts you're confident about → answer directly, no search needed.

RULES:
- About Nawfal & not in CONTEXT → "I don't have that specific info about Nawfal."
- Match user's language. Be concise (1–3 sentences). Use Markdown only when helpful.
- Max 3 bullets per list. No filler.
- When citing search results, summarize naturally — don't dump raw text.
- Accuracy > completeness. Short correct answer > long wrong one.
- Tone: warm, professional, helpful.`;

// ─── Types ─────────────────────────────────────────────────────────────────
type Role = "user" | "assistant" | "system" | "tool";

interface ChatMessage {
  role: Role;
  content: string;
  tool_call_id?: string;
}

interface HistoryEntry {
  role: string;
  parts: { text: string }[];
}

interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

// ─── Tool definition for Groq ──────────────────────────────────────────────
const TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "search_web",
      description:
        "Search the internet for current, real-time information. Use this for news, events, prices, facts you are unsure about, or anything that requires up-to-date data.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query in the most relevant language for accurate results.",
          },
        },
        required: ["query"],
      },
    },
  },
];

// ─── Tavily web search ─────────────────────────────────────────────────────
async function searchWeb(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    return "Web search is unavailable (API key not configured).";
  }

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        max_results: 3,
        search_depth: "basic",
        include_answer: true,
      }),
    });

    if (!res.ok) {
      console.error(`[Tavily] HTTP ${res.status}`);
      return "Web search failed. Please try again.";
    }

    const data = await res.json();

    // Use Tavily's built-in answer if available (most token-efficient)
    let output = "";
    if (data.answer) {
      output += `Summary: ${data.answer}\n\n`;
    }

    // Append top sources for grounding
    if (data.results?.length) {
      output += "Sources:\n";
      for (const r of data.results.slice(0, 3)) {
        output += `- ${r.title}: ${r.content?.slice(0, 200) ?? ""} (${r.url})\n`;
      }
    }

    return output || "No relevant results found.";
  } catch (err) {
    console.error("[Tavily] Search error:", err);
    return "Web search encountered an error.";
  }
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

// ─── Groq API call helper ──────────────────────────────────────────────────
async function callGroq(
  apiKey: string,
  messages: ChatMessage[],
  useTools: boolean
) {
  const body: Record<string, unknown> = {
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.2,
    max_tokens: 400,
    top_p: 0.9,
    stream: false,
  };

  if (useTools) {
    body.tools = TOOLS;
    body.tool_choice = "auto";
  }

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

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...buildMessages(prompt, history),
  ];

  // ── Step 1: Initial call with tools ──────────────────────────────────────
  const data = await callGroq(apiKey, messages, true);
  const choice = data.choices?.[0];
  const message = choice?.message;

  // Log token usage
  if (data.usage) {
    console.log(
      `[NawfalAssistant] Step 1 tokens — prompt: ${data.usage.prompt_tokens}, completion: ${data.usage.completion_tokens}`
    );
  }

  // If no tool call, return the direct answer
  if (choice?.finish_reason !== "tool_calls" || !message?.tool_calls?.length) {
    const text = message?.content;
    if (!text) throw new Error("Empty response from Groq.");
    return text;
  }

  // ── Step 2: Execute tool calls and get final answer ──────────────────────
  // Add the assistant's tool-call message to context
  messages.push({
    role: "assistant",
    content: message.content ?? "",
    ...({ tool_calls: message.tool_calls } as any),
  });

  // Execute each tool call
  for (const toolCall of message.tool_calls as ToolCall[]) {
    if (toolCall.function.name === "search_web") {
      const args = JSON.parse(toolCall.function.arguments);
      console.log(`[NawfalAssistant] 🔍 Searching: "${args.query}"`);
      const searchResult = await searchWeb(args.query);
      messages.push({
        role: "tool",
        content: searchResult,
        tool_call_id: toolCall.id,
      });
    }
  }

  // Final call — no tools this time, just answer with search context
  const finalData = await callGroq(apiKey, messages, false);
  const finalText: string | undefined =
    finalData.choices?.[0]?.message?.content;

  if (finalData.usage) {
    console.log(
      `[NawfalAssistant] Step 2 tokens — prompt: ${finalData.usage.prompt_tokens}, completion: ${finalData.usage.completion_tokens}`
    );
  }

  if (!finalText) throw new Error("Empty response from Groq (step 2).");
  return finalText;
}
