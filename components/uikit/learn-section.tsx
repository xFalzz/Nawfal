"use client";

import React, { useState } from "react";
import {
  BookOpen, Code2, ArrowUpRight, Check, ChevronRight, Zap, ShieldCheck,
  Cpu, Terminal, Palette, Layers, Box, Eye, Shield, Globe,
  Search, HelpCircle, ChevronDown, CheckCircle2, Copy, FileText, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is Nawfal UI and how is it different from Shadcn or MUI?",
    a: "Nawfal UI is an enterprise-grade, monochromatic React component library shipping 56 production-ready components. Unlike traditional libraries that lock you into compiled npm packages, Nawfal UI provides source-owned TSX components that you copy directly into your project. It specializes in AI RAG search bars, physics-based motion primitives, audio visualizers, and system telemetry dashboards.",
    cat: "General",
  },
  {
    q: "Can I use Nawfal UI with Non-Next.js frameworks like Vite, Remix, or Vue?",
    a: "Yes! Nawfal UI components ship as clean TSX source code built on standard Tailwind CSS classes and Framer Motion. Every component can be converted with 1-click into React TSX, React JSX, Vanilla HTML + CSS, or Vue 3 SFC directly from our Component Design Studio.",
    cat: "Compatibility",
  },
  {
    q: "How do I initialize Nawfal UI in my existing project via CLI?",
    a: "Run `npx nawfal-ui@latest init` in your terminal. This creates a `nawfal-ui.json` configuration file, sets up the `components/uikit/` directory, and installs necessary peer dependencies (`framer-motion`, `lucide-react`, `tailwind-merge`, `clsx`).",
    cat: "Setup",
  },
  {
    q: "Why does Nawfal UI strictly adhere to a Monochromatic Color Philosophy?",
    a: "A strict monochromatic palette (deep obsidian #0A0A0A, carbon #171717, zinc, and crisp white #FFFFFF) eliminates cognitive visual clutter, maximizes mathematical contrast ratios (exceeding WCAG AAA), and ensures seamless integration into any brand or product without color clashes.",
    cat: "Design System",
  },
  {
    q: "Is Nawfal UI compliant with WCAG AAA accessibility standards?",
    a: "Yes. Nawfal UI's monochromatic luminance scale enforces an 18.5:1 contrast ratio between primary text and backgrounds, exceeding the WCAG AAA requirement of 7:1. Interactive components also include keyboard navigation (⌘K shortcut, focus rings, ARIA roles).",
    cat: "Design System",
  },
  {
    q: "Does Nawfal UI support Next.js 15 App Router and React 19?",
    a: "Yes. Components that contain interactive client state or Framer Motion animations feature the 'use client' directive at the top, while structural containers are fully compatible with Next.js 15 App Router and React 19 Server Components.",
    cat: "Compatibility",
  },
  {
    q: "How do I customize the border radius, font, or theme in Nawfal UI?",
    a: "Because you own the source code, you can easily modify Tailwind classes or edit your `nawfal-ui.json` file. You can also use our interactive Design Studio tab to test radius (0px - 24px), border widths, and size scales live before copying the generated code.",
    cat: "Customization",
  },
  {
    q: "What license is Nawfal UI released under?",
    a: "Nawfal UI is 100% open-source under the MIT License. You are free to use it in personal, commercial, or enterprise projects without royalty or attribution requirements.",
    cat: "General",
  },
];

// ─── GUIDES DATA ──────────────────────────────────────────────────────────────
const GUIDES = [
  {
    id: "intro",
    title: "1. Complete Architectural Overview",
    category: "Architecture",
    readTime: "4 min read",
    summary: "Discover the architectural philosophy behind Nawfal UI — copy-paste source ownership, monochromatic luminance, and spring physics.",
    content: `Nawfal UI is designed for modern web developers who demand complete control over their design system.

### Core Architectural Pillars
1. **Source Ownership Model**: Every component is standalone TSX source code that lives directly in your repository. No hidden npm dependencies or rigid component wrappers.
2. **Strict Monochromatic Scale**: Enforces high contrast using neutral greyscale tones (#0A0A0A, #171717, #262626, #404040, #FAFAFA, #FFFFFF).
3. **Spring Physics Motion**: Built on Framer Motion's spring dynamics (stiffness, damping, mass) instead of artificial CSS ease curves.
4. **AI & Telemetry Specialization**: Pre-built components for vector similarity, streaming tokens, audio waveforms, and server monitoring.`,
  },
  {
    id: "cli-guide",
    title: "2. NextGen CLI Installation & Management",
    category: "Developer Tools",
    readTime: "3 min read",
    summary: "Learn how to use `npx nawfal-ui@latest` CLI to initialize, add components, and inspect project dependencies.",
    content: `The Nawfal UI CLI streamlines component installation directly from your command prompt.

### Quick Commands
\`\`\`bash
# 1. Initialize project configuration
npx nawfal-ui@latest init

# 2. Add individual components to components/uikit/
npx nawfal-ui@latest add ai-semantic-search
npx nawfal-ui@latest add audio-waveform
npx nawfal-ui@latest add interactive-dock

# 3. List all 56 components with status
npx nawfal-ui@latest list
\`\`\`

### Generated Configuration (nawfal-ui.json)
\`\`\`json
{
  "style": "monochrome",
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
\`\`\``,
  },
  {
    id: "design-system",
    title: "3. Monochromatic Design System Deep Dive",
    category: "Design System",
    readTime: "5 min read",
    summary: "Comprehensive guide to color tokens, typography scales, spacing grids, and border radii in Nawfal UI.",
    content: `The Nawfal UI design system eliminates color noise and enforces extreme clarity through structural contrast.

### Luminance Color Tokens
- **Obsidian Core (#0A0A0A)**: Dark mode primary background
- **Elevated Surface (#171717)**: Secondary card containers
- **Border Muted (#404040)**: Subtle separators & outlines
- **Light Surface (#FAFAFA)**: Light mode primary background
- **Pure White (#FFFFFF)**: High-contrast primary foreground text

### Spacing Scale (4px Grid)
All padding, margin, and gaps adhere to a 4px base scale: 4px → 8px → 12px → 16px → 20px → 24px → 32px.`,
  },
  {
    id: "ai-telemetry-suite",
    title: "4. Next-Gen AI & Telemetry Primitives (v5.3)",
    category: "AI & Systems",
    readTime: "4 min read",
    summary: "Integrate AI reasoning accordions, voice orb visualizers, and edge server latency matrices into your production dashboard.",
    content: `Nawfal UI v5.3 introduces 8 cutting-edge enterprise primitives tailored for modern AI applications and DevOps dashboards.

### Key Primitives
- **AI Reasoning Accordion (\`ai-reasoning-accordion\`)**: Collapsible thinking container with step breakdown and token time.
- **Voice Orb Visualizer (\`voice-orb-visualizer\`)**: Kinetic liquid plasma ring reacting to microphone audio streams.
- **Server Latency Matrix (\`server-latency-matrix\`)**: Multi-region edge health monitor with real-time ping simulation.
- **Spotlight Bento (\`spotlight-bento-grid\`)**: Radial cursor-follow beam calculated with hardware-accelerated math.

### Installation Example
\`\`\`bash
npx nawfal-ui@latest add ai-reasoning-accordion
\`\`\``,
  },
];

