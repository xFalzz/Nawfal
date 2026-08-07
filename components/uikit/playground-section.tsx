"use client";

import React, { useState } from "react";
import {
  Sliders, Check, Copy, Code2, Eye, Terminal, Monitor,
  Tablet, Smartphone, RotateCcw, Box, ArrowUpRight, CheckCircle2,
  Square, Shield, Layers, Command
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// ─── Direct Self-Contained Preview Components (Strict Monochrome) ─────────────

function StudioButton({ label, radius, variant, shadow }: { label: string; radius: number; variant: string; shadow: boolean }) {
  return (
    <button
      style={{ borderRadius: `${radius}px` }}
      className={`group relative inline-flex items-center justify-center gap-2 border px-5 py-2.5 font-mono text-xs font-semibold transition-all ${
        shadow ? "shadow-md shadow-black/40" : ""
      } ${
        variant === "solid"
          ? "border-neutral-100 bg-neutral-100 text-black hover:bg-neutral-200"
          : variant === "outline"
          ? "border-neutral-700 bg-neutral-950 text-neutral-100 hover:border-neutral-400 hover:bg-neutral-900"
          : "border-neutral-800 bg-black text-neutral-300 hover:text-white hover:border-neutral-600"
      }`}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
}

function StudioCard({ title, subtitle, radius }: { title: string; subtitle: string; radius: number }) {
  return (
    <div
      style={{ borderRadius: `${radius}px` }}
      className="flex w-full max-w-sm flex-col gap-3 border border-neutral-800 bg-neutral-950 p-5 font-mono text-xs text-white"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Square className="h-3.5 w-3.5 text-neutral-400" />
          <span className="font-bold tracking-wider text-neutral-200 uppercase">{title}</span>
        </div>
        <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[9px] font-bold text-neutral-400">ACTIVE</span>
      </div>
      <p className="text-[11px] leading-relaxed text-neutral-400">{subtitle}</p>
      <div className="flex items-center justify-between border-t border-neutral-800 pt-3 text-[10px] text-neutral-500">
        <span>TOKEN: MONOCHROME</span>
        <span>v5.2.0</span>
      </div>
    </div>
  );
}

function StudioBadge({ text, radius }: { text: string; radius: number }) {
  return (
    <div
      style={{ borderRadius: `${radius}px` }}
      className="inline-flex items-center gap-2 border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-xs font-medium text-neutral-200"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-100 animate-pulse" />
      <span>{text}</span>
    </div>
  );
}

function StudioInput({ label, placeholder, radius }: { label: string; placeholder: string; radius: number }) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5 font-mono text-xs">
      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        style={{ borderRadius: `${radius}px` }}
        className="w-full border border-neutral-800 bg-black px-3 py-2 text-neutral-100 placeholder-neutral-600 outline-none focus:border-neutral-400"
      />
    </div>
  );
}

// ─── Component Registry for Studio ───────────────────────────────────────────
const STUDIO_ITEMS = [
  {
    id: "button",
    name: "Action Button",
    category: "Elements",
    description: "Monochrome button with configurable border radius, variants, and spring physics.",
  },
  {
    id: "card",
    name: "Surface Card",
    category: "Layout",
    description: "Structured content surface container with clean borders and telemetry badge.",
  },
  {
    id: "badge",
    name: "Status Indicator",
    category: "Elements",
    description: "Minimalist status indicator badge with pulse state dot.",
  },
  {
    id: "input",
    name: "Form Field",
    category: "Forms",
    description: "Monochrome dark mode input field with subtle focus states.",
  },
];

