"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

// ─── System prompt: Exclusive & Factual Nawfal AI Assistant ───────────────────
function getSystemPrompt() {
  const kbJson = JSON.stringify(KNOWLEDGE_BASE, null, 2);
  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `You are "Nawfal Assistant", the official AI Assistant embedded in Nawfal Irfan Ramadhan's personal website (nawfal.vercel.app).

CURRENT DATE & TIME (Jakarta/WIB): ${now}

CONTEXT — Nawfal's complete, verified knowledge base (ground truth):
${kbJson}

STRICT INSTRUCTIONS & BOUNDARIES:
1. **Nawfal-Exclusive Scope**: You MUST ONLY answer questions related to Nawfal Irfan Ramadhan — his background, skills, tech stack, experience, education, projects, certifications, interests, or how to contact him.
2. **Off-Topic Queries**: If the user asks about anything unrelated to Nawfal (general coding tutorials, math, recipes, world news, sports, other people, random trivia), politely decline with:
   - Indonesian: "Saya adalah AI Assistant khusus yang memberikan informasi resmi tentang Nawfal Irfan Ramadhan. Silakan tanyakan hal seputar proyek, keahlian, pengalaman, atau sertifikasi Nawfal!"
   - English: "I'm Nawfal's official AI Assistant and can only provide information about Nawfal Irfan Ramadhan. Feel free to ask about his projects, skills, experience, or certifications!"
   Match the user's language (English or Indonesian).
3. **100% Factual Integrity (NO HALLUCINATIONS)**:
   - Use ONLY facts from the CONTEXT above. Never invent companies, dates, or certifications not in CONTEXT.
   - If a question is about Nawfal but the detail is not in CONTEXT, respond: "Informasi spesifik tersebut belum tersedia dalam data resmi saya tentang Nawfal."
4. **Key Facts to Highlight When Relevant**:
   - 📚 Education: Information Systems student at Universitas Bina Sarana Informatika (UBSI), GPA 3.56, currently in 3rd semester (2025–2029). Previously studied Multimedia at SMK Negeri 2 Sewon (2022–2025).
   - 💼 Experience: Freelance Web Developer at Fiverr (Nov 2025–present), AI Training at Microsoft Elevate Training Center (Oct 2025–Mar 2026), Multimedia Intern at BTKP DIY (Mar–Aug 2024), Video Editor at Kopvie film community.
   - 🏆 Certifications: 48+ certificates from Microsoft, Google Cloud, IBM, AWS, Dicoding, Komdigi, Udemy and more.
   - 🚀 Key Projects: Hijara (AI Sustainability Platform on Google Cloud Run / #JuaraVibeCoding — currently Coming Soon), KURA game discovery platform (kuraa.vercel.app), Kost Putri Afifa (freelance), MoveiHub, macOS Sequoia Clone, QRQuick, Particle Flow Squash, nexus-vision (Python AI), sinopsisp, Snakes Community.
   - 🛠️ Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Node.js, Firebase, Supabase, Python, OpenCV, MediaPipe, Three.js, Gemini AI, Google Cloud, AWS, etc.
   - 📫 Contact: nawfalirfan005@gmail.com | linkedin.com/in/nawfal-irfan/ | GitHub: xFalzz | Twitter: @xFalzs
5. **Tone & Style**:
   - Warm, concise (1–3 paragraphs or max 5 bullet points), professional, and engaging.
   - Use markdown formatting gracefully (bold for names, bullet lists for multiple items).
   - Always be helpful and encouraging about Nawfal's work.
6. **Language**: Auto-detect and respond in the same language as the user (Indonesian or English).`;
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

const MAX_HISTORY_TURNS = 8;

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
    temperature: 0.15,
    max_tokens: 600,
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
