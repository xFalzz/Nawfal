"use client";

import React, { useState } from "react";
import {
  Sliders, Check, Copy, Code2, Eye, Terminal, Monitor,
  Tablet, Smartphone, RotateCcw, Box, ArrowUpRight, CheckCircle2,
  Square, Shield, Layers, Command, Grid, SlidersHorizontal,
  ChevronRight, Download, RefreshCw, Lock, Search,
  Music, Cpu, Radio, Activity, Zap, Play, Loader2, ArrowRight,
  TrendingUp, Bell, Key, Hash, LayoutGrid, ToggleLeft, ToggleRight
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
  icon: React.ReactNode;
}

const CATALOG: ComponentConfig[] = [
  // Buttons
  { id: "btn-action", name: "Action Motion Button", category: "Buttons", description: "Monochrome interactive action button with arrow icon & motion physics.", icon: <Zap className="h-3.5 w-3.5" /> },
  { id: "btn-beam", name: "Shimmer Border Beam", category: "Buttons", description: "Rotating conic-gradient animated border beam button.", icon: <Zap className="h-3.5 w-3.5" /> },
  { id: "btn-icon", name: "Icon Shortcut Command", category: "Buttons", description: "Compact icon action button with keyboard shortcut badge.", icon: <Command className="h-3.5 w-3.5" /> },
  
  // Cards
  { id: "card-surface", name: "Surface Telemetry Card", category: "Cards", description: "Structured content surface container with status indicator.", icon: <Square className="h-3.5 w-3.5" /> },
  { id: "card-metric", name: "KPI Metric Analytics", category: "Cards", description: "Analytics stat card with growth trend badge and live metric.", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "card-hud", name: "Cyber Parallax HUD", category: "Cards", description: "Corner-bracketed HUD card with animated scanning reticle.", icon: <Cpu className="h-3.5 w-3.5" /> },

  // Inputs
  { id: "input-field", name: "Text Input Field", category: "Inputs", description: "Clean form input with focus state and customizable subtext.", icon: <Search className="h-3.5 w-3.5" /> },
  { id: "input-pin", name: "OTP Security PIN Code", category: "Inputs", description: "4-box verification PIN entry layout.", icon: <Key className="h-3.5 w-3.5" /> },
  { id: "input-search", name: "Command Search Input", category: "Inputs", description: "Instant search field with shortcut trigger pill.", icon: <Command className="h-3.5 w-3.5" /> },

  // Badges
  { id: "badge-pulse", name: "Pulse Status Badge", category: "Badges", description: "Indicator badge with animated glowing pulse dot.", icon: <Activity className="h-3.5 w-3.5" /> },
  { id: "badge-radar", name: "Radar Sweep Scanner", category: "Badges", description: "Circular radar scanning status badge.", icon: <Radio className="h-3.5 w-3.5" /> },
  { id: "badge-counter", name: "Metric Counter Pill", category: "Badges", description: "Monochrome numeric count indicator pill.", icon: <Hash className="h-3.5 w-3.5" /> },

  // Controls
  { id: "ctrl-segmented", name: "Segmented Control Switch", category: "Controls", description: "Multi-option toggle switch with sliding active tab.", icon: <SlidersHorizontal className="h-3.5 w-3.5" /> },
  { id: "ctrl-toggle", name: "Compact Toggle Switch", category: "Controls", description: "Minimalist binary on/off toggle switch.", icon: <ToggleRight className="h-3.5 w-3.5" /> },

  // Navigation
  { id: "nav-dock", name: "Interactive Icon Dock", category: "Navigation", description: "Animated macOS-inspired magnifying icon dock.", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { id: "nav-palette", name: "Command Search Palette", category: "Navigation", description: "Fuzzy search command navigation bar.", icon: <Terminal className="h-3.5 w-3.5" /> },
];

export function PlaygroundSection() {
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string>("btn-action");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
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

  // Interactivity State for controls
  const [segmentedActive, setSegmentedActive] = useState<number>(0);
  const [toggleActive, setToggleActive] = useState<boolean>(true);
  const [pinCode, setPinCode] = useState<string[]>(["8", "4", "2", "0"]);

  // View state
  const [activeView, setActiveView] = useState<"canvas" | "code" | "tokens">("canvas");
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "laptop" | "tablet" | "phablet" | "mobile">("desktop");

  const selectedComp = CATALOG.find((c) => c.id === selectedId) ?? CATALOG[0];

  // Helper size styles
  const sizeMap = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-sm",
  };

  const isLight = themeCanvas === "pure-light";

  // Code Generator for ALL 16 components
  const generateCode = () => {
    const r = `${borderRadius}px`;
    const bw = `${borderWidth}px`;

    switch (selectedComp.id) {
      case "btn-action":
        if (exportFormat === "html") {
          return `<button style="border-radius: ${r}; border-width: ${bw};" class="btn-action">\n  <span>${customText}</span>\n</button>`;
        }
        return `// Nawfal UI — Action Motion Button
import { ArrowUpRight, Loader2 } from "lucide-react";

export function ActionButton() {
  return (
    <button
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-white dark:bg-white dark:text-black ${sizeMap[size]} font-mono font-semibold transition-all hover:opacity-90 disabled:opacity-40"
      ${compState === "disabled" ? "disabled" : ""}
    >
      ${compState === "loading" ? `<Loader2 className="h-3.5 w-3.5 animate-spin" />` : ""}
      <span>${customText}</span>
      <ArrowUpRight className="h-3.5 w-3.5" />
    </button>
  );
}`;

      case "btn-beam":
        return `// Nawfal UI — Shimmer Border Beam Button
import { Zap } from "lucide-react";

export function ShimmerBeamButton() {
  return (
    <button
      style={{ borderRadius: "${r}" }}
      className="group relative inline-flex items-center justify-center overflow-hidden p-[1px] font-mono text-xs font-semibold"
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_50%,#000_100%)]" />
      <span style={{ borderRadius: "calc(${r} - 1px)" }} className="inline-flex items-center gap-2 bg-neutral-950 px-5 py-2.5 text-white dark:bg-black">
        <Zap className="h-3.5 w-3.5 text-neutral-300" />
        <span>${customText}</span>
      </span>
    </button>
  );
}`;

      case "btn-icon":
        return `// Nawfal UI — Icon Shortcut Command Button
import { Command } from "lucide-react";

export function IconShortcutButton() {
  return (
    <button
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3.5 py-2 font-mono text-xs font-semibold text-neutral-900 dark:text-white"
    >
      <Command className="h-3.5 w-3.5" />
      <span>${customText}</span>
      <kbd className="rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-1.5 py-0.5 text-[9px]">⌘K</kbd>
    </button>
  );
}`;

      case "card-surface":
        return `// Nawfal UI — Surface Telemetry Card
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

      case "card-metric":
        return `// Nawfal UI — KPI Metric Analytics Card
import { TrendingUp } from "lucide-react";

export function KPIMetricCard() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="flex w-full max-w-xs flex-col gap-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 font-mono text-xs"
    >
      <div className="flex items-center justify-between text-neutral-500">
        <span className="text-[10px] uppercase font-bold tracking-wider">${customText}</span>
        <TrendingUp className="h-3.5 w-3.5 text-neutral-400" />
      </div>
      <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">99.98%</div>
      <span className="text-[10px] text-neutral-500">${customSubtext}</span>
    </div>
  );
}`;

      case "card-hud":
        return `// Nawfal UI — Cyber Parallax HUD Card
import { Cpu } from "lucide-react";

export function CyberHUDCard() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="relative flex w-full max-w-xs flex-col gap-3 overflow-hidden border border-neutral-800 bg-black p-4 font-mono text-xs text-white"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-neutral-300">
          <Cpu className="h-3.5 w-3.5" /> ${customText}
        </span>
        <span className="text-[9px] text-emerald-400 animate-pulse">● LIVE</span>
      </div>
      <p className="text-[10px] text-neutral-400 leading-relaxed">${customSubtext}</p>
    </div>
  );
}`;

      case "input-field":
        return `// Nawfal UI — Text Input Field
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

      case "input-pin":
        return `// Nawfal UI — OTP Security PIN Code Input
export function OTPPinInput() {
  return (
    <div className="flex flex-col items-center gap-2 font-mono text-xs">
      <span className="text-[10px] font-bold uppercase text-neutral-400">${customText}</span>
      <div className="flex gap-2">
        {["8","4","2","0"].map((v, i) => (
          <div
            key={i}
            style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
            className="flex h-10 w-10 items-center justify-center border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-mono text-sm font-bold text-neutral-900 dark:text-white"
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}`;

      case "input-search":
        return `// Nawfal UI — Command Search Input Bar
import { Search, Command } from "lucide-react";

export function CommandSearchInput() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="flex w-full max-w-sm items-center gap-2 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white"
    >
      <Search className="h-3.5 w-3.5 text-neutral-400" />
      <input type="text" placeholder="${customSubtext}" className="w-full bg-transparent outline-none" />
      <kbd className="rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 text-[9px]">⌘K</kbd>
    </div>
  );
}`;

      case "badge-pulse":
        return `// Nawfal UI — Pulse Status Badge
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

      case "badge-radar":
        return `// Nawfal UI — Radar Sweep Scanner Badge
