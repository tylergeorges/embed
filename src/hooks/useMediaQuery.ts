import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string = 'screen and (max-width: 768px)') => {
  const [matchesQuery, setMatchesQuery] = useState<boolean>(window.matchMedia(query).matches);

  useEffect(() => {
    setMatchesQuery(window.matchMedia(query).matches);
    const handleResize = () => {
      setMatchesQuery(window.matchMedia(query).matches);
    };
    if (window) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (window) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [query]);

  return matchesQuery;
};
