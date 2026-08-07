"use client";

import React, { useState, useEffect } from "react";
import {
  Users, Send, Star, GitFork, MessageSquare, Check, Github, Zap,
  ArrowUpRight, Heart, TrendingUp, Globe, Download, Code2, Sparkles,
  ShieldCheck, Terminal, ShieldAlert, CheckCircle2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

/**
 * 🧹 Normalizes text by mapping leetspeak symbols, stripping punctuation/spaces,
 * and collapsing consecutive repeated letters (e.g. "s-l-o-t" -> "slot", "k.n.t.l" -> "kntl")
 */
function normalizeString(str: string): string {
  let s = str.toLowerCase();
  s = s.replace(/0/g, "o")
       .replace(/1/g, "i")
       .replace(/3/g, "e")
       .replace(/4/g, "a")
       .replace(/5/g, "s")
       .replace(/7/g, "t")
       .replace(/8/g, "b")
       .replace(/@/g, "a")
       .replace(/\$/g, "s")
       .replace(/!/g, "i");

  const cleaned = s.replace(/[^a-z0-9]/gi, "");
  const collapsed = cleaned.replace(/(.)\1{2,}/gi, "$1$1");
  return collapsed;
}

const GAMBLING_TERMS = [
  // Full & Abbreviated terms
  "slot", "gacor", "judi", "judol", "zeus", "pragmatic", "maxwin", "deposit", 
  "withdraw", "scatter", "togel", "poker", "casino", "bet77", "slot88", 
  "jackpot", "pragmatik", "situsjudi", "linkgacor", "gacor88", "maxwin88", 
  "slotonline", "judionline", "bonus100", "depo10k", "depo20k", "depo50k",
  "slt", "gcr", "jdi", "jdl", "mxwn", "sctr", "tgl", "pkr", "csn", "bt77", "slt88", "jkpt"
];

const PROFANITY_PATTERNS = [
  // Indonesian Full & Abbreviated Swear Words
  { pattern: /\b(anjing|anjg|ajg|anj|ajx)\b/gi, replacement: "***" },
  { pattern: /\b(babi|bbi)\b/gi, replacement: "***" },
  { pattern: /\b(kontol|kntl|kntol|knl|knt|kintol)\b/gi, replacement: "******" },
  { pattern: /\b(memek|mmk|mek)\b/gi, replacement: "*****" },
  { pattern: /\b(pantek|pntk)\b/gi, replacement: "******" },
  { pattern: /\b(bangsat|bgst|bgsk)\b/gi, replacement: "*******" },
  { pattern: /\b(tai|taik|taek)\b/gi, replacement: "***" },
  { pattern: /\b(pukimak|pkak|pukima)\b/gi, replacement: "*******" },
  { pattern: /\b(pepek|ppk)\b/gi, replacement: "*****" },
  { pattern: /\b(jancok|jancuk|jncok|jncuk|jnc)\b/gi, replacement: "******" },
  { pattern: /\b(bego|bgo)\b/gi, replacement: "****" },
  { pattern: /\b(goblok|gblg|gblk|gblok)\b/gi, replacement: "******" },
  { pattern: /\b(tolol|tll)\b/gi, replacement: "*****" },
  { pattern: /\b(itil|itl)\b/gi, replacement: "****" },
  { pattern: /\b(ngentot|ngntt|ngnt|ngt)\b/gi, replacement: "*******" },
  { pattern: /\b(kampang|kmpng)\b/gi, replacement: "*******" },
  { pattern: /\b(jembut|jmbt)\b/gi, replacement: "******" },
  { pattern: /\b(bajingan|bjgn)\b/gi, replacement: "********" },
  
  // English Full & Abbreviated Swear Words
  { pattern: /\b(fuck|fck|fk|fuk|fuc|fucking|fucker)\b/gi, replacement: "****" },
  { pattern: /\b(shit|skt|sht|sh!t)\b/gi, replacement: "****" },
  { pattern: /\b(bitch|btch|bch)\b/gi, replacement: "*****" },
  { pattern: /\b(asshole|assh|ass)\b/gi, replacement: "*******" },
  { pattern: /\b(bastard|bstrd)\b/gi, replacement: "*******" },
  { pattern: /\b(cunt|cnt)\b/gi, replacement: "****" },
  { pattern: /\b(dick|dck)\b/gi, replacement: "****" },
  { pattern: /\b(pussy|pssy)\b/gi, replacement: "*****" },
  { pattern: /\b(nigger|nigga|nggr)\b/gi, replacement: "******" },
  { pattern: /\b(whore|whr)\b/gi, replacement: "*****" },
  { pattern: /\b(slut|slt)\b/gi, replacement: "****" },
  { pattern: /\b(cock|cck)\b/gi, replacement: "****" }
];

/**
 * Smart Check for Gambling Content (detects raw text AND normalized/abbreviated text)
 */
function isSmartGambling(text: string): boolean {
  const rawLower = text.toLowerCase();
  const normalized = normalizeString(text);

  return GAMBLING_TERMS.some((term) => {
    return rawLower.includes(term) || normalized.includes(term);
  });
}

/**
 * Smart Profanity Sensor (censors raw words, shorthands, spaced letters, and leetspeak)
 */
function smartSanitizeProfanity(text: string): { sanitizedText: string; hasProfanity: boolean } {
  let sanitizedText = text;
  let hasProfanity = false;

  PROFANITY_PATTERNS.forEach(({ pattern, replacement }) => {
    if (pattern.test(sanitizedText)) {
      hasProfanity = true;
      sanitizedText = sanitizedText.replace(pattern, replacement);
    }
  });

  const normalized = normalizeString(text);
  PROFANITY_PATTERNS.forEach(({ pattern }) => {
    if (pattern.test(normalized)) {
      hasProfanity = true;
    }
  });

  return { sanitizedText, hasProfanity };
}

export function CommunitySection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const GITHUB_COMPONENTS_URL = "https://github.com/xFalzz/Nawfal/tree/main/components";

  const defaultFeedbacks = [
    {
      name: "Rian Hidayat",
      role: "Fullstack Engineer",
      text: "The AI RAG Vector Search and Hardware Keypress Tracker are total game changers! 100% complete source code snippets work flawlessly in production.",
      date: "Just now",
      avatar: "RH",
    },
    {
      name: "Alex Rivera",
      role: "Frontend Specialist @ Vercel Ecosystem",
      text: "Love the 48 component collection. The unclipped viewports and full TSX previews make it incredibly developer-friendly. The spring physics are buttery smooth.",
      date: "Today",
      avatar: "AR",
    },
    {
      name: "Devi Permata",
      role: "UI/UX Architect",
      text: "The Spotify Music suite and AI Vision inspector add incredible personality without feeling AI-generated. The monochromatic design system is genuinely elegant.",
      date: "Yesterday",
      avatar: "DP",
    },
    {
      name: "Marcus Chen",
      role: "CTO @ TechStartup",
      text: "Migrated our entire dashboard to Nawfal UI. Source-owned components mean zero npm dependency conflicts. The CLI installation is seamless.",
      date: "2 days ago",
      avatar: "MC",
    },
    {
      name: "Sari Nurhayati",
      role: "Senior React Engineer",
      text: "The WCAG AAA compliance out of the box is impressive. We passed our accessibility audit with flying colors using Nawfal UI components.",
      date: "3 days ago",
      avatar: "SN",
    },
  ];

  const [feedbacks, setFeedbacks] = useState(defaultFeedbacks);

  // Load user feedbacks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nawfal_community_feedbacks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFeedbacks(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load community feedbacks from storage");
    }
  }, []);

  const saveFeedbacksToStorage = (updated: typeof feedbacks) => {
    setFeedbacks(updated);
    try {
      localStorage.setItem("nawfal_community_feedbacks", JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to save community feedbacks");
    }
  };

  const stats = [
    { label: "Verified Components", value: "48", icon: Code2 },
    { label: "GitHub Repository Stars", value: "2.4K+", icon: Star },
    { label: "CLI Installs", value: "12K+", icon: Download },
    { label: "Community Contributors", value: "38+", icon: Users },
  ];

  const changelog = [
    { version: "v5.2.0", date: "Aug 2026", changes: "Added NextGen CLI installer (npx nawfal-ui@latest), Design Studio Workbench, 16 interactive studio items, and theme-adaptive design system" },
    { version: "v5.1.0", date: "Jul 2026", changes: "AI Vision Inspector, Neural Voice AI spectrum component, dark/light mode contrast refinements" },
    { version: "v5.0.0", date: "Jun 2026", changes: "Major architectural redesign — monochromatic v2 scale, Framer Motion spring physics engine, 48 component milestone" },
    { version: "v4.4.0", date: "May 2026", changes: "Audio architecture suite, Spotify player, vinyl controller, waveform visualizer" },
    { version: "v4.0.0", date: "Apr 2026", changes: "Initial public open-source release with 32 enterprise primitives" },
  ];

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // 1. Smart Gambling / Slot Content Blocker (Full & Abbreviated)
    if (isSmartGambling(message) || isSmartGambling(name) || isSmartGambling(role)) {
      toast({
        title: "Submission Blocked ⛔",
        description: "Your message contains prohibited gambling / slot keywords or abbreviations and was automatically rejected.",
        variant: "destructive",
      });
      return;
    }

    // 2. Smart Profanity Auto-Sanitizer & Sensor (Full & Abbreviated)
    const nameCheck = smartSanitizeProfanity(name.trim());
    const roleCheck = smartSanitizeProfanity(role.trim());
    const messageCheck = smartSanitizeProfanity(message.trim());

    const finalName = nameCheck.sanitizedText;
    const finalRole = roleCheck.sanitizedText || "Community Member";
    const finalMessage = messageCheck.sanitizedText;

    if (messageCheck.hasProfanity || nameCheck.hasProfanity || roleCheck.hasProfanity) {
      toast({
        title: "Content Auto-Censored 🛡️",
        description: "Profanity, vulgar words, or shorthands in your feedback were automatically censored (***).",
      });
    } else {
      toast({
        title: "Feedback Published Live! 🎉",
        description: "Your review is now public and visible in the Nawfal UI Community Hub.",
      });
    }

    const newFeedbackItem = {
      name: finalName,
      role: finalRole,
      text: finalMessage,
      date: "Just now",
      avatar: finalName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "CU",
    };

    const updatedList = [newFeedbackItem, ...feedbacks];
    saveFeedbacksToStorage(updatedList);

    setName("");
    setRole("");
    setMessage("");
  };

  return (
    <div className="flex w-full flex-col gap-6 text-neutral-900 dark:text-neutral-100">

      {/* ─── GitHub Ecosystem Banner ────────────────────────────────────────── */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-6 text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white shadow-xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <Github className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
            <span>Open Source Ecosystem • v5.2.0 • MIT License</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Nawfal UI Community Hub
          </h2>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 max-w-xl">
            Join the growing community of developers building premium React applications with Nawfal UI&apos;s 48 enterprise-grade components.
          </p>
        </div>

        {/* GitHub Direct Links pointing to /components */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={GITHUB_COMPONENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-mono text-xs font-semibold text-white dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-xs"
          >
            <Github className="h-4 w-4" />
            <span>View Source on GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </section>

      {/* ─── Community Metrics ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 shadow-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">{s.value}</span>
            </div>
          );
        })}
      </div>

      {/* ─── Main Content Grid: Feedbacks + Form + Changelog ───────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Left Col (2 cols): Community Feedbacks List */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
            <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>Public Community Reviews & Feedback ({feedbacks.length})</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Smart AI Moderation Active
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {feedbacks.map((f, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 font-sans shadow-xs transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-mono font-bold text-white dark:bg-white dark:text-black">
                      {f.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
                        {f.name}
                      </h4>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {f.role}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                    {f.date}
                  </span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
                  &ldquo;{f.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col (1 col): Submit Form + Changelog */}
        <div className="flex flex-col gap-6">

          {/* Submit Feedback Form */}
          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 dark:border-neutral-800 font-bold uppercase tracking-wider text-neutral-500">
              <span className="flex items-center gap-2">
                <Send className="h-3.5 w-3.5" />
                <span>Share Public Feedback</span>
              </span>
              <span className="text-[9px] text-emerald-500 flex items-center gap-0.5 font-bold">
                <ShieldCheck className="h-3 w-3" /> Smart Filter
              </span>
            </div>

            <form onSubmit={handleSubmitFeedback} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nawfal Irfan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500">Role / Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Fullstack Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-neutral-500">Feedback / Review</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you think of Nawfal UI..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white outline-none focus:border-neutral-500"
                />
              </div>

              <button
                type="submit"
                className="mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 py-2 font-bold text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-black hover:opacity-90 transition-all shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post Review to Public</span>
              </button>
              <div className="flex items-center gap-1 text-[9px] text-neutral-400">
                <ShieldAlert className="h-3 w-3 text-amber-500 shrink-0" />
                <span>Auto-detects & censors profanities, shorthands (kntl, ajg, bgst) & slot/gambling keywords.</span>
              </div>
            </form>
          </div>

          {/* Changelog Timeline */}
          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 dark:border-neutral-800 font-bold uppercase tracking-wider text-neutral-500">
              <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Release Changelog</span>
              <span className="text-[9px] opacity-60">v5.2.0</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {changelog.map((c, i) => (
                <div key={i} className="flex flex-col gap-1 border-l-2 border-neutral-300 dark:border-neutral-800 pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 dark:text-white">{c.version}</span>
                    <span className="text-[9px] text-neutral-400">{c.date}</span>
                  </div>
                  <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">{c.changes}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
