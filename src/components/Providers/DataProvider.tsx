import React, { useCallback, useState } from 'react';
import UserProvider from '@components/Providers/UserProvider';
import { Loading } from '@components/Overlays/Loading';
import GuildProvider from '@components/Providers/GuildProvider';
import * as Styles from '@components/Core/styles';
import { ChannelsSidebar } from '@components/Sidebar/ChannelsSidebar';
import dynamic from 'next/dynamic';
import { useContextMenu } from '@hooks/useContextMenu';
import { GuestFormModal } from '@components/Overlays/Modal/GuestFormModal';

interface DataProviderProps {
  children: React.ReactNode;
}

const ContextMenu = dynamic(() =>
  import('@components/Overlays/ContextMenu').then(mod => mod.ContextMenu)
);

export default function DataProvider({ children }: DataProviderProps) {
  const [isGuildFetched, setIsGuildFetched] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);

  const { disableBrowserMenu } = useContextMenu();

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
      {isFetched ? (
        <Styles.Main onContextMenu={disableBrowserMenu}>
          <Styles.InnerMain>
            <ChannelsSidebar />

            <ContextMenu />
            <GuestFormModal />
            {children}
          </Styles.InnerMain>
        </Styles.Main>
      ) : (
        <Loading />
      )}
    </>
  );
}
