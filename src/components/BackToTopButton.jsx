import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-7 right-7 z-50 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-aurora-violet to-aurora-cyan text-[#04060f] shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg ${isVisible ? 'pointer-events-auto opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-90'}`}
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
};

export default BackToTopButton;