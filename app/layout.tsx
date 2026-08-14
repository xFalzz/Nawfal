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
    default: "Nawfal Irfan Ramadhan — Fullstack Software Engineer & AI Systems Architect",
    template: "%s | Nawfal Irfan Ramadhan"
  },
  description:
    "Official portfolio and ecosystem of Nawfal Irfan Ramadhan (xFalzz). Fullstack Software Engineer, AI Systems Architect, and Creator of Nawfal UI Kit. Explore production-grade web applications, 48+ verified certifications, and UI architecture.",
  keywords: [
    "Nawfal",
    "Nawfal Irfan Ramadhan",
    "Nawfal Irfan",
    "Nawfal Ramadhan",
    "xFalzz",
    "Fullstack Developer",
    "Fullstack Software Engineer",
    "Fullstack Engineer Indonesia",
    "Software Engineer Yogyakarta",
    "AI Systems Architect",
    "Nawfal UI Kit",
    "nawfal-ui",
    "nawfal.vercel.app",
    "Informatika Universitas Bina Sarana Informatika",
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Python AI",
    "UI/UX Designer"
  ],
  authors: [{ name: "Nawfal Irfan Ramadhan", url: "https://nawfal.vercel.app" }],
  creator: "Nawfal Irfan Ramadhan",
  publisher: "Nawfal Irfan Ramadhan",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google8cbfb42f0970a6b2",
  },
  openGraph: {
    type: "profile",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://nawfal.vercel.app",
    title: "Nawfal Irfan Ramadhan — Fullstack Software Engineer & AI Systems Architect",
    description: "Official portfolio of Nawfal Irfan Ramadhan (xFalzz). Fullstack Software Engineer, AI Systems Architect, and Creator of Nawfal UI Kit.",
    siteName: "Nawfal Irfan Ramadhan Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nawfal Irfan Ramadhan — Fullstack Software Engineer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawfal Irfan Ramadhan — Fullstack Software Engineer",
    description: "Fullstack Software Engineer & AI Systems Architect crafting intuitive, deterministic, and highly functional web applications.",
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
      givenName: "Nawfal Irfan",
      familyName: "Ramadhan",
      alternateName: ["Nawfal", "Nawfal Irfan", "xFalzz"],
      jobTitle: "Fullstack Software Engineer & AI Systems Architect",
      worksFor: {
        "@type": "Organization",
        name: "Freelance & Independent Open Source Developer"
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universitas Bina Sarana Informatika"
      },
      url: "https://nawfal.vercel.app",
      image: "https://nawfal.vercel.app/images/falz.jpg",
      gender: "Male",
      nationality: "Indonesian",
      knowsAbout: [
        "Fullstack Software Engineering",
        "Artificial Intelligence",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "Tailwind CSS",
        "UI/UX Design Systems"
      ],
      sameAs: [
        "https://github.com/xFalzz",
        "https://www.linkedin.com/in/nawfal-irfan",
        "https://www.instagram.com/nawfaljr__",
        "https://www.npmjs.com/package/nawfal-ui"
      ],
      description: "Nawfal Irfan Ramadhan is a Fullstack Software Engineer, AI Enthusiast, and Information Systems student at Universitas Bina Sarana Informatika. Creator of Nawfal UI Kit."
    },
    {
      "@type": "WebSite",
      "@id": "https://nawfal.vercel.app/#website",
      url: "https://nawfal.vercel.app",
      name: "Nawfal Irfan Ramadhan — Official Portfolio & UI Kit Ecosystem",
      description: "Explore projects, certifications, interactive UI components, and software engineering articles by Nawfal Irfan Ramadhan.",
      publisher: {
        "@id": "https://nawfal.vercel.app/#person"
      },
      inLanguage: ["en-US", "id-ID"]
    },
    {
      "@type": "ProfilePage",
      "@id": "https://nawfal.vercel.app/#profilepage",
      url: "https://nawfal.vercel.app",
      name: "Nawfal Irfan Ramadhan Profile",
      mainEntity: {
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
