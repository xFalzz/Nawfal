"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const AnimatedParagraph = ({ paragraph }: { paragraph: string }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  return (
    <motion.p
      className="mx-auto text-xl min-[32.5rem]:text-[1.375rem] sm:text-2xl lg:text-3xl font-medium italic lg:leading-10 text-center max-w-[68.625rem]"
      ref={element}
      style={{ opacity: scrollYProgress }}
    >
      {paragraph}
    </motion.p>
  );
};

export default AnimatedParagraph;
