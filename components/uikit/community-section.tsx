"use client";

import React, { useState } from "react";
import {
  Users, Send, Star, GitFork, MessageSquare, Check, Github, Zap,
  ArrowUpRight, Heart, TrendingUp, Globe, Download, Code2, Sparkles,
  ShieldCheck, Terminal
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function CommunitySection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const GITHUB_COMPONENTS_URL = "https://github.com/xFalzz/Nawfal/tree/main/components";

  const [feedbacks, setFeedbacks] = useState([
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
  ]);

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

    setFeedbacks([
      {
        name,
        role: role.trim() || "Community Member",
        text: message,
        date: "Just now",
        avatar: name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      },
      ...feedbacks,
    ]);

    setName("");
    setRole("");
    setMessage("");

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for contributing to Nawfal UI Community Hub.",
    });
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
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>Star</span>
          </a>
          <a
            href={GITHUB_COMPONENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            <GitFork className="h-3.5 w-3.5" />
            <span>Fork</span>
          </a>
          <a
            href={GITHUB_COMPONENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 px-3 py-1.5 font-mono text-xs font-semibold text-white transition-colors hover:opacity-90 dark:border-neutral-100 dark:bg-neutral-100 dark:text-black"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>View Components Source</span>
          </a>
        </div>
      </section>

      {/* ─── Community Statistics Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/80 p-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 shadow-xs">
            <s.icon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-300" />
            <div>
              <div className="text-lg font-extrabold text-neutral-900 dark:text-white">{s.value}</div>
              <div className="text-[10px] text-neutral-500 uppercase font-bold">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Community Testimonials Feed & Form ─────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* Left: Testimonials Feed (7 cols) */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800 font-mono">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-neutral-500" />
              <span className="font-bold text-sm text-neutral-900 dark:text-white">Developer Reviews & Feedback</span>
            </div>
            <span className="text-[10px] text-neutral-400">{feedbacks.length} Posts</span>
          </div>

          <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1 font-mono text-xs">
            {feedbacks.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200 text-[10px] font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                      {item.avatar}
                    </div>
                    <div>
                      <h5 className="font-bold text-neutral-900 dark:text-white">{item.name}</h5>
                      <span className="text-[10px] text-neutral-500">{item.role}</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-neutral-400">{item.date}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300 font-sans">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Submit Feedback Form & Changelog (5 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-5">

          {/* Form Box */}
          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 font-mono text-xs shadow-xs">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2.5 dark:border-neutral-800 font-bold uppercase tracking-wider text-neutral-500">
              <Send className="h-3.5 w-3.5" />
              <span>Share Community Feedback</span>
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
                <span>Post Review</span>
              </button>
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
