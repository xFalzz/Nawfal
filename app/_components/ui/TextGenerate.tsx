"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/app/_lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delayStart = 0, // TAMBAHKAN prop untuk delay start
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delayStart?: number; // delay dalam ms
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    }, delayStart);

    return () => clearTimeout(timeoutId);
  }, [scope.current, animate, filter, duration, delayStart]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`${
                idx > 0 && idx < 5
                  ? "text-primary"
                  : "dark:text-white text-black"
              } opacity-0`}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div>{renderWords()}</div>
      </div>
    </div>
  );
};
