import { ChevronRight, Download } from "lucide-react";
import ShinyButton from "./ui/ShinyButton";
import { AnimatedTooltip } from "./ui/Tooltip";
import { tooltipItems } from "../_lib/constants";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/TextGenerate";

const HeroSection = () => {
  return (
    <>
      <div className="h-screen w-full dark:bg-dark-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.06] flex items-center justify-center absolute top-0 left-0">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div
        className="pb-20 pt-36 sm:p-0 sm:min-h-screen flex flex-col items-center justify-center relative"
        id="#home"
      >
        <div className="flex flex-col justify-center items-center relative z-10 text-center">
          <p className="uppercase font-bold text-sm tracking-widest">
            Based In <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-white bg-[length:100%_100%] bg-no-repeat">
          Indonesia
        </span>
          </p>
          <TextGenerateEffect
            words="Frontend Web Developer."
            className="text-[40px] md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-snug tracking-wide"
            delayStart={2500}
          />
          <p className="pt-5 pb-8 text-sm sm:text-base md:text-lg text-dark-200 dark:text-stone-200/70">
            Hi, I&apos;m Nawfal, I create intuitive, visually stunning and
            highly functional Web.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ShinyButton icon={<ChevronRight />}>
              <Link href="#work">See My Project</Link>
            </ShinyButton>
            <a
              href="/resume/CV - Nawfal Irfan Ramadhan (Web Development).pdf"
              download
              className="flex items-center gap-2.5 group"
            >
              <Download className="text-primary" />
              <span className="group-hover:text-white/70 transition-colors duration-200 font-semibold">
                Download CV
              </span>
            </a>
          </div>
          <div className="flex flex-row items-center justify-center mb-10 w-full mt-8">
            <AnimatedTooltip items={tooltipItems} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
