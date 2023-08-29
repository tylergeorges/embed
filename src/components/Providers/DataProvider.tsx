import React, { useCallback, useState } from 'react';
import UserProvider from '@components/Providers/UserProvider';
import { Loading } from '@components/Overlays/Loading';
import GuildProvider from '@components/Providers/GuildProvider';

interface DataProviderProps {
  children: React.ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const [isGuildFetched, setIsGuildFetched] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);

  const isFetched = isUserFetched && isGuildFetched;

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
      {isFetched ? children : <Loading />}
    </>
  );
}
