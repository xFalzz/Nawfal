"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Heart, Music, Disc } from "lucide-react";

// ─── 1. Spotify Mini Audio Player ──────────────────────────────────────────────
export function SpotifyMiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 overflow-hidden rounded bg-neutral-800 flex items-center justify-center shrink-0">
            <Music className="h-4 w-4 text-neutral-400" />
          </div>
          <div className="truncate">
            <h4 className="truncate text-xs font-semibold text-white">Midnight City</h4>
            <p className="truncate text-[9px] text-neutral-400">M83</p>
          </div>
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-white text-white" : ""}`} />
        </button>
      </div>

      {/* Progress Bar & Controls */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500">
          <span>1:24</span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
            className="relative h-1 w-full cursor-pointer overflow-hidden rounded-full bg-neutral-800 mx-1.5"
          >
            <div style={{ width: `${progress}%` }} className="h-full bg-white transition-all" />
          </div>
          <span>3:45</span>
        </div>

        <div className="flex items-center justify-center gap-3 pt-0.5">
          <button className="text-neutral-400 hover:text-white"><SkipBack className="h-3 w-3" /></button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
          </button>
          <button className="text-neutral-400 hover:text-white"><SkipForward className="h-3 w-3" /></button>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Spotify Track List Item ──────────────────────────────────────────────
export function SpotifyTrackListItem() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      onClick={() => setIsPlaying(!isPlaying)}
      className="group flex w-full max-w-[280px] cursor-pointer items-center justify-between rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs transition-colors hover:bg-neutral-900"
    >
      <div className="flex items-center gap-2.5 truncate">
        <span className="w-3 font-mono text-[9px] text-neutral-500 group-hover:hidden">01</span>
        <button className="hidden text-white group-hover:block shrink-0">
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
        <div className="truncate">
          <p className={`truncate text-xs font-semibold ${isPlaying ? "text-emerald-400" : "text-white"}`}>Starboy</p>
          <p className="truncate text-[9px] text-neutral-400">The Weeknd</p>
        </div>
      </div>
      <span className="font-mono text-[9px] text-neutral-500 shrink-0">3:50</span>
    </div>
  );
}

// ─── 3. Spotify Vinyl Record Player ───────────────────────────────────────────
export function SpotifyVinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex w-full max-w-[240px] flex-col items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-black p-3 text-white">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-950 shadow-inner"
        >
          <div className="h-4 w-4 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center">
            <Disc className="h-2.5 w-2.5 text-neutral-400" />
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 font-mono text-[9px] text-white hover:bg-neutral-800"
      >
        {isPlaying ? "Pause Vinyl" : "Play Vinyl Record"}
      </button>
    </div>
  );
}

// ─── 4. Spotify Album Artwork Card (COMPACT MINIMALIST VERSION) ─────────────
export function SpotifyAlbumCard() {
  return (
    <div className="group relative w-44 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-white transition-all hover:border-neutral-700 shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded bg-neutral-900 flex items-center justify-center">
        <Music className="h-6 w-6 text-neutral-600" />
        <button className="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-black shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <Play className="h-3 w-3 ml-0.5 fill-black text-black" />
        </button>
      </div>
      <div className="mt-2">
        <h4 className="truncate text-[11px] font-bold text-white leading-snug">Random Access Memories</h4>
        <p className="truncate text-[9px] text-neutral-400">Daft Punk • 2013</p>
      </div>
    </div>
  );
}
