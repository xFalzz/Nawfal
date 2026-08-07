"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  Keyboard, 
  Check, 
  Copy, 
  Cpu, 
  GitCommit, 
  GitBranch, 
  FileCode2, 
  RefreshCw,
  Search,
  Sliders,
  CheckCircle2,
  ScanEye
} from "lucide-react";

// ─── 1. Live Audio Waveform Physics Visualizer ─────────────────────────────────
export function AudioWaveformVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState([20, 45, 80, 30, 90, 60, 40, 75, 55, 35, 95, 50]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 75) + 20));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-neutral-300 bg-white p-3.5 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-white transition-colors dark:bg-white dark:text-black"
          >
            {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5 ml-0.5" />}
          </button>
          <span className="font-mono text-[10px] font-semibold text-neutral-900 dark:text-white">
            Audio Spectrum
          </span>
        </div>
        <span className="font-mono text-[8px] uppercase text-neutral-400">
          {isPlaying ? "LIVE" : "PAUSED"}
        </span>
      </div>

      <div className="flex h-8 w-full items-end justify-between gap-0.5 rounded bg-neutral-100 p-1.5 dark:bg-neutral-900">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            animate={{ height: isPlaying ? `${height}%` : "20%" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-full rounded-xs bg-neutral-900 dark:bg-white"
          />
        ))}
      </div>
    </div>
  );
}

