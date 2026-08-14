"use server";

import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import { KNOWLEDGE_BASE } from "@/lib/knowledge";
import { checkRateLimit } from "@/lib/rate-limit";

type Role = "user" | "model";

interface ChatMessagePart {
  text: string;
}

interface ChatMessage {
  role: Role;
  parts: ChatMessagePart[];
}

interface HistoryEntry {
  role: string;
  parts: { text: string }[];
}

export type SupportedLanguage = 
  | "ja"  // Japanese
  | "zh"  // Chinese
  | "ar"  // Arabic
  | "ko"  // Korean
  | "ru"  // Russian
  | "hi"  // Hindi
  | "th"  // Thai
  | "es"  // Spanish
  | "fr"  // French
  | "de"  // German
  | "it"  // Italian
  | "pt"  // Portuguese
  | "nl"  // Dutch
  | "tr"  // Turkish
  | "vi"  // Vietnamese
  | "jv"  // Javanese
  | "su"  // Sundanese
  | "en"  // English
  | "id"; // Indonesian

interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
}

/**
 * 🌍 Universal Language Script & Pattern Detector
 * Detects the input language across all major world languages and scripts.
 */
function detectLanguageInfo(prompt: string): LanguageInfo {
  const p = prompt.toLowerCase();

  // 1. Japanese (Hiragana / Katakana / Kanji context)
  if (/[\u3040-\u30ff]/.test(prompt) || (/[\u3400-\u4dbf\u4e00-\u9fff]/.test(prompt) && (p.includes("は") || p.includes("の") || p.includes("です") || p.includes("か") || p.includes("誰") || p.includes("何")))) {
    return { code: "ja", name: "Japanese (日本語)" };
  }

  // 2. Chinese (Hanzi)
  if (/[\u4e00-\u9fff]/.test(prompt)) {
    return { code: "zh", name: "Chinese (中文)" };
  }

  // 3. Arabic Script
  if (/[\u0600-\u06FF]/.test(prompt)) {
    return { code: "ar", name: "Arabic (العربية)" };
  }

  // 4. Korean (Hangul)
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(prompt)) {
    return { code: "ko", name: "Korean (한국어)" };
  }

  // 5. Cyrillic Script (Russian/Ukrainian/Bulgarian)
  if (/[\u0400-\u04FF]/.test(prompt)) {
    return { code: "ru", name: "Russian (Русский)" };
  }

  // 6. Devanagari Script (Hindi)
  if (/[\u0900-\u097F]/.test(prompt)) {
    return { code: "hi", name: "Hindi (हिन्दी)" };
  }

  // 7. Thai Script
  if (/[\u0E00-\u0E7F]/.test(prompt)) {
    return { code: "th", name: "Thai (ไทย)" };
  }

  // 8. Vietnamese (Specific Latin diacritics)
  if (p.includes("người") || p.includes("là ai") || p.includes("là gì") || p.includes("nào") || p.includes("của") || p.includes("dự án")) {
    return { code: "vi", name: "Vietnamese (Tiếng Việt)" };
  }

  // 9. Javanese Language
  if (p.includes("sinten") || p.includes("pundhi") || p.includes("napa") || p.includes("ingkang") || p.includes("yaiku") || p.includes("nduweni")) {
    return { code: "jv", name: "Javanese (Basa Jawa)" };
  }

  // 10. Sundanese Language
  if (p.includes("saha") || p.includes("naon") || p.includes("dimana") || p.includes("kumaha") || p.includes("anjeun")) {
    return { code: "su", name: "Sundanese (Basa Sunda)" };
  }

  // 11. Spanish
  if (p.includes("quién") || p.includes("quien") || p.includes("qué") || p.includes("que es") || p.includes("proyectos") || p.includes("habilidades")) {
    return { code: "es", name: "Spanish (Español)" };
  }

  // 12. French
  if (p.includes("qui est") || p.includes("qu'est-ce") || p.includes("quels") || p.includes("compétences") || p.includes("projets")) {
    return { code: "fr", name: "French (Français)" };
  }

  // 13. German
  if (p.includes("wer ist") || p.includes("was ist") || p.includes("welche") || p.includes("projekte") || p.includes("fähigkeiten")) {
    return { code: "de", name: "German (Deutsch)" };
  }

  // 14. Italian
  if (p.includes("chi è") || p.includes("chi e") || p.includes("cosa") || p.includes("progetti") || p.includes("competenze")) {
    return { code: "it", name: "Italian (Italiano)" };
  }

  // 15. Portuguese
  if (p.includes("quem é") || p.includes("quem e") || p.includes("quais") || p.includes("projetos") || p.includes("habilidades")) {
    return { code: "pt", name: "Portuguese (Português)" };
  }

  // 16. Dutch
  if (p.includes("wie is") || p.includes("wat is") || p.includes("welke") || p.includes("projecten") || p.includes("vaardigheden")) {
    return { code: "nl", name: "Dutch (Nederlands)" };
  }

  // 17. Turkish
  if (p.includes("kimdir") || p.includes("nedir") || p.includes("projeleri") || p.includes("yetenekleri")) {
    return { code: "tr", name: "Turkish (Türkçe)" };
  }

  // 18. English vs Indonesian Scoring
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

  if (enScore > idScore) return { code: "en", name: "English" };
  return { code: "id", name: "Indonesian (Bahasa Indonesia)" };
}

