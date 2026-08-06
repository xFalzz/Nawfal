"use client";

import React, { useState } from "react";
import { BookOpen, Code2, ArrowUpRight, Check, ChevronRight, Zap, ShieldCheck, Cpu } from "lucide-react";

export function LearnSection() {
  const [selectedGuide, setSelectedGuide] = useState(0);

  const guides = [
    {
      id: "out-of-the-box-physics",
      title: "1. Engineering Out-Of-The-Box Audio Spectrum & Hardware Trackers",
      category: "Innovation Engineering",
      readTime: "5 min read",
      summary: "How to build real-time audio spectrum physics visualizers and listener events for physical hardware keyboards in React.",
      content: `
Building components that go beyond basic buttons or forms requires tapping into low-level browser APIs:

1. **Hardware Keyboard Key Tracker**: Listening to global \`keydown\` and \`keyup\` window events to map physical key codes (e.g. \`CMD\`, \`K\`, \`W\`, \`A\`, \`S\`, \`D\`) to 3D spring-animated keycaps in real time.
2. **Audio Spectrum Waveform**: Animating dynamic bar heights using spring stiffness (\`stiffness: 300, damping: 15\`) to emulate physical frequency bounce during audio playback.
3. **Holographic Scanlines**: Employing linear gradient transforms moving vertically across dark obsidian surfaces to simulate holographic laser security cards.
      `,
    },
    {
      id: "motion-springs",
      title: "2. Mastering Physics-Based Springs in Framer Motion",
      category: "Animation Mechanics",
      readTime: "4 min read",
      summary: "Why spring physics feel significantly better than traditional CSS ease-in-out transitions, and how to tune stiffness and damping for UI components.",
      content: `
Traditional linear or cubic-bezier CSS animations can feel artificial. Physics-driven spring animations model mass, stiffness, and damping to create tactile, natural UI micro-interactions.

### Recommended Spring Presets:
- **Snappy Button**: \`{ type: "spring", stiffness: 400, damping: 25 }\`
- **Floating Modal**: \`{ type: "spring", stiffness: 200, damping: 20 }\`
- **Magnetic Drag**: \`{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }\`
      `,
    },
    {
      id: "monochrome-depth",
      title: "3. The Art of Monochromatic UI: Creating Depth Without Color",
      category: "Design System",
      readTime: "5 min read",
      summary: "How to build rich visual hierarchy using only luminance gradients, subtle borders, radial spotlights, and backdrop blurs.",
      content: `
When color is removed as a visual indicator, interface design relies heavily on four fundamental elements:

1. **Luminance Contrast**: Separating background obsidian (#0A0A0A) from elevated surfaces (#171717).
2. **Radial Spotlights**: Using dynamic mouse coordinates to illuminate component borders on hover.
3. **Precision Grid Lines**: Employing 1px borders with 10-15% opacity to establish structural boundaries.
4. **Subtle Elevation**: Harnessing backdrop blur filters (\`backdrop-filter: blur(12px)\`) for contextual depth.
      `,
    },
    {
      id: "next14-architecture",
      title: "4. Scalable Component Architecture in Next.js 14 App Router",
      category: "Architecture",
      readTime: "6 min read",
      summary: "Best practices for organizing Server Components vs Client Components in production React applications.",
      content: `
In Next.js 14, default to **Server Components** for maximum performance and low JS bundle payload. Push \`"use client"\` boundaries as far down the DOM tree as possible.

### Key Rules:
- Keep data fetching inside Server Components at the root layout or page level.
- Wrap interactive micro-widgets (like Nawfal UI components) with local \`"use client"\` directives.
- Use React Suspense boundaries around async data-fetching sub-trees.
      `,
    },
    {
      id: "ai-semantic-rag-ui",
      title: "5. Building AI Semantic Search & Vector RAG UI Components in React",
      category: "AI Web Engineering",
      readTime: "7 min read",
      summary: "Architecting interactive conversational search bars, vector similarity badges, and token-by-token streaming RAG outputs.",
      content: `
AI-driven interfaces require specialized UX patterns that provide instant feedback during async inference:

1. **Vector Confidence Score**: Displaying real-time similarity metrics (e.g. \`98.4% MATCH\`) derived from cosine similarity calculations over embeddings.
2. **Streaming Text Simulation**: Utilizing \`setInterval\` or Server-Sent Events (SSE) to render tokens incrementally, providing responsive feedback to the user.
3. **Optimistic Tag Suggestions**: Automatically surfacing auto-complete semantic filters as the user types.
      `,
    },
    {
      id: "gpu-performance-optimization",
      title: "6. High-Performance Web Animations & GPU Layer Optimization",
      category: "Performance",
      readTime: "5 min read",
      summary: "Ensuring 60 FPS rendering by leveraging hardware acceleration, transform3d, and avoiding layout reflows.",
      content: `
Smooth 60 FPS animations depend on keeping work on the GPU thread rather than triggering CPU layout re-calculations:

- **GPU Accelerated Properties**: Animate ONLY \`transform\` (scale, translate, rotate) and \`opacity\`.
- **Hardware Layer Promotion**: Use \`transform: translateZ(0)\` or \`will-change: transform\` sparingly on heavily animated widgets.
- **Avoid Reflow Triggers**: Never animate properties like \`width\`, \`height\`, \`margin\`, or \`padding\` directly.
      `,
    },
    {
      id: "glassmorphism-css-engineering",
      title: "7. Glassmorphism & Backdrop Filter Engineering in Modern CSS",
      category: "CSS Engineering",
      readTime: "4 min read",
      summary: "Designing sleek frosted glass cards with cross-browser fallback support.",
      content: `
Frosted glass UI creates a sense of spatial hierarchy by blurring elements behind floating containers.

### Recommended CSS Tokens:
\`\`\`css
.glass-panel {
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
\`\`\`
      `,
    },
    {
      id: "wcag-monochrome-accessibility",
      title: "8. Accessible Monochromatic Contrast (WCAG AA/AAA Standard)",
      category: "Accessibility",
      readTime: "5 min read",
      summary: "Ensuring high contrast ratios (4.5:1 for body text, 3:1 for large UI components) in dark mode interfaces.",
      content: `
A common pitfall in dark monochromatic themes is low legibility due to insufficient contrast.

- **Body Text**: Maintain minimum 4.5:1 contrast against background (#0A0A0A vs #FAFAFA = 18.5:1).
- **Secondary Text**: Keep neutral text at minimum #A3A3A3 to satisfy WCAG AA legibility.
- **Focus Rings**: Always preserve visible focus outlines (\`ring-2 ring-white\`) for keyboard navigation.
      `,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Banner */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <BookOpen className="h-4 w-4" />
          <span>Learn & Engineering Tutorials ({guides.length} Micro-Guides)</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Frontend Engineering & AI Web Tutorials
        </h2>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Comprehensive micro-guides covering low-level hardware events, AI vector search, GPU optimization, spring physics, and accessibility.
        </p>
      </section>

      {/* Guide List & Reader */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sidebar Selection */}
        <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1 md:col-span-1">
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
    </div>
  );
}
