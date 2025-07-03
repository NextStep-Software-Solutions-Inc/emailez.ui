import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Custom hook to get the dynamic height of any element
 * Can work with either a ref object or a CSS selector
 */
export function useElementHeight<T extends HTMLElement = HTMLElement>(
  elementRef?: RefObject<T | null> | null,
  selector?: string,
  defaultHeight: number = 0
) {
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== 'undefined') {
        let element: T | null = null;

        // Try to get element from ref first, then fallback to selector
        if (elementRef?.current) {
          element = elementRef.current;
        } else if (selector) {
          element = document.querySelector(selector) as T;
        }

        if (element) {
          const elementHeight = element.offsetHeight;
          if (elementHeight > 0) {
            setHeight(elementHeight);
          }
        }
      }
    };

    // Initial update with a slight delay to ensure DOM is ready
    const timeoutId = setTimeout(updateHeight, 100);

    // Create ResizeObserver to watch for element size changes
    let resizeObserver: ResizeObserver | null = null;

    const setupObserver = () => {
      if (typeof window !== 'undefined' && window.ResizeObserver) {
        let element: T | null = null;

        if (elementRef?.current) {
          element = elementRef.current;
        } else if (selector) {
          element = document.querySelector(selector) as T;
        }

        if (element) {
          resizeObserver = new ResizeObserver(() => {
            updateHeight();
          });
          resizeObserver.observe(element);
        }
      }
    };

    // Setup observer after a slight delay
    const observerTimeoutId = setTimeout(setupObserver, 150);

    // Also listen for window resize as fallback
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateHeight);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(observerTimeoutId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateHeight);
      }
    };
  }, [elementRef, selector, defaultHeight]);

  return height;
}
