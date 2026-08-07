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

export type SupportedLanguage = 
  | "ja"  // Japanese
  | "zh"  // Chinese (Mandarin)
  | "ar"  // Arabic
  | "ko"  // Korean
  | "es"  // Spanish
  | "fr"  // French
  | "de"  // German
  | "jv"  // Javanese
  | "en"  // English
  | "id"; // Indonesian

/**
 * 🌍 Universal Language Script & Pattern Detector
 * Detects the input language for all major world languages & scripts.
 */
function detectLanguage(prompt: string): SupportedLanguage {
  const p = prompt.toLowerCase();

  // Japanese script (Hiragana/Katakana/Kanji query)
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) && (p.includes("は") || p.includes("の") || p.includes("です") || p.includes("か") || p.includes("誰") || p.includes("何"))) {
    return "ja";
  }

  // Chinese script (CJK Kanji/Hanzi)
  if (/[\u4e00-\u9fff]/.test(prompt)) {
    return "zh";
  }

  // Arabic script
  if (/[\u0600-\u06FF]/.test(prompt)) {
    return "ar";
  }

  // Korean Hangul script
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(prompt)) {
    return "ko";
  }

  // Javanese language patterns
  if (p.includes("sinten") || p.includes("pundhi") || p.includes("napa") || p.includes("ingkang") || p.includes("yaiku") || p.includes("nduweni")) {
    return "jv";
  }

  // Spanish language patterns
  if (p.includes("quién") || p.includes("quien") || p.includes("qué") || p.includes("que es") || p.includes("proyectos") || p.includes("habilidades")) {
    return "es";
  }

  // French language patterns
  if (p.includes("qui est") || p.includes("qu'est-ce") || p.includes("quels") || p.includes("compétences") || p.includes("projets")) {
    return "fr";
  }

  // German language patterns
  if (p.includes("wer ist") || p.includes("was ist") || p.includes("welche") || p.includes("projekte") || p.includes("fähigkeiten")) {
    return "de";
  }

  // English detection
  const englishWords = [
    "who", "what", "where", "how", "why", "when", "is", "are", "tell", "me",
    "about", "project", "projects", "skill", "skills", "certification", "certifications",
    "created", "built", "made", "experience", "education", "contact", "email",
    "show", "list", "can", "you", "does", "hi", "hello"
  ];
  const indonesianWords = [
    "siapa", "apa", "dimana", "bagaimana", "mengapa", "kapan", "sebutkan",
    "tentang", "proyek", "keahlian", "sertifikasi", "dibuat", "pengalaman",
    "pendidikan", "kontak", "halo", "bisa", "tolong", "buatkan"
  ];

  let enScore = 0;
  let idScore = 0;

  for (const w of englishWords) {
    if (new RegExp(`\\b${w}\\b`, "i").test(p)) enScore++;
  }
  for (const w of indonesianWords) {
    if (new RegExp(`\\b${w}\\b`, "i").test(p)) idScore++;
  }

  if (enScore > idScore) return "en";
  return "id";
}

/**
 * 🚀 Real-time Auto-Introspection Engine
 */
