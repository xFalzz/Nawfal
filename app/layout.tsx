import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

// Fonts
import { GeistSans } from "geist/font/sans";

// Assets
import "./globals.css";

// Components
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  metadataBase: new URL('https://nawfal.vercel.app'),
  title: {
    default: "Nawfal | Fullstack Developer & UI/UX Designer",
    template: "%s | Nawfal"
  },
  description:
    "This is Nawfal's (me!) personal website & UI Kit ecosystem. Fullstack Software Engineer and UI/UX Designer crafting intuitive, highly functional digital products.",
  keywords: ["Nawfal", "Nawfal Irfan", "xFalzz", "Fullstack Developer", "Software Engineer", "UI/UX Designer", "Nawfal UI Kit", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Nawfal Irfan Ramadhan", url: "https://nawfal.vercel.app" }],
  creator: "Nawfal Irfan Ramadhan",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google8cbfb42f0970a6b2",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nawfal.vercel.app",
    title: "Nawfal | Fullstack Developer & UI/UX Designer",
    description: "Fullstack Developer & AI Enthusiast creating intuitive, visually stunning and highly functional web experiences.",
    siteName: "Nawfal Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nawfal | Fullstack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawfal | Fullstack Developer & UI/UX Designer",
    description: "Fullstack Developer & AI Enthusiast creating intuitive, visually stunning and highly functional web experiences.",
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

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nawfal.vercel.app/#person",
      name: "Nawfal Irfan Ramadhan",
      alternateName: ["Nawfal", "xFalzz", "xFalzs"],
      jobTitle: "Fullstack Software Engineer & UI/UX Designer",
      url: "https://nawfal.vercel.app",
      image: "https://nawfal.vercel.app/images/sinopsisp.jpg",
      sameAs: [
        "https://github.com/xFalzz",
        "https://linkedin.com/in/nawfalirfan",
        "https://instagram.com/nawfalirfann",
        "https://twitter.com/xFalzz"
      ],
      description: "Software Engineer and Information Systems student focused on Web Development, AI-driven applications, and scalable systems."
    },
    {
      "@type": "WebSite",
      "@id": "https://nawfal.vercel.app/#website",
      url: "https://nawfal.vercel.app",
      name: "Nawfal Portfolio & UI Kit Ecosystem",
      publisher: {
        "@id": "https://nawfal.vercel.app/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={GeistSans.className}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