export function PlaygroundSection() {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState("button");
  const [borderRadius, setBorderRadius] = useState(8);
  const [buttonVariant, setButtonVariant] = useState<"solid" | "outline" | "ghost">("solid");
  const [buttonLabel, setButtonLabel] = useState("EXECUTE COMMAND");
  const [cardTitle, setCardTitle] = useState("TELEMETRY NODE");
  const [cardDesc, setCardDesc] = useState("High-precision monochrome surface component for modern interfaces.");
  const [badgeText, setBadgeText] = useState("SYSTEM OPERATIONAL");
  const [inputLabel, setInputLabel] = useState("API SECRET KEY");
  const [inputPlaceholder, setInputPlaceholder] = useState("nwfl_live_89f3a...");
  const [enableShadow, setEnableShadow] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "tokens">("preview");
  const [copiedCode, setCopiedCode] = useState(false);

  const currentItem = STUDIO_ITEMS.find((i) => i.id === selectedItem) ?? STUDIO_ITEMS[0];

  // Code Generation
  const generateCode = () => {
    if (selectedItem === "button") {
      return `// Nawfal UI — Action Button (Monochrome)
export function ActionButton() {
  return (
    <button
      style={{ borderRadius: "${borderRadius}px" }}
      className="${
        buttonVariant === "solid"
          ? "border border-neutral-100 bg-neutral-100 text-black hover:bg-neutral-200"
          : buttonVariant === "outline"
          ? "border border-neutral-700 bg-neutral-950 text-neutral-100 hover:border-neutral-400"
          : "border border-neutral-800 bg-black text-neutral-300 hover:text-white"
      } ${enableShadow ? "shadow-md shadow-black/40" : ""} inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-semibold transition-all"
    >
      <span>${buttonLabel}</span>
    </button>
  );
}`;
    }

    if (selectedItem === "card") {
      return `// Nawfal UI — Surface Card (Monochrome)
export function SurfaceCard() {
  return (
    <div
      style={{ borderRadius: "${borderRadius}px" }}
      className="flex w-full max-w-sm flex-col gap-3 border border-neutral-800 bg-neutral-950 p-5 font-mono text-xs text-white"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <span className="font-bold tracking-wider text-neutral-200 uppercase">${cardTitle}</span>
        <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[9px] font-bold text-neutral-400">ACTIVE</span>
      </div>
      <p className="text-[11px] leading-relaxed text-neutral-400">${cardDesc}</p>
    </div>
  );
}`;
    }

    if (selectedItem === "badge") {
      return `// Nawfal UI — Status Badge (Monochrome)
export function StatusBadge() {
  return (
    <div
      style={{ borderRadius: "${borderRadius}px" }}
      className="inline-flex items-center gap-2 border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-xs font-medium text-neutral-200"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-100 animate-pulse" />
      <span>${badgeText}</span>
    </div>
  );
}`;
    }

    return `// Nawfal UI — Form Field (Monochrome)
export function FormField() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5 font-mono text-xs">
      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">${inputLabel}</label>
      <input
        type="text"
        placeholder="${inputPlaceholder}"
        style={{ borderRadius: "${borderRadius}px" }}
        className="w-full border border-neutral-800 bg-black px-3 py-2 text-neutral-100 placeholder-neutral-600 outline-none focus:border-neutral-400"
      />
    </div>
  );
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopiedCode(true);
    toast({ title: "Code Copied!", description: "Snippet copied to clipboard." });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-5 text-neutral-100">

      {/* ─── Header Banner (Monochrome Minimalist) ─────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              <Box className="h-3.5 w-3.5 text-neutral-300" />
              <span>DESIGN STUDIO WORKBENCH</span>
              <span className="rounded border border-neutral-800 bg-black px-2 py-0.5 text-neutral-300">MONOCHROME</span>
            </div>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">Component Design Studio</h3>
            <p className="mt-1 max-w-lg text-xs leading-relaxed text-neutral-400">
              Configure, inspect, and export ultra-clean monochrome UI components. Adjust parameters live with instant code generation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-black p-1">
              {[
                { id: "desktop", icon: <Monitor className="h-3.5 w-3.5" /> },
                { id: "tablet",  icon: <Tablet className="h-3.5 w-3.5" /> },
                { id: "mobile",  icon: <Smartphone className="h-3.5 w-3.5" /> },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setViewport(v.id as any)}
                  className={`flex h-7 w-8 items-center justify-center rounded transition-all ${
                    viewport === v.id ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {v.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Workbench Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

        {/* ─── Left Sidebar: Component Selector & Controls (4 cols) ─────────── */}
        <div className="flex flex-col gap-5 rounded-xl border border-neutral-800 bg-neutral-950 p-5 lg:col-span-4">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 font-mono text-xs font-bold uppercase tracking-wider text-neutral-300">
            <Sliders className="h-4 w-4 text-neutral-400" />
            <span>Studio Parameters</span>
          </div>

          {/* Selector */}
          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Select Component
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STUDIO_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className={`rounded-lg border p-2.5 text-left font-mono text-[11px] font-semibold transition-all ${
                    selectedItem === item.id
                      ? "border-neutral-200 bg-neutral-900 text-white shadow-sm"
                      : "border-neutral-800 bg-black text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {selectedItem === item.id && <Check className="h-3 w-3 text-neutral-200" />}
                  </div>
                  <span className="mt-1 block text-[9px] font-normal text-neutral-500">{item.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <div className="mb-1 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              <span>Border Radius</span>
              <span className="text-neutral-200">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={24}
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-neutral-200"
            />
            <div className="mt-1 flex justify-between font-mono text-[9px] text-neutral-500">
              <span>0px (Sharp)</span>
              <span>24px (Rounded)</span>
            </div>
          </div>

          {/* Component Specific Controls */}
          {selectedItem === "button" && (
            <div className="flex flex-col gap-3 border-t border-neutral-800 pt-3">
              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Button Variant</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["solid", "outline", "ghost"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setButtonVariant(v)}
                      className={`rounded border py-1 font-mono text-[10px] font-semibold uppercase transition-all ${
                        buttonVariant === v
                          ? "border-neutral-200 bg-neutral-800 text-white"
                          : "border-neutral-800 bg-black text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Label Text</label>
                <input
                  type="text"
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                  className="w-full rounded border border-neutral-800 bg-black px-2.5 py-1.5 font-mono text-[11px] text-neutral-200 outline-none focus:border-neutral-400"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Enable Shadow</span>
                <button
                  onClick={() => setEnableShadow(!enableShadow)}
                  className={`h-5 w-9 rounded-full border p-0.5 transition-all ${
                    enableShadow ? "border-neutral-400 bg-neutral-700 justify-end" : "border-neutral-800 bg-black justify-start"
                  } flex items-center`}
                >
                  <span className="h-3.5 w-3.5 rounded-full bg-white" />
                </button>
              </div>
            </div>
          )}

          {selectedItem === "card" && (
            <div className="flex flex-col gap-3 border-t border-neutral-800 pt-3">
              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Card Title</label>
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="w-full rounded border border-neutral-800 bg-black px-2.5 py-1.5 font-mono text-[11px] text-neutral-200 outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
                <textarea
                  value={cardDesc}
                  onChange={(e) => setCardDesc(e.target.value)}
                  rows={2}
                  className="w-full rounded border border-neutral-800 bg-black px-2.5 py-1.5 font-mono text-[11px] text-neutral-200 outline-none focus:border-neutral-400"
                />
              </div>
            </div>
          )}

          {selectedItem === "badge" && (
            <div className="flex flex-col gap-3 border-t border-neutral-800 pt-3">
              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Badge Text</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full rounded border border-neutral-800 bg-black px-2.5 py-1.5 font-mono text-[11px] text-neutral-200 outline-none focus:border-neutral-400"
                />
              </div>
            </div>
          )}

          {selectedItem === "input" && (
            <div className="flex flex-col gap-3 border-t border-neutral-800 pt-3">
              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Field Label</label>
                <input
                  type="text"
                  value={inputLabel}
                  onChange={(e) => setInputLabel(e.target.value)}
                  className="w-full rounded border border-neutral-800 bg-black px-2.5 py-1.5 font-mono text-[11px] text-neutral-200 outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">Placeholder</label>
                <input
                  type="text"
                  value={inputPlaceholder}
                  onChange={(e) => setInputPlaceholder(e.target.value)}
                  className="w-full rounded border border-neutral-800 bg-black px-2.5 py-1.5 font-mono text-[11px] text-neutral-200 outline-none focus:border-neutral-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* ─── Right: Canvas & View Switcher (8 cols) ───────────────────────── */}
        <div className="flex flex-col gap-4 lg:col-span-8">

          {/* View Tab Switcher */}
          <div className="flex rounded-lg border border-neutral-800 bg-black p-1 font-mono text-xs">
            {[
              { id: "preview", icon: <Eye className="h-3.5 w-3.5" />, label: "Live Canvas" },
              { id: "code",    icon: <Code2 className="h-3.5 w-3.5" />, label: "Generated TSX" },
              { id: "tokens",  icon: <Terminal className="h-3.5 w-3.5" />, label: "Design Tokens" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-1 items-center justify-center gap-2 rounded py-1.5 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-neutral-800 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Live Preview Canvas */}
          {activeTab === "preview" && (
            <div className="flex min-h-[380px] flex-1 flex-col justify-between overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0a] p-6"
              style={{ backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            >
              {/* Canvas Header */}
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 font-mono text-[10px] text-neutral-500">
                <span className="uppercase tracking-wider font-bold text-neutral-400">STUDIO CANVAS · MONOCHROME</span>
                <span>VIEWPORT: {viewport.toUpperCase()}</span>
              </div>

              {/* Render Area */}
              <div className="my-8 flex items-center justify-center">
                <div
                  className="flex justify-center transition-all duration-300"
                  style={{
                    width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "480px" : "320px",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedItem + borderRadius + buttonVariant + buttonLabel + cardTitle + badgeText + inputLabel + enableShadow}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      {selectedItem === "button" && (
                        <StudioButton label={buttonLabel} radius={borderRadius} variant={buttonVariant} shadow={enableShadow} />
                      )}
                      {selectedItem === "card" && (
                        <StudioCard title={cardTitle} subtitle={cardDesc} radius={borderRadius} />
                      )}
                      {selectedItem === "badge" && (
                        <StudioBadge text={badgeText} radius={borderRadius} />
                      )}
                      {selectedItem === "input" && (
                        <StudioInput label={inputLabel} placeholder={inputPlaceholder} radius={borderRadius} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Canvas Footer */}
              <div className="flex items-center justify-between border-t border-neutral-800/80 pt-3 font-mono text-[10px] text-neutral-500">
                <span>{currentItem.description}</span>
                <span className="font-bold text-neutral-300">BORDER-RADIUS: {borderRadius}PX</span>
              </div>
            </div>
          )}

          {/* Tab 2: Generated Code */}
          {activeTab === "code" && (
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
              <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5 font-mono text-xs">
                <span className="text-neutral-400">ComponentSnippet.tsx</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-200 hover:bg-neutral-800 transition-all"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-neutral-100" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy Snippet"}</span>
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-neutral-300">
                <code>{generateCode()}</code>
              </pre>
            </div>
          )}

          {/* Tab 3: Design Tokens Table */}
          {activeTab === "tokens" && (
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs">
              <h4 className="mb-3 font-bold uppercase tracking-wider text-neutral-300">Monochrome Design System Tokens</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-500 uppercase">
                      <th className="pb-2">Token Name</th>
                      <th className="pb-2">CSS Variable</th>
                      <th className="pb-2">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    <tr>
                      <td className="py-2 font-bold">Background Surface</td>
                      <td><code>--bg-surface</code></td>
                      <td className="text-neutral-400">#0a0a0a</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Border Subtle</td>
                      <td><code>--border-subtle</code></td>
                      <td className="text-neutral-400">#262626 (neutral-800)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Text Primary</td>
                      <td><code>--text-primary</code></td>
                      <td className="text-neutral-400">#ffffff</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Text Muted</td>
                      <td><code>--text-muted</code></td>
                      <td className="text-neutral-400">#a3a3a3 (neutral-400)</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Active Radius</td>
                      <td><code>--radius-active</code></td>
                      <td className="text-neutral-400">{borderRadius}px</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
