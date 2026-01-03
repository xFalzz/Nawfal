"use client";

import { useEffect, useState } from "react";
import { Cloud, Loader2, MapPin } from "lucide-react";

export function StatusWidget() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initial time set
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Jakarta", // GMT+7
        }) + " GMT+7"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Weather Fetch (Yogyakarta)
    // Latitude: -7.7956, Longitude: 110.3695
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-7.7956&longitude=110.3695&current=temperature_2m&timezone=auto"
        );
        const data = await res.json();
        setTemperature(Math.round(data.current.temperature_2m));
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };
    fetchWeather();

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1 text-[10px] font-medium leading-none text-muted-foreground sm:flex-row sm:gap-4 sm:text-xs">
      <div className="flex items-center gap-1.5 uppercase transition-colors hover:text-foreground">
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </div>
        <span>{time}</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-border sm:block" />
      <div className="flex items-center gap-1.5 uppercase transition-colors hover:text-foreground">
        <MapPin className="h-3 w-3" />
        <span>YOGYAKARTA, INDONESIA</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-border sm:block" />
       <div className="flex items-center gap-1.5 uppercase transition-colors hover:text-foreground">
        <Cloud className="h-3 w-3" />
        <span>{temperature !== null ? `${temperature}°C` : "--°C"}</span>
      </div>
    </div>
  );
}
