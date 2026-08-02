"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Home,
  MessageSquare,
  FolderGit2,
  Award,
  Terminal,
  Sparkles,
  Search,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Assets
import DizzyAvatar from "@/public/images/avatar-dizzy.png";

export default function NotFound() {
  const pathname = usePathname();
  const currentPath = pathname || "/404";
  const quickLinks = [
    {
      title: "Home",
      desc: "Kembali ke halaman utama",
      icon: Home,
      href: "/",
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Projects",
      desc: "Lihat karya & aplikasi Nawfal",
      icon: FolderGit2,
      href: "/projects",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Certificates",
      desc: "48+ lisensi & sertifikasi",
      icon: Award,
      href: "/certificate",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "AI Assistant",
      desc: "Tanyakan apapun ke AI Assistant",
      icon: MessageSquare,
      href: "/chat",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center pad-x py-10 md:py-16 min-h-[80vh] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 via-sky-500/10 to-purple-500/15 rounded-full blur-3xl pointer-events-none -z-10 opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl flex flex-col items-center text-center space-y-8"
      >
        {/* Top Floating Badge & Avatar */}
        <div className="relative flex flex-col items-center">
          {/* Glowing Aura Behind Avatar */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-sky-400/20 to-purple-500/30 blur-xl"
            />
            <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full border border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-md p-3 shadow-2xl flex items-center justify-center ring-1 ring-primary/20">
              <Image
                src={DizzyAvatar}
                alt="404 Dizzy Avatar"
                className="w-full h-full object-contain drop-shadow-md"
                priority
              />
            </div>
          </div>

          {/* 404 Large Tag */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 inline-flex items-center gap-x-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-md text-xs font-mono text-muted-foreground shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span className="font-bold text-foreground">ERROR 404</span>
            <span className="text-border">|</span>
            <span>PAGE_NOT_FOUND</span>
          </motion.div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-3 max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground">
            Waduh! Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Halaman yang kamu cari mungkin telah dipindahkan, diubah namanya, atau belum dibuat. Tenang, kamu bisa kembali ke jalan yang benar!
          </p>
        </div>

        {/* Developer Console / Terminal Mini Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-md rounded-2xl border border-border/60 bg-black/80 dark:bg-card/40 backdrop-blur-md p-4 text-left font-mono text-xs shadow-xl ring-1 ring-white/5 space-y-1.5"
        >
          <div className="flex items-center gap-x-1.5 pb-2 border-b border-border/40 text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-semibold text-foreground/80">
              system_diagnostics.log
            </span>
          </div>
          <div className="text-emerald-400 font-medium" suppressHydrationWarning>
            &gt; GET {currentPath} HTTP/1.1
          </div>
          <div className="text-amber-400">
            &gt; Status: 404 Not Found (Resource lost in cyberspace)
          </div>
          <div className="text-sky-400">
            &gt; Action: Redirecting navigation to recommended routes...
          </div>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Button
            asChild
            size="lg"
            className="rounded-xl h-11 px-6 gap-x-2 font-medium shadow-lg shadow-primary/20 transition-all hover:scale-105"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl h-11 px-6 gap-x-2 font-medium backdrop-blur-md hover:bg-muted/80 transition-all hover:scale-105"
          >
            <Link href="/chat">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Tanya AI Assistant</span>
            </Link>
          </Button>
        </motion.div>

        {/* Quick Navigation Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full pt-6 space-y-3"
        >
          <div className="flex items-center justify-center gap-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <Compass className="h-3.5 w-3.5" />
            <span>Destinasi Populer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full text-left">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-4 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-md hover:bg-card hover:border-primary/40 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-xl border ${item.color} transition-transform group-hover:scale-110`}
                  >
                    <item.icon className="h-4 w-4" />
                  </div>
                  <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all rotate-180" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
