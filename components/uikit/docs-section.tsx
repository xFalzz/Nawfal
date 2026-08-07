"use client";

import React, { useState } from "react";
import { Check, Copy, Layers, Palette, Type, Sliders, Zap, ShieldCheck, BookOpen, Code2, Terminal, Package, FileCode2, ArrowUpRight, Settings, Cpu } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function DocsSection() {
  const { toast } = useToast();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const colors = [
    { name: "Obsidian Core", hex: "#0A0A0A", bgClass: "bg-black text-white", usage: "Primary backgrounds" },
    { name: "Neutral Dark", hex: "#171717", bgClass: "bg-neutral-900 text-white", usage: "Elevated surfaces" },
    { name: "Subtle Surface", hex: "#262626", bgClass: "bg-neutral-800 text-white", usage: "Card containers" },
    { name: "Muted Border", hex: "#404040", bgClass: "bg-neutral-700 text-white", usage: "Borders & dividers" },
    { name: "Light Surface", hex: "#FAFAFA", bgClass: "bg-neutral-100 text-black border border-neutral-300", usage: "Light mode base" },
    { name: "Pure White", hex: "#FFFFFF", bgClass: "bg-white text-black border border-neutral-300", usage: "Foreground text" },
  ];

  const typographyTokens = [
    { name: "Display XL", class: "text-3xl font-extrabold tracking-tight", sample: "Nawfal UI Kit" },
    { name: "Heading", class: "text-xl font-bold tracking-tight", sample: "Component Library" },
    { name: "Subheading", class: "text-sm font-semibold uppercase tracking-wider", sample: "SECTION LABEL" },
    { name: "Body", class: "text-xs leading-relaxed", sample: "Paragraph text for descriptions and content blocks." },
    { name: "Caption Mono", class: "font-mono text-[10px] font-medium", sample: "v5.2.0 · 48 components · MIT" },
    { name: "Badge", class: "font-mono text-[8px] font-bold uppercase tracking-widest", sample: "VERIFIED · LIVE · ONLINE" },
  ];

  const spacingTokens = [
    { name: "p-2", px: "8px", usage: "Compact pills & badges" },
    { name: "p-3", px: "12px", usage: "Inner card padding" },
    { name: "p-3.5", px: "14px", usage: "Component containers" },
    { name: "p-4", px: "16px", usage: "Standard card padding" },
    { name: "p-5", px: "20px", usage: "Section containers" },
    { name: "p-6", px: "24px", usage: "Hero & banner sections" },
    { name: "gap-1", px: "4px", usage: "Inline icon spacing" },
    { name: "gap-2", px: "8px", usage: "Compact element gaps" },
    { name: "gap-4", px: "16px", usage: "Card grid gaps" },
    { name: "gap-6", px: "24px", usage: "Section separators" },
  ];

  const cliCommands = [
    { cmd: "npx nawfal-ui@latest init", desc: "Initialize project config (nawfal-ui.json), create components/uikit/ directory, and set up lib/utils.ts helper" },
    { cmd: "npx nawfal-ui@latest add <name>", desc: "Install a specific component into your project's components/uikit/ folder" },
    { cmd: "npx nawfal-ui@latest list", desc: "Display all 48 available enterprise-grade components with their identifiers" },
    { cmd: "npx nawfal-ui@latest help", desc: "Show full CLI usage documentation and available options" },
  ];

  const peerDeps = [
    { name: "react", version: "^18.3.x", purpose: "Core rendering engine" },
    { name: "framer-motion", version: "^12.x", purpose: "Spring physics animations" },
    { name: "lucide-react", version: "^0.356.x", purpose: "Monochrome icon system" },
    { name: "tailwind-merge", version: "^2.x", purpose: "Intelligent class merging" },
    { name: "clsx", version: "^2.x", purpose: "Conditional class composition" },
    { name: "tailwindcss-animate", version: "^1.x", purpose: "Animate utilities for Tailwind" },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast({ title: "Color Hex Copied!", description: `${hex} has been copied to your clipboard.` });
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* ─── 1. Introduction & What is Nawfal UI ─────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Layers className="h-4 w-4" />
          <span>About Nawfal UI Kit</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          What is Nawfal UI?
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          <strong>Nawfal UI</strong> is an enterprise-grade, open-source React component library built on a strict monochromatic 
          design philosophy. It provides <strong>48 production-ready components</strong> spanning AI-powered interfaces, 
          interactive audio visualizers, physics-based animations, real-time telemetry dashboards, and developer utilities — 
          all crafted with <strong>Next.js 14</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong> spring physics.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          Unlike traditional component libraries that ship pre-built compiled packages, Nawfal UI follows the 
          <strong> copy-paste source ownership model</strong> — every component ships as standalone TSX source code that you 
          own, customize, and maintain directly in your codebase. No hidden dependencies, no black-box abstractions.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cpu, label: "48 Components", desc: "AI, Audio, Motion, Telemetry, Controls" },
            { icon: Code2, label: "Full Source Code", desc: "Copy-paste TSX, no compiled bundles" },
            { icon: ShieldCheck, label: "TypeScript First", desc: "100% type-safe with strict mode" },
            { icon: Zap, label: "CLI Installation", desc: "npx nawfal-ui@latest init" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
              <item.icon className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.label}</h4>
                <p className="mt-0.5 text-[10px] text-neutral-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 2. Design Manifesto ─────────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Layers className="h-4 w-4" />
          <span>Design Philosophy & Architecture</span>
        </div>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Monochromatic Enterprise Specs v5.2.0
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          The Nawfal UI system is rooted in extreme clarity, structural contrast, and fluid micro-motion. 
          Every design decision prioritizes accessibility, performance, and developer ergonomics.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">1. High Contrast Luminance</h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Strict black-and-white monochromatic scale with emerald accents for live statuses. WCAG AAA compliant contrast ratios (18.5:1 for primary text).
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">2. Physics-Based Micro-Motion</h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Spring-animated interactions using Framer Motion (stiffness, damping, mass) instead of artificial CSS ease-in-out transitions. GPU-optimized transforms only.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">3. Source-Owned Architecture</h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Every component is a standalone TSX file — no compiled bundles, no version lock-in. Full customization freedom with unclipped preview viewports.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. CLI Installation Guide ───────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Terminal className="h-4 w-4" />
          <span>CLI Installation & Setup</span>
        </div>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Getting Started with the CLI
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          Install components directly into your project using the Nawfal UI CLI. No package imports needed — 
          components are copied as source files that you fully own and customize.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {cliCommands.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="min-w-0 flex-1">
                <code className="font-mono text-[11px] font-bold text-neutral-900 dark:text-emerald-400">
                  $ {item.cmd}
                </code>
                <p className="mt-1 text-[10px] text-neutral-500">{item.desc}</p>
              </div>
              <button
                onClick={() => handleCopySnippet(item.cmd, `cli-${i}`)}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              >
                {copiedSnippet === `cli-${i}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. Peer Dependencies ────────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Package className="h-4 w-4" />
          <span>Required Dependencies</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">Peer Dependencies & Tech Stack</h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          These packages must be installed in your project for Nawfal UI components to function correctly.
        </p>

        <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                <th className="px-3 py-2 font-mono font-bold text-neutral-700 dark:text-neutral-300">Package</th>
                <th className="px-3 py-2 font-mono font-bold text-neutral-700 dark:text-neutral-300">Version</th>
                <th className="hidden px-3 py-2 font-mono font-bold text-neutral-700 dark:text-neutral-300 sm:table-cell">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {peerDeps.map((dep, i) => (
                <tr key={i} className="border-b border-neutral-100 last:border-b-0 dark:border-neutral-800/50">
                  <td className="px-3 py-2 font-mono font-semibold text-neutral-900 dark:text-neutral-100">{dep.name}</td>
                  <td className="px-3 py-2 font-mono text-neutral-500">{dep.version}</td>
                  <td className="hidden px-3 py-2 text-neutral-500 sm:table-cell">{dep.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 5. Color Tokens Swatches ────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Palette className="h-4 w-4" />
          <span>Color Tokens Swatches</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Palette Tokens & Hex Codes
        </h3>
        <p className="mt-1 text-xs text-neutral-500">Click any swatch to copy its hex value to clipboard.</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map((c) => (
            <div
              key={c.hex}
              onClick={() => handleCopyHex(c.hex)}
              className={`group flex cursor-pointer flex-col justify-between rounded-lg p-3 ${c.bgClass} shadow-sm transition-transform active:scale-95`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] font-semibold opacity-70">{c.hex}</span>
                {copiedHex === c.hex ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className="mt-6 text-xs font-bold">{c.name}</p>
              <p className="text-[8px] opacity-60 mt-0.5">{c.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. Typography Tokens ────────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Type className="h-4 w-4" />
          <span>Typography Scale</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Type Hierarchy & Font Tokens
        </h3>

        <div className="mt-4 flex flex-col gap-2">
          {typographyTokens.map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="min-w-0 flex-1">
                <span className={`block text-neutral-900 dark:text-neutral-100 ${t.class}`}>{t.sample}</span>
              </div>
              <div className="shrink-0 text-right">
                <span className="block font-mono text-[10px] font-bold text-neutral-600 dark:text-neutral-400">{t.name}</span>
                <code className="block font-mono text-[8px] text-neutral-400">{t.class}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. Spacing & Layout Tokens ──────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Settings className="h-4 w-4" />
          <span>Spacing & Layout System</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Spacing Tokens Reference
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {spacingTokens.map((s, i) => (
            <div key={i} className="rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-900/50">
              <code className="block font-mono text-[10px] font-bold text-neutral-900 dark:text-neutral-100">{s.name}</code>
              <span className="block font-mono text-[9px] text-neutral-400">{s.px}</span>
              <span className="block text-[8px] text-neutral-500 mt-0.5">{s.usage}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 8. Component Categories ─────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <FileCode2 className="h-4 w-4" />
          <span>Component Categories</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          48 Components Across 7 Categories
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { cat: "AI RAG & Intelligence Engines", count: 5, desc: "Semantic search, vector RAG, token estimators, neural voice AI, vision inspectors" },
            { cat: "Audio Architecture & Media", count: 5, desc: "Waveform visualizers, Spotify-style players, vinyl controls, album cards, mini players" },
            { cat: "Bespoke Widgets & Utilities", count: 8, desc: "Color pickers, BPM metronomes, terminal runners, command palettes, FPS monitors" },
            { cat: "Kinetic Motion & Physics", count: 6, desc: "Magnetic buttons, shimmer beams, particle ripples, quantum meshes, spring animations" },
            { cat: "Structural Containers & Surfaces", count: 8, desc: "Glow cards, glass panels, 3D parallax HUDs, holographic badges, frosted containers" },
            { cat: "Interactive Inputs & Controls", count: 9, desc: "OTP inputs, toggle switches, segmented controls, pipeline steppers, range sliders" },
            { cat: "Telemetry & System Signals", count: 7, desc: "Radar sweeps, system monitors, commit graphs, metric badges, status indicators" },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100">{item.cat}</h4>
                <span className="rounded bg-neutral-200 px-1.5 py-0.5 font-mono text-[8px] font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">{item.count}</span>
              </div>
              <p className="mt-1 text-[10px] text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 9. Multi-Framework Support ──────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Code2 className="h-4 w-4" />
          <span>Multi-Framework Support</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Use Nawfal UI Everywhere — 4 Formats
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Every component is available in <strong>4 code formats</strong>. Switch between them using the format tab on any component card.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              format: "TSX",
              label: "React + TypeScript",
              badge: "DEFAULT",
              badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
              desc: "Full type-safe React components with TypeScript interfaces, generics, and strict mode support.",
              usage: `import { HolographicBadge } from "@/components/uikit/holographic-badge";\n\nexport default function Page() {\n  return <HolographicBadge title="Elite" />;\n}`,
            },
            {
              format: "JSX",
              label: "React + JavaScript",
              badge: "UNIVERSAL",
              badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
              desc: "Same React components with all TypeScript annotations removed. Drop into any Create React App or Vite JS project.",
              usage: `import { HolographicBadge } from "./components/uikit/holographic-badge";\n\nexport default function Page() {\n  return <HolographicBadge title="Elite" />;\n}`,
            },
            {
              format: "HTML",
              label: "Vanilla HTML/CSS/JS",
              badge: "ZERO DEPS",
              badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
              desc: "Standalone HTML files with Tailwind CDN. No build tools, no npm, no frameworks — just open in a browser.",
              usage: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>\n</head>\n<body>\n  <div class="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white">\n    <!-- Your component here -->\n  </div>\n</body>\n</html>`,
            },
            {
              format: "Vue",
              label: "Vue 3 SFC",
              badge: "COMPOSITION API",
              badgeColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
              desc: "Vue 3 Single File Components using Composition API with <script setup>. Compatible with Nuxt 3 and Vite + Vue.",
              usage: `<template>\n  <HolographicBadge title="Elite" />\n</template>\n\n<script setup>\nimport HolographicBadge from "./HolographicBadge.vue";\n</script>`,
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.format} — {item.label}</h4>
                <span className={`rounded px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase ${item.badgeColor}`}>{item.badge}</span>
              </div>
              <p className="text-[10px] text-neutral-500">{item.desc}</p>
              <div className="rounded border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-800 dark:bg-neutral-900">
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[9px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {item.usage}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
