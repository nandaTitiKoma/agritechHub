
import { useEffect, useRef, RefObject } from 'react';

interface AnimateOptions {
  threshold?: number;
  rootMargin?: string;
  animateOnce?: boolean;
}

export function useAnimate<T extends HTMLElement = HTMLElement>(
  options: AnimateOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animateOnce = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (animateOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!animateOnce) {
            entry.target.classList.remove('animate-fade-in');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      ref.current.classList.add('opacity-0');
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, animateOnce]);

  return ref;
}

// Helper function to create multiple animation references
export function useMultipleAnimations(
  count: number,
  options: AnimateOptions = {}
): RefObject<HTMLElement>[] {
  return Array.from({ length: count }, () => useAnimate(options));
}
