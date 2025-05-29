import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Define a function to check if we're in the browser environment
    const checkMediaQuery = () => {
      if (typeof window !== "undefined") {
        const media = window.matchMedia(query);
        setMatches(media.matches);
        return media;
      }
      return null;
    };

    // Check initial state
    const media = checkMediaQuery();

    if (media) {
      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, [query]);

  return matches;
}