export function LearnSection() {
  const { toast } = useToast();
  const [selectedGuideIndex, setSelectedGuideIndex] = useState<number>(0);
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  const activeGuide = GUIDES[selectedGuideIndex] ?? GUIDES[0];

  const filteredFaqs = FAQS.filter(
    (f) =>
      !faqSearch ||
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.cat.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;
    toast({ title: "Feedback Received!", description: "Thank you for contributing to Nawfal UI documentation." });
    setFeedbackMsg("");
  };

  return (
    <div className="flex w-full flex-col gap-8 text-neutral-900 dark:text-neutral-100">

      {/* ─── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-md p-6 dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <BookOpen className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>LEARN & FAQ ACADEMY</span>
              <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 font-semibold">
                v5.3.2 EDITION
              </span>
            </div>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Learn Nawfal UI & Frequently Asked Questions
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Everything you need to know about Nawfal UI — architectural design guides, CLI usage, framework compatibility, and technical FAQs.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
              56 Verified Components
            </span>
          </div>
        </div>
      </section>

      {/* ─── Interactive Guides & Documentation Section ──────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Guide Navigation (4 cols) */}
        <div className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 dark:border-neutral-800">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Interactive Guides
            </span>
            <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500">{GUIDES.length} Modules</span>
          </div>

          <div className="flex flex-col gap-2">
            {GUIDES.map((guide, idx) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuideIndex(idx)}
                className={`flex flex-col gap-1 rounded-lg border p-3 text-left font-mono transition-all ${
                  selectedGuideIndex === idx
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-900 dark:text-white shadow-xs"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-black dark:text-neutral-400 dark:hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider opacity-60">{guide.category}</span>
                  <span className="text-[9px] opacity-60">{guide.readTime}</span>
                </div>
                <span className="text-xs font-bold">{guide.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Guide Reader (8 cols) */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 lg:col-span-8 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-neutral-500" />
              <span className="font-bold text-sm text-neutral-900 dark:text-white">{activeGuide.title}</span>
            </div>
            <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[9px] text-neutral-600 dark:border-neutral-800 dark:bg-black dark:text-neutral-400 font-semibold">
              {activeGuide.category}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans italic border-l-2 border-neutral-400 pl-3">
            {activeGuide.summary}
          </p>

          <div className="whitespace-pre-line text-xs leading-relaxed text-neutral-800 dark:text-neutral-300">
            {activeGuide.content}
          </div>
        </div>
      </div>

      {/* ─── Comprehensive FAQ Accordion Section ────────────────────────────── */}
      <section className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
              <HelpCircle className="h-4 w-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">
              Everything You Need to Know
            </h3>
          </div>

          {/* FAQ Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-8 pr-3 py-1.5 font-mono text-[11px] text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-neutral-100 outline-none focus:border-neutral-400"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3 mt-2">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition-all dark:border-neutral-800 dark:bg-black"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left font-mono text-xs font-bold text-neutral-900 dark:text-white hover:opacity-80 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span className="rounded border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-1.5 py-0.5 text-[9px] text-neutral-500 font-semibold">
                      {faq.cat}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 font-sans"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <p className="py-6 text-center font-mono text-xs text-neutral-500">No questions match your query.</p>
          )}
        </div>

        {/* Feedback Submission Box */}
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-100/60 p-4 dark:border-neutral-800 dark:bg-black/60 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Send className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-bold text-neutral-800 dark:text-neutral-200">Have more questions or need a custom component?</span>
          </div>
          <form onSubmit={handleFeedbackSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a question or request a component..."
              value={feedbackMsg}
              onChange={(e) => setFeedbackMsg(e.target.value)}
              className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-1.5 text-xs text-neutral-900 dark:text-white outline-none focus:border-neutral-500"
            />
            <button
              type="submit"
              className="rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-1.5 font-bold text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-black hover:opacity-90 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
