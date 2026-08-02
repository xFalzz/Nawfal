"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderGit2,
  Award,
  MessageSquare,
  Camera,
  Sparkles,
  Sun,
  Moon,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import DarkMode from "./dark-mode";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    badge: null,
    color: "text-sky-500 bg-sky-500/10",
  },
  {
    name: "About",
    href: "/about",
    icon: User,
    badge: null,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderGit2,
    badge: null,
    color: "text-violet-500 bg-violet-500/10",
  },
  {
    name: "Certificates",
    href: "/certificate",
    icon: Award,
    badge: "48+",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    name: "Chat & AI",
    href: "/chat",
    icon: MessageSquare,
    badge: "AI",
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    name: "Photography",
    href: "/photography",
    icon: Camera,
    badge: null,
    color: "text-rose-500 bg-rose-500/10",
  },
];

const NavDrop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Close menu automatically on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* ── Mobile Hamburger / Trigger Button ────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        className={cn(
          "relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm transition-all duration-200 active:scale-95",
          isOpen && "border-primary/40 bg-primary/10 text-primary"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-1.5 items-end justify-center w-5"
            >
              <span className="h-0.5 w-full bg-foreground rounded-full" />
              <span className="h-0.5 w-3/4 bg-foreground rounded-full transition-all group-hover:w-full" />
              <span className="h-0.5 w-1/2 bg-foreground rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* ── Fullscreen Overlay Navigation Drawer ────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-4 right-4 top-20 z-40 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-border/60 bg-card/95 backdrop-blur-2xl p-5 shadow-2xl ring-1 ring-border/40 space-y-4"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between px-2 pb-3 border-b border-border/40">
                <div className="flex items-center gap-x-2">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Navigation Menu
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded-full border border-border/50">
                  Nawfal App
                </span>
              </div>

              {/* Navigation Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mobileNavItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 active:scale-[0.98]",
                        isActive
                          ? "bg-primary/10 border-primary/40 text-primary shadow-sm"
                          : "bg-muted/30 border-border/40 text-foreground hover:bg-muted/70 hover:border-border"
                      )}
                    >
                      <div className="flex items-center gap-x-3.5 min-w-0">
                        <div
                          className={cn(
                            "p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-110 shrink-0",
                            item.color
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={cn(
                              "text-sm font-bold truncate",
                              isActive ? "text-primary" : "text-foreground"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-2 shrink-0">
                        {item.badge && (
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                              item.badge === "AI"
                                ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground opacity-60"
                          )}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom Quick Settings & Theme Toggle */}
              <div className="pt-3 border-t border-border/40 flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Appearance
                </span>
                <div className="flex items-center gap-x-2">
                  <DarkMode />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDrop;
