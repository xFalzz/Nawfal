import type { Metadata } from "next";

// Components
import TemplateCard from "@/components/macro/template-card";
import TechStack from "@/components/macro/tech-stack";

// Assets
import MacOSImage from "@/public/images/projects/MacOS-clone.jpg";
import QRQuickImage from "@/public/images/projects/OpenGraphIMG.jpg";
import ParticleFlowSquashImage from "@/public/images/projects/particleflowsquash.png";
import MoveiHubImage from "@/public/images/projects/MoveiHub.png";
import KostAfifaImage from "@/public/images/projects/kost-afifa.png";
import KuraImage from "@/public/images/projects/kura.png";
import HijaraImage from "@/public/images/projects/hijara.png";
import NexusVisionImage from "@/public/images/projects/nexus-vision.png";
import SinopsispImage from "@/public/images/projects/sinopsisp.png";
import KelasMM2Image from "@/public/images/projects/xiimm2.png";
import SnakesImage from "@/public/images/projects/snakess.png";

export const metadata: Metadata = {
  title: "My Projects | Nawfal Irfan Ramadhan",
  description:
    "Explore Nawfal's portfolio of featured software engineering and AI projects including Hijara, KURA, nexus-vision, MoveiHub, and Particle Flow Squash.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "My Projects | Nawfal Irfan Ramadhan",
    description:
      "Explore my portfolio of featured open-source and freelance projects built with Next.js, TypeScript, Python, AI, and modern web technologies.",
    url: "https://nawfal.vercel.app/projects",
  },
};

const Projects = [
  {
    name: "Hijara - AI Sustainability Platform",
    url: "#",
    image: HijaraImage,
    type: "Google #JuaraVibeCoding Project",
    stack: ["Gemini Vision", "Cloud Run", "Next 15"],
    price: "Locked",
    category: "AI & Cloud",
  },
  {
    name: "KURA - Game Encyclopedia",
    url: "https://kuraa.vercel.app",
    image: KuraImage,
    type: "Personal Project | 897k+ Games",
    stack: ["Next", "TS", "RAWG API", "Firebase"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "MoveiHub",
    url: "https://moveihub.vercel.app/",
    image: MoveiHubImage,
    type: "Personal Project | 21 ⭐",
    stack: ["Next", "TS", "TMDB", "OpenAI"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "Particle Flow Squash",
    url: "https://particleflowsquash.vercel.app/",
    image: ParticleFlowSquashImage,
    type: "3D Gesture Interaction",
    stack: ["MediaPipe", "R3F", "Three.js", "TS"],
    price: "Free",
    category: "AI & 3D Graphics",
  },
  {
    name: "nexus-vision",
    url: "https://github.com/xFalzz/nexus-vision",
    image: NexusVisionImage,
    type: "Python AI Productivity Studio",
    stack: ["Python", "OpenCV", "MediaPipe", "AI"],
    price: "Free",
    category: "AI & Automation",
  },

  {
    name: "MacOS Clone",
    url: "https://github.com/xFalzz/MacOS-clone",
    image: MacOSImage,
    type: "macOS Desktop Experience | 8 ⭐",
    stack: ["Preact", "TypeScript", "SCSS"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "Kost Putri Afifa",
    url: "https://www.kostafifa.my.id/",
    image: KostAfifaImage,
    type: "Freelance Client Project",
    stack: ["Next 15", "React 19", "TS", "Firebase"],
    price: "Locked",
    category: "Client Project",
  },
  {
    name: "QRQuick",
    url: "https://qrquicks.vercel.app/",
    image: QRQuickImage,
    type: "QR Code Platform | 4 ⭐",
    stack: ["TypeScript", "Next", "Prisma"],
    price: "Free",
    category: "Utility Tool",
  },
  {
    name: "sinopsisp",
    url: "https://sinopsisp.vercel.app",
    image: SinopsispImage,
    type: "Film & Game Analysis Blog",
    stack: ["Next", "TS", "Tailwind", "CMS"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "Website XII MM 2",
    url: "https://xiidusemulti2.vercel.app",
    image: KelasMM2Image,
    type: "SMK N 2 Sewon Memory Archive",
    stack: ["JavaScript", "HTML5", "CSS3"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "Snakes Community",
    url: "https://snakes-zeta.vercel.app/",
    image: SnakesImage,
    type: "Herpetology Community Platform",
    stack: ["JavaScript", "Tailwind", "Node.js"],
    price: "Free",
    category: "Web Application",
  },
];

const Page = () => {
  return (
    <section
      id="projects"
      className="flex h-full w-full grow flex-col gap-y-4 py-4 md:gap-y-8 md:py-8 lg:gap-y-12 lg:py-12"
    >
      <div className="pad-x flex h-full w-full flex-col gap-y-4 md:gap-y-5">
        <h1 className="text-balance text-left text-3xl font-semibold leading-tight lg:text-4xl">
          Featured &amp; Open Source Projects
        </h1>
        <p className="w-full max-w-xl text-muted-foreground">
          Explore my collection of <span className="font-medium text-foreground">AI platforms</span>,{" "}
          <span className="font-medium text-foreground">full-stack web applications</span>,{" "}
          <span className="font-medium text-foreground">open-source interpreters</span>, and{" "}
          <span className="font-medium text-foreground">3D computer vision tools</span> built with Next.js, TypeScript, Python, and Google Cloud.
        </p>
      </div>
      <div className="h-[1px] w-full bg-border" />
      <div className="pad-x flex h-full min-h-fit w-full grow flex-col gap-x-4 gap-y-4 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:gap-x-8 lg:gap-y-8 xl:grid-cols-3">
        {Projects.map((project, index) => (
          <TemplateCard key={index} {...project} />
        ))}
      </div>
      <TechStack />
    </section>
  );
};

export default Page;
