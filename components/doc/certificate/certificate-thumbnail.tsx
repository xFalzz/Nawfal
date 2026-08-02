"use client";

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
  const image = isImage(file);

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-md bg-muted"
      style={{ aspectRatio: "1.414 / 1" }}
    >
      {/* Fallback icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        {image ? (
          <TbPhoto size={28} className="text-muted-foreground/25" />
        ) : (
          <TbFileTypePdf size={28} className="text-muted-foreground/25" />
        )}
      </div>

      {image ? (
        /* Native <img> for PNG/JPG badges */
        <Image
          src={file}
          alt={name}
          fill
          className="object-contain p-2"
          loading="lazy"
          unoptimized
        />
      ) : (
        /* Native iframe for PDFs — no scrollbar, no toolbar */
        <iframe
          src={`${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
          title={name}
          className="absolute inset-0 h-full w-full border-0 pointer-events-none select-none"
          loading="lazy"
          scrolling="no"
          style={{ overflow: "hidden" }}
        />
      )}
    </div>
  );
}
