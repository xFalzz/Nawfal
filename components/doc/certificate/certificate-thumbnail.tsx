"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the PDF.js worker from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CertificateThumbnailProps {
  file: string;
  name: string;
}

export default function CertificateThumbnail({ file, name }: CertificateThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-t-md bg-muted" style={{ aspectRatio: "1.414 / 1" }}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted gap-y-1">
          <svg
            className="h-8 w-8 text-muted-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <span className="text-[10px] text-muted-foreground/50">PDF</span>
        </div>
      )}

      {/* PDF Thumbnail */}
      {!hasError && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Document
            file={file}
            onLoadSuccess={() => setIsLoaded(true)}
            onLoadError={() => setHasError(true)}
            loading={null}
            error={null}
          >
            <Page
              pageNumber={1}
              width={300}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={() => setIsLoaded(true)}
              onRenderError={() => setHasError(true)}
              className="!w-full !h-full"
              canvasBackground="white"
            />
          </Document>
        </div>
      )}
    </div>
  );
}
