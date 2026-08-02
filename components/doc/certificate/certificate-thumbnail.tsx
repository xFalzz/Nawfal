"use client";

import { TbFileTypePdf } from "react-icons/tb";

interface CertificateThumbnailProps {
  file: string;
  name: string;
}

export default function CertificateThumbnail({ file, name }: CertificateThumbnailProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-t-md bg-muted"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* Fallback icon behind the iframe */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <TbFileTypePdf size={28} className="text-muted-foreground/25" />
      </div>

      {/* Native iframe — no scrollbar, no toolbar, pointer-events disabled */}
      <iframe
        src={`${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
        title={name}
        className="absolute inset-0 h-full w-full border-0 pointer-events-none select-none"
        loading="lazy"
        // Disable scrolling at the iframe level
        scrolling="no"
        style={{ overflow: "hidden" }}
      />
    </div>
  );
}
