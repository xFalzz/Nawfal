"use client";

import React from "react";
import { useTheme } from "next-themes";

export default function KeyboardShortcutsBadge() {
  const { theme, setTheme } = useTheme();

  const handleOpenCommand = (key: string = "k") => {
    // Dispatch ⌘K or ⌘F event to trigger GlobalCommandPalette
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: key,
        metaKey: true,
        ctrlKey: true,
        bubbles: true,
      })
    );
  };

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="pad-r absolute bottom-0 right-0 hidden sm:flex flex-col items-end gap-y-2">
      <code
        onClick={handleToggleTheme}
        title="Toggle Theme (⌘M)"
        className="group flex cursor-pointer items-center justify-end gap-x-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Theme{" "}
        <kbd className="pointer-events-none inline-flex h-fit select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:border-foreground/40 group-hover:text-foreground">
          <span className="text-xs">⌘</span>M
        </kbd>
      </code>
      <code
        onClick={() => handleOpenCommand("f")}
        title="Quick Search (⌘F)"
        className="group flex cursor-pointer items-center justify-end gap-x-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Search{" "}
        <kbd className="pointer-events-none inline-flex h-fit select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:border-foreground/40 group-hover:text-foreground">
          <span className="text-xs">⌘</span>F
        </kbd>
      </code>
      <code
        onClick={() => handleOpenCommand("k")}
        title="Open Command Palette (⌘K)"
        className="group flex cursor-pointer items-center justify-end gap-x-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Command{" "}
        <kbd className="pointer-events-none inline-flex h-fit select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:border-foreground/40 group-hover:text-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </code>
    </div>
  );
}
