import ProfileHeader from "@/components/macro/profile-header";
import Chat from "@/components/doc/chat/chat";
import SubLinks from "@/components/macro/sub-links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Room & AI Assistant | Nawfal Irfan Ramadhan",
  description:
    "Experience Nawfal's real-time chat room and intelligent AI Assistant. A premium digital space to connect, explore projects, and discuss software engineering with Nawfal Irfan Ramadhan.",
  keywords: [
    "Nawfal Irfan Ramadhan",
    "Chat Room",
    "AI Assistant",
    "Nawfal Assistant",
    "Frontend Portfolio",
    "Real-time Chat",
    "Software Engineer",
  ],
  alternates: {
    canonical: "https://nawfal.vercel.app/chat",
  },
  openGraph: {
    title: "Chat Room & AI Assistant | Nawfal Irfan Ramadhan",
    description:
      "Join the conversation and connect with Nawfal Irfan Ramadhan's digital assistant in real-time.",
    url: "https://nawfal.vercel.app/chat",
    siteName: "Nawfal Irfan Ramadhan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/sinopsisp.jpg",
        width: 800,
        height: 800,
        alt: "Nawfal Irfan Ramadhan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat Room & AI Assistant | Nawfal Irfan Ramadhan",
    description:
      "Connect with Nawfal Irfan Ramadhan's community and AI Assistant in real-time.",
    images: ["/images/sinopsisp.jpg"],
  },
};

export default function ChatPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Chat Room & AI Assistant",
      description:
        "Nawfal Irfan Ramadhan's personal real-time chat room and AI Assistant application.",
      publisher: {
        "@type": "Person",
        name: "Nawfal Irfan Ramadhan",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://nawfal.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Chat",
          item: "https://nawfal.vercel.app/chat",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Nawfal Assistant",
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      description:
        "An intelligent digital assistant providing accurate insights into Nawfal Irfan Ramadhan's professional portfolio, certifications, and skills.",
      author: {
        "@type": "Person",
        name: "Nawfal Irfan Ramadhan",
      },
    },
  ];

  return (
    <section className="flex h-full w-full flex-col pt-4 md:grow md:pt-8 lg:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileHeader />

      <div className="pad-x mb-6">
        <h1 className="text-balance text-left text-3xl font-semibold leading-[1.1] tracking-tight xs:text-4xl md:w-[60%] lg:text-5xl">
          Chat Room &amp; AI
        </h1>
        <p className="mt-3 text-muted-foreground text-base max-w-lg">
          Connect with the community in real-time or ask Nawfal&apos;s AI Assistant anything about his latest projects, certifications, and skills.
        </p>
      </div>

      <SubLinks />

      <div className="pad-x py-6 md:py-8 w-full">
        <div className="w-full h-[700px] md:h-[800px] lg:h-[840px]">
          <Chat />
        </div>
      </div>
    </section>
  );
}
