"use client";

import React, { useState } from "react";
import { Sliders, ShieldCheck, Copy, Check, Code2, RefreshCw, Pipette, Ruler, Hash, Eye, Palette } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ToolsSection() {
  const { toast } = useToast();

  // Tool 1: Glassmorphism Builder
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(40);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [copiedGlass, setCopiedGlass] = useState(false);

  // Tool 2: Contrast Checker
  const [fgColor, setFgColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("#0A0A0A");

  // Tool 3: Tailwind Class Formatter
  const [inputClass, setInputClass] = useState("flex w-full items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-white shadow-md");
  const [formattedClass, setFormattedClass] = useState("");
  const [copiedFormatted, setCopiedFormatted] = useState(false);

  // Tool 4: Box Shadow Generator
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(4);
  const [shadowBlur2, setShadowBlur2] = useState(12);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowOpacity2, setShadowOpacity2] = useState(25);
  const [copiedShadow, setCopiedShadow] = useState(false);

  // Tool 5: Border Radius Visualizer
  const [topLeft, setTopLeft] = useState(12);
  const [topRight, setTopRight] = useState(12);
  const [bottomRight, setBottomRight] = useState(12);
  const [bottomLeft, setBottomLeft] = useState(12);
  const [copiedRadius, setCopiedRadius] = useState(false);

  // Tool 6: Gradient Generator
  const [gradFrom, setGradFrom] = useState("#0a0a0a");
  const [gradTo, setGradTo] = useState("#171717");
  const [gradDirection, setGradDirection] = useState("to bottom");
  const [copiedGrad, setCopiedGrad] = useState(false);

  const glassTailwind = `bg-black/${opacity} backdrop-blur-[${blur}px] border border-white/${borderOpacity}`;
  const shadowCSS = `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur2}px ${shadowSpread}px rgba(0,0,0,${shadowOpacity2 / 100});`;
  const radiusCSS = `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;
  const gradCSS = `background: linear-gradient(${gradDirection}, ${gradFrom}, ${gradTo});`;

  const handleCopyGlass = () => {
    navigator.clipboard.writeText(glassTailwind);
    setCopiedGlass(true);
    toast({ title: "Glassmorphism Tailwind Copied!" });
    setTimeout(() => setCopiedGlass(false), 2000);
  };

  const handleFormatClass = () => {
    const sorted = inputClass.split(" ").filter(Boolean).sort().join(" ");
    setFormattedClass(sorted);
  };

  const handleCopyFormatted = () => {
    navigator.clipboard.writeText(formattedClass || inputClass);
    setCopiedFormatted(true);
    toast({ title: "Formatted Classes Copied!" });
    setTimeout(() => setCopiedFormatted(false), 2000);
  };

  const handleCopyShadow = () => {
    navigator.clipboard.writeText(shadowCSS);
    setCopiedShadow(true);
    toast({ title: "Box Shadow CSS Copied!" });
    setTimeout(() => setCopiedShadow(false), 2000);
  };

  const handleCopyRadius = () => {
    navigator.clipboard.writeText(radiusCSS);
    setCopiedRadius(true);
    toast({ title: "Border Radius CSS Copied!" });
    setTimeout(() => setCopiedRadius(false), 2000);
  };

  const handleCopyGrad = () => {
    navigator.clipboard.writeText(gradCSS);
    setCopiedGrad(true);
    toast({ title: "Gradient CSS Copied!" });
    setTimeout(() => setCopiedGrad(false), 2000);
  };

  const contrastRatio = (() => {
    const luminance = (hex: string) => {
      const rgb = hex.replace("#", "").match(/.{2}/g)?.map(v => {
        let n = parseInt(v, 16) / 255;
        return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
      }) || [0, 0, 0];
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    };
    try {
      const l1 = luminance(fgColor);
      const l2 = luminance(bgColor);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return ratio.toFixed(1);
    } catch { return "—"; }
  })();

  const wcagPass = parseFloat(contrastRatio) >= 4.5;
  const wcagAAA = parseFloat(contrastRatio) >= 7;

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Banner */}
      <section className="rounded-xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/60">
        <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-500">
          <Sliders className="h-4 w-4" />
          <span>Interactive Developer Tools (6 Utilities)</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Nawfal UI Developer Toolbox
        </h2>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
          Real-time visual generators for glassmorphism, WCAG contrast validation, Tailwind class formatting, 
          box shadow engineering, border radius visualization, and gradient composition.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Tool 1: Glassmorphism Builder */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">1. Glassmorphism Builder</h3>
            <span className="font-mono text-[9px] text-neutral-400">TAILWIND</span>
          </div>

          <div
            style={{
              backdropFilter: `blur(${blur}px)`,
              backgroundColor: `rgba(0,0,0,${opacity / 100})`,
              borderColor: `rgba(255,255,255,${borderOpacity / 100})`,
            }}
            className="flex h-20 w-full items-center justify-center rounded-lg border p-3 text-center text-xs font-semibold text-white shadow-inner"
          >
            Frosted Glass Preview
          </div>

          <div className="flex flex-col gap-2.5 text-xs">
            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-500">
                <span>Backdrop Blur</span><span>{blur}px</span>
              </div>
              <input type="range" min={0} max={30} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-500">
                <span>Background Opacity</span><span>{opacity}%</span>
              </div>
              <input type="range" min={0} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
          </div>

          <button onClick={handleCopyGlass} className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            {copiedGlass ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedGlass ? "Copied" : "Copy Tailwind Class"}</span>
          </button>
        </div>

        {/* Tool 2: WCAG Contrast Checker */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">2. Contrast Checker</h3>
            <span className="font-mono text-[9px] text-neutral-400">WCAG</span>
          </div>

          <div
            style={{ backgroundColor: bgColor, color: fgColor }}
            className="flex h-20 w-full flex-col items-center justify-center rounded-lg border border-neutral-700 p-3 text-center transition-colors"
          >
            <p className="text-xs font-bold">Contrast Legibility Test</p>
            <p className="text-[10px] opacity-80">Ratio: {contrastRatio}:1</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold ${wcagPass ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
              AA {wcagPass ? "PASS ✓" : "FAIL ✗"}
            </span>
            <span className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold ${wcagAAA ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
              AAA {wcagAAA ? "PASS ✓" : "WARN"}
            </span>
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <div>
              <label className="font-mono text-[10px] text-neutral-500">Foreground Hex</label>
              <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white" />
            </div>
            <div>
              <label className="font-mono text-[10px] text-neutral-500">Background Hex</label>
              <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-xs text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Tool 3: Tailwind Class Formatter */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">3. Class Formatter</h3>
            <span className="font-mono text-[9px] text-neutral-400">FORMATTER</span>
          </div>

          <textarea
            rows={3}
            value={inputClass}
            onChange={(e) => setInputClass(e.target.value)}
            className="w-full rounded border border-neutral-300 bg-white p-2 font-mono text-[10px] text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          />

          {formattedClass && (
            <div className="rounded border border-emerald-200 bg-emerald-50 p-2 font-mono text-[10px] text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
              {formattedClass}
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={handleFormatClass} className="flex-1 rounded border border-neutral-300 bg-neutral-100 py-1.5 font-mono text-[10px] font-semibold text-neutral-800 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
              Alphabetize
            </button>
            <button onClick={handleCopyFormatted} className="flex-1 rounded bg-neutral-900 py-1.5 font-mono text-[10px] font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-black">
              {copiedFormatted ? "Copied!" : "Copy Format"}
            </button>
          </div>
        </div>

        {/* Tool 4: Box Shadow Generator */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">4. Box Shadow Generator</h3>
            <span className="font-mono text-[9px] text-neutral-400">CSS</span>
          </div>

          <div
            style={{ boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur2}px ${shadowSpread}px rgba(0,0,0,${shadowOpacity2 / 100})` }}
            className="flex h-16 w-full items-center justify-center rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
          >
            Shadow Preview
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>X</span><span>{shadowX}px</span></div>
              <input type="range" min={-20} max={20} value={shadowX} onChange={(e) => setShadowX(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>Y</span><span>{shadowY}px</span></div>
              <input type="range" min={-20} max={20} value={shadowY} onChange={(e) => setShadowY(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>Blur</span><span>{shadowBlur2}px</span></div>
              <input type="range" min={0} max={50} value={shadowBlur2} onChange={(e) => setShadowBlur2(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>Opacity</span><span>{shadowOpacity2}%</span></div>
              <input type="range" min={0} max={100} value={shadowOpacity2} onChange={(e) => setShadowOpacity2(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
          </div>

          <button onClick={handleCopyShadow} className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            {copiedShadow ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedShadow ? "Copied" : "Copy CSS"}</span>
          </button>
        </div>

        {/* Tool 5: Border Radius Visualizer */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">5. Border Radius Lab</h3>
            <span className="font-mono text-[9px] text-neutral-400">CSS</span>
          </div>

          <div className="flex items-center justify-center py-2">
            <div
              style={{ borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px` }}
              className="flex h-20 w-20 items-center justify-center border-2 border-neutral-900 bg-neutral-100 text-[10px] font-mono font-bold text-neutral-700 dark:border-white dark:bg-neutral-800 dark:text-neutral-300"
            >
              {topLeft}/{topRight}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>TL</span><span>{topLeft}px</span></div>
              <input type="range" min={0} max={50} value={topLeft} onChange={(e) => setTopLeft(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>TR</span><span>{topRight}px</span></div>
              <input type="range" min={0} max={50} value={topRight} onChange={(e) => setTopRight(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>BR</span><span>{bottomRight}px</span></div>
              <input type="range" min={0} max={50} value={bottomRight} onChange={(e) => setBottomRight(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
            <div>
              <div className="flex justify-between font-mono text-neutral-500"><span>BL</span><span>{bottomLeft}px</span></div>
              <input type="range" min={0} max={50} value={bottomLeft} onChange={(e) => setBottomLeft(Number(e.target.value))} className="w-full accent-neutral-900 dark:accent-white" />
            </div>
          </div>

          <button onClick={handleCopyRadius} className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            {copiedRadius ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedRadius ? "Copied" : "Copy CSS"}</span>
          </button>
        </div>

        {/* Tool 6: Gradient Generator */}
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">6. Gradient Generator</h3>
            <span className="font-mono text-[9px] text-neutral-400">CSS</span>
          </div>

          <div
            style={{ background: `linear-gradient(${gradDirection}, ${gradFrom}, ${gradTo})` }}
            className="flex h-16 w-full items-center justify-center rounded-lg border border-neutral-200 text-xs font-semibold text-white dark:border-neutral-800"
          >
            Gradient Preview
          </div>

          <div className="flex flex-col gap-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-mono text-[10px] text-neutral-500">From</label>
                <input type="text" value={gradFrom} onChange={(e) => setGradFrom(e.target.value)} className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-[10px] text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-neutral-500">To</label>
                <input type="text" value={gradTo} onChange={(e) => setGradTo(e.target.value)} className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-[10px] text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-neutral-500">Direction</label>
              <select value={gradDirection} onChange={(e) => setGradDirection(e.target.value)} className="mt-1 w-full rounded border border-neutral-300 bg-white p-1.5 font-mono text-[10px] text-neutral-900 outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                <option value="to bottom">↓ to bottom</option>
                <option value="to right">→ to right</option>
                <option value="to bottom right">↘ to bottom right</option>
                <option value="to top right">↗ to top right</option>
                <option value="135deg">135°</option>
                <option value="45deg">45°</option>
              </select>
            </div>
          </div>

          <button onClick={handleCopyGrad} className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            {copiedGrad ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedGrad ? "Copied" : "Copy CSS"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
