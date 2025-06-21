import React, { useEffect, useState } from 'react';

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Handle scrollbar visibility
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed left-8 top-0 h-full w-[2px] z-50 transition-opacity duration-300 ${
        isVisible || isHovered ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white/10" />
      <div
        className="absolute top-0 left-0 w-full bg-white/40 transition-all duration-200"
        style={{ height: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default CustomScrollbar;