"use client";

import React, { useState } from "react";
import { Check, Copy, Layers, Palette, Type, Sliders, Zap, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function DocsSection() {
  const { toast } = useToast();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: "Obsidian Core", hex: "#0A0A0A", bgClass: "bg-black text-white" },
    { name: "Neutral Dark", hex: "#171717", bgClass: "bg-neutral-900 text-white" },
    { name: "Subtle Surface", hex: "#262626", bgClass: "bg-neutral-800 text-white" },
    { name: "Muted Border", hex: "#404040", bgClass: "bg-neutral-700 text-white" },
    { name: "Light Surface", hex: "#FAFAFA", bgClass: "bg-neutral-100 text-black border border-neutral-300" },
    { name: "Pure White", hex: "#FFFFFF", bgClass: "bg-white text-black border border-neutral-300" },
  ];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast({
      title: "Color Hex Copied!",
      description: `${hex} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Design Manifesto */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Layers className="h-4 w-4" />
          <span>Design Philosophy & Specs</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Monochromatic Enterprise Specs v5.2.0
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          The Nawfal UI system is rooted in extreme clarity, structural contrast, and fluid micro-motion. 
          Featuring 48 components categorized across AI RAG Engines, NextGen Innovations, Spotify Music Suite, Motion Primitives, and Telemetry Badges.
          Now with instant CLI installation via <code className="rounded bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 font-mono text-[11px]">npx nawfal-ui@latest init</code>.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">1. High Contrast Luminance</h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Strict black-and-white monochromatic scale with emerald accents for live statuses.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">2. Low-Level Browser Physics</h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Hardware keypress trackers, dynamic audio visualizers, and spring-animated micro-interactions.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">3. 100% Full Source Specs</h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Every component contains standalone drop-in TSX source code with full unclipped preview viewports.
            </p>
          </div>
        </div>
      </section>

      {/* Color Tokens Swatches */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Palette className="h-4 w-4" />
          <span>Color Tokens Swatches</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Palette Tokens & Hex Codes
        </h3>

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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
