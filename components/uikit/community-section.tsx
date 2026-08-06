"use client";

import React, { useState } from "react";
import { Users, Send, Star, GitFork, MessageSquare, Check, Github, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function CommunitySection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [feedbacks, setFeedbacks] = useState([
    {
      name: "Rian Hidayat",
      role: "Fullstack Developer",
      text: "The AI Semantic Vector Search and Hardware Keypress Tracker are total game changers! 100% complete code snippets work flawlessly.",
      date: "Just now",
    },
    {
      name: "Alex Rivera",
      role: "Frontend Engineer",
      text: "Love the 42 component collection. The unclipped viewports and full TSX previews make it super developer friendly.",
      date: "Today",
    },
    {
      name: "Devi Permata",
      role: "UI/UX Specialist",
      text: "The Spotify Music suite and AI Vision inspector add huge personality to the site without looking AI-generated.",
      date: "Yesterday",
    },
  ]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setFeedbacks([
      {
        name,
        role: "Community Contributor",
        text: message,
        date: "Just now",
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
      <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-900 p-5 text-white dark:border-neutral-800 dark:bg-black sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <Github className="h-4 w-4" />
            <span>Open Source Ecosystem • v4.4.0</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight">Nawfal UI Repository Hub</h2>
          <p className="mt-1 text-xs text-neutral-400">
            Featuring 42 monochromatic UI components &amp; AI Web innovations with 100% full source code specs.
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
            <span>Star Repository</span>
          </a>
          <a
            href="https://github.com/xFalzz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            <GitFork className="h-3.5 w-3.5" />
            <span>Fork Project</span>
          </a>
        </div>
      </section>

      {/* Guestbook & Feedback Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Form */}
        <section className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
            <MessageSquare className="h-4 w-4" />
            <span>Community Guestbook &amp; Feature Requests</span>
          </div>
          <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
            Request Next Component Innovation
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Suggest your idea for the next component or AI web utility in Nawfal UI Kit.
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
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Out-Of-The-Box Idea / Feedback</label>
              <textarea
                rows={2.5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your component request..."
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Request</span>
            </button>
          </form>
        </section>

        {/* Live Feedback Feed */}
        <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
          <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
            <Users className="h-4 w-4" />
            <span>Community Feed ({feedbacks.length})</span>
          </div>

          <div className="mt-1 flex flex-col gap-2.5 overflow-y-auto max-h-[280px] pr-1">
            {feedbacks.map((fb, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{fb.name}</span>
                  <span className="font-mono text-[9px] text-neutral-400">{fb.date}</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">{fb.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
