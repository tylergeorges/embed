import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matchesQuery, setMatchesQuery] = useState<boolean>(
    window && window.matchMedia(query).matches
  );

  useEffect(() => {
    const handleResize = () => {
      setMatchesQuery(window.matchMedia(query).matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return matchesQuery;
};
