import ProfileHeader from "@/components/macro/profile-header";
import Chat from "@/components/doc/chat/chat";
import SubLinks from "@/components/macro/sub-links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Room & AI Assistant | Nawfal Irfan Ramadhan",
  description: "Experience Nawfal's real-time chat room and intelligent AI Assistant. A premium digital space to connect, explore projects, and discuss frontend development with Nawfal Irfan Ramadhan.",
  keywords: ["Nawfal Irfan Ramadhan", "Chat Room", "AI Assistant", "Nawfal Assistant", "Frontend Portfolio", "Real-time Chat", "Llama 3.3", "Developer Community"],
  alternates: {
    canonical: "https://nawfal.site/chat",
  },
  openGraph: {
    title: "Chat Room & AI Assistant | Nawfal Irfan Ramadhan",
    description: "Join the conversation and connect with Nawfal Irfan Ramadhan's digital extension in real-time.",
    url: "https://nawfal.site/chat",
    siteName: "Nawfal Irfan Ramadhan",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/images/Falzz.jpeg",
      width: 800,
      height: 800,
      alt: "Nawfal Irfan Ramadhan"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat Room & AI Assistant | Nawfal Irfan Ramadhan",
    description: "Connect with Nawfal Irfan Ramadhan's community and AI Assistant in real-time.",
    images: ["/images/Falzz.jpeg"],
  },
};

export default function ChatPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Chat Room & AI Assistant",
      "description": "Nawfal Irfan Ramadhan's personal real-time chat room and AI Assistant application.",
      "publisher": {
        "@type": "Person",
        "name": "Nawfal Irfan Ramadhan"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nawfal.site"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Chat",
          "item": "https://nawfal.site/chat"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Nawfal Assistant",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "description": "An intelligent digital assistant providing insights into Nawfal Irfan Ramadhan's professional portfolio and skills.",
      "author": {
        "@type": "Person",
        "name": "Nawfal Irfan Ramadhan"
      }
    }
  ];

  return (
    <section className="flex h-full w-full flex-col pt-4 md:grow md:pt-8 lg:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileHeader />
      
      <div className="pad-x mb-8">
        <h1 className="text-balance text-left text-3xl font-semibold leading-[1.1] tracking-tight xs:text-4xl md:w-[60%] lg:text-5xl">
          Chat Room
        </h1>
        <p className="mt-4 text-muted-foreground text-base max-w-lg">
          A place to connect, share ideas, or just say hi. Sign in with Google or GitHub to start chatting.
        </p>
      </div>

      <SubLinks />

      <div className="pad-x py-8 md:py-12">
        <div className="max-w-6xl mx-auto w-full h-[600px] md:h-[750px]">
          <Chat />
        </div>
      </div>
    </section>
  );
}
