"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, 
  BookOpen, 
  Sliders, 
  Users, 
  Search, 
  Code2, 
  Terminal, 
  Check,
  Copy,
  Zap,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  FlaskConical
} from "lucide-react";

// Hub Sections
import { ComponentCard } from "@/components/uikit/component-card";
import { DocsSection } from "@/components/uikit/docs-section";
import { ToolsSection } from "@/components/uikit/tools-section";
import { TemplatesSection } from "@/components/uikit/templates-section";
import { PlaygroundSection } from "@/components/uikit/playground-section";
import { LearnSection } from "@/components/uikit/learn-section";
import { CommunitySection } from "@/components/uikit/community-section";

// Suite 1: Custom Monochrome Components
import {
  MagneticButton,
  ShimmerBeamButton,
  ParticleRippleButton,
  MonochromeGlowCard,
  CyberBorderCard,
  TiltParallaxCard,
  InteractiveDock,
  GlassInput,
  PinCodeOTPInput,
  MinimalPulseBadge,
  RadarSweepBadge,
  CommandShortcutWidget,
  TerminalCodeWindow,
  AccordionItemComponent,
  SegmentedControlSwitch,
  PipelineStep,
  NotificationToastBanner,
  AvatarGroupPile,
  MetricBadgeCard,
  CompactToggleSwitch,
} from "@/components/uikit/custom-components";

// Suite 2: Innovative Components
import {
  AudioWaveformVisualizer,
  PhysicalKeyboardTracker,
  InteractiveCodeDiffViewer,
  AIStreamSimulator,
  GitBranchTreeGraph,
  MatrixDigitalStream,
  AIGenerativeSemanticSearch,
  AIVisionPromptInspector,
} from "@/components/uikit/innovative-components";

// Suite 3: Out-Of-The-Box Innovations
import {
  SynthesizerSoundPad,
  HolographicScanlineCard,
  SystemTelemetryMonitor,
  ColorHarmonyWheel,
  AIPromptMatrixGenerator,
  ParticleMeshNode,
} from "@/components/uikit/out-of-the-box";

// Suite 4: Spotify & Audio Music Components
import {
  SpotifyMiniPlayer,
  SpotifyTrackListItem,
  SpotifyVinylPlayer,
  SpotifyAlbumCard,
} from "@/components/uikit/spotify-components";

// Suite 5: Practical & Imaginative Utilities
import {
  ColorPalettePicker,
  LiveBpmMetronome,
  TerminalTaskRunner,
  LiveFpsPerformanceMonitor,
} from "@/components/uikit/imaginative-components";

// Suite 6: NextGen Cutting-Edge Innovations
import {
  AINeuralVoiceSpectrum,
  QuantumParticleMatrix,
  CyberParallaxHUDCard,
  MultiStepPipelineWizard,
  AIPromptTokenCalculator,
  FloatingCommandPalette,
} from "@/components/uikit/nextgen-components";

export default function ComponentsHubPage() {
  const [activeTab, setActiveTab] = useState<"components" | "documents" | "tools" | "templates" | "playground" | "learn" | "community">("components");
  const [selectedCategory, setSelectedCategory] = useState<string>("All System Components");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCli, setCopiedCli] = useState(false);

  // Category Drag & Scroll Ref + Handlers
  const categoryScrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoryScrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - categoryScrollRef.current.offsetLeft);
    setScrollLeftState(categoryScrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    categoryScrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollCategory = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const categories = [
    "All System Components", 
    "AI RAG & Intelligence Engines",
    "Audio Architecture & Media",
    "Bespoke Widgets & Utilities", 
    "Kinetic Motion & Physics", 
    "Structural Containers & Surfaces", 
    "Interactive Inputs & Controls", 
    "Telemetry & System Signals"
  ];

  const uikitComponents = [
    // ─── 1. AI RAG & Intelligence Engines ───────────────────────────────────────
    {
      id: "ai-neural-voice-spectrum",
      name: "AI Neural Voice Spectrum",
      category: "AI RAG & Intelligence Engines",
      description: "Interactive voice frequency visualizer with real-time AI agent status & volume controls.",
      component: <AINeuralVoiceSpectrum />,
      codeSnippet: `import { useState, useEffect } from "react";
import { Mic, MicOff, Radio } from "lucide-react";
import { motion } from "framer-motion";

export function AINeuralVoiceSpectrum() {
  const [isListening, setIsListening] = useState(true);
  const [agentState, setAgentState] = useState("speaking");
  const [bars, setBars] = useState([35, 65, 90, 45, 80, 100, 70, 40, 85, 60]);

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-3 font-mono text-[10px] text-white">
      <div className="flex justify-between items-center">
        <span className="font-bold uppercase tracking-wide">Neural Voice AI</span>
        <span className="flex items-center gap-1 rounded bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[8px] text-emerald-400 font-bold"><Radio className="h-2.5 w-2.5 animate-pulse" /> {agentState}</span>
      </div>
      <div className="flex h-10 w-full items-end justify-between gap-1 rounded bg-neutral-900 p-1.5">
        {bars.map((h, i) => (
          <motion.div key={i} animate={{ height: isListening ? \`\${h}%\` : "15%" }} className="w-full bg-white rounded-full" />
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: "ai-prompt-token-calculator",
      name: "AI Token & Cost Estimator",
      category: "AI RAG & Intelligence Engines",
      description: "Live LLM token pricing calculator comparing GPT-4o, Claude 3.5 Sonnet & Gemini Pro.",
      component: <AIPromptTokenCalculator />,
      codeSnippet: `import { useState } from "react";
import { Calculator } from "lucide-react";

export function AIPromptTokenCalculator() {
  const [tokens, setTokens] = useState(150000);
  const [model, setModel] = useState("gpt4o");
  const rates = { gpt4o: 2.5, claude: 3.0, gemini: 1.25 };
  const totalCost = ((tokens / 1000000) * rates[model]).toFixed(4);

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-3 font-mono text-[10px] text-white">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-1">
        <span className="font-bold flex items-center gap-1"><Calculator className="h-3.5 w-3.5 text-indigo-400" /> Token Estimator</span>
        <span className="font-bold text-emerald-400">\${totalCost} USD</span>
      </div>
      <input type="range" min={10000} max={1000000} step={10000} value={tokens} onChange={(e) => setTokens(Number(e.target.value))} className="w-full h-1.5 bg-neutral-800 rounded appearance-none cursor-pointer accent-white" />
    </div>
  );
}`,
    },
    {
      id: "quantum-particle-matrix",
      name: "Quantum Particle Mesh Node",
      category: "Kinetic Motion & Physics",
      description: "Interactive HTML5 canvas particle matrix with proximity node connection lines.",
      component: <QuantumParticleMatrix />,
      codeSnippet: `import { useRef, useEffect } from "react";
import { Atom } from "lucide-react";

export function QuantumParticleMatrix() {
  const canvasRef = useRef(null);
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-xl border border-neutral-800 bg-black p-3 font-mono text-[10px] text-white">
      <div className="flex justify-between border-b border-neutral-800 pb-1">
        <span className="flex items-center gap-1 font-bold"><Atom className="h-3.5 w-3.5 text-sky-400" /> Quantum Mesh Node</span>
      </div>
      <canvas ref={canvasRef} className="block w-full h-[90px] rounded border border-neutral-800 bg-neutral-950" />
    </div>
  );
}`,
    },
    {
      id: "cyber-parallax-hud-card",
      name: "Cybernetic 3D Parallax HUD Card",
      category: "Structural Containers & Surfaces",
      description: "Futuristic sci-fi 3D mouse parallax tilt container with telemetry gauges.",
      component: <CyberParallaxHUDCard />,
      codeSnippet: `import { useState } from "react";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";

export function CyberParallaxHUDCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  return (
    <motion.div animate={{ rotateX, rotateY }} className="w-full max-w-[280px] rounded-xl border border-neutral-800 bg-black p-3 font-mono text-[10px] text-white shadow-xl">
      <div className="flex justify-between border-b border-neutral-800 pb-1">
        <span className="font-bold flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-emerald-400" /> SYSTECH_HUD_v4</span>
      </div>
    </motion.div>
  );
}`,
    },
    {
      id: "multi-step-pipeline-wizard",
      name: "Interactive Pipeline Stepper",
      category: "Interactive Inputs & Controls",
      description: "Animated multi-step workflow stepper with active progress indicator & status badges.",
      component: <MultiStepPipelineWizard />,
      codeSnippet: `import { useState } from "react";
import { ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export function MultiStepPipelineWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Lint", "Build", "Scan", "Deploy"];

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3 font-mono text-[10px] text-white">
      <div className="flex justify-between font-bold"><span>Pipeline Stepper</span><span>Step {currentStep + 1} of 4</span></div>
      <div className="flex justify-between">{steps.map((s, i) => <span key={i} className={i <= currentStep ? "text-white font-bold" : "text-neutral-600"}>{s}</span>)}</div>
    </div>
  );
}`,
    },
    {
      id: "floating-command-palette",
      name: "Bespoke Spotlight Command Palette",
      category: "Bespoke Widgets & Utilities",
      description: "Spotlight-style floating command search modal with instant search & hotkey badges.",
      component: <FloatingCommandPalette />,
      codeSnippet: `import { useState } from "react";
import { Search, Command } from "lucide-react";

export function FloatingCommandPalette() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-3 font-mono text-[10px] text-white">
      <div className="flex items-center rounded border border-neutral-800 bg-neutral-900 px-2 py-1">
        <Search className="h-3 w-3 text-neutral-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type a command..." className="ml-2 w-full bg-transparent text-[10px] outline-none" />
        <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1 text-[8px]">⌘K</kbd>
      </div>
    </div>
  );
}`,
    },
    {
      id: "ai-generative-semantic-search",
      name: "AI Semantic Vector Search",
      category: "AI RAG & Intelligence Engines",
      description: "AI-powered conversational semantic search bar with similarity confidence score.",
      component: <AIGenerativeSemanticSearch />,
      codeSnippet: `import { useState } from "react";
import { Cpu, Search } from "lucide-react";

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
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-[10px] text-white">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 font-bold"><Cpu className="h-3.5 w-3.5 text-emerald-400" /> AI Vector Search</span>
        <span className="rounded bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[8px] text-emerald-400 font-bold">{matchScore}% MATCH</span>
      </div>
      <div className="flex items-center gap-1.5 rounded border border-neutral-800 bg-black px-2 py-1">
        <Search className="h-3 w-3 text-neutral-400" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Semantic query..." className="w-full bg-transparent text-[10px] text-white outline-none" />
        <button onClick={handleSearch} className="rounded bg-white px-2 py-0.5 text-[9px] font-bold text-black">{isSearching ? "..." : "Ask"}</button>
      </div>
    </div>
  );
}`,
    },
    {
      id: "ai-vision-prompt-inspector",
      name: "AI Vision Prompt Inspector",
      category: "AI RAG & Intelligence Engines",
      description: "Multi-modal AI vision analyzer measuring structural UI density & code patches.",
      component: <AIVisionPromptInspector />,
      codeSnippet: `import { useState } from "react";
import { ScanEye } from "lucide-react";

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
      <div className="flex justify-between border-b border-neutral-800 pb-1.5">
        <span className="flex items-center gap-1.5 font-bold"><ScanEye className="h-3.5 w-3.5" /> AI Vision Inspector</span>
        <button onClick={triggerScan} className="rounded bg-neutral-900 border border-neutral-700 px-2 py-0.5 text-[8px] text-neutral-200">{isScanning ? "Scanning..." : "Scan UI"}</button>
      </div>
      <div className="flex flex-col gap-1 text-[9px]">
        <div className="flex justify-between text-neutral-400"><span>Structural Density:</span><span className="font-bold text-white">{density}% Optimal</span></div>
        <div className="h-1.5 w-full bg-neutral-900 rounded-full border border-neutral-800"><div style={{ width: \`\${density}%\` }} className="h-full bg-white transition-all" /></div>
      </div>
    </div>
  );
}`,
    },
    {
      id: "interactive-code-diff-viewer",
      name: "Interactive Code Diff Viewer",
      category: "AI RAG & Intelligence Engines",
      description: "Inline git code comparison diff patch with copy trigger.",
      component: <InteractiveCodeDiffViewer />,
      codeSnippet: `import { useState } from "react";
import { FileCode2, Copy, Check } from "lucide-react";

export function InteractiveCodeDiffViewer() {
  const [copied, setCopied] = useState(false);
  const diffLines = [
    { type: "context", text: "  function calculateTotal(items) {" },
    { type: "removed", text: "-   return items.reduce((a, b) => a + b, 0);" },
    { type: "added", text: "+   return items.reduce((sum, item) => sum + item.price, 0);" },
  ];

  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 font-mono text-[10px]">
      <div className="flex justify-between border-b border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[9px] text-neutral-400">
        <span className="flex items-center gap-1"><FileCode2 className="h-3 w-3" /> calculator.ts</span>
      </div>
      <div className="p-1.5 space-y-0.5 text-[9px]">
        {diffLines.map((line, idx) => (
          <div key={idx} className={\`px-1.5 py-0.5 rounded \${line.type === "added" ? "bg-neutral-800 text-emerald-300" : line.type === "removed" ? "bg-neutral-900 text-rose-300 line-through" : "text-neutral-400"}\`}>{line.text}</div>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: "ai-stream-simulator",
      name: "RAG AI Token Stream Simulator",
      category: "AI RAG & Intelligence Engines",
      description: "Token-by-token streaming RAG AI generation simulator.",
      component: <AIStreamSimulator />,
      codeSnippet: `import { useState } from "react";
import { Cpu, RefreshCw } from "lucide-react";

export function AIStreamSimulator() {
  const [text, setText] = useState("");
  const fullText = "Nawfal UI RAG Engine: Grounded facts verified (100% precision).";
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = () => {
    setText(""); setIsStreaming(true); let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) { setText((p) => p + fullText.charAt(i)); i++; }
      else { clearInterval(interval); setIsStreaming(false); }
    }, 30);
  };

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-800 bg-black p-3 font-mono text-[10px] text-white">
      <div className="flex justify-between border-b border-neutral-800 pb-1.5">
        <span className="flex items-center gap-1 text-[9px] font-bold"><Cpu className="h-3 w-3" /> RAG Stream</span>
        <button onClick={startStream} disabled={isStreaming} className="rounded bg-neutral-800 px-1.5 py-0.5 text-[8px]">Trigger</button>
      </div>
      <div className="min-h-[36px] text-[10px] text-neutral-300 leading-snug">{text || "Click Trigger to stream..."}</div>
    </div>
  );
}`,
    },

    // ─── 2. Audio Architecture & Media ─────────────────────────────────────────
    {
      id: "spotify-mini-player",
      name: "Spotify Mini Player",
      category: "Audio Architecture & Media",
      description: "Mini audio player with progress bar timestamps & play/pause toggle.",
      component: <SpotifyMiniPlayer />,
      codeSnippet: `import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Music } from "lucide-react";

