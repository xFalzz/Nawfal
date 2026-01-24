import type { Metadata } from "next";

// Components
import TemplateCard from "@/components/macro/template-card";
import TechStack from "@/components/macro/tech-stack";

// Images
import MacOSImage from "@/public/images/projects/MacOS-clone.jpg";
import QRQuickImage from "@/public/images/projects/OpenGraphIMG.jpg";
import ParticleFlowSquashImage from "@/public/images/projects/particleflowsquash.png";
import MoveiHubImage from "@/public/images/projects/MoveiHub.png";

export const metadata: Metadata = {
  title: "My Projects",
  description: "Explore Nawfal's portfolio of personal projects including MacOS clone, QRQuick, and Particle Flow Squash. Built with Next.js, TypeScript, and modern web technologies.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "My Projects | Nawfal Irfan Ramadhan",
    description: "Explore my portfolio of personal projects built with Next.js, TypeScript, Tailwind CSS, and modern web technologies.",
    url: "https://nawfal.site/projects",
  },
};

const Projects = [
  {
    name: "MoveiHub",
    url: "https://moveihub.vercel.app/",
    image: MoveiHubImage,
    type: "Personal Project",
    stack: ["Next", "TypeScript", "Tailwind", "TMDB API", "OpenAI"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "MacOS Clone",
    url: "https://github.com/xFalzz/MacOS-clone",
    image: MacOSImage,
    type: "Personal Project",
    stack: ["Next", "TypeScript", "Tailwind"],
    price: "Free",
    category: "Web Application",
  },
  {
    name: "QRQuick",
    url: "https://qrquicks.vercel.app/",
    image: QRQuickImage,
    type: "Personal Project",
    stack: ["TypeScript", "Next", "React", "Tailwind", "Prisma"],
    price: "Free",
    category: "Utility Tool",
  },
  {
    name: "Particle Flow Squash",
    url: "https://particleflowsquash.vercel.app/",
    image: ParticleFlowSquashImage,
    type: "Personal Project",
    stack: ["TypeScript", "React", "Tailwind", "Canvas API"],
    price: "Free",
    category: "Interactive Game",
  }
];

const Page = () => {
  return (
    <section
      id="projects"
      className="flex h-full w-full grow flex-col gap-y-4 py-4 md:gap-y-8 md:py-8 lg:gap-y-12 lg:py-12"
    >
      <div className="pad-x flex h-full w-full flex-col gap-y-4 md:gap-y-5">
        <h1 className="text-balance text-left text-3xl font-semibold leading-tight lg:text-4xl">
          My Projects
        </h1>
        <p className="w-full max-w-lg text-muted-foreground">
          Explore my{" "}
          <span className="font-medium text-foreground">personal projects</span>{" "}
          built with modern web technologies. From a{" "}
          <span className="font-medium text-foreground">MacOS clone</span> to a{" "}
          <span className="font-medium text-foreground">QR code generator</span>{" "}
          and an <span className="font-medium text-foreground">interactive particle game</span>,
          each project showcases different aspects of web development. Feel free
          to check them out and{" "}
          <span className="font-medium text-foreground">reach out</span> if you
          have any questions.
        </p>
      </div>
      <div className="h-[1px] w-full bg-border" />
      <div className="pad-x flex h-full min-h-fit w-full grow flex-col gap-x-4 gap-y-4 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:gap-x-12 lg:gap-y-12 xl:grid-cols-3">
        {Projects.map((project, index) => (
          <TemplateCard key={index} {...project} />
        ))}
      </div>
      <TechStack />
    </section>
  );
};
export default Page;
