"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Command, Search, Layers, Code2, Sliders, LayoutGrid, BookOpen,
  Users, Bot, Home, Sun, Moon, Sparkles, ArrowRight, CornerDownLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Listen for ⌘K or ⌘M globally (⌘K for Command Palette, ⌘M for Theme Toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && key === "m") {
        e.preventDefault();
        const currentMode = resolvedTheme || theme;
        setTheme(currentMode === "dark" ? "light" : "dark");
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, resolvedTheme, setTheme]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home Page", path: "/", icon: <Home className="h-4 w-4" />, category: "Navigation" },
    { label: "Components Sandbox", path: "/components", icon: <Layers className="h-4 w-4" />, category: "UI Kit" },
    { label: "Chat Room & AI Assistant", path: "/chat", icon: <Bot className="h-4 w-4" />, category: "AI & Chat" },
    { label: "Design Studio Workbench", path: "/components", icon: <Sliders className="h-4 w-4" />, category: "UI Kit" },
    { label: "Page Templates & Layouts", path: "/components", icon: <LayoutGrid className="h-4 w-4" />, category: "UI Kit" },
    { label: "Learn & FAQ Academy", path: "/components", icon: <BookOpen className="h-4 w-4" />, category: "Docs" },
    { label: "Community Hub", path: "/components", icon: <Users className="h-4 w-4" />, category: "Community" },
  ];

  const filteredItems = navItems.filter((item) =>
    !query || item.label.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-neutral-300 bg-white font-mono text-xs shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-2.5 border-b border-neutral-200 px-3.5 py-3 dark:border-neutral-800">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search page..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-neutral-900 dark:text-white outline-none placeholder-neutral-400 font-mono"
              />
              <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[9px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 font-mono">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div className="max-h-[320px] overflow-y-auto p-2 flex flex-col gap-1">

              {/* Theme Switch Action */}
              <button
                onClick={handleToggleTheme}
                className="flex w-full items-center justify-between rounded-lg p-2.5 text-left font-mono transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                    {theme === "dark" ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5 text-indigo-500" />}
                  </div>
                  <span className="font-semibold">Switch to {theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[9px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">⌘M</kbd>
              </button>

              <div className="my-1 border-t border-neutral-200 dark:border-neutral-800" />

              {/* Navigation Commands */}
              {filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(item.path)}
                  className="flex w-full items-center justify-between rounded-lg p-2.5 text-left font-mono transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded border border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[9px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 font-bold">
                      {item.category}
                    </span>
                    <CornerDownLeft className="h-3 w-3 text-neutral-400" />
                  </div>
                </button>
              ))}

              {filteredItems.length === 0 && (
                <p className="py-6 text-center text-xs text-neutral-400">No commands match &ldquo;{query}&rdquo;.</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-3.5 py-2 font-mono text-[10px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" /> Nawfal UI Command Palette
              </span>
              <span>v5.2.0 Enterprise</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
