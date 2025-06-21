"use client";

import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Jarak scroll dari atas
      const scrollHeight = document.body.scrollHeight - window.innerHeight; // Total panjang scrollable
      const progress = (scrollTop / scrollHeight) * 100; // Hitung persentase
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 bg-transparent z-50"
      aria-hidden="true"
    >
      <div
        className="h-full bg-blue-500 transition-[width] duration-150 ease-in-out"
        style={{
          width: `${scrollProgress}%`,
        }}
      />
    </div>
  );
};

export default ScrollIndicator;
