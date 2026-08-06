"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Volume2, 
  Activity, 
  Check, 
  Copy, 
  ShieldAlert,
  Zap
} from "lucide-react";

// ─── 1. Interactive Synthesizer Sound Pad ─────────────────────────────────────
export function SynthesizerSoundPad() {
  const [activePad, setActivePad] = useState<number | null>(null);

  const notes = [
    { name: "OSC 1", freq: "440Hz" },
    { name: "OSC 2", freq: "587Hz" },
    { name: "OSC 3", freq: "659Hz" },
    { name: "OSC 4", freq: "880Hz" },
  ];

  const triggerPad = (index: number) => {
    setActivePad(index);
    setTimeout(() => setActivePad(null), 300);
  };

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-3 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 font-mono font-bold text-neutral-900 dark:text-white">
          <Volume2 className="h-3 w-3" /> Audio Synth
        </span>
        <span className="font-mono text-[8px] text-neutral-400">4-PAD OSC</span>
      </div>

      <div className="grid grid-cols-2 gap-1 font-mono">
        {notes.map((n, i) => (
          <button
            key={i}
            onClick={() => triggerPad(i)}
            className={`flex flex-col items-start rounded border p-1.5 text-left transition-all ${
              activePad === i
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black scale-[0.98]"
                : "border-neutral-300 bg-neutral-100 text-neutral-800 hover:border-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
            }`}
          >
            <span className="text-[9px] font-bold">{n.name}</span>
            <span className="text-[8px] opacity-70">{n.freq}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 2. Holographic Scanline Security Card ────────────────────────────────────
export function HolographicScanlineCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-800 bg-black p-3 font-mono text-white shadow-md"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent transition-transform duration-1000 ${
          hovered ? "translate-y-full" : "-translate-y-full"
        }`}
      />
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <div className="flex items-center gap-1">
          <ShieldAlert className="h-3 w-3 text-neutral-300" />
          <span className="text-[9px] font-bold tracking-widest">HOLO PASSPORT</span>
        </div>
        <span className="rounded bg-neutral-800 px-1 py-0.2 text-[7px] text-neutral-300">SECURE</span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-[8px] text-neutral-500">ID</p>
          <p className="text-[10px] font-bold">#NAWFAL-8890</p>
        </div>
        <div className="h-5 w-5 rounded border border-dashed border-neutral-700 bg-neutral-900 flex items-center justify-center text-[9px]">
          ✦
        </div>
      </div>
    </div>
  );
}

// ─── 3. Monochrome Interactive System Telemetry Monitor ──────────────────────
export function SystemTelemetryMonitor() {
  const [cpu, setCpu] = useState(32);
  const [ram, setRam] = useState(58);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 40) + 20);
      setRam(Math.floor(Math.random() * 20) + 50);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-950 font-mono">
      <div className="flex items-center justify-between text-[10px] border-b border-neutral-200 pb-1 dark:border-neutral-800">
        <span className="flex items-center gap-1 font-bold text-neutral-900 dark:text-white">
          <Activity className="h-3 w-3" /> Telemetry
        </span>
        <span className="text-[8px] text-emerald-500">STABLE</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 text-[9px]">
        <div className="rounded border border-neutral-200 bg-neutral-50 p-1.5 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-neutral-500">CPU</p>
          <p className="text-xs font-bold text-neutral-900 dark:text-white">{cpu}%</p>
        </div>
        <div className="rounded border border-neutral-200 bg-neutral-50 p-1.5 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-neutral-500">RAM</p>
          <p className="text-xs font-bold text-neutral-900 dark:text-white">{ram}%</p>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Live Monochrome Color Harmony Swatch Wheel ────────────────────────────
export function ColorHarmonyWheel() {
  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-950 font-mono">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-bold text-neutral-900 dark:text-white">Luminance Swatches</span>
        <span className="text-[8px] text-neutral-400">HEX #0A0A0A</span>
      </div>

      <div className="grid grid-cols-4 gap-1">
        <div className="h-6 rounded bg-black flex items-center justify-center text-[7px] text-white font-bold">100%</div>
        <div className="h-6 rounded bg-neutral-900 flex items-center justify-center text-[7px] text-white font-bold">85%</div>
        <div className="h-6 rounded bg-neutral-700 flex items-center justify-center text-[7px] text-white font-bold">60%</div>
        <div className="h-6 rounded bg-neutral-200 border border-neutral-300 flex items-center justify-center text-[7px] text-black font-bold">15%</div>
      </div>
    </div>
  );
}

// ─── 5. AI Prompt Matrix Generator ────────────────────────────────────────────
export function AIPromptMatrixGenerator() {
  const [prompt] = useState("Generate monochrome UI component");
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 font-mono text-[10px] text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1">
        <span className="flex items-center gap-1 text-[9px] font-bold text-neutral-300">
          <Zap className="h-3 w-3" /> PROMPT MATRIX
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex items-center gap-1 rounded bg-neutral-800 px-1.5 py-0.5 text-[8px] text-neutral-200 hover:bg-neutral-700"
        >
          {copied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <p className="text-[10px] text-neutral-300 leading-tight bg-neutral-900 p-1.5 rounded border border-neutral-800">
        &quot;{prompt}&quot;
      </p>
    </div>
  );
}

// ─── 6. Interactive Floating Particle Mesh Node ────────────────────────────────
export function ParticleMeshNode() {
  const [activeNode, setActiveNode] = useState(2);

  return (
    <div className="relative flex h-16 w-full max-w-[260px] items-center justify-between rounded-lg border border-neutral-800 bg-black p-3 font-mono">
      <div className="flex w-full justify-between items-center">
        {[1, 2, 3, 4].map((node) => (
          <button
            key={node}
            onClick={() => setActiveNode(node)}
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold transition-all ${
              activeNode === node
                ? "border-white bg-white text-black scale-105 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-600"
            }`}
          >
            N{node}
          </button>
        ))}
      </div>
    </div>
  );
}
