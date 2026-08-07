"use client";

import React, { useState } from "react";
import { BookOpen, Code2, ArrowUpRight, Check, ChevronRight, Zap, ShieldCheck, Cpu, Terminal, Palette, Layers, Box, Eye, Sparkles, Shield, Globe } from "lucide-react";

export function LearnSection() {
  const [selectedGuide, setSelectedGuide] = useState(0);

  const guides = [
    {
      id: "what-is-nawfal-ui",
      title: "What is Nawfal UI? — Complete Introduction",
      category: "Getting Started",
      readTime: "3 min read",
      summary: "Understand what Nawfal UI is, why it was built, and how it fits into the modern React ecosystem as a production-grade component library.",
      content: `Nawfal UI is an open-source, enterprise-grade React component library built on a strict monochromatic design philosophy. It ships 48 production-ready components across 7 categories — from AI-powered semantic search interfaces to physics-based motion primitives and real-time telemetry dashboards.

### Why Nawfal UI Exists
Most component libraries ship compiled packages that abstract away the source code. Nawfal UI takes the opposite approach: **source-owned components**. Every component is a standalone TSX file that you copy into your project, own, and customize without dependency lock-in.

### Key Differentiators
- **Copy-paste architecture** — No npm imports, no version conflicts
- **Monochromatic design system** — WCAG AAA compliant, 18.5:1 contrast ratio
- **Physics-based animations** — Spring dynamics (stiffness, damping, mass) via Framer Motion
- **AI-first components** — RAG search, vector similarity, token streaming
- **CLI installer** — \`npx nawfal-ui@latest init\` for instant project setup

### Who Should Use This?
Nawfal UI is ideal for developers building modern web applications with Next.js 14+ who want premium, dark-mode-first UI components with full source ownership.`,
    },
    {
      id: "installation-guide",
      title: "Installation & Quick Start Guide",
      category: "Setup",
      readTime: "4 min read",
      summary: "Step-by-step guide to installing Nawfal UI in your Next.js project using the CLI, manual copy, or Git clone approach.",
      content: `Getting started with Nawfal UI takes less than 2 minutes. Choose from three installation methods:

### Method 1: CLI (Recommended)
\`\`\`bash
# Initialize your project
npx nawfal-ui@latest init

# Add specific components
npx nawfal-ui@latest add ai-semantic-search
npx nawfal-ui@latest add holographic-badge
npx nawfal-ui@latest add audio-waveform
\`\`\`

### Method 2: Manual Copy
1. Browse components at the Components tab
2. Click "Show Code" on any component
3. Copy the TSX source into your \`components/uikit/\` directory
4. Import and use: \`import { HolographicBadge } from "@/components/uikit/holographic-badge"\`

### Method 3: Clone Repository
\`\`\`bash
git clone https://github.com/xFalzz/nawfal-ui
cp -r nawfal-ui/components/uikit/ ./components/
\`\`\`

### Required Dependencies
Make sure these packages are installed in your project:
- \`react\` ^18.3.x
- \`framer-motion\` ^12.x
- \`lucide-react\` ^0.356.x
- \`tailwind-merge\` ^2.x
- \`clsx\` ^2.x

### Configuration File
After running \`init\`, a \`nawfal-ui.json\` config file is created:
\`\`\`json
{
  "style": "monochrome",
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
\`\`\``,
    },
    {
      id: "design-system-deep-dive",
      title: "Deep Dive: The Monochromatic Design System",
      category: "Design System",
      readTime: "6 min read",
      summary: "The complete design philosophy behind Nawfal UI — color tokens, typography scale, spacing system, border radii, and accessibility standards.",
      content: `The Nawfal UI design system is built on one core principle: **extreme visual clarity through luminance hierarchy**.

### Color Palette (6 Core Tokens)
- **#0A0A0A** (Obsidian Core) — Primary backgrounds, hero sections
- **#171717** (Neutral Dark) — Elevated card surfaces
- **#262626** (Subtle Surface) — Secondary containers, modals
- **#404040** (Muted Border) — Borders, dividers, separators
- **#FAFAFA** (Light Surface) — Light mode backgrounds
- **#FFFFFF** (Pure White) — Primary foreground text, icons

### Why Monochromatic?
Color is inherently subjective and introduces brand collision in enterprise contexts. A monochromatic palette:
1. Eliminates color bias and cultural interpretation issues
2. Forces designers to create hierarchy through **luminance, spacing, and typography** alone
3. Works universally across all brand identities
4. Achieves maximum WCAG contrast ratios naturally

### Typography Scale
- **Display XL**: 3xl, extrabold, tracking-tight — Hero headlines
- **Heading**: xl, bold — Section headers
- **Subheading**: sm, semibold, uppercase, wider — Category labels
- **Body**: xs, leading-relaxed — Content paragraphs
- **Caption**: mono, 10px, medium — Metadata, version tags
- **Badge**: mono, 8px, bold, uppercase — Status indicators

### Spacing System (4px base grid)
All spacing follows a 4px base grid: 4px → 8px → 12px → 16px → 20px → 24px → 32px. This ensures pixel-perfect alignment across all component compositions.

### Border Radius Tokens
- **rounded-sm** (2px) — Inline badges
- **rounded** (4px) — Input fields
- **rounded-lg** (8px) — Cards, containers
- **rounded-xl** (12px) — Section containers
- **rounded-2xl** (16px) — Hero panels`,
    },
    {
      id: "component-categories",
      title: "Understanding the 7 Component Categories",
      category: "Component Architecture",
      readTime: "5 min read",
      summary: "Detailed breakdown of all 48 components organized by their 7 functional categories — what each does and when to use them.",
      content: `Nawfal UI ships 48 components organized into 7 distinct functional categories:

### 1. AI RAG & Intelligence Engines (5 components)
Build AI-powered search interfaces with real-time vector similarity, token-by-token streaming, and semantic matching.
- **AI Semantic Search** — Full RAG search bar with query processing
- **Vector RAG Engine** — Cosine similarity scoring and confidence badges
- **Token Estimator** — GPT tokenization calculator
- **Neural Voice AI** — Conversational AI interface
- **AI Vision Inspector** — Image analysis pipeline UI

### 2. Audio Architecture & Media (5 components)
Premium music and audio visualization components.
- **Audio Waveform** — Dynamic frequency bar visualizer
- **Spotify Player** — Full-featured music player
- **Vinyl Controller** — Retro disk animation
- **Album Art Card** — Glassmorphic album display
- **Mini Player** — Compact playback widget

### 3. Bespoke Widgets & Utilities (8 components)
Unique developer-focused widgets that solve specific problems.
- **Color Picker** — HSL/RGB/Hex selector
- **BPM Metronome** — Audio tempo counter
- **Terminal Runner** — CLI simulation
- **Command Palette** — ⌘K search interface
- **FPS Monitor** — Frame rate dashboard
- **Copy Button** — One-click clipboard
- **QR Generator** — Dynamic QR code
- **Code Syntax Block** — Highlighted code display

### 4. Kinetic Motion & Physics (6 components)
Spring-animated, GPU-optimized motion primitives.

### 5. Structural Containers & Surfaces (8 components)
Glass panels, glow cards, holographic badges, and 3D parallax containers.

### 6. Interactive Inputs & Controls (9 components)
Form elements, toggles, steppers, OTP inputs, and range sliders.

### 7. Telemetry & System Signals (7 components)
Real-time monitoring dashboards, commit graphs, radar sweeps.`,
    },
    {
      id: "physics-spring-animations",
      title: "Mastering Physics-Based Spring Animations",
      category: "Animation Engineering",
      readTime: "5 min read",
      summary: "Why spring physics feel significantly better than CSS transitions, and how to tune stiffness, damping, and mass for production UI.",
      content: `Traditional \`ease-in-out\` CSS animations feel artificial because they follow fixed mathematical curves. Physics-driven spring animations model real-world mass, stiffness, and damping to create naturally responsive micro-interactions.

### The Spring Model
A spring animation follows Hooke's Law: F = -kx - cv
- **k (stiffness)** — How quickly the element reaches its target (higher = faster)
- **c (damping)** — How quickly the oscillation settles (higher = less bounce)
- **m (mass)** — How heavy the element feels (higher = more inertia)

### Recommended Spring Presets
| Preset | Stiffness | Damping | Mass | Use Case |
|--------|-----------|---------|------|----------|
| Snappy Button | 400 | 25 | 1 | Button press/release |
| Floating Modal | 200 | 20 | 1 | Modal entrance |
| Magnetic Drag | 150 | 15 | 0.5 | Drag-to-snap |
| Gentle Fade | 100 | 20 | 1 | Page transitions |
| Elastic Bounce | 300 | 10 | 0.8 | Notification pop |

### Implementation in Framer Motion
\`\`\`tsx
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
/>
\`\`\`

### GPU Optimization Rules
1. Only animate \`transform\` and \`opacity\` — never width/height/margin
2. Use \`will-change: transform\` sparingly on frequently animated elements
3. Avoid animating more than 10 elements simultaneously
4. Prefer \`translateZ(0)\` for hardware layer promotion`,
    },
    {
      id: "ai-rag-components",
      title: "Building AI-Powered Interfaces with Nawfal UI",
      category: "AI Web Engineering",
      readTime: "7 min read",
      summary: "How to implement semantic search, vector RAG, token streaming, and confidence scoring in production React applications.",
      content: `AI-driven interfaces require specialized UX patterns that handle async inference, streaming outputs, and confidence visualization.

### Pattern 1: Vector Similarity Badge
Display cosine similarity scores from embedding comparisons:
\`\`\`tsx
<VectorBadge score={0.984} threshold={0.8} />
// Renders: "98.4% MATCH ✓" with emerald indicator
\`\`\`

### Pattern 2: Token-by-Token Streaming
Render AI responses incrementally using Server-Sent Events:
1. Connect to SSE endpoint
2. Accumulate tokens in state
3. Render with cursor blink animation
4. Auto-scroll container to bottom

### Pattern 3: Semantic Search Bar
The AI Semantic Search component combines:
- Debounced query input (300ms)
- Real-time suggestion filtering
- Vector similarity ranking
- Highlighted match rendering
- Keyboard navigation (↑↓ Enter)

### Pattern 4: Confidence Thresholds
Map confidence scores to visual indicators:
- **95-100%**: Emerald badge, "VERIFIED MATCH"
- **80-94%**: Amber badge, "HIGH CONFIDENCE"
- **60-79%**: Orange badge, "MODERATE"
- **<60%**: Red badge, "LOW CONFIDENCE"

### Best Practice: Optimistic UI
Always show immediate feedback (loading states, skeleton placeholders) before AI inference completes. Users expect <200ms visual response even if inference takes 2-5 seconds.`,
    },
    {
      id: "glassmorphism-engineering",
      title: "Glassmorphism & Backdrop Filter Engineering",
      category: "CSS Engineering",
      readTime: "4 min read",
      summary: "Creating sleek frosted glass surfaces with proper cross-browser support, performance considerations, and fallback patterns.",
      content: `Frosted glass (glassmorphism) creates spatial hierarchy by blurring content behind floating panels, suggesting depth and layering.

### The CSS Foundation
\`\`\`css
.glass-panel {
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
\`\`\`

### Tailwind Implementation
\`\`\`html
<div class="bg-black/65 backdrop-blur-xl border border-white/12">
  <!-- Glass content -->
</div>
\`\`\`

### Performance Considerations
- Backdrop blur is GPU-intensive — limit to 3-4 stacked layers maximum
- On mobile devices, reduce blur from 16px to 8px for smoother scrolling
- Use \`will-change: transform\` on glass containers to promote GPU layers
- Avoid animating backdrop-filter values directly

### Cross-Browser Fallbacks
- Safari requires \`-webkit-backdrop-filter\` prefix
- Firefox 103+ supports backdrop-filter natively
- For unsupported browsers, fall back to solid rgba backgrounds`,
    },
    {
      id: "nextjs-architecture",
      title: "Scalable Component Architecture in Next.js 14",
      category: "Architecture",
      readTime: "6 min read",
      summary: "Best practices for organizing Server vs Client Components, data fetching patterns, and code-splitting strategies in Next.js App Router.",
      content: `Next.js 14's App Router fundamentally changes how we think about component architecture. Default to Server Components for maximum performance.

### Key Rules
1. **Server Components first** — Keep data fetching at root layout/page level
2. **Push "use client" down** — Only interactive widgets need client directives
3. **Use Suspense boundaries** — Wrap async sub-trees for progressive loading
4. **Code-split by route** — Each page auto-bundles independently

### Nawfal UI Integration Pattern
\`\`\`tsx
// app/dashboard/page.tsx (Server Component)
import { DashboardMetrics } from "./metrics";

export default async function DashboardPage() {
  const data = await fetchMetrics(); // Server-side
  return <DashboardMetrics data={data} />;
}

// app/dashboard/metrics.tsx (Client Component)
"use client";
import { RadarSweep } from "@/components/uikit/radar-sweep";
export function DashboardMetrics({ data }) {
  return <RadarSweep data={data} />;
}
\`\`\`

### File Organization
\`\`\`
components/
  uikit/          ← Nawfal UI source components
  ui/             ← shadcn/ui primitives
  macro/          ← App-specific compositions
lib/
  utils.ts        ← cn() helper, shared utilities
\`\`\``,
    },
    {
      id: "accessibility-wcag",
      title: "Accessibility (WCAG AA/AAA) in Monochromatic UI",
      category: "Accessibility",
      readTime: "5 min read",
      summary: "Ensuring full accessibility compliance in dark monochromatic themes — contrast ratios, focus management, screen readers, and keyboard navigation.",
      content: `A monochromatic design system naturally achieves high contrast ratios, but accessibility goes far beyond color.

### Contrast Ratios in Nawfal UI
- **Primary text** (#FAFAFA on #0A0A0A) = 18.5:1 → WCAG AAA ✓
- **Secondary text** (#A3A3A3 on #0A0A0A) = 8.6:1 → WCAG AAA ✓
- **Muted text** (#737373 on #0A0A0A) = 4.7:1 → WCAG AA ✓
- **Border indicators** (#404040 on #0A0A0A) = 2.6:1 → Non-text AA ✓

### Focus Management
Every interactive element must have visible focus states:
\`\`\`css
:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}
\`\`\`

### Keyboard Navigation
- All components support Tab/Shift+Tab navigation
- Arrow keys for list/menu navigation
- Enter/Space for activation
- Escape for dismissal

### Screen Reader Support
- Use semantic HTML elements (\`<button>\`, \`<nav>\`, \`<main>\`)
- Add \`aria-label\` to icon-only buttons
- Use \`role="status"\` for live telemetry updates
- Announce route changes with \`aria-live="polite"\`

### Motion Sensitivity
Respect \`prefers-reduced-motion\`:
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\``,
    },
    {
      id: "gpu-performance",
      title: "GPU-Optimized Web Animations for 60 FPS",
      category: "Performance",
      readTime: "5 min read",
      summary: "Ensuring buttery-smooth 60 FPS rendering by leveraging hardware acceleration, compositor threads, and avoiding layout thrashing.",
      content: `Smooth animations depend on keeping work on the GPU compositor thread rather than triggering CPU layout recalculations.

### The Golden Rules
1. **Animate ONLY** \`transform\` and \`opacity\` — these are composited, not layout-triggering
2. **Never animate** \`width\`, \`height\`, \`margin\`, \`padding\`, \`top\`, \`left\`
3. **Use \`transform: translateZ(0)\`** to promote elements to their own compositor layer
4. **Limit simultaneous animations** to 8-10 elements per viewport

### Layout Thrashing Detection
Layout thrashing occurs when you read and write DOM layout properties in quick succession:
\`\`\`js
// BAD — causes forced synchronous layout
element.style.width = "100px";
const height = element.offsetHeight; // Forces layout calculation
element.style.height = height + "px";

// GOOD — batch reads, then batch writes
const height = element.offsetHeight;
requestAnimationFrame(() => {
  element.style.width = "100px";
  element.style.height = height + "px";
});
\`\`\`

### Performance Budget
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s  
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 200ms
- JS bundle per route: < 150KB gzipped`,
    },
    {
      id: "vanilla-html-guide",
      title: "Using Nawfal UI in Vanilla HTML/CSS/JS Projects",
      category: "Multi-Framework",
      readTime: "6 min read",
      summary: "Complete guide to using Nawfal UI components in plain HTML without React, Vue, or any build tools — just a browser.",
      content: `Nawfal UI components can be used in **any project** — even pure HTML files with zero build tools. Every component card has an **HTML tab** that generates a standalone file you can open directly in a browser.

### Prerequisites
- A text editor (VS Code, Sublime, etc.)
- A modern web browser
- That's it — no Node.js, no npm, no bundler required

### Step 1: Copy the HTML Version
1. Open the Components Hub at \`/components\`
2. Click the **Code** tab on any component card
3. Switch to the **HTML** format tab
4. Click **Copy** to copy the entire standalone HTML file

### Step 2: Save & Open
\`\`\`bash
# Save the copied code as an HTML file
# Open it directly in your browser
open my-component.html
\`\`\`

### How It Works
The HTML version uses **Tailwind CSS via CDN** — no local installation needed:
\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
\`\`\`

### Adding Interactivity
Replace React state logic with vanilla JavaScript:
\`\`\`js
// React: const [active, setActive] = useState(false);
// Vanilla equivalent:
let active = false;
const button = document.getElementById("toggle-btn");
button.addEventListener("click", () => {
  active = !active;
  button.textContent = active ? "ON" : "OFF";
  button.classList.toggle("bg-emerald-500", active);
});
\`\`\`

### Replacing Framer Motion Animations
Use CSS transitions and \`@keyframes\` instead:
\`\`\`css
.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
\`\`\`

### Replacing Lucide Icons
Use Lucide's SVG sprite or CDN instead of the React package:
\`\`\`html
<script src="https://unpkg.com/lucide@latest"><\/script>
<script>lucide.createIcons();</script>

<!-- Then use: -->
<i data-lucide="zap"></i>
\`\`\`

### Tips
- Use \`data-*\` attributes for component state
- Use CSS custom properties for theming
- Use \`IntersectionObserver\` for scroll-triggered animations
- All Tailwind classes from the React version work identically in HTML`,
    },
    {
      id: "vue3-integration-guide",
      title: "Integrating Nawfal UI Components with Vue 3",
      category: "Multi-Framework",
      readTime: "7 min read",
      summary: "Step-by-step guide to converting and using Nawfal UI components in Vue 3 projects with Composition API and <script setup>.",
      content: `Nawfal UI components are available as **Vue 3 Single File Components** (.vue) using the modern Composition API with \`<script setup>\`.

### Prerequisites
\`\`\`bash
# Create a Vue 3 project (if you don't have one)
npm create vue@latest my-app
cd my-app
npm install

# Install required dependencies
npm install tailwindcss @tailwindcss/vite lucide-vue-next
\`\`\`

### Configure Tailwind CSS
\`\`\`js
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
\`\`\`

\`\`\`css
/* src/assets/main.css */
@import "tailwindcss";
\`\`\`

### Step 1: Copy the Vue SFC
1. Open the Components Hub at \`/components\`
2. Click **Code** tab → switch to **Vue** format
3. Copy the \`.vue\` SFC code
4. Save as \`src/components/ComponentName.vue\`

### Step 2: Use in Your App
\`\`\`vue
<template>
  <div class="min-h-screen bg-neutral-950 flex items-center justify-center">
    <HolographicBadge title="Elite Member" />
  </div>
</template>

<script setup>
import HolographicBadge from "./components/HolographicBadge.vue";
</script>
\`\`\`

### Converting React Patterns to Vue

#### State Management
\`\`\`js
// React: const [count, setCount] = useState(0)
// Vue 3:
import { ref } from "vue"
const count = ref(0)
// Access: count.value (in script), {{ count }} (in template)
\`\`\`

#### Event Handling
\`\`\`html
<!-- React: onClick={() => setActive(!active)} -->
<!-- Vue 3: -->
<button @click="active = !active">Toggle</button>
\`\`\`

#### Conditional Rendering
\`\`\`html
<!-- React: {isOpen && <Modal />} -->
<!-- Vue 3: -->
<Modal v-if="isOpen" />
\`\`\`

#### Animations (Replacing Framer Motion)
\`\`\`vue
<template>
  <Transition name="fade">
    <div v-if="show" class="rounded-lg bg-neutral-900 p-4">
      Content
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
\`\`\`

#### Using Lucide Icons in Vue
\`\`\`vue
<template>
  <Zap class="h-4 w-4 text-emerald-400" />
</template>

<script setup>
import { Zap } from "lucide-vue-next"
</script>
\`\`\`

### Nuxt 3 Compatibility
Nawfal UI Vue components work with Nuxt 3 out of the box:
\`\`\`bash
# Place .vue files in ~/components/
# Nuxt auto-imports them — no import statement needed
\`\`\`

### Tips
- Use \`ref()\` for primitives, \`reactive()\` for objects
- Vue's \`<Transition>\` component replaces most Framer Motion animations
- Use \`computed()\` for derived state instead of \`useMemo\`
- Use \`watchEffect()\` instead of \`useEffect\``,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Banner */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <BookOpen className="h-4 w-4" />
          <span>Learn & FAQ</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Comprehensive Engineering Guides & Frequently Asked Questions
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Everything you need to know about Nawfal UI Kit — design philosophy, multi-framework installation, AI interfaces, accessibility standards, performance optimization, and common questions.
        </p>
      </section>

      {/* Guide List & Reader */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sidebar Selection */}
        <div className="flex flex-col gap-2.5 max-h-[600px] overflow-y-auto pr-1 md:col-span-1">
          {guides.map((g, idx) => (
            <div
              key={g.id}
              onClick={() => setSelectedGuide(idx)}
              className={`cursor-pointer rounded-lg border p-3 transition-all ${
                selectedGuide === idx
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-sm"
                  : "border-neutral-200 bg-white/50 text-neutral-800 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider opacity-70">
                <span>{g.category}</span>
                <span>{g.readTime}</span>
              </div>
              <h4 className="mt-1 text-xs font-semibold leading-snug">{g.title}</h4>
            </div>
          ))}
        </div>

        {/* Reader Display Panel */}
        <div className="rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80 md:col-span-2">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <div>
              <span className="rounded border border-neutral-300 bg-neutral-100 px-2 py-0.5 font-mono text-[9px] uppercase text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                {guides[selectedGuide].category}
              </span>
              <h3 className="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">
                {guides[selectedGuide].title}
              </h3>
            </div>
            <span className="font-mono text-xs text-neutral-400">{guides[selectedGuide].readTime}</span>
          </div>

          <div className="prose prose-neutral dark:prose-invert mt-4 max-w-none text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p className="font-medium text-neutral-900 dark:text-neutral-100 italic bg-neutral-100 p-2.5 rounded border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 mb-4">
              {guides[selectedGuide].summary}
            </p>
            <div className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
              {guides[selectedGuide].content}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive FAQ Accordion Section ─── */}
      <section className="mt-8 rounded-xl border border-neutral-200 bg-white/60 p-6 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Zap className="h-4 w-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Pertanyaan Yang Sering Diajukan (FAQ)
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 mb-6">
          Jawaban langsung untuk pertanyaan umum mengenai penggunaan, lisensi, dan arsitektur Nawfal UI Kit.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              q: "Apa fungsi utama dari UI Kit Nawfal ini?",
              a: "Nawfal UI Kit adalah pustaka komponen UI tingkat enterprise yang dirancang untuk mempercepat pembuatan antarmuka aplikasi web modern (Next.js, React, Vue, HTML/CSS) dengan estetika monokromik yang elegan, animasi berbasis fisika, dan aksesibilitas tinggi (WCAG AAA)."
            },
            {
              q: "Bisakah komponen ini digunakan tanpa React / TypeScript?",
              a: "Sangat bisa! Setiap komponen di Nawfal UI Kit mendukung 4 format kode: React TSX, React JSX, Vanilla HTML/CSS/JS (dengan CDN Tailwind), dan Vue 3 SFC (Composition API). Anda cukup beralih tab format kode dan meng-copy kodenya."
            },
            {
              q: "Apakah Nawfal UI Kit ini gratis untuk digunakan?",
              a: "Ya, 100% Gratis dan Open-Source di bawah lisensi MIT. Anda bebas menggunakannya untuk proyek pribadi, komersial, maupun proyek klien tanpa batasan royalti."
            },
            {
              q: "Mengapa menggunakan metode Copy-Paste ketimbang npm package?",
              a: "Dengan copy-paste (source-owned architecture), Anda memiliki 100% kontrol atas kode sumber. Tidak ada risiko breaking changes saat update package, dan Anda bebas menyesuaikan komponen sesuai kebutuhan proyek."
            },
            {
              q: "Bagaimana cara kerja CLI `npx nawfal-ui@latest init`?",
              a: "CLI memudahkan inisialisasi konfigurasi `nawfal-ui.json` dan secara otomatis mengunduh kode komponen TSX langsung ke direktori `components/uikit/` proyek Anda."
            },
            {
              q: "Apakah semua komponen responsif untuk HP?",
              a: "Ya! Semua 48 komponen telah diuji dan dioptimalkan secara ketat agar tampil rapi di layar smartphone, tablet, maupun monitor desktop resolusi tinggi."
            }
          ].map((faq, i) => (
            <div key={i} className="flex flex-col gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-mono text-neutral-800 dark:text-neutral-200">Q{i+1}</span>
                {faq.q}
              </h4>
              <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-400 pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
