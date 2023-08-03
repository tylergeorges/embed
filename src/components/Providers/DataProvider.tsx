import React, { useCallback, useRef, useState } from 'react';
import UserProvider from '@components/Providers/UserProvider';
import GuildProvider from '@components/Providers/GuildProvider';
import { Loading } from '@components/Overlays/Loading';

interface DataProviderProps {
  children: React.ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const isUserFetched = useRef(false);
  const [isGuildFetched, setIsGuildFetched] = useState(false);

  const isFetching = !isUserFetched.current || !isGuildFetched;

  const setGuildFetchedCB = useCallback(() => {
    if (!isGuildFetched) {
      setIsGuildFetched(true);
    }
  }, [isGuildFetched]);

  return (
    <>
      <UserProvider isUserFetched={isUserFetched} />
      <GuildProvider setIsGuildFetched={setGuildFetchedCB} />
      {isFetching ? <Loading /> : children}
    </>
  );
}
