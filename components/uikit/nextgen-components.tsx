"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Terminal, 
  Atom,
  Activity, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Command,
  Calculator,
  Flame,
  Radio
} from "lucide-react";

// ─── 1. AI Neural Agent Voice Spectrum ───────────────────────────────────────
export function AINeuralVoiceSpectrum() {
  const [isListening, setIsListening] = useState(true);
  const [agentState, setAgentState] = useState<"listening" | "thinking" | "speaking">("speaking");
  const [volume, setVolume] = useState(78);
  const [bars, setBars] = useState([35, 65, 90, 45, 80, 100, 70, 40, 85, 60, 95, 50, 75, 30, 85]);

  useEffect(() => {
    if (!isListening) return;
    const interval = setInterval(() => {
      setBars(Array.from({ length: 15 }, () => Math.floor(Math.random() * (agentState === "speaking" ? 75 : agentState === "thinking" ? 35 : 20)) + 15));
    }, 100);
    return () => clearInterval(interval);
  }, [isListening, agentState]);

  return (
    <div className="flex w-full max-w-[290px] flex-col gap-2.5 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              agentState === "speaking" ? "bg-emerald-400" : agentState === "thinking" ? "bg-amber-400" : "bg-sky-400"
            }`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${
              agentState === "speaking" ? "bg-emerald-500" : agentState === "thinking" ? "bg-amber-500" : "bg-sky-500"
            }`} />
          </div>
          <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase tracking-wide dark:text-white">
            Neural Voice AI
          </span>
        </div>
        <div className="flex items-center gap-1 rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
          <Radio className="h-2.5 w-2.5 text-emerald-500 animate-pulse" />
          <span>{agentState}</span>
        </div>
      </div>

      {/* Voice Frequency Waveform */}
      <div className="flex h-12 w-full items-end justify-between gap-1 rounded-lg border border-neutral-200/60 bg-neutral-50 p-2 dark:border-neutral-800/60 dark:bg-neutral-900/60">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: isListening ? `${h}%` : "15%" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`w-full rounded-full transition-colors ${
              agentState === "speaking" 
                ? "bg-neutral-900 dark:bg-white" 
                : agentState === "thinking"
                ? "bg-amber-500"
                : "bg-neutral-400 dark:bg-neutral-600"
            }`}
          />
        ))}
      </div>

      {/* State Switcher & Controls */}
      <div className="flex items-center justify-between gap-1.5 pt-0.5">
        <div className="flex gap-1 rounded-md border border-neutral-200 bg-neutral-100 p-0.5 dark:border-neutral-800 dark:bg-neutral-900">
          {(["listening", "thinking", "speaking"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setAgentState(mode)}
              className={`rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold capitalize transition-all ${
                agentState === mode
                  ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsListening(!isListening)}
          className={`flex h-6 w-6 items-center justify-center rounded-md border transition-all ${
            isListening
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-neutral-300 bg-neutral-100 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900"
          }`}
        >
          {isListening ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
        </button>
      </div>
    </div>
  );
}

// ─── 2. Quantum Particle Matrix Visualizer ────────────────────────────────────
export function QuantumParticleMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleCount, setParticleCount] = useState(24);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 270);
    const height = (canvas.height = 90);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(160, 160, 160, ${1 - dist / 45})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [particleCount, speed]);

  return (
    <div className="flex w-full max-w-[290px] flex-col gap-2 rounded-xl border border-neutral-800 bg-black p-3 font-mono text-[10px] text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <span className="flex items-center gap-1.5 font-bold">
          <Atom className="h-3.5 w-3.5 text-sky-400" /> Quantum Mesh Node
        </span>
        <span className="rounded bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 text-[8px] text-sky-400">
          {particleCount} NODES
        </span>
      </div>

      <div className="relative overflow-hidden rounded border border-neutral-800 bg-neutral-950">
        <canvas ref={canvasRef} className="block w-full h-[90px]" />
      </div>

      <div className="flex items-center justify-between pt-0.5 text-[9px]">
        <button
          onClick={() => setSpeed(speed === 1 ? 2.2 : 1)}
          className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-300 hover:text-white"
        >
          Speed: {speed}x
        </button>
        <button
          onClick={() => setParticleCount(particleCount === 24 ? 36 : 24)}
          className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-300 hover:text-white"
        >
          Density: {particleCount}
        </button>
      </div>
    </div>
  );
}

// ─── 3. Cybernetic Parallax Tilt HUD ──────────────────────────────────────────
export function CyberParallaxHUDCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((centerY - y) / 8);
    setRotateY((x - centerX) / 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000 flex w-full max-w-[290px] justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative flex w-full flex-col gap-2.5 rounded-xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-black p-3.5 font-mono text-[10px] text-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            <span>SYSTECH_HUD_v4</span>
          </div>
          <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 text-[8px] font-bold text-emerald-400">
            ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="rounded border border-neutral-800 bg-neutral-950 p-2">
            <span className="text-neutral-500 block">CPU LOAD</span>
            <span className="font-bold text-white text-xs">42.8%</span>
            <div className="mt-1 h-1 w-full rounded bg-neutral-900 overflow-hidden">
              <div className="h-full bg-emerald-400 w-[42%]" />
            </div>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-950 p-2">
            <span className="text-neutral-500 block">MEMORY</span>
            <span className="font-bold text-white text-xs">3.4 GB</span>
            <div className="mt-1 h-1 w-full rounded bg-neutral-900 overflow-hidden">
              <div className="h-full bg-sky-400 w-[68%]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded border border-neutral-800/60 bg-neutral-950/80 px-2 py-1 text-[8px] text-neutral-400">
          <span>PARALLAX TILT 3D</span>
          <span className="font-mono text-white">HOVER ME</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── 4. Interactive Multi-Step Pipeline Stepper ──────────────────────────────
export function MultiStepPipelineWizard() {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = [
    { title: "Lint", desc: "Code syntax" },
    { title: "Build", desc: "Bundle Next.js" },
    { title: "Scan", desc: "Security audit" },
    { title: "Deploy", desc: "Edge server" },
  ];

  return (
    <div className="flex w-full max-w-[290px] flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase dark:text-white flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Pipeline Stepper
        </span>
        <span className="font-mono text-[9px] text-neutral-500 dark:text-neutral-400">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Stepper Progress Bar */}
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute left-4 right-4 top-3 h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-0">
          <motion.div
            className="h-full bg-neutral-900 dark:bg-white"
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {steps.map((step, idx) => {
          const isDone = idx <= currentStep;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-1">
              <button
                onClick={() => setCurrentStep(idx)}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono font-bold transition-all ${
                  isDone
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs"
                    : "border border-neutral-300 bg-white text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                }`}
              >
                {idx < currentStep ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : idx + 1}
              </button>
              <span className="font-mono text-[8px] font-medium text-neutral-600 dark:text-neutral-400">
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-neutral-200 dark:border-neutral-800">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[9px] font-semibold text-neutral-600 hover:text-neutral-900 disabled:opacity-30 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          className="flex items-center gap-1 rounded bg-neutral-900 px-2.5 py-1 font-mono text-[9px] font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-30 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Next <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ─── 5. AI Prompt Token & Cost Calculator ─────────────────────────────────────
export function AIPromptTokenCalculator() {
  const [tokens, setTokens] = useState(150000);
  const [model, setModel] = useState<"gpt4o" | "claude" | "gemini">("gpt4o");

  const rates = {
    gpt4o: { name: "GPT-4o", inputRate: 2.5, outputRate: 10 },
    claude: { name: "Claude 3.5 Sonnet", inputRate: 3.0, outputRate: 15 },
    gemini: { name: "Gemini 1.5 Pro", inputRate: 1.25, outputRate: 5 },
  };

  const currentRate = rates[model];
  const totalCost = ((tokens / 1000000) * currentRate.inputRate).toFixed(4);

  return (
    <div className="flex w-full max-w-[290px] flex-col gap-2.5 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5 dark:border-neutral-800">
        <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
          <Calculator className="h-3.5 w-3.5 text-indigo-500" /> AI Token Estimator
        </span>
        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
          ${totalCost} USD
        </span>
      </div>

      {/* Model Switcher */}
      <div className="grid grid-cols-3 gap-1 rounded-md border border-neutral-200 bg-neutral-100 p-0.5 dark:border-neutral-800 dark:bg-neutral-900">
        {(["gpt4o", "claude", "gemini"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`rounded px-1.5 py-1 text-[8px] font-bold transition-all truncate ${
              model === m
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            {rates[m].name}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-[9px] text-neutral-500 dark:text-neutral-400">
          <span>Prompt Context:</span>
          <span className="font-bold text-neutral-900 dark:text-white">{(tokens / 1000).toFixed(0)}k Tokens</span>
        </div>
        <input
          type="range"
          min={10000}
          max={1000000}
          step={10000}
          value={tokens}
          onChange={(e) => setTokens(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
        />
      </div>
    </div>
  );
}

// ─── 6. Bespoke Floating Spotlight Command Palette ────────────────────────────
export function FloatingCommandPalette() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);

  const items = [
    { title: "Create New UI Component", type: "Action", icon: Layers },
    { title: "Run System Diagnostics", type: "Command", icon: Zap },
    { title: "Open Security Docs", type: "Navigation", icon: ShieldCheck },
    { title: "Launch AI Studio", type: "Tool", icon: Terminal },
  ].filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex w-full max-w-[290px] flex-col gap-2 rounded-xl border border-neutral-300 bg-white p-3 shadow-md dark:border-neutral-800 dark:bg-neutral-950 font-mono text-[10px]">
      {/* Search Input Bar */}
      <div className="relative flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 dark:border-neutral-800 dark:bg-neutral-900">
        <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a command or search..."
          className="ml-2 w-full bg-transparent text-xs text-neutral-900 outline-none dark:text-white placeholder:text-neutral-400"
        />
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-neutral-300 bg-white px-1 font-mono text-[8px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
          <Command className="h-2.5 w-2.5" /> K
        </kbd>
      </div>

      {/* Quick Results List */}
      <div className="flex flex-col gap-0.5">
        {items.length > 0 ? (
          items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex items-center justify-between rounded-md px-2 py-1.5 transition-colors ${
                selected === idx
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                  : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{item.title}</span>
              </div>
              <span className={`text-[8px] uppercase font-semibold shrink-0 ${
                selected === idx ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400"
              }`}>
                {item.type}
              </span>
            </button>
          ))
        ) : (
          <div className="py-3 text-center text-neutral-400 text-[9px]">No commands found.</div>
        )}
      </div>
    </div>
  );
}
