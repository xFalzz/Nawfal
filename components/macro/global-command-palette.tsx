"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Command, Search, Layers, Sliders, LayoutGrid, BookOpen,
  Users, Bot, Home, Sun, Moon, CornerDownLeft, User, FolderGit2,
  Award, Camera, Code2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  description?: string;
}

export function GlobalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { label: "Home Page", path: "/", icon: <Home className="h-4 w-4" />, category: "Navigation", description: "Return to landing page" },
    { label: "About Nawfal", path: "/about", icon: <User className="h-4 w-4" />, category: "Profile", description: "Biography, education & experience" },
    { label: "Featured Projects", path: "/projects", icon: <FolderGit2 className="h-4 w-4" />, category: "Work", description: "Hijara, KURA, macOS Sequoia Clone" },
    { label: "Certificates & Credentials", path: "/certificate", icon: <Award className="h-4 w-4" />, category: "Achievements", description: "48+ Google, IBM & Coursera certs" },
    { label: "Photography Gallery", path: "/photography", icon: <Camera className="h-4 w-4" />, category: "Gallery", description: "Visual & street photography showcase" },
    { label: "UI Kit Components", path: "/components?tab=components", icon: <Layers className="h-4 w-4" />, category: "UI Kit", description: "48 monochrome React primitives" },
    { label: "Enterprise Documentation", path: "/components?tab=documents", icon: <BookOpen className="h-4 w-4" />, category: "Docs", description: "CLI installation & component architecture" },
    { label: "Design Studio Workbench", path: "/components?tab=tools", icon: <Sliders className="h-4 w-4" />, category: "UI Kit", description: "Interactive component geometry inspector" },
    { label: "Page Templates & Layouts", path: "/components?tab=templates", icon: <LayoutGrid className="h-4 w-4" />, category: "UI Kit", description: "19 production-ready section blocks" },
    { label: "Interactive Playground", path: "/components?tab=playground", icon: <Code2 className="h-4 w-4" />, category: "Playground", description: "Live component playground sandbox" },
    { label: "Learn & FAQ Academy", path: "/components?tab=learn", icon: <BookOpen className="h-4 w-4" />, category: "Docs", description: "Academy guides & frequently asked questions" },
    { label: "Community Hub", path: "/components?tab=community", icon: <Users className="h-4 w-4" />, category: "Community", description: "Community showcase & contributions" },
    { label: "AI Assistant & Chat Room", path: "/chat", icon: <Bot className="h-4 w-4" />, category: "AI & Chat", description: "Real-time AI Chat & Community Room" },
  ];

  const filteredItems = navItems.filter((item) =>
    !query ||
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Listen for ⌘K or ⌘M globally
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
    const currentMode = resolvedTheme || theme;
    setTheme(currentMode === "dark" ? "light" : "dark");
    setIsOpen(false);
  };

  // Keyboard navigation inside modal (ArrowDown, ArrowUp, Enter)
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length + 1) % (filteredItems.length + 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex === 0) {
        handleToggleTheme();
      } else {
        const item = filteredItems[selectedIndex - 1];
        if (item) handleNavigate(item.path);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onKeyDown={handleModalKeyDown}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-300 bg-white font-sans text-xs shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3.5 dark:border-neutral-800">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Navigate to page or search command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-white outline-none placeholder-neutral-400 font-mono"
              />
              <kbd className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 font-mono shrink-0">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-1 scrollbar-thin">

              {/* Theme Switch Action (Index 0) */}
              <button
                onClick={handleToggleTheme}
                onMouseEnter={() => setSelectedIndex(0)}
                className={`flex w-full items-center justify-between rounded-xl p-3 text-left font-mono transition-all duration-150 ${
                  selectedIndex === 0
                    ? "bg-neutral-100 dark:bg-neutral-900 ring-1 ring-neutral-300 dark:ring-neutral-700"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-sm">
                    {resolvedTheme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
                  </div>
                  <div>
                    <span className="font-semibold block text-xs">Switch to {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                    <span className="text-[10px] text-neutral-500">Toggle website color theme</span>
                  </div>
                </div>
                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[9px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 font-mono">⌘M</kbd>
              </button>

              <div className="my-1 border-t border-neutral-200 dark:border-neutral-800/80" />

              {/* Navigation Commands */}
              {filteredItems.map((item, idx) => {
                const itemIndex = idx + 1;
                const isSelected = selectedIndex === itemIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleNavigate(item.path)}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`flex w-full items-center justify-between rounded-xl p-3 text-left font-mono transition-all duration-150 ${
                      isSelected
                        ? "bg-neutral-100 dark:bg-neutral-900 ring-1 ring-neutral-300 dark:ring-neutral-700"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <span className="font-semibold block text-xs text-neutral-900 dark:text-neutral-100">{item.label}</span>
                        {item.description && (
                          <span className="text-[10px] text-neutral-500 font-sans">{item.description}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-[9px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 font-semibold">
                        {item.category}
                      </span>
                      <CornerDownLeft className={`h-3.5 w-3.5 transition-transform ${isSelected ? "translate-x-0 text-primary opacity-100" : "opacity-20"}`} />
                    </div>
                  </button>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="py-8 text-center text-xs text-neutral-400 font-mono">
                  No commands found matching &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-2.5 font-mono text-[10px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/90">
              <span className="flex items-center gap-1.5">
                <Command className="h-3 w-3 text-neutral-400" /> Use <kbd className="px-1 border rounded bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 text-[9px]">↑</kbd> <kbd className="px-1 border rounded bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 text-[9px]">↓</kbd> to navigate, <kbd className="px-1 border rounded bg-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 text-[9px]">↵</kbd> to select
              </span>
              <span className="font-semibold text-neutral-600 dark:text-neutral-400">v5.3.1 Enterprise</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
