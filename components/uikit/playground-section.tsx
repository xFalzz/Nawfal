"use client";

import React, { useState } from "react";
import {
  Sliders, Check, Copy, Code2, Eye, Terminal, Monitor,
  Tablet, Smartphone, RotateCcw, Box, ArrowUpRight, CheckCircle2,
  Square, Shield, Layers, Command, Grid, SlidersHorizontal,
  ChevronRight, Sparkles, Download, RefreshCw, Lock, Search,
  Music, Cpu, Radio, Activity, Zap, Play, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// ─── TYPES & INTERFACES ────────────────────────────────────────────────────────
type ThemeCanvas = "obsidian" | "graphite" | "pure-light";
type ExportFormat = "tsx" | "jsx" | "html" | "tailwind";
type ComponentSize = "sm" | "md" | "lg";
type ComponentState = "default" | "loading" | "disabled";

interface ComponentConfig {
  id: string;
  name: string;
  category: "Buttons" | "Cards" | "Inputs" | "Badges" | "Controls" | "Navigation";
  description: string;
}

const CATALOG: ComponentConfig[] = [
  // Buttons
  { id: "btn-action", name: "Action Button", category: "Buttons", description: "Monochrome interactive button with hover spring motion." },
  { id: "btn-beam", name: "Shimmer Beam", category: "Buttons", description: "High-contrast rotating border beam button." },
  { id: "btn-icon", name: "Icon Command", category: "Buttons", description: "Compact icon button with keyboard shortcut badge." },
  
  // Cards
  { id: "card-surface", name: "Surface Card", category: "Cards", description: "Monochrome structured container with header telemetry." },
  { id: "card-metric", name: "Metric Stat Card", category: "Cards", description: "KPI indicator card with trend percentage and status badge." },
  { id: "card-hud", name: "Parallax HUD Card", category: "Cards", description: "Corner-bracketed HUD card with scanning lines." },

  // Inputs
  { id: "input-field", name: "Text Input Field", category: "Inputs", description: "Clean form input with focus ring and clear button." },
  { id: "input-pin", name: "OTP PIN Code", category: "Inputs", description: "4-box verification PIN entry layout." },
  { id: "input-search", name: "Command Search Bar", category: "Inputs", description: "Instant search field with shortcut trigger." },

  // Badges
  { id: "badge-pulse", name: "Pulse Status Badge", category: "Badges", description: "Indicator badge with animated pulse dot." },
  { id: "badge-radar", name: "Radar Sweep Badge", category: "Badges", description: "Circular radar scanning status badge." },
  { id: "badge-counter", name: "Metric Counter Pill", category: "Badges", description: "Monochrome numeric count indicator pill." },

  // Controls
  { id: "ctrl-segmented", name: "Segmented Switch", category: "Controls", description: "Multi-option toggle switch with sliding background." },
  { id: "ctrl-toggle", name: "Compact Switch", category: "Controls", description: "Minimalist binary on/off toggle switch." },

  // Navigation
  { id: "nav-dock", name: "Interactive Dock", category: "Navigation", description: "Magnifying icon dock container." },
  { id: "nav-palette", name: "Command Palette", category: "Navigation", description: "Fuzzy search command navigation menu." },
];

export function PlaygroundSection() {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string>("btn-action");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Customization State
  const [themeCanvas, setThemeCanvas] = useState<ThemeCanvas>("obsidian");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("tsx");
  const [borderRadius, setBorderRadius] = useState<number>(8);
  const [size, setSize] = useState<ComponentSize>("md");
  const [compState, setCompState] = useState<ComponentState>("default");
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [customText, setCustomText] = useState<string>("EXECUTE ACTION");
  const [customSubtext, setCustomSubtext] = useState<string>("System telemetry online.");

  // View state
  const [activeView, setActiveView] = useState<"canvas" | "code" | "tokens">("canvas");
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const selectedComp = CATALOG.find((c) => c.id === selectedId) ?? CATALOG[0];

  // Helper size styles
  const sizeMap = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-sm",
  };

  const isLight = themeCanvas === "pure-light";

  // Code Generator
  const generateCode = () => {
    const r = `${borderRadius}px`;
    const bw = `${borderWidth}px`;

    switch (selectedComp.id) {
      case "btn-action":
        if (exportFormat === "html") {
          return `<button style="border-radius: ${r}; border-width: ${bw};" class="btn-action">\n  <span>${customText}</span>\n</button>`;
        }
        return `// Nawfal UI — Action Button (Monochrome)
export function ActionButton() {
  return (
    <button
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-white dark:bg-white dark:text-black ${sizeMap[size]} font-mono font-semibold transition-all hover:opacity-90 disabled:opacity-50"
      ${compState === "disabled" ? "disabled" : ""}
    >
      ${compState === "loading" ? `<Loader2 className="h-3.5 w-3.5 animate-spin" />` : ""}
      <span>${customText}</span>
      <ArrowUpRight className="h-3.5 w-3.5" />
    </button>
  );
}`;

      case "card-surface":
        return `// Nawfal UI — Surface Card (Monochrome)
export function SurfaceCard() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="flex w-full max-w-sm flex-col gap-3 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 font-mono text-xs text-neutral-900 dark:text-white"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <span className="font-bold uppercase tracking-wider">${customText}</span>
        <span className="rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 text-[9px] font-bold text-neutral-600 dark:text-neutral-400">ACTIVE</span>
      </div>
      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">${customSubtext}</p>
    </div>
  );
}`;

      case "badge-pulse":
        return `// Nawfal UI — Pulse Status Badge (Monochrome)
export function PulseStatusBadge() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-1 font-mono text-xs font-medium text-neutral-800 dark:text-neutral-200"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 animate-pulse" />
      <span>${customText}</span>
    </div>
  );
}`;

      case "input-field":
        return `// Nawfal UI — Form Input (Monochrome)
export function TextInputField() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5 font-mono text-xs">
      <label className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">${customText}</label>
      <input
        type="text"
        placeholder="${customSubtext}"
        style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
        className="w-full border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black px-3 py-2 text-neutral-900 dark:text-neutral-100 outline-none focus:border-neutral-500"
      />
    </div>
  );
}`;

      default:
        return `// Nawfal UI — ${selectedComp.name}
export function ${selectedComp.name.replace(/\s+/g, "")}() {
  return (
    <div style={{ borderRadius: "${r}" }} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 font-mono text-xs text-neutral-900 dark:text-white">
      <span>${customText}</span>
    </div>
  );
}`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopiedCode(true);
    toast({ title: "Code Copied!", description: `Copied ${selectedComp.name} snippet.` });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const categories = ["All", "Buttons", "Cards", "Inputs", "Badges", "Controls", "Navigation"];

  const filteredCatalog = activeCategory === "All"
    ? CATALOG
    : CATALOG.filter((c) => c.category === activeCategory);

  return (
    <div className="flex w-full flex-col gap-5 text-neutral-900 dark:text-neutral-100">

      {/* ─── Top Studio Bar ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white/70 backdrop-blur-md p-5 dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <Box className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>DESIGN STUDIO WORKBENCH</span>
              <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 font-semibold">
                THEME-ADAPTIVE
              </span>
            </div>
            <h3 className="mt-1.5 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Interactive Component Studio
            </h3>
            <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400 max-w-xl">
              Inspect, customize parameters, test states, and copy production-ready monochrome TSX/HTML snippets. Adaptable to both dark and light modes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Canvas Picker */}
            <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1 font-mono text-[10px] dark:border-neutral-800 dark:bg-black">
              {(["obsidian", "graphite", "pure-light"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setThemeCanvas(t)}
                  className={`rounded px-2.5 py-1 font-semibold capitalize transition-all ${
                    themeCanvas === t
                      ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {t.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Viewport Selector */}
            <div className="hidden items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-black sm:flex">
              {[
                { id: "desktop", icon: <Monitor className="h-3.5 w-3.5" /> },
                { id: "tablet",  icon: <Tablet className="h-3.5 w-3.5" /> },
                { id: "mobile",  icon: <Smartphone className="h-3.5 w-3.5" /> },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setViewport(v.id as any)}
                  className={`flex h-6 w-7 items-center justify-center rounded transition-all ${
                    viewport === v.id
                      ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white shadow-xs"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                  }`}
                >
                  {v.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Studio Grid Layout (3 Columns) ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        {/* ─── COL 1: Component Catalog (3 cols) ─────────────────────────────── */}
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 dark:border-neutral-800">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Catalog</span>
            <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500">{filteredCatalog.length} Items</span>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded px-2 py-0.5 font-mono text-[9px] font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black font-bold"
                    : "bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-black dark:text-neutral-400 dark:border-neutral-800 hover:border-neutral-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Component Item List */}
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[500px] pr-1">
            {filteredCatalog.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex items-center justify-between rounded-lg border p-2.5 text-left font-mono transition-all ${
                  selectedId === item.id
                    ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-900 dark:text-white shadow-xs"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800/80 dark:bg-black dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-200"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold">{item.name}</span>
                  <span className="text-[9px] opacity-60">{item.category}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${selectedId === item.id ? "text-white" : "text-neutral-400"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ─── COL 2: Studio Canvas & Code View (6 cols) ─────────────────────── */}
        <div className="flex flex-col gap-3 lg:col-span-6">

          {/* Canvas View Switcher */}
          <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-100 p-1 font-mono text-xs dark:border-neutral-800 dark:bg-black">
            <div className="flex gap-1">
              {[
                { id: "canvas", icon: <Eye className="h-3.5 w-3.5" />, label: "Canvas" },
                { id: "code",   icon: <Code2 className="h-3.5 w-3.5" />, label: "Code" },
                { id: "tokens", icon: <Terminal className="h-3.5 w-3.5" />, label: "Tokens" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-semibold transition-all ${
                    activeView === tab.id
                      ? "bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Grid Overlay Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-mono transition-all ${
                showGrid
                  ? "text-neutral-900 bg-white border border-neutral-300 dark:text-neutral-300 dark:bg-neutral-900 dark:border-neutral-800"
                  : "text-neutral-500"
              }`}
            >
              <Grid className="h-3 w-3" />
              <span>Grid</span>
            </button>
          </div>

          {/* View 1: Canvas */}
          {activeView === "canvas" && (
            <div
              className={`relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-xl border transition-colors ${
                themeCanvas === "pure-light"
                  ? "border-neutral-300 bg-white text-black"
                  : themeCanvas === "graphite"
                  ? "border-neutral-700 bg-neutral-900 text-white"
                  : "border-neutral-800 bg-[#050505] text-white"
              } p-6`}
              style={
                showGrid
                  ? {
                      backgroundImage: `radial-gradient(circle, ${isLight ? "#e5e5e5" : "#1f1f1f"} 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }
                  : {}
              }
            >
              {/* Header Telemetry */}
              <div className={`flex items-center justify-between border-b pb-3 font-mono text-[10px] ${isLight ? "border-neutral-200 text-neutral-500" : "border-neutral-800 text-neutral-500"}`}>
                <span className="font-bold uppercase tracking-wider">{selectedComp.name} · CANVAS</span>
                <span>W: {viewport === "desktop" ? "100%" : viewport === "tablet" ? "480px" : "320px"}</span>
              </div>

              {/* Render Area */}
              <div className="my-10 flex items-center justify-center">
                <div
                  className="flex justify-center transition-all duration-300"
                  style={{ width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "480px" : "320px" }}
                >
                  <motion.div
                    key={selectedId + borderRadius + borderWidth + size + compState + customText + customSubtext + themeCanvas}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Component Previews */}
                    {selectedComp.id === "btn-action" && (
                      <button
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        disabled={compState === "disabled"}
                        className={`inline-flex items-center gap-2 border ${
                          isLight
                            ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800"
                            : "border-neutral-200 bg-neutral-100 text-black hover:bg-neutral-200"
                        } ${sizeMap[size]} font-mono font-semibold transition-all ${
                          compState === "disabled" ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                      >
                        {compState === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        <span>{customText}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}

                    {selectedComp.id === "btn-beam" && (
                      <button
                        style={{ borderRadius: `${borderRadius}px` }}
                        className="group relative inline-flex items-center justify-center overflow-hidden p-[1px] font-mono text-xs font-semibold"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_50%,#000_100%)]" />
                        <span style={{ borderRadius: `${Math.max(2, borderRadius - 1)}px` }} className="inline-flex items-center gap-2 bg-black px-4 py-2 text-white">
                          <Zap className="h-3 w-3 text-neutral-300" />
                          {customText}
                        </span>
                      </button>
                    )}

                    {selectedComp.id === "card-surface" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex w-full max-w-sm flex-col gap-3 border p-5 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-50 text-black" : "border-neutral-800 bg-neutral-950 text-white"
                        }`}
                      >
                        <div className={`flex items-center justify-between border-b pb-3 ${isLight ? "border-neutral-200" : "border-neutral-800"}`}>
                          <span className="font-bold uppercase tracking-wider">{customText}</span>
                          <span className="rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[9px] font-bold text-neutral-300">ACTIVE</span>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-70">{customSubtext}</p>
                      </div>
                    )}

                    {selectedComp.id === "badge-pulse" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className="inline-flex items-center gap-2 border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-xs text-neutral-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-100 animate-pulse" />
                        <span>{customText}</span>
                      </div>
                    )}

                    {selectedComp.id === "input-field" && (
                      <div className="flex w-full max-w-xs flex-col gap-1.5 font-mono text-xs">
                        <label className="text-[10px] font-bold uppercase opacity-60">{customText}</label>
                        <input
                          type="text"
                          placeholder={customSubtext}
                          style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                          className={`w-full border px-3 py-2 outline-none ${
                            isLight
                              ? "border-neutral-300 bg-white text-black placeholder-neutral-400"
                              : "border-neutral-800 bg-black text-white placeholder-neutral-600"
                          }`}
                        />
                      </div>
                    )}

                    {!["btn-action", "btn-beam", "card-surface", "badge-pulse", "input-field"].includes(selectedComp.id) && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`border p-4 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-neutral-950 text-white"
                        }`}
                      >
                        <span className="font-bold">{selectedComp.name}</span>
                        <p className="mt-1 text-[11px] opacity-70">{customText}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Footer Specs */}
              <div className={`flex items-center justify-between border-t pt-3 font-mono text-[10px] ${isLight ? "border-neutral-200 text-neutral-500" : "border-neutral-800 text-neutral-500"}`}>
                <span>RADIUS: {borderRadius}PX · BORDER: {borderWidth}PX</span>
                <span className="font-bold uppercase">STATE: {compState}</span>
              </div>
            </div>
          )}

          {/* View 2: Code Output */}
          {activeView === "code" && (
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-2.5 font-mono text-xs">
                {/* Format Switcher */}
                <div className="flex gap-1 text-[10px]">
                  {(["tsx", "jsx", "html", "tailwind"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`rounded px-2 py-0.5 uppercase font-bold transition-all ${
                        exportFormat === fmt
                          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
                          : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-neutral-800 dark:text-neutral-300">
                <code>{generateCode()}</code>
              </pre>
            </div>
          )}

          {/* View 3: Tokens */}
          {activeView === "tokens" && (
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 p-4 font-mono text-xs">
              <h4 className="mb-3 font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300">Monochrome Tokens Inspection</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase">
                      <th className="pb-2">Token</th>
                      <th className="pb-2">Variable</th>
                      <th className="pb-2">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-900 text-neutral-800 dark:text-neutral-300">
                    <tr>
                      <td className="py-2 font-bold">Border Radius</td>
                      <td><code>--radius</code></td>
                      <td>{borderRadius}px</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Border Width</td>
                      <td><code>--border-width</code></td>
                      <td>{borderWidth}px</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Size Scale</td>
                      <td><code>--size-scale</code></td>
                      <td className="uppercase">{size}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Canvas Preset</td>
                      <td><code>--canvas-theme</code></td>
                      <td className="uppercase">{themeCanvas}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* ─── COL 3: Inspector Panel (3 cols) ───────────────────────────────── */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 p-4 lg:col-span-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
            <span className="font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Inspector</span>
            <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-500" />
          </div>

          {/* Radius Slider */}
          <div>
            <div className="mb-1 flex justify-between text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">
              <span>Radius</span>
              <span className="text-neutral-900 dark:text-neutral-200">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={24}
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-neutral-800 dark:accent-neutral-200"
            />
          </div>

          {/* Border Width */}
          <div>
            <div className="mb-1 flex justify-between text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">
              <span>Border Width</span>
              <span className="text-neutral-900 dark:text-neutral-200">{borderWidth}px</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3].map((bw) => (
                <button
                  key={bw}
                  onClick={() => setBorderWidth(bw)}
                  className={`rounded border py-1 text-[10px] font-bold transition-all ${
                    borderWidth === bw
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-800 dark:text-white"
                      : "border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-800 dark:bg-black dark:text-neutral-500"
                  }`}
                >
                  {bw}px
                </button>
              ))}
            </div>
          </div>

          {/* Size Scale */}
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Size Scale</label>
            <div className="grid grid-cols-3 gap-1">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded border py-1 text-[10px] font-bold uppercase transition-all ${
                    size === s
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-800 dark:text-white"
                      : "border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-800 dark:bg-black dark:text-neutral-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Component State */}
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">State Simulation</label>
            <div className="grid grid-cols-2 gap-1">
              {(["default", "loading", "disabled"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setCompState(st)}
                  className={`rounded border py-1 text-[10px] font-bold capitalize transition-all ${
                    compState === st
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-800 dark:text-white"
                      : "border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-800 dark:bg-black dark:text-neutral-500"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Content Editors */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3">
            <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Title / Label</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-black px-2.5 py-1 text-[11px] text-neutral-900 dark:text-neutral-200 outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Subtext / Desc</label>
            <input
              type="text"
              value={customSubtext}
              onChange={(e) => setCustomSubtext(e.target.value)}
              className="w-full rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-black px-2.5 py-1 text-[11px] text-neutral-900 dark:text-neutral-200 outline-none focus:border-neutral-500"
            />
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 py-2 text-xs font-bold text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-black hover:opacity-90 transition-all shadow-xs"
          >
            {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedCode ? "Copied!" : "Copy TSX Code"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