export function SpotifyMiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center shrink-0">
            <Music className="h-4 w-4 text-neutral-400" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Midnight City</h4>
            <p className="text-[9px] text-neutral-400">M83</p>
          </div>
        </div>
        <button onClick={() => setIsLiked(!isLiked)} className="text-neutral-400 hover:text-white">
          <Heart className={\`h-3.5 w-3.5 \${isLiked ? "fill-white text-white" : ""}\`} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500">
          <span>1:24</span>
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-neutral-800 mx-1.5">
            <div style={{ width: \`\${progress}%\` }} className="h-full bg-white transition-all" />
          </div>
          <span>3:45</span>
        </div>
        <div className="flex items-center justify-center gap-3 pt-0.5">
          <button className="text-neutral-400 hover:text-white"><SkipBack className="h-3 w-3" /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
          </button>
          <button className="text-neutral-400 hover:text-white"><SkipForward className="h-3 w-3" /></button>
        </div>
      </div>
    </div>
  );
}`,
    },
    {
      id: "spotify-track-list-item",
      name: "Spotify Track Row",
      category: "Audio Architecture & Media",
      description: "Playlist row item with track number, play hover trigger, & duration.",
      component: <SpotifyTrackListItem />,
      codeSnippet: `import { useState } from "react";
import { Play, Pause } from "lucide-react";

export function SpotifyTrackListItem() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div onClick={() => setIsPlaying(!isPlaying)} className="group flex w-full max-w-[280px] cursor-pointer items-center justify-between rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs hover:bg-neutral-900">
      <div className="flex items-center gap-2.5 truncate">
        <span className="w-3 font-mono text-[9px] text-neutral-500 group-hover:hidden">01</span>
        <button className="hidden text-white group-hover:block shrink-0">
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
        <div className="truncate">
          <p className={\`truncate text-xs font-semibold \${isPlaying ? "text-emerald-400" : "text-white"}\`}>Starboy</p>
          <p className="truncate text-[9px] text-neutral-400">The Weeknd</p>
        </div>
      </div>
      <span className="font-mono text-[9px] text-neutral-500 shrink-0">3:50</span>
    </div>
  );
}`,
    },
    {
      id: "spotify-vinyl-player",
      name: "Spotify Vinyl Record Player",
      category: "Audio Architecture & Media",
      description: "Rotating vinyl record player disc sleeve with active spin.",
      component: <SpotifyVinylPlayer />,
      codeSnippet: `import { motion } from "framer-motion";
import { useState } from "react";
import { Disc } from "lucide-react";

export function SpotifyVinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex w-full max-w-[240px] flex-col items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-black p-3 text-white">
      <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="h-14 w-14 rounded-full border-2 border-neutral-900 bg-neutral-950 flex items-center justify-center">
        <Disc className="h-2.5 w-2.5 text-neutral-400" />
      </motion.div>
      <button onClick={() => setIsPlaying(!isPlaying)} className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 font-mono text-[9px] text-white">
        {isPlaying ? "Pause Vinyl" : "Play Vinyl Record"}
      </button>
    </div>
  );
}`,
    },
    {
      id: "spotify-album-card",
      name: "Spotify Album Artwork Card",
      category: "Audio Architecture & Media",
      description: "Album artwork card with hover play button trigger.",
      component: <SpotifyAlbumCard />,
      codeSnippet: `import { Play, Music } from "lucide-react";

export function SpotifyAlbumCard() {
  return (
    <div className="group relative w-44 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-white">
      <div className="relative aspect-square w-full rounded bg-neutral-900 flex items-center justify-center">
        <Music className="h-6 w-6 text-neutral-600" />
        <button className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black opacity-0 group-hover:opacity-100 transition-all">
          <Play className="h-3 w-3 ml-0.5 fill-black" />
        </button>
      </div>
      <div className="mt-2">
        <h4 className="truncate text-[11px] font-bold">Random Access Memories</h4>
        <p className="truncate text-[9px] text-neutral-400">Daft Punk • 2013</p>
      </div>
    </div>
  );
}`,
    },
    {
      id: "audio-waveform-visualizer",
      name: "Audio Waveform Visualizer",
      category: "Audio Architecture & Media",
      description: "Live frequency spectrum audio visualizer with spring physics.",
      component: <AudioWaveformVisualizer />,
      codeSnippet: `import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export function AudioWaveformVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState([20, 45, 80, 30, 90, 60, 40, 75, 55, 35, 95, 50]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setBars((prev) => prev.map(() => Math.floor(Math.random() * 75) + 20)), 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-2 rounded-lg border border-neutral-300 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between items-center">
        <button onClick={() => setIsPlaying(!isPlaying)} className="flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-white dark:bg-white dark:text-black">
          {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5 ml-0.5" />}
        </button>
        <span className="font-mono text-[10px] font-semibold">Audio Spectrum</span>
      </div>
      <div className="flex h-8 w-full items-end justify-between gap-0.5 rounded bg-neutral-100 p-1.5 dark:bg-neutral-900">
        {bars.map((height, i) => (
          <motion.div key={i} animate={{ height: isPlaying ? \`\${height}%\` : "20%" }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="w-full rounded-xs bg-neutral-900 dark:bg-white" />
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: "synthesizer-sound-pad",
      name: "Synthesizer Sound Pad",
      category: "Audio Architecture & Media",
      description: "Interactive 4-pad oscillator sound synthesizer widget.",
      component: <SynthesizerSoundPad />,
      codeSnippet: `import { useState } from "react";
import { Volume2 } from "lucide-react";

export function SynthesizerSoundPad() {
  const [activePad, setActivePad] = useState(null);
  const notes = [
    { name: "OSC 1", freq: "440Hz" },
    { name: "OSC 2", freq: "587Hz" },
    { name: "OSC 3", freq: "659Hz" },
    { name: "OSC 4", freq: "880Hz" }
  ];

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-3 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 font-bold text-neutral-900 dark:text-white">
          <Volume2 className="h-3 w-3" /> Audio Synth
        </span>
        <span className="text-[8px] text-neutral-400">4-PAD OSC</span>
      </div>
      <div className="grid grid-cols-2 gap-1 font-mono">
        {notes.map((n, i) => (
          <button key={i} onClick={() => setActivePad(i)} className="flex flex-col items-start rounded border p-1.5 dark:border-neutral-800 dark:bg-neutral-900">
            <span className="text-[9px] font-bold">{n.name}</span>
            <span className="text-[8px] opacity-70">{n.freq}</span>
          </button>
        ))}
      </div>
    </div>
  );
}`,
    },

    // ─── 3. Bespoke Widgets & Utilities ───────────────────────────────────────
    {
      id: "holographic-scanline-card",
      name: "Holographic Scanline Card",
      category: "Bespoke Widgets & Utilities",
      description: "Monochrome holographic card with hover scanline laser animation.",
      component: <HolographicScanlineCard />,
      codeSnippet: `import { useState } from "react";
