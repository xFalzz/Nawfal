"use client";

import React, { useState } from "react";
import {
  Check, Copy, Layers, Palette, Type, Sliders, Zap, ShieldCheck,
  BookOpen, Code2, Terminal, Package, FileCode2, ArrowUpRight,
  Settings, Cpu, Box, Sparkles
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function DocsSection() {
  const { toast } = useToast();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const colors = [
    { name: "Obsidian Core", hex: "#0A0A0A", bgClass: "bg-black text-white border border-neutral-800", usage: "Dark background base" },
    { name: "Elevated Surface", hex: "#171717", bgClass: "bg-neutral-900 text-white border border-neutral-800", usage: "Dark elevated cards" },
    { name: "Subtle Container", hex: "#262626", bgClass: "bg-neutral-800 text-white border border-neutral-700", usage: "Secondary containers" },
    { name: "Muted Border", hex: "#404040", bgClass: "bg-neutral-700 text-white border border-neutral-600", usage: "Borders & dividers" },
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
    { cmd: "npx nawfal-ui@latest init", desc: "Initialize project configuration (nawfal-ui.json), create components/uikit/ directory, and set up helper utilities." },
    { cmd: "npx nawfal-ui@latest add <component>", desc: "Download and install a standalone TSX component into your project's components/uikit/ folder." },
    { cmd: "npx nawfal-ui@latest list", desc: "Display all 48 available enterprise-grade components with their categories and IDs." },
    { cmd: "npx nawfal-ui@latest help", desc: "Show full CLI usage documentation and command options." },
  ];

  const peerDeps = [
    { name: "react", version: "^18.3.x", purpose: "Core rendering engine" },
    { name: "framer-motion", version: "^12.x", purpose: "Spring physics animations" },
    { name: "lucide-react", version: "^0.356.x", purpose: "Monochrome icon system" },
    { name: "tailwind-merge", version: "^2.x", purpose: "Intelligent class merging" },
    { name: "clsx", version: "^2.x", purpose: "Conditional class composition" },
    { name: "tailwindcss-animate", version: "^1.x", purpose: "Animation utilities for Tailwind" },
  ];

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
    <div className="flex w-full flex-col gap-8 text-neutral-900 dark:text-neutral-100">
      
      {/* ─── 1. Introduction Banner ────────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/80 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <Layers className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
          <span>Documentation & Architecture Hub</span>
        </div>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Technical Specifications v5.2.0
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-3xl">
          <strong>Nawfal UI</strong> is an enterprise-grade React component library built on a strict monochromatic 
          design philosophy. It provides <strong>48 production-ready components</strong> spanning AI interfaces, 
          audio visualizers, motion physics, and system telemetry dashboards — built for Next.js 14+, TypeScript, and Tailwind CSS.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 font-mono">
          {[
            { icon: Cpu, label: "48 Components", desc: "AI, Motion, Telemetry, Controls" },
            { icon: Code2, label: "Full Source Ownership", desc: "Copy-paste standalone TSX code" },
            { icon: ShieldCheck, label: "Strict TypeScript", desc: "100% type-safe interface definitions" },
            { icon: Zap, label: "CLI Automation", desc: "npx nawfal-ui@latest init" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-black">
              <item.icon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-300" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{item.label}</h4>
                <p className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 2. CLI Reference Guide ─────────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/80 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <Terminal className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
          <span>CLI Reference & Installation</span>
        </div>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Nawfal UI CLI Commands
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Initialize project settings or copy components directly to your components/uikit/ folder without compiled npm bundles.
        </p>

        <div className="mt-4 flex flex-col gap-2 font-mono">
          {cliCommands.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-black">
              <div className="min-w-0 flex-1">
                <code className="font-mono text-[11px] font-bold text-neutral-900 dark:text-white">
                  $ {item.cmd}
                </code>
                <p className="mt-1 text-[10px] text-neutral-600 dark:text-neutral-400">{item.desc}</p>
              </div>
              <button
                onClick={() => handleCopySnippet(item.cmd, `cli-${i}`)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {copiedSnippet === `cli-${i}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. Color Tokens Swatches ────────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/80 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <Palette className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
          <span>Color Tokens Swatches</span>
        </div>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Monochromatic Luminance Scale
        </h3>
        <p className="mt-1 text-xs text-neutral-500">Click any swatch to copy its hex code.</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 font-mono">
          {colors.map((c) => (
            <div
              key={c.hex}
              onClick={() => handleCopyHex(c.hex)}
              className={`group flex cursor-pointer flex-col justify-between rounded-lg p-3 ${c.bgClass} shadow-xs transition-transform active:scale-95`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-semibold opacity-80">{c.hex}</span>
                {copiedHex === c.hex ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className="mt-6 text-xs font-bold">{c.name}</p>
              <p className="text-[8px] opacity-70 mt-0.5">{c.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. Peer Dependencies Table ──────────────────────────── */}
      <section className="rounded-xl border border-neutral-200 bg-white/80 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs font-mono">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          <Package className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
          <span>Dependencies Manifest</span>
        </div>
        <h3 className="mt-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Required Tech Stack & Packages
        </h3>

        <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-black">
                <th className="px-3.5 py-2.5 font-bold text-neutral-800 dark:text-neutral-200">Package</th>
                <th className="px-3.5 py-2.5 font-bold text-neutral-800 dark:text-neutral-200">Version</th>
                <th className="hidden px-3.5 py-2.5 font-bold text-neutral-800 dark:text-neutral-200 sm:table-cell">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-900 bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300">
              {peerDeps.map((dep, i) => (
                <tr key={i}>
                  <td className="px-3.5 py-2.5 font-bold">{dep.name}</td>
                  <td className="px-3.5 py-2.5 opacity-70">{dep.version}</td>
                  <td className="hidden px-3.5 py-2.5 opacity-70 sm:table-cell">{dep.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
