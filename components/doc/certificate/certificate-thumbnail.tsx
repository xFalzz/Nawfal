"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Award, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

interface CertificateThumbnailProps {
  file: string;
  name: string;
  category?: string;
  issuer?: string;
  color?: string;
}

function isImage(file: string) {
  return /\.(png|jpg|jpeg|webp|svg)$/i.test(file);
}

export default function CertificateThumbnail({
  file,
  name,
  category = "Certificate",
  issuer = "",
  color = "from-blue-500 to-indigo-600",
}: CertificateThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inView, setInView] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const image = isImage(file);

  // Lazy load when within 300px of viewport
  useEffect(() => {
    if (image) {
      setInView(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [image]);

  // Render PDF using PDF.js to canvas
  useEffect(() => {
    if (image || !inView || rendered || hasError) return;

    let isMounted = true;

    async function renderPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        // Use CDN worker for reliable cross-bundle compatibility
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "3.11.174"}/pdf.worker.min.js`;
        }

        const loadingTask = pdfjsLib.getDocument({
          url: file,
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "3.11.174"}/cmaps/`,
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (!isMounted) return;

        const page = await pdf.getPage(1);
        if (!isMounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const baseViewport = page.getViewport({ scale: 1 });
        // Target high-res width (400px width on 2x retina)
        const scale = 400 / baseViewport.width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (isMounted) {
          setRendered(true);
        }
      } catch (err) {
        console.warn(`PDF render fallback for ${file}:`, err);
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    renderPdf();

    return () => {
      isMounted = false;
    };
  }, [file, inView, image, rendered, hasError]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-t-md bg-muted/60"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* 1. Static Image Case (PNG/JPG badges) */}
      {image ? (
        <Image
          src={file}
          alt={name}
          fill
          className="object-contain p-2"
          loading="lazy"
          unoptimized
        />
      ) : (
        <>
          {/* 2. PDF Rendered Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              rendered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* 3. Fallback / Branded Certificate Card Placeholder (shown while loading or on fallback) */}
          {!rendered && (
            <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-br from-card via-card/90 to-muted/80 border-b border-border/40 select-none">
              {/* Card Header: Category & Seal */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  {category}
                </span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground/80">
                  <Award className="h-3 w-3" />
                </div>
              </div>

              {/* Card Center: Title & Issuer */}
              <div className="my-auto py-1">
                <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-foreground">
                  {name}
                </p>
                {issuer && (
                  <p className="mt-0.5 line-clamp-1 text-[9px] text-muted-foreground">
                    {issuer}
                  </p>
                )}
              </div>

              {/* Card Footer: Verified Badge */}
              <div className="flex items-center justify-between border-t border-border/40 pt-1 text-[8px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-mono text-emerald-500">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Verified Credential
                </span>
                <span className="font-mono opacity-60">PDF</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