import { ShieldAlert } from "lucide-react";

export function HolographicScanlineCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-800 bg-black p-3 font-mono text-white">
      <div className={\`pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent transition-transform duration-1000 \${hovered ? "translate-y-full" : "-translate-y-full"}\`} />
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <span className="text-[9px] font-bold">HOLO PASSPORT</span>
        <span className="rounded bg-neutral-800 px-1 py-0.2 text-[7px]">SECURE</span>
      </div>
      <div className="mt-2 flex justify-between">
        <div><p className="text-[8px] text-neutral-500">ID</p><p className="text-[10px] font-bold">#NAWFAL-8890</p></div>
      </div>
    </div>
  );
}`,
    },
    {
      id: "system-telemetry-monitor",
      name: "Hardware Telemetry Monitor",
      category: "Bespoke Widgets & Utilities",
      description: "Real-time simulated CPU & RAM telemetry gauge monitor.",
      component: <SystemTelemetryMonitor />,
      codeSnippet: `import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

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
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 font-mono dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between text-[10px] border-b pb-1 dark:border-neutral-800">
        <span className="flex items-center gap-1 font-bold"><Activity className="h-3 w-3" /> Telemetry</span>
        <span className="text-[8px] text-emerald-500">STABLE</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 text-[9px]">
        <div className="rounded border p-1.5 dark:border-neutral-800 dark:bg-neutral-900"><p className="text-neutral-500">CPU</p><p className="text-xs font-bold">{cpu}%</p></div>
        <div className="rounded border p-1.5 dark:border-neutral-800 dark:bg-neutral-900"><p className="text-neutral-500">RAM</p><p className="text-xs font-bold">{ram}%</p></div>
      </div>
    </div>
  );
}`,
    },
    {
      id: "color-harmony-wheel",
      name: "Luminance Harmony Wheel",
      category: "Bespoke Widgets & Utilities",
      description: "Monochrome luminance scale swatch generator.",
      component: <ColorHarmonyWheel />,
      codeSnippet: `export function ColorHarmonyWheel() {
  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between"><span className="font-bold">Luminance Swatches</span><span className="text-[8px] text-neutral-400">HEX #0A0A0A</span></div>
      <div className="grid grid-cols-4 gap-1">
        <div className="h-6 rounded bg-black flex items-center justify-center text-[7px] text-white font-bold">100%</div>
        <div className="h-6 rounded bg-neutral-900 flex items-center justify-center text-[7px] text-white font-bold">85%</div>
        <div className="h-6 rounded bg-neutral-700 flex items-center justify-center text-[7px] text-white font-bold">60%</div>
        <div className="h-6 rounded bg-neutral-200 text-black border flex items-center justify-center text-[7px] font-bold">15%</div>
      </div>
    </div>
  );
}`,
    },
    {
      id: "color-palette-picker",
      name: "Palette Tint Generator",
      category: "Bespoke Widgets & Utilities",
      description: "Real-time monochrome tint generator with click-to-copy.",
      component: <ColorPalettePicker />,
      codeSnippet: `import { useState } from "react";
import { Check } from "lucide-react";

export function ColorPalettePicker() {
  const [copiedHex, setCopiedHex] = useState(null);
  const palette = ["#0A0A0A", "#171717", "#262626", "#404040", "#FFFFFF"];

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border p-2.5 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between border-b pb-1 dark:border-neutral-800"><span className="font-bold">Palette Generator</span></div>
      <div className="grid grid-cols-5 gap-1">
        {palette.map((hex, i) => (
          <button key={i} onClick={() => handleCopy(hex)} style={{ backgroundColor: hex }} className="h-8 rounded border flex items-center justify-center">
            {copiedHex === hex && <Check className="h-3 w-3 text-emerald-400" />}
          </button>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: "live-bpm-metronome",
      name: "Live BPM Metronome",
      category: "Bespoke Widgets & Utilities",
      description: "Interactive metronome ticker with BPM beat pulse.",
      component: <LiveBpmMetronome />,
      codeSnippet: `import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export function LiveBpmMetronome() {
  const [bpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setBeat((p) => (p >= 4 ? 1 : p + 1)), (60 / bpm) * 1000);
    return () => clearInterval(interval);
  }, [isPlaying, bpm]);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border p-2.5 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between"><span className="font-bold">BPM Metronome</span><span>{bpm} BPM</span></div>
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex gap-1">{[1, 2, 3, 4].map((b) => <div key={b} className={\`h-4 w-4 rounded-full border flex items-center justify-center \${beat === b && isPlaying ? "bg-white text-black" : "bg-neutral-900 text-white"}\`}>{b}</div>)}</div>
        <button onClick={() => setIsPlaying(!isPlaying)} className="px-2.5 py-1 rounded bg-white text-black font-semibold">{isPlaying ? "Stop" : "Start"}</button>
      </div>
    </div>
  );
}`,
    },
    {
      id: "terminal-task-runner",
      name: "Terminal Task Runner",
      category: "Bespoke Widgets & Utilities",
      description: "Interactive build execution simulator with logs.",
      component: <TerminalTaskRunner />,
      codeSnippet: `import { useState } from "react";
import { Terminal, CheckCircle2 } from "lucide-react";