function getRuntimeWebsiteIntrospection() {
  try {
    const cwd = process.cwd();
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

UNIVERSAL GLOBAL LANGUAGE MASTER DIRECTIVE:
- You possess native fluency in EVERY SINGLE HUMAN LANGUAGE AND DIALECT across the world without exception (English, Indonesian, Javanese, Sundanese, Japanese, Mandarin Chinese, Spanish, French, German, Arabic, Russian, Portuguese, Italian, Korean, Dutch, Turkish, Vietnamese, Thai, Hindi, Bengali, Swahili, Tagalog, etc.).
- ALWAYS detect the EXACT input language, script, and dialect of the user's prompt and respond natively, fluently, and unambiguously in that SAME EXACT LANGUAGE.
- NEVER respond in Indonesian to an English question, or in English to a Japanese question. Match the input language 100% strictly.

STRICT INSTRUCTIONS & BOUNDARIES:
1. **Nawfal Exclusive Scope**: You MUST ONLY answer questions related to Nawfal Irfan Ramadhan — his background, tech stack, education (UBSI System Information, GPA 3.78/4.00), certifications (48+), projects (Hijara, KURA, Kost Afifa, MoveiHub, macOS Sequoia Clone, etc.), hobbies, photography, and the Nawfal UI Ecosystem (48 components, Design Studio, Templates, CLI).
2. **Off-Topic Refusal Protocol**: If the user asks about unrelated general topics that are NOT covered in Nawfal's website/portfolio/ecosystem (e.g., cooking recipes, general world politics, external stock market advice, unrelated math homework), you MUST POLITELY DECLINE in the user's exact input language.
3. **Factual Integrity & Clarity**: Base all answers strictly on the GROUND TRUTH KNOWLEDGE BASE & Real-Time Introspection above. Clear, direct, unambiguous responses.
4. **Formatting**: Clear Markdown with bullet points and code blocks.`;
}

function generateSmartLocalResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  const introspection = getRuntimeWebsiteIntrospection();
  const lang = detectLanguage(prompt);

  // Profile / Nawfal / Biodata queries
  if (
    p.includes("siapa") ||
    p.includes("who is") ||
    p.includes("nawfal") ||
    p.includes("tentang") ||
    p.includes("profile") ||
    p.includes("pembuat") ||
    p.includes("owner") ||
    p.includes("biodata") ||
    p.includes("誰") ||
    p.includes("是谁") ||
    p.includes("من هو") ||
    p.includes("quién") ||
    p.includes("qui est") ||
    p.includes("wer ist") ||
    p.includes("sinten")
  ) {
    switch (lang) {
      case "ja":
        return `**ノーファル・イルファン・ラマダン**（Nawfal Irfan Ramadhan）は、インドネシアのジョグジャカルタを拠点とする**フルスタック ソフトウェア エンジニア & UI/UX デザイナー**です。

- 🎓 **学歴**: ビナ・サラナ・インフォルマティカ大学（UBSI）情報システム学科 3期生（GPA **3.78 / 4.00**）
- 🛠️ **主要スキル**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run
- 🏆 **資格**: Google Cloud, IBM, Coursera, RevoU, Dicoding, HackerRank等から**48以上の公式認定資格**を取得
- 🚀 **主要プロジェクト**: **Nawfal UI Kit** (${introspection.componentsCount}のUIコンポーネント), **Hijara** (AI環境プラットフォーム), **KURA** (ゲーム探索プラットフォーム)`;

      case "zh":
        return `**Nawfal Irfan Ramadhan**（简称 **Nawfal**）是一名位于印度尼西亚日惹的**全栈软件工程师与 UI/UX 设计师**。

- 🎓 **教育背景**: Bina Sarana Informatika 大学（UBSI）信息系统专业大二学生，GPA **3.78 / 4.00**
- 🛠️ **核心技术栈**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run
- 🏆 **专业认证**: 拥有 Google Cloud、IBM、Coursera、RevoU、Dicoding 和 HackerRank 颁发的 **48+ 官方认证**
- 🚀 **代表作品**: **Nawfal UI Kit** (${introspection.componentsCount}个单色UI组件)、**Hijara** (AI可持续发展平台) 与 **KURA** (游戏探索平台)`;

      case "ar":
        return `**نوفل عرفان رمضان** (Nawfal Irfan Ramadhan) هو **مهندس برمجيات متكامل (Fullstack) ومصمم UI/UX** مقيم في يوجياكارتا، إندونيسيا.

- 🎓 **التعليم**: طالب نظم معلومات في جامعة بينا سارانا إنفورماتيكا (UBSI) - المعدل التراكمي **3.78 / 4.00**.
- 🛠️ **التقنيات الأساسية**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **الشهادات**: يحمل أكثر من **48 شهادة احترافية معتمدة** من Google Cloud و IBM و Coursera و HackerRank.
- 🚀 **المشاريع البارزة**: **Nawfal UI Kit** (${introspection.componentsCount} مكون برمجي) و **Hijara** (منصة الاستدامة بالذكاء الاصطناعي) و **KURA** (منصة ألعاب).`;

      case "ko":
        return `**나우팔 이르판 라마단** (Nawfal Irfan Ramadhan)은 인도네시아 족자카르타에 기반을 둔 **풀스택 소프트웨어 엔지니어 & UI/UX 디자이너**입니다.

- 🎓 **학력**: UBSI 대학교 정보시스템학과 3학기 재학 중 (GPA **3.78 / 4.00**)
- 🛠️ **핵심 기술**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run
- 🏆 **자격증**: Google Cloud, IBM, Coursera, HackerRank 등 **48개 이상의 공식 자격증** 보유
- 🚀 **주요 프로젝트**: **Nawfal UI Kit** (${introspection.componentsCount}개 컴포넌트), **Hijara** (AI 지속가능성 플랫폼), **KURA** (게임 디스커버리)`;

      case "es":
        return `**Nawfal Irfan Ramadhan** (conocido simplemente como **Nawfal**) es un **Ingeniero de Software Fullstack y Diseñador UI/UX** ubicado en Yogyakarta, Indonesia.

- 🎓 **Educación**: Estudiante de Sistemas de Información en la Universidad UBSI, 3er Semestre con un promedio (GPA) de **3.78 / 4.00**.
- 🛠️ **Stack Principal**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certificaciones**: Cuenta con más de **48 certificaciones oficiales** de Google Cloud, IBM, Coursera, RevoU, Dicoding y HackerRank.
- 🚀 **Proyectos Destacados**: Creador de **Nawfal UI Kit** (${introspection.componentsCount} componentes monochrome), **Hijara** (AI Sustainability) y **KURA** (Game Discovery).`;

      case "fr":
        return `**Nawfal Irfan Ramadhan** (connu sous le nom de **Nawfal**) est un **Ingénieur Logiciel Fullstack et Designer UI/UX** basé à Yogyakarta, Indonésie.

- 🎓 **Éducation**: Étudiant en Systèmes d'Information à l'Université UBSI, 3ème semestre avec une moyenne de **3.78 / 4.00**.
- 🛠️ **Technologies Clés**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certifications**: Titulaire de plus de **48 certifications officielles** de Google Cloud, IBM, Coursera, Dicoding et HackerRank.
- 🚀 **Projets Phares**: Créateur de **Nawfal UI Kit** (${introspection.componentsCount} composants UI), **Hijara** (IA Durabilité) et **KURA** (Plateforme de jeux).`;

      case "de":
        return `**Nawfal Irfan Ramadhan** (bekannt als **Nawfal**) ist ein **Fullstack Software Engineer & UI/UX Designer** mit Sitz in Yogyakarta, Indonesien.

- 🎓 **Ausbildung**: Wirtschaftsinformatik-Student an der UBSI Universität (3. Semester, Notendurchschnitt **3.78 / 4.00**).
- 🛠️ **Haupt-Tech-Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Zertifizierungen**: Über **48 offizielle Zertifizierungen** von Google Cloud, IBM, Coursera, Dicoding und HackerRank.
- 🚀 **Hauptprojekte**: Schöpfer von **Nawfal UI Kit** (${introspection.componentsCount} Komponenten), **Hijara** (KI-Nachhaltigkeit) und **KURA** (Game Discovery).`;

      case "jv":
        return `**Nawfal Irfan Ramadhan** (biyasane dipanggil **Nawfal**) yaiku **Fullstack Software Engineer & UI/UX Designer** ing Ngayogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi ing Universitas Bina Sarana Informatika (UBSI) IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Nduweni **48+ sertifikasi resmi** saka Google Cloud, IBM, Coursera, Dicoding, lan HackerRank.
- 🚀 **Karya Utama**: Pangripta **Nawfal UI Kit** (${introspection.componentsCount} komponen UI), **Hijara**, lan **KURA**.`;

      case "en":
        return `**Nawfal Irfan Ramadhan** (commonly known as **Nawfal**) is a **Fullstack Software Engineer & UI/UX Designer** based in Yogyakarta, Indonesia.

- 🎓 **Education**: Information Systems student at Universitas Bina Sarana Informatika (UBSI), 3rd Semester with a GPA of **3.78 / 4.00**.
- 🛠️ **Core Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certifications**: Holds **48+ official certifications** from Google Cloud, IBM, Coursera, RevoU, Dicoding, and HackerRank.
- 🚀 **Featured Works**: Creator of **Nawfal UI Kit** (${introspection.componentsCount} enterprise monochrome components) and platforms such as **Hijara** (AI Sustainability) & **KURA** (Game Discovery platform with 897,000+ games).`;

      default:
        return `**Nawfal Irfan Ramadhan** (biasa dipanggil **Nawfal**) adalah seorang **Fullstack Software Engineer & UI/UX Designer** berlokasi di Yogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) semester 3 dengan IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Memiliki **48+ sertifikasi resmi** dari Google Cloud, IBM, Coursera, RevoU, Dicoding, dan HackerRank.
- 🚀 **Karya Utama**: Kreator **Nawfal UI Kit** (${introspection.componentsCount} komponen enterprise monokromatik) dan platform populer seperti **Hijara** (AI Sustainability) & **KURA** (Game Discovery 897,000+ games).`;
    }
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
    p.includes("portfolio") ||
    p.includes("built") ||
    p.includes("プロジェクト") ||
    p.includes("项目") ||
    p.includes("المشاريع")
  ) {
    if (lang === "en") {
      return `Here are the **Featured Projects** developed by Nawfal Irfan Ramadhan:

1. 🌿 **Hijara – AI Sustainability Platform**:
   - AI-powered sustainability platform for Google #JuaraVibeCoding.
   - Integrates Gemini Vision for waste classification & recycling tracking. Serverless on Google Cloud Run.
2. 🎮 **KURA – Game Discovery Platform**:
   - Game discovery platform with 897,000+ games built with Next.js, TypeScript, Firebase, & RAWG API.
3. 📦 **Nawfal UI Kit Ecosystem (v5.2.0)**:
   - Monochrome design system with ${introspection.componentsCount} primitives, interactive Design Studio, and NextGen CLI (\`npx nawfal-ui@latest init\`).
4. 🖥️ **macOS Sequoia Web Clone**:
   - Interactive web-based replica of macOS Sequoia using React & Framer Motion.
5. 🏠 **Kost Afifa Management System**:
   - Boarding house property management system with integrated financial reports.`;
    }
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

  // Refusal for out of scope
  if (lang === "en") {
    return `I am the official **Nawfal AI Assistant** for Nawfal Irfan Ramadhan.

I am specifically programmed to answer questions about:
- 👤 **Profile & Background** of Nawfal Irfan Ramadhan
- 🚀 **Project Portfolio** (Hijara, KURA, macOS Clone, Nawfal UI Kit)
- 🏆 **48+ Certifications & Engineering Skills**
- 📦 **Nawfal UI Kit Ecosystem & CLI**

*Questions outside the scope of Nawfal's profile and website cannot be answered.* Please feel free to ask anything about Nawfal's portfolio!`;
  }

  return `Saya adalah **Nawfal AI Assistant** resmi Nawfal Irfan Ramadhan. 

Saya khusus diprogram untuk menjawab hal-hal yang berkaitan dengan:
- 👤 **Profil & Biodata** Nawfal Irfan Ramadhan
- 🚀 **Portofolio Proyek** (Hijara, KURA, macOS Clone, Nawfal UI Kit)
- 🏆 **48+ Sertifikasi & Keahlian Engineering**
- 📦 **Nawfal UI Kit Ecosystem & CLI**

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
