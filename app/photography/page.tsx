import type { Metadata } from "next";
import { HorizontalGallery } from "@/components/photography/gallery";

export const metadata: Metadata = {
  title: "Photography",
  description: "Browse through Nawfal's photography collection. A visual journey capturing moments and perspectives.",
  openGraph: {
    title: "Photography - Nawfal",
    description: "Browse through my photography collection. A visual journey capturing moments and perspectives.",
  },
};

export default function PhotographyPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <HorizontalGallery />
    </main>
  );
}