export function TerminalTaskRunner() {
  const [status, setStatus] = useState("idle");
  const [logs, setLogs] = useState([]);

  const startBuild = () => {
    setStatus("running");
    setLogs(["$ npm run build"]);
    setTimeout(() => setLogs((p) => [...p, "✔ Compiling App Router..."]), 500);
    setTimeout(() => { setLogs((p) => [...p, "✔ Build Success!"]); setStatus("done"); }, 1200);
  };

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 font-mono text-[10px] text-white">
      <div className="flex justify-between border-b border-neutral-800 pb-1">
        <span className="flex items-center gap-1 font-bold"><Terminal className="h-3 w-3" /> Build Runner</span>
        {status === "idle" && <button onClick={startBuild} className="rounded bg-neutral-800 px-1.5 py-0.5 text-[8px]">Run Build</button>}
        {status === "done" && <button onClick={startBuild} className="text-emerald-400 text-[8px] flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> Re-run</button>}
      </div>
      <div className="min-h-[40px] text-[9px] text-neutral-400 space-y-0.5">{logs.map((l, i) => <div key={i}>{l}</div>)}</div>
    </div>
  );
}`,
    },
    {
      id: "live-fps-performance-monitor",
      name: "Live FPS Monitor",
      category: "Bespoke Widgets & Utilities",
      description: "Real-time browser rendering performance gauge.",
      component: <LiveFpsPerformanceMonitor />,
      codeSnippet: `import { useState, useEffect } from "react";
import { Gauge } from "lucide-react";

export function LiveFpsPerformanceMonitor() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let count = 0; let last = performance.now();
    const loop = () => {
      const now = performance.now(); count++;
      if (now - last >= 1000) { setFps(count); count = 0; last = now; }
      requestAnimationFrame(loop);
    };
    const handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1 rounded-lg border border-neutral-300 bg-white p-2.5 font-mono text-[10px] dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between border-b pb-1 dark:border-neutral-800">
        <span className="flex items-center gap-1 font-bold"><Gauge className="h-3 w-3" /> FPS Monitor</span>
        <span className="text-emerald-500 font-bold">{fps} FPS</span>
      </div>
      <div className="flex justify-between text-[9px] text-neutral-500 pt-0.5"><span>Frame: 16.6ms</span><span>GPU: ON</span></div>
    </div>
  );
}`,
    },
    {
      id: "ai-prompt-matrix-generator",
      name: "AI Prompt Matrix Generator",
      category: "Bespoke Widgets & Utilities",
      description: "Structured prompt generator with copy trigger.",
      component: <AIPromptMatrixGenerator />,
      codeSnippet: `import { useState } from "react";
import { Zap, Copy, Check } from "lucide-react";

