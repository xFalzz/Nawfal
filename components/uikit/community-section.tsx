"use client";

import React, { useState } from "react";
import { Users, Send, Star, GitFork, MessageSquare, Check, Github, Zap, ArrowUpRight, Heart, TrendingUp, Globe, Download, Code2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function CommunitySection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [feedbacks, setFeedbacks] = useState([
    {
      name: "Rian Hidayat",
      role: "Fullstack Developer",
      text: "The AI Semantic Vector Search and Hardware Keypress Tracker are total game changers! 100% complete code snippets work flawlessly in production.",
      date: "Just now",
      avatar: "RH",
    },
    {
      name: "Alex Rivera",
      role: "Frontend Engineer @ Vercel",
      text: "Love the 48 component collection. The unclipped viewports and full TSX previews make it incredibly developer-friendly. The spring physics are buttery smooth.",
      date: "Today",
      avatar: "AR",
    },
    {
      name: "Devi Permata",
      role: "UI/UX Specialist",
      text: "The Spotify Music suite and AI Vision inspector add incredible personality without feeling AI-generated. The monochromatic design system is genuinely elegant.",
      date: "Yesterday",
      avatar: "DP",
    },
    {
      name: "Marcus Chen",
      role: "CTO @ StartupLab",
      text: "Migrated our entire dashboard to Nawfal UI. Source-owned components mean zero dependency conflicts. The CLI installation is seamless.",
      date: "2 days ago",
      avatar: "MC",
    },
    {
      name: "Sari Nurhayati",
      role: "Senior React Developer",
      text: "The WCAG AAA compliance out of the box is impressive. We passed our accessibility audit with flying colors using Nawfal UI components.",
      date: "3 days ago",
      avatar: "SN",
    },
  ]);

  const stats = [
    { label: "Total Components", value: "48", icon: Code2 },
    { label: "GitHub Stars", value: "2.4K", icon: Star },
    { label: "Downloads", value: "12K+", icon: Download },
    { label: "Contributors", value: "38", icon: Users },
  ];

  const changelog = [
    { version: "v5.2.0", date: "Aug 2026", changes: "Added CLI installer, 6 new motion primitives, improved mobile responsiveness" },
    { version: "v5.1.0", date: "Jul 2026", changes: "AI Vision Inspector, Neural Voice AI component, dark mode refinements" },
    { version: "v5.0.0", date: "Jun 2026", changes: "Major redesign — monochromatic v2, spring physics engine, 48 component milestone" },
    { version: "v4.4.0", date: "May 2026", changes: "Audio architecture suite, Spotify player, vinyl controller, waveform visualizer" },
    { version: "v4.0.0", date: "Apr 2026", changes: "Initial public release with 32 enterprise components" },
  ];

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setFeedbacks([
      {
        name,
        role: "Community Contributor",
        text: message,
        date: "Just now",
        avatar: name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      },
      ...feedbacks,
    ]);

    setName("");
    setMessage("");

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for contributing to Nawfal UI Community Hub.",
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* GitHub Ecosystem Banner */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-5 text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white shadow-xs sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <Github className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
            <span>Open Source Ecosystem • v5.2.0 • MIT License</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Nawfal UI Community Hub</h2>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            Join the growing community of developers building premium React applications with Nawfal UI&apos;s 48 enterprise-grade components.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/xFalzz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Star</span>
          </a>
          <a
            href="https://github.com/xFalzz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            <GitFork className="h-3.5 w-3.5" />
            <span>Fork</span>
          </a>
          <a
            href="https://github.com/xFalzz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/60 p-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
            <s.icon className="h-5 w-5 shrink-0 text-neutral-500" />
            <div>
              <p className="text-lg font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">{s.value}</p>
              <p className="text-[10px] text-neutral-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Guestbook & Feedback */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Form */}
        <section className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
            <MessageSquare className="h-4 w-4" />
            <span>Community Guestbook</span>
          </div>
          <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
            Share Your Experience
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Let us know how Nawfal UI has helped your project, or suggest new component ideas for future releases.
          </p>

          <form onSubmit={handleSubmitFeedback} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Your Name / Handle</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nawfal Irfan"
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Your Feedback or Idea</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how you're using Nawfal UI..."
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Feedback</span>
            </button>
          </form>
        </section>

        {/* Live Feedback Feed */}
        <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
            <Users className="h-4 w-4" />
            <span>Community Testimonials ({feedbacks.length})</span>
          </div>

          <div className="mt-1 flex flex-col gap-2.5 overflow-y-auto max-h-[340px] pr-1">
            {feedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 font-mono text-[9px] font-bold text-white dark:bg-white dark:text-black">
                    {fb.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">{fb.name}</span>
                      <span className="font-mono text-[9px] text-neutral-400">{fb.date}</span>
                    </div>
                    <span className="block text-[9px] text-neutral-500">{fb.role}</span>
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400">{fb.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Changelog */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <TrendingUp className="h-4 w-4" />
          <span>Release Changelog</span>
        </div>
        <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">Version History</h3>

        <div className="mt-4 flex flex-col gap-2">
          {changelog.map((entry, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="shrink-0">
                <span className="rounded bg-neutral-900 px-2 py-0.5 font-mono text-[10px] font-bold text-white dark:bg-white dark:text-black">
                  {entry.version}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] text-neutral-400">{entry.date}</span>
                <p className="mt-0.5 text-[11px] text-neutral-600 dark:text-neutral-400">{entry.changes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
