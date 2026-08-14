import type { Metadata } from "next";
import { HorizontalGallery } from "@/components/photography/gallery";

export const metadata: Metadata = {
  title: "Visual Photography & Perspectives — Nawfal Irfan Ramadhan",
  description:
    "Explore photography, visual perspectives, and creative media captures by Nawfal Irfan Ramadhan (@nawfaljr__).",
  keywords: [
    "Nawfal Irfan Ramadhan Photography",
    "Nawfal Photography",
    "nawfaljr__",
    "Visual Perspectives Nawfal"
  ],
  alternates: {
    canonical: "/photography",
  },
  openGraph: {
    title: "Visual Photography & Perspectives — Nawfal Irfan Ramadhan",
    description: "Visual media collection and photography gallery by Nawfal Irfan Ramadhan (@nawfaljr__).",
    url: "https://nawfal.vercel.app/photography",
  },
};

export default function PhotographyPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <HorizontalGallery />
    </main>
  );
}
