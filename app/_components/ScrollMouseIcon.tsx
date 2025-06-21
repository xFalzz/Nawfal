'use client';

import React, { useState, useEffect } from 'react';

const ScrollMouseIcon: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToNextSection = () => {
    // Calculate viewport height
    const viewportHeight = window.innerHeight;
    
    // Scroll exactly one full viewport
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth'
    });
    
    // Hide icon immediately after scrolling
    setIsVisible(false);
  };

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if user has scrolled back to the top
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else if (window.scrollY > 0 && isVisible === true) {
        // Hide icon if scrolled away from top
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return isVisible ? (
    <div 
      onClick={scrollToNextSection}
      className="fixed bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-70 transition-opacity duration-300 z-50"
    >
      <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-300 rounded-full relative">
        <div className="absolute left-1/2 top-2 transform -translate-x-1/2 w-1 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"></div>
      </div>
    </div>
  ) : null;
};

export default ScrollMouseIcon;