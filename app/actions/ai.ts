"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

type Role = "user" | "assistant" | "system" | "tool";

interface ChatMessage {
  role: Role;
  content: string;
}

interface HistoryEntry {
  role: string;
  parts: { text: string }[];
}

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
3. **Factual Integrity (NO HALLUCINATIONS)**:
   - Base all answers strictly on the GROUND TRUTH KNOWLEDGE BASE above.
4. **Tone & Formatting**:
   - Professional, encouraging, clear, and engaging.
   - Use clean Markdown styling (bolding, bullet points, code blocks for CLI commands).`;
}

function generateSmartLocalResponse(prompt: string): string {
  const p = prompt.toLowerCase();

  if (p.includes("siapa") || p.includes("who is") || p.includes("nawfal") || p.includes("nawis") || p.includes("tentang") || p.includes("profile")) {
    return `**Nawfal Irfan Ramadhan** (biasa dipanggil **Nawfal** / **Nawis**) adalah seorang **Fullstack Software Engineer & UI/UX Designer** berlokasi di Yogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) semester 3 dengan IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Memiliki **48+ sertifikasi resmi** dari Google Cloud, IBM, Coursera, RevoU, Dicoding, dan HackerRank.
- 🚀 **Karya**: Kreator **Nawfal UI Kit** (48 komponen enterprise monokromatik) dan platform populer seperti **Hijara** & **KURA**.`;
  }

  if (p.includes("proyek") || p.includes("project") || p.includes("hijara") || p.includes("kura") || p.includes("aplikasi") || p.includes("buat") || p.includes("dibuat")) {
    return `Berikut adalah beberapa **Proyek Unggulan** karya Nawfal Irfan Ramadhan:

1. 🌿 **Hijara – AI Sustainability Platform**:
   - Platform keberlanjutan berbasis AI untuk Google #JuaraVibeCoding.
   - Mengintegrasikan Gemini Vision untuk klasifikasi sampah & pelacakan daur ulang. Serverless di Google Cloud Run.
2. 🎮 **KURA – Game Discovery Platform**:
   - Platform eksplorasi 897,000+ game menggunakan Next.js, TypeScript, Firebase, & RAWG API.
3. 📦 **Nawfal UI Kit Ecosystem (v5.2.0)**:
   - Design system 48 komponen monokromatik, Design Studio interaktif, dan NextGen CLI (\`npx nawfal-ui@latest init\`).
4. 🖥️ **macOS Sequoia Web Clone**:
   - Replika sistem operasi macOS Sequoia interaktif di web menggunakan React & Framer Motion.
5. 🏠 **Kost Afifa Management System**:
   - Platform manajemen properti kost terintegrasi dengan laporan keuangan.`;
  }

  if (p.includes("sertifikat") || p.includes("sertifikasi") || p.includes("certif") || p.includes("prestasi")) {
    return `Nawfal Irfan Ramadhan memiliki **48+ Sertifikasi Profesional** di bidang Software Engineering & AI, di antaranya:

- 🟢 **Google Cloud & IBM**: Cloud Architecture, DevOps & AI Foundations.
- 💻 **Dicoding & RevoU**: Fullstack Web Development & Front-End Engineering.
- ⚡ **HackerRank**: Problem Solving (Advanced), React, & JavaScript Certification.
- 📜 **Coursera**: Specialization in System Design & Modern Web Applications.

Seluruh bukti sertifikat dapat dilihat langsung di halaman [Certificates](/certificate).`;
  }

  if (p.includes("nawfal ui") || p.includes("component") || p.includes("komponen") || p.includes("cli") || p.includes("kit")) {
    return `**Nawfal UI Kit** adalah Design System Enterprise Monokromatik berkinerja tinggi:

- 🧱 **48 Primitives**: Berbasis Next.js 14, TypeScript, Tailwind CSS, & Framer Motion.
- 🎛️ **Design Studio Workbench**: 16 komponen katalog dengan inspektor parameter live & ekspor 4 framework (TSX, JSX, HTML, Vue).
- 📐 **19 Templates**: Layout siap pakai untuk AI RAG, Audio, DevOps, & Security.
- 💻 **CLI Installer**: \`npx nawfal-ui@latest init\` & \`npx nawfal-ui add <component>\`.`;
  }

  if (p.includes("kontak") || p.includes("contact") || p.includes("hubungi") || p.includes("email") || p.includes("pesan")) {
    return `Anda dapat menghubungi **Nawfal Irfan Ramadhan** melalui:

- ✉️ **Email**: nawfalirfan005@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/nawfal-irfan](https://www.linkedin.com/in/nawfal-irfan/)
- 💻 **GitHub**: [github.com/xFalzz](https://github.com/xFalzz)
- 🐦 **Twitter/X**: [x.com/xFalzs](https://x.com/xFalzs)
- 💬 **Discord**: [discord.gg/v6dgnKCpuM](https://discord.gg/v6dgnKCpuM)`;
  }

  return `Saya adalah **Nawfal AI Assistant** resmi. Saya dapat memberikan informasi terverifikasi mengenai:

- 👤 **Profil & Latar Belakang** Nawfal Irfan Ramadhan (Nawis)
- 🚀 **Portofolio Proyek** (Hijara, KURA, macOS Clone, Nawfal UI Kit)
- 🏆 **48+ Sertifikasi Profesional**
- 🛠️ **Tech Stack & Keahlian Engineering**
- 📦 **Spesifikasi Nawfal UI Kit & CLI**

Silakan tanyakan hal seputar topik di atas!`;
}

async function callGroqWithFallback(apiKey: string, messages: ChatMessage[]) {
  // Updated list of active, non-deprecated Groq models
  const models = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama3-8b-8192",
    "gemma2-9b-it"
  ];

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

  throw new Error("GROQ_API_UNAVAILABLE");
}

export async function getAiResponseAction(
  prompt: string,
  history: HistoryEntry[] = []
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey) {
    try {
      const systemPrompt = getDynamicSystemPrompt();
      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...history.slice(-10).map((m) => ({
          role: (m.role === "model" ? "assistant" : "user") as Role,
          content: m.parts[0]?.text || "",
        })),
        { role: "user" as Role, content: prompt },
      ];

      return await callGroqWithFallback(apiKey, messages);
    } catch (err) {
      console.warn("[NawfalAI] Groq API call failed or unconfigured, seamlessly serving via smart local knowledge engine.");
    }
  }

  // Bulletproof Smart Local Knowledge Engine (100% Uptime Guarantee)
  return generateSmartLocalResponse(prompt);
}