import { Radio } from "lucide-react";

export function RadarSweepBadge() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 px-3 py-1 font-mono text-xs text-neutral-800 dark:text-neutral-200"
    >
      <Radio className="h-3.5 w-3.5 animate-spin text-neutral-500" />
      <span>${customText}</span>
    </div>
  );
}`;

      case "badge-counter":
        return `// Nawfal UI — Metric Counter Pill
export function MetricCounterPill() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-1 font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200"
    >
      <span className="rounded bg-black text-white dark:bg-white dark:text-black px-1.5 py-0.5 text-[9px] font-extrabold">48</span>
      <span>${customText}</span>
    </div>
  );
}`;

      case "ctrl-segmented":
        return `// Nawfal UI — Segmented Control Switch
export function SegmentedControl() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="flex border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-black p-1 font-mono text-xs"
    >
      {["Overview", "Telemetry", "Logs"].map((item, i) => (
        <button
          key={item}
          style={{ borderRadius: "calc(${r} - 2px)" }}
          className={\`px-3 py-1 font-semibold transition-all \${i === 0 ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "text-neutral-500"}\`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}`;

      case "ctrl-toggle":
        return `// Nawfal UI — Compact Toggle Switch
export function CompactToggle() {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="text-[10px] uppercase font-bold text-neutral-400">${customText}</span>
      <button
        style={{ borderRadius: "${r}" }}
        className="flex h-6 w-11 items-center rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-900 dark:bg-neutral-100 p-0.5 justify-end"
      >
        <span className="h-4.5 w-4.5 rounded-full bg-white dark:bg-black" />
      </button>
    </div>
  );
}`;

      case "nav-dock":
        return `// Nawfal UI — Interactive Icon Dock
import { Command, Terminal, Search, Zap, Layers } from "lucide-react";

export function InteractiveDock() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="flex gap-2 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2 shadow-md"
    >
      {[Command, Terminal, Search, Zap, Layers].map((Icon, i) => (
        <button key={i} className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:scale-110 transition-all">
          <Icon className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
        </button>
      ))}
    </div>
  );
}`;

      case "nav-palette":
        return `// Nawfal UI — Command Search Palette Bar
import { Terminal, Command } from "lucide-react";

export function CommandPaletteBar() {
  return (
    <div
      style={{ borderRadius: "${r}", borderWidth: "${bw}" }}
      className="flex w-full max-w-sm items-center justify-between border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 px-3 py-2 font-mono text-xs text-neutral-800 dark:text-neutral-200"
    >
      <div className="flex items-center gap-2">
        <Terminal className="h-3.5 w-3.5 text-neutral-400" />
        <span>${customText}</span>
      </div>
      <kbd className="rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-1.5 py-0.5 text-[9px]">⌘K</kbd>
    </div>
  );
}`;

      default:
        return `// Nawfal UI — Component Snippet
export function Component() {
  return (
    <div style={{ borderRadius: "${r}" }} className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 font-mono text-xs">
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

  const filteredCatalog = CATALOG.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchQuery = !q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className="flex w-full flex-col gap-5 text-neutral-900 dark:text-neutral-100">

      {/* ─── Top Studio Bar ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              <Box className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>DESIGN STUDIO WORKBENCH</span>
              <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 font-semibold">
                WIDE CANVAS MODE
              </span>
            </div>
            <h3 className="mt-1.5 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Interactive Component Studio
            </h3>
            <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400 max-w-xl">
              Select any component from the catalog, customize parameters, simulate states, and copy production-ready monochrome TSX/HTML snippets.
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
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {t.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Viewport Selector */}
            <div className="hidden items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-black sm:flex font-mono text-[10px]">
              {[
                { id: "desktop", label: "100%", icon: <Monitor className="h-3.5 w-3.5" /> },
                { id: "laptop",  label: "1024px", icon: <Monitor className="h-3 w-3 opacity-80" /> },
                { id: "tablet",  label: "768px",  icon: <Tablet className="h-3.5 w-3.5" /> },
                { id: "phablet", label: "480px",  icon: <Smartphone className="h-3 w-3 opacity-80" /> },
                { id: "mobile",  label: "360px",  icon: <Smartphone className="h-3.5 w-3.5" /> },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setViewport(v.id as any)}
                  className={`flex items-center gap-1 rounded px-2 py-1 font-semibold transition-all ${
                    viewport === v.id
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black shadow-xs font-bold"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                  }`}
                >
                  {v.icon}
                  <span className="hidden md:inline">{v.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sleek 2-Column Wide Studio Layout ──────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        {/* ─── COL 1: Catalog Browser Sidebar (3 cols) ───────────────────────── */}
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 dark:border-neutral-800">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Catalog</span>
            <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500">{filteredCatalog.length} Items</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-8 pr-3 py-1.5 font-mono text-[11px] text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-neutral-100 outline-none focus:border-neutral-400"
            />
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
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[580px] pr-1">
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
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`shrink-0 ${selectedId === item.id ? "text-white" : "text-neutral-400"}`}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-[11px] font-bold">{item.name}</span>
                    <span className="text-[9px] opacity-60">{item.category}</span>
                  </div>
                </div>
                <ChevronRight className={`h-3 w-3 shrink-0 ${selectedId === item.id ? "text-white" : "text-neutral-400"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ─── COL 2: Spacious Canvas & Horizontal Inspector Workbench (9 cols) ── */}
        <div className="flex flex-col gap-4 lg:col-span-9">

          {/* View Switcher Top Toolbar */}
          <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-100 p-1 font-mono text-xs dark:border-neutral-800 dark:bg-black overflow-x-auto no-scrollbar touch-pan-x scroll-smooth">
            <div className="flex gap-1 shrink-0">
              {[
                { id: "canvas", icon: <Eye className="h-3.5 w-3.5 shrink-0" />, label: "Wide Canvas" },
                { id: "code",   icon: <Code2 className="h-3.5 w-3.5 shrink-0" />, label: "Code Exporter" },
                { id: "tokens", icon: <Terminal className="h-3.5 w-3.5 shrink-0" />, label: "Tokens" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`shrink-0 flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-semibold whitespace-nowrap transition-all ${
                    activeView === tab.id
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {tab.icon}
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Grid Overlay Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-[10px] font-mono transition-all ${
                showGrid
                  ? "text-neutral-900 bg-white border border-neutral-300 dark:text-neutral-200 dark:bg-neutral-800 dark:border-neutral-700"
                  : "text-neutral-500"
              }`}
            >
              <Grid className="h-3 w-3" />
              <span>Grid</span>
            </button>
          </div>

          {/* View 1: Wide Canvas */}
          {activeView === "canvas" && (
            <div
              className={`relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-xl border transition-colors ${
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
                <span className="font-bold uppercase tracking-wider">{selectedComp.name} · WIDE CANVAS</span>
                <span>
                  VIEWPORT: {viewport === "desktop" ? "100% (FULL)" : viewport === "laptop" ? "1024px" : viewport === "tablet" ? "768px" : viewport === "phablet" ? "480px" : "360px"}
                </span>
              </div>

              {/* Render Area for ALL 16 COMPONENTS */}
              <div className="my-12 flex items-center justify-center">
                <div
                  className="flex justify-center transition-all duration-300 max-w-full"
                  style={{
                    width: viewport === "desktop" ? "100%" : viewport === "laptop" ? "1024px" : viewport === "tablet" ? "768px" : viewport === "phablet" ? "480px" : "360px"
                  }}
                >
                  <motion.div
                    key={selectedId + borderRadius + borderWidth + size + compState + customText + customSubtext + themeCanvas + segmentedActive + toggleActive + pinCode.join("")}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex justify-center w-full"
                  >
                    {/* 1. Action Button */}
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

                    {/* 2. Shimmer Beam */}
                    {selectedComp.id === "btn-beam" && (
                      <button
                        style={{ borderRadius: `${borderRadius}px` }}
                        className="group relative inline-flex items-center justify-center overflow-hidden p-[1px] font-mono text-xs font-semibold"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_50%,#000_100%)]" />
                        <span style={{ borderRadius: `${Math.max(2, borderRadius - 1)}px` }} className={`inline-flex items-center gap-2 px-5 py-2.5 ${isLight ? "bg-white text-black" : "bg-black text-white"}`}>
                          <Zap className={`h-3.5 w-3.5 ${isLight ? "text-neutral-700" : "text-neutral-300"}`} />
                          <span>{customText}</span>
                        </span>
                      </button>
                    )}

                    {/* 3. Icon Command Button */}
                    {selectedComp.id === "btn-icon" && (
                      <button
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs font-semibold ${
                          isLight
                            ? "border-neutral-300 bg-neutral-100 text-black"
                            : "border-neutral-800 bg-neutral-900 text-white"
                        }`}
                      >
                        <Command className="h-3.5 w-3.5" />
                        <span>{customText}</span>
                        <kbd className={`rounded border px-1.5 py-0.5 text-[9px] ${
                          isLight ? "border-neutral-300 bg-white text-black" : "border-neutral-700 bg-neutral-800 text-white"
                        }`}>⌘K</kbd>
                      </button>
                    )}

                    {/* 4. Surface Telemetry Card */}
                    {selectedComp.id === "card-surface" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex w-full max-w-sm flex-col gap-3 border p-5 font-mono text-xs ${
                          isLight
                            ? "border-neutral-300 bg-neutral-50 text-black"
                            : "border-neutral-800 bg-neutral-950 text-white"
                        }`}
                      >
                        <div className={`flex items-center justify-between border-b pb-3 ${isLight ? "border-neutral-200" : "border-neutral-800"}`}>
                          <span className="font-bold uppercase tracking-wider">{customText}</span>
                          <span className={`rounded border px-2 py-0.5 text-[9px] font-bold ${
                            isLight ? "border-neutral-300 bg-neutral-200 text-neutral-800" : "border-neutral-700 bg-neutral-900 text-neutral-300"
                          }`}>ACTIVE</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>{customSubtext}</p>
                      </div>
                    )}

                    {/* 5. KPI Metric Card */}
                    {selectedComp.id === "card-metric" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex w-full max-w-xs flex-col gap-2 border p-4 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-50 text-black" : "border-neutral-800 bg-neutral-950 text-white"
                        }`}
                      >
                        <div className={`flex items-center justify-between ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                          <span className="text-[10px] uppercase font-bold tracking-wider">{customText}</span>
                          <TrendingUp className="h-3.5 w-3.5" />
                        </div>
                        <div className="text-2xl font-extrabold">99.98%</div>
                        <span className={`text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{customSubtext}</span>
                      </div>
                    )}

                    {/* 6. Parallax HUD Card */}
                    {selectedComp.id === "card-hud" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`relative flex w-full max-w-xs flex-col gap-3 overflow-hidden border p-4 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-black text-white"
                        }`}
                      >
                        <div className={`flex items-center justify-between border-b pb-2 ${isLight ? "border-neutral-200" : "border-neutral-800"}`}>
                          <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${isLight ? "text-neutral-800" : "text-neutral-300"}`}>
                            <Cpu className="h-3.5 w-3.5" /> {customText}
                          </span>
                          <span className="text-[9px] text-emerald-500 font-bold animate-pulse">● LIVE</span>
                        </div>
                        <p className={`text-[10px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>{customSubtext}</p>
                      </div>
                    )}

                    {/* 7. Text Input Field */}
                    {selectedComp.id === "input-field" && (
                      <div className="flex w-full max-w-xs flex-col gap-1.5 font-mono text-xs">
                        <label className={`text-[10px] font-bold uppercase ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>{customText}</label>
                        <input
                          type="text"
                          placeholder={customSubtext}
                          style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                          className={`w-full border px-3 py-2 outline-none ${
                            isLight
                              ? "border-neutral-300 bg-white text-black placeholder-neutral-400 focus:border-neutral-800"
                              : "border-neutral-800 bg-black text-white placeholder-neutral-600 focus:border-neutral-400"
                          }`}
                        />
                      </div>
                    )}

                    {/* 8. OTP PIN Input */}
                    {selectedComp.id === "input-pin" && (
                      <div className="flex flex-col items-center gap-2 font-mono text-xs">
                        <span className={`text-[10px] font-bold uppercase ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>{customText}</span>
                        <div className="flex gap-2">
                          {pinCode.map((val, idx) => (
                            <input
                              key={idx}
                              type="text"
                              maxLength={1}
                              value={val}
                              onChange={(e) => {
                                const newPin = [...pinCode];
                                newPin[idx] = e.target.value;
                                setPinCode(newPin);
                              }}
                              style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                              className={`flex h-10 w-10 text-center font-bold text-sm border outline-none ${
                                isLight
                                  ? "border-neutral-300 bg-neutral-100 text-black focus:border-neutral-800"
                                  : "border-neutral-800 bg-neutral-900 text-white focus:border-neutral-400"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 9. Command Search Input */}
                    {selectedComp.id === "input-search" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex w-full max-w-sm items-center gap-2 border px-3 py-2 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-white text-black" : "border-neutral-800 bg-black text-white"
                        }`}
                      >
                        <Search className={`h-3.5 w-3.5 ${isLight ? "text-neutral-500" : "text-neutral-400"}`} />
                        <input type="text" placeholder={customSubtext} className="w-full bg-transparent outline-none" />
                        <kbd className={`rounded border px-1.5 py-0.5 text-[9px] ${
                          isLight ? "border-neutral-200 bg-neutral-100 text-neutral-700" : "border-neutral-800 bg-neutral-900 text-neutral-300"
                        }`}>⌘K</kbd>
                      </div>
                    )}

                    {/* 10. Pulse Status Badge */}
                    {selectedComp.id === "badge-pulse" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs font-medium ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-neutral-900 text-neutral-200"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isLight ? "bg-neutral-900" : "bg-neutral-100"}`} />
                        <span>{customText}</span>
                      </div>
                    )}

                    {/* 11. Radar Sweep Badge */}
                    {selectedComp.id === "badge-radar" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-neutral-950 text-neutral-200"
                        }`}
                      >
                        <Radio className={`h-3.5 w-3.5 animate-spin ${isLight ? "text-neutral-700" : "text-neutral-400"}`} />
                        <span>{customText}</span>
                      </div>
                    )}

                    {/* 12. Metric Counter Pill */}
                    {selectedComp.id === "badge-counter" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs font-bold ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-neutral-900 text-neutral-200"
                        }`}
                      >
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold ${
                          isLight ? "bg-black text-white" : "bg-white text-black"
                        }`}>48</span>
                        <span>{customText}</span>
                      </div>
                    )}

                    {/* 13. Segmented Switch */}
                    {selectedComp.id === "ctrl-segmented" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex border p-1 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-black text-white"
                        }`}
                      >
                        {["Overview", "Telemetry", "Logs"].map((item, i) => (
                          <button
                            key={item}
                            onClick={() => setSegmentedActive(i)}
                            style={{ borderRadius: `calc(${borderRadius}px - 2px)` }}
                            className={`px-3 py-1 font-semibold transition-all ${
                              segmentedActive === i
                                ? isLight
                                  ? "bg-neutral-900 text-white shadow-xs"
                                  : "bg-white text-black shadow-xs"
                                : isLight
                                ? "text-neutral-600 hover:text-black"
                                : "text-neutral-400 hover:text-white"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 14. Compact Toggle */}
                    {selectedComp.id === "ctrl-toggle" && (
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className={`text-[10px] uppercase font-bold ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>{customText}</span>
                        <button
                          onClick={() => setToggleActive(!toggleActive)}
                          style={{ borderRadius: `${borderRadius}px` }}
                          className={`flex h-6 w-11 items-center rounded-full border p-0.5 transition-all ${
                            toggleActive
                              ? isLight
                                ? "border-neutral-900 bg-neutral-900 justify-end"
                                : "border-neutral-100 bg-neutral-100 justify-end"
                              : isLight
                              ? "border-neutral-300 bg-neutral-200 justify-start"
                              : "border-neutral-800 bg-neutral-900 justify-start"
                          }`}
                        >
                          <span className={`h-4.5 w-4.5 rounded-full ${
                            toggleActive
                              ? isLight ? "bg-white" : "bg-black"
                              : isLight ? "bg-neutral-500" : "bg-neutral-600"
                          }`} />
                        </button>
                      </div>
                    )}

                    {/* 15. Interactive Dock (BUG FIXED: Theme-adaptive icons inside dock) */}
                    {selectedComp.id === "nav-dock" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex gap-2 border p-2 shadow-md ${
                          isLight ? "border-neutral-300 bg-neutral-100" : "border-neutral-800 bg-neutral-950"
                        }`}
                      >
                        {[Command, Terminal, Search, Zap, Layers].map((IconComp, i) => (
                          <button
                            key={i}
                            className={`flex h-9 w-9 items-center justify-center rounded border hover:scale-110 transition-all ${
                              isLight
                                ? "border-neutral-300 bg-white text-black hover:border-neutral-500"
                                : "border-neutral-800 bg-neutral-900 text-white hover:border-neutral-600"
                            }`}
                          >
                            <IconComp className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 16. Command Palette Bar */}
                    {selectedComp.id === "nav-palette" && (
                      <div
                        style={{ borderRadius: `${borderRadius}px`, borderWidth: `${borderWidth}px` }}
                        className={`flex w-full max-w-sm items-center justify-between border px-3 py-2 font-mono text-xs ${
                          isLight ? "border-neutral-300 bg-neutral-100 text-black" : "border-neutral-800 bg-neutral-950 text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Terminal className={`h-3.5 w-3.5 ${isLight ? "text-neutral-500" : "text-neutral-400"}`} />
                          <span>{customText}</span>
                        </div>
                        <kbd className={`rounded border px-1.5 py-0.5 text-[9px] ${
                          isLight ? "border-neutral-300 bg-white text-neutral-700" : "border-neutral-800 bg-neutral-900 text-neutral-300"
                        }`}>⌘K</kbd>
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

          {/* ─── HORIZONTAL INSPECTOR WORKBENCH PANEL (Below Canvas) ──────────── */}
          <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 p-4 font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-500" />
                <span className="font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  Studio Inspector Controls
                </span>
              </div>
              <span className="text-[10px] text-neutral-400">Live Parameters</span>
            </div>

            {/* Row 1: Geometry & Simulation Parameters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Radius Slider */}
              <div className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800/80 dark:bg-black">
                <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">
                  <span>Border Radius</span>
                  <span className="text-neutral-900 dark:text-neutral-200">{borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={24}
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full accent-neutral-800 dark:accent-neutral-200 mt-1"
                />
              </div>

              {/* Border Width */}
              <div className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800/80 dark:bg-black">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Border Width</span>
                <div className="grid grid-cols-3 gap-1 mt-0.5">
                  {[1, 2, 3].map((bw) => (
                    <button
                      key={bw}
                      onClick={() => setBorderWidth(bw)}
                      className={`rounded border py-1 text-[10px] font-bold transition-all ${
                        borderWidth === bw
                          ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-100 dark:text-black font-bold"
                          : "border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 hover:border-neutral-400"
                      }`}
                    >
                      {bw}px
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Scale */}
              <div className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800/80 dark:bg-black">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Size Scale</span>
                <div className="grid grid-cols-3 gap-1 mt-0.5">
                  {(["sm", "md", "lg"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded border py-1 text-[10px] font-bold uppercase transition-all ${
                        size === s
                          ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-100 dark:text-black font-bold"
                          : "border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 hover:border-neutral-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Component State */}
              <div className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800/80 dark:bg-black">
                <span className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">State Simulation</span>
                <div className="grid grid-cols-3 gap-1 mt-0.5">
                  {(["default", "loading", "disabled"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setCompState(st)}
                      className={`rounded border py-1 text-[10px] font-bold capitalize transition-all ${
                        compState === st
                          ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-200 dark:bg-neutral-100 dark:text-black font-bold"
                          : "border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 hover:border-neutral-400"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Row 2: Content Text Inputs & Action */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 items-end border-t border-neutral-200 dark:border-neutral-800 pt-3">
              <div className="sm:col-span-4 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Title / Label Text</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-black px-3 py-1.5 text-[11px] text-neutral-900 dark:text-neutral-200 outline-none focus:border-neutral-500"
                />
              </div>

              <div className="sm:col-span-5 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Subtext / Description</label>
                <input
                  type="text"
                  value={customSubtext}
                  onChange={(e) => setCustomSubtext(e.target.value)}
                  className="w-full rounded border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-black px-3 py-1.5 text-[11px] text-neutral-900 dark:text-neutral-200 outline-none focus:border-neutral-500"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  onClick={handleCopyCode}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 py-2 text-xs font-bold text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-black hover:opacity-90 transition-all shadow-xs"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy TSX Code"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
