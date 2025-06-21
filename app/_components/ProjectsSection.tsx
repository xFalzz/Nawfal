"use client";

import Link from "next/link";
import { portfolioProjects } from "../_lib/constants";
import ProjectCard from "./ProjectCard";
import ShinyButton from "./ui/ShinyButton";
import { ChevronRight } from "lucide-react";
import PhotographyPortfolio from "./PhotographyPortfolio";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  return (
    <div className="py-24" id="work">
      {/* Animasi untuk My Project */}
      <motion.div
        initial={{ opacity: 0, x: -75 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex gap-4 flex-col sm:flex-row sm:items-center justify-between"
      >
        <h2 className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200">
          My Project
        </h2>

        <ShinyButton icon={<ChevronRight />}>
          <Link href="https://github.com/xFalzz" target="_blank">
            All Projects
          </Link>
        </ShinyButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid lg:grid-cols-3 gap-4 mt-7"
      >
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* Tambahkan margin di atas PhotographyPortfolio */}
      <div className="mt-32">
        {/* Animasi untuk Photography */}
        <PhotographyPortfolio />
      </div>
    </div>
  );
};

export default ProjectsSection;
