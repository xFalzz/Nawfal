"use client";

import React, { useState } from "react";
import { Sparkles, Sliders, Check, Copy, Terminal, RefreshCw, Palette, Layers, Code2, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PlaygroundSection() {
  const { toast } = useToast();
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "cyber">("dark");
  const [accentColor, setAccentColor] = useState<"sky" | "emerald" | "amber" | "indigo" | "rose">("sky");
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [copiedCliCmd, setCopiedCliCmd] = useState(false);

  const accentColorMap = {
    sky: "text-sky-400 border-sky-400 bg-sky-500/10",
    emerald: "text-emerald-400 border-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 border-amber-400 bg-amber-500/10",
    indigo: "text-indigo-400 border-indigo-400 bg-indigo-500/10",
    rose: "text-rose-400 border-rose-400 bg-rose-500/10",
  };

  const generatedConfig = `{
  "$schema": "https://nawfal.vercel.app/schema.json",
  "version": "5.2.0",
  "style": "${themeMode}-custom",
  "accent": "${accentColor}",
  "borderRadius": "${borderRadius}px",
  "aliases": {
    "components": "@/components/uikit",
    "utils": "@/lib/utils"
  }
}`;

  const cliCmd = `npx nawfal-ui@latest init --style=${themeMode} --accent=${accentColor}`;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(generatedConfig);
    setCopiedConfig(true);
    toast({
      title: "Config Copied!",
      description: "Copied nawfal-ui.json configuration to clipboard.",
    });
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCmd);
    setCopiedCliCmd(true);
    toast({
      title: "CLI Command Copied!",
      description: "Copied customized CLI init command.",
    });
    setTimeout(() => setCopiedCliCmd(false), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Sparkles className="h-4 w-4" />
          <span>Interactive Playground & Theme Studio</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Live Theme & CLI Config Generator
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Customize design system tokens, border radii, accent themes, and generate custom `nawfal-ui.json` configuration files in real time.
        </p>
      </section>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Controls Panel */}
        <div className="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-sky-400" /> Studio Parameters
          </h4>

          {/* Theme Mode Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Theme Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "dark", label: "Obsidian Dark" },
                { id: "light", label: "Pure Light" },
                { id: "cyber", label: "Cyberpunk Glow" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeMode(t.id as any)}
                  className={`rounded-lg border p-2 text-[10px] font-mono font-bold uppercase transition-all ${
                    themeMode === t.id
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-sm"
                      : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Picker */}
          <div>
            <label className="block text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Accent Highlight Color</label>
            <div className="flex items-center gap-2">
              {[
                { id: "sky", bg: "bg-sky-400" },
                { id: "emerald", bg: "bg-emerald-400" },
                { id: "amber", bg: "bg-amber-400" },
                { id: "indigo", bg: "bg-indigo-400" },
                { id: "rose", bg: "bg-rose-400" }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAccentColor(c.id as any)}
                  className={`h-7 w-7 rounded-full transition-all flex items-center justify-center ${c.bg} ${
                    accentColor === c.id ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {accentColor === c.id && <Check className="h-3.5 w-3.5 text-black font-bold" />}
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              <span>Border Corner Radius</span>
              <span className="font-mono text-neutral-400">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min={2}
              max={24}
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          {/* Custom CLI Command Copy */}
          <div className="mt-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3 font-mono text-[11px]">
            <div className="flex justify-between items-center text-[10px] text-neutral-400 mb-1">
              <span>CUSTOM CLI COMMAND</span>
              <button onClick={handleCopyCli} className="flex items-center gap-1 text-sky-400 hover:underline">
                {copiedCliCmd ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCliCmd ? "Copied" : "Copy Command"}</span>
              </button>
            </div>
            <p className="text-white truncate">{cliCmd}</p>
          </div>
        </div>

        {/* Live Preview & Config Output */}
        <div className="flex flex-col gap-5 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Palette className="h-4 w-4 text-emerald-400" /> Real-time Live Preview
          </h4>

          {/* Simulated Component Preview Box */}
          <div 
            style={{ borderRadius: `${borderRadius}px` }}
            className={`flex w-full flex-col gap-3 border p-4 transition-all ${
              themeMode === "light" 
                ? "bg-neutral-100 border-neutral-300 text-black" 
                : themeMode === "cyber" 
                ? "bg-black border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white" 
                : "bg-neutral-950 border-neutral-800 text-white"
            }`}
          >
            <div className="flex justify-between items-center border-b border-neutral-800/50 pb-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${accentColorMap[accentColor]}`}>
                LIVE THEME DEMO
              </span>
              <span className="text-[9px] font-mono opacity-70">RADIUS: {borderRadius}px</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Nawfal UI components dynamically inherit your design system theme tokens and corner radii.
            </p>
            <button 
              style={{ borderRadius: `${Math.max(4, borderRadius - 4)}px` }}
              className={`w-full py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                accentColorMap[accentColor]
              }`}
            >
              Custom Styled Action
            </button>
          </div>

          {/* Config File Code Output */}
          <div className="relative rounded-lg border border-neutral-800 bg-neutral-900 p-3 font-mono text-[11px]">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-2 text-[10px] text-neutral-400">
              <span>nawfal-ui.json</span>
              <button onClick={handleCopyConfig} className="flex items-center gap-1 text-emerald-400 hover:underline">
                {copiedConfig ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedConfig ? "Copied" : "Copy Config"}</span>
              </button>
            </div>
            <pre className="text-neutral-300 overflow-x-auto text-[10px] leading-relaxed">
              <code>{generatedConfig}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
