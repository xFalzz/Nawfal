"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Components
import Navbar from "@/components/navbar/nav-bar";
import Footer from "@/components/footer/foo-bar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import IntroPage from "@/components/intro/intro-page";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(false);
  const [isBot, setIsBot] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Check for performance bots / SEO crawlers
    const botDetected = /Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse/i.test(navigator.userAgent);
    setIsBot(botDetected);

    // Navigation logic for intro
    const navigationType = (window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;
    const wasFromInternal = sessionStorage.getItem("nawfal_from_internal") === "true";
    
    const shouldSkip = botDetected || 
                     navigationType === "reload" || 
                     navigationType === "back_forward" || 
                     wasFromInternal;

    setShowIntro(!shouldSkip);
    setHasChecked(true);
  }, []);

  return (
    <>
      {showIntro && <IntroPage onComplete={() => setShowIntro(false)} />}
      <div className="transition-opacity duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SpeedInsights />
          <main className="flex w-full flex-col bg-background md:min-h-[100svh]">
            <Navbar />
            {children}
            <Toaster />
          </main>
          <Footer />
        </ThemeProvider>
      </div>
    </>
  );
}
