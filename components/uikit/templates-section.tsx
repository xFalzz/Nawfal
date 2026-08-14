"use client";

import React, { useState } from "react";
import {
  LayoutGrid, Check, Copy, Brain, Music2, ShieldCheck, Cpu,
  GitBranch, MessageSquare, TrendingUp, Keyboard, Search, Zap,
  Radio, Layers, Code2, Users, Lock, Globe, Terminal
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// ─── AI & Intelligence Imports ────────────────────────────────────────────────
import { AINeuralVoiceSpectrum, AIPromptTokenCalculator, FloatingCommandPalette } from "@/components/uikit/nextgen-components";
import { AIStreamSimulator, AIGenerativeSemanticSearch, AIVisionPromptInspector } from "@/components/uikit/innovative-components";
import { AIPromptMatrixGenerator } from "@/components/uikit/out-of-the-box";

// ─── Media & Audio Imports ────────────────────────────────────────────────────
import { SpotifyMiniPlayer, SpotifyTrackListItem, SpotifyVinylPlayer, SpotifyAlbumCard } from "@/components/uikit/spotify-components";
import { SynthesizerSoundPad } from "@/components/uikit/out-of-the-box";
import { AudioWaveformVisualizer } from "@/components/uikit/innovative-components";

// ─── DevOps & Systems Imports ─────────────────────────────────────────────────
import { SystemTelemetryMonitor, HolographicScanlineCard } from "@/components/uikit/out-of-the-box";
import { InteractiveCodeDiffViewer, GitBranchTreeGraph, MatrixDigitalStream, PhysicalKeyboardTracker } from "@/components/uikit/innovative-components";
import { QuantumParticleMatrix, MultiStepPipelineWizard } from "@/components/uikit/nextgen-components";

// ─── Auth & Security Imports ──────────────────────────────────────────────────
import { GlassInput, PinCodeOTPInput, ShimmerBeamButton, CyberBorderCard, MonochromeGlowCard } from "@/components/uikit/custom-components";

// ─── UI Controls Imports ──────────────────────────────────────────────────────
import { MagneticButton, ParticleRippleButton, InteractiveDock, SegmentedControlSwitch, CompactToggleSwitch, NotificationToastBanner, AvatarGroupPile, MetricBadgeCard, CommandShortcutWidget, MinimalPulseBadge, RadarSweepBadge } from "@/components/uikit/custom-components";

// ─── Advanced Innovations Imports ─────────────────────────────────────────────
import {
  AIReasoningAccordion,
  VoiceOrbVisualizer,
  SpotlightBentoGrid,
  BorderBeamCard,
  MacOSFloatingDock,
  ServerLatencyMatrix,
  GitCommitFlowGraph,
  VinylDiscPlayer,
} from "@/components/uikit/advanced-components";

// ─── Category & Filter Config ─────────────────────────────────────────────────
type Category = "All" | "AI & Intelligence" | "Media & Audio" | "DevOps & Systems" | "Auth & Security" | "Data & Analytics" | "Developer Tools" | "UI Controls";

const categories: { id: Category; icon: React.ReactNode; count: number }[] = [
  { id: "All",               icon: <LayoutGrid className="h-3 w-3" />,    count: 0 },
  { id: "AI & Intelligence", icon: <Brain className="h-3 w-3" />,         count: 4 },
  { id: "Media & Audio",     icon: <Music2 className="h-3 w-3" />,        count: 3 },
  { id: "DevOps & Systems",  icon: <Cpu className="h-3 w-3" />,           count: 3 },
  { id: "Auth & Security",   icon: <ShieldCheck className="h-3 w-3" />,   count: 2 },
  { id: "Data & Analytics",  icon: <TrendingUp className="h-3 w-3" />,    count: 3 },
  { id: "Developer Tools",   icon: <GitBranch className="h-3 w-3" />,     count: 3 },
  { id: "UI Controls",       icon: <Layers className="h-3 w-3" />,        count: 3 },
];

export function TemplatesSection() {
  const { toast } = useToast();
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const templates = [
    // ─── AI & Intelligence ────────────────────────────────────────────────────
    {
      id: "ai-copilot-workspace",
      title: "AI Neural Copilot Workspace",
      category: "AI & Intelligence" as Category,
      difficulty: "Advanced",
      components: ["AINeuralVoiceSpectrum", "AIPromptTokenCalculator"],
      description: "Enterprise AI assistant panel with real-time voice spectrum visualization and live token calculator for prompt engineering.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-400 text-[11px]">
              <Brain className="h-3.5 w-3.5" /> AI COPILOT WORKSPACE
            </span>
            <span className="rounded border border-emerald-900 bg-emerald-950/60 px-2 py-0.5 text-[9px] text-emerald-400 font-bold">ONLINE</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AINeuralVoiceSpectrum />
            <AIPromptTokenCalculator />
          </div>
        </div>
      ),
      code: `import { AINeuralVoiceSpectrum, AIPromptTokenCalculator } from "@/components/uikit/nextgen-components";

export function AICopilotWorkspace() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
      <div className="flex justify-between border-b border-neutral-800 pb-2">
        <span className="font-bold text-sky-400">AI COPILOT WORKSPACE</span>
        <span className="text-emerald-400 font-bold">ONLINE</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AINeuralVoiceSpectrum />
        <AIPromptTokenCalculator />
      </div>
    </div>
  );
}`
    },
    {
      id: "ai-stream-prompt-inspector",
      title: "AI Stream & Prompt Inspector",
      category: "AI & Intelligence" as Category,
      difficulty: "Intermediate",
      components: ["AIStreamSimulator", "AIVisionPromptInspector"],
      description: "Real-time AI response stream simulator paired with vision model prompt inspector for analyzing multimodal inference.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-violet-400 text-[11px]">
              <Zap className="h-3.5 w-3.5" /> AI INFERENCE STUDIO
            </span>
            <span className="flex items-center gap-1 text-[9px] text-violet-400 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> STREAMING
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AIStreamSimulator />
            <AIVisionPromptInspector />
          </div>
        </div>
      ),
      code: `import { AIStreamSimulator, AIVisionPromptInspector } from "@/components/uikit/innovative-components";

export function AIInferenceStudio() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex justify-between border-b border-neutral-800 pb-2">
        <span className="font-bold font-mono text-violet-400">AI INFERENCE STUDIO</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AIStreamSimulator />
        <AIVisionPromptInspector />
      </div>
    </div>
  );
}`
    },
    {
      id: "ai-semantic-command-hub",
      title: "AI Semantic Search & Command Hub",
      category: "AI & Intelligence" as Category,
      difficulty: "Intermediate",
      components: ["AIGenerativeSemanticSearch", "FloatingCommandPalette"],
      description: "Intelligent search panel combining generative semantic search with floating command palette for blazing-fast navigation.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-sky-400 text-[11px]">
              <Search className="h-3.5 w-3.5" /> SEMANTIC COMMAND HUB
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">⌘K SEARCH</span>
          </div>
          <AIGenerativeSemanticSearch />
        </div>
      ),
      code: `import { AIGenerativeSemanticSearch, FloatingCommandPalette } from "@/components/uikit/innovative-components";
import { FloatingCommandPalette as FCP } from "@/components/uikit/nextgen-components";

export function SemanticCommandHub() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <AIGenerativeSemanticSearch />
      <FCP />
    </div>
  );
}`
    },
    {
      id: "ai-prompt-matrix-lab",
      title: "AI Prompt Matrix Laboratory",
      category: "AI & Intelligence" as Category,
      difficulty: "Advanced",
      components: ["AIPromptMatrixGenerator", "AIStreamSimulator"],
      description: "Full-featured prompt engineering workbench combining prompt matrix generation with live stream simulation for testing outputs.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
              <Layers className="h-3.5 w-3.5" /> PROMPT MATRIX LAB
            </span>
            <span className="rounded bg-amber-950/60 border border-amber-900 px-2 py-0.5 text-[9px] text-amber-400">ENGINEERING</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AIPromptMatrixGenerator />
            <AIStreamSimulator />
          </div>
        </div>
      ),
      code: `import { AIPromptMatrixGenerator } from "@/components/uikit/out-of-the-box";
import { AIStreamSimulator } from "@/components/uikit/innovative-components";

export function PromptMatrixLab() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <AIPromptMatrixGenerator />
      <AIStreamSimulator />
    </div>
  );
}`
    },

    // ─── Media & Audio ────────────────────────────────────────────────────────
    {
      id: "audio-studio-player",
      title: "Hi-Fi Audio Studio",
      category: "Media & Audio" as Category,
      difficulty: "Intermediate",
      components: ["SpotifyMiniPlayer", "AudioWaveformVisualizer"],
      description: "Studio-grade audio workbench combining Spotify mini player with live waveform physics visualizer and real-time spectrum analysis.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-indigo-400 text-[11px]">
              <Music2 className="h-3.5 w-3.5" /> NAWFAL SOUND STUDIO
            </span>
            <span className="text-[9px] text-neutral-500">96 kHz / 24-bit FLAC</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SpotifyMiniPlayer />
            <AudioWaveformVisualizer />
          </div>
        </div>
      ),
      code: `import { SpotifyMiniPlayer } from "@/components/uikit/spotify-components";
import { AudioWaveformVisualizer } from "@/components/uikit/innovative-components";

export function HiFiAudioStudio() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <SpotifyMiniPlayer />
      <AudioWaveformVisualizer />
    </div>
  );
}`
    },
    {
      id: "vinyl-album-shelf",
      title: "Vinyl Record Album Shelf",
      category: "Media & Audio" as Category,
      difficulty: "Beginner",
      components: ["SpotifyVinylPlayer", "SpotifyAlbumCard", "SpotifyTrackListItem"],
      description: "Retro-modern vinyl record player UI combining spinning vinyl animation, album artwork card, and track list selector.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px]">
              <Radio className="h-3.5 w-3.5" /> VINYL RECORD PLAYER
            </span>
            <span className="text-[9px] text-emerald-400 animate-pulse">◉ NOW PLAYING</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SpotifyVinylPlayer />
            <div className="flex flex-col gap-2">
              <SpotifyAlbumCard />
              <SpotifyTrackListItem />
            </div>
          </div>
        </div>
      ),
      code: `import { SpotifyVinylPlayer, SpotifyAlbumCard, SpotifyTrackListItem } from "@/components/uikit/spotify-components";

export function VinylAlbumShelf() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SpotifyVinylPlayer />
        <div className="flex flex-col gap-2">
          <SpotifyAlbumCard />
          <SpotifyTrackListItem />
        </div>
      </div>
    </div>
  );
}`
    },
    {
      id: "synthesizer-lab",
      title: "Modular Synthesizer Workstation",
      category: "Media & Audio" as Category,
      difficulty: "Advanced",
      components: ["SynthesizerSoundPad", "AudioWaveformVisualizer"],
      description: "Fully interactive modular synthesizer environment featuring touch-sensitive sound pads and live audio waveform feedback.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-rose-400 text-[11px]">
              <Zap className="h-3.5 w-3.5" /> MODULAR SYNTH STATION
            </span>
            <span className="rounded border border-rose-900 bg-rose-950/60 px-2 py-0.5 text-[9px] text-rose-400">ARMED</span>
          </div>
          <div className="flex flex-col gap-3">
            <SynthesizerSoundPad />
            <AudioWaveformVisualizer />
          </div>
        </div>
      ),
      code: `import { SynthesizerSoundPad } from "@/components/uikit/out-of-the-box";
import { AudioWaveformVisualizer } from "@/components/uikit/innovative-components";

export function SynthesizerWorkstation() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <SynthesizerSoundPad />
      <AudioWaveformVisualizer />
    </div>
  );
}`
    },

    // ─── DevOps & Systems ─────────────────────────────────────────────────────
    {
      id: "telemetry-ops-dashboard",
      title: "DevOps Telemetry Control Room",
      category: "DevOps & Systems" as Category,
      difficulty: "Advanced",
      components: ["SystemTelemetryMonitor", "HolographicScanlineCard", "QuantumParticleMatrix"],
      description: "Real-time infrastructure telemetry suite with system monitor, holographic scanline visualization, and quantum particle mesh network topology.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400 text-[11px]">
              <Cpu className="h-3.5 w-3.5" /> SYSTEM TELEMETRY OPS
            </span>
            <span className="rounded border border-emerald-900 bg-emerald-950/60 px-2 py-0.5 text-[9px] text-emerald-400 font-bold animate-pulse">ALL NOMINAL</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SystemTelemetryMonitor />
            <HolographicScanlineCard />
          </div>
        </div>
      ),
      code: `import { SystemTelemetryMonitor, HolographicScanlineCard } from "@/components/uikit/out-of-the-box";

export function TelemetryControlRoom() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <SystemTelemetryMonitor />
      <HolographicScanlineCard />
    </div>
  );
}`
    },
    {
      id: "git-pipeline-dashboard",
      title: "CI/CD Pipeline & Git Graph",
      category: "DevOps & Systems" as Category,
      difficulty: "Intermediate",
      components: ["GitBranchTreeGraph", "MultiStepPipelineWizard", "InteractiveCodeDiffViewer"],
      description: "Full CI/CD control panel combining interactive git branch tree graph, multi-step pipeline wizard, and live code diff viewer.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-sky-400 text-[11px]">
              <GitBranch className="h-3.5 w-3.5" /> CI/CD PIPELINE CONTROL
            </span>
            <span className="rounded border border-sky-900 bg-sky-950/60 px-2 py-0.5 text-[9px] text-sky-400">DEPLOYING</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <GitBranchTreeGraph />
            <InteractiveCodeDiffViewer />
          </div>
        </div>
      ),
      code: `import { GitBranchTreeGraph, InteractiveCodeDiffViewer } from "@/components/uikit/innovative-components";
import { MultiStepPipelineWizard } from "@/components/uikit/nextgen-components";

export function CICDPipelineDashboard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <GitBranchTreeGraph />
      <InteractiveCodeDiffViewer />
    </div>
  );
}`
    },
    {
      id: "matrix-network-visualizer",
      title: "Matrix Network Topology",
      category: "DevOps & Systems" as Category,
      difficulty: "Advanced",
      components: ["MatrixDigitalStream", "QuantumParticleMatrix"],
      description: "Immersive network topology visualization combining matrix digital rain stream with quantum particle mesh node connectivity map.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-green-400 text-[11px]">
              <Terminal className="h-3.5 w-3.5" /> MATRIX NETWORK TOPOLOGY
            </span>
            <span className="text-[9px] text-green-500 font-mono animate-pulse">◈ LIVE MESH</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MatrixDigitalStream />
            <QuantumParticleMatrix />
          </div>
        </div>
      ),
      code: `import { MatrixDigitalStream } from "@/components/uikit/innovative-components";
import { QuantumParticleMatrix } from "@/components/uikit/nextgen-components";

export function MatrixNetworkTopology() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <MatrixDigitalStream />
      <QuantumParticleMatrix />
    </div>
  );
}`
    },

    // ─── Auth & Security ──────────────────────────────────────────────────────
    {
      id: "cyber-auth-modal",
      title: "Cyberpunk Auth & OTP Panel",
      category: "Auth & Security" as Category,
      difficulty: "Intermediate",
      components: ["GlassInput", "PinCodeOTPInput", "ShimmerBeamButton"],
      description: "Multi-step authentication flow with glassmorphism email input, 4-digit OTP verification, and high-security shimmer CTA button.",
      preview: (
        <div className="flex w-full flex-col gap-3 items-center rounded-xl border border-neutral-800 bg-neutral-950 p-5 font-mono text-xs text-white">
          <div className="flex w-full justify-between items-center border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-amber-400 text-[11px]">
              <Lock className="h-3.5 w-3.5" /> CYBER VERIFICATION
            </span>
            <span className="text-[9px] text-amber-400">STEP 2 / 3</span>
          </div>
          <GlassInput label="Verification Email" placeholder="user@nawfal.io" />
          <PinCodeOTPInput />
          <ShimmerBeamButton>VERIFY SECURITY PIN</ShimmerBeamButton>
        </div>
      ),
      code: `import { GlassInput, PinCodeOTPInput, ShimmerBeamButton } from "@/components/uikit/custom-components";

export function CyberAuthPanel() {
  return (
    <div className="flex flex-col gap-3 items-center rounded-xl border border-neutral-800 bg-neutral-950 p-5">
      <GlassInput label="Verification Email" placeholder="user@nawfal.io" />
      <PinCodeOTPInput />
      <ShimmerBeamButton>VERIFY SECURITY PIN</ShimmerBeamButton>
    </div>
  );
}`
    },
    {
      id: "holographic-identity-card",
      title: "Holographic Identity Verification",
      category: "Auth & Security" as Category,
      difficulty: "Beginner",
      components: ["MonochromeGlowCard", "CyberBorderCard", "RadarSweepBadge"],
      description: "Enterprise identity card suite featuring glowing monochrome credentials card, cyber border status badge, and radar-sweep scan animation.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-white text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5" /> IDENTITY VERIFICATION
            </span>
            <RadarSweepBadge />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <MonochromeGlowCard title="Nawfal Ahmad" description="Principal Engineer · Level 4 Access" />
            <CyberBorderCard title="ACCESS NODE" status="Verified" />
          </div>
        </div>
      ),
      code: `import { MonochromeGlowCard, CyberBorderCard, RadarSweepBadge } from "@/components/uikit/custom-components";

export function HolographicIdentityCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <div className="flex justify-between pb-2">
        <span className="font-bold">IDENTITY VERIFICATION</span>
        <RadarSweepBadge />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MonochromeGlowCard title="Nawfal Ahmad" description="Principal Engineer" />
        <CyberBorderCard title="ACCESS NODE" status="Verified" />
      </div>
    </div>
  );
}`
    },

    // ─── Data & Analytics ─────────────────────────────────────────────────────
    {
      id: "analytics-kpi-dashboard",
      title: "KPI Metrics Analytics Board",
      category: "Data & Analytics" as Category,
      difficulty: "Beginner",
      components: ["MetricBadgeCard", "AvatarGroupPile", "MinimalPulseBadge"],
      description: "Clean analytics overview board with key performance indicator metric cards, team avatar stack, and real-time status pulse badges.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-white text-[11px]">
              <TrendingUp className="h-3.5 w-3.5" /> KPI ANALYTICS DASHBOARD
            </span>
            <MinimalPulseBadge text="Live" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MetricBadgeCard />
            <MetricBadgeCard />
            <MetricBadgeCard />
            <MetricBadgeCard />
          </div>
          <div className="flex items-center justify-between border-t border-neutral-800 pt-2">
            <AvatarGroupPile />
            <span className="text-[9px] text-neutral-500">4 engineers online</span>
          </div>
        </div>
      ),
      code: `import { MetricBadgeCard, AvatarGroupPile, MinimalPulseBadge } from "@/components/uikit/custom-components";

export function KPIAnalyticsDashboard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <MinimalPulseBadge text="Live" />
      <div className="grid grid-cols-2 gap-2">
        <MetricBadgeCard />
        <MetricBadgeCard />
      </div>
      <AvatarGroupPile />
    </div>
  );
}`
    },
    {
      id: "realtime-signal-monitor",
      title: "Real-Time Signal Monitor",
      category: "Data & Analytics" as Category,
      difficulty: "Intermediate",
      components: ["RadarSweepBadge", "MinimalPulseBadge", "SystemTelemetryMonitor"],
      description: "Monitoring panel for real-time signal analysis with radar sweep indicator, pulse badges for service states, and telemetry feed.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-sky-400 text-[11px]">
              <Radio className="h-3.5 w-3.5" /> SIGNAL MONITOR
            </span>
            <RadarSweepBadge />
          </div>
          <div className="flex gap-2 flex-wrap">
            <MinimalPulseBadge text="API Gateway" />
            <MinimalPulseBadge text="DB Cluster" />
            <MinimalPulseBadge text="CDN Edge" />
          </div>
          <SystemTelemetryMonitor />
        </div>
      ),
      code: `import { RadarSweepBadge, MinimalPulseBadge, SystemTelemetryMonitor } from "@/components/uikit/custom-components";
import { SystemTelemetryMonitor as STM } from "@/components/uikit/out-of-the-box";

export function RealtimeSignalMonitor() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <RadarSweepBadge />
      <div className="flex flex-wrap gap-2">
        <MinimalPulseBadge text="API Gateway" />
        <MinimalPulseBadge text="DB Cluster" />
      </div>
      <STM />
    </div>
  );
}`
    },
    {
      id: "color-design-tokens",
      title: "Color Harmony Design Token Lab",
      category: "Data & Analytics" as Category,
      difficulty: "Beginner",
      components: ["ColorHarmonyWheel"],
      description: "Visual design token explorer featuring an interactive color harmony wheel for generating complementary, analogous, and triadic palettes.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-rose-400 text-[11px]">
              <Globe className="h-3.5 w-3.5" /> COLOR TOKEN LAB
            </span>
            <span className="text-[9px] text-neutral-500">HSL Spectrum</span>
          </div>
          <div className="flex justify-center">
            <span className="text-neutral-500 text-[10px] italic">Color Harmony Wheel renders here</span>
          </div>
          <div className="grid grid-cols-5 gap-1 mt-1">
            {["#ef4444","#f97316","#eab308","#22c55e","#3b82f6"].map((c) => (
              <div key={c} className="h-6 rounded border border-neutral-800" style={{ backgroundColor: c }} />
            ))}
          </div>
          <p className="text-[10px] text-neutral-600 text-center">Complementary palette preview</p>
        </div>
      ),
      code: `import { ColorHarmonyWheel } from "@/components/uikit/out-of-the-box";

export function ColorDesignTokenLab() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <h3 className="font-mono text-xs font-bold text-rose-400">COLOR TOKEN LAB</h3>
      <ColorHarmonyWheel />
    </div>
  );
}`
    },

    // ─── Developer Tools ──────────────────────────────────────────────────────
    {
      id: "keyboard-code-terminal",
      title: "Developer Keyboard & Terminal",
      category: "Developer Tools" as Category,
      difficulty: "Intermediate",
      components: ["PhysicalKeyboardTracker", "CommandShortcutWidget"],
      description: "Developer productivity panel with live hardware key press tracker, command shortcut widget, and interactive terminal code window.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-neutral-300 text-[11px]">
              <Keyboard className="h-3.5 w-3.5" /> DEV KEYBOARD STUDIO
            </span>
            <span className="text-[9px] text-neutral-500">⌘ + K · ACTIVE</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <PhysicalKeyboardTracker />
            <CommandShortcutWidget />
          </div>
        </div>
      ),
      code: `import { PhysicalKeyboardTracker } from "@/components/uikit/innovative-components";
import { CommandShortcutWidget } from "@/components/uikit/custom-components";

export function DeveloperKeyboardStudio() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <PhysicalKeyboardTracker />
      <CommandShortcutWidget />
    </div>
  );
}`
    },
    {
      id: "code-diff-review-panel",
      title: "Code Review & Diff Inspector",
      category: "Developer Tools" as Category,
      difficulty: "Intermediate",
      components: ["InteractiveCodeDiffViewer", "GitBranchTreeGraph"],
      description: "Comprehensive code review environment with syntax-highlighted diff viewer and interactive git branch tree graph for context-aware reviews.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-sky-400 text-[11px]">
              <Code2 className="h-3.5 w-3.5" /> CODE REVIEW PANEL
            </span>
            <span className="rounded border border-sky-900 bg-sky-950/60 px-2 py-0.5 text-[9px] text-sky-400">PR #142</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <GitBranchTreeGraph />
            <InteractiveCodeDiffViewer />
          </div>
        </div>
      ),
      code: `import { InteractiveCodeDiffViewer, GitBranchTreeGraph } from "@/components/uikit/innovative-components";

export function CodeReviewPanel() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="grid grid-cols-2 gap-3">
        <GitBranchTreeGraph />
        <InteractiveCodeDiffViewer />
      </div>
    </div>
  );
}`
    },
    {
      id: "pipeline-workflow-builder",
      title: "Multi-Step Pipeline Workflow",
      category: "Developer Tools" as Category,
      difficulty: "Advanced",
      components: ["MultiStepPipelineWizard", "MetricBadgeCard"],
      description: "Production-ready multi-step workflow wizard for building and configuring automated deployment pipelines with live step tracking.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-violet-400 text-[11px]">
              <Layers className="h-3.5 w-3.5" /> PIPELINE WORKFLOW BUILDER
            </span>
            <span className="text-[9px] text-neutral-500">4 STEPS</span>
          </div>
          <MultiStepPipelineWizard />
        </div>
      ),
      code: `import { MultiStepPipelineWizard } from "@/components/uikit/nextgen-components";

export function PipelineWorkflowBuilder() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4">
      <MultiStepPipelineWizard />
    </div>
  );
}`
    },

    // ─── UI Controls ──────────────────────────────────────────────────────────
    {
      id: "interactive-control-surface",
      title: "Interactive Control Surface",
      category: "UI Controls" as Category,
      difficulty: "Beginner",
      components: ["SegmentedControlSwitch", "CompactToggleSwitch", "InteractiveDock"],
      description: "Modern control panel assembling segmented switch, minimalist toggles, and an animated macOS-inspired icon dock for navigation.",
      preview: (
        <div className="flex w-full flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-neutral-300 text-[11px]">
              <Layers className="h-3.5 w-3.5" /> CONTROL SURFACE
            </span>
            <CompactToggleSwitch />
          </div>
          <SegmentedControlSwitch />
          <div className="flex justify-center">
            <InteractiveDock />
          </div>
        </div>
      ),
      code: `import { SegmentedControlSwitch, CompactToggleSwitch, InteractiveDock } from "@/components/uikit/custom-components";

export function InteractiveControlSurface() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <SegmentedControlSwitch />
      <CompactToggleSwitch />
      <InteractiveDock />
    </div>
  );
}`
    },
    {
      id: "notification-system-hub",
      title: "Notification & Alert System",
      category: "UI Controls" as Category,
      difficulty: "Beginner",
      components: ["NotificationToastBanner", "MinimalPulseBadge", "AvatarGroupPile"],
      description: "Full notification management panel with toast banner alerts, real-time status pulse badges, and team presence avatar group.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold text-white text-[11px]">
              <MessageSquare className="h-3.5 w-3.5" /> NOTIFICATION HUB
            </span>
            <AvatarGroupPile />
          </div>
          <NotificationToastBanner />
          <div className="flex flex-wrap gap-2">
            <MinimalPulseBadge text="Operational" />
            <MinimalPulseBadge text="Deployed" />
          </div>
        </div>
      ),
      code: `import { NotificationToastBanner, MinimalPulseBadge, AvatarGroupPile } from "@/components/uikit/custom-components";

export function NotificationSystemHub() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
      <AvatarGroupPile />
      <NotificationToastBanner />
      <MinimalPulseBadge text="Operational" />
    </div>
  );
}`
    },
    {
      id: "motion-button-showcase",
      title: "Motion Button Showcase",
      category: "UI Controls" as Category,
      difficulty: "Beginner",
      components: ["MagneticButton", "ShimmerBeamButton", "ParticleRippleButton"],
      description: "Premium button component gallery featuring magnetic spring hover, shimmer border beam animation, and particle burst ripple click effect.",
      preview: (
        <div className="flex w-full flex-col gap-4 items-center rounded-xl border border-neutral-800 bg-neutral-950 p-6 font-mono text-xs text-white">
          <div className="flex w-full justify-between items-center border-b border-neutral-800 pb-2">
            <span className="font-bold text-neutral-300 text-[11px]">MOTION BUTTON SHOWCASE</span>
            <span className="text-[9px] text-neutral-500">FRAMER MOTION</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <MagneticButton>Magnetic Spring</MagneticButton>
            <ShimmerBeamButton>Shimmer Beam</ShimmerBeamButton>
            <ParticleRippleButton />
          </div>
        </div>
      ),
      code: `import { MagneticButton, ShimmerBeamButton, ParticleRippleButton } from "@/components/uikit/custom-components";

export function MotionButtonShowcase() {
  return (
    <div className="flex flex-col gap-4 items-center rounded-xl border border-neutral-800 bg-neutral-950 p-6">
      <div className="flex flex-wrap gap-3">
        <MagneticButton>Magnetic Spring</MagneticButton>
        <ShimmerBeamButton>Shimmer Beam</ShimmerBeamButton>
        <ParticleRippleButton />
      </div>
    </div>
  );
}`
    },
    {
      id: "ai-reasoning-voice-suite",
      title: "AI Reasoning & Voice Command Suite",
      category: "AI & Intelligence" as Category,
      difficulty: "Advanced",
      components: ["AIReasoningAccordion", "VoiceOrbVisualizer"],
      description: "Next-generation LLM interface featuring live thinking process accordion and interactive voice frequency visualizer.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-violet-400 text-[11px]">
              <Brain className="h-3.5 w-3.5" /> REASONING & VOICE CORE
            </span>
            <span className="rounded border border-emerald-900 bg-emerald-950/60 px-2 py-0.5 text-[9px] text-emerald-400 font-bold">READY</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AIReasoningAccordion />
            <VoiceOrbVisualizer />
          </div>
        </div>
      ),
      code: `import { AIReasoningAccordion, VoiceOrbVisualizer } from "@/components/uikit/advanced-components";

export function AIReasoningVoiceSuite() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
      <div className="flex justify-between border-b border-neutral-800 pb-2">
        <span className="font-bold text-violet-400">REASONING & VOICE CORE</span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <AIReasoningAccordion />
        <VoiceOrbVisualizer />
      </div>
    </div>
  );
}`
    },
    {
      id: "edge-telemetry-fleet-hub",
      title: "Global Edge Fleet & DAG Hub",
      category: "DevOps & Systems" as Category,
      difficulty: "Intermediate",
      components: ["ServerLatencyMatrix", "GitCommitFlowGraph"],
      description: "Real-time edge server telemetry monitor paired with interactive DAG branch commit flow tree.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400 text-[11px]">
              <Cpu className="h-3.5 w-3.5" /> EDGE FLEET & DAG TREE
            </span>
            <span className="rounded border border-emerald-900 bg-emerald-950/60 px-2 py-0.5 text-[9px] text-emerald-400 font-bold">100% HEALTHY</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ServerLatencyMatrix />
            <GitCommitFlowGraph />
          </div>
        </div>
      ),
      code: `import { ServerLatencyMatrix, GitCommitFlowGraph } from "@/components/uikit/advanced-components";

export function EdgeTelemetryFleetHub() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ServerLatencyMatrix />
        <GitCommitFlowGraph />
      </div>
    </div>
  );
}`
    },
    {
      id: "kinetic-spotlight-bento-suite",
      title: "Kinetic Spotlight Bento Suite",
      category: "UI Controls" as Category,
      difficulty: "Intermediate",
      components: ["SpotlightBentoGrid", "BorderBeamCard"],
      description: "Modern kinetic interaction container combining hardware-accelerated spotlight light follow and rotating border beam perimeter.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-400 text-[11px]">
              <Layers className="h-3.5 w-3.5" /> KINETIC BENTO CONTAINERS
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SpotlightBentoGrid />
            <BorderBeamCard />
          </div>
        </div>
      ),
      code: `import { SpotlightBentoGrid, BorderBeamCard } from "@/components/uikit/advanced-components";

export function KineticSpotlightBentoSuite() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <SpotlightBentoGrid />
      <BorderBeamCard />
    </div>
  );
}`
    },
    {
      id: "audiophile-vinyl-dock-deck",
      title: "Audiophile Vinyl & Dock Deck",
      category: "Media & Audio" as Category,
      difficulty: "Advanced",
      components: ["VinylDiscPlayer", "MacOSFloatingDock"],
      description: "Interactive media playback deck with spinning vinyl record disc and spring-physics floating application dock.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs text-white">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-purple-400 text-[11px]">
              <Music2 className="h-3.5 w-3.5" /> VINYL & DOCK SUITE
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <VinylDiscPlayer />
            <MacOSFloatingDock />
          </div>
        </div>
      ),
      code: `import { VinylDiscPlayer, MacOSFloatingDock } from "@/components/uikit/advanced-components";

export function AudiophileVinylDockDeck() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <VinylDiscPlayer />
      <MacOSFloatingDock />
    </div>
  );
}`
    },
  ];

  const filtered = selectedCategory === "All"
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  // Update counts
  const categoriesWithCount = categories.map((c) => ({
    ...c,
    count: c.id === "All" ? templates.length : templates.filter((t) => t.category === c.id).length,
  }));

  const difficultyColor: Record<string, string> = {
    Beginner:     "text-emerald-400 border-emerald-900 bg-emerald-950/50",
    Intermediate: "text-amber-400 border-amber-900 bg-amber-950/50",
    Advanced:     "text-rose-400 border-rose-900 bg-rose-950/50",
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTemplate(id);
    toast({ title: "Template Code Copied!", description: "Paste into your project to use." });
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-6">

      {/* ─── Header ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black text-neutral-900 dark:text-white shadow-xs">
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
            <LayoutGrid className="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" />
            <span>Page Templates & Assembly Blocks</span>
            <span className="rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 font-semibold">
              {templates.length} templates
            </span>
          </div>
          <h3 className="mt-2 text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Pre-Assembled Component Layouts</h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Production-ready page section blocks built by composing multiple Nawfal UI components. Filter by category, copy the full assembly code, and drop it straight into your project.
          </p>
        </div>
      </section>

      {/* ─── Category Filter ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar touch-pan-x scroll-smooth py-0.5">
        {categoriesWithCount.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-sm"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:border-neutral-600"
            }`}
          >
            {c.icon}
            <span className="whitespace-nowrap">{c.id}</span>
            <span className="rounded-full bg-neutral-800 px-1.5 py-0.5 font-mono text-[9px] text-neutral-400">{c.count}</span>
          </button>
        ))}
      </div>

      {/* ─── Template Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((tpl) => (
          <div key={tpl.id} className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
            {/* Card Header */}
            <div className="flex items-start justify-between border-b border-neutral-200 p-4 pb-3 dark:border-neutral-800">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                    {tpl.category}
                  </span>
                  <span className={`rounded border px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${difficultyColor[tpl.difficulty]}`}>
                    {tpl.difficulty}
                  </span>
                </div>
                <h4 className="mt-1.5 text-sm font-bold text-neutral-900 dark:text-neutral-100">{tpl.title}</h4>
                <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">{tpl.description}</p>
              </div>
              <button
                onClick={() => handleCopy(tpl.id, tpl.code)}
                className="ml-3 shrink-0 flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-neutral-800"
              >
                {copiedTemplate === tpl.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedTemplate === tpl.id ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Live Preview */}
            <div className="flex-1 bg-neutral-900/30 p-4 dark:bg-neutral-900/20">
              {tpl.preview}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-2 dark:border-neutral-800">
              <div className="flex flex-wrap gap-1">
                {tpl.components.map((comp) => (
                  <code key={comp} className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[9px] text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
                    {comp}
                  </code>
                ))}
              </div>
              <span className="shrink-0 font-mono text-[9px] font-semibold text-emerald-500">COPY-PASTE READY</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 py-16 dark:border-neutral-800">
          <LayoutGrid className="h-8 w-8 text-neutral-400" />
          <p className="mt-2 text-sm text-neutral-500">No templates in this category yet.</p>
        </div>
      )}
    </div>
  );
}