/**
 * 🚀 Real-time Autonomous Workspace & Web Introspection Engine
 * Automatically scans workspace files, package manifest, App Router routes,
 * and UI component primitives dynamically on EVERY request so the AI
 * continuously self-adapts without any manual training or code updates.
 */
function getAutonomousRealtimeContext() {
  try {
    const cwd = process.cwd();

    // 1. Read package manifest dynamically
    let pkgInfo: any = {};
    const pkgPath = path.join(cwd, "package.json");
    if (fs.existsSync(pkgPath)) {
      pkgInfo = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    }

    // 2. Discover App Router pages recursively
    const appDir = path.join(cwd, "app");
    let detectedRoutes: string[] = ["/"];
    if (fs.existsSync(appDir)) {
      const scanRoutes = (dir: string, prefix = "") => {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          if (item.isDirectory() && !item.name.startsWith("(") && !item.name.startsWith("_") && !item.name.startsWith("api")) {
            const routePath = `${prefix}/${item.name}`;
            detectedRoutes.push(routePath);
            scanRoutes(path.join(dir, item.name), routePath);
          }
        }
      };
      scanRoutes(appDir);
    }

    // 3. Discover UI Kit components dynamically
    const uikitDir = path.join(cwd, "components", "uikit");
    let detectedComponents: string[] = [];
    if (fs.existsSync(uikitDir)) {
      const files = fs.readdirSync(uikitDir);
      detectedComponents = files
        .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
        .map((f) => f.replace(/\.tsx?$/, ""));
    }

    return {
      version: pkgInfo.version || "5.2.0",
      dependenciesCount: Object.keys(pkgInfo.dependencies || {}).length,
      routes: Array.from(new Set(detectedRoutes)),
      componentsCount: Math.max(48, detectedComponents.length),
      uikitModules: detectedComponents,
    };
  } catch (err) {
    return {
      version: "5.2.0",
      dependenciesCount: 30,
      routes: ["/", "/about", "/projects", "/components", "/certificate", "/photography"],
      componentsCount: 48,
      uikitModules: ["custom-components", "innovative-components", "nextgen-components", "out-of-the-box", "spotify-components", "imaginative-components"],
    };
  }
}

