"use client";

import { useState } from "react";
import Link from "next/link";
import { TbFileTypePdf, TbX, TbExternalLink, TbDownload, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import CertificateThumbnail from "./certificate-thumbnail";

type Certificate = {
  name: string;
  issuer: string;
  file: string;
  category: string;
  color: string;
};

interface CertificateGridProps {
  certificates: Certificate[];
  categories: string[];
  categoryColors: Record<string, string>;
}

export default function CertificateGrid({
  certificates,
  categories,
  categoryColors,
}: CertificateGridProps) {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // All certs flat list for prev/next navigation
  const allCerts = certificates;

  function openModal(cert: Certificate) {
    const idx = allCerts.findIndex((c) => c.file === cert.file);
    setSelected(cert);
    setSelectedIndex(idx);
  }

  function closeModal() {
    setSelected(null);
  }

  function goNext() {
    const next = (selectedIndex + 1) % allCerts.length;
    setSelected(allCerts[next]);
    setSelectedIndex(next);
  }

  function goPrev() {
    const prev = (selectedIndex - 1 + allCerts.length) % allCerts.length;
    setSelected(allCerts[prev]);
    setSelectedIndex(prev);
  }

  return (
    <>
      {/* Certificate Grid by Category */}
      {categories.slice(1).map((cat) => {
        const filtered = certificates.filter((c) => c.category === cat);
        if (filtered.length === 0) return null;
        return (
          <div key={cat} className="mb-12">
            <div className="mb-4 flex items-center gap-x-3">
              <div
                className={`h-3 w-3 rounded-full bg-gradient-to-r ${categoryColors[cat]}`}
              />
              <h2 className="text-lg font-semibold">{cat}</h2>
              <span className="text-sm text-muted-foreground">
                ({filtered.length})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((cert, i) => (
                <button
                  key={i}
                  onClick={() => openModal(cert)}
                  className="group flex flex-col overflow-hidden rounded-lg border bg-popover transition-all duration-200 hover:border-foreground/30 hover:shadow-md text-left"
                >
                  {/* PDF Thumbnail */}
                  <CertificateThumbnail file={cert.file} name={cert.name} />

                  {/* Card Info */}
                  <div className="flex items-start gap-x-2 p-3">
                    <div
                      className={`mt-0.5 h-6 w-0.5 flex-none rounded-full bg-gradient-to-b ${cert.color}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-medium text-foreground leading-snug">
                        {cert.name}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {cert.issuer}
                      </p>
                    </div>
                    <TbFileTypePdf
                      size={14}
                      className="mt-0.5 flex-none text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal Viewer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative z-10 flex w-full max-w-4xl flex-col rounded-xl border bg-popover shadow-2xl overflow-hidden"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-x-3 border-b bg-popover px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {selected.name}
                </p>
                <p className="text-xs text-muted-foreground">{selected.issuer}</p>
              </div>

              <div className="flex items-center gap-x-1">
                {/* Download */}
                <a
                  href={selected.file}
                  download
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  title="Download PDF"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TbDownload size={16} />
                </a>
                {/* Open in new tab */}
                <Link
                  href={selected.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  title="Open in new tab"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TbExternalLink size={16} />
                </Link>
                {/* Close */}
                <button
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  title="Close"
                >
                  <TbX size={16} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative flex-1 bg-muted" style={{ minHeight: "60vh" }}>
              <iframe
                key={selected.file}
                src={`${selected.file}#toolbar=0&navpanes=0&view=FitH`}
                title={selected.name}
                className="h-full w-full border-0"
                style={{ minHeight: "60vh" }}
                scrolling="auto"
              />
            </div>

            {/* Modal Footer — Prev / Counter / Next */}
            <div className="flex items-center justify-between border-t bg-popover px-4 py-2">
              <button
                onClick={goPrev}
                className="flex items-center gap-x-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <TbChevronLeft size={14} /> Prev
              </button>

              <span className="text-xs text-muted-foreground">
                {selectedIndex + 1} / {allCerts.length}
              </span>

              <button
                onClick={goNext}
                className="flex items-center gap-x-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                Next <TbChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
