import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

// Fonts
import { GeistSans } from "geist/font/sans";

// Assets
import "./globals.css";

// Pages
import NotFound from "./not-found";

// Components
import ClientLayout from "./client-layout";
import Navbar from "@/components/navbar/nav-bar";
import Footer from "@/components/footer/foo-bar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL('https://nawfal.site'),
  title: {
    default: "Nawfal - Frontend Web Developer",
    template: "%s | Nawfal"
  },
  description:
    "This is Nawfal's (me!) personal website. I write about tech, programming, and other things I find interesting. I also share my projects and experiences.",
  keywords: ["Nawfal", "Frontend Developer", "UI/UX Designer", "Web Developer", "Portfolio", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Nawfal Irfan", url: "https://nawfal.site" }],
  creator: "Nawfal Irfan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nawfal.site",
    title: "Nawfal - Frontend Web Developer",
    description: "Frontend Developer & UI/UX Designer creating intuitive, visually stunning and highly functional web experiences.",
    siteName: "Nawfal Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nawfal - Frontend Web Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawfal - Frontend Web Developer",
    description: "Frontend Developer & UI/UX Designer creating intuitive, visually stunning and highly functional web experiences.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={GeistSans.className}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