function getDynamicSystemPrompt(userPrompt: string) {
  const langInfo = detectLanguageInfo(userPrompt);
  const autoCtx = getAutonomousRealtimeContext();
  const kbJson = JSON.stringify(KNOWLEDGE_BASE, null, 2);
  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `You are "Nawfal AI Assistant", an executive-grade, hyper-intelligent, and autonomous AI Intelligence Engine powered by Google Gemini 3.1 Flash Lite. You are embedded in Nawfal Irfan Ramadhan's personal website & Nawfal UI Ecosystem (nawfal.vercel.app / nawfal-ui).

********************************************************************************
UNIVERSAL GLOBAL LANGUAGE MASTER DIRECTIVE:
The user's prompt is written in: ${langInfo.name}.
CRITICAL MANDATORY INSTRUCTION: You MUST formulate 100% of your response in ${langInfo.name}.
- DO NOT USE INDONESIAN OR ENGLISH UNLESS THE USER'S PROMPT WAS WRITTEN IN INDONESIAN OR ENGLISH!
- Translate all knowledge facts from the knowledge base below fluently into ${langInfo.name}.
- Every single sentence, bullet point, and header MUST be strictly in ${langInfo.name}.
********************************************************************************

CURRENT AUTONOMOUS SERVER STATE (Real-time WIB): ${now}
ECOSYSTEM VERSION (Auto-detected from package.json): v${autoCtx.version}
ACTIVE DEPENDENCIES COUNT: ${autoCtx.dependenciesCount}
AI ENGINE CORE: Google Gemini 3.1 Flash Lite
PRIMARY OWNER / CREATOR: Nawfal Irfan Ramadhan (Nickname: Nawfal, Handles: xFalzz, xFalzs)
GITHUB REPOSITORY SOURCE: https://github.com/xFalzz/Nawfal/tree/main/components

REAL-TIME AUTONOMOUSLY INTROSPECTED WEBSITE ROUTES:
${autoCtx.routes.join(", ")}

REAL-TIME AUTONOMOUSLY DISCOVERED UI KIT COMPONENT FILES (${autoCtx.componentsCount} total primitives):
${autoCtx.uikitModules.join(", ")}

GROUND TRUTH KNOWLEDGE BASE (Automatically Synced at Runtime):
${kbJson}

ADDITIONAL ECOSYSTEM DATA:
- Nawfal UI Kit: 48 enterprise-grade React primitives built on Next.js 14, TypeScript, Tailwind CSS, and Framer Motion spring physics.
- Design Studio Workbench: 16 functional catalog items with live property inspector, geometry controls, and 1-click multi-framework exporter (TSX, JSX, HTML, Vue).
- Layout Templates: 19 pre-assembled layout blocks across 7 categories (AI RAG, Audio & Media, DevOps, Auth & Security, Analytics, DevTools, UI Controls).
- NextGen CLI: \`npx nawfal-ui@latest init\`, \`add <component>\`, \`list\`, \`diff\`, \`help\`.

EXECUTIVE PROFESSIONAL TONE & STRICT BOUNDARIES:
1. **Professional & Executive Manner**: Deliver clear, structured, articulate, and impressive responses. Use well-organized Markdown lists, bold emphasis, and precise formatting.
2. **Nawfal Exclusive Scope**: You MUST ONLY answer questions related to Nawfal Irfan Ramadhan — his background, tech stack, education (UBSI System Information, GPA 3.78/4.00), certifications (48+), projects (Hijara, KURA, Kost Afifa, MoveiHub, macOS Sequoia Clone, etc.), hobbies, photography, and the Nawfal UI Ecosystem (48 components, Design Studio, Templates, CLI).
3. **Off-Topic Refusal Protocol**: If the user asks about unrelated general topics that are NOT covered in Nawfal's website/portfolio/ecosystem (e.g., cooking recipes, general world politics, external stock market advice, unrelated math homework), you MUST POLITELY DECLINE in ${langInfo.name} with an executive tone.
4. **Factual Integrity & Zero Hallucinations**: Base all answers strictly on the GROUND TRUTH KNOWLEDGE BASE & Real-Time Introspection above.`;
}

function generateSmartLocalResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  const autoCtx = getAutonomousRealtimeContext();
  const lang = detectLanguageInfo(prompt).code;

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
    p.includes("sinten") ||
    p.includes("saha") ||
    p.includes("chi è") ||
    p.includes("quem é") ||
    p.includes("wie is") ||
    p.includes("kimdir") ||
    p.includes("кто") ||
    p.includes("कौन") ||
    p.includes("ใคร") ||
    p.includes("là ai")
  ) {
    switch (lang) {
      case "ja":
        return `**ノーファル・イルファン・ラマダン**（Nawfal Irfan Ramadhan）は、インドネシアのジョグジャカルタを拠点とする**フルスタック ソフトウェア エンジニア & UI/UX デザイナー**です。

- 🎓 **学歴**: ビナ・サラナ・インフォルマティカ大学（UBSI）情報システム学科 3期生（GPA **3.78 / 4.00**）
- 🛠️ **主要スキル**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run
- 🏆 **資格**: Google Cloud, IBM, Coursera, RevoU, Dicoding, HackerRank等から**48以上の公式認定資格**を取得
- 🚀 **主要プロジェクト**: **Nawfal UI Kit** (${autoCtx.componentsCount}のUIコンポーネント), **Hijara** (AI環境プラットフォーム), **KURA** (ゲーム探索プラットフォーム)`;

      case "zh":
        return `**Nawfal Irfan Ramadhan**（简称 **Nawfal**）是一名位于印度尼西亚日惹的**全栈软件工程师与 UI/UX 设计师**。

- 🎓 **教育背景**: Bina Sarana Informatika 大学（UBSI）信息系统专业大二学生，GPA **3.78 / 4.00**
- 🛠️ **核心技术栈**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run
- 🏆 **专业认证**: 拥有 Google Cloud、IBM、Coursera、RevoU、Dicoding 和 HackerRank 颁发的 **48+ 官方认证**
- 🚀 **代表作品**: **Nawfal UI Kit** (${autoCtx.componentsCount}个单色UI组件)、**Hijara** (AI可持续发展平台) 与 **KURA** (游戏探索平台)`;

      case "ar":
        return `**نوفل عرفان رمضان** (Nawfal Irfan Ramadhan) هو **مهندس برمجيات متكامل (Fullstack) ومصمم UI/UX** مقيم في يوجياكارتا، إندونيسيا.

- 🎓 **التعليم**: طالب نظم معلومات في جامعة بينا سارانا إنفورماتيكا (UBSI) - المعدل التراكمي **3.78 / 4.00**.
- 🛠️ **التقنيات الأساسية**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **الشهادات**: يحمل أكثر من **48 شهادة احترافية معتمدة** من Google Cloud و IBM و Coursera و HackerRank.
- 🚀 **المشاريع البارزة**: **Nawfal UI Kit** (${autoCtx.componentsCount} مكون برمجي) و **Hijara** (منصة الاستدامة بالذكاء الاصطناعي) و **KURA** (منصة ألعاب).`;

      case "ko":
        return `**나우팔 이르판 라마단** (Nawfal Irfan Ramadhan)은 인도네시아 족자카르타에 기반을 둔 **풀스택 소프트웨어 엔지니어 & UI/UX 디자이너**입니다.

- 🎓 **학력**: UBSI 대학교 정보시스템학과 3학기 재학 중 (GPA **3.78 / 4.00**)
- 🛠️ **핵심 기술**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run
- 🏆 **자격증**: Google Cloud, IBM, Coursera, HackerRank 등 **48개 이상의 공식 자격증** 보유
- 🚀 **주요 프로젝트**: **Nawfal UI Kit** (${autoCtx.componentsCount}개 컴포넌트), **Hijara** (AI 지속가능성 플랫폼), **KURA** (게임 디스커버리)`;

      case "ru":
        return `**Науфал Ирфан Рамадан** (Nawfal Irfan Ramadhan) — **Fullstack-разработчик и UI/UX-дизайнер** из Джокьякарты, Индонезия.

- 🎓 **Образование**: Студент специальности «Информационные системы» в Университете UBSI (3-й семестр, средний балл **3.78 / 4.00**).
- 🛠️ **Основной стек**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Сертификаты**: Более **48 официальных сертификатов** от Google Cloud, IBM, Coursera, Dicoding и HackerRank.
- 🚀 **Главные проекты**: **Nawfal UI Kit** (${autoCtx.componentsCount} UI-компонентов), **Hijara** (ИИ-платформа устойчивого развития) и **KURA** (платформа поиска игр).`;

      case "hi":
        return `**नौफल इरफान रमजान** (Nawfal Irfan Ramadhan) योग्याकार्ता, इंडोनेशिया में स्थित एक **फुलस्टैक सॉफ्टवेयर इंजीनियर और UI/UX डिजाइनर** हैं।

- 🎓 **शिक्षा**: UBSI विश्वविद्यालय में सूचना प्रणाली के छात्र (3री तिमाही, GPA **3.78 / 4.00**)।
- 🛠️ **मुख्य कौशल**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run।
- 🏆 **प्रमाणपत्र**: Google Cloud, IBM, Coursera, और HackerRank से **48+ आधिकारिक प्रमाणपत्र**।
- 🚀 **प्रमुख परियोजनाएं**: **Nawfal UI Kit** (${autoCtx.componentsCount} घटकों), **Hijara** (AI प्लेटफ़ॉर्म), और **KURA**।`;

      case "es":
        return `**Nawfal Irfan Ramadhan** (conocido simplemente como **Nawfal**) es un **Ingeniero de Software Fullstack y Diseñador UI/UX** ubicado en Yogyakarta, Indonesia.

- 🎓 **Educación**: Estudiante de Sistemas de Información en la Universidad UBSI, 3er Semestre con un promedio (GPA) de **3.78 / 4.00**.
- 🛠️ **Stack Principal**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certificaciones**: Cuenta con más de **48 certificaciones oficiales** de Google Cloud, IBM, Coursera, RevoU, Dicoding y HackerRank.
- 🚀 **Proyectos Destacados**: Creador de **Nawfal UI Kit** (${autoCtx.componentsCount} componentes monochrome), **Hijara** (AI Sustainability) y **KURA** (Game Discovery).`;

      case "fr":
        return `**Nawfal Irfan Ramadhan** (connu sous le nom de **Nawfal**) est un **Ingénieur Logiciel Fullstack et Designer UI/UX** basé à Yogyakarta, Indonésie.

- 🎓 **Éducation**: Étudiant en Systèmes d'Information à l'Université UBSI, 3ème semestre avec une moyenne de **3.78 / 4.00**.
- 🛠️ **Technologies Clés**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certifications**: Titulaire de plus de **48 certifications officielles** de Google Cloud, IBM, Coursera, Dicoding et HackerRank.
- 🚀 **Projets Phares**: Créateur de **Nawfal UI Kit** (${autoCtx.componentsCount} composants UI), **Hijara** (IA Durabilité) et **KURA** (Plateforme de jeux).`;

      case "de":
        return `**Nawfal Irfan Ramadhan** (bekannt als **Nawfal**) ist ein **Fullstack Software Engineer & UI/UX Designer** mit Sitz in Yogyakarta, Indonesien.

- 🎓 **Ausbildung**: Wirtschaftsinformatik-Student an der UBSI Universität (3. Semester, Notendurchschnitt **3.78 / 4.00**).
- 🛠️ **Haupt-Tech-Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Zertifizierungen**: Über **48 offizielle Zertifizierungen** von Google Cloud, IBM, Coursera, Dicoding und HackerRank.
- 🚀 **Hauptprojekte**: Schöpfer von **Nawfal UI Kit** (${autoCtx.componentsCount} Komponenten), **Hijara** (KI-Nachhaltigkeit) und **KURA** (Game Discovery).`;

      case "it":
        return `**Nawfal Irfan Ramadhan** (noto come **Nawfal**) è uno **Sviluppatore Software Fullstack & UI/UX Designer** con sede a Yogyakarta, Indonesia.

- 🎓 **Formazione**: Studente di Sistemi Informativi presso l'Università UBSI (GPA **3.78 / 4.00**).
- 🛠️ **Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certificazioni**: Oltre **48 certificazioni ufficiali** da Google Cloud, IBM, Coursera e HackerRank.
- 🚀 **Progetti Principali**: **Nawfal UI Kit** (${autoCtx.componentsCount} componenti UI), **Hijara** e **KURA**.`;

      case "pt":
        return `**Nawfal Irfan Ramadhan** (conhecido como **Nawfal**) é um **Engenheiro de Software Fullstack & UI/UX Designer** baseado em Yogyakarta, Indonésia.

- 🎓 **Educação**: Estudante de Sistemas de Informação na Universidade UBSI (GPA **3.78 / 4.00**).
- 🛠️ **Stack Principal**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certificações**: Possui mais de **48 certificações oficiais** do Google Cloud, IBM, Coursera e HackerRank.
- 🚀 **Projetos em Destaque**: **Nawfal UI Kit** (${autoCtx.componentsCount} componentes), **Hijara** e **KURA**.`;

      case "nl":
        return `**Nawfal Irfan Ramadhan** (bekend als **Nawfal**) is een **Fullstack Software Engineer & UI/UX Designer** gevestigd in Yogyakarta, Indonesië.

- 🎓 **Opleiding**: Student Informatiesystemen aan de UBSI Universiteit (GPA **3.78 / 4.00**).
- 🛠️ **Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certificeringen**: Meer dan **48 officiële certificaten** van Google Cloud, IBM, Coursera en HackerRank.
- 🚀 **Belangrijkste Projecten**: **Nawfal UI Kit** (${autoCtx.componentsCount} onderdelen), **Hijara** en **KURA**.`;

      case "tr":
        return `**Nawfal Irfan Ramadhan** (bilinen adıyla **Nawfal**), Yogyakarta, Endonezya merkezli bir **Fullstack Yazılım Mühendisi ve UI/UX Tasarımcısıdır**.

- 🎓 **Eğitim**: UBSI Üniversitesi Bilişim Sistemleri 3. Dönem Öğrencisi (GNO **3.78 / 4.00**).
- 🛠️ **Temel Teknolojiler**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikalar**: Google Cloud, IBM, Coursera ve HackerRank'ten **48'den fazla resmi sertifika**.
- 🚀 **Öne Çıkan Projeler**: **Nawfal UI Kit** (${autoCtx.componentsCount} UI bileşeni), **Hijara** ve **KURA**.`;

      case "vi":
        return `**Nawfal Irfan Ramadhan** (thường gọi là **Nawfal**) là một **Kỹ sư Phần mềm Fullstack & UI/UX Designer** sống tại Yogyakarta, Indonesia.

- 🎓 **Học vấn**: Sinh viên Hệ thống Thông tin tại Đại học UBSI (GPA **3.78 / 4.00**).
- 🛠️ **Công nghệ chính**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Chứng chỉ**: Hơn **48 chứng chỉ chính thức** từ Google Cloud, IBM, Coursera và HackerRank.
- 🚀 **Dự án nổi bật**: **Nawfal UI Kit** (${autoCtx.componentsCount} thành phần UI), **Hijara** và **KURA**.`;

      case "jv":
        return `**Nawfal Irfan Ramadhan** (biyasane dipanggil **Nawfal**) yaiku **Fullstack Software Engineer & UI/UX Designer** ing Ngayogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi ing Universitas Bina Sarana Informatika (UBSI) IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Nduweni **48+ sertifikasi resmi** saka Google Cloud, IBM, Coursera, Dicoding, lan HackerRank.
- 🚀 **Karya Utama**: Pangripta **Nawfal UI Kit** (${autoCtx.componentsCount} komponen UI), **Hijara**, lan **KURA**.`;

      case "su":
        return `**Nawfal Irfan Ramadhan** (biasa dipanggil **Nawfal**) nyaéta **Fullstack Software Engineer & UI/UX Designer** anu beralamat di Yogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Gaduh **48+ sertifikasi resmi** ti Google Cloud, IBM, Coursera, Dicoding, sareng HackerRank.
- 🚀 **Karya Utama**: Pencipta **Nawfal UI Kit** (${autoCtx.componentsCount} komponen UI), **Hijara**, sareng **KURA**.`;

      case "en":
        return `**Nawfal Irfan Ramadhan** (commonly known as **Nawfal**) is a **Fullstack Software Engineer & UI/UX Designer** based in Yogyakarta, Indonesia.

- 🎓 **Education**: Information Systems student at Universitas Bina Sarana Informatika (UBSI), 3rd Semester with a GPA of **3.78 / 4.00**.
- 🛠️ **Core Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Certifications**: Holds **48+ official certifications** from Google Cloud, IBM, Coursera, RevoU, Dicoding, and HackerRank.
- 🚀 **Featured Works**: Creator of **Nawfal UI Kit** (${autoCtx.componentsCount} enterprise monochrome components) and platforms such as **Hijara** (AI Sustainability) & **KURA** (Game Discovery platform with 897,000+ games).`;

      default:
        return `**Nawfal Irfan Ramadhan** (biasa dipanggil **Nawfal**) adalah seorang **Fullstack Software Engineer & UI/UX Designer** berlokasi di Yogyakarta, Indonesia.

- 🎓 **Pendidikan**: Mahasiswa Sistem Informasi di Universitas Bina Sarana Informatika (UBSI) semester 3 dengan IPK **3.78 / 4.00**.
- 🛠️ **Keahlian Utama**: Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Python, Firebase, Google Cloud Run.
- 🏆 **Sertifikasi**: Memiliki **48+ sertifikasi resmi** dari Google Cloud, IBM, Coursera, RevoU, Dicoding, dan HackerRank.
- 🚀 **Karya Utama**: Kreator **Nawfal UI Kit** (${autoCtx.componentsCount} komponen enterprise monokromatik) dan platform populer seperti **Hijara** (AI Sustainability) & **KURA** (Game Discovery 897,000+ games).`;
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
    p.includes("المشاريع") ||
    p.includes("проекты")
  ) {
    if (lang === "en") {
      return `Here are the **Featured Projects** developed by Nawfal Irfan Ramadhan:

1. 🌿 **Hijara – AI Sustainability Platform**:
   - AI-powered sustainability platform for Google #JuaraVibeCoding.
   - Integrates Gemini Vision for waste classification & recycling tracking. Serverless on Google Cloud Run.
2. 🎮 **KURA – Game Discovery Platform**:
   - Game discovery platform with 897,000+ games built with Next.js, TypeScript, Firebase, & RAWG API.
3. 📦 **Nawfal UI Kit Ecosystem (v${autoCtx.version})**:
   - Monochrome design system with ${autoCtx.componentsCount} primitives, interactive Design Studio, and NextGen CLI (\`npx nawfal-ui@latest init\`).
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
3. 📦 **Nawfal UI Kit Ecosystem (v${autoCtx.version})**:
   - Design system ${autoCtx.componentsCount} komponen monokromatik, Design Studio interaktif, dan NextGen CLI (\`npx nawfal-ui@latest init\`).
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

/**
 * ⚡ Call Google Gemini API (Model: gemini-3.1-flash-lite)
 * Official endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent
 */
async function callGeminiApiWithFallback(apiKey: string, prompt: string, history: HistoryEntry[]) {
  const models = [
    "gemini-3.1-flash-lite",          // Primary requested model
    "gemini-3.1-flash-lite-preview",  // Preview endpoint fallback
    "gemini-2.0-flash-lite",          // 2.0 lite fallback
    "gemini-2.5-flash",               // 2.5 flash fallback
  ];

  const systemInstructionText = getDynamicSystemPrompt(prompt);

  // Convert chat history format for Gemini API ({ role: 'user' | 'model', parts: [{ text }] })
  const contents: ChatMessage[] = history.slice(-10).map((h) => ({
    role: (h.role === "model" ? "model" : "user") as Role,
    parts: [{ text: h.parts[0]?.text || "" }],
  }));

  // Append current user prompt
  contents.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents,
          generationConfig: {
            temperature: 0.15,
            topP: 0.9,
            maxOutputTokens: 1000,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errText = await res.text();
        console.warn(`[NawfalAI] Gemini model ${model} returned error status ${res.status}: ${errText}`);
      }
    } catch (e) {
      console.warn(`[NawfalAI] Gemini model ${model} call failed, trying next fallback...`);
    }
  }

  throw new Error("GEMINI_API_UNAVAILABLE");
}

export async function getAiResponseAction(
  prompt: string,
  history: HistoryEntry[] = []
): Promise<string> {
  // 1. Input Sanitization & Safeguards
  const cleanPrompt = (prompt || "").trim();
  if (!cleanPrompt) {
    return "Silakan ketik pertanyaan seputar portofolio Nawfal / Please enter a valid question.";
  }

  // Cap maximum prompt length to prevent token overflow attack
  const sanitizedPrompt = cleanPrompt.length > 600 ? cleanPrompt.slice(0, 600) : cleanPrompt;

  // 2. Sliding Window Rate Limiter (Max 12 requests / min per IP)
  try {
    const headersList = headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || "anonymous-client";

    const rateResult = checkRateLimit(clientIp, { limit: 12, windowMs: 60 * 1000 });
    if (!rateResult.success) {
      const langInfo = detectLanguageInfo(sanitizedPrompt);
      if (langInfo.code === "en") {
        return `⚠️ **Rate limit exceeded.** You have sent too many AI requests. Please wait ${rateResult.resetInSeconds} seconds before sending another message.`;
      }
      return `⚠️ **Batas permintaan terlampaui.** Anda mengirim terlalu banyak pertanyaan AI dalam waktu singkat. Silakan tunggu ${rateResult.resetInSeconds} detik sebelum bertanya kembali.`;
    }
  } catch (err) {
    // Non-blocking fallback if headers() fails
  }

  // 3. Process Gemini or Local Fallback
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      return await callGeminiApiWithFallback(apiKey, sanitizedPrompt, history);
    } catch (err) {
      console.warn("[NawfalAI] Google Gemini API call failed or unconfigured, seamlessly serving via smart local knowledge engine.");
    }
  }

  return generateSmartLocalResponse(sanitizedPrompt);
}
