import { useState, useEffect } from 'react';

interface UseHeaderScrollOptions {
  threshold?: number;
}

export function useHeaderScroll({ threshold = 100 }: UseHeaderScrollOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Show header when scrolling up or at the top or haven't reached threshold
        if (currentScrollY < lastScrollY || currentScrollY < threshold) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
          // Hide header only when scrolling down AND past the threshold
          setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => window.removeEventListener('scroll', controlHeader);
    }
  }, [lastScrollY, threshold]);

  return { isVisible };
}
