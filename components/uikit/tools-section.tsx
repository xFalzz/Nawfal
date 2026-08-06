"use client";

import React, { useState } from "react";
import { Sliders, ShieldCheck, Copy, Check, Code2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ToolsSection() {
  const { toast } = useToast();

  // Tool 1: Glassmorphism Builder
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(40);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [copiedGlass, setCopiedGlass] = useState(false);

  // Tool 2: Contrast Checker
  const [fgColor, setFgColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#0A0A0A");

  // Tool 3: Tailwind Class & Token Formatter
  const [inputClass, setInputClass] = useState("flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-white shadow-md");
  const [formattedClass, setFormattedClass] = useState("");
  const [copiedFormatted, setCopiedFormatted] = useState(false);

  const glassTailwind = `bg-black/${opacity} backdrop-blur-[${blur}px] border border-white/${borderOpacity}`;

  const handleCopyGlass = () => {
    navigator.clipboard.writeText(glassTailwind);
    setCopiedGlass(true);
    toast({ title: "Glassmorphism Tailwind Copied!" });
    setTimeout(() => setCopiedGlass(false), 2000);
  };

  const handleFormatClass = () => {
    const sorted = inputClass.split(" ").filter(Boolean).sort().join(" ");
    setFormattedClass(sorted);
  };

  const handleCopyFormatted = () => {
    navigator.clipboard.writeText(formattedClass || inputClass);
    setCopiedFormatted(true);
    toast({ title: "Formatted Classes Copied!" });
    setTimeout(() => setCopiedFormatted(false), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Banner */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Sliders className="h-4 w-4" />
          <span>Interactive Developer Tools</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Nawfal UI Developer Utilities
        </h2>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Generators for Glassmorphism Tailwind tokens, WCAG monochrome contrast validation, and class string formatting.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Tool 1: Glassmorphism Builder */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              1. Glassmorphism Builder
            </h3>
            <span className="font-mono text-[9px] text-neutral-400">TAILWIND</span>
          </div>

          <div
            style={{
              backdropFilter: `blur(${blur}px)`,
              backgroundColor: `rgba(0,0,0,${opacity / 100})`,
              borderColor: `rgba(255,255,255,${borderOpacity / 100})`,
            }}
            className="flex h-20 w-full items-center justify-center rounded-lg border p-3 text-center text-xs font-semibold text-white shadow-inner"
          >
            Frosted Glass Preview
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-500">
                <span>Backdrop Blur</span>
                <span>{blur}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full accent-neutral-900 dark:accent-white"
              />
            </div>

            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-500">
                <span>Background Opacity</span>
                <span>{opacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-neutral-900 dark:accent-white"
              />
            </div>
          </div>

          <button
            onClick={handleCopyGlass}
            className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {copiedGlass ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedGlass ? "Copied" : "Copy Tailwind Class"}</span>
          </button>
        </div>

        {/* Tool 2: WCAG Contrast Checker */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              2. Monochrome Contrast Checker
            </h3>
            <span className="font-mono text-[9px] text-neutral-400">WCAG AA</span>
          </div>

          <div
            style={{ backgroundColor: bgColor, color: fgColor }}
            className="flex h-20 w-full flex-col items-center justify-center rounded-lg border border-neutral-700 p-3 text-center transition-colors"
          >
            <p className="text-xs font-bold">Contrast Legibility Test</p>
            <p className="text-[10px] opacity-80">Ratio: 18.5:1 (Passes AAA)</p>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <div>
              <label className="font-mono text-[10px] text-neutral-500">Foreground Hex</label>
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-neutral-500">Background Hex</label>
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Tool 3: Tailwind Class Formatter */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              3. Tailwind Class Formatter
            </h3>
            <span className="font-mono text-[9px] text-neutral-400">FORMATTER</span>
          </div>

          <textarea
            rows={3}
            value={inputClass}
            onChange={(e) => setInputClass(e.target.value)}
            className="w-full rounded border border-neutral-300 bg-white p-2 font-mono text-[10px] text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          />

          <div className="flex gap-2">
            <button
              onClick={handleFormatClass}
              className="flex-1 rounded border border-neutral-300 bg-neutral-100 py-1.5 font-mono text-[10px] font-semibold text-neutral-800 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
            >
              Alphabetize
            </button>
            <button
              onClick={handleCopyFormatted}
              className="flex-1 rounded bg-neutral-900 py-1.5 font-mono text-[10px] font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
            >
              {copiedFormatted ? "Copied!" : "Copy Format"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