// ─── 2. Real-Time Hardware Keyboard Keypress Tracker ──────────────────────────
export function PhysicalKeyboardTracker() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set(["CMD", "K"]));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKeys((prev) => new Set(prev).add(key.length === 1 ? key : key.slice(0, 3)));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(key.length === 1 ? key : key.slice(0, 3));
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 font-semibold text-neutral-900 dark:text-white">
          <Keyboard className="h-3 w-3" /> Key Tracker
        </span>
        <span className="font-mono text-[8px] text-neutral-400">Press Keys</span>
      </div>

      <div className="flex flex-wrap gap-0.5 font-mono">
        {keys.slice(0, 8).map((k) => {
          const isPressed = activeKeys.has(k);
          return (
            <motion.div
              key={k}
              animate={{ scale: isPressed ? 0.9 : 1, y: isPressed ? 1 : 0 }}
              className={`flex h-6 w-6 items-center justify-center rounded border font-mono text-[9px] font-bold transition-all ${
                isPressed
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-neutral-300 bg-neutral-100 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              {k}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 3. Interactive Code Diff Patch Viewer ──────────────────────────────────
export function InteractiveCodeDiffViewer() {
  const [copied, setCopied] = useState(false);

  const diffLines = [
    { type: "context", text: "  function calculateTotal(items) {" },
    { type: "removed", text: "-   return items.reduce((a, b) => a + b, 0);" },
    { type: "added", text: "+   return items.reduce((sum, item) => sum + item.price, 0);" },
  ];

  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-2.5 py-1">
        <div className="flex items-center gap-1.5">
          <FileCode2 className="h-3 w-3 text-neutral-400" />
          <span className="text-[9px] text-neutral-300">calculator.ts</span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(diffLines.map((l) => l.text).join("\n"));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="flex items-center gap-1 text-[9px] text-neutral-400 hover:text-white"
        >
          {copied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="p-1.5 space-y-0.5 text-[9px]">
        {diffLines.map((line, idx) => (
          <div
            key={idx}
            className={`px-1.5 py-0.5 rounded ${
              line.type === "added"
                ? "bg-neutral-800/80 text-emerald-300 font-semibold"
                : line.type === "removed"
                ? "bg-neutral-900/90 text-rose-300 line-through opacity-75"
                : "text-neutral-400"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. Live Token-by-Token AI Stream Simulator ────────────────────────────
export function AIStreamSimulator() {
  const [text, setText] = useState("");
  const fullText = "Nawfal UI RAG Engine: Grounded facts verified (100% precision).";
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = () => {
    setText("");
    setIsStreaming(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 30);
  };

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-1.5 rounded-lg border border-neutral-800 bg-black p-3 font-mono text-[10px] text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <div className="flex items-center gap-1">
          <Cpu className="h-3 w-3 text-neutral-300" />
          <span className="text-[9px] font-bold">RAG Stream</span>
        </div>
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="flex items-center gap-1 rounded bg-neutral-800 px-1.5 py-0.5 text-[8px] text-neutral-200 hover:bg-neutral-700"
        >
          <RefreshCw className={`h-2.5 w-2.5 ${isStreaming ? "animate-spin" : ""}`} />
          <span>{isStreaming ? "..." : "Trigger"}</span>
        </button>
      </div>

      <div className="min-h-[36px] text-[10px] text-neutral-300 leading-snug">
        {text || <span className="text-neutral-600">Click &apos;Trigger&apos; to watch stream...</span>}
        {isStreaming && <span className="inline-block h-2.5 w-1 ml-0.5 bg-white animate-pulse" />}
      </div>
    </div>
  );
}

// ─── 5. Interactive Git Branch Tree Graph Visualizer ────────────────────────
export function GitBranchTreeGraph() {
  const [selectedCommit, setSelectedCommit] = useState("feat/uikit-v3");

  const commits = [
    { hash: "8f3a92b", msg: "init: monochrome tokens", branch: "main" },
    { hash: "2c7e14f", msg: "feat: add 42 components", branch: "feat/uikit-v3" },
  ];

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 font-semibold text-neutral-900 dark:text-white">
          <GitBranch className="h-3 w-3" /> Git Graph
        </span>
        <span className="font-mono text-[8px] rounded bg-neutral-200 px-1 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
          {selectedCommit}
        </span>
      </div>

      <div className="space-y-1 font-mono text-[9px]">
        {commits.map((c, i) => (
          <div
            key={i}
            onClick={() => setSelectedCommit(c.branch)}
            className="flex cursor-pointer items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-2 py-1 transition-colors dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <div className="flex items-center gap-1.5 truncate">
              <GitCommit className="h-2.5 w-2.5 text-neutral-700 dark:text-neutral-300 shrink-0" />
              <span className="font-bold text-neutral-900 dark:text-white shrink-0">{c.hash}</span>
              <span className="text-neutral-600 dark:text-neutral-400 truncate">{c.msg}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 6. Matrix Digital Stream Monochrome Canvas Widget ───────────────────────
export function MatrixDigitalStream() {
  const [active, setActive] = useState(true);

  return (
    <div className="relative flex h-20 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-black font-mono text-[9px] text-white">
      <div className="absolute inset-0 opacity-20 flex justify-between px-2 font-mono text-[8px] text-neutral-300">
        <div>0 1 0 1 1 0</div>
        <div>1 1 0 0 1 0</div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="font-bold tracking-widest uppercase text-[9px]">MATRIX STREAM</span>
        <button
          onClick={() => setActive(!active)}
          className="rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[8px] text-neutral-300 hover:text-white"
        >
          {active ? "Active" : "Paused"}
        </button>
      </div>
    </div>
  );
}

// ─── 7. NEW INNOVATION: AI Generative Semantic Vector Search Bar ───────────────
export function AIGenerativeSemanticSearch() {
  const [query, setQuery] = useState("vector embeddings RAG");
  const [isSearching, setIsSearching] = useState(false);
  const [matchScore, setMatchScore] = useState(98.4);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setMatchScore(parseFloat((Math.random() * 3 + 96.5).toFixed(1)));
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-[10px] text-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Cpu className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-bold text-[10px]">AI Vector Search</span>
        </div>
        <span className="rounded bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[8px] text-emerald-400 font-bold">
          {matchScore}% MATCH
        </span>
      </div>

      <div className="flex items-center gap-1.5 rounded border border-neutral-800 bg-black px-2 py-1">
        <Search className="h-3 w-3 text-neutral-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Semantic vector query..."
          className="w-full bg-transparent text-[10px] text-white outline-none placeholder:text-neutral-600"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="rounded bg-white px-2 py-0.5 text-[9px] font-bold text-black hover:bg-neutral-200"
        >
          {isSearching ? "..." : "Ask"}
        </button>
      </div>

      <div className="flex flex-wrap gap-1 text-[8px] text-neutral-400">
        <span className="rounded bg-neutral-900 px-1 py-0.2 border border-neutral-800">#VectorRAG</span>
        <span className="rounded bg-neutral-900 px-1 py-0.2 border border-neutral-800">#Nextjs14</span>
      </div>
    </div>
  );
}

// ─── 8. NEW INNOVATION: AI Vision & Code Prompt Refactor Inspector ────────────
export function AIVisionPromptInspector() {
  const [density, setDensity] = useState(85);
  const [isScanning, setIsScanning] = useState(false);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDensity(Math.floor(Math.random() * 15) + 80);
      setIsScanning(false);
    }, 1000);
  };

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-neutral-800 bg-black p-3 font-mono text-[10px] text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <div className="flex items-center gap-1.5">
          <ScanEye className="h-3.5 w-3.5 text-neutral-200" />
          <span className="font-bold text-[10px]">AI Vision Inspector</span>
        </div>
        <button
          onClick={triggerScan}
          disabled={isScanning}
          className="rounded bg-neutral-900 border border-neutral-700 px-2 py-0.5 text-[8px] text-neutral-200 hover:bg-neutral-800"
        >
          {isScanning ? "Scanning..." : "Scan UI"}
        </button>
      </div>

      <div className="flex flex-col gap-1 text-[9px]">
        <div className="flex justify-between text-neutral-400">
          <span>Structural Density:</span>
          <span className="font-bold text-white">{density}% Optimal</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-900 border border-neutral-800">
          <div style={{ width: `${density}%` }} className="h-full bg-white transition-all" />
        </div>
      </div>
    </div>
  );
}
