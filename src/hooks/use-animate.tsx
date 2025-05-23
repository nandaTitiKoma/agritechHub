
import { useEffect, useRef, RefObject } from 'react';

interface AnimateOptions {
  threshold?: number;
  rootMargin?: string;
  animateOnce?: boolean;
  initialOpacity?: number; // Added to control initial opacity
}

export function useAnimate<T extends HTMLElement = HTMLElement>(
  options: AnimateOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animateOnce = true,
    initialOpacity = 0, // Default to invisible
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove opacity-0 first to prevent flicker
            entry.target.classList.remove('opacity-0');
            // Then add the animation class
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in');
            }, 10);
            
            if (animateOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!animateOnce) {
            entry.target.classList.remove('animate-fade-in');
            entry.target.classList.add('opacity-0');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      // Set initial opacity
      if (initialOpacity === 0) {
        ref.current.classList.add('opacity-0');
      }
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, animateOnce, initialOpacity]);

  return ref;
}

// Helper function to create multiple animation references
export function useMultipleAnimations(
  count: number,
  options: AnimateOptions = {}
): RefObject<HTMLElement>[] {
  return Array.from({ length: count }, () => useAnimate(options));
}
