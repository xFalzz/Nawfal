"use client";

import { useState } from "react";
import { TbFileTypePdf } from "react-icons/tb";

interface CertificateThumbnailProps {
  file: string;
  name: string;
}

export default function CertificateThumbnail({ file, name }: CertificateThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-md bg-muted"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted animate-pulse">
          <TbFileTypePdf size={24} className="text-muted-foreground/30" />
        </div>
      )}

      {/* Native browser PDF iframe — no external lib needed */}
      <iframe
        src={`${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        title={name}
        onLoad={() => setIsLoaded(true)}
        className="absolute inset-0 h-full w-full border-0 pointer-events-none select-none"
        loading="lazy"
      />
    </div>
  );
}
