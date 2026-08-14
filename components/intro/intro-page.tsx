"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface IntroPageProps {
  onComplete: () => void;
}

export default function IntroPage({ onComplete }: IntroPageProps) {
  const [shouldShowIntro, setShouldShowIntro] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0); // 0: loading, 1: logo reveal, 2: text reveal, 3: complete
  const [isExiting, setIsExiting] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [userTimeZone, setUserTimeZone] = useState("");

  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // No longer needed to check skipping here as it's handled in ClientLayout
  useEffect(() => {
    setShouldShowIntro(true);
  }, []);

  // Get user's timezone and location
  useEffect(() => {
    if (!shouldShowIntro) return;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimeZone(timeZone);

    // Update time every second
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timeZone,
        })
      );
      setCurrentDate(
        now
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: timeZone,
          })
          .toUpperCase()
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, [shouldShowIntro]);

  // Get timezone abbreviation
  const getTimeZoneAbbr = (timeZone: string) => {
    const timeZoneMap: { [key: string]: string } = {
      "Asia/Jakarta": "WIB",
      "Asia/Makassar": "WITA",
      "Asia/Jayapura": "WIT",
      "America/New_York": "EST",
      "America/Los_Angeles": "PST",
      "Europe/London": "GMT",
      "Europe/Paris": "CET",
      "Asia/Tokyo": "JST",
      "Asia/Shanghai": "CST",
      "Australia/Sydney": "AEST",
      "Asia/Singapore": "SGT",
      "Asia/Bangkok": "ICT",
      "Asia/Manila": "PHT",
      "Asia/Kuala_Lumpur": "MYT",
      "Europe/Berlin": "CET",
      "America/Chicago": "CST",
      "America/Denver": "MST",
      "Asia/Dubai": "GST",
      "Asia/Kolkata": "IST",
      "Europe/Moscow": "MSK",
    };
    return timeZoneMap[timeZone] || timeZone.split("/")[1]?.replace("_", " ") || "LOCAL";
  };

  // Get country flag based on timezone
  const getCountryFlag = (timeZone: string) => {
    const flagMap: { [key: string]: string } = {
      "Asia/Jakarta": "🇮🇩",
      "Asia/Makassar": "🇮🇩",
      "Asia/Jayapura": "🇮🇩",
      "America/New_York": "🇺🇸",
      "America/Los_Angeles": "🇺🇸",
      "America/Chicago": "🇺🇸",
      "America/Denver": "🇺🇸",
      "Europe/London": "🇬🇧",
      "Europe/Paris": "🇫🇷",
      "Asia/Tokyo": "🇯🇵",
      "Asia/Shanghai": "🇨🇳",
      "Australia/Sydney": "🇦🇺",
      "Asia/Singapore": "🇸🇬",
      "Asia/Bangkok": "🇹🇭",
      "Asia/Manila": "🇵🇭",
      "Asia/Kuala_Lumpur": "🇲🇾",
      "Europe/Berlin": "🇩🇪",
      "Asia/Dubai": "🇦🇪",
      "Asia/Kolkata": "🇮🇳",
      "Europe/Moscow": "🇷🇺",
    };
    return flagMap[timeZone] || "🌍";
  };

  // Simulate loading progress
  useEffect(() => {
    if (!shouldShowIntro) return;

    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setCurrentPhase(1), 300); // Start logo reveal faster
          return 100;
        }
        // Realistic but faster loading progression
        const increment = Math.random() * 8 + 4;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(timer);
  }, [shouldShowIntro]);

  // Phase progression
  useEffect(() => {
    if (!shouldShowIntro) return;

    if (currentPhase === 1) {
      setTimeout(() => setCurrentPhase(2), 600); // Text reveal after logo
    } else if (currentPhase === 2) {
      setTimeout(() => setCurrentPhase(3), 800); // Complete after text
    } else if (currentPhase === 3) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onComplete(), 800);
      }, 1000); // Hold complete state then exit faster
    }
  }, [currentPhase, onComplete, shouldShowIntro]);

  // Keyboard/touch handlers for skip
  useEffect(() => {
    if (!shouldShowIntro) return;

    const handleImmediateSkip = () => {
      setIsExiting(true);
      setTimeout(() => onComplete(), 150);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        e.preventDefault();
        handleImmediateSkip();
        return;
      }
      if ([32, 13].includes(e.keyCode)) {
        // Space, Enter
        e.preventDefault();
        handleImmediateSkip();
      }
    };

    const handleClick = () => handleImmediateSkip();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [currentPhase, onComplete, shouldShowIntro]);

  // Don't render anything if intro shouldn't be shown
  if (!shouldShowIntro) {
    return null;
  }

  return (
    <div
      ref={introRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-all duration-700 ${
        isExiting ? "scale-105 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      {/* Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Loading Phase */}
      <div
        className={`transition-all duration-800 ${currentPhase >= 1 ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        {/* Progress Counter */}
        <div ref={counterRef} className="mb-8 text-center sm:mb-12">
          <div className="text-6xl font-light tabular-nums tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            {String(Math.floor(loadingProgress)).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs tracking-[0.2em] text-gray-400 sm:text-sm">LOADING</div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-px w-48 bg-gray-800 sm:w-56 md:w-64">
          <div
            ref={progressBarRef}
            className="h-full bg-white transition-all duration-200 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>

      {/* Logo Reveal Phase */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
          currentPhase === 1
            ? "scale-100 opacity-100"
            : currentPhase < 1
              ? "scale-95 opacity-0"
              : "scale-105 opacity-0"
        }`}
      >
        <div ref={logoRef} className="text-center">
          <div className="mb-6 sm:mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24">
              {/* Logo */}
              <Image
                src="/images/NewIcon.png"
                alt="Nawfal Logo"
                width={80}
                height={80}
                className="animate-logo-glow object-contain drop-shadow-lg"
                style={{ filter: "drop-shadow(0 0 16px #7f9cf5)" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Reveal Phase */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${
          currentPhase >= 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="max-w-xs px-4 text-center sm:max-w-md sm:px-6 md:max-w-lg md:px-8 lg:max-w-2xl">
          <h1
            ref={textRef}
            className="mb-4 text-3xl font-light tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="inline-block overflow-hidden">
              <span
                className={`inline-block transition-all duration-1000 ${
                  currentPhase >= 2 ? "translate-y-0" : "translate-y-full"
                }`}
              >
                Nawfal Irfan Ramadhan
              </span>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className={`text-base font-light tracking-wide text-gray-400 transition-all delay-300 duration-1000 sm:text-lg md:text-xl ${
              currentPhase >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Fullstack Developer • AI Enthusiast
          </p>
        </div>
      </div>

      {/* Skip indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transform transition-all duration-500 sm:bottom-8 ${
          currentPhase < 3 ? "opacity-60" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-500 sm:gap-3">
          <span className="hidden sm:inline">CLICK OR PRESS SPACE TO SKIP</span>
          <span className="sm:hidden">TAP TO SKIP</span>
          <div className="h-1 w-1 animate-pulse rounded-full bg-gray-500" />
        </div>
      </div>

      {/* Info bar */}
      <div className="absolute left-4 right-4 top-4 z-20 flex items-start justify-between sm:left-6 sm:right-6 sm:top-6 md:left-8 md:right-8 md:top-8">
        <div className="text-xs font-light tracking-[0.2em] text-gray-400">
          <div>NAWFAL</div>
          <div className="mt-1 hidden sm:block">PORTFOLIO</div>
        </div>
        <div className="text-right text-xs font-light tracking-[0.2em] text-gray-400">
          <div className="flex items-center gap-1">
            <span>{currentTime}</span>
            <span className="hidden sm:inline">{getTimeZoneAbbr(userTimeZone)}</span>
            <span>{getCountryFlag(userTimeZone)}</span>
          </div>
          <div className="mt-1">{currentDate}</div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes logo-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))
              drop-shadow(0 0 40px rgba(99, 102, 241, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))
              drop-shadow(0 0 60px rgba(99, 102, 241, 0.5));
          }
        }

        .animate-logo-glow {
          animation: logo-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
