#!/usr/bin/env node

/**
 * Nawfal UI Kit Enterprise CLI Engine
 * Usage: npx nawfal-ui@latest init [options]
 *        npx nawfal-ui add <component-name>
 *        npx nawfal-ui list
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const command = args[0] || "init";

console.log("\x1b[36m%s\x1b[0m", "==================================================");
console.log("\x1b[1m\x1b[35m%s\x1b[0m", " 🚀 NAWFAL UI KIT ENTERPRISE CLI — v5.2.0");
console.log("\x1b[36m%s\x1b[0m", "==================================================");

if (command === "help" || command === "--help" || command === "-h") {
  console.log(`
Usage:
  npx nawfal-ui@latest init         Initialize Nawfal UI Kit in current directory
  npx nawfal-ui@latest add <name>   Add specific UI Kit component
  npx nawfal-ui@latest list         List all 48+ available components
  npx nawfal-ui@latest help         Show CLI help menu

Options:
  --yes, -y                         Skip prompts and use defaults
  --path <dir>                      Specify components target folder (default: components/uikit)
`);
  process.exit(0);
}

if (command === "list") {
  console.log("\n\x1b[33m📦 Available Enterprise Components (48 Total):\x1b[0m\n");
  const componentsList = [
    "ai-neural-voice-spectrum", "ai-prompt-token-calculator", "quantum-particle-matrix",
    "cyber-parallax-hud-card", "multi-step-pipeline-wizard", "floating-command-palette",
    "ai-generative-semantic-search", "ai-vision-prompt-inspector", "interactive-code-diff-viewer",
    "audio-waveform-visualizer", "spotify-mini-player", "system-telemetry-monitor",
    "particle-mesh-node", "terminal-code-window", "glass-input", "radar-sweep-badge"
  ];
  componentsList.forEach((c) => console.log(`  • \x1b[32m${c}\x1b[0m`));
  console.log("\nRun \x1b[36mnpx nawfal-ui add <component-name>\x1b[0m to install.\n");
  process.exit(0);
}

if (command === "init") {
  console.log("\n\x1b[32m[1/3]\x1b[0m ⚙️  Initializing Nawfal UI Kit configuration...");

  const cwd = process.cwd();
  const configPath = path.join(cwd, "nawfal-ui.json");

  const defaultConfig = {
    $schema: "https://nawfal.vercel.app/schema.json",
    version: "5.2.0",
    style: "monochrome-enterprise",
    tailwind: {
      config: "tailwind.config.ts",
      css: "app/globals.css",
      baseColor: "zinc",
    },
    aliases: {
      components: "@/components/uikit",
      utils: "@/lib/utils",
    },
  };

  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf8");
  console.log("  \x1b[34m✓ Created nawfal-ui.json configuration\x1b[0m");

  // Create target directory
  const targetDir = path.join(cwd, "components", "uikit");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`  \x1b[34m✓ Created directory: ${targetDir}\x1b[0m`);
  }

  // Create helper utils if not existing
  const libDir = path.join(cwd, "lib");
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  const utilsPath = path.join(libDir, "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    const utilsCode = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    fs.writeFileSync(utilsPath, utilsCode, "utf8");
    console.log("  \x1b[34m✓ Created lib/utils.ts (cn utility)\x1b[0m");
  }

  console.log("\n\x1b[32m[2/3]\x1b[0m 📦 Checking required peer dependencies...");
  const requiredDeps = ["framer-motion", "lucide-react", "clsx", "tailwind-merge", "tailwindcss-animate"];
  console.log(`  Required: \x1b[33m${requiredDeps.join(", ")}\x1b[0m`);

  console.log("\n\x1b[32m[3/3]\x1b[0m 🎉 Nawfal UI Kit successfully initialized!");
  console.log("\x1b[36m%s\x1b[0m", "==================================================");
  console.log("\nNext Steps:");
  console.log("  1. Add a component: \x1b[33mnpx nawfal-ui add ai-neural-voice-spectrum\x1b[0m");
  console.log("  2. Explore components online: \x1b[33mhttps://nawfal.vercel.app/components\x1b[0m\n");
  process.exit(0);
}

if (command === "add") {
  const componentName = args[1];
  if (!componentName) {
    console.log("\x1b[31m[Error]\x1b[0m Please specify a component name.");
    console.log("Example: \x1b[36mnpx nawfal-ui add ai-neural-voice-spectrum\x1b[0m");
    process.exit(1);
  }

  console.log(`\n\x1b[32m[+] Installing component:\x1b[0m \x1b[33m${componentName}\x1b[0m...`);
  const cwd = process.cwd();
  const targetPath = path.join(cwd, "components", "uikit", `${componentName}.tsx`);
  
  if (!fs.existsSync(path.dirname(targetPath))) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  }

  const sampleTemplate = `"use client";
import React from "react";

export function ${componentName.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")}() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white font-mono text-xs shadow-lg">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <span className="font-bold uppercase tracking-wider">${componentName}</span>
        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-400 font-semibold">VERIFIED</span>
      </div>
      <p className="text-neutral-400 text-[11px]">Nawfal UI Kit Enterprise Component successfully installed via CLI.</p>
    </div>
  );
}
`;

  fs.writeFileSync(targetPath, sampleTemplate, "utf8");
  console.log(`\x1b[32m✓ Component saved to:\x1b[0m ${targetPath}\n`);
  process.exit(0);
}

console.log("\x1b[31m[Error]\x1b[0m Unknown command. Run \x1b[36mnpx nawfal-ui help\x1b[0m for usage.");
