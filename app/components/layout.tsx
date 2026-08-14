import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nawfal UI Kit — Enterprise Monochromatic React & Multi-Framework UI Library",
  description:
    "Official component ecosystem built by Nawfal Irfan Ramadhan. 56+ production-ready, source-owned components for Next.js 15, React 19, Vue 3, and HTML5. Built with Framer Motion spring physics and strict monochromatic design tokens.",
  keywords: [
    "Nawfal UI Kit",
    "Nawfal UI",
    "nawfal-ui",
    "Nawfal Irfan Ramadhan UI Kit",
    "Monochromatic UI Library",
    "React UI Kit Indonesia",
    "Next.js 15 Components",
    "Framer Motion Components",
    "Shadcn Alternative"
  ],
  alternates: {
    canonical: "/components",
  },
  openGraph: {
    title: "Nawfal UI Kit — Enterprise Monochromatic React & Multi-Framework UI Library",
    description:
      "56+ production-ready, source-owned enterprise components for Next.js 15, React 19, Vue 3, and HTML5. Crafted with strict monochromatic precision by Nawfal Irfan Ramadhan.",
    url: "https://nawfal.vercel.app/components",
    type: "website",
  },
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
