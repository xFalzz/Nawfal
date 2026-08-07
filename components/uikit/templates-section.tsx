"use client";

import React, { useState } from "react";
import { LayoutGrid, Check, Copy, ExternalLink, Sparkles, Terminal, Code2, Layers, Cpu, Radio, Music, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Import sample components to assemble into full page blocks
import { AINeuralVoiceSpectrum, AIPromptTokenCalculator } from "@/components/uikit/nextgen-components";
import { SpotifyMiniPlayer, SpotifyTrackListItem } from "@/components/uikit/spotify-components";
import { SystemTelemetryMonitor, HolographicScanlineCard } from "@/components/uikit/out-of-the-box";
import { GlassInput, PinCodeOTPInput, ShimmerBeamButton } from "@/components/uikit/custom-components";

export function TemplatesSection() {
  const { toast } = useToast();
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "ai-copilot-workspace",
      title: "AI Neural Copilot Workspace",
      category: "AI & Intelligence",
      description: "Complete AI assistant panel assembling Neural Voice Spectrum, Token Calculator, and Glass Controls.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 text-white font-mono text-xs">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-sky-400">
              <Sparkles className="h-3.5 w-3.5" /> AI COPILOT WORKSPACE
            </span>
            <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[9px] text-emerald-400 font-bold">ONLINE</span>
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
    <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs">
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
      id: "audio-studio-player",
      title: "Monochrome Audio Studio",
      category: "Media & Sound",
      description: "Hi-Fi music player layout combining Spotify mini player, track list, and kinetic controls.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white font-mono text-xs">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-indigo-400">
              <Music className="h-3.5 w-3.5" /> NAWFAL SOUND STUDIO
            </span>
            <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-[9px] text-neutral-400">96 kHz / 24-bit</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SpotifyMiniPlayer />
            <SpotifyTrackListItem />
          </div>
        </div>
      ),
      code: `import { SpotifyMiniPlayer, SpotifyTrackListItem } from "@/components/uikit/spotify-components";

export function AudioStudioPlayer() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs">
      <SpotifyMiniPlayer />
      <SpotifyTrackListItem />
    </div>
  );
}`
    },
    {
      id: "telemetry-ops-dashboard",
      title: "DevOps Telemetry Control Room",
      category: "Systems & Monitoring",
      description: "Real-time system telemetry monitor paired with holographic scanlines and pulse badges.",
      preview: (
        <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 text-white font-mono text-xs">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-emerald-400">
              <Cpu className="h-3.5 w-3.5" /> SYSTEM TELEMETRY OPS
            </span>
            <span className="rounded bg-emerald-950 border border-emerald-800 px-2 py-0.5 text-[9px] text-emerald-400 font-bold animate-pulse">ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <SystemTelemetryMonitor />
            <HolographicScanlineCard />
          </div>
        </div>
      ),
      code: `import { SystemTelemetryMonitor, HolographicScanlineCard } from "@/components/uikit/out-of-the-box";

export function TelemetryOpsDashboard() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-neutral-800 bg-black p-4 font-mono text-xs">
      <SystemTelemetryMonitor />
      <HolographicScanlineCard />
    </div>
  );
}`
    },
    {
      id: "cyber-auth-modal",
      title: "Futuristic Auth & Security Panel",
      category: "Authentication",
      description: "Cyberpunk OTP pin verification panel with glass input field and shimmer beam CTA button.",
      preview: (
        <div className="flex w-full flex-col gap-3 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 p-5 text-white font-mono text-xs">
          <div className="flex w-full justify-between items-center border-b border-neutral-800 pb-2">
            <span className="font-bold text-neutral-200 text-[11px]">CYBER VERIFICATION</span>
            <span className="text-[9px] text-amber-400">STEP 2 OF 2</span>
          </div>
          <GlassInput label="Verification Email" placeholder="user@nawfal.io" />
          <PinCodeOTPInput />
          <ShimmerBeamButton>VERIFY SECURITY PIN</ShimmerBeamButton>
        </div>
      ),
      code: `import { GlassInput, PinCodeOTPInput, ShimmerBeamButton } from "@/components/uikit/custom-components";

export function CyberAuthModal() {
  return (
    <div className="flex flex-col gap-3 items-center rounded-xl border border-neutral-800 bg-neutral-950 p-5">
      <GlassInput label="Verification Email" placeholder="user@nawfal.io" />
      <PinCodeOTPInput />
      <ShimmerBeamButton>VERIFY SECURITY PIN</ShimmerBeamButton>
    </div>
  );
}`
    }
  ];

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTemplate(id);
    toast({
      title: "Template Code Copied!",
      description: "Copied full page assembly block to clipboard.",
    });
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <LayoutGrid className="h-4 w-4" />
          <span>Page Templates & Assembly Blocks</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Pre-Assembled Component Layouts
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Ready-to-use page sections and composite layouts built by combining multiple Nawfal UI components into seamless interface blocks.
        </p>
      </section>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {templates.map((tpl) => (
          <div key={tpl.id} className="flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800">
                <div>
                  <span className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                    {tpl.category}
                  </span>
                  <h4 className="mt-1.5 text-sm font-bold text-neutral-900 dark:text-neutral-100">{tpl.title}</h4>
                </div>
                <button
                  onClick={() => handleCopy(tpl.id, tpl.code)}
                  className="flex items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-neutral-800 transition-all shadow-xs"
                >
                  {copiedTemplate === tpl.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedTemplate === tpl.id ? "Copied" : "Copy Block"}</span>
                </button>
              </div>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 mb-4">{tpl.description}</p>
              
              {/* Interactive Live Component Block Preview */}
              <div className="flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-900/60 p-4 dark:border-neutral-800">
                {tpl.preview}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-2 font-mono text-[10px] text-neutral-500 dark:border-neutral-800">
              <span>Assembly: Nawfal UI v5.2</span>
              <span className="text-emerald-500 font-semibold">100% COPY-PASTE READY</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
