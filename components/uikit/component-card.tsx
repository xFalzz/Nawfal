"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Eye, Check, Copy, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { tsxToJsx, tsxToHtml, tsxToVue } from "@/lib/code-converter";

type CodeFormat = "tsx" | "jsx" | "html" | "vue";

interface ComponentCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ReactNode;
  codeSnippet: string;
  dependencies?: string[];
}

const FORMAT_LABELS: Record<CodeFormat, string> = {
  tsx: "TSX",
  jsx: "JSX",
  html: "HTML",
  vue: "Vue",
};

const FORMAT_BADGE: Record<CodeFormat, string> = {
  tsx: "React TSX",
  jsx: "React JSX",
  html: "Vanilla HTML",
  vue: "Vue 3 SFC",
};

export function ComponentCard({
  id,
  name,
  category,
  description,
  component,
  codeSnippet,
  dependencies = ["framer-motion", "tailwind"],
}: ComponentCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [codeFormat, setCodeFormat] = useState<CodeFormat>("tsx");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Memoize converted code to avoid re-computation on every render
  const convertedCode = useMemo(() => {
    return {
      tsx: codeSnippet,
      jsx: tsxToJsx(codeSnippet),
      html: tsxToHtml(codeSnippet, name),
      vue: tsxToVue(codeSnippet, name),
    };
  }, [codeSnippet, name]);

  const currentCode = convertedCode[codeFormat];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    toast({
      title: "Code Copied!",
      description: `Copied ${name} ${FORMAT_BADGE[codeFormat]} snippet.`,
    });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all hover:border-neutral-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
      {/* Compact Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-neutral-200 px-2.5 py-2 dark:border-neutral-800 sm:px-3">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="hidden rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[8px] font-medium uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 xs:inline-block xs:text-[9px]">
            {category}
          </span>
          <h4 className="truncate text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 xs:text-xs">
            {name}
          </h4>
        </div>

        {/* Compact Tab Switcher */}
        <div className="flex items-center gap-0.5 rounded border border-neutral-200 bg-neutral-100 p-0.5 dark:border-neutral-800 dark:bg-neutral-900">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Eye className="h-3 w-3" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
              activeTab === "code"
                ? "bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            <Code className="h-3 w-3" />
            <span>Code</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[160px] w-full flex-1 sm:min-h-[190px]">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[160px] w-full items-center justify-center p-3 bg-neutral-50/40 dark:bg-black/40 sm:min-h-[190px] sm:p-5"
            >
              {component}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex min-h-[160px] w-full flex-col sm:min-h-[190px]"
            >
              {/* ── Format Switcher Bar ── */}
              <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-2.5 py-1.5 sm:px-3">
                <div className="flex items-center gap-0.5 rounded border border-neutral-700 bg-neutral-800 p-0.5">
                  {(["tsx", "jsx", "html", "vue"] as CodeFormat[]).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCodeFormat(fmt)}
                      className={`rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide transition-colors ${
                        codeFormat === fmt
                          ? "bg-white text-black shadow-sm"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {FORMAT_LABELS[fmt]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-200 hover:bg-neutral-700 shadow-md transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* ── Code Block ── */}
              <div className="max-h-[280px] flex-1 overflow-auto bg-neutral-950 p-3 text-[10px] font-mono text-neutral-200 dark:bg-black scrollbar-thin sm:p-4 sm:text-[11px]">
                <pre className="leading-relaxed whitespace-pre-wrap">
                  <code>{currentCode}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compact Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-[9px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 sm:px-3 sm:text-[10px]">
        <p className="truncate max-w-[55%] sm:max-w-[60%]">{description}</p>
        <span className="shrink-0 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 sm:text-[9px]">
          {FORMAT_BADGE[codeFormat]}
        </span>
      </div>
    </div>
  );
}
