import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    media.addListener(handleChange);
    return () => {
      media.removeListener(handleChange);
    };
  }, [query, matches]);

  return matches;
}
