"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { TbFileTypePdf, TbPhoto } from "react-icons/tb";

interface CertificateThumbnailProps {
  file: string;
  name: string;
}

function isImage(file: string) {
  return /\.(png|jpg|jpeg|webp|svg)$/i.test(file);
}

export default function CertificateThumbnail({ file, name }: CertificateThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const image = isImage(file);

  // Load iframe only when card enters viewport (+ 300px margin ahead)
  useEffect(() => {
    // Images use native lazy loading — no observer needed
    if (image) {
      setShouldLoad(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" } // Pre-load 300px before it enters view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [image]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-t-md bg-muted"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* Placeholder shown while not yet in viewport */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        {image ? (
          <TbPhoto size={24} className="text-muted-foreground/20" />
        ) : (
          <TbFileTypePdf size={24} className="text-muted-foreground/20" />
        )}
      </div>

      {shouldLoad && (
        image ? (
          /* PNG / JPG badge — fast, served as static asset */
          <Image
            src={file}
            alt={name}
            fill
            className="object-contain p-2"
            loading="lazy"
            unoptimized
          />
        ) : (
          /* PDF iframe — only mounted when card enters viewport */
          <iframe
            src={`${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
            title={name}
            className="absolute inset-0 h-full w-full border-0 pointer-events-none select-none"
            scrolling="no"
            style={{ overflow: "hidden" }}
          />
        )
      )}
    </div>
  );
}
