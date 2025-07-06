import { useState, useEffect, useRef } from 'react';

export function useModalAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const createAnimatedClose = (onClose: () => void) => {
    return () => {
      setIsVisible(false);
      setTimeout(() => onClose(), 200); // Wait for animation to complete
    };
  };

  const createBackdropHandler = (onClose: () => void, preventClose: boolean = false) => {
    return (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !preventClose) {
        createAnimatedClose(onClose)();
      }
    };
  };

  return {
    isVisible,
    createAnimatedClose,
    createBackdropHandler
  };
}
