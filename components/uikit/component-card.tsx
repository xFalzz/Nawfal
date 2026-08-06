"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Eye, Check, Copy, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ComponentCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ReactNode;
  codeSnippet: string;
  dependencies?: string[];
}

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
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    toast({
      title: "Code Copied!",
      description: `Copied ${name} TSX snippet.`,
    });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all hover:border-neutral-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
      {/* Compact Header Bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
            {category}
          </span>
          <h4 className="truncate text-xs font-semibold text-neutral-900 dark:text-neutral-100">
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
      <div className="relative min-h-[190px] w-full flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[190px] w-full items-center justify-center p-5 bg-neutral-50/40 dark:bg-black/40"
            >
              {component}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[190px] max-h-[280px] w-full overflow-auto bg-neutral-950 p-4 text-[11px] font-mono text-neutral-200 dark:bg-black scrollbar-thin"
            >
              <button
                onClick={handleCopyCode}
                className="sticky top-0 right-0 float-right z-10 flex items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[10px] font-medium text-neutral-200 hover:bg-neutral-700 shadow-md"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>
              <pre className="pr-16 leading-relaxed whitespace-pre-wrap">
                <code>{codeSnippet}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compact Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
        <p className="truncate max-w-[70%]">{description}</p>
        <span className="font-mono text-[9px] text-neutral-400">CLI: nawfal-ui</span>
      </div>
    </div>
  );
}
