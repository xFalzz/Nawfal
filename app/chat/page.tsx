import ProfileHeader from "@/components/macro/profile-header";
import Chat from "@/components/doc/chat/chat";
import SubLinks from "@/components/macro/sub-links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Room | Nawfal Irfan Ramadhan",
  description: "Join the conversation on Nawfal's personal chat room. A space for developers and creators to connect, share ideas, and say hi.",
  openGraph: {
    title: "Chat Room | Nawfal Irfan Ramadhan",
    description: "Join the conversation and connect with others in real-time.",
    url: "https://nawfal.site/chat",
    siteName: "Nawfal Irfan Ramadhan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat Room | Nawfal Irfan Ramadhan",
    description: "Connect with the community in real-time.",
  },
};

export default function ChatPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Chat Room",
    "description": "Nawfal Irfan Ramadhan's personal real-time chat room.",
    "publisher": {
      "@type": "Person",
      "name": "Nawfal Irfan Ramadhan"
    }
  };

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
        <div className="max-w-4xl mx-auto w-full h-[600px] md:h-[700px]">
          <Chat />
        </div>
      </div>
    </section>
  );
}
