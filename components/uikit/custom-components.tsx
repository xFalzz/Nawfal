"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Terminal, 
  ArrowUpRight, 
  Check, 
  Command, 
  Sliders, 
  Layers, 
  ShieldCheck, 
  Zap,
  Cpu,
  Copy,
  ChevronDown,
  Bell,
  X,
  User,
  TrendingUp,
  ToggleLeft,
  ToggleRight,
  GitBranch
} from "lucide-react";

// ─── 1. Magnetic Monochrome Button ───────────────────────────────────────────
export function MagneticButton({ children = "Explore Motion" }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - (left + width / 2)) * 0.35,
      y: (e.clientY - (top + height / 2)) * 0.35,
    });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-medium text-neutral-100 transition-colors hover:border-neutral-500 dark:border-neutral-800 dark:bg-black"
    >
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.button>
  );
}

// ─── 2. Shimmer Border Beam Button ─────────────────────────────────────────
export function ShimmerBeamButton({ children = "Launch System" }: { children?: React.ReactNode }) {
  return (
    <button className="group relative inline-flex items-center justify-center overflow-hidden rounded p-[1px] font-mono text-xs font-semibold focus:outline-none">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#ffffff_50%,#171717_100%)]" />
      <span className="inline-flex h-full w-full items-center justify-center rounded bg-neutral-950 px-4 py-2 text-xs text-white backdrop-blur-3xl transition-colors group-hover:bg-neutral-900 dark:bg-black">
        <Zap className="mr-1.5 h-3 w-3 text-neutral-300" />
        {children}
      </span>
    </button>
  );
}

// ─── 3. Particle Burst Ripple Button ─────────────────────────────────────────
export function ParticleRippleButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center">
      {clicked && (
        <span className="absolute h-12 w-12 animate-ping rounded-full border border-neutral-400 opacity-75 dark:border-white" />
      )}
      <button
        onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 600); }}
        className="relative z-10 rounded border border-neutral-300 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-neutral-900 transition-all active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
      >
        Ripple Burst
      </button>
    </div>
  );
}

