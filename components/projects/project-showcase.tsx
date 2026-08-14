"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Cloud, Code2, Layers, Cpu, Briefcase } from "lucide-react";
import TemplateCard from "@/components/macro/template-card";
import { StaticImageData } from "next/image";

export interface ProjectItem {
  name: string;
  url: string;
  image: StaticImageData | string;
  type: string;
  stack: string[];
  price: string;
  category: string;
}

interface ProjectShowcaseProps {
  projects: ProjectItem[];
}

const CATEGORIES = [
  { id: "All", label: "All Projects", icon: Layers },
  { id: "AI & Cloud", label: "AI & Cloud", icon: Cloud },
  { id: "Web Application", label: "Web Apps", icon: Code2 },
  { id: "AI & 3D Graphics", label: "3D & Vision", icon: Cpu },
  { id: "Client Project", label: "Client Work", icon: Briefcase },
];

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (activeCategory === "AI & 3D Graphics" &&
          (project.category.includes("3D") || project.category.includes("Automation")));

      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="flex w-full flex-col gap-y-6">
      {/* Filter & Search Bar Controls */}
      <div className="pad-x flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/60 bg-popover/50 p-1.5 backdrop-blur-md">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input & Counter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stack, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-popover/60 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-muted-foreground shrink-0">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="pad-x">
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:grid-cols-3 xl:gap-8 min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <TemplateCard {...project} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-3">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">No projects found</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                  No projects matched your filter criteria &quot;{searchQuery || activeCategory}&quot;. Try resetting the search or category filter.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 rounded-md border border-border bg-popover px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
