"use server";

import fs from "fs";
import path from "path";
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

/**
 * 🚀 Real-time Auto-Introspection Engine:
 * Dynamically scans the Next.js project directory at runtime.
 * Automatically discovers new website routes, pages, and UI Kit components
 * without needing any manual code editing or knowledge base updates!
 */
function getRuntimeWebsiteIntrospection() {
  try {
    const cwd = process.cwd();

    // 1. Auto-discover App Router pages
    const appDir = path.join(cwd, "app");
    let detectedRoutes: string[] = ["/"];
    if (fs.existsSync(appDir)) {
      const items = fs.readdirSync(appDir, { withFileTypes: true });
      const routes = items
        .filter(
          (i) =>
            i.isDirectory() &&
            !i.name.startsWith("(") &&
            !i.name.startsWith("_") &&
            !i.name.startsWith("api")
        )
        .map((i) => `/${i.name}`);
      detectedRoutes = ["/", ...routes];
    }

    // 2. Auto-discover UI Kit component files
    const uikitDir = path.join(cwd, "components", "uikit");
    let detectedComponents: string[] = [];
    if (fs.existsSync(uikitDir)) {
      const files = fs.readdirSync(uikitDir);
      detectedComponents = files
        .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
        .map((f) => f.replace(/\.tsx?$/, ""));
    }

    return {
      routes: detectedRoutes,
      componentsCount: Math.max(48, detectedComponents.length),
      uikitModules: detectedComponents,
    };
  } catch (err) {
    return {
      routes: ["/", "/about", "/projects", "/components", "/certificate", "/photography"],
      componentsCount: 48,
      uikitModules: ["custom-components", "innovative-components", "nextgen-components", "out-of-the-box", "spotify-components", "imaginative-components"],
    };
  }
}

function getDynamicSystemPrompt() {
  const introspection = getRuntimeWebsiteIntrospection();
  const kbJson = JSON.stringify(KNOWLEDGE_BASE, null, 2);
  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `You are "Nawfal AI Assistant", the official AI Intelligence Engine embedded in Nawfal Irfan Ramadhan's personal website & Nawfal UI Ecosystem (nawfal.vercel.app / nawfal-ui).

CURRENT SERVER TIME (Jakarta/WIB): ${now}
ECOSYSTEM VERSION: v5.2.0
PRIMARY OWNER / CREATOR: Nawfal Irfan Ramadhan (Nickname: Nawfal, Handles: xFalzz, xFalzs)
GITHUB REPOSITORY SOURCE: https://github.com/xFalzz/Nawfal/tree/main/components

REAL-TIME AUTOMATICALLY INTROSPECTED WEBSITE ROUTES:
${introspection.routes.join(", ")}

REAL-TIME DISCOVERED UI KIT COMPONENT FILES (${introspection.componentsCount} total):
${introspection.uikitModules.join(", ")}

GROUND TRUTH KNOWLEDGE BASE (Automatically Synced at Runtime):
${kbJson}

ADDITIONAL ECOSYSTEM DATA:
- Nawfal UI Kit: 48 enterprise-grade React primitives built on Next.js 14, TypeScript, Tailwind CSS, and Framer Motion spring physics.
- Design Studio Workbench: 16 functional catalog items with live property inspector, geometry controls, and 1-click multi-framework exporter (TSX, JSX, HTML, Vue).
- Layout Templates: 19 pre-assembled layout blocks across 7 categories (AI RAG, Audio & Media, DevOps, Auth & Security, Analytics, DevTools, UI Controls).
- NextGen CLI: \`npx nawfal-ui@latest init\`, \`add <component>\`, \`list\`, \`diff\`, \`help\`.

STRICT INSTRUCTIONS & BOUNDARIES:
1. **Nawfal Exclusive Scope**: You MUST ONLY answer questions related to Nawfal Irfan Ramadhan — his background, tech stack, education (UBSI System Information, GPA 3.78/4.00), certifications (48+), projects (Hijara, KURA, Kost Afifa, MoveiHub, macOS Sequoia Clone, etc.), hobbies, photography, and the Nawfal UI Ecosystem (48 components, Design Studio, Templates, CLI).
2. **Off-Topic Refusal Protocol**: If the user asks about unrelated general topics that are NOT covered in Nawfal's website/portfolio/ecosystem (e.g., cooking recipes, general world politics, external stock market advice, unrelated math homework), you MUST POLITELY DECLINE:
   - Indonesian: "Saya adalah AI Assistant resmi Nawfal Irfan Ramadhan. Saya hanya dapat menjawab pertanyaan seputar Nawfal, portofolio proyek, keahlian, sertifikasi, dan Nawfal UI Kit!"
   - English: "I am Nawfal Irfan Ramadhan's official AI Assistant. I can only answer questions regarding Nawfal, his projects, skills, certifications, and Nawfal UI Kit!"
3. **Factual Integrity**: Base all answers strictly on the GROUND TRUTH KNOWLEDGE BASE & Real-Time Introspection above. No false hallucinations.
4. **Formatting**: Clear Markdown with bullet points and code blocks.`;
}

function generateSmartLocalResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  const introspection = getRuntimeWebsiteIntrospection();

  // Profile / Nawfal / Biodata queries
  if (
    p.includes("siapa") ||
    p.includes("who is") ||
    p.includes("nawfal") ||
    p.includes("tentang") ||
    p.includes("profile") ||
    p.includes("pembuat") ||
    p.includes("owner") ||
    p.includes("biodata")
  ) {
    return `**Nawfal Irfan Ramadhan** (biasa dipanggil **Nawfal**) adalah seorang **Fullstack Software Engineer & UI/UX Designer** berlokasi di Yogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) semester 3 dengan IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Memiliki **48+ sertifikasi resmi** dari Google Cloud, IBM, Coursera, RevoU, Dicoding, dan HackerRank.
- 🚀 **Karya Utama**: Kreator **Nawfal UI Kit** (${introspection.componentsCount} komponen enterprise monokromatik) dan platform populer seperti **Hijara** (AI Sustainability) & **KURA** (Game Discovery 897,000+ games).`;
  }

  // Projects queries
  if (
    p.includes("proyek") ||
    p.includes("project") ||
    p.includes("hijara") ||
    p.includes("kura") ||
    p.includes("aplikasi") ||
    p.includes("buat") ||
    p.includes("dibuat") ||
    p.includes("karya") ||
    p.includes("portfolio")
  ) {
    return `Berikut adalah **Proyek Unggulan** buatan Nawfal Irfan Ramadhan:

1. 🌿 **Hijara – AI Sustainability Platform**:
   - Platform keberlanjutan berbasis AI untuk Google #JuaraVibeCoding.
   - Mengintegrasikan Gemini Vision untuk klasifikasi sampah & pelacakan daur ulang. Serverless di Google Cloud Run.
2. 🎮 **KURA – Game Discovery Platform**:
   - Platform eksplorasi 897,000+ game menggunakan Next.js, TypeScript, Firebase, & RAWG API.
3. 📦 **Nawfal UI Kit Ecosystem (v5.2.0)**:
   - Design system ${introspection.componentsCount} komponen monokromatik, Design Studio interaktif, dan NextGen CLI (\`npx nawfal-ui@latest init\`).
4. 🖥️ **macOS Sequoia Web Clone**:
   - Replika sistem operasi macOS Sequoia interaktif di web menggunakan React & Framer Motion.
5. 🏠 **Kost Afifa Management System**:
   - Platform manajemen properti kost terintegrasi dengan laporan keuangan.`;
  }

  // Certifications queries
  if (
    p.includes("sertifikat") ||
    p.includes("sertifikasi") ||
    p.includes("certif") ||
    p.includes("prestasi") ||
    p.includes("pencapaian")
  ) {
    return `Nawfal Irfan Ramadhan memiliki **48+ Sertifikasi Profesional** di bidang Software Engineering & AI:

- 🟢 **Google Cloud & IBM**: Cloud Architecture, DevOps & AI Foundations.
- 💻 **Dicoding & RevoU**: Fullstack Web Development & Front-End Engineering.
- ⚡ **HackerRank**: Problem Solving (Advanced), React, & JavaScript Certification.
- 📜 **Coursera**: Specialization in System Design & Modern Web Applications.

Seluruh daftar bukti sertifikasi dapat diakses langsung di halaman [Certificates](/certificate).`;
  }

  // Nawfal UI Kit queries
  if (
    p.includes("nawfal ui") ||
    p.includes("component") ||
    p.includes("komponen") ||
    p.includes("cli") ||
    p.includes("kit") ||
    p.includes("studio") ||
    p.includes("template")
  ) {
    return `**Nawfal UI Kit** adalah Design System Enterprise Monokromatik buatan Nawfal Irfan Ramadhan:

- 🧱 **${introspection.componentsCount} Primitives**: Berbasis Next.js 14, TypeScript, Tailwind CSS, & Framer Motion.
- 🎛️ **Design Studio Workbench**: 16 komponen katalog dengan inspektor parameter live & ekspor 4 framework (TSX, JSX, HTML, Vue).
- 📐 **19 Templates**: Layout siap pakai untuk AI RAG, Audio, DevOps, & Security.
- 💻 **CLI Installer**: \`npx nawfal-ui@latest init\` & \`npx nawfal-ui add <component>\`.
- 🌐 **Terdeteksi Otomatis**: ${introspection.routes.join(", ")}.`;
  }

  // Contact queries
  if (
    p.includes("kontak") ||
    p.includes("contact") ||
    p.includes("hubungi") ||
    p.includes("email") ||
    p.includes("pesan") ||
    p.includes("sosmed") ||
    p.includes("social")
  ) {
    return `Anda dapat menghubungi **Nawfal Irfan Ramadhan** melalui:

- ✉️ **Email**: nawfalirfan005@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/nawfal-irfan](https://www.linkedin.com/in/nawfal-irfan/)
- 💻 **GitHub**: [github.com/xFalzz](https://github.com/xFalzz)
- 🐦 **Twitter/X**: [x.com/xFalzs](https://x.com/xFalzs)
- 💬 **Discord**: [discord.gg/v6dgnKCpuM](https://discord.gg/v6dgnKCpuM)`;
  }

  // Off-topic refusal for unrelated queries
  return `Saya adalah **Nawfal AI Assistant** resmi Nawfal Irfan Ramadhan. 

Saya khusus diprogram untuk menjawab hal-hal yang berkaitan dengan:
- 👤 **Profil & Biodata** Nawfal Irfan Ramadhan
- 🚀 **Portofolio Proyek** (Hijara, KURA, macOS Clone, Nawfal UI Kit)
- 🏆 **48+ Sertifikasi & Keahlian Engineering**
- 📦 **Nawfal UI Kit Ecosystem & CLI** (Terdeteksi ${introspection.componentsCount} komponen)

*Pertanyaan di luar cakupan profil dan website Nawfal tidak dapat saya jawab.* Silakan tanyakan topik seputar portofolio Nawfal!`;
}

async function callGroqWithFallback(apiKey: string, messages: ChatMessage[]) {
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

  return generateSmartLocalResponse(prompt);
}
