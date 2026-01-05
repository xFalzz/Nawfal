import type { Metadata } from "next";
import { HorizontalGallery } from "@/components/photography/gallery";

export const metadata: Metadata = {
  title: "Photography",
  description: "Browse through Nawfal's photography collection. A visual journey capturing moments and perspectives.",
  alternates: {
    canonical: "/photography",
  },
  openGraph: {
    title: "Photography | Nawfal Irfan Ramadhan",
    description: "Browse through my photography collection. A visual journey capturing moments and perspectives.",
    url: "https://nawfal.site/photography",
  },
};

export default function PhotographyPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <HorizontalGallery />
    </main>
  );
}
