import { useState, useEffect, RefObject } from 'react';

interface OnScreen {
  onScreen: boolean;
  entry: IntersectionObserverEntry | undefined;
}

export function useOnScreen(
  ref: RefObject<HTMLElement>,
  threshold = 0.5,
): OnScreen {
  const [onScreen, setOnScreen] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    let observer: IntersectionObserver | null;

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setOnScreen(entry.isIntersecting);
          setEntry(entry);
        },
        { threshold },
      );

      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, threshold]);

  return { onScreen, entry };
}
