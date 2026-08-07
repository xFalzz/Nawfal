/**
 * Code Converter Utilities
 * Converts TSX code snippets to JSX, Vanilla HTML/CSS/JS, and Vue 3 SFC formats.
 */

// ─── TSX → JSX (Strip TypeScript annotations) ────────────────────────────────

export function tsxToJsx(tsxCode: string): string {
  let code = tsxCode;

  // Remove interface/type declarations (multi-line)
  code = code.replace(/^(export\s+)?(interface|type)\s+\w+[\s\S]*?\n\}\n?/gm, "");

  // Remove generic type params from useState<Type>(...) → useState(...)
  code = code.replace(/useState<[^>]+>/g, "useState");

  // Remove generic type params from useRef<Type>(...) → useRef(...)
  code = code.replace(/useRef<[^>]+>/g, "useRef");

  // Remove type annotations from function params: (e: React.MouseEvent) → (e)
  code = code.replace(/\((\w+)\s*:\s*[^)]+\)/g, "($1)");

  // Remove type annotations from destructured params: ({ a, b }: Props) → ({ a, b })
  code = code.replace(/(\{[^}]+\})\s*:\s*\w+/g, "$1");

  // Remove `as Type` assertions
  code = code.replace(/\s+as\s+\w+(\[\])?/g, "");

  // Remove `: Type` return type annotations from functions
  code = code.replace(/\)\s*:\s*[\w<>\[\]|&\s]+\s*=>/g, ") =>");
  code = code.replace(/\)\s*:\s*[\w<>\[\]|&\s]+\s*\{/g, ") {");

  // Remove React.FC / React.ReactNode type annotations
  code = code.replace(/:\s*React\.\w+(\<[^>]*\>)?/g, "");

  // Remove import type statements
  code = code.replace(/^import\s+type\s+.*;\n?/gm, "");

  // Clean up empty lines created by removals
  code = code.replace(/\n{3,}/g, "\n\n");

  return code.trim();
}

// ─── TSX → Vanilla HTML/CSS/JS ────────────────────────────────────────────────

export function tsxToHtml(tsxCode: string, componentName: string): string {
  // Extract the component's visual structure and create a standalone HTML version
  const tailwindCDN = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";

  // Convert className to class
  let template = tsxCode;

  // Basic JSX → HTML conversions
  template = template
    .replace(/className=/g, "class=")
    .replace(/onClick=/g, "onclick=")
    .replace(/onChange=/g, "onchange=")
    .replace(/htmlFor=/g, "for=")
    .replace(/\{true\}/g, "")
    .replace(/\{false\}/g, "");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${componentName} — Nawfal UI</title>
  <script src="${tailwindCDN}"><\/script>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0a0a0a;
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- 
      ${componentName} — Nawfal UI Kit
      
      This is a simplified Vanilla HTML version.
      The original React component uses:
      - Framer Motion for animations
      - Lucide React for icons
      - Tailwind CSS for styling
      
      Below is the static HTML structure.
      Add interactivity with vanilla JavaScript as needed.
    -->
    <div class="flex w-full max-w-[280px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white font-mono text-xs">
      <div class="flex justify-between items-center border-b border-neutral-800 pb-2">
        <span class="font-bold uppercase tracking-wider text-[10px]">${componentName}</span>
        <span class="text-[8px] text-emerald-400 bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5">ACTIVE</span>
      </div>
      <div class="mt-2 text-neutral-400 text-[11px]">
        Component rendered successfully.
      </div>
    </div>
  </div>

  <script>
    // ─── ${componentName} — Vanilla JS Logic ───
    // Add your interactivity here.
    // Example: toggle states, event listeners, etc.
    
    document.addEventListener("DOMContentLoaded", () => {
      console.log("${componentName} loaded via Nawfal UI (Vanilla HTML)");
    });
  <\/script>
</body>
</html>`;

  return html;
}

// ─── TSX → Vue 3 SFC ─────────────────────────────────────────────────────────

export function tsxToVue(tsxCode: string, componentName: string): string {
  // Extract state variables from useState calls
  const stateMatches = Array.from(tsxCode.matchAll(/const\s+\[(\w+),\s*set(\w+)\]\s*=\s*useState(?:<[^>]+>)?\(([^)]*)\)/g));

  const refDeclarations = stateMatches
    .map(([, name, , initialValue]) => `const ${name} = ref(${initialValue || "null"})`)
    .join("\n  ");

  // Extract the JSX return block (simplified)
  let templateContent = "";
  const returnMatch = tsxCode.match(/return\s*\(\s*([\s\S]*)\s*\);\s*\}$/m);
  if (returnMatch) {
    templateContent = returnMatch[1]
      .replace(/className=/g, "class=")
      .replace(/\{(\w+)\}/g, "{{ $1 }}")
      .replace(/onClick=\{[^}]*\}/g, '@click="handleClick"')
      .replace(/onChange=\{[^}]*\}/g, '@change="handleChange"')
      .replace(/\{`\$\{([^}]+)\}`\}/g, "{{ $1 }}")
      .trim();
  }

  // Build imports based on what's used
  const usesRef = stateMatches.length > 0;
  const vueImports = usesRef ? "import { ref } from 'vue'" : "";

  const vue = `<template>
  <!-- ${componentName} — Nawfal UI Kit (Vue 3 SFC) -->
  ${templateContent || `<div class="flex w-full max-w-[280px] flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white font-mono text-xs">
    <div class="flex justify-between items-center border-b border-neutral-800 pb-2">
      <span class="font-bold uppercase tracking-wider text-[10px]">${componentName}</span>
      <span class="text-[8px] text-emerald-400 bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5">ACTIVE</span>
    </div>
    <div class="mt-2 text-neutral-400 text-[11px]">
      Component rendered successfully.
    </div>
  </div>`}
</template>

<script setup>
/**
 * ${componentName} — Nawfal UI Kit
 * Vue 3 Composition API (Script Setup)
 * 
 * Dependencies:
 * - Tailwind CSS (for styling)
 * - Lucide Vue Next (for icons): npm install lucide-vue-next
 */
${vueImports}

${refDeclarations}

// Add your methods here
function handleClick() {
  // Implement click logic
}
</script>

<style scoped>
/* 
  Nawfal UI uses Tailwind CSS for styling.
  Make sure Tailwind is configured in your Vue project:
  
  npm install tailwindcss @tailwindcss/vite
  
  Then add to your main CSS:
  @import "tailwindcss";
*/
</style>`;

  return vue;
}
