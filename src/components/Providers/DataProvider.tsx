import React, { useCallback, useState } from 'react';
import UserProvider from '@components/Providers/UserProvider';
import GuildProvider from '@components/Providers/GuildProvider';
import { Loading } from '@components/Overlays/Loading';

interface DataProviderProps {
  children: React.ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const [isGuildFetched, setIsGuildFetched] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);

  const isFetching = !isUserFetched || !isGuildFetched;

  const setGuildFetchedCB = useCallback(() => {
    if (!isGuildFetched) {
      setIsGuildFetched(true);
    }
  }, [isGuildFetched]);

  const setUserFetchedCB = useCallback(() => {
    if (!isUserFetched) {
      setIsUserFetched(true);
    }
  }, [isUserFetched]);

  return (
    <>
      <UserProvider setIsUserFetched={setUserFetchedCB} />
      <GuildProvider setIsGuildFetched={setGuildFetchedCB} />
      {isFetching ? <Loading /> : children}
    </>
  );
}