export function AIPromptMatrixGenerator() {
  const [prompt] = useState("Generate monochrome UI component");
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 font-mono text-[10px] text-white">
      <div className="flex justify-between border-b border-neutral-800 pb-1">
        <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> PROMPT MATRIX</span>
        <button onClick={() => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="rounded bg-neutral-800 px-1.5 py-0.5 text-[8px]">
          {copied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
        </button>
      </div>
      <p className="text-[10px] text-neutral-300 bg-neutral-900 p-1.5 rounded border border-neutral-800">&quot;{prompt}&quot;</p>
    </div>
  );
}`,
    },
    {
      id: "particle-mesh-node",
      name: "Particle Mesh Node",
      category: "Bespoke Widgets & Utilities",
      description: "Interactive node selector with glow spotlight feedback.",
      component: <ParticleMeshNode />,
      codeSnippet: `import { useState } from "react";

export function ParticleMeshNode() {
  const [activeNode, setActiveNode] = useState(2);

  return (
    <div className="relative flex h-16 w-full max-w-[260px] items-center justify-between rounded-lg border border-neutral-800 bg-black p-3 font-mono">
      <div className="flex w-full justify-between items-center">
        {[1, 2, 3, 4].map((node) => (
          <button key={node} onClick={() => setActiveNode(node)} className={\`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold \${activeNode === node ? "border-white bg-white text-black scale-105" : "border-neutral-800 bg-neutral-950 text-neutral-400"}\`}>
            N{node}
          </button>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: "physical-keyboard-tracker",
      name: "Hardware Keypress Tracker",
      category: "Bespoke Widgets & Utilities",
      description: "Real-time keypress listener lighting up 3D keys on user key events.",
      component: <PhysicalKeyboardTracker />,
      codeSnippet: `import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";

export function PhysicalKeyboardTracker() {
  const [activeKeys, setActiveKeys] = useState(new Set(["CMD", "K"]));
  const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between text-[11px]"><span className="flex items-center gap-1 font-semibold"><Keyboard className="h-3 w-3" /> Key Tracker</span></div>
      <div className="flex flex-wrap gap-0.5 font-mono">
        {keys.slice(0, 8).map((k) => (
          <div key={k} className={\`flex h-6 w-6 items-center justify-center rounded border text-[9px] font-bold \${activeKeys.has(k) ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"}\`}>{k}</div>
        ))}
      </div>
    </div>
  );
}`,
    },

    // ─── 4. Kinetic Motion & Physics ──────────────────────────────────────────
    {
      id: "magnetic-button",
      name: "Magnetic Button",
      category: "Kinetic Motion & Physics",
      description: "Physics spring button magnetizing to cursor glare.",
      component: <MagneticButton>Explore Motion</MagneticButton>,
      codeSnippet: `import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function MagneticButton({ children = "Explore Motion" }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPosition({ x: (e.clientX - (left + width / 2)) * 0.35, y: (e.clientY - (top + height / 2)) * 0.35 });
  };

  return (
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })} animate={{ x: position.x, y: position.y }} className="flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-medium text-white">
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5" />
    </motion.button>
  );
}`,
    },
    {
      id: "shimmer-beam-button",
      name: "Shimmer Beam Button",
      category: "Kinetic Motion & Physics",
      description: "Rotating metallic border beam effect.",
      component: <ShimmerBeamButton>Launch System</ShimmerBeamButton>,
      codeSnippet: `import { Zap } from "lucide-react";

export function ShimmerBeamButton({ children = "Launch System" }) {
  return (
    <button className="group relative inline-flex items-center justify-center overflow-hidden rounded p-[1px] font-mono text-xs font-semibold">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#fff_50%,#000_100%)]" />
      <span className="inline-flex h-full w-full items-center justify-center rounded bg-neutral-950 px-4 py-2 text-xs text-white">
        <Zap className="mr-1.5 h-3 w-3 text-neutral-300" />
        {children}
      </span>
    </button>
  );
}`,
    },
    {
      id: "particle-ripple-button",
      name: "Particle Burst Button",
      category: "Kinetic Motion & Physics",
      description: "Monochrome burst ring ripple on click.",
      component: <ParticleRippleButton />,
      codeSnippet: `import { useState } from "react";

export function ParticleRippleButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center">
      {clicked && <span className="absolute h-12 w-12 animate-ping rounded-full border border-neutral-400 opacity-75" />}
      <button onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 600); }} className="relative z-10 rounded border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 font-mono text-xs font-semibold text-white">
        Ripple Burst
      </button>
    </div>
  );
}`,
    },
    {
      id: "command-shortcut-widget",
      name: "Command Key Shortcut",
      category: "Kinetic Motion & Physics",
      description: "Keyboard shortcut card with click-to-copy.",
      component: <CommandShortcutWidget />,
      codeSnippet: `import { useState } from "react";
import { Command } from "lucide-react";

export function CommandShortcutWidget() {
  const [copied, setCopied] = useState(false);

  return (
    <div onClick={() => { navigator.clipboard.writeText("⌘ + K"); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="cursor-pointer rounded border border-neutral-800 bg-neutral-950 p-2.5 text-xs text-white">
      <div className="flex items-center justify-between"><span className="flex items-center gap-1.5"><Command className="h-3.5 w-3.5" /> Shortcut</span><span className="font-mono text-[10px] text-neutral-400">{copied ? "Copied" : "⌘+K"}</span></div>
    </div>
  );
}`,
    },
    {
      id: "segmented-control-switch",
      name: "Segmented Control Switch",
      category: "Kinetic Motion & Physics",
      description: "Sleek sliding tab selector pill.",
      component: <SegmentedControlSwitch />,
      codeSnippet: `import { useState } from "react";

export function SegmentedControlSwitch() {
  const [selected, setSelected] = useState(0);
  const options = ["Preview", "Code", "Docs"];

  return (
    <div className="flex rounded bg-neutral-900 p-1">
      {options.map((opt, i) => (
        <button key={i} onClick={() => setSelected(i)} className={\`rounded px-2.5 py-1 text-[11px] font-medium \${selected === i ? "bg-white text-black" : "text-neutral-400"}\`}>{opt}</button>
      ))}
    </div>
  );
}`,
    },
    {
      id: "matrix-digital-stream",
      name: "Monochrome Matrix Stream",
      category: "Kinetic Motion & Physics",
      description: "Digital stream matrix background component with toggle.",
      component: <MatrixDigitalStream />,
      codeSnippet: `import { useState } from "react";

export function MatrixDigitalStream() {
  const [active, setActive] = useState(true);

  return (
    <div className="relative flex h-20 w-full max-w-[260px] items-center justify-center overflow-hidden rounded-lg border border-neutral-800 bg-black font-mono text-[9px] text-white">
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="font-bold uppercase">MATRIX STREAM</span>
        <button onClick={() => setActive(!active)} className="rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[8px] text-neutral-300">
          {active ? "Active" : "Paused"}
        </button>
      </div>
    </div>
  );
}`,
    },

    // ─── 5. Structural Containers & Surfaces ──────────────────────────────────
    {
      id: "monochrome-glow-card",
      name: "Spotlight Glow Card",
      category: "Structural Containers & Surfaces",
      description: "Radial mouse spotlight border highlight.",
      component: <MonochromeGlowCard title="Spotlight Glow" description="Cursor tracking border." />,
      codeSnippet: `import { useState, useRef } from "react";

export function MonochromeGlowCard({ title = "Monochrome Glow", description = "Spotlight card." }) {
  const cardRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setCursor((p) => ({ ...p, opacity: 0 }))} className="relative w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/80 p-3 text-white">
      <div className="pointer-events-none absolute -inset-px transition-opacity" style={{ opacity: cursor.opacity, background: \`radial-gradient(300px circle at \${cursor.x}px \${cursor.y}px, rgba(255, 255, 255, 0.12), transparent 40%)\` }} />
      <div className="relative z-10"><h4 className="text-xs font-bold">{title}</h4><p className="text-[11px] text-neutral-400">{description}</p></div>
    </div>
  );
}`,
    },
    {
      id: "cyber-border-card",
      name: "Cyber Grid Card",
      category: "Structural Containers & Surfaces",
      description: "Futuristic corner crosshairs & node status.",
      component: <CyberBorderCard title="Node System" status="Active" />,
      codeSnippet: `export function CyberBorderCard({ title = "Cyber Node", status = "Active" }) {
  return (
    <div className="relative w-full max-w-[260px] rounded-lg border border-neutral-800 bg-black p-3 text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
        <span className="font-mono text-[9px] font-medium uppercase text-neutral-200">{status}</span>
        <span className="font-mono text-[9px] text-neutral-500">0x4F</span>
      </div>
      <p className="mt-1.5 text-xs font-semibold">{title}</p>
    </div>
  );
}`,
    },
    {
      id: "tilt-parallax-card",
      name: "3D Tilt Parallax Card",
      category: "Structural Containers & Surfaces",
      description: "3D perspective tilt on mouse movement.",
      component: <TiltParallaxCard />,
      codeSnippet: `import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu } from "lucide-react";

export function TiltParallaxCard() {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [10, -10]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-10, 10]), { stiffness: 300, damping: 20 });

  return (
    <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2); }} onMouseLeave={() => { x.set(0); y.set(0); }} className="relative w-full max-w-[260px] cursor-pointer rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-white">
      <div style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2"><Cpu className="h-4 w-4" /><span className="text-xs font-bold">3D Gyroscope</span></div>
    </motion.div>
  );
}`,
    },
    {
      id: "interactive-dock",
      name: "Floating macOS Dock",
      category: "Structural Containers & Surfaces",
      description: "Icon dock bar with hover scaling.",
      component: <InteractiveDock />,
      codeSnippet: `import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Terminal, Sliders, ShieldCheck } from "lucide-react";

export function InteractiveDock() {
  const [active, setActive] = useState(0);
  const items = [Layers, Terminal, Sliders, ShieldCheck];

  return (
    <div className="flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950/70 p-1.5 backdrop-blur-md">
      <div className="flex items-center gap-1">
        {items.map((Icon, idx) => (
          <motion.button key={idx} onClick={() => setActive(idx)} whileHover={{ scale: 1.2, y: -2 }} className={\`flex h-8 w-8 items-center justify-center rounded-lg \${active === idx ? "bg-white text-black" : "text-neutral-400 hover:text-white"}\`}>
            <Icon className="h-3.5 w-3.5" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: "terminal-code-window",
      name: "Retro CLI Terminal Window",
      category: "Structural Containers & Surfaces",
      description: "Dark CLI window with action logs.",
      component: <TerminalCodeWindow />,
      codeSnippet: `export function TerminalCodeWindow() {
  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded border border-neutral-800 bg-neutral-950 font-mono text-[10px] text-white">
      <div className="border-b border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[9px] text-neutral-400">nawfal-cli.sh</div>
      <div className="p-2.5 text-neutral-300">$ npx nawfal-ui@latest add</div>
    </div>
  );
}`,
    },
    {
      id: "accordion-item-component",
      name: "Accordion FAQ Item",
      category: "Structural Containers & Surfaces",
      description: "Spring physics expanding card.",
      component: <AccordionItemComponent />,
      codeSnippet: `import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function AccordionItemComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[260px] rounded border border-neutral-800 bg-neutral-950 text-white">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-2.5 text-xs font-semibold">
        <span>Monochrome Philosophy</span>
        <ChevronDown className={\`h-3.5 w-3.5 transition-transform \${open ? "rotate-180" : ""}\`} />
      </button>
      {open && <div className="border-t border-neutral-800 p-2.5 text-[10px] text-neutral-400">Pure clarity & spring physics.</div>}
    </div>
  );
}`,
    },

    // ─── 6. Interactive Inputs & Controls ─────────────────────────────────────
    {
      id: "glass-input",
      name: "Glassmorphism Floating Input",
      category: "Interactive Inputs & Controls",
      description: "Floating label backdrop blur input.",
      component: <GlassInput label="Email Address" placeholder="nawfal@example.com" />,
      codeSnippet: `import { useState } from "react";

export function GlassInput({ label = "Email Address", placeholder = "nawfal@example.com" }) {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full max-w-[260px] rounded border border-neutral-800 bg-neutral-950/70 p-1 backdrop-blur-md text-white">
      <label className="block px-2 pt-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500">{label}</label>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="w-full bg-transparent px-2 pb-1 text-xs text-white outline-none placeholder:text-neutral-600" />
    </div>
  );
}`,
    },
    {
      id: "pincode-otp-input",
      name: "Pin Code OTP Input",
      category: "Interactive Inputs & Controls",
      description: "4-digit PIN verification auto-advance.",
      component: <PinCodeOTPInput />,
      codeSnippet: `import { useState, useRef } from "react";

export function PinCodeOTPInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp]; newOtp[index] = text.slice(-1); setOtp(newOtp);
    if (text && index < 3) inputsRef.current[index + 1]?.focus();
  };

  return (
    <div className="flex gap-1.5">
      {otp.map((digit, idx) => (
        <input key={idx} ref={(el) => { inputsRef.current[idx] = el; }} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(e.target.value, idx)} className="h-8 w-7 rounded border border-neutral-800 bg-neutral-950 text-center font-mono text-xs font-bold text-white focus:outline-none" />
      ))}
    </div>
  );
}`,
    },
    {
      id: "compact-toggle-switch",
      name: "Compact Toggle Switch",
      category: "Interactive Inputs & Controls",
      description: "Minimalist boolean state toggle.",
      component: <CompactToggleSwitch />,
      codeSnippet: `import { useState } from "react";

export function CompactToggleSwitch() {
  const [enabled, setEnabled] = useState(true);

  return (
    <button onClick={() => setEnabled(!enabled)} className={\`relative inline-flex h-4 w-7 items-center rounded-full \${enabled ? "bg-white" : "bg-neutral-800"}\`}>
      <span className={\`inline-block h-3 w-3 transform rounded-full bg-black transition-transform \${enabled ? "translate-x-3.5" : "translate-x-0.5"}\`} />
    </button>
  );
}`,
    },

    // ─── 7. Telemetry & System Signals ────────────────────────────────────────
    {
      id: "minimal-pulse-badge",
      name: "Minimal Pulse Badge",
      category: "Telemetry & System Signals",
      description: "Monochrome live ping indicator dot.",
      component: <MinimalPulseBadge text="Operational" />,
      codeSnippet: `export function MinimalPulseBadge({ text = "Operational" }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-0.5 text-[11px] font-medium text-neutral-200">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      <span>{text}</span>
    </div>
  );
}`,
    },
    {
      id: "radar-sweep-badge",
      name: "Radar Sweep Status",
      category: "Telemetry & System Signals",
      description: "Spinning radar scan indicator.",
      component: <RadarSweepBadge />,
      codeSnippet: `export function RadarSweepBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-black px-3 py-1 font-mono text-[10px] text-neutral-200">
      <span className="h-2 w-2 animate-spin rounded-full border border-t-white border-neutral-600" />
      <span>RADAR ACTIVE</span>
    </div>
  );
}`,
    },
    {
      id: "pipeline-step",
      name: "Pipeline Step Badge",
      category: "Telemetry & System Signals",
      description: "Compact vertical step indicator.",
      component: <PipelineStep />,
      codeSnippet: `export function PipelineStep() {
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-neutral-200">
      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-[10px] font-bold">1</div>
      <span>Build Pipeline</span>
      <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[9px] text-neutral-400">PASSED</span>
    </div>
  );
}`,
    },
    {
      id: "notification-toast-banner",
      name: "Notification Toast Banner",
      category: "Telemetry & System Signals",
      description: "Minimal toast with action close.",
      component: <NotificationToastBanner />,
      codeSnippet: `import { useState } from "react";
import { Bell, X } from "lucide-react";

export function NotificationToastBanner() {
  const [show, setShow] = useState(true);
  if (!show) return <button onClick={() => setShow(true)} className="text-xs text-neutral-400 underline">Reset Toast</button>;

  return (
    <div className="flex items-center justify-between gap-3 rounded border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-white">
      <div className="flex items-center gap-2 text-xs"><Bell className="h-3.5 w-3.5" /><span className="font-medium">Component Exported</span></div>
      <X onClick={() => setShow(false)} className="h-3.5 w-3.5 cursor-pointer text-neutral-400 hover:text-white" />
    </div>
  );
}`,
    },
    {
      id: "avatar-group-pile",
      name: "Avatar Group Overlap",
      category: "Telemetry & System Signals",
      description: "Overlapping monochrome avatars.",
      component: <AvatarGroupPile />,
      codeSnippet: `export function AvatarGroupPile() {
  return (
    <div className="flex items-center -space-x-2 font-mono">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-neutral-100 text-[9px] font-bold text-black">U{i}</div>
      ))}
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-neutral-800 text-[8px] font-semibold text-neutral-300">+5</div>
    </div>
  );
}`,
    },
    {
      id: "metric-badge-card",
      name: "Metric Key-Value Card",
      category: "Telemetry & System Signals",
      description: "Compact telemetry performance card.",
      component: <MetricBadgeCard />,
      codeSnippet: `export function MetricBadgeCard() {
  return (
    <div className="flex items-center justify-between rounded border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-xs text-white min-w-[140px]">
      <span className="text-neutral-400">Latency</span>
      <span className="font-mono font-bold">12ms</span>
    </div>
  );
}`,
    },
    {
      id: "git-branch-tree-graph",
      name: "Git Branch Tree Graph",
      category: "Telemetry & System Signals",
      description: "Interactive commit graph visualizer with HEAD selector.",
      component: <GitBranchTreeGraph />,
      codeSnippet: `import { useState } from "react";
import { GitBranch, GitCommit } from "lucide-react";

export function GitBranchTreeGraph() {
  const [selectedCommit, setSelectedCommit] = useState("feat/uikit-v3");
  const commits = [
    { hash: "8f3a92b", msg: "init: monochrome tokens", branch: "main" },
    { hash: "2c7e14f", msg: "feat: add 42 components", branch: "feat/uikit-v3" },
  ];

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5 rounded-lg border border-neutral-300 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex justify-between text-[11px]"><span className="flex items-center gap-1 font-semibold"><GitBranch className="h-3 w-3" /> Git Graph</span></div>
      <div className="space-y-1 font-mono text-[9px]">
        {commits.map((c, i) => (
          <div key={i} onClick={() => setSelectedCommit(c.branch)} className="flex items-center justify-between rounded border p-1 border-neutral-200 dark:border-neutral-800">
            <span className="font-bold">{c.hash}</span><span className="text-neutral-500 truncate">{c.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    },
  ];

  const filteredComponents = uikitComponents.filter((item) => {
    const matchesCategory = selectedCategory === "All System Components" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCli = () => {
    navigator.clipboard.writeText("npx nawfal-ui@latest init");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="pad-x min-h-[100svh] w-full pb-8 pt-4 sm:pb-12 md:pt-8">
      {/* Ecosystem Hero Header */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white shadow-xs sm:p-5 md:p-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-[9px] uppercase text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:text-[10px]">
                v5.2.0 NextGen CLI Edition
              </span>
              <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-600 dark:text-emerald-400 sm:text-[10px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" /> 48 Components Verified
              </span>
            </div>
            <h1 className="mt-2 text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-2xl md:text-3xl">
              Nawfal UI Kit
            </h1>
            <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400 max-w-xl sm:text-xs">
              Production-grade monochromatic component architecture featuring authoritative taxonomy, AI RAG engines, audio media suites, and full source code specs.
            </p>
          </div>

          {/* CLI Copy Bar */}
          <div 
            onClick={handleCopyCli}
            className="group flex w-full cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-[11px] text-neutral-800 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:border-neutral-600 sm:w-auto sm:gap-3 sm:px-3.5 sm:text-xs"
          >
            <Terminal className="h-3.5 w-3.5 shrink-0 text-neutral-500 dark:text-neutral-400 sm:h-4 sm:w-4" />
            <span className="truncate">npx nawfal-ui@latest init</span>
            <button className="shrink-0 rounded border border-neutral-300 bg-neutral-200 p-1 text-neutral-700 hover:text-black dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white">
              {copiedCli ? <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Navigation Tabs */}
      <nav className="sticky top-[57px] z-30 my-4 flex items-center justify-between gap-1.5 overflow-x-auto rounded-lg border border-neutral-200 bg-white/90 p-1 backdrop-blur-md no-scrollbar dark:border-neutral-800 dark:bg-neutral-950/90 sm:my-6 sm:gap-2">
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setActiveTab("components")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "components"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Components ({uikitComponents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "documents"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Documents</span>
          </button>

          <button
            onClick={() => setActiveTab("tools")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "tools"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Tools</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "templates"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => setActiveTab("playground")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "playground"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Design Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("learn")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "learn"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Learn & FAQ</span>
          </button>

          <button
            onClick={() => setActiveTab("community")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "community"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Community</span>
          </button>
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 px-2 font-mono text-[10px] text-neutral-400 lg:flex">
          <Zap className="h-3 w-3 text-neutral-400" />
          <span>Enterprise Taxonomy</span>
        </div>
      </nav>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {/* Tab 1: Components Sandbox */}
        {activeTab === "components" && (
          <motion.div
            key="tab-components"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Category Filter Toolbar */}
            <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50/50 p-2 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/40 sm:flex-row sm:items-center sm:gap-2">
              {/* Category Pills Slider Container with Left & Right Arrow Controls */}
              <div className="relative flex min-w-0 flex-1 items-center gap-1">
                {/* Left Scroll Arrow Button */}
                <button
                  type="button"
                  onClick={() => scrollCategory("left")}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-600 shadow-xs transition-colors hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  title="Scroll Left"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                {/* Draggable & Scrollable Category Bar */}
                <div
                  ref={categoryScrollRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeaveOrUp}
                  onMouseUp={handleMouseLeaveOrUp}
                  onMouseMove={handleMouseMove}
                  className={`flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-0.5 no-scrollbar select-none ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  {categories.map((cat) => {
                    const count =
                      cat === "All System Components"
                        ? uikitComponents.length
                        : uikitComponents.filter((c) => c.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          if (!isDragging) setSelectedCategory(cat);
                        }}
                        className={`flex shrink-0 items-center gap-1 rounded px-2.5 py-1 text-[10px] font-medium transition-all whitespace-nowrap sm:text-[11px] ${
                          selectedCategory === cat
                            ? "bg-neutral-900 text-white shadow-xs dark:bg-white dark:text-black font-semibold"
                            : "bg-white text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="font-mono text-[8px] opacity-70 sm:text-[9px]">({count})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Scroll Arrow Button */}
                <button
                  type="button"
                  onClick={() => scrollCategory("right")}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-600 shadow-xs transition-colors hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  title="Scroll Right"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative w-full shrink-0 sm:w-44 md:w-48">
                <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter components..."
                  className="w-full rounded border border-neutral-300 bg-white py-1.5 pl-8 pr-2.5 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white sm:py-1"
                />
              </div>
            </div>

            {/* 3-Column Grid Layout */}
            {filteredComponents.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredComponents.map((item) => (
                  <ComponentCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    description={item.description}
                    component={item.component}
                    codeSnippet={item.codeSnippet}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-12 text-center dark:border-neutral-800">
                <p className="text-xs text-neutral-500">No components found.</p>
                <button
                  onClick={() => { setSelectedCategory("All System Components"); setSearchQuery(""); }}
                  className="mt-2 text-xs font-semibold underline text-neutral-900 dark:text-neutral-100"
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 2: Documents */}
        {activeTab === "documents" && (
          <motion.div key="tab-documents" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <DocsSection />
          </motion.div>
        )}

        {/* Tab 3: Tools */}
        {activeTab === "tools" && (
          <motion.div key="tab-tools" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <ToolsSection />
          </motion.div>
        )}

        {/* Tab 4: Templates */}
        {activeTab === "templates" && (
          <motion.div key="tab-templates" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <TemplatesSection />
          </motion.div>
        )}

        {/* Tab 5: Playground */}
        {activeTab === "playground" && (
          <motion.div key="tab-playground" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <PlaygroundSection />
          </motion.div>
        )}

        {/* Tab 6: Learn & FAQ */}
        {activeTab === "learn" && (
          <motion.div key="tab-learn" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <LearnSection />
          </motion.div>
        )}

        {/* Tab 7: Community */}
        {activeTab === "community" && (
          <motion.div key="tab-community" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <CommunitySection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
