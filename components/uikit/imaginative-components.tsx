"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Copy, 
  Activity, 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw,
  Sliders,
  CheckCircle2,
  Gauge
} from "lucide-react";

// ─── 1. Live Color Palette Picker & Tint Generator ────────────────────────────
export function ColorPalettePicker() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const palette = [
    { name: "Obsidian", hex: "#0A0A0A", isDark: true },
    { name: "Charcoal", hex: "#171717", isDark: true },
    { name: "Zinc Muted", hex: "#262626", isDark: true },
    { name: "Border Neutral", hex: "#404040", isDark: true },
    { name: "Pure White", hex: "#FFFFFF", isDark: false },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 font-mono text-[10px] shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-800">
        <span className="font-bold text-neutral-900 dark:text-white">Palette Generator</span>
        <span className="text-[8px] text-neutral-400">Click to Copy</span>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {palette.map((p, i) => (
          <button
            key={i}
            onClick={() => handleCopy(p.hex)}
            style={{ backgroundColor: p.hex }}
            className={`group relative h-8 rounded border border-neutral-700/30 transition-transform active:scale-95 flex items-center justify-center ${
              p.isDark ? "text-white" : "text-black"
            }`}
          >
            {copiedHex === p.hex ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <span className="text-[7px] font-bold opacity-0 group-hover:opacity-100">{p.hex}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 2. Live BPM Metronome Ticker ─────────────────────────────────────────────
export function LiveBpmMetronome() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = (60 / bpm) * 1000;
    const interval = setInterval(() => {
      setBeat((prev) => (prev >= 4 ? 1 : prev + 1));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, bpm]);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-800">
        <span className="font-bold text-neutral-900 dark:text-white">BPM Metronome</span>
        <span className="text-[9px] font-bold text-neutral-500">{bpm} BPM</span>
      </div>

      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((b) => (
            <div
              key={b}
              className={`h-4 w-4 rounded-full border flex items-center justify-center font-bold text-[8px] transition-all ${
                beat === b && isPlaying
                  ? "border-white bg-neutral-900 text-white dark:bg-white dark:text-black scale-110"
                  : "border-neutral-300 bg-neutral-100 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900"
              }`}
            >
              {b}
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-6 px-2.5 items-center justify-center gap-1 rounded bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-[9px]"
        >
          {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
          <span>{isPlaying ? "Stop" : "Start"}</span>
        </button>
      </div>
    </div>
  );
}

// ─── 3. Interactive Terminal Build Task Runner ────────────────────────────────
export function TerminalTaskRunner() {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const startBuild = () => {
    setStatus("running");
    setLogs(["$ npm run build"]);
    setTimeout(() => setLogs((prev) => [...prev, "✔ Compiling App Router..."]), 500);
    setTimeout(() => setLogs((prev) => [...prev, "✔ Generating static pages (36/36)..."]), 1000);
    setTimeout(() => {
      setLogs((prev) => [...prev, "✔ Production Build Success!"]);
      setStatus("done");
    }, 1500);
  };

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 font-mono text-[10px] text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1">
        <span className="flex items-center gap-1 font-bold text-neutral-300">
          <Terminal className="h-3 w-3" /> Build Runner
        </span>
        {status === "idle" && (
          <button
            onClick={startBuild}
            className="rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5 text-[8px] text-white hover:bg-neutral-700"
          >
            Run Build
          </button>
        )}
        {status === "running" && <span className="animate-pulse text-[8px] text-amber-400">Building...</span>}
        {status === "done" && (
          <button
            onClick={startBuild}
            className="flex items-center gap-1 text-[8px] text-emerald-400 underline"
          >
            <CheckCircle2 className="h-2.5 w-2.5" /> Re-run
          </button>
        )}
      </div>

      <div className="min-h-[40px] text-[9px] leading-tight text-neutral-400 space-y-0.5">
        {logs.length === 0 ? (
          <span className="text-neutral-600">Click &apos;Run Build&apos; to trigger script...</span>
        ) : (
          logs.map((l, i) => <div key={i}>{l}</div>)
        )}
      </div>
    </div>
  );
}

// ─── 4. Live FPS & Performance Monitor ────────────────────────────────────────
export function LiveFpsPerformanceMonitor() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const loop = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(loop);
    };

    const handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1 rounded-lg border border-neutral-300 bg-white p-2.5 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-800">
        <span className="flex items-center gap-1 font-bold text-neutral-900 dark:text-white">
          <Gauge className="h-3 w-3" /> FPS Monitor
        </span>
        <span className="text-emerald-500 font-bold">{fps} FPS</span>
      </div>
      <div className="flex justify-between text-[9px] text-neutral-500 pt-0.5">
        <span>Frame Time: 16.6ms</span>
        <span>GPU Acceleration: ON</span>
      </div>
    </div>
  );
}
