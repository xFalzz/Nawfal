"use client";

import { testimonialItems } from "@/app/_lib/constants";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Testimonials = () => {
  const [curIndex, setCurIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const goToTestimonial = (index: number) => {
    setCurIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (inView) {
      interval = setInterval(() => {
        setCurIndex((prevIndex) =>
          prevIndex === testimonialItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [curIndex, inView]);

  const currentTestimonial = testimonialItems[curIndex];
};

export default Testimonials;
