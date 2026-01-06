"use client";

import Image from "next/image";

const images = [
  "/images/Photography/2121.jpg",
  "/images/Photography/IMG_9417.jpg",
  "/images/Photography/Kampungku 2.jpg",
  "/images/Photography/Kampungku 2_1.jpg",
  "/images/Photography/Kampungku.jpg",
  "/images/Photography/Tetangga.jpg",
  "/images/Photography/Tetangga111.jpg",
  "/images/Photography/anjay.png",
];

export function HorizontalGallery() {
  return (
    <section className="pad-x w-full py-12 md:py-16 lg:py-24">
      <div className="mb-8 flex items-center justify-between md:mb-12">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          My Photographs
        </h2>
        <a
          href="https://www.instagram.com/nawfaljr__"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:text-base"
        >
          All Photos
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {images.map((src, index) => (
          <div
            key={index}
            className="group relative select-none overflow-hidden rounded-lg bg-muted transition-transform hover:scale-[1.02]"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src={src}
              alt={`Photography ${index + 1}`}
              width={1200}
              height={800}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
