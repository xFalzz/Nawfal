"use client";

import React, { useState } from "react";
import {
  Check, Copy, Layers, Palette, Type, Sliders, Zap, ShieldCheck,
  BookOpen, Code2, Terminal, Package, FileCode2, ArrowUpRight,
  Settings, Cpu, Box, Server, FileJson, CheckCircle2,
  FolderTree, Search, ExternalLink, Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

type DocTab = "overview" | "cli" | "tokens" | "utilities" | "compatibility";

export function DocsSection() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<DocTab>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [simulatedCliCmd, setSimulatedCliCmd] = useState<string>("npx nawfal-ui@latest init");

  const colors = [
    { name: "Obsidian Core", hex: "#0A0A0A", bgClass: "bg-black text-white border border-neutral-800", usage: "Primary dark background base" },
    { name: "Elevated Surface", hex: "#171717", bgClass: "bg-neutral-900 text-white border border-neutral-800", usage: "Card containers & modals" },
    { name: "Subtle Container", hex: "#262626", bgClass: "bg-neutral-800 text-white border border-neutral-700", usage: "Secondary hover elements" },
    { name: "Muted Border", hex: "#404040", bgClass: "bg-neutral-700 text-white border border-neutral-600", usage: "Dividers & outline borders" },
    { name: "Light Surface", hex: "#FAFAFA", bgClass: "bg-neutral-100 text-black border border-neutral-300", usage: "Light mode background base" },
    { name: "Pure White", hex: "#FFFFFF", bgClass: "bg-white text-black border border-neutral-300", usage: "High-contrast text & icons" },
  ];

  const typographyTokens = [
    { name: "Display XL", class: "text-3xl font-extrabold tracking-tight", sample: "Nawfal UI Kit v5.3" },
    { name: "Heading", class: "text-xl font-bold tracking-tight", sample: "Enterprise Component Architecture" },
    { name: "Subheading", class: "text-xs font-semibold uppercase tracking-wider", sample: "DESIGN SYSTEM SPECIFICATIONS" },
    { name: "Body", class: "text-xs leading-relaxed", sample: "High-contrast monochromatic component primitives engineered for Next.js 14 and React 18." },
    { name: "Caption Mono", class: "font-mono text-[10px] font-medium", sample: "npx nawfal-ui@latest init · 56 components · MIT License" },
  ];

  const cliCommands = [
    { cmd: "npx nawfal-ui@latest init", desc: "Initialize project configuration (nawfal-ui.json), create components/uikit/ directory, and generate helper utilities." },
    { cmd: "npx nawfal-ui@latest add ai-reasoning-accordion", desc: "Download and install a specific standalone TSX component directly into your codebase." },
    { cmd: "npx nawfal-ui@latest list", desc: "Display all 56 available enterprise components categorized by AI, Audio, Motion, and Telemetry." },
    { cmd: "npx nawfal-ui@latest diff", desc: "Compare local component modifications with upstream Nawfal UI releases." },
    { cmd: "npx nawfal-ui@latest help", desc: "Show full CLI command reference and usage options." },
  ];

  const simulatedTerminalOutputs: Record<string, string> = {
    "npx nawfal-ui@latest init": `==================================================
 🚀 NAWFAL UI KIT ENTERPRISE CLI — v5.3.2
==================================================
[1/3] ⚙️ Initializing Nawfal UI Kit configuration...
  ✓ Created nawfal-ui.json configuration
  ✓ Created directory: /project/components/uikit
  ✓ Created lib/utils.ts (cn utility)

[2/3] 📦 Checking required peer dependencies...
  Required: framer-motion, lucide-react, clsx, tailwind-merge

[3/3] 🎉 Nawfal UI Kit successfully initialized!
Run 'npx nawfal-ui add <component>' to install components.`,

    "npx nawfal-ui@latest add ai-reasoning-accordion": `==================================================
 🚀 NAWFAL UI KIT ENTERPRISE CLI — v5.3.2
==================================================
[+] Installing component: ai-reasoning-accordion...
  ✓ Downloaded standalone TSX source
  ✓ Verified TypeScript types (0 errors)
  ✓ Saved to: components/uikit/ai-reasoning-accordion.tsx

Success! Import via:
import { AIReasoningAccordion } from "@/components/uikit/ai-reasoning-accordion";`,

    "npx nawfal-ui@latest list": `==================================================
 📦 Available Enterprise Components (56 Total):
==================================================
  • ai-reasoning-accordion
  • voice-orb-visualizer
  • spotlight-bento-grid
  • border-beam-card
  • macos-floating-dock
  • server-latency-matrix
  • git-commit-flow-graph
  • vinyl-disc-player
  • ai-neural-voice-spectrum
  • ai-prompt-token-calculator
  • quantum-particle-matrix
  • cyber-parallax-hud-card
  ... and 44 more primitives.`,

    "npx nawfal-ui@latest diff": `==================================================
 🔍 Nawfal UI Local Source Diff Checker
==================================================
  • components/uikit/ai-reasoning-accordion.tsx: Up to date (v5.3.2)
  • components/uikit/custom-components.tsx: Custom local edits detected (100% owned)
No upstream breaking conflicts found.`,

    "npx nawfal-ui@latest help": `==================================================
 📖 Nawfal UI CLI Command Reference
==================================================
Usage:
  npx nawfal-ui@latest init         Initialize Nawfal UI in project
  npx nawfal-ui@latest add <name>   Install component source file
  npx nawfal-ui@latest list         List all 56 components
  npx nawfal-ui@latest help         Show CLI help menu`,
  };

  const configSnippet = `{
  "$schema": "https://nawfal.vercel.app/schema.json",
  "version": "5.3.2",
  "style": "monochrome-enterprise",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral"
  },
  "aliases": {
    "components": "@/components/uikit",
    "utils": "@/lib/utils"
  }
}`;

  const helperSnippet = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely without duplication.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  const motionPresetSnippet = `// Framer Motion Spring Dynamics Presets
export const springPresets = {
  snappy: { type: "spring", stiffness: 400, damping: 25 },
  gentle: { type: "spring", stiffness: 200, damping: 20 },
  bouncy: { type: "spring", stiffness: 500, damping: 15 },
};`;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast({ title: "Hex Copied!", description: `${hex} copied to clipboard.` });
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-6 text-neutral-900 dark:text-neutral-100">

      {/* ─── Hero Documentation Banner ───────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-md p-6 dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <BookOpen className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>TECHNICAL DOCUMENTATION SUITE</span>
              <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 font-semibold">
                v5.3.2 SPEC
              </span>
            </div>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Nawfal UI Developer Documentation
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Complete technical reference for Nawfal UI — architectural design philosophy, CLI specifications, monochromatic design tokens, helper utilities, and framework compatibility matrix.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <a
              href="https://nawfal.vercel.app/schema.json"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-[11px] font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5 text-sky-500" />
              <span>JSON Schema</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Multi-Tab Navigation Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-100 p-1 font-mono text-xs dark:border-neutral-800 dark:bg-black overflow-x-auto no-scrollbar touch-pan-x scroll-smooth">
        <div className="flex gap-1 shrink-0">
          {[
            { id: "overview", label: "Overview & Architecture", icon: <Layers className="h-3.5 w-3.5 shrink-0" /> },
            { id: "cli", label: "CLI Command Reference", icon: <Terminal className="h-3.5 w-3.5 shrink-0" /> },
            { id: "tokens", label: "Design Tokens & Swatches", icon: <Palette className="h-3.5 w-3.5 shrink-0" /> },
            { id: "utilities", label: "Helper Utilities & Motion", icon: <Code2 className="h-3.5 w-3.5 shrink-0" /> },
            { id: "compatibility", label: "Tech Stack Matrix", icon: <Package className="h-3.5 w-3.5 shrink-0" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DocTab)}
              className={`shrink-0 flex items-center gap-1.5 rounded px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB 1: OVERVIEW & ARCHITECTURE ────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Source-Owned Component Architecture</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Nawfal UI follows the <strong>copy-paste source ownership model</strong> popularized by Shadcn. Every component is delivered as uncompiled TSX source code that you copy into your project and own entirely.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
              {[
                { title: "No Package Lock-in", desc: "No dependency on external compiled npm bundles. Edit any line of code directly." },
                { title: "100% Type-Safe", desc: "Strict TypeScript interface definitions for every prop and event handler." },
                { title: "Monochromatic Contrast", desc: "18.5:1 luminance contrast ratio meeting WCAG AAA accessibility standards." },
                { title: "Physics Motion", desc: "Smooth spring dynamics tuned with Framer Motion stiffness & damping." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-black">
                  <span className="font-bold text-neutral-900 dark:text-white">{item.title}</span>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Directory Structure Breakdown */}
            <div className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-800 font-mono text-xs">
              <h4 className="font-bold uppercase text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <FolderTree className="h-4 w-4 text-sky-500" /> Recommended Project Directory Tree
              </h4>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[11px] leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
                <code>{`my-nextjs-app/
├── nawfal-ui.json             # Nawfal UI project config (schema: https://nawfal.vercel.app/schema.json)
├── lib/
│   └── utils.ts              # cn() class merger helper (clsx + tailwind-merge)
└── components/
    └── uikit/                # 48 Standalone TSX Source Components
        ├── ai-neural-voice-spectrum.tsx
        ├── quantum-particle-matrix.tsx
        ├── cyber-parallax-hud-card.tsx
        └── custom-components.tsx`}</code>
              </pre>
            </div>
          </section>
        </div>
      )}

      {/* ─── TAB 2: CLI COMMAND REFERENCE & SIMULATOR ──────────────────────── */}
      {activeTab === "cli" && (
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">CLI Commands & Interactive Terminal Simulator</h3>
              <span className="text-[10px] text-neutral-400 font-mono">npx nawfal-ui@latest</span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {cliCommands.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSimulatedCliCmd(item.cmd)}
                  className={`group flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-3.5 transition-all ${
                    simulatedCliCmd === item.cmd
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-900 dark:text-white shadow-xs"
                      : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-black dark:text-neutral-400 dark:hover:border-neutral-700"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Play className="h-3 w-3 shrink-0 opacity-70" />
                      <code className="font-mono text-xs font-bold">$ {item.cmd}</code>
                    </div>
                    <p className="mt-1 text-[11px] opacity-80">{item.desc}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopySnippet(item.cmd, `cli-${i}`);
                    }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    {copiedSnippet === `cli-${i}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Interactive Terminal Console Output */}
            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2 text-[10px] text-neutral-400 rounded-t-lg">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" /> SIMULATED TERMINAL CONSOLE
                </span>
                <span>Active: {simulatedCliCmd}</span>
              </div>
              <pre className="overflow-x-auto rounded-b-lg border border-neutral-800 bg-black p-4 font-mono text-[11px] leading-relaxed text-emerald-400 min-h-[160px]">
                <code>{simulatedTerminalOutputs[simulatedCliCmd] || simulatedTerminalOutputs["npx nawfal-ui@latest init"]}</code>
              </pre>
            </div>

            {/* Config JSON File Viewer */}
            <div className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800">
                <span className="font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  <FileJson className="h-4 w-4 text-amber-500" /> Config File Spec (nawfal-ui.json)
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://nawfal.vercel.app/schema.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-sky-500 underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" /> View Public Schema
                  </a>
                  <button
                    onClick={() => handleCopySnippet(configSnippet, "config-json")}
                    className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    <Copy className="h-3 w-3" /> Copy JSON
                  </button>
                </div>
              </div>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[11px] leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
                <code>{configSnippet}</code>
              </pre>
            </div>
          </section>
        </div>
      )}

      {/* ─── TAB 3: DESIGN TOKENS & SWATCHES ────────────────────────────────── */}
      {activeTab === "tokens" && (
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-white">Luminance Scale & Typography Tokens</h3>
            <p className="mt-1 text-xs text-neutral-500 font-mono">Click any color swatch to copy its hex code.</p>

            {/* Swatches Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 font-mono text-xs">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => handleCopyHex(c.hex)}
                  className={`group flex cursor-pointer flex-col justify-between rounded-lg p-3 ${c.bgClass} shadow-xs transition-transform active:scale-95`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-semibold opacity-80">{c.hex}</span>
                    {copiedHex === c.hex ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  <p className="mt-6 text-xs font-bold">{c.name}</p>
                  <p className="text-[8px] opacity-70 mt-0.5">{c.usage}</p>
                </div>
              ))}
            </div>

            {/* Typography Scale Preview */}
            <div className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <h4 className="font-mono text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">Typography Scale</h4>
              <div className="mt-3 flex flex-col gap-3 font-mono">
                {typographyTokens.map((t, i) => (
                  <div key={i} className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-black">
                    <div className="flex justify-between text-[10px] text-neutral-500">
                      <span>{t.name}</span>
                      <code>{t.class}</code>
                    </div>
                    <span className={t.class}>{t.sample}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── TAB 4: HELPER UTILITIES & MOTION ────────────────────────────────── */}
      {activeTab === "utilities" && (
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 font-mono text-xs">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Helper Utilities & Motion Presets</h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Copy-paste helper function snippets used by Nawfal UI components.
            </p>

            {/* Utility 1: cn() */}
            <div className="mt-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">Class Name Merger (lib/utils.ts)</span>
                <button
                  onClick={() => handleCopySnippet(helperSnippet, "util-cn")}
                  className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  <Copy className="h-3 w-3" /> Copy Snippet
                </button>
              </div>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[11px] leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
                <code>{helperSnippet}</code>
              </pre>
            </div>

            {/* Utility 2: Motion Spring Presets */}
            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">Framer Motion Spring Dynamics Presets</span>
                <button
                  onClick={() => handleCopySnippet(motionPresetSnippet, "util-motion")}
                  className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  <Copy className="h-3 w-3" /> Copy Snippet
                </button>
              </div>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-[11px] leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
                <code>{motionPresetSnippet}</code>
              </pre>
            </div>
          </section>
        </div>
      )}

      {/* ─── TAB 5: TECH STACK MATRIX ────────────────────────────────────────── */}
      {activeTab === "compatibility" && (
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 font-mono text-xs">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">Framework & Dependency Matrix</h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Verified compatibility across modern React frameworks and tooling.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-black">
                    <th className="px-3.5 py-2.5 font-bold text-neutral-800 dark:text-neutral-200">Framework / Tool</th>
                    <th className="px-3.5 py-2.5 font-bold text-neutral-800 dark:text-neutral-200">Version</th>
                    <th className="px-3.5 py-2.5 font-bold text-neutral-800 dark:text-neutral-200">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-900 bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300">
                  {[
                    { name: "Next.js (App Router & Pages)", ver: "^14.x / ^15.x", status: "100% Verified" },
                    { name: "React / React DOM", ver: "^18.3.x / ^19.x", status: "100% Verified" },
                    { name: "Tailwind CSS", ver: "^3.4.x / ^4.0", status: "100% Verified" },
                    { name: "TypeScript", ver: "^5.x Strict", status: "100% Verified" },
                    { name: "Framer Motion", ver: "^11.x / ^12.x", status: "100% Verified" },
                    { name: "Vite / Remix / Astro", ver: "Latest", status: "Supported via Export" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-3.5 py-2.5 font-bold">{row.name}</td>
                      <td className="px-3.5 py-2.5 opacity-70">{row.ver}</td>
                      <td className="px-3.5 py-2.5 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

    </div>
  );
}
