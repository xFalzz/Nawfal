"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import ShinyButton from "./ui/ShinyButton";
import { ChevronRight } from "lucide-react";

const photos = [
  { id: 1, src: "/imgs/Photography/IMG_9417.jpg", alt: "Children playing ball in the village" },
  { id: 2, src: "/imgs/Photography/Kampungku 2.jpg", alt: "Children playing ball in the village" },
  { id: 3, src: "/imgs/Photography/Kampungku.jpg", alt: "Children playing ball in the village" },
  { id: 4, src: "/imgs/Photography/Kampungku 2_1.jpg", alt: "Beautiful ornamental plants" },
  { id: 5, src: "/imgs/Photography/Tetangga111.jpg", alt: "My neighbor's roof" },
  { id: 6, src: "/imgs/Photography/anjay.png", alt: "Beautiful sunset" },
  { id: 7, src: "/imgs/Photography/2121.jpg", alt: "Sailing boat on the beach" },
];

const PhotographyPortfolio = () => {
  const disableRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -75 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mt-16"
      id="photography"
      onContextMenu={disableRightClick} // Disable right-click
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200">
          My Photographs
        </h2>

        {/* Shiny Button under title on small devices */}
        <div className="sm:ml-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
          <ShinyButton icon={<ChevronRight />} className="ml-0 sm:ml-auto">
            <Link href="https://www.instagram.com/nawfaljr__" target="_blank">
              All Photos
            </Link>
          </ShinyButton>
        </div>
      </div>

      {/* Photos Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="relative group overflow-hidden rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              layout="responsive"
              width={280}
              height={340}
              className="transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none"
              draggable={false} // Disable drag-and-drop
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <p className="text-white text-lg font-medium">{photo.alt}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PhotographyPortfolio;
