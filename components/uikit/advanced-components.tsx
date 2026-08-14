"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  ChevronDown,
  Play,
  Pause,
  Disc3,
  Globe2,
  GitBranch,
  GitCommit,
  Layers,
  Radio,
  Server,
  Activity,
  Zap,
  Mic,
  RotateCw,
  FolderGit2,
  CheckCircle2,
} from "lucide-react";

// ============================================================================
// 1. AI Reasoning & Thinking Process Accordion
// ============================================================================
export function AIReasoningAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  const [elapsed, setElapsed] = useState(1.8);

  return (
    <div className="flex w-full max-w-[320px] flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 font-mono text-[11px] text-white shadow-xl">
      {/* Reasoning Trigger Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg bg-neutral-900/80 px-2.5 py-1.5 transition-colors hover:bg-neutral-800/80 border border-neutral-800"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60"></span>
            <Brain className="relative h-3 w-3 text-violet-400" />
          </div>
          <span className="font-semibold text-neutral-200">Reasoning Process</span>
          <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[9px] text-neutral-400">
            {elapsed}s
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
        </motion.div>
      </button>

      {/* Collapsible Chain of Thought */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 flex flex-col gap-1.5 border-l-2 border-violet-500/40 pl-3 text-[10px] text-neutral-400">
              <p className="leading-relaxed">
                1. Parsing semantic prompt intent & extracting constraint tokens...
              </p>
              <p className="leading-relaxed text-neutral-300">
                2. Comparing vector embeddings in 1,536-dimensional space (cosine sim: 0.942)...
              </p>
              <p className="leading-relaxed text-emerald-400 font-medium">
                3. Synthesizing deterministic code output with zero hallucinations.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesized Response Box */}
      <div className="mt-3 rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-2.5 text-[10px] text-neutral-300">
        <div className="flex items-center gap-1.5 text-violet-400 font-bold mb-1">
          <CheckCircle2 className="h-3 w-3" /> Answer Generated
        </div>
        Optimal system throughput achieved at 14,200 req/s with 99.98% cache hit ratio.
      </div>
    </div>
  );
}

// ============================================================================
// 2. Gemini / Siri Interactive Voice Orb Visualizer
// ============================================================================
export function VoiceOrbVisualizer() {
  const [isSpeaking, setIsSpeaking] = useState(true);

  return (
    <div className="flex w-full max-w-[320px] flex-col items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-[11px] text-white shadow-xl">
      <div className="flex w-full items-center justify-between border-b border-neutral-800/80 pb-2">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-300">
          <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> Neural Audio Core
        </span>
        <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[9px] font-semibold text-cyan-400">
          {isSpeaking ? "LISTENING" : "STANDBY"}
        </span>
      </div>

      {/* Multi-layered Pulsating Liquid Orb */}
      <div
        onClick={() => setIsSpeaking(!isSpeaking)}
        className="relative flex h-24 w-24 cursor-pointer items-center justify-center"
      >
        {/* Layer 1: Outer Aurora Glow */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.25, 1] : 1,
            rotate: isSpeaking ? 360 : 0,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-indigo-500/30 to-fuchsia-500/30 blur-md"
        />

        {/* Layer 2: Middle Kinetic Plasma */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1.1, 0.95, 1.1] : 1,
            rotate: isSpeaking ? -360 : 0,
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-full bg-gradient-to-bl from-cyan-400 via-violet-500 to-pink-500 opacity-80 blur-[2px]"
        />

        {/* Layer 3: Center Core Bubble */}
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950/90 shadow-inner border border-white/20 backdrop-blur-md">
          <Mic className={`h-6 w-6 transition-colors ${isSpeaking ? "text-cyan-300 animate-pulse" : "text-neutral-500"}`} />
        </div>
      </div>

      <p className="text-[10px] text-neutral-400">Click orb to toggle live audio stream capture</p>
    </div>
  );
}

// ============================================================================
// 3. Spotlight Cursor-Follow Bento Grid Card
// ============================================================================
export function SpotlightBentoGrid() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[320px] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-[11px] text-white shadow-xl transition-all"
    >
      {/* Spotlight Radial Light Beam */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.18), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" /> Spotlight Bento
          </span>
          <span className="rounded bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[9px] text-neutral-400">
            x: {Math.round(mousePos.x)}px
          </span>
        </div>
        <h4 className="text-xs font-semibold text-neutral-100">Dynamic Luminescence Physics</h4>
        <p className="text-[10px] leading-relaxed text-neutral-400">
          Hardware-accelerated mathematical spotlight shader calculating localized light attenuation on mouse coordinate displacement.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 4. Animated Border Beam Card
