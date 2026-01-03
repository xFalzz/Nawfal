"use client";

import { useState } from "react";
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
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroPage onComplete={() => setShowIntro(false)} />}
      <div className={`${showIntro ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
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
