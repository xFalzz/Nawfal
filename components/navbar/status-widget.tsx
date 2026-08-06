"use client";

import { useEffect, useState, useRef } from "react";
import { Cloud, Loader2, MapPin } from "lucide-react";

export function StatusWidget() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [temperature, setTemperature] = useState<number | null>(null);
  
  // Network Time Offset delta in milliseconds
  const timeOffsetRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);

    const updateTimeDisplay = () => {
      // Apply Network Offset delta if system clock differs from true network time
      const now = new Date(Date.now() + timeOffsetRef.current);
      const formatted = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
        hourCycle: "h23",
      }).format(now);
      setTime(`${formatted} WIB`);
    };

    // Initial render using local clock
    updateTimeDisplay();
    const timer = setInterval(updateTimeDisplay, 1000);

    // Fetch True Real-World Asia/Jakarta Network Time to calibrate offset
    const syncNetworkTime = async () => {
      try {
        const res = await fetch(
          "https://worldtimeapi.org/api/timezone/Asia/Jakarta",
          { cache: "no-store" }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.datetime) {
            const networkMs = new Date(data.datetime).getTime();
            const localMs = Date.now();
            timeOffsetRef.current = networkMs - localMs;
            updateTimeDisplay();
          }
        }
      } catch (err) {
        // Fallback: Attempt secondary time API if primary is blocked
        try {
          const fallbackRes = await fetch("https://timeapi.io/api/v1/time/current/zone?timeZone=Asia/Jakarta");
          if (fallbackRes.ok) {
            const data = await fallbackRes.json();
            if (data.dateTime) {
              const networkMs = new Date(data.dateTime).getTime();
              timeOffsetRef.current = networkMs - Date.now();
              updateTimeDisplay();
            }
          }
        } catch {
          // Silent fallback to local system time
        }
      }
    };

    // Fetch Weather (Yogyakarta)
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

    syncNetworkTime();
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
    <div className="flex items-center gap-2 text-[10px] font-medium leading-none text-muted-foreground sm:gap-4 sm:text-xs">
      <div className="flex items-center gap-1.5 uppercase transition-colors hover:text-foreground">
        <div className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </div>
        <span className="whitespace-nowrap">{time}</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-border sm:block" />
      <div className="hidden items-center gap-1.5 uppercase transition-colors hover:text-foreground sm:flex">
        <MapPin className="h-3 w-3 shrink-0" />
        <span className="whitespace-nowrap">YOGYAKARTA, INDONESIA</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-border sm:block" />
      <div className="flex items-center gap-1.5 uppercase transition-colors hover:text-foreground">
        <Cloud className="h-3 w-3 shrink-0" />
        <span>{temperature !== null ? `${temperature}°C` : "--°C"}</span>
      </div>
    </div>
  );
}