// ============================================================================
export function BorderBeamCard() {
  return (
    <div className="relative w-full max-w-[320px] overflow-hidden rounded-xl bg-neutral-950 p-[1.5px] font-mono text-[11px] text-white shadow-xl">
      {/* Continuous Rotating Border Beam Gradient */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#38bdf8_320deg,#a855f7_360deg)]"
      />

      {/* Inner Card Surface */}
      <div className="relative z-10 flex flex-col gap-2.5 rounded-[10px] bg-neutral-950 p-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
          <span className="font-bold text-sky-400">BORDER_BEAM_v2</span>
          <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[9px] text-sky-300 font-semibold">ACTIVE</span>
        </div>
        <p className="text-[10px] leading-relaxed text-neutral-300">
          Seamless Conic-gradient beam tracing card perimeter with buttery smooth 60fps compositor thread rotation.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 5. macOS Physics Floating Dock
// ============================================================================
export function MacOSFloatingDock() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = [
    { label: "Finder", icon: FolderGit2, color: "text-blue-400" },
    { label: "Terminal", icon: Activity, color: "text-emerald-400" },
    { label: "Database", icon: Server, color: "text-amber-400" },
    { label: "Globe", icon: Globe2, color: "text-purple-400" },
    { label: "AI Core", icon: Brain, color: "text-pink-400" },
  ];

  return (
    <div className="flex w-full max-w-[320px] flex-col items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-[11px] text-white shadow-xl">
      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-neutral-900/80 p-2 backdrop-blur-xl shadow-2xl">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          const scale = isHovered ? 1.4 : isNeighbor ? 1.15 : 1;

          return (
            <motion.div
              key={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={{ scale, y: isHovered ? -6 : isNeighbor ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl bg-neutral-800/90 border border-neutral-700 shadow-md transition-colors hover:bg-neutral-700"
            >
              <Icon className={`h-4 w-4 ${item.color}`} />
              {isHovered && (
                <span className="absolute -top-7 whitespace-nowrap rounded bg-black/90 px-1.5 py-0.5 text-[8px] font-bold text-white border border-white/20 shadow">
                  {item.label}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      <span className="text-[9px] text-neutral-400">Hover icons to trigger spring scaling magnification</span>
    </div>
  );
}

// ============================================================================
// 6. Global Server Latency & Uptime Heartbeat
// ============================================================================
export function ServerLatencyMatrix() {
  const [nodes, setNodes] = useState([
    { region: "Singapore (sin1)", ping: 18, status: "healthy" },
    { region: "Tokyo (nrt1)", ping: 42, status: "healthy" },
    { region: "Frankfurt (fra1)", ping: 114, status: "healthy" },
    { region: "US-East (iad1)", ping: 148, status: "healthy" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          ping: Math.max(10, n.ping + Math.floor(Math.random() * 7 - 3)),
        }))
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 font-mono text-[10px] text-white shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <span className="flex items-center gap-1.5 font-bold uppercase text-emerald-400">
          <Server className="h-3.5 w-3.5" /> Edge Fleet Telemetry
        </span>
        <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[8px] text-emerald-400 font-bold">
          100% UP
        </span>
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        {nodes.map((node) => (
          <div key={node.region} className="flex items-center justify-between rounded bg-neutral-900/60 px-2 py-1 border border-neutral-800/60">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-neutral-300">{node.region}</span>
            </div>
            <span className="font-bold text-neutral-200">{node.ping}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 7. Live Git Commit Branch Graph
// ============================================================================
export function GitCommitFlowGraph() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 font-mono text-[10px] text-white shadow-xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <span className="flex items-center gap-1.5 font-bold text-purple-400">
          <GitBranch className="h-3.5 w-3.5" /> DAG Branch Tree
        </span>
        <span className="text-neutral-500 text-[9px]">main · 4 commits ahead</span>
      </div>

      <div className="flex flex-col gap-2 py-1 pl-1">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />
          <span className="font-bold text-purple-300">b428746</span>
          <span className="truncate text-neutral-400">fix(pdf): dynamic CDN canvas</span>
        </div>
        <div className="ml-1.5 h-3 w-0.5 bg-neutral-700" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <span className="font-bold text-emerald-300">5465a50</span>
          <span className="truncate text-neutral-400">feat: enterprise UI Kit CLI</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. Vinyl Disc Interactive Player
// ============================================================================
export function VinylDiscPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-[11px] text-white shadow-xl">
      <div className="relative flex items-center justify-between">
        {/* Album Cover */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-xl border border-white/20">
          <Disc3 className="h-8 w-8 text-white/90" />
        </div>

        {/* Sliding & Spinning Vinyl Disc */}
        <motion.div
          animate={{
            x: isPlaying ? 24 : 0,
            rotate: isPlaying ? 360 : 0,
          }}
          transition={{
            x: { duration: 0.4 },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
          className="absolute left-6 h-14 w-14 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shadow-lg"
        >
          <div className="h-5 w-5 rounded-full bg-indigo-500 border border-white/40" />
        </motion.div>

        {/* Controls */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95 shadow-md"
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>
      </div>

      <div className="flex justify-between items-center text-[10px] text-neutral-400 border-t border-neutral-800/80 pt-2">
        <span className="font-bold text-neutral-200 truncate max-w-[180px]">Cyberpunk Lo-Fi Chillwave</span>
        <span>{isPlaying ? "02:45" : "00:00"}</span>
      </div>
    </div>
  );
}