// ─── 4. Monochrome Glow Card ────────────────────────────────────────────────
export function MonochromeGlowCard({ title = "Monochrome Glow", description = "Spotlight card." }: { title?: string; description?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursor((p) => ({ ...p, opacity: 0 }))}
      className="group relative w-full max-w-[260px] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 transition-all dark:border-neutral-800 dark:bg-neutral-950/80"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity"
        style={{
          opacity: cursor.opacity,
          background: `radial-gradient(300px circle at ${cursor.x}px ${cursor.y}px, rgba(255, 255, 255, 0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col gap-1.5">
        <h4 className="text-xs font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h4>
        <p className="text-[11px] text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
    </div>
  );
}

// ─── 5. Cyber Border Grid Card ────────────────────────────────────────────────
export function CyberBorderCard({ title = "Cyber Node", status = "Active" }: { title?: string; status?: string }) {
  return (
    <div className="relative w-full max-w-[260px] rounded-lg border border-neutral-300 bg-white p-3 dark:border-neutral-800 dark:bg-black">
      <div className="absolute left-1 top-1 text-[9px] text-neutral-400 dark:text-neutral-600">+</div>
      <div className="absolute right-1 top-1 text-[9px] text-neutral-400 dark:text-neutral-600">+</div>
      <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5 dark:border-neutral-800">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />
          <span className="font-mono text-[9px] font-medium uppercase text-neutral-800 dark:text-neutral-200">{status}</span>
        </div>
        <span className="font-mono text-[9px] text-neutral-500">0x4F</span>
      </div>
      <p className="mt-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
    </div>
  );
}

// ─── 6. 3D Tilt Parallax Card ────────────────────────────────────────────────
export function TiltParallaxCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [10, -10]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-10, 10]), { stiffness: 300, damping: 20 });

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full max-w-[260px] cursor-pointer rounded-lg border border-neutral-300 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2">
        <Cpu className="h-4 w-4 text-neutral-800 dark:text-white" />
        <span className="text-xs font-bold text-neutral-900 dark:text-white">3D Gyroscope Perspective</span>
      </div>
    </motion.div>
  );
}

// ─── 7. Interactive Floating Dock Navigation ───────────────────────────────
export function InteractiveDock() {
  const [active, setActive] = useState(0);
  const items = [Layers, Terminal, Sliders, ShieldCheck];

  return (
    <div className="flex items-center justify-center rounded-xl border border-neutral-300 bg-white/70 p-1.5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/70">
      <div className="flex items-center gap-1">
        {items.map((Icon, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActive(idx)}
            whileHover={{ scale: 1.2, y: -2 }}
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              active === idx ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── 8. Glassmorphism Floating Input ──────────────────────────────────────────
export function GlassInput({ label = "Email Address", placeholder = "nawfal@example.com" }: { label?: string; placeholder?: string }) {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full max-w-[260px] rounded border border-neutral-300 bg-white/70 p-1 backdrop-blur-md focus-within:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-950/70 dark:focus-within:border-white">
      <label className="block px-2 pt-1 font-mono text-[9px] uppercase tracking-wider text-neutral-500">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-2 pb-1 text-xs text-neutral-900 outline-none dark:text-neutral-100 placeholder:text-neutral-400"
      />
    </div>
  );
}

// ─── 9. Pin Code OTP Input ──────────────────────────────────────────────────
export function PinCodeOTPInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);
    if (text && index < 3) inputsRef.current[index + 1]?.focus();
  };

  return (
    <div className="flex gap-1.5">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => { inputsRef.current[idx] = el; }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, idx)}
          className="h-8 w-7 rounded border border-neutral-300 bg-white text-center font-mono text-xs font-bold text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:focus:border-white"
        />
      ))}
    </div>
  );
}

// ─── 10. Minimal Pulse Badge ──────────────────────────────────────────────────
export function MinimalPulseBadge({ text = "Operational" }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-900 opacity-75 dark:bg-white" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white" />
      </span>
      <span>{text}</span>
    </div>
  );
}

// ─── 11. Radar Sweep Status Badge ──────────────────────────────────────────
export function RadarSweepBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-black px-3 py-1 font-mono text-[10px] text-neutral-200">
      <span className="h-2 w-2 animate-spin rounded-full border border-t-white border-neutral-600" />
      <span>RADAR ACTIVE</span>
    </div>
  );
}

// ─── 12. Command Shortcut Widget ──────────────────────────────────────────
export function CommandShortcutWidget() {
  const [copied, setCopied] = useState(false);

  return (
    <div 
      onClick={() => { navigator.clipboard.writeText("⌘ + K"); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="group cursor-pointer rounded border border-neutral-200 bg-white p-2.5 transition-all dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
          <Command className="h-3.5 w-3.5" /> Shortcut
        </span>
        <span className="font-mono text-[10px] text-neutral-400">{copied ? "Copied" : "⌘+K"}</span>
      </div>
    </div>
  );
}

// ─── 13. Retro Terminal Code Window ──────────────────────────────────────────
export function TerminalCodeWindow() {
  return (
    <div className="w-full max-w-[260px] overflow-hidden rounded border border-neutral-800 bg-neutral-950 font-mono text-[10px]">
      <div className="border-b border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[9px] text-neutral-400">nawfal-cli.sh</div>
      <div className="p-2.5 text-neutral-300">$ npx nawfal-ui@latest add</div>
    </div>
  );
}

// ─── 14. Accordion FAQ Item ────────────────────────────────────────────────
export function AccordionItemComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[260px] rounded border border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-2.5 text-xs font-semibold text-neutral-900 dark:text-white">
        <span>Monochrome Philosophy</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-neutral-200 p-2.5 text-[10px] text-neutral-500 dark:border-neutral-800">Pure clarity & spring physics.</div>}
    </div>
  );
}

// ─── 15. Segmented Control Switch ────────────────────────────────────────────
export function SegmentedControlSwitch() {
  const [selected, setSelected] = useState(0);
  const options = ["Preview", "Code", "Docs"];

  return (
    <div className="flex rounded bg-neutral-100 p-1 dark:bg-neutral-900">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(i)}
          className={`relative rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
            selected === i ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── 16. Compact Pipeline Step ───────────────────────────────────────────────
export function PipelineStep() {
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-neutral-800 dark:text-neutral-200">
      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-[10px] font-bold dark:border-neutral-700 dark:bg-neutral-900">1</div>
      <span>Build Pipeline</span>
      <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[9px] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">PASSED</span>
    </div>
  );
}

// ─── 17. Minimalist Toast Banner ────────────────────────────────────────────
export function NotificationToastBanner() {
  const [show, setShow] = useState(true);
  if (!show) return <button onClick={() => setShow(true)} className="text-xs text-neutral-400 underline">Reset Toast</button>;

  return (
    <div className="flex items-center justify-between gap-3 rounded border border-neutral-300 bg-white px-3 py-1.5 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center gap-2 text-xs">
        <Bell className="h-3.5 w-3.5 text-neutral-800 dark:text-white" />
        <span className="font-medium text-neutral-900 dark:text-neutral-100">Component Exported</span>
      </div>
      <X onClick={() => setShow(false)} className="h-3.5 w-3.5 cursor-pointer text-neutral-400 hover:text-neutral-900 dark:hover:text-white" />
    </div>
  );
}

// ─── 18. Avatar Group Overlap ────────────────────────────────────────────────
export function AvatarGroupPile() {
  return (
    <div className="flex items-center -space-x-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-900 font-mono text-[9px] font-bold text-white dark:border-black dark:bg-neutral-100 dark:text-black">
          U{i}
        </div>
      ))}
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-neutral-200 font-mono text-[8px] font-semibold text-neutral-700 dark:border-black dark:bg-neutral-800 dark:text-neutral-300">
        +5
      </div>
    </div>
  );
}

// ─── 19. Metric Key Value Badge ──────────────────────────────────────────────
export function MetricBadgeCard() {
  return (
    <div className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs dark:border-neutral-800 dark:bg-neutral-900/50 min-w-[140px]">
      <span className="text-neutral-500">Latency</span>
      <span className="font-mono font-bold text-neutral-900 dark:text-white">12ms</span>
    </div>
  );
}

// ─── 20. Compact Toggle Switch ───────────────────────────────────────────────
export function CompactToggleSwitch() {
  const [enabled, setEnabled] = useState(true);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
        enabled ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-neutral-800"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform dark:bg-black ${
          enabled ? "translate-x-3.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
